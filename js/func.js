var counter = 0;

document.getElementById('counter').innerHTML = counter;
document.getElementsByClassName('testJS')[0].innerHTML = counter;

function IncrementCounter(){
	counter++;
	document.getElementById('counter').innerHTML = counter;
	document.getElementsByClassName('testJS')[0].innerHTML = counter;
}

function ShowDiv(){
	document.getElementById("hiddenDiv").style.display = "block";
}

function ToggleDiv(){
	if(document.getElementById("hiddenDiv").style.display == "block"){
		document.getElementById("hiddenDiv").style.display = "none";
	}
	else if(document.getElementById("hiddenDiv").style.display == "none"){
		document.getElementById("hiddenDiv").style.display = "block";
	}
}

var isRunning = false;
var timer = 0;
var timerObject;

document.getElementById("timer").innerHTML = timer;

function StartTimer(){
	if(!isRunning){
		isRunning = true;
		timerObject = setInterval(function(){ //we gather the intervals in an object, to then be stopped later
			timer++
			document.getElementById("timer").innerHTML = timer;
			//document.getElementById("timer").innerHTML = ++timer; //is the same thing as above
		}, 1000);
	}else{
		console.log("The timer is already running, stop pressing it again!");
	}
}


function StopTimer(){
	isRunning = false;
	clearInterval(timerObject); //stops the function inside the setInterval from running any more
}




// console.log("Arithmetical operations")
// var x = 1;
// var y = 2;

// console.log(x+y);
// console.log(x-y);
// console.log(x*y);
// console.log(x/y);
// console.log(3%y);

// console.log("Arithmetical operations")
// var t = true;
// var f = false;

// console.log("AND")
// console.log(t && f);
// console.log(t && f);
// console.log(t && f);
// console.log(t && f);

// console.log("OR")
// console.log(t || f);
// console.log(t || f);
// console.log(t || f);
// console.log(t || f);