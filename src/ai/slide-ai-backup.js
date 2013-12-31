Crafty.c("SlideAI",
{
	_x0: null,
	_y0: null,
	_x1: null,
	_y1: null,
	_f : null
,
	init: function()
	{
		this.requires("2D")
		    .bind("EnterFrame", function()
		    {
		    	if(this._f)
		    	{
		    		if(Math.abs(this._f._a) < 1)
		    		{
		    			this.x += this._dircX * this._s();
		    			this.y =  this._dircY != 0 ? this._f.y(this._x) : this._y0;
		    		}
		    		else
		    		{
		    			this.y += this._dircY * this._s();
		    			this.x =  this._dircX != 0 ? this._f.x(this._y) : this._x0;
		    		}
		    		
		    		//DEFINE QUANDO CHEGA AO FIM DA TRAGETORIA
		    		if( (this._dircX > 0 && this._x1 != null && this._x > this._x1)
		    		||  (this._dircX < 0 && this._x1 != null && this._x < this._x1)
		    		||  (this._dircY > 0 && this._y1 != null && this._y > this._y1)
		    		||  (this._dircY < 0 && this._y1 != null && this._y < this._y1) )
		    		{
		    			this. x = this._x1;
		    			this. y = this._y1;
		    			this._f = null;
		    			
		    			this.trigger("NewDirection", {x: 0, y: 0});
		    			this.trigger("SlideEnd");
		    		}
		    	}
		    });
	}
,
	_s: function()
	{
		return this._speed;
	}
,
	slideTo: function(regPositionName, dest, speed)
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
			speed = dest;
		}
		
		this._diffX    = this._x1 - this._x0;
		this._diffY    = this._y1 - this._y0;
		this._diffXAbs = Math.abs(this._diffX);
		this._diffYAbs = Math.abs(this._diffY);
		this._dircX    = this._diffXAbs != 0 ? this._diffX / this._diffXAbs : 0;
		this._dircY    = this._diffYAbs != 0 ? this._diffY / this._diffYAbs : 0;
		this._speed    = speed !== undefined ? Math.abs(speed) : 3;
		
		this._f = this._createLineEquationP(this._x, this._y, this._x1, this._y1);
		
		this.trigger("NewDirection", {x: this._dircX, y: this._dircY});
		return this;
	}
,
	slideToDirection: function(angle, speed)
	{
		console.log("\n");
		
		this._angle = angle = angle % 360;
		this._x0 = this._x;
		this._y0 = this._y;
		
		console.log(angle);
		
		var xh = 0;
		var yh = 90;
		
		this._speed = speed !== undefined ? Math.abs(speed) : 3;
		this._dircX = angle == 0 + xh  || angle == 180 + xh ? 0 : angle > 0 + xh  && angle < 180 + xh ? 1 : -1;
		this._dircY = angle == 0 + yh  || angle == 180 + yh ? 0 : angle > 0 + yh  && angle < 180 + yh ? 1 : -1;
		
		console.log("_dircX: " + this._dircX);
		console.log("_dircY: " + this._dircY);
		
		this._f = this._createLineEquationA(this._x, this._y, angle + 90);
		
		this.trigger("NewDirection", {x: this._dircX, y: this._dircY});
		return this;
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
	_createLineEquationA: function(x1, y1, angle)
	{
		var a = this._calculateAngularCoeficientA(angle);
		var b = this._calculateLinearCoeficient  (x1, y1, a);
		
		return this._createLineEquation(a, b);
	}
,
	_createLineEquationP: function(x1, y1, x2, y2)
	{
		var a = this._calculateAngularCoeficientP(x1, y1, x2, y2);
		var b = this._calculateLinearCoeficient  (x1, y1, a);
		
		return this._createLineEquation(a, b);
	}
,
	_createLineEquation: function(a, b)
	{
//		console.log("a: " + a);
//		console.log("b: " + b);
		
		var f =
		{
			_a: a,
			_b: b,
			
			y: function(x)
			{
				return a * x + b;
			}
		,
			x: function(y)
			{
				return (y - b) / a;
			}
		,
			a: function()
			{
				return a;
			}
		};
		return f;
	}
,
	_calculateAngularCoeficientA: function(angle)
	{
		return Math.tan(angle * (Math.PI / 180));
	}
,
	_calculateAngularCoeficientP: function(x1, y1, x2, y2)
	{
		return (1.0 * (y2 - y1)) / (1.0 * (x2 - x1));
	}
,
	_calculateLinearCoeficient: function(x, y, a)
	{
		return -1.0 * a * x + y;
	}
});