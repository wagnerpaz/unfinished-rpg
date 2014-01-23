Crafty.c("Bar1Actor",
{
	init: function()
	{
		this.requires("2D, Actor, solid, bar, Bar1Sprite, SpriteCollision, ADTwoway, BoxPosition")
		    .twoway(2)
		    .regBoxPosition("origin", "center", "bottom")
		    .setBoxPosition("origin");
	}
});