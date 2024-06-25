function loadData(url, listId) {
    const userId = localStorage.getItem("userId"); // Recupera o userId do Local Storage
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const listElement = document.getElementById(listId);
        listElement.innerHTML = '';

        data
        .filter(item => item.idCliente === userId) // Filtra os itens pelo idCliente
        .forEach(item => {
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


function adicionarMetas() {
    const descricao = prompt("Qual o nome?");
    const valor = prompt("Qual o valor?");
    
    const userId = localStorage.getItem("userId"); // Recupera o userId do Local Storage
    
    fetch("http://localhost:3000/metas", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idCliente: userId,
            descricao: descricao,
            valor: valor
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Meta adicionada:', data);
        loadData('http://localhost:3000/metas', 'metas-list');  // Recarrega a lista de metas para refletir a adição
    })
    .catch(error => console.error('Erro ao adicionar meta:', error));
}

 
function removerMetas() {
    const postList = document.getElementById('metas-list'); 
    const selectedItems = postList.querySelectorAll('.selected');
    selectedItems.forEach(item => {
        const postId = item.dataset.id;
        
        fetch(`http://localhost:3000/metas/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                item.remove(); // Remove item do DOM se a exclusão for bem-sucedida
                loadData('http://localhost:3000/metas', 'metas-list');  // Recarrega a lista de metas para refletir a exclusão
            } else {
                console.error('Erro ao deletar meta:', response.statusText);
            }
        })
        .catch(error => console.error('Erro ao deletar meta:', error));
    });
}


function editarMetas(event) {
    event.preventDefault();

    const novoNome = prompt("Novo nome:");
    const novoValor = prompt("Novo valor:");
    const postList = document.getElementById('metas-list');
    const selectedItems = postList.querySelectorAll('.selected');
    const userId = localStorage.getItem("userId"); // Recupera o userId do Local Storage
    selectedItems.forEach(item => {
        const postId = item.dataset.id;

        fetch(`http://localhost:3000/metas/${postId}`, {
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
                throw new Error('Erro na atualização da meta');
            }
            return response.json();
        })
        .then(data => {
            console.log('Meta atualizada:', data);
            loadData('http://localhost:3000/metas', 'metas-list');  // Recarrega a lista de metas para refletir a atualização
        })
        .catch(error => console.error('Erro ao atualizar meta:', error));
    });
}

// CRUD GASTOS

function adicionarGasto() {
    const nome = prompt("Qual o nome?");
    const valor = prompt("Qual o valor?");
    
    const userId = localStorage.getItem("userId"); // Recupera o userId do Local Storage
    
    fetch("http://localhost:3000/gastos", {
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
        console.log('Gasto adicionado:', data);
        loadData('http://localhost:3000/gastos', 'gastos-list');  // Recarrega a lista de gastos para refletir a adição
    })
    .catch(error => console.error('Erro ao adicionar gasto:', error));
}


function removerGasto() {
    const postList = document.getElementById('gastos-list');
    const selectedItems = postList.querySelectorAll('.selected');
    selectedItems.forEach(item => {
        const postId = item.dataset.id;
        
        fetch(`http://localhost:3000/gastos/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                item.remove(); // Remove item do DOM se a exclusão for bem-sucedida
                loadData('http://localhost:3000/gastos', 'gastos-list');  // Recarrega a lista de gastos para refletir a exclusão
            } else {
                console.error('Erro ao deletar gasto:', response.statusText);
            }
        })
        .catch(error => console.error('Erro ao deletar gasto:', error));
    });
}


function editarGasto(event) {
    event.preventDefault();

    const novoNome = prompt("Novo nome:");
    const novoValor = prompt("Novo valor:");
    const userId = localStorage.getItem("userId"); // Recupera o userId do Local Storage
    const postList = document.getElementById('gastos-list');
    const selectedItems = postList.querySelectorAll('.selected');
    selectedItems.forEach(item => {
        const postId = item.dataset.id;

        fetch(`http://localhost:3000/gastos/${postId}`, {
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
                throw new Error('Erro na atualização do gasto');
            }
            return response.json();
        })
        .then(data => {
            console.log('Gasto atualizado:', data);
            loadData('http://localhost:3000/gastos', 'gastos-list');  // Recarrega a lista de gastos para refletir a atualização
        })
        .catch(error => console.error('Erro ao atualizar gasto:', error));
    });
}



window.onload = () => {
    loadData('http://localhost:3000/entradas', 'saldo-list');  // Carregar as entradas
    loadData('http://localhost:3000/metas', 'metas-list');      // Carregar as metas
    loadData('http://localhost:3000/gastos', 'gastos-list');    // Carregar os gastos
};
