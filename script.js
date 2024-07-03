const container = document.getElementById('container1');
const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const file = document.getElementById('fileupload');
const ctx = canvas.getContext('2d');
let audioSource = null;
let analyser;

file.addEventListener('change', function() {
    const files = this.files;
    const audio1 = document.getElementById('audio1');
    audio1.src = URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play();
    // console.log(audio1);
    const audioctx = new AudioContext();
    if (!audioSource) {
        audioSource = audioctx.createMediaElementSource(audio1);
        analyser = audioctx.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioctx.destination);
    }
    // console.log(audioctx);
    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = canvas.width / bufferLength;
    let barHeight;
    let x = 0;

    document.getElementById('animationSelect').style.display = 'block';

    function animate() {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        console.log(bufferLength);

        const animationType = document.getElementById('animationSelect').value;
        if(animationType==1)
            animate1(bufferLength, x, barWidth/2, barHeight, dataArray);
        else if(animationType==2)
            animate2(bufferLength, x, barWidth, barHeight, dataArray);
        else if(animationType==3)
            animate3(bufferLength, x, barWidth, barHeight, dataArray);
        else if(animationType==4)
            animate4(bufferLength, x, barWidth, barHeight, dataArray);
        else if(animationType==5)
            animate5(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }
    animate();
})


function animate1(bufferLength, x, barWidth, barHeight, dataArray) {
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]*1.3;
        const red = 100;
        const blue = 0;
        const green = 0;
        // console.log(red,blue,green);
        // console.log('\n');
        // ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctx.fillStyle = 'white';
        ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
        // console.log(canvas.width/2);
    }
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]*1.3;
        const red = 100;
        const blue = 0;
        const green = 0;
        // console.log(red,blue,green);
        // console.log('\n');
        // ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctx.fillStyle = 'white';
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }
}

function animate2(bufferLength, x, barWidth, barHeight, dataArray) {
  
}

function animate3(bufferLength, x, barWidth, barHeight, dataArray) {
    
}

function animate4(bufferLength, x, barWidth, barHeight, dataArray) {
   
}

function animate5(bufferLength, x, barWidth, barHeight, dataArray) {
    
}