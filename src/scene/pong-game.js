Crafty.scene("pong-game", function()
{
	Crafty.e("2D, DOM, Text").attr({x: 10, y: 10}).text("Loading..");
	Crafty.scene('pong-game-loaded');
});

Crafty.scene("pong-game-loaded", function()
{
	Crafty.e("Bar1Actor");
	Crafty.e("Bar2Actor");
	Crafty.e("BallActor");
	
	Crafty.e("Actor, Color, wall, solid")
	      .attr({x: -10,
	             y: 0,
	             w: 20,
	             h: Crafty.viewport.height})
	      .color("white")
	             ;
	
	Crafty.e("Actor, Color, wall, solid")
          .attr({x: Crafty.viewport.width - 10,
                 y: 0,
                 w: 20,
                 h: Crafty.viewport.height})
          .color("white")
                 ;
});