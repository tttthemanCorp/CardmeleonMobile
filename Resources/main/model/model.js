/**
 * @author sh: -c: line 0: `echo Lu, Jun' (2)
 */

(function() {
	cm.model = {
		NEARBY_RADIUS:'nearby_radius',
	};
	
	cm.model.requestStoreReviews = function(storeId) {
		Ti.API.info("Store Reviews Requested!");

		cm.restcall("GET", "stores/"+storeId, null, 
			function(e, client)
			{
				Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
				cm.ui.alert("Error", "Store Reviews Data Not Available: " + e.error + "\nDetails: " + client.responseText);
			},
			function(client)
			{
				result = JSON.parse(client.responseText);

				var reviewSummary = {}, sum = 0, numReviews = result.userreview_set.length, rating;
				for (var i = 0, l = numReviews; i < l; i++) {
					rating = result.userreview_set[i].rating;
					sum += parseFloat(rating);
				}
				reviewSummary.id = storeId;
				reviewSummary.storeName = result.name;
				var avgrating = sum / numReviews;
				reviewSummary.rating = Math.round(avgrating * 2) / 2;
				reviewSummary.numReviews = numReviews;
				
				// Once data loaded, fire event to trigger UI update
				Ti.App.fireEvent('app:store.reviews.retrieved',{model:reviewSummary});  // 
			}
		);
	};
	
	cm.model.requestStoreDetails = function(storeId) {
		Ti.API.info("Store Details Requested!");

		cm.restcall("GET", "stores/"+storeId, null, 
			function(e, client)
			{
				Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
				cm.ui.alert("Error", "Store Details Data Not Available: " + e.error + "\nDetails: " + client.responseText);
			},
			function(client)
			{
				result = JSON.parse(client.responseText);

				var storedetails = {}, programs = [], reviews = [], program, review, sum = 0, numReviews = result.userreview_set.length;
				storedetails.storeName = result.name;
				for (var i = 0, l = result.rewardprogram_set.length; i < l; i++) {
					program = {};
					program.name = result.rewardprogram_set[i].name;
					program.prog_type = result.rewardprogram_set[i].prog_type;
					program.reward_trigger = result.rewardprogram_set[i].reward_trigger;
					program.reward_points = result.rewardprogram_set[i].reward.equiv_points;
					program.reward_name = result.rewardprogram_set[i].reward.name;
					programs.push(program);
				}
				for (var i = 0; i < numReviews; i++) {
					sum += parseFloat(result.userreview_set[i].rating);
					review = {};
					review.review = result.userreview_set[i].review;
					review.rating = result.userreview_set[i].rating;
					review.time = result.userreview_set[i].time;
					review.userName = result.userreview_set[i].user.username;
					reviews.push(review);
				}
				storedetails.programs = programs;
				storedetails.reviews = reviews;
				var avgrating = sum / numReviews;
				storedetails.rating = Math.round(avgrating * 2) / 2;
				storedetails.numReviews = numReviews;
				
				
				// Once data loaded, fire event to trigger UI update
				Ti.App.fireEvent('app:store.details.loaded',{data:storedetails});
			}
		);
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
				cm.ui.alert("User Info Data Not Available: " + e.error + "\nDetails: " + client.responseText);
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
				cm.ui.alert("Error", "Nearby Stores Data Not Available: " + e.error + "\nDetails: " + client.responseText);
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
					storeItem.distance = 1.0; //resultItem.distance.toFixed(1);  TODO
					storeItem.purchasesPerReward = 10; //resultItem.reward_trigger;  TODO
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
			reward.rewardid = item.reward.id;
			reward.userrewardid = item.id;
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
				cm.ui.alert("Error", "Reward for sell Not Available: " + e.error + "\nDetails: " + client.responseText);
			},
			function(client)
			{
				result = JSON.parse(client.responseText);
				
				var reward, item, data = [];
				for (var i = 0, l = result.length; i < l; i++) {
					item = result[i];
					reward = {};
					reward.rewardid = item.reward.id;
					reward.userrewardid = item.id;
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
	
	cm.model.markForSale = function(userrewardId, forsale) {
		Ti.API.info("markForSale Requested!");
		
		var req = {};
		req.forsale = forsale;
		req.userreward_id = userrewardId;
		var payload = JSON.stringify(req);
		cm.restcall("PUT", "users/"+cm.getUserID()+"/reward", payload, 
			function(e, client)
			{
				Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
				cm.ui.alert("Error", "Mark ForSale flag failed: " + e.error + "\nDetails: " + client.responseText);
			},
			function(client)
			{
				Ti.API.info("markForSale succeed");
			}
		);
	};
	
	cm.model.buyReward = function(userrewardId, sellerId, desc) {
		Ti.API.info("buyReward Requested!");
		
		var req = {}; //{"userreward_id":2, "description":"test buy"}
		req.userreward_id = userrewardId;
		req.description = desc;
		var payload = JSON.stringify(req);
		cm.restcall("POST", "users/"+cm.getUserID()+"/buy", payload, 
			function(e, client)
			{
				Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
				cm.ui.alert("Error", "Buy reward failed: " + e.error + "\nDetails: " + client.responseText);
			},
			function(client)
			{
				Ti.API.info("buyReward succeed");
			}
		);
	};
	
	cm.model.redeemReward = function(userrewardId) {
		Ti.API.info("redeemReward Requested!");
		
		var req = {}; //{"userreward_id":2, "description":"test redeem"}
		req.userreward_id = userrewardId;
		req.description = 'redeem from Cardmeleon App';
		var payload = JSON.stringify(req);
		cm.restcall("POST", "users/"+cm.getUserID()+"/redeem", payload, 
			function(e, client)
			{
				Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
				cm.ui.alert("Error", "Redeem reward failed: " + e.error + "\nDetails: " + client.responseText);
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
	
	cm.model.giftReward = function(userrewardId, message, phone) {
		Ti.API.info("giftReward Requested!");
		
		var req = {}; //{"userreward_id":2, "description":"I would like to send you a reward for gift"}
		req.userreward_id = userrewardId;
		req.description = message;
		var payload = JSON.stringify(req);
		cm.restcall("PUT", "users/"+cm.getUserID()+"/gift", payload, 
			function(e, client)
			{
				Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
				cm.ui.alert("Error", "Gift reward failed: " + e.error + "\nDetails: " + client.responseText);
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
	
	cm.model.makePurchase = function(merchantId) {
		Ti.API.info("makePurchase Requested!");
		
		var req = {}, merchant={}; //{"merchant":{"id":1}, "dollar_amount":0.0, "description":"QR-code scan"}
		merchant.id = merchantId;
		req.merchant = merchant;
		req.dollar_amount = 0.0;
		req.description = "QR-code Scan";
		var payload = JSON.stringify(req);
        cm.restcall("POST", "users/"+cm.getUserID()+"/purchase", payload, 
			function(e, client)
			{
				Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
				cm.ui.alert("Error", "makePurchase failed: " + e.error + "\nDetails: " + client.responseText);
			},
			function(client)
			{
				var result = JSON.parse(client.responseText);
				var activityId = result.id;
				Ti.API.info("makePurchase succeed.  purchase activity id is: "+activityId);
				
				Ti.App.fireEvent('app:purchase.recorded', {data:merchantId});
			}
		);
	};
	
	cm.model.submitReview = function(merchantId, review, rating) {
		Ti.API.info("submitReview Requested!");
		
		var req = {}, merchant={}; //{"merchant":{"id":1}, "review":"this merchant is awesome!", "rating":4.5}
		merchant.id = merchantId;
		req.merchant = merchant;
		if (review === undefined || review === null) {
			req.review = "";
		} else {
			req.review = review;
		}
		req.rating = rating;
		var payload = JSON.stringify(req);
        cm.restcall("POST", "users/"+cm.getUserID()+"/review", payload, 
			function(e, client)
			{
				Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
				cm.ui.alert("Error", "submitReview failed: " + e.error + "\nDetails: " + client.responseText);
			},
			function(client)
			{
				var result = JSON.parse(client.responseText);
				var reviewId = result.id;
				Ti.API.info("submitReview succeed.  review id is: "+reviewId);
				
				Ti.App.fireEvent('app:review.submitted', {review_id:reviewId});
			}
		);
	};
	
})();