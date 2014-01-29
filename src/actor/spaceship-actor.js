Crafty.c("SpaceshipActor",
{
	init: function()
	{
		this.requires("Actor, SpaceshipSprite, ArrowsAsteroidControl, SpriteCollision")
		    .attr({w: 41, h: 41})
	        .origin("center")
	        ;
	}
});