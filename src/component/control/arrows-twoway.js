Crafty.c("ArrowsTwoway",
{
	DEFAULT_SPEED: 2,
	KEY_BINDINGS: {RIGHT_ARROW:  0, LEFT_ARROW :  180},
	
	init: function()
	{
		this.requires("Multiway")
			.multiway(this.DEFAULT_SPEED, this.KEY_BINDINGS)
		    ;
	}
,
	twoway: function(speed)
	{
		if(!speed) {this.DEFAULT_SPEED;}
		this.multiway(speed, this.KEY_BINDINGS);
		return this;
	}
});