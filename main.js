let currentIndex = 0;
let limitPhoto = 3;

document.getElementById("planValue").textContent = limitPhoto;

const inputDataDefaut = document.getElementById("datalove");

const agora = new Date();

agora.setHours(agora.getHours() - 3);

const formatoISO = agora.toISOString().slice(0, 16);

inputDataDefaut.value = formatoISO;
inputDataDefaut.max = formatoISO;

let planoWeb = "basic";

 function scrollToTop() {
   window.scrollTo({
     top: 0,
     behavior: "smooth",
   });
 }

function attPlano(planoParams) {
  planoWeb = planoParams;

  const campoMusica = document.getElementById("music");

  const botao1 = document.getElementById("bt-1");
  const botao2 = document.getElementById("bt-2");
  const botao3 = document.getElementById("bt-3");

  if (planoParams === "basic") {
    limitPhoto = 3;
    botao1.style.backgroundColor = "#e5e7eb";
    botao2.style.backgroundColor = "#110c21";
    botao3.style.backgroundColor = "#110c21";
    botao1.style.color = "black";
    botao2.style.color = "white";
    botao3.style.color = "white";
    campoMusica.style.display = "none";
  }
  if (planoParams === "love") {
    limitPhoto = 7;
    botao2.style.backgroundColor = "#e5e7eb";
    botao1.style.backgroundColor = "#110c21";
    botao3.style.backgroundColor = "#110c21";
    botao2.style.color = "black";
    botao1.style.color = "white";
    botao3.style.color = "white";
    campoMusica.style.display = 'block'
  }
  if (planoParams === "amorEterno") {
    limitPhoto = 15;
    botao3.style.backgroundColor = "#e5e7eb";
    botao1.style.backgroundColor = "#110c21";
    botao2.style.backgroundColor = "#110c21";
    botao3.style.color = "black";
    botao1.style.color = "white";
    botao2.style.color = "white";
    campoMusica.style.display = "block";
  }

  document.getElementById("planValue").textContent = limitPhoto;
}

function planer(qntd) {
  if (planoWeb == "basic" && qntd > 3) {
    alert("Seu plano permite escolher até 3 fotos");
    return true;
  } else if (planoWeb == "love" && qntd > 7) {
    alert("Seu plano permite escolher até 7 fotos");
    return true;
  } else if (planoWeb == "amorEterno" && qntd > 15) {
    alert("Seu plano permite escolher até 15 fotos");
    return true;
  }
}

function showNextSlide() {
  const carousel = document.getElementById("carousel");
  const slides = document.querySelectorAll(".carousel img");
  const totalSlides = slides.length;
  currentIndex = (currentIndex + 1) % totalSlides;
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  dropHearts();
}

function dropHearts() {
  const numberOfHearts = 10;

  const fallArea = document.getElementById("carousel-container");

  for (let i = 0; i < numberOfHearts; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * fallArea.offsetWidth + "px";
    heart.style.top = "-50px";
    heart.style.animationDelay = `${i * 0.1}s`;

    fallArea.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 15000);
  }
}

setInterval(showNextSlide, 7000);

function previewImages() {
  const input = document.getElementById("file");
  const carousel = document.getElementById("carousel");

  const limiteUltapassado = planer(input.files.length);

  if (limiteUltapassado) return;

  carousel.innerHTML = "";
  for (let file of input.files) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = "Imagem carregada";

      carousel.appendChild(img);
    };

    reader.readAsDataURL(file); // Converte o arquivo em URL
  }
}

function atualizarTexto() {
  const textarea = document.getElementById("meuTextarea");
  const paragrafo = document.getElementById("meuParagrafo");

  paragrafo.textContent = textarea.value;
}

function atualizarTextoName() {
  const casalInput = document.getElementById("nameCasalInput");
  const casalName = document.getElementById("nameCasal");

  casalName.textContent = casalInput.value;
}

const inputData = document.getElementById("datalove");
let intervalId = null;

