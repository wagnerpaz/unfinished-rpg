Crafty.c("RoundMetalMBox",
{
	init: function()
	{
		this.requires("BaseEntity, WPMessageBox, Keyboard");
	}
,
	customMBox: function(text, position)
	{
		this.messageBox(text, {font: {family: 'Arial',
		                              weight: 'none',
		                              size  : '10px'},
		                       foreground : '#FFFFFF',
		                       background : '#000000',
		                       alpha      : 0.3,
		                       margin     : -1,
		                       padding    : 0,
		                       borderSize : 7,
		                       borderColor: 'transparent',
		                       borderSkin : 'skin/round-metal'
		                      })
		   .bind("KeyDown", function()
		   {
			   if(this.isDown("SPACE"))
		       {
				   this.next();
		       }
		   });
		return this;
	}
});