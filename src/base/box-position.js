Crafty.c("BoxPosition",
{
	_regPositions: {},
	_marker: undefined
,
	init: function()
	{
		this.requires("2D");
	}
,
	regBoxPosition: function(name, px, py, width, height, margin, showMarker, markerColor)
	{
		var pos = this._regPositions[name] = this._boxPosition(px, py, width, height, margin);
		
		if(showMarker !== undefined)
		{
			markerColor = markerColor !== undefined ? markerColor : 'red';
			
			if(this._marker !== undefined)
			{
				this._marker.destroy();
			}
			this._marker = Crafty.e("2D, DOM, Color")
			                     .attr(pos)
			                     .attr({alpha: 0.5})
			                     .color(markerColor)
			                     ;
		}
		return this;
	}
,
	setBoxPosition: function(name)
	{
		return this.attr(this.getBoxPosition(name));
	}
,
	getBoxPosition: function(name)
	{
		return this._regPositions[name];
	}
,
	boxPosition: function(px, py, width, height, margin)
	{
		return this.attr(this._boxPosition(px, py, width, height, margin));
	}
,
	_boxPosition: function(px, py, width, height, margin)
	{
		width  = width  !== undefined ? width  : this._w;
		height = height !== undefined ? height : this._h;
		margin = margin !== undefined ? margin : 0;
		
		return Crafty.boxPosition(px, py, width, height, margin);
	}
});

Crafty.extend(
{
	boxPosition: function(px, py, width, height, margin)
	{
		var pxValues = ["left", "right", "center", "fill"];
		var pyValues = ["top", "bottom", "center", "fill"];
		
		if(this._contains(pxValues, px))
		{
			this._px = px;
		}
		else
		{
			this._px = px;
		}
		
		if(this._contains(pyValues, py))
		{
			this._py = py;
		}
		else
		{
			this._py = py;
		}
		
		if(px == "fill" && py == "fill")
		{
			this._margin = width;
		}
		else if(px == "fill")
		{
			this._height = width;
			this._margin = height;
		}
		else if(py == "fill")
		{
			this._width  = width;
			this._margin = height;
		}
		else
		{
			this._width  = width;
			this._height = height;
			this._margin = margin;
		}
		
		this._margin = this._margin != undefined ? this._margin : 10;
		this._height = this._height != undefined ? this._height : 100;
		this._width  = this._width  != undefined ? this._width  : 100;
		
		var x = px == "left"  ? this._margin
			  : px == "right" ? Crafty.viewport.width - this._width - this._margin
			  : px == "center"? (Crafty.viewport.width / 2) - (this._width / 2)
			  : px == "fill"  ? this._margin
			  : px;
		
		var y = py == "top"    ? this._margin
			  : py == "bottom" ? Crafty.viewport.height - this._height - this._margin
		      : py == "center" ? (Crafty.viewport.height / 2) - (this._height / 2)
		      : py == "fill"   ? this._margin
		      : py;
		      
		var w = px == "fill" ? Crafty.viewport.width  - (2 * this._margin) : this._width;
		var h = py == "fill" ? Crafty.viewport.height - (2 * this._margin) : this._height;
		
		return {x: x, y: y, w: w, h: h};
	}
,
	_contains: function(set, value)
	{
		for(var i = 0; i < set.length; i++)
		{
			if(set[i] == value)
			{
				return true;
			}
		}
		return false;
	}
});