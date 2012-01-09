/**
 * @author Jun Lu
 */


(function() {

	cm.ui.createSettingsWindow = function(_args) {
		var win = Ti.UI.createWindow(cm.combine($$.Window,{
			exitOnClose:true,
			orientationModes:[Ti.UI.PORTRAIT]
		}));
		
		var scrollView = Titanium.UI.createScrollView(cm.combine($$.stretch, {
		    contentWidth:'auto',
		    contentHeight:'auto',
		    showVerticalScrollIndicator:false,
		    showHorizontalScrollIndicator:false
		}));
		
		var headerView = Ti.UI.createView(cm.combine($$.headerView,{top:0}));
		var logoutButton = Titanium.UI.createButton({
			backgroundImage:'images/Button_Logout_OFF.png',
			backgroundSelectedImage:'images/Button_Logout_ON.png',
			top:6,
			left:18,
			height:24,
			width:48,
			enabled:true
		});
		headerView.add(logoutButton);
		
		logoutButton.addEventListener('click', function(e) {
			Ti.API.info('logoutButton clicked!');
			// TODO
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
			backgroundImage:'images/Icon_No-Avatar.png',  // TODO - from data
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
			image: 'images/Icon_Level_01.png'
		});
		view.add(userlevelIcon);
		
		var referButton = Titanium.UI.createButton({
			backgroundImage:'images/Button_Refer_OFF.png',
			backgroundSelectedImage:'images/Button_Refer_ON.png',
			top:22,
			right:18,
			height:24,
			width:90,
			enabled:true
		});
		view.add(referButton);
		
		referButton.addEventListener('click', function(e) {
			Ti.API.info('referButton clicked!');
			// TODO
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
		   	backgroundImage:'images/Button_Sale_OFF.png',
		   	backgroundSelectedImage:'images/Button_Sale_ON.png',
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
			    	sw.backgroundImage = 'images/Button_Sale_OFF.png';
			    	model = false;
			    } else {
			    	sw.value = true;
			    	sw.backgroundImage = 'images/Button_Sale_ON.png';
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
			max:10,
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
			// TODO
		});
		
		var facebookIcon = Ti.UI.createView({
			backgroundImage:'images/Icon_Facebook_32.png',
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
			bottom:86,
			left:196,
			width:120,
			height:25
		});
		view.add(facebookLink);
		
		var twitterIcon = Ti.UI.createView({
			backgroundImage:'images/Icon_Twitter_32.png',
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
			bottom:36,
			left:196,
			width:120,
			height:25
		});
		view.add(twitterLink);
		
		var buttons = cm.ui.createTabbedBar({
			bottom: 0,
			left: 0,
			initBackgroundImage: "images/Frame_Base-Settings_OFF.png",
			tabs: [{ // submit
	            backgroundImage: 'images/Frame_Base-Settings_Submit.png',
	            handler: function() {
					Ti.API.info('submitButton clicked!');
					_args.win.close();
					// TODO
				}
	        }, { // cancel
	            backgroundImage: 'images/Frame_Base-Settings_Cancel.png',
	            handler: function() {
					Ti.API.info('cancelButton clicked!');
					_args.win.close();
					// TODO
				}
	        }]
	    });
		view.add(buttons);
		
		return view;
	};
	
})();