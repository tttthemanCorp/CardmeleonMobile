/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function(){
	
	cm.utils.scanBarcode = function(_args) {
		if (Ti.Platform.osname == 'android') {
			var TiBar = require('com.mwaysolutions.barcode');
			TiBar.scan({
		        success: function (data) {
		            Ti.API.info('TiBar success callback!');
		            if(data && data.barcode){
		            	/*
		                Ti.UI.createAlertDialog({
		                    title: "Scan result",
		                    message: "Barcode: " + data.barcode + " Symbology:" + data.symbology
		                }).show();
		                */
		                Ti.API.info("Barcode: " + data.barcode + "\nSymbology:" + data.symbology);
		                
		                var merchantId = parseInt(data.barcode);
		                if (isNaN(merchantId)) {
		                	cm.ui.alert("Error", "Invalid QR Code Scanned: " + data.barcode);
		                } else {
		                	cm.model.makePurchase(merchantId);
		                }
		            }
		        },
		
		        error: function (err) {
		        	Ti.API.info('Error while scanning: ' + err);
		            alert('Error while scanning: ' + err);
		        },
		
		        cancel: function () {
		        	Ti.API.info('Scan cancelled');
		        	alert('Scan cancelled');
		        }
		    });
		} else { // iphone
			var TiBar = require('tibar');
		    TiBar.scan({
		        // simple configuration for iPhone simulator
		        configure: {
		            classType: "ZBarReaderController",
		            sourceType: "Camera", // Camera, Album
		            cameraMode: "Default",
		            symbol:{
		                "QR-Code":true,
		            }
		        },
		        success:function(data){
		            Ti.API.info('TiBar success callback!');
		            if(data && data.barcode){
		            	/*
		                Ti.UI.createAlertDialog({
		                    title: "Scan result",
		                    message: "Barcode: " + data.barcode + " Symbology:" + data.symbology
		                }).show();
		                */
		                Ti.API.info("Barcode: " + data.barcode + "\nSymbology:" + data.symbology);
		                
		                var merchantId = parseInt(data.barcode);
		                if (isNaN(merchantId)) {
		                	cm.ui.alert("Error", "Invalid QR Code Scanned: " + data.barcode);
		                } else {
		                	cm.model.makePurchase(merchantId);
		                }
		            }
		        },
		        cancel:function(){
		        	Ti.API.info('Scan cancelled');
		            alert('Scan cancelled');
		        },
		        error:function(err){
		        	Ti.API.info('Error while scanning: ' + err);
		            alert('Error while scanning: ' + err);
		        }
		    });
		}
	};

})();