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
		Crafty.e("HeroActor, BoxPosition, WPSlide, solid")
              .attr(createRandomPos())
              .slideTo(createRandomPos(), speed)
              .bind("SlideEnd", function()
              {
            	  this.slideTo(createRandomPos(), speed);	
              })
              .onHit("solid", function()
              {
            	  this.slideTo(createRandomPos(), speed);
              })
              ;
	};
	
	var createRandomEnemy = function(speed)
	{
		Crafty.e("AntActor, BoxPosition, WPSlide, solid")
              .attr(createRandomPos())
              .slideTo(createRandomPos(), speed)
              .bind("SlideEnd", function()
              {
            	  this.slideTo(createRandomPos(), speed);	
              })
              ;
	};
	
	createRandomEnemy(0.5);
	createRandomEnemy(1);
	createRandomEnemy(1);
	createRandomEnemy(0.5);
	createRandomEnemy(0.5);
	createRandomEnemy(0.5);
	createRandomEnemy(1);
	createRandomEnemy(1);
	createRandomEnemy(0.5);
	createRandomEnemy(0.5);
	createRandomEnemy(1);
	createRandomEnemy(0.5);
	createRandomEnemy(0.5);
	createRandomEnemy(0.5);
	createRandomEnemy(1);
	createRandomEnemy(1);
	createRandomEnemy(0.5);
	createRandomEnemy(0.5);
	createRandomEnemy(0.5);
	createRandomEnemy(1);
	createRandomEnemy(1);
	createRandomEnemy(0.5);
	createRandomEnemy(0.5);
	createRandomEnemy(0.5);
	createRandomEnemy(1);
	createRandomEnemy(1);
	createRandomEnemy(0.5);
	createRandomEnemy(0.5);
	createRandomHero(3);
});