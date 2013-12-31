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
//	Crafty.e("2D, Canvas, Image")
//	      .attr({x: 0, y: 0, w: Crafty.viewport.width, h: Crafty.viewport.height, alpha: 0.8})
//	      .image("img/1/5.jpg", 'repeat');
	
//	Crafty.e("2D, Canvas, Color")
//	      .attr({x: 0, y: 0, w: Crafty.viewport.width, h: Crafty.viewport.height, alpha: 0.7})
//	      .color("black");
	
	var createRandomPos = function()
	{
		var x = Math.random() * (Crafty.viewport.width  - 32);
		var y = Math.random() * (Crafty.viewport.height - 32);
		
		return {x: x, y: y};
	};
	
	var createRandomHero = function(speed)
	{
		Crafty.e("HeroSprite, BoxPosition, SlideAI")
              .attr(createRandomPos())
              .slideTo(createRandomPos(), speed)
              .bind("SlideEnd", function()
              {
            	  this.slideTo(createRandomPos(), speed);	
              })
              ;
	};
	
//	Crafty.e("Canvas, BoxPosition, WPRain").rain(100, 5, 180, 80);
	
	var hero = Crafty.e("HeroSprite, BoxPosition, SlideAI")
                     .regBoxPosition("origin", "center", "center", undefined, undefined, undefined, true, 'green')
                     .regBoxPosition("target", "center", "top", undefined, undefined, undefined, true, 'red')
//                     .regBoxPosition("target", "right", "top", undefined, undefined, undefined, true, 'red')
//                     .regBoxPosition("target", "right", "center", undefined, undefined, undefined, true, 'red')
//                     .regBoxPosition("target", "right", "bottom", undefined, undefined, undefined, true, 'red')
//                     .regBoxPosition("target", "center", "bottom", undefined, undefined, undefined, true, 'red')
//                     
//                     .regBoxPosition("target", "left", "bottom", undefined, undefined, undefined, true, 'red')
//                     .regBoxPosition("target", "left", "center", undefined, undefined, undefined, true, 'red')
//                     .regBoxPosition("target", "left", "top", undefined, undefined, undefined, true, 'red')
                     .setBoxPosition("origin")
                     .slideTo("target", 1)
//                     .slideToDirection(-63, 1)
                     ;
	
//	createRandomHero(0.5);
//	createRandomHero(1);
//	createRandomHero(1);
//	createRandomHero(0.5);
//	createRandomHero(0.5);
//	createRandomHero(1);
});