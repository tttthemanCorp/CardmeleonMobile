/**
 * @author sh: -c: line 0: `echo Lu, Jun' (2)
 */

(function() {
	cm.ui.createLoginWindow = function(_args) {
		var win = Ti.UI.createWindow(cm.combine($$.Window,{
			exitOnClose:false,
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
		var newuserLink = cm.ui.createLink(cm.combine($$.Link, {
			text:'New user?',
			textAlign:'right',
			font:cm.combine($$.Label.font, {fontSize:14}),
			top:126,
			right:20,
			width:72,
			height:18
		}));
		view.add(newuserLink);
		
		//
		// FORGOT PASSWORD LINK
		//
		var forgotpwdLink = cm.ui.createLink(cm.combine($$.Link, {
			text:'Forgot password?',
			textAlign:'right',
			font:cm.combine($$.Link.font, {fontSize:14}),
			top:246,
			right:20,
			width:120,
			height:18
		}));
		view.add(forgotpwdLink);
		
		//
		//  CREATE LOGIN BUTTON
		//
		var loginButton = Titanium.UI.createButton({
			backgroundImage:'/images/Button_Login_OFF.png',
			backgroundSelectedImage:'/images/Button_Login_ON.png',
			//backgroundImage:'/images/Button_bg.png',
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
  			var token = Ti.Utils.base64encode(fieldvalues[0]+':'+fieldvalues[1]);
			cm.restcallWithToken('GET', 'auth', null, token,
				function(e, client)
				{
					Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
					if (client.status == 401) {
						alert('Wrong Username or Password!');
					} else {
						alert("Server connection failure!");
					}
					Ti.App.fireEvent('app:user.login.failed', {});
				},
				function(client)
				{
					result = JSON.parse(client.responseText);
					Ti.API.info('User ID: '+result.id);
					//alert("User logged in.  User ID = "+result.id);
					cm.login(token, result.id, fieldvalues[0]);
					
		 			if (Ti.Platform.osname == 'android') {
						_args.win.close({animated:true});
					} else {
						_args.win.close({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
					}
					
					Ti.App.fireEvent('app:user.login.succeed', {data:result});
				}
			);
  		});
  		
  		newuserLink.addEventListener('click', function(){
 			if (Ti.Platform.osname == 'android') {
				_args.win.close({animated:true});
			} else {
				_args.win.close({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
			}
  			Ti.App.fireEvent('app:user.login.new', {});
  		});
  		
  		forgotpwdLink.addEventListener('click', function(){
  			alert('Forgot password clicked!');
  		});
  		
  		return view;
  		
	};
})();