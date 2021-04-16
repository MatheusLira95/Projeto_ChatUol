//ENTRANDO NO CHAT
const login = prompt("Olá seja bem-vindo! Qual seu nome?");

const user = {name: login};
console.log(user);
const promiseLogin = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants', user)
promiseLogin.then(successlogin);

function successlogin(response){
    console.log(response)
};

//setInterval(logedIn, 5000);
logedIn();
function logedIn(){
    const promiseLogedIn = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status', user);
    promiseLogedIn.then(successlogin);
    }


//PEDINDO MENSAGENS PARA SERVIDOR
let messages = [];
//{from: "", to: "",text: "",type: ""}
receivemsg();
function receivemsg(){
    const promiseMsg = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages');
    promiseMsg.then(populateChat);
    promiseMsg.catch(failed)
}

function failed(){
    alert('Gave bad');
}

function populateChat(msgs){
    const ulChat = document.querySelector(".chat-msg");
    console.log(msgs.data);
    messages = msgs.data;
    console.log(messages);
    for(let i = 0; i < messages.length; i++ ){
        if(messages[i].type === "message"){
            ulChat.innerHTML += `
            <li class="everyone-msg">
                <span class="hour">(${messages[i].time})</span>
                <strong>${messages[i].from}</strong>
                para 
                <strong>${messages[i].to}: </strong>
                ${messages[i].text}
            </li>
            `;
        } else if(messages[i].type === "status"){
            ulChat.innerHTML += `
            <li class="status-msg">
                <span class="hour">(${messages[i].time})</span> 
                <strong>${messages[i].from}</strong>
                ${messages[i].text}
            </li>
            `;
        }else if(messages[i].type === "private_message" && messages[i].to === login){
            ulChat.innerHTML += `
            <li class="private-msg">
                <span class="hour">(${messages[i].time})</span>
                <strong>${messages[i].from}</strong>
                reservadamente para 
                <strong>${messages[i].to}: </strong>
                ${messages[i].text}
            </li>
            `;  
        }
    }

}

