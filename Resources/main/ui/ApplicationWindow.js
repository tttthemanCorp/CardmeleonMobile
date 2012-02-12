/**
 * @author sh: -c: line 0: `echo Lu, Jun' (2)
 */

(function() {
	
	function createMainWindow(_args) {
	    var navWindow;
		var win = Ti.UI.createWindow(cm.combine($$.Window,{
			exitOnClose:true,
			orientationModes:[Ti.UI.PORTRAIT]
		}));
		
		// common header view
		var headerView = cm.ui.createHeaderView();
		
		// main application tab group
		var data = [{
        	title: 'Stores',
        	tabbedBarBackgroundImage: '/images/Frame_Base_Stores.png',
        	winBackgroundImage: '/images/Bgrnd_G-B.png',
        	view: cm.ui.createStoresView()
        }, {
        	title: 'Rewards',
        	tabbedBarBackgroundImage: '/images/Frame_Base_Rewards.png',
        	winBackgroundImage: '/images/Bgrnd_G-Y.png',
        	view: cm.ui.createRewardsView()
        }, {
        	title: 'Market',
        	tabbedBarBackgroundImage: '/images/Frame_Base_Market.png',
        	winBackgroundImage: '/images/Bgrnd_O-Y.png',
        	view: cm.ui.createMarketView()
        }];
		var tabGroup = cm.ui.createFilmstripTabGrpView(cm.combine($$.TabGroup,{
			top:$$.headerView.height,
			shadow:$$.TabGroup.shadowAtBottom,
			activeIndex: 0,
			win: win,
			data:data
		}));
		
		//create a loading view which we can show on long data loads
		var loader = cm.ui.createLoadingView();
		
		var drawer = cm.ui.createDrawerView({
			zIndex:2,
			visible:false
		});
		
		var cameraView = cm.ui.createCameraView({
			zIndex: 1,
			bottom:$$.TabGroup.heightAtBottom - $$.TabGroup.shadowAtBottom
		});
		
		//assemble main app window
		win.add(headerView);
		win.add(cameraView);
		win.add(tabGroup);
		win.add(loader);
		win.add(drawer);

	    // handle cross-platform navigation
	    //if (Ti.Platform.osname == 'android') {
	        cm.navGroup = {
	            open: function (win, obj) {
	                win.open(obj);
	            },
	            close: function (win, obj) {
	                win.close(obj);
	            }
	        };
	        navWindow = win;
	    //} else {
	    //    navWindow = Ti.UI.createWindow();
	    //    cm.navGroup = Ti.UI.iPhone.createNavigationGroup({
	    //        window: win
	    //    });
	    //    navWindow.add(cm.navGroup);
	    //}
	    
		return navWindow;
	}
	
	// application entry window
	cm.ui.createApplicationWindow = function(_args) {
		
		// create main window
		var win = createMainWindow(_args);

	    // lock orientation to portrait
	    win.orientationModes = [Ti.UI.PORTRAIT];
	    if (Ti.Platform.osname != 'android') {
	        Ti.UI.orientation = Ti.UI.PORTRAIT;
	    }
	    
	    // init default settings
	    if (!Ti.App.Properties.hasProperty(cm.model.NEARBY_RADIUS)) {
	    	Ti.App.Properties.setDouble(cm.model.NEARBY_RADIUS, 5.0);
	    }
	    
	    // load favorites and watches locally
	    cm.model.loadFavorites();
	    cm.model.loadWatches();
	    
	    // load data remotely
		Ti.App.addEventListener('app:geoloc.available', function(e) {
			cm.model.requestUserInfo();
		});
		
		// get GEO location
		cm.requestGeoLocation();
		
		// set up listeners for other events
		Ti.App.addEventListener('app:mark.forsale.succeed', function(e) {
			cm.model.requestNearbyMarket();
			cm.model.requestMyWatching();
		});
		
		Ti.App.addEventListener('app:buy.reward.succeed', function(e) {
			cm.model.requestUserInfo();
		});
		
		Ti.App.addEventListener('app:redeem.reward.succeed', function(e) {
			if (e.forSale) {
				cm.model.requestNearbyMarket();
			}
		});
		
		Ti.App.addEventListener('app:txn.review.done', function(e) {
			
		});

	    return win;
	};
		
})();