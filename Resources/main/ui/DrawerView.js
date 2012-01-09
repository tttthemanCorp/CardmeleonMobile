/**
 * @author Jun Lu
 */

(function() {
	cm.ui.createDrawerView = function(_args) {
		var drawerView = Ti.UI.createView(cm.combine($$.stretch,_args)),
		backdrop = Ti.UI.createView(cm.combine($$.stretch, {
			backgroundColor:'#787878',
			opacity:0.5
		})),
		drawer = Ti.UI.createView({
			height:$$.platformHeight - $$.headerView.height - $$.dashView.height - 83,
			bottom:$$.platformHeight,  //$$.platformHeight - $$.headerView.height - $$.dashView.height - 12,
			left:12,
			right:12,
			borderRadius:15,
			//backgroundColor:'#efefef',
			zIndex:2,
			//gradient will only work on iOS
			// backgroundGradient:{
				// type:'linear',
				// colors:[
					// {color:'#efefef',position:0.0},
					// {color:'#cdcdcd',position:0.50},
					// {color:'#efefef',position:1.0}
				// ]
			// }
		}),
		closeView = Ti.UI.createView({
			height:30,
			borderRadius:15,
			backgroundColor:"#AADCD7",
			left:0,
			right:0,
			bottom:0
		}),
		arrow = Ti.UI.createImageView({
			image:'images/Icon_Arrow_UP.png',
			height:13,
			width:20
		});
		
		drawerView.add(backdrop);
		drawerView.add(drawer);
		closeView.add(arrow);
		drawer.add(closeView);
		
		//Add necessary drawer views
		var stack = cm.ui.createStackView({
			views: [
				cm.ui.createUserLevelView({
					backgroundImage: "images/Bgrnd_User-Card.png" 
				}),
				//cm.ui.createSettingsView({
				//	backgroundColor:'white'
				//})
			],
			props: {
				top:0,
				left:0,
				right:0,
				bottom:0
			}
		});
		
		drawer.add(stack);
		
		//add logic to manage the state of the drawer
		Ti.App.addEventListener('app:show.drawer', function(e) {
			drawerView.visible = true;
			
			//determine which view to show in the drawer
			if (e.showing === 'userLevel') {
				stack.fireEvent('changeIndex',{idx:0});
			}
			else if (e.showing === 'settings') {
				stack.fireEvent('changeIndex',{idx:1});
			}
			
			drawer.animate({
				duration:$$.animationDuration,
				bottom:40
			}, function() {
				Ti.App.fireEvent('app:drawer.opened');
			});
		});
		
		Ti.App.addEventListener('app:hide.drawer', function(e) {
			drawer.animate({
				duration:$$.animationDuration,
				bottom:$$.platformHeight, // $$.platformHeight - $$.headerView.height - $$.dashView.height - 12
			}, function() {
				drawerView.visible = false;
			});
		});
		
		//clicking in the backdrop or arrow should hide also
		backdrop.addEventListener('click', function() { Ti.App.fireEvent('app:hide.drawer'); });
		closeView.addEventListener('click', function() { Ti.App.fireEvent('app:hide.drawer'); });
		
		return drawerView;
	};
})();