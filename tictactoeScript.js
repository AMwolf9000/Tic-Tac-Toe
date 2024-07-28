'use strict';
let boxes = document.getElementsByClassName('box');
let t, m, boardData, winMark;
t = ''; // current turn
m = 0; // moves made
winMark = document.getElementsByTagName('svg')[0];
boardData = ['0','0','0','0','0','0','0','0','0'];
function start(x) {
	if (t === '') {
		if (x === 'x') {
			t = 'x'
		} else if (x === 'o') {
			t = 'o'
		} else if (x === 'r') {
			if (Math.floor(Math.random() * 2) === 0) {
				t = 'x'
			} else {
				t = 'o'
			}
		}
		document.getElementsByTagName('h1')[0].innerHTML = `${t.toUpperCase()}'s turn`
	}
}
function reset() {
		for (let i = 0; i < boxes.length; i++) {
		boxes[i].innerHTML = ''
	}
	boardData = ['0','0','0','0','0','0','0','0','0'];
	document.getElementsByTagName('h1')[0].innerHTML = 'No one\'s turn';
	t = '';
	m = 0;
	winMark.innerHTML = '';
}
function addMark() {
	if (t != '') {
		if (this.innerHTML === '') {
			this.innerHTML = t.toUpperCase();
			boardData[this.id] = t;
			m++;
			checkWin();
			if (t === 'x') {
				t = 'o'
			} else {
				t = 'x'
			}
			document.getElementsByTagName('h1')[0].innerHTML = `${t.toUpperCase()}'s turn`
		}
	}
}
function checkWin() {
	if (m >= 5) {
			let b = boardData.join('');
			if (/^(xxx|ooo)/.test(b)) {
				return endWinCheck('1');
			}
			if (/...(xxx|ooo).../.test(b)) {
				return endWinCheck('2');
			}
			if (/(xxx|ooo)$/.test(b)) {
				return endWinCheck('3');
			}
			if (/x..x..x..|o..o..o../.test(b)) {
				return endWinCheck('4');
			}
			if (/.x..x..x.|.o..o..o./.test(b)) {
				return endWinCheck('5');
			}
			if (/..x..x..x|..o..o..o/.test(b)) {
				return endWinCheck('6');
			}
			if (/x...x...x|o...o...o/.test(b)) {
				return endWinCheck('7');
			}
			if (/..x.x.x..|..o.o.o../.test(b)) {
				return endWinCheck('8');
			}

			if (m === 9) {
				alert('draw!');
				reset();
				return true;
			}
	}
	return false;
}
function endWinCheck(x) {
	let y;
	if (x == '1') {
		 winMark.innerHTML = '<line x1="0" y1="75" x2="500" y2="75" style="stroke:black;stroke-width:15">'
	}
	if (x == '2') {
		 winMark.innerHTML = '<line x1="0" y1="250" x2="500" y2="250" style="stroke:black;stroke-width:15">'
	}
	if (x == '3') {
		 winMark.innerHTML = '<line x1="0" y1="425" x2="500" y2="425" style="stroke:black;stroke-width:15">'
	}
	if (x == '4') {
		 winMark.innerHTML = '<line x1="75" y1="0" x2="75" y2="500" style="stroke:black;stroke-width:15">'
	}
	if (x == '5') {
		 winMark.innerHTML = '<line x1="250" y1="0" x2="250" y2="500" style="stroke:black;stroke-width:15">'
	}
	if (x == '6') {
		 winMark.innerHTML = '<line x1="425" y1="0" x2="425" y2="500" style="stroke:black;stroke-width:15">'
	}
	if (x == '7') {
		 winMark.innerHTML = '<line x1="0" y1="0" x2="500" y2="500" style="stroke:black;stroke-width:15">'
	}
	if (x == '8') {
		 winMark.innerHTML = '<line x1="0" y1="500" x2="500" y2="0" style="stroke:black;stroke-width:15">'
	}
	setTimeout(() => { 
		if (t == 'x') {
			y = 'o'
		} else {
			y = 'x'
		}
		alert(`${y.toUpperCase()} Won!!`);
		reset()
	}, 50)
}
for (let i = 0; i < boxes.length; i++) {
	boxes[i].addEventListener('click', addMark)
}