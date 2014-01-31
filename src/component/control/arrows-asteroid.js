Crafty.c("ArrowsAsteroidControl",
{
	accelerating: false,
	
	impulses: [],
	impulseCount: 0,
	
	rotationSpeed: 4,
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
			}
		});
		
		this.bind("EnterFrame", function()
	    {
			//ROTACAO
			this._updateRotation();
			
			for(var i = 0; i < 360; i++)
			{
				if(this.rotation == i && this.accelerating)
				{
					this.impulses[i] = this._getImpulse(i);
				}
				
				if(this.impulses[i])
				{
					this._updateImpulse(i);
				}
			}
			
			if(this.impulses[0])
			this.slideTo({
				x: this.impulses[0].x + this._x + (this._w/2),
				y: this.impulses[0].y + this._y + (this._h/2)});
	    });
	}
,
	_getImpulse: function(angle)
	{
		if(!this.impulses[angle])
		{
			var impulse = {
				MAX_IMPULSE_SPEED: 50,
				acc: 0.01,
				inc: 0,
				debug: null
			};
			impulse.v = this.toVector(angle, impulse.acc);
			
			this.impulses[angle] = impulse;
		}
		return this.impulses[angle];
	}
,
	_updateImpulse: function(angle)
	{
		var impulse = this.impulses[angle];
		
		if(this.accelerating && angle == this.rotation)
		{
			if(impulse.inc < 0)
			{
				impulse.inc = 0;
			}
			impulse.inc += impulse.acc;
		}
		else
		{
			if(impulse.inc > 0)
			{
				impulse.inc = 0;
			}
			impulse.inc -= impulse.acc;
		}
		
		var speed = impulse.v.magnitude();
		speed += impulse.inc;
		if(speed > impulse.MAX_IMPULSE_SPEED)
		{
			speed = impulse.MAX_IMPULSE_SPEED;
			impulse.inc = 0;
		}
		
		if(speed > 0)
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
		this._updateImpulseDebug(this.impulses[angle]);
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
		}
	}
,
	_updateImpulseDebug: function(impulse)
	{
		if(impulse)
		{
			if(impulse.debug)
			{
				impulse.debug.destroy();
			}
			
			if(impulse.v)
			{
				impulse.debug = Crafty.e("2D, DOM, Color")
		                              .attr({
			      	                      x: impulse.v.x + (this._w / 2) + this._x,
			      	                      y: impulse.v.y + (this._h / 2) + this._y,
			      	                      w: 5,
			      	                      h: 5
		                              })
		                              .color("magenta")
		                              ;
			}
		}
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