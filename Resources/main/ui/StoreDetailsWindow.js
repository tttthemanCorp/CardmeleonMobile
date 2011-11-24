/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function() {
	function createSummaryView(_args) {
		var view = Ti.UI.createWindow(cm.combine($$.stretch, {
			backgroundImage: 'images/Bgrnd_G-B.png',
       }));
       return view;
	}
	
	function createStoreBasicView(_args) {
		var view = Ti.UI.createWindow(cm.combine($$.stretch, {
			backgroundColor : 'black',
			borderWidth:2,
			borderColor:'#006cb1'
       }));
       return view;
	}
	
	function createStoreReviewView(_args) {
		var view = Ti.UI.createWindow(cm.combine($$.stretch, {
			backgroundColor : 'black',
			borderWidth:2,
			borderColor:'#006cb1'
       }));
       return view;
	}
	
	function createStorePromoView(_args) {
		var view = Ti.UI.createWindow(cm.combine($$.stretch, {
			backgroundColor : 'black',
			borderWidth:2,
			borderColor:'#006cb1'
       }));
       return view;
	}
	
	function createStoreMenuView(_args) {
		var view = Ti.UI.createWindow(cm.combine($$.stretch, {
			backgroundColor : 'black',
			borderWidth:2,
			borderColor:'#006cb1'
       }));
       return view;
	}
	
	cm.ui.createStoreDetailsWindow = function(_args) {
		var win = Ti.UI.createWindow(cm.combine($$.stretch, _args));

		var headerView = cm.ui.createHeaderView(); /*
		var backButton = Titanium.UI.createButton({
			backgroundSelectedImage:'images/Button_Stores-back_ON.png', 
			backgroundImage:'images/Button_Stores-back_OFF.png',
			top:9,
			left:58,
			width:62,
			height:18
		});
		backButton.addEventListener('click', function() {
			win.close();
		});
		headerView.add(backButton); */
		win.add(headerView);
	
		var view = Ti.UI.createView(cm.combine($$.stretch, {top:$$.headerView.height, backgroundColor: 'blue'}));
/*
		var summaryView = createSummaryView();
		view.add(summaryView);
		
		var data = [{title:"Row 1"},{title:"Row 2"}];
		var data2 = [{title:"Row 2"},{title:"Row 1"}];
		
		var viewData = [{
        	title: 'Basic',
        	view: createStoreBasicView({data:data}),
            tabbedBarBackgroundImage: 'images/Frame_Stores_Basic.png'
        }, {
            title: 'Review',
            view: createStoreReviewView({data:data2}),
            tabbedBarBackgroundImage: 'images/Frame_Stores_Review.png'
        }, {
            title: 'Promotion',
            view: createStorePromoView({data:data}),
            tabbedBarBackgroundImage: 'images/Frame_Stores_Promo.png'
        }, {
            title: 'Menu',
            view: createStoreMenuView({data:data2}),
            tabbedBarBackgroundImage: 'images/Frame_Stores_Menu.png'
        }];
        
		var storeDetailsView = cm.ui.createTabbedScrollableView(cm.combine($$.TabGroup,{
			data:viewData,
			activeIndex: 0,
			shadow:12,
			top:138
		}));
		

		view.add(storeDetailsView);
*/
		win.add(view);

		return win;
		
/*		
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
*/
	};
	
})();