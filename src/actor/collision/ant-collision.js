Crafty.c("AntCollision",
{
	init: function()
	{
		this.requires("SpriteCollision")
			.collision([0, 0], [10, 0], [10, 18], [0, 18])
	        .bind("NewDirection", function (direction)
		    {
	        	//STOPPED
	        	if(!direction.x && !direction.y)
		        {
	        		return;
		        }
	        	
	        	//SOUTH NORTH
	        	if(Math.abs(direction.x) > Math.abs(direction.y))
		    	{
	        		this.collision([0, 0], [18, 0], [18, 10], [0, 10]);
		    	}
	        	//WEST EAST
		    	else
		    	{
		    		this.collision([0, 0], [10, 0], [10, 18], [0, 18]);
		    	}
		    })
	        ;
	}
});