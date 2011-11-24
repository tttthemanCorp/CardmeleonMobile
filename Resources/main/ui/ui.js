/**
 * @author sh: -c: line 0: `echo Lu, Jun' (2)
 */

(function() {
	cm.ui = {};
	
	cm.ui.createHeaderView = function(params) {
		var headerView = Ti.UI.createView(cm.combine($$.headerView,{top:0}));
		var settingsIcon = Ti.UI.createImageView({
			top: 6,
			left: 6,
			width: 24,
			height: 24,
			zIndex: 1,
			image: 'images/Icon_Settings.png'
		});
		settingsIcon.addEventListener('click', function(e) {
			Ti.API.info('settingsIcon clicked!');
		});
		headerView.add(settingsIcon);
		return headerView;
	};
	
	cm.ui.createDashView = function(params) {
		var dashView = Ti.UI.createView(cm.combine($$.dashView,{
			top:0,
			left:0,
			zIndex: 0
		}));
		
		var searchIcon = Ti.UI.createImageView({
			top: 0,
			right: 0,
			width: 36,
			height: 36,
			zIndex: 1,
			image: 'images/Dash_Search_OFF.png'
		});
		searchIcon.addEventListener('click', function(e) {
			Ti.API.info('searchIcon clicked!');
		});
		dashView.add(searchIcon);
		
		var dollarIcon = Ti.UI.createImageView({
			top: 6,
			right: 48,
			width: 73,
			height: 25,
			zIndex: 1,
			image: 'images/Dash_Wallet.png'
		});
		dollarIcon.addEventListener('click', function(e) {
			Ti.API.info('dollarIcon clicked!');
		});
		dashView.add(dollarIcon);
		
		var userlevelIcon = Ti.UI.createImageView({
			top: 6,
			right: 160,
			width: 30,
			height: 26,
			zIndex: 1,
			image: 'images/Icon_Level_01.png'
		});
		userlevelIcon.addEventListener('click', function(e) {
			Ti.API.info('userlevelIcon clicked!');
		});
		dashView.add(userlevelIcon);
		
		var userLabel = Ti.UI.createLabel(cm.combine($$.Label, {
			text: 'user name',  // TODO change
			top: 9,
			left: 18
		}));
		dashView.add(userLabel);
		
		return dashView;
	};

	cm.ui.createFilmstripTabGrpView = function(params) {
		var data = params.data || [],
		platformWidth = $$.platformWidth,
		tabHeight = params.heightAtBottom || 60,
		tabWidth = platformWidth / data.length,
		top = params.top || 0,
		activeIndex = params.activeIndex || 0,
		shadow = params.shadow || 0,
		item, tab;
		
		var container = Ti.UI.createView(cm.combine($$.stretch, {top:top}));
		container.currentActive = activeIndex;
		var tabbedBar = Ti.UI.createView({
			left:0,
			bottom:0,
			backgroundImage: data[activeIndex].tabbedBarBackgroundImage,
			height:tabHeight,
			width:platformWidth,
			zIndex: 1
		});
		
		var filmStripView = cm.ui.createFilmStripView({
			bottom:tabHeight - shadow,
			zIndex: 0,
			//borderWidth:2,
			//borderColor:'#006cb1',
			views: (function() {
            	var views = [];
            	for (var j = 0; j < data.length; j++) {
            		views.push(data[j].view);	
            	}
            	return views;
            })()
		});
		
		//toggle view state of application to the relevant tab
		function selectIndex(_idx) {
			Ti.API.info('selecting base tab index: '+_idx);
			tabbedBar.backgroundImage = data[_idx].tabbedBarBackgroundImage;
			filmStripView.fireEvent('changeIndex',{idx:_idx});
			container.currentActive = _idx;
		}
		
		// HACK: need to use annonymous functions to wrap selectIndex as a view event handler
		for (var i = 0, l = data.length; i<l; i++) {
			item = data[i];
			tab = Ti.UI.createView({
				left: tabWidth*i,
				top:0,
				bottom:0,
				width:tabWidth
			});
			tab.addEventListener('click', function(idx) {
				return function() {
					selectIndex(idx)
				};
			}(i));
			tabbedBar.add(tab);
		}
		
		//App app-level event listener to change tabs
		Ti.App.addEventListener('app:change.tab', function(e) {
			selectIndex(e.tabIndex);
		});
		
		container.add(filmStripView);
		container.add(tabbedBar);
		
		return container;
	};
	
	cm.ui.createTabbedScrollableView = function(params) {
		// Set configuration variables and defaults is necessary
		var data = params.data || [],
		platformWidth = $$.platformWidth,
		tabBarHeight = params.heightAtTop || 36,
		top = params.top || 0,
		activeIndex = params.activeIndex || 0,
		tabWidth = platformWidth / data.length,
		shadow = params.shadow || 0,
		item, tabView, scrollable, i;
		
		// Start creating the TabbedScrollableView
		var container = Ti.UI.createView(cm.combine($$.stretch, {top:top}));
		container.currentActive = activeIndex;
        var tabbedBar = Ti.UI.createView({
            top: 0,
            backgroundImage: data[activeIndex].tabbedBarBackgroundImage,
            height: tabBarHeight,
            width: platformWidth,
            zIndex: 1
        });
        
        for (i = 0; i < data.length; i++) {
        	item = data[i];

        	// create each tab bar button
            tabView = Ti.UI.createView({
                height: tabBarHeight,
                left: i * tabWidth,
                right: platformWidth - ((parseInt(i) + 1) * tabWidth),
                index: i
            });

			// adjust images and scroll ScrollableView on tab bar clicks
            tabView.addEventListener('click', function (e) {
            	var index = e.source.index;
            	Ti.API.info('selecting top tab index: '+index);
            	container.currentActive = index;
            	tabbedBar.backgroundImage = data[index].tabbedBarBackgroundImage;
				scrollable.scrollToView(data[index].view);
            });

			// layout the tabbed scrollableview
            tabbedBar.add(tabView);
            item.tabView = tabView;
        }
        
        scrollable = Ti.UI.createScrollableView({
            backgroundColor:'transparent',
            top: tabBarHeight - shadow,
            zIndex: 0,
            showPagingControl: false,
			//borderWidth:2,
			//borderColor:'#006cb1',
            views: (function() {
            	var views = [];
            	for (var j = 0; j < data.length; j++) {
            		views.push(data[j].view);	
            	}
            	return views;
            })()
        });
        scrollable.addEventListener('scroll', function (e) {
            if (e.view) {
            	if (e.currentPage != container.currentActive) {
                	data[e.currentPage].tabView.fireEvent('click');
            	}
            }
        });
        
        container.add(tabbedBar);
        container.add(scrollable);

        return container;
	};
	
	cm.ui.createStackView = function(_args) {
		var stack = Ti.UI.createView(cm.combine($$.stretch,_args.props||{}));
		stack.currentIndex = _args.currentIndex||0;

		//populate stack
		for (var i = 0, l = _args.views.length; i < l; i++) {
			var w = _args.views[i];
			if (i == stack.currentIndex) {
				w.visible = true;
			}
			else {
				w.visible = false;
			}
			stack.add(w);
		}

		stack.addEventListener('changeIndex', function(e) {
			for (var j = 0, l = _args.views.length; j < l; j++) {
				if (j == e.idx) {
					_args.views[j].visible = true;
					stack.currentIndex = j;

				}
				else {
					_args.views[j].visible = false;
				}
			}
		});

		return stack;
	};
	
	//create a film strip like view 
	cm.ui.createFilmStripView = function(_args) {
		var root = Ti.UI.createView(cm.combine($$.stretch,_args)),
		views = _args.views,
		container = Ti.UI.createView({
			top:0,
			left:0,
			bottom:0,
			width:$$.platformWidth*_args.views.length
		});
			
		for (var i = 0, l = views.length; i<l; i++) {
			var newView = Ti.UI.createView({
				top:0,
				bottom:0,
				left:$$.platformWidth*i,
				width:$$.platformWidth
			});
			newView.add(views[i]);
			container.add(newView);
		}
		root.add(container);
		
		//set the currently visible index
		root.addEventListener('changeIndex', function(e) {
			var leftValue = $$.platformWidth*e.idx*-1;
			container.animate({
				duration:$$.animationDuration,
				left:leftValue
			});
		});
		
		return root;
	};
	
	//create a spacer row for a table view
	cm.ui.createSpacerRow = function() {
		return Ti.UI.createTableViewRow($$.spacerRow);
	};
	
	// _args example: 
	// {label: {x_offset: 0, y_offset: -20, texts: ['username', 'password']}, input: {top_start: 30, left: 10, right: 10, spacing: 40}}
	cm.ui.createLabelInputView = function(_args, fieldvalues) {
		var view = Ti.UI.createView(cm.combine($$.stretch,_args));
		var curFieldTopPos = _args.input.top_start,
		curFieldLeftPos = _args.input.left;
		for (var i = 0, l = _args.label.texts.length; i<l; i++) {
			var label = Ti.UI.createLabel(cm.combine($$.Label, {
				text: _args.label.texts[i],
				top: curFieldTopPos + _args.label.y_offset,
				left: curFieldLeftPos + _args.label.x_offset
			}));
			view.add(label);
			
			var field = Titanium.UI.createTextField(cm.combine($$.TextField, {
				hintText:'enter '+_args.label.texts[i],
				top: curFieldTopPos,
				left: curFieldLeftPos,
				right: _args.input.right
			}));
			view.add(field);
			
			field.addEventListener('change', function(idx) { //use closure to retain value of i in idx
				return function(e) {
					fieldvalues[idx] = e.value;
					//Ti.API.info("i="+idx+", value="+e.value);
				};
			}(i));
			
			//Ti.API.info("i="+i+", current field top position="+curFieldTopPos);
			curFieldTopPos += $$.TextField.height + _args.input.spacing;
		}
		return view;
	};
	
	//shorthand for alert dialog
	cm.ui.alert = function(/*String*/ _title, /*String*/ _message) {
		Ti.UI.createAlertDialog({
			title:_title, 
			message:_message
		}).show();
	};
})();

