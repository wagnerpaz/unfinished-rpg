Crafty.c("WPRectBounds",
{
	_rectX: 0,
	_rectY: 0,
	_rectW: Crafty.viewport.width,
	_rectH: Crafty.viewport.height,
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
	wpRectBounds: function(rectX, rectY, rectW, rectH, debug)
	{
		this._rectX = rectX != undefined ? rectX : this._rectX;
		this._rectY = rectY != undefined ? rectY : this._rectY;
		this._rectW = rectW != undefined ? rectW : this._rectW;
		this._rectH = rectH != undefined ? rectH : this._rectH;
		
		if(debug)
		Crafty.e("2D, DOM, Sprite, Collision")
		      .collision([this._rectX, this._rectY],
		                 [this._rectW, this._rectY],
		                 [this._rectW, this._rectH],
		                 [this._rectX, this._rectH])
		      .addComponent("WiredHitBox");
		
		return this;
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
		return this._x + this._w > this._rectX  //ESQUERDA
		    && this._y + this._h > this._rectY  //CIMA
		    && this._x           < this._rectW  //DIREITA
		    && this._y           < this._rectH; //BAIXO
	}
,
	_isTotallyWithinBounds: function()
	{
		return this._x           >= this._rectX  //ESQUERDA
		    && this._y           >= this._rectY  //CIMA
		    && this._x + this._w <= this._rectW  //DIREITA
		    && this._y + this._h <= this._rectH; //BAIXO
	}
});