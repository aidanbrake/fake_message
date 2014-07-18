(function(window, $) {

	$(document).ready(function() {

		var param = {
			"from": [],//"message-center.css"],
			"to": ["assets/css/odesk.css", "assets/css/message-style.css"]
		};

		var replace = window.Replace.init();
		// replace.init();

		/**
		 * You can test here.
		 * Please enable the bellow code line(commented).
		 * Also you can change variable param. As you can guess, this extension should replace "from" with "to".
		 */
		replace.setParams(param);
		replace.replace();
	});
})(window, jQuery);