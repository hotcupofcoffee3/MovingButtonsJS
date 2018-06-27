/*** Set up Moving Buttons HTML ***/
	function movingButtonsHTML(){
		document.getElementById("main").innerHTML = buttonsInDocument;
	}

	function startMovingButtons(){
		setTheStartingVariables();
	}

/*** Starting Button Setup Information ***/

	let currentButtonNumber = 1;
	let runs = 0;
	let currentButtonID = "button" + currentButtonNumber;

	let buttonsInDocument = "<div class='movingButton' style='width: 200px; height: 200px; margin: 10px auto; border-radius: 5px; background-color: rgba(70,130,180,1); transition: 0.5s;' id='" + currentButtonID + "' onclick='buttonMove(this);'></div>";

	// Splits "px" off, creating an a array with the index 0 as the number as a string. Then turns current pixel count from a string to only a number.

		function getNumberFromPixels(stringToConvert){
			let newNumberFromPixels = stringToConvert;
				newNumberFromPixels = newNumberFromPixels.split("px");
				newNumberFromPixels = newNumberFromPixels[0];
				return Number(newNumberFromPixels);
		}


	// Does not try to set the variables until the "startMovingButtons()" function is called; otherwise, an error is thrown upon loading the page.
	function setTheStartingVariables(){
		// Creating global variables within the function without using a declaration of "var" or "let"
			currentButtonVariable = document.getElementById(currentButtonID);

		startingHeight = getNumberFromPixels(currentButtonVariable.style.height);
		startingWidth = getNumberFromPixels(currentButtonVariable.style.width);
		startingMarginTop = getNumberFromPixels(currentButtonVariable.style.marginTop);
		startingMarginBottom = getNumberFromPixels(currentButtonVariable.style.marginBottom);
		startingBorderRadius = getNumberFromPixels(currentButtonVariable.style.borderRadius);

		// Variables set for random possibilities arrays, with the parameters as: (minimumNumber, maximumNumber)

		xPossibilities = arrayPopulating(0, (window.innerWidth-startingWidth));
		yPossibilities = arrayPopulating(0, (window.innerHeight-startingHeight-10));
		borderRadiusPossibilities = arrayPopulating(0, 100);
		heightPossibilities = arrayPopulating(30, 200);
		widthPossibilities = arrayPopulating(30, 200);
		rgbaPossibilities = arrayPopulating(50, 255);
		rotatePossibilities = arrayPopulating(30, 60);
		rotatePossibilities = rotatePossibilities.concat(arrayPopulating(120, 240));
		rotatePossibilities = rotatePossibilities.concat(arrayPopulating(300, 350));
	}

/*** Button Change Possibilities ***/

	// Use Minimum and Maximum to push into the array that contains the changes //
		function arrayPopulating(minNum, maxNum){
			let arrayOfChanges = [];
				for(i = minNum; i <= maxNum; i++){
					arrayOfChanges.push(i);
				}
			return arrayOfChanges;
		}

/*** Random Button Attributes ***/

	// Variables set for random attributes

		let randomX;
		let randomY;
		let randomBorderRadius;
		let randomWidth;
		let randomHeight;
		let randomRed;
		let randomGreen;
		let randomBlue;
		let randomRotateX;
		let randomRotateY;
		let randomRotateZ;

	// Randomly assigns attribute to random attribute variable.

		function randomAssign(arrayOfChanges){
			return arrayOfChanges[Math.floor(Math.random() * arrayOfChanges.length)];
		}

		function getRandomAttributes(){
			randomX = randomAssign(xPossibilities);
			randomY = randomAssign(yPossibilities);
			randomBorderRadius = randomAssign(borderRadiusPossibilities);
			randomWidth = randomAssign(widthPossibilities);
			randomHeight = randomAssign(heightPossibilities);
			randomRed = randomAssign(rgbaPossibilities);
			randomGreen = randomAssign(rgbaPossibilities);
			randomBlue = randomAssign(rgbaPossibilities);
			randomRotateX = randomAssign(rotatePossibilities);
			randomRotateY = randomAssign(rotatePossibilities);
			randomRotateZ = randomAssign(rotatePossibilities);
		}
		function randomChange(elementClicked){
			getRandomAttributes();

			document.getElementById(elementClicked).style.transform = "translate(" + randomX + "px, " + randomY + "px) rotateX(" + randomRotateX + "deg) rotateY(" + randomRotateY + "deg) rotateZ(" + randomRotateZ + "deg)";
			document.getElementById(elementClicked).style.borderRadius = randomBorderRadius + "px";
			document.getElementById(elementClicked).style.width = randomWidth + "px";
			document.getElementById(elementClicked).style.height = randomHeight + "px";
			document.getElementById(elementClicked).style.backgroundColor = "rgba(" + randomRed + ", " + randomGreen + ", " + randomBlue + ", 1)";
		}

/*** Random Clicks and Creations ***/

	function buttonMove(clickedButton){
		if(runs === 0){
			randomChange(clickedButton.id);

		} else {
			// New button created
				let newButton = document.createElement("DIV");
				document.getElementById('main').appendChild(newButton);
				let newID = "button" + (runs + 1);
				document.getElementById('main').childNodes[runs].id = newID;

				document.getElementById(newID).classList.add('movingButton');
				document.getElementById(newID).style.transition = "0.5s";
				document.getElementById(newID).style.transform = "translate(" + randomX + "px, " + randomY + "px) rotateX(" + randomRotateX + "deg) rotateY(" + randomRotateY + "deg) rotateZ(" + randomRotateZ + "deg)";
				document.getElementById(newID).style.width = randomWidth + "px";
				document.getElementById(newID).style.height = randomHeight + "px";
				document.getElementById(newID).style.margin = "10px auto";
				document.getElementById(newID).style.borderRadius = randomBorderRadius + "px";
				document.getElementById(newID).style.backgroundColor = "rgba(" + randomRed + ", " + randomGreen + ", " + randomBlue + ", 1)";
				document.getElementById(newID).addEventListener("click", function(){buttonMove(this)});

			// First one.
				randomChange(clickedButton.id);

			// Second one.
				function newIDChange(){
					randomChange(newID);
				}
					window.setTimeout(newIDChange, 10);
		}
		runs++;
	}

	movingButtonsHTML();
	startMovingButtons();
