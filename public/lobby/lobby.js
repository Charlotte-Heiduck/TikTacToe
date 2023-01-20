let button = document.getElementById("button");

button.addEventListener("click", () => {
    console.log("button: clicked");

    const socket = new WebSocket("ws://localhost:3000/lobby");
    socket.addEventListener("open", (event) => {
        console.log("socket now open");
    });
    socket.addEventListener("message", (event) => {
        console.log("Message from server ", event.data);
        JSON.parse(event.data);
        const gameinfo = JSON.parse(event.data);
        const url = "/playfield/"+gameinfo.gameId+"/"+gameinfo.player;
        location.href = url;
    });

    console.log("socket: ", WebSocket.readyState)
})

