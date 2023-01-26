// Timer
class MyTimer extends HTMLElement {
    connectedCallback(){
        console.log("timer started");
        this.startTime = Date.now();
        this.timerMax = parseInt(this.getAttribute("time-max"));

        //updates the timer every 100 miliseconds
        setInterval(this.writeTime.bind(this), 100);
    }
    writeTime(){
        
        let countTime = Date.now();
        // difference between current and last saved time
        let deltaTime = countTime - this.startTime;
        // saves the difference and subtracts that from the max timer while coverting from ms to s
        let remainingTime = this.timerMax - deltaTime / 1000;
    
        // prints and shows the time
        if(remainingTime > 0){
            //console.log("time: ", Math.floor(remainingTime));
            this.innerHTML = `${Math.floor(remainingTime)} seconds left!`;
        }
        else{
            let form = document.getElementById("form");
            form.setAttribute("disabled", "");
            form.set

            remainingTime = 0;
            this.innerHTML = "Timeout!";
        }
    
    }
}
window.customElements.define("my-timer", MyTimer);




