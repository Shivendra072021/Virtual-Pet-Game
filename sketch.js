var dog,sadDog,happyDog;
var foodObj, foodS, foodStock;
var fedTime, lastFed, feed, addFood;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database()
  createCanvas(1000,400);
  
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  textSize(15);
  if(lastFed >=12)
  {
    Text("Last Feed: " +lastFed %12 + "PM", 350, 30);
  }
  else if(lastFed == 0)
  {
    text("Last Feed: 12 AM", 350, 30);
  }
  else{
    text("Last Feed: " + lastFed + "AM", 350, 30);
  }
  drawSprites();
}

//function to read food Stock
function readStock()
{
  foodS = data.val();
  foodObj.updateFoodStock();
}

//function to update food stock and last fed time
function feedDog()
{
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

//function to add food in stock
function addFoods()
{
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}