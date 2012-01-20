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
		var rowlist = [], row, item;
		
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
			
			var storeIcon = Ti.UI.createImageView({
				//backgroundImage:'images/Icon_No-Avatar.png',
				image:cm.getImageUrl(item.logo),
				top:12,
				left:12,
				width:48,
				height:48,
				clickName:'storeIcon',
				zIndex: 3
			});
			row.add(storeIcon);
			
			var image = 'images/Icon_Favorite_OFF.png';
			if (item.favorite) image = 'images/Icon_Favorite_ON.png';
			var favIcon = Ti.UI.createView({
				backgroundImage:image,
				top:5,
				right:4,
				width:18,
				height:18,
				clickName:'favIcon',
				zIndex: 3
			});
			row.add(favIcon);
			row.favIcon = favIcon;
			
			favIcon.addEventListener('click', function(myitem, myfavicon) {
				return function(e) {
					if (!myitem.favorite) {
						myitem.favorite = true;
						myfavicon.backgroundImage = 'images/Icon_Favorite_ON.png';
						cm.model.favorites.push(myitem);
					} else {
						myitem.favorite = false;
						myfavicon.backgroundImage = 'images/Icon_Favorite_OFF.png';
						for (var j = 0, m = cm.model.favorites.length; j < m; j++) {
							if (myitem.id == cm.model.favorites[j].id) {
								cm.model.favorites.splice(j, 1);
							}
						}
						Ti.App.fireEvent('app:nearby.stores.updated', {});
					}
					Ti.App.fireEvent('app:fav.stores.loaded',{data:cm.model.favorites});
					cm.model.saveFavorites();
				}
			}(item, favIcon));
			
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
				right:30,
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
				text:item.storeName,
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
				text:item.phone,
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
				text:item.distance + " miles",
				zIndex: 3
			}));
			row.add(distance);

			rowlist.push(row);
		}
		
		tableView.setData(rowlist);
		
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
		Ti.App.addEventListener('app:userinfo.loaded', function(e) {
			dashView.dollarLabel.text = cm.model.userinfo.userpoint.points;
			cm.model.requestNearbyStores();
			cm.model.requestFavoritesStores();
		});

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

		Ti.App.addEventListener('app:nearby.stores.updated', function(e) {
			var rowList = viewData[0].view.data[0].rows;
			for (var i = 0, l = rowList.length; i < l; i++) {
				eachrow = rowList[i];
				eachrow.data.favorite = false;
				eachrow.favIcon.backgroundImage = 'images/Icon_Favorite_OFF.png';
				for (var j = 0, m = cm.model.favorites.length; j < m; j++) {
					if (eachrow.data.id == cm.model.favorites[j].id) {
						eachrow.data.favorite = true;
						eachrow.favIcon.backgroundImage = 'images/Icon_Favorite_ON.png';
						break;
					}
				}
			}
		});

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