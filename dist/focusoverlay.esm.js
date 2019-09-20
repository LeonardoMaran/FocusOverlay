function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode:  'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var _functionToString = _shared('native-function-to-string', Function.toString);

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');

var TO_STRING = 'toString';
var TPL = ('' + _functionToString).split(TO_STRING);

_core.inspectSource = function (it) {
  return _functionToString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)






var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
var _addToUnscopables = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

// https://github.com/tc39/Array.prototype.includes

var $includes = _arrayIncludes(true);

_export(_export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_addToUnscopables('includes');

// 7.2.8 IsRegExp(argument)


var MATCH = _wks('match');
var _isRegexp = function (it) {
  var isRegExp;
  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
};

// helper for String#{startsWith, endsWith, includes}



var _stringContext = function (that, searchString, NAME) {
  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(_defined(that));
};

var MATCH$1 = _wks('match');
var _failsIsRegexp = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH$1] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

var INCLUDES = 'includes';

_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~_stringContext(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
((function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var el = this;

      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);

      return null;
    };
  }
})());

var dP$1 = _objectDp.f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || _descriptors && dP$1(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

function extend() {
  var obj,
      name,
      copy,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length;

  for (; i < length; i++) {
    if ((obj = arguments[i]) !== null) {
      for (name in obj) {
        copy = obj[name];

        if (target === copy) {
          continue;
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
}

// https://stackoverflow.com/a/32623832/8862005
function absolutePosition(el) {
  var found,
      left = 0,
      top = 0,
      width = 0,
      height = 0,
      offsetBase = absolutePosition.offsetBase;

  if (!offsetBase && document.body) {
    offsetBase = absolutePosition.offsetBase = document.createElement('div');
    offsetBase.style.cssText = 'position:absolute;left:0;top:0';
    document.body.appendChild(offsetBase);
  }

  if (el && el.ownerDocument === document && 'getBoundingClientRect' in el && offsetBase) {
    var boundingRect = el.getBoundingClientRect();
    var baseRect = offsetBase.getBoundingClientRect();
    found = true;
    left = boundingRect.left - baseRect.left;
    top = boundingRect.top - baseRect.top;
    width = boundingRect.right - boundingRect.left;
    height = boundingRect.bottom - boundingRect.top;
  }

  return {
    found: found,
    left: left,
    top: top,
    width: width,
    height: height,
    right: left + width,
    bottom: top + height
  };
}

/**
 * Cross browser transitionEnd event
 * https://davidwalsh.name/css-animation-callback
 * @return {String} Browser's supported transitionend type
 */
function whichTransitionEvent () {
  var el = document.createElement('fakeelement');
  var transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };

  for (var t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

/**
 * The plugin constructor
 * @param {Element|String} element The DOM element where plugin is applied
 * @param {Object} options Options passed to the constructor
 */

var FocusOverlay =
/*#__PURE__*/
function () {
  function FocusOverlay(element, options) {
    _classCallCheck(this, FocusOverlay);

    this.active = false;
    this.scopedEl;
    this.focusBox;
    this.previousTarget;
    this.nextTarget;
    this.timeout = 0;
    this.inScope = false;
    this.transitionEvent = whichTransitionEvent();
    this.options = extend({
      // Class added to the focus box
      class: 'focus-overlay',
      // Class added while the focus box is active
      activeClass: 'focus-overlay-active',
      // Class added while the focus box is animating
      animatingClass: 'focus-overlay-animating',
      // Class added to the target element
      targetClass: 'focus-overlay-target',
      // z-index of focus box
      zIndex: 9001,
      // Duration of the animatingClass (milliseconds)
      duration: 500,
      // Removes activeClass after duration
      inactiveAfterDuration: false,
      // Tab, Arrow Keys, Enter, Space, Shift, Ctrl, Alt, ESC
      triggerKeys: [9, 36, 37, 38, 39, 40, 13, 32, 16, 17, 18, 27],
      // Make focus box inactive when a non specified key is pressed
      inactiveOnNonTriggerKey: true,
      // Make focus box inactive when a user clicks
      inactiveOnClick: true,
      // Force the box to always stay active. Overrides everything
      alwaysActive: false,
      // Reposition focus box on transitionEnd for focused elements
      watchTransitionEnd: true,
      // Initialization event
      onInit: function onInit() {},
      // Before focus box move
      onBeforeMove: function onBeforeMove() {},
      // After focus box move
      onAfterMove: function onAfterMove() {},
      // After FocusOverlay is destroyed
      onDestroy: function onDestroy() {}
    }, options || {});
    /**
     * Setup main scoped element. First expect a DOM element, then
     * fallback to a string querySelector, and finally fallback to <body>
     */

    if (element instanceof Element) {
      this.scopedEl = element;
    } else if (typeof element === 'string' || element instanceof String) {
      this.scopedEl = document.querySelector(element);
    } else {
      this.scopedEl = document.querySelector('body');
    } // Binding


    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
    this.moveFocusBox = this.moveFocusBox.bind(this);
    this.stop = this.stop.bind(this); // Initialize

    this.init();
  }
  /**
   * Initialize the plugin instance. Add event listeners
   * to the window depending on which options are enabled.
   */


  _createClass(FocusOverlay, [{
    key: "init",
    value: function init() {
      if (this.options.alwaysActive) {
        this.active = true;
        window.addEventListener('focusin', this.onFocusHandler, true);
      } else {
        window.addEventListener('keydown', this.onKeyDownHandler, false);

        if (this.options.inactiveOnClick) {
          window.addEventListener('mousedown', this.stop, false);
        }
      }

      this._createFocusBox();

      this.options.onInit(this);
    }
    /**
     * Handler method for the keydown event
     * @param {Event}
     */

  }, {
    key: "onKeyDownHandler",
    value: function onKeyDownHandler(e) {
      var _this = this;

      var code = e.which; // Checks if the key pressed is in the triggerKeys array

      if (this.options.triggerKeys.includes(code)) {
        if (this.active === false) {
          this.active = true;
          window.addEventListener('focusin', this.onFocusHandler, true);
        }
        /**
         * Iframes don't trigger a focus event so I hacked this check in there.
         * Slight delay on the setTimeout for cross browser reasons.
         * See https://stackoverflow.com/a/28932220/8862005
         */


        setTimeout(function () {
          var activeEl = document.activeElement;
          /**
           * Check if the active element is an iframe, is part of
           * the scope, and that focusOverlay is currently active.
           */

          if (activeEl instanceof HTMLIFrameElement && _this.scopedEl.contains(activeEl) && _this.active === true) {
            _this.moveFocusBox(activeEl);
          }
        }, 5);
      } else if (this.options.inactiveOnNonTriggerKey) {
        this.stop();
      }
    }
    /**
     * Creates the focusBox DIV element and appends itself to the DOM
     */

  }, {
    key: "_createFocusBox",
    value: function _createFocusBox() {
      this.focusBox = document.createElement('div');
      this.focusBox.setAttribute('aria-hidden', 'true');
      this.focusBox.classList.add(this.options.class);
      Object.assign(this.focusBox.style, {
        position: 'absolute',
        zIndex: this.options.zIndex,
        pointerEvents: 'none'
      });
      this.scopedEl.insertAdjacentElement('beforeend', this.focusBox);
    }
    /**
     * Cleanup method that runs whenever variables,
     * methods, etc. needs to be refreshed.
     */

  }, {
    key: "_cleanup",
    value: function _cleanup() {
      // Remove previous target's classes and event listeners
      if (this.nextTarget != null) {
        this.previousTarget = this.nextTarget;
        this.previousTarget.classList.remove(this.options.targetClass);
        this.previousTarget.removeEventListener(this.transitionEvent, this.moveFocusBox);
      }
    }
    /**
     * Handler method for the focus event
     * @param {Event}
     */

  }, {
    key: "onFocusHandler",
    value: function onFocusHandler(e) {
      var focusedEl = e.target;

      this._cleanup(); // If the focused element is a child of the main element


      if (this.scopedEl.contains(focusedEl)) {
        // Variable to be added to onBeforeMove event later
        var currentEl = this.nextTarget;
        this.inScope = true; // If the focused element has data-focus then assign a new $target

        if (focusedEl.getAttribute('data-focus') !== null) {
          var focusSelector = focusedEl.getAttribute('data-focus');
          this.nextTarget = document.querySelector("[data-focus='".concat(focusSelector, "']")); // If the focused element has data-focus-label then focus the associated label
        } else if (focusedEl.getAttribute('data-focus-label') !== null) {
          var associatedEl = document.querySelector("[for='".concat(focusedEl.id, "']")); // If there is no label pointing directly to the focused element, then point to the wrapping label

          if (associatedEl === null) {
            associatedEl = focusedEl.closest('label');
          }

          this.nextTarget = associatedEl; // If the focused element has data-ignore then stop
        } else if (focusedEl.getAttribute('data-focus-ignore') !== null) {
          return; // If none of the above is true then set the target as the currently focused element
        } else {
          this.nextTarget = focusedEl;
        }
        /**
         * Clear the timeout of the duration just in case if the
         * user focuses a new element before the timer runs out.
         */


        clearTimeout(this.timeout);
        /**
         * If transitionEnd is supported and watchTransitionEnd is enabled
         * add a check to make the focusBox recalculate its position
         * if the focused element has a long transition on focus.
         */

        if (this.transitionEvent && this.options.watchTransitionEnd) {
          this.nextTarget.addEventListener(this.transitionEvent, this.moveFocusBox);
        }

        this.options.onBeforeMove(currentEl, this.nextTarget, this);
        this.moveFocusBox(this.nextTarget); // If the focused element is a child of the main element but alwaysActive do nothing
      } else if (this.options.alwaysActive) {
        this.inScope = false; // If the element focused is not a child of the main element stop being active
      } else {
        this.inScope = false;
        this.stop();
      }
    }
    /**
     * Ends the active state of the focusBox
     */

  }, {
    key: "stop",
    value: function stop() {
      this.active = false;
      window.removeEventListener('focusin', this.onFocusHandler, true);

      this._cleanup();

      this.focusBox.classList.remove(this.options.activeClass);
    }
    /**
     * Moves the focusBox to a target element
     * @param {Element|Event} targetEl
     */

  }, {
    key: "moveFocusBox",
    value: function moveFocusBox(targetEl) {
      var _this2 = this;

      // When passed as a handler we'll get the event target
      if (targetEl instanceof Event) targetEl = document.activeElement; // Marking current element as being targeted

      targetEl.classList.add(this.options.targetClass);
      /**
       * Check to see if what we're targeting is actually still there.
       * Then check to see if we're targeting a DOM element. There was
       * an IE issue with the document and window sometimes being targeted
       * and throwing errors since you can't get the position values of those.
       */

      if (document.body.contains(targetEl) && targetEl instanceof Element) {
        var rect = absolutePosition(targetEl);
        var width = "".concat(rect.width, "px");
        var height = "".concat(rect.height, "px");
        var left = "".concat(rect.left, "px");
        var top = "".concat(rect.top, "px");
        this.focusBox.classList.add(this.options.animatingClass);
        this.focusBox.classList.add(this.options.activeClass);
        Object.assign(this.focusBox.style, {
          width: width,
          height: height,
          left: left,
          top: top
        }); // Remove animating/active class after the duration ends.

        this.timeout = setTimeout(function () {
          _this2.focusBox.classList.remove(_this2.options.animatingClass);

          if (_this2.options.inactiveAfterDuration) {
            _this2.focusBox.classList.remove(_this2.options.activeClass);
          }

          _this2.options.onAfterMove(_this2.previousTarget, targetEl, _this2);
        }, this.options.duration);
      } else {
        this._cleanup();
      }
    }
    /**
     * The destroy method to free resources used by the plugin:
     * References, unregister listeners, etc.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      // Remove focusBox
      this.focusBox.parentNode.removeChild(this.focusBox); // Remove any extra classes given to other elements if they exist

      this.previousTarget != null && this.previousTarget.classList.remove(this.options.targetClass);
      this.nextTarget != null && this.nextTarget.classList.remove(this.options.targetClass); // Remove event listeners

      window.removeEventListener('focusin', this.onFocusHandler, true);
      window.removeEventListener('keydown', this.onKeyDownHandler, false);
      window.removeEventListener('mousedown', this.stop, false);
      this.options.onDestroy(this);
    }
  }]);

  return FocusOverlay;
}();

export default FocusOverlay;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXNvdmVybGF5LmVzbS5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29yZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ZhaWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZHAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faGlkZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hhcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3VpZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Z1bmN0aW9uLXRvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2V4cG9ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lvYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kZWZpbmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL193a3MuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5hcnJheS5pbmNsdWRlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLXJlZ2V4cC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1jb250ZXh0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZmFpbHMtaXMtcmVnZXhwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmluY2x1ZGVzLmpzIiwiLi4vc3JjL3BvbHlmaWxscy9jbG9zZXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZS5qcyIsIi4uL3NyYy91dGlscy9leHRlbmQuanMiLCIuLi9zcmMvdXRpbHMvYWJzb2x1dGVQb3NpdGlvbi5qcyIsIi4uL3NyYy91dGlscy93aGljaFRyYW5zaXRpb25FdmVudC5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi42LjknIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuIiwidmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiBjb3JlLnZlcnNpb24sXG4gIG1vZGU6IHJlcXVpcmUoJy4vX2xpYnJhcnknKSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE5IERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCduYXRpdmUtZnVuY3Rpb24tdG8tc3RyaW5nJywgRnVuY3Rpb24udG9TdHJpbmcpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgU1JDID0gcmVxdWlyZSgnLi9fdWlkJykoJ3NyYycpO1xudmFyICR0b1N0cmluZyA9IHJlcXVpcmUoJy4vX2Z1bmN0aW9uLXRvLXN0cmluZycpO1xudmFyIFRPX1NUUklORyA9ICd0b1N0cmluZyc7XG52YXIgVFBMID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5yZXF1aXJlKCcuL19jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gJHRvU3RyaW5nLmNhbGwoaXQpO1xufTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsLCBzYWZlKSB7XG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nO1xuICBpZiAoaXNGdW5jdGlvbikgaGFzKHZhbCwgJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICBpZiAoT1trZXldID09PSB2YWwpIHJldHVybjtcbiAgaWYgKGlzRnVuY3Rpb24pIGhhcyh2YWwsIFNSQykgfHwgaGlkZSh2YWwsIFNSQywgT1trZXldID8gJycgKyBPW2tleV0gOiBUUEwuam9pbihTdHJpbmcoa2V5KSkpO1xuICBpZiAoTyA9PT0gZ2xvYmFsKSB7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2UgaWYgKCFzYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgfSBlbHNlIGlmIChPW2tleV0pIHtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH1cbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KTtcbiAgdmFyIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IChvd24gPyB0YXJnZXQgOiBzb3VyY2UpW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBleHAgPSBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgaWYgKHRhcmdldCkgcmVkZWZpbmUodGFyZ2V0LCBrZXksIG91dCwgdHlwZSAmICRleHBvcnQuVSk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYgKGV4cG9ydHNba2V5XSAhPSBvdXQpIGhpZGUoZXhwb3J0cywga2V5LCBleHApO1xuICAgIGlmIChJU19QUk9UTyAmJiBleHBQcm90b1trZXldICE9IG91dCkgZXhwUHJvdG9ba2V5XSA9IG91dDtcbiAgfVxufTtcbmdsb2JhbC5jb3JlID0gY29yZTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG4iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcbiIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikge1xuICAgICAga2V5ID0ga2V5c1tqKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBpc0VudW0uY2FsbChTLCBrZXkpKSBUW2tleV0gPSBTW2tleV07XG4gICAgfVxuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG4iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuIiwiLy8gMjIuMS4zLjMxIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxudmFyIFVOU0NPUEFCTEVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3Vuc2NvcGFibGVzJyk7XG52YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcbmlmIChBcnJheVByb3RvW1VOU0NPUEFCTEVTXSA9PSB1bmRlZmluZWQpIHJlcXVpcmUoJy4vX2hpZGUnKShBcnJheVByb3RvLCBVTlNDT1BBQkxFUywge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L0FycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciAkaW5jbHVkZXMgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKHRydWUpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0FycmF5Jywge1xuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoZWwgLyogLCBmcm9tSW5kZXggPSAwICovKSB7XG4gICAgcmV0dXJuICRpbmNsdWRlcyh0aGlzLCBlbCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcblxucmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJykoJ2luY2x1ZGVzJyk7XG4iLCIvLyA3LjIuOCBJc1JlZ0V4cChhcmd1bWVudClcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIE1BVENIID0gcmVxdWlyZSgnLi9fd2tzJykoJ21hdGNoJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXNSZWdFeHA7XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgKChpc1JlZ0V4cCA9IGl0W01BVENIXSkgIT09IHVuZGVmaW5lZCA/ICEhaXNSZWdFeHAgOiBjb2YoaXQpID09ICdSZWdFeHAnKTtcbn07XG4iLCIvLyBoZWxwZXIgZm9yIFN0cmluZyN7c3RhcnRzV2l0aCwgZW5kc1dpdGgsIGluY2x1ZGVzfVxudmFyIGlzUmVnRXhwID0gcmVxdWlyZSgnLi9faXMtcmVnZXhwJyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGhhdCwgc2VhcmNoU3RyaW5nLCBOQU1FKSB7XG4gIGlmIChpc1JlZ0V4cChzZWFyY2hTdHJpbmcpKSB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZyMnICsgTkFNRSArIFwiIGRvZXNuJ3QgYWNjZXB0IHJlZ2V4IVwiKTtcbiAgcmV0dXJuIFN0cmluZyhkZWZpbmVkKHRoYXQpKTtcbn07XG4iLCJ2YXIgTUFUQ0ggPSByZXF1aXJlKCcuL193a3MnKSgnbWF0Y2gnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSkge1xuICB2YXIgcmUgPSAvLi87XG4gIHRyeSB7XG4gICAgJy8uLydbS0VZXShyZSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0cnkge1xuICAgICAgcmVbTUFUQ0hdID0gZmFsc2U7XG4gICAgICByZXR1cm4gIScvLi8nW0tFWV0ocmUpO1xuICAgIH0gY2F0Y2ggKGYpIHsgLyogZW1wdHkgKi8gfVxuICB9IHJldHVybiB0cnVlO1xufTtcbiIsIi8vIDIxLjEuMy43IFN0cmluZy5wcm90b3R5cGUuaW5jbHVkZXMoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbiA9IDApXG4ndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvbnRleHQgPSByZXF1aXJlKCcuL19zdHJpbmctY29udGV4dCcpO1xudmFyIElOQ0xVREVTID0gJ2luY2x1ZGVzJztcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscy1pcy1yZWdleHAnKShJTkNMVURFUyksICdTdHJpbmcnLCB7XG4gIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyhzZWFyY2hTdHJpbmcgLyogLCBwb3NpdGlvbiA9IDAgKi8pIHtcbiAgICByZXR1cm4gISF+Y29udGV4dCh0aGlzLCBzZWFyY2hTdHJpbmcsIElOQ0xVREVTKVxuICAgICAgLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuIiwiLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvY2xvc2VzdCNQb2x5ZmlsbFxyXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24oKSB7XHJcbiAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XHJcbiAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID1cclxuICAgICAgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHxcclxuICAgICAgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0KSB7XHJcbiAgICBFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24ocykge1xyXG4gICAgICB2YXIgZWwgPSB0aGlzO1xyXG5cclxuICAgICAgZG8ge1xyXG4gICAgICAgIGlmIChlbC5tYXRjaGVzKHMpKSByZXR1cm4gZWw7XHJcbiAgICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50IHx8IGVsLnBhcmVudE5vZGU7XHJcbiAgICAgIH0gd2hpbGUgKGVsICE9PSBudWxsICYmIGVsLm5vZGVUeXBlID09PSAxKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gIH1cclxufSkoKTtcclxuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBGUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG52YXIgbmFtZVJFID0gL15cXHMqZnVuY3Rpb24gKFteIChdKikvO1xudmFyIE5BTUUgPSAnbmFtZSc7XG5cbi8vIDE5LjIuNC4yIG5hbWVcbk5BTUUgaW4gRlByb3RvIHx8IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgZFAoRlByb3RvLCBOQU1FLCB7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoJycgKyB0aGlzKS5tYXRjaChuYW1lUkUpWzFdO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbn0pO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0ZW5kKCkge1xyXG4gIHZhciBvYmosXHJcbiAgICBuYW1lLFxyXG4gICAgY29weSxcclxuICAgIHRhcmdldCA9IGFyZ3VtZW50c1swXSB8fCB7fSxcclxuICAgIGkgPSAxLFxyXG4gICAgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcclxuXHJcbiAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKChvYmogPSBhcmd1bWVudHNbaV0pICE9PSBudWxsKSB7XHJcbiAgICAgIGZvciAobmFtZSBpbiBvYmopIHtcclxuICAgICAgICBjb3B5ID0gb2JqW25hbWVdO1xyXG5cclxuICAgICAgICBpZiAodGFyZ2V0ID09PSBjb3B5KSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvcHkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGFyZ2V0W25hbWVdID0gY29weTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRhcmdldDtcclxufVxyXG4iLCIvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzI2MjM4MzIvODg2MjAwNVxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhYnNvbHV0ZVBvc2l0aW9uKGVsKSB7XHJcbiAgdmFyIGZvdW5kLFxyXG4gICAgbGVmdCA9IDAsXHJcbiAgICB0b3AgPSAwLFxyXG4gICAgd2lkdGggPSAwLFxyXG4gICAgaGVpZ2h0ID0gMCxcclxuICAgIG9mZnNldEJhc2UgPSBhYnNvbHV0ZVBvc2l0aW9uLm9mZnNldEJhc2U7XHJcbiAgaWYgKCFvZmZzZXRCYXNlICYmIGRvY3VtZW50LmJvZHkpIHtcclxuICAgIG9mZnNldEJhc2UgPSBhYnNvbHV0ZVBvc2l0aW9uLm9mZnNldEJhc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG9mZnNldEJhc2Uuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjAnO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvZmZzZXRCYXNlKTtcclxuICB9XHJcbiAgaWYgKFxyXG4gICAgZWwgJiZcclxuICAgIGVsLm93bmVyRG9jdW1lbnQgPT09IGRvY3VtZW50ICYmXHJcbiAgICAnZ2V0Qm91bmRpbmdDbGllbnRSZWN0JyBpbiBlbCAmJlxyXG4gICAgb2Zmc2V0QmFzZVxyXG4gICkge1xyXG4gICAgdmFyIGJvdW5kaW5nUmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgdmFyIGJhc2VSZWN0ID0gb2Zmc2V0QmFzZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgIGxlZnQgPSBib3VuZGluZ1JlY3QubGVmdCAtIGJhc2VSZWN0LmxlZnQ7XHJcbiAgICB0b3AgPSBib3VuZGluZ1JlY3QudG9wIC0gYmFzZVJlY3QudG9wO1xyXG4gICAgd2lkdGggPSBib3VuZGluZ1JlY3QucmlnaHQgLSBib3VuZGluZ1JlY3QubGVmdDtcclxuICAgIGhlaWdodCA9IGJvdW5kaW5nUmVjdC5ib3R0b20gLSBib3VuZGluZ1JlY3QudG9wO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgZm91bmQ6IGZvdW5kLFxyXG4gICAgbGVmdDogbGVmdCxcclxuICAgIHRvcDogdG9wLFxyXG4gICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICByaWdodDogbGVmdCArIHdpZHRoLFxyXG4gICAgYm90dG9tOiB0b3AgKyBoZWlnaHRcclxuICB9O1xyXG59XHJcbiIsIi8qKlxyXG4gKiBDcm9zcyBicm93c2VyIHRyYW5zaXRpb25FbmQgZXZlbnRcclxuICogaHR0cHM6Ly9kYXZpZHdhbHNoLm5hbWUvY3NzLWFuaW1hdGlvbi1jYWxsYmFja1xyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IEJyb3dzZXIncyBzdXBwb3J0ZWQgdHJhbnNpdGlvbmVuZCB0eXBlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcclxuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2VlbGVtZW50Jyk7XHJcbiAgY29uc3QgdHJhbnNpdGlvbnMgPSB7XHJcbiAgICB0cmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCcsXHJcbiAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kJyxcclxuICAgIE1velRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcclxuICAgIFdlYmtpdFRyYW5zaXRpb246ICd3ZWJraXRUcmFuc2l0aW9uRW5kJ1xyXG4gIH07XHJcblxyXG4gIGZvciAobGV0IHQgaW4gdHJhbnNpdGlvbnMpIHtcclxuICAgIGlmIChlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB0cmFuc2l0aW9uc1t0XTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0ICcuL3N0eWxlcy5jc3MnO1xyXG5pbXBvcnQgJy4vcG9seWZpbGxzL2Nsb3Nlc3QnO1xyXG5pbXBvcnQgZXh0ZW5kIGZyb20gJy4vdXRpbHMvZXh0ZW5kJztcclxuaW1wb3J0IGFic29sdXRlUG9zaXRpb24gZnJvbSAnLi91dGlscy9hYnNvbHV0ZVBvc2l0aW9uJztcclxuaW1wb3J0IHdoaWNoVHJhbnNpdGlvbkV2ZW50IGZyb20gJy4vdXRpbHMvd2hpY2hUcmFuc2l0aW9uRXZlbnQnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBwbHVnaW4gY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtFbGVtZW50fFN0cmluZ30gZWxlbWVudCBUaGUgRE9NIGVsZW1lbnQgd2hlcmUgcGx1Z2luIGlzIGFwcGxpZWRcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyBwYXNzZWQgdG8gdGhlIGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb2N1c092ZXJsYXkge1xyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLnNjb3BlZEVsO1xyXG4gICAgdGhpcy5mb2N1c0JveDtcclxuICAgIHRoaXMucHJldmlvdXNUYXJnZXQ7XHJcbiAgICB0aGlzLm5leHRUYXJnZXQ7XHJcbiAgICB0aGlzLnRpbWVvdXQgPSAwO1xyXG4gICAgdGhpcy5pblNjb3BlID0gZmFsc2U7XHJcbiAgICB0aGlzLnRyYW5zaXRpb25FdmVudCA9IHdoaWNoVHJhbnNpdGlvbkV2ZW50KCk7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBleHRlbmQoe1xyXG4gICAgICAgIC8vIENsYXNzIGFkZGVkIHRvIHRoZSBmb2N1cyBib3hcclxuICAgICAgICBjbGFzczogJ2ZvY3VzLW92ZXJsYXknLFxyXG4gICAgICAgIC8vIENsYXNzIGFkZGVkIHdoaWxlIHRoZSBmb2N1cyBib3ggaXMgYWN0aXZlXHJcbiAgICAgICAgYWN0aXZlQ2xhc3M6ICdmb2N1cy1vdmVybGF5LWFjdGl2ZScsXHJcbiAgICAgICAgLy8gQ2xhc3MgYWRkZWQgd2hpbGUgdGhlIGZvY3VzIGJveCBpcyBhbmltYXRpbmdcclxuICAgICAgICBhbmltYXRpbmdDbGFzczogJ2ZvY3VzLW92ZXJsYXktYW5pbWF0aW5nJyxcclxuICAgICAgICAvLyBDbGFzcyBhZGRlZCB0byB0aGUgdGFyZ2V0IGVsZW1lbnRcclxuICAgICAgICB0YXJnZXRDbGFzczogJ2ZvY3VzLW92ZXJsYXktdGFyZ2V0JyxcclxuICAgICAgICAvLyB6LWluZGV4IG9mIGZvY3VzIGJveFxyXG4gICAgICAgIHpJbmRleDogOTAwMSxcclxuICAgICAgICAvLyBEdXJhdGlvbiBvZiB0aGUgYW5pbWF0aW5nQ2xhc3MgKG1pbGxpc2Vjb25kcylcclxuICAgICAgICBkdXJhdGlvbjogNTAwLFxyXG4gICAgICAgIC8vIFJlbW92ZXMgYWN0aXZlQ2xhc3MgYWZ0ZXIgZHVyYXRpb25cclxuICAgICAgICBpbmFjdGl2ZUFmdGVyRHVyYXRpb246IGZhbHNlLFxyXG4gICAgICAgIC8vIFRhYiwgQXJyb3cgS2V5cywgRW50ZXIsIFNwYWNlLCBTaGlmdCwgQ3RybCwgQWx0LCBFU0NcclxuICAgICAgICB0cmlnZ2VyS2V5czogWzksIDM2LCAzNywgMzgsIDM5LCA0MCwgMTMsIDMyLCAxNiwgMTcsIDE4LCAyN10sXHJcbiAgICAgICAgLy8gTWFrZSBmb2N1cyBib3ggaW5hY3RpdmUgd2hlbiBhIG5vbiBzcGVjaWZpZWQga2V5IGlzIHByZXNzZWRcclxuICAgICAgICBpbmFjdGl2ZU9uTm9uVHJpZ2dlcktleTogdHJ1ZSxcclxuICAgICAgICAvLyBNYWtlIGZvY3VzIGJveCBpbmFjdGl2ZSB3aGVuIGEgdXNlciBjbGlja3NcclxuICAgICAgICBpbmFjdGl2ZU9uQ2xpY2s6IHRydWUsXHJcbiAgICAgICAgLy8gRm9yY2UgdGhlIGJveCB0byBhbHdheXMgc3RheSBhY3RpdmUuIE92ZXJyaWRlcyBldmVyeXRoaW5nXHJcbiAgICAgICAgYWx3YXlzQWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAvLyBSZXBvc2l0aW9uIGZvY3VzIGJveCBvbiB0cmFuc2l0aW9uRW5kIGZvciBmb2N1c2VkIGVsZW1lbnRzXHJcbiAgICAgICAgd2F0Y2hUcmFuc2l0aW9uRW5kOiB0cnVlLFxyXG4gICAgICAgIC8vIEluaXRpYWxpemF0aW9uIGV2ZW50XHJcbiAgICAgICAgb25Jbml0OiBmdW5jdGlvbiAoKSB7fSxcclxuICAgICAgICAvLyBCZWZvcmUgZm9jdXMgYm94IG1vdmVcclxuICAgICAgICBvbkJlZm9yZU1vdmU6IGZ1bmN0aW9uICgpIHt9LFxyXG4gICAgICAgIC8vIEFmdGVyIGZvY3VzIGJveCBtb3ZlXHJcbiAgICAgICAgb25BZnRlck1vdmU6IGZ1bmN0aW9uICgpIHt9LFxyXG4gICAgICAgIC8vIEFmdGVyIEZvY3VzT3ZlcmxheSBpcyBkZXN0cm95ZWRcclxuICAgICAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uICgpIHt9XHJcbiAgICAgIH0sXHJcbiAgICAgIG9wdGlvbnMgfHwge31cclxuICAgICk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXR1cCBtYWluIHNjb3BlZCBlbGVtZW50LiBGaXJzdCBleHBlY3QgYSBET00gZWxlbWVudCwgdGhlblxyXG4gICAgICogZmFsbGJhY2sgdG8gYSBzdHJpbmcgcXVlcnlTZWxlY3RvciwgYW5kIGZpbmFsbHkgZmFsbGJhY2sgdG8gPGJvZHk+XHJcbiAgICAgKi9cclxuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG4gICAgICB0aGlzLnNjb3BlZEVsID0gZWxlbWVudDtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnIHx8IGVsZW1lbnQgaW5zdGFuY2VvZiBTdHJpbmcpIHtcclxuICAgICAgdGhpcy5zY29wZWRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNjb3BlZEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEJpbmRpbmdcclxuICAgIHRoaXMub25LZXlEb3duSGFuZGxlciA9IHRoaXMub25LZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vbkZvY3VzSGFuZGxlciA9IHRoaXMub25Gb2N1c0hhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMubW92ZUZvY3VzQm94ID0gdGhpcy5tb3ZlRm9jdXNCb3guYmluZCh0aGlzKTtcclxuICAgIHRoaXMuc3RvcCA9IHRoaXMuc3RvcC5iaW5kKHRoaXMpO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemVcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgcGx1Z2luIGluc3RhbmNlLiBBZGQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICogdG8gdGhlIHdpbmRvdyBkZXBlbmRpbmcgb24gd2hpY2ggb3B0aW9ucyBhcmUgZW5hYmxlZC5cclxuICAgKi9cclxuICBpbml0KCkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbHdheXNBY3RpdmUpIHtcclxuICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0hhbmRsZXIsIHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bkhhbmRsZXIsIGZhbHNlKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuaW5hY3RpdmVPbkNsaWNrKSB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuc3RvcCwgZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY3JlYXRlRm9jdXNCb3goKTtcclxuICAgIHRoaXMub3B0aW9ucy5vbkluaXQodGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVyIG1ldGhvZCBmb3IgdGhlIGtleWRvd24gZXZlbnRcclxuICAgKiBAcGFyYW0ge0V2ZW50fVxyXG4gICAqL1xyXG4gIG9uS2V5RG93bkhhbmRsZXIoZSkge1xyXG4gICAgY29uc3QgY29kZSA9IGUud2hpY2g7XHJcblxyXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSBrZXkgcHJlc3NlZCBpcyBpbiB0aGUgdHJpZ2dlcktleXMgYXJyYXlcclxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJpZ2dlcktleXMuaW5jbHVkZXMoY29kZSkpIHtcclxuICAgICAgaWYgKHRoaXMuYWN0aXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0hhbmRsZXIsIHRydWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogSWZyYW1lcyBkb24ndCB0cmlnZ2VyIGEgZm9jdXMgZXZlbnQgc28gSSBoYWNrZWQgdGhpcyBjaGVjayBpbiB0aGVyZS5cclxuICAgICAgICogU2xpZ2h0IGRlbGF5IG9uIHRoZSBzZXRUaW1lb3V0IGZvciBjcm9zcyBicm93c2VyIHJlYXNvbnMuXHJcbiAgICAgICAqIFNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjg5MzIyMjAvODg2MjAwNVxyXG4gICAgICAgKi9cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlRWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDaGVjayBpZiB0aGUgYWN0aXZlIGVsZW1lbnQgaXMgYW4gaWZyYW1lLCBpcyBwYXJ0IG9mXHJcbiAgICAgICAgICogdGhlIHNjb3BlLCBhbmQgdGhhdCBmb2N1c092ZXJsYXkgaXMgY3VycmVudGx5IGFjdGl2ZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBhY3RpdmVFbCBpbnN0YW5jZW9mIEhUTUxJRnJhbWVFbGVtZW50ICYmXHJcbiAgICAgICAgICB0aGlzLnNjb3BlZEVsLmNvbnRhaW5zKGFjdGl2ZUVsKSAmJlxyXG4gICAgICAgICAgdGhpcy5hY3RpdmUgPT09IHRydWVcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMubW92ZUZvY3VzQm94KGFjdGl2ZUVsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDUpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuaW5hY3RpdmVPbk5vblRyaWdnZXJLZXkpIHtcclxuICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIHRoZSBmb2N1c0JveCBESVYgZWxlbWVudCBhbmQgYXBwZW5kcyBpdHNlbGYgdG8gdGhlIERPTVxyXG4gICAqL1xyXG4gIF9jcmVhdGVGb2N1c0JveCgpIHtcclxuICAgIHRoaXMuZm9jdXNCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZm9jdXNCb3guc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcbiAgICB0aGlzLmZvY3VzQm94LmNsYXNzTGlzdC5hZGQodGhpcy5vcHRpb25zLmNsYXNzKTtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuZm9jdXNCb3guc3R5bGUsIHtcclxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgIHpJbmRleDogdGhpcy5vcHRpb25zLnpJbmRleCxcclxuICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNjb3BlZEVsLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgdGhpcy5mb2N1c0JveCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhbnVwIG1ldGhvZCB0aGF0IHJ1bnMgd2hlbmV2ZXIgdmFyaWFibGVzLFxyXG4gICAqIG1ldGhvZHMsIGV0Yy4gbmVlZHMgdG8gYmUgcmVmcmVzaGVkLlxyXG4gICAqL1xyXG4gIF9jbGVhbnVwKCkge1xyXG4gICAgLy8gUmVtb3ZlIHByZXZpb3VzIHRhcmdldCdzIGNsYXNzZXMgYW5kIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgaWYgKHRoaXMubmV4dFRhcmdldCAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMucHJldmlvdXNUYXJnZXQgPSB0aGlzLm5leHRUYXJnZXQ7XHJcbiAgICAgIHRoaXMucHJldmlvdXNUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLm9wdGlvbnMudGFyZ2V0Q2xhc3MpO1xyXG4gICAgICB0aGlzLnByZXZpb3VzVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uRXZlbnQsXHJcbiAgICAgICAgdGhpcy5tb3ZlRm9jdXNCb3hcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgbWV0aG9kIGZvciB0aGUgZm9jdXMgZXZlbnRcclxuICAgKiBAcGFyYW0ge0V2ZW50fVxyXG4gICAqL1xyXG4gIG9uRm9jdXNIYW5kbGVyKGUpIHtcclxuICAgIGNvbnN0IGZvY3VzZWRFbCA9IGUudGFyZ2V0O1xyXG5cclxuICAgIHRoaXMuX2NsZWFudXAoKTtcclxuXHJcbiAgICAvLyBJZiB0aGUgZm9jdXNlZCBlbGVtZW50IGlzIGEgY2hpbGQgb2YgdGhlIG1haW4gZWxlbWVudFxyXG4gICAgaWYgKHRoaXMuc2NvcGVkRWwuY29udGFpbnMoZm9jdXNlZEVsKSkge1xyXG4gICAgICAvLyBWYXJpYWJsZSB0byBiZSBhZGRlZCB0byBvbkJlZm9yZU1vdmUgZXZlbnQgbGF0ZXJcclxuICAgICAgY29uc3QgY3VycmVudEVsID0gdGhpcy5uZXh0VGFyZ2V0O1xyXG5cclxuICAgICAgdGhpcy5pblNjb3BlID0gdHJ1ZTtcclxuXHJcbiAgICAgIC8vIElmIHRoZSBmb2N1c2VkIGVsZW1lbnQgaGFzIGRhdGEtZm9jdXMgdGhlbiBhc3NpZ24gYSBuZXcgJHRhcmdldFxyXG4gICAgICBpZiAoZm9jdXNlZEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1mb2N1cycpICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgZm9jdXNTZWxlY3RvciA9IGZvY3VzZWRFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgdGhpcy5uZXh0VGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgIGBbZGF0YS1mb2N1cz0nJHtmb2N1c1NlbGVjdG9yfSddYFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBmb2N1c2VkIGVsZW1lbnQgaGFzIGRhdGEtZm9jdXMtbGFiZWwgdGhlbiBmb2N1cyB0aGUgYXNzb2NpYXRlZCBsYWJlbFxyXG4gICAgICB9IGVsc2UgaWYgKGZvY3VzZWRFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9jdXMtbGFiZWwnKSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGxldCBhc3NvY2lhdGVkRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZm9yPScke2ZvY3VzZWRFbC5pZH0nXWApO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBsYWJlbCBwb2ludGluZyBkaXJlY3RseSB0byB0aGUgZm9jdXNlZCBlbGVtZW50LCB0aGVuIHBvaW50IHRvIHRoZSB3cmFwcGluZyBsYWJlbFxyXG4gICAgICAgIGlmIChhc3NvY2lhdGVkRWwgPT09IG51bGwpIHtcclxuICAgICAgICAgIGFzc29jaWF0ZWRFbCA9IGZvY3VzZWRFbC5jbG9zZXN0KCdsYWJlbCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5uZXh0VGFyZ2V0ID0gYXNzb2NpYXRlZEVsO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgZm9jdXNlZCBlbGVtZW50IGhhcyBkYXRhLWlnbm9yZSB0aGVuIHN0b3BcclxuICAgICAgfSBlbHNlIGlmIChmb2N1c2VkRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWZvY3VzLWlnbm9yZScpICE9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBJZiBub25lIG9mIHRoZSBhYm92ZSBpcyB0cnVlIHRoZW4gc2V0IHRoZSB0YXJnZXQgYXMgdGhlIGN1cnJlbnRseSBmb2N1c2VkIGVsZW1lbnRcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm5leHRUYXJnZXQgPSBmb2N1c2VkRWw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBDbGVhciB0aGUgdGltZW91dCBvZiB0aGUgZHVyYXRpb24ganVzdCBpbiBjYXNlIGlmIHRoZVxyXG4gICAgICAgKiB1c2VyIGZvY3VzZXMgYSBuZXcgZWxlbWVudCBiZWZvcmUgdGhlIHRpbWVyIHJ1bnMgb3V0LlxyXG4gICAgICAgKi9cclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogSWYgdHJhbnNpdGlvbkVuZCBpcyBzdXBwb3J0ZWQgYW5kIHdhdGNoVHJhbnNpdGlvbkVuZCBpcyBlbmFibGVkXHJcbiAgICAgICAqIGFkZCBhIGNoZWNrIHRvIG1ha2UgdGhlIGZvY3VzQm94IHJlY2FsY3VsYXRlIGl0cyBwb3NpdGlvblxyXG4gICAgICAgKiBpZiB0aGUgZm9jdXNlZCBlbGVtZW50IGhhcyBhIGxvbmcgdHJhbnNpdGlvbiBvbiBmb2N1cy5cclxuICAgICAgICovXHJcbiAgICAgIGlmICh0aGlzLnRyYW5zaXRpb25FdmVudCAmJiB0aGlzLm9wdGlvbnMud2F0Y2hUcmFuc2l0aW9uRW5kKSB7XHJcbiAgICAgICAgdGhpcy5uZXh0VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICB0aGlzLnRyYW5zaXRpb25FdmVudCxcclxuICAgICAgICAgIHRoaXMubW92ZUZvY3VzQm94XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5vcHRpb25zLm9uQmVmb3JlTW92ZShjdXJyZW50RWwsIHRoaXMubmV4dFRhcmdldCwgdGhpcyk7XHJcbiAgICAgIHRoaXMubW92ZUZvY3VzQm94KHRoaXMubmV4dFRhcmdldCk7XHJcblxyXG4gICAgICAvLyBJZiB0aGUgZm9jdXNlZCBlbGVtZW50IGlzIGEgY2hpbGQgb2YgdGhlIG1haW4gZWxlbWVudCBidXQgYWx3YXlzQWN0aXZlIGRvIG5vdGhpbmdcclxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmFsd2F5c0FjdGl2ZSkge1xyXG4gICAgICB0aGlzLmluU2NvcGUgPSBmYWxzZTtcclxuXHJcbiAgICAgIC8vIElmIHRoZSBlbGVtZW50IGZvY3VzZWQgaXMgbm90IGEgY2hpbGQgb2YgdGhlIG1haW4gZWxlbWVudCBzdG9wIGJlaW5nIGFjdGl2ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pblNjb3BlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW5kcyB0aGUgYWN0aXZlIHN0YXRlIG9mIHRoZSBmb2N1c0JveFxyXG4gICAqL1xyXG4gIHN0b3AoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLm9uRm9jdXNIYW5kbGVyLCB0cnVlKTtcclxuICAgIHRoaXMuX2NsZWFudXAoKTtcclxuICAgIHRoaXMuZm9jdXNCb3guY2xhc3NMaXN0LnJlbW92ZSh0aGlzLm9wdGlvbnMuYWN0aXZlQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZXMgdGhlIGZvY3VzQm94IHRvIGEgdGFyZ2V0IGVsZW1lbnRcclxuICAgKiBAcGFyYW0ge0VsZW1lbnR8RXZlbnR9IHRhcmdldEVsXHJcbiAgICovXHJcbiAgbW92ZUZvY3VzQm94KHRhcmdldEVsKSB7XHJcbiAgICAvLyBXaGVuIHBhc3NlZCBhcyBhIGhhbmRsZXIgd2UnbGwgZ2V0IHRoZSBldmVudCB0YXJnZXRcclxuICAgIGlmICh0YXJnZXRFbCBpbnN0YW5jZW9mIEV2ZW50KSB0YXJnZXRFbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgLy8gTWFya2luZyBjdXJyZW50IGVsZW1lbnQgYXMgYmVpbmcgdGFyZ2V0ZWRcclxuICAgIHRhcmdldEVsLmNsYXNzTGlzdC5hZGQodGhpcy5vcHRpb25zLnRhcmdldENsYXNzKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIHRvIHNlZSBpZiB3aGF0IHdlJ3JlIHRhcmdldGluZyBpcyBhY3R1YWxseSBzdGlsbCB0aGVyZS5cclxuICAgICAqIFRoZW4gY2hlY2sgdG8gc2VlIGlmIHdlJ3JlIHRhcmdldGluZyBhIERPTSBlbGVtZW50LiBUaGVyZSB3YXNcclxuICAgICAqIGFuIElFIGlzc3VlIHdpdGggdGhlIGRvY3VtZW50IGFuZCB3aW5kb3cgc29tZXRpbWVzIGJlaW5nIHRhcmdldGVkXHJcbiAgICAgKiBhbmQgdGhyb3dpbmcgZXJyb3JzIHNpbmNlIHlvdSBjYW4ndCBnZXQgdGhlIHBvc2l0aW9uIHZhbHVlcyBvZiB0aG9zZS5cclxuICAgICAqL1xyXG4gICAgaWYgKGRvY3VtZW50LmJvZHkuY29udGFpbnModGFyZ2V0RWwpICYmIHRhcmdldEVsIGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG4gICAgICBjb25zdCByZWN0ID0gYWJzb2x1dGVQb3NpdGlvbih0YXJnZXRFbCk7XHJcbiAgICAgIGNvbnN0IHdpZHRoID0gYCR7cmVjdC53aWR0aH1weGA7XHJcbiAgICAgIGNvbnN0IGhlaWdodCA9IGAke3JlY3QuaGVpZ2h0fXB4YDtcclxuICAgICAgY29uc3QgbGVmdCA9IGAke3JlY3QubGVmdH1weGA7XHJcbiAgICAgIGNvbnN0IHRvcCA9IGAke3JlY3QudG9wfXB4YDtcclxuXHJcbiAgICAgIHRoaXMuZm9jdXNCb3guY2xhc3NMaXN0LmFkZCh0aGlzLm9wdGlvbnMuYW5pbWF0aW5nQ2xhc3MpO1xyXG4gICAgICB0aGlzLmZvY3VzQm94LmNsYXNzTGlzdC5hZGQodGhpcy5vcHRpb25zLmFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5mb2N1c0JveC5zdHlsZSwge1xyXG4gICAgICAgIHdpZHRoLFxyXG4gICAgICAgIGhlaWdodCxcclxuICAgICAgICBsZWZ0LFxyXG4gICAgICAgIHRvcFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFJlbW92ZSBhbmltYXRpbmcvYWN0aXZlIGNsYXNzIGFmdGVyIHRoZSBkdXJhdGlvbiBlbmRzLlxyXG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmZvY3VzQm94LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5vcHRpb25zLmFuaW1hdGluZ0NsYXNzKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbmFjdGl2ZUFmdGVyRHVyYXRpb24pIHtcclxuICAgICAgICAgIHRoaXMuZm9jdXNCb3guY2xhc3NMaXN0LnJlbW92ZSh0aGlzLm9wdGlvbnMuYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLm9uQWZ0ZXJNb3ZlKHRoaXMucHJldmlvdXNUYXJnZXQsIHRhcmdldEVsLCB0aGlzKTtcclxuICAgICAgfSwgdGhpcy5vcHRpb25zLmR1cmF0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2NsZWFudXAoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkZXN0cm95IG1ldGhvZCB0byBmcmVlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBwbHVnaW46XHJcbiAgICogUmVmZXJlbmNlcywgdW5yZWdpc3RlciBsaXN0ZW5lcnMsIGV0Yy5cclxuICAgKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgLy8gUmVtb3ZlIGZvY3VzQm94XHJcbiAgICB0aGlzLmZvY3VzQm94LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5mb2N1c0JveCk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGFueSBleHRyYSBjbGFzc2VzIGdpdmVuIHRvIG90aGVyIGVsZW1lbnRzIGlmIHRoZXkgZXhpc3RcclxuICAgIHRoaXMucHJldmlvdXNUYXJnZXQgIT0gbnVsbCAmJlxyXG4gICAgICB0aGlzLnByZXZpb3VzVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5vcHRpb25zLnRhcmdldENsYXNzKTtcclxuICAgIHRoaXMubmV4dFRhcmdldCAhPSBudWxsICYmXHJcbiAgICAgIHRoaXMubmV4dFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMub3B0aW9ucy50YXJnZXRDbGFzcyk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLm9uRm9jdXNIYW5kbGVyLCB0cnVlKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd25IYW5kbGVyLCBmYWxzZSk7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5zdG9wLCBmYWxzZSk7XHJcblxyXG4gICAgdGhpcy5vcHRpb25zLm9uRGVzdHJveSh0aGlzKTtcclxuICB9XHJcbn0iXSwibmFtZXMiOlsiaXNPYmplY3QiLCJyZXF1aXJlJCQwIiwiZG9jdW1lbnQiLCJyZXF1aXJlJCQxIiwicmVxdWlyZSQkMiIsImFuT2JqZWN0IiwidG9QcmltaXRpdmUiLCJJRThfRE9NX0RFRklORSIsImRQIiwiY3JlYXRlRGVzYyIsImdsb2JhbCIsImNvcmUiLCIkdG9TdHJpbmciLCJoYXMiLCJoaWRlIiwiYUZ1bmN0aW9uIiwiY3R4IiwicmVkZWZpbmUiLCJjb2YiLCJJT2JqZWN0IiwiZGVmaW5lZCIsInRvSW50ZWdlciIsIm1pbiIsInRvSU9iamVjdCIsInRvTGVuZ3RoIiwidG9BYnNvbHV0ZUluZGV4IiwidWlkIiwiJGtleXMiLCJlbnVtQnVnS2V5cyIsInRvT2JqZWN0IiwiZ09QUyIsInBJRSIsImdldEtleXMiLCJERVNDUklQVE9SUyIsIiRleHBvcnQiLCJpc1JlZ0V4cCIsIk1BVENIIiwiY29udGV4dCIsIkVsZW1lbnQiLCJwcm90b3R5cGUiLCJtYXRjaGVzIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3IiLCJjbG9zZXN0IiwicyIsImVsIiwicGFyZW50RWxlbWVudCIsInBhcmVudE5vZGUiLCJub2RlVHlwZSIsImV4dGVuZCIsIm9iaiIsIm5hbWUiLCJjb3B5IiwidGFyZ2V0IiwiYXJndW1lbnRzIiwiaSIsImxlbmd0aCIsInVuZGVmaW5lZCIsImFic29sdXRlUG9zaXRpb24iLCJmb3VuZCIsImxlZnQiLCJ0b3AiLCJ3aWR0aCIsImhlaWdodCIsIm9mZnNldEJhc2UiLCJib2R5IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwiY3NzVGV4dCIsImFwcGVuZENoaWxkIiwib3duZXJEb2N1bWVudCIsImJvdW5kaW5nUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJhc2VSZWN0IiwicmlnaHQiLCJib3R0b20iLCJ0cmFuc2l0aW9ucyIsInRyYW5zaXRpb24iLCJPVHJhbnNpdGlvbiIsIk1velRyYW5zaXRpb24iLCJXZWJraXRUcmFuc2l0aW9uIiwidCIsIkZvY3VzT3ZlcmxheSIsImVsZW1lbnQiLCJvcHRpb25zIiwiYWN0aXZlIiwic2NvcGVkRWwiLCJmb2N1c0JveCIsInByZXZpb3VzVGFyZ2V0IiwibmV4dFRhcmdldCIsInRpbWVvdXQiLCJpblNjb3BlIiwidHJhbnNpdGlvbkV2ZW50Iiwid2hpY2hUcmFuc2l0aW9uRXZlbnQiLCJjbGFzcyIsImFjdGl2ZUNsYXNzIiwiYW5pbWF0aW5nQ2xhc3MiLCJ0YXJnZXRDbGFzcyIsInpJbmRleCIsImR1cmF0aW9uIiwiaW5hY3RpdmVBZnRlckR1cmF0aW9uIiwidHJpZ2dlcktleXMiLCJpbmFjdGl2ZU9uTm9uVHJpZ2dlcktleSIsImluYWN0aXZlT25DbGljayIsImFsd2F5c0FjdGl2ZSIsIndhdGNoVHJhbnNpdGlvbkVuZCIsIm9uSW5pdCIsIm9uQmVmb3JlTW92ZSIsIm9uQWZ0ZXJNb3ZlIiwib25EZXN0cm95IiwiU3RyaW5nIiwicXVlcnlTZWxlY3RvciIsIm9uS2V5RG93bkhhbmRsZXIiLCJiaW5kIiwib25Gb2N1c0hhbmRsZXIiLCJtb3ZlRm9jdXNCb3giLCJzdG9wIiwiaW5pdCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJfY3JlYXRlRm9jdXNCb3giLCJlIiwiY29kZSIsIndoaWNoIiwiaW5jbHVkZXMiLCJzZXRUaW1lb3V0IiwiYWN0aXZlRWwiLCJhY3RpdmVFbGVtZW50IiwiSFRNTElGcmFtZUVsZW1lbnQiLCJjb250YWlucyIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsImFkZCIsIk9iamVjdCIsImFzc2lnbiIsInBvc2l0aW9uIiwicG9pbnRlckV2ZW50cyIsImluc2VydEFkamFjZW50RWxlbWVudCIsInJlbW92ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJmb2N1c2VkRWwiLCJfY2xlYW51cCIsImN1cnJlbnRFbCIsImdldEF0dHJpYnV0ZSIsImZvY3VzU2VsZWN0b3IiLCJhc3NvY2lhdGVkRWwiLCJpZCIsImNsZWFyVGltZW91dCIsInRhcmdldEVsIiwiRXZlbnQiLCJyZWN0IiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQUksTUFBTSxHQUFHLGNBQWMsR0FBRyxPQUFPLE1BQU0sSUFBSSxXQUFXLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJO0lBQzdFLE1BQU0sR0FBRyxPQUFPLElBQUksSUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSTs7SUFFL0QsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7QUFDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxRQUFRLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQzs7OztBQ0x6QyxJQUFJLElBQUksR0FBRyxjQUFjLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7QUFDakQsSUFBSSxPQUFPLEdBQUcsSUFBSSxRQUFRLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQzs7OztBQ0R2QyxhQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUU7RUFDN0IsT0FBTyxPQUFPLEVBQUUsS0FBSyxRQUFRLEdBQUcsRUFBRSxLQUFLLElBQUksR0FBRyxPQUFPLEVBQUUsS0FBSyxVQUFVLENBQUM7Q0FDeEUsQ0FBQzs7QUNERixhQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUU7RUFDN0IsSUFBSSxDQUFDQSxTQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxTQUFTLENBQUMsRUFBRSxHQUFHLG9CQUFvQixDQUFDLENBQUM7RUFDOUQsT0FBTyxFQUFFLENBQUM7Q0FDWCxDQUFDOztBQ0pGLFVBQWMsR0FBRyxVQUFVLElBQUksRUFBRTtFQUMvQixJQUFJO0lBQ0YsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDakIsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNWLE9BQU8sSUFBSSxD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
