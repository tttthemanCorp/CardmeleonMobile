/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function(){

	function showCountdown(seconds) {
		var min = Math.floor(seconds / 60);
		var sec = seconds - 60 * min;
		if (min < 10) min = '0' + min;
		if (sec < 10) sec = '0' + sec;
		return min + ':' + sec;
	}

	cm.ui.createRewardsRedeemWindow = function(_args) {
		var model = _args.model, redeemed = false, myInterval = null,
		countdown = 600;
		var win = Ti.UI.createWindow(cm.combine($$.stretch, _args));

		var headerView = cm.ui.createHeaderView();
		var backButton = Titanium.UI.createButton({
			backgroundSelectedImage:'images/Button_Rewards-back_ON.png', 
			backgroundImage:'images/Button_Rewards-back_OFF.png',
			top:9,
			left:58,
			width:62,
			height:18
		});
		backButton.addEventListener('click', function() {
			if (redeemed) {
				cm.model.redeemReward(model.id);
				cm.model.requestNearbyRewards();
			}
			win.close();
		});
		headerView.add(backButton);
		
		var mainView = Ti.UI.createView(cm.combine($$.stretch, {
			top:$$.headerView.height,
			backgroundImage:'images/Bgrnd_G-Y.png'
		}));
		
		var margin = ($$.platformHeight - $$.headerView.height - $$.cameraView.height - 350) / 2;
		Titanium.API.info("margin: "+margin);
		var bgView = Ti.UI.createView(cm.combine($$.stretch, {
			top: margin,
			bottom: margin,
			backgroundImage:'images/Bgrnd_Reward-Redeem.png'
		}));
		mainView.add(bgView);
		
		// draw for the bgView

		var rewardTitle = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#4BBEB4',
			font:{fontStyle:'normal',fontSize:20,fontWeight:'bold'},
			left:12,
			top:12,
			height:'auto',
			width:'auto',
			clickName:'rewardTitle',
			text:model.name  // TODO change
		}));
		bgView.add(rewardTitle);
		
		var expireTime = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#999999',
			font:{fontStyle:'italic',fontSize:14,fontWeight:'normal'},
			left:12,
			top:72,
			height:40,
			width:80,
			clickName:'expireTime',
			text:'Valid before '+ cm.formatDateShort(model.expire)
		}));
		bgView.add(expireTime);
		
		var cardmeleonIcon = Ti.UI.createView({
			backgroundImage:'images/Icon_Points-Symbol_12x17.png',
			top:40,
			left:12,
			width:12,
			height:17,
			clickName:'cardmeleonIcon'
		});
		bgView.add(cardmeleonIcon);
		
		var cardmeleonValue = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#8CC841',
			font:{fontStyle:'normal',fontSize:18,fontWeight:'normal'},
			left:30,
			top:38,
			height:'auto',
			width:'auto',
			clickName:'cardmeleonValue',
			text:model.eCardmeleon
		}));
		bgView.add(cardmeleonValue);
		
		var storeIcon = Ti.UI.createImageView({
			image:cm.getImageUrl(model.storeLogo),
			top:12,
			right:12,
			width:96,
			height:96,
			clickName:'storeIcon',
			zIndex: 3
		});
		bgView.add(storeIcon);
		
		var alertLabel = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#8CC841',
			font:{fontStyle:'normal',fontSize:14,fontWeight:'bold'},
			left:12,
			right:12,
			top:142,
			height:60,
			clickName:'alertLabel',
			text:'Alert! After clicking on the "Redeem" button below, the redeem code will be shown for 10 minutes',
			textAlign:'center'
		}));
		bgView.add(alertLabel);
		
		var button = Titanium.UI.createButton({
		   	backgroundImage:'images/Button_Redeem-Lg_OFF.png',
		   	backgroundSelectedImage:'images/Button_Redeem-Lg_ON.png',
			top:226,
			height:36,
			width:135
		});
		bgView.add(button);
		
		var redeemCode = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#0087A0',
			font:{fontStyle:'normal',fontSize:18,fontWeight:'normal'},
			bottom:56,
			height:'auto',
			width:'auto',
			visible:false,
			clickName:'redeemCode',
			text:model.redeemCode
		}));
		bgView.add(redeemCode);
		
		var timeLeft = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#999999',
			font:{fontStyle:'normal',fontSize:18,fontWeight:'normal'},
			bottom:20,
			height:'auto',
			width:'auto',
			visible:false,
			clickName:'timeLeft',
			text:'Time left: 10:00'
		}));
		bgView.add(timeLeft);
		
		button.addEventListener('click', function(){
			Titanium.API.info("You clicked the redeemButton");
			if (!redeemed) {
				redeemed = true;
				redeemCode.visible = true;
				timeLeft.visible = true;
				button.enabled = false;
				
				myInterval = setInterval(function() {
				    countdown--;
				    if (countdown <= 0) {
				    	clearInterval(myInterval);
				    	redeemCode.visible = false;
						timeLeft.visible = false;
				    }
				    timeLeft.text = 'Time left: ' + showCountdown(countdown);
				}, 1000 );
			}
		});
		
		// end of bgView
		
		var cameraView = cm.ui.createCameraView({
			bottom:0
		});
		
		win.add(headerView);
		win.add(mainView);
		win.add(cameraView);
		
		return win;
	};
	
})();
