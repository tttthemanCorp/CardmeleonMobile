/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function() {

	cm.ui.createTxnReviewWindow = function(_args) {
		var model = _args.model;
		var win = Ti.UI.createWindow(cm.combine($$.stretch, _args));
		
		var headerView = Ti.UI.createView(cm.combine($$.headerView,{top:0}));
		
		//var subHeaderView = Ti.UI.createView(cm.combine($$.subHeaderView,{top: $$.headerView.height}));
		
		var reviewView = createTxnReviewView(cm.combine($$.stretch, {
			top: $$.headerView.height, // + $$.subHeaderView.height,
			backgroundImage:'/images/Bgrnd_G-B.png',
			win: win,
			model:model
		}));
		
		win.add(headerView);
		//win.add(subHeaderView);
		win.add(reviewView);
		
		return win;
	};
	
	function createTxnReviewView(_args) {
		var model = _args.model;
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		
		var reviewSummaryView = Ti.UI.createView({
			backgroundImage:'/images/Bgrnd_Store-Review.png',
			top:0,
			left:0,
			width:$$.platformWidth,
			height:48,
			clickName:'reviewSummaryView'
		});
		
		var storeName = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#000000',
			font:{fontStyle:'normal',fontSize:16,fontWeight:'normal'},
			left:12,
			top:12,
			height:'auto',
			width:'auto',
			clickName:'storeName',
			text:model.storeName
		}));
		reviewSummaryView.add(storeName);
		
		var numReviews = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#999999',
			font:{fontStyle:'normal',fontSize:16,fontWeight:'normal'},
			right:12,
			top:12,
			height:'auto',
			width:'auto',
			clickName:'numReviews',
			text:model.numReviews + " reviews: " + model.rating + " / 5"
		}));
		reviewSummaryView.add(numReviews);
		
		view.add(reviewSummaryView);
		
		var label = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#000000',
			font:{fontStyle:'normal',fontSize:16,fontWeight:'normal'},
			left:18,
			top:66,
			height:'auto',
			width:'auto',
			text:"Your rating and review for "+model.storeName+":"
		}));
		view.add(label);
		
		var stars = cm.ui.createTouchableReviewStars({
			top:100,
			left:18,
			height:18,
			width:110,
			model:{rating:2.5}
		});
		view.add(stars);
		
		var reviewMsg = Titanium.UI.createTextArea(cm.combine($$.TextArea, {
			font:{fontStyle:'normal',fontSize:16,fontWeight:'normal'},
			top: 140,
			left: 18,
			right: 18,
			bottom: 86
		}));
		view.add(reviewMsg);

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
			backgroundImage:'/images/Button_OK_OFF.png',
			backgroundSelectedImage:'/images/Button_OK_ON.png',
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
  			cm.model.submitReview(model.id, reviewMsg.value, stars.rating);
  			Ti.App.fireEvent('app:txn.review.done', {});
  		});
  		
  		skipLabel.addEventListener('click', function(){
  			_args.win.close({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
  		});
  		
		return view;
	};
})();