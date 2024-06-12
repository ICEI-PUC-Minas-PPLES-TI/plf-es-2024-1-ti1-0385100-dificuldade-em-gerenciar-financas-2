// Faz uma requisição GET para o endpoint /posts e loga a resposta no console
fetch('http://localhost:3000/posts')
  .then(response => response.json())
  .then(data => console.log(data));

// Função para limpar os campos do formulário de nova postagem
function limparCamposNovaPostagem() {
  document.getElementById('tituloPostagem').value = "";
  document.getElementById('autorPostagem').value = "";
  document.getElementById('conteudoPostagem').value = "";
  document.getElementById('categoriaPostagem').value = "";
}

// Função para adicionar uma nova postagem
function adicionaPostagem() {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  // Obtém os valores dos campos do formulário
  let novoTitulo = document.getElementById('tituloPostagem').value;
  let novoAutor = document.getElementById('autorPostagem').value;
  let novoConteudo = document.getElementById('conteudoPostagem').value;
  let novaCategoria = document.getElementById('categoriaPostagem').value;

  limparCamposNovaPostagem();

  // Faz uma requisição POST para adicionar a nova postagem
  fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      titulo: novoTitulo,
      autor: novoAutor,
      conteudo: novoConteudo,
      categoria: novaCategoria
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Post adicionado:', data);
    loadPosts();  // Recarrega a lista de posts para refletir a adição
  })
  .catch(error => console.error('Erro ao adicionar post:', error));
}

// Função para carregar os posts ao carregar a página
function loadPosts() {
  fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(data => {
      const postList = document.getElementById('post-list');
      postList.innerHTML = ''; // Limpa a lista de posts antes de recarregar
      data.forEach(post => {
        const listItem = document.createElement('tr');

        const listItemTitle = document.createElement('td');
        listItemTitle.textContent = `${post.titulo}`;
        listItem.appendChild(listItemTitle);

        const listItemAuthor = document.createElement('td');
        listItemAuthor.textContent = `${post.autor}`;
        listItem.appendChild(listItemAuthor);

        const listItemCategory = document.createElement('td');
        listItemCategory.textContent = `${post.categoria}`;
        listItem.appendChild(listItemCategory);

        const deleteButtonCell = document.createElement('td');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.addEventListener('click', () => deletePost(post.id));
        deleteButtonCell.appendChild(deleteButton);
        listItem.appendChild(deleteButtonCell);

        const listItemId = document.createElement('td');
        listItemId.textContent = `${post.id}`;
        listItem.appendChild(listItemId);

        postList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Erro ao buscar posts:', error));
}

// Função para deletar um post
function deletePost(postId) {
  fetch(`http://localhost:3000/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      console.log(`Post com ID ${postId} deletado`);
      loadPosts();  // Recarrega a lista de posts para refletir a exclusão
    } else {
      console.error('Erro ao deletar post:', response.statusText);
    }
  })
  .catch(error => console.error('Erro ao deletar post:', error));
}

// Função para atualizar um post existente
function updatePost(event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  // Obtém os valores dos campos do formulário de atualização
  const postId = document.getElementById('update-post-id').value;
  const postTitle = document.getElementById('update-post-title').value;
  const postAuthor = document.getElementById('update-post-author').value;
  const postContent = document.getElementById('update-post-content').value;
  const postCategoria = document.getElementById('NovacategoriaPostagem').value;

  // Faz uma requisição PUT para atualizar a postagem
  fetch(`http://localhost:3000/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: postId,
      titulo: postTitle,
      autor: postAuthor,
      conteudo: postContent,
      categoria: postCategoria
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Post atualizado:', data);
    loadPosts();  // Recarrega a lista de posts para refletir a atualização
  })
  .catch(error => console.error('Erro ao atualizar post:', error));
}

// Adiciona um evento de submissão ao formulário de adição
document.addEventListener('DOMContentLoaded', () => {

  loadPosts(); // Carrega os posts ao carregar a página
  // Obtém o formulário de adição de posts e adiciona o evento de submissão
  //const addForm = document.getElementById('add-post-form');
  //addForm.addEventListener('submit', adicionaPostagem());

  //const editButton = document.getElementById('btnConfirmarEdit');
  //editButton.addEventListener('submit', updatePost());
});
