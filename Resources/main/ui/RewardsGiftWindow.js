/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function(){

	cm.ui.createRewardsGiftWindow = function(_args) {
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
		
		/*
		Ti.Contacts.showContacts({cancel: function() {
			
		}, selectedPerson: function() {
			
		}, animated: true);
		*/
		
		var memberLabel = Ti.UI.createLabel(cm.combine($$.Label, {
			text: 'Cardmeleon Member ID',
			top: 60,
			left: 20
		}));
		mainView.add(memberLabel);
		
		var memberField = Titanium.UI.createTextField(cm.combine($$.TextField, {
			hintText:'enter Cardmeleon member ID',
			top: 86,
			left: 20,
			right: 20
		}));
		mainView.add(memberField);
		
		var sendButton = Titanium.UI.createButton({
		   	backgroundImage:'images/Button_Gift_OFF.png',
		   	backgroundSelectedImage:'images/Button_Gift_ON.png',
			top:140,
			width:90,
			height:24,
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