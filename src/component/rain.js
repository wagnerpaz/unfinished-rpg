Crafty.c("WPRain",
{
	_rate      : 100,
	_speed     : 2  ,
	_direction : 180,
	_delay     : 100,
	
	init: function()
	{
		this.requires("2D");
	}
,
	rain: function(rate, speed, direction, delay)
	{
		this._rate      = rate      = rate      != undefined ? rate      : this._rate     ;
		this._speed     = speed     = speed     != undefined ? speed     : this._speed    ;
		this._direction = direction = direction != undefined ? direction : this._direction;
		this._delay     = delay     = delay     != undefined ? delay     : this._delay    ;
		
		for(var i = 0; i < rate; i++)
		{
			Crafty.e("2D, DOM, WPRainDrop, WPBoundCheck, Delay")
			      .rainRandomStartPosition()
			      .bind("OutOfBounds", function()
	    		  {
			    	  this.rainRandomStartPosition();
	    		  })
			      .delay(function()
			      {
			    	  this.rainDrop(direction, Math.random() * 0.6 + (speed-0.6));
			      }, i * delay)
			      ;
		}
	}
});

Crafty.c("WPRainDrop",
{
	_speed     : 2  ,
	_direction : 180,
	
	init: function()
	{
		this.requires("2D, Image, SlideAI")
		    .image("img/1/raindrop.png")
//		    .attr({alpha: 0.3})
		    ;
	}
,
	rainDrop: function(direction, speed)
	{
		this._speed     = speed     = speed     != undefined ? speed     : this._speed    ;
		this._direction = direction = direction != undefined ? direction : this._direction;
		
		this.slideToDirection(this._direction, this._speed);
		return this;
	}
,
	rainRandomStartPosition: function()
	{
		this.attr({x: Math.random() * Crafty.viewport.width, y: -this._h});
		return this;
	}
});