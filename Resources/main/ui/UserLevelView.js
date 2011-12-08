/**
 * @author Jun Lu
 */

(function() {

	cm.ui.createUserLevelView = function(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		
		return view;
	};
	
})();
