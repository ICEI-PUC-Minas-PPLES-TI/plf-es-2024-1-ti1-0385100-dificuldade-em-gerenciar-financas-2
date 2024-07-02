document.addEventListener("DOMContentLoaded", () => {
  // Recuperando o userId do Local Storage
  const userId = localStorage.getItem("userId");
  if (userId) {
    console.log("ID do usuário logado:", userId);
    // Use o userId conforme necessário
  } else {
    console.log("Nenhum usuário logado encontrado.");
  }
});

function adicionarSaldo() {
  const nome = prompt("Qual o nome?");
  const valor = prompt("Qual o valor?");
  
  const userId = localStorage.getItem("userId"); // Recupera o userId do Local Storage
  
  fetch("https://json-vercel-five.vercel.app/entradas", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          idCliente: userId,
          descricao: nome,
          valor: valor
      })
  })
  .then(response => response.json())
  .then(data => {
      console.log('Entrada de saldo adicionada:', data);
      loadPosts();  // Recarrega a lista de entradas para refletir a adição
  })
  .catch(error => console.error('Erro ao adicionar entrada de saldo:', error));
}

function loadPosts() {
  const userId = localStorage.getItem("userId"); // Recupera o userId do Local Storage
  
  fetch('https://json-vercel-five.vercel.app/entradas')
  .then(response => response.json())
  .then(data => {
      const postList = document.getElementById('saldo-list');
      postList.innerHTML = '';
      let total_entradas = 0; // Inicializa a variável total

      data
        .filter(post => post.idCliente === userId) // Filtra as entradas pelo idCliente
        .forEach(post => {
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
            item.remove(); // Remove item do DOM se a exclusão for bem-sucedida
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

  const userId = localStorage.getItem("userId"); // Recupera o userId do Local Storage
  
  const postList = document.getElementById('saldo-list');
  const selectedItems = postList.querySelectorAll('.selected');
  selectedItems.forEach(item => {
      const postId = item.dataset.id;

      fetch(`https://json-vercel-five.vercel.app/entradas/${postId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              idCliente: userId,
              descricao: novoNome,
              valor: novoValor
          })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro na atualização da entrada de saldo');
          }
          return response.json();
      })
      .then(data => {
          console.log('Entrada de saldo atualizada:', data);
          loadPosts();  // Recarrega a lista de entradas para refletir a atualização
      })
      .catch(error => console.error('Erro ao atualizar entrada de saldo:', error));
  });
}

// Call the function to load posts when the page loads
document.addEventListener("DOMContentLoaded", loadPosts);

function calcularSaldoLiquido() {
  const userId = localStorage.getItem("userId"); // Recupera o userId do Local Storage

  fetch('https://json-vercel-five.vercel.app/entradas')
  .then(response => response.json())
  .then(saldoData => {
      // Filtra as entradas pelo idCliente
      let total_entradas = saldoData
        .filter(post => post.idCliente === userId)
        .reduce((acc, post) => acc + parseInt(post.valor), 0);

      fetch('https://json-vercel-five.vercel.app/gastos')
      .then(response => response.json())
      .then(gastosData => {
          // Filtra as saídas pelo idCliente
          let total_saidas = gastosData
            .filter(post => post.idCliente === userId)
            .reduce((acc, post) => acc + parseInt(post.valor), 0);

          // Calcula o saldo líquido
          let total_liquido = total_entradas - total_saidas;
          
          console.log("Total de Entradas:", total_entradas);
          console.log("Total de Saídas:", total_saidas);
          console.log("Saldo Líquido:", total_liquido);
          document.getElementById("saldo").innerHTML = ("R$:" + total_liquido);

          if (total_liquido < 0) {
            document.getElementById("saldo").style.color = "rgb(255, 0, 0)";
          } else {
            document.getElementById("saldo").style.color = "rgb(0, 255, 0)";
          }
      })
      .catch(error => console.error('Erro ao buscar gastos:', error));
  })
  .catch(error => console.error('Erro ao buscar saldo:', error));
}

// Chamando a função para calcular o saldo líquido
document.addEventListener("DOMContentLoaded", calcularSaldoLiquido);
