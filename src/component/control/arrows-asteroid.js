Crafty.c("ArrowsAsteroidControl",
{
	MAX_IMPULSE_SPEED: 10,
	ACC: 0.02,
	DACC: 0.002,
	INITIAL_SPEED: 0.001,
	
	accelerating: false,
	
	impulses: [],
	impulseCount: 0,
	
	rotationSpeed: 5,
	rotationInc: 0
,
	init: function()
	{
		this.requires("2D, WPSlide")
		    ;
		
		this.bind('KeyDown', function(e)
		{
			if(e.key == Crafty.keys['LEFT_ARROW'])
			{
				this.rotationInc = -this.rotationSpeed;
			}
			else if (e.key == Crafty.keys['RIGHT_ARROW'])
			{
				this.rotationInc = this.rotationSpeed;
			}
			else if (e.key == Crafty.keys['UP_ARROW'])
			{
				this.accelerating = true;
				this.fire1.stop().animate("FireStarting", 10, 0);
				this.fire2.stop().animate("FireStarting", 10, 0);
			}
		});
		
		this.bind('KeyUp', function(e)
		{
			if(e.key == Crafty.keys['LEFT_ARROW' ] && this.rotationInc < 0
			|| e.key == Crafty.keys['RIGHT_ARROW'] && this.rotationInc > 0)
			{
				this.rotationInc = 0;
			}
			
			if(e.key == Crafty.keys['UP_ARROW'])
			{
				this.accelerating = false;
				this.fire1.stop().animate("FireEnding", 10, 0);
				this.fire2.stop().animate("FireEnding", 10, 0);
			}
		});
		
		this.bind("EnterFrame", function()
	    {
			//ROTACAO
			this._updateRotation();
			this._updateImpulse();
			
	    });
	}
,
	_updateImpulse: function(i)
	{
		var vResult = null;
		for(var angle = 0; angle < 360; angle++)
		{
			var impulse = this._getImpulse(angle, this.accelerating && this.rotation == angle);
			
			if(impulse)
			{
				if(this.accelerating && this.rotation == angle)
				{
					if(impulse.inc < 0)
					{
						impulse.inc = 0;
					}
					impulse.inc += this.ACC;
				}
				else
				{
					if(impulse.inc > 0)
					{
						impulse.inc = 0;
					}
					impulse.inc -= this.DACC;
				}
				
				var speed = impulse.v.magnitude();
				speed += impulse.inc;
				if(speed > this.MAX_IMPULSE_SPEED)
				{
					speed = this.MAX_IMPULSE_SPEED;
					impulse.inc -= this.DACC;
				}
				
				if(speed >= 0)
				{
					impulse.v.normalize().scale(speed);
				}
				else
				{
					if(this.impulses[angle].debug)
					{
						this.impulses[angle].debug.destroy();
					}
					this.impulses[angle] = null;
				}
				//this._updateImpulseDebug(this.impulses[angle], "magenta");
				
				if(!vResult)
				{
					vResult = impulse.v;
				}
				else
				{
					vResult = new Crafty.math.Vector2D(
						(vResult.x + impulse.v.x) ,
						(vResult.y + impulse.v.y) 
					);
					
				}
			}
		}
		
		var resultSpeed = null;
		if(vResult  && (resultSpeed = vResult.magnitude()) > 0)
		{
			if(resultSpeed > 10)
			{
				vResult.normalize().scale(10);
				resultSpeed = 10;
			}
			//this._updateImpulseDebug({v: vResult}, "blue");
			var angle = this._toDegrees(Math.atan(1.0 * vResult.y / vResult.x));
			    angle = Math.floor( (vResult.x < 0 ? 180 : 0) + angle );
			
			this.slideToDirection(angle-90, resultSpeed);
		}
		else
		{
			this.slidePause();
		}
	}
,
	_updateRotation: function()
	{
		if(this.rotationInc !== 0)
		{
			this.rotation = (this.rotation + this.rotationInc) % 360;
			
			if(this.rotation < 0)
			{
				this.rotation = 360 + this.rotation;
			}
			
			this.fire1.rotation = (this.rotation) % 360;
			this.fire2.rotation = (this.rotation) % 360;
		}
	}
,
	_updateImpulseDebug: function(impulse, color)
	{
		if(impulse)
		{
			var clone = impulse.v.clone();
			
			if(impulse.debug)
			{
				impulse.debug.destroy();
			}
			
			clone.scale(50);
			
			if(clone)
			{
				impulse.debug = Crafty.e("2D, DOM, Color")
		                              .attr({
			      	                      x: clone.x + (this._w / 2) + this._x,
			      	                      y: clone.y + (this._h / 2) + this._y,
			      	                      w: 5,
			      	                      h: 5
		                              })
		                              .color(color)
		                              ;
			}
		}
	}
,
	_getImpulse: function(angle, create)
	{
		if(!this.impulses[angle] && create)
		{
			var impulse = {
				inc: 0,
				debug: null
			};
			impulse.v = this.toVector(Math.floor(angle), this.INITIAL_SPEED);
			
			this.impulses[angle] = impulse;
		}
		return this.impulses[angle];
	}
,
	_ajustRotation: function(rotation)
	{
		rotation %= 360;
		if(rotation > 180)
		{
			rotation = (rotation - 360);
		}
		else if(rotation < -180)
		{
			rotation = (rotation + 360);
		}
		return rotation;
	}
});