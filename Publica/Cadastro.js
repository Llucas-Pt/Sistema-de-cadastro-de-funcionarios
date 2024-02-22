const funcionario = document.getElementById("funcionarios")
const Cadastrar = document.getElementById('submit')
const limpar = document.getElementById("BTLimpar")
const url = 'http://localhost:3000/Cadastrotb'



document.getElementById('Telefone').addEventListener('input', function(e) {
    let valor = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    valor = valor.substring(0, 11); // Limita a 11 dígitos
    //Expressões regulares
    // Aplica a formatação (XX)XXXXX-XXXX
    valor = valor.replace(/^(\d{2})(\d{0,5})(\d{0,4}).*/, '($1)$2-$3').replace(/-$/, '');

    e.target.value = valor;
    
});

limpar.addEventListener('click', () => {
    document.querySelectorAll("input").forEach (input => {input.value = ""})
} )



/* Neste Evento será realizado a criação do castro do funcionário */
document.getElementById("forme").addEventListener("submit",  (e) => {
e.preventDefault()

const nome = document.querySelector('[id="Nome"]').value;
const sobrenome = document.querySelector('[id="Sobrenome"]').value;
const email = document.querySelector('[id="Email"]').value;
const tel = document.querySelector('[id="Telefone"]').value.replace(/\D/g, '');
const cargo = document.querySelector('[id="Cargo"]').value;
const data = document.querySelector('[id="Data"]').value;


/* POST  */
if(nome && sobrenome && cargo && tel && data && email != "" ) {
fetch(url, {
    method: 'POST',
    //Campo para indicar que corpo  da requsição esta em formato JSON.
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
        Nome: nome, 
        Sobrenome: sobrenome, 
        Cargo: cargo, 
        Email: email, 
        Telefone: tel, 
        DataNascimento: data 
    })

}) 

// Neste The deverá ser retornando um resposta commun para o cliente
.then(response => response.json())
.then(data => {
 document.querySelectorAll("input").forEach (input => {input.value = ""})
 console.log('Sucesso:', data);
 console.log(data.id)

const div = document.createElement('div')
const spanNome = document.createElement('span')
const spanSobre = document.createElement('span')
const spanCargo = document.createElement('span')
const spanEmail = document.createElement('span')
const spanTele = document.createElement('span')
const spanFunc = document.createElement('span')
const spanEdit = document.createElement('span')
const spanLixo = document.createElement('span')

spanFunc.innerHTML = '<img id="spanFunc" src="icones/do-utilizador.png" width="15px" height="15px"">'
spanNome.innerHTML = nome
spanSobre.innerHTML = sobrenome + "  |  "
spanCargo.innerHTML =  cargo + "  |  "
spanEmail.innerHTML = email + "  |  "
spanTele.innerHTML = tel.replace(/^(\d{2})(\d{0,5})(\d{0,4}).*/, '($1)$2-$3').replace(/-$/, '')
spanLixo.innerHTML = '<button class="lixo" data-id="' + data.id + '"><img src="icones/lixo.png" width="15px" height="15px"></button>';
div.setAttribute('data-id', data.id);

spanEdit.innerHTML = '<button class="edit" data-nome="' + data.Nome + 
                     '" data-sobrenome="' + data.Sobrenome + 
                     '" data-cargo="' + data.Cargo + 
                     '" data-email="' + data.Email + 
                     '" data-telefone="' + data.Telefone + 
                     '" data-data="' + data.DataNascimento + '"><img src="icones/editar.png" width="15px" height="15px""> </button>';


div.appendChild(spanFunc)
div.appendChild(spanNome)
div.appendChild(spanSobre)
div.appendChild(spanCargo)
div.appendChild(spanEmail)
div.appendChild(spanTele)
div.appendChild(spanEdit)
div.appendChild(spanLixo)
funcionario.appendChild(div)










/*DELETE*/
// Este evento irá realizar o procedimento de exclusão do novo funcionário cadastrado 
function deleteItem(id) {
    fetch(`http://localhost:3000/Cadastrotb/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao deletar o item');
        }
        console.log('Item deletado com sucesso');
        // Remove o elemento do DOM aqui, se necessário
        const divParaRemover = document.querySelector(`div[data-id="${id}"]`);
        if (divParaRemover) {
            funcionario.removeChild(divParaRemover);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

document.addEventListener('click', function(event) {
    if (event.target.closest('.lixo')) {
        const id = event.target.closest('.lixo').getAttribute('data-id');
        deleteItem(id);
    }
})






/* --------------------------------- */

//PUT
function Editor(id) {

spanNome.innerHTML = ""
spanCargo.innerHTML = ""
spanEmail.innerHTML = ""
spanSobre.innerHTML = ""
spanTele.innerHTML = ""
spanEdit.innerHTML = ""

const inputNome  = document.createElement('input')
const inputSobre  = document.createElement('input')
const inputCargo  = document.createElement('input')
const inputTele  = document.createElement('input')
const inputEmail  = document.createElement('input')
const spanEditUpdate = document.createElement('span')


inputNome.setAttribute("type", "text", );
inputNome.setAttribute("placeholder","Nome");
inputSobre.setAttribute("type", "text");
inputSobre.setAttribute("placeholder","Sobrenome");
inputCargo.setAttribute("type", "text");
inputCargo.setAttribute("placeholder","Cargo");
inputTele.setAttribute("type", "tel");
inputTele.setAttribute("placeholder","(xx)xxxxx-xxxx");
inputEmail.setAttribute("type", "email");
inputEmail.setAttribute("placeholder","Email");
spanEditUpdate.innerHTML = '<button class="edit" data-nome="' + data.Nome + 
'" data-sobrenome="' + data.Sobrenome + 
'" data-cargo="' + data.Cargo + 
'" data-email="' + data.Email + 
'" data-telefone="' + data.Telefone + 
'" data-data="' + data.DataNascimento + '"><img src="icones/refrescar.png" width="15px" height="15px""> </button>';

spanNome.appendChild(inputNome) 
spanSobre.appendChild(inputSobre) 
spanCargo.appendChild(inputCargo) 
spanTele.appendChild(inputTele) 
spanEmail.appendChild(inputEmail) 
spanEdit.appendChild(spanEditUpdate) 

//console.log("test" + data.id)

spanEditUpdate.addEventListener('click', () => {
    // Coletar valores dos inputs
    const nome = inputNome.value;
    const sobrenome = inputSobre.value;
    const cargo = inputCargo.value;
    const email = inputEmail.value;
    const tel = inputTele.value.replace(/\D/g, '');; // Remover caracteres não numéricos
    const edit =  '<button class="edit" data-nome="' + data.Nome + 
    '" data-sobrenome="' + data.Sobrenome + 
    '" data-cargo="' + data.Cargo + 
    '" data-email="' + data.Email + 
    '" data-telefone="' + data.Telefone + 
    '" data-data="' + data.DataNascimento + '"><img src="icones/editar.png" width="15px" height="15px""> </button>';



    const PutRequire = {
        method: 'PUT',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            Nome: nome, 
            Sobrenome: sobrenome, 
            Cargo: cargo, 
            Email: email, 
            Telefone: tel, 
        })
    };

    // Certifique-se de que `url` inclua o `id` do recurso para atualizar
    fetch(`http://localhost:3000/Cadastrotb/${data.id}`, PutRequire)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha na atualização');
            }
            return response.json();
    })
    .then(data => {
        if(nome && sobrenome && cargo && tel && data && email != "" ) {
        console.log('Sucesso:', data);

spanNome.innerHTML = nome 
spanSobre.innerHTML = sobrenome + " | "
spanCargo.innerHTML = cargo +  " | "
spanEmail.innerHTML = email+  " | "
spanTele.innerHTML = tel.replace(/^(\d{2})(\d{0,5})(\d{0,4}).*/, '($1)$2-$3').replace(/-$/, '')
spanEdit.innerHTML =  edit

        }
else {
        alert("Preencha todos os campos")
    }
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
});
}



document.addEventListener('click', function(ev) {
    if(ev.target.closest('.edit')){
        const id = ev.target.closest('.edit').getAttribute('data-id');
        Editor(id);
    }
})

//then
})

.catch((error) => {
    console.error('Erro:', error);
});

//if
}

else {
    alert("Preencha todos os campos")
}

});





