Crafty.c("ArrowsAsteroidControl",
{
	rotationSpeed: 4,
	rotationInc: 0,
	aceleration: 0.05,
	acelerationInc: 0,
	_speed: 0
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
				this.acelerationInc = this.aceleration;
			}
		});
		
		this.bind('KeyUp', function(e)
		{
			if(e.key == Crafty.keys['LEFT_ARROW']  && this.rotationInc < 0
			|| e.key == Crafty.keys['RIGHT_ARROW'] && this.rotationInc > 0)
			{
				this.rotationInc = 0;
			}
			
			if(e.key == Crafty.keys['UP_ARROW'])
			{
				this.acelerationInc = -this.aceleration;
			}
		});
		
		this.bind("EnterFrame", function()
	    {
			//ROTACAO
			if(this.rotationInc !== 0)
			{
				this.rotation = (this.rotation + this.rotationInc) % 360;
			}
			
			//EM MOVIMENTO
			if(this.acelerationInc !== 0)
			{
				var newSpeed = this._speed + this.acelerationInc;
				newSpeed = newSpeed < 8 ? newSpeed : 12;
				if(newSpeed > 0)
				{
					this.slideSpeed(newSpeed);
					
					if(newSpeed <= 0)
					{
						this.acelerationInc = 0;
						this.slidePause();
					}
					
					if(this.acelerationInc > 0)
					{
						this.slideToDirection(this.rotation, this._speed);
					}
				}
			}
			else
			{
				this.slidePause();
			}
	    });
	}
});