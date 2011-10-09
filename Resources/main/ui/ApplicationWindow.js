/**
 * @author sh: -c: line 0: `echo Lu, Jun' (2)
 */

(function() {
	var platformWidth = Ti.Platform.displayCaps.platformWidth;
	
	//create the main application window
	cm.ui.createApplicationWindow = function(_args) {
		var win = Ti.UI.createWindow({
			backgroundImage:'images/Bgrnd_B-Y.png',
			navBarHidden:true,
		});
		
		var titleBar = Ti.UI.createImageView({
			image:'images/Frame_top_01.png',
			top:0,
			left:0,
			width:320,
			height:32,
		});
		
		var loginView = cm.ui.createLoginView(cm.combine({
			top:32,
		}, $$.empty));
		
		win.add(titleBar);
		win.add(loginView);
		
		return win;
	};
})();