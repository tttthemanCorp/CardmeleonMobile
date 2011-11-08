/**
 * @author sh: -c: line 0: `echo Lu, Jun' (2)
 */

(function() {
	cm.ui = {};
	
	cm.ui.createStackView = function(_args) {
		var stack = Ti.UI.createView(cm.combine($$.stretch,_args.props||{}));
		stack.currentIndex = _args.currentIndex||0;

		//populate stack
		for (var i = 0, l = _args.views.length; i < l; i++) {
			var w = _args.views[i];
			if (i == stack.currentIndex) {
				w.visible = true;
			}
			else {
				w.visible = false;
			}
			stack.add(w);
		}

		stack.addEventListener('changeIndex', function(e) {
			for (var j = 0, l = _args.views.length; j < l; j++) {
				if (j == e.idx) {
					_args.views[j].visible = true;
					stack.currentIndex = j;

				}
				else {
					_args.views[j].visible = false;
				}
			}
		});

		return stack;
	};
	
	//create a film strip like view 
	cm.ui.createFilmStripView = function(_args) {
		var root = Ti.UI.createView(cm.combine($$.stretch,_args)),
		views = _args.views,
		container = Ti.UI.createView({
			top:0,
			left:0,
			bottom:0,
			width:$$.platformWidth*_args.views.length
		});
			
		for (var i = 0, l = views.length; i<l; i++) {
			var newView = Ti.UI.createView({
				top:0,
				bottom:0,
				left:$$.platformWidth*i,
				width:$$.platformWidth
			});
			newView.add(views[i]);
			container.add(newView);
		}
		root.add(container);
		
		//set the currently visible index
		root.addEventListener('changeIndex', function(e) {
			var leftValue = $$.platformWidth*e.idx*-1;
			container.animate({
				duration:$$.animationDuration,
				left:leftValue
			});
		});
		
		return root;
	};
	
	//create a spacer row for a table view
	cm.ui.createSpacerRow = function() {
		return Ti.UI.createTableViewRow($$.spacerRow);
	};
	
	// _args example: 
	// {label: {x_offset: 0, y_offset: -20, texts: ['username', 'password']}, input: {top_start: 30, left: 10, right: 10, spacing: 40}}
	cm.ui.createLabelInputView = function(_args, fieldvalues) {
		var view = Ti.UI.createView(cm.combine($$.stretch,_args));
		var curFieldTopPos = _args.input.top_start,
		curFieldLeftPos = _args.input.left;
		for (var i = 0, l = _args.label.texts.length; i<l; i++) {
			var label = Ti.UI.createLabel(cm.combine($$.Label, {
				text: _args.label.texts[i],
				top: curFieldTopPos + _args.label.y_offset,
				left: curFieldLeftPos + _args.label.x_offset
			}));
			view.add(label);
			
			var field = Titanium.UI.createTextField(cm.combine($$.TextField, {
				hintText:'enter '+_args.label.texts[i],
				top: curFieldTopPos,
				left: curFieldLeftPos,
				right: _args.input.right
			}));
			view.add(field);
			
			field.addEventListener('change', function(idx) { //use closure to retain value of i in idx
				return function(e) {
					fieldvalues[idx] = e.value;
					//Ti.API.info("i="+idx+", value="+e.value);
				};
			}(i));
			
			//Ti.API.info("i="+i+", current field top position="+curFieldTopPos);
			curFieldTopPos += $$.TextField.height + _args.input.spacing;
		}
		return view;
	};
	
	//shorthand for alert dialog
	cm.ui.alert = function(/*String*/ _title, /*String*/ _message) {
		Ti.UI.createAlertDialog({
			title:_title, 
			message:_message
		}).show();
	};
})();

//Include major UI components and styling properties
Ti.include(
	'/main/ui/styles.js',
	'/main/ui/ApplicationWindow.js',
	'/main/ui/LoginView.js',
	'/main/ui/LoadingView.js',
	'/main/ui/StoresView.js',
	'/main/ui/RewardsView.js',
	'/main/ui/MarketView.js',
	'/main/ui/SignupView.js'
);