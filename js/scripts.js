const container = document.querySelector('.container');
const qrCodeBtn = document.querySelector('#qr-form button');
const qrCodeBtnDownload = document.querySelector('#qr-download')
const qrCodeInput = document.querySelector('#qr-form input');
const qrCodeImg = document.querySelector('#qr-code img');

//Eventos

//Gerar QR Code
function generateQrCode(){
    const qrCodeInputValue = qrCodeInput.value;
    //validação
    if(!qrCodeInputValue) return;

    qrCodeBtn.innerText = 'Gerando código...';
    //Conexão com API
    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue} `;
    qrCodeImg.addEventListener('load',()=>{
        container.classList.add('active');
        qrCodeBtn.innerText = 'Código criado!';
    })
    
}

qrCodeBtn.addEventListener("click", () =>{
    generateQrCode();
});

//Ativando a geração do QR Code através do botão Enter
qrCodeInput.addEventListener('keydown',(e) =>{
    if(e.code === 'Enter'){
        generateQrCode();
    }
})

//download do QR Code
qrCodeBtnDownload.addEventListener('click', async()=>{
    //faz uma riquisição a URL da imagem do código QR(qrCodeImg.src) usando a API fetch
    const response  = await fetch(qrCodeImg.src);
    //Converte a responsa em um objeto Blob usando o método blob()
    const blob = await response.blob();
    //cria um novo elemento âncora
    const downloadLink = document.createElement('a')
    //Define o atributo href do downloadLink para a URL criada a partir do objeto Blob
    downloadLink.href = URL.createObjectURL(blob);
    //Especifica o nome do arquivo baixado
    downloadLink.download = 'qr_code_PNG39(1).png'
    //aciona o clique do link de download, o inicia o download do arquivo pelo navegador
    downloadLink.click();
})

//Limpar área do Qr Code
qrCodeInput.addEventListener('keyup',() =>{
    if(!qrCodeInput.value){
        container.classList.remove('active');
        qrCodeBtn.innerText = 'Gerar QR Code';
    }
})





