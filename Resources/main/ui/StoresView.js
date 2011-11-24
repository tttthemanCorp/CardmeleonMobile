/**
 * @author Jun Lu
 */

(function() {
	
	function createStoreTables(_args) {
		var data = _args.data || [],
		sectionlist = [],
		tableView, row, section, item;
		
		for (var i = 0, l = data.length; i<l; i++) {
			item = data[i];
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
			
			var favIcon = Ti.UI.createView({
				backgroundImage:'images/Icon_Favorite_ON.png',
				top:4,
				right:28,
				width:18,
				height:18,
				clickName:'favIcon'
			});
			row.add(favIcon);
			
			var progressOnIcon = Ti.UI.createView({
				backgroundImage:'images/Bgrnd_Store-Progress-bar_ON.png',
				top:50,
				left:12,
				width:38,  // TODO real data change
				height:32,
				clickName:'progressOnIcon',
				zIndex: 5
			});
			row.add(progressOnIcon);
			
			var progressOffIcon = Ti.UI.createView({
				backgroundImage:'images/Bgrnd_Store-Progress-bar_OFF.png',
				top:50,
				left:12,
				width:276,
				height:32,
				clickName:'progressOnIcon',
				zIndex: 3
			});
			row.add(progressOffIcon);
		
			var storeName = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#8CC841',
				font:{fontStyle:'normal',fontSize:16},
				left:12,
				top:12,
				height:'auto',
				width:'auto',
				clickName:'storeName',
				text:'Store Name '+item.title  // TODO change
			}));
			row.add(storeName);
			
			var rewards = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#999999',
				font:{fontStyle:'normal',fontSize:10,fontWeight:'normal'},
				left:12,
				top:32,
				height:'auto',
				width:'auto',
				clickName:'rewards',
				text:item.numRewards+' of rewards gained'  // TODO change
			}));
			row.add(rewards);
			
			var purchases = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#8CC841',
				font:{fontStyle:'normal',fontSize:10,fontWeight:'normal'},
				left:12,
				top:84,
				height:'auto',
				width:'auto',
				clickName:'purchases',
				text:item.numPurchases+' of purchases left to earn a reward'  // TODO change
			}));
			row.add(purchases);
			
			var marketMsg = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#999999',
				font:{fontStyle:'normal',fontSize:10,fontWeight:'normal'},
				left:12,
				top:102,
				height:'auto',
				width:'auto',
				clickName:'marketMsg',
				text:'Can\'t wait? Find a deal from the Market!'  // TODO change
			}));
			row.add(marketMsg);
			
			var phone = Ti.UI.createLabel(cm.combine($$.Link, {
				color:'#0087A0',
				font:{fontStyle:'normal',fontSize:10,fontWeight:'normal'},
				left:12,
				bottom:12,
				height:'auto',
				width:'auto',
				clickName:'phone',
				text:'phone'+item.phone  // TODO change
			}));
			row.add(phone);
			
			var distance = Ti.UI.createLabel(cm.combine($$.Link, {
				color:'#0087A0',
				font:{fontStyle:'normal',fontSize:10,fontWeight:'normal'},
				right:12,
				bottom:12,
				height:'auto',
				width:'auto',
				clickName:'distance',
				text:'distance'+item.distance  // TODO change
			}));
			row.add(distance);
			
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
		
		var viewData = [{
        	title: 'Nearby',
        	view: createStoreTables({data:data}),
            tabbedBarBackgroundImage: 'images/Frame_Stores-tab_Nearby.png'
        }, {
            title: 'Favorites',
            view: createStoreTables({data:data2}),
            tabbedBarBackgroundImage: 'images/Frame_Stores-tab_Favorites.png'
        }];
        
		var storeView = cm.ui.createTabbedScrollableView(cm.combine($$.TabGroup,{
			data:viewData,
			activeIndex: 0,
			shadow:12,
			top:36
		}));
		
        for (var index in viewData) {
            item = viewData[index];
            item.view.addEventListener('click', function (e) {
            	Ti.API.info('table view item clicked: ' + e.rowData.title);
                cm.navGroup.open(cm.ui.createStoreDetailsWindow({
                	title: e.rowData.title
                	//barImage:$$.headerView.backgroundImage,
                	//backgroundColor : 'blue',
					//navBarHidden : false  // this is very important
                }), { animated: true });
            });
        }

		view.add(storeView);

		return view;
	};
})();