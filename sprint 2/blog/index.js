fetch('blog.json')
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

    // Adiciona o item à div de conteúdo
    conteudoDiv.appendChild(divItem);
  });
})
.catch(error => console.error('Ocorreu um erro ao carregar os dados:', error));