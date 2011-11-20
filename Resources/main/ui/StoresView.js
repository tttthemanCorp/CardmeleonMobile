/**
 * @author Jun Lu
 */

(function() {
	//create the login view
	cm.ui.createStoresView = function(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		var subHeaderView = Ti.UI.createView({
			backgroundImage:'images/Dash_User-bgrnd.png',
			height:36,
			top:0
		});
		
		//cm.mixin(view, $$.debug); // TODO - debug only
		
		view.add(subHeaderView);
		
		var data = [{title:"Row 1"},{title:"Row 2"}];
		var data2 = [{title:"Row 2"},{title:"Row 1"}];
		
		var tableViews = [{
        	title: 'Nearby',
        	view: Ti.UI.createTableView({data:data}),
            url: '',
            isSearch: true
        }, {
            title: 'Favorites',
            view: Ti.UI.createTableView({data:data2}),
            url: '',
            isSearch: false
        }];
        
		var storeView = cm.ui.createTabbedScrollableView({data:tableViews, top:36});
		
		// add a click handler to all twitter tables
        for (var index in tableViews) {
            item = tableViews[index];
            item.view.addEventListener('click', function (e) {
            	Ti.API.info('table view item clicked: ' + e.rowData.title);
                cm.navGroup.open(cm.ui.createStoreDetailsWindow({
                	title: e.rowData.title,
                	backgroundColor : 'blue',
					navBarHidden : false,  // this is very important
                }), { animated: true });
            });
        }

		view.add(storeView);

		return view;
	};
})();