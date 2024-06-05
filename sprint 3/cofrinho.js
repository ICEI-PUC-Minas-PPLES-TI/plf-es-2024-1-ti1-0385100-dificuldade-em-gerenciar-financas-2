var total_gastos;
var total_entradas;
var total_liquido = total_entradas - total_gastos;


function adicionarSaldo(){
    const nome = prompt("Qual o nome")
    const valor = prompt("qual o valor")
    
fetch("http://localhost:3000/saldo",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      idCliente: null,
        nome: nome,
        valor: valor
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Usuario adicionado', data);
    loadPosts();  // Recarrega a lista de posts para refletir a adição
  })
  .catch(error => console.error('Erro ao adicionar usuario:', error));
}

function loadPosts() {
  fetch('http://localhost:3000/saldo')
  .then(response => response.json())
  .then(data => {
      const postList = document.getElementById('saldo-list');
      postList.innerHTML = '';
      data.forEach(post => {
          const listItem = document.createElement('li');
          listItem.textContent = `${post.nome}: R$${post.valor}`;
          listItem.dataset.id = post.id; // Store the post id in the dataset
          listItem.onclick = () => listItem.classList.toggle('selected');
          postList.appendChild(listItem);  // Append each list item to the post list
      });
  })
  .catch(error => console.error('Erro ao buscar posts:', error));
}

function removerSaldo() {
const selectedItems = postList.querySelectorAll('.selected');
selectedItems.forEach(item => {
    const postId = item.dataset.id;
    // Send DELETE request to the server
    fetch(`http://localhost:3000/saldo/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          }
    })
    .then(response => {
        if (response.ok) {
            item.remove(); // Remove item from the DOM if deletion was successful
            loadPosts();  // Recarrega a lista de posts para refletir a exclusão
        } else {
            console.error('Erro ao deletar o post:', response.statusText);
        }
    })
    .catch(error => console.error('Erro ao deletar o post:', error));
});
}


function editarSaldo(event) {
    event.preventDefault();

    const novoNome = prompt("Novo nome:");
    const novoValor = prompt("Novo valor:");

    const postList = document.getElementById('saldo-list');
    const selectedItems = postList.querySelectorAll('.selected');
    selectedItems.forEach(item => {
      const postId = item.dataset.id;

      console.log(`Atualizando post com ID: ${postId}`);
      fetch(`http://localhost:3000/saldo/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: novoNome,
          valor: novoValor
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na atualização do post');
        }
        return response.json();
      })
      .then(data => {
        console.log('Post atualizado:', data);
        loadPosts();  // Recarrega a lista de posts para refletir a atualização
      })
      .catch(error => console.error('Erro ao atualizar post:', error));
    });
  }
    

// Call the function to load posts when the page loads
loadPosts();

