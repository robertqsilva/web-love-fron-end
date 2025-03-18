const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("rgb"); // Pegando o parâmetro da URL

console.log(id);

// Esconde o conteúdo até carregar os dados
document.body.style.display = "none";

async function fetchData() {
  try {
    const response = await fetch(`https://web-lov.onrender.com/api/page/${id}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar dados da API");
    }

    const data = await response.json();

    // Verifica se os dados retornados são válidos
    if (!data || !data.nameCasal || !data.photos || data.photos.length === 0) {
      window.location.href = "../index.html"; // Redireciona para outra página
      return;
    }

    // Atualiza o nome do casal
    document.querySelector(".text-center").innerText = data.nameCasal;

    // Atualiza a mensagem de amor
    document.querySelector(".text-msg-love").innerText = data.message;

    // Atualiza o contador com a data da API
    atualizarContador(data.data);

    // Atualiza o carrossel com as imagens da API
    atualizarCarrossel(data.photos);

    // Exibe a página após carregar os dados
    document.body.style.display = "block";
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    // window.location.href = "../index.html"; // Redireciona para outra página se houver erro
  }
}

function atualizarCarrossel(imagens) {
  const carousel = document.querySelector(".carousel");
  carousel.innerHTML = ""; // Limpa imagens existentes

  imagens.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Imagem do casal";
    carousel.appendChild(img);
  });
}

function atualizarContador(dataInicio) {
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

  calcularTempo();
  setInterval(calcularTempo, 1000);
}

fetchData();
