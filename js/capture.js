$(function() {
  var canvas = $("canvas")[0],
    context = canvas.getContext("2d"),
    video = $("video")[0],
    // basic video recording configuration for the getUserMedia API
    videoConfig = { "video": true },
    // cache our stream so we can stop it later
    videoStream,
    errBack = function(error) {
      console.log("Video capture error: ", error.code); 
    };

  // put video listeners into place and start the stream
  if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia(videoConfig, function(stream) {
      videoStream = stream;
      video.src = stream;
      video.play();
    }, errBack);
  } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia(videoConfig, function(stream){
      videoStream = stream;
      video.src = window.webkitURL.createObjectURL(stream);
      video.play();
    }, errBack);
  }
  else if(navigator.mozGetUserMedia) { // Firefox-prefixed
    navigator.mozGetUserMedia(videoConfig, function(stream){
      videoStream = stream;
      video.src = window.URL.createObjectURL(stream);
      video.play();
    }, errBack);
  }

  $("#snap").on("click", function() {
    // capture a frame to the canvas and stop the stream
    context.drawImage(video, 0, 0, 640, 480);
    videoStream.stop();

    // convert canvas image to dataURL
    var dataURL = canvas.toDataURL("image/jpeg"),

    // lookup DOM elements
      inputWrapper = $('.capture-input'),
      outputWrapper = $('.capture-output'),
      outputImg = outputWrapper.find('img'),
      outputLink = outputWrapper.find('a');

    // setup output
    outputImg.attr('src', dataURL);
    outputLink.attr('href', dataURL);
    outputLink.attr('download', 'capture-' + new Date().toISOString() + '.jpg');

    // show output
    inputWrapper.hide();
    outputWrapper.show();
  });

});
