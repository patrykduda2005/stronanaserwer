let chatDiv;
const afterLoad = async () => {
    chatDiv = document.getElementById("chat");
    getData()

}

async function getData() {
    fetch('http://144.76.97.102:21330')
        .then((res) => {
            res.text().then((data) => {
                let bettData = data.split(']')[0];
                bettData = bettData.substring(0, bettData.length-1);
                bettData += "]}";
                console.log(JSON.parse(bettData));
                JSON.parse(bettData).messages.forEach(line => {
                    chatDiv.innerHTML += "<h3>" + line.author + "</h3>";
                    chatDiv.innerHTML += line.message + "<br>";
                })
            })
        })

}
