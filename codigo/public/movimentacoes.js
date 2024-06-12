const urlMovimentacoes = '/movimentacoes';

function limparCampos(){
    document.getElementById("campoValor").value = "";
    document.getElementById("campoCategoria").value = "";
}

function adicionarMovimentacao(){
    event.preventDefault();

    let valor = document.getElementById('campoValor').value;
    let categoria = document.getElementById('campoCategoria').value;
    let data = document.getElementById('dataInput').value;
    let dataArr = data.split("-");

    fetch(urlMovimentacoes, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            valor: valor,
            descricao: categoria,
            data: {
                dia: dataArr[2],
                mes: dataArr[1],
                ano: dataArr[0]
            }
        })
    })
    .then(carregarMovimentacoes())
    .catch(error => console.error("Erro ao adicionar movimentação: " + error));
}

function exibirMovimentacoes(movimentacoes){
    const tabela = document.getElementById('corpoTabela');
    tabela.innerHTML = '';

    movimentacoes.forEach(movimentacao => {
        tabela.innerHTML += `
            <tr class="table">
                <td>${movimentacao.id}</td>
                <td>${movimentacao.data.dia}/${movimentacao.data.mes}/${movimentacao.data.ano}</td>
                <td>R$ ${movimentacao.valor}</td>
                <td>${movimentacao.descricao}</td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="excluirMovimentacao('${movimentacao.id}')">Excluir</button>
                </td>
            </tr>`;
    });
}

function carregarMovimentacoes(){
    fetch(urlMovimentacoes)
        .then(function (response) { return response.json() })
        .then(function (dados) {
            exibirMovimentacoes(dados);
        })
        .catch(error => console.error("Erro ao obter dados das movimentações do servidor: " + error));
}

function alterarMovimentacao() {
    event.preventDefault();

    let id = document.getElementById('campoAlterarID').value;
    let valor = document.getElementById('campoAlterarValor').value;
    let categoria = document.getElementById('campoAlterarCategoria').value;
    let data = document.getElementById('alterarDataInput').value;
    let dataArr = data.split("-");

    fetch(urlMovimentacoes + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            valor: valor,
            descricao: categoria,
            data: {
                dia: dataArr[2],
                mes: dataArr[1],
                ano: dataArr[0]
            }
        })
    })
    .then(response => {
        if (response.ok){
            console.log("Movimentação de ID " + id + "criada ou atualizada com sucesso.");
            carregarMovimentacoes();
        }
        else {
            console.error("Falha ao atualizar movimentação de ID " + id +": " + response.statusText)
        }
    })
    .catch(error => console.error("Erro ao atualizar postagem: " + error));
}

function excluirMovimentacao(idMovimentacao) {
    fetch(urlMovimentacoes + '/' + idMovimentacao, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok){
            console.log("Movimentação de ID " + idMovimentacao + " excluída com sucesso.");
            carregarMovimentacoes();
        }
        else {
            console.error("Falha ao excluir movimentação de ID " + idMovimentacao +": " + response.statusText);
        }
    })
    .catch(error => console.error("Erro ao excluir postagem: " + error));
}