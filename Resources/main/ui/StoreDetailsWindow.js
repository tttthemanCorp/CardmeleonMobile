/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function() {
	//create the login view
	cm.ui.createStoreDetailsWindow = function(_args) {
		var win = Ti.UI.createWindow(cm.combine($$.stretch, _args)),
		subHeaderView = Ti.UI.createView(cm.combine($$.subHeaderView,{top:0}));
		win.add(subHeaderView);
		
		//cm.mixin(win, $$.debug); // TODO - debug only
		
		var button = Titanium.UI.createButton(cm.combine($$.Button, {
			title:'Open Child Window',
			top:100,
			left:50,
		}));
		win.add(button);
		
		button.addEventListener('click', function(){
			cm.navGroup.open(Ti.UI.createWindow({
				backgroundColor : 'black',
				navBarHidden : false,  // this is very important
            }), { animated: true });
		});
		
		return win;
	};
})();