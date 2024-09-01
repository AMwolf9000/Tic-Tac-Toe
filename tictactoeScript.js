// TO DO: 
// change alert for win into html box
//
'use strict';
let boxes, turn, moves, boardData, winLine, alertBox, darkBack;
alertBox = document.getElementById('alert-box');
darkBack = document.getElementsByClassName('darken')[0];
boxes = document.getElementsByClassName('box');
winLine = document.getElementById('winLine');
turn = ''; 
moves = 0; 
boardData = ['0','0','0','0','0','0','0','0','0'];
const winConditions = [
	{ regexp: /^(xxx|ooo)/, winType: '1' },
	{ regexp: /...(xxx|ooo).../, winType: '2' },
	{ regexp: /(xxx|ooo)$/, winType: '3' },
	{ regexp: /x..x..x..|o..o..o../, winType: '4' },
	{ regexp: /.x..x..x.|.o..o..o./, winType: '5' },
	{ regexp: /..x..x..x|..o..o..o/, winType: '6' },
	{ regexp: /x...x...x|o...o...o/, winType: '7' },
	{ regexp: /..x.x.x..|..o.o.o../, winType: '8' },
];
const svgLines = [
	{svgLineHTML: '<line x1="0" y1="75" x2="500" y2="75" style="stroke:black;stroke-width:15">'},
	{svgLineHTML: '<line x1="0" y1="250" x2="500" y2="250" style="stroke:black;stroke-width:15">'},
	{svgLineHTML: '<line x1="0" y1="425" x2="500" y2="425" style="stroke:black;stroke-width:15">'},
	{svgLineHTML: '<line x1="75" y1="0" x2="75" y2="500" style="stroke:black;stroke-width:15">'},
	{svgLineHTML: '<line x1="250" y1="0" x2="250" y2="500" style="stroke:black;stroke-width:15">'},
	{svgLineHTML: '<line x1="425" y1="0" x2="425" y2="500" style="stroke:black;stroke-width:15">'},
	{svgLineHTML: '<line x1="0" y1="0" x2="500" y2="500" style="stroke:black;stroke-width:15">'},
	{svgLineHTML: '<line x1="0" y1="500" x2="500" y2="0" style="stroke:black;stroke-width:15">'},
];

darkBack.addEventListener('click', reset); // resets upon clicking anywhere after someone wins

function start(x) {
	if (turn === '') {
		if (x === 'x') {
			turn = 'x'
		} else if (x === 'o') {
			turn = 'o'
		} else if (x === 'r') {
			if (Math.floor(Math.random() * 2) === 0) {
				turn = 'x'
			} else {
				turn = 'o'
			}
		}
		document.getElementsByTagName('h1')[0].innerHTML = `${turn.toUpperCase()}'s turn`
	}
}

function reset() {
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].innerHTML = ''
	}
	boardData = ['0','0','0','0','0','0','0','0','0'];
	document.getElementsByTagName('h1')[0].innerHTML = 'No one\'s turn';
	turn = '';
	moves = 0;
	winLine.innerHTML = '';
	darkBack.style.display = 'none';
	alertBox.innerHTML = '';
}

function addMark() {
	if (turn != '') {
		if (this.innerHTML === '') {
			this.innerHTML = turn.toUpperCase();
			boardData[this.id] = turn;
			moves++;
			checkWin();
			if (turn === 'x') {
				turn = 'o'
			} else {
				turn = 'x'
			}
			document.getElementsByTagName('h1')[0].innerHTML = `${turn.toUpperCase()}'s turn`
		}
	}
}

function checkWin() {
	if (moves < 4) {
		return false;
	}
	if (moves == 9) {
		return endWinCheck('9');
	}
	let b = boardData.join('');

	for (let i = 0; i < winConditions.length; i ++) {
		if (winConditions[i].regexp.test(b)) {
			return endWinCheck(winConditions[i].winType)
		}
	}
return false;
}

function endWinCheck(winType) {
	let oppositeTurn;

	if (winType != '9') {
		winLine.innerHTML = svgLines[winType - 1].svgLineHTML;
	}

	setTimeout(() => { 
		makeConfetti(0);
		makeConfetti(1);
		if (turn == 'x') {
			oppositeTurn = 'o'
		} else {
			oppositeTurn = 'x'
		}
		darkBack.style.display = 'flex';
		if (winType != '9') {
			alertBox.innerHTML = `${oppositeTurn.toUpperCase()} Won!!`;
		} else {
			alertBox.innerHTML = `Draw!!`;
		}
	}, 50)
}

for (let i = 0; i < boxes.length; i++) {
	boxes[i].addEventListener('click', addMark)
}