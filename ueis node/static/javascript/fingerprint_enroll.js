function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const nid = document.getElementById("NID-input");
nid.addEventListener('focus',() => {
    nid.style.border = "0.05em #D9D9D9 solid";
    nid.style.borderLeft = "0.05em white solid";
})

//fingerprint button configurations

const finger_btn = document.getElementById("finput");
const fid = document.getElementById("fid").value

finger_btn.addEventListener('click', async(e) => {
    const prompt = document.getElementById("flabel");
    const nid = document.getElementById("NID-input");
    const ficon = document.getElementById("ficon");
    const finput = document.getElementById("finput");
    e.preventDefault();

    if(nid.value != "")
    {
        const port = new SerialPortHandler(
            { baudRate: 9600},
            () => console.log("Device connected"),
            () => console.log("Device disconnected."),
        )

        const info = await port.open()
        prompt.innerText = "Place your finger on the sensor";
        prompt.style.color = "#0d99ff";

        // avoids the writing before the arduino is up and running
        sleep(1700).then(async () => {
            await port.write("3");
            const id = fid; // fingerprint id
            await port.write(id);

            message = await port.read();
            console.log(message);

            if(message == 3){
                prompt.innerText = "Remove Finger";
                prompt.style.color = "red";
                prompt.style.color = "red";
                finput.style.border = "0.05em red solid";
            }

            var count = 0;
            while(true){

                if(count == 2){
                    await port.close();
                    console.log(message)
                    if(message == 1){
                        prompt.innerText = "enrolled";
                        prompt.style.color = "green";
                        finput.style.border = "0.05em green solid";
                        ficon.setAttribute("src","/static/images/icons8-fingerprint-accepted-48.png");
                    }
                    else if(message == 2){
                        prompt.innerText = "Mismatch Finger";
                        prompt.style.color = "red";
                        finput.style.border = "0.05em red solid";
                        ficon.setAttribute("src","/static/images/icons8-fingerprint-error-48.png");
                    }
                    else{
                        prompt.innerText = "Error"
                        prompt.style.color = "red";
                        finput.style.border = "0.05em red solid";
                        ficon.setAttribute("src","/static/images/icons8-fingerprint-error-48.png");
                    }
                    break;
                }


                message = await port.read();
                console.log(message);
                prompt.innerText = message;

                if(message == 3){
                    prompt.innerText = "Remove Finger";
                    prompt.style.color = "red";
                }
                else if(message == 2){
                    prompt.innerText = "Mismatch Finger";
                    prompt.style.color = "red";
                    finput.style.border = "0.05em red solid";
                }
                else{
                    prompt.style.color = "#0d99ff";
                    finput.style.border = "0.05em #D9D9D9 solid";
                    finput.style.borderLeft = "0.05em white solid";
                }
                sleep(50);
                count++;
            }

        })

    }
    else
    {
        nid.style.border = "red 0.05em solid";
    }
})
