/**
 * @author sh: -c: line 0: `echo Lu, Jun' (2)
 */

(function() {

	cm.utils.call = function(_args) {
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e)
		{
			Ti.API.info("ERROR " + e.error);
			navActInd.hide();
			alert(e.error);
		};
		xhr.onload = function()
		{
			label.hide();

			var resp =  eval('('+this.responseText+')');
			var venues = resp.groups[0].venues;
			for (var i=0;i<venues.length;i++)
			{
				statusLabel.text += venues[i].name+'\n\n';

			}
			scrollView.add(statusLabel);

			navActInd.hide();
		};
		// open the client and encode our URL
		xhr.open('GET','http://api.foursquare.com/v1/venues.json?geolat='+latitude+'&geolong='+longitude);
		// base64 encode our Authorization header
		xhr.setRequestHeader('Authorization','Basic '+Ti.Utils.base64encode(username.value+':'+password.value));

		// send the data
		xhr.send();
	};
	
})();