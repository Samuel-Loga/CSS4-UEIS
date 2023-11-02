function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// scan card button login page
document.getElementById('scan-btn').addEventListener("click", async () => {
  const port = new SerialPortHandler(
      { baudRate: 9600},
      () => console.log("Device connected"),
      () => console.log("Device disconnected."),

  )

  const info = await port.open();

 // avoids the writing before the arduino is up and running
  const cardform = document.getElementById("card-form");
  const cardcode = document.getElementById("card-code");
  const prompt = document.getElementById("card-prompt-text");
  const loader = document.getElementById("card-loader");
  prompt.innerText = "Scanning...";
  loader.removeAttribute("hidden");

  sleep(1700).then(async () => {
      await port.write("2");
      const message = await port.read();
      await port.close();

      cardcode.value = message;
      cardform.submit();

  })

})


