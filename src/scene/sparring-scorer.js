Crafty.scene("sparring-scorer", function()
{
	Crafty.e("2D, DOM, Text").attr({x: 10, y: 10}).text("Loading..");
	Crafty.scene('sparring-scorer-loaded');
});

Crafty.scene("sparring-scorer-loaded", function()
{
	Crafty.background('black');
	
//	Crafty.e("2D, DOM, Color, Grid2D")
//	      .grid2D(3, 1, 0, 0, 1, 1)
//	      .color("blue")
//	      ;
//	
//	Crafty.e("2D, DOM, Color, Grid2D")
//          .grid2D(3, 1, 1, 0, 1, 1)
//          .color("white")
//          ;
//	
//	Crafty.e("2D, DOM, Color, Grid2D")
//          .grid2D(3, 1, 2, 0, 1, 1)
//          .color("red")
//          ;
	
for(var i = 0; i < 5; i++)
for(var j = 0; j < 5; j++)
{
	Crafty.e("2D, DOM, Color, Grid2D")
          .grid2D(5, 5, i, j, 1, 1)
          .color( (i+j) % 2 == 0 ? "black" : "white")             
          ;                         
}
	
//	//BOTAO VERMELHO +
//	Crafty.e("2D, DOM, Color")
//	      .attr({
//	    	 x: 0,
//	    	 y: 0,
//	    	 w: Crafty.viewport.width  * 1 / 2,
//	    	 h: Crafty.viewport.height * 1 / 3
//	      })
//	      .color("red")
//	      ;
//	
//	//BOTAO AZUL +
//	Crafty.e("2D, DOM, Color")
//          .attr({
//	  	      x: Crafty.viewport.width  * 1 / 2,
//	  	      y: 0,
//	  	      w: Crafty.viewport.width  * 1 / 2,
//	  	      h: Crafty.viewport.height * 1 / 3
//          })
//          .color("blue")
//          ;
//	
//	//MARCADOR VERMELHO
//	Crafty.e("2D, DOM, Text")
//          .attr({
//		      x: 0,
//		      y: Crafty.viewport.height * 3 / 8,
//		      w: Crafty.viewport.width  * 1 / 4,
//		      h: Crafty.viewport.height * 1 / 3
//          })
//          .text("00")
//          .textColor("#FF0000")
//          .textFont({family: "Arial"})
//          ;
//	
//	//TEMPO
//	Crafty.e("2D, DOM, Text")
//	      .attr({
//	  	      x: Crafty.viewport.width  * 2 / 8,
//	  	      y: Crafty.viewport.height * 3 / 8,
//	  	      w: Crafty.viewport.width  * 2 / 4,
//	  	      h: Crafty.viewport.height * 1 / 3
//	      })
//	      .text("00:00")
//	      .textColor("#FFFFFF")
//	      .textFont({family: "Arial", size: "40px"})
//	      ;
//	
//	//MARCADOR AZUL
//	Crafty.e("2D, DOM, Text")
//          .attr({
//        	  x: Crafty.viewport.width  * 3 / 4,
//        	  y: Crafty.viewport.height * 3 / 8,
//        	  w: Crafty.viewport.width  * 1 / 4,
//        	  h: Crafty.viewport.height * 1 / 3
//          })
//          .text("00")
//          .textColor("#0000FF")
//          .textFont({family: "Arial"})
//          ;
//	
//	//BOTAO VERMELHO -
//	Crafty.e("2D, DOM, Color")
//          .attr({
//	        	x: 0,
//	        	y: Crafty.viewport.height * 2 / 3,
//	        	w: Crafty.viewport.width  * 1 / 2,
//	        	h: Crafty.viewport.height * 1 / 3
//          })
//          .color("red")
//          ;
//	
//	//BOTAO AZUL -
//	Crafty.e("2D, DOM, Color")
//	    .attr({
//		      x: Crafty.viewport.width  * 1 / 2,
//		      y: Crafty.viewport.height * 2 / 3,
//		      w: Crafty.viewport.width  * 1 / 2,
//		      h: Crafty.viewport.height * 1 / 3
//	    })
//	    .color("blue")
//	    ;
});