const container = document.getElementById('container1');
const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const file = document.getElementById('fileupload');
const ctx = canvas.getContext('2d');
let audioSource = null;
let analyser;

// container.addEventListener('click',function(){   
//     if(!audioSource) {
//         audioSource = audioctx.createMediaElementSource(audio1);
//         analyser = audioctx.createAnalyser();
//         audioSource.connect(analyser);
//         analyser.connect(audioctx.destination);
//     }
//     console.log(audioctx);
//     analyser.fftSize = 64;
//     const bufferLength = analyser.frequencyBinCount;
//     const dataArray = new Uint8Array(bufferLength);
//     const barWidth = canvas.width/bufferLength;
//     let barHeight;
//     let x = 0;
     
    
//     function animate(){
//         x = 0;
//         ctx.clearRect(0,0,canvas.width,canvas.height);
//         analyser.getByteFrequencyData(dataArray);
//         console.log(bufferLength);
//         draw(bufferLength, x, barWidth, barHeight, dataArray)
//         requestAnimationFrame(animate);
//     }
//     animate();
// }); 

file.addEventListener('change',function(){
    const files = this.files;
    const audio1 = document.getElementById('audio1');
    audio1.src = URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play();
    console.log(audio1);
    const audioctx = new AudioContext();
    if(!audioSource) {
        audioSource = audioctx.createMediaElementSource(audio1);
        analyser = audioctx.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioctx.destination);
    }
    console.log(audioctx);
    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = canvas.width/bufferLength;
    let barHeight;
    let x = 0;     
    
    function animate(){
        x = 0;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        analyser.getByteFrequencyData(dataArray);
        console.log(bufferLength);
        draw(bufferLength, x, barWidth, barHeight, dataArray)
        requestAnimationFrame(animate);
    }
    animate();
})

function draw(bufferLength, x, barWidth, barHeight, dataArray) {
     for(let i  = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            ctx.fillStyle = 'white';
            ctx.fillRect(x,canvas.height - barHeight,barWidth,barHeight);
            x += barWidth;
     }
}