//ENTRANDO NO CHAT
const login = prompt("Olá seja bem-vindo! Qual seu nome?");

const user = {name: login};
console.log(user);
const promiseLogin = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants', user)
promiseLogin.then(successlogin)

function successlogin(response){
    console.log(response)
}


//PEDINDO MENSAGENS PARA SERVIDOR
const messages = [{from: "", to: "",text: "",type: ""},
];

console.log(messages);