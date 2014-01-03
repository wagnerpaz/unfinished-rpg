Crafty.c("HeroSprite",
{
	init: function()
	{
		Crafty.sprite(12, 20, "img/1/clotharmor.png",
		{
			HeroSpriteImg : [ 0, 0 ]
		}, 9, 1);
		
		this.requires("Actor, SpriteAnimation, HeroSpriteImg")
		    .animate("HeroStandingSouth", 0, 0, 1)
		    .animate("HeroWalkingSouth" , 0, 1, 2)
		    .animate("HeroStandingNorth", 0, 2, 1)
		    .animate("HeroWalkingNorth" , 0, 3, 2)
		    .animate("HeroStandingEast" , 0, 4, 1)
		    .animate("HeroWalkingEast"  , 0, 5, 2)
		    .animate("HeroStandingWest" , 0, 6, 1)
		    .animate("HeroWalkingWest"  , 0, 7, 2)
		    .bind("NewDirection", function (direction)
		    {
		    	if(Math.abs(direction.x) > Math.abs(direction.y))
		    	{
			        if (direction.x < 0 && !this.isPlaying("HeroWalkingWest"))
			        {
			        	this.stop().animate("HeroWalkingWest", 10, -1);
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
		        	if(this.isPlaying("HeroWalkingWest", 10, -1))
		        	{
		        		this.stop().animate("HeroStandingWest", 30, -1);
		        	}
		        	else if(this.isPlaying("HeroWalkingEast", 10, -1))
		        	{
		        		this.stop().animate("HeroStandingEast", 30, -1);
		        	}
		        	else if(this.isPlaying("HeroWalkingNorth", 10, -1))
		        	{
		        		this.stop().animate("HeroStandingNorth", 30, -1);
		        	}
		        	else if(this.isPlaying("HeroWalkingSouth", 10, -1))
		        	{
		        		this.stop().animate("HeroStandingSouth", 30, -1);
		        	}
		        	else
		        	{
		        		this.stop();
		        	}
		        }
		    })
		    ;
		this.stop().animate("HeroStandingSouth", 30, -1);
	}
});