const lista = document.querySelector(".lista");
const adicionar = document.querySelector("#addDebt");

function atualizarDados() {
    fetch("https://provadev.xlab.digital/api/v1/divida?uuid=660bed45-4aba-420b-b7b9-257abe1d896b", { method: "GET" })
    .then(res => {
        res.json().then(val => {
            fetch("https://jsonplaceholder.typicode.com/users", { method: "GET" })
                .then(resultado => {
                    resultado.json().then(valor => {
                        var users = valor;
                        var novoArray = [];
                        for (const divida of val.result) {
                            const nome = users.filter(index => {
                                return index.id == divida.idUsuario;
                            });
                            
                            novoArray.push({
                                nome: nome[0].name,
                                id: divida.idUsuario,
                                preco: divida.valor,
                                data: new Date(divida.criado).toLocaleDateString("pt-BR"),
                                descricao: divida.motivo
                            });
                        }

                        renderizarDados(novoArray);
                    });
                });
        });
    });
}

atualizarDados();

function renderizarDados(data) {
    lista.innerHTML = "";
    for (var objeto of data) {
        lista.innerHTML +=
            `<div class="item">
            <div class="upper-container">
                <p>${XSSaquiNao(objeto.nome)}</p>
                <p>${XSSaquiNao(String(objeto.preco))}</p>
                <p>${XSSaquiNao(objeto.data)}</p>
            </div>
            <div class="lower-container">
                <p>${XSSaquiNao(objeto.descricao)}</p>
                <div class="edit-buttons">
                    <button data-id="${objeto.id}">Editar</button>
                    <button>Excluir</button>
                </div>
            </div>
        </div>`;
    }
}

retornarNomes();

const cliente = document.querySelector("#cliente");

adicionar.addEventListener("click", event => {
    const modal = document.querySelector(".modal-add");
    modal.classList.remove("hidden");
});

function retornarNomes() {
    fetch("https://jsonplaceholder.typicode.com/users", { method: "GET" })
    .then(res => {
        res.json().then(val => {
            for(var indice of val) {
                cliente.innerHTML += `<option value="${indice.id}">${XSSaquiNao(indice.name)}</option>`;
            }
        });
    });
}

function criarDivida() {
    const idUsuario = document.querySelector("#cliente").value;
    const motivo = document.querySelector("#motivo").value;
    const valor = document.querySelector("#valor").value;
    
    const objeto = {
        idUsuario: parseInt(idUsuario),
        motivo: motivo,
        valor: parseFloat(valor)
    };

    console.log(objeto);

    axios.post("https://provadev.xlab.digital/api/v1/divida?uuid=660bed45-4aba-420b-b7b9-257abe1d896b", objeto)
    .then(res => {
        console.log(res);
    });
}

function XSSaquiNao(texto) {
    return texto.replace(/&/g, "&amp").replace(/</g, "&lt").replace(/>/g, "&gt");
}