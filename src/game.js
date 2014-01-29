window.onload = function()
{
	Crafty.init();
	//Crafty.init(480, 416);
	Crafty.canvas.init();
	Crafty.background("#EFEFEF");
	
	var sceneName = _GET("scene");
	if(sceneName === null
	|| sceneName === undefined)
	{
		sceneName = "slide-test-1";
	}
	
	Crafty.scene(sceneName);
};

/**
 * Created by: http://gustavopaes.net
 * Created on: Nov/2009
 * 
 * Retorna os valores de parâmetros passados via url.
 *
 * @param String Nome da parâmetro.
 */
function _GET(name)
{
	var url = window.location.search.replace("?", "");
	var itens = url.split("&");

	for (n in itens)
	{
		if (itens[n].match(name))
		{
			return decodeURIComponent(itens[n].replace(name + "=", ""));
		}
	}
	return null;
}