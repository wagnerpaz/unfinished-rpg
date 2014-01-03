Crafty.scene("slide-test-1", function()
{
	Crafty.e("2D, DOM, Text").attr({x: 10, y: 10}).text("Loading..");
	
	Crafty.load(["img/1/clotharmor.png"], function()
	{
		Crafty.scene('slide-test-1-loaded');
	});
});

Crafty.scene("slide-test-1-loaded", function()
{
	var createRandomPos = function()
	{
		var x = Math.random() * (Crafty.viewport.width  - 32);
		var y = Math.random() * (Crafty.viewport.height - 32);
		
		return {x: x, y: y};
	};
	
	var createRandomHero = function(speed)
	{
		Crafty.e("HeroSprite, BoxPosition, WPSlide")
              .attr(createRandomPos())
              .slideTo(createRandomPos(), speed)
              .bind("SlideEnd", function()
              {
            	  this.slideTo(createRandomPos(), speed);	
              })
              ;
	};
	
	createRandomHero(0.5);
	createRandomHero(1);
	createRandomHero(1);
	createRandomHero(0.5);
	createRandomHero(0.5);
	createRandomHero(1);
});