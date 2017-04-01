(function defaultfunc() {

    var guessesLeft, randomNum, inputGuess, subGuess, ansDisp, maxAttempt;

    maxAttempt = 9;
	inputGuess = document.getElementById("guess");
    subGuess = document.getElementById("submitGuess");
    ansDisp = document.getElementById("answer");
    ansDisp.innerHTML = "<h3>Please guess the number!</h3>";
    subGuess.addEventListener("click", function (event) 
	{
     event.stopPropagation();
     event.preventDefault();
     checkAnswer();
    });

    initGame();

    function initGame () {
        guessesLeft = maxAttempt;
        randomNum = Math.round((Math.random() * 100))%100  + 1;
	    inputGuess.value = "";
    }
			
    function checkAnswer () 
	  {
		   if (inputGuess.value == randomNum) 
		    {
               ansDisp.innerHTML = "<h3>You Guessed Right! " + randomNum + " is correct.</h3> " +
               "<h3>Please input next guess to start the game again.</h3>";
               initGame();
               return;
            }
            else if (inputGuess.value > randomNum)
         	{
             ansDisp.innerHTML = "<h3> Your guessed high!</h3>" + "<h3>You have </h3>" + guessesLeft + "<h3> Attempts left</h3>";
            }
            else if (inputGuess.value < randomNum)
			{
             ansDisp.innerHTML = "<h3> You guessed low!</h3>" + "<h3>You have</h3> " + guessesLeft + "<h3> Attempts left</h3>";
            }
			guessesLeft -= 1;
			if (guessesLeft == -1)
			{
             ansDisp.innerHTML += "<h3><br/> No guesses left - The answer was " +  randomNum + "<h3> you lost the game!</h3>";           
             initGame();
            }	    
    }
}());

