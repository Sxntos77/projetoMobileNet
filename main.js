function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded)
}

function modelLoaded() {
  console.log("calssificação iniciada")
}

function draw() {
image(video, 0,0,300,300)
classifier.classify(video,obterResultado)
}

resultadoAtual = ""

function obterResultado(error,results) {
if(error){
  console.error(error)
} else{
  if((results[0].confidence>0.5) && (resultadoAtual != results[0].label)){
    console.log(results)
    resultadoAtual = results[0].label
    var synth = window.speechSynthesis;
      speakData = 'O objeto detectado é - '+results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speakData);
      synth.speak(utterThis);
      document.getElementById ("resultadoNome").innerHTML = results[0].label
      document.getElementById ("resultadoPrecisao").innerHTML = results[0].confidence.toFixed(2)
  }
}
}