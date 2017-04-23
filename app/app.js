function play() {
	var msg = new SpeechSynthesisUtterance(getSelectionText());
	window.speechSynthesis.speak(msg);
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}


window.onload=function() {
  upTime(0);
}

function upTime(secs) {
  document.getElementById('seconds').value = secs;

  clearTimeout(upTime.to);
  upTime.to=setTimeout(function(){ upTime(secs+1); },1000);
}
