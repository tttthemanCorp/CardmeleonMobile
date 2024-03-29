/**
 * @author Jun Lu
 */


(function() {

	cm.ui.createSettingsWindow = function(_args) {
		var win = Ti.UI.createWindow(cm.combine($$.Window,{
			//exitOnClose:false,
			//orientationModes:[Ti.UI.PORTRAIT],
			//modal: true
		}));
		
		var scrollView = Titanium.UI.createScrollView(cm.combine($$.stretch, {
		    contentWidth:'auto',
		    contentHeight:'auto',
		    showVerticalScrollIndicator:false,
		    showHorizontalScrollIndicator:false
		}));
		
		var headerView = Ti.UI.createView(cm.combine($$.headerView,{top:0}));
		var logoutButton = Titanium.UI.createButton({
			backgroundImage:'/images/Button_Logout_OFF.png',
			backgroundSelectedImage:'/images/Button_Logout_ON.png',
			top:6,
			left:18,
			height:24,
			width:48,
			enabled:true
		});
		headerView.add(logoutButton);
		
		logoutButton.addEventListener('click', function(e) {
			Ti.API.info('logoutButton clicked!');
			cm.logout();
			win.close({animated:true});
			cm.app.mainWindow.close();
			Ti.App.fireEvent('app:user.signup.existing', {});
		});
		
		var settingsView = createSettingsView(cm.combine({
			top: $$.headerView.height,
			win: win
		}, $$.empty));
		
		scrollView.add(headerView);
		scrollView.add(settingsView);
		
		win.add(scrollView);
		
		return win;
	};
	
	function createSettingsView(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		
		var avatarIcon = Ti.UI.createView({
			backgroundImage:'/images/Icon_No-Avatar.png',  // TODO - from data
			top:10,
			left:18,
			width:48,
			height:48,
			clickName:'avatarIcon',
			zIndex: 1
		});
		view.add(avatarIcon);
		
		var userlevelIcon = Ti.UI.createImageView({
			top: 21,
			left: 74,
			width: 30,
			height: 26,
			zIndex: 1,
			image: '/images/Icon_Level_01.png'
		});
		view.add(userlevelIcon);
		
		var referButton = Ti.UI.createButton({
			backgroundImage:'/images/Button_Refer_OFF.png',
			backgroundSelectedImage:'/images/Button_Refer_ON.png',
			top:22,
			right:18,
			height:24,
			width:90,
			zIndex: 1
		});
		view.add(referButton);
		
		referButton.addEventListener('click', function(e) {
			Ti.API.info('referButton clicked!');
			var refwin = cm.ui.createFriendsReferWindow({
				exitOnClose:false,
				orientationModes:[Ti.UI.PORTRAIT],
				modal: true,
				eventFire:false
			});
			refwin.open({animated:true});
			//if (Ti.Platform.osname == 'android') {
			//	refwin.open({animated:true});
			//} else {
			//	refwin.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
			//}
		});
		
		var earnPoints = Ti.UI.createLabel(cm.combine($$.Label, {
			text:'+ 10 points',
			color:"#0087A0",
			font:{fontStyle:'italic',fontSize:12,fontWeight:'normal'},
			top:46,
			right:20,
			width:"auto"
		}));
		view.add(earnPoints);
		
		var fieldvalues = ['', '', '', '', ''];
		var labelinputs = cm.ui.createLabelInputView(
			{label: {x_offset: -84, y_offset: 0, texts: ['Username', 'Password', 'New Password', 'Confirm', 'Phone'], 
					 width:84, height:36, textAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER, wordWrap:true}, 
			 input: {top_start: 70, left: 102, right: 18, spacing: 10}},
			fieldvalues
		);
		view.add(labelinputs);
		
		var notificationLabel = Ti.UI.createLabel(cm.combine($$.Label, {
			text:'Deal notification',
			color:"#FFFFFF",
			font:{fontStyle:'normal',fontSize:12,fontWeight:'bold'},
			bottom:106,
			left:18,
			width:"auto"
		}));
		view.add(notificationLabel);
		
		var notification = false;
		var notificationSwitch = Titanium.UI.createButton({
		   	backgroundImage:'/images/Button_Sale_OFF.png',
		   	backgroundSelectedImage:'/images/Button_Sale_ON.png',
			bottom:86,
			left:46,
			height:18,
			width:36,
			value:false
		});
		notificationSwitch.addEventListener('click',function(model, sw){
			return function(e)
			{
			    Titanium.API.info('notificationSwitch value = ' + e.value + ' act val ' + sw.value);
			    if (sw.value) {
			    	sw.value = false;
			    	sw.backgroundImage = '/images/Button_Sale_OFF.png';
			    	model = false;
			    } else {
			    	sw.value = true;
			    	sw.backgroundImage = '/images/Button_Sale_ON.png';
			    	model = true;
			    }
			}
		}(notification, notificationSwitch));
		view.add(notificationSwitch);
		
		var NearbyLabel = Ti.UI.createLabel(cm.combine($$.Label, {
			text:'Nearby: 5 miles',
			color:"#FFFFFF",
			font:{fontStyle:'normal',fontSize:12,fontWeight:'bold'},
			bottom:60,
			left:18,
			width:"auto"
		}));
		view.add(NearbyLabel);
		
		var NearbySlider = Titanium.UI.createSlider({
			min:1,
			max:50,
			value:5,
			width:100,
			height:'auto',
			bottom:36,
			left:18
		});
		view.add(NearbySlider);
		
		NearbySlider.addEventListener('change',function(e)
		{
			Ti.API.info('NearbySlider changed!');
			var nearby = Math.floor(e.value);
			if (nearby === 1) NearbyLabel.text = 'Nearby: 1 mile';
			else NearbyLabel.text = 'Nearby: '+nearby+' miles';
		});
		
		
		// facebook integration
		Ti.Facebook.appid = '324054270972428';
		Ti.Facebook.permissions = ['publish_stream'];
		Ti.Facebook.addEventListener('login', function(e) {
		    if (e.success) {
		        alert('Facebook Logged in');	        
		    }
		});
		Ti.Facebook.addEventListener('logout', function(e) {
		    alert('Facebook Logged out');
		});
		 
		// add the button.  Note that it doesn't need a click event or anything.
		view.add(Ti.Facebook.createLoginButton({ bottom:86, left:160 }));
		/*
		var facebookIcon = Ti.UI.createView({
			backgroundImage:'/images/Icon_Facebook_32.png',
			bottom:86,
			left:160,
			width:32,
			height:32
		});
		view.add(facebookIcon);
		
		var facebookLink = cm.ui.createLink({
			text:'Facebook account',
			color:"#FFFFFF",
			font:{fontStyle:'normal',fontSize:12,fontWeight:'bold'},
			bottom:91,
			left:196,
			width:110,
			height:20
		});
		view.add(facebookLink);
		
		facebookLink.addEventListener('change',function(e)
		{
			Ti.API.info('facebookLink clicked!');
		});
		*/
		
		var twitterIcon = Ti.UI.createView({
			backgroundImage:'/images/Icon_Twitter_32.png',
			bottom:36,
			left:160,
			width:32,
			height:32
		});
		view.add(twitterIcon);
		
		var twitterLink = cm.ui.createLink({
			text:'Twitter account',
			color:"#FFFFFF",
			font:{fontStyle:'normal',fontSize:12,fontWeight:'bold'},
			bottom:41,
			left:196,
			width:95,
			height:20
		});
		view.add(twitterLink);
		
		twitterLink.addEventListener('change',function(e)
		{
			Ti.API.info('twitterLink clicked!');
			// TODO
		});
		
		var buttons = cm.ui.createTabbedBar({
			bottom: 0,
			left: 0,
			initBackgroundImage: "/images/Frame_Base-Settings_OFF.png",
			tabs: [{ // submit
	            backgroundImage: '/images/Frame_Base-Settings_Submit.png',
	            handler: function() {
					Ti.API.info('submitButton clicked!');
					//_args.win.close();
					if (Ti.Platform.osname == 'android') {
						_args.win.close({animated:true});
					} else {
						_args.win.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
					}
					// TODO
				}
	        }, { // cancel
	            backgroundImage: '/images/Frame_Base-Settings_Cancel.png',
	            handler: function() {
					Ti.API.info('cancelButton clicked!');
					//_args.win.close();
					if (Ti.Platform.osname == 'android') {
						_args.win.close({animated:true});
					} else {
						_args.win.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
					}
					// TODO
				}
	        }]
	    });
		view.add(buttons);
		
		return view;
	};
	
})();