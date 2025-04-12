let classifier;
let video;
let label = "Waiting...";
let modelURL = 'https://teachablemachine.withgoogle.com/models/F3wjP2yOV/';
let emoji = "";
let displayLabel = "";
let videoReady = false;

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, () => {
    videoReady = true;
  });
  video.hide();
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video, gotResult);
}

function draw() {
  background(0);

  if (!videoReady) {
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Waiting for camera access...", width / 2, height / 2);
    return;
  }

  image(video, 0, 0);

  if (label === "Smile") {
    emoji = "😊";
    displayLabel = "Smile";
  } else if (label === "Neutral") {
    emoji = "😐";
    displayLabel = "Neutral";
  } else if (label === "Uncertain") {
    emoji = "😶";
    displayLabel = "Uncertain";
  } else {
    emoji = "❓";
    displayLabel = label;
  }

  fill(255);
  textSize(32);
  textAlign(CENTER);
  text(displayLabel, width / 2, height - 16);

  textSize(64);
  text(emoji, width / 2, 50);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  console.log(results); 
  label = results[0].label;

  classifyVideo(); 
}