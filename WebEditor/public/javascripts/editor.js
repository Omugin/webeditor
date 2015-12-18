/*******************

Onload Event

*******************/


function onload() {
	var editor = document.getElementById("editor");

	if(editor.addEventListener){
		editor.addEventListener("textInput", autoCompletion, false);
	}
}

/*******************

Auto Completion

*******************/

function autoCompletion(){
	var e = event;
	var keyInput = e.data;

	var editor = document.getElementById("editor");
	var position = editor.selectionStart;
	var str = editor.value;
	var strF = str.substr(0, position);
	var strL = str.substr(position, str.length);
	var strReplace;

	var mode = document.getElementById("mode").value;

	if(mode == "C"){
		strReplace = overWriteC(keyInput);
		str = strF + strReplace + strL;
		position += strReplace.length;
		e.preventDefault();
	}
	else if(mode == "Java"){ 
		strReplace = overWriteJava(keyInput); 
		str = strF + strReplace + strL;
		position += strReplace.length;
		if(strReplace.length != 0){ e.preventDefault(); }
	}

	editor.value = str;
	editor.setSelectionRange(position,position);

	editor.scrollTop =  editor.scrollHeight;
}

function overWriteJava (keyInput) {
	if(keyInput == "P"){ return "System.out.println();"; }
	else if(keyInput == "F"){ return "public int method(){\n\n}"; }
	else if(keyInput == "C"){ return "public class class{\n\n}"; }
	else if(keyInput == "M"){ return "public static void main(String[] args){\n\n}"; }
	else{ return ""; }
}

function overWriteC (keyInput) {
	if(keyInput == "P"){ return "printf();"; }
	else if(keyInput == "F"){ return "int function(){\n\n}"; }
	else if(keyInput == "M"){ return "int main(void){\n\n}";}

	else{ return ""; }
}

/*******************

Mode

*******************/

function selectMode(obj){
	var mode = document.getElementById("mode");
	var editor = document.getElementById("editor");

	mode.value = obj;

	editor.focus();
}

/*******************

Send Button

[Comment][source or text][commentor's id][threadID:CommentID][comment][source pass]
send();
update(int commentID);

Java 
uploadFile();にリダイレクト

*******************/


function sendMsg(){
	var editor = document.getElementById("editor");
	var messageField = document.getElementById("messageField");
	var str = editor.value;

	if(str.match("\n")){ str = str.replace(/\n/g, "<br>"); }
	if(str.match(" ")){ str = str.replace(/ /g, "&nbsp"); }

	var messageRap = document.createElement("div");
	var message = document.createElement("div");
	message.classList.add("myComment");
	message.innerHTML = str;
	messageRap.classList.add("messageBox");
	messageRap.appendChild(message);
	messageField.appendChild(messageRap);

	editor.value = "";

	var scrollTop = messageField.scrollTop;
	var scrollBottom = messageField.scrollHeight;

	var h = setInterval(scrollToBottom, 10);

	function scrollToBottom () {
		scrollTop = messageField.scrollTop;
		if(scrollTop + 650 >= scrollBottom){ 
			clearInterval(h); 
		}
			
		messageField.scrollTop = scrollTop + 10;
	}
}


function sendAsOther () {
	var editor = document.getElementById("editor");
	var messageField = document.getElementById("messageField");
	var str = editor.value;

	if(str.match("\n")){ str = str.replace(/\n/g, "<br>"); }
	if(str.match(" ")){ str = str.replace(/ /g, "&nbsp"); }

	var messageRap = document.createElement("div");
	var message = document.createElement("div");
	message.classList.add("othersComment");
	message.innerHTML = str;
	messageRap.classList.add("messageBox");
	messageRap.appendChild(message);
	messageField.appendChild(messageRap);

	editor.value = "";

	var scrollTop = messageField.scrollTop;
	var scrollBottom = messageField.scrollHeight;

	var h = setInterval(scrollToBottom, 10);

	function scrollToBottom () {
		scrollTop = messageField.scrollTop;
		if(scrollTop + 650 >= scrollBottom){ 
			clearInterval(h); 
		}
			
		messageField.scrollTop = scrollTop + 10;
	}
}

/*******************

Clear Button 

*******************/

function clearTextBox(){
	var editor = document.getElementById("editor");

	editor.value = "";
	editor.focus();
}


