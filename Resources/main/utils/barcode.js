/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function(){
	
	cm.utils.scanBarcode = function(_args) {
		if (Ti.Platform.osname == 'android') {
			
		} else { // iphone
			var TiBar = require('tibar');
		    TiBar.scan({
		        // simple configuration for iPhone simulator
		        configure: {
		            classType: "ZBarReaderController",
		            sourceType: "Album",
		            cameraMode: "Default",
		            symbol:{
		                "QR-Code":true,
		            }
		        },
		        success:function(data){
		            Ti.API.info('TiBar success callback!');
		            if(data && data.barcode){
		                Ti.UI.createAlertDialog({
		                    title: "Scan result",
		                    message: "Barcode: " + data.barcode + " Symbology:" + data.symbology
		                }).show();
		            }
		        },
		        cancel:function(){
		            Ti.API.info('TiBar cancel callback!');
		        },
		        error:function(){
		            Ti.API.info('TiBar error callback!');
		        }
		    });
		}
	};

})();