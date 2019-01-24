let heroSprite;
let obstacles = [];
let birdImg;
let pipeImg;
let GRAVITY = 0.3;
let flapForce = -10;

var micInput;

function preload(){
	birdImg = loadImage('assets/bird1.png');
	pipeImg = loadImage('assets/obstacle.png');
}

function setup() {
	createCanvas(1000, 600);
	heroSprite = createSprite(100,200,20,20);
	heroSprite.addImage(birdImg);
	
	micInput = new p5.AudioIn();
	micInput.start();
}

function draw() {
	background(112,197,206);
	
	let vol = micInput.getLevel();
	let normalisedVol = vol*100;
	
	if(normalisedVol>0.5){
	flapForce = -normalisedVol;
	flap();
	}
	
	heroSprite.velocity.y += GRAVITY;
	
	for(let currentObstacle of obstacles){
		drawSprite(currentObstacle);
		currentObstacle.position.x -= 4;
	}
	
	if(frameCount % 120 == 0){
		obstacles.push(addObstacle());
	}
	
	for(let currentObstacle of obstacles){
		if(heroSprite.collide(currentObstacle)){
			print("GAME OVER !");
			noLoop();
		}	
	}
	
	drawSprite(heroSprite);
	removeObstacles();
}

function addObstacle(){
	let pos = floor(random(2));
	let newObstacle;
	let obstacleHeight = random(50,  100);

	if(pos == 0){ // up
		newObstacle = createSprite(width +50, 0, 25, obstacleHeight);
		newObstacle.mirrorY(-1);
	} 
	else { //down
		newObstacle = createSprite(width+50, height - obstacleHeight, 25, obstacleHeight);
	}
		
	newObstacle.addImage(pipeImg);
	return newObstacle;
}

function removeObstacles(){
	while (obstacles.length > 0 && obstacles[0].x + obstacles[0].w < 0) {
		obstacles.shift();
	}
}

function flap(){
	heroSprite.velocity.y = flapForce;
}
function mousePressed(){
	console.log("FLAP");
	
}