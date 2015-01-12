// Put event listeners into place
$(function() {
  // Grab elements, create settings, etc.
  var canvas = $("canvas")[0],
    context = canvas.getContext("2d"),
    video = $("video")[0],
    videoObj = { "video": true },
    videoStream,
    errBack = function(error) {
      console.log("Video capture error: ", error.code); 
    };

  // Put video listeners into place
  if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia(videoObj, function(stream) {
      videoStream = stream;
      video.src = stream;
      video.play();
    }, errBack);
  } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia(videoObj, function(stream){
      videoStream = stream;
      video.src = window.webkitURL.createObjectURL(stream);
      video.play();
    }, errBack);
  }
  else if(navigator.mozGetUserMedia) { // Firefox-prefixed
    navigator.mozGetUserMedia(videoObj, function(stream){
      videoStream = stream;
      video.src = window.URL.createObjectURL(stream);
      video.play();
    }, errBack);
  }

  $("#snap").on("click", function() {
    context.drawImage(video, 0, 0, 640, 480);
    videoStream.stop();
    var dataURL = canvas.toDataURL("image/jpeg"),
      inputWrapper = $('.capture-input'),
      outputWrapper = $('.capture-output'),
      outputImg = outputWrapper.find('img'),
      outputLink = outputWrapper.find('a');
    outputImg.attr('src', dataURL);
    outputLink.attr('href', dataURL);
    outputLink.attr('download', 'capture-' + new Date().toISOString() + '.jpg');
    inputWrapper.hide();
    outputWrapper.show();
  });

});
