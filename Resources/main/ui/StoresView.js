/**
 * @author Jun Lu
 */

(function() {
	
	function createStoreTable(_args) {
		return Titanium.UI.createTableView({
			//search:search,
			//headerView:headerView,
			//footerView:footerView,
			filterAttribute:'filter',
			backgroundColor:'transparent',
			//opacity: 0.0,
			maxRowHeight:98,
			minRowHeight:98,
			style:Titanium.UI.iPhone.TableViewStyle.PLAIN,
			separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE
		});
	}
	
	function setStoreTableData(tableView, data) {
		var sectionlist = [], row, section, item;
		
		for (var i = 0, l = data.length; i<l; i++) {
			item = data[i];
			row = Ti.UI.createTableViewRow();
			//row.height = 145;
			//row.width = 309;
			row.data = item;
			//row.hasChild = true;
			//row.rightImage = 'images/Icon_Arrow_RT.png'
			row.className = 'datarow';
			//row.clickName = 'storerow';
			//row.backgroundImage = 'images/Bgrnd_Store-Card.png';
			//row.selectedBackgroundImage = 'images/Bgrnd_Store-Card_Selected.png';
			//row.selectedColor = "blue";
			//row.filter = '';
			//row.borderWidth = 2;
			//row.borderColor = '#006cb1';
			row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
			
			var backgroundImg = Ti.UI.createView({
				backgroundImage:'images/Bgrnd_Store-Card.png',
				top:1,
				left:0,
				width:320,
				height:96,
				zIndex: 1
			});
			row.add(backgroundImg);
			
			var storeIcon = Ti.UI.createView({
				backgroundImage:'images/Bgrnd_Store-Progress-bar_OFF.png',  // TODO - from data
				top:12,
				left:12,
				width:48,
				height:48,
				clickName:'storeIcon',
				zIndex: 3
			});
			row.add(storeIcon);
			
			var favIcon = Ti.UI.createView({
				backgroundImage:'images/Icon_Favorite_ON.png',
				top:5,
				right:4,
				width:18,
				height:18,
				clickName:'favIcon',
				zIndex: 3
			});
			row.add(favIcon);
			
			var arrowIcon = Ti.UI.createView({
				backgroundImage:'images/Icon_Arrow_RT.png',
				top:43,
				right:4,
				width:12,
				height:20,
				clickName:'arrowIcon',
				zIndex: 3
			});
			row.add(arrowIcon);
			
			arrowIcon.addEventListener('click', function(e)
			{
				Ti.API.info('table view row clicked - source ' + e.source);
				// use rowNum property on object to get row number
				var rowNum = e.index;
				Ti.API.info('You clicked on row# '+rowNum);
				Ti.API.info('You clicked on the '+e.source.clickName);
	            cm.navGroup.open(cm.ui.createStoreDetailsWindow({
	            	model: e.rowData.data,
	            	modal: true,
	            	//barImage:$$.headerView.backgroundImage,
	            	//backgroundColor : 'blue',
					navBarHidden : true  // this is very important
	            }), { animated: true });
			});
			
			var progressOnLength = item.numPurchases / item.purchasesPerReward * 220;
			
			var progressOnIcon = Ti.UI.createView({
				backgroundImage:'images/Bgrnd_Store-Progress-bar_ON.png',
				top:42,
				left:70,
				width:progressOnLength,
				height:22,
				clickName:'progressOnIcon',
				zIndex: 5
			});
			row.add(progressOnIcon);
			
			var progressOffIcon = Ti.UI.createView({
				backgroundImage:'images/Bgrnd_Store-Progress-bar_OFF.png',
				top:42,
				left:70,
				width:220,
				height:22,
				clickName:'progressOffIcon',
				zIndex: 3
			});
			row.add(progressOffIcon);
			
			var progressLabel = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#FFFFFF',
				font:{fontStyle:'normal',fontSize:12,fontWeight:'normal'},
				right:45,
				top:45,
				height:'auto',
				width:'auto',
				clickName:'progressLabel',
				text:item.numPurchases + " / " + item.purchasesPerReward,
				zIndex: 6
			}));
			row.add(progressLabel);
		
			var storeName = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#8CC841',
				font:{fontStyle:'normal',fontSize:14,fontWeight:'bold'},
				left:70,
				top:18,
				height:'auto',
				width:'auto',
				clickName:'storeName',
				text:item.storeName,  // TODO change
				zIndex: 3
			}));
			row.add(storeName);

			var phone = Ti.UI.createLabel(cm.combine($$.Link, {
				color:'#0087A0',
				font:{fontStyle:'normal',fontSize:10,fontWeight:'normal'},
				left:12,
				bottom:12,
				height:'auto',
				width:'auto',
				clickName:'phone',
				text:item.phone,  // TODO change
				zIndex: 3
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
				text:item.distance + " miles",  // TODO change
				zIndex: 3
			}));
			row.add(distance);
			
			section = Ti.UI.createTableViewSection();
			section.add(row);	
			
			sectionlist.push(section);
		}
		
		tableView.setData(sectionlist);
		
	}
	
	//create the stores view
	cm.ui.createStoresView = function(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		
		var dashView = cm.ui.createDashView();
		view.add(dashView);
		
		//
		// CREATE SEARCH BAR
		//
/*
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
*/

		// request remote data
		cm.model.requestNearbyStores();
		cm.model.requestFavoritesStores();

		var viewData = [{ // Nearby
        	view: createStoreTable(),
            tabbedBarBackgroundImage: 'images/Frame_Stores-tab_Nearby.png',
            loadEvent: 'app:nearby.stores.loaded'
        }, { // Favorites
            view: createStoreTable(),
            tabbedBarBackgroundImage: 'images/Frame_Stores-tab_Favorites.png',
            loadEvent: 'app:fav.stores.loaded'
        }];
        
		for (i = 0, l = viewData.length; i < l; i++) {
			Ti.App.addEventListener(viewData[i].loadEvent, function(idx) {
				return function(e) {
					setStoreTableData(viewData[idx].view, e.data);
				}
			}(i));
		}

		var storeView = cm.ui.createTabbedScrollableView(cm.combine($$.TabGroup,{
			data:viewData,
			activeIndex: 0,
			shadow:$$.TabGroup.shadowAtTop,
			top:36
		}));
		view.add(storeView);

		return view;
	};
})();