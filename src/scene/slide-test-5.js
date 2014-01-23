Crafty.scene("slide-test-5", function()
{
	Crafty.e("2D, DOM, Text").attr({x: 10, y: 10}).text("Loading..");
	
	Crafty.loadMessageBoxSkin('skin/round-metal', function()
	{
		Crafty.scene('slide-test-5-loaded');
	});
});

Crafty.scene("slide-test-5-loaded", function()
{
	
//	Crafty.e("RoundMetalMBox, BoxPosition")
//	      .regBoxPosition("origin", "fill", "bottom", 65, 10)
//	      .setBoxPosition("origin")      
//	      .customMBox(["Para mover o personagem clique com o botão esquerdo mouse no local desejado"])
//	      .bind("WPMessageBoxClosed", function()
//	      {
	          //HERO
	          var hero = Crafty.e("HeroActor, BoxPosition, WPSlide, WPRectBounds, solid")
	                           .regBoxPosition("origin", "center", "center")
	                           .setBoxPosition("origin")
	                           .wpRectBounds(20, 20, Crafty.viewport.width - 20, Crafty.viewport.height - 20, true)
	                           .bind("OutOfBounds", function(from, dest)
	                           {
	                        	   this.x = from.x;
	                        	   this.y = from.y;
	                        	   this.slidePause();
	                           })
	                           ;
	          
	          //OBSTACLES
	          Crafty.e("AntActor, WASDMultiway, solid")
	                .attr({x: 50, y: 50});
	    	  
	          //MOUSE TRACKER
	          Crafty.e("2D, Mouse")
	                .attr({
		              	x: 0,
		              	y: 0,
		              	w: Crafty.viewport.width,
		              	h: Crafty.viewport.height
	                })
	                .bind("Click", function(e)
	                {
	                    hero.regBoxPosition("target",
	                    		            Crafty.mousePos.x - hero._w / 2,
	                    		            Crafty.mousePos.y - hero._h / 2,
	                    		            hero._w,
	                    		            hero._h,
	                    		            undefined,
	                    		            true,
	                    		            'green')
	                        .slideTo("target", 1);
	                })
	                ;
//	      })
//	      ;
});