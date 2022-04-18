var card, y, x;
var minutes = 0;
var seconds = 0;

function left(x, y) {
	var one = parseInt(x);
	var two = parseInt(y);
	if (one > 0) {
		var i = 0;
		while(i < card.length){
			if (parseInt(card[i].style.left) + 100 == one && parseInt(card[i].style.top) == two) {
				return i;
			}
			i++;
		}
	}
	else {
		return -1;
	}
}
function right(x, y) {
	var one = parseInt(x);
	var two = parseInt(y);
	if (one < 300) {
		for (var i = 0; i < card.length; i++) {
			if (parseInt(card[i].style.left) - 100 == one && parseInt(card[i].style.top) == two) {
				return i;
			}
		}
	}
	else {
		return -1;
	}
}

function up(x, y) {
	var one = parseInt(x);
	var two = parseInt(y);
	if (two > 0) {
		for (var i = 0; i < card.length; i++) {
			if (parseInt(card[i].style.top) + 100 == two && parseInt(card[i].style.left) == one) {
				return i;
			}
		}
	}
	else {
		return -1;
	}
}

function down(x, y) {
	var one = parseInt(x);
	var two = parseInt(y);
	if (two < 300) {
		for (var i = 0; i < card.length; i++) {
			if (parseInt(card[i].style.top) - 100 == two && parseInt(card[i].style.left) == one) {
				return i;
			}
		}
	}
	else {
		return -1;
	}
}

function change(position) {
	var one = card[position].style.top;
	card[position].style.top = y;
	y = one;
	one = card[position].style.left;
	card[position].style.left = x;
	x = one;
}

// this is the main function
window.onload = function () {
	startGame();
};

function imageChange() {
	alert("Worked");
}

function startGame() {
	var board = document.getElementById('board');
	card = board.getElementsByTagName('div');
	for (var i = 0; i < card.length; i++) {
		card[i].style.left = (i % 4 * 100) + 'px';
		card[i].style.top = (parseInt(i / 4) * 100) + 'px';
		if(document.getElementById("select-image").value === "img1") {
			card[i].className = 'tile';
		} else if (document.getElementById("select-image").value === "img2"){
			card[i].className = 'tile1';
		} else if (document.getElementById("select-image").value === "img3"){
			card[i].className = 'tile2';
		} else {
			card[i].className = 'tile3';
		}
		card[i].style.backgroundPosition = '-' + card[i].style.left + ' ' + '-' + card[i].style.top;
		card[i].onmouseout = function () {
			if(document.getElementById("select-image").value === "img1") {
				this.className = 'tile';
			} else if (document.getElementById("select-image").value === "img2"){
				this.className = 'tile1';
			} else if (document.getElementById("select-image").value === "img3"){
				this.className = 'tile2';
			} else {
				this.className = 'tile3';
			}
		};
		card[i].onclick = function () {
			if (move(parseInt(this.innerHTML))) {
				change(this.innerHTML - 1);
				if (done()) {
					win();
				}
				return;
			}
		};
		card[i].onmouseover = function () {
			if (move(parseInt(this.innerHTML))) {
				if(document.getElementById("select-image").value === "img1") {
					this.className = 'moveableTile';
				} else if (document.getElementById("select-image").value === "img2"){
					this.className = 'moveableTile1';
				} else if (document.getElementById("select-image").value === "img3"){
					this.className = 'moveableTile2';
				} else {
					this.className = 'moveableTile3';
				}
			}
		};
	}

	x = '300px';
	y = '300px';

	document.getElementById('button').onclick = function () {
		document.getElementById('time').innerHTML = "";
		var audio = document.getElementById("audio");
		audio.volume = .1;
        audio.play();
		var element = document.getElementById("rules");
  		element.classList.remove("winShow");
		  d = new Date();
		  d.setMinutes(0);
		  d.setSeconds(0, 0);
		  var myInterval = setInterval(function () {
			document.getElementById("m").innerHTML = d.getMinutes();
			document.getElementById("s").innerHTML = d.getSeconds();
			minutes = d.getMinutes();
			seconds = d.getSeconds();
			d.setTime(d.getTime() + 1000);
		  }, 1000);
		document.getElementById('rules').innerHTML = "<span id='m'></span>:<span id='s'></span>";
		for (var i = 0; i < 300; i++) {
			var randomNumber = parseInt(Math.random() * 100) % 4; // generating random number
			
			switch(randomNumber) {
				  case 0:
				    var t = up(x, y);
				if (t != -1) {
					change(t);
				}
				    break;
				  case 1:
				 
				    var t = down(x, y);
				if (t != -1) {
					change(t);
				}
				    break;
				  case 2:
				    var t = left(x, y);
				if (t != -1) {
					change(t);
				}
				    break;
				  case 3:
				   
				    var t = right(x, y);
				if (t != -1) {
					change(t);
				}
				    break;
				 
				}

		}
	};

	document.getElementById('cheat').onclick = function () {
		startGame();
		win();
		audio.pause();
		audio.currentTime = 0;
	};
}

function move(position) {
	if (left(x, y) == (position - 1)) {
		return true;
	}
	if (down(x, y) == (position - 1)) {
		return true;
	}
	if (up(x, y) == (position - 1)) {
		return true;
	}
	if (right(x, y) == (position - 1)) {
		return true;
	}
}
function win() {
	document.getElementById('rules').className = "winShow";
	document.getElementById('rules').innerHTML = "<span class='word congrats'>CONGRATULATIONS</span> <span class='word you'>YOU</span> <span class='word congrats'>WIN!</span>";
	var time = "Your time was: " + minutes + ":" + seconds;
	document.getElementById('time').innerHTML = time;
}

function done() {
	var click = true;
	for (var i = 0; i < card.length; i++) {
		var top = parseInt(card[i].style.top);
		var left = parseInt(card[i].style.left);
		// Checking if the two coordinate are same as before or not
		if (left != (i % 4 * 100) || top != parseInt(i / 4) * 100) {
			click = false;
			break;
		}
	}
	return click;
}

