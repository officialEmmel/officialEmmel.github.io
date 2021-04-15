var myCanvas = document.createElement('canvas');
function burst()
{
    myCanvas.width = document.body.clientWidth; //document.width is obsolete
    myCanvas.height = document.body.clientHeight; //document.height is obsolete
    myCanvas.style.position = 'absolute';
    myCanvas.style.top = '0'
    myCanvas.style.bottom = '0'
    myCanvas.id = "confetti_canvas"
    document.getElementById("canvas_con").appendChild(myCanvas);
    var myConfetti = confetti.create(myCanvas, {
    resize: true,
    useWorker: true
    });
    
    myConfetti({
      particleCount: 200,
      spread: 160
      // any other options from the global
      // confetti function
    });
    setTimeout(function () {setListener()}, 1000)
}

function setListener()
{
    document.body.addEventListener("click", () => {
        myCanvas.remove()
        solutionPage()
    })
}