//Include major UI components and styling properties
Ti.include(
	'/main/ui/styles.js',
	'/main/ui/LoginView.js',
	'/main/ui/LoadingView.js',
	'/main/ui/StoresView.js',
	'/main/ui/RewardsView.js',
	'/main/ui/MarketView.js',
	'/main/ui/SignupView.js',
	'/main/ui/ApplicationWindow.js',
	'/main/ui/StoreDetailsWindow.js'
);

/*	
	cm.ui.createFilmstripTabGrpView = function(params) {
		var data = params.data || [],
		platformWidth = Ti.Platform.displayCaps.platformWidth,
		tabHeight = params.heightAtBottom || 60,
		tabWidth = platformWidth / data.length,
		top = params.top || 0,
		shadow = params.shadow || 10,
		tabs = [],
		item, tab;
		
		var container = Ti.UI.createView(cm.combine($$.stretch, {top:top}));
		
		var tabView = Ti.UI.createView({
			left:0,
			bottom:0,
			height:tabHeight,
			width:platformWidth
		});
		
		var filmStripView = cm.ui.createFilmStripView({
			bottom:tabHeight - shadow,
			views: [
				cm.ui.createStoresView(),
				cm.ui.createRewardsView(),
				cm.ui.createMarketView()
			]
		});
		
		//create clickable tab images
		function createTab(_iconOn,_iconOff,_cb,_on) {
			var view = Ti.UI.createView({
				top:0,
				bottom:0,
				width:tabWidth
			}),
			image = Ti.UI.createImageView({
				image:(_on) ? _iconOn : _iconOff
			});
			
			view.on = _on||false; //instance var for 'on' state
			
			//assemble view
			view.add(image);
			view.addEventListener('click',_cb);
			
			//'instance' method
			view.toggle = function() {
				view.on = !view.on;
				image.image = (view.on) ? _iconOn : _iconOff;
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
						tabs[i].toggle();
						//set the current film strip index
						filmStripView.fireEvent('changeIndex',{idx:i});
					}
				}
				else if (tabs[i].on) {
					tabs[i].toggle();
				}
			}
		}
		
		//assemble main app tabs
		// HACK: need to use annonymous functions to wrap selectIndex as a view event handler
		for (var i = 0, l = data.length; i<l; i++) {
			item = data[i];
			tabs.push(createTab(item.iconOn, item.iconOff, function(idx) {
				return function() {
					selectIndex(idx)
				};
			}(item.index), item.active));
		}
		
		//add tabs to layout
		for (var i = 0, l = tabs.length; i<l; i++) {
			tabs[i].left = tabWidth*i;
			tabView.add(tabs[i]);
		}
		
		//App app-level event listener to change tabs
		Ti.App.addEventListener('app:change.tab', function(e) {
			selectIndex(e.tabIndex);
		});
		
		container.add(filmStripView);
		container.add(tabView);
		
		return container;
	};
*/
	