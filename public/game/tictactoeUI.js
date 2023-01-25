
class MyTimer extends HTMLElement {
    connectedCallback(){
        console.log("timer started");
        this.startTime = Date.now();
        this.timerMax = parseInt(this.getAttribute("time-max"));

        //updates the timer every 100 seconds
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
            remainingTime = 0;
            this.innerHTML = "No time left";
        }
    
    }
    
    
}

window.customElements.define("my-timer", MyTimer);




