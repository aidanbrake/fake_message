(function(window) {
	'use strict';

	/**
	 * CSS replacing class
	 * @constructor
	 */
	var Replace = function(options) {

		this._cssFiles = {
			"from": [
				"globals.css"
			],
			"to":   [
				"assets/css/odesk.css"
			]
		}

	};

	/**
	 * Definition of prototype
	 */
	Replace.prototype = {
		/**
		 * Initializer
		 * To do
		 */
		init: function() {
		},

		/**
		 * Replace function
		 */
		replace: function() {
			if (this._cssFiles == undefined || this._cssFiles == null)
				return;

			if ( this._cssFiles.from != null ) removeStyleInfo(this._cssFiles.from);
			if ( this._cssFiles.to != null ) addStyleInfo(this._cssFiles.to);
		},

		/**
		 * Param setting
		 * This would be extended later....
		 */
		setParams: function(params) {
			if (params == undefined)
				return;

			if (params)
				this._cssFiles = params;
		}
	};

	window.Replace = new Replace();

})(window);