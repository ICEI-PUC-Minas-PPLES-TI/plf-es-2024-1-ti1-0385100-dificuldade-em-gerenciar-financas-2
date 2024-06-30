function calcularRetornoInvestimento() {

    // Obter os valores dos campos de entrada
    var valor_investido = document.getElementById("valor_investido").value;
    var deposito_mensal = document.getElementById("deposito_mensal").value;
    var meses_investido = document.getElementById("meses_investidos").value;

    // Verificar se algum dos campos está vazio
    if (valor_investido == "" || meses_investido == "") {
        alert("Por favor, preencha todos os campos.");
    } else {

        if(deposito_mensal == ""){
            deposito_mensal = 0;
        }
        else{
            
        }

        // Converter os valores para números e calcular o total investido
        var valor_total = parseFloat(valor_investido) + (parseFloat(deposito_mensal) * parseFloat(meses_investido));

        // Taxas de rendimento para diferentes opções de investimento
        var poupanca_rendimento = 0.5 / 100;
        var prefixiada_rendimento = 0.6475 / 100;
        var lcilca_rendimento = 0.925 / 100;
        var cdb_rendimento = 0.9158 / 100;
        var ipca_rendimento = 0.848 / 100;
        var selic_rendimento = 0.9708 / 100;

        // Calcular o total para cada opção de investimento
        var total_poupanca = valor_total;
        for (var mes = 0; mes < meses_investido; mes++) {
            total_poupanca *= (1 + poupanca_rendimento);
            total_poupanca += deposito_mensal;
        }

        var total_prefixada = valor_total;
        for (var mes = 0; mes < meses_investido; mes++) {
            total_prefixada *= (1 + prefixiada_rendimento);
            total_prefixada += deposito_mensal;
        }

        var total_lcilca = valor_total;
        for (var mes = 0; mes < meses_investido; mes++) {
            total_lcilca *= (1 + lcilca_rendimento);
            total_lcilca += deposito_mensal;
        }

        var total_cdb = valor_total;
        for (var mes = 0; mes < meses_investido; mes++) {
            total_cdb *= (1 + cdb_rendimento);
            total_cdb += deposito_mensal;
        }

        var total_ipca = valor_total;
        for (var mes = 0; mes < meses_investido; mes++) {
            total_ipca *= (1 + ipca_rendimento);
            total_ipca += deposito_mensal;
        }

        var total_selic = valor_total;
        for (var mes = 0; mes < meses_investido; mes++) {
            total_selic *= (1 + selic_rendimento);
            total_selic += deposito_mensal;
        }

        // Atualizar os elementos HTML com os resultados calculados
        document.getElementById("investido").innerHTML = ("R$" + valor_total.toFixed(2));

        document.getElementById("poupanca").innerHTML = "R$" + parseFloat(total_poupanca).toFixed(2);
        document.getElementById("retornopoupanca").innerHTML = ("R$" + (total_poupanca - valor_total).toFixed(2));

        document.getElementById("prefixada").innerHTML = "R$" + parseFloat(total_prefixada).toFixed(2);
        document.getElementById("retornoprefixada").innerHTML = ("R$" + (total_prefixada - valor_total).toFixed(2));

        document.getElementById("cdb").innerHTML = "R$" + parseFloat(total_cdb).toFixed(2);
        document.getElementById("retornocdb").innerHTML = ("R$" + (total_cdb - valor_total).toFixed(2));

        document.getElementById("lci").innerHTML = "R$" + parseFloat(total_lcilca).toFixed(2);
        document.getElementById("retornolci").innerHTML = ("R$" + (total_lcilca - valor_total).toFixed(2));

        document.getElementById("ipca").innerHTML = "R$" + parseFloat(total_ipca).toFixed(2);
        document.getElementById("retornoipca").innerHTML = ("R$" + (total_ipca - valor_total).toFixed(2));

        document.getElementById("selic").innerHTML = "R$" + parseFloat(total_selic).toFixed(2);
        document.getElementById("retornoselic").innerHTML = ("R$" + (total_selic - valor_total).toFixed(2));

    }
}
