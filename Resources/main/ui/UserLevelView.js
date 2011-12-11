/**
 * @author Jun Lu
 */

(function() {

	cm.ui.createUserLevelView = function(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		var spacing = 160;
		
		var contentView = Ti.UI.createScrollView(cm.combine($$.stretch, {
			scrollType: "vertical",
			//borderWidth:2,
			//borderColor:'#006cb1',
			//backgroundColor:"yellow",
			showVerticalScrollIndicator:true,
			zoomScale:1.5,
			contentHeight:200,
			bottom: 40
		}));

		// level 1
		var levelTitle = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#4BBEB4',
			font:{fontStyle:'normal',fontSize:18,fontWeight:'bold'},
			left:12,
			top:12,
			height:'auto',
			width:'auto',
			clickName:'levelTitle',
			text:"Level 1"
		}));
		contentView.add(levelTitle);
		
		var cardmeleonIcon = Ti.UI.createView({
			backgroundImage:'images/Icon_Points-Symbol_12x17.png',
			top:38,
			left:12,
			width:12,
			height:17,
			clickName:'cardmeleonIcon'
		});
		contentView.add(cardmeleonIcon);
		
		var cardmeleonValue = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#8CC841',
			font:{fontStyle:'normal',fontSize:12,fontWeight:'bold'},
			left:30,
			top:38,
			height:'auto',
			width:'auto',
			clickName:'cardmeleonValue',
			text:"10 for each review"
		}));
		contentView.add(cardmeleonValue);
		
		var cardmeleonIcon2 = Ti.UI.createView({
			backgroundImage:'images/Icon_Points-Symbol_12x17.png',
			top:63,
			left:12,
			width:12,
			height:17,
			clickName:'cardmeleonIcon2'
		});
		contentView.add(cardmeleonIcon2);
		
		var cardmeleonValue2 = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#8CC841',
			font:{fontStyle:'normal',fontSize:12,fontWeight:'bold'},
			left:30,
			top:63,
			height:'auto',
			width:'auto',
			clickName:'cardmeleonValue2',
			text:"20 for each referral"
		}));
		contentView.add(cardmeleonValue2);
		
		var deal = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#4BBEB4',
			font:{fontStyle:'italic',fontSize:12,fontWeight:'bold'},
			left:12,
			top:94,
			height:'auto',
			width:'auto',
			clickName:'deal',
			text:'Special Deal just for Level 1'
		}));
		contentView.add(deal);
		
		var details = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#999999',
			font:{fontStyle:'italic',fontSize:12,fontWeight:'normal'},
			left:12,
			top:112,
			height:'auto',
			width:'auto',
			clickName:'details',
			text:'This is the details for this special deal'  // TODO change
		}));
		contentView.add(details);
		
		// level 2
		levelTitle = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#4BBEB4',
			font:{fontStyle:'normal',fontSize:18,fontWeight:'bold'},
			left:12,
			top:12 + spacing,
			height:'auto',
			width:'auto',
			clickName:'levelTitle',
			text:"Level 2"
		}));
		contentView.add(levelTitle);
		
		cardmeleonIcon = Ti.UI.createView({
			backgroundImage:'images/Icon_Points-Symbol_12x17.png',
			top:38 + spacing,
			left:12,
			width:12,
			height:17,
			clickName:'cardmeleonIcon'
		});
		contentView.add(cardmeleonIcon);
		
		cardmeleonValue = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#8CC841',
			font:{fontStyle:'normal',fontSize:12,fontWeight:'bold'},
			left:30,
			top:38 + spacing,
			height:'auto',
			width:'auto',
			clickName:'cardmeleonValue',
			text:"15 for each review"
		}));
		contentView.add(cardmeleonValue);
		
		cardmeleonIcon2 = Ti.UI.createView({
			backgroundImage:'images/Icon_Points-Symbol_12x17.png',
			top:63 + spacing,
			left:12,
			width:12,
			height:17,
			clickName:'cardmeleonIcon2'
		});
		contentView.add(cardmeleonIcon2);
		
		cardmeleonValue2 = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#8CC841',
			font:{fontStyle:'normal',fontSize:12,fontWeight:'bold'},
			left:30,
			top:63 + spacing,
			height:'auto',
			width:'auto',
			clickName:'cardmeleonValue2',
			text:"25 for each referral"
		}));
		contentView.add(cardmeleonValue2);
		
		deal = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#4BBEB4',
			font:{fontStyle:'italic',fontSize:12,fontWeight:'bold'},
			left:12,
			top:94 + spacing,
			height:'auto',
			width:'auto',
			clickName:'deal',
			text:'Special Deal just for Level 2'
		}));
		contentView.add(deal);
		
		details = Ti.UI.createLabel(cm.combine($$.Label, {
			color:'#999999',
			font:{fontStyle:'italic',fontSize:12,fontWeight:'normal'},
			left:12,
			top:112 + spacing,
			height:'auto',
			width:'auto',
			clickName:'details',
			text:'This is the details for this special deal: blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah'  // TODO change
		}));
		contentView.add(details);
		
		view.add(contentView);
		
		return view;
	};
	
})();
