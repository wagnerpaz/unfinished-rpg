Crafty.scene("slide-test-6", function()
{
	Crafty.e("2D, DOM, Text").attr({x: 10, y: 10}).text("Loading..");
	
	Crafty.load(["img/1/clotharmor.png"], function()
	{
		Crafty.scene('slide-test-6-loaded');
	});
});

Crafty.scene("slide-test-6-loaded", function()
{
	Crafty.e("2D, DOM, TiledMapBuilder").setMapDataSource( SOURCE_FROM_TILED_MAP_EDITOR )
	      .createWorld( function( map )
	      {
	          console.log("done");
	      })
	      ;
	
	Crafty.e("HeroActor, BoxPosition, WPSlide, solid")
	      .regBoxPosition("origin", "left", "center")
	      .setBoxPosition("origin")
	      .regBoxPosition("target", "right", "center")
	      .slideTo("target", 2)
	      ;
	
	Crafty.e("HeroActor, BoxPosition, WPSlide, solid")
	      .regBoxPosition("origin", "right", "center")
	      .setBoxPosition("origin")
	      .regBoxPosition("target", "left", "center")
	      .slideTo("target", 1)
	      ;
	
	Crafty.e("HeroActor, BoxPosition, WASDMultiway, solid")
	      .regBoxPosition("origin", "center", "center")
	      .setBoxPosition("origin")
          ;
});