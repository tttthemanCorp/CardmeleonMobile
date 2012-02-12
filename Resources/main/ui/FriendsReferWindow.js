/**
 * @author sh: -c: line 0: `echo Lu, Jun()' (2)
 */

(function() {

	cm.ui.createFriendsReferWindow = function(_args) {
		var win = Ti.UI.createWindow(cm.combine($$.Window, _args));
		
		var headerView = Ti.UI.createView(cm.combine($$.headerView,{top:0}));
		
		//var subHeaderView = Ti.UI.createView(cm.combine($$.subHeaderView,{top: $$.headerView.height}));
		
		var eventFire = true;
		if (_args != undefined && _args.eventFire != undefined) {
			eventFire = _args.eventFire;
		}
		var referView = createReferView(cm.combine($$.stretch, {
			top: $$.headerView.height, // + $$.subHeaderView.height,
			win: win,
			eventFire: eventFire
		}));
		
		win.add(headerView);
		//win.add(subHeaderView);
		win.add(referView);
		
		return win;
	};
	
	function setContactTableData(tableView, contacts, items) {
		var rowlist = [], row, contact, data;
		
		for (var i = 0, l = contacts.length; i<l; i++) {
			contact = contacts[i];
			
			var phone = contact.getPhone();
			var phonenumber = cm.getPhoneNumber(phone);
			if (phonenumber == null || phonenumber.length == 0) {
				continue;
			}
			var name = contact.getFullName();

			row = Ti.UI.createTableViewRow();
			//row.height = 145;
			//row.width = 309;
			//row.hasChild = true;
			//row.rightImage = '/images/Icon_Arrow_RT.png'
			row.className = 'contact';
			//row.clickName = 'storerow';
			//row.backgroundImage = '/images/Bgrnd_Store-Card.png';
			//row.selectedBackgroundImage = '/images/Bgrnd_Store-Card_Selected.png';
			//row.selectedColor = "blue";
			//row.filter = '';
			//row.borderWidth = 2;
			//row.borderColor = '#006cb1';
			row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
			
			data = {checked:false, contactName:name, contactPhone:phonenumber[0]};
			
			var checkbox = cm.ui.createCheckbox({
				top:7,
				left:7,
				model:data
			});
			row.add(checkbox);
			
			var nameLabel = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#0087A0',
				font:{fontStyle:'normal',fontSize:16,fontWeight:'bold'},
				left:47,
				top:12,
				height:'auto',
				width:'auto',
				clickName:'nameLabel',
				text:name
			}));
			row.add(nameLabel);
			Ti.API.info('name: '+name);
		
			var phoneLabel = Ti.UI.createLabel(cm.combine($$.Label, {
				color:'#0087A0',
				font:{fontStyle:'normal',fontSize:16,fontWeight:'bold'},
				left:160,
				top:12,
				height:'auto',
				width:'auto',
				clickName:'phoneLabel',
				text:phonenumber[0]
			}));
			row.add(phoneLabel);
			Ti.API.info('phone: '+phonenumber[0]);
			
			rowlist.push(row);
			items.push(data);
		}
		
		tableView.setData(rowlist);
	}
	
	function createReferView(_args) {
		var view = Ti.UI.createView(cm.combine($$.stretch, _args));
		
		var items = [];
		var tableView = Ti.UI.createTableView({
			top: 18,
			left: 18,
			right: 18,
			bottom: 86
		});
		view.add(tableView);
		
		var contacts = Ti.Contacts.getAllPeople();
		setContactTableData(tableView, contacts, items);

		//
		// SKIP REFER LINK
		//
		var skipLabel = Ti.UI.createLabel(cm.combine($$.Link, {
			text:'or Skip??',
			textAlign:'center',
			font:cm.combine($$.Label.font, {fontSize:14}),
			bottom:18
		}));
		view.add(skipLabel);

		//
		//  CREATE REFER BUTTON
		//
		var referButton = Titanium.UI.createButton({
			backgroundImage:'//images/Button_Refer_OFF.png',
			backgroundSelectedImage:'//images/Button_Refer_ON.png',
			bottom:44,
			height:24,
			width:90
		});
		view.add(referButton);	
  		
  		//
  		// Event Handling
  		//
  		referButton.addEventListener('click', function(){
  			var payloadObjs = [], payload, item;
  			var userId = cm.getUserID();
  			for (var i = 0, l = items.length; i<l; i++) {
  				item = items[i];
  				if (item.checked == false) continue;
	  			payloadObj = {referee_name:item.contactName, refer_method:1};
	  			payloadObjs.push(payloadObj);
			}
			
			var payload = JSON.stringify(payloadObjs);
			cm.restcall('POST', 'users/'+userId+'/refer', payload,
				function(e, client)
				{
					Ti.API.error(e.error + "\nResponse: " + client.responseText + "\nStatus: " + client.status);
					alert(e.error + "\nResponse: " + client.responseText);
				},
				function(client)
				{
					result = JSON.parse(client.responseText);
					for (var i = 0, l = result.length; i < l; i++) {
						Ti.API.info('Referral Code for '+result[i].referee_name+': '+result[i].refer_code);
					}
					
					// TODO: send SMS
					
					_args.win.close({animated:true});
		  			
		  			if (_args.eventFire) {
		  				Ti.App.fireEvent('app:friend.refer.done', {});
		  			}
				}
			);
  		});
  		
  		skipLabel.addEventListener('click', function(){
  			//alert('New user clicked!');
  			_args.win.close({animated:true});
  			
  			if (_args.eventFire) {
  				Ti.App.fireEvent('app:friend.refer.done', {});
  			}
  		});
  		
		return view;
	};
})();