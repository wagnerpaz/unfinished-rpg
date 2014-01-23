Crafty.c("WASDMultiway",
{
	init: function()
	{
		this.requires("Multiway")
			.multiway(2, {W: -90,
			              S:  90,
			              D:  0,
			              A:  180})
		    ;
	}
});