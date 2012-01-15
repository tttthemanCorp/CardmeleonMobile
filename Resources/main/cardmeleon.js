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
	
	cm.sortByExpiration = function(data) {
		return data.sort(function(a, b){
			var ad = new Date(a.expire);
			var bd = new Date(b.expire);
			return ad - bd;
		});
	};
	
	cm.formatDateShort = function(dateStr) {
		var d = new Date(dateStr);
		return d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
	};
	
	cm.isLoggedIn = function(_args) {
		return cm.getToken() != null;
	};
	
	cm.getToken = function() {
		return Ti.App.Properties.getString('token');
	}
	
	cm.storeToken = function(token) {
		Ti.App.Properties.setString('token', token);
	}
	
	cm.getUserID = function() {
		return Ti.App.Properties.getString('id');
	}
	
	cm.storeUserID = function(id) {
		Ti.App.Properties.setString('id', id);
	}
	
	cm.restcall = function(method, url, payload, errorFunc, successFunc) {
		var token = cm.getToken();
		cm.restcallWithToken(method, url, payload, token, errorFunc, successFunc);
	};
		
	cm.restcallWithToken = function(method, url, payload, token, errorFunc, successFunc) {
		var client = Titanium.Network.createHTTPClient();
		
		client.onerror = function(e) {
			errorFunc(e, client);
		};
		client.onload = function() {
			successFunc(client);
		};
		
		client.open(method,cm.config.SERVICE_ENDPOINT+'api/'+url);
		
		client.setRequestHeader('Authorization','Basic '+token);
		client.setRequestHeader('Content-Type','application/json');
		
		client.send(payload);
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