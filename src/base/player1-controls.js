Crafty.c("Player1Controls",
{
	init: function()
	{
		this.requires("Multiway")
			.multiway(2, {W: -90, S: 90, D: 0, A: 180})
		    ;
	}
});