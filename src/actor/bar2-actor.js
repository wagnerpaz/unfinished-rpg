Crafty.c("Bar2Actor",
{
	init: function()
	{
		this.requires("2D, Actor, solid, bar, Bar2Sprite, SpriteCollision, ArrowsTwoway, BoxPosition")
		    .twoway(2)
		    .regBoxPosition("origin", "center", "top")
		    .setBoxPosition("origin");
	}
});