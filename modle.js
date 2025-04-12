
      let classifier;
      let video;
      let label = "Waiting...";
      let modelURL = 'https://teachablemachine.withgoogle.com/models/F3wjP2yOV/';

      function preload() {
        classifier = ml5.imageClassifier(modelURL + 'model.json');
      }

      function setup() {
        createCanvas(640, 480);
        video = createCapture(VIDEO);
        video.hide();
        classifyVideo();
      }

      function classifyVideo() {
        classifier.classify(video, gotResult);
      }

      function draw() {
        background(0);
        image(video, 0, 0);
        fill(255);
        textSize(32);
        textAlign(CENTER);
        text(label, width / 2, height - 16);

        // Emoji response
        let emoji = "❓";
        if (label === "Smile") {
          emoji = "😊";
        } else if (label === "Neutral") {
          emoji = "😐";
        }
        textSize(64);
        text(emoji, width / 2, 40);
      }

      function gotResult(error, results) {
        if (error) {
          console.error(error);
          return;
        }
        label = results[0].label;
        classifyVideo(); // Keep classifying
      }
    
