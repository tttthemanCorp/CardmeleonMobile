/**
 * @author sh: -c: line 0: `echo Lu, Jun' (2)
 */

(function() {
	cm.model = {
		NEARBY_RADIUS:'nearby_radius',
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
	};
	
	cm.model.loadFavorites = function() {
		cm.model.favorites = Ti.App.Properties.getList('store_favorites', []);
	};
	
	cm.model.saveFavorites = function() {
		Ti.App.Properties.setList('store_favorites', cm.model.favorites);
	};
	
	cm.model.loadWatches = function() {
		cm.model.watches = Ti.App.Properties.getList('store_watches', []);
	};
	
	cm.model.saveWatches = function() {
		Ti.App.Properties.setList('store_watches', cm.model.watches);
	};
	
	cm.model.requestUserInfo = function(_args) {
		Ti.API.info("User Info Requested!");
		
		cm.restcall("GET", "users/"+cm.getUserID(), null, 
			function(e, client)
			{
				Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
				alert("User Info Data Not Available", e.error + "\nDetails: " + client.responseText);
			},
			function(client)
			{
				result = JSON.parse(client.responseText);
				cm.model.userinfo = result;
				
				// init settings properties
				var radius = result.pref.nearby_radius;
				if (radius != null) {
					Ti.App.Properties.setDouble(cm.model.NEARBY_RADIUS, radius);
				}
				
				// Once data loaded, fire event to trigger other actions
				Ti.App.fireEvent('app:userinfo.loaded',{});
			}
		);
	};
	
	cm.model.requestNearbyStores = function(_args) {
		Ti.API.info("Nearby Stores Requested!");
		
		var radius = Ti.App.Properties.getDouble(cm.model.NEARBY_RADIUS);
		cm.restcall("GET", "stores/prox/"+cm.getLongitude()+","+cm.getLatitude()+","+radius, null, 
			function(e, client)
			{
				Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
				alert("Nearby Stores Data Not Available", e.error + "\nDetails: " + client.responseText);
			},
			function(client)
			{
				var result = JSON.parse(client.responseText);
				cm.model.stores = result;
				
				var data = [], storeItem, resultItem, storeId, progressList, progressItem;
				for (var i = 0, l = result.length; i < l; i++) {
					resultItem = result[i];
					storeId = resultItem.id;
					storeItem = {};
					storeItem.id = storeId;
					storeItem.storeName = resultItem.name;
					storeItem.phone = cm.formatPhoneNumber(resultItem.phone);
					storeItem.logo = resultItem.logo;
					storeItem.distance = resultItem.distance.toFixed(1);
					storeItem.purchasesPerReward = resultItem.reward_trigger;
					storeItem.desc = resultItem.desc;
					storeItem.addr = resultItem.address;
					storeItem.numRewards = cm.model.userinfo.userrewards.length;
					storeItem.favorite = false;
					for (var j = 0, m = cm.model.favorites.length; j < m; j++) {
						if (storeId == cm.model.favorites[j].id) {
							storeItem.favorite = true;
							break;
						}
					}
					storeItem.numPurchases = 0;  // set initial value first, then correct it below
					progressList = cm.model.userinfo.userprogresses;
					for (var j = 0, m = progressList.length; j < m; j++) {
						progressItem = progressList[j];
						if (storeId == progressItem.merchant.id) {
							storeItem.numPurchases = progressItem.cur_times;
							break;
						}
					}
					data.push(storeItem);
				}

				// Once data loaded, fire event to trigger UI update
				Ti.App.fireEvent('app:nearby.stores.loaded',{data:data});
			}
		);
	};
	
	cm.model.requestFavoritesStores = function(_args) {
		Ti.API.info("Favorite Stores Requested!");
		
		Ti.App.fireEvent('app:fav.stores.loaded',{data:cm.model.favorites});
	};
	
	cm.model.requestNearbyRewards = function(_args) {
		Ti.API.info("Nearby Rewards Requested!");

		var userrewards = cm.model.userinfo.userrewards, reward, item, data = [];
		for (var i = 0, l = userrewards.length; i < l; i++) {
			item = userrewards[i];
			reward = {};
			reward.id = item.reward.id;
			reward.name = item.reward.name;
			reward.desc = item.reward.description;
			reward.eCardmeleon = item.reward.equiv_points;
			reward.expire = item.expiration;
			reward.forSale = item.forsale;
			reward.redeemCode = 'THISISATESTREDEEMCODE';  // TODO
			reward.distance = cm.getDistance(cm.getLongitude(), cm.getLatitude(), item.reward.merchant.longitude, item.reward.merchant.latitude);
			
			data.push(reward);
		}
		
		cm.sortByDistance(data);
		
		// Once data loaded, fire event to trigger UI update
		Ti.App.fireEvent('app:nearby.rewards.loaded',{data:data});
	};
	
	cm.model.markForSale = function(rewardId, forsale) {
		Ti.API.info("markForSale Requested!");
		
		var req = {}, reward = {};
		reward.id = rewardId;
		req.forsale = forsale;
		req.reward = reward;
		var payload = JSON.stringify(req);
		cm.restcall("PUT", "users/"+cm.getUserID()+"/reward", payload, 
			function(e, client)
			{
				Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
				alert("Mark ForSale flag failed", e.error + "\nDetails: " + client.responseText);
			},
			function(client)
			{
				Ti.API.info("markForSale succeed");
			}
		);
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
	
	cm.model.redeemReward = function(userId, rewardId) {
		// TODO
	};
	
})();