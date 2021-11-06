objects = [];
status = "";

function preload(){
  video = createVideo('video1.mp4');
}
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
  image(video, 0, 0, 500, 450); 
  
      if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Objects Detected";
          document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
          stroke("red");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 2, objects[i].y + 10);
            noFill();
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          
          var synth = window.speechSynthesis;
          speak_data = objects[i].label;
          //use the SpeechSynthesisUtterance function and pass "speak_data" variable which holds the object name to this function to convert text to speech and store it in variable "utterThis" 
          //then use "speak()" function and pass "utterThis" variable as it holds the text-to-speech value so that it reads out the object name provided

          
        
        }
        
      }
      
}


function setup() {
  canvas = createCanvas(500, 450);
  video.hide();
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function stop(){
  video.stop();
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  video.loop();
  video.speed(3);
  video.volume(0);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

