//main function
function makeConfetti(n) {
    let con = document.getElementsByClassName("confetti-container")[n];

    //reset
    if (con.childElementCount > 1) {
        for (let i = 0; i < con.childElementCount - 1; i++) {
            con.removeChild(con.childNodes[i + 3]);
        }
    }

    //random int function
    function rInt(max, min) {
        return Math.floor(Math.random() * ((max + 1) - min)) + min
    }

    //make divs
    let r = rInt(45, 25);
    for (let i = 0; i < r; i++) {
        con.innerHTML += '<div></div>'
    }

    // color divs
    for (let i = 0; i < con.childElementCount - 1; i++) {
        r = rInt(2, 0);
        if (r == 0) {
            con.childNodes[i + 3].style.backgroundColor = 'red'
        }
        if (r == 1) {
            con.childNodes[i + 3].style.backgroundColor = 'blue'
        }
        if (r == 2) {
            con.childNodes[i + 3].style.backgroundColor = 'lightgreen'
        }
    }

    // starts moving functions
    for (let i = 0; i < con.childElementCount - 1; i++) {
        let child = con.childNodes[i + 3];
        moveDivs(child);
    }

    //asign direction and spin for divs
    function moveDivs(child) {
        child.style.transform = 'rotate(0deg)';
        setTimeout(() => {
            let radius = 1500;
            let spin = rInt(100, 40);
            
function calcPos(cord) {
  if (cord == 'x') {
    return x;
  }
  if (cord == 'y') {
    return Math.sqrt((radius ** 2) - (x ** 2));   
  }
}

function favorMiddle(r) {
    let x = Math.floor(Math.random() * (r + 1));
    let middle = r * Math.cos(45 * (Math.PI / 180));
    let max = r * Math.cos(22.5 * (Math.PI / 180));
    let min = r * Math.cos(67.5 * (Math.PI / 180));
    if (x > max) {
        x -= Math.floor(Math.random() * (r / 4));
    }
    if (x < min) {
        x += Math.floor(Math.random() * (r / 4));
    }
    return x;
}
            
	const spinID = setInterval(() => {
      let currentSpin = Number(child.style.transform.match(/\d+/g).join(''));
      child.style.transform = `rotate(${calculateSpin()}deg)`;
      
      function calculateSpin() {
        let x = currentSpin + spin;
        if (x > 360) {
          let remainder = x - 360;
          x = 0 + remainder;
        }
        
        spin -= 1;
        
        if (spin <= 0) {
          clearInterval(spinID)
        }
        return x;
      }
    }, 40)
            
    let x = favorMiddle(radius);
	let y = calcPos('y');
    child.style.bottom = '230px';
    child.style.left = '180px';
    let counter = 0;
            
    const directionID = setInterval(() => {
      let bottom = Number(child.style.bottom.replace('px', ''));
      let left = Number(child.style.left.replace('px', ''));
                
      //calc upward momentum
      child.style.bottom = bottom + ((x - bottom) / 20) - counter + 'px';
                
      //calc sideways momentum
      child.style.left = left + ((y - left) / 35) + 'px';
               
      //calc exponetial decrease in speed
      bottom = Number(child.style.bottom.replace('px', ''));
      counter = counter + bottom / 600 + left / 1000;
                
      // stop movement
      if (bottom <= 0) {
        clearInterval(directionID);
        clearInterval(spinID);
      }
    }, 40)
  }, rInt(1000, 100))
}}