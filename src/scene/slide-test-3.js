Crafty.scene("slide-test-3", function()
{
	Crafty.e("2D, DOM, Text").attr({x: 10, y: 10}).text("Loading..");
	
	Crafty.load(["img/1/clotharmor.png", "img/1/ants.png"], function()
	{
		Crafty.scene('slide-test-3-loaded');
	});
});

Crafty.scene("slide-test-3-loaded", function()
{
	Crafty.e("HeroSprite, SpriteCollision, WASDMultiway, BoxPosition, solid")
	      .regBoxPosition("origin", "left", "center")
	      .setBoxPosition("origin")
	      ;
	Crafty.e("AntSprite, AntCollision, ArrowsMultiway, BoxPosition, solid")
          .regBoxPosition("origin", "right", "center")
          .setBoxPosition("origin")
          ;
});