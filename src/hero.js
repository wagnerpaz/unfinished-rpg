Crafty.c("HeroSprite",
{
	init: function()
	{
		Crafty.sprite(32, "img/1/clotharmor.png",
		{
			heroStandingSouth : [ 0, 7 ]
		});
		
		this.requires("BaseEntity, SpriteAnimation, heroStandingSouth")
		    .animate("HeroWalkingWest"  , 0,  1, 3)
		    .animate("HeroWalkingEast"  , 0,  4, 3)
		    .animate("HeroWalkingNorth" , 0,  7, 3)
		    .animate("HeroWalkingSouth" , 0, 10, 3)
		    .animate("HeroStandingWest" , 0,  2, 1)
		    .animate("HeroStandingEast" , 0,  5, 1)
		    .animate("HeroStandingNorth", 0,  8, 1)
		    .animate("HeroStandingSouth", 0, 11, 1)
		    .bind("NewDirection", function (direction)
		    {
		    	if(Math.abs(direction.x) > Math.abs(direction.y))
		    	{
			        if (direction.x < 0 && !this.isPlaying("HeroWalkingWest"))
			        {
			        	this.stop().animate("HeroWalkingWest", 10, -1).rotate(90);
			        }
			        if (direction.x > 0 && !this.isPlaying("HeroWalkingEast"))
			        {
			            this.stop().animate("HeroWalkingEast", 10, -1);
			        }
		    	}
		    	else
		    	{
		    		if (direction.y < 0 && !this.isPlaying("HeroWalkingNorth"))
			        {
			            this.stop().animate("HeroWalkingNorth", 10, -1);
			        }
			        if (direction.y > 0 && !this.isPlaying("HeroWalkingSouth"))
			        {
			            this.stop().animate("HeroWalkingSouth", 10, -1);
			        }
		    	}
		    	
		    	if(!direction.x && !direction.y)
		        {
		        	if(this.isPlaying("HeroWalkingWest"))
		        	{
		        		this.stop().animate("HeroStandingWest", 50, -1);
		        	}
		        	else if(this.isPlaying("HeroWalkingEast"))
		        	{
		        		this.stop().animate("HeroStandingEast", 50, -1);
		        	}
		        	else if(this.isPlaying("HeroWalkingNorth"))
		        	{
		        		this.stop().animate("HeroStandingNorth", 50, -1);
		        	}
		        	else if(this.isPlaying("HeroWalkingSouth"))
		        	{
		        		this.stop().animate("HeroStandingSouth", 50, -1);
		        	}
		        	else
		        	{
		        		this.stop();
		        	}
		        }
		    })
		    ;
		this.animate("HeroStandingSouth", 50, -1);
	}
});