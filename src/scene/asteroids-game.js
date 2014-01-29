Crafty.scene("asteroids-game", function()
{
	Crafty.e("2D, DOM, Text").attr({x: 10, y: 10}).text("Loading..");
	Crafty.scene('asteroids-game-loaded');
});

Crafty.scene("asteroids-game-loaded", function()
{
	Crafty.e("SpaceshipActor, BoxPosition")
   	      .regBoxPosition("origin", "center", "center")
	      .setBoxPosition("origin")
	      ;
});