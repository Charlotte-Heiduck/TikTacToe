let text = document.getElementById("text-feld-besetzt");


class MyBox extends HTMLElement {
    connectedCallback() {
        console.log("connected");
        this.addEventListener("click", this.clicked.bind(this));

        let index = this.getAttribute("index");
        let winnerBoxes = this.getAttribute("winnerBoxes");
        console.log("Boxes EJS: ", winnerBoxes);

        if(winnerBoxes.includes(index)){
            console.log(index, "is included")
            this.style.background =  "#00eeff";
        }
        else{
            console.log(index, "is not included");
        }
    
    }
    clicked() {

        let index = this.getAttribute("index");
        let form = this.closest("form");
        let symbol = this.getAttribute("symbol");
        
        console.log("CLICKED", this);
        console.log("Symbol:", symbol);

            if (symbol == ""){
                if (form.getAttribute("disabled")!= null){
                    return
                }
                text.style.visibility = "hidden";
                let input = form.querySelector("input");
                input.value = index;
                
                form.submit();
            }
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