/**
 * @author Jun Lu
 */


(function() {

	cm.ui.createSettingsView = function(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		
		return view;
	};
	
})();