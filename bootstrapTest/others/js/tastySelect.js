(function(window, undefined) {
	"use strict";

	var defaultSettings = {
		selector: 'select',
		mobileFix: true,
		mask: '%', //$ - длина, % - перечисление элементов
		maskJoin: ', ',
		defaultText: 'Select item...',
		classes : {
			outer: 'style-select',
			title: 'style-select-title',
			options: 'style-select-options',
			label: 'style-select-label',
			optgroup: 'style-select-optgroup',
			list: 'style-select-list',
			item: 'style-select-option',
			open: 'st_open',
			selected: 'st_selected',
			mobile: 'is_mobile',
		},
		attributes : {
			index: 'data-index',
			value: 'data-value',
			selectReady: 'data-tastyselect',
		},
	},
	mobile = mobileDetect().any();

	var start = function(userSettings){
		var elems = document.querySelectorAll((userSettings && userSettings.selector) || defaultSettings.selector ),
			openClass;

		forEachElem(elems, function(element){
			tastySelect(element, userSettings);
		});

		openClass = (userSettings && userSettings.classes && userSettings.classes.open) || defaultSettings.classes.open;

		document.body.addEventListener('click',function(){
			var target = event.target.closest('.'+openClass),
				selects = document.querySelectorAll('.'+openClass);
			forEachElem(selects, function(elem){
				if( target === elem ){
					return;
				}
				removeClass(elem, openClass);
			});
		},false);
	};

	function tastySelect(select, userSettings){
		if( select.getAttribute('data-tastyselect') !== null ){
			return;
		}
		var settings, classes, attributes;
		
		settings = extend({}, defaultSettings, userSettings);

		classes = settings.classes;
		attributes = settings.attributes;

		var structure = createStructure(select);
		if( settings.mobileFix ){
			iosBugFix(select);
		}
		wrapElem(select, structure);

		setListeners(structure);
		redraw(structure);

		function redraw(outer){
			var select = outer.querySelector(settings.selector),
				container = outer.querySelector('.' + classes.options),
				items = container.querySelectorAll('.' + classes.item),
				title = outer.querySelector('.' + classes.title),
				options = select.options,
				item,
				selected = [],
				output = settings.defaultText,
				option;
			for( var i = 0, size = items.length; i < size; i++){
				option = options[i];
				item = items[i];
				if(option.selected){
					addClass(item, classes.selected);
					selected.push( option.text );
				} else {
					removeClass(item, classes.selected);
				}
			}
			if( selected.length ){
				output = settings.mask.replace('$', selected.length).replace('%', selected.join(settings.maskJoin));
			}
			title.innerHTML = output;
		}
		function setListeners(elem){
			var select = elem.querySelector(settings.selector),
				title = elem.querySelector('.'+classes.title),
				drop = elem.querySelector('.'+classes.options);


			select.setAttribute( attributes.selectReady , '');

			title.addEventListener('click', function(event){
				toggleVisible(elem);
			}, false);
			select.addEventListener('change', function(){
				redraw(elem);
			}, false);
			drop.addEventListener('click', function(event){
				var elem = event.target.closest('.' + classes.item),
					outer = event.target.closest('.' + classes.outer),
					select;

				if(!elem){
					return;
				}

				select = outer.querySelector( settings.selector );

				if(select.multiple && event.ctrlKey){
					toggleOption(elem, true);
					return;
				}
				toggleOption(elem);
				toggleVisible(elem.closest('.' + classes.outer));
			}, false);
		}
		function toggleOption(elem, multiple){
			var index = elem.getAttribute(attributes.index),
				outer = elem.closest('.'+classes.outer),
				select = outer.querySelector(settings.selector),
				options = select.options,
				option = options[index];

			if (!multiple){
				for( var i = 0, size = options.length; i < size; i++){
					options[i].selected = false;
				}
			}
			option.selected = option.selected ? false : true;

			if ("createEvent" in document) {
				var evt = document.createEvent("HTMLEvents");
				evt.initEvent("change", false, true);
				select.dispatchEvent(evt);
			}
			else {
				select.fireEvent("onchange");
			}
		}
		function toggleVisible(elem){
			elem.classList.toggle(classes.open);
		}
		function createStructure(select){
			var outer = createDOM('div', classes.outer),
				title = createDOM('div', classes.title),
				container = createDOM('div', classes.options),
				label = createDOM('li', classes.label),
				optgroup = createDOM('ul', classes.optgroup),
				list = createDOM('ul', classes.list),
				item = createDOM('li', classes.item),
				options = select.options;

			if(mobile){
				addClass(outer, classes.mobile);
			}

			outer.appendChild(title);
			outer.appendChild(container);

			appendOptionsTo(container);


			function appendOptionsTo(){
				var groupLabelLast = null,
					groupLabel = null,
					ul= list.cloneNode(true), labelElem;

				for( var i = 0, size = options.length; i < size; i++){
					var elem = item.cloneNode(true),
					option = options[i];
					groupLabel = option.parentNode.getAttribute('label');
					if(groupLabelLast != groupLabel){
						if( ul ){
							container.appendChild(ul);
						}
						if(groupLabel == null){
							ul = list.cloneNode(true);
						} else {
							ul = optgroup.cloneNode(true);
							labelElem = label.cloneNode(true);
							labelElem.innerHTML = groupLabel;
							ul.appendChild(labelElem);
						}
					}
					groupLabelLast = groupLabel;
					elem.setAttribute(attributes.value, option.value);
					elem.setAttribute(attributes.index, option.index);
					elem.innerHTML = option.text;
					ul.appendChild(elem);
				}
				container.appendChild(ul);
			}

			return outer;
		}
	}

	// Общие функции
	function iosBugFix(select){
		var fix = createDOM('optgroup');

		fix.disabled = true;
		fix.hidden = true;

		select.insertBefore(fix, select.firstChild);
	}
	function extend(){
		for(var i=1; i<arguments.length; i++){
			for(var key in arguments[i]){
				if(arguments[i].hasOwnProperty(key)){
					arguments[0][key] = arguments[i][key];
				}
			}
		}
		return arguments[0];
	}
	function wrapElem(elem, wrapper){
		var clone = elem.cloneNode(true),
			parent = elem.parentNode;
		wrapper.appendChild(clone);
		parent.insertBefore(wrapper, elem);
		parent.removeChild(elem);
	}
	function createDOM(tag, cls){
		var elem = document.createElement(tag);
		if( cls ){
			addClass(elem, cls);
		}
		return elem;
	}
	function addClass(elem, cls){
		elem.classList.add(cls);
	}
	function removeClass(elem, cls){
		elem.classList.remove(cls);
	}
	function mobileDetect(){
		var browser = {
			Android: function() {
				return navigator.userAgent.match(/Android/i) ? 'android' : false;
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i) ? 'blackberry' : false;
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? 'ios' : false;
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i) ? 'operamini' : false;
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i) ? 'ie' : false;
			},
			any: function(){
				return ( browser.Android() || browser.BlackBerry() || browser.iOS() || browser.Opera() || browser.Windows() );
			}
		};
		return browser;
	}
	function forEachElem(elems, fn){
		Array.prototype.slice.call(elems).forEach(fn);
	}

	window.tastySelect = start;
})(window);
(function(elem) {
	var matches = elem.matches || elem.matchesSelector || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector || elem.oMatchesSelector;
	!matches ? (elem.matches = elem.matchesSelector = function matches(selector) {
		var matches = document.querySelectorAll(selector);
		var th = this;
		return Array.prototype.some.call(matches, function(el) {
			return el === th;
		});
	}) : (elem.matches = elem.matchesSelector = matches);
})(Element.prototype);
(function(elem) {
	elem.closest = elem.closest || function closest(selector) {
		if (!this) return null;
		if (this.matches(selector)) return this;
		if (!this.parentElement) {return null}
		else return this.parentElement.closest(selector)
	  };
}(Element.prototype));