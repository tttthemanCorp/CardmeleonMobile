/**
 * @author sh: -c: line 0: `echo Lu, Jun' (2)
 */

(function() {
	cm.model = {

	};
	
	cm.model.requestNearbyStores = function(_args) {
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 1000;
		xhr.open("GET", 'http://www.google.com');
		
		xhr.onerror = function () {
		
		};
		
		xhr.onload = function () {
			var data = [
				{storeName:"Safeway",numRewards:3,numPurchases:5,phone:"408-555-8888",distance:12.3,desc:"this is a description for store"},
				{storeName:"Outback",numRewards:6,numPurchases:2,phone:"408-090-4366",distance:5.8,desc:"this is a description for store"}
			];
			// Once data loaded, fire event to trigger UI update
			Ti.App.fireEvent('app:nearby.stores.loaded',{
				data:data
			});
		};
		
		// Get the data
		xhr.send();
	};
	
	cm.model.requestFavoritesStores = function(_args) {
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 1000;
		xhr.open("GET", 'http://www.google.com');
		
		xhr.onerror = function () {
		
		};
		
		xhr.onload = function () {
			var data = [
				{storeName:"Walmart",numRewards:12,numPurchases:9,phone:"650-423-8643",distance:9.4,desc:"this is a description for store"},
				{storeName:"Safeway",numRewards:3,numPurchases:5,phone:"408-555-8888",distance:12.3,desc:"this is a description for store"}
			];
			// Once data loaded, fire event to trigger UI update
			Ti.App.fireEvent('app:fav.stores.loaded',{
				data:data
			});
		};
		
		// Get the data
		xhr.send();
	};
	
})();