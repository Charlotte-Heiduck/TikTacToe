// text for the "already occupied" message (see line 35)
let text = document.getElementById("text-feld-besetzt");

class MyBox extends HTMLElement {
    connectedCallback() {
        console.log("connected");
        this.addEventListener("click", this.clicked.bind(this));
    }
    clicked() {
    // updates the box when clicked on

        let index = this.getAttribute("index");
        let form = this.closest("form");
        let symbol = this.getAttribute("symbol");
        
        console.log("CLICKED", this);
        console.log("Symbol:", symbol);

            // checks wether the box is already occupied
            if (symbol == ""){
                // checks if its the players turn
                if (form.getAttribute("disabled")!= null){
                    return
                }
                // hides the "already occupied reminder" if triggered
                text.style.visibility = "hidden";
            
                // changes the index
                let input = form.querySelector("input");
                input.value = index;
                
                // submits the class to be pushed
                form.submit();
            }
            // gives the player feedback that the box they chose is occupied ("already occupied" message)
            else{
                console.log("filled");
                text.style.visibility = "visible";
            }
    }
}

window.customElements.define("my-box", MyBox);

function connectWs (){
    console.log("conecting websocket");

    const socket = new WebSocket("ws://"+location.host+location.pathname);
    socket.addEventListener("open", (event) => {
        console.log("socket now open");
    });
    socket.addEventListener("message", (event) => {
        console.log("Message from server ", event.data);
        location = location.href;
    });

    console.log("socket: ", WebSocket.readyState)
}
connectWs();