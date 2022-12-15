document.addEventListener("deviceready", onReady, false);
function onReady() {
  document
    .getElementById("btn")
    .addEventListener("click", openCamera);

  document
    .getElementById("nav-btn")
    .addEventListener("click", getMapLocation);
  function setOptions(srcType) {
    var options = {
      quality: 80,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      cameraDirection: Camera.Direction.BACK,
      correctOrientation: true,
      targetWidth: 400,
      targetHeight: 400,
      saveToPhotoAlbum: true,
    };
    return options;
  }

  function openCamera(selection) {
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);

    navigator.camera.getPicture(cameraSuccess, cameraError, options);

    function cameraSuccess(imageUri) {
      displayImage(imageUri);
    }
    function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");
    }
  }

  function displayImage(imgUri) {
    var elem = document.getElementById("main-body-img");
    elem.src = "data:image/jpeg;base64," + imgUri;
  }

  function onSuccess(position) {
    const element = document.getElementById("map");
    element.innerHTML =
      "Latitude: " +
      position.coords.latitude +
      "\n" +
      "Longitude: " +
      position.coords.longitude +
      "\n" +
      "Altitude: " +
      position.coords.altitude +
      "\n" +
      "Accuracy: " +
      position.coords.accuracy +
      "\n" +
      "Altitude Accuracy: " +
      position.coords.altitudeAccuracy +
      "\n" +
      "Heading: " +
      position.coords.heading +
      "\n" +
      "Speed: " +
      position.coords.speed +
      "\n" +
      "Timestamp: " +
      position.timestamp +
      "\n";
  }

  // onError Callback receives a PositionError object
  //
  function onError(error) {
    const element = document.getElementById("map");
    element.innerHTML =
      "code: " + error.code + "\n" + "message: " + error.message + "\n";
  }

  function getMapLocation() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
}
