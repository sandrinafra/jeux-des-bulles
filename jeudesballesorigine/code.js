$accueil = document.getElementById("accueil");
$jeu = document.getElementById("jeu");
$boutonQuitter = document.getElementById("boutonQuitter");
$bilan = document.getElementById("bilan");
$scores = document.getElementById("scores");
$son = document.getElementById("son");
$son_scr = document.getElementById("son_scr");
$image = document.getElementById("image");
$result = document.getElementById("result");
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var myInterval;
var myDeuxterval;
var myTroisterval;

var win = 8;
var array = [];
var score = 0;
var diff = 1;

function play()
{

    $scores.innerHTML = "Score " + score;

    myInterval = setInterval(creation, 500);
    myDeuxterval = setInterval(destroy, 500);
    myTroisterval = setInterval(animate, 1000/30);


	$accueil.style.display = "none";
	$jeu.style.display = "block";

    $son.autoplay = true;
    $son.load();
}

function quit()
{
	$jeu.style.display = "none";
	$accueil.style.display = "block";

    clearInterval(myInterval);
    clearInterval(myDeuxterval);
    clearInterval(myTroisterval);
    context.clearRect(0, 0, canvas.width, canvas.height);

    array = [];
    score = 0;
    diff = 1;

}

function creation()
{
    var x = Math.round(Math.random() * 680);
    var y = Math.round(Math.random() * -100);

    var color = Math.random();
    if (color <= 0.25)
        color = "#4115F1"; //blue
    else if (color <= 0.50 )
        color = "#D2FD00"; //yellow
    else if (color <= 0.75)
        color = "#FA004C"; //pink
    else 
        color = "#00F600"; //green
    
    var radius = Math.random();
    if (radius <= 0.25)
        radius = 20;
    else if (radius <= 0.50)
        radius = 30;    
    else if (radius <= 0.75)
        radius = 40;    
    else 
        radius = 50;

    var speed = Math.random();
    if (speed<= 0.25)
        speed = 4 * diff;
    else if (speed <= 0.50)
        speed = 5 * diff;  
    else if (speed <= 0.75)
        speed = 6 * diff;    
    else 
        speed = 7 * diff;

    var insideArray = [x, y, color, radius, speed];
    console.log(insideArray);
    array.push(insideArray);
    console.log("array.length = " + array.length);

}

function perdu()
{

    $bilan.style.display = "block";
    $result.innerHTML = "Vous avez fait un score de " + score;
    $jeu.style.display = "none";
    clearInterval(myInterval);
    clearInterval(myDeuxterval);
    clearInterval(myTroisterval);
    context.clearRect(0, 0, canvas.width, canvas.height);

}

function destroy()
{
    var i = 0;
    while (i < array.length)
    {
        if (array[i][1] > (500 + array[i][3]))
        {
            if (array[i][2] == "#FA004C")
                perdu();

            array.splice(i, + 1);
            console.log("deleted");
        }
        i++;
    }
}


function animate()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	var i = 0
    while (i < array.length)
	{
		context.fillStyle = array[i][2];
		context.beginPath();
		context.arc(array[i][0], array[i][1] + 1, array[i][3], 0, Math.PI*2);
		context.fill();
        array[i][1] += array[i][4];  
        i++; 
	}

}

function detect(event) 
{
    var ox = canvas.offsetLeft;
    var oy = canvas.offsetTop;
    var clickedX= Math.round(event.clientX - ox); 
    var clickedY = Math.round(event.clientY - oy);

    var i = 0;
    while (i < array.length)
    {
    	var left = array[i][0] - (array[i][3]);
    	var right = array[i][0] + (array[i][3]);
    	var up = array[i][1] - (array[i][3] + 20);
    	var down = array[i][1] + (array[i][3]);

    	if (array[i][2] == "#FA004C" && clickedX <= right && clickedX >= left && clickedY <= down && clickedY >= up) 
    	{
            array.splice(i, + 1);
            score++;
            diff += 0.1;
            $scores.innerHTML = "Score " + score;

            if (score == win)
            {
                evil();
            }
        }
        i++;
    }   
}

function evil()
{
    $image.style.display = "block";
    // coupe la musique du piano
    $son.autoplay = false;
    $son.load();

    // lance la musique du cri
    $son_scr.autoplay = true;
    $son_scr.load();
    // on met le jeu en arriere plan en pause
    clearInterval(myInterval);
    clearInterval(myDeuxterval);
    clearInterval(myTroisterval);

    // au bout de trois secondes, on remet
    // tout a la normale avec la fonction clear
    // ( on relance la musique, on cache l'image
    //   et on enleve la pause)
    setTimeout(clear, 1000);
}

function clear()
{
    $image.style.display = "none";
    // image
    // son
    $son.autoplay = true;
    $son.load();
    // on enleve la pause
    myInterval = setInterval(creation, 500);
    myDeuxterval = setInterval(destroy, 500);
    myTroisterval = setInterval(animate, 1000/30);

    // la vie continue
}



function finDeJeu()
{
	$jeu.style.display = "none";
	$bilan.style.display = "block";

}

function accueil()
{
	$bilan.style.display = "none";
	$accueil.style.display = "block";
    array = [];
    score = 0;
    diff = 1;

}

function rejouer()
{
	$bilan.style.display = "none";
	$jeu.style.display = "block";
    array = [];
    score = 0;
    diff = 1;
    $scores.innerHTML = "Score " + score;
    play();


    //window.location.reload();
}

