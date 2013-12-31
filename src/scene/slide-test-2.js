Crafty.scene("slide-test-2", function()
{
	Crafty.e("2D, DOM, Text").attr({x: 10, y: 10}).text("Loading..");
	
	Crafty.load(["img/1/clotharmor.png"], function()
	{
		Crafty.scene('slide-test-2-loaded');
	});
});

Crafty.scene("slide-test-2-loaded", function()
{
	var createHero = function(i, d)
	{
		Crafty.e("HeroSprite, BoxPosition, SlideAI, Delay")
	          .regBoxPosition("origin", "center", "center")
	          .setBoxPosition("origin")
	          .delay(function()
		      {
		          this.slideToDirection(i, 1);
		      }, d);
	};
	
	for(var i = 0; i <= 360; i += 10)
	{
		createHero(i, i*20);
	}
	
	for(var i = 0; i <= 360; i += 10)
	{
		createHero(i, 10000);
	}
});