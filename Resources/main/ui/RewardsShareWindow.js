/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function(){

	cm.ui.createRewardsShareWindow = function(_args) {
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
		
		var mainView = Ti.UI.createView(cm.combine($$.stretch, {
			top:$$.headerView.height,
			backgroundImage:_args.backgroundImage
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
			right: 18,
			value:'I like this reward on Cardmeleon mobile app: '+model.name+'! Check it out!'
		}));
		mainView.add(msgField);
		
		var facebookIcon = Ti.UI.createView({
			backgroundImage:'/images/Icon_Facebook_32.png',
			top:194,
			left:60,
			width:32,
			height:32
		});
		mainView.add(facebookIcon);
			
		if (Ti.Platform.osname == 'android') {
			var facebookSwitch = Titanium.UI.createSwitch({
				top:194,
				left:100,
			    style:Titanium.UI.Android.SWITCH_STYLE_CHECKBOX,
			    title:'',
			    value:true
			});
			mainView.add(facebookSwitch);
		} else {
			var facebookSwitch = cm.ui.createCheckbox({
				top:194,
				left:100,
				model:{checked:true}
			});
			mainView.add(facebookSwitch);
		}
		
		var twitterIcon = Titanium.UI.createView({
			backgroundImage:'/images/Icon_Twitter_32.png',
			top:194,
			left:180,
		    width:32,
		    height:32
		});
		mainView.add(twitterIcon);
		
		if (Ti.Platform.osname == 'android') {
			var twitterSwitch = Titanium.UI.createSwitch({
				top:194,
				left:220,
			    style:Titanium.UI.Android.SWITCH_STYLE_CHECKBOX,
			    title:'',
			    value:true
			});
			mainView.add(twitterSwitch);
		} else {
			var twitterSwitch = cm.ui.createCheckbox({
				top:194,
				left:220,
				model:{checked:true}
			});
			mainView.add(twitterSwitch);
		}

		var sendButton = Titanium.UI.createButton({
		   	backgroundImage:'/images/Button_Share_OFF.png',
		   	backgroundSelectedImage:'/images/Button_Share_ON.png',
			top:264,
			width: 90,
			height: 24
		});
		mainView.add(sendButton);	
  		
  		sendButton.addEventListener('click', function(){
			Ti.API.log('sendButton clicked!');

			if (facebookSwitch.value == true) {  // facebook integration
				if (Ti.Facebook.loggedIn == false) {
					Ti.Facebook.appid = '324054270972428';
					Ti.Facebook.permissions = ['publish_stream'];
					Ti.Facebook.authorize();
					
					Ti.Facebook.addEventListener('login', function(e) {
					    cm.model.postToFacebook(msgField.value);
					});
				} else {
					cm.model.postToFacebook(msgField.value);
				}
			}

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