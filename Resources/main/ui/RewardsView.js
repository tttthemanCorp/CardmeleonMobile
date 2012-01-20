/**
 * @author Jun Lu
 */

(function() {

	function createRewardTable(_args) {
		return Titanium.UI.createTableView({
			//search:search,
			//headerView:headerView,
			//footerView:footerView,
			filterAttribute:'filter',
			backgroundColor:'transparent',
			//opacity: 0.0,
			maxRowHeight:108,
			minRowHeight:108,
			style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
			separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE
		});
	}
	
	function setRewardTableData(tableView, data, index) {
		var sectionlist = [], row, section, item;
		
		for (var i = 0, l = data.length; i<l; i++) {
			item = data[i];
			row = Ti.UI.createTableViewRow();
			//row.height = 145;
			//row.width = 309;
			row.data = item;
			row.hasChild = false;
			row.className = 'datarow';
			row.clickName = 'row';
			row.backgroundImage = 'images/Bgrnd_Reward-Card.png';
			row.selectionStyle = Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE;
			//row.selectedBackgroundColor = '#EAE1C1';
			//row.filter = '';
			//row.borderWidth = 2;
			//row.borderColor = '#006cb1';
		
			var rewardTitle = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#8CC841',
				font:{fontStyle:'normal',fontSize:14,fontWeight:'bold'},
				left:12,
				top:6,
				height:'auto',
				width:'auto',
				clickName:'rewardTitle',
				text:item.name
			}));
			row.add(rewardTitle);
			
			var rewardDesc = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#8CC841',
				font:{fontStyle:'normal',fontSize:10,fontWeight:'normal'},
				left:12,
				top:22,
				height:28,
				width:220,
				wordWrap: true,
				clickName:'rewardDesc',
				text:item.desc
			}));
			row.add(rewardDesc);
			
			var expireTime = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#999999',
				font:{fontStyle:'italic',fontSize:10,fontWeight:'normal'},
				right:12,
				top:52,
				height:'auto',
				width:'auto',
				clickName:'expireTime',
				text:'Valid before '+ cm.formatDateShort(item.expire)
			}));
			row.add(expireTime);
			
			var forSaleLabel = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#999999',
				font:{fontStyle:'italic',fontSize:10,fontWeight:'bold'},
				right:12,
				top:6,
				height:'auto',
				width:'auto',
				clickName:'forSaleLabel',
				text:'For Sale?'
			}));
			row.add(forSaleLabel);
			
			var cardmeleonIcon = Ti.UI.createView({
				backgroundImage:'images/Icon_Points-Symbol_12x17.png',
				top:52,
				left:12,
				width:12,
				height:17,
				clickName:'cardmeleonIcon'
			});
			row.add(cardmeleonIcon);
			
			var cardmeleonValue = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#8CC841',
				font:{fontStyle:'normal',fontSize:14,fontWeight:'normal'},
				left:28,
				top:50,
				height:'auto',
				width:'auto',
				clickName:'cardmeleonValue',
				text:item.eCardmeleon
			}));
			row.add(cardmeleonValue);
			
			var redeemButton = Titanium.UI.createButton({
			   	backgroundImage:'images/Button_Redeem_OFF.png',
			   	backgroundSelectedImage:'images/Button_Redeem_ON.png',
				bottom:10,
				left:12,
				width:90,
				height:24,
			});
			redeemButton.addEventListener('click',function(model)
			{
				return function(e) {
				   	Titanium.API.info("You clicked the redeemButton");
		            cm.navGroup.open(cm.ui.createRewardsRedeemWindow({
		            	model: model,
		            	modal: true,
		            	//barImage:$$.headerView.backgroundImage,
		            	//backgroundColor : 'blue',
						navBarHidden : true  // this is very important
		            }), { animated: true });
			}}(item));
			row.add(redeemButton);
			
			var giftButton = Titanium.UI.createButton({
			   	backgroundImage:'images/Button_Gift_OFF.png',
			   	backgroundSelectedImage:'images/Button_Gift_ON.png',
				bottom:10,
				left:108,
				width:90,
				height:24,
			});
			giftButton.addEventListener('click',function(model)
			{
				return function(e) {
				   	Titanium.API.info("You clicked the giftButton");
		            cm.navGroup.open(cm.ui.createRewardsGiftWindow({
		            	model: model,
		            	modal: true,
		            	//barImage:$$.headerView.backgroundImage,
		            	//backgroundColor : 'blue',
						navBarHidden : true  // this is very important
		            }), { animated: true });
			}}(item));
			row.add(giftButton);
			
			var shareButton = Titanium.UI.createButton({
			   	backgroundImage:'images/Button_Share_OFF.png',
			   	backgroundSelectedImage:'images/Button_Share_ON.png',
				bottom:10,
				left:204,
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
		            	backgroundImage: 'images/Bgrnd_G-Y.png',
		            	//barImage:$$.headerView.backgroundImage,
		            	//backgroundColor : 'blue',
						navBarHidden : true  // this is very important
		            }), { animated: true });
			}}(item));
			row.add(shareButton);
			
			var image = 'images/Button_Sale_OFF.png';
			if (item.forSale) image = 'images/Button_Sale_ON.png';
			var forsaleSwitch = Titanium.UI.createButton({
			   	backgroundImage:image,
				right:16,
				top:22,
				height:18,
				width:36,
				value:item.forSale
			});
			forsaleSwitch.addEventListener('click',function(model, sw){
				return function(e)
				{
				    Titanium.API.info('forsaleSwitch value = ' + e.value + ' act val ' + sw.value);
				    if (sw.value) {
				    	sw.value = false;
				    	sw.backgroundImage = 'images/Button_Sale_OFF.png';
				    	model.forSale = false;
				    	cm.model.markForSale(model.id, false);
				    } else {
				    	sw.value = true;
				    	sw.backgroundImage = 'images/Button_Sale_ON.png';
				    	model.forSale = true;
				    	cm.model.markForSale(model.id, true);
				    }
				    if (index == 0) {
				    	Ti.App.fireEvent('app:expiresoon.rewards.updated', {});
				    	Ti.App.fireEvent('app:forsale.rewards.updated', {});
				    } else if (index == 1) {
				    	Ti.App.fireEvent('app:nearby.rewards.updated', {});
				    	Ti.App.fireEvent('app:forsale.rewards.updated', {});
				    } else {
				    	Ti.App.fireEvent('app:nearby.rewards.updated', {});
				    	Ti.App.fireEvent('app:expiresoon.rewards.updated', {});
				    	Ti.App.fireEvent('app:forsale.rewards.updated', {});
				    }
				    
				}
			}(item, forsaleSwitch));
			row.add(forsaleSwitch);
			
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

	//create the rewards view
	cm.ui.createRewardsView = function(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		
		var dashView = cm.ui.createDashView();
		view.add(dashView);
		
		// request remote data
		Ti.App.addEventListener('app:userinfo.loaded', function(e) {
			dashView.dollarLabel.text = cm.model.userinfo.userpoint.points;
			cm.model.requestNearbyRewards();
		});

		var viewData = [{ // Nearby
        	view: createRewardTable(),
            tabbedBarBackgroundImage: 'images/Frame_Rewards-tab_Nearby.png'
        }, { // Expire Soon
            view: createRewardTable(),
            tabbedBarBackgroundImage: 'images/Frame_Rewards-tab_Expire.png'
        }, { // My Sales
            view: createRewardTable(),
            tabbedBarBackgroundImage: 'images/Frame_Rewards-tab_Sales.png'
        }];
        
        var data;
        Ti.App.addEventListener('app:nearby.rewards.loaded', function(e) {
        	setRewardTableData(viewData[0].view, e.data, 0);
        	cm.sortByExpiration(e.data);
			setRewardTableData(viewData[1].view, e.data, 1);
			var forsaledata = filterNotForSaleData(e.data);
			setRewardTableData(viewData[2].view, forsaledata, 2);
			data = e.data;
        });
        
        Ti.App.addEventListener('app:nearby.rewards.updated', function(e) {
			cm.sortByDistance(data);
			setRewardTableData(viewData[0].view, data, 0);
        });
        
        Ti.App.addEventListener('app:expiresoon.rewards.updated', function(e) {
			cm.sortByExpiration(data);
			setRewardTableData(viewData[1].view, data, 1);
        });
        
        Ti.App.addEventListener('app:forsale.rewards.updated', function(e) {
        	cm.sortByDistance(data);
        	var forsaledata = filterNotForSaleData(data);
			setRewardTableData(viewData[2].view, forsaledata, 2);
        });
        
        /*
		for (i = 0, l = viewData.length; i < l; i++) {
			if (viewData[i].loadEvent != null) {
				Ti.App.addEventListener(viewData[i].loadEvent, function(idx) {
					return function(e) {
						setRewardTableData(viewData[idx].view, e.data);
						if (idx == 0) {
							cm.sortByExpiration(e.data);
							setRewardTableData(viewData[1].view, e.data);
							
							var forsaledata = filterNotForSaleData(e.data);
							setRewardTableData(viewData[2].view, forsaledata);
						}
					}
				}(i));
			}
		}
		*/

		var rewardView = cm.ui.createTabbedScrollableView(cm.combine($$.TabGroup,{
			data:viewData,
			activeIndex: 0,
			shadow:$$.TabGroup.shadowAtTop,
			top:36
		}));
		view.add(rewardView);

		return view;
	};
	
	function filterNotForSaleData(data) {
		var newdata = [];
		for (i = 0, l = data.length; i < l; i++) {
			if (data[i].forSale == true) {
				newdata.push(data[i]);
			}
		}
		return newdata;
	}
	
})();