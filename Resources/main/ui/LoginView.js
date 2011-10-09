/**
 * @author sh: -c: line 0: `echo Lu, Jun' (2)
 */

(function() {
	//create the login view
	cm.ui.createLoginView = function(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));

		// constants
		var TOP_MARGIN = 50, LABEL_HEIGHT=14, LABEL_FIELD_MARGIN=7;
		var FIELD_HEIGHT=33, HORIZON_MARGIN=26, TWO_FIELD_MARGIN=30;
		var FIELD_BUTTON_MARGIN=60, BUTTON_HEIGHT=33;

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
			font:cm.combine($$.Label.font, {fontSize:12}),
			top:currentPosition + FIELD_HEIGHT + LABEL_FIELD_MARGIN - 2,
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
			font:cm.combine($$.Label.font, {fontSize:12}),
			top:currentPosition + FIELD_HEIGHT + LABEL_FIELD_MARGIN - 2,
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
			image:'images/Button_Login.png',
			//backgroundImage:'images/Button_bg.png',
			//title:'Log in!',
			borderRadius:8,
			top:currentPosition,
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
  			alert('login button clicked!');
  		});
  		
  		newuserLabel.addEventListener('click', function(){
  			alert('New user clicked!');
  		});
  		
  		forgotpwdLabel.addEventListener('click', function(){
  			alert('Forgot password clicked!');
  		});


		return view;
	};
})();