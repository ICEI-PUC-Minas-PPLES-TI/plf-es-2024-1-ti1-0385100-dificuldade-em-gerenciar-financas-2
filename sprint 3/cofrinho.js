function adicionarSaldo(){
    const nome = prompt("Qual o nome")
    const valor = prompt("qual o valor")
    
fetch("http://localhost:3000/entradas",{
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
  fetch('http://localhost:3000/entradas')
  .then(response => response.json())
  .then(data => {
      const postList = document.getElementById('saldo-list');
      postList.innerHTML = '';
      let total_entradas = 0; // Inicializa a variável total

      data.forEach(post => {
          const listItem = document.createElement('li');
          listItem.textContent = `${post.descricao}: R$${post.valor}`;
          listItem.dataset.id = post.id; // Armazena o id do post no dataset
          listItem.onclick = () => listItem.classList.toggle('selected');
          postList.appendChild(listItem);  // Anexa cada item de lista à lista de posts

          total_entradas += parseInt(post.valor);
      });
  })
  .catch(error => console.error('Erro ao buscar posts:', error));
}

function removerSaldo() {
  const postList = document.getElementById('saldo-list'); 
const selectedItems = postList.querySelectorAll('.selected');
selectedItems.forEach(item => {
    const postId = item.dataset.id;
    fetch(`http://localhost:3000/entradas/${postId}`, {
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
      fetch(`http://localhost:3000/entradas/${postId}`, {
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
    

// Call the function to load posts when the page loads
loadPosts();

function calcularSaldoLiquido() {
  fetch('http://localhost:3000/entradas')
  .then(response => response.json())
  .then(saldoData => {
      // Calcula o total de entradas
      let total_entradas = saldoData.reduce((acc, post) => acc + parseInt(post.valor), 0);

      fetch('http://localhost:3000/gastos')
      .then(response => response.json())
      .then(gastosData => {
          // Calcula o total de saídas
          let total_saidas = gastosData.reduce((acc, post) => acc + parseInt(post.valor), 0);

          // Calcula o saldo líquido
          let total_liquido = total_entradas - total_saidas;
          
          console.log("Total de Entradas:", total_entradas);
          console.log("Total de Saídas:", total_saidas);
          console.log("Saldo Líquido:", total_liquido);
      })
      .catch(error => console.error('Erro ao buscar gastos:', error));
  })
  .catch(error => console.error('Erro ao buscar saldo:', error));
}

// Chamando a função para calcular o saldo líquido
calcularSaldoLiquido();