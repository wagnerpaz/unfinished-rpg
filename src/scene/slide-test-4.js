Crafty.scene("slide-test-4", function()
{
	Crafty.e("2D, DOM, Text").attr({x: 10, y: 10}).text("Loading..");
	
	Crafty.loadMessageBoxSkin('skin/round-metal', function()
	{
		Crafty.load(["img/1/clotharmor.png", "dlg/intro.dlg.json", "dlg/check-bed1.dlg.json"], function()
		{
			Crafty.scene('slide-test-4-loaded');
		});
	});
});

Crafty.scene("slide-test-4-loaded", function()
{
	var hero = Crafty.e("HeroActor, BoxPosition, WPSlide")
                     .regBoxPosition("origin", "center", "top")
                     .regBoxPosition("dest",   "center", "center")
                     .regBoxPosition("dest2",  "right" , "center")
                     .regBoxPosition("dest3",  "left"  , "center")
                     .setBoxPosition("origin")
                     .slideLoop(["dest", "dest2", "dest", "origin", "dest", "dest3", "dest"], 2, 1000);
	
//	hero.slideTo(hero.getBoxPosition("dest"), 2)
//	    .bind("SlideEnd", function()
//        {
//	    	Crafty.e("BoxPosition, RoundMetalMBox")
//	              .boxPosition("center", "center", 220, 80)
//	              .customMBox(Crafty.asset("dlg/intro.dlg.json"))
//	              .bind("WPMessageBoxClosed", function()
//	              {
//	        	      hero.setControllable(true);
//	              })
//	              ;
//        });
	
//	Crafty.e("BoxPosition, RoundMetalMBox")
//    .boxPosition("fill", "bottom", 80)
//    .customMBox(Crafty.asset("dlg/check-bed1.dlg.json"));
});