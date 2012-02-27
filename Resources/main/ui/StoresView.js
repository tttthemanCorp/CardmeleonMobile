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
			maxRowHeight:103,
			minRowHeight:103,
			style:Titanium.UI.iPhone.TableViewStyle.PLAIN,
			separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE
		});
	}
	
	function setStoreTableData(tableView, data, index) {
		var sectionlist = [], row, section, item;
		
		for (var i = 0, l = data.length; i<l; i++) {
			item = data[i];
			row = Ti.UI.createTableViewRow();
			row.data = item;
			row.hasChild = false;
			row.className = 'datarow';
			row.clickName = 'row';
			row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
			//row.backgroundImage = '/images/Bgrnd_Store-Card.png';
			//row.selectedBackgroundImage = '/images/Bgrnd_Store-Card_Selected.png';
			//row.rightImage = '/images/Icon_Arrow_RT.png'
			//row.selectedColor = "blue";
			//row.filter = '';
			//row.borderWidth = 2;
			//row.borderColor = '#006cb1';
			//row.height = 145;
			//row.width = 309;
			
			var backgroundImg = Ti.UI.createView({
				backgroundImage:'/images/Bgrnd_Store-Card.png',
				top:3,
				left:0,
				width:320,
				height:97,
				zIndex: 1
			});
			row.add(backgroundImg);
			
			var storeIcon = Ti.UI.createImageView({
				//backgroundImage:'/images/Icon_No-Avatar.png',
				image:cm.getImageUrl(item.logo),
				defaultImage:'/images/photoDefault.png',
				top:12,
				left:12,
				width:48,
				height:48,
				clickName:'storeIcon',
				zIndex: 3
			});
			row.add(storeIcon);
			
			var image = '/images/Icon_Favorite_OFF.png';
			if (item.favorite) image = '/images/Icon_Favorite_ON.png';
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
			row.favorite = item.favorite;
			
			favIcon.addEventListener('click', function(myitem, myfavicon, myrow) {
				return function(e) {
					if (!myrow.favorite) {
						myitem.favorite = true;
						myrow.favorite = true;
						myfavicon.backgroundImage = '/images/Icon_Favorite_ON.png';
						cm.model.favorites.push(myitem);
					} else {
						myitem.favorite = false;
						myrow.favorite = false;
						myfavicon.backgroundImage = '/images/Icon_Favorite_OFF.png';
						for (var j = 0; j < cm.model.favorites.length; j++) {
							if (myitem.id == cm.model.favorites[j].id) {
								cm.model.favorites.splice(j, 1);
							}
						}
					}
					if (index == 1) {
						Ti.App.fireEvent('app:nearby.stores.updated', {id:myitem.id,favorite:myitem.favorite});
					}
					Ti.App.fireEvent('app:fav.stores.loaded',{data:cm.model.favorites});
					cm.model.saveFavorites();
				}
			}(item, favIcon, row));
			
			var arrowView = Ti.UI.createView({
				top:3,
				left:0,
				width:320,
				height:97,
				clickName:'arrowView',
				zIndex: 2
			});
			var arrowIcon = Ti.UI.createImageView({
				image:'/images/Icon_Arrow_RT.png',
				top:40,
				right:5,
				width:12,
				height:20,
				zIndex: 3
			});
			arrowView.add(arrowIcon);
			row.add(arrowView);
			
			arrowView.addEventListener('click', function(myitem) {
				return function(e) {
		            cm.navGroup.open(cm.ui.createStoreDetailsWindow({
		            	model: myitem,
		            	modal: true,
		            	//barImage:$$.headerView.backgroundImage,
		            	//backgroundColor : 'blue',
						navBarHidden : true  // this is very important
		            }), { animated: true });
			};}(item));
			
			var progressOnLength = 0;
			if (item.purchasesPerReward > 0) {
				progressOnLength = item.numPurchases / item.purchasesPerReward * 220;
				if (progressOnLength > 220) progressOnLength = 220;
			}
			
			var progressOnIcon = Ti.UI.createView({
				backgroundImage:'/images/Bgrnd_Store-Progress-bar_ON.png',
				top:42,
				left:70,
				width:progressOnLength,
				height:22,
				clickName:'progressOnIcon',
				zIndex: 5
			});
			row.add(progressOnIcon);
			
			var progressOffIcon = Ti.UI.createView({
				backgroundImage:'/images/Bgrnd_Store-Progress-bar_OFF.png',
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
			
			phone.addEventListener('click', function(e){
				cm.callPhone(phone.text);
			});
			
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
			
			distance.addEventListener('click', function(e){
				cm.openMap(item.addr);
			});

			section = Ti.UI.createTableViewSection();
			section.add(row);	
			
			sectionlist.push(section);
		}
		
		tableView.setData(sectionlist);
		
		/*
		tableView.addEventListener('click', function(e)
		{
			Ti.API.info('table view row clicked - source ' + e.source);
			// use rowNum property on object to get row number
			var rowNum = e.index;
			Ti.API.info('You clicked on row# '+rowNum);
			Ti.API.info('You clicked on the '+e.source);
            cm.navGroup.open(cm.ui.createStoreDetailsWindow({
            	model: e.row.data,
            	modal: true,
            	//barImage:$$.headerView.backgroundImage,
            	//backgroundColor : 'blue',
				navBarHidden : true  // this is very important
            }), { animated: true });
		});
		*/
		
	}
	
	//create the stores view
	cm.ui.createStoresView = function(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		
		var dashView = cm.ui.createDashView();
		view.add(dashView);

		// request remote data
		Ti.App.addEventListener('app:userinfo.loaded', function(e) {
			dashView.dollarLabel.text = cm.model.userinfo.userpoint.points;
			cm.model.requestNearbyStores();
			cm.model.requestFavoritesStores();
		});

		var viewData = [{ // Nearby
        	view: createStoreTable(),
            tabbedBarBackgroundImage: '/images/Frame_Stores-tab_Nearby.png',
            loadEvent: 'app:nearby.stores.loaded'
        }, { // Favorites
            view: createStoreTable(),
            tabbedBarBackgroundImage: '/images/Frame_Stores-tab_Favorites.png',
            loadEvent: 'app:fav.stores.loaded'
        }];
        
		for (i = 0, l = viewData.length; i < l; i++) {
			Ti.App.addEventListener(viewData[i].loadEvent, function(idx) {
				return function(e) {
					setStoreTableData(viewData[idx].view, e.data, idx);
				}
			}(i));
		}

		Ti.App.addEventListener('app:nearby.stores.updated', function(e) {
			var sectionList = viewData[0].view.data;
			for (var i = 0, l = sectionList.length; i < l; i++) {
				eachrow = sectionList[i].rows[0];
				if (e.id == eachrow.data.id) {
					eachrow.favorite = e.favorite;
					if (eachrow.favorite) {
						eachrow.favIcon.backgroundImage = '/images/Icon_Favorite_ON.png';
					} else {
						eachrow.favIcon.backgroundImage = '/images/Icon_Favorite_OFF.png';
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