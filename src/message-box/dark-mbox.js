Crafty.c("DarkMBox",
{
	init: function()
	{
		this.requires("BaseEntity, WPMessageBox, Keyboard");
	}
,
	customMBox: function(text)
	{
		this.messageBox(text, {font: {family: 'Arial',
		                              weight: 'none',
		                              size  : '10px'},
		                       foreground : '#FFFFFF',
		                       background : '#000000',
		                       alpha      : 0.3,
		                       margin     : 0,
		                       padding    : 10,
		                       borderSize : 0
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