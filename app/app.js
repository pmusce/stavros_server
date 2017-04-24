var chunks;
function play() {
	chunks = getSelectionText().split('.');
	console.log(chunks);
	var i = 0;
	var msg = new SpeechSynthesisUtterance(chunks[0]+'.');
	msg.onend = function callback() {
		i=i+1;
		if(i==chunks.length) 
			return;
		var newMsg = new SpeechSynthesisUtterance(chunks[i]);
		newMsg.onend = callback;
		window.speechSynthesis.speak(newMsg);
	}
	window.speechSynthesis.speak(msg);
}

function stop() {
	chunks = []
	window.speechSynthesis.cancel();
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


$('#text_body').on('input', function() {
	console.log("ASD");
    var wordCount = $(this).val().split(' ').length;
    $('#wc').text(wordCount);
});
