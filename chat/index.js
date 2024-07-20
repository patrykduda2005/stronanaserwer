let chatDiv;
//const ip = 'http://localhost:9233';
const ip = 'https://vps.patrykduda.com:21330';
const afterLoad = async () => {
    chatDiv = document.getElementById("chat");
    getData()
    setInterval(() => {
        if (!document.getElementById("refresh").checked) return;
        getData();
    }, 5000);
    document.getElementById("message").addEventListener('keypress', e => {
        if (e.key == "Enter") {
            e.preventDefault();
            send();
        }

    });
}

async function getData() {
    fetch(ip)
        .then((res) => {
            res.text().then((data) => {
                chatDiv.innerHTML = "";
                data.split("\n").forEach(mess => {
                    const split_mess = mess.split("~");
                    chatDiv.innerHTML += "<h2>" + split_mess[1] + "</h2>" + "<p>" + split_mess[2] + "</p>" + "<br>";
                })
            })
        })
}

function send() {
    const nick = document.getElementById("author").value;
    const message = document.getElementById("message").value;
    if (!nick || !message) return;
    fetch(ip, {
        body: "~" + nick + "~" + message,
        method: "POST",
    })
        .then((res) => {
            document.getElementById("message").value = "";
        });
}

