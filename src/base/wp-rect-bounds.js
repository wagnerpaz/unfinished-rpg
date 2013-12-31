Crafty.c("WPRectBounds",
{
	_wasTotallyWithinBounds  : false,
	_wasPartiallyWithinBounds: false,
	
	init: function()
	{
		this._recalcWas();
		
		this.requires("2D")
			.bind("Moved", function(from)
		    {
		    	this._from = from;
		    	
		    	var isTotallyWithinBounds   = this._isTotallyWithinBounds();
		    	var isPartiallyWithinBounds = !isTotallyWithinBounds ? this._isPartiallyWithinBounds() : false;
		    	var isOutOfBounds           = !isTotallyWithinBounds && !isPartiallyWithinBounds;
		    	
		    	if( (this._wasTotallyWithinBounds || this._wasPartiallyWithinBounds) && isOutOfBounds) 
		    	{
//		    		console.log("TotallyOutOfBounds");
		    		this.trigger("TotallyOutOfBounds", this._from);
		    		this.trigger("OutOfBounds", this._from);
		    	}
		    	else if( (this._wasPartiallyWithinBounds || this._wasOutOfBounds) && isTotallyWithinBounds)
		    	{
//		    		console.log("WithinBounds");
		    		this.trigger("WithinBounds", this._from);
		    	}
		    	else if( (this._wasTotallyWithinBounds || this._wasOutOfBounds) && isPartiallyWithinBounds)
		    	{
//		    		console.log("PartiallyOutOfBounds");
		    		this.trigger("PartiallyOutOfBounds", this._from);
		    		this.trigger("OutOfBounds", this._from);
		    	}
		    	
		    	this._recalcWas();
		    })
		    ;
	}
,
	_recalcWas: function()
	{
		this._wasTotallyWithinBounds   = this._isTotallyWithinBounds();
		this._wasPartiallyWithinBounds = !this._wasTotallyWithinBounds ? this._isPartiallyWithinBounds() : false;
		this._wasOutOfBounds           = !this._wasTotallyWithinBounds && !this._wasPartiallyWithinBounds;
	}
,
	_isPartiallyWithinBounds: function()
	{
		return this._x + this._w > 0              //ESQUERDA
		    && this._y + this._h > 0              //CIMA
		    && this._x < Crafty.viewport.width   //DIREITA
		    && this._y < Crafty.viewport.height; //BAIXO
	}
,
	_isTotallyWithinBounds: function()
	{
		return this._x >= 0                                 //ESQUERDA
		    && this._y >= 0                                 //CIMA
		    && this._x + this._w <= Crafty.viewport.width   //DIREITA
		    && this._y + this._h <= Crafty.viewport.height; //BAIXO
	}
});