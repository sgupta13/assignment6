window.onload = function() {
  var loserTimeout;
  var timerTimeout;
  var timerInterval;
  var tilesArr = [];
  var numofTiles;
  var tilesRevealed = 0;
  var time;
  var prevId;
  var id;
}

//This function will handle all the functionality at the beginning of the game
function startgame(){
  if(!numofTiles && !time){
    alert("You forgot to select the number of picture tiles and the number of seconds!");
  }
  else{
    if(!numofTiles){
      alert("You forgot to select the number of picture tiles!");
    }
    if(!time){
      alert("You forgot to select the number of seconds!");
    }
  }
  shuffle(tilesArr);
  createBoard();
  prevId = null;
  tilesRevealed = 0;
  if(numofTiles == 16){
  var seconds = 120;
  }
  if(numofTiles == 20){
    var seconds = 150;
  }
  if(numofTiles ==24){
    var seconds = 180;
  }
  var timerDisplay = document.querySelector('#time');
  setTimeout(hideBoard,1000*time);
  timerTimeout = setTimeout(function(){ startTimer(seconds,timerDisplay);},1000*time);
  loserTimeout = setTimeout(lose,(seconds+1)*1000);
}

//The function keeps the track of the number of tiles selected by user for play
function tileNumbers(value){
  tilesArr = []
  numofTiles = value;
  document.getElementById("numtiles").innerHTML = 'You have selected ' + numofTiles/2 + ' tiles for play.';
  var counter = 1;
  for(var  i = 1; i < numofTiles + 1; i++){
    tilesArr.push(counter);
    if(i%2 === 0){
      counter++;
    }
  }
}

//This function is for keeping the track of the time selected by the player
function setSeconds(seconds){
  time = seconds;
  document.getElementById("seconds").innerHTML = 'You have selected ' + time + ' seconds to memorize.';
}

//This function shuffles the tiles
function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

//The following function will handle timer
function startTimer(duration, display) {
    var timer = duration;
    timerInterval = setInterval(function () {
        display.textContent = timer;
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

//The function creates the board for play
function createBoard(){
  var tileTable = document.createElement('table');
  tileTable.setAttribute("id","tileTable");
  tileTable.setAttribute("width","55%");
  tileTable.setAttribute("align","center");
  var numberOfColumns = numofTiles/4;
  var numberOfRows = numofTiles/numberOfColumns;
  var imageNumber = 0;
  for(var i = 0; i < numberOfRows; i++){
    tr = document.createElement('tr');
    for(var j = 0; j < numberOfColumns; j++){
      td = document.createElement('td');
      tr.appendChild(td);
      imageSrc = tilesArr[imageNumber].toString() + ".gif";
      td.innerHTML = '<img src='+ imageSrc + ' width="100%">';
      td.setAttribute("id","td" + imageNumber.toString());
      td.setAttribute("onclick","tileClick(this)");
      imageNumber++;
    }
    tileTable.appendChild(tr);
  }
  var board = document.getElementById('myBoard');
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
  document.getElementById('myBoard').appendChild(tileTable);
}

//The function hides the photo pairs and displays the dummy flowers picture
function hideBoard(){
  for(var i = 0; i < numofTiles; i++){
    var tile = document.getElementById('td' + i.toString());
    tile.innerHTML = '<img src="dummy.jpg" width="100%">';
  }
}

function tileClick(tile){
  console.log(numofTiles);
  if(prevId === null){
    id = tdIdToInt(tile.id);
    console.log(prevId);
    showTile(id);
    setprevId(id);
    console.log(prevId);
  }
  else{
    var id = tdIdToInt(tile.id);
    showTile(id);
    if(tilesArr[id] == tilesArr[prevId]){
      setTilesRevealed(tilesRevealed + 2);
      prevId = null;
      if(tilesRevealed === numofTiles){
        success();
      }
    }
    else{
      console.log(prevId);
      setTimeout(function() {hideTile(id)},1000);
      setTimeout(function() {hideTile(prevId); prevId = null},1000);
    }
  }
}

function tdIdToInt(stringId){
  var stringArray = stringId.split("td");
  return parseInt(stringArray[1]);
}

function showTile(number){
  var tile = document.getElementById('td' + number.toString());
  imageSrc = tilesArr[number].toString() + ".jpg";
  tile.innerHTML = '<img src='+ imageSrc + ' width="100%">';
}

function hideTile(number){
  var tile = document.getElementById('td' + number.toString());
  tile.innerHTML = '<img src="blank.jpg" width="100%">';
}

function setprevId(value){
  prevId = value;
}
function setTilesRevealed(value){
  tilesRevealed = value;
}
function success(){
  clearInterval(timerInterval);
  clearTimeout(loserTimeout);
  text = document.getElementById('time');
  text.innerHTML = "You won the game!";
}
function lose(){
  createBoard();
  clearInterval(timerInterval);
  clearTimeout(loserTimeout);
  text = document.getElementById('time');
  text.style.color = 'red';
  text.innerHTML = "You lost the game!";
}

//If the player wants to restart the game
function restart(){
  location.reload();
}

