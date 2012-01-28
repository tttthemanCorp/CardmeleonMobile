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
				cm.ui.alert("Error", "User Info Data Not Available", e.error + "\nDetails: " + client.responseText);
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
				cm.ui.alert("Error", "Nearby Stores Data Not Available", e.error + "\nDetails: " + client.responseText);
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
			reward.storeLogo = item.reward.merchant.logo;
			reward.redeemCode = 'THISISATESTREDEEMCODE';  // TODO
			reward.distance = cm.getDistance(cm.getLongitude(), cm.getLatitude(), item.reward.merchant.longitude, item.reward.merchant.latitude);
			
			data.push(reward);
		}
		
		cm.sortByDistance(data);
		
		// Once data loaded, fire event to trigger UI update
		Ti.App.fireEvent('app:nearby.rewards.loaded',{data:data});
	};
	
	cm.model.requestNearbyMarket = function(_args) {
		Ti.API.info("Nearby Market Requested!");
		
		cm.restcall("GET", "users/reward/forsell", null, 
			function(e, client)
			{
				Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
				cm.ui.alert("Error", "Reward for sell Not Available", e.error + "\nDetails: " + client.responseText);
			},
			function(client)
			{
				result = JSON.parse(client.responseText);
				
				var reward, item, data = [];
				for (var i = 0, l = result.length; i < l; i++) {
					item = result[i];
					reward = {};
					reward.id = item.reward.id;
					reward.userid = item.user.id;
					reward.username = item.user.username;
					reward.name = item.reward.name;
					reward.desc = item.reward.description;
					reward.eCardmeleon = item.reward.equiv_points;
					reward.expire = item.expiration;
					reward.forSale = item.forsale;
					reward.redeemCode = 'THISISATESTREDEEMCODE';  // TODO
					reward.distance = cm.getDistance(cm.getLongitude(), cm.getLatitude(), item.reward.merchant.longitude, item.reward.merchant.latitude);
					reward.watching = false;
					for (var j = 0, m = cm.model.watches.length; j < m; j++) {
						if (reward.id == cm.model.watches[j].id) {
							reward.watching = true;
							break;
						}
					}
					
					data.push(reward);
				}
				
				cm.sortByDistance(data);
				
				// Once data loaded, fire event to trigger UI update
				Ti.App.fireEvent('app:nearby.market.loaded',{data:data});
			}
		);

	};
	
	cm.model.requestMyWatching = function(_args) {
		Ti.API.info("Watching Market Requested!");
		Ti.App.fireEvent('app:watching.market.loaded',{data:cm.model.watches});
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
				cm.ui.alert("Error", "Mark ForSale flag failed", e.error + "\nDetails: " + client.responseText);
			},
			function(client)
			{
				Ti.API.info("markForSale succeed");
			}
		);
	};
	
	cm.model.buyReward = function(rewardId, sellerId, desc) {
		Ti.API.info("buyReward Requested!");
		
		var req = {}, reward = {}, from_user = {}; //{"reward":{"id":1}, "from_user":{'id':3}, "description":"test buy"}
		reward.id = rewardId;
		from_user.id = sellerId;
		req.reward = reward;
		req.from_user = from_user;
		req.description = desc;
		var payload = JSON.stringify(req);
		cm.restcall("POST", "users/"+cm.getUserID()+"/buy", payload, 
			function(e, client)
			{
				Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
				cm.ui.alert("Error", "Buy reward failed", e.error + "\nDetails: " + client.responseText);
			},
			function(client)
			{
				Ti.API.info("buyReward succeed");
			}
		);
	};
	
	cm.model.redeemReward = function(rewardId) {
		Ti.API.info("redeemReward Requested!");
		
		var req = {}, reward = {}; //{"reward":{"id":1}, "description":"test redeem"}
		reward.id = rewardId;
		req.reward = reward;
		req.description = 'redeem from Cardmeleon App';
		var payload = JSON.stringify(req);
		cm.restcall("POST", "users/"+cm.getUserID()+"/redeem", payload, 
			function(e, client)
			{
				Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
				cm.ui.alert("Error", "Redeem reward failed", e.error + "\nDetails: " + client.responseText);
			},
			function(client)
			{
				Ti.API.info("redeemReward succeed");
			}
		);
	};
	
	cm.model.postToFacebook = function(message) {
		Ti.Facebook.requestWithGraphPath('me/feed', {message: message}, "POST", function(e) {
		    if (e.success) {
		        Ti.API.info("Success!  From FB: " + e.result);
		    } else {
		        if (e.error) {
		            cm.ui.alert("Error", e.error);
		        } else {
		            cm.ui.alert("Error", "Unkown result");
		        }
		    }
		});	
	};
	
	cm.model.giftReward = function(rewardId, message, phone) {
		Ti.API.info("giftReward Requested!");
		
		var req = {}, reward = {}; //{"reward":{"id":1}, "description":"I would like to send you a reward for gift"}
		reward.id = rewardId;
		req.reward = reward;
		req.description = message;
		var payload = JSON.stringify(req);
		cm.restcall("PUT", "users/"+cm.getUserID()+"/gift", payload, 
			function(e, client)
			{
				Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
				cm.ui.alert("Error", "Gift reward failed", e.error + "\nDetails: " + client.responseText);
			},
			function(client)
			{
				var result = JSON.parse(client.responseText);
				var giftcode = result.gift_code;
				Ti.API.info("giftReward succeed.  Gift Code is: "+giftcode);
				
				Ti.App.fireEvent('app:giftcode.available', {giftCode:giftcode, phoneNumber:phone, gifterName:cm.getUserName()});
			}
		);
	};
	
})();