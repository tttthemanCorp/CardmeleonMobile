/**
 * @author sh: -c: line 0: `echo Lu, Jun' (2)
 */

(function() {
	cm.model = {

	};
	
	cm.model.requestStoreDetails = function(_args) {
		Ti.API.info("Store Details Requested!");
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 10000;
		xhr.open("GET", 'http://www.google.com');
		
		xhr.onerror = function (e) {
			cm.ui.alert('Network Error',e.error);
		};
		
		xhr.onload = function () {
			var data = {
				storeName:"Safeway",
				reviews: [{
					userName:'abc',
					userLevel:3,
					userAvatar:'http://abc.com/images/a.png',
					time:'8:00 AM on June 12, 2011',
					review:'this store is very good',
					rating:1.0
				},{
					userName:'test user',
					userLevel:1,
					userAvatar:'http://abc.com/images/a.png',
					time:'10:45 AM on March 4, 2011',
					review:'awesome!',
					rating:5.0
				},{
					userName:'John',
					userLevel:2,
					userAvatar:'http://abc.com/images/a.png',
					time:'11:10 AM on March 4, 2011',
					review:'I would be happy to come back again to this store',
					rating:3.5
				}],
				promotions:[{
					title:'10% Off Any Item!',
					desc:'this is a great deal! Hurry up!',
					expire:'12/21/2011'
				}],
				distance:12.3,
				desc:"this is a description for store"
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
		xhr.timeout = 10000;
		xhr.open("GET", 'http://www.google.com');
		
		xhr.onerror = function (e) {
			cm.ui.alert('Network Error',e.error);
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
		xhr.timeout = 10000;
		xhr.open("GET", 'http://www.google.com');
		
		xhr.onerror = function (e) {
			cm.ui.alert('Network Error',e.error);
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
	
	cm.model.requestNearbyRewards = function(_args) {
		Ti.API.info("Nearby Rewards Requested!");
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 10000;
		xhr.open("GET", 'http://www.google.com');
		
		xhr.onerror = function (e) {
			cm.ui.alert('Network Error',e.error);
		};
		
		xhr.onload = function () {
			var data = [
				{name:'a cup of StarBucks',eCardmeleon:30,expire:'June 4, 2012 9:10 PM',forSale:0},
				{name:'a free meal',eCardmeleon:40,expire:'April 12, 2011 2:45 AM',forSale:1},
				{name:'10% off any purchase',eCardmeleon:30,expire:'June 4, 2012 11:15 AM',forSale:0}
			];
			// Once data loaded, fire event to trigger UI update
			Ti.App.fireEvent('app:nearby.rewards.loaded',{
				data:data
			});
		};
		
		// Get the data
		xhr.send();
	};
	
	cm.model.requestMySales = function(_args) {
		Ti.API.info("My Sales Requested!");
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 10000;
		xhr.open("GET", 'http://www.google.com');
		
		xhr.onerror = function (e) {
			cm.ui.alert('Network Error',e.error);
		};
		
		xhr.onload = function () {
			var data = [
				{name:'a free meal',eCardmeleon:30,expire:'11:10 AM on March 4, 2012',forSale:0}
			];
			// Once data loaded, fire event to trigger UI update
			Ti.App.fireEvent('app:my.sales.loaded',{
				data:data
			});
		};
		
		// Get the data
		xhr.send();
	};
	
	cm.model.requestNearbyMarket = function(_args) {
		Ti.API.info("Nearby Market Requested!");
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 10000;
		xhr.open("GET", 'http://www.google.com');
		
		xhr.onerror = function (e) {
			cm.ui.alert('Network Error',e.error);
		};
		
		xhr.onload = function () {
			var data = [
				{name:'a cup of StarBucks',eCardmeleon:30,expire:'June 4, 2012 9:10 PM',forSale:0,watching:0},
				{name:'a free meal',eCardmeleon:40,expire:'April 12, 2011 2:45 AM',forSale:1,watching:1},
				{name:'10% off any purchase',eCardmeleon:30,expire:'June 4, 2012 11:15 AM',forSale:0,watching:0}
			];
			// Once data loaded, fire event to trigger UI update
			Ti.App.fireEvent('app:nearby.market.loaded',{
				data:data
			});
		};
		
		// Get the data
		xhr.send();
	};
	
	cm.model.requestMyWatching = function(_args) {
		Ti.API.info("Nearby Stores Requested!");
		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 10000;
		xhr.open("GET", 'http://www.google.com');
		
		xhr.onerror = function (e) {
			cm.ui.alert('Network Error',e.error);
		};
		
		xhr.onload = function () {
			var data = [
				{name:'a free meal',eCardmeleon:30,expire:'11:10 AM on March 4, 2012',forSale:0,watching:1}
			];
			// Once data loaded, fire event to trigger UI update
			Ti.App.fireEvent('app:my.watching.loaded',{
				data:data
			});
		};
		
		// Get the data
		xhr.send();
	};
	
})();