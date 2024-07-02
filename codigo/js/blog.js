fetch('./data/blog.json')
.then(response => response.json()) // Converte a resposta para JSON
.then(data => { // Manipula os dados JSON
  const conteudoDiv = document.getElementById('conteudo');

  // Itera sobre os itens no JSON
  data.forEach(item => {
    // Cria elementos HTML para exibir as informações
    const divItem = document.createElement('div');
    divItem.classList.add('item'); // Adiciona a classe de estilo
    divItem.innerHTML = `
      <h2>${item.titulo}</h2>
      <img class="img" src="${item.imagem}" alt="${item.titulo}">
    `;

    divItem.addEventListener('click', () => {
      // Redireciona para a página do artigo com o ID do artigo na URL
      window.location.href = `blog.html?id=${item.id}`;
    });
    // Adiciona o item à div de conteúdo
    conteudoDiv.appendChild(divItem);
  ;
  })
.catch(error => console.error('Ocorreu um erro ao carregar os dados:', error));
})



  // Obtém o ID do artigo da URL
  const urlParams = new URLSearchParams(window.location.search);
  const artigoId = urlParams.get('id');

  // Carrega o arquivo JSON
  fetch('./data/blog.json')
    .then(response => response.json())
    .then(data => {
      // Encontra o artigo correspondente pelo ID
      const artigo = data.find(item => item.id == artigoId);

      // Verifica se o artigo foi encontrado
      if (artigo) {
        const artigoDiv = document.getElementById('artigo');
        artigoDiv.innerHTML = `
        <title> ${artigo.titulo} </title>
          <h1 class="tituloArtigo">${artigo.titulo}</h1>
          <img class="imagemArtigo" src="${artigo.imagem}" alt="${artigo.titulo}">
          <p class="textoArtigo">${artigo.texto}</p>
        `;
      } else {
        // Exibe uma mensagem se o artigo não for encontrado
        document.getElementById('artigo').innerHTML = '<p>Artigo não encontrado.</p>';
      }
    })
    .catch(error => console.error('Ocorreu um erro ao carregar os dados:', error));

    document.addEventListener("DOMContentLoaded", function() {
      // Endpoint da API de câmbio em relação ao real (BRL)
      const apiUrl = 'https://api.exchangerate-api.com/v4/latest/BRL';
  
      // Selecionando os elementos onde vamos inserir as taxas de câmbio
      const usdRateElement = document.getElementById('usd-rate');
      const eurRateElement = document.getElementById('eur-rate');
  
      // Fazendo a requisição para a API
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              // Acessando os dados das taxas de câmbio
              const usdRate = (1 / data.rates.USD).toFixed(2); // Valor de 1 USD em BRL
              const eurRate = (1 / data.rates.EUR).toFixed(2); // Valor de 1 EUR em BRL
  
              // Atualizando o HTML com os valores em BRL obtidos
              usdRateElement.textContent = usdRate;
              eurRateElement.textContent = eurRate;
          })
          .catch(error => {
              console.error('Erro ao obter as taxas de câmbio:', error);
          });
  });
