//ENTRANDO NO CHAT
let login;
let user;
let messages = [];
logIn();

function logIn(){
    login = prompt("Olá seja bem-vindo! Qual seu nome?");
    user = {name: login};
    const promiseLogin = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants', user);
    promiseLogin.then(successlogin);
    promiseLogin.catch(logIn)
}

function successlogin(){
    setInterval(logedIn, 5000);
    setInterval(receivemsg, 3000);
}
function logedIn(){
    const promiseLogedIn = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status', user);
}

function receivemsg(){
    const promiseMsg = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages');
    promiseMsg.then(populateChat);
    promiseMsg.catch(failed)
}
//lembrar de tirar
function failed(){
    alert('Gave bad');
}

function populateChat(msgs){
    const ulChat = document.querySelector(".chat-msg");
    messages = msgs.data;
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
    const lastMessage = document.querySelector('.chat-msg li:last-child');
    lastMessage.scrollIntoView();
}

function sendMessage(){
    const sentMessage = document.querySelector(".bottom-bar input").value;
    const messageSent = {
        from: login,
        to: "Todos",
        text: sentMessage,
        type: "message" 
    };
    const promiseSent = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages', messageSent);
    promiseSent.then(receivemsg);    
}

setInterval(receivemsg, 3000);
