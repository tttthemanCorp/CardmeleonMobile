/**
 * @author Jun Lu
 */

(function() {
	//create the login view
	cm.ui.createRewardsView = function(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));

		return view;
	};
})();