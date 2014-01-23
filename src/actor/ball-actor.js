Crafty.c("BallActor",
{
	init: function()
	{
		this.requires("2D, Actor, BallSprite, Collision, WPSlide, BoxPosition, BallAIControl, solid")
		    .regBoxPosition("origin", "center", "center")
		    .setBoxPosition("origin")
		    .bind("Moved", function(from)
		    {
		    	var mv = {x: this._x - from.x,
		    	          y: this._y - from.y};
		    	
		    	var walls = this.hit("wall");
		    	if(walls)
		    	{
		    		var side = this._determineCollisionSide(this, walls[0].obj, mv);
		    		console.log(side);
					if(side == "left"
					|| side == "right")
					{
			    		this._correctRectCollision(from, walls[0].obj);
			    		this._reactToVerticalCollision();
					}
					else
					{
						this._correctRectCollision(from, walls[0].obj);
						this._reactToHorizontalCollision();
					}
		    	}
		    	
		    	var bars = this.hit("bar");
		    	if(bars)
		    	{
		    		var side = this._determineCollisionSide(this, bars[0].obj, mv);
		    		console.log(side);
					if(side == "top"
					|| side == "bottom")
					{
						this._correctRectCollision(from, bars[0].obj);
						this._reactToHorizontalCollision();
					}
					else
					{
						this._correctRectCollision(from, bars[0].obj);
						this._reactToVerticalCollision();
					}
		    	}
		    })
		    .start();
	}
,
	_determineCollisionSide: function(r1, r2, mv)
	{
		var r1v = this._extractRectVertexes(r1);
		var r1c = [];
		var acv = undefined; //Average Colliding Vertex
		
		for(var i = 0; i < r1v.length; i++)
		{
			var v = r1v[i];
			r1c[i] = (v.x >= r2.x && v.x <= r2.x + r2.w)
			      && (v.y >= r2.y && v.y <= r2.y + r2.h);
			
			if(r1c[i])
			{
				if(!acv)
				{
					acv = v;
				}
				else
				{
					acv.x = (acv.x + v.x) / 2;
					acv.y = (acv.y + v.y) / 2;
				}
			}
		}
		
		if(!acv) return;
		
		var acvo = {
			x: acv.x - mv.x,
			y: acv.y - mv.y
		};
		
		var r2v = this._extractRectVertexes(r2);
		var acv2 = {x: r2v[0].x, y: r2v[0].y};
		for(var i = 1; i < r2v.length; i++)
		{
			acv2.x = (acv2.x + r2v[i].x) / 2;
			acv2.y = (acv2.y + r2v[i].y) / 2;
		}
		
		if(this._LineIntersectsLine(acvo, acv2, r2v[0], r2v[1])) return "top";
		if(this._LineIntersectsLine(acvo, acv2, r2v[1], r2v[2])) return "right";
		if(this._LineIntersectsLine(acvo, acv2, r2v[2], r2v[3])) return "bottom";
		if(this._LineIntersectsLine(acvo, acv2, r2v[3], r2v[0])) return "left";
		return;
	}
,
	_LineIntersectsLine: function(l1p1, l1p2, l2p1, l2p2)
	{
		var q = (l1p1.y - l2p1.y) * (l2p2.x - l2p1.x) - (l1p1.x - l2p1.x) * (l2p2.y - l2p1.y);
	    var d = (l1p2.x - l1p1.x) * (l2p2.y - l2p1.y) - (l1p2.y - l1p1.y) * (l2p2.x - l2p1.x);
	
	    if( d == 0 )
	    {
	        return false;
	    }
	
	    var r = q / d;
	
	    q = (l1p1.y - l2p1.y) * (l1p2.x - l1p1.x) - (l1p1.x - l2p1.x) * (l1p2.y - l1p1.y);
	    var s = q / d;
	
	    if( r < 0 || r > 1 || s < 0 || s > 1 )
	    {
	        return false;
	    }
	
	    return true;
	}
,
	_extractRectVertexes: function(r)
	{
		return [{x: r.x      , y: r.y      },
		        {x: r.x + r.w, y: r.y      },
		        {x: r.x + r.w, y: r.y + r.h},
		        {x: r.x      , y: r.y + r.h}];
	}
,
	_correctRectCollision: function(from, rect)
	{
	    this.attr({
		      x : from.x,
		      y : from.y
	    });
	}
,
	_reactToHorizontalCollision: function()
	{
		if(this._mvNormal.x > 0)
		{
			this.slideToDirection(180 + this._angle, this._speed);
//			this.startShadows(this._angle, this._speed);
		}
		else if(this._mvNormal.x < 0)
		{
			this.slideToDirection(360 - this._angle, this._speed);
//			this.startShadows(this._angle, this._speed);
		}
	}
,
	_reactToVerticalCollision: function()
	{
		if(this._mvNormal.y > 0)
		{
			this.slideToDirection(180 - this._angle, this._speed);
		}
		else if(this._mvNormal.y < 0)
		{
			this.slideToDirection(180 - this._angle, this._speed);
		}
	}
,
	startShadows: function(angle, speed)
	{
		var ball = this;
		
		for(var i = 0; i < 4; i++)
		{
			Crafty.e("2D, Actor, BallSprite, Collision, WPSlide, Delay")
			      .attr({x: this._x, y: this._y, alpha: 1.0 - ((i+1) * 0.2)})
			      .bind("Moved", function(from)
			      {
					  this._wallCollision = ball._wallCollision;
					  var walls = this._wallCollision(from);
					  
					  if(walls)
					  {
					         this.attr({
					     	      x : from.x,
					     	      y : from.y
					         });
					  }
				      
				      var bars = this.hit("bar");
					  if(bars)
					  {
				          this.destroy();
					  }
			      })
			      .delay(function()
			      {
			       this.slideToDirection(angle, speed);
			      }, (i+1) * 100)
			      ;
		}
	}
});