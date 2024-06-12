function loadData(url, listId) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
      const listElement = document.getElementById(listId);
      listElement.innerHTML = '';

      data.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = `${item.descricao}: R$${item.valor}`;
          listItem.dataset.id = item.id; // Armazena o ID do item no dataset
          listItem.onclick = () => listItem.classList.toggle('selected');
          listElement.appendChild(listItem); // Adiciona cada item à lista 
      });
  })



  .catch(error => console.error(`Erro ao buscar dados de ${url}:`, error));
}

// Para carregar as metas
loadData('http://localhost:3000/metas', 'metas-list');

// Para carregar os gastos
loadData('http://localhost:3000/gastos', 'gastos-list');


function adicionarMetas(){
    const descricao = prompt("Qual o nome")
    const valor = prompt("qual o valor")
    
fetch("http://localhost:3000/metas",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      idCliente: null,
      descricao: descricao,
        valor: valor
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Meta adicionada', data);
    loadPosts();  // Recarrega a lista de posts para refletir a adição
  })
  .catch(error => console.error('Erro ao adicionar usuario:', error));
}


  

function removerMetas() {
const postList = document.getElementById('metas-list'); 
const selectedItems = postList.querySelectorAll('.selected');
selectedItems.forEach(item => {
    const postId = item.dataset.id;
    // Send DELETE request to the server
    fetch(`http://localhost:3000/metas/${postId}`, {
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


function editarMetas(event) {
    event.preventDefault();

    const novoNome = prompt("Novo nome:");
    const novoValor = prompt("Novo valor:");

    const postList = document.getElementById('metas-list');
    const selectedItems = postList.querySelectorAll('.selected');
    selectedItems.forEach(item => {
      const postId = item.dataset.id;

      console.log(`Atualizando post com ID: ${postId}`);

      fetch(`http://localhost:3000/metas/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          descricao: novoNome,
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
    
// CRUD GASTOS

function adicionarGasto(){
  const nome = prompt("Qual o nome")
  const valor = prompt("qual o valor")
  
fetch("http://localhost:3000/gastos",{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    idCliente: null,
    descricao: nome,
      valor: valor
  })
})
.then(response => response.json())
.then(data => {
  console.log('Usuario adicionado', data);
  loadGastos();  // Recarrega a lista de posts para refletir a adição
})
.catch(error => console.error('Erro ao adicionar usuario:', error));
}


function removerGasto() {
  const postList = document.getElementById('gastos-list');
  const selectedItems = postList.querySelectorAll('.selected');
  selectedItems.forEach(item => {
      const postId = item.dataset.id;
      // Send DELETE request to the server
      fetch(`http://localhost:3000/gastos/${postId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
            }
      })
      .then(response => {
          if (response.ok) {
              item.remove(); // Remove item from the DOM if deletion was successful
              loadGastos();  // Recarrega a lista de posts para refletir a exclusão
          } else {
              console.error('Erro ao deletar o post:', response.statusText);
          }
      })
      .catch(error => console.error('Erro ao deletar o post:', error));
  });
  }

  function editarGasto(event) {
    event.preventDefault();

    const novoNome = prompt("Novo nome:");
    const novoValor = prompt("Novo valor:");

    const postList = document.getElementById('gastos-list');
    const selectedItems = postList.querySelectorAll('.selected');
    selectedItems.forEach(item => {
      const postId = item.dataset.id;

      console.log(`Atualizando post com ID: ${postId}`);

      fetch(`http://localhost:3000/gastos/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          descricao: novoNome,
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
        loadGastos();  // Recarrega a lista de posts para refletir a atualização
      })
      .catch(error => console.error('Erro ao atualizar post:', error));
    });
  }

    

// Call the function to load posts when the page loads
window.onload = loadPosts;


