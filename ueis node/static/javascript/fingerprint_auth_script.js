
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

//Login button configurations

const login_btn = document.getElementById('login_btn');
const fingerprint = document.querySelector('.fingerprint');
const success = document.getElementById('fingerPic');
let timer, timerSuccesss;

login_btn.addEventListener('mouseenter',() => {
    const login_btn_pic = document.getElementById('login_btn_pic');
    login_btn_pic.setAttribute('src','/static/images/login_btn_hover.png');
})

login_btn.addEventListener('mouseleave',() => {
    const login_btn_pic = document.getElementById('login_btn_pic');
    login_btn_pic.setAttribute('src','/static/images/login_btn.png');
})

login_btn.addEventListener('click', async(e) => {
    e.preventDefault();
    const port = new SerialPortHandler(
        { baudRate: 9600},
        () => console.log("Device connected"),
        () => console.log("Device disconnected."),

    )

    const info = await port.open()
    const prompt = document.getElementById("prompt");

   // avoids the writing before the arduino is up and running
   sleep(1700).then(async () => {
        await port.write("4");
        prompt.innerText = "Place your finger on the sensor";
        prompt.style.color = "#0d99ff";
        onTouchstart()
        var message = await port.read();
        onTouchEnd()
        console.log(message);
        await port.close();

        id = message;

        if(id == 0){
            prompt.innerText = "Authentication failed";
            prompt.style.color = "red";
            login_btn.removeAttribute('hidden');
        }
        else{
            location.href = `/Auth/login?fid=${id}`;
        }
    });
})

const body = document.getElementsByTagName('body').addEventListener('load',() => {
    login_btn.click()
})

function onTouchstart () {
    fingerprint.classList.add('active');
    timer = setTimeout(onSuccess,2000)
}

function onTouchEnd() {
    fingerprint.classList.remove('active')
    clearTimeout(timer)
}

function onSuccess() {
    body.removeEventListener('mousedown', onTouchstart);
    body.removeEventListener('touchstart', onTouchstart);


    fingerprint.classList.remove('active');
    center.classList.add('success')

    clearTimeout(timerSuccesss);

    timerSuccesss = setTimeout(() => {
        body.addEventListener('mousedown', onTouchstart);
        body.addEventListener('touchstart', onTouchstart);
        center.classList.remove('success')

    },3000);
}



