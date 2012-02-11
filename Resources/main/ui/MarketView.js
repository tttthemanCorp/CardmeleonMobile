/**
 * @author Jun Lu
 */

(function() {

	function createMarketTable(_args) {
		return Titanium.UI.createTableView({
			//search:search,
			//headerView:headerView,
			//footerView:footerView,
			filterAttribute:'filter',
			backgroundColor:'transparent',
			//opacity: 0.0,
			maxRowHeight:102,
			minRowHeight:102,
			style:Titanium.UI.iPhone.TableViewStyle.PLAIN,
			separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE
		});
	}
	
	function setMarketTableData(tableView, data, index) {
		var sectionlist = [], row, section, item;
		
		for (var i = 0, l = data.length; i<l; i++) {
			item = data[i];
			row = Ti.UI.createTableViewRow();
			row.data = item;
			row.hasChild = false;
			row.className = 'datarow';
			row.clickName = 'row';
			row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
			//row.backgroundImage = '//images/Bgrnd_Market-Card.png';
			//row.height = 145;
			//row.width = 309;
			//row.selectedBackgroundColor = '#EAE1C1';
			//row.filter = '';
			//row.borderWidth = 2;
			//row.borderColor = '#006cb1';
			
			var backgroundImg = Ti.UI.createView({
				backgroundImage:'//images/Bgrnd_Market-Card.png',
				top:3,
				left:6,
				width:308,
				height:96,
				zIndex: 1
			});
			row.add(backgroundImg);
		
			var rewardTitle = Ti.UI.createLabel(cm.combine($$.Label, {
				zIndex: 3,
				color:'#8CC841',
				font:{fontStyle:'normal',fontSize:14,fontWeight:'bold'},
				left:12,
				top:10,
				height:'auto',
				width:'auto',
				clickName:'rewardTitle',
				text:item.name
			}));
			row.add(rewardTitle);
			
			var expireTime = Ti.UI.createLabel(cm.combine($$.Label, {
				zIndex: 3,
				color:'#999999',
				font:{fontStyle:'italic',fontSize:10,fontWeight:'normal'},
				right:12,
				bottom:10,
				height:30,
				width:80,
				textAlign:'right',
				clickName:'expireTime',
				text:'Valid before '+ cm.formatDateShort(item.expire)
			}));
			row.add(expireTime);
			
			var watchingLabel = Ti.UI.createLabel(cm.combine($$.Label, {
				zIndex: 3,
				color:'#999999',
				font:{fontStyle:'italic',fontSize:10,fontWeight:'bold'},
				right:12,
				top:10,
				height:'auto',
				width:'auto',
				clickName:'forSaleLabel',
				text:'Watch it?'  // TODO change
			}));
			row.add(watchingLabel);
			
			var cardmeleonIcon = Ti.UI.createView({
				zIndex: 3,
				backgroundImage:'//images/Icon_Points-Symbol_12x17.png',
				top:30,
				left:12,
				width:12,
				height:17,
				clickName:'cardmeleonIcon'
			});
			row.add(cardmeleonIcon);
			
			var cardmeleonValue = Ti.UI.createLabel(cm.combine($$.Label, {
				zIndex: 3,
				color:'#8CC841',
				font:{fontStyle:'normal',fontSize:14,fontWeight:'normal'},
				left:30,
				top:30,
				height:'auto',
				width:'auto',
				clickName:'cardmeleonValue',
				text:item.eCardmeleon
			}));
			row.add(cardmeleonValue);
			
			var buyButton = Titanium.UI.createButton({
				zIndex: 3,
			   	backgroundImage:'//images/Button_Buy_OFF.png',
			   	backgroundSelectedImage:'//images/Button_Buy_ON.png',
				bottom:10,
				left:12,
				width:90,
				height:24,
			});
			buyButton.addEventListener('click',function(idx, myitem)
			{
				return function(e) {
				   	Titanium.API.info("You clicked the buyButton");
					var confirmDialog = Titanium.UI.createAlertDialog({
					    title: 'You are buying a reward',
					    message: 'Confirm Purchase ?',
					    buttonNames: ['OK','Cancel'],
					    cancel: 1
					});
					confirmDialog.addEventListener('click', function(e)
					{
					   	if (e.index == 0) { // OK
					   		cm.model.buyReward(myitem.userrewardid, myitem.userid, 'buying a reward from smartphone');
					   		Ti.App.fireEvent('app:geoloc.available', {longitude: cm.getLongitude(), latitude: cm.getLatitude()});
					   		//tableView.deleteRow(idx, {animate:true});
					   	}
					});
					confirmDialog.show();
				};
			}(i, item));
			row.add(buyButton);
			
			var shareButton = Titanium.UI.createButton({
				zIndex: 3,
			   	backgroundImage:'//images/Button_Share_OFF.png',
			   	backgroundSelectedImage:'//images/Button_Share_ON.png',
				bottom:10,
				left:108,
				width:90,
				height:24,
			});
			shareButton.addEventListener('click',function(model)
			{
				return function(e) {
				   	Titanium.API.info("You clicked the shareButton");
		            cm.navGroup.open(cm.ui.createRewardsShareWindow({
		            	model: model,
		            	modal: true,
		            	backgroundImage: '//images/Bgrnd_O-Y.png',
		            	//barImage:$$.headerView.backgroundImage,
		            	//backgroundColor : 'blue',
						navBarHidden : true  // this is very important
		            }), { animated: true });
			}}(item));
			row.add(shareButton);
			
			row.watching = item.watching;
			var image = '//images/Button_Sale_OFF.png';
			if (item.watching) image = '//images/Button_Sale_ON.png';
			var watchingSwitch = Titanium.UI.createButton({
				zIndex: 3,
			   	backgroundImage:image,
				right:16,
				top:26,
				height:18,
				width:36
			});
			watchingSwitch.addEventListener('click', function(mywatchingswitch, myrow, myitem) {
				return function(e) {
					if (myrow.watching == false) {
						myrow.watching = true;
						myitem.watching = true;
						mywatchingswitch.backgroundImage = '//images/Button_Sale_ON.png';
						cm.model.watches.push(myitem);
					} else {
						myrow.watching = false;
						myitem.watching = false;
						mywatchingswitch.backgroundImage = '//images/Button_Sale_OFF.png';
						for (var j = 0; j < cm.model.watches.length; j++) {
							if (myitem.id == cm.model.watches[j].id && myitem.userid == cm.model.watches[j].userid) {
								cm.model.watches.splice(j, 1);
							}
						}
					}
					if (index == 0) {
						Ti.App.fireEvent('app:expiresoon.market.updated', {id:myitem.id, userid:myitem.userid, watching:myitem.watching});
						Ti.App.fireEvent('app:watching.market.loaded',{data:cm.model.watches});
					} else if (index == 1) {
						Ti.App.fireEvent('app:nearby.market.updated', {id:myitem.id, userid:myitem.userid, watching:myitem.watching});
						Ti.App.fireEvent('app:watching.market.loaded',{data:cm.model.watches});
					} else {
						Ti.App.fireEvent('app:nearby.market.updated', {id:myitem.id, userid:myitem.userid, watching:myitem.watching});
						Ti.App.fireEvent('app:expiresoon.market.updated',{id:myitem.id, userid:myitem.userid, watching:myitem.watching});
						Ti.App.fireEvent('app:watching.market.loaded',{data:cm.model.watches});
					}
					cm.model.saveWatches();
				}
			}(watchingSwitch, row, item));
			row.add(watchingSwitch);
			row.watchingSwitch = watchingSwitch;
			
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
			Ti.API.info('You clicked on the '+e.source.clickName);
            cm.navGroup.open(cm.ui.createStoreDetailsWindow({
            	model: e.rowData.data,
            	modal: true,
            	//barImage:$$.headerView.backgroundImage,
            	//backgroundColor : 'blue',
				navBarHidden : true  // this is very important
            }), { animated: true });
		});
*/
	}

	//create the markets view
	cm.ui.createMarketView = function(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		
		var dashView = cm.ui.createDashView();
		view.add(dashView);
		
		// request remote data
		Ti.App.addEventListener('app:userinfo.loaded', function(e) {
			dashView.dollarLabel.text = cm.model.userinfo.userpoint.points;
			cm.model.requestNearbyMarket();
			cm.model.requestMyWatching();
		});

		var viewData = [{ // Nearby
        	view: createMarketTable(),
            tabbedBarBackgroundImage: '/images/Frame_Market-tab_Nearby.png',
            updateEvent:'app:nearby.market.updated'
        }, { // Expire Soon
            view: createMarketTable(),
            tabbedBarBackgroundImage: '/images/Frame_Market-tab_Expire.png',
            updateEvent:'app:expiresoon.market.updated'
        }, { // Watching
            view: createMarketTable(),
            tabbedBarBackgroundImage: '/images/Frame_Market-tab_Watching.png',
            updateEvent:null
        }];
        
		for (i = 0, l = viewData.length; i < l; i++) {
			if (viewData[i].updateEvent == null) continue;
			Ti.App.addEventListener(viewData[i].updateEvent, function(idx) {
				return function(e) {
					var sectionList = viewData[idx].view.data;
					for (var k = 0, n = sectionList.length; k < n; k++) {
						eachrow = sectionList[k].rows[0];
						if (e.id == eachrow.data.id && e.userid == eachrow.data.userid) {
							eachrow.watching = e.watching;
							if (eachrow.watching) {
								eachrow.watchingSwitch.backgroundImage = '/images/Button_Sale_ON.png';
							} else {
								eachrow.watchingSwitch.backgroundImage = '/images/Button_Sale_OFF.png';
							}
						}
					}
				}
			}(i));
		}
		
        Ti.App.addEventListener('app:nearby.market.loaded', function(e) {
        	setMarketTableData(viewData[0].view, e.data, 0);
        	cm.sortByExpiration(e.data);
			setMarketTableData(viewData[1].view, e.data, 1);
        });
        
        Ti.App.addEventListener('app:watching.market.loaded', function(e) {
        	setMarketTableData(viewData[2].view, e.data, 2);
        });

		var marketView = cm.ui.createTabbedScrollableView(cm.combine($$.TabGroup,{
			data:viewData,
			activeIndex: 0,
			shadow:$$.TabGroup.shadowAtTop,
			top:36
		}));
		view.add(marketView);

		return view;
	};

})();