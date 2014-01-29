Crafty.c("WPSlide",
{
	_x0: null,
	_y0: null,
	_x1: null,
	_y1: null,
	_mvNormal: null
,
	init: function()
	{
		this.requires("2D")
		    .bind("EnterFrame", function()
		    {
		    	if(this._angle)
		    	{
		    		var from = {x: this._x, y: this._y};
		    		
		    		this.x += this._dircX;
		    		this.y += this._dircY;
		    		
		    		if(this._x != from._x
		    		|| this._y != from._y)
		    		{
		    			var dest = {x: this._x1, y: this._y1};
		    			this.trigger("Moved", from, dest);
		    		}
		    		
		    		//DEFINE QUANDO CHEGA AO FIM DA TRAGETORIA
		    		if(this._reachedTargetX(this._x1)
		    		&& this._reachedTargetY(this._y1))
		    		{
		    			//console.log("SlideEnd");
		    			//console.log("x: " + this._x1);
		    			//console.log("y: " + this._y1);
		    			
		    			this. x = this._x1;
		    			this. y = this._y1;
		    			this._angle = undefined;
		    			
		    			this.trigger("NewDirection", {x: 0, y: 0});
		    			this.trigger("SlideEnd");
		    		}
		    		else if(this._reachedTargetX(this._x1)
		    		     || this._reachedTargetY(this._y1) )
		    		{
		    			this.slideTo({x: this._x1, y: this._y1}, this._speed);
		    		}
		    	}
		    });
	}
,
	_reachedTargetX: function(x1)
	{
		return (this._dircX > 0 && x1 != null && this._x > x1)
		    || (this._dircX < 0 && x1 != null && this._x < x1);
	}
,
	_reachedTargetY: function(y1)
	{
		return (this._dircY > 0 && y1 != null && this._y > y1)
		   ||  (this._dircY < 0 && y1 != null && this._y < y1);
	}
,
	slideTo: function(regPositionName, speed)
	{
		this._x0 = this._x;
		this._y0 = this._y;
		
		if(typeof regPositionName == 'string')
		{
			this._x1 = this._regPositions[regPositionName].x;
			this._y1 = this._regPositions[regPositionName].y;
		}
		else
		{
			this._x1 = regPositionName.x;
			this._y1 = regPositionName.y;
		}
		
		this._diffX    = this._x1 - this._x0;
		this._diffY    = this._y1 - this._y0;
		this._diffXAbs = Math.abs(this._diffX);
		this._diffYAbs = Math.abs(this._diffY);
		
		//console.log("_diffX: " + this._diffX);
		//console.log("_diffY: " + this._diffY);
		
		this._angle = this._toDegrees(Math.atan(1.0 * this._diffY / this._diffX));
		this._angle = (this._diffX < 0 ? 180 : 0) + this._angle;
		
		this._speed = speed !== undefined ? Math.abs(speed) : 3;
		this._dircX = this._round8(Math.cos(this._toRadians(this._angle)) * this._speed);
		this._dircY = this._round8(Math.sin(this._toRadians(this._angle)) * this._speed);
		
		//console.log("_angle: " + this._angle);
		//console.log("_dircX: " + this._dircX);
		//console.log("_dircY: " + this._dircY);
		
		this.trigger("NewDirection", {x: this._dircX, y: this._dircY});
		return this;
	}
,
	slideToDirection: function(angle, speed)
	{
		this._angle = angle = angle % 360;
		this._x0 = this._x;
		this._y0 = this._y;
		this._mvNormal = {x: angle < 90 && angle > 270 ? 1 : -1,
		                  y: angle > 180               ? 1 : -1};
		
		this.slideSpeed(speed !== undefined ? Math.abs(speed) : 3);
		
		//console.log("_angle: " + this._angle);
		//console.log("_dircX: " + this._dircX);
		//console.log("_dircY: " + this._dircY);
		
		this.trigger("NewDirection", {x: this._dircX, y: this._dircY});
		return this;
	}
,
	slideSpeed: function(speed)
	{
		this._speed = speed !== undefined ? Math.abs(speed) : 3;
		this._dircX = this._round8(Math.cos(this._angle * (Math.PI / 180)) * this._speed);
		this._dircY = this._round8(Math.sin(this._angle * (Math.PI / 180)) * this._speed);
	}
,
	slideLoop: function(coordinates, speed, delay)
	{
		delay = delay !== undefined ? delay : 0;
		
		var i = 1;
		
		var x0 = this._x;
		var y0 = this._y;
		
		var entity = this;
		
		this.bind("SlideEnd", function()
	    {
			var content = function()
			{
				var dest = entity._retrievePosition(coordinates[i]);
				
				//PERCORRENDO COORDENADAS PASSADAS NO PARAMETRO
				if(i >= 0 && dest !== undefined)
				{
					i = i + 1 < coordinates.length ? i + 1 : -1;
					entity.slideTo(dest, speed);
				}
				//RETORNANDO A ORIGEM
				else
				{
					i = 0;
					entity.slideTo({x: x0, y: y0}, speed);
				}
			};
			
			if(delay > 0)
			{
				this.addComponent("Delay");
				this.delay(content, delay);
			}
			else
			{
				content();
			}
			
	    });
		
		this.slideTo(this._retrievePosition(coordinates[0]), speed);
	}
,
	slidePause: function()
	{
		this._angle = undefined;
		this.trigger("NewDirection", {x: 0, y: 0});
	}
,
	_retrievePosition: function(pos)
	{
		if(typeof pos == 'string')
		{
			return this._regPositions[pos];
		}
		else
		{
			return pos;
		}
	}
,
	_toDegrees: function(rad)
	{
		return rad * (180 / Math.PI);
	}
,
	_toRadians: function(deg)
	{
		return deg * (Math.PI / 180);
	}
,
	_round8: function(d)
	{
		return Math.round(d * 100000000.0) / 100000000.0;
	}
});