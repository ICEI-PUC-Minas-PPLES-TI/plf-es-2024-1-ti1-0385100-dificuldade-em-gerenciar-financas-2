function cadastrar() {
    event.preventDefault();

    const novoUsername = document.getElementById('username').value;
    const novaPassword = document.getElementById('password').value;

fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: novoUsername,
      password: novaPassword,

    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Usuario adicionado', data);
    loadPosts();  
  })
  .catch(error => console.error('Erro ao adicionar usuario:', error));

  alert("Cadastrado com sucesso!!!")
}


function fazerlogin(){
  event.preventDefault(); // Evita o envio do formulário
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3000/usuarios')
  .then(response => response.json())
  .then(users => {
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem('userId', user.id);

window.location.href = "cofrinho.html"
    } else {
      alert('Não foi possivel logar');
    }
  })
  .catch(error => console.error('Error fetching the JSON:', error));
};
