'use strict';
let boxes = document.getElementsByClassName('box');
let t, m, boardData;
t = '';
m = 0;
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
	m = 0
}
function addMark() {
	if (t != '') {
		if (this.innerHTML === '') {
			this.innerHTML = t.toUpperCase()
			boardData[this.id] = t;
			m++;
			if (checkWin() === true) {
				return;
			}
			if (t === 'x') {
				t = 'o';
			} else {
				t = 'x';
			}
			document.getElementsByTagName('h1')[0].innerHTML = `${t.toUpperCase()}'s turn`
		}
	}
}
function checkWin() {
	if (m >= 5) {
		let b = boardData.join('');
		if (/^(xxx|ooo)|^...(xxx|ooo)...$|(xxx|ooo)$/.test(b)) {
			alert(`${t.toUpperCase()} horizontal win!`);
			reset();
			return true;
		}
		let b0 = b[0] + b[3] + b[6] + b[1] + b[4] + b[7] + b[2] + b[5] + b[8];
		if (/^(xxx|ooo)|^...(xxx|ooo)...$|(xxx|ooo)$/.test(b0)) {
			alert(`${t.toUpperCase()} vertical win!`);
			reset();
			return true;
		}
		let b1 = b[0] + b[4] + b[8] + b[2] + b[4] + b[6];
		if (/^(xxx|ooo)|(xxx|ooo)$/.test(b1)) {
			alert(`${t.toUpperCase()} diagonal win!`);
			reset();
			return true;
		}
		if (m === 9) {
			alert('draw!');
			reset();
			return true;
		}
	}
	return false;
}
for (let i = 0; i < boxes.length; i++) {
	boxes[i].addEventListener('click', addMark)
}