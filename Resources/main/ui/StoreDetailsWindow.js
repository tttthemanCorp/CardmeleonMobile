/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function() {
	function createSummaryView(_args) {
		var model = _args.model;
		var view = Ti.UI.createView(cm.combine($$.summaryView, _args));
       
		var storeIcon = Ti.UI.createView({
			backgroundImage:'images/Bgrnd_Store-Progress-bar_OFF.png',  // TODO - from data
			top:6,
			right:6,
			width:72,
			height:72,
			clickName:'storeIcon',
			zIndex: 3
		});
		view.add(storeIcon);
	
		var storeName = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#FFFFFF',
			font:{fontStyle:'normal',fontSize:16},
			left:12,
			top:12,
			height:'auto',
			width:'auto',
			clickName:'storeName',
			text:model.storeName,  // TODO change
			zIndex: 3
		}));
		view.add(storeName);
		
		var phone = Ti.UI.createLabel(cm.combine($$.Link, {
			color:'#FFFFFF',
			font:{fontStyle:'normal',fontSize:10,fontWeight:'normal'},
			left:12,
			top:42,
			height:'auto',
			width:'auto',
			clickName:'phone',
			text:model.phone,  // TODO change
			zIndex: 3
		}));
		view.add(phone);
		
		var distance = Ti.UI.createLabel(cm.combine($$.Link, {
			color:'#FFFFFF',
			font:{fontStyle:'normal',fontSize:10,fontWeight:'normal'},
			left:12,
			bottom:12,
			height:'auto',
			width:'auto',
			clickName:'distance',
			text:model.distance + " miles",  // TODO change
			zIndex: 3
		}));
		view.add(distance);
			
       return view;
	}
	
	function createStoreBasicView(_args) {
		var model = _args.model;
		var view = Ti.UI.createView(cm.combine($$.stretch, {
			backgroundImage:'images/Bgrnd_Store-Basic.png'
		}));
       
		var progressOnIcon = Ti.UI.createView({
			backgroundImage:'images/Bgrnd_Store-Progress-bar_ON.png',
			top:116,
			left:18,
			width:38,  // TODO real data change
			height:32,
			clickName:'progressOnIcon',
			zIndex: 5
		});
		view.add(progressOnIcon);
		
		var progressOffIcon = Ti.UI.createView({
			backgroundImage:'images/Bgrnd_Store-Progress-bar_OFF.png',
			top:116,
			left:18,
			width:284,
			height:32,
			clickName:'progressOnIcon',
			zIndex: 3
		});
		view.add(progressOffIcon);
		
		var storeDesc = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#999999',
			font:{fontStyle:'normal',fontSize:16},
			left:18,
			right:18,
			top:24,
			height:60,
			clickName:'storeDesc',
			text:model.desc  // TODO change
		}));
		view.add(storeDesc);
		
		var rewards = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#999999',
			font:{fontStyle:'normal',fontSize:10,fontWeight:'normal'},
			left:18,
			top:160,
			height:'auto',
			width:'auto',
			clickName:'rewards',
			text:model.numRewards+' of rewards gained'  // TODO change
		}));
		view.add(rewards);
		
		var purchases = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#8CC841',
			font:{fontStyle:'normal',fontSize:10,fontWeight:'normal'},
			left:18,
			top:184,
			height:'auto',
			width:'auto',
			clickName:'purchases',
			text:model.numPurchases+' of purchases left to earn a reward'  // TODO change
		}));
		view.add(purchases);
		
		var marketMsg = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#0087A0',
			font:{fontStyle:'normal',fontSize:10,fontWeight:'normal'},
			left:18,
			top:208,
			height:'auto',
			width:'auto',
			clickName:'marketMsg',
			text:'Can\'t wait? Find a deal from the Market!'  // TODO change
		}));
		view.add(marketMsg);
		
		var mapIcon = Ti.UI.createView({
			backgroundImage:'images/Icon_Store-Map.png',
			top:160,
			right:18,
			width:48,
			height:60,
			clickName:'mapIcon'
		});
		view.add(mapIcon);
			
		return view;
	}
	
	function createReviewStars(_args) {
		var model = _args.model;
		var view = Ti.UI.createView(_args);
		
		var p = Math.floor(model.rating);
		var n = 5 - Math.ceil(model.rating);
		var h = 5 - p -n;
		var favIcon, curPos = 0;
		for (var i = 0; i < p; i++) {
			favIcon = Ti.UI.createView({
				backgroundImage:'images/Icon_Favorite_ON.png',
				top:0,
				left:curPos * 21,
				width:18,
				height:18,
				clickName:'favIcon'
			});
			view.add(favIcon);
			curPos++;
		}
		for (var i = 0; i < h; i++) {
			favIcon = Ti.UI.createView({
				backgroundImage:'images/Icon_Favorite_ON.png',  // TODO change to half star
				top:0,
				left: curPos * 21,
				width:18,
				height:18,
				clickName:'favIcon'
			});
			view.add(favIcon);
			curPos++;
		}
		for (var i = 0; i < n; i++) {
			favIcon = Ti.UI.createView({
				backgroundImage:'images/Icon_Favorite_OFF.png',
				top:0,
				left:curPos * 21,
				width:18,
				height:18,
				clickName:'favIcon'
			});
			view.add(favIcon);
			curPos++;
		}

		return view;
	}
	
	function createStoreReviewView(_args) {
		var model = _args.model;
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
       
		var reviewSummaryView = Ti.UI.createView({
			backgroundImage:'images/Bgrnd_Store-Review.png',
			top:0,
			left:0,
			width:$$.platformWidth,
			height:48,
			clickName:'reviewSummaryView'
		});
		
		reviewSummaryView.add(createReviewStars({
			top:12,
			left:6,
			height:18,
			width:102,
			model:model
		}));
		
		var numReviews = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#999999',
			font:{fontStyle:'normal',fontSize:12,fontWeight:'normal'},
			right:12,
			top:12,
			height:'auto',
			width:'auto',
			clickName:'numReviews',
			text:model.numReviews + " reviews: " + model.rating + " / 5.0"
		}));
		reviewSummaryView.add(numReviews);
		
		view.add(reviewSummaryView);
		
		return view;
	}
	
	function addStoreReviewTable(view, data, params) {
		var tableView = Titanium.UI.createTableView(cm.combine({
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
		}, params));
		
		var sectionlist = [], reviewList = data.reviews;
		
		for (var i = 0, l = reviewList.length; i<l; i++) {
			item = reviewList[i];
			row = Ti.UI.createTableViewRow();
			//row.height = 145;
			//row.width = 309;
			row.data = item;
			//row.hasChild = true;
			row.className = 'datarow';
			row.clickName = 'row';
			row.backgroundImage = 'images/Bgrnd_Store-Card.png';
			//row.selectedBackgroundImage = 'images/Bgrnd_Store-Card_Selected.png';
			//row.filter = '';
			//row.borderWidth = 2;
			//row.borderColor = '#006cb1';
			
			var avatarIcon = Ti.UI.createView({
				backgroundImage:'images/Icon_No-Avatar.png',  // TODO
				top:12,
				left:12,
				width:48,
				height:48,
				clickName:'avatarIcon'
			});
			row.add(avatarIcon);
			
			var userLevelIcon = Ti.UI.createView({
				backgroundImage:'images/Icon_Level_01.png',  // TODO
				top:12,
				right:12,
				width:30,
				height:26,
				clickName:'userLevelIcon'
			});
			row.add(userLevelIcon);
			
			var userName = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#4BBEB4',
				font:{fontStyle:'normal',fontSize:12,fontWeight:'bold'},
				left:72,
				top:36,
				height:'auto',
				width:'auto',
				clickName:'userName',
				text:item.userName  // TODO change
			}));
			row.add(userName);
			
			var reviewTime = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#999999',
				font:{fontStyle:'italic',fontSize:10,fontWeight:'normal'},
				left:72,
				top:56,
				height:'auto',
				width:'auto',
				clickName:'reviewTime',
				text:item.time  // TODO change
			}));
			row.add(reviewTime);
			
			var reviewText = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#999999',
				font:{fontStyle:'italic',fontSize:12,fontWeight:'normal'},
				left:12,
				top:102,
				height:'auto',
				width:'auto',
				clickName:'reviewText',
				text:item.review  // TODO change
			}));
			row.add(reviewText);
			
			var stars = createReviewStars({
				top:72,
				left:12,
				height:18,
				width:102,
				model:item
			});
			row.add(stars);
			
			section = Ti.UI.createTableViewSection();
			section.add(row);	
			
			sectionlist.push(section);
		}
		
		tableView.setData(sectionlist);
		
		tableView.addEventListener('click', function(e)
		{
			Ti.API.info('review table view row clicked - source ' + e.source);
		});
		
		view.add(tableView);
	}		

	function createStorePromoView(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
       	return view;
	}
	
	function addStorePromoTable(view, data, params) {
		var tableView = Titanium.UI.createTableView(cm.combine({
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
		}, params));
		
		var sectionlist = [], promoList = data.promotions;
		
		for (var i = 0, l = promoList.length; i<l; i++) {
			item = promoList[i];
			row = Ti.UI.createTableViewRow();
			//row.height = 145;
			//row.width = 309;
			row.data = item;
			//row.hasChild = true;
			row.className = 'datarow';
			row.clickName = 'row';
			row.backgroundImage = 'images/Bgrnd_Store-Card.png';
			//row.selectedBackgroundImage = 'images/Bgrnd_Store-Card_Selected.png';
			//row.filter = '';
			//row.borderWidth = 2;
			//row.borderColor = '#006cb1';
			
			var promoTitle = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#8CC841',
				font:{fontStyle:'normal',fontSize:24,fontWeight:'bold'},
				left:12,
				top:12,
				height:'auto',
				width:'auto',
				clickName:'promoTitle',
				text:item.title
			}));
			row.add(promoTitle);
			
			var expireTime = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#999999',
				font:{fontStyle:'italic',fontSize:12,fontWeight:'normal'},
				right:12,
				bottom:12,
				height:'auto',
				width:'auto',
				clickName:'expireTime',
				text:'Valid until '+item.expire
			}));
			row.add(expireTime);
			
			var promoDesc = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#0087A0',
				font:{fontStyle:'italic',fontSize:12,fontWeight:'normal'},
				left:12,
				top:50,
				height:'auto',
				width:'auto',
				clickName:'promoDesc',
				text:item.desc
			}));
			row.add(promoDesc);
			
			section = Ti.UI.createTableViewSection();
			section.add(row);	
			
			sectionlist.push(section);
		}
		
		tableView.setData(sectionlist);
		
		tableView.addEventListener('click', function(e)
		{
			Ti.API.info('promo table view row clicked - source ' + e.source);
		});
		
		view.add(tableView);
	}		
	
	function createStoreMenuView(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, {

       }));
       return view;
	}
	
	cm.ui.createStoreDetailsWindow = function(_args) {
		var model = _args.model;
		var win = Ti.UI.createWindow(cm.combine($$.stretch, _args));

		var headerView = cm.ui.createHeaderView();
		var backButton = Titanium.UI.createButton({
			backgroundSelectedImage:'images/Button_Stores-back_ON.png', 
			backgroundImage:'images/Button_Stores-back_OFF.png',
			top:9,
			left:58,
			width:62,
			height:18
		});
		backButton.addEventListener('click', function() {
			win.close();
		});
		headerView.add(backButton);
		win.add(headerView);
	
		var view = Ti.UI.createView(cm.combine($$.stretch, {
			top:$$.headerView.height,
			backgroundImage:'images/Bgrnd_G-B.png'
		}));

		var summaryView = createSummaryView({
			model:model,
			//backgroundColor:'transparent',
			top:0
		});
		view.add(summaryView);
		
		cm.model.requestStoreDetails();
		
		var viewData = [{
        	title: 'Basic',
        	view: createStoreBasicView({model:model}),
            tabbedBarBackgroundImage: 'images/Frame_Stores_Basic.png'
        }, {
            title: 'Review',
            view: createStoreReviewView({model:model}),
            tabbedBarBackgroundImage: 'images/Frame_Stores_Review.png'
        }, {
            title: 'Promotion',
            view: createStorePromoView({model:model}),
            tabbedBarBackgroundImage: 'images/Frame_Stores_Promo.png'
        }, {
            title: 'Menu',
            view: createStoreMenuView({model:model}),
            tabbedBarBackgroundImage: 'images/Frame_Stores_Menu.png'
        }];
        
		var storeDetailsView = cm.ui.createTabbedScrollableView(cm.combine($$.TabGroup,{
			data:viewData,
			activeIndex: 0,
			shadow:12,
			top:$$.summaryView.height
		}));
		view.add(storeDetailsView);

		win.add(view);
		
		var cameraView = cm.ui.createCameraView({
			bottom:0
		});
		win.add(cameraView);
		
		Ti.App.addEventListener("app:store.details.loaded", function(e) {
			addStoreReviewTable(viewData[1].view, e.data, {
				top:48,
				left:0,
				width:$$.platformWidth,
				bottom:0
			});
			addStorePromoTable(viewData[2].view, e.data, {
				top:0,
				left:0,
				width:$$.platformWidth,
				bottom:0
			});
		});

		return win;
		
/*		
		var button = Titanium.UI.createButton(cm.combine($$.Button, {
			title:'Open Child Window',
			top:100,
			left:50,
		}));
		win.add(button);
		
		button.addEventListener('click', function(){
			cm.navGroup.open(Ti.UI.createWindow({
				backgroundColor : 'black',
				navBarHidden : false,  // this is very important
            }), { animated: true });
		});
		
		return win;
*/
	};
	
})();