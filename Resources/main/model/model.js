/**
 * @author sh: -c: line 0: `echo Lu, Jun' (2)
 */

(function() {
	cm.model = {

	};
	
	cm.model.requestStoreDetails = function(_args) {
		Ti.API.info("Store Details Requested!");
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 1000;
		xhr.open("GET", 'http://www.google.com');
		
		xhr.onerror = function () {
		
		};
		
		xhr.onload = function () {
			var data = {
				storeName:"Safeway",numRewards:3,numPurchases:5,phone:"408-555-8888",distance:12.3,desc:"this is a description for store"
			};
			// Once data loaded, fire event to trigger UI update
			Ti.App.fireEvent('app:store.details.loaded',{
				data:data
			});
		};
		
		// Get the data
		xhr.send();
	}
	
	cm.model.requestNearbyStores = function(_args) {
		Ti.API.info("Nearby Stores Requested!");
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 1000;
		xhr.open("GET", 'http://www.google.com');
		
		xhr.onerror = function () {
		
		};
		
		xhr.onload = function () {
			var data = [
				{storeName:"Safeway",numRewards:3,numPurchases:5,numReviews:9,rating:2.5,phone:"408-555-8888",distance:12.3,desc:"this is a description for store"},
				{storeName:"Outback",numRewards:6,numPurchases:2,numReviews:3,rating:4.5,phone:"408-090-4366",distance:5.8,desc:"this is a description for store"}
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
		Ti.API.info("Favorite Stores Requested!");
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 1000;
		xhr.open("GET", 'http://www.google.com');
		
		xhr.onerror = function () {
		
		};
		
		xhr.onload = function () {
			var data = [
				{storeName:"Walmart",numRewards:12,numPurchases:9,numReviews:5,rating:1,phone:"650-423-8643",distance:9.4,desc:"this is a description for store"},
				{storeName:"Safeway",numRewards:3,numPurchases:5,numReviews:9,rating:2.5,phone:"408-555-8888",distance:12.3,desc:"this is a description for store"}
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