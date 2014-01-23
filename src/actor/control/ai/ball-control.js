Crafty.c("BallAIControl",
{
	init: function()
	{
		this.requires("2D, WPSlide");
	}
,
	start: function()
	{
		var startAngle = 30;
		this.slideToDirection(startAngle, 2);
	}
});