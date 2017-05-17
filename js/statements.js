// FOR LOOP

for (var i = 0; i <= 10; i++) {
	console.log(i);
};

// continue can be used to ignore every single statement thats after the statement (for the current iteration of the loop)
for (var i = 0; i <= 10; i++) {
	if(i==2){continue;}
	console.log(i);
};

for (var i = 0; i <= 10; i++) {
	if(i>2){continue;}
	console.log(i);
};

// break completely exits the loop at it current iteration
for (var i = 0; i <= 10; i++) {
	if(i>2){break;}
	console.log(i);
};

for (var i = 0; i <= 10; i++) {
	if(i==2){break;}
	console.log(i);
};


// WHILE LOOP

var terminou = false;
while(terminou){
	// here nothing will run because terminou is never equal to true
}

while(!terminou){ // '!terminou' is equal to 'terminou==false'
	break; //here it would run infinitely (not true because we have a break), because terminou is false, so !terminou is true
}

var counter = 0;
while(!terminou){ // it will run until terminou equals true
	counter++; // increment the counter variable
	if(counter>=15){ //check if counter is more or equal to 15
		terminou = true; //in tht case, turn terminou to true, which will end the cycle
	}
}

// DO/WHILE LOOP
counter = 0;
terminou = false;
do{
	console.log(counter++);
	if(counter>=10){
		terminou=true;
	}
}
while(!terminou)

counter = 0;
while(counter < 10){
	console.log(counter++);
}