function atualizarContador(dataInicio) {
  if (intervalId) clearInterval(intervalId); // Limpa qualquer contador anterior

  function calcularTempo() {
    const agora = new Date();
    const inicio = new Date(dataInicio);
    const diferenca = agora - inicio;

    if (diferenca < 0) {
      document.getElementById("contador").innerHTML =
        "Data inválida. O namoro não pode ser no futuro!";
      return;
    }

    const anos = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365));
    const meses = Math.floor(
      (diferenca % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
    );
    const dias = Math.floor(
      (diferenca % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    const horas = Math.floor(
      (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById(
      "contador"
    ).innerHTML = `${anos} Anos, ${meses} Meses, ${dias} Dias <br>
                ${horas} Horas, ${minutos} Minutos e ${segundos} Segundos`;
  }

  calcularTempo(); // Chama imediatamente para evitar atraso de 1s
  intervalId = setInterval(calcularTempo, 1000); // Atualiza o contador
}

atualizarContador(inputData.value);

inputData.addEventListener("input", function () {
  atualizarContador(inputData.value);
});


const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modal = document.getElementById("defaultModal");

  // Abrir modal
  openModalBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // Fechar modal
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Fechar modal ao clicar fora dela
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });

async function requestapi() {
  const email = document.getElementById("emailpag").value.trim();
  const nameCasal = document.getElementById("nameCasalInput").value.trim();
  const data = document.getElementById("datalove").value.trim();
  const message = document.getElementById("meuTextarea").value.trim();
  const plano = planoWeb;

  // Validação simples dos campos
  if (!email || !nameCasal || !data || !message || !plano) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const formData = new FormData();

  // Adiciona os campos de texto
  formData.append("email", email);
  formData.append("nameCasal", nameCasal);
  formData.append("data", data);
  formData.append("message", message);
  formData.append("plano", plano);

  // Captura as imagens do input de arquivo
  const fileInput = document.getElementById("file");
  const files = fileInput.files;

  // Verifica se o input tem arquivos e adiciona ao FormData
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
  }

  try {
    // Enviar a requisição para a API
    const response = await fetch("https://3.93.177.24/api/create-page", {
      method: "POST",
      body: formData,
    });

    const dataResponse = await response.json();

    if (response.ok) {
      // Extraímos os dados necessários da resposta da API
      const { qr_code, qr_code_base64, transactionAmount } = dataResponse;

      // Exibimos o modal com os dados da API
      showModal(qr_code_base64, transactionAmount);
    } else {
      alert(`Erro: ${dataResponse.message}`);
    }
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
    alert("Erro ao processar os dados.");
  }
}

// Função que exibe o modal com o QR Code e valor
function showModal(qrCodeBase64, amount) {
  const pixModal = document.getElementById("pixModal");
  const transactionAmount = document.getElementById("transactionAmount");
  const qrCodeContainer = document.getElementById("qrCodeContainer");
  const copyQrCodeBtn = document.getElementById("copyQrCodeBtn");

  // Atualiza o valor da transação
  transactionAmount.innerText = amount.toFixed(2);

  // Exibe o QR Code usando o base64
  qrCodeContainer.innerHTML = `<img src="data:image/png;base64, ${qrCodeBase64}" alt="QR Code do PIX" id="qrCodeImage">`;

  const closeModal =  document.getElementById("defaultModal");

  // Exibe o modal
  show(pixModal, closeModal);

  // Evento para copiar o QR Code para a área de transferência
  copyQrCodeBtn.addEventListener("click", function () {
    const qrCodeImage = document.getElementById("qrCodeImage");

    if (qrCodeImage) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = qrCodeImage.src;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          const item = new ClipboardItem({ "image/png": blob });
          navigator.clipboard
            .write([item])
            .then(() => {
              alert("QR Code copiado!");
            })
            .catch((err) => {
              console.error("Erro ao copiar o QR Code:", err);
            });
        });
      };
    }
  });

  // Evento para fechar o modal
  const closeModalBtn = document.getElementById("closeModalBtn1");
  closeModalBtn.addEventListener("click", function () {
    hide(pixModal);
  });

  // Caso o modal seja fechado ao clicar fora do conteúdo (área escura)
  pixModal.addEventListener("click", function (e) {
    if (e.target === pixModal) {
      hide(pixModal);
    }
  });
}

// Função para exibir o modal (com animação de transição)
function show(modal, modal0) {
  modal.style.display = "flex";
  modal.classList.add("show-modal");
   modal0.classList.add("hidden");
}

// Função para esconder o modal (com animação de transição)
function hide(modal) {
  modal.style.display = "none";
  modal.classList.remove("show-modal");
}
