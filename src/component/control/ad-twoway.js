Crafty.c("ADTwoway",
{
	DEFAULT_SPEED: 2,
	KEY_BINDINGS: {A:  180, D:  0},
	
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