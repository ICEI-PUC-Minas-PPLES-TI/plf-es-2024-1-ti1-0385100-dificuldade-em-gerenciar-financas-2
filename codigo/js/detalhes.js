const apiKey = 'cq1ftthr01qjh3d5mingcq1ftthr01qjh3d5mio0'; // Substitua 'YOUR_FINNHUB_API_KEY' pela sua chave da API Finnhub

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const symbol = urlParams.get('symbol');
    const name = urlParams.get('name');

    if (symbol && name) {
        document.getElementById('stockName').textContent = name;
        document.getElementById('stockSymbol').textContent = symbol;

        // Carregar dados adicionais a partir do arquivo JSON
        const responseDetails = await fetch('./data/details.json');
        const details = await responseDetails.json();
        const stockDetails = details[symbol];

        if (stockDetails) {
            document.getElementById('description').textContent = stockDetails.description;
            document.getElementById('sector').textContent = stockDetails.sector;
        }

        try {
            const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
            const data = await response.json();

            console.log(`Resposta da API para ${symbol}:`, data); // Imprime a resposta da API para cada símbolo

            if (data) {
                const stockDetailsTableBody = document.querySelector('#stockDetailsTable tbody');
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${data.c}</td>
                    <td>${data.dp}%</td>
                    <td>${data.o}</td>
                    <td>${data.h}</td>
                    <td>${data.l}</td>
                `;
                stockDetailsTableBody.appendChild(row);
            } else {
                console.error('Erro ao recuperar dados para o símbolo:', symbol, 'Resposta da API:', data);
            }
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    } else {
        console.error('Símbolo ou nome da ação não encontrado na URL.');
    }
});

