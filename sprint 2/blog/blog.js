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