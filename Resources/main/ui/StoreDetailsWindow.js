/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function() {
	function createSummaryView(_args) {
		var model = _args.model;
		var view = Ti.UI.createView(cm.combine($$.summaryView, _args));
       
		var storeIcon = Ti.UI.createImageView({
			image:cm.getImageUrl(model.logo),
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
			text:model.storeName,
			zIndex: 3
		}));
		view.add(storeName);
		
		var phone = cm.ui.createLink(cm.combine($$.Link, {
			color:'#FFFFFF',
			font:{fontStyle:'normal',fontSize:10,fontWeight:'normal'},
			left:12,
			top:42,
			height:14,
			width:73,
			thickness:1,
			clickName:'phone',
			text:model.phone,
			zIndex: 3
		}));
		view.add(phone);
		
		var distance = cm.ui.createLink(cm.combine($$.Link, {
			color:'#FFFFFF',
			font:{fontStyle:'normal',fontSize:10,fontWeight:'normal'},
			left:12,
			bottom:12,
			height:14,
			width:45,
			thickness:1,
			clickName:'distance',
			text:model.distance + " miles",
			zIndex: 3
		}));
		view.add(distance);
			
       return view;
	}
	
	function createStoreBasicView(_args) {
		var model = _args.model;
		var view = Ti.UI.createView(cm.combine($$.stretch, {
			backgroundImage:'//images/Bgrnd_Store-Basic.png'
		}));
       
       var progressOnLength = model.numPurchases / model.purchasesPerReward * 284;
       
		var progressOnIcon = Ti.UI.createView({
			backgroundImage:'//images/Bgrnd_Store-Progress-bar_ON.png',
			top:116,
			left:18,
			width:progressOnLength,
			height:32,
			clickName:'progressOnIcon',
			zIndex: 5
		});
		view.add(progressOnIcon);
		
		var progressOffIcon = Ti.UI.createView({
			backgroundImage:'//images/Bgrnd_Store-Progress-bar_OFF.png',
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
			text:model.desc
		}));
		view.add(storeDesc);
		
		var progressLabel = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#FFFFFF',
			font:{fontStyle:'normal',fontSize:12,fontWeight:'normal'},
			right:30,
			top:124,
			height:'auto',
			width:'auto',
			clickName:'progressLabel',
			text:model.numPurchases + " / " + model.purchasesPerReward,
			zIndex: 6
		}));
		view.add(progressLabel);
		
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
			text:(model.purchasesPerReward - model.numPurchases)+' of purchases left to earn a reward'  // TODO change
		}));
		view.add(purchases);
		
		var marketMsg = cm.ui.createLink(cm.combine($$.Label, {
			color:'#0087A0',
			font:{fontStyle:'normal',fontSize:10,fontWeight:'normal'},
			left:18,
			top:208,
			height:14,
			width:188,
			thickness:1,
			clickName:'marketMsg',
			text:'Can\'t wait? Find a deal from the Market!'  // TODO should jump to Market tab
		}));
		view.add(marketMsg);
		
		var mapIcon = Ti.UI.createView({
			backgroundImage:'//images/Icon_Store-Map.png',
			top:160,
			right:18,
			width:48,
			height:60,
			clickName:'mapIcon'
		});
		view.add(mapIcon);
		
		mapIcon.addEventListener('click', function(e) {
			Ti.Platform.openURL('http://maps.google.com/maps?q='+model.addr);
		});
			
		return view;
	}
	
	function createStoreReviewView(_args) {
		var model = _args.model;
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
       

		
		return view;
	}
	
	function addStoreReviewTable(view, data, params) {
		var sectionlist = [], reviewList = data.reviews;
		
		// summary view
		var reviewSummaryView = Ti.UI.createView({
			backgroundImage:'//images/Bgrnd_Store-Review.png',
			top:0,
			left:0,
			width:$$.platformWidth,
			height:48,
			clickName:'reviewSummaryView'
		});
		
		reviewSummaryView.add(cm.ui.createReviewStars({
			top:12,
			left:6,
			height:18,
			width:102,
			model:data
		}));
		
		var numReviews = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#999999',
			font:{fontStyle:'normal',fontSize:12,fontWeight:'normal'},
			right:12,
			top:12,
			height:'auto',
			width:'auto',
			clickName:'numReviews',
			text:data.numReviews + " reviews: " + data.rating + " / 5.0"
		}));
		reviewSummaryView.add(numReviews);
		
		// table view
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
		
		for (var i = 0, l = reviewList.length; i<l; i++) {
			item = reviewList[i];
			row = Ti.UI.createTableViewRow();
			//row.height = 145;
			//row.width = 309;
			row.data = item;
			//row.hasChild = true;
			row.className = 'datarow';
			row.clickName = 'row';
			row.backgroundImage = '//images/Bgrnd_Store-Card.png';
			//row.selectedBackgroundImage = '//images/Bgrnd_Store-Card_Selected.png';
			//row.filter = '';
			//row.borderWidth = 2;
			//row.borderColor = '#006cb1';
			
			var avatarIcon = Ti.UI.createView({
				backgroundImage:'//images/Icon_No-Avatar.png',  // TODO
				top:12,
				left:12,
				width:48,
				height:48,
				clickName:'avatarIcon'
			});
			row.add(avatarIcon);
			
			var userLevelIcon = Ti.UI.createView({
				backgroundImage:'//images/Icon_Level_01.png',  // TODO
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
			
			var stars = cm.ui.createReviewStars({
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
		
		view.add(reviewSummaryView);
		view.add(tableView);
	}		

	function createStoreProgramView(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
       	return view;
	}
	
	function addStoreProgramTable(view, data, params) {
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
		
		var sectionlist = [], programList = data.programs;
		
		for (var i = 0, l = programList.length; i<l; i++) {
			item = programList[i];
			row = Ti.UI.createTableViewRow();
			row.data = item;
			row.hasChild = false;
			row.className = 'datarow';
			row.clickName = 'row';
			row.backgroundImage = '//images/Bgrnd_Store-Card.png';
			row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
			//row.selectedBackgroundImage = '//images/Bgrnd_Store-Card_Selected.png';
			//row.filter = '';
			//row.borderWidth = 2;
			//row.borderColor = '#006cb1';
			//row.height = 145;
			//row.width = 309;
			
			var programTitle = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#8CC841',
				font:{fontStyle:'normal',fontSize:18,fontWeight:'bold'},
				left:12,
				top:12,
				height:'auto',
				width:'auto',
				clickName:'programTitle',
				text:item.name
			}));
			row.add(programTitle);
			
			/*
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
			*/
			
			var qualification;
			if (item.prog_type == 1) {
				qualification = 'Qualification: ' + Math.round(item.reward_trigger) + ' purchases';
			} else {
				qualification = 'Qualification: accumulated purchase amount of $' + item.reward_trigger;
			}
			var qualificationLabel = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#0087A0',
				font:{fontStyle:'italic',fontSize:12,fontWeight:'normal'},
				left:12,
				top:50,
				height:'auto',
				width:'auto',
				clickName:'qualificationLabel',
				text:qualification
			}));
			row.add(qualificationLabel);
			
			var rewardLabel = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#0087A0',
				font:{fontStyle:'italic',fontSize:12,fontWeight:'normal'},
				left:12,
				top:80,
				height:'auto',
				width:'auto',
				clickName:'rewardLabel',
				text:'Reward: ' + item.reward_name + '\nEquivalent Cardmeleon Points: ' + item.reward_points
			}));
			row.add(rewardLabel);
			
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

		var headerView = cm.ui.createHeaderView({noSettings:true});
		var backButton = Titanium.UI.createButton({
			backgroundSelectedImage:'/images/Button_Back_ON.png', 
			backgroundImage:'/images/Button_Back_OFF.png',
			top:9,
			left:12,
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
			backgroundImage:'/images/Bgrnd_G-B.png'
		}));

		var summaryView = createSummaryView({
			model:model,
			//backgroundColor:'transparent',
			top:0
		});
		view.add(summaryView);
		
		cm.model.requestStoreDetails(model.id);
		
		var viewData = [{
        	title: 'Basic',
        	view: createStoreBasicView({model:model}),
            tabbedBarBackgroundImage: '/images/Frame_Stores_Basic.png'
        }, {
            title: 'Review',
            view: createStoreReviewView({model:model}),
            tabbedBarBackgroundImage: '/images/Frame_Stores_Review.png'
        }, {
            title: 'Program',
            view: createStoreProgramView({model:model}),
            tabbedBarBackgroundImage: '/images/Frame_Stores_Promo.png'
        }, {
            title: 'Menu',
            view: createStoreMenuView({model:model}),
            tabbedBarBackgroundImage: '/images/Frame_Stores_Menu.png'
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
			addStoreProgramTable(viewData[2].view, e.data, {
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