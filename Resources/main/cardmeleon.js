/**
 * @author sh: -c: line 0: `echo Lu, Jun' (2)
 */

var cm = {};
(function() {
	//application state variables are held in this namespace.  
	//Like the current app window, for instance, which is created in app.js
	cm.app = {};
	
	//Extend an object with the properties from another 
	//(thanks Dojo - http://docs.dojocampus.org/dojo/mixin)
	var empty = {};
	function mixin(/*Object*/ target, /*Object*/ source){
		var name, s, i;
		for(name in source){
			s = source[name];
			if(!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))){
				target[name] = s;
			}
		}
		return target; // Object
	};
	cm.mixin = function(/*Object*/ obj, /*Object...*/ props){
		if(!obj){ obj = {}; }
		for(var i=1, l=arguments.length; i<l; i++){
			mixin(obj, arguments[i]);
		}
		return obj; // Object
	};
	
	//create a new object, combining the properties of the passed objects with the last arguments having
	//priority over the first ones
	cm.combine = function(/*Object*/ obj, /*Object...*/ props) {
		var newObj = {};
		for(var i=0, l=arguments.length; i<l; i++){
			mixin(newObj, arguments[i]);
		}
		return newObj;
	};
	
	//OS, Locale, and Density specific branching helpers adapted from the Helium library
	//for Titanium: http://github.com/kwhinnery/Helium
	var locale = Ti.Platform.locale;
	var osname = Ti.Platform.osname;

	/*
		Branching logic based on locale
	*/
	cm.locale = function(/*Object*/ map) {
		var def = map.def||null; //default function or value
		if (map[locale]) {
			if (typeof map[locale] == 'function') { return map[locale](); }
			else { return map[locale]; }
		}
		else {
			if (typeof def == 'function') { return def(); }
			else { return def; }
		}
	};

	/*
		Branching logic based on OS
	*/
	cm.os = function(/*Object*/ map) {
		var def = map.def||null; //default function or value
		if (typeof map[osname] != 'undefined') {
			if (typeof map[osname] == 'function') { return map[osname](); }
			else { return map[osname]; }
		}
		else {
			if (typeof def == 'function') { return def(); }
			else { return def; }
		}
	};
	
	// (acos(sin(sLat * 0.017453292) * sin(tLat * 0.017453292) + cos(sLat * 0.017453292) * cos(tLat * 0.017453292) * cos((sLong - tLong) * 0.017453292)) * 3958.565474745)
	cm.getDistance = function(sLong, sLat, tLong, tLat) {
		var deltaLong = sLong - tLong;
		var dist = Math.sin(sLat * 0.017453292) * Math.sin(tLat * 0.017453292) + 
				   Math.cos(sLat * 0.017453292) * Math.cos(tLat * 0.017453292) * Math.cos(deltaLong * 0.017453292);
		dist = Math.acos(dist) * 3958.565474745;
		return dist;
	};
	
	cm.sortByExpiration = function(data) {
		return data.sort(function(a, b){
			var ad = new Date(a.expire);
			var bd = new Date(b.expire);
			return ad - bd;
		});
	};
	
	cm.sortByDistance = function(data) {
		return data.sort(function(a, b){
			var ad = a.distance;
			var bd = b.distance;
			return ad - bd;
		});
	};
	
	cm.formatDateShort = function(dateStr) {
		var ts = Date.parse(dateStr);
		if (isNaN(ts)) {  // 2012-03-24, 2012-3-5, 2012-3-06
			var tokens = dateStr.split('-');
			var newstr = tokens[1] + "/" + tokens[2] + "/" + tokens[0];
			return newstr;
		} else {
			var d = new Date(ts);
			var month = d.getMonth() + 1;
			var newstr = month + "/" + d.getDate() + "/" + d.getFullYear();
			return newstr;
		}
	};
	
	cm.formatPhoneNumber = function(phoneStr) {
		var p = phoneStr.replace(/[^\d]/g, '');
		var phone = '('+p.substr(0,3)+') '+p.substr(3,3)+'-'+p.substr(6,4);
		return phone;
	};
	
	cm.getPhoneNumber = function(phone) {
		var phonenumber = phone['iPhone'];
		if (phonenumber == null || phonenumber.length == 0) {
			phonenumber = phone['mobile'];
		}
		if (phonenumber == null || phonenumber.length == 0) {
			phonenumber = phone['main'];
		}
		if (phonenumber == null || phonenumber.length == 0) {
			phonenumber = phone['home'];
		}
		if (phonenumber == null || phonenumber.length == 0) {
			phonenumber = phone['work'];
		}
		if (phonenumber == null || phonenumber.length == 0) {
			phonenumber = phone['other'];
		}
		return phonenumber;
	};
	
	cm.getLongitude = function() {
		return Ti.App.Properties.getDouble('longitude');
	};
	
	cm.getLatitude = function() {
		return Ti.App.Properties.getDouble('latitude');
	};
	
	cm.requestGeoLocation = function() {
		Ti.API.info("*** Ti.Platform.model = "+Ti.Platform.model);
		// a hack to get around a bug in iPhone Simulator in Lion - location service is disabled
		if(Ti.Platform.model == 'Simulator' || Ti.Platform.model == 'x86_64') {
			var longitude = 201.32;
			var latitude = 102.45;
		    Ti.App.Properties.setDouble('longitude', longitude);
		    Ti.App.Properties.setDouble('latitude', latitude);
		    Ti.App.fireEvent('app:geoloc.available', {longitude: longitude, latitude: latitude});
		    return;
		}
		
		if (Ti.Geolocation.locationServicesEnabled === false)
		{
			Ti.UI.createAlertDialog({title:'Cardmeleon', message:'Your device has geo location service turned off'}).show();
		}
		else
		{
			if (Ti.Platform.name != 'android') {
				var authorization = Ti.Geolocation.locationServicesAuthorization;
				Ti.API.info('Authorization: '+authorization);
				if (authorization == Ti.Geolocation.AUTHORIZATION_DENIED) {
					Ti.UI.createAlertDialog({
						title:'Cardmeleon',
						message:'You have disallowed Titanium from running geolocation services.'
					}).show();
				}
				else if (authorization == Ti.Geolocation.AUTHORIZATION_RESTRICTED) {
					Ti.UI.createAlertDialog({
						title:'Cardmeleon',
						message:'Your system has disallowed Titanium from running geolocation services.'
					}).show();
				}
			}

			if (Ti.Platform.osname == 'android') {
				Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
				Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
				Ti.Geolocation.distanceFilter = 0;
				Ti.Geolocation.frequency = 1;
			} else {
				Ti.Geolocation.preferredProvider = "gps";
				Ti.Geolocation.purpose = "Find nearby merchants and rewards";
				Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
				Ti.Geolocation.distanceFilter = 0;
			}			

			var headingCallback = function(e) { }; // no code here
			Ti.Geolocation.addEventListener('heading', headingCallback);
			
			var currentLocationCallback = function(e) {
			    if ( !e.success || e.error ) {
			        cm.ui.alert("Error","Unable to get your location.");
			        Ti.API.debug(JSON.stringify(e));
			        Ti.API.debug(e);
			        return;
			    }
			
				updatePosition(e.coords);
			};
			
			var newLocationCallback = function(e) {
			    if( ! e.success || e.error ) {
			        cm.ui.alert("Error","Unable to get your location.");
			        Ti.API.debug(JSON.stringify(e));
			        Ti.API.debug(e);
			        return;
			    }
			
			    updatePosition(e.coords);
			    
			    Ti.Geolocation.removeEventListener('location', newLocationCallback);
			    Ti.App.fireEvent('app:geoloc.available', {longitude: longitude, latitude: latitude});
			};
			
			var updatePosition = function(coords) {
				var longitude = coords.longitude;
				var latitude = coords.latitude;
				var altitude = coords.altitude;
				var heading = coords.heading;
				var accuracy = coords.accuracy;
				var speed = coords.speed;
				var timestamp = coords.timestamp;
				var altitudeAccuracy = coords.altitudeAccuracy;
		
				Ti.API.info('geo - location updated: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
				
			    Ti.App.Properties.setDouble('longitude', longitude);
			    Ti.App.Properties.setDouble('latitude', latitude);
			};
			
			Ti.Geolocation.addEventListener('location', newLocationCallback);
			Ti.Geolocation.getCurrentPosition(currentLocationCallback);
		}
	};
		
	cm.isLoggedIn = function(_args) {
		return cm.getToken() != null;
	};
	
	cm.login = function(token, id, name) {
		Ti.App.Properties.setString('token', token);
		Ti.App.Properties.setString('id', id);
		Ti.App.Properties.setString('login', name);
	}
	
	cm.logout = function() {
		Ti.App.Properties.removeProperty('token');
		Ti.App.Properties.removeProperty('id');
		Ti.App.Properties.removeProperty('login');
	}
	
	cm.getToken = function() {
		return Ti.App.Properties.getString('token');
	}
	
	cm.getUserID = function() {
		return Ti.App.Properties.getString('id');
	}
	
	cm.getUserName = function() {
		return Ti.App.Properties.getString('login');
	}
	
	cm.restcall = function(method, urlpath, payload, errorFunc, successFunc) {
		var token = cm.getToken();
		cm.restcallWithToken(method, urlpath, payload, token, errorFunc, successFunc);
	};
		
	cm.restcallWithToken = function(method, urlpath, payload, token, errorFunc, successFunc) {
		var client = Ti.Network.createHTTPClient();
		client.timeout = 10000;
		
		client.onerror = function(e) {
			errorFunc(e, client);
		};
		client.onload = function() {
			successFunc(client);
		};
		
		client.open(method,cm.config.SERVICE_ENDPOINT+'api/'+urlpath);
		
		client.setRequestHeader('Authorization','Basic '+token);
		client.setRequestHeader('Content-Type','application/json');
		
		client.send(payload);
	};
	
	cm.getImageUrl = function(urlpath) {
		return cm.config.SERVICE_ENDPOINT+'image'+urlpath;
	};
	
	cm.callPhone = function(number) {
		if (Ti.Platform.osname == 'android') {
			var intent = Ti.Android.createIntent({
			    action: Ti.Android.ACTION_CALL,
			    data: 'tel:'+number
			});
			Ti.Android.currentActivity.startActivity(intent);
		} else {
			Ti.Platform.openURL('tel:'+number);
		}
	};
	
	cm.openMap = function(address) {
		Ti.Platform.openURL('http://maps.google.com/maps?q='+address);
	};
	
	cm.sendSMS = function(number, message) {
		
	};
	
})();

//Include additional Tweetanium namespaces
Ti.include(
	'/main/utils/utils.js',
	'/main/utils/barcode.js',
	'/main/ui/ui.js',
	'/main/model/model.js',
	'/main/config/config.js'
);