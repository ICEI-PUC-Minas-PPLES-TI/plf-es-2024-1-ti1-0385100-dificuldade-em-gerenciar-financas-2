const apiKey = 'cq1ftthr01qjh3d5mingcq1ftthr01qjh3d5mio0'; // Substitua 'YOUR_FINNHUB_API_KEY' pela sua chave da API Finnhub

async function fetchStockData() {
    const stockTableBody = document.querySelector('#stockTable tbody');
    stockTableBody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

    // Carregar os dados das ações a partir do arquivo JSON
    const response = await fetch('./data/stocks.json');
    const stocks = await response.json();

    for (const stock of stocks) {
        try {
            const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${apiKey}`);
            const data = await response.json();

            console.log(`Resposta da API para ${stock.symbol}:`, data); // Imprime a resposta da API para cada símbolo

            if (data && data.c !== null && data.d !== null && data.dp !== null) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><a href="detalhes.html?symbol=${stock.symbol}&name=${stock.name}">${stock.name}</a></td>
                    <td>${stock.symbol}</td>
                    <td>${data.c}</td>
                    <td>${data.dp}%</td>
                `;
                stockTableBody.appendChild(row);
            } else {
                console.error('Erro ao recuperar dados para o símbolo:', stock.symbol, 'Resposta da API:', data);
            }
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', fetchStockData);

