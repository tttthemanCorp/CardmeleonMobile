/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function() {

	cm.ui.createFriendsReferWindow = function(_args) {
		var win = Ti.UI.createWindow(cm.combine($$.Window,{
			exitOnClose:true,
			orientationModes:[Ti.UI.PORTRAIT]
		}));
		
		var headerView = Ti.UI.createView(cm.combine($$.headerView,{top:0}));
		
		var subHeaderView = Ti.UI.createView(cm.combine($$.subHeaderView,{top: $$.headerView.height}));
		
		var referView = createReferView(cm.combine({
			top: $$.headerView.height + $$.subHeaderView.height,
			win: win
		}, $$.empty));
		
		win.add(headerView);
		win.add(subHeaderView);
		win.add(referView);
		
		return win;
	};
	
	function createReferView(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		

		//
		// SKIP REFER LINK
		//
		var skipLabel = Ti.UI.createLabel(cm.combine($$.Link, {
			text:'or Skip??',
			textAlign:'right',
			font:cm.combine($$.Label.font, {fontSize:14}),
			top:146,
			right:20
		}));
		view.add(skipLabel);

		//
		//  CREATE REFER BUTTON
		//
		var referButton = Titanium.UI.createButton(cm.combine($$.Button, {
			image:'images/Frame_Login_OFF.png',
			//backgroundImage:'images/Button_bg.png',
			//title:'Log in!',
			//borderRadius:8,
			bottom:0,
			left:0,
			right:0,
			height:36,
			width:'auto'
		}));
		view.add(referButton);	
  		
  		//
  		// Event Handling
  		//
  		referButton.addEventListener('click', function(){
  			_args.win.close();
  			Ti.App.fireEvent('app:friend.refer.done', {});
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
				Ti.App.fireEvent('app:user.refer.done', {});
			};
			client.onload = function()
			{
				result = JSON.parse(this.responseText);
				Ti.API.info('User ID: '+result.id);
				//alert("User logged in.  User ID = "+result.id);
				Ti.App.fireEvent('app:user.refer.done', {});
			};

			client.open('GET',cm.config.SERVICE_ENDPOINT+'api/auth');

			//cm.ui.alert(fieldvalues[0]+':'+fieldvalues[1]);
			client.setRequestHeader('Authorization','Basic '+Ti.Utils.base64encode(fieldvalues[0]+':'+fieldvalues[1]));
	
			client.send();
			*/
  		});
  		
  		skipLabel.addEventListener('click', function(){
  			//alert('New user clicked!');
  			_args.win.close();
  			Ti.App.fireEvent('app:friend.refer.done', {});
  		});
  		
		return view;
	};
})();