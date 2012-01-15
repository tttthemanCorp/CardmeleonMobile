/**
 * Cardmeleon Mobile
 * Copyright (c) 2011-2015 by Cardmeleon, Inc. All Rights Reserved.
 * Author: Jun Lu
 * This is the app bootstrap
 */

Ti.include('/main/cardmeleon.js');

//cm.app.mainWindow = cm.ui.createApplicationWindow();
//cm.app.mainWindow.open();

Ti.App.addEventListener('app:user.login.new', function(e) {
	cm.app.signupWindow = cm.ui.createSignupWindow();
	if (Ti.Platform.osname == 'android') {
		cm.app.signupWindow.open({animated:true});
	} else {
		cm.app.signupWindow.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
	}
	//cm.app.signupWindow.animate(cm.ui.createWindowAnimation());
});

Ti.App.addEventListener('app:user.login.succeed', function(e) {
	cm.app.referWindow = cm.ui.createFriendsReferWindow();
	if (Ti.Platform.osname == 'android') {
		cm.app.referWindow.open({animated:true});
	} else {
		cm.app.referWindow.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
	}
	//cm.app.referWindow.animate(cm.ui.createWindowAnimation());
});

Ti.App.addEventListener('app:user.signup.existing', function(e) {
	cm.app.loginWindow = cm.ui.createLoginWindow();
	if (Ti.Platform.osname == 'android') {
		cm.app.loginWindow.open({animated:true});
	} else {
		cm.app.loginWindow.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
	}
	//cm.app.loginWindow.animate(cm.ui.createWindowAnimation());
});

Ti.App.addEventListener('app:user.signup.succeed', function(e) {
	cm.app.referWindow = cm.ui.createFriendsReferWindow();
	if (Ti.Platform.osname == 'android') {
		cm.app.referWindow.open({animated:true});
	} else {
		cm.app.referWindow.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
	}
	//cm.app.referWindow.animate(cm.ui.createWindowAnimation());
});

Ti.App.addEventListener('app:friend.refer.done', function(e) {
	cm.app.mainWindow = cm.ui.createApplicationWindow();
	if (Ti.Platform.osname == 'android') {
		cm.app.mainWindow.open({animated:true});
	} else {
		cm.app.mainWindow.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
	}
	//cm.app.mainWindow.animate(cm.ui.createWindowAnimation());
});

if (!cm.isLoggedIn()) {
	Ti.App.fireEvent('app:user.signup.existing', {});	
} else {
	//Ti.App.fireEvent('app:friend.refer.done', {});
	Ti.App.fireEvent('app:user.login.succeed', {});
}

//initialize Twitter goodness and let folks know most of the awesomeness will not be available offline
if (Ti.Network.online == false) {
	Ti.UI.createAlertDialog({
		title:'No Network Connection', 
		message:'Sorry, but we couldn\'t detect a connection to the internet.'
	}).show();
}