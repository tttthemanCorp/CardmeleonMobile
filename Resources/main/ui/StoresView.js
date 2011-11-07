/**
 * @author Jun Lu
 */

(function() {
	//create the login view
	cm.ui.createStoresView = function(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args)),
		subHeaderView = Ti.UI.createView(cm.combine($$.subHeaderView,{top:0}));
		
		//cm.mixin(view, $$.debug); // TODO - debug only
		
		view.add(subHeaderView);
		
		var loginView = cm.ui.createLoginView(cm.combine({
			top:72,
		}, $$.empty));
		view.add(loginView);

		return view;
	};
})();