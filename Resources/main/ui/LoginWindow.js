/**
 * @author sh: -c: line 0: `echo Lu, Jun' (2)
 */

(function() {
	cm.ui.createLoginWindow = function(_args) {
		var win = Ti.UI.createWindow(cm.combine($$.Window,{
			exitOnClose:true,
			orientationModes:[Ti.UI.PORTRAIT]
		}));
		
		var headerView = Ti.UI.createView(cm.combine($$.headerView,{top:0}));
		
		//var subHeaderView = Ti.UI.createView(cm.combine($$.subHeaderView,{top: $$.headerView.height}));
		
		var loginView = createLoginView(cm.combine({
			top: $$.headerView.height + $$.subHeaderView.height,
			win: win
		}, $$.empty));
		
		win.add(headerView);
		//win.add(subHeaderView);
		win.add(loginView);
		
		return win;
	};
	
	function createLoginView(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		
		var fieldvalues = ['', ''];
		var labelinputs = cm.ui.createLabelInputView(
			{label: {x_offset: 0, y_offset: -24, texts: ['Username or Phone', 'Password']}, 
			 input: {top_start: 72, left: 20, right: 20, spacing: 84}},
			fieldvalues
		);
		view.add(labelinputs);

		//
		// NEW USER LINK
		//
		var newuserLabel = Ti.UI.createLabel(cm.combine($$.Link, {
			text:'New user?',
			textAlign:'right',
			font:cm.combine($$.Label.font, {fontSize:14}),
			top:126,
			right:20
		}));
		view.add(newuserLabel);
		
		//
		// FORGOT PASSWORD LINK
		//
		var forgotpwdLabel = Ti.UI.createLabel(cm.combine($$.Link, {
			text:'Forgot password?',
			textAlign:'right',
			font:cm.combine($$.Link.font, {fontSize:14}),
			top:246,
			right:20
		}));
		view.add(forgotpwdLabel);
		
		/{}/
		//  CREATE LOGIN BUTTON
		//
		var loginButton = Titanium.UI.createButton({
			backgroundImage:'images/Button_Login_OFF.png',
			backgroundSelectedImage:'images/Button_Login_ON.png',
			//backgroundImage:'images/Button_bg.png',
			//title:'Log in!',
			//borderRadius:8,
			bottom:55,
			height:24,
			width:90
		});
		view.add(loginButton);	
  		
  		//
  		// Event Handling
  		//
  		loginButton.addEventListener('click', function(){
  			_args.win.close({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
  			Ti.App.fireEvent('app:user.login.succeed', {});
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
				Ti.App.fireEvent('app:user.login.failed', {});
			};
			client.onload = function()
			{
				result = JSON.parse(this.responseText);
				Ti.API.info('User ID: '+result.id);
				//alert("User logged in.  User ID = "+result.id);
				Ti.App.fireEvent('app:user.login.succeed', {data:result});
			};

			client.open('GET',cm.config.SERVICE_ENDPOINT+'api/auth');

			//cm.ui.alert(fieldvalues[0]+':'+fieldvalues[1]);
			client.setRequestHeader('Authorization','Basic '+Ti.Utils.base64encode(fieldvalues[0]+':'+fieldvalues[1]));
	
			client.send();
			*/
  		});
  		
  		newuserLabel.addEventListener('click', function(){
  			//alert('New user clicked!');
  			_args.win.close({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
  			Ti.App.fireEvent('app:user.login.new', {});
  		});
  		
  		forgotpwdLabel.addEventListener('click', function(){
  			alert('Forgot password clicked!');
  		});
  		
  		return view;
  		
/*
		// constants
		var TOP_MARGIN = 72, LABEL_HEIGHT=14, LABEL_FIELD_MARGIN=6, FIELD_LABEL_MARGIN=14;
		var FIELD_HEIGHT=36, HORIZON_MARGIN=20, TWO_FIELD_MARGIN=60;
		var FIELD_BUTTON_MARGIN=60, BUTTON_HEIGHT=36;

		//
		//  CREATE USERNAME
		//
		var currentPosition = TOP_MARGIN;
		var usernameLabel = Ti.UI.createLabel(cm.combine($$.Label, {
			text:'Username or Phone',
			top:currentPosition,
			left:HORIZON_MARGIN,
			right:HORIZON_MARGIN,
		}));
		view.add(usernameLabel);
		
		currentPosition += LABEL_HEIGHT + LABEL_FIELD_MARGIN;
		var usernameField = Titanium.UI.createTextField(cm.combine($$.TextField, {
			hintText:'enter username or phone#',
			top:currentPosition,
			left:HORIZON_MARGIN,
			right:HORIZON_MARGIN,
		}));
		view.add(usernameField);
		
		//
		// NEW USER LINK
		//
		var newuserLabel = Ti.UI.createLabel(cm.combine($$.Label, {
			text:'New user?',
			textAlign:'right',
			font:cm.combine($$.Label.font, {fontSize:14}),
			top:currentPosition + FIELD_HEIGHT + FIELD_LABEL_MARGIN,
			left:HORIZON_MARGIN,
			right:HORIZON_MARGIN,
			touchEnabled:true,
		}));
		view.add(newuserLabel);
  		
		//
		//  CREATE PASSWORD
		//
		currentPosition += FIELD_HEIGHT + TWO_FIELD_MARGIN;
  		var pwdLabel = Ti.UI.createLabel(cm.combine($$.Label, {
			text:'Password',
			top:currentPosition,
			left:HORIZON_MARGIN,
			right:HORIZON_MARGIN,
		}));
		view.add(pwdLabel);
				
		currentPosition += LABEL_HEIGHT + LABEL_FIELD_MARGIN;
		var pwdField = Titanium.UI.createTextField(cm.combine($$.TextField, {
			hintText:'enter password',
			top:currentPosition,
			left:HORIZON_MARGIN,
			right:HORIZON_MARGIN,
		}));
		view.add(pwdField);

		
		//
		// FORGOT PASSWORD LINK
		//
		var forgotpwdLabel = Ti.UI.createLabel(cm.combine($$.Label, {
			text:'Forgot password?',
			textAlign:'right',
			font:cm.combine($$.Label.font, {fontSize:14}),
			top:currentPosition + FIELD_HEIGHT + FIELD_LABEL_MARGIN,
			left:HORIZON_MARGIN,
			right:HORIZON_MARGIN,
			touchEnabled:true,
		}));
		view.add(forgotpwdLabel);
		
		//
		//  CREATE LOGIN BUTTON
		//
		currentPosition += FIELD_HEIGHT + FIELD_BUTTON_MARGIN;
		var loginButton = Titanium.UI.createButton(cm.combine($$.Button, {
			image:'images/Frame_Login_OFF.png',
			//backgroundImage:'images/Button_bg.png',
			//title:'Log in!',
			borderRadius:8,
			bottom:0,
			left:HORIZON_MARGIN,
			right:HORIZON_MARGIN,
			height:BUTTON_HEIGHT,
			width:'auto'
		}));
		view.add(loginButton);	
  		
  		//
  		// Event Handling
  		//
  		loginButton.addEventListener('click', function(){
			var client = Titanium.Network.createHTTPClient();
			client.onerror = function(e)
			{
				Ti.API.error(e.error + "\nResponse: " + this.responseText);
				if (this.status == 401) {
					alert('Wrong Username or Password!');
				} else {
					alert("Server connection failure!");
				}
			};
			client.onload = function()
			{
				result = JSON.parse(this.responseText);
				Ti.API.info('User ID: '+result.id);
				alert("User logged in.  User ID = "+result.id);
			};

			client.open('GET',cm.config.SERVICE_ENDPOINT+'api/auth');

			client.setRequestHeader('Authorization','Basic '+Ti.Utils.base64encode(usernameField.value+':'+pwdField.value));
	
			client.send();
  		});
  		
  		newuserLabel.addEventListener('click', function(){
  			alert('New user clicked!');
  		});
  		
  		forgotpwdLabel.addEventListener('click', function(){
  			alert('Forgot password clicked!');
  		});
*/
	};
})();