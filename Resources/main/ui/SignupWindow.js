/**
 * @author Jun Lu
 */

(function() {
	cm.ui.createSignupWindow = function(_args) {
		var win = Ti.UI.createWindow(cm.combine($$.Window,{
			exitOnClose:true,
			orientationModes:[Ti.UI.PORTRAIT]
		}));
		
		var headerView = Ti.UI.createView(cm.combine($$.headerView,{top:0}));
		
		//var subHeaderView = Ti.UI.createView(cm.combine($$.subHeaderView,{top: $$.headerView.height}));
		
		var signupView = createSignupView(cm.combine({
			top: $$.headerView.height + $$.subHeaderView.height,
			win: win
		}, $$.empty));
		
		win.add(headerView);
		//win.add(subHeaderView);
		win.add(signupView);
		
		return win;
	}; 
	
	function createSignupView(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		
		var fieldvalues = ['', ''];
		var labelinputs = cm.ui.createLabelInputView(
			{label: {x_offset: 0, y_offset: -24, texts: ['Username', 'Phone', 'Password', 'Password Confirmation']}, 
			 input: {top_start: 0, left: 20, right: 20, spacing: 40}},
			fieldvalues
		);
		view.add(labelinputs);
		
		//
		// REFER BY LABEL
		//
		var referbyLabel = Ti.UI.createLabel(cm.combine($$.Label, {
			text:'Referred By : <user>',  // TODO - add real user or phone
			font:cm.combine($$.Link.font, {fontSize:14}),
			top:280,
			left:20
		}));
		view.add(referbyLabel);
  		
 		//
		//  CREATE SIGNUP BUTTON
		//
		var signupButton = Titanium.UI.createButton({
			backgroundImage:'images/Button_signup_OFF.png',
			backgroundSelectedImage:'images/Button_signup_ON.png',
			//backgroundImage:'images/Button_bg.png',
			//title:'Log in!',
			//borderRadius:8,
			bottom:45,
			height:25,
			width:90
		});
		view.add(signupButton);	
  		
		var loginLink = Ti.UI.createLabel(cm.combine($$.Link, {
			text:'Existing User Login',
			textAlign:'center',
			font:cm.combine($$.Label.font, {fontSize:14}),
			bottom:16
		}));
		view.add(loginLink);
  		
  		//
  		// Event Handling
  		//
  		signupButton.addEventListener('click', function(){
  			_args.win.close({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
  			Ti.App.fireEvent('app:user.signup.succeed', {});
  			/*
			var client = Titanium.Network.createHTTPClient();
			client.onerror = function(e)
			{
				Ti.API.error(e.error + "\nResponse: " + this.responseText);
				if (this.status == 401) {
					alert('Wrong Username or Password!');
				} else {
					alert("Server connection failure!");
				}
				Ti.App.fireEvent('app:user.signup.failed', {data:result});
			};
			client.onload = function()
			{
				result = JSON.parse(this.responseText);
				Ti.API.info('User ID: '+result.id);
				//alert("User logged in.  User ID = "+result.id);
				Ti.App.fireEvent('app:user.signup.succeed', {data:result});
			};

			client.open('GET',cm.config.SERVICE_ENDPOINT+'api/auth');

			//cm.ui.alert(fieldvalues[0]+':'+fieldvalues[1]);
			client.setRequestHeader('Authorization','Basic '+Ti.Utils.base64encode(fieldvalues[0]+':'+fieldvalues[1]));
	
			client.send();
			*/
  		});
  		
  		loginLink.addEventListener('click', function(){
			//cm.ui.alert("Existing User Login button clicked");
			_args.win.close({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
			Ti.App.fireEvent('app:user.signup.existing', {});
  		});
  		
		return view;
	};
})();