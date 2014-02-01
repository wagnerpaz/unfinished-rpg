Crafty.c("FireSprite",
{
	init: function()
	{
		Crafty.sprite(30, 49, "img/1/fire.png",
		{
			FireSpriteImg : [ 0, 0 ]
		}, 0, 0);
		
		this.requires("SpriteAnimation, FireSpriteImg")
		    .animate("FireStarting",  0, 0,  7)
		    .animate("FireBurning" ,  8, 0, 11)
		    .animate("FireEnding"  , 12, 0, 17)
		    ;
		this.stop();
	}
});