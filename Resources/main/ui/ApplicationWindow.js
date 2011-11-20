/**
 * @author sh: -c: line 0: `echo Lu, Jun' (2)
 */

(function() {
	var platformWidth = Ti.Platform.displayCaps.platformWidth;
	
	function createSingleWindow(_args) {
		var win = Ti.UI.createWindow(cm.combine($$.Window,{
			exitOnClose:true,
			orientationModes:[Ti.UI.PORTRAIT]
		})),
		headerView = Ti.UI.createView(cm.combine($$.headerView,{top:0})),
		tabHeight = 60,
		tabWidth = platformWidth/3,
		tabView = Ti.UI.createView({
			bottom:0,
			height:tabHeight,
			backgroundImage:'images/tab_bg.png',
			width:platformWidth
		}),
		tabs = [];
		
		//Add the main app 'filmstrip'	
		var appFilmStrip = cm.ui.createFilmStripView({
			top:$$.headerView.height,
			left:0,
			right:0,
			bottom:tabHeight-10,
			views: [
				cm.ui.createStoresView(),
				cm.ui.createRewardsView(),
				cm.ui.createMarketView()
			]
		});
		
		//create the 'tab' view, which we will animate back and forth along the tab bar
		var tab = Ti.UI.createView({
			left:0,
			top:15,
			height:45,
			width:tabWidth,
			bottom:0
		});
		
		tab.add(Ti.UI.createImageView({
			top:0,
			left:0,
			height:10, //might not want to hard-code these, should scale more smarter-er ;)
			width:10,
			image:'images/tab_l.png'
		}));
		
		tab.add(Ti.UI.createView({
			right:10,
			left:10,
			backgroundColor:cm.ui.theme.darkBlue
		}));
		
		tab.add(Ti.UI.createImageView({
			top:0,
			right:0,
			height:10, //might not want to hard-code these, should scale more smarter-er ;)
			width:10,
			image:'images/tab_r.png'
		}));
		
		tabView.add(tab);
		
		//create clickable tab images
		function createTab(_icon,_cb,_on) {
			var view = Ti.UI.createView({
				width:tabWidth
			}),
			off_path = 'images/Frame_Base_'+_icon+'_OFF.png',
			on_path = 'images/Frame_Base_'+_icon+'_ON.png',
			dimension = 40,
			image = Ti.UI.createImageView({
				//height:dimension,
				//width:dimension,
				image:(_on) ? on_path : off_path,
				bottom:2
			});
			
			view.on = _on||false; //ivar for 'on' state
			
			//assemble view
			view.add(image);
			view.addEventListener('click',_cb);
			
			//'instance' method
			view.toggle = function() {
				view.on = !view.on;
				image.image = (view.on) ? on_path : off_path;
			};
			
			return view;
		}
		
		//toggle view state of application to the relevant tab
		function selectIndex(_idx) {
			for (var i = 0, l = tabs.length; i<l; i++) {
				//select the tab and move the tab 'cursor'
				if (_idx === i) {
					//if the tab is already selected, do nothing
					if (!tabs[i].on) {
						Ti.API.info('selecting tab index: '+_idx);
						//animate the tab
						tab.animate({
							duration:$$.animationDuration,
							left:tabWidth*i,
							bottom:0
						},function(idx) { //use closure to retain value of i in idx
							return function() {
								if (!tabs[idx].on) {
									tabs[idx].toggle();
								}
							};
						}(i));
						
						//set the current film strip index
						appFilmStrip.fireEvent('changeIndex',{idx:i});
					}
				}
				else if (tabs[i].on && (_idx !== i)) {
					tabs[i].toggle();
				}
			}
		}
		
		//assemble main app tabs
		// HACK: need to use annonymous functions to wrap selectIndex as a view event handler
		tabs.push(createTab('Stores', function() {
			selectIndex(0);
		},true));
		tabs.push(createTab('Rewards', function() {
			selectIndex(1);
		}));
		tabs.push(createTab('Market', function() {
			selectIndex(2);
		}));

		//add tabs to layout
		for (var i = 0, l = tabs.length; i<l; i++) {
			tabs[i].left = tabWidth*i;
			tabView.add(tabs[i]);
		}
		
		//App app-level event listener to change tabs
		Ti.App.addEventListener('app:change.tab', function(e) {
			selectIndex(e.tabIndex);
		});
		
		//create a loading view which we can show on long data loads
		var loader = cm.ui.createLoadingView();
		
		//assemble main app window
		win.add(headerView);
		win.add(tabView);
		win.add(appFilmStrip);
		win.add(loader);
	    
		return win;
	}
	
	cm.ui.createApplicationWindow = function(_args) {
		
	    var navWindow;
	    var mainWindow = createSingleWindow(_args);

	    // handle cross-platform navigation
	    if (Ti.Platform.osname == 'android') {
	        cm.navGroup = {
	            open: function (win, obj) {
	                win.open(obj);
	            },
	            close: function (win, obj) {
	                win.close(obj);
	            }
	        };
	        navWindow = mainWindow;
	    } else {
	        navWindow = Ti.UI.createWindow();
	        cm.navGroup = Ti.UI.iPhone.createNavigationGroup({
	            window: mainWindow
	        });
	        navWindow.add(cm.navGroup);
	    }
	
	    // lock orientation to portrait
	    navWindow.orientationModes = [Ti.UI.PORTRAIT];
	    if (Ti.Platform.osname != 'android') {
	        Ti.UI.orientation = Ti.UI.PORTRAIT;
	    }
	
    
		//initialize Twitter goodness and let folks know most of the awesomeness will not be available offline
		if (Ti.Network.online == false) {
			Ti.UI.createAlertDialog({
				title:'No Network Connection', 
				message:'Sorry, but we couldn\'t detect a connection to the internet - new Twitter data will not be available.'
			}).show();
		}
	    
	    return navWindow;
	};
	
	//create the main application window
/*	cm.ui.createApplicationWindow1 = function(_args) {
		var win = Ti.UI.createWindow(cm.combine($$.Window,{
			exitOnClose:true,
			orientationModes:[Ti.UI.PORTRAIT]
		}));
		
		var headerView = Ti.UI.createView(cm.combine($$.headerView,{top:0}));
		
		var subHeaderView = Ti.UI.createView(cm.combine($$.subHeaderView,{top: $$.headerView.height}));
		
		var signupView = cm.ui.createSignupView(cm.combine({
			top: $$.headerView.height + $$.subHeaderView.height,
		}, $$.empty));
		
		win.add(headerView);
		win.add(subHeaderView);
		win.add(signupView);
		
		return win;
	}; */
		
})();