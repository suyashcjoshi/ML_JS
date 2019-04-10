// Using TensorFlow.js library to take picture from web cam and run it on Mobile Net Model to classiy the image
// Author : Suyash Joshi 2019

function setup() {
  let video = document.getElementById("video");
  let canvas = document.getElementById("canvas");
  let pre = document.getElementById("predictions");
  let model = null;

  async function startCamera() {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();

    setInterval(() => takeSnapshot(), 1000);
  }

  function takeSnapshot() {
    let context = canvas.getContext("2d"),
      width = video.videoWidth,
      height = video.videoHeight;

    if (width && height) {
      // Setup a canvas with the same dimensions as the video.
      canvas.width = width;
      canvas.height = height;

      // Make a copy of the current frame in the video on the canvas.
      context.drawImage(video, 0, 0, width, height);

      classifyImage();
    }
  }

  async function classifyImage() {
    predictions = await model.classify(canvas);
    displayPredictions(predictions);
  }

  function displayPredictions(predictions) {
    let val = "";

    for (prediction of predictions) {
      let perc = (prediction.probability * 100).toFixed(2);
      val += `${perc}% | ${prediction.className}\n`;
      console.log(val);
    }
    pre.innerHTML = val;
  }

  async function main() {
    model = await mobilenet.load();
    await startCamera();
  }
  main();
}

