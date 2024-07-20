let chatDiv;
//const ip = 'http://localhost:9233';
const ip = 'https://vps.patrykduda.com:21330';
const afterLoad = async () => {
    chatDiv = document.getElementById("chat");
    getData()
    setInterval(getData, 5000);
}

async function getData() {
    fetch(ip)
        .then((res) => {
            res.text().then((data) => {
                let bettData = data.split(']')[0];
                bettData = bettData.substring(0, bettData.length-1);
                bettData += "]}";
                console.log(JSON.parse(bettData));
                chatDiv.innerHTML = "";
                JSON.parse(bettData).messages.forEach(line => {
                    chatDiv.innerHTML += "<h3>" + line.author + "</h3>";
                    chatDiv.innerHTML += line.message + "<br>";
                })
            })
        })
}

function send() {
    const nick = document.getElementById("author").value;
    const message = document.getElementById("message").value;
    if (!nick || !message) return;
    fetch(ip, {
        body: JSON.stringify({author: nick, message: message}),
        method: "POST",
    })
        .then((res) => {

        });
}
