/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function() {	
	//Globally available theme object to hold theme colors/constants
	cm.ui.theme = {
		textColor:'#000000',
		grayTextColor:'#888888',
		labelColor:'#ffffff',
		linkColor:'#0087A0',
		headerColor:'#333333',
		lightBlue:'#006cb1',
		darkBlue:'#93caed',
		fontFamily: cm.os({
			iphone:'Trebuchet MS',
			android:'Trebuchet MS'
		})
	};

	//All shared property sets are declared here.
	cm.ui.properties = {
		//grab platform dimensions only once to save a trip over the bridge
		platformWidth: Ti.Platform.displayCaps.platformWidth,
		platformHeight: Ti.Platform.displayCaps.platformHeight,
		
		//we use these for default components
		Button: {
			backgroundImage:'images/Button_bg.png',
			height:50,
			width:250,
			color:'#000',
			font: {
				fontSize:18,
				fontWeight:'bold'
			}
		},
		Label: {
			color:cm.ui.theme.labelColor,
			font: {
				fontFamily:cm.ui.theme.fontFamily,
				fontSize:14,
				fontStyle:'Italic',
				fontWeight:'bold'
			},
			height:18
		},
		Link: {
			color:cm.ui.theme.linkColor,
			font: {
				fontFamily:cm.ui.theme.fontFamily,
				fontSize:14,
				fontStyle:'Italic',
				fontWeight:'bold'
			},
			touchEnabled:true,
			height:'auto'
		},
		Window: {
			backgroundImage:'images/Bgrnd_Y-B.png',
			navBarHidden:true,
			softInputMode:(Ti.UI.Android) ? Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE : ''
		},
		TableView: {
			backgroundImage:'images/ruff.png',
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE
		},
		TableViewRow: {
			backgroundImage:'images/tweet_bg.png',
			selectedBackgroundColor: cm.ui.theme.darkBlue, //I know, this is dumb, but it's currently inconsistent x-platform
			backgroundSelectedColor: cm.ui.theme.darkBlue,
			//height:110,
			className:'tvRow'
		},
		TextField: {
			height:36,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			color:'#000000'
		},
		TextArea: {
			borderRadius:10,
			backgroundColor:'#efefef',
			//gradient will only work on iOS
			backgroundGradient:{
				type:'linear',
				colors:[
					{color:'#efefef',position:0.0},
					{color:'#cdcdcd',position:0.50},
					{color:'#efefef',position:1.0}
				]
			}
		},
		TabGroup: {
			heightAtTop:36,
			heightAtBottom:60
		},
		
		//we use these as JS-based 'style classes'
		animationDuration: 500,
		stretch: {
			top:0,bottom:0,left:0,right:0
		},
		variableTopRightButton: {
			top:5,
			right:5,
			height:30,
			width:cm.os({
				iphone:60,
				android:'auto'
			}),
			color:'#ffffff',
			font: {
				fontSize:12,
				fontWeight:'bold'
			},
			backgroundImage:'images/button_bg_black.png'
		},
		topRightButton: {
			top:5,
			right:5,
			height:30,
			width:38
		},
		headerText: {
			top:8,
			height:'auto',
			textAlign:'center',
			color:cm.ui.theme.headerColor,
			font: {
				fontFamily:cm.ui.theme.fontFamily,
				fontSize:18,
				fontWeight:'bold'
			}
		},
		headerView: {
			backgroundImage:'images/Frame_top_01.png',
			left:0,
			height:36,
			width:Ti.Platform.displayCaps.platformWidth
		},
		subHeaderView: {
			backgroundImage:'images/Frame_sub_01.png',
			left:0,
			height:36,
			width:Ti.Platform.displayCaps.platformWidth
		},
		dashView: {
			backgroundImage:'images/Dash_User-bgrnd.png',
			left:0,
			height:36,
			width:Ti.Platform.displayCaps.platformWidth
		},
		summaryView: {
			left:0,
			height:84,
			width:Ti.Platform.displayCaps.platformWidth
		},
		cameraView: {
			backgroundImage:'images/Frame_Sub_03.png',
			left:0,
			height:36,
			width:Ti.Platform.displayCaps.platformWidth
		},
		boldHeaderText: {
			height:'auto',
			color:'#000000',
			font: {
				fontFamily:cm.ui.theme.fontFamily,
				fontSize:14,
				fontWeight:'bold'
			}
		},
		smallText: {
			color:cm.ui.theme.grayTextColor,
			font: {
				fontFamily:cm.ui.theme.fontFamily,
				fontSize:10
			},
			height:'auto'
		},
		spacerRow: {
			backgroundImage:'images/spacer_row.png',
			height:30,
			className:'spacerRow'
		},
		
		// for debugging purpose
		debug: {
			borderWidth:2,
			borderColor:'#006cb1',
			//backgroundColor:'#999',
		},
		empty: {}
	};
})();

//global shortcut for UI properties, since these get used A LOT. polluting the global
//namespace, but for a good cause (saving keystrokes)
var $$ = cm.ui.properties;