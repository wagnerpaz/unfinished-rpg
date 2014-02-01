Crafty.scene("asteroids-game", function()
{
	Crafty.e("2D, DOM, Text").attr({x: 10, y: 10}).text("Loading..");
	Crafty.scene('asteroids-game-loaded');
});

Crafty.scene("asteroids-game-loaded", function()
{
	
	var spaceship = Crafty.e("SpaceshipActor, BoxPosition")
   	                      .regBoxPosition("origin", "center", "center")
	                      .setBoxPosition("origin")
	                      ;
	spaceship.rotation = 0;
	var fire1 = Crafty.e("2D, DOM, BoxPosition, FireSprite")
	                 .attr({x: spaceship._x+11, y: spaceship._y+38})
	                 .origin("center")
	                 ;
	fire1.rotation = spaceship.rotation;
	
	var fire2 = Crafty.e("2D, DOM, BoxPosition, FireSprite")
	                 .attr({x: spaceship._x, y: spaceship._y+38})
	                 .origin("center")
	                 ;
	fire2.rotation = spaceship.rotation;
	
	spaceship.fire1 = fire1;
	spaceship.fire2 = fire2;
	spaceship.attach(fire1);
	spaceship.attach(fire2);
});