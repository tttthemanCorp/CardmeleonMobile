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
		
		//var subHeaderView = Ti.UI.createView(cm.combine($$.subHeaderView,{top: $$.headerView.height}));
		
		var referView = createReferView(cm.combine($$.stretch, {
			top: $$.headerView.height, // + $$.subHeaderView.height,
			win: win
		}));
		
		win.add(headerView);
		//win.add(subHeaderView);
		win.add(referView);
		
		return win;
	};
	
	function createReferView(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		
		var tableView = Ti.UI.createTableView({
			top: 18,
			left: 18,
			right: 18,
			bottom: 86
		});
		view.add(tableView);

		//
		// SKIP REFER LINK
		//
		var skipLabel = Ti.UI.createLabel(cm.combine($$.Link, {
			text:'or Skip??',
			textAlign:'center',
			font:cm.combine($$.Label.font, {fontSize:14}),
			bottom:18
		}));
		view.add(skipLabel);

		//
		//  CREATE REFER BUTTON
		//
		var referButton = Titanium.UI.createButton({
			backgroundImage:'images/Button_Refer_OFF.png',
			backgroundSelectedImage:'images/Button_Refer_ON.png',
			bottom:44,
			height:24,
			width:90
		});
		view.add(referButton);	
  		
  		//
  		// Event Handling
  		//
  		referButton.addEventListener('click', function(){
  			_args.win.close({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
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
  			_args.win.close({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
  			Ti.App.fireEvent('app:friend.refer.done', {});
  		});
  		
		return view;
	};
})();