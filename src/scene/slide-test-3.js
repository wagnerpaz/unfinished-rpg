Crafty.scene("slide-test-3", function()
{
	Crafty.e("2D, DOM, Text").attr({x: 10, y: 10}).text("Loading..");
	
	Crafty.load(["img/1/clotharmor.png"], function()
	{
		Crafty.scene('slide-test-3-loaded');
	});
});

Crafty.scene("slide-test-3-loaded", function()
{
	Crafty.e("HeroSprite, Player1Controls, BoxPosition, WPRectBounds")
	      .regBoxPosition("origin", "left", "center")
	      .setBoxPosition("origin")
	      .bind("OutOfBounds", function(from)
	      {
	    	  this.x = from.x;
	    	  this.y = from.y;
	      })
	      ;
	Crafty.e("HeroSprite, Player2Controls, BoxPosition, WPRectBounds")
          .regBoxPosition("origin", "right", "center")
          .setBoxPosition("origin")
          .bind("OutOfBounds", function(from)
          {
	  	      this.x = from.x;
	  	      this.y = from.y;
          })
          ;
});