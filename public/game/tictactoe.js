class MyBox extends HTMLElement {
    connectedCallback() {
        console.log("connected");
        this.addEventListener("click", this.clicked.bind(this));
    }
    clicked() {

        let index = this.getAttribute("index");
        let form = this.closest("form");
        console.log("CLICKED", this);
        console.log("Index: ", index);
        console.log("Form: ", form);
        if (form.getAttribute("disabled")!= null){
            return
        }
        let input = form.querySelector("input");
        input.value = index;
        

        form.submit();
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