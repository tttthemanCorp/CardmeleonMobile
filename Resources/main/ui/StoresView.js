/**
 * @author Jun Lu
 */

(function() {
	
	function createStoreTables(_args) {
		var data = _args.data || [],
		sectionlist = [],
		tableView, row, section;
		
		for (var i = 0, l = data.length; i<l; i++) {
			row = Ti.UI.createTableViewRow();
			//row.height = 145;
			//row.width = 309;
			row.className = 'datarow';
			row.clickName = 'row';
			row.backgroundImage = 'images/Bgrnd_Store-Card.png';
			row.selectedBackgroundImage = 'images/Bgrnd_Store-Card_Selected.png';
			//row.filter = '';
			//row.borderWidth = 2;
			//row.borderColor = '#006cb1';
			
			var moreIcon = Ti.UI.createView({
				backgroundImage:'images/Icon_Stores-More.png',
				top:4,
				right:4,
				width:18,
				height:18,
				clickName:'moreIcon'
			});
			row.add(moreIcon);
		
			var storeName = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#8CC841',
				font:{fontStyle:'normal'},
				left:12,
				top:12,
				height:30,
				width:'auto',
				clickName:'storeName',
				text:'Store Name '+data[i].title  // TODO change
			}));
			row.add(storeName);
			
			section = Ti.UI.createTableViewSection();
			section.add(row);	
			
			sectionlist.push(section);
		}
		
		tableView = Titanium.UI.createTableView({
			data:sectionlist,
			//search:search,
			//headerView:headerView,
			//footerView:footerView,
			filterAttribute:'filter',
			backgroundColor:'transparent',
			//opacity: 0.0,
			maxRowHeight:145,
			minRowHeight:145,
			style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
			separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE
		});
		
		tableView.addEventListener('click', function(e)
		{
			Ti.API.info('table view row clicked - source ' + e.source);
			// use rowNum property on object to get row number
			var rowNum = e.index;
			Ti.API.info('You clicked on row# '+rowNum);
			Ti.API.info('You clicked on the '+e.source.clickName);
		});

		return tableView;
	}
	
	//create the stores view
	cm.ui.createStoresView = function(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		var dashView = cm.ui.createDashView();
		
		//cm.mixin(view, $$.debug); // TODO - debug only
		
		view.add(dashView);
		
		//
		// CREATE SEARCH BAR
		//
		var search = Titanium.UI.createSearchBar({
			barColor:'#385292',
			showCancel:false
		});
		search.addEventListener('change', function(e)
		{
			e.value; // search string as user types
		});
		search.addEventListener('return', function(e)
		{
			search.blur();
		});
		search.addEventListener('cancel', function(e)
		{
			search.blur();
		});

		
		var data = [{title:"Row 1"},{title:"Row 2"}];
		var data2 = [{title:"Row 2"},{title:"Row 1"}];
		
		var tableViews = [{
        	title: 'Nearby',
        	view: createStoreTables({data:data}),
            tabbedBarBackgroundImage: 'images/Frame_Stores-tab_Nearby.png'
        }, {
            title: 'Favorites',
            view: createStoreTables({data:data2}),
            tabbedBarBackgroundImage: 'images/Frame_Stores-tab_Favorites.png'
        }];
        
		var storeView = cm.ui.createTabbedScrollableView(cm.combine($$.TabGroup,{
			data:tableViews,
			activeIndex: 0,
			shadow:12,
			top:36
		}));
		
		// add a click handler to all twitter tables
        for (var index in tableViews) {
            item = tableViews[index];
            item.view.addEventListener('click', function (e) {
            	Ti.API.info('table view item clicked: ' + e.rowData.title);
                cm.navGroup.open(cm.ui.createStoreDetailsWindow({
                	title: e.rowData.title,
                	barImage:$$.headerView.backgroundImage,
                	backgroundColor : 'blue',
					navBarHidden : false,  // this is very important
                }), { animated: true });
            });
        }

		view.add(storeView);

		return view;
	};
})();