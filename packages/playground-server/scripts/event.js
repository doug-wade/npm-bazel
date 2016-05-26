window.fireEvent = function(event) {
  var eventRequest = new XMLHttpRequest();
  eventRequest.addEventListener("load", reqListener);
  eventRequest.open("POST", "/event");
  eventRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  eventRequest.send(JSON.stringify(event));
}
