/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function() {

	cm.ui.createTxnReviewWindow = function(_args) {
		var win = Ti.UI.createWindow(cm.combine($$.Window,{
			exitOnClose:true,
			orientationModes:[Ti.UI.PORTRAIT]
		}));
		
		var headerView = Ti.UI.createView(cm.combine($$.headerView,{top:0}));
		
		//var subHeaderView = Ti.UI.createView(cm.combine($$.subHeaderView,{top: $$.headerView.height}));
		
		var reviewView = createTxnReviewView(cm.combine($$.stretch, {
			top: $$.headerView.height, // + $$.subHeaderView.height,
			win: win
		}));
		
		win.add(headerView);
		//win.add(subHeaderView);
		win.add(reviewView);
		
		return win;
	};
	
	function createTxnReviewView(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		
		var reviewSummaryView = Ti.UI.createView({
			backgroundImage:'images/Bgrnd_Store-Review.png',
			top:0,
			left:0,
			width:$$.platformWidth,
			height:48,
			clickName:'reviewSummaryView'
		});
		
		reviewSummaryView.add(cm.ui.createReviewStars({
			top:12,
			left:6,
			height:18,
			width:102,
			model:model
		}));
		
		var numReviews = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#999999',
			font:{fontStyle:'normal',fontSize:12,fontWeight:'normal'},
			right:12,
			top:12,
			height:'auto',
			width:'auto',
			clickName:'numReviews',
			text:model.numReviews + " reviews: " + model.rating + " / 5.0"
		}));
		reviewSummaryView.add(numReviews);
		
		view.add(reviewSummaryView);
		
		var textArea = Ti.UI.createTextArea({
			top: 18,
			left: 18,
			right: 18,
			bottom: 86
		});
		view.add(textArea);

		//
		// SKIP REFER LINK
		//
		var skipLabel = Ti.UI.createLabel(cm.combine($$.Link, {
			text:'or Skip It??',
			textAlign:'center',
			font:cm.combine($$.Label.font, {fontSize:14}),
			bottom:18
		}));
		view.add(skipLabel);

		//
		//  CREATE OK BUTTON
		//
		var okButton = Titanium.UI.createButton({
			backgroundImage:'images/Button_OK_OFF.png',
			backgroundSelectedImage:'images/Button_OK_ON.png',
			bottom:44,
			height:24,
			width:90
		});
		view.add(okButton);	
  		
  		//
  		// Event Handling
  		//
  		okButton.addEventListener('click', function(){
  			_args.win.close({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
  			Ti.App.fireEvent('app:txn.review.done', {});
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
  			Ti.App.fireEvent('app:txn.review.done', {});
  		});
  		
		return view;
	};
})();