Crafty.c("ArrowsMultiway",
{
	init: function()
	{
		this.requires("Multiway")
		    .multiway(2, {UP_ARROW   : -90,
		                  DOWN_ARROW :  90,
		                  RIGHT_ARROW:  0,
		                  LEFT_ARROW :  180})
		    ;
	}
});