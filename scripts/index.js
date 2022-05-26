const imagemPerfil = document.getElementById("foto-perfil")
const nomeTexto = document.getElementById("nome")
const bioTexto = document.getElementById("bio")









function exemploUsoCallback(prop, cb) {
    console.log("exemploUsoCallback", typeof prop, prop)
    console.log("exemploUsoCallback", cb)
    if (typeof cb == "function") {
        cb(undefined, prop)
    }
}

exemploUsoCallback(57, (erro, resultado) => {
    if (erro) {
        console.log("erro", erro)
        return;
    }
    console.log("resultado", resultado)
})

function buscarDados(numero, deuCerto) {
    return new Promise((resolve, reject) => {
        console.log("antes", numero)
        if (deuCerto) {
            return setTimeout(() => {
                return resolve("Resultado" + numero);
            }, 3000);
        }
        if (!deuCerto) {
            return setTimeout(() => {
                return reject(new Error("a variavel 'deuCerto' veio como false"));
            }, 3000);
        }
        console.log("depois", numero);
    });
}


let resultadoBusca = buscarDados(5, true);

// resultadoBusca.catch((erro) => {
//     console.log("primeiro catch", erro);
//     throw erro;
//     return erro;
// }).then((resultado) => {
//     console.log("resultado.then", resultado);
//     return resultado + " " + 5732;
// }).then((resultado) => {
//     console.log("resultado2.then", resultado);
// }).catch((erro) => {
//     console.log("resultado.catch", erro);
// }).finally(() => {
//     console.log("executou o finally");
// })

resultadoBusca.then((resultado) => {
    console.log("resultado.then", resultado);
}).catch((erro) => {
    console.log("resultado.catch", erro);
})

console.log(typeof resultadoBusca, resultadoBusca)
console.log("oi")




// USANDO FETCH

// fetch(url, configurações)
// url = local para onde fazemos a requisição
// configurações = é um objeto que contem as consfigurações da requisição
// fetch sempre retorna uma promisse

fetch("https://api.github.com/users/raul3963").then((resultado) => {
    if (resultado.ok) {
        resultado.json().then((dados) => {
            console.log("json.then", dados);
            nomeTexto.innerText = dados.name;
            bioTexto.innerText = dados.bio;
            imagemPerfil.src = dados.avatar_url;
        });
    }
}).catch((erro) => {
    console.log("requisição gitHub", erro)
})

fetch("https://api.github.com/users/raul3963/repos").then((resultado) => {
    if (resultado.ok) {
        resultado.json().then((dados) => {
            console.log("json.then", dados);
            dados.forEach(element => {
                console.log(element)
                const nomeRep = element.name;
                const idRep = element.id;
                const urlRep = element.html_url;

                const itemHtml = document.createElement("div");
                document.body.appendChild(itemHtml);
                const itemId = document.createElement("span");
                const itemNome = document.createElement("span");
                const itemUrl = document.createElement("a");

                itemId.classList.add("itemLista");
                itemNome.classList.add("itemLista");
                itemUrl.classList.add("itemLista");
                itemUrl.href = urlRep;
                itemUrl.target = "_blank";
                itemHtml.id = "divLista";

                itemId.innerText = idRep;
                itemNome.innerText = nomeRep;
                itemUrl.innerText = urlRep;

                itemHtml.appendChild(itemId);
                itemHtml.appendChild(itemNome);
                itemHtml.appendChild(itemUrl);
            })
        });
    }
})