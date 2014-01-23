/**@
 * #Grid2D
 * @category 2D
 * A component for performing the positioning and resizing of entities customly.
 * to the viewport size.
 */
Crafty.c(
	"Grid2D",
	{_wGrid: 		null,
	 _hGrid: 		null,
	 _xEntityGrid: null,
	 _yEntityGrid: null,
	 _wEntityGrid: null,
	 _hEntityGrid: null,
	  
	 init:
	 function() {
	     this.requires("2D");
	 },
	  
	 /**@
	  * #.grid2D
	  * @comp Grid2D
	  * @sign public this .grid2D(Number gW,
	  * 						   Number gH,
	  * 						   Number  x,
	  * 						   Number  y,
	  * 						   Number  w,
	  * 						   Number  h)
	  * @param gW - the width of the virtual grid
	  * @param gH - the height of the virtual grid
	  * @param x - the entity `x` position in the virtual grid
	  * @param y - the entity `y` position in the virtual grid
	  * @param w - the entity width in the virtual grid
	  * @param h - the entity height in the virtual grid
	  *
	  * Perform the positioning (x, y) and resizing (w, h) of entities proportionally
	  * to the viewport size (Crafty.viewport.width x Crafy.viewport.height). It uses a 
	  * custom dimension grid to map virtual positions and dimensions.
	  *
	  * @example
	  * ~~~
	  * Crafty.init(500, 500).canvas.init();
	  * 
	  * Crafty.e("2D, Color, Multiway, Grid2D")
	  * 	   .color("white")
	  *	   .multiway(4, {D: 0, A: 180})
	  *	   .grid2D(50, 50, 21, 0, 8, 1);
	  * ~~~
	  */
	 grid2D:
	 function(gW, gH, x, y, w, h) {
	     var vpW = Crafty.viewport.width;
	     var vpH = Crafty.viewport.height;
	      
	     // Stores the virtual grid numbers
	     this._wGrid		= gW;
	     this._hGrid		= gH;
	     this._xEntityGrid	= x;
	     this._yEntityGrid	= y;
	     this._wEntityGrid = w;
	     this._hEntityGrid = h;
	      
	     // Do the proportion calcs
	     var xEntityVp = Math.round((vpW * x) / gW);
	     var yEntityVp = Math.round((vpH * y) / gH);
	      
	     var wEntityVp = Math.round((vpW * w) / gW);
	     var hEntityVp = Math.round((vpH * h) / gH);
	      
	     // Set the calculated `x`, `y`, width and height
	     this.attr({x: xEntityVp, y: yEntityVp, w: wEntityVp, h: hEntityVp});
	
	     return this;
	 }
    });