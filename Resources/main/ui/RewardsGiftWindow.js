/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function(){

	cm.ui.createRewardsGiftWindow = function(_args) {
		var model = _args.model;
		var win = Ti.UI.createWindow(cm.combine($$.stretch, _args));

		var headerView = cm.ui.createHeaderView({noSettings:true});
		var backButton = Titanium.UI.createButton({
			backgroundSelectedImage:'/images/Button_Rewards-back_ON.png', 
			backgroundImage:'/images/Button_Rewards-back_OFF.png',
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
			backgroundImage:'/images/Bgrnd_G-Y.png'
		}));
		
		/*
		Ti.Contacts.showContacts({cancel: function() {
			
		}, selectedPerson: function() {
			
		}, animated: true);
		*/
		
		var contactLabel = Ti.UI.createLabel(cm.combine($$.Label, {
			text: 'Contact or Phone Number',
			color:'#FFFFFF',
			font:{fontStyle:'italic',fontSize:12,fontWeight:'normal'},
			top: 30,
			left: 20
		}));
		mainView.add(contactLabel);
		
		var contactButton = Titanium.UI.createButton({
		   	backgroundImage:'/images/Button_Contacts_OFF.png',
		   	backgroundSelectedImage:'/images/Button_Contacts_ON.png',
			top:22,
			width:90,
			height:24,
			right:20
		});
		mainView.add(contactButton);	
		
		var contactField = Titanium.UI.createTextField(cm.combine($$.TextField, {
			hintText:'select contact or enter phone#',
			top: 50,
			left: 20,
			right: 20
		}));
		mainView.add(contactField);

		var msgLabel = Ti.UI.createLabel(cm.combine($$.Label, {
			text: 'Your Message',
			color:'#FFFFFF',
			font:{fontStyle:'italic',fontSize:12,fontWeight:'normal'},
			top: 100,
			left: 20
		}));
		mainView.add(msgLabel);
				
		var msgField = Titanium.UI.createTextArea(cm.combine($$.TextArea, {
			hintText:'enter message',
			font:{fontStyle:'normal',fontSize:16,fontWeight:'normal'},
			top: 120,
			height: 140,
			left: 20,
			right: 20
		}));
		mainView.add(msgField);
		
		var sendButton = Titanium.UI.createButton({
		   	backgroundImage:'/images/Button_Gift_OFF.png',
		   	backgroundSelectedImage:'/images/Button_Gift_ON.png',
			top:290,
			width:90,
			height:24,
		});
		mainView.add(sendButton);	
  		
   		contactButton.addEventListener('click', function(){
			Ti.API.log('contactButton clicked!');
			Ti.Contacts.showContacts({
				cancel:function() {
				},
				selectedPerson:function(e) {  // selectedPerson
					var phoneStr = cm.getPhoneNumber(e.person.phone);
					if (phoneStr == null || phoneStr.length == 0) {
						cm.ui.alert("Warning", "Phone Number for this contact is not available");
					} else {
						contactField.value = phoneStr + " [" + e.person.fullName +"]";
					}
				},
				animated:true
			});
  		});
  		
		Ti.App.addEventListener('app:giftcode.available', function(e){
			Ti.API.log('app:giftcode.available event occurred!');
			
			var giftCode = e.giftCode, phoneNum = e.phoneNumber, gifterName = e.gifterName;
			// TODO send SMS message here
			
			win.close();
		});
  		
  		sendButton.addEventListener('click', function(){
			Ti.API.log('sendButton clicked!');
			
			var phoneNumber = contactField.value;
			var idx = phoneNumber.indexOf("[", 0);
			if (idx >= 0) {
				phoneNumber = phoneNumber.substring(0, idx);
			}
			phoneNumber = phoneNumber.replace("/^\s+|\s+$/g", "");
			Ti.API.log("phone number to send SMS is: "+phoneNumber);
			
			cm.model.giftReward(model.userrewardid, msgField.value, phoneNumber);
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