/**
 * Helper functions
 * Author: Aidan Brake
 * 07/17/2014
 */

/**
 * Parameters
 */
var _messageAjaxUri = "https://www.odesk.com/api/mc/v2/trays/da89f92c/inbox.json";

/**
 * function to get file name from link
 * @params full path name
 */
function getFileNameFromLinkSrc(href) {
	var seg = href.split('/'),
		cnt = seg.length;

	return seg[cnt - 1];
}


/**
 * Stylesheet removing function
 * @params File names to be removed
 */
function removeStyleInfo(files) {
	var links = $('link[rel="stylesheet"]');

	for ( var i = 0; i < links.length; i++ )
	{
		for ( var j = 0; j < files.length; j++ ) {
			if( files[j] == getFileNameFromLinkSrc(links[i].href))
				links[i].remove();
		}
	}
}


/**
 * Stylesheet adding function
 * @params File names to be added
 */
function addStyleInfo(files) {
	var root = document.getElementsByTagName('body')[0],
		head = document.getElementsByTagName("head")[0];

	if( !head){
		head = document.createElement("head"); 
		root.appendChild( head); 
	}
	
	for (var i = 0; i < files.length; i++) {
		var link = document.createElement("link");
	
		link.href = chrome.extension.getURL(files[i]);
		link.type = "text/css";
		link.rel = "stylesheet";
		head.appendChild(link);
	}
}