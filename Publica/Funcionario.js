
window.addEventListener('load', () => {

const corpo = document.getElementById('cadastro')

    // Exemplo de como você poderia capturar valores de inputs, se necessário
    // const nome = document.getElementById('nomeInput').value;

    // Construindo a URL com parâmetros de consulta
    const url = new URL('http://localhost:3000/Cadastrotb');
    // Exemplo de como adicionar parâmetros à URL
    // url.searchParams.append('Nome', nome);

    fetch(url)
        .then(response => response.json())
        .then(data => {
 // Limpa o conteúdo anterior
 corpo.innerHTML = '';

 // Verifica se 'data' é um array e itera sobre ele
 if (Array.isArray(data)) {
    data.forEach(item => {
        const paragrafo = document.createElement('p');
        paragrafo.textContent = `Nome: ${item.Nome}, Sobrenome: ${item.Sobrenome}, Cargo: ${item.Cargo}, Email: ${item.Email}, Telefone: ${item.Telefone}`;
        corpo.appendChild(paragrafo);
    });
} else {
    // Se 'data' não for um array, cria um elemento para exibir os dados diretamente
    const paragrafo = document.createElement('p');
    paragrafo.textContent = `Nome: ${data.Nome}, Sobrenome: ${data.Sobrenome}, Cargo: ${data.Cargo}, Email: ${data.Email}, Telefone: ${data.Telefone}`;
    corpo.appendChild(paragrafo);
}

        })
        .catch((error) => {
            console.error('Erro:', error);
        });

});






















/*
const funcionario = document.getElementById("FuncGet")

funcionario.addEventListener('click', () => {

 
const dados = {
    Nome: Nome, 
    Sobrenome: Sobrenome, 
    Cargo: Cargo, 
    Email: Email, 
    Telefone: Telefone, 
    DataNascimento: DataNascimento 
}

const RequireGET = {
    
        method : 'GET',
        headers : {'Content-type': 'application/json'},
        body: JSON.stringify ({
                dados
        })

    }

    fetch('http://localhost:3000/Cadastrotb', RequireGET)
        .then(response => response.json())
        .then(data => {
         document.querySelectorAll("input").forEach (input => {input.value = ""})
         console.log('Sucesso:', data);
        })
        .catch((error) => {
        console.error('Erro:', error);
});

});
*/
