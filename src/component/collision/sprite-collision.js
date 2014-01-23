Crafty.c("SpriteCollision",
{
	init: function()
	{
		this.requires("Collision") //WiredHitBox
		    .bind("Moved", function(from)
	        {
	        	var solids = this.hit("solid");
	        	if (solids && solids[0].normal)
	        	{
	        	    this.x += Math.ceil(solids[0].normal.x * -solids[0].overlap);
	        	    this.y += Math.ceil(solids[0].normal.y * -solids[0].overlap);
	        	    return;
	        	}
	        	else if (solids)
	        	{
	        	    this.attr({
	        		      x : from.x,
	        		      y : from.y
	        	    });
	        	    return;
	        	}
	        })
	        ;
	}
});