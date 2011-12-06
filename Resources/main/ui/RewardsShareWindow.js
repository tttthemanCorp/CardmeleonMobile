/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function(){

	cm.ui.createRewardsShareWindow = function(_args) {
		var model = _args.model;
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
			win.close();
		});
		headerView.add(backButton);
		
		var mainView = Ti.UI.createView(cm.combine($$.stretch, {
			top:$$.headerView.height,
			backgroundImage:'images/Bgrnd_G-Y.png'
		}));
		
		var msgLabel = Ti.UI.createLabel(cm.combine($$.Label, {
			text: 'Message',
			top: 32,
			left: 18
		}));
		mainView.add(msgLabel);
		
		var msgField = Titanium.UI.createTextArea(cm.combine($$.TextArea, {
			hintText:'enter message',
			top: 54,
			height: 108,
			left: 18,
			right: 18
		}));
		mainView.add(msgField);
		
		if (Ti.Platform.osname == 'android') {
			var facebookSwitch = Titanium.UI.createSwitch({
				top:198,
				left:120,
			    style:Titanium.UI.Android.SWITCH_STYLE_CHECKBOX,
			    title:'Facebook',
			    value:false
			});
			mainView.add(facebookSwitch);
			
			var twitterSwitch = Titanium.UI.createSwitch({
				top:232,
				left:120,
			    style:Titanium.UI.Android.SWITCH_STYLE_CHECKBOX,
			    title:'Twitter',
			    value:false
			});
			mainView.add(twitterSwitch);
		} else {
			var facebookSwitch = Titanium.UI.createSwitch({
				top:194,
				left:60,
			    value:false
			});
			mainView.add(facebookSwitch);

			var facebookLabel = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#FFFFFF',
				font:{fontStyle:'normal',fontSize:16,fontWeight:'bold'},
				text: 'Facebook',
				top: 198,
				left: 160
			}));
			mainView.add(facebookLabel);
			
			var twitterSwitch = Titanium.UI.createSwitch({
				top:228,
				left:60,
			    value:false
			});
			mainView.add(twitterSwitch);
			
			var twitterLabel = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#FFFFFF',
				font:{fontStyle:'normal',fontSize:16,fontWeight:'bold'},
				text: 'Twitter',
				top: 232,
				left: 160
			}));
			mainView.add(twitterLabel);
		}
		
		var sendButton = Titanium.UI.createButton({
		   	backgroundImage:'images/Button_Share_OFF.png',
		   	backgroundSelectedImage:'images/Button_Share_ON.png',
			top:284,
			width: 90,
			height: 24
		});
		mainView.add(sendButton);	
  		
  		sendButton.addEventListener('click', function(){
			Ti.API.log('sendButton clicked!');
			// TODO
			win.close();
  		});
		
		var cameraView = cm.ui.createCameraView({
			bottom:0
		});
		
		win.add(headerView);
		win.add(mainView);
		win.add(cameraView);
		
		return win;
	};
	
})();