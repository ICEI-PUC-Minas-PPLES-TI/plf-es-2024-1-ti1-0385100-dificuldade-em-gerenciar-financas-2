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
    loadPosts();  // Recarrega a lista de posts para refletir a adição
  })
  .catch(error => console.error('Erro ao adicionar usuario:', error));
}
