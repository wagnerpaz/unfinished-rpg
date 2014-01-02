Crafty.c("AntSprite",
{
	init: function()
	{
		Crafty.sprite(18, "img/1/ants.png",
		{
			antReel : [ 0, 0 ]
		});
		
		this.requires("BaseEntity, SpriteAnimation, antReel")
		    .animate("AntStandingNorth", 1, 0, 1)
		    .animate("AntWalkingNorth" , 0, 0, 1)
		    .animate("AntStandingSouth", 1, 1, 1)
		    .animate("AntWalkingSouth" , 0, 1, 1)
		    .animate("AntStandingWest" , 1, 4, 1)
		    .animate("AntWalkingWest"  , 0, 4, 1)
		    .animate("AntStandingEast" , 1, 5, 1)
		    .animate("AntWalkingEast"  , 0, 5, 1)
		    .bind("NewDirection", function (direction)
		    {
		    	if(Math.abs(direction.x) > Math.abs(direction.y))
		    	{
			        if (direction.x < 0 && !this.isPlaying("AntWalkingWest"))
			        {
			        	this.stop().animate("AntWalkingWest", 10, -1);
			        }
			        if (direction.x > 0 && !this.isPlaying("AntWalkingEast"))
			        {
			        	this.stop().animate("AntWalkingEast", 10, -1);
			        }
		    	}
		    	else
		    	{
		    		if (direction.y < 0 && !this.isPlaying("AntWalkingNorth"))
			        {
			            this.stop().animate("AntWalkingNorth", 10, -1);
			        }
			        if (direction.y > 0 && !this.isPlaying("AntWalkingSouth"))
			        {
			            this.stop().animate("AntWalkingSouth", 10, -1);
			        }
		    	}
		    	
		    	if(!direction.x && !direction.y)
		        {
		        	if(this.isPlaying("AntWalkingWest", 10, -1))
		        	{
		        		this.stop().animate("AntStandingWest", 30, -1);
		        	}
		        	else if(this.isPlaying("AntWalkingEast", 10, -1))
		        	{
		        		this.stop().animate("AntStandingEast", 30, -1);
		        	}
		        	else if(this.isPlaying("AntWalkingNorth", 10, -1))
		        	{
		        		this.stop().animate("AntStandingNorth", 30, -1);
		        	}
		        	else if(this.isPlaying("AntWalkingSouth", 10, -1))
		        	{
		        		this.stop().animate("AntStandingSouth", 30, -1);
		        	}
		        	else
		        	{
		        		this.resetAnimation();
		        	}
		        }
		    })
		    ;
		this.stop().animate("AntStandingSouth", 30, -1);
	}
});