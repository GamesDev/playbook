/*!
 * jQuery JavaScript Library v2.2.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-01-08T20:02Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return this;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function manipulationTarget( elem, content ) {
	if ( jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				// Support: IE<11
				// option.value not trimmed (#14858)
				return jQuery.trim( elem.value );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// But now, this "simulate" function is used only for events
				// for which stopPropagation() is noop, so there is no need for that anymore.
				//
				// For the compat branch though, guard for "click" and "submit"
				// events is still used, but was moved to jQuery.event.stopPropagation function
				// because `originalEvent` should point to the original event for the constancy
				// with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// Stop scripts or inline event handlers from being executed immediately
	// by using document.implementation
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			// Subtract offsetParent scroll positions
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ) -
				offsetParent.scrollTop();
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true ) -
				offsetParent.scrollLeft();
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

/*! highlight.js v9.1.0 | BSD3 License | git.io/hljslicense */
(function(factory) {

  // Setup highlight.js for different environments. First is Node.js or
  // CommonJS.
  if(typeof exports !== 'undefined') {
    factory(exports);
  } else {
    // Export hljs globally even when using AMD for cases when this script
    // is loaded with others that may still expect a global hljs.
    self.hljs = factory({});

    // Finally register the global hljs with AMD.
    if(typeof define === 'function' && define.amd) {
      define('hljs', [], function() {
        return self.hljs;
      });
    }
  }

}(function(hljs) {

  /* Utility functions */

  function escape(value) {
    return value.replace(/&/gm, '&amp;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
  }

  function tag(node) {
    return node.nodeName.toLowerCase();
  }

  function testRe(re, lexeme) {
    var match = re && re.exec(lexeme);
    return match && match.index == 0;
  }

  function isNotHighlighted(language) {
    return (/^(no-?highlight|plain|text)$/i).test(language);
  }

  function blockLanguage(block) {
    var i, match, length,
        classes = block.className + ' ';

    classes += block.parentNode ? block.parentNode.className : '';

    // language-* takes precedence over non-prefixed class names
    match = (/\blang(?:uage)?-([\w-]+)\b/i).exec(classes);
    if (match) {
      return getLanguage(match[1]) ? match[1] : 'no-highlight';
    }

    classes = classes.split(/\s+/);
    for (i = 0, length = classes.length; i < length; i++) {
      if (getLanguage(classes[i]) || isNotHighlighted(classes[i])) {
        return classes[i];
      }
    }
  }

  function inherit(parent, obj) {
    var result = {}, key;
    for (key in parent)
      result[key] = parent[key];
    if (obj)
      for (key in obj)
        result[key] = obj[key];
    return result;
  }

  /* Stream merging */

  function nodeStream(node) {
    var result = [];
    (function _nodeStream(node, offset) {
      for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType == 3)
          offset += child.nodeValue.length;
        else if (child.nodeType == 1) {
          result.push({
            event: 'start',
            offset: offset,
            node: child
          });
          offset = _nodeStream(child, offset);
          // Prevent void elements from having an end tag that would actually
          // double them in the output. There are more void elements in HTML
          // but we list only those realistically expected in code display.
          if (!tag(child).match(/br|hr|img|input/)) {
            result.push({
              event: 'stop',
              offset: offset,
              node: child
            });
          }
        }
      }
      return offset;
    })(node, 0);
    return result;
  }

  function mergeStreams(original, highlighted, value) {
    var processed = 0;
    var result = '';
    var nodeStack = [];

    function selectStream() {
      if (!original.length || !highlighted.length) {
        return original.length ? original : highlighted;
      }
      if (original[0].offset != highlighted[0].offset) {
        return (original[0].offset < highlighted[0].offset) ? original : highlighted;
      }

      /*
      To avoid starting the stream just before it should stop the order is
      ensured that original always starts first and closes last:

      if (event1 == 'start' && event2 == 'start')
        return original;
      if (event1 == 'start' && event2 == 'stop')
        return highlighted;
      if (event1 == 'stop' && event2 == 'start')
        return original;
      if (event1 == 'stop' && event2 == 'stop')
        return highlighted;

      ... which is collapsed to:
      */
      return highlighted[0].event == 'start' ? original : highlighted;
    }

    function open(node) {
      function attr_str(a) {return ' ' + a.nodeName + '="' + escape(a.value) + '"';}
      result += '<' + tag(node) + Array.prototype.map.call(node.attributes, attr_str).join('') + '>';
    }

    function close(node) {
      result += '</' + tag(node) + '>';
    }

    function render(event) {
      (event.event == 'start' ? open : close)(event.node);
    }

    while (original.length || highlighted.length) {
      var stream = selectStream();
      result += escape(value.substr(processed, stream[0].offset - processed));
      processed = stream[0].offset;
      if (stream == original) {
        /*
        On any opening or closing tag of the original markup we first close
        the entire highlighted node stack, then render the original tag along
        with all the following original tags at the same offset and then
        reopen all the tags on the highlighted stack.
        */
        nodeStack.reverse().forEach(close);
        do {
          render(stream.splice(0, 1)[0]);
          stream = selectStream();
        } while (stream == original && stream.length && stream[0].offset == processed);
        nodeStack.reverse().forEach(open);
      } else {
        if (stream[0].event == 'start') {
          nodeStack.push(stream[0].node);
        } else {
          nodeStack.pop();
        }
        render(stream.splice(0, 1)[0]);
      }
    }
    return result + escape(value.substr(processed));
  }

  /* Initialization */

  function compileLanguage(language) {

    function reStr(re) {
        return (re && re.source) || re;
    }

    function langRe(value, global) {
      return new RegExp(
        reStr(value),
        'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : '')
      );
    }

    function compileMode(mode, parent) {
      if (mode.compiled)
        return;
      mode.compiled = true;

      mode.keywords = mode.keywords || mode.beginKeywords;
      if (mode.keywords) {
        var compiled_keywords = {};

        var flatten = function(className, str) {
          if (language.case_insensitive) {
            str = str.toLowerCase();
          }
          str.split(' ').forEach(function(kw) {
            var pair = kw.split('|');
            compiled_keywords[pair[0]] = [className, pair[1] ? Number(pair[1]) : 1];
          });
        };

        if (typeof mode.keywords == 'string') { // string
          flatten('keyword', mode.keywords);
        } else {
          Object.keys(mode.keywords).forEach(function (className) {
            flatten(className, mode.keywords[className]);
          });
        }
        mode.keywords = compiled_keywords;
      }
      mode.lexemesRe = langRe(mode.lexemes || /\b\w+\b/, true);

      if (parent) {
        if (mode.beginKeywords) {
          mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')\\b';
        }
        if (!mode.begin)
          mode.begin = /\B|\b/;
        mode.beginRe = langRe(mode.begin);
        if (!mode.end && !mode.endsWithParent)
          mode.end = /\B|\b/;
        if (mode.end)
          mode.endRe = langRe(mode.end);
        mode.terminator_end = reStr(mode.end) || '';
        if (mode.endsWithParent && parent.terminator_end)
          mode.terminator_end += (mode.end ? '|' : '') + parent.terminator_end;
      }
      if (mode.illegal)
        mode.illegalRe = langRe(mode.illegal);
      if (mode.relevance === undefined)
        mode.relevance = 1;
      if (!mode.contains) {
        mode.contains = [];
      }
      var expanded_contains = [];
      mode.contains.forEach(function(c) {
        if (c.variants) {
          c.variants.forEach(function(v) {expanded_contains.push(inherit(c, v));});
        } else {
          expanded_contains.push(c == 'self' ? mode : c);
        }
      });
      mode.contains = expanded_contains;
      mode.contains.forEach(function(c) {compileMode(c, mode);});

      if (mode.starts) {
        compileMode(mode.starts, parent);
      }

      var terminators =
        mode.contains.map(function(c) {
          return c.beginKeywords ? '\\.?(' + c.begin + ')\\.?' : c.begin;
        })
        .concat([mode.terminator_end, mode.illegal])
        .map(reStr)
        .filter(Boolean);
      mode.terminators = terminators.length ? langRe(terminators.join('|'), true) : {exec: function(/*s*/) {return null;}};
    }

    compileMode(language);
  }

  /*
  Core highlighting function. Accepts a language name, or an alias, and a
  string with the code to highlight. Returns an object with the following
  properties:

  - relevance (int)
  - value (an HTML string with highlighting markup)

  */
  function highlight(name, value, ignore_illegals, continuation) {

    function subMode(lexeme, mode) {
      for (var i = 0; i < mode.contains.length; i++) {
        if (testRe(mode.contains[i].beginRe, lexeme)) {
          return mode.contains[i];
        }
      }
    }

    function endOfMode(mode, lexeme) {
      if (testRe(mode.endRe, lexeme)) {
        while (mode.endsParent && mode.parent) {
          mode = mode.parent;
        }
        return mode;
      }
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, lexeme);
      }
    }

    function isIllegal(lexeme, mode) {
      return !ignore_illegals && testRe(mode.illegalRe, lexeme);
    }

    function keywordMatch(mode, match) {
      var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0];
      return mode.keywords.hasOwnProperty(match_str) && mode.keywords[match_str];
    }

    function buildSpan(classname, insideSpan, leaveOpen, noPrefix) {
      var classPrefix = noPrefix ? '' : options.classPrefix,
          openSpan    = '<span class="' + classPrefix,
          closeSpan   = leaveOpen ? '' : '</span>';

      openSpan += classname + '">';

      return openSpan + insideSpan + closeSpan;
    }

    function processKeywords() {
      if (!top.keywords)
        return escape(mode_buffer);
      var result = '';
      var last_index = 0;
      top.lexemesRe.lastIndex = 0;
      var match = top.lexemesRe.exec(mode_buffer);
      while (match) {
        result += escape(mode_buffer.substr(last_index, match.index - last_index));
        var keyword_match = keywordMatch(top, match);
        if (keyword_match) {
          relevance += keyword_match[1];
          result += buildSpan(keyword_match[0], escape(match[0]));
        } else {
          result += escape(match[0]);
        }
        last_index = top.lexemesRe.lastIndex;
        match = top.lexemesRe.exec(mode_buffer);
      }
      return result + escape(mode_buffer.substr(last_index));
    }

    function processSubLanguage() {
      var explicit = typeof top.subLanguage == 'string';
      if (explicit && !languages[top.subLanguage]) {
        return escape(mode_buffer);
      }

      var result = explicit ?
                   highlight(top.subLanguage, mode_buffer, true, continuations[top.subLanguage]) :
                   highlightAuto(mode_buffer, top.subLanguage.length ? top.subLanguage : undefined);

      // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Usecase in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.
      if (top.relevance > 0) {
        relevance += result.relevance;
      }
      if (explicit) {
        continuations[top.subLanguage] = result.top;
      }
      return buildSpan(result.language, result.value, false, true);
    }

    function processBuffer() {
      return top.subLanguage !== undefined ? processSubLanguage() : processKeywords();
    }

    function startNewMode(mode, lexeme) {
      var markup = mode.className? buildSpan(mode.className, '', true): '';
      if (mode.returnBegin) {
        result += markup;
        mode_buffer = '';
      } else if (mode.excludeBegin) {
        result += escape(lexeme) + markup;
        mode_buffer = '';
      } else {
        result += markup;
        mode_buffer = lexeme;
      }
      top = Object.create(mode, {parent: {value: top}});
    }

    function processLexeme(buffer, lexeme) {

      mode_buffer += buffer;
      if (lexeme === undefined) {
        result += processBuffer();
        return 0;
      }

      var new_mode = subMode(lexeme, top);
      if (new_mode) {
        result += processBuffer();
        startNewMode(new_mode, lexeme);
        return new_mode.returnBegin ? 0 : lexeme.length;
      }

      var end_mode = endOfMode(top, lexeme);
      if (end_mode) {
        var origin = top;
        if (!(origin.returnEnd || origin.excludeEnd)) {
          mode_buffer += lexeme;
        }
        result += processBuffer();
        do {
          if (top.className) {
            result += '</span>';
          }
          relevance += top.relevance;
          top = top.parent;
        } while (top != end_mode.parent);
        if (origin.excludeEnd) {
          result += escape(lexeme);
        }
        mode_buffer = '';
        if (end_mode.starts) {
          startNewMode(end_mode.starts, '');
        }
        return origin.returnEnd ? 0 : lexeme.length;
      }

      if (isIllegal(lexeme, top))
        throw new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');

      /*
      Parser should not reach this point as all types of lexemes should be caught
      earlier, but if it does due to some bug make sure it advances at least one
      character forward to prevent infinite looping.
      */
      mode_buffer += lexeme;
      return lexeme.length || 1;
    }

    var language = getLanguage(name);
    if (!language) {
      throw new Error('Unknown language: "' + name + '"');
    }

    compileLanguage(language);
    var top = continuation || language;
    var continuations = {}; // keep continuations for sub-languages
    var result = '', current;
    for(current = top; current != language; current = current.parent) {
      if (current.className) {
        result = buildSpan(current.className, '', true) + result;
      }
    }
    var mode_buffer = '';
    var relevance = 0;
    try {
      var match, count, index = 0;
      while (true) {
        top.terminators.lastIndex = index;
        match = top.terminators.exec(value);
        if (!match)
          break;
        count = processLexeme(value.substr(index, match.index - index), match[0]);
        index = match.index + count;
      }
      processLexeme(value.substr(index));
      for(current = top; current.parent; current = current.parent) { // close dangling modes
        if (current.className) {
          result += '</span>';
        }
      }
      return {
        relevance: relevance,
        value: result,
        language: name,
        top: top
      };
    } catch (e) {
      if (e.message.indexOf('Illegal') != -1) {
        return {
          relevance: 0,
          value: escape(value)
        };
      } else {
        throw e;
      }
    }
  }

  /*
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:

  - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - second_best (object with the same structure for second-best heuristically
    detected language, may be absent)

  */
  function highlightAuto(text, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    var result = {
      relevance: 0,
      value: escape(text)
    };
    var second_best = result;
    languageSubset.forEach(function(name) {
      if (!getLanguage(name)) {
        return;
      }
      var current = highlight(name, text, false);
      current.language = name;
      if (current.relevance > second_best.relevance) {
        second_best = current;
      }
      if (current.relevance > result.relevance) {
        second_best = result;
        result = current;
      }
    });
    if (second_best.language) {
      result.second_best = second_best;
    }
    return result;
  }

  /*
  Post-processing of the highlighted markup:

  - replace TABs with something more useful
  - replace real line-breaks with '<br>' for non-pre containers

  */
  function fixMarkup(value) {
    if (options.tabReplace) {
      value = value.replace(/^((<[^>]+>|\t)+)/gm, function(match, p1 /*..., offset, s*/) {
        return p1.replace(/\t/g, options.tabReplace);
      });
    }
    if (options.useBR) {
      value = value.replace(/\n/g, '<br>');
    }
    return value;
  }

  function buildClassName(prevClassName, currentLang, resultLang) {
    var language = currentLang ? aliases[currentLang] : resultLang,
        result   = [prevClassName.trim()];

    if (!prevClassName.match(/\bhljs\b/)) {
      result.push('hljs');
    }

    if (prevClassName.indexOf(language) === -1) {
      result.push(language);
    }

    return result.join(' ').trim();
  }

  /*
  Applies highlighting to a DOM node containing code. Accepts a DOM node and
  two optional parameters for fixMarkup.
  */
  function highlightBlock(block) {
    var language = blockLanguage(block);
    if (isNotHighlighted(language))
        return;

    var node;
    if (options.useBR) {
      node = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      node.innerHTML = block.innerHTML.replace(/\n/g, '').replace(/<br[ \/]*>/g, '\n');
    } else {
      node = block;
    }
    var text = node.textContent;
    var result = language ? highlight(language, text, true) : highlightAuto(text);

    var originalStream = nodeStream(node);
    if (originalStream.length) {
      var resultNode = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      resultNode.innerHTML = result.value;
      result.value = mergeStreams(originalStream, nodeStream(resultNode), text);
    }
    result.value = fixMarkup(result.value);

    block.innerHTML = result.value;
    block.className = buildClassName(block.className, language, result.language);
    block.result = {
      language: result.language,
      re: result.relevance
    };
    if (result.second_best) {
      block.second_best = {
        language: result.second_best.language,
        re: result.second_best.relevance
      };
    }
  }

  var options = {
    classPrefix: 'hljs-',
    tabReplace: null,
    useBR: false,
    languages: undefined
  };

  /*
  Updates highlight.js global options with values passed in the form of an object
  */
  function configure(user_options) {
    options = inherit(options, user_options);
  }

  /*
  Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
  */
  function initHighlighting() {
    if (initHighlighting.called)
      return;
    initHighlighting.called = true;

    var blocks = document.querySelectorAll('pre code');
    Array.prototype.forEach.call(blocks, highlightBlock);
  }

  /*
  Attaches highlighting to the page load event.
  */
  function initHighlightingOnLoad() {
    addEventListener('DOMContentLoaded', initHighlighting, false);
    addEventListener('load', initHighlighting, false);
  }

  var languages = {};
  var aliases = {};

  function registerLanguage(name, language) {
    var lang = languages[name] = language(hljs);
    if (lang.aliases) {
      lang.aliases.forEach(function(alias) {aliases[alias] = name;});
    }
  }

  function listLanguages() {
    return Object.keys(languages);
  }

  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }

  /* Interface definition */

  hljs.highlight = highlight;
  hljs.highlightAuto = highlightAuto;
  hljs.fixMarkup = fixMarkup;
  hljs.highlightBlock = highlightBlock;
  hljs.configure = configure;
  hljs.initHighlighting = initHighlighting;
  hljs.initHighlightingOnLoad = initHighlightingOnLoad;
  hljs.registerLanguage = registerLanguage;
  hljs.listLanguages = listLanguages;
  hljs.getLanguage = getLanguage;
  hljs.inherit = inherit;

  // Common regexps
  hljs.IDENT_RE = '[a-zA-Z]\\w*';
  hljs.UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
  hljs.NUMBER_RE = '\\b\\d+(\\.\\d+)?';
  hljs.C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
  hljs.BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
  hljs.RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

  // Common modes
  hljs.BACKSLASH_ESCAPE = {
    begin: '\\\\[\\s\\S]', relevance: 0
  };
  hljs.APOS_STRING_MODE = {
    className: 'string',
    begin: '\'', end: '\'',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  hljs.QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  hljs.PHRASAL_WORDS_MODE = {
    begin: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/
  };
  hljs.COMMENT = function (begin, end, inherits) {
    var mode = hljs.inherit(
      {
        className: 'comment',
        begin: begin, end: end,
        contains: []
      },
      inherits || {}
    );
    mode.contains.push(hljs.PHRASAL_WORDS_MODE);
    mode.contains.push({
      className: 'doctag',
      begin: "(?:TODO|FIXME|NOTE|BUG|XXX):",
      relevance: 0
    });
    return mode;
  };
  hljs.C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$');
  hljs.C_BLOCK_COMMENT_MODE = hljs.COMMENT('/\\*', '\\*/');
  hljs.HASH_COMMENT_MODE = hljs.COMMENT('#', '$');
  hljs.NUMBER_MODE = {
    className: 'number',
    begin: hljs.NUMBER_RE,
    relevance: 0
  };
  hljs.C_NUMBER_MODE = {
    className: 'number',
    begin: hljs.C_NUMBER_RE,
    relevance: 0
  };
  hljs.BINARY_NUMBER_MODE = {
    className: 'number',
    begin: hljs.BINARY_NUMBER_RE,
    relevance: 0
  };
  hljs.CSS_NUMBER_MODE = {
    className: 'number',
    begin: hljs.NUMBER_RE + '(' +
      '%|em|ex|ch|rem'  +
      '|vw|vh|vmin|vmax' +
      '|cm|mm|in|pt|pc|px' +
      '|deg|grad|rad|turn' +
      '|s|ms' +
      '|Hz|kHz' +
      '|dpi|dpcm|dppx' +
      ')?',
    relevance: 0
  };
  hljs.REGEXP_MODE = {
    className: 'regexp',
    begin: /\//, end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      {
        begin: /\[/, end: /\]/,
        relevance: 0,
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };
  hljs.TITLE_MODE = {
    className: 'title',
    begin: hljs.IDENT_RE,
    relevance: 0
  };
  hljs.UNDERSCORE_TITLE_MODE = {
    className: 'title',
    begin: hljs.UNDERSCORE_IDENT_RE,
    relevance: 0
  };

hljs.registerLanguage('1c', function(hljs){
  var IDENT_RE_RU = '[a-zA-Zа-яА-Я][a-zA-Z0-9_а-яА-Я]*';
  var OneS_KEYWORDS = 'возврат дата для если и или иначе иначеесли исключение конецесли ' +
    'конецпопытки конецпроцедуры конецфункции конеццикла константа не перейти перем ' +
    'перечисление по пока попытка прервать продолжить процедура строка тогда фс функция цикл ' +
    'число экспорт';
  var OneS_BUILT_IN = 'ansitooem oemtoansi ввестивидсубконто ввестидату ввестизначение ' +
    'ввестиперечисление ввестипериод ввестиплансчетов ввестистроку ввестичисло вопрос ' +
    'восстановитьзначение врег выбранныйплансчетов вызватьисключение датагод датамесяц ' +
    'датачисло добавитьмесяц завершитьработусистемы заголовоксистемы записьжурналарегистрации ' +
    'запуститьприложение зафиксироватьтранзакцию значениевстроку значениевстрокувнутр ' +
    'значениевфайл значениеизстроки значениеизстрокивнутр значениеизфайла имякомпьютера ' +
    'имяпользователя каталогвременныхфайлов каталогиб каталогпользователя каталогпрограммы ' +
    'кодсимв командасистемы конгода конецпериодаби конецрассчитанногопериодаби ' +
    'конецстандартногоинтервала конквартала конмесяца коннедели лев лог лог10 макс ' +
    'максимальноеколичествосубконто мин монопольныйрежим названиеинтерфейса названиенабораправ ' +
    'назначитьвид назначитьсчет найти найтипомеченныенаудаление найтиссылки началопериодаби ' +
    'началостандартногоинтервала начатьтранзакцию начгода начквартала начмесяца начнедели ' +
    'номерднягода номерднянедели номернеделигода нрег обработкаожидания окр описаниеошибки ' +
    'основнойжурналрасчетов основнойплансчетов основнойязык открытьформу открытьформумодально ' +
    'отменитьтранзакцию очиститьокносообщений периодстр полноеимяпользователя получитьвремята ' +
    'получитьдатута получитьдокументта получитьзначенияотбора получитьпозициюта ' +
    'получитьпустоезначение получитьта прав праводоступа предупреждение префиксавтонумерации ' +
    'пустаястрока пустоезначение рабочаядаттьпустоезначение рабочаядата разделительстраниц ' +
    'разделительстрок разм разобратьпозициюдокумента рассчитатьрегистрына ' +
    'рассчитатьрегистрыпо сигнал симв символтабуляции создатьобъект сокрл сокрлп сокрп ' +
    'сообщить состояние сохранитьзначение сред статусвозврата стрдлина стрзаменить ' +
    'стрколичествострок стрполучитьстроку  стрчисловхождений сформироватьпозициюдокумента ' +
    'счетпокоду текущаядата текущеевремя типзначения типзначениястр удалитьобъекты ' +
    'установитьтана установитьтапо фиксшаблон формат цел шаблон';
  var DQUOTE =  {begin: '""'};
  var STR_START = {
      className: 'string',
      begin: '"', end: '"|$',
      contains: [DQUOTE]
    };
  var STR_CONT = {
    className: 'string',
    begin: '\\|', end: '"|$',
    contains: [DQUOTE]
  };

  return {
    case_insensitive: true,
    lexemes: IDENT_RE_RU,
    keywords: {keyword: OneS_KEYWORDS, built_in: OneS_BUILT_IN},
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.NUMBER_MODE,
      STR_START, STR_CONT,
      {
        className: 'function',
        begin: '(процедура|функция)', end: '$',
        lexemes: IDENT_RE_RU,
        keywords: 'процедура функция',
        contains: [
          {
            begin: 'экспорт', endsWithParent: true,
            lexemes: IDENT_RE_RU,
            keywords: 'экспорт',
            contains: [hljs.C_LINE_COMMENT_MODE]
          },
          {
            className: 'params',
            begin: '\\(', end: '\\)',
            lexemes: IDENT_RE_RU,
            keywords: 'знач',
            contains: [STR_START, STR_CONT]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.inherit(hljs.TITLE_MODE, {begin: IDENT_RE_RU})
        ]
      },
      {className: 'meta', begin: '#', end: '$'},
      {className: 'number', begin: '\'\\d{2}\\.\\d{2}\\.(\\d{2}|\\d{4})\''} // date
    ]
  };
});

hljs.registerLanguage('accesslog', function(hljs) {
  return {
    contains: [
      // IP
      {
        className: 'number',
        begin: '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b'
      },
      // Other numbers
      {
        className: 'number',
        begin: '\\b\\d+\\b',
        relevance: 0
      },
      // Requests
      {
        className: 'string',
        begin: '"(GET|POST|HEAD|PUT|DELETE|CONNECT|OPTIONS|PATCH|TRACE)', end: '"',
        keywords: 'GET POST HEAD PUT DELETE CONNECT OPTIONS PATCH TRACE',
        illegal: '\\n',
        relevance: 10
      },
      // Dates
      {
        className: 'string',
        begin: /\[/, end: /\]/,
        illegal: '\\n'
      },
      // Strings
      {
        className: 'string',
        begin: '"', end: '"',
        illegal: '\\n'
      }
    ]
  };
});

hljs.registerLanguage('actionscript', function(hljs) {
  var IDENT_RE = '[a-zA-Z_$][a-zA-Z0-9_$]*';
  var IDENT_FUNC_RETURN_TYPE_RE = '([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)';

  var AS3_REST_ARG_MODE = {
    className: 'rest_arg',
    begin: '[.]{3}', end: IDENT_RE,
    relevance: 10
  };

  return {
    aliases: ['as'],
    keywords: {
      keyword: 'as break case catch class const continue default delete do dynamic each ' +
        'else extends final finally for function get if implements import in include ' +
        'instanceof interface internal is namespace native new override package private ' +
        'protected public return set static super switch this throw try typeof use var void ' +
        'while with',
      literal: 'true false null undefined'
    },
    contains: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'class',
        beginKeywords: 'package', end: '{',
        contains: [hljs.TITLE_MODE]
      },
      {
        className: 'class',
        beginKeywords: 'class interface', end: '{', excludeEnd: true,
        contains: [
          {
            beginKeywords: 'extends implements'
          },
          hljs.TITLE_MODE
        ]
      },
      {
        className: 'meta',
        beginKeywords: 'import include', end: ';',
        keywords: {'meta-keyword': 'import include'}
      },
      {
        className: 'function',
        beginKeywords: 'function', end: '[{;]', excludeEnd: true,
        illegal: '\\S',
        contains: [
          hljs.TITLE_MODE,
          {
            className: 'params',
            begin: '\\(', end: '\\)',
            contains: [
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE,
              AS3_REST_ARG_MODE
            ]
          },
          {
            begin: ':\\s*' + IDENT_FUNC_RETURN_TYPE_RE
          }
        ]
      }
    ],
    illegal: /#/
  };
});

hljs.registerLanguage('apache', function(hljs) {
  var NUMBER = {className: 'number', begin: '[\\$%]\\d+'};
  return {
    aliases: ['apacheconf'],
    case_insensitive: true,
    contains: [
      hljs.HASH_COMMENT_MODE,
      {className: 'section', begin: '</?', end: '>'},
      {
        className: 'attribute',
        begin: /\w+/,
        relevance: 0,
        // keywords aren’t needed for highlighting per se, they only boost relevance
        // for a very generally defined mode (starts with a word, ends with line-end
        keywords: {
          nomarkup:
            'order deny allow setenv rewriterule rewriteengine rewritecond documentroot ' +
            'sethandler errordocument loadmodule options header listen serverroot ' +
            'servername'
        },
        starts: {
          end: /$/,
          relevance: 0,
          keywords: {
            literal: 'on off all'
          },
          contains: [
            {
              className: 'meta',
              begin: '\\s\\[', end: '\\]$'
            },
            {
              className: 'variable',
              begin: '[\\$%]\\{', end: '\\}',
              contains: ['self', NUMBER]
            },
            NUMBER,
            hljs.QUOTE_STRING_MODE
          ]
        }
      }
    ],
    illegal: /\S/
  };
});

hljs.registerLanguage('applescript', function(hljs) {
  var STRING = hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: ''});
  var PARAMS = {
    className: 'params',
    begin: '\\(', end: '\\)',
    contains: ['self', hljs.C_NUMBER_MODE, STRING]
  };
  var COMMENT_MODE_1 = hljs.COMMENT('--', '$');
  var COMMENT_MODE_2 = hljs.COMMENT(
    '\\(\\*',
    '\\*\\)',
    {
      contains: ['self', COMMENT_MODE_1] //allow nesting
    }
  );
  var COMMENTS = [
    COMMENT_MODE_1,
    COMMENT_MODE_2,
    hljs.HASH_COMMENT_MODE
  ];

  return {
    aliases: ['osascript'],
    keywords: {
      keyword:
        'about above after against and around as at back before beginning ' +
        'behind below beneath beside between but by considering ' +
        'contain contains continue copy div does eighth else end equal ' +
        'equals error every exit fifth first for fourth from front ' +
        'get given global if ignoring in into is it its last local me ' +
        'middle mod my ninth not of on onto or over prop property put ref ' +
        'reference repeat returning script second set seventh since ' +
        'sixth some tell tenth that the|0 then third through thru ' +
        'timeout times to transaction try until where while whose with ' +
        'without',
      literal:
        'AppleScript false linefeed return pi quote result space tab true',
      built_in:
        'alias application boolean class constant date file integer list ' +
        'number real record string text ' +
        'activate beep count delay launch log offset read round ' +
        'run say summarize write ' +
        'character characters contents day frontmost id item length ' +
        'month name paragraph paragraphs rest reverse running time version ' +
        'weekday word words year'
    },
    contains: [
      STRING,
      hljs.C_NUMBER_MODE,
      {
        className: 'built_in',
        begin:
          '\\b(clipboard info|the clipboard|info for|list (disks|folder)|' +
          'mount volume|path to|(close|open for) access|(get|set) eof|' +
          'current date|do shell script|get volume settings|random number|' +
          'set volume|system attribute|system info|time to GMT|' +
          '(load|run|store) script|scripting components|' +
          'ASCII (character|number)|localized string|' +
          'choose (application|color|file|file name|' +
          'folder|from list|remote application|URL)|' +
          'display (alert|dialog))\\b|^\\s*return\\b'
      },
      {
        className: 'literal',
        begin:
          '\\b(text item delimiters|current application|missing value)\\b'
      },
      {
        className: 'keyword',
        begin:
          '\\b(apart from|aside from|instead of|out of|greater than|' +
          "isn't|(doesn't|does not) (equal|come before|come after|contain)|" +
          '(greater|less) than( or equal)?|(starts?|ends|begins?) with|' +
          'contained by|comes (before|after)|a (ref|reference)|POSIX file|' +
          'POSIX path|(date|time) string|quoted form)\\b'
      },
      {
        beginKeywords: 'on',
        illegal: '[${=;\\n]',
        contains: [hljs.UNDERSCORE_TITLE_MODE, PARAMS]
      }
    ].concat(COMMENTS),
    illegal: '//|->|=>|\\[\\['
  };
});

hljs.registerLanguage('arduino', function(hljs) {

	// CPP Strings
	var STRINGS = {
	    className: 'string',
	    variants: [
	      hljs.inherit(hljs.QUOTE_STRING_MODE, { begin: '((u8?|U)|L)?"' }),
	      {
	        begin: '(u8?|U)?R"', end: '"',
	        contains: [hljs.BACKSLASH_ESCAPE]
	      },
	      {
	        begin: '\'\\\\?.', end: '\'',
	        illegal: '.'
	      }
	    ]
	  };

	// CPP preprocessor
	var PREPROCESSOR =       {
	    className: 'meta',
	    begin: '#', end: '$',
	    keywords: {'meta-keyword': 'if else elif endif define undef warning error line ' +
	                  'pragma ifdef ifndef'},
	    contains: [
	      {
	        begin: /\\\n/, relevance: 0
	      },
	      {
	        beginKeywords: 'include', end: '$',
	        keywords: {'meta-keyword': 'include'},
	        contains: [
	          hljs.inherit(STRINGS, {className: 'meta-string'}),
	          {
	            className: 'meta-string',
	            begin: '<', end: '>',
	            illegal: '\\n',
	          }
	        ]
	      },
	      STRINGS,
	      hljs.C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE
	    ]
	  };

  	return {
	    keywords: {
	      function: 'setup loop while catch for if do goto try switch case else default break continue return',
	      keyword: 'boolean byte word string String array ' +
	      // CPP keywords
	      'int float private char export virtual operator sizeof uint8_t uint16_t ' +
	      'uint32_t uint64_t int8_t int16_t int32_t int64_t ' +
	      'dynamic_cast typedef const_cast const struct static_cast union namespace ' +
	      'unsigned long volatile static protected bool template mutable public friend ' +
	      'auto void enum extern using class asm typeid ' +
	      'short reinterpret_cast double register explicit signed typename this ' +
	      'inline delete alignof constexpr decltype ' +
	      'noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary ' +
	      'atomic_bool atomic_char atomic_schar ' +
	      'atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong ' +
	      'atomic_ullong',
	      built_in: 'KeyboardController MouseController SoftwareSerial ' + 
	            'EthernetServer EthernetClient LiquidCrystal ' + 
	            'RobotControl GSMVoiceCall EthernetUDP EsploraTFT ' + 
	            'HttpClient RobotMotor WiFiClient GSMScanner ' + 
	            'FileSystem Scheduler GSMServer YunClient YunServer ' + 
	            'IPAddress GSMClient GSMModem Keyboard Ethernet ' + 
	            'Console GSMBand Esplora Stepper Process ' + 
	            'WiFiUDP GSM_SMS Mailbox USBHost Firmata PImage ' + 
	            'Client Server GSMPIN FileIO Bridge Serial ' + 
	            'EEPROM Stream Mouse Audio Servo File Task ' + 
	            'GPRS WiFi Wire TFT GSM SPI SD ' + 
	            'runShellCommandAsynchronously analogWriteResolution ' + 
	            'retrieveCallingNumber printFirmwareVersion ' + 
	            'analogReadResolution sendDigitalPortPair ' + 
	            'noListenOnLocalhost readJoystickButton setFirmwareVersion ' + 
	            'readJoystickSwitch scrollDisplayRight getVoiceCallStatus ' + 
	            'scrollDisplayLeft writeMicroseconds delayMicroseconds ' + 
	            'beginTransmission getSignalStrength runAsynchronously ' + 
	            'getAsynchronously listenOnLocalhost getCurrentCarrier ' + 
	            'readAccelerometer messageAvailable sendDigitalPorts ' + 
	            'lineFollowConfig countryNameWrite runShellCommand ' + 
	            'readStringUntil rewindDirectory readTemperature ' + 
	            'setClockDivider readLightSensor endTransmission ' + 
	            'analogReference detachInterrupt countryNameRead ' + 
	            'attachInterrupt encryptionType readBytesUntil ' + 
	            'robotNameWrite readMicrophone robotNameRead cityNameWrite ' + 
	            'userNameWrite readJoystickY readJoystickX mouseReleased ' + 
	            'openNextFile scanNetworks noInterrupts digitalWrite ' + 
	            'beginSpeaker mousePressed isActionDone mouseDragged ' + 
	            'displayLogos noAutoscroll addParameter remoteNumber ' + 
	            'getModifiers keyboardRead userNameRead waitContinue ' + 
	            'processInput parseCommand printVersion readNetworks ' + 
	            'writeMessage blinkVersion cityNameRead readMessage ' + 
	            'setDataMode parsePacket isListening setBitOrder ' + 
	            'beginPacket isDirectory motorsWrite drawCompass ' + 
	            'digitalRead clearScreen serialEvent rightToLeft ' + 
	            'setTextSize leftToRight requestFrom keyReleased ' + 
	            'compassRead analogWrite interrupts WiFiServer ' + 
	            'disconnect playMelody parseFloat autoscroll ' + 
	            'getPINUsed setPINUsed setTimeout sendAnalog ' + 
	            'readSlider analogRead beginWrite createChar ' + 
	            'motorsStop keyPressed tempoWrite readButton ' + 
	            'subnetMask debugPrint macAddress writeGreen ' + 
	            'randomSeed attachGPRS readString sendString ' + 
	            'remotePort releaseAll mouseMoved background ' + 
	            'getXChange getYChange answerCall getResult ' +  
	            'voiceCall endPacket constrain getSocket writeJSON ' + 
	            'getButton available connected findUntil readBytes ' + 
	            'exitValue readGreen writeBlue startLoop IPAddress ' + 
	            'isPressed sendSysex pauseMode gatewayIP setCursor ' + 
	            'getOemKey tuneWrite noDisplay loadImage switchPIN ' + 
	            'onRequest onReceive changePIN playFile noBuffer ' + 
	            'parseInt overflow checkPIN knobRead beginTFT ' + 
	            'bitClear updateIR bitWrite position writeRGB ' + 
	            'highByte writeRed setSpeed readBlue noStroke ' + 
	            'remoteIP transfer shutdown hangCall beginSMS ' + 
	            'endWrite attached maintain noCursor checkReg ' + 
	            'checkPUK shiftOut isValid shiftIn pulseIn ' + 
	            'connect println localIP pinMode getIMEI ' + 
	            'display noBlink process getBand running beginSD ' + 
	            'drawBMP lowByte setBand release bitRead prepare ' + 
	            'pointTo readRed setMode noFill remove listen ' + 
	            'stroke detach attach noTone exists buffer ' + 
	            'height bitSet circle config cursor random ' + 
	            'IRread setDNS endSMS getKey micros ' + 
	            'millis begin print write ready flush width ' + 
	            'isPIN blink clear press mkdir rmdir close ' + 
	            'point yield image BSSID click delay ' + 
	            'read text move peek beep rect line open ' + 
	            'seek fill size turn stop home find ' + 
	            'step tone sqrt RSSI SSID ' + 
	            'end bit tan cos sin pow map abs max ' + 
	            'min get run put',
	        symbol: 'DIGITAL_MESSAGE FIRMATA_STRING ANALOG_MESSAGE ' + 
	            'REPORT_DIGITAL REPORT_ANALOG INPUT_PULLUP ' + 
	            'SET_PIN_MODE INTERNAL2V56 SYSTEM_RESET LED_BUILTIN ' + 
	            'INTERNAL1V1 SYSEX_START INTERNAL EXTERNAL ' + 
	            'DEFAULT OUTPUT INPUT HIGH LOW' 
	    },
	    contains: [
	      PREPROCESSOR,
	      hljs.C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE,
	      hljs.APOS_STRING_MODE,
	      hljs.QUOTE_STRING_MODE,
	      hljs.C_NUMBER_MODE
	    ]
    };
});

hljs.registerLanguage('armasm', function(hljs) {
    //local labels: %?[FB]?[AT]?\d{1,2}\w+
  return {
    case_insensitive: true,
    aliases: ['arm'],
    lexemes: '\\.?' + hljs.IDENT_RE,
    keywords: {
      meta:
        //GNU preprocs
        '.2byte .4byte .align .ascii .asciz .balign .byte .code .data .else .end .endif .endm .endr .equ .err .exitm .extern .global .hword .if .ifdef .ifndef .include .irp .long .macro .rept .req .section .set .skip .space .text .word .arm .thumb .code16 .code32 .force_thumb .thumb_func .ltorg '+
        //ARM directives
        'ALIAS ALIGN ARM AREA ASSERT ATTR CN CODE CODE16 CODE32 COMMON CP DATA DCB DCD DCDU DCDO DCFD DCFDU DCI DCQ DCQU DCW DCWU DN ELIF ELSE END ENDFUNC ENDIF ENDP ENTRY EQU EXPORT EXPORTAS EXTERN FIELD FILL FUNCTION GBLA GBLL GBLS GET GLOBAL IF IMPORT INCBIN INCLUDE INFO KEEP LCLA LCLL LCLS LTORG MACRO MAP MEND MEXIT NOFP OPT PRESERVE8 PROC QN READONLY RELOC REQUIRE REQUIRE8 RLIST FN ROUT SETA SETL SETS SN SPACE SUBT THUMB THUMBX TTL WHILE WEND ',
      built_in:
        'r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 '+ //standard registers
        'pc lr sp ip sl sb fp '+ //typical regs plus backward compatibility
        'a1 a2 a3 a4 v1 v2 v3 v4 v5 v6 v7 v8 f0 f1 f2 f3 f4 f5 f6 f7 '+ //more regs and fp
        'p0 p1 p2 p3 p4 p5 p6 p7 p8 p9 p10 p11 p12 p13 p14 p15 '+ //coprocessor regs
        'c0 c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 '+ //more coproc
        'q0 q1 q2 q3 q4 q5 q6 q7 q8 q9 q10 q11 q12 q13 q14 q15 '+ //advanced SIMD NEON regs

        //program status registers
        'cpsr_c cpsr_x cpsr_s cpsr_f cpsr_cx cpsr_cxs cpsr_xs cpsr_xsf cpsr_sf cpsr_cxsf '+
        'spsr_c spsr_x spsr_s spsr_f spsr_cx spsr_cxs spsr_xs spsr_xsf spsr_sf spsr_cxsf '+

        //NEON and VFP registers
        's0 s1 s2 s3 s4 s5 s6 s7 s8 s9 s10 s11 s12 s13 s14 s15 '+
        's16 s17 s18 s19 s20 s21 s22 s23 s24 s25 s26 s27 s28 s29 s30 s31 '+
        'd0 d1 d2 d3 d4 d5 d6 d7 d8 d9 d10 d11 d12 d13 d14 d15 '+
        'd16 d17 d18 d19 d20 d21 d22 d23 d24 d25 d26 d27 d28 d29 d30 d31 ' +

        '{PC} {VAR} {TRUE} {FALSE} {OPT} {CONFIG} {ENDIAN} {CODESIZE} {CPU} {FPU} {ARCHITECTURE} {PCSTOREOFFSET} {ARMASM_VERSION} {INTER} {ROPI} {RWPI} {SWST} {NOSWST} . @'
    },
    contains: [
      {
        className: 'keyword',
        begin: '\\b('+     //mnemonics
            'adc|'+
            '(qd?|sh?|u[qh]?)?add(8|16)?|usada?8|(q|sh?|u[qh]?)?(as|sa)x|'+
            'and|adrl?|sbc|rs[bc]|asr|b[lx]?|blx|bxj|cbn?z|tb[bh]|bic|'+
            'bfc|bfi|[su]bfx|bkpt|cdp2?|clz|clrex|cmp|cmn|cpsi[ed]|cps|'+
            'setend|dbg|dmb|dsb|eor|isb|it[te]{0,3}|lsl|lsr|ror|rrx|'+
            'ldm(([id][ab])|f[ds])?|ldr((s|ex)?[bhd])?|movt?|mvn|mra|mar|'+
            'mul|[us]mull|smul[bwt][bt]|smu[as]d|smmul|smmla|'+
            'mla|umlaal|smlal?([wbt][bt]|d)|mls|smlsl?[ds]|smc|svc|sev|'+
            'mia([bt]{2}|ph)?|mrr?c2?|mcrr2?|mrs|msr|orr|orn|pkh(tb|bt)|rbit|'+
            'rev(16|sh)?|sel|[su]sat(16)?|nop|pop|push|rfe([id][ab])?|'+
            'stm([id][ab])?|str(ex)?[bhd]?|(qd?)?sub|(sh?|q|u[qh]?)?sub(8|16)|'+
            '[su]xt(a?h|a?b(16)?)|srs([id][ab])?|swpb?|swi|smi|tst|teq|'+
            'wfe|wfi|yield'+
        ')'+
        '(eq|ne|cs|cc|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al|hs|lo)?'+ //condition codes
        '[sptrx]?' ,                                             //legal postfixes
        end: '\\s'
      },
      hljs.COMMENT('[;@]', '$', {relevance: 0}),
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: '\'',
        end: '[^\\\\]\'',
        relevance: 0
      },
      {
        className: 'title',
        begin: '\\|', end: '\\|',
        illegal: '\\n',
        relevance: 0
      },
      {
        className: 'number',
        variants: [
            {begin: '[#$=]?0x[0-9a-f]+'}, //hex
            {begin: '[#$=]?0b[01]+'},     //bin
            {begin: '[#$=]\\d+'},        //literal
            {begin: '\\b\\d+'}           //bare number
        ],
        relevance: 0
      },
      {
        className: 'symbol',
        variants: [
            {begin: '^[a-z_\\.\\$][a-z0-9_\\.\\$]+'}, //ARM syntax
            {begin: '^\\s*[a-z_\\.\\$][a-z0-9_\\.\\$]+:'}, //GNU ARM syntax
            {begin: '[=#]\\w+' }  //label reference
        ],
        relevance: 0
      }
    ]
  };
});

hljs.registerLanguage('xml', function(hljs) {
  var XML_IDENT_RE = '[A-Za-z0-9\\._:-]+';
  var PHP = {
    begin: /<\?(php)?(?!\w)/, end: /\?>/,
    subLanguage: 'php'
  };
  var TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
      PHP,
      {
        className: 'attr',
        begin: XML_IDENT_RE,
        relevance: 0
      },
      {
        begin: '=',
        relevance: 0,
        contains: [
          {
            className: 'string',
            contains: [PHP],
            variants: [
              {begin: /"/, end: /"/},
              {begin: /'/, end: /'/},
              {begin: /[^\s\/>]+/}
            ]
          }
        ]
      }
    ]
  };
  return {
    aliases: ['html', 'xhtml', 'rss', 'atom', 'xsl', 'plist'],
    case_insensitive: true,
    contains: [
      {
        className: 'meta',
        begin: '<!DOCTYPE', end: '>',
        relevance: 10,
        contains: [{begin: '\\[', end: '\\]'}]
      },
      hljs.COMMENT(
        '<!--',
        '-->',
        {
          relevance: 10
        }
      ),
      {
        begin: '<\\!\\[CDATA\\[', end: '\\]\\]>',
        relevance: 10
      },
      {
        className: 'tag',
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending braket. The '$' is needed for the lexeme to be recognized
        by hljs.subMode() that tests lexemes outside the stream.
        */
        begin: '<style(?=\\s|>|$)', end: '>',
        keywords: {name: 'style'},
        contains: [TAG_INTERNALS],
        starts: {
          end: '</style>', returnEnd: true,
          subLanguage: ['css', 'xml']
        }
      },
      {
        className: 'tag',
        // See the comment in the <style tag about the lookahead pattern
        begin: '<script(?=\\s|>|$)', end: '>',
        keywords: {name: 'script'},
        contains: [TAG_INTERNALS],
        starts: {
          end: '\<\/script\>', returnEnd: true,
          subLanguage: ['actionscript', 'javascript', 'handlebars', 'xml']
        }
      },
      PHP,
      {
        className: 'meta',
        begin: /<\?\w+/, end: /\?>/,
        relevance: 10
      },
      {
        className: 'tag',
        begin: '</?', end: '/?>',
        contains: [
          {
            className: 'name', begin: /[^\/><\s]+/, relevance: 0
          },
          TAG_INTERNALS
        ]
      }
    ]
  };
});

hljs.registerLanguage('asciidoc', function(hljs) {
  return {
    aliases: ['adoc'],
    contains: [
      // block comment
      hljs.COMMENT(
        '^/{4,}\\n',
        '\\n/{4,}$',
        // can also be done as...
        //'^/{4,}$',
        //'^/{4,}$',
        {
          relevance: 10
        }
      ),
      // line comment
      hljs.COMMENT(
        '^//',
        '$',
        {
          relevance: 0
        }
      ),
      // title
      {
        className: 'title',
        begin: '^\\.\\w.*$'
      },
      // example, admonition & sidebar blocks
      {
        begin: '^[=\\*]{4,}\\n',
        end: '\\n^[=\\*]{4,}$',
        relevance: 10
      },
      // headings
      {
        className: 'section',
        relevance: 10,
        variants: [
          {begin: '^(={1,5}) .+?( \\1)?$'},
          {begin: '^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$'},
        ]
      },
      // document attributes
      {
        className: 'meta',
        begin: '^:.+?:',
        end: '\\s',
        excludeEnd: true,
        relevance: 10
      },
      // block attributes
      {
        className: 'meta',
        begin: '^\\[.+?\\]$',
        relevance: 0
      },
      // quoteblocks
      {
        className: 'quote',
        begin: '^_{4,}\\n',
        end: '\\n_{4,}$',
        relevance: 10
      },
      // listing and literal blocks
      {
        className: 'code',
        begin: '^[\\-\\.]{4,}\\n',
        end: '\\n[\\-\\.]{4,}$',
        relevance: 10
      },
      // passthrough blocks
      {
        begin: '^\\+{4,}\\n',
        end: '\\n\\+{4,}$',
        contains: [
          {
            begin: '<', end: '>',
            subLanguage: 'xml',
            relevance: 0
          }
        ],
        relevance: 10
      },
      // lists (can only capture indicators)
      {
        className: 'bullet',
        begin: '^(\\*+|\\-+|\\.+|[^\\n]+?::)\\s+'
      },
      // admonition
      {
        className: 'symbol',
        begin: '^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+',
        relevance: 10
      },
      // inline strong
      {
        className: 'strong',
        // must not follow a word character or be followed by an asterisk or space
        begin: '\\B\\*(?![\\*\\s])',
        end: '(\\n{2}|\\*)',
        // allow escaped asterisk followed by word char
        contains: [
          {
            begin: '\\\\*\\w',
            relevance: 0
          }
        ]
      },
      // inline emphasis
      {
        className: 'emphasis',
        // must not follow a word character or be followed by a single quote or space
        begin: '\\B\'(?![\'\\s])',
        end: '(\\n{2}|\')',
        // allow escaped single quote followed by word char
        contains: [
          {
            begin: '\\\\\'\\w',
            relevance: 0
          }
        ],
        relevance: 0
      },
      // inline emphasis (alt)
      {
        className: 'emphasis',
        // must not follow a word character or be followed by an underline or space
        begin: '_(?![_\\s])',
        end: '(\\n{2}|_)',
        relevance: 0
      },
      // inline smart quotes
      {
        className: 'string',
        variants: [
          {begin: "``.+?''"},
          {begin: "`.+?'"}
        ]
      },
      // inline code snippets (TODO should get same treatment as strong and emphasis)
      {
        className: 'code',
        begin: '(`.+?`|\\+.+?\\+)',
        relevance: 0
      },
      // indented literal block
      {
        className: 'code',
        begin: '^[ \\t]',
        end: '$',
        relevance: 0
      },
      // horizontal rules
      {
        begin: '^\'{3,}[ \\t]*$',
        relevance: 10
      },
      // images and links
      {
        begin: '(link:)?(http|https|ftp|file|irc|image:?):\\S+\\[.*?\\]',
        returnBegin: true,
        contains: [
          {
            begin: '(link|image:?):',
            relevance: 0
          },
          {
            className: 'link',
            begin: '\\w',
            end: '[^\\[]+',
            relevance: 0
          },
          {
            className: 'string',
            begin: '\\[',
            end: '\\]',
            excludeBegin: true,
            excludeEnd: true,
            relevance: 0
          }
        ],
        relevance: 10
      }
    ]
  };
});

hljs.registerLanguage('aspectj', function (hljs) {
  var KEYWORDS =
    'false synchronized int abstract float private char boolean static null if const ' +
    'for true while long throw strictfp finally protected import native final return void ' +
    'enum else extends implements break transient new catch instanceof byte super volatile case ' +
    'assert short package default double public try this switch continue throws privileged ' +
    'aspectOf adviceexecution proceed cflowbelow cflow initialization preinitialization ' +
    'staticinitialization withincode target within execution getWithinTypeName handler ' +
    'thisJoinPoint thisJoinPointStaticPart thisEnclosingJoinPointStaticPart declare parents '+
    'warning error soft precedence thisAspectInstance';
  var SHORTKEYS = 'get set args call';
  return {
    keywords : KEYWORDS,
    illegal : /<\/|#/,
    contains : [
      hljs.COMMENT(
        '/\\*\\*',
        '\\*/',
        {
          relevance : 0,
          contains : [
            {
              // eat up @'s in emails to prevent them to be recognized as doctags
              begin: /\w+@/, relevance: 0
            },
            {
              className : 'doctag',
              begin : '@[A-Za-z]+'
            }
          ]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className : 'class',
        beginKeywords : 'aspect',
        end : /[{;=]/,
        excludeEnd : true,
        illegal : /[:;"\[\]]/,
        contains : [
          {
            beginKeywords : 'extends implements pertypewithin perthis pertarget percflowbelow percflow issingleton'
          },
          hljs.UNDERSCORE_TITLE_MODE,
          {
            begin : /\([^\)]*/,
            end : /[)]+/,
            keywords : KEYWORDS + ' ' + SHORTKEYS,
            excludeEnd : false
          }
        ]
      },
      {
        className : 'class',
        beginKeywords : 'class interface',
        end : /[{;=]/,
        excludeEnd : true,
        relevance: 0,
        keywords : 'class interface',
        illegal : /[:"\[\]]/,
        contains : [
          {beginKeywords : 'extends implements'},
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        // AspectJ Constructs
        beginKeywords : 'pointcut after before around throwing returning',
        end : /[)]/,
        excludeEnd : false,
        illegal : /["\[\]]/,
        contains : [
          {
            begin : hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
            returnBegin : true,
            contains : [hljs.UNDERSCORE_TITLE_MODE]
          }
        ]
      },
      {
        begin : /[:]/,
        returnBegin : true,
        end : /[{;]/,
        relevance: 0,
        excludeEnd : false,
        keywords : KEYWORDS,
        illegal : /["\[\]]/,
        contains : [
          {
            begin : hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
            keywords : KEYWORDS + ' ' + SHORTKEYS
          },
          hljs.QUOTE_STRING_MODE
        ]
      },
      {
        // this prevents 'new Name(...), or throw ...' from being recognized as a function definition
        beginKeywords : 'new throw',
        relevance : 0
      },
      {
        // the function class is a bit different for AspectJ compared to the Java language
        className : 'function',
        begin : /\w+ +\w+(\.)?\w+\s*\([^\)]*\)\s*((throws)[\w\s,]+)?[\{;]/,
        returnBegin : true,
        end : /[{;=]/,
        keywords : KEYWORDS,
        excludeEnd : true,
        contains : [
          {
            begin : hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
            returnBegin : true,
            relevance: 0,
            contains : [hljs.UNDERSCORE_TITLE_MODE]
          },
          {
            className : 'params',
            begin : /\(/, end : /\)/,
            relevance: 0,
            keywords : KEYWORDS,
            contains : [
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.C_NUMBER_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      hljs.C_NUMBER_MODE,
      {
        // annotation is also used in this language
        className : 'meta',
        begin : '@[A-Za-z]+'
      }
    ]
  };
});

hljs.registerLanguage('autohotkey', function(hljs) {
  var BACKTICK_ESCAPE = {
    begin: /`[\s\S]/
  };

  return {
    case_insensitive: true,
    keywords: {
      keyword: 'Break Continue Else Gosub If Loop Return While',
      literal: 'A|0 true false NOT AND OR',
      built_in: 'ComSpec Clipboard ClipboardAll ErrorLevel',
    },
    contains: [
      {
        className: 'built_in',
        begin: 'A_[a-zA-Z0-9]+'
      },
      BACKTICK_ESCAPE,
      hljs.inherit(hljs.QUOTE_STRING_MODE, {contains: [BACKTICK_ESCAPE]}),
      hljs.COMMENT(';', '$', {relevance: 0}),
      {
        className: 'number',
        begin: hljs.NUMBER_RE,
        relevance: 0
      },
      {
        className: 'variable', // FIXME
        begin: '%', end: '%',
        illegal: '\\n',
        contains: [BACKTICK_ESCAPE]
      },
      {
        className: 'symbol',
        contains: [BACKTICK_ESCAPE],
        variants: [
          {begin: '^[^\\n";]+::(?!=)'},
          {begin: '^[^\\n";]+:(?!=)', relevance: 0} // zero relevance as it catches a lot of things
                                                    // followed by a single ':' in many languages
        ]
      },
      {
        // consecutive commas, not for highlighting but just for relevance
        begin: ',\\s*,'
      }
    ]
  }
});

hljs.registerLanguage('autoit', function(hljs) {
    var KEYWORDS = 'ByRef Case Const ContinueCase ContinueLoop ' +
        'Default Dim Do Else ElseIf EndFunc EndIf EndSelect ' +
        'EndSwitch EndWith Enum Exit ExitLoop For Func ' +
        'Global If In Local Next ReDim Return Select Static ' +
        'Step Switch Then To Until Volatile WEnd While With',

        LITERAL = 'True False And Null Not Or',

        BUILT_IN = 'Abs ACos AdlibRegister AdlibUnRegister Asc AscW ASin ' +
        'Assign ATan AutoItSetOption AutoItWinGetTitle ' +
        'AutoItWinSetTitle Beep Binary BinaryLen BinaryMid ' +
        'BinaryToString BitAND BitNOT BitOR BitRotate BitShift ' +
        'BitXOR BlockInput Break Call CDTray Ceiling Chr ' +
        'ChrW ClipGet ClipPut ConsoleRead ConsoleWrite ' +
        'ConsoleWriteError ControlClick ControlCommand ' +
        'ControlDisable ControlEnable ControlFocus ControlGetFocus ' +
        'ControlGetHandle ControlGetPos ControlGetText ControlHide ' +
        'ControlListView ControlMove ControlSend ControlSetText ' +
        'ControlShow ControlTreeView Cos Dec DirCopy DirCreate ' +
        'DirGetSize DirMove DirRemove DllCall DllCallAddress ' +
        'DllCallbackFree DllCallbackGetPtr DllCallbackRegister ' +
        'DllClose DllOpen DllStructCreate DllStructGetData ' +
        'DllStructGetPtr DllStructGetSize DllStructSetData ' +
        'DriveGetDrive DriveGetFileSystem DriveGetLabel ' +
        'DriveGetSerial DriveGetType DriveMapAdd DriveMapDel ' +
        'DriveMapGet DriveSetLabel DriveSpaceFree DriveSpaceTotal ' +
        'DriveStatus EnvGet EnvSet EnvUpdate Eval Execute Exp ' +
        'FileChangeDir FileClose FileCopy FileCreateNTFSLink ' +
        'FileCreateShortcut FileDelete FileExists FileFindFirstFile ' +
        'FileFindNextFile FileFlush FileGetAttrib FileGetEncoding ' +
        'FileGetLongName FileGetPos FileGetShortcut FileGetShortName ' +
        'FileGetSize FileGetTime FileGetVersion FileInstall ' +
        'FileMove FileOpen FileOpenDialog FileRead FileReadLine ' +
        'FileReadToArray FileRecycle FileRecycleEmpty FileSaveDialog ' +
        'FileSelectFolder FileSetAttrib FileSetEnd FileSetPos ' +
        'FileSetTime FileWrite FileWriteLine Floor FtpSetProxy ' +
        'FuncName GUICreate GUICtrlCreateAvi GUICtrlCreateButton ' +
        'GUICtrlCreateCheckbox GUICtrlCreateCombo ' +
        'GUICtrlCreateContextMenu GUICtrlCreateDate GUICtrlCreateDummy ' +
        'GUICtrlCreateEdit GUICtrlCreateGraphic GUICtrlCreateGroup ' +
        'GUICtrlCreateIcon GUICtrlCreateInput GUICtrlCreateLabel ' +
        'GUICtrlCreateList GUICtrlCreateListView ' +
        'GUICtrlCreateListViewItem GUICtrlCreateMenu ' +
        'GUICtrlCreateMenuItem GUICtrlCreateMonthCal GUICtrlCreateObj ' +
        'GUICtrlCreatePic GUICtrlCreateProgress GUICtrlCreateRadio ' +
        'GUICtrlCreateSlider GUICtrlCreateTab GUICtrlCreateTabItem ' +
        'GUICtrlCreateTreeView GUICtrlCreateTreeViewItem ' +
        'GUICtrlCreateUpdown GUICtrlDelete GUICtrlGetHandle ' +
        'GUICtrlGetState GUICtrlRead GUICtrlRecvMsg ' +
        'GUICtrlRegisterListViewSort GUICtrlSendMsg GUICtrlSendToDummy ' +
        'GUICtrlSetBkColor GUICtrlSetColor GUICtrlSetCursor ' +
        'GUICtrlSetData GUICtrlSetDefBkColor GUICtrlSetDefColor ' +
        'GUICtrlSetFont GUICtrlSetGraphic GUICtrlSetImage ' +
        'GUICtrlSetLimit GUICtrlSetOnEvent GUICtrlSetPos ' +
        'GUICtrlSetResizing GUICtrlSetState GUICtrlSetStyle ' +
        'GUICtrlSetTip GUIDelete GUIGetCursorInfo GUIGetMsg ' +
        'GUIGetStyle GUIRegisterMsg GUISetAccelerators GUISetBkColor ' +
        'GUISetCoord GUISetCursor GUISetFont GUISetHelp GUISetIcon ' +
        'GUISetOnEvent GUISetState GUISetStyle GUIStartGroup ' +
        'GUISwitch Hex HotKeySet HttpSetProxy HttpSetUserAgent ' +
        'HWnd InetClose InetGet InetGetInfo InetGetSize InetRead ' +
        'IniDelete IniRead IniReadSection IniReadSectionNames ' +
        'IniRenameSection IniWrite IniWriteSection InputBox Int ' +
        'IsAdmin IsArray IsBinary IsBool IsDeclared IsDllStruct ' +
        'IsFloat IsFunc IsHWnd IsInt IsKeyword IsNumber IsObj ' +
        'IsPtr IsString Log MemGetStats Mod MouseClick ' +
        'MouseClickDrag MouseDown MouseGetCursor MouseGetPos ' +
        'MouseMove MouseUp MouseWheel MsgBox Number ObjCreate ' +
        'ObjCreateInterface ObjEvent ObjGet ObjName ' +
        'OnAutoItExitRegister OnAutoItExitUnRegister Opt Ping ' +
        'PixelChecksum PixelGetColor PixelSearch ProcessClose ' +
        'ProcessExists ProcessGetStats ProcessList ' +
        'ProcessSetPriority ProcessWait ProcessWaitClose ProgressOff ' +
        'ProgressOn ProgressSet Ptr Random RegDelete RegEnumKey ' +
        'RegEnumVal RegRead RegWrite Round Run RunAs RunAsWait ' +
        'RunWait Send SendKeepActive SetError SetExtended ' +
        'ShellExecute ShellExecuteWait Shutdown Sin Sleep ' +
        'SoundPlay SoundSetWaveVolume SplashImageOn SplashOff ' +
        'SplashTextOn Sqrt SRandom StatusbarGetText StderrRead ' +
        'StdinWrite StdioClose StdoutRead String StringAddCR ' +
        'StringCompare StringFormat StringFromASCIIArray StringInStr ' +
        'StringIsAlNum StringIsAlpha StringIsASCII StringIsDigit ' +
        'StringIsFloat StringIsInt StringIsLower StringIsSpace ' +
        'StringIsUpper StringIsXDigit StringLeft StringLen ' +
        'StringLower StringMid StringRegExp StringRegExpReplace ' +
        'StringReplace StringReverse StringRight StringSplit ' +
        'StringStripCR StringStripWS StringToASCIIArray ' +
        'StringToBinary StringTrimLeft StringTrimRight StringUpper ' +
        'Tan TCPAccept TCPCloseSocket TCPConnect TCPListen ' +
        'TCPNameToIP TCPRecv TCPSend TCPShutdown TCPStartup ' +
        'TimerDiff TimerInit ToolTip TrayCreateItem TrayCreateMenu ' +
        'TrayGetMsg TrayItemDelete TrayItemGetHandle ' +
        'TrayItemGetState TrayItemGetText TrayItemSetOnEvent ' +
        'TrayItemSetState TrayItemSetText TraySetClick TraySetIcon ' +
        'TraySetOnEvent TraySetPauseIcon TraySetState TraySetToolTip ' +
        'TrayTip UBound UDPBind UDPCloseSocket UDPOpen UDPRecv ' +
        'UDPSend UDPShutdown UDPStartup VarGetType WinActivate ' +
        'WinActive WinClose WinExists WinFlash WinGetCaretPos ' +
        'WinGetClassList WinGetClientSize WinGetHandle WinGetPos ' +
        'WinGetProcess WinGetState WinGetText WinGetTitle WinKill ' +
        'WinList WinMenuSelectItem WinMinimizeAll WinMinimizeAllUndo ' +
        'WinMove WinSetOnTop WinSetState WinSetTitle WinSetTrans ' +
        'WinWait WinWaitActive WinWaitClose WinWaitNotActive ' +
        'Array1DToHistogram ArrayAdd ArrayBinarySearch ' +
        'ArrayColDelete ArrayColInsert ArrayCombinations ' +
        'ArrayConcatenate ArrayDelete ArrayDisplay ArrayExtract ' +
        'ArrayFindAll ArrayInsert ArrayMax ArrayMaxIndex ArrayMin ' +
        'ArrayMinIndex ArrayPermute ArrayPop ArrayPush ' +
        'ArrayReverse ArraySearch ArrayShuffle ArraySort ArraySwap ' +
        'ArrayToClip ArrayToString ArrayTranspose ArrayTrim ' +
        'ArrayUnique Assert ChooseColor ChooseFont ' +
        'ClipBoard_ChangeChain ClipBoard_Close ClipBoard_CountFormats ' +
        'ClipBoard_Empty ClipBoard_EnumFormats ClipBoard_FormatStr ' +
        'ClipBoard_GetData ClipBoard_GetDataEx ClipBoard_GetFormatName ' +
        'ClipBoard_GetOpenWindow ClipBoard_GetOwner ' +
        'ClipBoard_GetPriorityFormat ClipBoard_GetSequenceNumber ' +
        'ClipBoard_GetViewer ClipBoard_IsFormatAvailable ' +
        'ClipBoard_Open ClipBoard_RegisterFormat ClipBoard_SetData ' +
        'ClipBoard_SetDataEx ClipBoard_SetViewer ClipPutFile ' +
        'ColorConvertHSLtoRGB ColorConvertRGBtoHSL ColorGetBlue ' +
        'ColorGetCOLORREF ColorGetGreen ColorGetRed ColorGetRGB ' +
        'ColorSetCOLORREF ColorSetRGB Crypt_DecryptData ' +
        'Crypt_DecryptFile Crypt_DeriveKey Crypt_DestroyKey ' +
        'Crypt_EncryptData Crypt_EncryptFile Crypt_GenRandom ' +
        'Crypt_HashData Crypt_HashFile Crypt_Shutdown Crypt_Startup ' +
        'DateAdd DateDayOfWeek DateDaysInMonth DateDiff ' +
        'DateIsLeapYear DateIsValid DateTimeFormat DateTimeSplit ' +
        'DateToDayOfWeek DateToDayOfWeekISO DateToDayValue ' +
        'DateToMonth Date_Time_CompareFileTime ' +
        'Date_Time_DOSDateTimeToArray Date_Time_DOSDateTimeToFileTime ' +
        'Date_Time_DOSDateTimeToStr Date_Time_DOSDateToArray ' +
        'Date_Time_DOSDateToStr Date_Time_DOSTimeToArray ' +
        'Date_Time_DOSTimeToStr Date_Time_EncodeFileTime ' +
        'Date_Time_EncodeSystemTime Date_Time_FileTimeToArray ' +
        'Date_Time_FileTimeToDOSDateTime ' +
        'Date_Time_FileTimeToLocalFileTime Date_Time_FileTimeToStr ' +
        'Date_Time_FileTimeToSystemTime Date_Time_GetFileTime ' +
        'Date_Time_GetLocalTime Date_Time_GetSystemTime ' +
        'Date_Time_GetSystemTimeAdjustment ' +
        'Date_Time_GetSystemTimeAsFileTime Date_Time_GetSystemTimes ' +
        'Date_Time_GetTickCount Date_Time_GetTimeZoneInformation ' +
        'Date_Time_LocalFileTimeToFileTime Date_Time_SetFileTime ' +
        'Date_Time_SetLocalTime Date_Time_SetSystemTime ' +
        'Date_Time_SetSystemTimeAdjustment ' +
        'Date_Time_SetTimeZoneInformation Date_Time_SystemTimeToArray ' +
        'Date_Time_SystemTimeToDateStr Date_Time_SystemTimeToDateTimeStr ' +
        'Date_Time_SystemTimeToFileTime Date_Time_SystemTimeToTimeStr ' +
        'Date_Time_SystemTimeToTzSpecificLocalTime ' +
        'Date_Time_TzSpecificLocalTimeToSystemTime DayValueToDate ' +
        'DebugBugReportEnv DebugCOMError DebugOut DebugReport ' +
        'DebugReportEx DebugReportVar DebugSetup Degree ' +
        'EventLog__Backup EventLog__Clear EventLog__Close ' +
        'EventLog__Count EventLog__DeregisterSource EventLog__Full ' +
        'EventLog__Notify EventLog__Oldest EventLog__Open ' +
        'EventLog__OpenBackup EventLog__Read EventLog__RegisterSource ' +
        'EventLog__Report Excel_BookAttach Excel_BookClose ' +
        'Excel_BookList Excel_BookNew Excel_BookOpen ' +
        'Excel_BookOpenText Excel_BookSave Excel_BookSaveAs ' +
        'Excel_Close Excel_ColumnToLetter Excel_ColumnToNumber ' +
        'Excel_ConvertFormula Excel_Export Excel_FilterGet ' +
        'Excel_FilterSet Excel_Open Excel_PictureAdd Excel_Print ' +
        'Excel_RangeCopyPaste Excel_RangeDelete Excel_RangeFind ' +
        'Excel_RangeInsert Excel_RangeLinkAddRemove Excel_RangeRead ' +
        'Excel_RangeReplace Excel_RangeSort Excel_RangeValidate ' +
        'Excel_RangeWrite Excel_SheetAdd Excel_SheetCopyMove ' +
        'Excel_SheetDelete Excel_SheetList FileCountLines FileCreate ' +
        'FileListToArray FileListToArrayRec FilePrint ' +
        'FileReadToArray FileWriteFromArray FileWriteLog ' +
        'FileWriteToLine FTP_Close FTP_Command FTP_Connect ' +
        'FTP_DecodeInternetStatus FTP_DirCreate FTP_DirDelete ' +
        'FTP_DirGetCurrent FTP_DirPutContents FTP_DirSetCurrent ' +
        'FTP_FileClose FTP_FileDelete FTP_FileGet FTP_FileGetSize ' +
        'FTP_FileOpen FTP_FilePut FTP_FileRead FTP_FileRename ' +
        'FTP_FileTimeLoHiToStr FTP_FindFileClose FTP_FindFileFirst ' +
        'FTP_FindFileNext FTP_GetLastResponseInfo FTP_ListToArray ' +
        'FTP_ListToArray2D FTP_ListToArrayEx FTP_Open ' +
        'FTP_ProgressDownload FTP_ProgressUpload FTP_SetStatusCallback ' +
        'GDIPlus_ArrowCapCreate GDIPlus_ArrowCapDispose ' +
        'GDIPlus_ArrowCapGetFillState GDIPlus_ArrowCapGetHeight ' +
        'GDIPlus_ArrowCapGetMiddleInset GDIPlus_ArrowCapGetWidth ' +
        'GDIPlus_ArrowCapSetFillState GDIPlus_ArrowCapSetHeight ' +
        'GDIPlus_ArrowCapSetMiddleInset GDIPlus_ArrowCapSetWidth ' +
        'GDIPlus_BitmapApplyEffect GDIPlus_BitmapApplyEffectEx ' +
        'GDIPlus_BitmapCloneArea GDIPlus_BitmapConvertFormat ' +
        'GDIPlus_BitmapCreateApplyEffect ' +
        'GDIPlus_BitmapCreateApplyEffectEx ' +
        'GDIPlus_BitmapCreateDIBFromBitmap GDIPlus_BitmapCreateFromFile ' +
        'GDIPlus_BitmapCreateFromGraphics ' +
        'GDIPlus_BitmapCreateFromHBITMAP GDIPlus_BitmapCreateFromHICON ' +
        'GDIPlus_BitmapCreateFromHICON32 GDIPlus_BitmapCreateFromMemory ' +
        'GDIPlus_BitmapCreateFromResource GDIPlus_BitmapCreateFromScan0 ' +
        'GDIPlus_BitmapCreateFromStream ' +
        'GDIPlus_BitmapCreateHBITMAPFromBitmap GDIPlus_BitmapDispose ' +
        'GDIPlus_BitmapGetHistogram GDIPlus_BitmapGetHistogramEx ' +
        'GDIPlus_BitmapGetHistogramSize GDIPlus_BitmapGetPixel ' +
        'GDIPlus_BitmapLockBits GDIPlus_BitmapSetPixel ' +
        'GDIPlus_BitmapUnlockBits GDIPlus_BrushClone ' +
        'GDIPlus_BrushCreateSolid GDIPlus_BrushDispose ' +
        'GDIPlus_BrushGetSolidColor GDIPlus_BrushGetType ' +
        'GDIPlus_BrushSetSolidColor GDIPlus_ColorMatrixCreate ' +
        'GDIPlus_ColorMatrixCreateGrayScale ' +
        'GDIPlus_ColorMatrixCreateNegative ' +
        'GDIPlus_ColorMatrixCreateSaturation ' +
        'GDIPlus_ColorMatrixCreateScale ' +
        'GDIPlus_ColorMatrixCreateTranslate GDIPlus_CustomLineCapClone ' +
        'GDIPlus_CustomLineCapCreate GDIPlus_CustomLineCapDispose ' +
        'GDIPlus_CustomLineCapGetStrokeCaps ' +
        'GDIPlus_CustomLineCapSetStrokeCaps GDIPlus_Decoders ' +
        'GDIPlus_DecodersGetCount GDIPlus_DecodersGetSize ' +
        'GDIPlus_DrawImageFX GDIPlus_DrawImageFXEx ' +
        'GDIPlus_DrawImagePoints GDIPlus_EffectCreate ' +
        'GDIPlus_EffectCreateBlur GDIPlus_EffectCreateBrightnessContrast ' +
        'GDIPlus_EffectCreateColorBalance GDIPlus_EffectCreateColorCurve ' +
        'GDIPlus_EffectCreateColorLUT GDIPlus_EffectCreateColorMatrix ' +
        'GDIPlus_EffectCreateHueSaturationLightness ' +
        'GDIPlus_EffectCreateLevels GDIPlus_EffectCreateRedEyeCorrection ' +
        'GDIPlus_EffectCreateSharpen GDIPlus_EffectCreateTint ' +
        'GDIPlus_EffectDispose GDIPlus_EffectGetParameters ' +
        'GDIPlus_EffectSetParameters GDIPlus_Encoders ' +
        'GDIPlus_EncodersGetCLSID GDIPlus_EncodersGetCount ' +
        'GDIPlus_EncodersGetParamList GDIPlus_EncodersGetParamListSize ' +
        'GDIPlus_EncodersGetSize GDIPlus_FontCreate ' +
        'GDIPlus_FontDispose GDIPlus_FontFamilyCreate ' +
        'GDIPlus_FontFamilyCreateFromCollection ' +
        'GDIPlus_FontFamilyDispose GDIPlus_FontFamilyGetCellAscent ' +
        'GDIPlus_FontFamilyGetCellDescent GDIPlus_FontFamilyGetEmHeight ' +
        'GDIPlus_FontFamilyGetLineSpacing GDIPlus_FontGetHeight ' +
        'GDIPlus_FontPrivateAddFont GDIPlus_FontPrivateAddMemoryFont ' +
        'GDIPlus_FontPrivateCollectionDispose ' +
        'GDIPlus_FontPrivateCreateCollection GDIPlus_GraphicsClear ' +
        'GDIPlus_GraphicsCreateFromHDC GDIPlus_GraphicsCreateFromHWND ' +
        'GDIPlus_GraphicsDispose GDIPlus_GraphicsDrawArc ' +
        'GDIPlus_GraphicsDrawBezier GDIPlus_GraphicsDrawClosedCurve ' +
        'GDIPlus_GraphicsDrawClosedCurve2 GDIPlus_GraphicsDrawCurve ' +
        'GDIPlus_GraphicsDrawCurve2 GDIPlus_GraphicsDrawEllipse ' +
        'GDIPlus_GraphicsDrawImage GDIPlus_GraphicsDrawImagePointsRect ' +
        'GDIPlus_GraphicsDrawImageRect GDIPlus_GraphicsDrawImageRectRect ' +
        'GDIPlus_GraphicsDrawLine GDIPlus_GraphicsDrawPath ' +
        'GDIPlus_GraphicsDrawPie GDIPlus_GraphicsDrawPolygon ' +
        'GDIPlus_GraphicsDrawRect GDIPlus_GraphicsDrawString ' +
        'GDIPlus_GraphicsDrawStringEx GDIPlus_GraphicsFillClosedCurve ' +
        'GDIPlus_GraphicsFillClosedCurve2 GDIPlus_GraphicsFillEllipse ' +
        'GDIPlus_GraphicsFillPath GDIPlus_GraphicsFillPie ' +
        'GDIPlus_GraphicsFillPolygon GDIPlus_GraphicsFillRect ' +
        'GDIPlus_GraphicsFillRegion GDIPlus_GraphicsGetCompositingMode ' +
        'GDIPlus_GraphicsGetCompositingQuality GDIPlus_GraphicsGetDC ' +
        'GDIPlus_GraphicsGetInterpolationMode ' +
        'GDIPlus_GraphicsGetSmoothingMode GDIPlus_GraphicsGetTransform ' +
        'GDIPlus_GraphicsMeasureCharacterRanges ' +
        'GDIPlus_GraphicsMeasureString GDIPlus_GraphicsReleaseDC ' +
        'GDIPlus_GraphicsResetClip GDIPlus_GraphicsResetTransform ' +
        'GDIPlus_GraphicsRestore GDIPlus_GraphicsRotateTransform ' +
        'GDIPlus_GraphicsSave GDIPlus_GraphicsScaleTransform ' +
        'GDIPlus_GraphicsSetClipPath GDIPlus_GraphicsSetClipRect ' +
        'GDIPlus_GraphicsSetClipRegion ' +
        'GDIPlus_GraphicsSetCompositingMode ' +
        'GDIPlus_GraphicsSetCompositingQuality ' +
        'GDIPlus_GraphicsSetInterpolationMode ' +
        'GDIPlus_GraphicsSetPixelOffsetMode ' +
        'GDIPlus_GraphicsSetSmoothingMode ' +
        'GDIPlus_GraphicsSetTextRenderingHint ' +
        'GDIPlus_GraphicsSetTransform GDIPlus_GraphicsTransformPoints ' +
        'GDIPlus_GraphicsTranslateTransform GDIPlus_HatchBrushCreate ' +
        'GDIPlus_HICONCreateFromBitmap GDIPlus_ImageAttributesCreate ' +
        'GDIPlus_ImageAttributesDispose ' +
        'GDIPlus_ImageAttributesSetColorKeys ' +
        'GDIPlus_ImageAttributesSetColorMatrix GDIPlus_ImageDispose ' +
        'GDIPlus_ImageGetDimension GDIPlus_ImageGetFlags ' +
        'GDIPlus_ImageGetGraphicsContext GDIPlus_ImageGetHeight ' +
        'GDIPlus_ImageGetHorizontalResolution ' +
        'GDIPlus_ImageGetPixelFormat GDIPlus_ImageGetRawFormat ' +
        'GDIPlus_ImageGetThumbnail GDIPlus_ImageGetType ' +
        'GDIPlus_ImageGetVerticalResolution GDIPlus_ImageGetWidth ' +
        'GDIPlus_ImageLoadFromFile GDIPlus_ImageLoadFromStream ' +
        'GDIPlus_ImageResize GDIPlus_ImageRotateFlip ' +
        'GDIPlus_ImageSaveToFile GDIPlus_ImageSaveToFileEx ' +
        'GDIPlus_ImageSaveToStream GDIPlus_ImageScale ' +
        'GDIPlus_LineBrushCreate GDIPlus_LineBrushCreateFromRect ' +
        'GDIPlus_LineBrushCreateFromRectWithAngle ' +
        'GDIPlus_LineBrushGetColors GDIPlus_LineBrushGetRect ' +
        'GDIPlus_LineBrushMultiplyTransform ' +
        'GDIPlus_LineBrushResetTransform GDIPlus_LineBrushSetBlend ' +
        'GDIPlus_LineBrushSetColors GDIPlus_LineBrushSetGammaCorrection ' +
        'GDIPlus_LineBrushSetLinearBlend GDIPlus_LineBrushSetPresetBlend ' +
        'GDIPlus_LineBrushSetSigmaBlend GDIPlus_LineBrushSetTransform ' +
        'GDIPlus_MatrixClone GDIPlus_MatrixCreate ' +
        'GDIPlus_MatrixDispose GDIPlus_MatrixGetElements ' +
        'GDIPlus_MatrixInvert GDIPlus_MatrixMultiply ' +
        'GDIPlus_MatrixRotate GDIPlus_MatrixScale ' +
        'GDIPlus_MatrixSetElements GDIPlus_MatrixShear ' +
        'GDIPlus_MatrixTransformPoints GDIPlus_MatrixTranslate ' +
        'GDIPlus_PaletteInitialize GDIPlus_ParamAdd GDIPlus_ParamInit ' +
        'GDIPlus_ParamSize GDIPlus_PathAddArc GDIPlus_PathAddBezier ' +
        'GDIPlus_PathAddClosedCurve GDIPlus_PathAddClosedCurve2 ' +
        'GDIPlus_PathAddCurve GDIPlus_PathAddCurve2 ' +
        'GDIPlus_PathAddCurve3 GDIPlus_PathAddEllipse ' +
        'GDIPlus_PathAddLine GDIPlus_PathAddLine2 GDIPlus_PathAddPath ' +
        'GDIPlus_PathAddPie GDIPlus_PathAddPolygon ' +
        'GDIPlus_PathAddRectangle GDIPlus_PathAddString ' +
        'GDIPlus_PathBrushCreate GDIPlus_PathBrushCreateFromPath ' +
        'GDIPlus_PathBrushGetCenterPoint GDIPlus_PathBrushGetFocusScales ' +
        'GDIPlus_PathBrushGetPointCount GDIPlus_PathBrushGetRect ' +
        'GDIPlus_PathBrushGetWrapMode GDIPlus_PathBrushMultiplyTransform ' +
        'GDIPlus_PathBrushResetTransform GDIPlus_PathBrushSetBlend ' +
        'GDIPlus_PathBrushSetCenterColor GDIPlus_PathBrushSetCenterPoint ' +
        'GDIPlus_PathBrushSetFocusScales ' +
        'GDIPlus_PathBrushSetGammaCorrection ' +
        'GDIPlus_PathBrushSetLinearBlend GDIPlus_PathBrushSetPresetBlend ' +
        'GDIPlus_PathBrushSetSigmaBlend ' +
        'GDIPlus_PathBrushSetSurroundColor ' +
        'GDIPlus_PathBrushSetSurroundColorsWithCount ' +
        'GDIPlus_PathBrushSetTransform GDIPlus_PathBrushSetWrapMode ' +
        'GDIPlus_PathClone GDIPlus_PathCloseFigure GDIPlus_PathCreate ' +
        'GDIPlus_PathCreate2 GDIPlus_PathDispose GDIPlus_PathFlatten ' +
        'GDIPlus_PathGetData GDIPlus_PathGetFillMode ' +
        'GDIPlus_PathGetLastPoint GDIPlus_PathGetPointCount ' +
        'GDIPlus_PathGetPoints GDIPlus_PathGetWorldBounds ' +
        'GDIPlus_PathIsOutlineVisiblePoint GDIPlus_PathIsVisiblePoint ' +
        'GDIPlus_PathIterCreate GDIPlus_PathIterDispose ' +
        'GDIPlus_PathIterGetSubpathCount GDIPlus_PathIterNextMarkerPath ' +
        'GDIPlus_PathIterNextSubpathPath GDIPlus_PathIterRewind ' +
        'GDIPlus_PathReset GDIPlus_PathReverse GDIPlus_PathSetFillMode ' +
        'GDIPlus_PathSetMarker GDIPlus_PathStartFigure ' +
        'GDIPlus_PathTransform GDIPlus_PathWarp GDIPlus_PathWiden ' +
        'GDIPlus_PathWindingModeOutline GDIPlus_PenCreate ' +
        'GDIPlus_PenCreate2 GDIPlus_PenDispose GDIPlus_PenGetAlignment ' +
        'GDIPlus_PenGetColor GDIPlus_PenGetCustomEndCap ' +
        'GDIPlus_PenGetDashCap GDIPlus_PenGetDashStyle ' +
        'GDIPlus_PenGetEndCap GDIPlus_PenGetMiterLimit ' +
        'GDIPlus_PenGetWidth GDIPlus_PenSetAlignment ' +
        'GDIPlus_PenSetColor GDIPlus_PenSetCustomEndCap ' +
        'GDIPlus_PenSetDashCap GDIPlus_PenSetDashStyle ' +
        'GDIPlus_PenSetEndCap GDIPlus_PenSetLineCap ' +
        'GDIPlus_PenSetLineJoin GDIPlus_PenSetMiterLimit ' +
        'GDIPlus_PenSetStartCap GDIPlus_PenSetWidth ' +
        'GDIPlus_RectFCreate GDIPlus_RegionClone ' +
        'GDIPlus_RegionCombinePath GDIPlus_RegionCombineRect ' +
        'GDIPlus_RegionCombineRegion GDIPlus_RegionCreate ' +
        'GDIPlus_RegionCreateFromPath GDIPlus_RegionCreateFromRect ' +
        'GDIPlus_RegionDispose GDIPlus_RegionGetBounds ' +
        'GDIPlus_RegionGetHRgn GDIPlus_RegionTransform ' +
        'GDIPlus_RegionTranslate GDIPlus_Shutdown GDIPlus_Startup ' +
        'GDIPlus_StringFormatCreate GDIPlus_StringFormatDispose ' +
        'GDIPlus_StringFormatGetMeasurableCharacterRangeCount ' +
        'GDIPlus_StringFormatSetAlign GDIPlus_StringFormatSetLineAlign ' +
        'GDIPlus_StringFormatSetMeasurableCharacterRanges ' +
        'GDIPlus_TextureCreate GDIPlus_TextureCreate2 ' +
        'GDIPlus_TextureCreateIA GetIP GUICtrlAVI_Close ' +
        'GUICtrlAVI_Create GUICtrlAVI_Destroy GUICtrlAVI_IsPlaying ' +
        'GUICtrlAVI_Open GUICtrlAVI_OpenEx GUICtrlAVI_Play ' +
        'GUICtrlAVI_Seek GUICtrlAVI_Show GUICtrlAVI_Stop ' +
        'GUICtrlButton_Click GUICtrlButton_Create ' +
        'GUICtrlButton_Destroy GUICtrlButton_Enable ' +
        'GUICtrlButton_GetCheck GUICtrlButton_GetFocus ' +
        'GUICtrlButton_GetIdealSize GUICtrlButton_GetImage ' +
        'GUICtrlButton_GetImageList GUICtrlButton_GetNote ' +
        'GUICtrlButton_GetNoteLength GUICtrlButton_GetSplitInfo ' +
        'GUICtrlButton_GetState GUICtrlButton_GetText ' +
        'GUICtrlButton_GetTextMargin GUICtrlButton_SetCheck ' +
        'GUICtrlButton_SetDontClick GUICtrlButton_SetFocus ' +
        'GUICtrlButton_SetImage GUICtrlButton_SetImageList ' +
        'GUICtrlButton_SetNote GUICtrlButton_SetShield ' +
        'GUICtrlButton_SetSize GUICtrlButton_SetSplitInfo ' +
        'GUICtrlButton_SetState GUICtrlButton_SetStyle ' +
        'GUICtrlButton_SetText GUICtrlButton_SetTextMargin ' +
        'GUICtrlButton_Show GUICtrlComboBoxEx_AddDir ' +
        'GUICtrlComboBoxEx_AddString GUICtrlComboBoxEx_BeginUpdate ' +
        'GUICtrlComboBoxEx_Create GUICtrlComboBoxEx_CreateSolidBitMap ' +
        'GUICtrlComboBoxEx_DeleteString GUICtrlComboBoxEx_Destroy ' +
        'GUICtrlComboBoxEx_EndUpdate GUICtrlComboBoxEx_FindStringExact ' +
        'GUICtrlComboBoxEx_GetComboBoxInfo ' +
        'GUICtrlComboBoxEx_GetComboControl GUICtrlComboBoxEx_GetCount ' +
        'GUICtrlComboBoxEx_GetCurSel ' +
        'GUICtrlComboBoxEx_GetDroppedControlRect ' +
        'GUICtrlComboBoxEx_GetDroppedControlRectEx ' +
        'GUICtrlComboBoxEx_GetDroppedState ' +
        'GUICtrlComboBoxEx_GetDroppedWidth ' +
        'GUICtrlComboBoxEx_GetEditControl GUICtrlComboBoxEx_GetEditSel ' +
        'GUICtrlComboBoxEx_GetEditText ' +
        'GUICtrlComboBoxEx_GetExtendedStyle ' +
        'GUICtrlComboBoxEx_GetExtendedUI GUICtrlComboBoxEx_GetImageList ' +
        'GUICtrlComboBoxEx_GetItem GUICtrlComboBoxEx_GetItemEx ' +
        'GUICtrlComboBoxEx_GetItemHeight GUICtrlComboBoxEx_GetItemImage ' +
        'GUICtrlComboBoxEx_GetItemIndent ' +
        'GUICtrlComboBoxEx_GetItemOverlayImage ' +
        'GUICtrlComboBoxEx_GetItemParam ' +
        'GUICtrlComboBoxEx_GetItemSelectedImage ' +
        'GUICtrlComboBoxEx_GetItemText GUICtrlComboBoxEx_GetItemTextLen ' +
        'GUICtrlComboBoxEx_GetList GUICtrlComboBoxEx_GetListArray ' +
        'GUICtrlComboBoxEx_GetLocale GUICtrlComboBoxEx_GetLocaleCountry ' +
        'GUICtrlComboBoxEx_GetLocaleLang ' +
        'GUICtrlComboBoxEx_GetLocalePrimLang ' +
        'GUICtrlComboBoxEx_GetLocaleSubLang ' +
        'GUICtrlComboBoxEx_GetMinVisible GUICtrlComboBoxEx_GetTopIndex ' +
        'GUICtrlComboBoxEx_GetUnicode GUICtrlComboBoxEx_InitStorage ' +
        'GUICtrlComboBoxEx_InsertString GUICtrlComboBoxEx_LimitText ' +
        'GUICtrlComboBoxEx_ReplaceEditSel GUICtrlComboBoxEx_ResetContent ' +
        'GUICtrlComboBoxEx_SetCurSel GUICtrlComboBoxEx_SetDroppedWidth ' +
        'GUICtrlComboBoxEx_SetEditSel GUICtrlComboBoxEx_SetEditText ' +
        'GUICtrlComboBoxEx_SetExtendedStyle ' +
        'GUICtrlComboBoxEx_SetExtendedUI GUICtrlComboBoxEx_SetImageList ' +
        'GUICtrlComboBoxEx_SetItem GUICtrlComboBoxEx_SetItemEx ' +
        'GUICtrlComboBoxEx_SetItemHeight GUICtrlComboBoxEx_SetItemImage ' +
        'GUICtrlComboBoxEx_SetItemIndent ' +
        'GUICtrlComboBoxEx_SetItemOverlayImage ' +
        'GUICtrlComboBoxEx_SetItemParam ' +
        'GUICtrlComboBoxEx_SetItemSelectedImage ' +
        'GUICtrlComboBoxEx_SetMinVisible GUICtrlComboBoxEx_SetTopIndex ' +
        'GUICtrlComboBoxEx_SetUnicode GUICtrlComboBoxEx_ShowDropDown ' +
        'GUICtrlComboBox_AddDir GUICtrlComboBox_AddString ' +
        'GUICtrlComboBox_AutoComplete GUICtrlComboBox_BeginUpdate ' +
        'GUICtrlComboBox_Create GUICtrlComboBox_DeleteString ' +
        'GUICtrlComboBox_Destroy GUICtrlComboBox_EndUpdate ' +
        'GUICtrlComboBox_FindString GUICtrlComboBox_FindStringExact ' +
        'GUICtrlComboBox_GetComboBoxInfo GUICtrlComboBox_GetCount ' +
        'GUICtrlComboBox_GetCueBanner GUICtrlComboBox_GetCurSel ' +
        'GUICtrlComboBox_GetDroppedControlRect ' +
        'GUICtrlComboBox_GetDroppedControlRectEx ' +
        'GUICtrlComboBox_GetDroppedState GUICtrlComboBox_GetDroppedWidth ' +
        'GUICtrlComboBox_GetEditSel GUICtrlComboBox_GetEditText ' +
        'GUICtrlComboBox_GetExtendedUI ' +
        'GUICtrlComboBox_GetHorizontalExtent ' +
        'GUICtrlComboBox_GetItemHeight GUICtrlComboBox_GetLBText ' +
        'GUICtrlComboBox_GetLBTextLen GUICtrlComboBox_GetList ' +
        'GUICtrlComboBox_GetListArray GUICtrlComboBox_GetLocale ' +
        'GUICtrlComboBox_GetLocaleCountry GUICtrlComboBox_GetLocaleLang ' +
        'GUICtrlComboBox_GetLocalePrimLang ' +
        'GUICtrlComboBox_GetLocaleSubLang GUICtrlComboBox_GetMinVisible ' +
        'GUICtrlComboBox_GetTopIndex GUICtrlComboBox_InitStorage ' +
        'GUICtrlComboBox_InsertString GUICtrlComboBox_LimitText ' +
        'GUICtrlComboBox_ReplaceEditSel GUICtrlComboBox_ResetContent ' +
        'GUICtrlComboBox_SelectString GUICtrlComboBox_SetCueBanner ' +
        'GUICtrlComboBox_SetCurSel GUICtrlComboBox_SetDroppedWidth ' +
        'GUICtrlComboBox_SetEditSel GUICtrlComboBox_SetEditText ' +
        'GUICtrlComboBox_SetExtendedUI ' +
        'GUICtrlComboBox_SetHorizontalExtent ' +
        'GUICtrlComboBox_SetItemHeight GUICtrlComboBox_SetMinVisible ' +
        'GUICtrlComboBox_SetTopIndex GUICtrlComboBox_ShowDropDown ' +
        'GUICtrlDTP_Create GUICtrlDTP_Destroy GUICtrlDTP_GetMCColor ' +
        'GUICtrlDTP_GetMCFont GUICtrlDTP_GetMonthCal ' +
        'GUICtrlDTP_GetRange GUICtrlDTP_GetRangeEx ' +
        'GUICtrlDTP_GetSystemTime GUICtrlDTP_GetSystemTimeEx ' +
        'GUICtrlDTP_SetFormat GUICtrlDTP_SetMCColor ' +
        'GUICtrlDTP_SetMCFont GUICtrlDTP_SetRange ' +
        'GUICtrlDTP_SetRangeEx GUICtrlDTP_SetSystemTime ' +
        'GUICtrlDTP_SetSystemTimeEx GUICtrlEdit_AppendText ' +
        'GUICtrlEdit_BeginUpdate GUICtrlEdit_CanUndo ' +
        'GUICtrlEdit_CharFromPos GUICtrlEdit_Create ' +
        'GUICtrlEdit_Destroy GUICtrlEdit_EmptyUndoBuffer ' +
        'GUICtrlEdit_EndUpdate GUICtrlEdit_Find GUICtrlEdit_FmtLines ' +
        'GUICtrlEdit_GetCueBanner GUICtrlEdit_GetFirstVisibleLine ' +
        'GUICtrlEdit_GetLimitText GUICtrlEdit_GetLine ' +
        'GUICtrlEdit_GetLineCount GUICtrlEdit_GetMargins ' +
        'GUICtrlEdit_GetModify GUICtrlEdit_GetPasswordChar ' +
        'GUICtrlEdit_GetRECT GUICtrlEdit_GetRECTEx GUICtrlEdit_GetSel ' +
        'GUICtrlEdit_GetText GUICtrlEdit_GetTextLen ' +
        'GUICtrlEdit_HideBalloonTip GUICtrlEdit_InsertText ' +
        'GUICtrlEdit_LineFromChar GUICtrlEdit_LineIndex ' +
        'GUICtrlEdit_LineLength GUICtrlEdit_LineScroll ' +
        'GUICtrlEdit_PosFromChar GUICtrlEdit_ReplaceSel ' +
        'GUICtrlEdit_Scroll GUICtrlEdit_SetCueBanner ' +
        'GUICtrlEdit_SetLimitText GUICtrlEdit_SetMargins ' +
        'GUICtrlEdit_SetModify GUICtrlEdit_SetPasswordChar ' +
        'GUICtrlEdit_SetReadOnly GUICtrlEdit_SetRECT ' +
        'GUICtrlEdit_SetRECTEx GUICtrlEdit_SetRECTNP ' +
        'GUICtrlEdit_SetRectNPEx GUICtrlEdit_SetSel ' +
        'GUICtrlEdit_SetTabStops GUICtrlEdit_SetText ' +
        'GUICtrlEdit_ShowBalloonTip GUICtrlEdit_Undo ' +
        'GUICtrlHeader_AddItem GUICtrlHeader_ClearFilter ' +
        'GUICtrlHeader_ClearFilterAll GUICtrlHeader_Create ' +
        'GUICtrlHeader_CreateDragImage GUICtrlHeader_DeleteItem ' +
        'GUICtrlHeader_Destroy GUICtrlHeader_EditFilter ' +
        'GUICtrlHeader_GetBitmapMargin GUICtrlHeader_GetImageList ' +
        'GUICtrlHeader_GetItem GUICtrlHeader_GetItemAlign ' +
        'GUICtrlHeader_GetItemBitmap GUICtrlHeader_GetItemCount ' +
        'GUICtrlHeader_GetItemDisplay GUICtrlHeader_GetItemFlags ' +
        'GUICtrlHeader_GetItemFormat GUICtrlHeader_GetItemImage ' +
        'GUICtrlHeader_GetItemOrder GUICtrlHeader_GetItemParam ' +
        'GUICtrlHeader_GetItemRect GUICtrlHeader_GetItemRectEx ' +
        'GUICtrlHeader_GetItemText GUICtrlHeader_GetItemWidth ' +
        'GUICtrlHeader_GetOrderArray GUICtrlHeader_GetUnicodeFormat ' +
        'GUICtrlHeader_HitTest GUICtrlHeader_InsertItem ' +
        'GUICtrlHeader_Layout GUICtrlHeader_OrderToIndex ' +
        'GUICtrlHeader_SetBitmapMargin ' +
        'GUICtrlHeader_SetFilterChangeTimeout ' +
        'GUICtrlHeader_SetHotDivider GUICtrlHeader_SetImageList ' +
        'GUICtrlHeader_SetItem GUICtrlHeader_SetItemAlign ' +
        'GUICtrlHeader_SetItemBitmap GUICtrlHeader_SetItemDisplay ' +
        'GUICtrlHeader_SetItemFlags GUICtrlHeader_SetItemFormat ' +
        'GUICtrlHeader_SetItemImage GUICtrlHeader_SetItemOrder ' +
        'GUICtrlHeader_SetItemParam GUICtrlHeader_SetItemText ' +
        'GUICtrlHeader_SetItemWidth GUICtrlHeader_SetOrderArray ' +
        'GUICtrlHeader_SetUnicodeFormat GUICtrlIpAddress_ClearAddress ' +
        'GUICtrlIpAddress_Create GUICtrlIpAddress_Destroy ' +
        'GUICtrlIpAddress_Get GUICtrlIpAddress_GetArray ' +
        'GUICtrlIpAddress_GetEx GUICtrlIpAddress_IsBlank ' +
        'GUICtrlIpAddress_Set GUICtrlIpAddress_SetArray ' +
        'GUICtrlIpAddress_SetEx GUICtrlIpAddress_SetFocus ' +
        'GUICtrlIpAddress_SetFont GUICtrlIpAddress_SetRange ' +
        'GUICtrlIpAddress_ShowHide GUICtrlListBox_AddFile ' +
        'GUICtrlListBox_AddString GUICtrlListBox_BeginUpdate ' +
        'GUICtrlListBox_ClickItem GUICtrlListBox_Create ' +
        'GUICtrlListBox_DeleteString GUICtrlListBox_Destroy ' +
        'GUICtrlListBox_Dir GUICtrlListBox_EndUpdate ' +
        'GUICtrlListBox_FindInText GUICtrlListBox_FindString ' +
        'GUICtrlListBox_GetAnchorIndex GUICtrlListBox_GetCaretIndex ' +
        'GUICtrlListBox_GetCount GUICtrlListBox_GetCurSel ' +
        'GUICtrlListBox_GetHorizontalExtent GUICtrlListBox_GetItemData ' +
        'GUICtrlListBox_GetItemHeight GUICtrlListBox_GetItemRect ' +
        'GUICtrlListBox_GetItemRectEx GUICtrlListBox_GetListBoxInfo ' +
        'GUICtrlListBox_GetLocale GUICtrlListBox_GetLocaleCountry ' +
        'GUICtrlListBox_GetLocaleLang GUICtrlListBox_GetLocalePrimLang ' +
        'GUICtrlListBox_GetLocaleSubLang GUICtrlListBox_GetSel ' +
        'GUICtrlListBox_GetSelCount GUICtrlListBox_GetSelItems ' +
        'GUICtrlListBox_GetSelItemsText GUICtrlListBox_GetText ' +
        'GUICtrlListBox_GetTextLen GUICtrlListBox_GetTopIndex ' +
        'GUICtrlListBox_InitStorage GUICtrlListBox_InsertString ' +
        'GUICtrlListBox_ItemFromPoint GUICtrlListBox_ReplaceString ' +
        'GUICtrlListBox_ResetContent GUICtrlListBox_SelectString ' +
        'GUICtrlListBox_SelItemRange GUICtrlListBox_SelItemRangeEx ' +
        'GUICtrlListBox_SetAnchorIndex GUICtrlListBox_SetCaretIndex ' +
        'GUICtrlListBox_SetColumnWidth GUICtrlListBox_SetCurSel ' +
        'GUICtrlListBox_SetHorizontalExtent GUICtrlListBox_SetItemData ' +
        'GUICtrlListBox_SetItemHeight GUICtrlListBox_SetLocale ' +
        'GUICtrlListBox_SetSel GUICtrlListBox_SetTabStops ' +
        'GUICtrlListBox_SetTopIndex GUICtrlListBox_Sort ' +
        'GUICtrlListBox_SwapString GUICtrlListBox_UpdateHScroll ' +
        'GUICtrlListView_AddArray GUICtrlListView_AddColumn ' +
        'GUICtrlListView_AddItem GUICtrlListView_AddSubItem ' +
        'GUICtrlListView_ApproximateViewHeight ' +
        'GUICtrlListView_ApproximateViewRect ' +
        'GUICtrlListView_ApproximateViewWidth GUICtrlListView_Arrange ' +
        'GUICtrlListView_BeginUpdate GUICtrlListView_CancelEditLabel ' +
        'GUICtrlListView_ClickItem GUICtrlListView_CopyItems ' +
        'GUICtrlListView_Create GUICtrlListView_CreateDragImage ' +
        'GUICtrlListView_CreateSolidBitMap ' +
        'GUICtrlListView_DeleteAllItems GUICtrlListView_DeleteColumn ' +
        'GUICtrlListView_DeleteItem GUICtrlListView_DeleteItemsSelected ' +
        'GUICtrlListView_Destroy GUICtrlListView_DrawDragImage ' +
        'GUICtrlListView_EditLabel GUICtrlListView_EnableGroupView ' +
        'GUICtrlListView_EndUpdate GUICtrlListView_EnsureVisible ' +
        'GUICtrlListView_FindInText GUICtrlListView_FindItem ' +
        'GUICtrlListView_FindNearest GUICtrlListView_FindParam ' +
        'GUICtrlListView_FindText GUICtrlListView_GetBkColor ' +
        'GUICtrlListView_GetBkImage GUICtrlListView_GetCallbackMask ' +
        'GUICtrlListView_GetColumn GUICtrlListView_GetColumnCount ' +
        'GUICtrlListView_GetColumnOrder ' +
        'GUICtrlListView_GetColumnOrderArray ' +
        'GUICtrlListView_GetColumnWidth GUICtrlListView_GetCounterPage ' +
        'GUICtrlListView_GetEditControl ' +
        'GUICtrlListView_GetExtendedListViewStyle ' +
        'GUICtrlListView_GetFocusedGroup GUICtrlListView_GetGroupCount ' +
        'GUICtrlListView_GetGroupInfo ' +
        'GUICtrlListView_GetGroupInfoByIndex ' +
        'GUICtrlListView_GetGroupRect ' +
        'GUICtrlListView_GetGroupViewEnabled GUICtrlListView_GetHeader ' +
        'GUICtrlListView_GetHotCursor GUICtrlListView_GetHotItem ' +
        'GUICtrlListView_GetHoverTime GUICtrlListView_GetImageList ' +
        'GUICtrlListView_GetISearchString GUICtrlListView_GetItem ' +
        'GUICtrlListView_GetItemChecked GUICtrlListView_GetItemCount ' +
        'GUICtrlListView_GetItemCut GUICtrlListView_GetItemDropHilited ' +
        'GUICtrlListView_GetItemEx GUICtrlListView_GetItemFocused ' +
        'GUICtrlListView_GetItemGroupID GUICtrlListView_GetItemImage ' +
        'GUICtrlListView_GetItemIndent GUICtrlListView_GetItemParam ' +
        'GUICtrlListView_GetItemPosition ' +
        'GUICtrlListView_GetItemPositionX ' +
        'GUICtrlListView_GetItemPositionY GUICtrlListView_GetItemRect ' +
        'GUICtrlListView_GetItemRectEx GUICtrlListView_GetItemSelected ' +
        'GUICtrlListView_GetItemSpacing GUICtrlListView_GetItemSpacingX ' +
        'GUICtrlListView_GetItemSpacingY GUICtrlListView_GetItemState ' +
        'GUICtrlListView_GetItemStateImage GUICtrlListView_GetItemText ' +
        'GUICtrlListView_GetItemTextArray ' +
        'GUICtrlListView_GetItemTextString GUICtrlListView_GetNextItem ' +
        'GUICtrlListView_GetNumberOfWorkAreas GUICtrlListView_GetOrigin ' +
        'GUICtrlListView_GetOriginX GUICtrlListView_GetOriginY ' +
        'GUICtrlListView_GetOutlineColor ' +
        'GUICtrlListView_GetSelectedColumn ' +
        'GUICtrlListView_GetSelectedCount ' +
        'GUICtrlListView_GetSelectedIndices ' +
        'GUICtrlListView_GetSelectionMark GUICtrlListView_GetStringWidth ' +
        'GUICtrlListView_GetSubItemRect GUICtrlListView_GetTextBkColor ' +
        'GUICtrlListView_GetTextColor GUICtrlListView_GetToolTips ' +
        'GUICtrlListView_GetTopIndex GUICtrlListView_GetUnicodeFormat ' +
        'GUICtrlListView_GetView GUICtrlListView_GetViewDetails ' +
        'GUICtrlListView_GetViewLarge GUICtrlListView_GetViewList ' +
        'GUICtrlListView_GetViewRect GUICtrlListView_GetViewSmall ' +
        'GUICtrlListView_GetViewTile GUICtrlListView_HideColumn ' +
        'GUICtrlListView_HitTest GUICtrlListView_InsertColumn ' +
        'GUICtrlListView_InsertGroup GUICtrlListView_InsertItem ' +
        'GUICtrlListView_JustifyColumn GUICtrlListView_MapIDToIndex ' +
        'GUICtrlListView_MapIndexToID GUICtrlListView_RedrawItems ' +
        'GUICtrlListView_RegisterSortCallBack ' +
        'GUICtrlListView_RemoveAllGroups GUICtrlListView_RemoveGroup ' +
        'GUICtrlListView_Scroll GUICtrlListView_SetBkColor ' +
        'GUICtrlListView_SetBkImage GUICtrlListView_SetCallBackMask ' +
        'GUICtrlListView_SetColumn GUICtrlListView_SetColumnOrder ' +
        'GUICtrlListView_SetColumnOrderArray ' +
        'GUICtrlListView_SetColumnWidth ' +
        'GUICtrlListView_SetExtendedListViewStyle ' +
        'GUICtrlListView_SetGroupInfo GUICtrlListView_SetHotItem ' +
        'GUICtrlListView_SetHoverTime GUICtrlListView_SetIconSpacing ' +
        'GUICtrlListView_SetImageList GUICtrlListView_SetItem ' +
        'GUICtrlListView_SetItemChecked GUICtrlListView_SetItemCount ' +
        'GUICtrlListView_SetItemCut GUICtrlListView_SetItemDropHilited ' +
        'GUICtrlListView_SetItemEx GUICtrlListView_SetItemFocused ' +
        'GUICtrlListView_SetItemGroupID GUICtrlListView_SetItemImage ' +
        'GUICtrlListView_SetItemIndent GUICtrlListView_SetItemParam ' +
        'GUICtrlListView_SetItemPosition ' +
        'GUICtrlListView_SetItemPosition32 ' +
        'GUICtrlListView_SetItemSelected GUICtrlListView_SetItemState ' +
        'GUICtrlListView_SetItemStateImage GUICtrlListView_SetItemText ' +
        'GUICtrlListView_SetOutlineColor ' +
        'GUICtrlListView_SetSelectedColumn ' +
        'GUICtrlListView_SetSelectionMark GUICtrlListView_SetTextBkColor ' +
        'GUICtrlListView_SetTextColor GUICtrlListView_SetToolTips ' +
        'GUICtrlListView_SetUnicodeFormat GUICtrlListView_SetView ' +
        'GUICtrlListView_SetWorkAreas GUICtrlListView_SimpleSort ' +
        'GUICtrlListView_SortItems GUICtrlListView_SubItemHitTest ' +
        'GUICtrlListView_UnRegisterSortCallBack GUICtrlMenu_AddMenuItem ' +
        'GUICtrlMenu_AppendMenu GUICtrlMenu_CalculatePopupWindowPosition ' +
        'GUICtrlMenu_CheckMenuItem GUICtrlMenu_CheckRadioItem ' +
        'GUICtrlMenu_CreateMenu GUICtrlMenu_CreatePopup ' +
        'GUICtrlMenu_DeleteMenu GUICtrlMenu_DestroyMenu ' +
        'GUICtrlMenu_DrawMenuBar GUICtrlMenu_EnableMenuItem ' +
        'GUICtrlMenu_FindItem GUICtrlMenu_FindParent ' +
        'GUICtrlMenu_GetItemBmp GUICtrlMenu_GetItemBmpChecked ' +
        'GUICtrlMenu_GetItemBmpUnchecked GUICtrlMenu_GetItemChecked ' +
        'GUICtrlMenu_GetItemCount GUICtrlMenu_GetItemData ' +
        'GUICtrlMenu_GetItemDefault GUICtrlMenu_GetItemDisabled ' +
        'GUICtrlMenu_GetItemEnabled GUICtrlMenu_GetItemGrayed ' +
        'GUICtrlMenu_GetItemHighlighted GUICtrlMenu_GetItemID ' +
        'GUICtrlMenu_GetItemInfo GUICtrlMenu_GetItemRect ' +
        'GUICtrlMenu_GetItemRectEx GUICtrlMenu_GetItemState ' +
        'GUICtrlMenu_GetItemStateEx GUICtrlMenu_GetItemSubMenu ' +
        'GUICtrlMenu_GetItemText GUICtrlMenu_GetItemType ' +
        'GUICtrlMenu_GetMenu GUICtrlMenu_GetMenuBackground ' +
        'GUICtrlMenu_GetMenuBarInfo GUICtrlMenu_GetMenuContextHelpID ' +
        'GUICtrlMenu_GetMenuData GUICtrlMenu_GetMenuDefaultItem ' +
        'GUICtrlMenu_GetMenuHeight GUICtrlMenu_GetMenuInfo ' +
        'GUICtrlMenu_GetMenuStyle GUICtrlMenu_GetSystemMenu ' +
        'GUICtrlMenu_InsertMenuItem GUICtrlMenu_InsertMenuItemEx ' +
        'GUICtrlMenu_IsMenu GUICtrlMenu_LoadMenu ' +
        'GUICtrlMenu_MapAccelerator GUICtrlMenu_MenuItemFromPoint ' +
        'GUICtrlMenu_RemoveMenu GUICtrlMenu_SetItemBitmaps ' +
        'GUICtrlMenu_SetItemBmp GUICtrlMenu_SetItemBmpChecked ' +
        'GUICtrlMenu_SetItemBmpUnchecked GUICtrlMenu_SetItemChecked ' +
        'GUICtrlMenu_SetItemData GUICtrlMenu_SetItemDefault ' +
        'GUICtrlMenu_SetItemDisabled GUICtrlMenu_SetItemEnabled ' +
        'GUICtrlMenu_SetItemGrayed GUICtrlMenu_SetItemHighlighted ' +
        'GUICtrlMenu_SetItemID GUICtrlMenu_SetItemInfo ' +
        'GUICtrlMenu_SetItemState GUICtrlMenu_SetItemSubMenu ' +
        'GUICtrlMenu_SetItemText GUICtrlMenu_SetItemType ' +
        'GUICtrlMenu_SetMenu GUICtrlMenu_SetMenuBackground ' +
        'GUICtrlMenu_SetMenuContextHelpID GUICtrlMenu_SetMenuData ' +
        'GUICtrlMenu_SetMenuDefaultItem GUICtrlMenu_SetMenuHeight ' +
        'GUICtrlMenu_SetMenuInfo GUICtrlMenu_SetMenuStyle ' +
        'GUICtrlMenu_TrackPopupMenu GUICtrlMonthCal_Create ' +
        'GUICtrlMonthCal_Destroy GUICtrlMonthCal_GetCalendarBorder ' +
        'GUICtrlMonthCal_GetCalendarCount GUICtrlMonthCal_GetColor ' +
        'GUICtrlMonthCal_GetColorArray GUICtrlMonthCal_GetCurSel ' +
        'GUICtrlMonthCal_GetCurSelStr GUICtrlMonthCal_GetFirstDOW ' +
        'GUICtrlMonthCal_GetFirstDOWStr GUICtrlMonthCal_GetMaxSelCount ' +
        'GUICtrlMonthCal_GetMaxTodayWidth ' +
        'GUICtrlMonthCal_GetMinReqHeight GUICtrlMonthCal_GetMinReqRect ' +
        'GUICtrlMonthCal_GetMinReqRectArray ' +
        'GUICtrlMonthCal_GetMinReqWidth GUICtrlMonthCal_GetMonthDelta ' +
        'GUICtrlMonthCal_GetMonthRange GUICtrlMonthCal_GetMonthRangeMax ' +
        'GUICtrlMonthCal_GetMonthRangeMaxStr ' +
        'GUICtrlMonthCal_GetMonthRangeMin ' +
        'GUICtrlMonthCal_GetMonthRangeMinStr ' +
        'GUICtrlMonthCal_GetMonthRangeSpan GUICtrlMonthCal_GetRange ' +
        'GUICtrlMonthCal_GetRangeMax GUICtrlMonthCal_GetRangeMaxStr ' +
        'GUICtrlMonthCal_GetRangeMin GUICtrlMonthCal_GetRangeMinStr ' +
        'GUICtrlMonthCal_GetSelRange GUICtrlMonthCal_GetSelRangeMax ' +
        'GUICtrlMonthCal_GetSelRangeMaxStr ' +
        'GUICtrlMonthCal_GetSelRangeMin ' +
        'GUICtrlMonthCal_GetSelRangeMinStr GUICtrlMonthCal_GetToday ' +
        'GUICtrlMonthCal_GetTodayStr GUICtrlMonthCal_GetUnicodeFormat ' +
        'GUICtrlMonthCal_HitTest GUICtrlMonthCal_SetCalendarBorder ' +
        'GUICtrlMonthCal_SetColor GUICtrlMonthCal_SetCurSel ' +
        'GUICtrlMonthCal_SetDayState GUICtrlMonthCal_SetFirstDOW ' +
        'GUICtrlMonthCal_SetMaxSelCount GUICtrlMonthCal_SetMonthDelta ' +
        'GUICtrlMonthCal_SetRange GUICtrlMonthCal_SetSelRange ' +
        'GUICtrlMonthCal_SetToday GUICtrlMonthCal_SetUnicodeFormat ' +
        'GUICtrlRebar_AddBand GUICtrlRebar_AddToolBarBand ' +
        'GUICtrlRebar_BeginDrag GUICtrlRebar_Create ' +
        'GUICtrlRebar_DeleteBand GUICtrlRebar_Destroy ' +
        'GUICtrlRebar_DragMove GUICtrlRebar_EndDrag ' +
        'GUICtrlRebar_GetBandBackColor GUICtrlRebar_GetBandBorders ' +
        'GUICtrlRebar_GetBandBordersEx GUICtrlRebar_GetBandChildHandle ' +
        'GUICtrlRebar_GetBandChildSize GUICtrlRebar_GetBandCount ' +
        'GUICtrlRebar_GetBandForeColor GUICtrlRebar_GetBandHeaderSize ' +
        'GUICtrlRebar_GetBandID GUICtrlRebar_GetBandIdealSize ' +
        'GUICtrlRebar_GetBandLength GUICtrlRebar_GetBandLParam ' +
        'GUICtrlRebar_GetBandMargins GUICtrlRebar_GetBandMarginsEx ' +
        'GUICtrlRebar_GetBandRect GUICtrlRebar_GetBandRectEx ' +
        'GUICtrlRebar_GetBandStyle GUICtrlRebar_GetBandStyleBreak ' +
        'GUICtrlRebar_GetBandStyleChildEdge ' +
        'GUICtrlRebar_GetBandStyleFixedBMP ' +
        'GUICtrlRebar_GetBandStyleFixedSize ' +
        'GUICtrlRebar_GetBandStyleGripperAlways ' +
        'GUICtrlRebar_GetBandStyleHidden ' +
        'GUICtrlRebar_GetBandStyleHideTitle ' +
        'GUICtrlRebar_GetBandStyleNoGripper ' +
        'GUICtrlRebar_GetBandStyleTopAlign ' +
        'GUICtrlRebar_GetBandStyleUseChevron ' +
        'GUICtrlRebar_GetBandStyleVariableHeight ' +
        'GUICtrlRebar_GetBandText GUICtrlRebar_GetBarHeight ' +
        'GUICtrlRebar_GetBarInfo GUICtrlRebar_GetBKColor ' +
        'GUICtrlRebar_GetColorScheme GUICtrlRebar_GetRowCount ' +
        'GUICtrlRebar_GetRowHeight GUICtrlRebar_GetTextColor ' +
        'GUICtrlRebar_GetToolTips GUICtrlRebar_GetUnicodeFormat ' +
        'GUICtrlRebar_HitTest GUICtrlRebar_IDToIndex ' +
        'GUICtrlRebar_MaximizeBand GUICtrlRebar_MinimizeBand ' +
        'GUICtrlRebar_MoveBand GUICtrlRebar_SetBandBackColor ' +
        'GUICtrlRebar_SetBandForeColor GUICtrlRebar_SetBandHeaderSize ' +
        'GUICtrlRebar_SetBandID GUICtrlRebar_SetBandIdealSize ' +
        'GUICtrlRebar_SetBandLength GUICtrlRebar_SetBandLParam ' +
        'GUICtrlRebar_SetBandStyle GUICtrlRebar_SetBandStyleBreak ' +
        'GUICtrlRebar_SetBandStyleChildEdge ' +
        'GUICtrlRebar_SetBandStyleFixedBMP ' +
        'GUICtrlRebar_SetBandStyleFixedSize ' +
        'GUICtrlRebar_SetBandStyleGripperAlways ' +
        'GUICtrlRebar_SetBandStyleHidden ' +
        'GUICtrlRebar_SetBandStyleHideTitle ' +
        'GUICtrlRebar_SetBandStyleNoGripper ' +
        'GUICtrlRebar_SetBandStyleTopAlign ' +
        'GUICtrlRebar_SetBandStyleUseChevron ' +
        'GUICtrlRebar_SetBandStyleVariableHeight ' +
        'GUICtrlRebar_SetBandText GUICtrlRebar_SetBarInfo ' +
        'GUICtrlRebar_SetBKColor GUICtrlRebar_SetColorScheme ' +
        'GUICtrlRebar_SetTextColor GUICtrlRebar_SetToolTips ' +
        'GUICtrlRebar_SetUnicodeFormat GUICtrlRebar_ShowBand ' +
        'GUICtrlRichEdit_AppendText GUICtrlRichEdit_AutoDetectURL ' +
        'GUICtrlRichEdit_CanPaste GUICtrlRichEdit_CanPasteSpecial ' +
        'GUICtrlRichEdit_CanRedo GUICtrlRichEdit_CanUndo ' +
        'GUICtrlRichEdit_ChangeFontSize GUICtrlRichEdit_Copy ' +
        'GUICtrlRichEdit_Create GUICtrlRichEdit_Cut ' +
        'GUICtrlRichEdit_Deselect GUICtrlRichEdit_Destroy ' +
        'GUICtrlRichEdit_EmptyUndoBuffer GUICtrlRichEdit_FindText ' +
        'GUICtrlRichEdit_FindTextInRange GUICtrlRichEdit_GetBkColor ' +
        'GUICtrlRichEdit_GetCharAttributes ' +
        'GUICtrlRichEdit_GetCharBkColor GUICtrlRichEdit_GetCharColor ' +
        'GUICtrlRichEdit_GetCharPosFromXY ' +
        'GUICtrlRichEdit_GetCharPosOfNextWord ' +
        'GUICtrlRichEdit_GetCharPosOfPreviousWord ' +
        'GUICtrlRichEdit_GetCharWordBreakInfo ' +
        'GUICtrlRichEdit_GetFirstCharPosOnLine GUICtrlRichEdit_GetFont ' +
        'GUICtrlRichEdit_GetLineCount GUICtrlRichEdit_GetLineLength ' +
        'GUICtrlRichEdit_GetLineNumberFromCharPos ' +
        'GUICtrlRichEdit_GetNextRedo GUICtrlRichEdit_GetNextUndo ' +
        'GUICtrlRichEdit_GetNumberOfFirstVisibleLine ' +
        'GUICtrlRichEdit_GetParaAlignment ' +
        'GUICtrlRichEdit_GetParaAttributes GUICtrlRichEdit_GetParaBorder ' +
        'GUICtrlRichEdit_GetParaIndents GUICtrlRichEdit_GetParaNumbering ' +
        'GUICtrlRichEdit_GetParaShading GUICtrlRichEdit_GetParaSpacing ' +
        'GUICtrlRichEdit_GetParaTabStops GUICtrlRichEdit_GetPasswordChar ' +
        'GUICtrlRichEdit_GetRECT GUICtrlRichEdit_GetScrollPos ' +
        'GUICtrlRichEdit_GetSel GUICtrlRichEdit_GetSelAA ' +
        'GUICtrlRichEdit_GetSelText GUICtrlRichEdit_GetSpaceUnit ' +
        'GUICtrlRichEdit_GetText GUICtrlRichEdit_GetTextInLine ' +
        'GUICtrlRichEdit_GetTextInRange GUICtrlRichEdit_GetTextLength ' +
        'GUICtrlRichEdit_GetVersion GUICtrlRichEdit_GetXYFromCharPos ' +
        'GUICtrlRichEdit_GetZoom GUICtrlRichEdit_GotoCharPos ' +
        'GUICtrlRichEdit_HideSelection GUICtrlRichEdit_InsertText ' +
        'GUICtrlRichEdit_IsModified GUICtrlRichEdit_IsTextSelected ' +
        'GUICtrlRichEdit_Paste GUICtrlRichEdit_PasteSpecial ' +
        'GUICtrlRichEdit_PauseRedraw GUICtrlRichEdit_Redo ' +
        'GUICtrlRichEdit_ReplaceText GUICtrlRichEdit_ResumeRedraw ' +
        'GUICtrlRichEdit_ScrollLineOrPage GUICtrlRichEdit_ScrollLines ' +
        'GUICtrlRichEdit_ScrollToCaret GUICtrlRichEdit_SetBkColor ' +
        'GUICtrlRichEdit_SetCharAttributes ' +
        'GUICtrlRichEdit_SetCharBkColor GUICtrlRichEdit_SetCharColor ' +
        'GUICtrlRichEdit_SetEventMask GUICtrlRichEdit_SetFont ' +
        'GUICtrlRichEdit_SetLimitOnText GUICtrlRichEdit_SetModified ' +
        'GUICtrlRichEdit_SetParaAlignment ' +
        'GUICtrlRichEdit_SetParaAttributes GUICtrlRichEdit_SetParaBorder ' +
        'GUICtrlRichEdit_SetParaIndents GUICtrlRichEdit_SetParaNumbering ' +
        'GUICtrlRichEdit_SetParaShading GUICtrlRichEdit_SetParaSpacing ' +
        'GUICtrlRichEdit_SetParaTabStops GUICtrlRichEdit_SetPasswordChar ' +
        'GUICtrlRichEdit_SetReadOnly GUICtrlRichEdit_SetRECT ' +
        'GUICtrlRichEdit_SetScrollPos GUICtrlRichEdit_SetSel ' +
        'GUICtrlRichEdit_SetSpaceUnit GUICtrlRichEdit_SetTabStops ' +
        'GUICtrlRichEdit_SetText GUICtrlRichEdit_SetUndoLimit ' +
        'GUICtrlRichEdit_SetZoom GUICtrlRichEdit_StreamFromFile ' +
        'GUICtrlRichEdit_StreamFromVar GUICtrlRichEdit_StreamToFile ' +
        'GUICtrlRichEdit_StreamToVar GUICtrlRichEdit_Undo ' +
        'GUICtrlSlider_ClearSel GUICtrlSlider_ClearTics ' +
        'GUICtrlSlider_Create GUICtrlSlider_Destroy ' +
        'GUICtrlSlider_GetBuddy GUICtrlSlider_GetChannelRect ' +
        'GUICtrlSlider_GetChannelRectEx GUICtrlSlider_GetLineSize ' +
        'GUICtrlSlider_GetLogicalTics GUICtrlSlider_GetNumTics ' +
        'GUICtrlSlider_GetPageSize GUICtrlSlider_GetPos ' +
        'GUICtrlSlider_GetRange GUICtrlSlider_GetRangeMax ' +
        'GUICtrlSlider_GetRangeMin GUICtrlSlider_GetSel ' +
        'GUICtrlSlider_GetSelEnd GUICtrlSlider_GetSelStart ' +
        'GUICtrlSlider_GetThumbLength GUICtrlSlider_GetThumbRect ' +
        'GUICtrlSlider_GetThumbRectEx GUICtrlSlider_GetTic ' +
        'GUICtrlSlider_GetTicPos GUICtrlSlider_GetToolTips ' +
        'GUICtrlSlider_GetUnicodeFormat GUICtrlSlider_SetBuddy ' +
        'GUICtrlSlider_SetLineSize GUICtrlSlider_SetPageSize ' +
        'GUICtrlSlider_SetPos GUICtrlSlider_SetRange ' +
        'GUICtrlSlider_SetRangeMax GUICtrlSlider_SetRangeMin ' +
        'GUICtrlSlider_SetSel GUICtrlSlider_SetSelEnd ' +
        'GUICtrlSlider_SetSelStart GUICtrlSlider_SetThumbLength ' +
        'GUICtrlSlider_SetTic GUICtrlSlider_SetTicFreq ' +
        'GUICtrlSlider_SetTipSide GUICtrlSlider_SetToolTips ' +
        'GUICtrlSlider_SetUnicodeFormat GUICtrlStatusBar_Create ' +
        'GUICtrlStatusBar_Destroy GUICtrlStatusBar_EmbedControl ' +
        'GUICtrlStatusBar_GetBorders GUICtrlStatusBar_GetBordersHorz ' +
        'GUICtrlStatusBar_GetBordersRect GUICtrlStatusBar_GetBordersVert ' +
        'GUICtrlStatusBar_GetCount GUICtrlStatusBar_GetHeight ' +
        'GUICtrlStatusBar_GetIcon GUICtrlStatusBar_GetParts ' +
        'GUICtrlStatusBar_GetRect GUICtrlStatusBar_GetRectEx ' +
        'GUICtrlStatusBar_GetText GUICtrlStatusBar_GetTextFlags ' +
        'GUICtrlStatusBar_GetTextLength GUICtrlStatusBar_GetTextLengthEx ' +
        'GUICtrlStatusBar_GetTipText GUICtrlStatusBar_GetUnicodeFormat ' +
        'GUICtrlStatusBar_GetWidth GUICtrlStatusBar_IsSimple ' +
        'GUICtrlStatusBar_Resize GUICtrlStatusBar_SetBkColor ' +
        'GUICtrlStatusBar_SetIcon GUICtrlStatusBar_SetMinHeight ' +
        'GUICtrlStatusBar_SetParts GUICtrlStatusBar_SetSimple ' +
        'GUICtrlStatusBar_SetText GUICtrlStatusBar_SetTipText ' +
        'GUICtrlStatusBar_SetUnicodeFormat GUICtrlStatusBar_ShowHide ' +
        'GUICtrlTab_ActivateTab GUICtrlTab_ClickTab GUICtrlTab_Create ' +
        'GUICtrlTab_DeleteAllItems GUICtrlTab_DeleteItem ' +
        'GUICtrlTab_DeselectAll GUICtrlTab_Destroy GUICtrlTab_FindTab ' +
        'GUICtrlTab_GetCurFocus GUICtrlTab_GetCurSel ' +
        'GUICtrlTab_GetDisplayRect GUICtrlTab_GetDisplayRectEx ' +
        'GUICtrlTab_GetExtendedStyle GUICtrlTab_GetImageList ' +
        'GUICtrlTab_GetItem GUICtrlTab_GetItemCount ' +
        'GUICtrlTab_GetItemImage GUICtrlTab_GetItemParam ' +
        'GUICtrlTab_GetItemRect GUICtrlTab_GetItemRectEx ' +
        'GUICtrlTab_GetItemState GUICtrlTab_GetItemText ' +
        'GUICtrlTab_GetRowCount GUICtrlTab_GetToolTips ' +
        'GUICtrlTab_GetUnicodeFormat GUICtrlTab_HighlightItem ' +
        'GUICtrlTab_HitTest GUICtrlTab_InsertItem ' +
        'GUICtrlTab_RemoveImage GUICtrlTab_SetCurFocus ' +
        'GUICtrlTab_SetCurSel GUICtrlTab_SetExtendedStyle ' +
        'GUICtrlTab_SetImageList GUICtrlTab_SetItem ' +
        'GUICtrlTab_SetItemImage GUICtrlTab_SetItemParam ' +
        'GUICtrlTab_SetItemSize GUICtrlTab_SetItemState ' +
        'GUICtrlTab_SetItemText GUICtrlTab_SetMinTabWidth ' +
        'GUICtrlTab_SetPadding GUICtrlTab_SetToolTips ' +
        'GUICtrlTab_SetUnicodeFormat GUICtrlToolbar_AddBitmap ' +
        'GUICtrlToolbar_AddButton GUICtrlToolbar_AddButtonSep ' +
        'GUICtrlToolbar_AddString GUICtrlToolbar_ButtonCount ' +
        'GUICtrlToolbar_CheckButton GUICtrlToolbar_ClickAccel ' +
        'GUICtrlToolbar_ClickButton GUICtrlToolbar_ClickIndex ' +
        'GUICtrlToolbar_CommandToIndex GUICtrlToolbar_Create ' +
        'GUICtrlToolbar_Customize GUICtrlToolbar_DeleteButton ' +
        'GUICtrlToolbar_Destroy GUICtrlToolbar_EnableButton ' +
        'GUICtrlToolbar_FindToolbar GUICtrlToolbar_GetAnchorHighlight ' +
        'GUICtrlToolbar_GetBitmapFlags GUICtrlToolbar_GetButtonBitmap ' +
        'GUICtrlToolbar_GetButtonInfo GUICtrlToolbar_GetButtonInfoEx ' +
        'GUICtrlToolbar_GetButtonParam GUICtrlToolbar_GetButtonRect ' +
        'GUICtrlToolbar_GetButtonRectEx GUICtrlToolbar_GetButtonSize ' +
        'GUICtrlToolbar_GetButtonState GUICtrlToolbar_GetButtonStyle ' +
        'GUICtrlToolbar_GetButtonText GUICtrlToolbar_GetColorScheme ' +
        'GUICtrlToolbar_GetDisabledImageList ' +
        'GUICtrlToolbar_GetExtendedStyle GUICtrlToolbar_GetHotImageList ' +
        'GUICtrlToolbar_GetHotItem GUICtrlToolbar_GetImageList ' +
        'GUICtrlToolbar_GetInsertMark GUICtrlToolbar_GetInsertMarkColor ' +
        'GUICtrlToolbar_GetMaxSize GUICtrlToolbar_GetMetrics ' +
        'GUICtrlToolbar_GetPadding GUICtrlToolbar_GetRows ' +
        'GUICtrlToolbar_GetString GUICtrlToolbar_GetStyle ' +
        'GUICtrlToolbar_GetStyleAltDrag ' +
        'GUICtrlToolbar_GetStyleCustomErase GUICtrlToolbar_GetStyleFlat ' +
        'GUICtrlToolbar_GetStyleList GUICtrlToolbar_GetStyleRegisterDrop ' +
        'GUICtrlToolbar_GetStyleToolTips ' +
        'GUICtrlToolbar_GetStyleTransparent ' +
        'GUICtrlToolbar_GetStyleWrapable GUICtrlToolbar_GetTextRows ' +
        'GUICtrlToolbar_GetToolTips GUICtrlToolbar_GetUnicodeFormat ' +
        'GUICtrlToolbar_HideButton GUICtrlToolbar_HighlightButton ' +
        'GUICtrlToolbar_HitTest GUICtrlToolbar_IndexToCommand ' +
        'GUICtrlToolbar_InsertButton GUICtrlToolbar_InsertMarkHitTest ' +
        'GUICtrlToolbar_IsButtonChecked GUICtrlToolbar_IsButtonEnabled ' +
        'GUICtrlToolbar_IsButtonHidden ' +
        'GUICtrlToolbar_IsButtonHighlighted ' +
        'GUICtrlToolbar_IsButtonIndeterminate ' +
        'GUICtrlToolbar_IsButtonPressed GUICtrlToolbar_LoadBitmap ' +
        'GUICtrlToolbar_LoadImages GUICtrlToolbar_MapAccelerator ' +
        'GUICtrlToolbar_MoveButton GUICtrlToolbar_PressButton ' +
        'GUICtrlToolbar_SetAnchorHighlight GUICtrlToolbar_SetBitmapSize ' +
        'GUICtrlToolbar_SetButtonBitMap GUICtrlToolbar_SetButtonInfo ' +
        'GUICtrlToolbar_SetButtonInfoEx GUICtrlToolbar_SetButtonParam ' +
        'GUICtrlToolbar_SetButtonSize GUICtrlToolbar_SetButtonState ' +
        'GUICtrlToolbar_SetButtonStyle GUICtrlToolbar_SetButtonText ' +
        'GUICtrlToolbar_SetButtonWidth GUICtrlToolbar_SetCmdID ' +
        'GUICtrlToolbar_SetColorScheme ' +
        'GUICtrlToolbar_SetDisabledImageList ' +
        'GUICtrlToolbar_SetDrawTextFlags GUICtrlToolbar_SetExtendedStyle ' +
        'GUICtrlToolbar_SetHotImageList GUICtrlToolbar_SetHotItem ' +
        'GUICtrlToolbar_SetImageList GUICtrlToolbar_SetIndent ' +
        'GUICtrlToolbar_SetIndeterminate GUICtrlToolbar_SetInsertMark ' +
        'GUICtrlToolbar_SetInsertMarkColor GUICtrlToolbar_SetMaxTextRows ' +
        'GUICtrlToolbar_SetMetrics GUICtrlToolbar_SetPadding ' +
        'GUICtrlToolbar_SetParent GUICtrlToolbar_SetRows ' +
        'GUICtrlToolbar_SetStyle GUICtrlToolbar_SetStyleAltDrag ' +
        'GUICtrlToolbar_SetStyleCustomErase GUICtrlToolbar_SetStyleFlat ' +
        'GUICtrlToolbar_SetStyleList GUICtrlToolbar_SetStyleRegisterDrop ' +
        'GUICtrlToolbar_SetStyleToolTips ' +
        'GUICtrlToolbar_SetStyleTransparent ' +
        'GUICtrlToolbar_SetStyleWrapable GUICtrlToolbar_SetToolTips ' +
        'GUICtrlToolbar_SetUnicodeFormat GUICtrlToolbar_SetWindowTheme ' +
        'GUICtrlTreeView_Add GUICtrlTreeView_AddChild ' +
        'GUICtrlTreeView_AddChildFirst GUICtrlTreeView_AddFirst ' +
        'GUICtrlTreeView_BeginUpdate GUICtrlTreeView_ClickItem ' +
        'GUICtrlTreeView_Create GUICtrlTreeView_CreateDragImage ' +
        'GUICtrlTreeView_CreateSolidBitMap GUICtrlTreeView_Delete ' +
        'GUICtrlTreeView_DeleteAll GUICtrlTreeView_DeleteChildren ' +
        'GUICtrlTreeView_Destroy GUICtrlTreeView_DisplayRect ' +
        'GUICtrlTreeView_DisplayRectEx GUICtrlTreeView_EditText ' +
        'GUICtrlTreeView_EndEdit GUICtrlTreeView_EndUpdate ' +
        'GUICtrlTreeView_EnsureVisible GUICtrlTreeView_Expand ' +
        'GUICtrlTreeView_ExpandedOnce GUICtrlTreeView_FindItem ' +
        'GUICtrlTreeView_FindItemEx GUICtrlTreeView_GetBkColor ' +
        'GUICtrlTreeView_GetBold GUICtrlTreeView_GetChecked ' +
        'GUICtrlTreeView_GetChildCount GUICtrlTreeView_GetChildren ' +
        'GUICtrlTreeView_GetCount GUICtrlTreeView_GetCut ' +
        'GUICtrlTreeView_GetDropTarget GUICtrlTreeView_GetEditControl ' +
        'GUICtrlTreeView_GetExpanded GUICtrlTreeView_GetFirstChild ' +
        'GUICtrlTreeView_GetFirstItem GUICtrlTreeView_GetFirstVisible ' +
        'GUICtrlTreeView_GetFocused GUICtrlTreeView_GetHeight ' +
        'GUICtrlTreeView_GetImageIndex ' +
        'GUICtrlTreeView_GetImageListIconHandle ' +
        'GUICtrlTreeView_GetIndent GUICtrlTreeView_GetInsertMarkColor ' +
        'GUICtrlTreeView_GetISearchString GUICtrlTreeView_GetItemByIndex ' +
        'GUICtrlTreeView_GetItemHandle GUICtrlTreeView_GetItemParam ' +
        'GUICtrlTreeView_GetLastChild GUICtrlTreeView_GetLineColor ' +
        'GUICtrlTreeView_GetNext GUICtrlTreeView_GetNextChild ' +
        'GUICtrlTreeView_GetNextSibling GUICtrlTreeView_GetNextVisible ' +
        'GUICtrlTreeView_GetNormalImageList ' +
        'GUICtrlTreeView_GetParentHandle GUICtrlTreeView_GetParentParam ' +
        'GUICtrlTreeView_GetPrev GUICtrlTreeView_GetPrevChild ' +
        'GUICtrlTreeView_GetPrevSibling GUICtrlTreeView_GetPrevVisible ' +
        'GUICtrlTreeView_GetScrollTime GUICtrlTreeView_GetSelected ' +
        'GUICtrlTreeView_GetSelectedImageIndex ' +
        'GUICtrlTreeView_GetSelection GUICtrlTreeView_GetSiblingCount ' +
        'GUICtrlTreeView_GetState GUICtrlTreeView_GetStateImageIndex ' +
        'GUICtrlTreeView_GetStateImageList GUICtrlTreeView_GetText ' +
        'GUICtrlTreeView_GetTextColor GUICtrlTreeView_GetToolTips ' +
        'GUICtrlTreeView_GetTree GUICtrlTreeView_GetUnicodeFormat ' +
        'GUICtrlTreeView_GetVisible GUICtrlTreeView_GetVisibleCount ' +
        'GUICtrlTreeView_HitTest GUICtrlTreeView_HitTestEx ' +
        'GUICtrlTreeView_HitTestItem GUICtrlTreeView_Index ' +
        'GUICtrlTreeView_InsertItem GUICtrlTreeView_IsFirstItem ' +
        'GUICtrlTreeView_IsParent GUICtrlTreeView_Level ' +
        'GUICtrlTreeView_SelectItem GUICtrlTreeView_SelectItemByIndex ' +
        'GUICtrlTreeView_SetBkColor GUICtrlTreeView_SetBold ' +
        'GUICtrlTreeView_SetChecked GUICtrlTreeView_SetCheckedByIndex ' +
        'GUICtrlTreeView_SetChildren GUICtrlTreeView_SetCut ' +
        'GUICtrlTreeView_SetDropTarget GUICtrlTreeView_SetFocused ' +
        'GUICtrlTreeView_SetHeight GUICtrlTreeView_SetIcon ' +
        'GUICtrlTreeView_SetImageIndex GUICtrlTreeView_SetIndent ' +
        'GUICtrlTreeView_SetInsertMark ' +
        'GUICtrlTreeView_SetInsertMarkColor ' +
        'GUICtrlTreeView_SetItemHeight GUICtrlTreeView_SetItemParam ' +
        'GUICtrlTreeView_SetLineColor GUICtrlTreeView_SetNormalImageList ' +
        'GUICtrlTreeView_SetScrollTime GUICtrlTreeView_SetSelected ' +
        'GUICtrlTreeView_SetSelectedImageIndex GUICtrlTreeView_SetState ' +
        'GUICtrlTreeView_SetStateImageIndex ' +
        'GUICtrlTreeView_SetStateImageList GUICtrlTreeView_SetText ' +
        'GUICtrlTreeView_SetTextColor GUICtrlTreeView_SetToolTips ' +
        'GUICtrlTreeView_SetUnicodeFormat GUICtrlTreeView_Sort ' +
        'GUIImageList_Add GUIImageList_AddBitmap GUIImageList_AddIcon ' +
        'GUIImageList_AddMasked GUIImageList_BeginDrag ' +
        'GUIImageList_Copy GUIImageList_Create GUIImageList_Destroy ' +
        'GUIImageList_DestroyIcon GUIImageList_DragEnter ' +
        'GUIImageList_DragLeave GUIImageList_DragMove ' +
        'GUIImageList_Draw GUIImageList_DrawEx GUIImageList_Duplicate ' +
        'GUIImageList_EndDrag GUIImageList_GetBkColor ' +
        'GUIImageList_GetIcon GUIImageList_GetIconHeight ' +
        'GUIImageList_GetIconSize GUIImageList_GetIconSizeEx ' +
        'GUIImageList_GetIconWidth GUIImageList_GetImageCount ' +
        'GUIImageList_GetImageInfoEx GUIImageList_Remove ' +
        'GUIImageList_ReplaceIcon GUIImageList_SetBkColor ' +
        'GUIImageList_SetIconSize GUIImageList_SetImageCount ' +
        'GUIImageList_Swap GUIScrollBars_EnableScrollBar ' +
        'GUIScrollBars_GetScrollBarInfoEx GUIScrollBars_GetScrollBarRect ' +
        'GUIScrollBars_GetScrollBarRGState ' +
        'GUIScrollBars_GetScrollBarXYLineButton ' +
        'GUIScrollBars_GetScrollBarXYThumbBottom ' +
        'GUIScrollBars_GetScrollBarXYThumbTop ' +
        'GUIScrollBars_GetScrollInfo GUIScrollBars_GetScrollInfoEx ' +
        'GUIScrollBars_GetScrollInfoMax GUIScrollBars_GetScrollInfoMin ' +
        'GUIScrollBars_GetScrollInfoPage GUIScrollBars_GetScrollInfoPos ' +
        'GUIScrollBars_GetScrollInfoTrackPos GUIScrollBars_GetScrollPos ' +
        'GUIScrollBars_GetScrollRange GUIScrollBars_Init ' +
        'GUIScrollBars_ScrollWindow GUIScrollBars_SetScrollInfo ' +
        'GUIScrollBars_SetScrollInfoMax GUIScrollBars_SetScrollInfoMin ' +
        'GUIScrollBars_SetScrollInfoPage GUIScrollBars_SetScrollInfoPos ' +
        'GUIScrollBars_SetScrollRange GUIScrollBars_ShowScrollBar ' +
        'GUIToolTip_Activate GUIToolTip_AddTool GUIToolTip_AdjustRect ' +
        'GUIToolTip_BitsToTTF GUIToolTip_Create GUIToolTip_Deactivate ' +
        'GUIToolTip_DelTool GUIToolTip_Destroy GUIToolTip_EnumTools ' +
        'GUIToolTip_GetBubbleHeight GUIToolTip_GetBubbleSize ' +
        'GUIToolTip_GetBubbleWidth GUIToolTip_GetCurrentTool ' +
        'GUIToolTip_GetDelayTime GUIToolTip_GetMargin ' +
        'GUIToolTip_GetMarginEx GUIToolTip_GetMaxTipWidth ' +
        'GUIToolTip_GetText GUIToolTip_GetTipBkColor ' +
        'GUIToolTip_GetTipTextColor GUIToolTip_GetTitleBitMap ' +
        'GUIToolTip_GetTitleText GUIToolTip_GetToolCount ' +
        'GUIToolTip_GetToolInfo GUIToolTip_HitTest ' +
        'GUIToolTip_NewToolRect GUIToolTip_Pop GUIToolTip_PopUp ' +
        'GUIToolTip_SetDelayTime GUIToolTip_SetMargin ' +
        'GUIToolTip_SetMaxTipWidth GUIToolTip_SetTipBkColor ' +
        'GUIToolTip_SetTipTextColor GUIToolTip_SetTitle ' +
        'GUIToolTip_SetToolInfo GUIToolTip_SetWindowTheme ' +
        'GUIToolTip_ToolExists GUIToolTip_ToolToArray ' +
        'GUIToolTip_TrackActivate GUIToolTip_TrackPosition ' +
        'GUIToolTip_Update GUIToolTip_UpdateTipText HexToString ' +
        'IEAction IEAttach IEBodyReadHTML IEBodyReadText ' +
        'IEBodyWriteHTML IECreate IECreateEmbedded IEDocGetObj ' +
        'IEDocInsertHTML IEDocInsertText IEDocReadHTML ' +
        'IEDocWriteHTML IEErrorNotify IEFormElementCheckBoxSelect ' +
        'IEFormElementGetCollection IEFormElementGetObjByName ' +
        'IEFormElementGetValue IEFormElementOptionSelect ' +
        'IEFormElementRadioSelect IEFormElementSetValue ' +
        'IEFormGetCollection IEFormGetObjByName IEFormImageClick ' +
        'IEFormReset IEFormSubmit IEFrameGetCollection ' +
        'IEFrameGetObjByName IEGetObjById IEGetObjByName ' +
        'IEHeadInsertEventScript IEImgClick IEImgGetCollection ' +
        'IEIsFrameSet IELinkClickByIndex IELinkClickByText ' +
        'IELinkGetCollection IELoadWait IELoadWaitTimeout IENavigate ' +
        'IEPropertyGet IEPropertySet IEQuit IETableGetCollection ' +
        'IETableWriteToArray IETagNameAllGetCollection ' +
        'IETagNameGetCollection IE_Example IE_Introduction ' +
        'IE_VersionInfo INetExplorerCapable INetGetSource INetMail ' +
        'INetSmtpMail IsPressed MathCheckDiv Max MemGlobalAlloc ' +
        'MemGlobalFree MemGlobalLock MemGlobalSize MemGlobalUnlock ' +
        'MemMoveMemory MemVirtualAlloc MemVirtualAllocEx ' +
        'MemVirtualFree MemVirtualFreeEx Min MouseTrap ' +
        'NamedPipes_CallNamedPipe NamedPipes_ConnectNamedPipe ' +
        'NamedPipes_CreateNamedPipe NamedPipes_CreatePipe ' +
        'NamedPipes_DisconnectNamedPipe ' +
        'NamedPipes_GetNamedPipeHandleState NamedPipes_GetNamedPipeInfo ' +
        'NamedPipes_PeekNamedPipe NamedPipes_SetNamedPipeHandleState ' +
        'NamedPipes_TransactNamedPipe NamedPipes_WaitNamedPipe ' +
        'Net_Share_ConnectionEnum Net_Share_FileClose ' +
        'Net_Share_FileEnum Net_Share_FileGetInfo Net_Share_PermStr ' +
        'Net_Share_ResourceStr Net_Share_SessionDel ' +
        'Net_Share_SessionEnum Net_Share_SessionGetInfo ' +
        'Net_Share_ShareAdd Net_Share_ShareCheck Net_Share_ShareDel ' +
        'Net_Share_ShareEnum Net_Share_ShareGetInfo ' +
        'Net_Share_ShareSetInfo Net_Share_StatisticsGetSvr ' +
        'Net_Share_StatisticsGetWrk Now NowCalc NowCalcDate ' +
        'NowDate NowTime PathFull PathGetRelative PathMake ' +
        'PathSplit ProcessGetName ProcessGetPriority Radian ' +
        'ReplaceStringInFile RunDos ScreenCapture_Capture ' +
        'ScreenCapture_CaptureWnd ScreenCapture_SaveImage ' +
        'ScreenCapture_SetBMPFormat ScreenCapture_SetJPGQuality ' +
        'ScreenCapture_SetTIFColorDepth ScreenCapture_SetTIFCompression ' +
        'Security__AdjustTokenPrivileges ' +
        'Security__CreateProcessWithToken Security__DuplicateTokenEx ' +
        'Security__GetAccountSid Security__GetLengthSid ' +
        'Security__GetTokenInformation Security__ImpersonateSelf ' +
        'Security__IsValidSid Security__LookupAccountName ' +
        'Security__LookupAccountSid Security__LookupPrivilegeValue ' +
        'Security__OpenProcessToken Security__OpenThreadToken ' +
        'Security__OpenThreadTokenEx Security__SetPrivilege ' +
        'Security__SetTokenInformation Security__SidToStringSid ' +
        'Security__SidTypeStr Security__StringSidToSid SendMessage ' +
        'SendMessageA SetDate SetTime Singleton SoundClose ' +
        'SoundLength SoundOpen SoundPause SoundPlay SoundPos ' +
        'SoundResume SoundSeek SoundStatus SoundStop ' +
        'SQLite_Changes SQLite_Close SQLite_Display2DResult ' +
        'SQLite_Encode SQLite_ErrCode SQLite_ErrMsg SQLite_Escape ' +
        'SQLite_Exec SQLite_FastEncode SQLite_FastEscape ' +
        'SQLite_FetchData SQLite_FetchNames SQLite_GetTable ' +
        'SQLite_GetTable2d SQLite_LastInsertRowID SQLite_LibVersion ' +
        'SQLite_Open SQLite_Query SQLite_QueryFinalize ' +
        'SQLite_QueryReset SQLite_QuerySingleRow SQLite_SafeMode ' +
        'SQLite_SetTimeout SQLite_Shutdown SQLite_SQLiteExe ' +
        'SQLite_Startup SQLite_TotalChanges StringBetween ' +
        'StringExplode StringInsert StringProper StringRepeat ' +
        'StringTitleCase StringToHex TCPIpToName TempFile ' +
        'TicksToTime Timer_Diff Timer_GetIdleTime Timer_GetTimerID ' +
        'Timer_Init Timer_KillAllTimers Timer_KillTimer ' +
        'Timer_SetTimer TimeToTicks VersionCompare viClose ' +
        'viExecCommand viFindGpib viGpibBusReset viGTL ' +
        'viInteractiveControl viOpen viSetAttribute viSetTimeout ' +
        'WeekNumberISO WinAPI_AbortPath WinAPI_ActivateKeyboardLayout ' +
        'WinAPI_AddClipboardFormatListener WinAPI_AddFontMemResourceEx ' +
        'WinAPI_AddFontResourceEx WinAPI_AddIconOverlay ' +
        'WinAPI_AddIconTransparency WinAPI_AddMRUString ' +
        'WinAPI_AdjustBitmap WinAPI_AdjustTokenPrivileges ' +
        'WinAPI_AdjustWindowRectEx WinAPI_AlphaBlend WinAPI_AngleArc ' +
        'WinAPI_AnimateWindow WinAPI_Arc WinAPI_ArcTo ' +
        'WinAPI_ArrayToStruct WinAPI_AssignProcessToJobObject ' +
        'WinAPI_AssocGetPerceivedType WinAPI_AssocQueryString ' +
        'WinAPI_AttachConsole WinAPI_AttachThreadInput ' +
        'WinAPI_BackupRead WinAPI_BackupReadAbort WinAPI_BackupSeek ' +
        'WinAPI_BackupWrite WinAPI_BackupWriteAbort WinAPI_Beep ' +
        'WinAPI_BeginBufferedPaint WinAPI_BeginDeferWindowPos ' +
        'WinAPI_BeginPaint WinAPI_BeginPath WinAPI_BeginUpdateResource ' +
        'WinAPI_BitBlt WinAPI_BringWindowToTop ' +
        'WinAPI_BroadcastSystemMessage WinAPI_BrowseForFolderDlg ' +
        'WinAPI_BufferedPaintClear WinAPI_BufferedPaintInit ' +
        'WinAPI_BufferedPaintSetAlpha WinAPI_BufferedPaintUnInit ' +
        'WinAPI_CallNextHookEx WinAPI_CallWindowProc ' +
        'WinAPI_CallWindowProcW WinAPI_CascadeWindows ' +
        'WinAPI_ChangeWindowMessageFilterEx WinAPI_CharToOem ' +
        'WinAPI_ChildWindowFromPointEx WinAPI_ClientToScreen ' +
        'WinAPI_ClipCursor WinAPI_CloseDesktop WinAPI_CloseEnhMetaFile ' +
        'WinAPI_CloseFigure WinAPI_CloseHandle WinAPI_CloseThemeData ' +
        'WinAPI_CloseWindow WinAPI_CloseWindowStation ' +
        'WinAPI_CLSIDFromProgID WinAPI_CoInitialize ' +
        'WinAPI_ColorAdjustLuma WinAPI_ColorHLSToRGB ' +
        'WinAPI_ColorRGBToHLS WinAPI_CombineRgn ' +
        'WinAPI_CombineTransform WinAPI_CommandLineToArgv ' +
        'WinAPI_CommDlgExtendedError WinAPI_CommDlgExtendedErrorEx ' +
        'WinAPI_CompareString WinAPI_CompressBitmapBits ' +
        'WinAPI_CompressBuffer WinAPI_ComputeCrc32 ' +
        'WinAPI_ConfirmCredentials WinAPI_CopyBitmap WinAPI_CopyCursor ' +
        'WinAPI_CopyEnhMetaFile WinAPI_CopyFileEx WinAPI_CopyIcon ' +
        'WinAPI_CopyImage WinAPI_CopyRect WinAPI_CopyStruct ' +
        'WinAPI_CoTaskMemAlloc WinAPI_CoTaskMemFree ' +
        'WinAPI_CoTaskMemRealloc WinAPI_CoUninitialize ' +
        'WinAPI_Create32BitHBITMAP WinAPI_Create32BitHICON ' +
        'WinAPI_CreateANDBitmap WinAPI_CreateBitmap ' +
        'WinAPI_CreateBitmapIndirect WinAPI_CreateBrushIndirect ' +
        'WinAPI_CreateBuffer WinAPI_CreateBufferFromStruct ' +
        'WinAPI_CreateCaret WinAPI_CreateColorAdjustment ' +
        'WinAPI_CreateCompatibleBitmap WinAPI_CreateCompatibleBitmapEx ' +
        'WinAPI_CreateCompatibleDC WinAPI_CreateDesktop ' +
        'WinAPI_CreateDIB WinAPI_CreateDIBColorTable ' +
        'WinAPI_CreateDIBitmap WinAPI_CreateDIBSection ' +
        'WinAPI_CreateDirectory WinAPI_CreateDirectoryEx ' +
        'WinAPI_CreateEllipticRgn WinAPI_CreateEmptyIcon ' +
        'WinAPI_CreateEnhMetaFile WinAPI_CreateEvent WinAPI_CreateFile ' +
        'WinAPI_CreateFileEx WinAPI_CreateFileMapping ' +
        'WinAPI_CreateFont WinAPI_CreateFontEx ' +
        'WinAPI_CreateFontIndirect WinAPI_CreateGUID ' +
        'WinAPI_CreateHardLink WinAPI_CreateIcon ' +
        'WinAPI_CreateIconFromResourceEx WinAPI_CreateIconIndirect ' +
        'WinAPI_CreateJobObject WinAPI_CreateMargins ' +
        'WinAPI_CreateMRUList WinAPI_CreateMutex WinAPI_CreateNullRgn ' +
        'WinAPI_CreateNumberFormatInfo WinAPI_CreateObjectID ' +
        'WinAPI_CreatePen WinAPI_CreatePoint WinAPI_CreatePolygonRgn ' +
        'WinAPI_CreateProcess WinAPI_CreateProcessWithToken ' +
        'WinAPI_CreateRect WinAPI_CreateRectEx WinAPI_CreateRectRgn ' +
        'WinAPI_CreateRectRgnIndirect WinAPI_CreateRoundRectRgn ' +
        'WinAPI_CreateSemaphore WinAPI_CreateSize ' +
        'WinAPI_CreateSolidBitmap WinAPI_CreateSolidBrush ' +
        'WinAPI_CreateStreamOnHGlobal WinAPI_CreateString ' +
        'WinAPI_CreateSymbolicLink WinAPI_CreateTransform ' +
        'WinAPI_CreateWindowEx WinAPI_CreateWindowStation ' +
        'WinAPI_DecompressBuffer WinAPI_DecryptFile ' +
        'WinAPI_DeferWindowPos WinAPI_DefineDosDevice ' +
        'WinAPI_DefRawInputProc WinAPI_DefSubclassProc ' +
        'WinAPI_DefWindowProc WinAPI_DefWindowProcW WinAPI_DeleteDC ' +
        'WinAPI_DeleteEnhMetaFile WinAPI_DeleteFile ' +
        'WinAPI_DeleteObject WinAPI_DeleteObjectID ' +
        'WinAPI_DeleteVolumeMountPoint WinAPI_DeregisterShellHookWindow ' +
        'WinAPI_DestroyCaret WinAPI_DestroyCursor WinAPI_DestroyIcon ' +
        'WinAPI_DestroyWindow WinAPI_DeviceIoControl ' +
        'WinAPI_DisplayStruct WinAPI_DllGetVersion WinAPI_DllInstall ' +
        'WinAPI_DllUninstall WinAPI_DPtoLP WinAPI_DragAcceptFiles ' +
        'WinAPI_DragFinish WinAPI_DragQueryFileEx ' +
        'WinAPI_DragQueryPoint WinAPI_DrawAnimatedRects ' +
        'WinAPI_DrawBitmap WinAPI_DrawEdge WinAPI_DrawFocusRect ' +
        'WinAPI_DrawFrameControl WinAPI_DrawIcon WinAPI_DrawIconEx ' +
        'WinAPI_DrawLine WinAPI_DrawShadowText WinAPI_DrawText ' +
        'WinAPI_DrawThemeBackground WinAPI_DrawThemeEdge ' +
        'WinAPI_DrawThemeIcon WinAPI_DrawThemeParentBackground ' +
        'WinAPI_DrawThemeText WinAPI_DrawThemeTextEx ' +
        'WinAPI_DuplicateEncryptionInfoFile WinAPI_DuplicateHandle ' +
        'WinAPI_DuplicateTokenEx WinAPI_DwmDefWindowProc ' +
        'WinAPI_DwmEnableBlurBehindWindow WinAPI_DwmEnableComposition ' +
        'WinAPI_DwmExtendFrameIntoClientArea ' +
        'WinAPI_DwmGetColorizationColor ' +
        'WinAPI_DwmGetColorizationParameters ' +
        'WinAPI_DwmGetWindowAttribute WinAPI_DwmInvalidateIconicBitmaps ' +
        'WinAPI_DwmIsCompositionEnabled ' +
        'WinAPI_DwmQueryThumbnailSourceSize WinAPI_DwmRegisterThumbnail ' +
        'WinAPI_DwmSetColorizationParameters ' +
        'WinAPI_DwmSetIconicLivePreviewBitmap ' +
        'WinAPI_DwmSetIconicThumbnail WinAPI_DwmSetWindowAttribute ' +
        'WinAPI_DwmUnregisterThumbnail ' +
        'WinAPI_DwmUpdateThumbnailProperties WinAPI_DWordToFloat ' +
        'WinAPI_DWordToInt WinAPI_EjectMedia WinAPI_Ellipse ' +
        'WinAPI_EmptyWorkingSet WinAPI_EnableWindow WinAPI_EncryptFile ' +
        'WinAPI_EncryptionDisable WinAPI_EndBufferedPaint ' +
        'WinAPI_EndDeferWindowPos WinAPI_EndPaint WinAPI_EndPath ' +
        'WinAPI_EndUpdateResource WinAPI_EnumChildProcess ' +
        'WinAPI_EnumChildWindows WinAPI_EnumDesktops ' +
        'WinAPI_EnumDesktopWindows WinAPI_EnumDeviceDrivers ' +
        'WinAPI_EnumDisplayDevices WinAPI_EnumDisplayMonitors ' +
        'WinAPI_EnumDisplaySettings WinAPI_EnumDllProc ' +
        'WinAPI_EnumFiles WinAPI_EnumFileStreams ' +
        'WinAPI_EnumFontFamilies WinAPI_EnumHardLinks ' +
        'WinAPI_EnumMRUList WinAPI_EnumPageFiles ' +
        'WinAPI_EnumProcessHandles WinAPI_EnumProcessModules ' +
        'WinAPI_EnumProcessThreads WinAPI_EnumProcessWindows ' +
        'WinAPI_EnumRawInputDevices WinAPI_EnumResourceLanguages ' +
        'WinAPI_EnumResourceNames WinAPI_EnumResourceTypes ' +
        'WinAPI_EnumSystemGeoID WinAPI_EnumSystemLocales ' +
        'WinAPI_EnumUILanguages WinAPI_EnumWindows ' +
        'WinAPI_EnumWindowsPopup WinAPI_EnumWindowStations ' +
        'WinAPI_EnumWindowsTop WinAPI_EqualMemory WinAPI_EqualRect ' +
        'WinAPI_EqualRgn WinAPI_ExcludeClipRect ' +
        'WinAPI_ExpandEnvironmentStrings WinAPI_ExtCreatePen ' +
        'WinAPI_ExtCreateRegion WinAPI_ExtFloodFill WinAPI_ExtractIcon ' +
        'WinAPI_ExtractIconEx WinAPI_ExtSelectClipRgn ' +
        'WinAPI_FatalAppExit WinAPI_FatalExit ' +
        'WinAPI_FileEncryptionStatus WinAPI_FileExists ' +
        'WinAPI_FileIconInit WinAPI_FileInUse WinAPI_FillMemory ' +
        'WinAPI_FillPath WinAPI_FillRect WinAPI_FillRgn ' +
        'WinAPI_FindClose WinAPI_FindCloseChangeNotification ' +
        'WinAPI_FindExecutable WinAPI_FindFirstChangeNotification ' +
        'WinAPI_FindFirstFile WinAPI_FindFirstFileName ' +
        'WinAPI_FindFirstStream WinAPI_FindNextChangeNotification ' +
        'WinAPI_FindNextFile WinAPI_FindNextFileName ' +
        'WinAPI_FindNextStream WinAPI_FindResource ' +
        'WinAPI_FindResourceEx WinAPI_FindTextDlg WinAPI_FindWindow ' +
        'WinAPI_FlashWindow WinAPI_FlashWindowEx WinAPI_FlattenPath ' +
        'WinAPI_FloatToDWord WinAPI_FloatToInt WinAPI_FlushFileBuffers ' +
        'WinAPI_FlushFRBuffer WinAPI_FlushViewOfFile ' +
        'WinAPI_FormatDriveDlg WinAPI_FormatMessage WinAPI_FrameRect ' +
        'WinAPI_FrameRgn WinAPI_FreeLibrary WinAPI_FreeMemory ' +
        'WinAPI_FreeMRUList WinAPI_FreeResource WinAPI_GdiComment ' +
        'WinAPI_GetActiveWindow WinAPI_GetAllUsersProfileDirectory ' +
        'WinAPI_GetAncestor WinAPI_GetApplicationRestartSettings ' +
        'WinAPI_GetArcDirection WinAPI_GetAsyncKeyState ' +
        'WinAPI_GetBinaryType WinAPI_GetBitmapBits ' +
        'WinAPI_GetBitmapDimension WinAPI_GetBitmapDimensionEx ' +
        'WinAPI_GetBkColor WinAPI_GetBkMode WinAPI_GetBoundsRect ' +
        'WinAPI_GetBrushOrg WinAPI_GetBufferedPaintBits ' +
        'WinAPI_GetBufferedPaintDC WinAPI_GetBufferedPaintTargetDC ' +
        'WinAPI_GetBufferedPaintTargetRect WinAPI_GetBValue ' +
        'WinAPI_GetCaretBlinkTime WinAPI_GetCaretPos WinAPI_GetCDType ' +
        'WinAPI_GetClassInfoEx WinAPI_GetClassLongEx ' +
        'WinAPI_GetClassName WinAPI_GetClientHeight ' +
        'WinAPI_GetClientRect WinAPI_GetClientWidth ' +
        'WinAPI_GetClipboardSequenceNumber WinAPI_GetClipBox ' +
        'WinAPI_GetClipCursor WinAPI_GetClipRgn ' +
        'WinAPI_GetColorAdjustment WinAPI_GetCompressedFileSize ' +
        'WinAPI_GetCompression WinAPI_GetConnectedDlg ' +
        'WinAPI_GetCurrentDirectory WinAPI_GetCurrentHwProfile ' +
        'WinAPI_GetCurrentObject WinAPI_GetCurrentPosition ' +
        'WinAPI_GetCurrentProcess ' +
        'WinAPI_GetCurrentProcessExplicitAppUserModelID ' +
        'WinAPI_GetCurrentProcessID WinAPI_GetCurrentThemeName ' +
        'WinAPI_GetCurrentThread WinAPI_GetCurrentThreadId ' +
        'WinAPI_GetCursor WinAPI_GetCursorInfo WinAPI_GetDateFormat ' +
        'WinAPI_GetDC WinAPI_GetDCEx WinAPI_GetDefaultPrinter ' +
        'WinAPI_GetDefaultUserProfileDirectory WinAPI_GetDesktopWindow ' +
        'WinAPI_GetDeviceCaps WinAPI_GetDeviceDriverBaseName ' +
        'WinAPI_GetDeviceDriverFileName WinAPI_GetDeviceGammaRamp ' +
        'WinAPI_GetDIBColorTable WinAPI_GetDIBits ' +
        'WinAPI_GetDiskFreeSpaceEx WinAPI_GetDlgCtrlID ' +
        'WinAPI_GetDlgItem WinAPI_GetDllDirectory ' +
        'WinAPI_GetDriveBusType WinAPI_GetDriveGeometryEx ' +
        'WinAPI_GetDriveNumber WinAPI_GetDriveType ' +
        'WinAPI_GetDurationFormat WinAPI_GetEffectiveClientRect ' +
        'WinAPI_GetEnhMetaFile WinAPI_GetEnhMetaFileBits ' +
        'WinAPI_GetEnhMetaFileDescription WinAPI_GetEnhMetaFileDimension ' +
        'WinAPI_GetEnhMetaFileHeader WinAPI_GetErrorMessage ' +
        'WinAPI_GetErrorMode WinAPI_GetExitCodeProcess ' +
        'WinAPI_GetExtended WinAPI_GetFileAttributes WinAPI_GetFileID ' +
        'WinAPI_GetFileInformationByHandle ' +
        'WinAPI_GetFileInformationByHandleEx WinAPI_GetFilePointerEx ' +
        'WinAPI_GetFileSizeEx WinAPI_GetFileSizeOnDisk ' +
        'WinAPI_GetFileTitle WinAPI_GetFileType ' +
        'WinAPI_GetFileVersionInfo WinAPI_GetFinalPathNameByHandle ' +
        'WinAPI_GetFinalPathNameByHandleEx WinAPI_GetFocus ' +
        'WinAPI_GetFontMemoryResourceInfo WinAPI_GetFontName ' +
        'WinAPI_GetFontResourceInfo WinAPI_GetForegroundWindow ' +
        'WinAPI_GetFRBuffer WinAPI_GetFullPathName WinAPI_GetGeoInfo ' +
        'WinAPI_GetGlyphOutline WinAPI_GetGraphicsMode ' +
        'WinAPI_GetGuiResources WinAPI_GetGUIThreadInfo ' +
        'WinAPI_GetGValue WinAPI_GetHandleInformation ' +
        'WinAPI_GetHGlobalFromStream WinAPI_GetIconDimension ' +
        'WinAPI_GetIconInfo WinAPI_GetIconInfoEx WinAPI_GetIdleTime ' +
        'WinAPI_GetKeyboardLayout WinAPI_GetKeyboardLayoutList ' +
        'WinAPI_GetKeyboardState WinAPI_GetKeyboardType ' +
        'WinAPI_GetKeyNameText WinAPI_GetKeyState ' +
        'WinAPI_GetLastActivePopup WinAPI_GetLastError ' +
        'WinAPI_GetLastErrorMessage WinAPI_GetLayeredWindowAttributes ' +
        'WinAPI_GetLocaleInfo WinAPI_GetLogicalDrives ' +
        'WinAPI_GetMapMode WinAPI_GetMemorySize ' +
        'WinAPI_GetMessageExtraInfo WinAPI_GetModuleFileNameEx ' +
        'WinAPI_GetModuleHandle WinAPI_GetModuleHandleEx ' +
        'WinAPI_GetModuleInformation WinAPI_GetMonitorInfo ' +
        'WinAPI_GetMousePos WinAPI_GetMousePosX WinAPI_GetMousePosY ' +
        'WinAPI_GetMUILanguage WinAPI_GetNumberFormat WinAPI_GetObject ' +
        'WinAPI_GetObjectID WinAPI_GetObjectInfoByHandle ' +
        'WinAPI_GetObjectNameByHandle WinAPI_GetObjectType ' +
        'WinAPI_GetOpenFileName WinAPI_GetOutlineTextMetrics ' +
        'WinAPI_GetOverlappedResult WinAPI_GetParent ' +
        'WinAPI_GetParentProcess WinAPI_GetPerformanceInfo ' +
        'WinAPI_GetPEType WinAPI_GetPhysicallyInstalledSystemMemory ' +
        'WinAPI_GetPixel WinAPI_GetPolyFillMode WinAPI_GetPosFromRect ' +
        'WinAPI_GetPriorityClass WinAPI_GetProcAddress ' +
        'WinAPI_GetProcessAffinityMask WinAPI_GetProcessCommandLine ' +
        'WinAPI_GetProcessFileName WinAPI_GetProcessHandleCount ' +
        'WinAPI_GetProcessID WinAPI_GetProcessIoCounters ' +
        'WinAPI_GetProcessMemoryInfo WinAPI_GetProcessName ' +
        'WinAPI_GetProcessShutdownParameters WinAPI_GetProcessTimes ' +
        'WinAPI_GetProcessUser WinAPI_GetProcessWindowStation ' +
        'WinAPI_GetProcessWorkingDirectory WinAPI_GetProfilesDirectory ' +
        'WinAPI_GetPwrCapabilities WinAPI_GetRawInputBuffer ' +
        'WinAPI_GetRawInputBufferLength WinAPI_GetRawInputData ' +
        'WinAPI_GetRawInputDeviceInfo WinAPI_GetRegionData ' +
        'WinAPI_GetRegisteredRawInputDevices ' +
        'WinAPI_GetRegKeyNameByHandle WinAPI_GetRgnBox WinAPI_GetROP2 ' +
        'WinAPI_GetRValue WinAPI_GetSaveFileName WinAPI_GetShellWindow ' +
        'WinAPI_GetStartupInfo WinAPI_GetStdHandle ' +
        'WinAPI_GetStockObject WinAPI_GetStretchBltMode ' +
        'WinAPI_GetString WinAPI_GetSysColor WinAPI_GetSysColorBrush ' +
        'WinAPI_GetSystemDefaultLangID WinAPI_GetSystemDefaultLCID ' +
        'WinAPI_GetSystemDefaultUILanguage WinAPI_GetSystemDEPPolicy ' +
        'WinAPI_GetSystemInfo WinAPI_GetSystemMetrics ' +
        'WinAPI_GetSystemPowerStatus WinAPI_GetSystemTimes ' +
        'WinAPI_GetSystemWow64Directory WinAPI_GetTabbedTextExtent ' +
        'WinAPI_GetTempFileName WinAPI_GetTextAlign ' +
        'WinAPI_GetTextCharacterExtra WinAPI_GetTextColor ' +
        'WinAPI_GetTextExtentPoint32 WinAPI_GetTextFace ' +
        'WinAPI_GetTextMetrics WinAPI_GetThemeAppProperties ' +
        'WinAPI_GetThemeBackgroundContentRect ' +
        'WinAPI_GetThemeBackgroundExtent WinAPI_GetThemeBackgroundRegion ' +
        'WinAPI_GetThemeBitmap WinAPI_GetThemeBool ' +
        'WinAPI_GetThemeColor WinAPI_GetThemeDocumentationProperty ' +
        'WinAPI_GetThemeEnumValue WinAPI_GetThemeFilename ' +
        'WinAPI_GetThemeFont WinAPI_GetThemeInt WinAPI_GetThemeMargins ' +
        'WinAPI_GetThemeMetric WinAPI_GetThemePartSize ' +
        'WinAPI_GetThemePosition WinAPI_GetThemePropertyOrigin ' +
        'WinAPI_GetThemeRect WinAPI_GetThemeString ' +
        'WinAPI_GetThemeSysBool WinAPI_GetThemeSysColor ' +
        'WinAPI_GetThemeSysColorBrush WinAPI_GetThemeSysFont ' +
        'WinAPI_GetThemeSysInt WinAPI_GetThemeSysSize ' +
        'WinAPI_GetThemeSysString WinAPI_GetThemeTextExtent ' +
        'WinAPI_GetThemeTextMetrics WinAPI_GetThemeTransitionDuration ' +
        'WinAPI_GetThreadDesktop WinAPI_GetThreadErrorMode ' +
        'WinAPI_GetThreadLocale WinAPI_GetThreadUILanguage ' +
        'WinAPI_GetTickCount WinAPI_GetTickCount64 ' +
        'WinAPI_GetTimeFormat WinAPI_GetTopWindow ' +
        'WinAPI_GetUDFColorMode WinAPI_GetUpdateRect ' +
        'WinAPI_GetUpdateRgn WinAPI_GetUserDefaultLangID ' +
        'WinAPI_GetUserDefaultLCID WinAPI_GetUserDefaultUILanguage ' +
        'WinAPI_GetUserGeoID WinAPI_GetUserObjectInformation ' +
        'WinAPI_GetVersion WinAPI_GetVersionEx ' +
        'WinAPI_GetVolumeInformation WinAPI_GetVolumeInformationByHandle ' +
        'WinAPI_GetVolumeNameForVolumeMountPoint WinAPI_GetWindow ' +
        'WinAPI_GetWindowDC WinAPI_GetWindowDisplayAffinity ' +
        'WinAPI_GetWindowExt WinAPI_GetWindowFileName ' +
        'WinAPI_GetWindowHeight WinAPI_GetWindowInfo ' +
        'WinAPI_GetWindowLong WinAPI_GetWindowOrg ' +
        'WinAPI_GetWindowPlacement WinAPI_GetWindowRect ' +
        'WinAPI_GetWindowRgn WinAPI_GetWindowRgnBox ' +
        'WinAPI_GetWindowSubclass WinAPI_GetWindowText ' +
        'WinAPI_GetWindowTheme WinAPI_GetWindowThreadProcessId ' +
        'WinAPI_GetWindowWidth WinAPI_GetWorkArea ' +
        'WinAPI_GetWorldTransform WinAPI_GetXYFromPoint ' +
        'WinAPI_GlobalMemoryStatus WinAPI_GradientFill ' +
        'WinAPI_GUIDFromString WinAPI_GUIDFromStringEx WinAPI_HashData ' +
        'WinAPI_HashString WinAPI_HiByte WinAPI_HideCaret ' +
        'WinAPI_HiDWord WinAPI_HiWord WinAPI_InflateRect ' +
        'WinAPI_InitMUILanguage WinAPI_InProcess ' +
        'WinAPI_IntersectClipRect WinAPI_IntersectRect ' +
        'WinAPI_IntToDWord WinAPI_IntToFloat WinAPI_InvalidateRect ' +
        'WinAPI_InvalidateRgn WinAPI_InvertANDBitmap ' +
        'WinAPI_InvertColor WinAPI_InvertRect WinAPI_InvertRgn ' +
        'WinAPI_IOCTL WinAPI_IsAlphaBitmap WinAPI_IsBadCodePtr ' +
        'WinAPI_IsBadReadPtr WinAPI_IsBadStringPtr ' +
        'WinAPI_IsBadWritePtr WinAPI_IsChild WinAPI_IsClassName ' +
        'WinAPI_IsDoorOpen WinAPI_IsElevated WinAPI_IsHungAppWindow ' +
        'WinAPI_IsIconic WinAPI_IsInternetConnected ' +
        'WinAPI_IsLoadKBLayout WinAPI_IsMemory ' +
        'WinAPI_IsNameInExpression WinAPI_IsNetworkAlive ' +
        'WinAPI_IsPathShared WinAPI_IsProcessInJob ' +
        'WinAPI_IsProcessorFeaturePresent WinAPI_IsRectEmpty ' +
        'WinAPI_IsThemeActive ' +
        'WinAPI_IsThemeBackgroundPartiallyTransparent ' +
        'WinAPI_IsThemePartDefined WinAPI_IsValidLocale ' +
        'WinAPI_IsWindow WinAPI_IsWindowEnabled WinAPI_IsWindowUnicode ' +
        'WinAPI_IsWindowVisible WinAPI_IsWow64Process ' +
        'WinAPI_IsWritable WinAPI_IsZoomed WinAPI_Keybd_Event ' +
        'WinAPI_KillTimer WinAPI_LineDDA WinAPI_LineTo ' +
        'WinAPI_LoadBitmap WinAPI_LoadCursor WinAPI_LoadCursorFromFile ' +
        'WinAPI_LoadIcon WinAPI_LoadIconMetric ' +
        'WinAPI_LoadIconWithScaleDown WinAPI_LoadImage ' +
        'WinAPI_LoadIndirectString WinAPI_LoadKeyboardLayout ' +
        'WinAPI_LoadLibrary WinAPI_LoadLibraryEx WinAPI_LoadMedia ' +
        'WinAPI_LoadResource WinAPI_LoadShell32Icon WinAPI_LoadString ' +
        'WinAPI_LoadStringEx WinAPI_LoByte WinAPI_LocalFree ' +
        'WinAPI_LockDevice WinAPI_LockFile WinAPI_LockResource ' +
        'WinAPI_LockWindowUpdate WinAPI_LockWorkStation WinAPI_LoDWord ' +
        'WinAPI_LongMid WinAPI_LookupIconIdFromDirectoryEx ' +
        'WinAPI_LoWord WinAPI_LPtoDP WinAPI_MAKELANGID ' +
        'WinAPI_MAKELCID WinAPI_MakeLong WinAPI_MakeQWord ' +
        'WinAPI_MakeWord WinAPI_MapViewOfFile WinAPI_MapVirtualKey ' +
        'WinAPI_MaskBlt WinAPI_MessageBeep WinAPI_MessageBoxCheck ' +
        'WinAPI_MessageBoxIndirect WinAPI_MirrorIcon ' +
        'WinAPI_ModifyWorldTransform WinAPI_MonitorFromPoint ' +
        'WinAPI_MonitorFromRect WinAPI_MonitorFromWindow ' +
        'WinAPI_Mouse_Event WinAPI_MoveFileEx WinAPI_MoveMemory ' +
        'WinAPI_MoveTo WinAPI_MoveToEx WinAPI_MoveWindow ' +
        'WinAPI_MsgBox WinAPI_MulDiv WinAPI_MultiByteToWideChar ' +
        'WinAPI_MultiByteToWideCharEx WinAPI_NtStatusToDosError ' +
        'WinAPI_OemToChar WinAPI_OffsetClipRgn WinAPI_OffsetPoints ' +
        'WinAPI_OffsetRect WinAPI_OffsetRgn WinAPI_OffsetWindowOrg ' +
        'WinAPI_OpenDesktop WinAPI_OpenFileById WinAPI_OpenFileDlg ' +
        'WinAPI_OpenFileMapping WinAPI_OpenIcon ' +
        'WinAPI_OpenInputDesktop WinAPI_OpenJobObject WinAPI_OpenMutex ' +
        'WinAPI_OpenProcess WinAPI_OpenProcessToken ' +
        'WinAPI_OpenSemaphore WinAPI_OpenThemeData ' +
        'WinAPI_OpenWindowStation WinAPI_PageSetupDlg ' +
        'WinAPI_PaintDesktop WinAPI_PaintRgn WinAPI_ParseURL ' +
        'WinAPI_ParseUserName WinAPI_PatBlt WinAPI_PathAddBackslash ' +
        'WinAPI_PathAddExtension WinAPI_PathAppend ' +
        'WinAPI_PathBuildRoot WinAPI_PathCanonicalize ' +
        'WinAPI_PathCommonPrefix WinAPI_PathCompactPath ' +
        'WinAPI_PathCompactPathEx WinAPI_PathCreateFromUrl ' +
        'WinAPI_PathFindExtension WinAPI_PathFindFileName ' +
        'WinAPI_PathFindNextComponent WinAPI_PathFindOnPath ' +
        'WinAPI_PathGetArgs WinAPI_PathGetCharType ' +
        'WinAPI_PathGetDriveNumber WinAPI_PathIsContentType ' +
        'WinAPI_PathIsDirectory WinAPI_PathIsDirectoryEmpty ' +
        'WinAPI_PathIsExe WinAPI_PathIsFileSpec ' +
        'WinAPI_PathIsLFNFileSpec WinAPI_PathIsRelative ' +
        'WinAPI_PathIsRoot WinAPI_PathIsSameRoot ' +
        'WinAPI_PathIsSystemFolder WinAPI_PathIsUNC ' +
        'WinAPI_PathIsUNCServer WinAPI_PathIsUNCServerShare ' +
        'WinAPI_PathMakeSystemFolder WinAPI_PathMatchSpec ' +
        'WinAPI_PathParseIconLocation WinAPI_PathRelativePathTo ' +
        'WinAPI_PathRemoveArgs WinAPI_PathRemoveBackslash ' +
        'WinAPI_PathRemoveExtension WinAPI_PathRemoveFileSpec ' +
        'WinAPI_PathRenameExtension WinAPI_PathSearchAndQualify ' +
        'WinAPI_PathSkipRoot WinAPI_PathStripPath ' +
        'WinAPI_PathStripToRoot WinAPI_PathToRegion ' +
        'WinAPI_PathUndecorate WinAPI_PathUnExpandEnvStrings ' +
        'WinAPI_PathUnmakeSystemFolder WinAPI_PathUnquoteSpaces ' +
        'WinAPI_PathYetAnotherMakeUniqueName WinAPI_PickIconDlg ' +
        'WinAPI_PlayEnhMetaFile WinAPI_PlaySound WinAPI_PlgBlt ' +
        'WinAPI_PointFromRect WinAPI_PolyBezier WinAPI_PolyBezierTo ' +
        'WinAPI_PolyDraw WinAPI_Polygon WinAPI_PostMessage ' +
        'WinAPI_PrimaryLangId WinAPI_PrintDlg WinAPI_PrintDlgEx ' +
        'WinAPI_PrintWindow WinAPI_ProgIDFromCLSID WinAPI_PtInRect ' +
        'WinAPI_PtInRectEx WinAPI_PtInRegion WinAPI_PtVisible ' +
        'WinAPI_QueryDosDevice WinAPI_QueryInformationJobObject ' +
        'WinAPI_QueryPerformanceCounter WinAPI_QueryPerformanceFrequency ' +
        'WinAPI_RadialGradientFill WinAPI_ReadDirectoryChanges ' +
        'WinAPI_ReadFile WinAPI_ReadProcessMemory WinAPI_Rectangle ' +
        'WinAPI_RectInRegion WinAPI_RectIsEmpty WinAPI_RectVisible ' +
        'WinAPI_RedrawWindow WinAPI_RegCloseKey ' +
        'WinAPI_RegConnectRegistry WinAPI_RegCopyTree ' +
        'WinAPI_RegCopyTreeEx WinAPI_RegCreateKey ' +
        'WinAPI_RegDeleteEmptyKey WinAPI_RegDeleteKey ' +
        'WinAPI_RegDeleteKeyValue WinAPI_RegDeleteTree ' +
        'WinAPI_RegDeleteTreeEx WinAPI_RegDeleteValue ' +
        'WinAPI_RegDisableReflectionKey WinAPI_RegDuplicateHKey ' +
        'WinAPI_RegEnableReflectionKey WinAPI_RegEnumKey ' +
        'WinAPI_RegEnumValue WinAPI_RegFlushKey ' +
        'WinAPI_RegisterApplicationRestart WinAPI_RegisterClass ' +
        'WinAPI_RegisterClassEx WinAPI_RegisterHotKey ' +
        'WinAPI_RegisterPowerSettingNotification ' +
        'WinAPI_RegisterRawInputDevices WinAPI_RegisterShellHookWindow ' +
        'WinAPI_RegisterWindowMessage WinAPI_RegLoadMUIString ' +
        'WinAPI_RegNotifyChangeKeyValue WinAPI_RegOpenKey ' +
        'WinAPI_RegQueryInfoKey WinAPI_RegQueryLastWriteTime ' +
        'WinAPI_RegQueryMultipleValues WinAPI_RegQueryReflectionKey ' +
        'WinAPI_RegQueryValue WinAPI_RegRestoreKey WinAPI_RegSaveKey ' +
        'WinAPI_RegSetValue WinAPI_ReleaseCapture WinAPI_ReleaseDC ' +
        'WinAPI_ReleaseMutex WinAPI_ReleaseSemaphore ' +
        'WinAPI_ReleaseStream WinAPI_RemoveClipboardFormatListener ' +
        'WinAPI_RemoveDirectory WinAPI_RemoveFontMemResourceEx ' +
        'WinAPI_RemoveFontResourceEx WinAPI_RemoveWindowSubclass ' +
        'WinAPI_ReOpenFile WinAPI_ReplaceFile WinAPI_ReplaceTextDlg ' +
        'WinAPI_ResetEvent WinAPI_RestartDlg WinAPI_RestoreDC ' +
        'WinAPI_RGB WinAPI_RotatePoints WinAPI_RoundRect ' +
        'WinAPI_SaveDC WinAPI_SaveFileDlg WinAPI_SaveHBITMAPToFile ' +
        'WinAPI_SaveHICONToFile WinAPI_ScaleWindowExt ' +
        'WinAPI_ScreenToClient WinAPI_SearchPath WinAPI_SelectClipPath ' +
        'WinAPI_SelectClipRgn WinAPI_SelectObject ' +
        'WinAPI_SendMessageTimeout WinAPI_SetActiveWindow ' +
        'WinAPI_SetArcDirection WinAPI_SetBitmapBits ' +
        'WinAPI_SetBitmapDimensionEx WinAPI_SetBkColor ' +
        'WinAPI_SetBkMode WinAPI_SetBoundsRect WinAPI_SetBrushOrg ' +
        'WinAPI_SetCapture WinAPI_SetCaretBlinkTime WinAPI_SetCaretPos ' +
        'WinAPI_SetClassLongEx WinAPI_SetColorAdjustment ' +
        'WinAPI_SetCompression WinAPI_SetCurrentDirectory ' +
        'WinAPI_SetCurrentProcessExplicitAppUserModelID WinAPI_SetCursor ' +
        'WinAPI_SetDCBrushColor WinAPI_SetDCPenColor ' +
        'WinAPI_SetDefaultPrinter WinAPI_SetDeviceGammaRamp ' +
        'WinAPI_SetDIBColorTable WinAPI_SetDIBits ' +
        'WinAPI_SetDIBitsToDevice WinAPI_SetDllDirectory ' +
        'WinAPI_SetEndOfFile WinAPI_SetEnhMetaFileBits ' +
        'WinAPI_SetErrorMode WinAPI_SetEvent WinAPI_SetFileAttributes ' +
        'WinAPI_SetFileInformationByHandleEx WinAPI_SetFilePointer ' +
        'WinAPI_SetFilePointerEx WinAPI_SetFileShortName ' +
        'WinAPI_SetFileValidData WinAPI_SetFocus WinAPI_SetFont ' +
        'WinAPI_SetForegroundWindow WinAPI_SetFRBuffer ' +
        'WinAPI_SetGraphicsMode WinAPI_SetHandleInformation ' +
        'WinAPI_SetInformationJobObject WinAPI_SetKeyboardLayout ' +
        'WinAPI_SetKeyboardState WinAPI_SetLastError ' +
        'WinAPI_SetLayeredWindowAttributes WinAPI_SetLocaleInfo ' +
        'WinAPI_SetMapMode WinAPI_SetMessageExtraInfo WinAPI_SetParent ' +
        'WinAPI_SetPixel WinAPI_SetPolyFillMode ' +
        'WinAPI_SetPriorityClass WinAPI_SetProcessAffinityMask ' +
        'WinAPI_SetProcessShutdownParameters ' +
        'WinAPI_SetProcessWindowStation WinAPI_SetRectRgn ' +
        'WinAPI_SetROP2 WinAPI_SetSearchPathMode ' +
        'WinAPI_SetStretchBltMode WinAPI_SetSysColors ' +
        'WinAPI_SetSystemCursor WinAPI_SetTextAlign ' +
        'WinAPI_SetTextCharacterExtra WinAPI_SetTextColor ' +
        'WinAPI_SetTextJustification WinAPI_SetThemeAppProperties ' +
        'WinAPI_SetThreadDesktop WinAPI_SetThreadErrorMode ' +
        'WinAPI_SetThreadExecutionState WinAPI_SetThreadLocale ' +
        'WinAPI_SetThreadUILanguage WinAPI_SetTimer ' +
        'WinAPI_SetUDFColorMode WinAPI_SetUserGeoID ' +
        'WinAPI_SetUserObjectInformation WinAPI_SetVolumeMountPoint ' +
        'WinAPI_SetWindowDisplayAffinity WinAPI_SetWindowExt ' +
        'WinAPI_SetWindowLong WinAPI_SetWindowOrg ' +
        'WinAPI_SetWindowPlacement WinAPI_SetWindowPos ' +
        'WinAPI_SetWindowRgn WinAPI_SetWindowsHookEx ' +
        'WinAPI_SetWindowSubclass WinAPI_SetWindowText ' +
        'WinAPI_SetWindowTheme WinAPI_SetWinEventHook ' +
        'WinAPI_SetWorldTransform WinAPI_SfcIsFileProtected ' +
        'WinAPI_SfcIsKeyProtected WinAPI_ShellAboutDlg ' +
        'WinAPI_ShellAddToRecentDocs WinAPI_ShellChangeNotify ' +
        'WinAPI_ShellChangeNotifyDeregister ' +
        'WinAPI_ShellChangeNotifyRegister WinAPI_ShellCreateDirectory ' +
        'WinAPI_ShellEmptyRecycleBin WinAPI_ShellExecute ' +
        'WinAPI_ShellExecuteEx WinAPI_ShellExtractAssociatedIcon ' +
        'WinAPI_ShellExtractIcon WinAPI_ShellFileOperation ' +
        'WinAPI_ShellFlushSFCache WinAPI_ShellGetFileInfo ' +
        'WinAPI_ShellGetIconOverlayIndex WinAPI_ShellGetImageList ' +
        'WinAPI_ShellGetKnownFolderIDList WinAPI_ShellGetKnownFolderPath ' +
        'WinAPI_ShellGetLocalizedName WinAPI_ShellGetPathFromIDList ' +
        'WinAPI_ShellGetSetFolderCustomSettings WinAPI_ShellGetSettings ' +
        'WinAPI_ShellGetSpecialFolderLocation ' +
        'WinAPI_ShellGetSpecialFolderPath WinAPI_ShellGetStockIconInfo ' +
        'WinAPI_ShellILCreateFromPath WinAPI_ShellNotifyIcon ' +
        'WinAPI_ShellNotifyIconGetRect WinAPI_ShellObjectProperties ' +
        'WinAPI_ShellOpenFolderAndSelectItems WinAPI_ShellOpenWithDlg ' +
        'WinAPI_ShellQueryRecycleBin ' +
        'WinAPI_ShellQueryUserNotificationState ' +
        'WinAPI_ShellRemoveLocalizedName WinAPI_ShellRestricted ' +
        'WinAPI_ShellSetKnownFolderPath WinAPI_ShellSetLocalizedName ' +
        'WinAPI_ShellSetSettings WinAPI_ShellStartNetConnectionDlg ' +
        'WinAPI_ShellUpdateImage WinAPI_ShellUserAuthenticationDlg ' +
        'WinAPI_ShellUserAuthenticationDlgEx WinAPI_ShortToWord ' +
        'WinAPI_ShowCaret WinAPI_ShowCursor WinAPI_ShowError ' +
        'WinAPI_ShowLastError WinAPI_ShowMsg WinAPI_ShowOwnedPopups ' +
        'WinAPI_ShowWindow WinAPI_ShutdownBlockReasonCreate ' +
        'WinAPI_ShutdownBlockReasonDestroy ' +
        'WinAPI_ShutdownBlockReasonQuery WinAPI_SizeOfResource ' +
        'WinAPI_StretchBlt WinAPI_StretchDIBits ' +
        'WinAPI_StrFormatByteSize WinAPI_StrFormatByteSizeEx ' +
        'WinAPI_StrFormatKBSize WinAPI_StrFromTimeInterval ' +
        'WinAPI_StringFromGUID WinAPI_StringLenA WinAPI_StringLenW ' +
        'WinAPI_StrLen WinAPI_StrokeAndFillPath WinAPI_StrokePath ' +
        'WinAPI_StructToArray WinAPI_SubLangId WinAPI_SubtractRect ' +
        'WinAPI_SwapDWord WinAPI_SwapQWord WinAPI_SwapWord ' +
        'WinAPI_SwitchColor WinAPI_SwitchDesktop ' +
        'WinAPI_SwitchToThisWindow WinAPI_SystemParametersInfo ' +
        'WinAPI_TabbedTextOut WinAPI_TerminateJobObject ' +
        'WinAPI_TerminateProcess WinAPI_TextOut WinAPI_TileWindows ' +
        'WinAPI_TrackMouseEvent WinAPI_TransparentBlt ' +
        'WinAPI_TwipsPerPixelX WinAPI_TwipsPerPixelY ' +
        'WinAPI_UnhookWindowsHookEx WinAPI_UnhookWinEvent ' +
        'WinAPI_UnionRect WinAPI_UnionStruct WinAPI_UniqueHardwareID ' +
        'WinAPI_UnloadKeyboardLayout WinAPI_UnlockFile ' +
        'WinAPI_UnmapViewOfFile WinAPI_UnregisterApplicationRestart ' +
        'WinAPI_UnregisterClass WinAPI_UnregisterHotKey ' +
        'WinAPI_UnregisterPowerSettingNotification ' +
        'WinAPI_UpdateLayeredWindow WinAPI_UpdateLayeredWindowEx ' +
        'WinAPI_UpdateLayeredWindowIndirect WinAPI_UpdateResource ' +
        'WinAPI_UpdateWindow WinAPI_UrlApplyScheme ' +
        'WinAPI_UrlCanonicalize WinAPI_UrlCombine WinAPI_UrlCompare ' +
        'WinAPI_UrlCreateFromPath WinAPI_UrlFixup WinAPI_UrlGetPart ' +
        'WinAPI_UrlHash WinAPI_UrlIs WinAPI_UserHandleGrantAccess ' +
        'WinAPI_ValidateRect WinAPI_ValidateRgn WinAPI_VerQueryRoot ' +
        'WinAPI_VerQueryValue WinAPI_VerQueryValueEx ' +
        'WinAPI_WaitForInputIdle WinAPI_WaitForMultipleObjects ' +
        'WinAPI_WaitForSingleObject WinAPI_WideCharToMultiByte ' +
        'WinAPI_WidenPath WinAPI_WindowFromDC WinAPI_WindowFromPoint ' +
        'WinAPI_WordToShort WinAPI_Wow64EnableWow64FsRedirection ' +
        'WinAPI_WriteConsole WinAPI_WriteFile ' +
        'WinAPI_WriteProcessMemory WinAPI_ZeroMemory ' +
        'WinNet_AddConnection WinNet_AddConnection2 ' +
        'WinNet_AddConnection3 WinNet_CancelConnection ' +
        'WinNet_CancelConnection2 WinNet_CloseEnum ' +
        'WinNet_ConnectionDialog WinNet_ConnectionDialog1 ' +
        'WinNet_DisconnectDialog WinNet_DisconnectDialog1 ' +
        'WinNet_EnumResource WinNet_GetConnection ' +
        'WinNet_GetConnectionPerformance WinNet_GetLastError ' +
        'WinNet_GetNetworkInformation WinNet_GetProviderName ' +
        'WinNet_GetResourceInformation WinNet_GetResourceParent ' +
        'WinNet_GetUniversalName WinNet_GetUser WinNet_OpenEnum ' +
        'WinNet_RestoreConnection WinNet_UseConnection Word_Create ' +
        'Word_DocAdd Word_DocAttach Word_DocClose Word_DocExport ' +
        'Word_DocFind Word_DocFindReplace Word_DocGet ' +
        'Word_DocLinkAdd Word_DocLinkGet Word_DocOpen ' +
        'Word_DocPictureAdd Word_DocPrint Word_DocRangeSet ' +
        'Word_DocSave Word_DocSaveAs Word_DocTableRead ' +
        'Word_DocTableWrite Word_Quit',

        COMMENT = {
            variants: [
              hljs.COMMENT(';', '$', {relevance: 0}),
              hljs.COMMENT('#cs', '#ce'),
              hljs.COMMENT('#comments-start', '#comments-end')
            ]
        },

        VARIABLE = {
            begin: '\\$[A-z0-9_]+'
        },

        STRING = {
            className: 'string',
            variants: [{
                begin: /"/,
                end: /"/,
                contains: [{
                    begin: /""/,
                    relevance: 0
                }]
            }, {
                begin: /'/,
                end: /'/,
                contains: [{
                    begin: /''/,
                    relevance: 0
                }]
            }]
        },

        NUMBER = {
            variants: [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE]
        },

        PREPROCESSOR = {
            className: 'meta',
            begin: '#',
            end: '$',
            keywords: {'meta-keyword': 'include include-once NoTrayIcon OnAutoItStartRegister RequireAdmin pragma ' +
                'Au3Stripper_Ignore_Funcs Au3Stripper_Ignore_Variables ' +
                'Au3Stripper_Off Au3Stripper_On Au3Stripper_Parameters ' +
                'AutoIt3Wrapper_Add_Constants AutoIt3Wrapper_Au3Check_Parameters ' +
                'AutoIt3Wrapper_Au3Check_Stop_OnWarning AutoIt3Wrapper_Aut2Exe ' +
                'AutoIt3Wrapper_AutoIt3 AutoIt3Wrapper_AutoIt3Dir ' +
                'AutoIt3Wrapper_Change2CUI AutoIt3Wrapper_Compile_Both ' +
                'AutoIt3Wrapper_Compression AutoIt3Wrapper_EndIf ' +
                'AutoIt3Wrapper_Icon AutoIt3Wrapper_If_Compile ' +
                'AutoIt3Wrapper_If_Run AutoIt3Wrapper_Jump_To_First_Error ' +
                'AutoIt3Wrapper_OutFile AutoIt3Wrapper_OutFile_Type ' +
                'AutoIt3Wrapper_OutFile_X64 AutoIt3Wrapper_PlugIn_Funcs ' +
                'AutoIt3Wrapper_Res_Comment Autoit3Wrapper_Res_Compatibility ' +
                'AutoIt3Wrapper_Res_Description AutoIt3Wrapper_Res_Field ' +
                'AutoIt3Wrapper_Res_File_Add AutoIt3Wrapper_Res_FileVersion ' +
                'AutoIt3Wrapper_Res_FileVersion_AutoIncrement ' +
                'AutoIt3Wrapper_Res_Icon_Add AutoIt3Wrapper_Res_Language ' +
                'AutoIt3Wrapper_Res_LegalCopyright ' +
                'AutoIt3Wrapper_Res_ProductVersion ' +
                'AutoIt3Wrapper_Res_requestedExecutionLevel ' +
                'AutoIt3Wrapper_Res_SaveSource AutoIt3Wrapper_Run_After ' +
                'AutoIt3Wrapper_Run_Au3Check AutoIt3Wrapper_Run_Au3Stripper ' +
                'AutoIt3Wrapper_Run_Before AutoIt3Wrapper_Run_Debug_Mode ' +
                'AutoIt3Wrapper_Run_SciTE_Minimized ' +
                'AutoIt3Wrapper_Run_SciTE_OutputPane_Minimized ' +
                'AutoIt3Wrapper_Run_Tidy AutoIt3Wrapper_ShowProgress ' +
                'AutoIt3Wrapper_Testing AutoIt3Wrapper_Tidy_Stop_OnError ' +
                'AutoIt3Wrapper_UPX_Parameters AutoIt3Wrapper_UseUPX ' +
                'AutoIt3Wrapper_UseX64 AutoIt3Wrapper_Version ' +
                'AutoIt3Wrapper_Versioning AutoIt3Wrapper_Versioning_Parameters ' +
                'Tidy_Off Tidy_On Tidy_Parameters EndRegion Region'},
            contains: [{
                    begin: /\\\n/,
                    relevance: 0
                }, {
                    beginKeywords: 'include',
                    keywords: {'meta-keyword': 'include'},
                    end: '$',
                    contains: [
                        STRING, {
                            className: 'meta-string',
                            variants: [{
                                begin: '<',
                                end: '>'
                            }, {
                                begin: /"/,
                                end: /"/,
                                contains: [{
                                    begin: /""/,
                                    relevance: 0
                                }]
                            }, {
                                begin: /'/,
                                end: /'/,
                                contains: [{
                                    begin: /''/,
                                    relevance: 0
                                }]
                            }]
                        }
                    ]
                },
                STRING,
                COMMENT
            ]
        },

        CONSTANT = {
            className: 'symbol',
            // begin: '@',
            // end: '$',
            // keywords: 'AppDataCommonDir AppDataDir AutoItExe AutoItPID AutoItVersion AutoItX64 COM_EventObj CommonFilesDir Compiled ComputerName ComSpec CPUArch CR CRLF DesktopCommonDir DesktopDepth DesktopDir DesktopHeight DesktopRefresh DesktopWidth DocumentsCommonDir error exitCode exitMethod extended FavoritesCommonDir FavoritesDir GUI_CtrlHandle GUI_CtrlId GUI_DragFile GUI_DragId GUI_DropId GUI_WinHandle HomeDrive HomePath HomeShare HotKeyPressed HOUR IPAddress1 IPAddress2 IPAddress3 IPAddress4 KBLayout LF LocalAppDataDir LogonDNSDomain LogonDomain LogonServer MDAY MIN MON MSEC MUILang MyDocumentsDir NumParams OSArch OSBuild OSLang OSServicePack OSType OSVersion ProgramFilesDir ProgramsCommonDir ProgramsDir ScriptDir ScriptFullPath ScriptLineNumber ScriptName SEC StartMenuCommonDir StartMenuDir StartupCommonDir StartupDir SW_DISABLE SW_ENABLE SW_HIDE SW_LOCK SW_MAXIMIZE SW_MINIMIZE SW_RESTORE SW_SHOW SW_SHOWDEFAULT SW_SHOWMAXIMIZED SW_SHOWMINIMIZED SW_SHOWMINNOACTIVE SW_SHOWNA SW_SHOWNOACTIVATE SW_SHOWNORMAL SW_UNLOCK SystemDir TAB TempDir TRAY_ID TrayIconFlashing TrayIconVisible UserName UserProfileDir WDAY WindowsDir WorkingDir YDAY YEAR',
            // relevance: 5
            begin: '@[A-z0-9_]+'
        },

        FUNCTION = {
            className: 'function',
            beginKeywords: 'Func',
            end: '$',
            illegal: '\\$|\\[|%',
            contains: [
                hljs.UNDERSCORE_TITLE_MODE, {
                    className: 'params',
                    begin: '\\(',
                    end: '\\)',
                    contains: [
                        VARIABLE,
                        STRING,
                        NUMBER
                    ]
                }
            ]
        };

    return {
        case_insensitive: true,
        illegal: /\/\*/,
        keywords: {
            keyword: KEYWORDS,
            built_in: BUILT_IN,
            literal: LITERAL
        },
        contains: [
            COMMENT,
            VARIABLE,
            STRING,
            NUMBER,
            PREPROCESSOR,
            CONSTANT,
            FUNCTION
        ]
    }
});

hljs.registerLanguage('avrasm', function(hljs) {
  return {
    case_insensitive: true,
    lexemes: '\\.?' + hljs.IDENT_RE,
    keywords: {
      keyword:
        /* mnemonic */
        'adc add adiw and andi asr bclr bld brbc brbs brcc brcs break breq brge brhc brhs ' +
        'brid brie brlo brlt brmi brne brpl brsh brtc brts brvc brvs bset bst call cbi cbr ' +
        'clc clh cli cln clr cls clt clv clz com cp cpc cpi cpse dec eicall eijmp elpm eor ' +
        'fmul fmuls fmulsu icall ijmp in inc jmp ld ldd ldi lds lpm lsl lsr mov movw mul ' +
        'muls mulsu neg nop or ori out pop push rcall ret reti rjmp rol ror sbc sbr sbrc sbrs ' +
        'sec seh sbi sbci sbic sbis sbiw sei sen ser ses set sev sez sleep spm st std sts sub ' +
        'subi swap tst wdr',
      built_in:
        /* general purpose registers */
        'r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 r16 r17 r18 r19 r20 r21 r22 ' +
        'r23 r24 r25 r26 r27 r28 r29 r30 r31 x|0 xh xl y|0 yh yl z|0 zh zl ' +
        /* IO Registers (ATMega128) */
        'ucsr1c udr1 ucsr1a ucsr1b ubrr1l ubrr1h ucsr0c ubrr0h tccr3c tccr3a tccr3b tcnt3h ' +
        'tcnt3l ocr3ah ocr3al ocr3bh ocr3bl ocr3ch ocr3cl icr3h icr3l etimsk etifr tccr1c ' +
        'ocr1ch ocr1cl twcr twdr twar twsr twbr osccal xmcra xmcrb eicra spmcsr spmcr portg ' +
        'ddrg ping portf ddrf sreg sph spl xdiv rampz eicrb eimsk gimsk gicr eifr gifr timsk ' +
        'tifr mcucr mcucsr tccr0 tcnt0 ocr0 assr tccr1a tccr1b tcnt1h tcnt1l ocr1ah ocr1al ' +
        'ocr1bh ocr1bl icr1h icr1l tccr2 tcnt2 ocr2 ocdr wdtcr sfior eearh eearl eedr eecr ' +
        'porta ddra pina portb ddrb pinb portc ddrc pinc portd ddrd pind spdr spsr spcr udr0 ' +
        'ucsr0a ucsr0b ubrr0l acsr admux adcsr adch adcl porte ddre pine pinf',
      meta:
        '.byte .cseg .db .def .device .dseg .dw .endmacro .equ .eseg .exit .include .list ' +
        '.listmac .macro .nolist .org .set'
    },
    contains: [
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.COMMENT(
        ';',
        '$',
        {
          relevance: 0
        }
      ),
      hljs.C_NUMBER_MODE, // 0x..., decimal, float
      hljs.BINARY_NUMBER_MODE, // 0b...
      {
        className: 'number',
        begin: '\\b(\\$[a-zA-Z0-9]+|0o[0-7]+)' // $..., 0o...
      },
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: '\'', end: '[^\\\\]\'',
        illegal: '[^\\\\][^\']'
      },
      {className: 'symbol',  begin: '^[A-Za-z0-9_.$]+:'},
      {className: 'meta', begin: '#', end: '$'},
      {  // подстановка в «.macro»
        className: 'subst',
        begin: '@[0-9]+'
      }
    ]
  };
});

hljs.registerLanguage('axapta', function(hljs) {
  return {
    keywords: 'false int abstract private char boolean static null if for true ' +
      'while long throw finally protected final return void enum else ' +
      'break new catch byte super case short default double public try this switch ' +
      'continue reverse firstfast firstonly forupdate nofetch sum avg minof maxof count ' +
      'order group by asc desc index hint like dispaly edit client server ttsbegin ' +
      'ttscommit str real date container anytype common div mod',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'meta',
        begin: '#', end: '$'
      },
      {
        className: 'class',
        beginKeywords: 'class interface', end: '{', excludeEnd: true,
        illegal: ':',
        contains: [
          {beginKeywords: 'extends implements'},
          hljs.UNDERSCORE_TITLE_MODE
        ]
      }
    ]
  };
});

hljs.registerLanguage('bash', function(hljs) {
  var VAR = {
    className: 'variable',
    variants: [
      {begin: /\$[\w\d#@][\w\d_]*/},
      {begin: /\$\{(.*?)}/}
    ]
  };
  var QUOTE_STRING = {
    className: 'string',
    begin: /"/, end: /"/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      VAR,
      {
        className: 'variable',
        begin: /\$\(/, end: /\)/,
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };
  var APOS_STRING = {
    className: 'string',
    begin: /'/, end: /'/
  };

  return {
    aliases: ['sh', 'zsh'],
    lexemes: /-?[a-z\.]+/,
    keywords: {
      keyword:
        'if then else elif fi for while in do done case esac function',
      literal:
        'true false',
      built_in:
        // Shell built-ins
        // http://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
        'break cd continue eval exec exit export getopts hash pwd readonly return shift test times ' +
        'trap umask unset ' +
        // Bash built-ins
        'alias bind builtin caller command declare echo enable help let local logout mapfile printf ' +
        'read readarray source type typeset ulimit unalias ' +
        // Shell modifiers
        'set shopt ' +
        // Zsh built-ins
        'autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles ' +
        'compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate ' +
        'fc fg float functions getcap getln history integer jobs kill limit log noglob popd print ' +
        'pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit ' +
        'unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof ' +
        'zpty zregexparse zsocket zstyle ztcp',
      _:
        '-ne -eq -lt -gt -f -d -e -s -l -a' // relevance booster
    },
    contains: [
      {
        className: 'meta',
        begin: /^#![^\n]+sh\s*$/,
        relevance: 10
      },
      {
        className: 'function',
        begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
        returnBegin: true,
        contains: [hljs.inherit(hljs.TITLE_MODE, {begin: /\w[\w\d_]*/})],
        relevance: 0
      },
      hljs.HASH_COMMENT_MODE,
      QUOTE_STRING,
      APOS_STRING,
      VAR
    ]
  };
});

hljs.registerLanguage('basic', function(hljs) {
  return {
    case_insensitive: true,
    illegal: '^\.',
    // Support explicitely typed variables that end with $%! or #.
    lexemes: '[a-zA-Z][a-zA-Z0-9_\$\%\!\#]*',
    keywords: {
        keyword:
          'ABS ASC AND ATN AUTO|0 BEEP BLOAD|10 BSAVE|10 CALL CALLS CDBL CHAIN CHDIR CHR$|10 CINT CIRCLE ' +
          'CLEAR CLOSE CLS COLOR COM COMMON CONT COS CSNG CSRLIN CVD CVI CVS DATA DATE$ ' +
          'DEFDBL DEFINT DEFSNG DEFSTR DEF|0 SEG USR DELETE DIM DRAW EDIT END ENVIRON ENVIRON$ ' +
          'EOF EQV ERASE ERDEV ERDEV$ ERL ERR ERROR EXP FIELD FILES FIX FOR|0 FRE GET GOSUB|10 GOTO ' +
          'HEX$ IF|0 THEN ELSE|0 INKEY$ INP INPUT INPUT# INPUT$ INSTR IMP INT IOCTL IOCTL$ KEY ON ' +
          'OFF LIST KILL LEFT$ LEN LET LINE LLIST LOAD LOC LOCATE LOF LOG LPRINT USING LSET ' +
          'MERGE MID$ MKDIR MKD$ MKI$ MKS$ MOD NAME NEW NEXT NOISE NOT OCT$ ON OR PEN PLAY STRIG OPEN OPTION ' +
          'BASE OUT PAINT PALETTE PCOPY PEEK PMAP POINT POKE POS PRINT PRINT] PSET PRESET ' +
          'PUT RANDOMIZE READ REM RENUM RESET|0 RESTORE RESUME RETURN|0 RIGHT$ RMDIR RND RSET ' +
          'RUN SAVE SCREEN SGN SHELL SIN SOUND SPACE$ SPC SQR STEP STICK STOP STR$ STRING$ SWAP ' +
          'SYSTEM TAB TAN TIME$ TIMER TROFF TRON TO USR VAL VARPTR VARPTR$ VIEW WAIT WHILE ' +
          'WEND WIDTH WINDOW WRITE XOR'
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.COMMENT('REM', '$', {relevance: 10}),
      hljs.COMMENT('\'', '$', {relevance: 0}),
      {
        // Match line numbers
        className: 'symbol',
        begin: '^[0-9]+\ ',
        relevance: 10
      },
      {
        // Match typed numeric constants (1000, 12.34!, 1.2e5, 1.5#, 1.2D2)
        className: 'number',
        begin: '\\b([0-9]+[0-9edED\.]*[#\!]?)',
        relevance: 0
      },
      {
        // Match hexadecimal numbers (&Hxxxx)
        className: 'number',
        begin: '(\&[hH][0-9a-fA-F]{1,4})'
      },
      {
        // Match octal numbers (&Oxxxxxx)
        className: 'number',
        begin: '(\&[oO][0-7]{1,6})'
      }
    ]
  };
});

hljs.registerLanguage('brainfuck', function(hljs){
  var LITERAL = {
    className: 'literal',
    begin: '[\\+\\-]',
    relevance: 0
  };
  return {
    aliases: ['bf'],
    contains: [
      hljs.COMMENT(
        '[^\\[\\]\\.,\\+\\-<> \r\n]',
        '[\\[\\]\\.,\\+\\-<> \r\n]',
        {
          returnEnd: true,
          relevance: 0
        }
      ),
      {
        className: 'title',
        begin: '[\\[\\]]',
        relevance: 0
      },
      {
        className: 'string',
        begin: '[\\.,]',
        relevance: 0
      },
      {
        // this mode works as the only relevance counter
        begin: /\+\+|\-\-/, returnBegin: true,
        contains: [LITERAL]
      },
      LITERAL
    ]
  };
});

hljs.registerLanguage('cal', function(hljs) {
  var KEYWORDS =
    'div mod in and or not xor asserterror begin case do downto else end exit for if of repeat then to ' +
    'until while with var';
  var LITERALS = 'false true';
  var COMMENT_MODES = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.COMMENT(
      /\{/,
      /\}/,
      {
        relevance: 0
      }
    ),
    hljs.COMMENT(
      /\(\*/,
      /\*\)/,
      {
        relevance: 10
      }
    )
  ];
  var STRING = {
    className: 'string',
    begin: /'/, end: /'/,
    contains: [{begin: /''/}]
  };
  var CHAR_STRING = {
    className: 'string', begin: /(#\d+)+/
  };
  var DATE = {
      className: 'number',
      begin: '\\b\\d+(\\.\\d+)?(DT|D|T)',
      relevance: 0
  };
  var DBL_QUOTED_VARIABLE = {
      className: 'string', // not a string technically but makes sense to be highlighted in the same style
      begin: '"',
      end: '"'
  };

  var PROCEDURE = {
    className: 'function',
    beginKeywords: 'procedure', end: /[:;]/,
    keywords: 'procedure|10',
    contains: [
      hljs.TITLE_MODE,
      {
        className: 'params',
        begin: /\(/, end: /\)/,
        keywords: KEYWORDS,
        contains: [STRING, CHAR_STRING]
      }
    ].concat(COMMENT_MODES)
  };

  var OBJECT = {
    className: 'class',
    begin: 'OBJECT (Table|Form|Report|Dataport|Codeunit|XMLport|MenuSuite|Page|Query) (\\d+) ([^\\r\\n]+)',
    returnBegin: true,
    contains: [
      hljs.TITLE_MODE,
        PROCEDURE
    ]
  };

  return {
    case_insensitive: true,
    keywords: { keyword: KEYWORDS, literal: LITERALS },
    illegal: /\/\*/,
    contains: [
      STRING, CHAR_STRING,
      DATE, DBL_QUOTED_VARIABLE,
      hljs.NUMBER_MODE,
      OBJECT,
      PROCEDURE
    ]
  };
});

hljs.registerLanguage('capnproto', function(hljs) {
  return {
    aliases: ['capnp'],
    keywords: {
      keyword:
        'struct enum interface union group import using const annotation extends in of on as with from fixed',
      built_in:
        'Void Bool Int8 Int16 Int32 Int64 UInt8 UInt16 UInt32 UInt64 Float32 Float64 ' +
        'Text Data AnyPointer AnyStruct Capability List',
      literal:
        'true false'
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      hljs.HASH_COMMENT_MODE,
      {
        className: 'meta',
        begin: /@0x[\w\d]{16};/,
        illegal: /\n/
      },
      {
        className: 'symbol',
        begin: /@\d+\b/
      },
      {
        className: 'class',
        beginKeywords: 'struct enum', end: /\{/,
        illegal: /\n/,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            starts: {endsWithParent: true, excludeEnd: true} // hack: eating everything after the first title
          })
        ]
      },
      {
        className: 'class',
        beginKeywords: 'interface', end: /\{/,
        illegal: /\n/,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            starts: {endsWithParent: true, excludeEnd: true} // hack: eating everything after the first title
          })
        ]
      }
    ]
  };
});

hljs.registerLanguage('ceylon', function(hljs) {
  // 2.3. Identifiers and keywords
  var KEYWORDS =
    'assembly module package import alias class interface object given value ' +
    'assign void function new of extends satisfies abstracts in out return ' +
    'break continue throw assert dynamic if else switch case for while try ' +
    'catch finally then let this outer super is exists nonempty';
  // 7.4.1 Declaration Modifiers
  var DECLARATION_MODIFIERS =
    'shared abstract formal default actual variable late native deprecated' +
    'final sealed annotation suppressWarnings small';
  // 7.4.2 Documentation
  var DOCUMENTATION =
    'doc by license see throws tagged';
  var SUBST = {
    className: 'subst', excludeBegin: true, excludeEnd: true,
    begin: /``/, end: /``/,
    keywords: KEYWORDS,
    relevance: 10
  };
  var EXPRESSIONS = [
    {
      // verbatim string
      className: 'string',
      begin: '"""',
      end: '"""',
      relevance: 10
    },
    {
      // string literal or template
      className: 'string',
      begin: '"', end: '"',
      contains: [SUBST]
    },
    {
      // character literal
      className: 'string',
      begin: "'",
      end: "'"
    },
    {
      // numeric literal
      className: 'number',
      begin: '#[0-9a-fA-F_]+|\\$[01_]+|[0-9_]+(?:\\.[0-9_](?:[eE][+-]?\\d+)?)?[kMGTPmunpf]?',
      relevance: 0
    }
  ];
  SUBST.contains = EXPRESSIONS;

  return {
    keywords: {
      keyword: KEYWORDS + ' ' + DECLARATION_MODIFIERS,
      meta: DOCUMENTATION
    },
    illegal: '\\$[^01]|#[^0-9a-fA-F]',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.COMMENT('/\\*', '\\*/', {contains: ['self']}),
      {
        // compiler annotation
        className: 'meta',
        begin: '@[a-z]\\w*(?:\\:\"[^\"]*\")?'
      }
    ].concat(EXPRESSIONS)
  };
});

hljs.registerLanguage('clojure', function(hljs) {
  var keywords = {
    'builtin-name':
      // Clojure keywords
      'def defonce cond apply if-not if-let if not not= = < > <= >= == + / * - rem '+
      'quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? '+
      'set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? '+
      'class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? '+
      'string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . '+
      'inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last '+
      'drop-while while intern condp case reduced cycle split-at split-with repeat replicate '+
      'iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext '+
      'nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends '+
      'add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler '+
      'set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter '+
      'monitor-exit defmacro defn defn- macroexpand macroexpand-1 for dosync and or '+
      'when when-not when-let comp juxt partial sequence memoize constantly complement identity assert '+
      'peek pop doto proxy defstruct first rest cons defprotocol cast coll deftype defrecord last butlast '+
      'sigs reify second ffirst fnext nfirst nnext defmulti defmethod meta with-meta ns in-ns create-ns import '+
      'refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! '+
      'assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger '+
      'bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline '+
      'flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking '+
      'assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! '+
      'reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! '+
      'new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty '+
      'hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list '+
      'disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer '+
      'chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate '+
      'unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta '+
      'lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize'
   };

  var SYMBOLSTART = 'a-zA-Z_\\-!.?+*=<>&#\'';
  var SYMBOL_RE = '[' + SYMBOLSTART + '][' + SYMBOLSTART + '0-9/;:]*';
  var SIMPLE_NUMBER_RE = '[-+]?\\d+(\\.\\d+)?';

  var SYMBOL = {
    begin: SYMBOL_RE,
    relevance: 0
  };
  var NUMBER = {
    className: 'number', begin: SIMPLE_NUMBER_RE,
    relevance: 0
  };
  var STRING = hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null});
  var COMMENT = hljs.COMMENT(
    ';',
    '$',
    {
      relevance: 0
    }
  );
  var LITERAL = {
    className: 'literal',
    begin: /\b(true|false|nil)\b/
  };
  var COLLECTION = {
    begin: '[\\[\\{]', end: '[\\]\\}]'
  };
  var HINT = {
    className: 'comment',
    begin: '\\^' + SYMBOL_RE
  };
  var HINT_COL = hljs.COMMENT('\\^\\{', '\\}');
  var KEY = {
    className: 'symbol',
    begin: '[:]' + SYMBOL_RE
  };
  var LIST = {
    begin: '\\(', end: '\\)'
  };
  var BODY = {
    endsWithParent: true,
    relevance: 0
  };
  var NAME = {
    keywords: keywords,
    lexemes: SYMBOL_RE,
    className: 'name', begin: SYMBOL_RE,
    starts: BODY
  };
  var DEFAULT_CONTAINS = [LIST, STRING, HINT, HINT_COL, COMMENT, KEY, COLLECTION, NUMBER, LITERAL, SYMBOL];

  LIST.contains = [hljs.COMMENT('comment', ''), NAME, BODY];
  BODY.contains = DEFAULT_CONTAINS;
  COLLECTION.contains = DEFAULT_CONTAINS;

  return {
    aliases: ['clj'],
    illegal: /\S/,
    contains: [LIST, STRING, HINT, HINT_COL, COMMENT, KEY, COLLECTION, NUMBER, LITERAL]
  }
});

hljs.registerLanguage('clojure-repl', function(hljs) {
  return {
    contains: [
      {
        className: 'meta',
        begin: /^([\w.-]+|\s*#_)=>/,
        starts: {
          end: /$/,
          subLanguage: 'clojure'
        }
      }
    ]
  }
});

hljs.registerLanguage('cmake', function(hljs) {
  return {
    aliases: ['cmake.in'],
    case_insensitive: true,
    keywords: {
      keyword:
        'add_custom_command add_custom_target add_definitions add_dependencies ' +
        'add_executable add_library add_subdirectory add_test aux_source_directory ' +
        'break build_command cmake_minimum_required cmake_policy configure_file ' +
        'create_test_sourcelist define_property else elseif enable_language enable_testing ' +
        'endforeach endfunction endif endmacro endwhile execute_process export find_file ' +
        'find_library find_package find_path find_program fltk_wrap_ui foreach function ' +
        'get_cmake_property get_directory_property get_filename_component get_property ' +
        'get_source_file_property get_target_property get_test_property if include ' +
        'include_directories include_external_msproject include_regular_expression install ' +
        'link_directories load_cache load_command macro mark_as_advanced message option ' +
        'output_required_files project qt_wrap_cpp qt_wrap_ui remove_definitions return ' +
        'separate_arguments set set_directory_properties set_property ' +
        'set_source_files_properties set_target_properties set_tests_properties site_name ' +
        'source_group string target_link_libraries try_compile try_run unset variable_watch ' +
        'while build_name exec_program export_library_dependencies install_files ' +
        'install_programs install_targets link_libraries make_directory remove subdir_depends ' +
        'subdirs use_mangled_mesa utility_source variable_requires write_file ' +
        'qt5_use_modules qt5_use_package qt5_wrap_cpp on off true false and or ' +
        'equal less greater strless strgreater strequal matches'
    },
    contains: [
      {
        className: 'variable',
        begin: '\\${', end: '}'
      },
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE
    ]
  };
});

hljs.registerLanguage('coffeescript', function(hljs) {
  var KEYWORDS = {
    keyword:
      // JS keywords
      'in if for while finally new do return else break catch instanceof throw try this ' +
      'switch continue typeof delete debugger super ' +
      // Coffee keywords
      'then unless until loop of by when and or is isnt not',
    literal:
      // JS literals
      'true false null undefined ' +
      // Coffee literals
      'yes no on off',
    built_in:
      'npm require console print module global window document'
  };
  var JS_IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
  var SUBST = {
    className: 'subst',
    begin: /#\{/, end: /}/,
    keywords: KEYWORDS
  };
  var EXPRESSIONS = [
    hljs.BINARY_NUMBER_MODE,
    hljs.inherit(hljs.C_NUMBER_MODE, {starts: {end: '(\\s*/)?', relevance: 0}}), // a number tries to eat the following slash to prevent treating it as a regexp
    {
      className: 'string',
      variants: [
        {
          begin: /'''/, end: /'''/,
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /'/, end: /'/,
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /"""/, end: /"""/,
          contains: [hljs.BACKSLASH_ESCAPE, SUBST]
        },
        {
          begin: /"/, end: /"/,
          contains: [hljs.BACKSLASH_ESCAPE, SUBST]
        }
      ]
    },
    {
      className: 'regexp',
      variants: [
        {
          begin: '///', end: '///',
          contains: [SUBST, hljs.HASH_COMMENT_MODE]
        },
        {
          begin: '//[gim]*',
          relevance: 0
        },
        {
          // regex can't start with space to parse x / 2 / 3 as two divisions
          // regex can't start with *, and it supports an "illegal" in the main mode
          begin: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
        }
      ]
    },
    {
      begin: '@' + JS_IDENT_RE // relevance booster
    },
    {
      begin: '`', end: '`',
      excludeBegin: true, excludeEnd: true,
      subLanguage: 'javascript'
    }
  ];
  SUBST.contains = EXPRESSIONS;

  var TITLE = hljs.inherit(hljs.TITLE_MODE, {begin: JS_IDENT_RE});
  var PARAMS_RE = '(\\(.*\\))?\\s*\\B[-=]>';
  var PARAMS = {
    className: 'params',
    begin: '\\([^\\(]', returnBegin: true,
    /* We need another contained nameless mode to not have every nested
    pair of parens to be called "params" */
    contains: [{
      begin: /\(/, end: /\)/,
      keywords: KEYWORDS,
      contains: ['self'].concat(EXPRESSIONS)
    }]
  };

  return {
    aliases: ['coffee', 'cson', 'iced'],
    keywords: KEYWORDS,
    illegal: /\/\*/,
    contains: EXPRESSIONS.concat([
      hljs.COMMENT('###', '###'),
      hljs.HASH_COMMENT_MODE,
      {
        className: 'function',
        begin: '^\\s*' + JS_IDENT_RE + '\\s*=\\s*' + PARAMS_RE, end: '[-=]>',
        returnBegin: true,
        contains: [TITLE, PARAMS]
      },
      {
        // anonymous function start
        begin: /[:\(,=]\s*/,
        relevance: 0,
        contains: [
          {
            className: 'function',
            begin: PARAMS_RE, end: '[-=]>',
            returnBegin: true,
            contains: [PARAMS]
          }
        ]
      },
      {
        className: 'class',
        beginKeywords: 'class',
        end: '$',
        illegal: /[:="\[\]]/,
        contains: [
          {
            beginKeywords: 'extends',
            endsWithParent: true,
            illegal: /[:="\[\]]/,
            contains: [TITLE]
          },
          TITLE
        ]
      },
      {
        begin: JS_IDENT_RE + ':', end: ':',
        returnBegin: true, returnEnd: true,
        relevance: 0
      }
    ])
  };
});

hljs.registerLanguage('cos', function cos (hljs) {

  var STRINGS = {
    className: 'string',
    variants: [
      {
        begin: '"',
        end: '"',
        contains: [{ // escaped
          begin: "\"\"",
          relevance: 0
        }]
      }
    ]
  };

  var NUMBERS = {
    className: "number",
    begin: "\\b(\\d+(\\.\\d*)?|\\.\\d+)",
    relevance: 0
  };

  var COS_KEYWORDS = {
    keyword: [

      "property", "parameter", "class", "classmethod", "clientmethod", "extends",
      "as", "break", "catch", "close", "continue", "do", "d", "else",
      "elseif", "for", "goto", "halt", "hang", "h", "if", "job",
      "j", "kill", "k", "lock", "l", "merge", "new", "open", "quit",
      "q", "read", "r", "return", "set", "s", "tcommit", "throw",
      "trollback", "try", "tstart", "use", "view", "while", "write",
      "w", "xecute", "x", "zkill", "znspace", "zn", "ztrap", "zwrite",
      "zw", "zzdump", "zzwrite", "print", "zbreak", "zinsert", "zload",
      "zprint", "zremove", "zsave", "zzprint", "mv", "mvcall", "mvcrt",
      "mvdim", "mvprint", "zquit", "zsync", "ascii"

      // registered function - no need in them due to all functions are highlighted,
      // but I'll just leave this here.

      //"$bit", "$bitcount",
      //"$bitfind", "$bitlogic", "$case", "$char", "$classmethod", "$classname",
      //"$compile", "$data", "$decimal", "$double", "$extract", "$factor",
      //"$find", "$fnumber", "$get", "$increment", "$inumber", "$isobject",
      //"$isvaliddouble", "$isvalidnum", "$justify", "$length", "$list",
      //"$listbuild", "$listdata", "$listfind", "$listfromstring", "$listget",
      //"$listlength", "$listnext", "$listsame", "$listtostring", "$listvalid",
      //"$locate", "$match", "$method", "$name", "$nconvert", "$next",
      //"$normalize", "$now", "$number", "$order", "$parameter", "$piece",
      //"$prefetchoff", "$prefetchon", "$property", "$qlength", "$qsubscript",
      //"$query", "$random", "$replace", "$reverse", "$sconvert", "$select",
      //"$sortbegin", "$sortend", "$stack", "$text", "$translate", "$view",
      //"$wascii", "$wchar", "$wextract", "$wfind", "$wiswide", "$wlength",
      //"$wreverse", "$xecute", "$zabs", "$zarccos", "$zarcsin", "$zarctan",
      //"$zcos", "$zcot", "$zcsc", "$zdate", "$zdateh", "$zdatetime",
      //"$zdatetimeh", "$zexp", "$zhex", "$zln", "$zlog", "$zpower", "$zsec",
      //"$zsin", "$zsqr", "$ztan", "$ztime", "$ztimeh", "$zboolean",
      //"$zconvert", "$zcrc", "$zcyc", "$zdascii", "$zdchar", "$zf",
      //"$ziswide", "$zlascii", "$zlchar", "$zname", "$zposition", "$zqascii",
      //"$zqchar", "$zsearch", "$zseek", "$zstrip", "$zwascii", "$zwchar",
      //"$zwidth", "$zwpack", "$zwbpack", "$zwunpack", "$zwbunpack", "$zzenkaku",
      //"$change", "$mv", "$mvat", "$mvfmt", "$mvfmts", "$mviconv",
      //"$mviconvs", "$mvinmat", "$mvlover", "$mvoconv", "$mvoconvs", "$mvraise",
      //"$mvtrans", "$mvv", "$mvname", "$zbitand", "$zbitcount", "$zbitfind",
      //"$zbitget", "$zbitlen", "$zbitnot", "$zbitor", "$zbitset", "$zbitstr",
      //"$zbitxor", "$zincrement", "$znext", "$zorder", "$zprevious", "$zsort",
      //"device", "$ecode", "$estack", "$etrap", "$halt", "$horolog",
      //"$io", "$job", "$key", "$namespace", "$principal", "$quit", "$roles",
      //"$storage", "$system", "$test", "$this", "$tlevel", "$username",
      //"$x", "$y", "$za", "$zb", "$zchild", "$zeof", "$zeos", "$zerror",
      //"$zhorolog", "$zio", "$zjob", "$zmode", "$znspace", "$zparent", "$zpi",
      //"$zpos", "$zreference", "$zstorage", "$ztimestamp", "$ztimezone",
      //"$ztrap", "$zversion"

    ].join(" ")
  };

  return {
    case_insensitive: true,
    aliases: ["cos", "cls"],
    keywords: COS_KEYWORDS,
    contains: [
      NUMBERS,
      STRINGS,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: "comment",
        begin: /;/, end: "$",
        relevance: 0
      },
      { // Functions and user-defined functions: write $ztime(60*60*3), $$myFunc(10), $$^Val(1)
        className: "built_in",
        begin: /(?:\$\$?|\.\.)\^?[a-zA-Z]+/
      },
      { // Macro command: quit $$$OK
        className: "built_in",
        begin: /\$\$\$[a-zA-Z]+/
      },
      { // Special (global) variables: write %request.Content; Built-in classes: %Library.Integer
        className: "built_in",
        begin: /%[a-z]+(?:\.[a-z]+)*/
      },
      { // Global variable: set ^globalName = 12 write ^globalName
        className: "symbol",
        begin: /\^%?[a-zA-Z][\w]*/
      },
      { // Some control constructions: do ##class(Package.ClassName).Method(), ##super()
        className: "keyword",
        begin: /##class|##super|#define|#dim/
      },

      // sub-languages: are not fully supported by hljs by 11/15/2015
      // left for the future implementation.
      {
        begin: /&sql\(/,    end: /\)/,
        excludeBegin: true, excludeEnd: true,
        subLanguage: "sql"
      },
      {
        begin: /&(js|jscript|javascript)</, end: />/,
        excludeBegin: true, excludeEnd: true,
        subLanguage: "javascript"
      },
      {
        // this brakes first and last tag, but this is the only way to embed a valid html
        begin: /&html<\s*</, end: />\s*>/,
        subLanguage: "xml"
      }
    ]
  };
});

hljs.registerLanguage('cpp', function(hljs) {
  var CPP_PRIMATIVE_TYPES = {
    className: 'keyword',
    begin: '\\b[a-z\\d_]*_t\\b'
  };

  var STRINGS = {
    className: 'string',
    variants: [
      hljs.inherit(hljs.QUOTE_STRING_MODE, { begin: '((u8?|U)|L)?"' }),
      {
        begin: '(u8?|U)?R"', end: '"',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        begin: '\'\\\\?.', end: '\'',
        illegal: '.'
      }
    ]
  };

  var NUMBERS = {
    className: 'number',
    variants: [
      { begin: '\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)' },
      { begin: hljs.C_NUMBER_RE }
    ],
    relevance: 0
  };

  var PREPROCESSOR =       {
    className: 'meta',
    begin: '#', end: '$',
    keywords: {'meta-keyword': 'if else elif endif define undef warning error line ' +
                  'pragma ifdef ifndef'},
    contains: [
      {
        begin: /\\\n/, relevance: 0
      },
      {
        beginKeywords: 'include', end: '$',
        keywords: {'meta-keyword': 'include'},
        contains: [
          hljs.inherit(STRINGS, {className: 'meta-string'}),
          {
            className: 'meta-string',
            begin: '<', end: '>',
            illegal: '\\n',
          }
        ]
      },
      STRINGS,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  var FUNCTION_TITLE = hljs.IDENT_RE + '\\s*\\(';

  var CPP_KEYWORDS = {
    keyword: 'int float while private char catch export virtual operator sizeof ' +
      'dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace ' +
      'unsigned long volatile static protected bool template mutable if public friend ' +
      'do goto auto void enum else break extern using class asm case typeid ' +
      'short reinterpret_cast|10 default double register explicit signed typename try this ' +
      'switch continue inline delete alignof constexpr decltype ' +
      'noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary ' +
      'atomic_bool atomic_char atomic_schar ' +
      'atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong ' +
      'atomic_ullong',
    built_in: 'std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream ' +
      'auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set ' +
      'unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos ' +
      'asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp ' +
      'fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper ' +
      'isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow ' +
      'printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp ' +
      'strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan ' +
      'vfprintf vprintf vsprintf endl initializer_list unique_ptr',
    literal: 'true false nullptr NULL'
  };

  return {
    aliases: ['c', 'cc', 'h', 'c++', 'h++', 'hpp'],
    keywords: CPP_KEYWORDS,
    illegal: '</',
    contains: [
      CPP_PRIMATIVE_TYPES,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      NUMBERS,
      STRINGS,
      PREPROCESSOR,
      {
        begin: '\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<', end: '>',
        keywords: CPP_KEYWORDS,
        contains: ['self', CPP_PRIMATIVE_TYPES]
      },
      {
        begin: hljs.IDENT_RE + '::',
        keywords: CPP_KEYWORDS
      },
      {
        // Expression keywords prevent 'keyword Name(...) or else if(...)' from
        // being recognized as a function definition
        beginKeywords: 'new throw return else',
        relevance: 0
      },
      {
        className: 'function',
        begin: '(' + hljs.IDENT_RE + '[\\*&\\s]+)+' + FUNCTION_TITLE,
        returnBegin: true, end: /[{;=]/,
        excludeEnd: true,
        keywords: CPP_KEYWORDS,
        illegal: /[^\w\s\*&]/,
        contains: [
          {
            begin: FUNCTION_TITLE, returnBegin: true,
            contains: [hljs.TITLE_MODE],
            relevance: 0
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            keywords: CPP_KEYWORDS,
            relevance: 0,
            contains: [
              hljs.C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE,
              STRINGS,
              NUMBERS
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          PREPROCESSOR
        ]
      }
    ]
  };
});

hljs.registerLanguage('crmsh', function(hljs) {
  var RESOURCES = 'primitive rsc_template';

  var COMMANDS = 'group clone ms master location colocation order fencing_topology ' +
      'rsc_ticket acl_target acl_group user role ' +
      'tag xml';

  var PROPERTY_SETS = 'property rsc_defaults op_defaults';

  var KEYWORDS = 'params meta operations op rule attributes utilization';

  var OPERATORS = 'read write deny defined not_defined in_range date spec in ' +
      'ref reference attribute type xpath version and or lt gt tag ' +
      'lte gte eq ne \\';

  var TYPES = 'number string';

  var LITERALS = 'Master Started Slave Stopped start promote demote stop monitor true false';

  return {
    aliases: ['crm', 'pcmk'],
    case_insensitive: true,
    keywords: {
      keyword: KEYWORDS + ' ' + OPERATORS + ' ' + TYPES,
      literal: LITERALS
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        beginKeywords: 'node',
        starts: {
          end: '\\s*([\\w_-]+:)?',
          starts: {
            className: 'title',
            end: '\\s*[\\$\\w_][\\w_-]*'
          }
        }
      },
      {
        beginKeywords: RESOURCES,
        starts: {
          className: 'title',
          end: '\\s*[\\$\\w_][\\w_-]*',
          starts: {
            end: '\\s*@?[\\w_][\\w_\\.:-]*'
          }
        }
      },
      {
        begin: '\\b(' + COMMANDS.split(' ').join('|') + ')\\s+',
        keywords: COMMANDS,
        starts: {
          className: 'title',
          end: '[\\$\\w_][\\w_-]*'
        }
      },
      {
        beginKeywords: PROPERTY_SETS,
        starts: {
          className: 'title',
          end: '\\s*([\\w_-]+:)?'
        }
      },
      hljs.QUOTE_STRING_MODE,
      {
        className: 'meta',
        begin: '(ocf|systemd|service|lsb):[\\w_:-]+',
        relevance: 0
      },
      {
        className: 'number',
        begin: '\\b\\d+(\\.\\d+)?(ms|s|h|m)?',
        relevance: 0
      },
      {
        className: 'literal',
        begin: '[-]?(infinity|inf)',
        relevance: 0
      },
      {
        className: 'attr',
        begin: /([A-Za-z\$_\#][\w_-]+)=/,
        relevance: 0
      },
      {
        className: 'tag',
        begin: '</?',
        end: '/?>',
        relevance: 0
      }
    ]
  };
});

hljs.registerLanguage('crystal', function(hljs) {
  var NUM_SUFFIX = '(_[uif](8|16|32|64))?';
  var CRYSTAL_IDENT_RE = '[a-zA-Z_]\\w*[!?=]?';
  var RE_STARTER = '!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|' +
    '>>|>|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';
  var CRYSTAL_METHOD_RE = '[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\][=?]?';
  var CRYSTAL_KEYWORDS = {
    keyword:
      'abstract alias as asm begin break case class def do else elsif end ensure enum extend for fun if ifdef ' +
      'include instance_sizeof is_a? lib macro module next of out pointerof private protected rescue responds_to? ' +
      'return require self sizeof struct super then type typeof union unless until when while with yield ' +
      '__DIR__ __FILE__ __LINE__',
    literal: 'false nil true'
  };
  var SUBST = {
    className: 'subst',
    begin: '#{', end: '}',
    keywords: CRYSTAL_KEYWORDS
  };
  var EXPANSION = {
    className: 'template-variable',
    variants: [
      {begin: '\\{\\{', end: '\\}\\}'},
      {begin: '\\{%', end: '%\\}'}
    ],
    keywords: CRYSTAL_KEYWORDS,
    relevance: 10
  };

  function recursiveParen(begin, end) {
    var
    contains = [{begin: begin, end: end}];
    contains[0].contains = contains;
    return contains;
  }
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST],
    variants: [
      {begin: /'/, end: /'/},
      {begin: /"/, end: /"/},
      {begin: /`/, end: /`/},
      {begin: '%w?\\(', end: '\\)', contains: recursiveParen('\\(', '\\)')},
      {begin: '%w?\\[', end: '\\]', contains: recursiveParen('\\[', '\\]')},
      {begin: '%w?{', end: '}', contains: recursiveParen('{', '}')},
      {begin: '%w?<', end: '>', contains: recursiveParen('<', '>')},
      {begin: '%w?/', end: '/'},
      {begin: '%w?%', end: '%'},
      {begin: '%w?-', end: '-'},
      {begin: '%w?\\|', end: '\\|'},
    ],
    relevance: 0,
  };
  var REGEXP = {
    begin: '(' + RE_STARTER + ')\\s*',
    contains: [
      {
        className: 'regexp',
        contains: [hljs.BACKSLASH_ESCAPE, SUBST],
        variants: [
          {begin: '/', end: '/[a-z]*'},
          {begin: '%r\\(', end: '\\)', contains: recursiveParen('\\(', '\\)')},
          {begin: '%r\\[', end: '\\]', contains: recursiveParen('\\[', '\\]')},
          {begin: '%r{', end: '}', contains: recursiveParen('{', '}')},
          {begin: '%r<', end: '>', contains: recursiveParen('<', '>')},
          {begin: '%r/', end: '/'},
          {begin: '%r%', end: '%'},
          {begin: '%r-', end: '-'},
          {begin: '%r\\|', end: '\\|'},
        ]
      }
    ],
    relevance: 0
  };
  var REGEXP2 = {
    className: 'regexp',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST],
    variants: [
      {begin: '%r\\(', end: '\\)', contains: recursiveParen('\\(', '\\)')},
      {begin: '%r\\[', end: '\\]', contains: recursiveParen('\\[', '\\]')},
      {begin: '%r{', end: '}', contains: recursiveParen('{', '}')},
      {begin: '%r<', end: '>', contains: recursiveParen('<', '>')},
      {begin: '%r/', end: '/'},
      {begin: '%r%', end: '%'},
      {begin: '%r-', end: '-'},
      {begin: '%r\\|', end: '\\|'},
    ],
    relevance: 0
  };
  var ATTRIBUTE = {
    className: 'meta',
    begin: '@\\[', end: '\\]',
    relevance: 5
  };
  var CRYSTAL_DEFAULT_CONTAINS = [
    EXPANSION,
    STRING,
    REGEXP,
    REGEXP2,
    ATTRIBUTE,
    hljs.HASH_COMMENT_MODE,
    {
      className: 'class',
      beginKeywords: 'class module struct', end: '$|;',
      illegal: /=/,
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.inherit(hljs.TITLE_MODE, {begin: '[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?'}),
        {begin: '<'} // relevance booster for inheritance
      ]
    },
    {
      className: 'class',
      beginKeywords: 'lib enum union', end: '$|;',
      illegal: /=/,
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.inherit(hljs.TITLE_MODE, {begin: '[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?'}),
      ],
      relevance: 10
    },
    {
      className: 'function',
      beginKeywords: 'def', end: /\B\b/,
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {
          begin: CRYSTAL_METHOD_RE,
          endsParent: true
        })
      ]
    },
    {
      className: 'function',
      beginKeywords: 'fun macro', end: /\B\b/,
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {
          begin: CRYSTAL_METHOD_RE,
          endsParent: true
        })
      ],
      relevance: 5
    },
    {
      className: 'symbol',
      begin: hljs.UNDERSCORE_IDENT_RE + '(\\!|\\?)?:',
      relevance: 0
    },
    {
      className: 'symbol',
      begin: ':',
      contains: [STRING, {begin: CRYSTAL_METHOD_RE}],
      relevance: 0
    },
    {
      className: 'number',
      variants: [
        { begin: '\\b0b([01_]*[01])' + NUM_SUFFIX },
        { begin: '\\b0o([0-7_]*[0-7])' + NUM_SUFFIX },
        { begin: '\\b0x([A-Fa-f0-9_]*[A-Fa-f0-9])' + NUM_SUFFIX },
        { begin: '\\b(([0-9][0-9_]*[0-9]|[0-9])(\\.[0-9_]*[0-9])?([eE][+-]?[0-9_]*[0-9])?)' + NUM_SUFFIX}
      ],
      relevance: 0
    }
  ];
  SUBST.contains = CRYSTAL_DEFAULT_CONTAINS;
  ATTRIBUTE.contains = CRYSTAL_DEFAULT_CONTAINS;
  EXPANSION.contains = CRYSTAL_DEFAULT_CONTAINS.slice(1); // without EXPANSION

  return {
    aliases: ['cr'],
    lexemes: CRYSTAL_IDENT_RE,
    keywords: CRYSTAL_KEYWORDS,
    contains: CRYSTAL_DEFAULT_CONTAINS
  };
});

hljs.registerLanguage('cs', function(hljs) {
  var KEYWORDS =
    // Normal keywords.
    'abstract as base bool break byte case catch char checked const continue decimal dynamic ' +
    'default delegate do double else enum event explicit extern false finally fixed float ' +
    'for foreach goto if implicit in int interface internal is lock long null when ' +
    'object operator out override params private protected public readonly ref sbyte ' +
    'sealed short sizeof stackalloc static string struct switch this true try typeof ' +
    'uint ulong unchecked unsafe ushort using virtual volatile void while async ' +
    'protected public private internal ' +
    // Contextual keywords.
    'ascending descending from get group into join let orderby partial select set value var ' +
    'where yield';
  var GENERIC_IDENT_RE = hljs.IDENT_RE + '(<' + hljs.IDENT_RE + '>)?';
  return {
    aliases: ['csharp'],
    keywords: KEYWORDS,
    illegal: /::/,
    contains: [
      hljs.COMMENT(
        '///',
        '$',
        {
          returnBegin: true,
          contains: [
            {
              className: 'doctag',
              variants: [
                {
                  begin: '///', relevance: 0
                },
                {
                  begin: '<!--|-->'
                },
                {
                  begin: '</?', end: '>'
                }
              ]
            }
          ]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'meta',
        begin: '#', end: '$',
        keywords: {'meta-keyword': 'if else elif endif define undef warning error line region endregion pragma checksum'}
      },
      {
        className: 'string',
        begin: '@"', end: '"',
        contains: [{begin: '""'}]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        beginKeywords: 'class interface', end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          hljs.TITLE_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: 'namespace', end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {begin: '[a-zA-Z](\\.?\\w)*'}),
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: 'new return throw await',
        relevance: 0
      },
      {
        className: 'function',
        begin: '(' + GENERIC_IDENT_RE + '\\s+)+' + hljs.IDENT_RE + '\\s*\\(', returnBegin: true, end: /[{;=]/,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          {
            begin: hljs.IDENT_RE + '\\s*\\(', returnBegin: true,
            contains: [hljs.TITLE_MODE],
            relevance: 0
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.C_NUMBER_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      }
    ]
  };
});

hljs.registerLanguage('css', function(hljs) {
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  var RULE = {
    begin: /[A-Z\_\.\-]+\s*:/, returnBegin: true, end: ';', endsWithParent: true,
    contains: [
      {
        className: 'attribute',
        begin: /\S/, end: ':', excludeEnd: true,
        starts: {
          endsWithParent: true, excludeEnd: true,
          contains: [
            {
              begin: /[\w-]+\s*\(/, returnBegin: true,
              contains: [
                {
                  className: 'built_in',
                  begin: /[\w-]+/
                }
              ]
            },
            hljs.CSS_NUMBER_MODE,
            hljs.QUOTE_STRING_MODE,
            hljs.APOS_STRING_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            {
              className: 'number', begin: '#[0-9A-Fa-f]+'
            },
            {
              className: 'meta', begin: '!important'
            }
          ]
        }
      }
    ]
  };

  return {
    case_insensitive: true,
    illegal: /[=\/|'\$]/,
    contains: [
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'selector-id', begin: /#[A-Za-z0-9_-]+/
      },
      {
        className: 'selector-class', begin: /\.[A-Za-z0-9_-]+/
      },
      {
        className: 'selector-attr',
        begin: /\[/, end: /\]/,
        illegal: '$'
      },
      {
        className: 'selector-pseudo',
        begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/
      },
      {
        begin: '@(font-face|page)',
        lexemes: '[a-z-]+',
        keywords: 'font-face page'
      },
      {
        begin: '@', end: '[{;]', // at_rule eating first "{" is a good thing
                                 // because it doesn’t let it to be parsed as
                                 // a rule set but instead drops parser into
                                 // the default mode which is how it should be.
        contains: [
          {
            className: 'keyword',
            begin: /\S+/
          },
          {
            begin: /\s/, endsWithParent: true, excludeEnd: true,
            relevance: 0,
            contains: [
              hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE,
              hljs.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: 'selector-tag', begin: IDENT_RE,
        relevance: 0
      },
      {
        begin: '{', end: '}',
        illegal: /\S/,
        contains: [
          hljs.C_BLOCK_COMMENT_MODE,
          RULE,
        ]
      }
    ]
  };
});

hljs.registerLanguage('d', /**
 * Known issues:
 *
 * - invalid hex string literals will be recognized as a double quoted strings
 *   but 'x' at the beginning of string will not be matched
 *
 * - delimited string literals are not checked for matching end delimiter
 *   (not possible to do with js regexp)
 *
 * - content of token string is colored as a string (i.e. no keyword coloring inside a token string)
 *   also, content of token string is not validated to contain only valid D tokens
 *
 * - special token sequence rule is not strictly following D grammar (anything following #line
 *   up to the end of line is matched as special token sequence)
 */

function(hljs) {
  /**
   * Language keywords
   *
   * @type {Object}
   */
  var D_KEYWORDS = {
    keyword:
      'abstract alias align asm assert auto body break byte case cast catch class ' +
      'const continue debug default delete deprecated do else enum export extern final ' +
      'finally for foreach foreach_reverse|10 goto if immutable import in inout int ' +
      'interface invariant is lazy macro mixin module new nothrow out override package ' +
      'pragma private protected public pure ref return scope shared static struct ' +
      'super switch synchronized template this throw try typedef typeid typeof union ' +
      'unittest version void volatile while with __FILE__ __LINE__ __gshared|10 ' +
      '__thread __traits __DATE__ __EOF__ __TIME__ __TIMESTAMP__ __VENDOR__ __VERSION__',
    built_in:
      'bool cdouble cent cfloat char creal dchar delegate double dstring float function ' +
      'idouble ifloat ireal long real short string ubyte ucent uint ulong ushort wchar ' +
      'wstring',
    literal:
      'false null true'
  };

  /**
   * Number literal regexps
   *
   * @type {String}
   */
  var decimal_integer_re = '(0|[1-9][\\d_]*)',
    decimal_integer_nosus_re = '(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)',
    binary_integer_re = '0[bB][01_]+',
    hexadecimal_digits_re = '([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)',
    hexadecimal_integer_re = '0[xX]' + hexadecimal_digits_re,

    decimal_exponent_re = '([eE][+-]?' + decimal_integer_nosus_re + ')',
    decimal_float_re = '(' + decimal_integer_nosus_re + '(\\.\\d*|' + decimal_exponent_re + ')|' +
                '\\d+\\.' + decimal_integer_nosus_re + decimal_integer_nosus_re + '|' +
                '\\.' + decimal_integer_re + decimal_exponent_re + '?' +
              ')',
    hexadecimal_float_re = '(0[xX](' +
                  hexadecimal_digits_re + '\\.' + hexadecimal_digits_re + '|'+
                  '\\.?' + hexadecimal_digits_re +
                 ')[pP][+-]?' + decimal_integer_nosus_re + ')',

    integer_re = '(' +
      decimal_integer_re + '|' +
      binary_integer_re  + '|' +
       hexadecimal_integer_re   +
    ')',

    float_re = '(' +
      hexadecimal_float_re + '|' +
      decimal_float_re  +
    ')';

  /**
   * Escape sequence supported in D string and character literals
   *
   * @type {String}
   */
  var escape_sequence_re = '\\\\(' +
              '[\'"\\?\\\\abfnrtv]|' +  // common escapes
              'u[\\dA-Fa-f]{4}|' +     // four hex digit unicode codepoint
              '[0-7]{1,3}|' +       // one to three octal digit ascii char code
              'x[\\dA-Fa-f]{2}|' +    // two hex digit ascii char code
              'U[\\dA-Fa-f]{8}' +      // eight hex digit unicode codepoint
              ')|' +
              '&[a-zA-Z\\d]{2,};';      // named character entity

  /**
   * D integer number literals
   *
   * @type {Object}
   */
  var D_INTEGER_MODE = {
    className: 'number',
      begin: '\\b' + integer_re + '(L|u|U|Lu|LU|uL|UL)?',
      relevance: 0
  };

  /**
   * [D_FLOAT_MODE description]
   * @type {Object}
   */
  var D_FLOAT_MODE = {
    className: 'number',
    begin: '\\b(' +
        float_re + '([fF]|L|i|[fF]i|Li)?|' +
        integer_re + '(i|[fF]i|Li)' +
      ')',
    relevance: 0
  };

  /**
   * D character literal
   *
   * @type {Object}
   */
  var D_CHARACTER_MODE = {
    className: 'string',
    begin: '\'(' + escape_sequence_re + '|.)', end: '\'',
    illegal: '.'
  };

  /**
   * D string escape sequence
   *
   * @type {Object}
   */
  var D_ESCAPE_SEQUENCE = {
    begin: escape_sequence_re,
    relevance: 0
  };

  /**
   * D double quoted string literal
   *
   * @type {Object}
   */
  var D_STRING_MODE = {
    className: 'string',
    begin: '"',
    contains: [D_ESCAPE_SEQUENCE],
    end: '"[cwd]?'
  };

  /**
   * D wysiwyg and delimited string literals
   *
   * @type {Object}
   */
  var D_WYSIWYG_DELIMITED_STRING_MODE = {
    className: 'string',
    begin: '[rq]"',
    end: '"[cwd]?',
    relevance: 5
  };

  /**
   * D alternate wysiwyg string literal
   *
   * @type {Object}
   */
  var D_ALTERNATE_WYSIWYG_STRING_MODE = {
    className: 'string',
    begin: '`',
    end: '`[cwd]?'
  };

  /**
   * D hexadecimal string literal
   *
   * @type {Object}
   */
  var D_HEX_STRING_MODE = {
    className: 'string',
    begin: 'x"[\\da-fA-F\\s\\n\\r]*"[cwd]?',
    relevance: 10
  };

  /**
   * D delimited string literal
   *
   * @type {Object}
   */
  var D_TOKEN_STRING_MODE = {
    className: 'string',
    begin: 'q"\\{',
    end: '\\}"'
  };

  /**
   * Hashbang support
   *
   * @type {Object}
   */
  var D_HASHBANG_MODE = {
    className: 'meta',
    begin: '^#!',
    end: '$',
    relevance: 5
  };

  /**
   * D special token sequence
   *
   * @type {Object}
   */
  var D_SPECIAL_TOKEN_SEQUENCE_MODE = {
    className: 'meta',
    begin: '#(line)',
    end: '$',
    relevance: 5
  };

  /**
   * D attributes
   *
   * @type {Object}
   */
  var D_ATTRIBUTE_MODE = {
    className: 'keyword',
    begin: '@[a-zA-Z_][a-zA-Z_\\d]*'
  };

  /**
   * D nesting comment
   *
   * @type {Object}
   */
  var D_NESTING_COMMENT_MODE = hljs.COMMENT(
    '\\/\\+',
    '\\+\\/',
    {
      contains: ['self'],
      relevance: 10
    }
  );

  return {
    lexemes: hljs.UNDERSCORE_IDENT_RE,
    keywords: D_KEYWORDS,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        D_NESTING_COMMENT_MODE,
        D_HEX_STRING_MODE,
        D_STRING_MODE,
        D_WYSIWYG_DELIMITED_STRING_MODE,
        D_ALTERNATE_WYSIWYG_STRING_MODE,
        D_TOKEN_STRING_MODE,
        D_FLOAT_MODE,
        D_INTEGER_MODE,
        D_CHARACTER_MODE,
        D_HASHBANG_MODE,
        D_SPECIAL_TOKEN_SEQUENCE_MODE,
        D_ATTRIBUTE_MODE
    ]
  };
});

hljs.registerLanguage('markdown', function(hljs) {
  return {
    aliases: ['md', 'mkdown', 'mkd'],
    contains: [
      // highlight headers
      {
        className: 'section',
        variants: [
          { begin: '^#{1,6}', end: '$' },
          { begin: '^.+?\\n[=-]{2,}$' }
        ]
      },
      // inline html
      {
        begin: '<', end: '>',
        subLanguage: 'xml',
        relevance: 0
      },
      // lists (indicators only)
      {
        className: 'bullet',
        begin: '^([*+-]|(\\d+\\.))\\s+'
      },
      // strong segments
      {
        className: 'strong',
        begin: '[*_]{2}.+?[*_]{2}'
      },
      // emphasis segments
      {
        className: 'emphasis',
        variants: [
          { begin: '\\*.+?\\*' },
          { begin: '_.+?_'
          , relevance: 0
          }
        ]
      },
      // blockquotes
      {
        className: 'quote',
        begin: '^>\\s+', end: '$'
      },
      // code snippets
      {
        className: 'code',
        variants: [
          { begin: '`.+?`' },
          { begin: '^( {4}|\t)', end: '$'
          , relevance: 0
          }
        ]
      },
      // horizontal rules
      {
        begin: '^[-\\*]{3,}', end: '$'
      },
      // using links - title and link
      {
        begin: '\\[.+?\\][\\(\\[].*?[\\)\\]]',
        returnBegin: true,
        contains: [
          {
            className: 'string',
            begin: '\\[', end: '\\]',
            excludeBegin: true,
            returnEnd: true,
            relevance: 0
          },
          {
            className: 'link',
            begin: '\\]\\(', end: '\\)',
            excludeBegin: true, excludeEnd: true
          },
          {
            className: 'symbol',
            begin: '\\]\\[', end: '\\]',
            excludeBegin: true, excludeEnd: true
          }
        ],
        relevance: 10
      },
      {
        begin: '^\\[\.+\\]:',
        returnBegin: true,
        contains: [
          {
            className: 'symbol',
            begin: '\\[', end: '\\]:',
            excludeBegin: true, excludeEnd: true,
            starts: {
              className: 'link',
              end: '$'
            }
          }
        ]
      }
    ]
  };
});

hljs.registerLanguage('dart', function (hljs) {
  var SUBST = {
    className: 'subst',
    begin: '\\$\\{', end: '}',
    keywords: 'true false null this is new super'
  };

  var STRING = {
    className: 'string',
    variants: [
      {
        begin: 'r\'\'\'', end: '\'\'\''
      },
      {
        begin: 'r"""', end: '"""'
      },
      {
        begin: 'r\'', end: '\'',
        illegal: '\\n'
      },
      {
        begin: 'r"', end: '"',
        illegal: '\\n'
      },
      {
        begin: '\'\'\'', end: '\'\'\'',
        contains: [hljs.BACKSLASH_ESCAPE, SUBST]
      },
      {
        begin: '"""', end: '"""',
        contains: [hljs.BACKSLASH_ESCAPE, SUBST]
      },
      {
        begin: '\'', end: '\'',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE, SUBST]
      },
      {
        begin: '"', end: '"',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE, SUBST]
      }
    ]
  };
  SUBST.contains = [
    hljs.C_NUMBER_MODE, STRING
  ];

  var KEYWORDS = {
    keyword: 'assert break case catch class const continue default do else enum extends false final finally for if ' +
      'in is new null rethrow return super switch this throw true try var void while with ' +
      'abstract as dynamic export external factory get implements import library operator part set static typedef',
    built_in:
      // dart:core
      'print Comparable DateTime Duration Function Iterable Iterator List Map Match Null Object Pattern RegExp Set ' +
      'Stopwatch String StringBuffer StringSink Symbol Type Uri bool double int num ' +
      // dart:html
      'document window querySelector querySelectorAll Element ElementList'
  };

  return {
    keywords: KEYWORDS,
    contains: [
      STRING,
      hljs.COMMENT(
        '/\\*\\*',
        '\\*/',
        {
          subLanguage: 'markdown'
        }
      ),
      hljs.COMMENT(
        '///',
        '$',
        {
          subLanguage: 'markdown'
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'class',
        beginKeywords: 'class interface', end: '{', excludeEnd: true,
        contains: [
          {
            beginKeywords: 'extends implements'
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      hljs.C_NUMBER_MODE,
      {
        className: 'meta', begin: '@[A-Za-z]+'
      },
      {
        begin: '=>' // No markup, just a relevance booster
      }
    ]
  }
});

hljs.registerLanguage('delphi', function(hljs) {
  var KEYWORDS =
    'exports register file shl array record property for mod while set ally label uses raise not ' +
    'stored class safecall var interface or private static exit index inherited to else stdcall ' +
    'override shr asm far resourcestring finalization packed virtual out and protected library do ' +
    'xorwrite goto near function end div overload object unit begin string on inline repeat until ' +
    'destructor write message program with read initialization except default nil if case cdecl in ' +
    'downto threadvar of try pascal const external constructor type public then implementation ' +
    'finally published procedure';
  var COMMENT_MODES = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.COMMENT(
      /\{/,
      /\}/,
      {
        relevance: 0
      }
    ),
    hljs.COMMENT(
      /\(\*/,
      /\*\)/,
      {
        relevance: 10
      }
    )
  ];
  var STRING = {
    className: 'string',
    begin: /'/, end: /'/,
    contains: [{begin: /''/}]
  };
  var CHAR_STRING = {
    className: 'string', begin: /(#\d+)+/
  };
  var CLASS = {
    begin: hljs.IDENT_RE + '\\s*=\\s*class\\s*\\(', returnBegin: true,
    contains: [
      hljs.TITLE_MODE
    ]
  };
  var FUNCTION = {
    className: 'function',
    beginKeywords: 'function constructor destructor procedure', end: /[:;]/,
    keywords: 'function constructor|10 destructor|10 procedure|10',
    contains: [
      hljs.TITLE_MODE,
      {
        className: 'params',
        begin: /\(/, end: /\)/,
        keywords: KEYWORDS,
        contains: [STRING, CHAR_STRING]
      }
    ].concat(COMMENT_MODES)
  };
  return {
    case_insensitive: true,
    keywords: KEYWORDS,
    illegal: /"|\$[G-Zg-z]|\/\*|<\/|\|/,
    contains: [
      STRING, CHAR_STRING,
      hljs.NUMBER_MODE,
      CLASS,
      FUNCTION
    ].concat(COMMENT_MODES)
  };
});

hljs.registerLanguage('diff', function(hljs) {
  return {
    aliases: ['patch'],
    contains: [
      {
        className: 'meta',
        relevance: 10,
        variants: [
          {begin: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/},
          {begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/},
          {begin: /^\-\-\- +\d+,\d+ +\-\-\-\-$/}
        ]
      },
      {
        className: 'comment',
        variants: [
          {begin: /Index: /, end: /$/},
          {begin: /=====/, end: /=====$/},
          {begin: /^\-\-\-/, end: /$/},
          {begin: /^\*{3} /, end: /$/},
          {begin: /^\+\+\+/, end: /$/},
          {begin: /\*{5}/, end: /\*{5}$/}
        ]
      },
      {
        className: 'addition',
        begin: '^\\+', end: '$'
      },
      {
        className: 'deletion',
        begin: '^\\-', end: '$'
      },
      {
        className: 'addition',
        begin: '^\\!', end: '$'
      }
    ]
  };
});

hljs.registerLanguage('django', function(hljs) {
  var FILTER = {
    begin: /\|[A-Za-z]+:?/,
    keywords: {
      name:
        'truncatewords removetags linebreaksbr yesno get_digit timesince random striptags ' +
        'filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands ' +
        'title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode ' +
        'timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort ' +
        'dictsortreversed default_if_none pluralize lower join center default ' +
        'truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first ' +
        'escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize ' +
        'localtime utc timezone'
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE
    ]
  };

  return {
    aliases: ['jinja'],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT(/\{%\s*comment\s*%}/, /\{%\s*endcomment\s*%}/),
      hljs.COMMENT(/\{#/, /#}/),
      {
        className: 'template-tag',
        begin: /\{%/, end: /%}/,
        contains: [
          {
            className: 'name',
            begin: /\w+/,
            keywords: {
              name:
                'comment endcomment load templatetag ifchanged endifchanged if endif firstof for ' +
                'endfor ifnotequal endifnotequal widthratio extends include spaceless ' +
                'endspaceless regroup ifequal endifequal ssi now with cycle url filter ' +
                'endfilter debug block endblock else autoescape endautoescape csrf_token empty elif ' +
                'endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix ' +
                'plural get_current_language language get_available_languages ' +
                'get_current_language_bidi get_language_info get_language_info_list localize ' +
                'endlocalize localtime endlocaltime timezone endtimezone get_current_timezone ' +
                'verbatim'
            },
            starts: {
              endsWithParent: true,
              keywords: 'in by as',
              contains: [FILTER],
              relevance: 0
            }
          }
        ]
      },
      {
        className: 'template-variable',
        begin: /\{\{/, end: /}}/,
        contains: [FILTER]
      }
    ]
  };
});

hljs.registerLanguage('dns', function(hljs) {
  return {
    aliases: ['bind', 'zone'],
    keywords: {
      keyword:
        'IN A AAAA AFSDB APL CAA CDNSKEY CDS CERT CNAME DHCID DLV DNAME DNSKEY DS HIP IPSECKEY KEY KX ' +
        'LOC MX NAPTR NS NSEC NSEC3 NSEC3PARAM PTR RRSIG RP SIG SOA SRV SSHFP TA TKEY TLSA TSIG TXT'
    },
    contains: [
      hljs.COMMENT(';', '$'),
      {
        className: 'meta',
        begin: /^\$(TTL|GENERATE|INCLUDE|ORIGIN)\b/
      },
      // IPv6
      {
        className: 'number',
        begin: '((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))\\b'
      },
      // IPv4
      {
        className: 'number',
        begin: '((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\b'
      },
      hljs.inherit(hljs.NUMBER_MODE, {begin: /\b\d+[dhwm]?/})
    ]
  };
});

hljs.registerLanguage('dockerfile', function(hljs) {
  return {
    aliases: ['docker'],
    case_insensitive: true,
    keywords: 'from maintainer cmd expose add copy entrypoint volume user workdir onbuild run env label',
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        keywords: 'run cmd entrypoint volume add copy workdir onbuild label',
        begin: /^ *(onbuild +)?(run|cmd|entrypoint|volume|add|copy|workdir|label) +/,
        starts: {
          end: /[^\\]\n/,
          subLanguage: 'bash'
        }
      },
      {
        keywords: 'from maintainer expose env user onbuild',
        begin: /^ *(onbuild +)?(from|maintainer|expose|env|user|onbuild) +/, end: /[^\\]\n/,
        contains: [
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.NUMBER_MODE,
          hljs.HASH_COMMENT_MODE
        ]
      }
    ]
  }
});

hljs.registerLanguage('dos', function(hljs) {
  var COMMENT = hljs.COMMENT(
    /@?rem\b/, /$/,
    {
      relevance: 10
    }
  );
  var LABEL = {
    className: 'symbol',
    begin: '^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)',
    relevance: 0
  };
  return {
    aliases: ['bat', 'cmd'],
    case_insensitive: true,
    illegal: /\/\*/,
    keywords: {
      keyword:
        'if else goto for in do call exit not exist errorlevel defined ' +
        'equ neq lss leq gtr geq',
      built_in:
        'prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux ' +
        'shift cd dir echo setlocal endlocal set pause copy ' +
        'append assoc at attrib break cacls cd chcp chdir chkdsk chkntfs cls cmd color ' +
        'comp compact convert date dir diskcomp diskcopy doskey erase fs ' +
        'find findstr format ftype graftabl help keyb label md mkdir mode more move path ' +
        'pause print popd pushd promt rd recover rem rename replace restore rmdir shift' +
        'sort start subst time title tree type ver verify vol ' +
        // winutils
        'ping net ipconfig taskkill xcopy ren del'
    },
    contains: [
      {
        className: 'variable', begin: /%%[^ ]|%[^ ]+?%|![^ ]+?!/
      },
      {
        className: 'function',
        begin: LABEL.begin, end: 'goto:eof',
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {begin: '([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*'}),
          COMMENT
        ]
      },
      {
        className: 'number', begin: '\\b\\d+',
        relevance: 0
      },
      COMMENT
    ]
  };
});

hljs.registerLanguage('dts', function(hljs) {
  var STRINGS = {
    className: 'string',
    variants: [
      hljs.inherit(hljs.QUOTE_STRING_MODE, { begin: '((u8?|U)|L)?"' }),
      {
        begin: '(u8?|U)?R"', end: '"',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        begin: '\'\\\\?.', end: '\'',
        illegal: '.'
      }
    ]
  };

  var NUMBERS = {
    className: 'number',
    variants: [
      { begin: '\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)' },
      { begin: hljs.C_NUMBER_RE }
    ],
    relevance: 0
  };

  var PREPROCESSOR = {
    className: 'meta',
    begin: '#', end: '$',
    keywords: {'meta-keyword': 'if else elif endif define undef ifdef ifndef'},
    contains: [
      {
        begin: /\\\n/, relevance: 0
      },
      {
        beginKeywords: 'include', end: '$',
        keywords: {'meta-keyword': 'include'},
        contains: [
          hljs.inherit(STRINGS, {className: 'meta-string'}),
          {
            className: 'meta-string',
            begin: '<', end: '>',
            illegal: '\\n',
          }
        ]
      },
      STRINGS,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  var DTS_REFERENCE = {
    className: 'variable',
    begin: '\\&[a-z\\d_]*\\b'
  };

  var DTS_KEYWORD = {
    className: 'meta-keyword',
    begin: '/[a-z][a-z\\d-]*/'
  };

  var DTS_LABEL = {
    className: 'symbol',
    begin: '^\\s*[a-zA-Z_][a-zA-Z\\d_]*:',
  };

  var DTS_CELL_PROPERTY = {
    className: 'params',
    begin: '<',
    end: '>',
    contains: [
      NUMBERS,
      DTS_REFERENCE,
    ],
  };

  var DTS_NODE = {
    className: 'class',
    begin: /[a-zA-Z_][a-zA-Z\d_@]*\s{/,
    end: /[{;=]/,
    returnBegin: true,
    excludeEnd: true,
  };

  var DTS_ROOT_NODE = {
    className: 'class',
    begin: '/\\s*{',
    end: '};',
    relevance: 10,
    contains: [
      DTS_REFERENCE,
      DTS_KEYWORD,
      DTS_LABEL,
      DTS_NODE,
      DTS_CELL_PROPERTY,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      NUMBERS,
      STRINGS,
    ],
  };

  return {
    keywords: "",
    contains: [
      DTS_ROOT_NODE,
      DTS_REFERENCE,
      DTS_KEYWORD,
      DTS_LABEL,
      DTS_NODE,
      DTS_CELL_PROPERTY,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      NUMBERS,
      STRINGS,
      PREPROCESSOR,
      {
        begin: hljs.IDENT_RE + '::',
        keywords: "",
      },
    ]
  };
});

hljs.registerLanguage('dust', function(hljs) {
  var EXPRESSION_KEYWORDS = 'if eq ne lt lte gt gte select default math sep';
  return {
    aliases: ['dst'],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      {
        className: 'template-tag',
        begin: /\{[#\/]/, end: /\}/, illegal: /;/,
        contains: [
          {
            className: 'name',
            begin: /[a-zA-Z\.-]+/,
            starts: {
              endsWithParent: true, relevance: 0,
              contains: [
                hljs.QUOTE_STRING_MODE
              ]
            }
          }
        ]
      },
      {
        className: 'template-variable',
        begin: /\{/, end: /\}/, illegal: /;/,
        keywords: EXPRESSION_KEYWORDS
      }
    ]
  };
});

hljs.registerLanguage('elixir', function(hljs) {
  var ELIXIR_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?';
  var ELIXIR_METHOD_RE = '[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?';
  var ELIXIR_KEYWORDS =
    'and false then defined module in return redo retry end for true self when ' +
    'next until do begin unless nil break not case cond alias while ensure or ' +
    'include use alias fn quote';
  var SUBST = {
    className: 'subst',
    begin: '#\\{', end: '}',
    lexemes: ELIXIR_IDENT_RE,
    keywords: ELIXIR_KEYWORDS
  };
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST],
    variants: [
      {
        begin: /'/, end: /'/
      },
      {
        begin: /"/, end: /"/
      }
    ]
  };
  var FUNCTION = {
    className: 'function',
    beginKeywords: 'def defp defmacro', end: /\B\b/, // the mode is ended by the title
    contains: [
      hljs.inherit(hljs.TITLE_MODE, {
        begin: ELIXIR_IDENT_RE,
        endsParent: true
      })
    ]
  };
  var CLASS = hljs.inherit(FUNCTION, {
    className: 'class',
    beginKeywords: 'defmodule defrecord', end: /\bdo\b|$|;/
  });
  var ELIXIR_DEFAULT_CONTAINS = [
    STRING,
    hljs.HASH_COMMENT_MODE,
    CLASS,
    FUNCTION,
    {
      className: 'symbol',
      begin: ':',
      contains: [STRING, {begin: ELIXIR_METHOD_RE}],
      relevance: 0
    },
    {
      className: 'symbol',
      begin: ELIXIR_IDENT_RE + ':',
      relevance: 0
    },
    {
      className: 'number',
      begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
      relevance: 0
    },
    {
      className: 'variable',
      begin: '(\\$\\W)|((\\$|\\@\\@?)(\\w+))'
    },
    {
      begin: '->'
    },
    { // regexp container
      begin: '(' + hljs.RE_STARTERS_RE + ')\\s*',
      contains: [
        hljs.HASH_COMMENT_MODE,
        {
          className: 'regexp',
          illegal: '\\n',
          contains: [hljs.BACKSLASH_ESCAPE, SUBST],
          variants: [
            {
              begin: '/', end: '/[a-z]*'
            },
            {
              begin: '%r\\[', end: '\\][a-z]*'
            }
          ]
        }
      ],
      relevance: 0
    }
  ];
  SUBST.contains = ELIXIR_DEFAULT_CONTAINS;

  return {
    lexemes: ELIXIR_IDENT_RE,
    keywords: ELIXIR_KEYWORDS,
    contains: ELIXIR_DEFAULT_CONTAINS
  };
});

hljs.registerLanguage('elm', function(hljs) {
  var COMMENT = {
    variants: [
      hljs.COMMENT('--', '$'),
      hljs.COMMENT(
        '{-',
        '-}',
        {
          contains: ['self']
        }
      )
    ]
  };

  var CONSTRUCTOR = {
    className: 'type',
    begin: '\\b[A-Z][\\w\']*', // TODO: other constructors (built-in, infix).
    relevance: 0
  };

  var LIST = {
    begin: '\\(', end: '\\)',
    illegal: '"',
    contains: [
      {className: 'type', begin: '\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?'},
      COMMENT
    ]
  };

  var RECORD = {
    begin: '{', end: '}',
    contains: LIST.contains
  };

  return {
    keywords:
      'let in if then else case of where module import exposing ' +
      'type alias as infix infixl infixr port',
    contains: [

      // Top-level constructions.

      {
        beginKeywords: 'module', end: 'where',
        keywords: 'module where',
        contains: [LIST, COMMENT],
        illegal: '\\W\\.|;'
      },
      {
        begin: 'import', end: '$',
        keywords: 'import as exposing',
        contains: [LIST, COMMENT],
        illegal: '\\W\\.|;'
      },
      {
        begin: 'type', end: '$',
        keywords: 'type alias',
        contains: [CONSTRUCTOR, LIST, RECORD, COMMENT]
      },
      {
        beginKeywords: 'infix infixl infixr', end: '$',
        contains: [hljs.C_NUMBER_MODE, COMMENT]
      },
      {
        begin: 'port', end: '$',
        keywords: 'port',
        contains: [COMMENT]
      },

      // Literals and names.

      // TODO: characters.
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      CONSTRUCTOR,
      hljs.inherit(hljs.TITLE_MODE, {begin: '^[_a-z][\\w\']*'}),
      COMMENT,

      {begin: '->|<-'} // No markup, relevance booster
    ]
  };
});

hljs.registerLanguage('ruby', function(hljs) {
  var RUBY_METHOD_RE = '[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?';
  var RUBY_KEYWORDS =
    'and false then defined module in return redo if BEGIN retry end for true self when ' +
    'next until do begin unless END rescue nil else break undef not super class case ' +
    'require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor';
  var YARDOCTAG = {
    className: 'doctag',
    begin: '@[A-Za-z]+'
  };
  var IRB_OBJECT = {
    begin: '#<', end: '>'
  };
  var COMMENT_MODES = [
    hljs.COMMENT(
      '#',
      '$',
      {
        contains: [YARDOCTAG]
      }
    ),
    hljs.COMMENT(
      '^\\=begin',
      '^\\=end',
      {
        contains: [YARDOCTAG],
        relevance: 10
      }
    ),
    hljs.COMMENT('^__END__', '\\n$')
  ];
  var SUBST = {
    className: 'subst',
    begin: '#\\{', end: '}',
    keywords: RUBY_KEYWORDS
  };
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST],
    variants: [
      {begin: /'/, end: /'/},
      {begin: /"/, end: /"/},
      {begin: /`/, end: /`/},
      {begin: '%[qQwWx]?\\(', end: '\\)'},
      {begin: '%[qQwWx]?\\[', end: '\\]'},
      {begin: '%[qQwWx]?{', end: '}'},
      {begin: '%[qQwWx]?<', end: '>'},
      {begin: '%[qQwWx]?/', end: '/'},
      {begin: '%[qQwWx]?%', end: '%'},
      {begin: '%[qQwWx]?-', end: '-'},
      {begin: '%[qQwWx]?\\|', end: '\\|'},
      {
        // \B in the beginning suppresses recognition of ?-sequences where ?
        // is the last character of a preceding identifier, as in: `func?4`
        begin: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
      }
    ]
  };
  var PARAMS = {
    className: 'params',
    begin: '\\(', end: '\\)', endsParent: true,
    keywords: RUBY_KEYWORDS
  };

  var RUBY_DEFAULT_CONTAINS = [
    STRING,
    IRB_OBJECT,
    {
      className: 'class',
      beginKeywords: 'class module', end: '$|;',
      illegal: /=/,
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {begin: '[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?'}),
        {
          begin: '<\\s*',
          contains: [{
            begin: '(' + hljs.IDENT_RE + '::)?' + hljs.IDENT_RE
          }]
        }
      ].concat(COMMENT_MODES)
    },
    {
      className: 'function',
      beginKeywords: 'def', end: '$|;',
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {begin: RUBY_METHOD_RE}),
        PARAMS
      ].concat(COMMENT_MODES)
    },
    {
      className: 'symbol',
      begin: hljs.UNDERSCORE_IDENT_RE + '(\\!|\\?)?:',
      relevance: 0
    },
    {
      className: 'symbol',
      begin: ':',
      contains: [STRING, {begin: RUBY_METHOD_RE}],
      relevance: 0
    },
    {
      className: 'number',
      begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
      relevance: 0
    },
    {
      begin: '(\\$\\W)|((\\$|\\@\\@?)(\\w+))' // variables
    },
    { // regexp container
      begin: '(' + hljs.RE_STARTERS_RE + ')\\s*',
      contains: [
        IRB_OBJECT,
        {
          className: 'regexp',
          contains: [hljs.BACKSLASH_ESCAPE, SUBST],
          illegal: /\n/,
          variants: [
            {begin: '/', end: '/[a-z]*'},
            {begin: '%r{', end: '}[a-z]*'},
            {begin: '%r\\(', end: '\\)[a-z]*'},
            {begin: '%r!', end: '![a-z]*'},
            {begin: '%r\\[', end: '\\][a-z]*'}
          ]
        }
      ].concat(COMMENT_MODES),
      relevance: 0
    }
  ].concat(COMMENT_MODES);

  SUBST.contains = RUBY_DEFAULT_CONTAINS;
  PARAMS.contains = RUBY_DEFAULT_CONTAINS;

  var SIMPLE_PROMPT = "[>?]>";
  var DEFAULT_PROMPT = "[\\w#]+\\(\\w+\\):\\d+:\\d+>";
  var RVM_PROMPT = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>";

  var IRB_DEFAULT = [
    {
      begin: /^\s*=>/,
      starts: {
        end: '$', contains: RUBY_DEFAULT_CONTAINS
      }
    },
    {
      className: 'meta',
      begin: '^('+SIMPLE_PROMPT+"|"+DEFAULT_PROMPT+'|'+RVM_PROMPT+')',
      starts: {
        end: '$', contains: RUBY_DEFAULT_CONTAINS
      }
    }
  ];

  return {
    aliases: ['rb', 'gemspec', 'podspec', 'thor', 'irb'],
    keywords: RUBY_KEYWORDS,
    illegal: /\/\*/,
    contains: COMMENT_MODES.concat(IRB_DEFAULT).concat(RUBY_DEFAULT_CONTAINS)
  };
});

hljs.registerLanguage('erb', function(hljs) {
  return {
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT('<%#', '%>'),
      {
        begin: '<%[%=-]?', end: '[%-]?%>',
        subLanguage: 'ruby',
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  };
});

hljs.registerLanguage('erlang-repl', function(hljs) {
  return {
    keywords: {
      built_in:
        'spawn spawn_link self',
      keyword:
        'after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if ' +
        'let not of or orelse|10 query receive rem try when xor'
    },
    contains: [
      {
        className: 'meta', begin: '^[0-9]+> ',
        relevance: 10
      },
      hljs.COMMENT('%', '$'),
      {
        className: 'number',
        begin: '\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)',
        relevance: 0
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        begin: '\\?(::)?([A-Z]\\w*(::)?)+'
      },
      {
        begin: '->'
      },
      {
        begin: 'ok'
      },
      {
        begin: '!'
      },
      {
        begin: '(\\b[a-z\'][a-zA-Z0-9_\']*:[a-z\'][a-zA-Z0-9_\']*)|(\\b[a-z\'][a-zA-Z0-9_\']*)',
        relevance: 0
      },
      {
        begin: '[A-Z][a-zA-Z0-9_\']*',
        relevance: 0
      }
    ]
  };
});

hljs.registerLanguage('erlang', function(hljs) {
  var BASIC_ATOM_RE = '[a-z\'][a-zA-Z0-9_\']*';
  var FUNCTION_NAME_RE = '(' + BASIC_ATOM_RE + ':' + BASIC_ATOM_RE + '|' + BASIC_ATOM_RE + ')';
  var ERLANG_RESERVED = {
    keyword:
      'after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun if ' +
      'let not of orelse|10 query receive rem try when xor',
    literal:
      'false true'
  };

  var COMMENT = hljs.COMMENT('%', '$');
  var NUMBER = {
    className: 'number',
    begin: '\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)',
    relevance: 0
  };
  var NAMED_FUN = {
    begin: 'fun\\s+' + BASIC_ATOM_RE + '/\\d+'
  };
  var FUNCTION_CALL = {
    begin: FUNCTION_NAME_RE + '\\(', end: '\\)',
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        begin: FUNCTION_NAME_RE, relevance: 0
      },
      {
        begin: '\\(', end: '\\)', endsWithParent: true,
        returnEnd: true,
        relevance: 0
        // "contains" defined later
      }
    ]
  };
  var TUPLE = {
    begin: '{', end: '}',
    relevance: 0
    // "contains" defined later
  };
  var VAR1 = {
    begin: '\\b_([A-Z][A-Za-z0-9_]*)?',
    relevance: 0
  };
  var VAR2 = {
    begin: '[A-Z][a-zA-Z0-9_]*',
    relevance: 0
  };
  var RECORD_ACCESS = {
    begin: '#' + hljs.UNDERSCORE_IDENT_RE,
    relevance: 0,
    returnBegin: true,
    contains: [
      {
        begin: '#' + hljs.UNDERSCORE_IDENT_RE,
        relevance: 0
      },
      {
        begin: '{', end: '}',
        relevance: 0
        // "contains" defined later
      }
    ]
  };

  var BLOCK_STATEMENTS = {
    beginKeywords: 'fun receive if try case', end: 'end',
    keywords: ERLANG_RESERVED
  };
  BLOCK_STATEMENTS.contains = [
    COMMENT,
    NAMED_FUN,
    hljs.inherit(hljs.APOS_STRING_MODE, {className: ''}),
    BLOCK_STATEMENTS,
    FUNCTION_CALL,
    hljs.QUOTE_STRING_MODE,
    NUMBER,
    TUPLE,
    VAR1, VAR2,
    RECORD_ACCESS
  ];

  var BASIC_MODES = [
    COMMENT,
    NAMED_FUN,
    BLOCK_STATEMENTS,
    FUNCTION_CALL,
    hljs.QUOTE_STRING_MODE,
    NUMBER,
    TUPLE,
    VAR1, VAR2,
    RECORD_ACCESS
  ];
  FUNCTION_CALL.contains[1].contains = BASIC_MODES;
  TUPLE.contains = BASIC_MODES;
  RECORD_ACCESS.contains[1].contains = BASIC_MODES;

  var PARAMS = {
    className: 'params',
    begin: '\\(', end: '\\)',
    contains: BASIC_MODES
  };
  return {
    aliases: ['erl'],
    keywords: ERLANG_RESERVED,
    illegal: '(</|\\*=|\\+=|-=|/\\*|\\*/|\\(\\*|\\*\\))',
    contains: [
      {
        className: 'function',
        begin: '^' + BASIC_ATOM_RE + '\\s*\\(', end: '->',
        returnBegin: true,
        illegal: '\\(|#|//|/\\*|\\\\|:|;',
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, {begin: BASIC_ATOM_RE})
        ],
        starts: {
          end: ';|\\.',
          keywords: ERLANG_RESERVED,
          contains: BASIC_MODES
        }
      },
      COMMENT,
      {
        begin: '^-', end: '\\.',
        relevance: 0,
        excludeEnd: true,
        returnBegin: true,
        lexemes: '-' + hljs.IDENT_RE,
        keywords:
          '-module -record -undef -export -ifdef -ifndef -author -copyright -doc -vsn ' +
          '-import -include -include_lib -compile -define -else -endif -file -behaviour ' +
          '-behavior -spec',
        contains: [PARAMS]
      },
      NUMBER,
      hljs.QUOTE_STRING_MODE,
      RECORD_ACCESS,
      VAR1, VAR2,
      TUPLE,
      {begin: /\.$/} // relevance booster
    ]
  };
});

hljs.registerLanguage('fix', function(hljs) {
  return {
    contains: [
    {
      begin: /[^\u2401\u0001]+/,
      end: /[\u2401\u0001]/,
      excludeEnd: true,
      returnBegin: true,
      returnEnd: false,
      contains: [
      {
        begin: /([^\u2401\u0001=]+)/,
        end: /=([^\u2401\u0001=]+)/,
        returnEnd: true,
        returnBegin: false,
        className: 'attr'
      },
      {
        begin: /=/,
        end: /([\u2401\u0001])/,
        excludeEnd: true,
        excludeBegin: true,
        className: 'string'
      }]
    }],
    case_insensitive: true
  };
});

hljs.registerLanguage('fortran', function(hljs) {
  var PARAMS = {
    className: 'params',
    begin: '\\(', end: '\\)'
  };

  var F_KEYWORDS = {
    literal: '.False. .True.',
    keyword: 'kind do while private call intrinsic where elsewhere ' +
      'type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then ' +
      'public subroutine|10 function program .and. .or. .not. .le. .eq. .ge. .gt. .lt. ' +
      'goto save else use module select case ' +
      'access blank direct exist file fmt form formatted iostat name named nextrec number opened rec recl sequential status unformatted unit ' +
      'continue format pause cycle exit ' +
      'c_null_char c_alert c_backspace c_form_feed flush wait decimal round iomsg ' +
      'synchronous nopass non_overridable pass protected volatile abstract extends import ' +
      'non_intrinsic value deferred generic final enumerator class associate bind enum ' +
      'c_int c_short c_long c_long_long c_signed_char c_size_t c_int8_t c_int16_t c_int32_t c_int64_t c_int_least8_t c_int_least16_t ' +
      'c_int_least32_t c_int_least64_t c_int_fast8_t c_int_fast16_t c_int_fast32_t c_int_fast64_t c_intmax_t C_intptr_t c_float c_double ' +
      'c_long_double c_float_complex c_double_complex c_long_double_complex c_bool c_char c_null_ptr c_null_funptr ' +
      'c_new_line c_carriage_return c_horizontal_tab c_vertical_tab iso_c_binding c_loc c_funloc c_associated  c_f_pointer ' +
      'c_ptr c_funptr iso_fortran_env character_storage_size error_unit file_storage_size input_unit iostat_end iostat_eor ' +
      'numeric_storage_size output_unit c_f_procpointer ieee_arithmetic ieee_support_underflow_control ' +
      'ieee_get_underflow_mode ieee_set_underflow_mode newunit contiguous recursive ' +
      'pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure ' +
      'integer real character complex logical dimension allocatable|10 parameter ' +
      'external implicit|10 none double precision assign intent optional pointer ' +
      'target in out common equivalence data',
    built_in: 'alog alog10 amax0 amax1 amin0 amin1 amod cabs ccos cexp clog csin csqrt dabs dacos dasin datan datan2 dcos dcosh ddim dexp dint ' +
      'dlog dlog10 dmax1 dmin1 dmod dnint dsign dsin dsinh dsqrt dtan dtanh float iabs idim idint idnint ifix isign max0 max1 min0 min1 sngl ' +
      'algama cdabs cdcos cdexp cdlog cdsin cdsqrt cqabs cqcos cqexp cqlog cqsin cqsqrt dcmplx dconjg derf derfc dfloat dgamma dimag dlgama ' +
      'iqint qabs qacos qasin qatan qatan2 qcmplx qconjg qcos qcosh qdim qerf qerfc qexp qgamma qimag qlgama qlog qlog10 qmax1 qmin1 qmod ' +
      'qnint qsign qsin qsinh qsqrt qtan qtanh abs acos aimag aint anint asin atan atan2 char cmplx conjg cos cosh exp ichar index int log ' +
      'log10 max min nint sign sin sinh sqrt tan tanh print write dim lge lgt lle llt mod nullify allocate deallocate ' +
      'adjustl adjustr all allocated any associated bit_size btest ceiling count cshift date_and_time digits dot_product ' +
      'eoshift epsilon exponent floor fraction huge iand ibclr ibits ibset ieor ior ishft ishftc lbound len_trim matmul ' +
      'maxexponent maxloc maxval merge minexponent minloc minval modulo mvbits nearest pack present product ' +
      'radix random_number random_seed range repeat reshape rrspacing scale scan selected_int_kind selected_real_kind ' +
      'set_exponent shape size spacing spread sum system_clock tiny transpose trim ubound unpack verify achar iachar transfer ' +
      'dble entry dprod cpu_time command_argument_count get_command get_command_argument get_environment_variable is_iostat_end ' +
      'ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode ' +
      'is_iostat_eor move_alloc new_line selected_char_kind same_type_as extends_type_of'  +
      'acosh asinh atanh bessel_j0 bessel_j1 bessel_jn bessel_y0 bessel_y1 bessel_yn erf erfc erfc_scaled gamma log_gamma hypot norm2 ' +
      'atomic_define atomic_ref execute_command_line leadz trailz storage_size merge_bits ' +
      'bge bgt ble blt dshiftl dshiftr findloc iall iany iparity image_index lcobound ucobound maskl maskr ' +
      'num_images parity popcnt poppar shifta shiftl shiftr this_image'
  };
  return {
    case_insensitive: true,
    aliases: ['f90', 'f95'],
    keywords: F_KEYWORDS,
    illegal: /\/\*/,
    contains: [
      hljs.inherit(hljs.APOS_STRING_MODE, {className: 'string', relevance: 0}),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {className: 'string', relevance: 0}),
      {
        className: 'function',
        beginKeywords: 'subroutine function program',
        illegal: '[${=\\n]',
        contains: [hljs.UNDERSCORE_TITLE_MODE, PARAMS]
      },
      hljs.COMMENT('!', '$', {relevance: 0}),
      {
        className: 'number',
        begin: '(?=\\b|\\+|\\-|\\.)(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*)(?:[de][+-]?\\d+)?\\b\\.?',
        relevance: 0
      }
    ]
  };
});

hljs.registerLanguage('fsharp', function(hljs) {
  var TYPEPARAM = {
    begin: '<', end: '>',
    contains: [
      hljs.inherit(hljs.TITLE_MODE, {begin: /'[a-zA-Z0-9_]+/})
    ]
  };

  return {
    aliases: ['fs'],
    keywords:
      'abstract and as assert base begin class default delegate do done ' +
      'downcast downto elif else end exception extern false finally for ' +
      'fun function global if in inherit inline interface internal lazy let ' +
      'match member module mutable namespace new null of open or ' +
      'override private public rec return sig static struct then to ' +
      'true try type upcast use val void when while with yield',
    illegal: /\/\*/,
    contains: [
      {
        // monad builder keywords (matches before non-bang kws)
        className: 'keyword',
        begin: /\b(yield|return|let|do)!/
      },
      {
        className: 'string',
        begin: '@"', end: '"',
        contains: [{begin: '""'}]
      },
      {
        className: 'string',
        begin: '"""', end: '"""'
      },
      hljs.COMMENT('\\(\\*', '\\*\\)'),
      {
        className: 'class',
        beginKeywords: 'type', end: '\\(|=|$', excludeEnd: true,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          TYPEPARAM
        ]
      },
      {
        className: 'meta',
        begin: '\\[<', end: '>\\]',
        relevance: 10
      },
      {
        className: 'symbol',
        begin: '\\B(\'[A-Za-z])\\b',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),
      hljs.C_NUMBER_MODE
    ]
  };
});

hljs.registerLanguage('gams', function (hljs) {
  var KEYWORDS =
    'abort acronym acronyms alias all and assign binary card diag display else1 eps eq equation equations file files ' +
    'for1 free ge gt if inf integer le loop lt maximizing minimizing model models na ne negative no not option ' +
    'options or ord parameter parameters positive prod putpage puttl repeat sameas scalar scalars semicont semiint ' +
    'set1 sets smax smin solve sos1 sos2 sum system table then until using variable variables while1 xor yes';

  return {
    aliases: ['gms'],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: [
      {
        beginKeywords: 'sets parameters variables equations',
        end: ';',
        contains: [
          {
            begin: '/',
            end: '/',
            contains: [hljs.NUMBER_MODE]
          }
        ]
      },
      {
        className: 'string',
        begin: '\\*{3}', end: '\\*{3}'
      },
      hljs.NUMBER_MODE,
      {
        className: 'number',
        begin: '\\$[a-zA-Z0-9]+'
      }
    ]
  };
});

hljs.registerLanguage('gauss', function(hljs) {
  var KEYWORDS = {
    keyword: 'and bool break|0 call callexe checkinterrupt clear clearg closeall cls comlog compile ' +
              'continue create debug declare delete disable dlibrary|10 dllcall do|0 dos ed edit else|0 ' +
              'elseif enable end endfor|10 endif|10 endp|10 endo|10 errorlog|10 errorlogat expr external fn ' +
              'for|0 format goto gosub|0 graph if|0 keyword let lib library line load loadarray loadexe ' +
              'loadf|10 loadk|10 loadm|10 loadp loads loadx local locate loopnextindex lprint lpwidth lshow ' +
              'matrix msym ndpclex new not open or output outwidth plot plotsym pop prcsn print ' +
              'printdos proc|10 push retp|10 return|0 rndcon rndmod rndmult rndseed run save saveall screen ' +
              'scroll setarray show sparse stop string struct system trace trap|10 threadfor|10 ' +
              'threadendfor|10 threadbegin|10 threadjoin|10 threadstat|10 threadend|10 until use while winprint',
    built_in: 'abs acf aconcat aeye amax amean AmericanBinomCall AmericanBinomCall_Greeks AmericanBinomCall_ImpVol ' +
              'AmericanBinomPut AmericanBinomPut_Greeks AmericanBinomPut_ImpVol AmericanBSCall AmericanBSCall_Greeks ' +
              'AmericanBSCall_ImpVol AmericanBSPut AmericanBSPut_Greeks AmericanBSPut_ImpVol amin amult annotationGetDefaults ' +
              'annotationSetBkd annotationSetFont annotationSetLineColor annotationSetLineStyle annotationSetLineThickness ' +
              'annualTradingDays arccos arcsin areshape arrayalloc arrayindex arrayinit arraytomat asciiload asclabel astd ' +
              'astds asum atan atan2 atranspose axmargin balance band bandchol bandcholsol bandltsol bandrv bandsolpd bar ' +
              'base10 begwind besselj bessely beta box boxcox cdfBeta cdfBetaInv cdfBinomial cdfBinomialInv cdfBvn cdfBvn2 ' +
              'cdfBvn2e cdfCauchy cdfCauchyInv cdfChic cdfChii cdfChinc cdfChincInv cdfExp cdfExpInv cdfFc cdfFnc cdfFncInv ' +
              'cdfGam cdfGenPareto cdfHyperGeo cdfLaplace cdfLaplaceInv cdfLogistic cdfLogisticInv cdfmControlCreate cdfMvn ' +
              'cdfMvn2e cdfMvnce cdfMvne cdfMvt2e cdfMvtce cdfMvte cdfN cdfN2 cdfNc cdfNegBinomial cdfNegBinomialInv cdfNi ' +
              'cdfPoisson cdfPoissonInv cdfRayleigh cdfRayleighInv cdfTc cdfTci cdfTnc cdfTvn cdfWeibull cdfWeibullInv cdir ' +
              'ceil ChangeDir chdir chiBarSquare chol choldn cholsol cholup chrs close code cols colsf combinate combinated ' +
              'complex con cond conj cons ConScore contour conv convertsatostr convertstrtosa corrm corrms corrvc corrx corrxs ' +
              'cos cosh counts countwts crossprd crout croutp csrcol csrlin csvReadM csvReadSA cumprodc cumsumc curve cvtos ' +
              'datacreate datacreatecomplex datalist dataload dataloop dataopen datasave date datestr datestring datestrymd ' +
              'dayinyr dayofweek dbAddDatabase|10 dbClose|10 dbCommit|10 dbCreateQuery|10 dbExecQuery|10 dbGetConnectOptions|10 dbGetDatabaseName|10 ' +
              'dbGetDriverName|10 dbGetDrivers|10 dbGetHostName|10 dbGetLastErrorNum|10 dbGetLastErrorText|10 dbGetNumericalPrecPolicy|10 ' +
              'dbGetPassword|10 dbGetPort|10 dbGetTableHeaders|10 dbGetTables|10 dbGetUserName|10 dbHasFeature|10 dbIsDriverAvailable|10 dbIsOpen|10 ' +
              'dbIsOpenError|10 dbOpen|10 dbQueryBindValue|10 dbQueryClear|10 dbQueryCols|10 dbQueryExecPrepared|10 dbQueryFetchAllM|10 dbQueryFetchAllSA|10 ' +
              'dbQueryFetchOneM|10 dbQueryFetchOneSA|10 dbQueryFinish|10 dbQueryGetBoundValue|10 dbQueryGetBoundValues|10 dbQueryGetField|10 ' +
              'dbQueryGetLastErrorNum|10 dbQueryGetLastErrorText|10 dbQueryGetLastInsertID|10 dbQueryGetLastQuery|10 dbQueryGetPosition|10 ' +
              'dbQueryIsActive|10 dbQueryIsForwardOnly|10 dbQueryIsNull|10 dbQueryIsSelect|10 dbQueryIsValid|10 dbQueryPrepare|10 dbQueryRows|10 ' +
              'dbQuerySeek|10 dbQuerySeekFirst|10 dbQuerySeekLast|10 dbQuerySeekNext|10 dbQuerySeekPrevious|10 dbQuerySetForwardOnly|10 ' +
              'dbRemoveDatabase|10 dbRollback|10 dbSetConnectOptions|10 dbSetDatabaseName|10 dbSetHostName|10 dbSetNumericalPrecPolicy|10 ' +
              'dbSetPort|10 dbSetUserName|10 dbTransaction|10 DeleteFile delif delrows denseToSp denseToSpRE denToZero design det detl ' +
              'dfft dffti diag diagrv digamma doswin DOSWinCloseall DOSWinOpen dotfeq dotfeqmt dotfge dotfgemt dotfgt dotfgtmt ' +
              'dotfle dotflemt dotflt dotfltmt dotfne dotfnemt draw drop dsCreate dstat dstatmt dstatmtControlCreate dtdate dtday ' +
              'dttime dttodtv dttostr dttoutc dtvnormal dtvtodt dtvtoutc dummy dummybr dummydn eig eigh eighv eigv elapsedTradingDays ' +
              'endwind envget eof eqSolve eqSolvemt eqSolvemtControlCreate eqSolvemtOutCreate eqSolveset erf erfc erfccplx erfcplx error ' +
              'etdays ethsec etstr EuropeanBinomCall EuropeanBinomCall_Greeks EuropeanBinomCall_ImpVol EuropeanBinomPut ' +
              'EuropeanBinomPut_Greeks EuropeanBinomPut_ImpVol EuropeanBSCall EuropeanBSCall_Greeks EuropeanBSCall_ImpVol ' +
              'EuropeanBSPut EuropeanBSPut_Greeks EuropeanBSPut_ImpVol exctsmpl exec execbg exp extern eye fcheckerr fclearerr feq ' +
              'feqmt fflush fft ffti fftm fftmi fftn fge fgemt fgets fgetsa fgetsat fgetst fgt fgtmt fileinfo filesa fle flemt ' +
              'floor flt fltmt fmod fne fnemt fonts fopen formatcv formatnv fputs fputst fseek fstrerror ftell ftocv ftos ftostrC ' +
              'gamma gammacplx gammaii gausset gdaAppend gdaCreate gdaDStat gdaDStatMat gdaGetIndex gdaGetName gdaGetNames gdaGetOrders ' +
              'gdaGetType gdaGetTypes gdaGetVarInfo gdaIsCplx gdaLoad gdaPack gdaRead gdaReadByIndex gdaReadSome gdaReadSparse ' +
              'gdaReadStruct gdaReportVarInfo gdaSave gdaUpdate gdaUpdateAndPack gdaVars gdaWrite gdaWrite32 gdaWriteSome getarray ' +
              'getdims getf getGAUSShome getmatrix getmatrix4D getname getnamef getNextTradingDay getNextWeekDay getnr getorders ' +
              'getpath getPreviousTradingDay getPreviousWeekDay getRow getscalar3D getscalar4D getTrRow getwind glm gradcplx gradMT ' +
              'gradMTm gradMTT gradMTTm gradp graphprt graphset hasimag header headermt hess hessMT hessMTg hessMTgw hessMTm ' +
              'hessMTmw hessMTT hessMTTg hessMTTgw hessMTTm hessMTw hessp hist histf histp hsec imag indcv indexcat indices indices2 ' +
              'indicesf indicesfn indnv indsav indx integrate1d integrateControlCreate intgrat2 intgrat3 inthp1 inthp2 inthp3 inthp4 ' +
              'inthpControlCreate intquad1 intquad2 intquad3 intrleav intrleavsa intrsect intsimp inv invpd invswp iscplx iscplxf ' +
              'isden isinfnanmiss ismiss key keyav keyw lag lag1 lagn lapEighb lapEighi lapEighvb lapEighvi lapgEig lapgEigh lapgEighv ' +
              'lapgEigv lapgSchur lapgSvdcst lapgSvds lapgSvdst lapSvdcusv lapSvds lapSvdusv ldlp ldlsol linSolve listwise ln lncdfbvn ' +
              'lncdfbvn2 lncdfmvn lncdfn lncdfn2 lncdfnc lnfact lngammacplx lnpdfmvn lnpdfmvt lnpdfn lnpdft loadd loadstruct loadwind ' +
              'loess loessmt loessmtControlCreate log loglog logx logy lower lowmat lowmat1 ltrisol lu lusol machEpsilon make makevars ' +
              'makewind margin matalloc matinit mattoarray maxbytes maxc maxindc maxv maxvec mbesselei mbesselei0 mbesselei1 mbesseli ' +
              'mbesseli0 mbesseli1 meanc median mergeby mergevar minc minindc minv miss missex missrv moment momentd movingave ' +
              'movingaveExpwgt movingaveWgt nextindex nextn nextnevn nextwind ntos null null1 numCombinations ols olsmt olsmtControlCreate ' +
              'olsqr olsqr2 olsqrmt ones optn optnevn orth outtyp pacf packedToSp packr parse pause pdfCauchy pdfChi pdfExp pdfGenPareto ' +
              'pdfHyperGeo pdfLaplace pdfLogistic pdfn pdfPoisson pdfRayleigh pdfWeibull pi pinv pinvmt plotAddArrow plotAddBar plotAddBox ' +
              'plotAddHist plotAddHistF plotAddHistP plotAddPolar plotAddScatter plotAddShape plotAddTextbox plotAddTS plotAddXY plotArea ' +
              'plotBar plotBox plotClearLayout plotContour plotCustomLayout plotGetDefaults plotHist plotHistF plotHistP plotLayout ' +
              'plotLogLog plotLogX plotLogY plotOpenWindow plotPolar plotSave plotScatter plotSetAxesPen plotSetBar plotSetBarFill ' +
              'plotSetBarStacked plotSetBkdColor plotSetFill plotSetGrid plotSetLegend plotSetLineColor plotSetLineStyle plotSetLineSymbol ' +
              'plotSetLineThickness plotSetNewWindow plotSetTitle plotSetWhichYAxis plotSetXAxisShow plotSetXLabel plotSetXRange ' +
              'plotSetXTicInterval plotSetXTicLabel plotSetYAxisShow plotSetYLabel plotSetYRange plotSetZAxisShow plotSetZLabel ' +
              'plotSurface plotTS plotXY polar polychar polyeval polygamma polyint polymake polymat polymroot polymult polyroot ' +
              'pqgwin previousindex princomp printfm printfmt prodc psi putarray putf putvals pvCreate pvGetIndex pvGetParNames ' +
              'pvGetParVector pvLength pvList pvPack pvPacki pvPackm pvPackmi pvPacks pvPacksi pvPacksm pvPacksmi pvPutParVector ' +
              'pvTest pvUnpack QNewton QNewtonmt QNewtonmtControlCreate QNewtonmtOutCreate QNewtonSet QProg QProgmt QProgmtInCreate ' +
              'qqr qqre qqrep qr qre qrep qrsol qrtsol qtyr qtyre qtyrep quantile quantiled qyr qyre qyrep qz rank rankindx readr ' +
              'real reclassify reclassifyCuts recode recserar recsercp recserrc rerun rescale reshape rets rev rfft rffti rfftip rfftn ' +
              'rfftnp rfftp rndBernoulli rndBeta rndBinomial rndCauchy rndChiSquare rndCon rndCreateState rndExp rndGamma rndGeo rndGumbel ' +
              'rndHyperGeo rndi rndKMbeta rndKMgam rndKMi rndKMn rndKMnb rndKMp rndKMu rndKMvm rndLaplace rndLCbeta rndLCgam rndLCi rndLCn ' +
              'rndLCnb rndLCp rndLCu rndLCvm rndLogNorm rndMTu rndMVn rndMVt rndn rndnb rndNegBinomial rndp rndPoisson rndRayleigh ' +
              'rndStateSkip rndu rndvm rndWeibull rndWishart rotater round rows rowsf rref sampleData satostrC saved saveStruct savewind ' +
              'scale scale3d scalerr scalinfnanmiss scalmiss schtoc schur searchsourcepath seekr select selif seqa seqm setdif setdifsa ' +
              'setvars setvwrmode setwind shell shiftr sin singleindex sinh sleep solpd sortc sortcc sortd sorthc sorthcc sortind ' +
              'sortindc sortmc sortr sortrc spBiconjGradSol spChol spConjGradSol spCreate spDenseSubmat spDiagRvMat spEigv spEye spLDL ' +
              'spline spLU spNumNZE spOnes spreadSheetReadM spreadSheetReadSA spreadSheetWrite spScale spSubmat spToDense spTrTDense ' +
              'spTScalar spZeros sqpSolve sqpSolveMT sqpSolveMTControlCreate sqpSolveMTlagrangeCreate sqpSolveMToutCreate sqpSolveSet ' +
              'sqrt statements stdc stdsc stocv stof strcombine strindx strlen strput strrindx strsect strsplit strsplitPad strtodt ' +
              'strtof strtofcplx strtriml strtrimr strtrunc strtruncl strtruncpad strtruncr submat subscat substute subvec sumc sumr ' +
              'surface svd svd1 svd2 svdcusv svds svdusv sysstate tab tan tanh tempname threadBegin threadEnd threadEndFor threadFor ' +
              'threadJoin threadStat time timedt timestr timeutc title tkf2eps tkf2ps tocart todaydt toeplitz token topolar trapchk ' +
              'trigamma trimr trunc type typecv typef union unionsa uniqindx uniqindxsa unique uniquesa upmat upmat1 upper utctodt ' +
              'utctodtv utrisol vals varCovMS varCovXS varget vargetl varmall varmares varput varputl vartypef vcm vcms vcx vcxs ' +
              'vec vech vecr vector vget view viewxyz vlist vnamecv volume vput vread vtypecv wait waitc walkindex where window ' +
              'writer xlabel xlsGetSheetCount xlsGetSheetSize xlsGetSheetTypes xlsMakeRange xlsReadM xlsReadSA xlsWrite xlsWriteM ' +
              'xlsWriteSA xpnd xtics xy xyz ylabel ytics zeros zeta zlabel ztics',
    literal: 'DB_AFTER_LAST_ROW DB_ALL_TABLES DB_BATCH_OPERATIONS DB_BEFORE_FIRST_ROW DB_BLOB DB_EVENT_NOTIFICATIONS ' +
             'DB_FINISH_QUERY DB_HIGH_PRECISION DB_LAST_INSERT_ID DB_LOW_PRECISION_DOUBLE DB_LOW_PRECISION_INT32 ' +
             'DB_LOW_PRECISION_INT64 DB_LOW_PRECISION_NUMBERS DB_MULTIPLE_RESULT_SETS DB_NAMED_PLACEHOLDERS ' +
             'DB_POSITIONAL_PLACEHOLDERS DB_PREPARED_QUERIES DB_QUERY_SIZE DB_SIMPLE_LOCKING DB_SYSTEM_TABLES DB_TABLES ' +
             'DB_TRANSACTIONS DB_UNICODE DB_VIEWS'
  };

  var PREPROCESSOR =
  {
    className: 'meta',
    begin: '#', end: '$',
    keywords: {'meta-keyword': 'define definecs|10 undef ifdef ifndef iflight ifdllcall ifmac ifos2win ifunix else endif lineson linesoff srcfile srcline'},
    contains: [
      {
        begin: /\\\n/, relevance: 0
      },
      {
        beginKeywords: 'include', end: '$',
        keywords: {'meta-keyword': 'include'},
        contains: [
          {
            className: 'meta-string',
            begin: '"', end: '"',
            illegal: '\\n'
          }
        ]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  var FUNCTION_TITLE = hljs.UNDERSCORE_IDENT_RE + '\\s*\\(?';
  var PARSE_PARAMS = [
    {
      className: 'params',
      begin: /\(/, end: /\)/,
      keywords: KEYWORDS,
      relevance: 0,
      contains: [
        hljs.C_NUMBER_MODE,
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE
      ]
    }
  ];

  return {
    aliases: ['gss'],
    case_insensitive: true, // language is case-insensitive
    keywords: KEYWORDS,
    illegal: '(\\{[%#]|[%#]\\})',
    contains: [
      hljs.C_NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.COMMENT('@', '@'),
      PREPROCESSOR,
      {
        className: 'string',
        begin: '"', end: '"',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        className: 'function',
        beginKeywords: 'proc keyword',
        end: ';',
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          {
            begin: FUNCTION_TITLE, returnBegin: true,
            contains: [hljs.UNDERSCORE_TITLE_MODE],
            relevance: 0
          },
          hljs.C_NUMBER_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          PREPROCESSOR
        ].concat(PARSE_PARAMS)
      },
      {
        className: 'function',
        beginKeywords: 'fn',
        end: ';',
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          {
            begin: FUNCTION_TITLE + hljs.IDENT_RE + '\\)?\\s*\\=\\s*', returnBegin: true,
            contains: [hljs.UNDERSCORE_TITLE_MODE],
            relevance: 0
          },
          hljs.C_NUMBER_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ].concat(PARSE_PARAMS)
      },
      {
        className: 'function',
        begin: '\\bexternal (proc|keyword|fn)\\s+',
        end: ';',
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          {
            begin: FUNCTION_TITLE, returnBegin: true,
            contains: [hljs.UNDERSCORE_TITLE_MODE],
            relevance: 0
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        className: 'function',
        begin: '\\bexternal (matrix|string|array|sparse matrix|struct ' + hljs.IDENT_RE + ')\\s+',
        end: ';',
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      }
    ]
  };
});

hljs.registerLanguage('gcode', function(hljs) {
    var GCODE_IDENT_RE = '[A-Z_][A-Z0-9_.]*';
    var GCODE_CLOSE_RE = '\\%';
    var GCODE_KEYWORDS =
      'IF DO WHILE ENDWHILE CALL ENDIF SUB ENDSUB GOTO REPEAT ENDREPEAT ' +
      'EQ LT GT NE GE LE OR XOR';
    var GCODE_START = {
        className: 'meta',
        begin: '([O])([0-9]+)'
    };
    var GCODE_CODE = [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.COMMENT(/\(/, /\)/),
        hljs.inherit(hljs.C_NUMBER_MODE, {begin: '([-+]?([0-9]*\\.?[0-9]+\\.?))|' + hljs.C_NUMBER_RE}),
        hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),
        hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),
        {
            className: 'name',
            begin: '([G])([0-9]+\\.?[0-9]?)'
        },
        {
            className: 'name',
            begin: '([M])([0-9]+\\.?[0-9]?)'
        },
        {
            className: 'attr',
            begin: '(VC|VS|#)',
            end: '(\\d+)'
        },
        {
            className: 'attr',
            begin: '(VZOFX|VZOFY|VZOFZ)'
        },
        {
            className: 'built_in',
            begin: '(ATAN|ABS|ACOS|ASIN|SIN|COS|EXP|FIX|FUP|ROUND|LN|TAN)(\\[)',
            end: '([-+]?([0-9]*\\.?[0-9]+\\.?))(\\])'
        },
        {
            className: 'symbol',
            variants: [
                {
                    begin: 'N', end: '\\d+',
                    illegal: '\\W'
                }
            ]
        }
    ];

    return {
        aliases: ['nc'],
        // Some implementations (CNC controls) of G-code are interoperable with uppercase and lowercase letters seamlessly.
        // However, most prefer all uppercase and uppercase is customary.
        case_insensitive: true,
        lexemes: GCODE_IDENT_RE,
        keywords: GCODE_KEYWORDS,
        contains: [
            {
                className: 'meta',
                begin: GCODE_CLOSE_RE
            },
            GCODE_START
        ].concat(GCODE_CODE)
    };
});

hljs.registerLanguage('gherkin', function (hljs) {
  return {
    aliases: ['feature'],
    keywords: 'Feature Background Ability Business\ Need Scenario Scenarios Scenario\ Outline Scenario\ Template Examples Given And Then But When',
    contains: [
      {
        className: 'keyword',
        begin: '\\*'
      },
      {
        className: 'meta',
        begin: '@[^@\\s]+'
      },
      {
        begin: '\\|', end: '\\|\\w*$',
        contains: [
          {
            className: 'string',
            begin: '[^|]+'
          }
        ]
      },
      {
        className: 'variable',
        begin: '<', end: '>'
      },
      hljs.HASH_COMMENT_MODE,
      {
        className: 'string',
        begin: '"""', end: '"""'
      },
      hljs.QUOTE_STRING_MODE
    ]
  };
});

hljs.registerLanguage('glsl', function(hljs) {
  return {
    keywords: {
      keyword:
        // Statements
        'break continue discard do else for if return while' +
        // Qualifiers
        'attribute binding buffer ccw centroid centroid varying coherent column_major const cw ' +
        'depth_any depth_greater depth_less depth_unchanged early_fragment_tests equal_spacing ' +
        'flat fractional_even_spacing fractional_odd_spacing highp in index inout invariant ' +
        'invocations isolines layout line_strip lines lines_adjacency local_size_x local_size_y ' +
        'local_size_z location lowp max_vertices mediump noperspective offset origin_upper_left ' +
        'out packed patch pixel_center_integer point_mode points precise precision quads r11f_g11f_b10f '+
        'r16 r16_snorm r16f r16i r16ui r32f r32i r32ui r8 r8_snorm r8i r8ui readonly restrict ' +
        'rg16 rg16_snorm rg16f rg16i rg16ui rg32f rg32i rg32ui rg8 rg8_snorm rg8i rg8ui rgb10_a2 ' +
        'rgb10_a2ui rgba16 rgba16_snorm rgba16f rgba16i rgba16ui rgba32f rgba32i rgba32ui rgba8 ' +
        'rgba8_snorm rgba8i rgba8ui row_major sample shared smooth std140 std430 stream triangle_strip ' +
        'triangles triangles_adjacency uniform varying vertices volatile writeonly',
      type:
        'atomic_uint bool bvec2 bvec3 bvec4 dmat2 dmat2x2 dmat2x3 dmat2x4 dmat3 dmat3x2 dmat3x3 ' +
        'dmat3x4 dmat4 dmat4x2 dmat4x3 dmat4x4 double dvec2 dvec3 dvec4 float iimage1D iimage1DArray ' +
        'iimage2D iimage2DArray iimage2DMS iimage2DMSArray iimage2DRect iimage3D iimageBuffer' +
        'iimageCube iimageCubeArray image1D image1DArray image2D image2DArray image2DMS image2DMSArray ' +
        'image2DRect image3D imageBuffer imageCube imageCubeArray int isampler1D isampler1DArray ' +
        'isampler2D isampler2DArray isampler2DMS isampler2DMSArray isampler2DRect isampler3D ' +
        'isamplerBuffer isamplerCube isamplerCubeArray ivec2 ivec3 ivec4 mat2 mat2x2 mat2x3 ' +
        'mat2x4 mat3 mat3x2 mat3x3 mat3x4 mat4 mat4x2 mat4x3 mat4x4 sampler1D sampler1DArray ' +
        'sampler1DArrayShadow sampler1DShadow sampler2D sampler2DArray sampler2DArrayShadow ' +
        'sampler2DMS sampler2DMSArray sampler2DRect sampler2DRectShadow sampler2DShadow sampler3D ' +
        'samplerBuffer samplerCube samplerCubeArray samplerCubeArrayShadow samplerCubeShadow ' +
        'image1D uimage1DArray uimage2D uimage2DArray uimage2DMS uimage2DMSArray uimage2DRect ' +
        'uimage3D uimageBuffer uimageCube uimageCubeArray uint usampler1D usampler1DArray ' +
        'usampler2D usampler2DArray usampler2DMS usampler2DMSArray usampler2DRect usampler3D ' +
        'samplerBuffer usamplerCube usamplerCubeArray uvec2 uvec3 uvec4 vec2 vec3 vec4 void',
      built_in:
        // Constants
        'gl_MaxAtomicCounterBindings gl_MaxAtomicCounterBufferSize gl_MaxClipDistances gl_MaxClipPlanes ' +
        'gl_MaxCombinedAtomicCounterBuffers gl_MaxCombinedAtomicCounters gl_MaxCombinedImageUniforms ' +
        'gl_MaxCombinedImageUnitsAndFragmentOutputs gl_MaxCombinedTextureImageUnits gl_MaxComputeAtomicCounterBuffers ' +
        'gl_MaxComputeAtomicCounters gl_MaxComputeImageUniforms gl_MaxComputeTextureImageUnits ' +
        'gl_MaxComputeUniformComponents gl_MaxComputeWorkGroupCount gl_MaxComputeWorkGroupSize ' +
        'gl_MaxDrawBuffers gl_MaxFragmentAtomicCounterBuffers gl_MaxFragmentAtomicCounters ' +
        'gl_MaxFragmentImageUniforms gl_MaxFragmentInputComponents gl_MaxFragmentInputVectors ' +
        'gl_MaxFragmentUniformComponents gl_MaxFragmentUniformVectors gl_MaxGeometryAtomicCounterBuffers ' +
        'gl_MaxGeometryAtomicCounters gl_MaxGeometryImageUniforms gl_MaxGeometryInputComponents ' +
        'gl_MaxGeometryOutputComponents gl_MaxGeometryOutputVertices gl_MaxGeometryTextureImageUnits ' +
        'gl_MaxGeometryTotalOutputComponents gl_MaxGeometryUniformComponents gl_MaxGeometryVaryingComponents ' +
        'gl_MaxImageSamples gl_MaxImageUnits gl_MaxLights gl_MaxPatchVertices gl_MaxProgramTexelOffset ' +
        'gl_MaxTessControlAtomicCounterBuffers gl_MaxTessControlAtomicCounters gl_MaxTessControlImageUniforms ' +
        'gl_MaxTessControlInputComponents gl_MaxTessControlOutputComponents gl_MaxTessControlTextureImageUnits ' +
        'gl_MaxTessControlTotalOutputComponents gl_MaxTessControlUniformComponents ' +
        'gl_MaxTessEvaluationAtomicCounterBuffers gl_MaxTessEvaluationAtomicCounters ' +
        'gl_MaxTessEvaluationImageUniforms gl_MaxTessEvaluationInputComponents gl_MaxTessEvaluationOutputComponents ' +
        'gl_MaxTessEvaluationTextureImageUnits gl_MaxTessEvaluationUniformComponents ' +
        'gl_MaxTessGenLevel gl_MaxTessPatchComponents gl_MaxTextureCoords gl_MaxTextureImageUnits ' +
        'gl_MaxTextureUnits gl_MaxVaryingComponents gl_MaxVaryingFloats gl_MaxVaryingVectors ' +
        'gl_MaxVertexAtomicCounterBuffers gl_MaxVertexAtomicCounters gl_MaxVertexAttribs gl_MaxVertexImageUniforms ' +
        'gl_MaxVertexOutputComponents gl_MaxVertexOutputVectors gl_MaxVertexTextureImageUnits ' +
        'gl_MaxVertexUniformComponents gl_MaxVertexUniformVectors gl_MaxViewports gl_MinProgramTexelOffset ' +
        // Variables
        'gl_BackColor gl_BackLightModelProduct gl_BackLightProduct gl_BackMaterial ' +
        'gl_BackSecondaryColor gl_ClipDistance gl_ClipPlane gl_ClipVertex gl_Color ' +
        'gl_DepthRange gl_EyePlaneQ gl_EyePlaneR gl_EyePlaneS gl_EyePlaneT gl_Fog gl_FogCoord ' +
        'gl_FogFragCoord gl_FragColor gl_FragCoord gl_FragData gl_FragDepth gl_FrontColor ' +
        'gl_FrontFacing gl_FrontLightModelProduct gl_FrontLightProduct gl_FrontMaterial ' +
        'gl_FrontSecondaryColor gl_GlobalInvocationID gl_InstanceID gl_InvocationID gl_Layer gl_LightModel ' +
        'gl_LightSource gl_LocalInvocationID gl_LocalInvocationIndex gl_ModelViewMatrix ' +
        'gl_ModelViewMatrixInverse gl_ModelViewMatrixInverseTranspose gl_ModelViewMatrixTranspose ' +
        'gl_ModelViewProjectionMatrix gl_ModelViewProjectionMatrixInverse gl_ModelViewProjectionMatrixInverseTranspose ' +
        'gl_ModelViewProjectionMatrixTranspose gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 ' +
        'gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 ' +
        'gl_Normal gl_NormalMatrix gl_NormalScale gl_NumSamples gl_NumWorkGroups gl_ObjectPlaneQ ' +
        'gl_ObjectPlaneR gl_ObjectPlaneS gl_ObjectPlaneT gl_PatchVerticesIn gl_Point gl_PointCoord ' +
        'gl_PointSize gl_Position gl_PrimitiveID gl_PrimitiveIDIn gl_ProjectionMatrix gl_ProjectionMatrixInverse ' +
        'gl_ProjectionMatrixInverseTranspose gl_ProjectionMatrixTranspose gl_SampleID gl_SampleMask ' +
        'gl_SampleMaskIn gl_SamplePosition gl_SecondaryColor gl_TessCoord gl_TessLevelInner gl_TessLevelOuter ' +
        'gl_TexCoord gl_TextureEnvColor gl_TextureMatrix gl_TextureMatrixInverse gl_TextureMatrixInverseTranspose ' +
        'gl_TextureMatrixTranspose gl_Vertex gl_VertexID gl_ViewportIndex gl_WorkGroupID gl_WorkGroupSize gl_in gl_out ' +
        // Functions
        'EmitStreamVertex EmitVertex EndPrimitive EndStreamPrimitive abs acos acosh all any asin ' +
        'asinh atan atanh atomicAdd atomicAnd atomicCompSwap atomicCounter atomicCounterDecrement ' +
        'atomicCounterIncrement atomicExchange atomicMax atomicMin atomicOr atomicXor barrier ' +
        'bitCount bitfieldExtract bitfieldInsert bitfieldReverse ceil clamp cos cosh cross ' +
        'dFdx dFdy degrees determinant distance dot equal exp exp2 faceforward findLSB findMSB ' +
        'floatBitsToInt floatBitsToUint floor fma fract frexp ftransform fwidth greaterThan ' +
        'greaterThanEqual groupMemoryBarrier imageAtomicAdd imageAtomicAnd imageAtomicCompSwap ' +
        'imageAtomicExchange imageAtomicMax imageAtomicMin imageAtomicOr imageAtomicXor imageLoad ' +
        'imageSize imageStore imulExtended intBitsToFloat interpolateAtCentroid interpolateAtOffset ' +
        'interpolateAtSample inverse inversesqrt isinf isnan ldexp length lessThan lessThanEqual log ' +
        'log2 matrixCompMult max memoryBarrier memoryBarrierAtomicCounter memoryBarrierBuffer ' +
        'memoryBarrierImage memoryBarrierShared min mix mod modf noise1 noise2 noise3 noise4 ' +
        'normalize not notEqual outerProduct packDouble2x32 packHalf2x16 packSnorm2x16 packSnorm4x8 ' +
        'packUnorm2x16 packUnorm4x8 pow radians reflect refract round roundEven shadow1D shadow1DLod ' +
        'shadow1DProj shadow1DProjLod shadow2D shadow2DLod shadow2DProj shadow2DProjLod sign sin sinh ' +
        'smoothstep sqrt step tan tanh texelFetch texelFetchOffset texture texture1D texture1DLod ' +
        'texture1DProj texture1DProjLod texture2D texture2DLod texture2DProj texture2DProjLod ' +
        'texture3D texture3DLod texture3DProj texture3DProjLod textureCube textureCubeLod ' +
        'textureGather textureGatherOffset textureGatherOffsets textureGrad textureGradOffset ' +
        'textureLod textureLodOffset textureOffset textureProj textureProjGrad textureProjGradOffset ' +
        'textureProjLod textureProjLodOffset textureProjOffset textureQueryLevels textureQueryLod ' +
        'textureSize transpose trunc uaddCarry uintBitsToFloat umulExtended unpackDouble2x32 ' +
        'unpackHalf2x16 unpackSnorm2x16 unpackSnorm4x8 unpackUnorm2x16 unpackUnorm4x8 usubBorrow',
      literal: 'true false'
    },
    illegal: '"',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'meta',
        begin: '#', end: '$'
      }
    ]
  };
});

hljs.registerLanguage('go', function(hljs) {
  var GO_KEYWORDS = {
    keyword:
      'break default func interface select case map struct chan else goto package switch ' +
      'const fallthrough if range type continue for import return var go defer ' +
      'bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 ' +
      'uint16 uint32 uint64 int uint uintptr rune',
    literal:
       'true false iota nil',
    built_in:
      'append cap close complex copy imag len make new panic print println real recover delete'
  };
  return {
    aliases: ['golang'],
    keywords: GO_KEYWORDS,
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: '\'', end: '[^\\\\]\''
      },
      {
        className: 'string',
        begin: '`', end: '`'
      },
      {
        className: 'number',
        begin: hljs.C_NUMBER_RE + '[dflsi]?',
        relevance: 0
      },
      hljs.C_NUMBER_MODE
    ]
  };
});

hljs.registerLanguage('golo', function(hljs) {
    return {
      keywords: {
        keyword:
          'println readln print import module function local return let var ' +
          'while for foreach times in case when match with break continue ' +
          'augment augmentation each find filter reduce ' +
          'if then else otherwise try catch finally raise throw orIfNull ' +
          'DynamicObject|10 DynamicVariable struct Observable map set vector list array',
        literal:
          'true false null'
      },
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.C_NUMBER_MODE,
        {
          className: 'meta', begin: '@[A-Za-z]+'
        }
      ]
    }
});

hljs.registerLanguage('gradle', function(hljs) {
  return {
    case_insensitive: true,
    keywords: {
      keyword:
        'task project allprojects subprojects artifacts buildscript configurations ' +
        'dependencies repositories sourceSets description delete from into include ' +
        'exclude source classpath destinationDir includes options sourceCompatibility ' +
        'targetCompatibility group flatDir doLast doFirst flatten todir fromdir ant ' +
        'def abstract break case catch continue default do else extends final finally ' +
        'for if implements instanceof native new private protected public return static ' +
        'switch synchronized throw throws transient try volatile while strictfp package ' +
        'import false null super this true antlrtask checkstyle codenarc copy boolean ' +
        'byte char class double float int interface long short void compile runTime ' +
        'file fileTree abs any append asList asWritable call collect compareTo count ' +
        'div dump each eachByte eachFile eachLine every find findAll flatten getAt ' +
        'getErr getIn getOut getText grep immutable inject inspect intersect invokeMethods ' +
        'isCase join leftShift minus multiply newInputStream newOutputStream newPrintWriter ' +
        'newReader newWriter next plus pop power previous print println push putAt read ' +
        'readBytes readLines reverse reverseEach round size sort splitEachLine step subMap ' +
        'times toInteger toList tokenize upto waitForOrKill withPrintWriter withReader ' +
        'withStream withWriter withWriterAppend write writeLine'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      hljs.REGEXP_MODE

    ]
  }
});

hljs.registerLanguage('groovy', function(hljs) {
    return {
        keywords: {
            literal : 'true false null',
            keyword:
            'byte short char int long boolean float double void ' +
            // groovy specific keywords
            'def as in assert trait ' +
            // common keywords with Java
            'super this abstract static volatile transient public private protected synchronized final ' +
            'class interface enum if else for while switch case break default continue ' +
            'throw throws try catch finally implements extends new import package return instanceof'
        },

        contains: [
            hljs.COMMENT(
                '/\\*\\*',
                '\\*/',
                {
                    relevance : 0,
                    contains : [
                      {
                          // eat up @'s in emails to prevent them to be recognized as doctags
                          begin: /\w+@/, relevance: 0
                      },
                      {
                          className : 'doctag',
                          begin : '@[A-Za-z]+'
                      }
                    ]
                }
            ),
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            {
                className: 'string',
                begin: '"""', end: '"""'
            },
            {
                className: 'string',
                begin: "'''", end: "'''"
            },
            {
                className: 'string',
                begin: "\\$/", end: "/\\$",
                relevance: 10
            },
            hljs.APOS_STRING_MODE,
            {
                className: 'regexp',
                begin: /~?\/[^\/\n]+\//,
                contains: [
                    hljs.BACKSLASH_ESCAPE
                ]
            },
            hljs.QUOTE_STRING_MODE,
            {
                className: 'meta',
                begin: "^#!/usr/bin/env", end: '$',
                illegal: '\n'
            },
            hljs.BINARY_NUMBER_MODE,
            {
                className: 'class',
                beginKeywords: 'class interface trait enum', end: '{',
                illegal: ':',
                contains: [
                    {beginKeywords: 'extends implements'},
                    hljs.UNDERSCORE_TITLE_MODE,
                ]
            },
            hljs.C_NUMBER_MODE,
            {
                className: 'meta', begin: '@[A-Za-z]+'
            },
            {
                // highlight map keys and named parameters as strings
                className: 'string', begin: /[^\?]{0}[A-Za-z0-9_$]+ *:/
            },
            {
                // catch middle element of the ternary operator
                // to avoid highlight it as a label, named parameter, or map key
                begin: /\?/, end: /\:/
            },
            {
                // highlight labeled statements
                className: 'symbol', begin: '^\\s*[A-Za-z0-9_$]+:',
                relevance: 0
            },
        ],
        illegal: /#|<\//
    }
});

hljs.registerLanguage('haml', // TODO support filter tags like :javascript, support inline HTML
function(hljs) {
  return {
    case_insensitive: true,
    contains: [
      {
        className: 'meta',
        begin: '^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$',
        relevance: 10
      },
      // FIXME these comments should be allowed to span indented lines
      hljs.COMMENT(
        '^\\s*(!=#|=#|-#|/).*$',
        false,
        {
          relevance: 0
        }
      ),
      {
        begin: '^\\s*(-|=|!=)(?!#)',
        starts: {
          end: '\\n',
          subLanguage: 'ruby'
        }
      },
      {
        className: 'tag',
        begin: '^\\s*%',
        contains: [
          {
            className: 'selector-tag',
            begin: '\\w+'
          },
          {
            className: 'selector-id',
            begin: '#[\\w-]+'
          },
          {
            className: 'selector-class',
            begin: '\\.[\\w-]+'
          },
          {
            begin: '{\\s*',
            end: '\\s*}',
            contains: [
              {
                begin: ':\\w+\\s*=>',
                end: ',\\s+',
                returnBegin: true,
                endsWithParent: true,
                contains: [
                  {
                    className: 'attr',
                    begin: ':\\w+'
                  },
                  hljs.APOS_STRING_MODE,
                  hljs.QUOTE_STRING_MODE,
                  {
                    begin: '\\w+',
                    relevance: 0
                  }
                ]
              }
            ]
          },
          {
            begin: '\\(\\s*',
            end: '\\s*\\)',
            excludeEnd: true,
            contains: [
              {
                begin: '\\w+\\s*=',
                end: '\\s+',
                returnBegin: true,
                endsWithParent: true,
                contains: [
                  {
                    className: 'attr',
                    begin: '\\w+',
                    relevance: 0
                  },
                  hljs.APOS_STRING_MODE,
                  hljs.QUOTE_STRING_MODE,
                  {
                    begin: '\\w+',
                    relevance: 0
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        begin: '^\\s*[=~]\\s*'
      },
      {
        begin: '#{',
        starts: {
          end: '}',
          subLanguage: 'ruby'
        }
      }
    ]
  };
});

hljs.registerLanguage('handlebars', function(hljs) {
  var BUILT_INS = {'builtin-name': 'each in with if else unless bindattr action collection debugger log outlet template unbound view yield'};
  return {
    aliases: ['hbs', 'html.hbs', 'html.handlebars'],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
    hljs.COMMENT('{{!(--)?', '(--)?}}'),
      {
        className: 'template-tag',
        begin: /\{\{[#\/]/, end: /\}\}/,
        contains: [
          {
            className: 'name',
            begin: /[a-zA-Z\.-]+/,
            keywords: BUILT_INS,
            starts: {
              endsWithParent: true, relevance: 0,
              contains: [
                hljs.QUOTE_STRING_MODE
              ]
            }
          }
        ]
      },
      {
        className: 'template-variable',
        begin: /\{\{/, end: /\}\}/,
        keywords: BUILT_INS
      }
    ]
  };
});

hljs.registerLanguage('haskell', function(hljs) {
  var COMMENT = {
    variants: [
      hljs.COMMENT('--', '$'),
      hljs.COMMENT(
        '{-',
        '-}',
        {
          contains: ['self']
        }
      )
    ]
  };

  var PRAGMA = {
    className: 'meta',
    begin: '{-#', end: '#-}'
  };

  var PREPROCESSOR = {
    className: 'meta',
    begin: '^#', end: '$'
  };

  var CONSTRUCTOR = {
    className: 'type',
    begin: '\\b[A-Z][\\w\']*', // TODO: other constructors (build-in, infix).
    relevance: 0
  };

  var LIST = {
    begin: '\\(', end: '\\)',
    illegal: '"',
    contains: [
      PRAGMA,
      PREPROCESSOR,
      {className: 'type', begin: '\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?'},
      hljs.inherit(hljs.TITLE_MODE, {begin: '[_a-z][\\w\']*'}),
      COMMENT
    ]
  };

  var RECORD = {
    begin: '{', end: '}',
    contains: LIST.contains
  };

  return {
    aliases: ['hs'],
    keywords:
      'let in if then else case of where do module import hiding ' +
      'qualified type data newtype deriving class instance as default ' +
      'infix infixl infixr foreign export ccall stdcall cplusplus ' +
      'jvm dotnet safe unsafe family forall mdo proc rec',
    contains: [

      // Top-level constructions.

      {
        beginKeywords: 'module', end: 'where',
        keywords: 'module where',
        contains: [LIST, COMMENT],
        illegal: '\\W\\.|;'
      },
      {
        begin: '\\bimport\\b', end: '$',
        keywords: 'import qualified as hiding',
        contains: [LIST, COMMENT],
        illegal: '\\W\\.|;'
      },

      {
        className: 'class',
        begin: '^(\\s*)?(class|instance)\\b', end: 'where',
        keywords: 'class family instance where',
        contains: [CONSTRUCTOR, LIST, COMMENT]
      },
      {
        className: 'class',
        begin: '\\b(data|(new)?type)\\b', end: '$',
        keywords: 'data family type newtype deriving',
        contains: [PRAGMA, CONSTRUCTOR, LIST, RECORD, COMMENT]
      },
      {
        beginKeywords: 'default', end: '$',
        contains: [CONSTRUCTOR, LIST, COMMENT]
      },
      {
        beginKeywords: 'infix infixl infixr', end: '$',
        contains: [hljs.C_NUMBER_MODE, COMMENT]
      },
      {
        begin: '\\bforeign\\b', end: '$',
        keywords: 'foreign import export ccall stdcall cplusplus jvm ' +
                  'dotnet safe unsafe',
        contains: [CONSTRUCTOR, hljs.QUOTE_STRING_MODE, COMMENT]
      },
      {
        className: 'meta',
        begin: '#!\\/usr\\/bin\\/env\ runhaskell', end: '$'
      },

      // "Whitespaces".

      PRAGMA,
      PREPROCESSOR,

      // Literals and names.

      // TODO: characters.
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      CONSTRUCTOR,
      hljs.inherit(hljs.TITLE_MODE, {begin: '^[_a-z][\\w\']*'}),

      COMMENT,

      {begin: '->|<-'} // No markup, relevance booster
    ]
  };
});

hljs.registerLanguage('haxe', function(hljs) {
  var IDENT_RE = '[a-zA-Z_$][a-zA-Z0-9_$]*';
  var IDENT_FUNC_RETURN_TYPE_RE = '([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)';

  return {
    aliases: ['hx'],
    keywords: {
      keyword: 'break callback case cast catch class continue default do dynamic else enum extends extern ' +
    'for function here if implements import in inline interface never new override package private ' +
    'public return static super switch this throw trace try typedef untyped using var while',
      literal: 'true false null'
    },
    contains: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'class',
        beginKeywords: 'class interface', end: '{', excludeEnd: true,
        contains: [
          {
            beginKeywords: 'extends implements'
          },
          hljs.TITLE_MODE
        ]
      },
      {
        className: 'meta',
        begin: '#', end: '$',
        keywords: {'meta-keyword': 'if else elseif end error'}
      },
      {
        className: 'function',
        beginKeywords: 'function', end: '[{;]', excludeEnd: true,
        illegal: '\\S',
        contains: [
          hljs.TITLE_MODE,
          {
            className: 'params',
            begin: '\\(', end: '\\)',
            contains: [
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          {
            begin: ':\\s*' + IDENT_FUNC_RETURN_TYPE_RE
          }
        ]
      }
    ]
  };
});

hljs.registerLanguage('hsp', function(hljs) {
  return {
    case_insensitive: true,
    keywords: 'goto gosub return break repeat loop continue wait await dim sdim foreach dimtype dup dupptr end stop newmod delmod mref run exgoto on mcall assert logmes newlab resume yield onexit onerror onkey onclick oncmd exist delete mkdir chdir dirlist bload bsave bcopy memfile if else poke wpoke lpoke getstr chdpm memexpand memcpy memset notesel noteadd notedel noteload notesave randomize noteunsel noteget split strrep setease button chgdisp exec dialog mmload mmplay mmstop mci pset pget syscolor mes print title pos circle cls font sysfont objsize picload color palcolor palette redraw width gsel gcopy gzoom gmode bmpsave hsvcolor getkey listbox chkbox combox input mesbox buffer screen bgscr mouse objsel groll line clrobj boxf objprm objmode stick grect grotate gsquare gradf objimage objskip objenable celload celdiv celput newcom querycom delcom cnvstow comres axobj winobj sendmsg comevent comevarg sarrayconv callfunc cnvwtos comevdisp libptr system hspstat hspver stat cnt err strsize looplev sublev iparam wparam lparam refstr refdval int rnd strlen length length2 length3 length4 vartype gettime peek wpeek lpeek varptr varuse noteinfo instr abs limit getease str strmid strf getpath strtrim sin cos tan atan sqrt double absf expf logf limitf powf geteasef mousex mousey mousew hwnd hinstance hdc ginfo objinfo dirinfo sysinfo thismod __hspver__ __hsp30__ __date__ __time__ __line__ __file__ _debug __hspdef__ and or xor not screen_normal screen_palette screen_hide screen_fixedsize screen_tool screen_frame gmode_gdi gmode_mem gmode_rgb0 gmode_alpha gmode_rgb0alpha gmode_add gmode_sub gmode_pixela ginfo_mx ginfo_my ginfo_act ginfo_sel ginfo_wx1 ginfo_wy1 ginfo_wx2 ginfo_wy2 ginfo_vx ginfo_vy ginfo_sizex ginfo_sizey ginfo_winx ginfo_winy ginfo_mesx ginfo_mesy ginfo_r ginfo_g ginfo_b ginfo_paluse ginfo_dispx ginfo_dispy ginfo_cx ginfo_cy ginfo_intid ginfo_newid ginfo_sx ginfo_sy objinfo_mode objinfo_bmscr objinfo_hwnd notemax notesize dir_cur dir_exe dir_win dir_sys dir_cmdline dir_desktop dir_mydoc dir_tv font_normal font_bold font_italic font_underline font_strikeout font_antialias objmode_normal objmode_guifont objmode_usefont gsquare_grad msgothic msmincho do until while wend for next _break _continue switch case default swbreak swend ddim ldim alloc m_pi rad2deg deg2rad ease_linear ease_quad_in ease_quad_out ease_quad_inout ease_cubic_in ease_cubic_out ease_cubic_inout ease_quartic_in ease_quartic_out ease_quartic_inout ease_bounce_in ease_bounce_out ease_bounce_inout ease_shake_in ease_shake_out ease_shake_inout ease_loop',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,

      {
        // multi-line string
        className: 'string',
        begin: '{"', end: '"}',
        contains: [hljs.BACKSLASH_ESCAPE]
      },

      hljs.COMMENT(';', '$'),

      {
        // pre-processor
        className: 'meta',
        begin: '#', end: '$',
        keywords: {'meta-keyword': 'addion cfunc cmd cmpopt comfunc const defcfunc deffunc define else endif enum epack func global if ifdef ifndef include modcfunc modfunc modinit modterm module pack packopt regcmd runtime undef usecom uselib'},
        contains: [
          hljs.inherit(hljs.QUOTE_STRING_MODE, {className: 'meta-string'}),
          hljs.NUMBER_MODE,
          hljs.C_NUMBER_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },

      {
        // label
        className: 'symbol',
        begin: '^\\*(\\w+|@)'
      },

      hljs.NUMBER_MODE,
      hljs.C_NUMBER_MODE
    ]
  };
});

hljs.registerLanguage('http', function(hljs) {
  var VERSION = 'HTTP/[0-9\\.]+';
  return {
    aliases: ['https'],
    illegal: '\\S',
    contains: [
      {
        begin: '^' + VERSION, end: '$',
        contains: [{className: 'number', begin: '\\b\\d{3}\\b'}]
      },
      {
        begin: '^[A-Z]+ (.*?) ' + VERSION + '$', returnBegin: true, end: '$',
        contains: [
          {
            className: 'string',
            begin: ' ', end: ' ',
            excludeBegin: true, excludeEnd: true
          },
          {
            begin: VERSION
          },
          {
            className: 'keyword',
            begin: '[A-Z]+'
          }
        ]
      },
      {
        className: 'attribute',
        begin: '^\\w', end: ': ', excludeEnd: true,
        illegal: '\\n|\\s|=',
        starts: {end: '$', relevance: 0}
      },
      {
        begin: '\\n\\n',
        starts: {subLanguage: [], endsWithParent: true}
      }
    ]
  };
});

hljs.registerLanguage('inform7', function(hljs) {
  var START_BRACKET = '\\[';
  var END_BRACKET = '\\]';
  return {
    aliases: ['i7'],
    case_insensitive: true,
    keywords: {
      // Some keywords more or less unique to I7, for relevance.
      keyword:
        // kind:
        'thing room person man woman animal container ' +
        'supporter backdrop door ' +
        // characteristic:
        'scenery open closed locked inside gender ' +
        // verb:
        'is are say understand ' +
        // misc keyword:
        'kind of rule'
    },
    contains: [
      {
        className: 'string',
        begin: '"', end: '"',
        relevance: 0,
        contains: [
          {
            className: 'subst',
            begin: START_BRACKET, end: END_BRACKET
          }
        ]
      },
      {
        className: 'section',
        begin: /^(Volume|Book|Part|Chapter|Section|Table)\b/,
        end: '$'
      },
      {
        // Rule definition
        // This is here for relevance.
        begin: /^(Check|Carry out|Report|Instead of|To|Rule|When|Before|After)\b/,
        end: ':',
        contains: [
          {
            //Rule name
            begin: '\\(This', end: '\\)'
          }
        ]
      },
      {
        className: 'comment',
        begin: START_BRACKET, end: END_BRACKET,
        contains: ['self']
      }
    ]
  };
});

hljs.registerLanguage('ini', function(hljs) {
  var STRING = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: "'''", end: "'''",
        relevance: 10
      }, {
        begin: '"""', end: '"""',
        relevance: 10
      }, {
        begin: '"', end: '"'
      }, {
        begin: "'", end: "'"
      }
    ]
  };
  return {
    aliases: ['toml'],
    case_insensitive: true,
    illegal: /\S/,
    contains: [
      hljs.COMMENT(';', '$'),
      hljs.HASH_COMMENT_MODE,
      {
        className: 'section',
        begin: /^\s*\[+/, end: /\]+/
      },
      {
        begin: /^[a-z0-9\[\]_-]+\s*=\s*/, end: '$',
        returnBegin: true,
        contains: [
          {
            className: 'attr',
            begin: /[a-z0-9\[\]_-]+/
          },
          {
            begin: /=/, endsWithParent: true,
            relevance: 0,
            contains: [
              {
                className: 'literal',
                begin: /\bon|off|true|false|yes|no\b/
              },
              {
                className: 'variable',
                variants: [
                  {begin: /\$[\w\d"][\w\d_]*/},
                  {begin: /\$\{(.*?)}/}
                ]
              },
              STRING,
              {
                className: 'number',
                begin: /([\+\-]+)?[\d]+_[\d_]+/
              },
              hljs.NUMBER_MODE
            ]
          }
        ]
      }
    ]
  };
});

hljs.registerLanguage('irpf90', function(hljs) {
  var PARAMS = {
    className: 'params',
    begin: '\\(', end: '\\)'
  };

  var F_KEYWORDS = {
    literal: '.False. .True.',
    keyword: 'kind do while private call intrinsic where elsewhere ' +
      'type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then ' +
      'public subroutine|10 function program .and. .or. .not. .le. .eq. .ge. .gt. .lt. ' +
      'goto save else use module select case ' +
      'access blank direct exist file fmt form formatted iostat name named nextrec number opened rec recl sequential status unformatted unit ' +
      'continue format pause cycle exit ' +
      'c_null_char c_alert c_backspace c_form_feed flush wait decimal round iomsg ' +
      'synchronous nopass non_overridable pass protected volatile abstract extends import ' +
      'non_intrinsic value deferred generic final enumerator class associate bind enum ' +
      'c_int c_short c_long c_long_long c_signed_char c_size_t c_int8_t c_int16_t c_int32_t c_int64_t c_int_least8_t c_int_least16_t ' +
      'c_int_least32_t c_int_least64_t c_int_fast8_t c_int_fast16_t c_int_fast32_t c_int_fast64_t c_intmax_t C_intptr_t c_float c_double ' +
      'c_long_double c_float_complex c_double_complex c_long_double_complex c_bool c_char c_null_ptr c_null_funptr ' +
      'c_new_line c_carriage_return c_horizontal_tab c_vertical_tab iso_c_binding c_loc c_funloc c_associated  c_f_pointer ' +
      'c_ptr c_funptr iso_fortran_env character_storage_size error_unit file_storage_size input_unit iostat_end iostat_eor ' +
      'numeric_storage_size output_unit c_f_procpointer ieee_arithmetic ieee_support_underflow_control ' +
      'ieee_get_underflow_mode ieee_set_underflow_mode newunit contiguous recursive ' +
      'pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure ' +
      'integer real character complex logical dimension allocatable|10 parameter ' +
      'external implicit|10 none double precision assign intent optional pointer ' +
      'target in out common equivalence data ' +
      // IRPF90 special keywords
      'begin_provider &begin_provider end_provider begin_shell end_shell begin_template end_template subst assert touch ' +
      'soft_touch provide no_dep free irp_if irp_else irp_endif irp_write irp_read',
    built_in: 'alog alog10 amax0 amax1 amin0 amin1 amod cabs ccos cexp clog csin csqrt dabs dacos dasin datan datan2 dcos dcosh ddim dexp dint ' +
      'dlog dlog10 dmax1 dmin1 dmod dnint dsign dsin dsinh dsqrt dtan dtanh float iabs idim idint idnint ifix isign max0 max1 min0 min1 sngl ' +
      'algama cdabs cdcos cdexp cdlog cdsin cdsqrt cqabs cqcos cqexp cqlog cqsin cqsqrt dcmplx dconjg derf derfc dfloat dgamma dimag dlgama ' +
      'iqint qabs qacos qasin qatan qatan2 qcmplx qconjg qcos qcosh qdim qerf qerfc qexp qgamma qimag qlgama qlog qlog10 qmax1 qmin1 qmod ' +
      'qnint qsign qsin qsinh qsqrt qtan qtanh abs acos aimag aint anint asin atan atan2 char cmplx conjg cos cosh exp ichar index int log ' +
      'log10 max min nint sign sin sinh sqrt tan tanh print write dim lge lgt lle llt mod nullify allocate deallocate ' +
      'adjustl adjustr all allocated any associated bit_size btest ceiling count cshift date_and_time digits dot_product ' +
      'eoshift epsilon exponent floor fraction huge iand ibclr ibits ibset ieor ior ishft ishftc lbound len_trim matmul ' +
      'maxexponent maxloc maxval merge minexponent minloc minval modulo mvbits nearest pack present product ' +
      'radix random_number random_seed range repeat reshape rrspacing scale scan selected_int_kind selected_real_kind ' +
      'set_exponent shape size spacing spread sum system_clock tiny transpose trim ubound unpack verify achar iachar transfer ' +
      'dble entry dprod cpu_time command_argument_count get_command get_command_argument get_environment_variable is_iostat_end ' +
      'ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode ' +
      'is_iostat_eor move_alloc new_line selected_char_kind same_type_as extends_type_of'  +
      'acosh asinh atanh bessel_j0 bessel_j1 bessel_jn bessel_y0 bessel_y1 bessel_yn erf erfc erfc_scaled gamma log_gamma hypot norm2 ' +
      'atomic_define atomic_ref execute_command_line leadz trailz storage_size merge_bits ' +
      'bge bgt ble blt dshiftl dshiftr findloc iall iany iparity image_index lcobound ucobound maskl maskr ' +
      'num_images parity popcnt poppar shifta shiftl shiftr this_image ' +
      // IRPF90 special built_ins
      'IRP_ALIGN irp_here'
  };
  return {
    case_insensitive: true,
    keywords: F_KEYWORDS,
    illegal: /\/\*/,
    contains: [
      hljs.inherit(hljs.APOS_STRING_MODE, {className: 'string', relevance: 0}),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {className: 'string', relevance: 0}),
      {
        className: 'function',
        beginKeywords: 'subroutine function program',
        illegal: '[${=\\n]',
        contains: [hljs.UNDERSCORE_TITLE_MODE, PARAMS]
      },
      hljs.COMMENT('!', '$', {relevance: 0}),
      hljs.COMMENT('begin_doc', 'end_doc', {relevance: 10}),
      {
        className: 'number',
        begin: '(?=\\b|\\+|\\-|\\.)(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*)(?:[de][+-]?\\d+)?\\b\\.?',
        relevance: 0
      }
    ]
  };
});

hljs.registerLanguage('java', function(hljs) {
  var GENERIC_IDENT_RE = hljs.UNDERSCORE_IDENT_RE + '(<' + hljs.UNDERSCORE_IDENT_RE + '(\\s*,\\s*' + hljs.UNDERSCORE_IDENT_RE + ')*>)?';
  var KEYWORDS =
    'false synchronized int abstract float private char boolean static null if const ' +
    'for true while long strictfp finally protected import native final void ' +
    'enum else break transient catch instanceof byte super volatile case assert short ' +
    'package default double public try this switch continue throws protected public private';

  // https://docs.oracle.com/javase/7/docs/technotes/guides/language/underscores-literals.html
  var JAVA_NUMBER_RE = '\\b' +
    '(' +
      '0[bB]([01]+[01_]+[01]+|[01]+)' + // 0b...
      '|' +
      '0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)' + // 0x...
      '|' +
      '(' +
        '([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?' +
        '|' +
        '\\.([\\d]+[\\d_]+[\\d]+|[\\d]+)' +
      ')' +
      '([eE][-+]?\\d+)?' + // octal, decimal, float
    ')' +
    '[lLfF]?';
  var JAVA_NUMBER_MODE = {
    className: 'number',
    begin: JAVA_NUMBER_RE,
    relevance: 0
  };

  return {
    aliases: ['jsp'],
    keywords: KEYWORDS,
    illegal: /<\/|#/,
    contains: [
      hljs.COMMENT(
        '/\\*\\*',
        '\\*/',
        {
          relevance : 0,
          contains : [
            {
              // eat up @'s in emails to prevent them to be recognized as doctags
              begin: /\w+@/, relevance: 0
            },
            {
              className : 'doctag',
              begin : '@[A-Za-z]+'
            }
          ]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'class',
        beginKeywords: 'class interface', end: /[{;=]/, excludeEnd: true,
        keywords: 'class interface',
        illegal: /[:"\[\]]/,
        contains: [
          {beginKeywords: 'extends implements'},
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: 'new throw return else',
        relevance: 0
      },
      {
        className: 'function',
        begin: '(' + GENERIC_IDENT_RE + '\\s+)+' + hljs.UNDERSCORE_IDENT_RE + '\\s*\\(', returnBegin: true, end: /[{;=]/,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          {
            begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(', returnBegin: true,
            relevance: 0,
            contains: [hljs.UNDERSCORE_TITLE_MODE]
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.C_NUMBER_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      JAVA_NUMBER_MODE,
      {
        className: 'meta', begin: '@[A-Za-z]+'
      }
    ]
  };
});

hljs.registerLanguage('javascript', function(hljs) {
  return {
    aliases: ['js'],
    keywords: {
      keyword:
        'in of if for while finally var new function do return void else break catch ' +
        'instanceof with throw case default try this switch continue typeof delete ' +
        'let yield const export super debugger as async await ' +
        // ECMAScript 6 modules import
        'import from as'
      ,
      literal:
        'true false null undefined NaN Infinity',
      built_in:
        'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' +
        'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' +
        'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' +
        'TypeError URIError Number Math Date String RegExp Array Float32Array ' +
        'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' +
        'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' +
        'module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect ' +
        'Promise'
    },
    contains: [
      {
        className: 'meta',
        relevance: 10,
        begin: /^\s*['"]use (strict|asm)['"]/
      },
      {
        className: 'meta',
        begin: /^#!/, end: /$/
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      { // template string
        className: 'string',
        begin: '`', end: '`',
        contains: [
          hljs.BACKSLASH_ESCAPE,
          {
            className: 'subst',
            begin: '\\$\\{', end: '\\}'
          }
        ]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'number',
        variants: [
          { begin: '\\b(0[bB][01]+)' },
          { begin: '\\b(0[oO][0-7]+)' },
          { begin: hljs.C_NUMBER_RE }
        ],
        relevance: 0
      },
      { // "value" container
        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
        keywords: 'return throw case',
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.REGEXP_MODE,
          { // E4X / JSX
            begin: /</, end: />\s*[);\]]/,
            relevance: 0,
            subLanguage: 'xml'
          }
        ],
        relevance: 0
      },
      {
        className: 'function',
        beginKeywords: 'function', end: /\{/, excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {begin: /[A-Za-z$_][0-9A-Za-z$_]*/}),
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            contains: [
              hljs.C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          }
        ],
        illegal: /\[|%/
      },
      {
        begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      },
      {
        begin: '\\.' + hljs.IDENT_RE, relevance: 0 // hack: prevents detection of keywords after dots
      },
      { // ES6 class
        className: 'class',
        beginKeywords: 'class', end: /[{;=]/, excludeEnd: true,
        illegal: /[:"\[\]]/,
        contains: [
          {beginKeywords: 'extends'},
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        beginKeywords: 'constructor', end: /\{/, excludeEnd: true
      }
    ],
    illegal: /#(?!!)/
  };
});

hljs.registerLanguage('json', function(hljs) {
  var LITERALS = {literal: 'true false null'};
  var TYPES = [
    hljs.QUOTE_STRING_MODE,
    hljs.C_NUMBER_MODE
  ];
  var VALUE_CONTAINER = {
    end: ',', endsWithParent: true, excludeEnd: true,
    contains: TYPES,
    keywords: LITERALS
  };
  var OBJECT = {
    begin: '{', end: '}',
    contains: [
      {
        className: 'attr',
        begin: '\\s*"', end: '"\\s*:\\s*', excludeBegin: true, excludeEnd: true,
        contains: [hljs.BACKSLASH_ESCAPE],
        illegal: '\\n',
        starts: VALUE_CONTAINER
      }
    ],
    illegal: '\\S'
  };
  var ARRAY = {
    begin: '\\[', end: '\\]',
    contains: [hljs.inherit(VALUE_CONTAINER)], // inherit is a workaround for a bug that makes shared modes with endsWithParent compile only the ending of one of the parents
    illegal: '\\S'
  };
  TYPES.splice(TYPES.length, 0, OBJECT, ARRAY);
  return {
    contains: TYPES,
    keywords: LITERALS,
    illegal: '\\S'
  };
});

hljs.registerLanguage('julia', function(hljs) {
  // Since there are numerous special names in Julia, it is too much trouble
  // to maintain them by hand. Hence these names (i.e. keywords, literals and
  // built-ins) are automatically generated from Julia (v0.3.0 and v0.4.1)
  // itself through following scripts for each.

  var KEYWORDS = {
    // # keyword generator
    // println("in")
    // for kw in Base.REPLCompletions.complete_keyword("")
    //     println(kw)
    // end
    keyword:
      'in abstract baremodule begin bitstype break catch ccall const continue do else elseif end export ' +
      'finally for function global if immutable import importall let local macro module quote return try type ' +
      'typealias using while',

    // # literal generator
    // println("true")
    // println("false")
    // for name in Base.REPLCompletions.completions("", 0)[1]
    //     try
    //         s = symbol(name)
    //         v = eval(s)
    //         if !isa(v, Function) &&
    //            !isa(v, DataType) &&
    //            !isa(v, IntrinsicFunction) &&
    //            !issubtype(typeof(v), Tuple) &&
    //            !isa(v, Union) &&
    //            !isa(v, Module) &&
    //            !isa(v, TypeConstructor) &&
    //            !isa(v, TypeVar) &&
    //            !isa(v, Colon)
    //             println(name)
    //         end
    //     end
    // end
    literal:
      // v0.3
      'true false ARGS CPU_CORES C_NULL DL_LOAD_PATH DevNull ENDIAN_BOM ENV I|0 Inf Inf16 Inf32 ' +
      'InsertionSort JULIA_HOME LOAD_PATH MS_ASYNC MS_INVALIDATE MS_SYNC MergeSort NaN NaN16 NaN32 OS_NAME QuickSort ' +
      'RTLD_DEEPBIND RTLD_FIRST RTLD_GLOBAL RTLD_LAZY RTLD_LOCAL RTLD_NODELETE RTLD_NOLOAD RTLD_NOW RoundDown ' +
      'RoundFromZero RoundNearest RoundToZero RoundUp STDERR STDIN STDOUT VERSION WORD_SIZE catalan cglobal e|0 eu|0 ' +
      'eulergamma golden im nothing pi γ π φ ' +
      // v0.4 (diff)
      'Inf64 NaN64 RoundNearestTiesAway RoundNearestTiesUp ',

    // # built_in generator:
    // for name in Base.REPLCompletions.completions("", 0)[1]
    //     try
    //         v = eval(symbol(name))
    //         if isa(v, DataType) || isa(v, TypeConstructor) || isa(v, TypeVar)
    //             println(name)
    //         end
    //     end
    // end
    built_in:
      // v0.3
      'ANY ASCIIString AbstractArray AbstractRNG AbstractSparseArray Any ArgumentError Array Associative Base64Pipe ' +
      'Bidiagonal BigFloat BigInt BitArray BitMatrix BitVector Bool BoundsError Box CFILE Cchar Cdouble Cfloat Char ' +
      'CharString Cint Clong Clonglong ClusterManager Cmd Coff_t Colon Complex Complex128 Complex32 Complex64 ' +
      'Condition Cptrdiff_t Cshort Csize_t Cssize_t Cuchar Cuint Culong Culonglong Cushort Cwchar_t DArray DataType ' +
      'DenseArray Diagonal Dict DimensionMismatch DirectIndexString Display DivideError DomainError EOFError ' +
      'EachLine Enumerate ErrorException Exception Expr Factorization FileMonitor FileOffset Filter Float16 Float32 ' +
      'Float64 FloatRange FloatingPoint Function GetfieldNode GotoNode Hermitian IO IOBuffer IOStream IPv4 IPv6 ' +
      'InexactError Int Int128 Int16 Int32 Int64 Int8 IntSet Integer InterruptException IntrinsicFunction KeyError ' +
      'LabelNode LambdaStaticData LineNumberNode LoadError LocalProcess MIME MathConst MemoryError MersenneTwister ' +
      'Method MethodError MethodTable Module NTuple NewvarNode Nothing Number ObjectIdDict OrdinalRange ' +
      'OverflowError ParseError PollingFileWatcher ProcessExitedException ProcessGroup Ptr QuoteNode Range Range1 ' +
      'Ranges Rational RawFD Real Regex RegexMatch RemoteRef RepString RevString RopeString RoundingMode Set ' +
      'SharedArray Signed SparseMatrixCSC StackOverflowError Stat StatStruct StepRange String SubArray SubString ' +
      'SymTridiagonal Symbol SymbolNode Symmetric SystemError Task TextDisplay Timer TmStruct TopNode Triangular ' +
      'Tridiagonal Type TypeConstructor TypeError TypeName TypeVar UTF16String UTF32String UTF8String UdpSocket ' +
      'Uint Uint128 Uint16 Uint32 Uint64 Uint8 UndefRefError UndefVarError UniformScaling UnionType UnitRange ' +
      'Unsigned Vararg VersionNumber WString WeakKeyDict WeakRef Woodbury Zip ' +
      // v0.4 (diff)
      'AbstractChannel AbstractFloat AbstractString AssertionError Base64DecodePipe Base64EncodePipe BufferStream ' +
      'CapturedException CartesianIndex CartesianRange Channel Cintmax_t CompositeException Cstring Cuintmax_t ' +
      'Cwstring Date DateTime Dims Enum GenSym GlobalRef HTML InitError InvalidStateException Irrational LinSpace ' +
      'LowerTriangular NullException Nullable OutOfMemoryError Pair PartialQuickSort Pipe RandomDevice ' +
      'ReadOnlyMemoryError ReentrantLock Ref RemoteException SegmentationFault SerializationState SimpleVector ' +
      'TCPSocket Text Tuple UDPSocket UInt UInt128 UInt16 UInt32 UInt64 UInt8 UnicodeError Union UpperTriangular ' +
      'Val Void WorkerConfig AbstractMatrix AbstractSparseMatrix AbstractSparseVector AbstractVecOrMat AbstractVector ' +
      'DenseMatrix DenseVecOrMat DenseVector Matrix SharedMatrix SharedVector StridedArray StridedMatrix ' +
      'StridedVecOrMat StridedVector VecOrMat Vector '
  };

  // ref: http://julia.readthedocs.org/en/latest/manual/variables/#allowed-variable-names
  var VARIABLE_NAME_RE = '[A-Za-z_\\u00A1-\\uFFFF][A-Za-z_0-9\\u00A1-\\uFFFF]*';

  // placeholder for recursive self-reference
  var DEFAULT = { lexemes: VARIABLE_NAME_RE, keywords: KEYWORDS, illegal: /<\// };

  var TYPE_ANNOTATION = {
    className: 'type',
    begin: /::/
  };

  var SUBTYPE = {
    className: 'type',
    begin: /<:/
  };

  // ref: http://julia.readthedocs.org/en/latest/manual/integers-and-floating-point-numbers/
  var NUMBER = {
    className: 'number',
    // supported numeric literals:
    //  * binary literal (e.g. 0x10)
    //  * octal literal (e.g. 0o76543210)
    //  * hexadecimal literal (e.g. 0xfedcba876543210)
    //  * hexadecimal floating point literal (e.g. 0x1p0, 0x1.2p2)
    //  * decimal literal (e.g. 9876543210, 100_000_000)
    //  * floating pointe literal (e.g. 1.2, 1.2f, .2, 1., 1.2e10, 1.2e-10)
    begin: /(\b0x[\d_]*(\.[\d_]*)?|0x\.\d[\d_]*)p[-+]?\d+|\b0[box][a-fA-F0-9][a-fA-F0-9_]*|(\b\d[\d_]*(\.[\d_]*)?|\.\d[\d_]*)([eEfF][-+]?\d+)?/,
    relevance: 0
  };

  var CHAR = {
    className: 'string',
    begin: /'(.|\\[xXuU][a-zA-Z0-9]+)'/
  };

  var INTERPOLATION = {
    className: 'subst',
    begin: /\$\(/, end: /\)/,
    keywords: KEYWORDS
  };

  var INTERPOLATED_VARIABLE = {
    className: 'variable',
    begin: '\\$' + VARIABLE_NAME_RE
  };

  // TODO: neatly escape normal code in string literal
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, INTERPOLATION, INTERPOLATED_VARIABLE],
    variants: [
      { begin: /\w*"""/, end: /"""\w*/, relevance: 10 },
      { begin: /\w*"/, end: /"\w*/ }
    ]
  };

  var COMMAND = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, INTERPOLATION, INTERPOLATED_VARIABLE],
    begin: '`', end: '`'
  };

  var MACROCALL = {
    className: 'meta',
    begin: '@' + VARIABLE_NAME_RE
  };

  var COMMENT = {
    className: 'comment',
    variants: [
      { begin: '#=', end: '=#', relevance: 10 },
      { begin: '#', end: '$' }
    ]
  };

  DEFAULT.contains = [
    NUMBER,
    CHAR,
    TYPE_ANNOTATION,
    SUBTYPE,
    STRING,
    COMMAND,
    MACROCALL,
    COMMENT,
    hljs.HASH_COMMENT_MODE
  ];
  INTERPOLATION.contains = DEFAULT.contains;

  return DEFAULT;
});

hljs.registerLanguage('kotlin', function (hljs) {
  var KEYWORDS = 'val var get set class trait object open private protected public ' +
    'final enum if else do while for when break continue throw try catch finally ' +
    'import package is as in return fun override default companion reified inline volatile transient native ' +
    'Byte Short Char Int Long Boolean Float Double Void Unit Nothing';

  return {
    keywords: {
      keyword: KEYWORDS,
      literal: 'true false null'
    },
    contains : [
      hljs.COMMENT(
        '/\\*\\*',
        '\\*/',
        {
          relevance : 0,
          contains : [{
            className : 'doctag',
            begin : '@[A-Za-z]+'
          }]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'type',
        begin: /</, end: />/,
        returnBegin: true,
        excludeEnd: false,
        relevance: 0
      },
      {
        className: 'function',
        beginKeywords: 'fun', end: '[(]|$',
        returnBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS,
        illegal: /fun\s+(<.*>)?[^\s\(]+(\s+[^\s\(]+)\s*=/,
        relevance: 5,
        contains: [
          {
            begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(', returnBegin: true,
            relevance: 0,
            contains: [hljs.UNDERSCORE_TITLE_MODE]
          },
          {
            className: 'type',
            begin: /</, end: />/, keywords: 'reified',
            relevance: 0
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            keywords: KEYWORDS,
            relevance: 0,
            illegal: /\([^\(,\s:]+,/,
            contains: [
              {
                className: 'type',
                begin: /:\s*/, end: /\s*[=\)]/, excludeBegin: true, returnEnd: true,
                relevance: 0
              }
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        className: 'class',
        beginKeywords: 'class trait', end: /[:\{(]|$/,
        excludeEnd: true,
        illegal: 'extends implements',
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: 'type',
            begin: /</, end: />/, excludeBegin: true, excludeEnd: true,
            relevance: 0
          },
          {
            className: 'type',
            begin: /[,:]\s*/, end: /[<\(,]|$/, excludeBegin: true, returnEnd: true
          }
        ]
      },
      {
        className: 'variable', beginKeywords: 'var val', end: /\s*[=:$]/, excludeEnd: true
      },
      hljs.QUOTE_STRING_MODE,
      {
        className: 'meta',
        begin: "^#!/usr/bin/env", end: '$',
        illegal: '\n'
      },
      hljs.C_NUMBER_MODE
    ]
  };
});

hljs.registerLanguage('lasso', function(hljs) {
  var LASSO_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_.]*';
  var LASSO_ANGLE_RE = '<\\?(lasso(script)?|=)';
  var LASSO_CLOSE_RE = '\\]|\\?>';
  var LASSO_KEYWORDS = {
    literal:
      'true false none minimal full all void ' +
      'bw nbw ew new cn ncn lt lte gt gte eq neq rx nrx ft',
    built_in:
      'array date decimal duration integer map pair string tag xml null ' +
      'boolean bytes keyword list locale queue set stack staticarray ' +
      'local var variable global data self inherited currentcapture givenblock',
    keyword:
      'error_code error_msg error_pop error_push error_reset cache ' +
      'database_names database_schemanames database_tablenames define_tag ' +
      'define_type email_batch encode_set html_comment handle handle_error ' +
      'header if inline iterate ljax_target link link_currentaction ' +
      'link_currentgroup link_currentrecord link_detail link_firstgroup ' +
      'link_firstrecord link_lastgroup link_lastrecord link_nextgroup ' +
      'link_nextrecord link_prevgroup link_prevrecord log loop ' +
      'namespace_using output_none portal private protect records referer ' +
      'referrer repeating resultset rows search_args search_arguments ' +
      'select sort_args sort_arguments thread_atomic value_list while ' +
      'abort case else if_empty if_false if_null if_true loop_abort ' +
      'loop_continue loop_count params params_up return return_value ' +
      'run_children soap_definetag soap_lastrequest soap_lastresponse ' +
      'tag_name ascending average by define descending do equals ' +
      'frozen group handle_failure import in into join let match max ' +
      'min on order parent protected provide public require returnhome ' +
      'skip split_thread sum take thread to trait type where with ' +
      'yield yieldhome and or not'
  };
  var HTML_COMMENT = hljs.COMMENT(
    '<!--',
    '-->',
    {
      relevance: 0
    }
  );
  var LASSO_NOPROCESS = {
    className: 'meta',
    begin: '\\[noprocess\\]',
    starts: {
      end: '\\[/noprocess\\]',
      returnEnd: true,
      contains: [HTML_COMMENT]
    }
  };
  var LASSO_START = {
    className: 'meta',
    begin: '\\[/noprocess|' + LASSO_ANGLE_RE
  };
  var LASSO_DATAMEMBER = {
    className: 'symbol',
    begin: '\'' + LASSO_IDENT_RE + '\''
  };
  var LASSO_CODE = [
    hljs.COMMENT(
      '/\\*\\*!',
      '\\*/'
    ),
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.inherit(hljs.C_NUMBER_MODE, {begin: hljs.C_NUMBER_RE + '|(infinity|nan)\\b'}),
    hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),
    hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),
    {
      className: 'string',
      begin: '`', end: '`'
    },
    { // variables
      variants: [
        {
          begin: '[#$]' + LASSO_IDENT_RE
        },
        {
          begin: '#', end: '\\d+',
          illegal: '\\W'
        }
      ]
    },
    {
      className: 'type',
      begin: '::\\s*', end: LASSO_IDENT_RE,
      illegal: '\\W'
    },
    {
      className: 'attr',
      variants: [
        {
          begin: '-(?!infinity)' + hljs.UNDERSCORE_IDENT_RE,
          relevance: 0
        },
        {
          begin: '(\\.\\.\\.)'
        }
      ]
    },
    {
      begin: /(->|\.\.?)\s*/,
      relevance: 0,
      contains: [LASSO_DATAMEMBER]
    },
    {
      className: 'class',
      beginKeywords: 'define',
      returnEnd: true, end: '\\(|=>',
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {begin: hljs.UNDERSCORE_IDENT_RE + '(=(?!>))?'})
      ]
    }
  ];
  return {
    aliases: ['ls', 'lassoscript'],
    case_insensitive: true,
    lexemes: LASSO_IDENT_RE + '|&[lg]t;',
    keywords: LASSO_KEYWORDS,
    contains: [
      {
        className: 'meta',
        begin: LASSO_CLOSE_RE,
        relevance: 0,
        starts: { // markup
          end: '\\[|' + LASSO_ANGLE_RE,
          returnEnd: true,
          relevance: 0,
          contains: [HTML_COMMENT]
        }
      },
      LASSO_NOPROCESS,
      LASSO_START,
      {
        className: 'meta',
        begin: '\\[no_square_brackets',
        starts: {
          end: '\\[/no_square_brackets\\]', // not implemented in the language
          lexemes: LASSO_IDENT_RE + '|&[lg]t;',
          keywords: LASSO_KEYWORDS,
          contains: [
            {
              className: 'meta',
              begin: LASSO_CLOSE_RE,
              relevance: 0,
              starts: {
                end: '\\[noprocess\\]|' + LASSO_ANGLE_RE,
                returnEnd: true,
                contains: [HTML_COMMENT]
              }
            },
            LASSO_NOPROCESS,
            LASSO_START
          ].concat(LASSO_CODE)
        }
      },
      {
        className: 'meta',
        begin: '\\[',
        relevance: 0
      },
      {
        className: 'meta',
        begin: '^#!.+lasso9\\b',
        relevance: 10
      }
    ].concat(LASSO_CODE)
  };
});

hljs.registerLanguage('less', function(hljs) {
  var IDENT_RE        = '[\\w-]+'; // yes, Less identifiers may begin with a digit
  var INTERP_IDENT_RE = '(' + IDENT_RE + '|@{' + IDENT_RE + '})';

  /* Generic Modes */

  var RULES = [], VALUE = []; // forward def. for recursive modes

  var STRING_MODE = function(c) { return {
    // Less strings are not multiline (also include '~' for more consistent coloring of "escaped" strings)
    className: 'string', begin: '~?' + c + '.*?' + c
  };};

  var IDENT_MODE = function(name, begin, relevance) { return {
    className: name, begin: begin, relevance: relevance
  };};

  var PARENS_MODE = {
    // used only to properly balance nested parens inside mixin call, def. arg list
    begin: '\\(', end: '\\)', contains: VALUE, relevance: 0
  };

  // generic Less highlighter (used almost everywhere except selectors):
  VALUE.push(
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    STRING_MODE("'"),
    STRING_MODE('"'),
    hljs.CSS_NUMBER_MODE, // fixme: it does not include dot for numbers like .5em :(
    {
      begin: '(url|data-uri)\\(',
      starts: {className: 'string', end: '[\\)\\n]', excludeEnd: true}
    },
    IDENT_MODE('number', '#[0-9A-Fa-f]+\\b'),
    PARENS_MODE,
    IDENT_MODE('variable', '@@?' + IDENT_RE, 10),
    IDENT_MODE('variable', '@{'  + IDENT_RE + '}'),
    IDENT_MODE('built_in', '~?`[^`]*?`'), // inline javascript (or whatever host language) *multiline* string
    { // @media features (it’s here to not duplicate things in AT_RULE_MODE with extra PARENS_MODE overriding):
      className: 'attribute', begin: IDENT_RE + '\\s*:', end: ':', returnBegin: true, excludeEnd: true
    },
    {
      className: 'meta',
      begin: '!important'
    }
  );

  var VALUE_WITH_RULESETS = VALUE.concat({
    begin: '{', end: '}', contains: RULES
  });

  var MIXIN_GUARD_MODE = {
    beginKeywords: 'when', endsWithParent: true,
    contains: [{beginKeywords: 'and not'}].concat(VALUE) // using this form to override VALUE’s 'function' match
  };

  /* Rule-Level Modes */

  var RULE_MODE = {
    className: 'attribute',
    begin: INTERP_IDENT_RE, end: ':', excludeEnd: true,
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE],
    illegal: /\S/,
    starts: {end: '[;}]', returnEnd: true, contains: VALUE, illegal: '[<=$]'}
  };

  var AT_RULE_MODE = {
    className: 'keyword',
    begin: '@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b',
    starts: {end: '[;{}]', returnEnd: true, contains: VALUE, relevance: 0}
  };

  // variable definitions and calls
  var VAR_RULE_MODE = {
    className: 'variable',
    variants: [
      // using more strict pattern for higher relevance to increase chances of Less detection.
      // this is *the only* Less specific statement used in most of the sources, so...
      // (we’ll still often loose to the css-parser unless there's '//' comment,
      // simply because 1 variable just can't beat 99 properties :)
      {begin: '@' + IDENT_RE + '\\s*:', relevance: 15},
      {begin: '@' + IDENT_RE}
    ],
    starts: {end: '[;}]', returnEnd: true, contains: VALUE_WITH_RULESETS}
  };

  var SELECTOR_MODE = {
    // first parse unambiguous selectors (i.e. those not starting with tag)
    // then fall into the scary lookahead-discriminator variant.
    // this mode also handles mixin definitions and calls
    variants: [{
      begin: '[\\.#:&\\[]', end: '[;{}]'  // mixin calls end with ';'
      }, {
      begin: INTERP_IDENT_RE + '[^;]*{',
      end: '{'
    }],
    returnBegin: true,
    returnEnd:   true,
    illegal: '[<=\'$"]',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      MIXIN_GUARD_MODE,
      IDENT_MODE('keyword',  'all\\b'),
      IDENT_MODE('variable', '@{'  + IDENT_RE + '}'),     // otherwise it’s identified as tag
      IDENT_MODE('selector-tag',  INTERP_IDENT_RE + '%?', 0), // '%' for more consistent coloring of @keyframes "tags"
      IDENT_MODE('selector-id', '#' + INTERP_IDENT_RE),
      IDENT_MODE('selector-class', '\\.' + INTERP_IDENT_RE, 0),
      IDENT_MODE('selector-tag',  '&', 0),
      {className: 'selector-attr', begin: '\\[', end: '\\]'},
      {begin: '\\(', end: '\\)', contains: VALUE_WITH_RULESETS}, // argument list of parametric mixins
      {begin: '!important'} // eat !important after mixin call or it will be colored as tag
    ]
  };

  RULES.push(
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    AT_RULE_MODE,
    VAR_RULE_MODE,
    SELECTOR_MODE,
    RULE_MODE
  );

  return {
    case_insensitive: true,
    illegal: '[=>\'/<($"]',
    contains: RULES
  };
});

hljs.registerLanguage('lisp', function(hljs) {
  var LISP_IDENT_RE = '[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*';
  var MEC_RE = '\\|[^]*?\\|';
  var LISP_SIMPLE_NUMBER_RE = '(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|\\-)?\\d+)?';
  var SHEBANG = {
    className: 'meta',
    begin: '^#!', end: '$'
  };
  var LITERAL = {
    className: 'literal',
    begin: '\\b(t{1}|nil)\\b'
  };
  var NUMBER = {
    className: 'number',
    variants: [
      {begin: LISP_SIMPLE_NUMBER_RE, relevance: 0},
      {begin: '#(b|B)[0-1]+(/[0-1]+)?'},
      {begin: '#(o|O)[0-7]+(/[0-7]+)?'},
      {begin: '#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?'},
      {begin: '#(c|C)\\(' + LISP_SIMPLE_NUMBER_RE + ' +' + LISP_SIMPLE_NUMBER_RE, end: '\\)'}
    ]
  };
  var STRING = hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null});
  var COMMENT = hljs.COMMENT(
    ';', '$',
    {
      relevance: 0
    }
  );
  var VARIABLE = {
    begin: '\\*', end: '\\*'
  };
  var KEYWORD = {
    className: 'symbol',
    begin: '[:&]' + LISP_IDENT_RE
  };
  var IDENT = {
    begin: LISP_IDENT_RE,
    relevance: 0
  };
  var MEC = {
    begin: MEC_RE
  };
  var QUOTED_LIST = {
    begin: '\\(', end: '\\)',
    contains: ['self', LITERAL, STRING, NUMBER, IDENT]
  };
  var QUOTED = {
    contains: [NUMBER, STRING, VARIABLE, KEYWORD, QUOTED_LIST, IDENT],
    variants: [
      {
        begin: '[\'`]\\(', end: '\\)'
      },
      {
        begin: '\\(quote ', end: '\\)',
        keywords: {name: 'quote'}
      },
      {
        begin: '\'' + MEC_RE
      }
    ]
  };
  var QUOTED_ATOM = {
    variants: [
      {begin: '\'' + LISP_IDENT_RE},
      {begin: '#\'' + LISP_IDENT_RE + '(::' + LISP_IDENT_RE + ')*'}
    ]
  };
  var LIST = {
    begin: '\\(\\s*', end: '\\)'
  };
  var BODY = {
    endsWithParent: true,
    relevance: 0
  };
  LIST.contains = [
    {
      className: 'name',
      variants: [
        {begin: LISP_IDENT_RE},
        {begin: MEC_RE}
      ]
    },
    BODY
  ];
  BODY.contains = [QUOTED, QUOTED_ATOM, LIST, LITERAL, NUMBER, STRING, COMMENT, VARIABLE, KEYWORD, MEC, IDENT];

  return {
    illegal: /\S/,
    contains: [
      NUMBER,
      SHEBANG,
      LITERAL,
      STRING,
      COMMENT,
      QUOTED,
      QUOTED_ATOM,
      LIST,
      IDENT
    ]
  };
});

hljs.registerLanguage('livecodeserver', function(hljs) {
  var VARIABLE = {
    begin: '\\b[gtps][A-Z]+[A-Za-z0-9_\\-]*\\b|\\$_[A-Z]+',
    relevance: 0
  };
  var COMMENT_MODES = [
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.HASH_COMMENT_MODE,
    hljs.COMMENT('--', '$'),
    hljs.COMMENT('[^:]//', '$')
  ];
  var TITLE1 = hljs.inherit(hljs.TITLE_MODE, {
    variants: [
      {begin: '\\b_*rig[A-Z]+[A-Za-z0-9_\\-]*'},
      {begin: '\\b_[a-z0-9\\-]+'}
    ]
  });
  var TITLE2 = hljs.inherit(hljs.TITLE_MODE, {begin: '\\b([A-Za-z0-9_\\-]+)\\b'});
  return {
    case_insensitive: false,
    keywords: {
      keyword:
        '$_COOKIE $_FILES $_GET $_GET_BINARY $_GET_RAW $_POST $_POST_BINARY $_POST_RAW $_SESSION $_SERVER ' +
        'codepoint codepoints segment segments codeunit codeunits sentence sentences trueWord trueWords paragraph ' +
        'after byte bytes english the until http forever descending using line real8 with seventh ' +
        'for stdout finally element word words fourth before black ninth sixth characters chars stderr ' +
        'uInt1 uInt1s uInt2 uInt2s stdin string lines relative rel any fifth items from middle mid ' +
        'at else of catch then third it file milliseconds seconds second secs sec int1 int1s int4 ' +
        'int4s internet int2 int2s normal text item last long detailed effective uInt4 uInt4s repeat ' +
        'end repeat URL in try into switch to words https token binfile each tenth as ticks tick ' +
        'system real4 by dateItems without char character ascending eighth whole dateTime numeric short ' +
        'first ftp integer abbreviated abbr abbrev private case while if ' +
        'div mod wrap and or bitAnd bitNot bitOr bitXor among not in a an within ' +
        'contains ends with begins the keys of keys',
      literal:
        'SIX TEN FORMFEED NINE ZERO NONE SPACE FOUR FALSE COLON CRLF PI COMMA ENDOFFILE EOF EIGHT FIVE ' +
        'QUOTE EMPTY ONE TRUE RETURN CR LINEFEED RIGHT BACKSLASH NULL SEVEN TAB THREE TWO ' +
        'six ten formfeed nine zero none space four false colon crlf pi comma endoffile eof eight five ' +
        'quote empty one true return cr linefeed right backslash null seven tab three two ' +
        'RIVERSION RISTATE FILE_READ_MODE FILE_WRITE_MODE FILE_WRITE_MODE DIR_WRITE_MODE FILE_READ_UMASK ' +
        'FILE_WRITE_UMASK DIR_READ_UMASK DIR_WRITE_UMASK',
      built_in:
        'put abs acos aliasReference annuity arrayDecode arrayEncode asin atan atan2 average avg avgDev base64Decode ' +
        'base64Encode baseConvert binaryDecode binaryEncode byteOffset byteToNum cachedURL cachedURLs charToNum ' +
        'cipherNames codepointOffset codepointProperty codepointToNum codeunitOffset commandNames compound compress ' +
        'constantNames cos date dateFormat decompress directories ' +
        'diskSpace DNSServers exp exp1 exp2 exp10 extents files flushEvents folders format functionNames geometricMean global ' +
        'globals hasMemory harmonicMean hostAddress hostAddressToName hostName hostNameToAddress isNumber ISOToMac itemOffset ' +
        'keys len length libURLErrorData libUrlFormData libURLftpCommand libURLLastHTTPHeaders libURLLastRHHeaders ' +
        'libUrlMultipartFormAddPart libUrlMultipartFormData libURLVersion lineOffset ln ln1 localNames log log2 log10 ' +
        'longFilePath lower macToISO matchChunk matchText matrixMultiply max md5Digest median merge millisec ' +
        'millisecs millisecond milliseconds min monthNames nativeCharToNum normalizeText num number numToByte numToChar ' +
        'numToCodepoint numToNativeChar offset open openfiles openProcesses openProcessIDs openSockets ' +
        'paragraphOffset paramCount param params peerAddress pendingMessages platform popStdDev populationStandardDeviation ' +
        'populationVariance popVariance processID random randomBytes replaceText result revCreateXMLTree revCreateXMLTreeFromFile ' +
        'revCurrentRecord revCurrentRecordIsFirst revCurrentRecordIsLast revDatabaseColumnCount revDatabaseColumnIsNull ' +
        'revDatabaseColumnLengths revDatabaseColumnNames revDatabaseColumnNamed revDatabaseColumnNumbered ' +
        'revDatabaseColumnTypes revDatabaseConnectResult revDatabaseCursors revDatabaseID revDatabaseTableNames ' +
        'revDatabaseType revDataFromQuery revdb_closeCursor revdb_columnbynumber revdb_columncount revdb_columnisnull ' +
        'revdb_columnlengths revdb_columnnames revdb_columntypes revdb_commit revdb_connect revdb_connections ' +
        'revdb_connectionerr revdb_currentrecord revdb_cursorconnection revdb_cursorerr revdb_cursors revdb_dbtype ' +
        'revdb_disconnect revdb_execute revdb_iseof revdb_isbof revdb_movefirst revdb_movelast revdb_movenext ' +
        'revdb_moveprev revdb_query revdb_querylist revdb_recordcount revdb_rollback revdb_tablenames ' +
        'revGetDatabaseDriverPath revNumberOfRecords revOpenDatabase revOpenDatabases revQueryDatabase ' +
        'revQueryDatabaseBlob revQueryResult revQueryIsAtStart revQueryIsAtEnd revUnixFromMacPath revXMLAttribute ' +
        'revXMLAttributes revXMLAttributeValues revXMLChildContents revXMLChildNames revXMLCreateTreeFromFileWithNamespaces ' +
        'revXMLCreateTreeWithNamespaces revXMLDataFromXPathQuery revXMLEvaluateXPath revXMLFirstChild revXMLMatchingNode ' +
        'revXMLNextSibling revXMLNodeContents revXMLNumberOfChildren revXMLParent revXMLPreviousSibling ' +
        'revXMLRootNode revXMLRPC_CreateRequest revXMLRPC_Documents revXMLRPC_Error ' +
        'revXMLRPC_GetHost revXMLRPC_GetMethod revXMLRPC_GetParam revXMLText revXMLRPC_Execute ' +
        'revXMLRPC_GetParamCount revXMLRPC_GetParamNode revXMLRPC_GetParamType revXMLRPC_GetPath revXMLRPC_GetPort ' +
        'revXMLRPC_GetProtocol revXMLRPC_GetRequest revXMLRPC_GetResponse revXMLRPC_GetSocket revXMLTree ' +
        'revXMLTrees revXMLValidateDTD revZipDescribeItem revZipEnumerateItems revZipOpenArchives round sampVariance ' +
        'sec secs seconds sentenceOffset sha1Digest shell shortFilePath sin specialFolderPath sqrt standardDeviation statRound ' +
        'stdDev sum sysError systemVersion tan tempName textDecode textEncode tick ticks time to tokenOffset toLower toUpper ' +
        'transpose truewordOffset trunc uniDecode uniEncode upper URLDecode URLEncode URLStatus uuid value variableNames ' +
        'variance version waitDepth weekdayNames wordOffset xsltApplyStylesheet xsltApplyStylesheetFromFile xsltLoadStylesheet ' +
        'xsltLoadStylesheetFromFile add breakpoint cancel clear local variable file word line folder directory URL close socket process ' +
        'combine constant convert create new alias folder directory decrypt delete variable word line folder ' +
        'directory URL dispatch divide do encrypt filter get include intersect kill libURLDownloadToFile ' +
        'libURLFollowHttpRedirects libURLftpUpload libURLftpUploadFile libURLresetAll libUrlSetAuthCallback ' +
        'libURLSetCustomHTTPHeaders libUrlSetExpect100 libURLSetFTPListCommand libURLSetFTPMode libURLSetFTPStopTime ' +
        'libURLSetStatusCallback load multiply socket prepare process post seek rel relative read from process rename ' +
        'replace require resetAll resolve revAddXMLNode revAppendXML revCloseCursor revCloseDatabase revCommitDatabase ' +
        'revCopyFile revCopyFolder revCopyXMLNode revDeleteFolder revDeleteXMLNode revDeleteAllXMLTrees ' +
        'revDeleteXMLTree revExecuteSQL revGoURL revInsertXMLNode revMoveFolder revMoveToFirstRecord revMoveToLastRecord ' +
        'revMoveToNextRecord revMoveToPreviousRecord revMoveToRecord revMoveXMLNode revPutIntoXMLNode revRollBackDatabase ' +
        'revSetDatabaseDriverPath revSetXMLAttribute revXMLRPC_AddParam revXMLRPC_DeleteAllDocuments revXMLAddDTD ' +
        'revXMLRPC_Free revXMLRPC_FreeAll revXMLRPC_DeleteDocument revXMLRPC_DeleteParam revXMLRPC_SetHost ' +
        'revXMLRPC_SetMethod revXMLRPC_SetPort revXMLRPC_SetProtocol revXMLRPC_SetSocket revZipAddItemWithData ' +
        'revZipAddItemWithFile revZipAddUncompressedItemWithData revZipAddUncompressedItemWithFile revZipCancel ' +
        'revZipCloseArchive revZipDeleteItem revZipExtractItemToFile revZipExtractItemToVariable revZipSetProgressCallback ' +
        'revZipRenameItem revZipReplaceItemWithData revZipReplaceItemWithFile revZipOpenArchive send set sort split start stop ' +
        'subtract union unload wait write'
    },
    contains: [
      VARIABLE,
      {
        className: 'keyword',
        begin: '\\bend\\sif\\b'
      },
      {
        className: 'function',
        beginKeywords: 'function', end: '$',
        contains: [
          VARIABLE,
          TITLE2,
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.BINARY_NUMBER_MODE,
          hljs.C_NUMBER_MODE,
          TITLE1
        ]
      },
      {
        className: 'function',
        begin: '\\bend\\s+', end: '$',
        keywords: 'end',
        contains: [
          TITLE2,
          TITLE1
        ]
      },
      {
        beginKeywords: 'command on', end: '$',
        contains: [
          VARIABLE,
          TITLE2,
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.BINARY_NUMBER_MODE,
          hljs.C_NUMBER_MODE,
          TITLE1
        ]
      },
      {
        className: 'meta',
        variants: [
          {
            begin: '<\\?(rev|lc|livecode)',
            relevance: 10
          },
          { begin: '<\\?' },
          { begin: '\\?>' }
        ]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.BINARY_NUMBER_MODE,
      hljs.C_NUMBER_MODE,
      TITLE1
    ].concat(COMMENT_MODES),
    illegal: ';$|^\\[|^='
  };
});

hljs.registerLanguage('livescript', function(hljs) {
  var KEYWORDS = {
    keyword:
      // JS keywords
      'in if for while finally new do return else break catch instanceof throw try this ' +
      'switch continue typeof delete debugger case default function var with ' +
      // LiveScript keywords
      'then unless until loop of by when and or is isnt not it that otherwise from to til fallthrough super ' +
      'case default function var void const let enum export import native ' +
      '__hasProp __extends __slice __bind __indexOf',
    literal:
      // JS literals
      'true false null undefined ' +
      // LiveScript literals
      'yes no on off it that void',
    built_in:
      'npm require console print module global window document'
  };
  var JS_IDENT_RE = '[A-Za-z$_](?:\-[0-9A-Za-z$_]|[0-9A-Za-z$_])*';
  var TITLE = hljs.inherit(hljs.TITLE_MODE, {begin: JS_IDENT_RE});
  var SUBST = {
    className: 'subst',
    begin: /#\{/, end: /}/,
    keywords: KEYWORDS
  };
  var SUBST_SIMPLE = {
    className: 'subst',
    begin: /#[A-Za-z$_]/, end: /(?:\-[0-9A-Za-z$_]|[0-9A-Za-z$_])*/,
    keywords: KEYWORDS
  };
  var EXPRESSIONS = [
    hljs.BINARY_NUMBER_MODE,
    {
      className: 'number',
      begin: '(\\b0[xX][a-fA-F0-9_]+)|(\\b\\d(\\d|_\\d)*(\\.(\\d(\\d|_\\d)*)?)?(_*[eE]([-+]\\d(_\\d|\\d)*)?)?[_a-z]*)',
      relevance: 0,
      starts: {end: '(\\s*/)?', relevance: 0} // a number tries to eat the following slash to prevent treating it as a regexp
    },
    {
      className: 'string',
      variants: [
        {
          begin: /'''/, end: /'''/,
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /'/, end: /'/,
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /"""/, end: /"""/,
          contains: [hljs.BACKSLASH_ESCAPE, SUBST, SUBST_SIMPLE]
        },
        {
          begin: /"/, end: /"/,
          contains: [hljs.BACKSLASH_ESCAPE, SUBST, SUBST_SIMPLE]
        },
        {
          begin: /\\/, end: /(\s|$)/,
          excludeEnd: true
        }
      ]
    },
    {
      className: 'regexp',
      variants: [
        {
          begin: '//', end: '//[gim]*',
          contains: [SUBST, hljs.HASH_COMMENT_MODE]
        },
        {
          // regex can't start with space to parse x / 2 / 3 as two divisions
          // regex can't start with *, and it supports an "illegal" in the main mode
          begin: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
        }
      ]
    },
    {
      begin: '@' + JS_IDENT_RE
    },
    {
      begin: '``', end: '``',
      excludeBegin: true, excludeEnd: true,
      subLanguage: 'javascript'
    }
  ];
  SUBST.contains = EXPRESSIONS;

  var PARAMS = {
    className: 'params',
    begin: '\\(', returnBegin: true,
    /* We need another contained nameless mode to not have every nested
    pair of parens to be called "params" */
    contains: [
      {
        begin: /\(/, end: /\)/,
        keywords: KEYWORDS,
        contains: ['self'].concat(EXPRESSIONS)
      }
    ]
  };

  return {
    aliases: ['ls'],
    keywords: KEYWORDS,
    illegal: /\/\*/,
    contains: EXPRESSIONS.concat([
      hljs.COMMENT('\\/\\*', '\\*\\/'),
      hljs.HASH_COMMENT_MODE,
      {
        className: 'function',
        contains: [TITLE, PARAMS],
        returnBegin: true,
        variants: [
          {
            begin: '(' + JS_IDENT_RE + '\\s*(?:=|:=)\\s*)?(\\(.*\\))?\\s*\\B\\->\\*?', end: '\\->\\*?'
          },
          {
            begin: '(' + JS_IDENT_RE + '\\s*(?:=|:=)\\s*)?!?(\\(.*\\))?\\s*\\B[-~]{1,2}>\\*?', end: '[-~]{1,2}>\\*?'
          },
          {
            begin: '(' + JS_IDENT_RE + '\\s*(?:=|:=)\\s*)?(\\(.*\\))?\\s*\\B!?[-~]{1,2}>\\*?', end: '!?[-~]{1,2}>\\*?'
          }
        ]
      },
      {
        className: 'class',
        beginKeywords: 'class',
        end: '$',
        illegal: /[:="\[\]]/,
        contains: [
          {
            beginKeywords: 'extends',
            endsWithParent: true,
            illegal: /[:="\[\]]/,
            contains: [TITLE]
          },
          TITLE
        ]
      },
      {
        begin: JS_IDENT_RE + ':', end: ':',
        returnBegin: true, returnEnd: true,
        relevance: 0
      }
    ])
  };
});

hljs.registerLanguage('lua', function(hljs) {
  var OPENING_LONG_BRACKET = '\\[=*\\[';
  var CLOSING_LONG_BRACKET = '\\]=*\\]';
  var LONG_BRACKETS = {
    begin: OPENING_LONG_BRACKET, end: CLOSING_LONG_BRACKET,
    contains: ['self']
  };
  var COMMENTS = [
    hljs.COMMENT('--(?!' + OPENING_LONG_BRACKET + ')', '$'),
    hljs.COMMENT(
      '--' + OPENING_LONG_BRACKET,
      CLOSING_LONG_BRACKET,
      {
        contains: [LONG_BRACKETS],
        relevance: 10
      }
    )
  ];
  return {
    lexemes: hljs.UNDERSCORE_IDENT_RE,
    keywords: {
      keyword:
        'and break do else elseif end false for if in local nil not or repeat return then ' +
        'true until while',
      built_in:
        '_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load ' +
        'loadfile loadstring module next pairs pcall print rawequal rawget rawset require ' +
        'select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug ' +
        'io math os package string table'
    },
    contains: COMMENTS.concat([
      {
        className: 'function',
        beginKeywords: 'function', end: '\\)',
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {begin: '([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*'}),
          {
            className: 'params',
            begin: '\\(', endsWithParent: true,
            contains: COMMENTS
          }
        ].concat(COMMENTS)
      },
      hljs.C_NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: OPENING_LONG_BRACKET, end: CLOSING_LONG_BRACKET,
        contains: [LONG_BRACKETS],
        relevance: 5
      }
    ])
  };
});

hljs.registerLanguage('makefile', function(hljs) {
  var VARIABLE = {
    className: 'variable',
    begin: /\$\(/, end: /\)/,
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  return {
    aliases: ['mk', 'mak'],
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        begin: /^\w+\s*\W*=/, returnBegin: true,
        relevance: 0,
        starts: {
          end: /\s*\W*=/, excludeEnd: true,
          starts: {
            end: /$/,
            relevance: 0,
            contains: [
              VARIABLE
            ]
          }
        }
      },
      {
        className: 'section',
        begin: /^[\w]+:\s*$/
      },
      {
        className: 'meta',
        begin: /^\.PHONY:/, end: /$/,
        keywords: {'meta-keyword': '.PHONY'}, lexemes: /[\.\w]+/
      },
      {
        begin: /^\t+/, end: /$/,
        relevance: 0,
        contains: [
          hljs.QUOTE_STRING_MODE,
          VARIABLE
        ]
      }
    ]
  };
});

hljs.registerLanguage('mathematica', function(hljs) {
  return {
    aliases: ['mma'],
    lexemes: '(\\$|\\b)' + hljs.IDENT_RE + '\\b',
    keywords: 'AbelianGroup Abort AbortKernels AbortProtect Above Abs Absolute AbsoluteCorrelation AbsoluteCorrelationFunction AbsoluteCurrentValue AbsoluteDashing AbsoluteFileName AbsoluteOptions AbsolutePointSize AbsoluteThickness AbsoluteTime AbsoluteTiming AccountingForm Accumulate Accuracy AccuracyGoal ActionDelay ActionMenu ActionMenuBox ActionMenuBoxOptions Active ActiveItem ActiveStyle AcyclicGraphQ AddOnHelpPath AddTo AdjacencyGraph AdjacencyList AdjacencyMatrix AdjustmentBox AdjustmentBoxOptions AdjustTimeSeriesForecast AffineTransform After AiryAi AiryAiPrime AiryAiZero AiryBi AiryBiPrime AiryBiZero AlgebraicIntegerQ AlgebraicNumber AlgebraicNumberDenominator AlgebraicNumberNorm AlgebraicNumberPolynomial AlgebraicNumberTrace AlgebraicRules AlgebraicRulesData Algebraics AlgebraicUnitQ Alignment AlignmentMarker AlignmentPoint All AllowedDimensions AllowGroupClose AllowInlineCells AllowKernelInitialization AllowReverseGroupClose AllowScriptLevelChange AlphaChannel AlternatingGroup AlternativeHypothesis Alternatives AmbientLight Analytic AnchoredSearch And AndersonDarlingTest AngerJ AngleBracket AngularGauge Animate AnimationCycleOffset AnimationCycleRepetitions AnimationDirection AnimationDisplayTime AnimationRate AnimationRepetitions AnimationRunning Animator AnimatorBox AnimatorBoxOptions AnimatorElements Annotation Annuity AnnuityDue Antialiasing Antisymmetric Apart ApartSquareFree Appearance AppearanceElements AppellF1 Append AppendTo Apply ArcCos ArcCosh ArcCot ArcCoth ArcCsc ArcCsch ArcSec ArcSech ArcSin ArcSinDistribution ArcSinh ArcTan ArcTanh Arg ArgMax ArgMin ArgumentCountQ ARIMAProcess ArithmeticGeometricMean ARMAProcess ARProcess Array ArrayComponents ArrayDepth ArrayFlatten ArrayPad ArrayPlot ArrayQ ArrayReshape ArrayRules Arrays Arrow Arrow3DBox ArrowBox Arrowheads AspectRatio AspectRatioFixed Assert Assuming Assumptions AstronomicalData Asynchronous AsynchronousTaskObject AsynchronousTasks AtomQ Attributes AugmentedSymmetricPolynomial AutoAction AutoDelete AutoEvaluateEvents AutoGeneratedPackage AutoIndent AutoIndentSpacings AutoItalicWords AutoloadPath AutoMatch Automatic AutomaticImageSize AutoMultiplicationSymbol AutoNumberFormatting AutoOpenNotebooks AutoOpenPalettes AutorunSequencing AutoScaling AutoScroll AutoSpacing AutoStyleOptions AutoStyleWords Axes AxesEdge AxesLabel AxesOrigin AxesStyle Axis ' +
      'BabyMonsterGroupB Back Background BackgroundTasksSettings Backslash Backsubstitution Backward Band BandpassFilter BandstopFilter BarabasiAlbertGraphDistribution BarChart BarChart3D BarLegend BarlowProschanImportance BarnesG BarOrigin BarSpacing BartlettHannWindow BartlettWindow BaseForm Baseline BaselinePosition BaseStyle BatesDistribution BattleLemarieWavelet Because BeckmannDistribution Beep Before Begin BeginDialogPacket BeginFrontEndInteractionPacket BeginPackage BellB BellY Below BenfordDistribution BeniniDistribution BenktanderGibratDistribution BenktanderWeibullDistribution BernoulliB BernoulliDistribution BernoulliGraphDistribution BernoulliProcess BernsteinBasis BesselFilterModel BesselI BesselJ BesselJZero BesselK BesselY BesselYZero Beta BetaBinomialDistribution BetaDistribution BetaNegativeBinomialDistribution BetaPrimeDistribution BetaRegularized BetweennessCentrality BezierCurve BezierCurve3DBox BezierCurve3DBoxOptions BezierCurveBox BezierCurveBoxOptions BezierFunction BilateralFilter Binarize BinaryFormat BinaryImageQ BinaryRead BinaryReadList BinaryWrite BinCounts BinLists Binomial BinomialDistribution BinomialProcess BinormalDistribution BiorthogonalSplineWavelet BipartiteGraphQ BirnbaumImportance BirnbaumSaundersDistribution BitAnd BitClear BitGet BitLength BitNot BitOr BitSet BitShiftLeft BitShiftRight BitXor Black BlackmanHarrisWindow BlackmanNuttallWindow BlackmanWindow Blank BlankForm BlankNullSequence BlankSequence Blend Block BlockRandom BlomqvistBeta BlomqvistBetaTest Blue Blur BodePlot BohmanWindow Bold Bookmarks Boole BooleanConsecutiveFunction BooleanConvert BooleanCountingFunction BooleanFunction BooleanGraph BooleanMaxterms BooleanMinimize BooleanMinterms Booleans BooleanTable BooleanVariables BorderDimensions BorelTannerDistribution Bottom BottomHatTransform BoundaryStyle Bounds Box BoxBaselineShift BoxData BoxDimensions Boxed Boxes BoxForm BoxFormFormatTypes BoxFrame BoxID BoxMargins BoxMatrix BoxRatios BoxRotation BoxRotationPoint BoxStyle BoxWhiskerChart Bra BracketingBar BraKet BrayCurtisDistance BreadthFirstScan Break Brown BrownForsytheTest BrownianBridgeProcess BrowserCategory BSplineBasis BSplineCurve BSplineCurve3DBox BSplineCurveBox BSplineCurveBoxOptions BSplineFunction BSplineSurface BSplineSurface3DBox BubbleChart BubbleChart3D BubbleScale BubbleSizes BulletGauge BusinessDayQ ButterflyGraph ButterworthFilterModel Button ButtonBar ButtonBox ButtonBoxOptions ButtonCell ButtonContents ButtonData ButtonEvaluator ButtonExpandable ButtonFrame ButtonFunction ButtonMargins ButtonMinHeight ButtonNote ButtonNotebook ButtonSource ButtonStyle ButtonStyleMenuListing Byte ByteCount ByteOrdering ' +
      'C CachedValue CacheGraphics CalendarData CalendarType CallPacket CanberraDistance Cancel CancelButton CandlestickChart Cap CapForm CapitalDifferentialD CardinalBSplineBasis CarmichaelLambda Cases Cashflow Casoratian Catalan CatalanNumber Catch CauchyDistribution CauchyWindow CayleyGraph CDF CDFDeploy CDFInformation CDFWavelet Ceiling Cell CellAutoOverwrite CellBaseline CellBoundingBox CellBracketOptions CellChangeTimes CellContents CellContext CellDingbat CellDynamicExpression CellEditDuplicate CellElementsBoundingBox CellElementSpacings CellEpilog CellEvaluationDuplicate CellEvaluationFunction CellEventActions CellFrame CellFrameColor CellFrameLabelMargins CellFrameLabels CellFrameMargins CellGroup CellGroupData CellGrouping CellGroupingRules CellHorizontalScrolling CellID CellLabel CellLabelAutoDelete CellLabelMargins CellLabelPositioning CellMargins CellObject CellOpen CellPrint CellProlog Cells CellSize CellStyle CellTags CellularAutomaton CensoredDistribution Censoring Center CenterDot CentralMoment CentralMomentGeneratingFunction CForm ChampernowneNumber ChanVeseBinarize Character CharacterEncoding CharacterEncodingsPath CharacteristicFunction CharacteristicPolynomial CharacterRange Characters ChartBaseStyle ChartElementData ChartElementDataFunction ChartElementFunction ChartElements ChartLabels ChartLayout ChartLegends ChartStyle Chebyshev1FilterModel Chebyshev2FilterModel ChebyshevDistance ChebyshevT ChebyshevU Check CheckAbort CheckAll Checkbox CheckboxBar CheckboxBox CheckboxBoxOptions ChemicalData ChessboardDistance ChiDistribution ChineseRemainder ChiSquareDistribution ChoiceButtons ChoiceDialog CholeskyDecomposition Chop Circle CircleBox CircleDot CircleMinus CirclePlus CircleTimes CirculantGraph CityData Clear ClearAll ClearAttributes ClearSystemCache ClebschGordan ClickPane Clip ClipboardNotebook ClipFill ClippingStyle ClipPlanes ClipRange Clock ClockGauge ClockwiseContourIntegral Close Closed CloseKernels ClosenessCentrality Closing ClosingAutoSave ClosingEvent ClusteringComponents CMYKColor Coarse Coefficient CoefficientArrays CoefficientDomain CoefficientList CoefficientRules CoifletWavelet Collect Colon ColonForm ColorCombine ColorConvert ColorData ColorDataFunction ColorFunction ColorFunctionScaling Colorize ColorNegate ColorOutput ColorProfileData ColorQuantize ColorReplace ColorRules ColorSelectorSettings ColorSeparate ColorSetter ColorSetterBox ColorSetterBoxOptions ColorSlider ColorSpace Column ColumnAlignments ColumnBackgrounds ColumnForm ColumnLines ColumnsEqual ColumnSpacings ColumnWidths CommonDefaultFormatTypes Commonest CommonestFilter CommonUnits CommunityBoundaryStyle CommunityGraphPlot CommunityLabels CommunityRegionStyle CompatibleUnitQ CompilationOptions CompilationTarget Compile Compiled CompiledFunction Complement CompleteGraph CompleteGraphQ CompleteKaryTree CompletionsListPacket Complex Complexes ComplexExpand ComplexInfinity ComplexityFunction ComponentMeasurements ' +
      'ComponentwiseContextMenu Compose ComposeList ComposeSeries Composition CompoundExpression CompoundPoissonDistribution CompoundPoissonProcess CompoundRenewalProcess Compress CompressedData Condition ConditionalExpression Conditioned Cone ConeBox ConfidenceLevel ConfidenceRange ConfidenceTransform ConfigurationPath Congruent Conjugate ConjugateTranspose Conjunction Connect ConnectedComponents ConnectedGraphQ ConnesWindow ConoverTest ConsoleMessage ConsoleMessagePacket ConsolePrint Constant ConstantArray Constants ConstrainedMax ConstrainedMin ContentPadding ContentsBoundingBox ContentSelectable ContentSize Context ContextMenu Contexts ContextToFilename ContextToFileName Continuation Continue ContinuedFraction ContinuedFractionK ContinuousAction ContinuousMarkovProcess ContinuousTimeModelQ ContinuousWaveletData ContinuousWaveletTransform ContourDetect ContourGraphics ContourIntegral ContourLabels ContourLines ContourPlot ContourPlot3D Contours ContourShading ContourSmoothing ContourStyle ContraharmonicMean Control ControlActive ControlAlignment ControllabilityGramian ControllabilityMatrix ControllableDecomposition ControllableModelQ ControllerDuration ControllerInformation ControllerInformationData ControllerLinking ControllerManipulate ControllerMethod ControllerPath ControllerState ControlPlacement ControlsRendering ControlType Convergents ConversionOptions ConversionRules ConvertToBitmapPacket ConvertToPostScript ConvertToPostScriptPacket Convolve ConwayGroupCo1 ConwayGroupCo2 ConwayGroupCo3 CoordinateChartData CoordinatesToolOptions CoordinateTransform CoordinateTransformData CoprimeQ Coproduct CopulaDistribution Copyable CopyDirectory CopyFile CopyTag CopyToClipboard CornerFilter CornerNeighbors Correlation CorrelationDistance CorrelationFunction CorrelationTest Cos Cosh CoshIntegral CosineDistance CosineWindow CosIntegral Cot Coth Count CounterAssignments CounterBox CounterBoxOptions CounterClockwiseContourIntegral CounterEvaluator CounterFunction CounterIncrements CounterStyle CounterStyleMenuListing CountRoots CountryData Covariance CovarianceEstimatorFunction CovarianceFunction CoxianDistribution CoxIngersollRossProcess CoxModel CoxModelFit CramerVonMisesTest CreateArchive CreateDialog CreateDirectory CreateDocument CreateIntermediateDirectories CreatePalette CreatePalettePacket CreateScheduledTask CreateTemporary CreateWindow CriticalityFailureImportance CriticalitySuccessImportance CriticalSection Cross CrossingDetect CrossMatrix Csc Csch CubeRoot Cubics Cuboid CuboidBox Cumulant CumulantGeneratingFunction Cup CupCap Curl CurlyDoubleQuote CurlyQuote CurrentImage CurrentlySpeakingPacket CurrentValue CurvatureFlowFilter CurveClosed Cyan CycleGraph CycleIndexPolynomial Cycles CyclicGroup Cyclotomic Cylinder CylinderBox CylindricalDecomposition ' +
      'D DagumDistribution DamerauLevenshteinDistance DampingFactor Darker Dashed Dashing DataCompression DataDistribution DataRange DataReversed Date DateDelimiters DateDifference DateFunction DateList DateListLogPlot DateListPlot DatePattern DatePlus DateRange DateString DateTicksFormat DaubechiesWavelet DavisDistribution DawsonF DayCount DayCountConvention DayMatchQ DayName DayPlus DayRange DayRound DeBruijnGraph Debug DebugTag Decimal DeclareKnownSymbols DeclarePackage Decompose Decrement DedekindEta Default DefaultAxesStyle DefaultBaseStyle DefaultBoxStyle DefaultButton DefaultColor DefaultControlPlacement DefaultDuplicateCellStyle DefaultDuration DefaultElement DefaultFaceGridsStyle DefaultFieldHintStyle DefaultFont DefaultFontProperties DefaultFormatType DefaultFormatTypeForStyle DefaultFrameStyle DefaultFrameTicksStyle DefaultGridLinesStyle DefaultInlineFormatType DefaultInputFormatType DefaultLabelStyle DefaultMenuStyle DefaultNaturalLanguage DefaultNewCellStyle DefaultNewInlineCellStyle DefaultNotebook DefaultOptions DefaultOutputFormatType DefaultStyle DefaultStyleDefinitions DefaultTextFormatType DefaultTextInlineFormatType DefaultTicksStyle DefaultTooltipStyle DefaultValues Defer DefineExternal DefineInputStreamMethod DefineOutputStreamMethod Definition Degree DegreeCentrality DegreeGraphDistribution DegreeLexicographic DegreeReverseLexicographic Deinitialization Del Deletable Delete DeleteBorderComponents DeleteCases DeleteContents DeleteDirectory DeleteDuplicates DeleteFile DeleteSmallComponents DeleteWithContents DeletionWarning Delimiter DelimiterFlashTime DelimiterMatching Delimiters Denominator DensityGraphics DensityHistogram DensityPlot DependentVariables Deploy Deployed Depth DepthFirstScan Derivative DerivativeFilter DescriptorStateSpace DesignMatrix Det DGaussianWavelet DiacriticalPositioning Diagonal DiagonalMatrix Dialog DialogIndent DialogInput DialogLevel DialogNotebook DialogProlog DialogReturn DialogSymbols Diamond DiamondMatrix DiceDissimilarity DictionaryLookup DifferenceDelta DifferenceOrder DifferenceRoot DifferenceRootReduce Differences DifferentialD DifferentialRoot DifferentialRootReduce DifferentiatorFilter DigitBlock DigitBlockMinimum DigitCharacter DigitCount DigitQ DihedralGroup Dilation Dimensions DiracComb DiracDelta DirectedEdge DirectedEdges DirectedGraph DirectedGraphQ DirectedInfinity Direction Directive Directory DirectoryName DirectoryQ DirectoryStack DirichletCharacter DirichletConvolve DirichletDistribution DirichletL DirichletTransform DirichletWindow DisableConsolePrintPacket DiscreteChirpZTransform DiscreteConvolve DiscreteDelta DiscreteHadamardTransform DiscreteIndicator DiscreteLQEstimatorGains DiscreteLQRegulatorGains DiscreteLyapunovSolve DiscreteMarkovProcess DiscretePlot DiscretePlot3D DiscreteRatio DiscreteRiccatiSolve DiscreteShift DiscreteTimeModelQ DiscreteUniformDistribution DiscreteVariables DiscreteWaveletData DiscreteWaveletPacketTransform ' +
      'DiscreteWaveletTransform Discriminant Disjunction Disk DiskBox DiskMatrix Dispatch DispersionEstimatorFunction Display DisplayAllSteps DisplayEndPacket DisplayFlushImagePacket DisplayForm DisplayFunction DisplayPacket DisplayRules DisplaySetSizePacket DisplayString DisplayTemporary DisplayWith DisplayWithRef DisplayWithVariable DistanceFunction DistanceTransform Distribute Distributed DistributedContexts DistributeDefinitions DistributionChart DistributionDomain DistributionFitTest DistributionParameterAssumptions DistributionParameterQ Dithering Div Divergence Divide DivideBy Dividers Divisible Divisors DivisorSigma DivisorSum DMSList DMSString Do DockedCells DocumentNotebook DominantColors DOSTextFormat Dot DotDashed DotEqual Dotted DoubleBracketingBar DoubleContourIntegral DoubleDownArrow DoubleLeftArrow DoubleLeftRightArrow DoubleLeftTee DoubleLongLeftArrow DoubleLongLeftRightArrow DoubleLongRightArrow DoubleRightArrow DoubleRightTee DoubleUpArrow DoubleUpDownArrow DoubleVerticalBar DoublyInfinite Down DownArrow DownArrowBar DownArrowUpArrow DownLeftRightVector DownLeftTeeVector DownLeftVector DownLeftVectorBar DownRightTeeVector DownRightVector DownRightVectorBar Downsample DownTee DownTeeArrow DownValues DragAndDrop DrawEdges DrawFrontFaces DrawHighlighted Drop DSolve Dt DualLinearProgramming DualSystemsModel DumpGet DumpSave DuplicateFreeQ Dynamic DynamicBox DynamicBoxOptions DynamicEvaluationTimeout DynamicLocation DynamicModule DynamicModuleBox DynamicModuleBoxOptions DynamicModuleParent DynamicModuleValues DynamicName DynamicNamespace DynamicReference DynamicSetting DynamicUpdating DynamicWrapper DynamicWrapperBox DynamicWrapperBoxOptions ' +
      'E EccentricityCentrality EdgeAdd EdgeBetweennessCentrality EdgeCapacity EdgeCapForm EdgeColor EdgeConnectivity EdgeCost EdgeCount EdgeCoverQ EdgeDashing EdgeDelete EdgeDetect EdgeForm EdgeIndex EdgeJoinForm EdgeLabeling EdgeLabels EdgeLabelStyle EdgeList EdgeOpacity EdgeQ EdgeRenderingFunction EdgeRules EdgeShapeFunction EdgeStyle EdgeThickness EdgeWeight Editable EditButtonSettings EditCellTagsSettings EditDistance EffectiveInterest Eigensystem Eigenvalues EigenvectorCentrality Eigenvectors Element ElementData Eliminate EliminationOrder EllipticE EllipticExp EllipticExpPrime EllipticF EllipticFilterModel EllipticK EllipticLog EllipticNomeQ EllipticPi EllipticReducedHalfPeriods EllipticTheta EllipticThetaPrime EmitSound EmphasizeSyntaxErrors EmpiricalDistribution Empty EmptyGraphQ EnableConsolePrintPacket Enabled Encode End EndAdd EndDialogPacket EndFrontEndInteractionPacket EndOfFile EndOfLine EndOfString EndPackage EngineeringForm Enter EnterExpressionPacket EnterTextPacket Entropy EntropyFilter Environment Epilog Equal EqualColumns EqualRows EqualTilde EquatedTo Equilibrium EquirippleFilterKernel Equivalent Erf Erfc Erfi ErlangB ErlangC ErlangDistribution Erosion ErrorBox ErrorBoxOptions ErrorNorm ErrorPacket ErrorsDialogSettings EstimatedDistribution EstimatedProcess EstimatorGains EstimatorRegulator EuclideanDistance EulerE EulerGamma EulerianGraphQ EulerPhi Evaluatable Evaluate Evaluated EvaluatePacket EvaluationCell EvaluationCompletionAction EvaluationElements EvaluationMode EvaluationMonitor EvaluationNotebook EvaluationObject EvaluationOrder Evaluator EvaluatorNames EvenQ EventData EventEvaluator EventHandler EventHandlerTag EventLabels ExactBlackmanWindow ExactNumberQ ExactRootIsolation ExampleData Except ExcludedForms ExcludePods Exclusions ExclusionsStyle Exists Exit ExitDialog Exp Expand ExpandAll ExpandDenominator ExpandFileName ExpandNumerator Expectation ExpectationE ExpectedValue ExpGammaDistribution ExpIntegralE ExpIntegralEi Exponent ExponentFunction ExponentialDistribution ExponentialFamily ExponentialGeneratingFunction ExponentialMovingAverage ExponentialPowerDistribution ExponentPosition ExponentStep Export ExportAutoReplacements ExportPacket ExportString Expression ExpressionCell ExpressionPacket ExpToTrig ExtendedGCD Extension ExtentElementFunction ExtentMarkers ExtentSize ExternalCall ExternalDataCharacterEncoding Extract ExtractArchive ExtremeValueDistribution ' +
      'FaceForm FaceGrids FaceGridsStyle Factor FactorComplete Factorial Factorial2 FactorialMoment FactorialMomentGeneratingFunction FactorialPower FactorInteger FactorList FactorSquareFree FactorSquareFreeList FactorTerms FactorTermsList Fail FailureDistribution False FARIMAProcess FEDisableConsolePrintPacket FeedbackSector FeedbackSectorStyle FeedbackType FEEnableConsolePrintPacket Fibonacci FieldHint FieldHintStyle FieldMasked FieldSize File FileBaseName FileByteCount FileDate FileExistsQ FileExtension FileFormat FileHash FileInformation FileName FileNameDepth FileNameDialogSettings FileNameDrop FileNameJoin FileNames FileNameSetter FileNameSplit FileNameTake FilePrint FileType FilledCurve FilledCurveBox Filling FillingStyle FillingTransform FilterRules FinancialBond FinancialData FinancialDerivative FinancialIndicator Find FindArgMax FindArgMin FindClique FindClusters FindCurvePath FindDistributionParameters FindDivisions FindEdgeCover FindEdgeCut FindEulerianCycle FindFaces FindFile FindFit FindGeneratingFunction FindGeoLocation FindGeometricTransform FindGraphCommunities FindGraphIsomorphism FindGraphPartition FindHamiltonianCycle FindIndependentEdgeSet FindIndependentVertexSet FindInstance FindIntegerNullVector FindKClan FindKClique FindKClub FindKPlex FindLibrary FindLinearRecurrence FindList FindMaximum FindMaximumFlow FindMaxValue FindMinimum FindMinimumCostFlow FindMinimumCut FindMinValue FindPermutation FindPostmanTour FindProcessParameters FindRoot FindSequenceFunction FindSettings FindShortestPath FindShortestTour FindThreshold FindVertexCover FindVertexCut Fine FinishDynamic FiniteAbelianGroupCount FiniteGroupCount FiniteGroupData First FirstPassageTimeDistribution FischerGroupFi22 FischerGroupFi23 FischerGroupFi24Prime FisherHypergeometricDistribution FisherRatioTest FisherZDistribution Fit FitAll FittedModel FixedPoint FixedPointList FlashSelection Flat Flatten FlattenAt FlatTopWindow FlipView Floor FlushPrintOutputPacket Fold FoldList Font FontColor FontFamily FontForm FontName FontOpacity FontPostScriptName FontProperties FontReencoding FontSize FontSlant FontSubstitutions FontTracking FontVariations FontWeight For ForAll Format FormatRules FormatType FormatTypeAutoConvert FormatValues FormBox FormBoxOptions FortranForm Forward ForwardBackward Fourier FourierCoefficient FourierCosCoefficient FourierCosSeries FourierCosTransform FourierDCT FourierDCTFilter FourierDCTMatrix FourierDST FourierDSTMatrix FourierMatrix FourierParameters FourierSequenceTransform FourierSeries FourierSinCoefficient FourierSinSeries FourierSinTransform FourierTransform FourierTrigSeries FractionalBrownianMotionProcess FractionalPart FractionBox FractionBoxOptions FractionLine Frame FrameBox FrameBoxOptions Framed FrameInset FrameLabel Frameless FrameMargins FrameStyle FrameTicks FrameTicksStyle FRatioDistribution FrechetDistribution FreeQ FrequencySamplingFilterKernel FresnelC FresnelS Friday FrobeniusNumber FrobeniusSolve ' +
      'FromCharacterCode FromCoefficientRules FromContinuedFraction FromDate FromDigits FromDMS Front FrontEndDynamicExpression FrontEndEventActions FrontEndExecute FrontEndObject FrontEndResource FrontEndResourceString FrontEndStackSize FrontEndToken FrontEndTokenExecute FrontEndValueCache FrontEndVersion FrontFaceColor FrontFaceOpacity Full FullAxes FullDefinition FullForm FullGraphics FullOptions FullSimplify Function FunctionExpand FunctionInterpolation FunctionSpace FussellVeselyImportance ' +
      'GaborFilter GaborMatrix GaborWavelet GainMargins GainPhaseMargins Gamma GammaDistribution GammaRegularized GapPenalty Gather GatherBy GaugeFaceElementFunction GaugeFaceStyle GaugeFrameElementFunction GaugeFrameSize GaugeFrameStyle GaugeLabels GaugeMarkers GaugeStyle GaussianFilter GaussianIntegers GaussianMatrix GaussianWindow GCD GegenbauerC General GeneralizedLinearModelFit GenerateConditions GeneratedCell GeneratedParameters GeneratingFunction Generic GenericCylindricalDecomposition GenomeData GenomeLookup GeodesicClosing GeodesicDilation GeodesicErosion GeodesicOpening GeoDestination GeodesyData GeoDirection GeoDistance GeoGridPosition GeometricBrownianMotionProcess GeometricDistribution GeometricMean GeometricMeanFilter GeometricTransformation GeometricTransformation3DBox GeometricTransformation3DBoxOptions GeometricTransformationBox GeometricTransformationBoxOptions GeoPosition GeoPositionENU GeoPositionXYZ GeoProjectionData GestureHandler GestureHandlerTag Get GetBoundingBoxSizePacket GetContext GetEnvironment GetFileName GetFrontEndOptionsDataPacket GetLinebreakInformationPacket GetMenusPacket GetPageBreakInformationPacket Glaisher GlobalClusteringCoefficient GlobalPreferences GlobalSession Glow GoldenRatio GompertzMakehamDistribution GoodmanKruskalGamma GoodmanKruskalGammaTest Goto Grad Gradient GradientFilter GradientOrientationFilter Graph GraphAssortativity GraphCenter GraphComplement GraphData GraphDensity GraphDiameter GraphDifference GraphDisjointUnion ' +
      'GraphDistance GraphDistanceMatrix GraphElementData GraphEmbedding GraphHighlight GraphHighlightStyle GraphHub Graphics Graphics3D Graphics3DBox Graphics3DBoxOptions GraphicsArray GraphicsBaseline GraphicsBox GraphicsBoxOptions GraphicsColor GraphicsColumn GraphicsComplex GraphicsComplex3DBox GraphicsComplex3DBoxOptions GraphicsComplexBox GraphicsComplexBoxOptions GraphicsContents GraphicsData GraphicsGrid GraphicsGridBox GraphicsGroup GraphicsGroup3DBox GraphicsGroup3DBoxOptions GraphicsGroupBox GraphicsGroupBoxOptions GraphicsGrouping GraphicsHighlightColor GraphicsRow GraphicsSpacing GraphicsStyle GraphIntersection GraphLayout GraphLinkEfficiency GraphPeriphery GraphPlot GraphPlot3D GraphPower GraphPropertyDistribution GraphQ GraphRadius GraphReciprocity GraphRoot GraphStyle GraphUnion Gray GrayLevel GreatCircleDistance Greater GreaterEqual GreaterEqualLess GreaterFullEqual GreaterGreater GreaterLess GreaterSlantEqual GreaterTilde Green Grid GridBaseline GridBox GridBoxAlignment GridBoxBackground GridBoxDividers GridBoxFrame GridBoxItemSize GridBoxItemStyle GridBoxOptions GridBoxSpacings GridCreationSettings GridDefaultElement GridElementStyleOptions GridFrame GridFrameMargins GridGraph GridLines GridLinesStyle GroebnerBasis GroupActionBase GroupCentralizer GroupElementFromWord GroupElementPosition GroupElementQ GroupElements GroupElementToWord GroupGenerators GroupMultiplicationTable GroupOrbits GroupOrder GroupPageBreakWithin GroupSetwiseStabilizer GroupStabilizer GroupStabilizerChain Gudermannian GumbelDistribution ' +
      'HaarWavelet HadamardMatrix HalfNormalDistribution HamiltonianGraphQ HammingDistance HammingWindow HankelH1 HankelH2 HankelMatrix HannPoissonWindow HannWindow HaradaNortonGroupHN HararyGraph HarmonicMean HarmonicMeanFilter HarmonicNumber Hash HashTable Haversine HazardFunction Head HeadCompose Heads HeavisideLambda HeavisidePi HeavisideTheta HeldGroupHe HeldPart HelpBrowserLookup HelpBrowserNotebook HelpBrowserSettings HermiteDecomposition HermiteH HermitianMatrixQ HessenbergDecomposition Hessian HexadecimalCharacter Hexahedron HexahedronBox HexahedronBoxOptions HiddenSurface HighlightGraph HighlightImage HighpassFilter HigmanSimsGroupHS HilbertFilter HilbertMatrix Histogram Histogram3D HistogramDistribution HistogramList HistogramTransform HistogramTransformInterpolation HitMissTransform HITSCentrality HodgeDual HoeffdingD HoeffdingDTest Hold HoldAll HoldAllComplete HoldComplete HoldFirst HoldForm HoldPattern HoldRest HolidayCalendar HomeDirectory HomePage Horizontal HorizontalForm HorizontalGauge HorizontalScrollPosition HornerForm HotellingTSquareDistribution HoytDistribution HTMLSave Hue HumpDownHump HumpEqual HurwitzLerchPhi HurwitzZeta HyperbolicDistribution HypercubeGraph HyperexponentialDistribution Hyperfactorial Hypergeometric0F1 Hypergeometric0F1Regularized Hypergeometric1F1 Hypergeometric1F1Regularized Hypergeometric2F1 Hypergeometric2F1Regularized HypergeometricDistribution HypergeometricPFQ HypergeometricPFQRegularized HypergeometricU Hyperlink HyperlinkCreationSettings Hyphenation HyphenationOptions HypoexponentialDistribution HypothesisTestData ' +
      'I Identity IdentityMatrix If IgnoreCase Im Image Image3D Image3DSlices ImageAccumulate ImageAdd ImageAdjust ImageAlign ImageApply ImageAspectRatio ImageAssemble ImageCache ImageCacheValid ImageCapture ImageChannels ImageClip ImageColorSpace ImageCompose ImageConvolve ImageCooccurrence ImageCorners ImageCorrelate ImageCorrespondingPoints ImageCrop ImageData ImageDataPacket ImageDeconvolve ImageDemosaic ImageDifference ImageDimensions ImageDistance ImageEffect ImageFeatureTrack ImageFileApply ImageFileFilter ImageFileScan ImageFilter ImageForestingComponents ImageForwardTransformation ImageHistogram ImageKeypoints ImageLevels ImageLines ImageMargins ImageMarkers ImageMeasurements ImageMultiply ImageOffset ImagePad ImagePadding ImagePartition ImagePeriodogram ImagePerspectiveTransformation ImageQ ImageRangeCache ImageReflect ImageRegion ImageResize ImageResolution ImageRotate ImageRotated ImageScaled ImageScan ImageSize ImageSizeAction ImageSizeCache ImageSizeMultipliers ImageSizeRaw ImageSubtract ImageTake ImageTransformation ImageTrim ImageType ImageValue ImageValuePositions Implies Import ImportAutoReplacements ImportString ImprovementImportance In IncidenceGraph IncidenceList IncidenceMatrix IncludeConstantBasis IncludeFileExtension IncludePods IncludeSingularTerm Increment Indent IndentingNewlineSpacings IndentMaxFraction IndependenceTest IndependentEdgeSetQ IndependentUnit IndependentVertexSetQ Indeterminate IndexCreationOptions Indexed IndexGraph IndexTag Inequality InexactNumberQ InexactNumbers Infinity Infix Information Inherited InheritScope Initialization InitializationCell InitializationCellEvaluation InitializationCellWarning InlineCounterAssignments InlineCounterIncrements InlineRules Inner Inpaint Input InputAliases InputAssumptions InputAutoReplacements InputField InputFieldBox InputFieldBoxOptions InputForm InputGrouping InputNamePacket InputNotebook InputPacket InputSettings InputStream InputString InputStringPacket InputToBoxFormPacket Insert InsertionPointObject InsertResults Inset Inset3DBox Inset3DBoxOptions InsetBox InsetBoxOptions Install InstallService InString Integer IntegerDigits IntegerExponent IntegerLength IntegerPart IntegerPartitions IntegerQ Integers IntegerString Integral Integrate Interactive InteractiveTradingChart Interlaced Interleaving InternallyBalancedDecomposition InterpolatingFunction InterpolatingPolynomial Interpolation InterpolationOrder InterpolationPoints InterpolationPrecision Interpretation InterpretationBox InterpretationBoxOptions InterpretationFunction ' +
      'InterpretTemplate InterquartileRange Interrupt InterruptSettings Intersection Interval IntervalIntersection IntervalMemberQ IntervalUnion Inverse InverseBetaRegularized InverseCDF InverseChiSquareDistribution InverseContinuousWaveletTransform InverseDistanceTransform InverseEllipticNomeQ InverseErf InverseErfc InverseFourier InverseFourierCosTransform InverseFourierSequenceTransform InverseFourierSinTransform InverseFourierTransform InverseFunction InverseFunctions InverseGammaDistribution InverseGammaRegularized InverseGaussianDistribution InverseGudermannian InverseHaversine InverseJacobiCD InverseJacobiCN InverseJacobiCS InverseJacobiDC InverseJacobiDN InverseJacobiDS InverseJacobiNC InverseJacobiND InverseJacobiNS InverseJacobiSC InverseJacobiSD InverseJacobiSN InverseLaplaceTransform InversePermutation InverseRadon InverseSeries InverseSurvivalFunction InverseWaveletTransform InverseWeierstrassP InverseZTransform Invisible InvisibleApplication InvisibleTimes IrreduciblePolynomialQ IsolatingInterval IsomorphicGraphQ IsotopeData Italic Item ItemBox ItemBoxOptions ItemSize ItemStyle ItoProcess ' +
      'JaccardDissimilarity JacobiAmplitude Jacobian JacobiCD JacobiCN JacobiCS JacobiDC JacobiDN JacobiDS JacobiNC JacobiND JacobiNS JacobiP JacobiSC JacobiSD JacobiSN JacobiSymbol JacobiZeta JankoGroupJ1 JankoGroupJ2 JankoGroupJ3 JankoGroupJ4 JarqueBeraALMTest JohnsonDistribution Join Joined JoinedCurve JoinedCurveBox JoinForm JordanDecomposition JordanModelDecomposition ' +
      'K KagiChart KaiserBesselWindow KaiserWindow KalmanEstimator KalmanFilter KarhunenLoeveDecomposition KaryTree KatzCentrality KCoreComponents KDistribution KelvinBei KelvinBer KelvinKei KelvinKer KendallTau KendallTauTest KernelExecute KernelMixtureDistribution KernelObject Kernels Ket Khinchin KirchhoffGraph KirchhoffMatrix KleinInvariantJ KnightTourGraph KnotData KnownUnitQ KolmogorovSmirnovTest KroneckerDelta KroneckerModelDecomposition KroneckerProduct KroneckerSymbol KuiperTest KumaraswamyDistribution Kurtosis KuwaharaFilter ' +
      'Label Labeled LabeledSlider LabelingFunction LabelStyle LaguerreL LambdaComponents LambertW LanczosWindow LandauDistribution Language LanguageCategory LaplaceDistribution LaplaceTransform Laplacian LaplacianFilter LaplacianGaussianFilter Large Larger Last Latitude LatitudeLongitude LatticeData LatticeReduce Launch LaunchKernels LayeredGraphPlot LayerSizeFunction LayoutInformation LCM LeafCount LeapYearQ LeastSquares LeastSquaresFilterKernel Left LeftArrow LeftArrowBar LeftArrowRightArrow LeftDownTeeVector LeftDownVector LeftDownVectorBar LeftRightArrow LeftRightVector LeftTee LeftTeeArrow LeftTeeVector LeftTriangle LeftTriangleBar LeftTriangleEqual LeftUpDownVector LeftUpTeeVector LeftUpVector LeftUpVectorBar LeftVector LeftVectorBar LegendAppearance Legended LegendFunction LegendLabel LegendLayout LegendMargins LegendMarkers LegendMarkerSize LegendreP LegendreQ LegendreType Length LengthWhile LerchPhi Less LessEqual LessEqualGreater LessFullEqual LessGreater LessLess LessSlantEqual LessTilde LetterCharacter LetterQ Level LeveneTest LeviCivitaTensor LevyDistribution Lexicographic LibraryFunction LibraryFunctionError LibraryFunctionInformation LibraryFunctionLoad LibraryFunctionUnload LibraryLoad LibraryUnload LicenseID LiftingFilterData LiftingWaveletTransform LightBlue LightBrown LightCyan Lighter LightGray LightGreen Lighting LightingAngle LightMagenta LightOrange LightPink LightPurple LightRed LightSources LightYellow Likelihood Limit LimitsPositioning LimitsPositioningTokens LindleyDistribution Line Line3DBox LinearFilter LinearFractionalTransform LinearModelFit LinearOffsetFunction LinearProgramming LinearRecurrence LinearSolve LinearSolveFunction LineBox LineBreak LinebreakAdjustments LineBreakChart LineBreakWithin LineColor LineForm LineGraph LineIndent LineIndentMaxFraction LineIntegralConvolutionPlot LineIntegralConvolutionScale LineLegend LineOpacity LineSpacing LineWrapParts LinkActivate LinkClose LinkConnect LinkConnectedQ LinkCreate LinkError LinkFlush LinkFunction LinkHost LinkInterrupt LinkLaunch LinkMode LinkObject LinkOpen LinkOptions LinkPatterns LinkProtocol LinkRead LinkReadHeld LinkReadyQ Links LinkWrite LinkWriteHeld LiouvilleLambda List Listable ListAnimate ListContourPlot ListContourPlot3D ListConvolve ListCorrelate ListCurvePathPlot ListDeconvolve ListDensityPlot Listen ListFourierSequenceTransform ListInterpolation ListLineIntegralConvolutionPlot ListLinePlot ListLogLinearPlot ListLogLogPlot ListLogPlot ListPicker ListPickerBox ListPickerBoxBackground ListPickerBoxOptions ListPlay ListPlot ListPlot3D ListPointPlot3D ListPolarPlot ListQ ListStreamDensityPlot ListStreamPlot ListSurfacePlot3D ListVectorDensityPlot ListVectorPlot ListVectorPlot3D ListZTransform Literal LiteralSearch LocalClusteringCoefficient LocalizeVariables LocationEquivalenceTest LocationTest Locator LocatorAutoCreate LocatorBox LocatorBoxOptions LocatorCentering LocatorPane LocatorPaneBox LocatorPaneBoxOptions ' +
      'LocatorRegion Locked Log Log10 Log2 LogBarnesG LogGamma LogGammaDistribution LogicalExpand LogIntegral LogisticDistribution LogitModelFit LogLikelihood LogLinearPlot LogLogisticDistribution LogLogPlot LogMultinormalDistribution LogNormalDistribution LogPlot LogRankTest LogSeriesDistribution LongEqual Longest LongestAscendingSequence LongestCommonSequence LongestCommonSequencePositions LongestCommonSubsequence LongestCommonSubsequencePositions LongestMatch LongForm Longitude LongLeftArrow LongLeftRightArrow LongRightArrow Loopback LoopFreeGraphQ LowerCaseQ LowerLeftArrow LowerRightArrow LowerTriangularize LowpassFilter LQEstimatorGains LQGRegulator LQOutputRegulatorGains LQRegulatorGains LUBackSubstitution LucasL LuccioSamiComponents LUDecomposition LyapunovSolve LyonsGroupLy ' +
      'MachineID MachineName MachineNumberQ MachinePrecision MacintoshSystemPageSetup Magenta Magnification Magnify MainSolve MaintainDynamicCaches Majority MakeBoxes MakeExpression MakeRules MangoldtLambda ManhattanDistance Manipulate Manipulator MannWhitneyTest MantissaExponent Manual Map MapAll MapAt MapIndexed MAProcess MapThread MarcumQ MardiaCombinedTest MardiaKurtosisTest MardiaSkewnessTest MarginalDistribution MarkovProcessProperties Masking MatchingDissimilarity MatchLocalNameQ MatchLocalNames MatchQ Material MathematicaNotation MathieuC MathieuCharacteristicA MathieuCharacteristicB MathieuCharacteristicExponent MathieuCPrime MathieuGroupM11 MathieuGroupM12 MathieuGroupM22 MathieuGroupM23 MathieuGroupM24 MathieuS MathieuSPrime MathMLForm MathMLText Matrices MatrixExp MatrixForm MatrixFunction MatrixLog MatrixPlot MatrixPower MatrixQ MatrixRank Max MaxBend MaxDetect MaxExtraBandwidths MaxExtraConditions MaxFeatures MaxFilter Maximize MaxIterations MaxMemoryUsed MaxMixtureKernels MaxPlotPoints MaxPoints MaxRecursion MaxStableDistribution MaxStepFraction MaxSteps MaxStepSize MaxValue MaxwellDistribution McLaughlinGroupMcL Mean MeanClusteringCoefficient MeanDegreeConnectivity MeanDeviation MeanFilter MeanGraphDistance MeanNeighborDegree MeanShift MeanShiftFilter Median MedianDeviation MedianFilter Medium MeijerG MeixnerDistribution MemberQ MemoryConstrained MemoryInUse Menu MenuAppearance MenuCommandKey MenuEvaluator MenuItem MenuPacket MenuSortingValue MenuStyle MenuView MergeDifferences Mesh MeshFunctions MeshRange MeshShading MeshStyle Message MessageDialog MessageList MessageName MessageOptions MessagePacket Messages MessagesNotebook MetaCharacters MetaInformation Method MethodOptions MexicanHatWavelet MeyerWavelet Min MinDetect MinFilter MinimalPolynomial MinimalStateSpaceModel Minimize Minors MinRecursion MinSize MinStableDistribution Minus MinusPlus MinValue Missing MissingDataMethod MittagLefflerE MixedRadix MixedRadixQuantity MixtureDistribution Mod Modal Mode Modular ModularLambda Module Modulus MoebiusMu Moment Momentary MomentConvert MomentEvaluate MomentGeneratingFunction Monday Monitor MonomialList MonomialOrder MonsterGroupM MorletWavelet MorphologicalBinarize MorphologicalBranchPoints MorphologicalComponents MorphologicalEulerNumber MorphologicalGraph MorphologicalPerimeter MorphologicalTransform Most MouseAnnotation MouseAppearance MouseAppearanceTag MouseButtons Mouseover MousePointerNote MousePosition MovingAverage MovingMedian MoyalDistribution MultiedgeStyle MultilaunchWarning MultiLetterItalics MultiLetterStyle MultilineFunction Multinomial MultinomialDistribution MultinormalDistribution MultiplicativeOrder Multiplicity Multiselection MultivariateHypergeometricDistribution MultivariatePoissonDistribution MultivariateTDistribution ' +
      'N NakagamiDistribution NameQ Names NamespaceBox Nand NArgMax NArgMin NBernoulliB NCache NDSolve NDSolveValue Nearest NearestFunction NeedCurrentFrontEndPackagePacket NeedCurrentFrontEndSymbolsPacket NeedlemanWunschSimilarity Needs Negative NegativeBinomialDistribution NegativeMultinomialDistribution NeighborhoodGraph Nest NestedGreaterGreater NestedLessLess NestedScriptRules NestList NestWhile NestWhileList NevilleThetaC NevilleThetaD NevilleThetaN NevilleThetaS NewPrimitiveStyle NExpectation Next NextPrime NHoldAll NHoldFirst NHoldRest NicholsGridLines NicholsPlot NIntegrate NMaximize NMaxValue NMinimize NMinValue NominalVariables NonAssociative NoncentralBetaDistribution NoncentralChiSquareDistribution NoncentralFRatioDistribution NoncentralStudentTDistribution NonCommutativeMultiply NonConstants None NonlinearModelFit NonlocalMeansFilter NonNegative NonPositive Nor NorlundB Norm Normal NormalDistribution NormalGrouping Normalize NormalizedSquaredEuclideanDistance NormalsFunction NormFunction Not NotCongruent NotCupCap NotDoubleVerticalBar Notebook NotebookApply NotebookAutoSave NotebookClose NotebookConvertSettings NotebookCreate NotebookCreateReturnObject NotebookDefault NotebookDelete NotebookDirectory NotebookDynamicExpression NotebookEvaluate NotebookEventActions NotebookFileName NotebookFind NotebookFindReturnObject NotebookGet NotebookGetLayoutInformationPacket NotebookGetMisspellingsPacket NotebookInformation NotebookInterfaceObject NotebookLocate NotebookObject NotebookOpen NotebookOpenReturnObject NotebookPath NotebookPrint NotebookPut NotebookPutReturnObject NotebookRead NotebookResetGeneratedCells Notebooks NotebookSave NotebookSaveAs NotebookSelection NotebookSetupLayoutInformationPacket NotebooksMenu NotebookWrite NotElement NotEqualTilde NotExists NotGreater NotGreaterEqual NotGreaterFullEqual NotGreaterGreater NotGreaterLess NotGreaterSlantEqual NotGreaterTilde NotHumpDownHump NotHumpEqual NotLeftTriangle NotLeftTriangleBar NotLeftTriangleEqual NotLess NotLessEqual NotLessFullEqual NotLessGreater NotLessLess NotLessSlantEqual NotLessTilde NotNestedGreaterGreater NotNestedLessLess NotPrecedes NotPrecedesEqual NotPrecedesSlantEqual NotPrecedesTilde NotReverseElement NotRightTriangle NotRightTriangleBar NotRightTriangleEqual NotSquareSubset NotSquareSubsetEqual NotSquareSuperset NotSquareSupersetEqual NotSubset NotSubsetEqual NotSucceeds NotSucceedsEqual NotSucceedsSlantEqual NotSucceedsTilde NotSuperset NotSupersetEqual NotTilde NotTildeEqual NotTildeFullEqual NotTildeTilde NotVerticalBar NProbability NProduct NProductFactors NRoots NSolve NSum NSumTerms Null NullRecords NullSpace NullWords Number NumberFieldClassNumber NumberFieldDiscriminant NumberFieldFundamentalUnits NumberFieldIntegralBasis NumberFieldNormRepresentatives NumberFieldRegulator NumberFieldRootsOfUnity NumberFieldSignature NumberForm NumberFormat NumberMarks NumberMultiplier NumberPadding NumberPoint NumberQ NumberSeparator ' +
      'NumberSigns NumberString Numerator NumericFunction NumericQ NuttallWindow NValues NyquistGridLines NyquistPlot ' +
      'O ObservabilityGramian ObservabilityMatrix ObservableDecomposition ObservableModelQ OddQ Off Offset OLEData On ONanGroupON OneIdentity Opacity Open OpenAppend Opener OpenerBox OpenerBoxOptions OpenerView OpenFunctionInspectorPacket Opening OpenRead OpenSpecialOptions OpenTemporary OpenWrite Operate OperatingSystem OptimumFlowData Optional OptionInspectorSettings OptionQ Options OptionsPacket OptionsPattern OptionValue OptionValueBox OptionValueBoxOptions Or Orange Order OrderDistribution OrderedQ Ordering Orderless OrnsteinUhlenbeckProcess Orthogonalize Out Outer OutputAutoOverwrite OutputControllabilityMatrix OutputControllableModelQ OutputForm OutputFormData OutputGrouping OutputMathEditExpression OutputNamePacket OutputResponse OutputSizeLimit OutputStream Over OverBar OverDot Overflow OverHat Overlaps Overlay OverlayBox OverlayBoxOptions Overscript OverscriptBox OverscriptBoxOptions OverTilde OverVector OwenT OwnValues ' +
      'PackingMethod PaddedForm Padding PadeApproximant PadLeft PadRight PageBreakAbove PageBreakBelow PageBreakWithin PageFooterLines PageFooters PageHeaderLines PageHeaders PageHeight PageRankCentrality PageWidth PairedBarChart PairedHistogram PairedSmoothHistogram PairedTTest PairedZTest PaletteNotebook PalettePath Pane PaneBox PaneBoxOptions Panel PanelBox PanelBoxOptions Paneled PaneSelector PaneSelectorBox PaneSelectorBoxOptions PaperWidth ParabolicCylinderD ParagraphIndent ParagraphSpacing ParallelArray ParallelCombine ParallelDo ParallelEvaluate Parallelization Parallelize ParallelMap ParallelNeeds ParallelProduct ParallelSubmit ParallelSum ParallelTable ParallelTry Parameter ParameterEstimator ParameterMixtureDistribution ParameterVariables ParametricFunction ParametricNDSolve ParametricNDSolveValue ParametricPlot ParametricPlot3D ParentConnect ParentDirectory ParentForm Parenthesize ParentList ParetoDistribution Part PartialCorrelationFunction PartialD ParticleData Partition PartitionsP PartitionsQ ParzenWindow PascalDistribution PassEventsDown PassEventsUp Paste PasteBoxFormInlineCells PasteButton Path PathGraph PathGraphQ Pattern PatternSequence PatternTest PauliMatrix PaulWavelet Pause PausedTime PDF PearsonChiSquareTest PearsonCorrelationTest PearsonDistribution PerformanceGoal PeriodicInterpolation Periodogram PeriodogramArray PermutationCycles PermutationCyclesQ PermutationGroup PermutationLength PermutationList PermutationListQ PermutationMax PermutationMin PermutationOrder PermutationPower PermutationProduct PermutationReplace Permutations PermutationSupport Permute PeronaMalikFilter Perpendicular PERTDistribution PetersenGraph PhaseMargins Pi Pick PIDData PIDDerivativeFilter PIDFeedforward PIDTune Piecewise PiecewiseExpand PieChart PieChart3D PillaiTrace PillaiTraceTest Pink Pivoting PixelConstrained PixelValue PixelValuePositions Placed Placeholder PlaceholderReplace Plain PlanarGraphQ Play PlayRange Plot Plot3D Plot3Matrix PlotDivision PlotJoined PlotLabel PlotLayout PlotLegends PlotMarkers PlotPoints PlotRange PlotRangeClipping PlotRangePadding PlotRegion PlotStyle Plus PlusMinus Pochhammer PodStates PodWidth Point Point3DBox PointBox PointFigureChart PointForm PointLegend PointSize PoissonConsulDistribution PoissonDistribution PoissonProcess PoissonWindow PolarAxes PolarAxesOrigin PolarGridLines PolarPlot PolarTicks PoleZeroMarkers PolyaAeppliDistribution PolyGamma Polygon Polygon3DBox Polygon3DBoxOptions PolygonBox PolygonBoxOptions PolygonHoleScale PolygonIntersections PolygonScale PolyhedronData PolyLog PolynomialExtendedGCD PolynomialForm PolynomialGCD PolynomialLCM PolynomialMod PolynomialQ PolynomialQuotient PolynomialQuotientRemainder PolynomialReduce PolynomialRemainder Polynomials PopupMenu PopupMenuBox PopupMenuBoxOptions PopupView PopupWindow Position Positive PositiveDefiniteMatrixQ PossibleZeroQ Postfix PostScript Power PowerDistribution PowerExpand PowerMod PowerModList ' +
      'PowerSpectralDensity PowersRepresentations PowerSymmetricPolynomial Precedence PrecedenceForm Precedes PrecedesEqual PrecedesSlantEqual PrecedesTilde Precision PrecisionGoal PreDecrement PredictionRoot PreemptProtect PreferencesPath Prefix PreIncrement Prepend PrependTo PreserveImageOptions Previous PriceGraphDistribution PrimaryPlaceholder Prime PrimeNu PrimeOmega PrimePi PrimePowerQ PrimeQ Primes PrimeZetaP PrimitiveRoot PrincipalComponents PrincipalValue Print PrintAction PrintForm PrintingCopies PrintingOptions PrintingPageRange PrintingStartingPageNumber PrintingStyleEnvironment PrintPrecision PrintTemporary Prism PrismBox PrismBoxOptions PrivateCellOptions PrivateEvaluationOptions PrivateFontOptions PrivateFrontEndOptions PrivateNotebookOptions PrivatePaths Probability ProbabilityDistribution ProbabilityPlot ProbabilityPr ProbabilityScalePlot ProbitModelFit ProcessEstimator ProcessParameterAssumptions ProcessParameterQ ProcessStateDomain ProcessTimeDomain Product ProductDistribution ProductLog ProgressIndicator ProgressIndicatorBox ProgressIndicatorBoxOptions Projection Prolog PromptForm Properties Property PropertyList PropertyValue Proportion Proportional Protect Protected ProteinData Pruning PseudoInverse Purple Put PutAppend Pyramid PyramidBox PyramidBoxOptions ' +
      'QBinomial QFactorial QGamma QHypergeometricPFQ QPochhammer QPolyGamma QRDecomposition QuadraticIrrationalQ Quantile QuantilePlot Quantity QuantityForm QuantityMagnitude QuantityQ QuantityUnit Quartics QuartileDeviation Quartiles QuartileSkewness QueueingNetworkProcess QueueingProcess QueueProperties Quiet Quit Quotient QuotientRemainder ' +
      'RadialityCentrality RadicalBox RadicalBoxOptions RadioButton RadioButtonBar RadioButtonBox RadioButtonBoxOptions Radon RamanujanTau RamanujanTauL RamanujanTauTheta RamanujanTauZ Random RandomChoice RandomComplex RandomFunction RandomGraph RandomImage RandomInteger RandomPermutation RandomPrime RandomReal RandomSample RandomSeed RandomVariate RandomWalkProcess Range RangeFilter RangeSpecification RankedMax RankedMin Raster Raster3D Raster3DBox Raster3DBoxOptions RasterArray RasterBox RasterBoxOptions Rasterize RasterSize Rational RationalFunctions Rationalize Rationals Ratios Raw RawArray RawBoxes RawData RawMedium RayleighDistribution Re Read ReadList ReadProtected Real RealBlockDiagonalForm RealDigits RealExponent Reals Reap Record RecordLists RecordSeparators Rectangle RectangleBox RectangleBoxOptions RectangleChart RectangleChart3D RecurrenceFilter RecurrenceTable RecurringDigitsForm Red Reduce RefBox ReferenceLineStyle ReferenceMarkers ReferenceMarkerStyle Refine ReflectionMatrix ReflectionTransform Refresh RefreshRate RegionBinarize RegionFunction RegionPlot RegionPlot3D RegularExpression Regularization Reinstall Release ReleaseHold ReliabilityDistribution ReliefImage ReliefPlot Remove RemoveAlphaChannel RemoveAsynchronousTask Removed RemoveInputStreamMethod RemoveOutputStreamMethod RemoveProperty RemoveScheduledTask RenameDirectory RenameFile RenderAll RenderingOptions RenewalProcess RenkoChart Repeated RepeatedNull RepeatedString Replace ReplaceAll ReplaceHeldPart ReplaceImageValue ReplaceList ReplacePart ReplacePixelValue ReplaceRepeated Resampling Rescale RescalingTransform ResetDirectory ResetMenusPacket ResetScheduledTask Residue Resolve Rest Resultant ResumePacket Return ReturnExpressionPacket ReturnInputFormPacket ReturnPacket ReturnTextPacket Reverse ReverseBiorthogonalSplineWavelet ReverseElement ReverseEquilibrium ReverseGraph ReverseUpEquilibrium RevolutionAxis RevolutionPlot3D RGBColor RiccatiSolve RiceDistribution RidgeFilter RiemannR RiemannSiegelTheta RiemannSiegelZ Riffle Right RightArrow RightArrowBar RightArrowLeftArrow RightCosetRepresentative RightDownTeeVector RightDownVector RightDownVectorBar RightTee RightTeeArrow RightTeeVector RightTriangle RightTriangleBar RightTriangleEqual RightUpDownVector RightUpTeeVector RightUpVector RightUpVectorBar RightVector RightVectorBar RiskAchievementImportance RiskReductionImportance RogersTanimotoDissimilarity Root RootApproximant RootIntervals RootLocusPlot RootMeanSquare RootOfUnityQ RootReduce Roots RootSum Rotate RotateLabel RotateLeft RotateRight RotationAction RotationBox RotationBoxOptions RotationMatrix RotationTransform Round RoundImplies RoundingRadius Row RowAlignments RowBackgrounds RowBox RowHeights RowLines RowMinHeight RowReduce RowsEqual RowSpacings RSolve RudvalisGroupRu Rule RuleCondition RuleDelayed RuleForm RulerUnits Run RunScheduledTask RunThrough RuntimeAttributes RuntimeOptions RussellRaoDissimilarity ' +
      'SameQ SameTest SampleDepth SampledSoundFunction SampledSoundList SampleRate SamplingPeriod SARIMAProcess SARMAProcess SatisfiabilityCount SatisfiabilityInstances SatisfiableQ Saturday Save Saveable SaveAutoDelete SaveDefinitions SawtoothWave Scale Scaled ScaleDivisions ScaledMousePosition ScaleOrigin ScalePadding ScaleRanges ScaleRangeStyle ScalingFunctions ScalingMatrix ScalingTransform Scan ScheduledTaskActiveQ ScheduledTaskData ScheduledTaskObject ScheduledTasks SchurDecomposition ScientificForm ScreenRectangle ScreenStyleEnvironment ScriptBaselineShifts ScriptLevel ScriptMinSize ScriptRules ScriptSizeMultipliers Scrollbars ScrollingOptions ScrollPosition Sec Sech SechDistribution SectionGrouping SectorChart SectorChart3D SectorOrigin SectorSpacing SeedRandom Select Selectable SelectComponents SelectedCells SelectedNotebook Selection SelectionAnimate SelectionCell SelectionCellCreateCell SelectionCellDefaultStyle SelectionCellParentStyle SelectionCreateCell SelectionDebuggerTag SelectionDuplicateCell SelectionEvaluate SelectionEvaluateCreateCell SelectionMove SelectionPlaceholder SelectionSetStyle SelectWithContents SelfLoops SelfLoopStyle SemialgebraicComponentInstances SendMail Sequence SequenceAlignment SequenceForm SequenceHold SequenceLimit Series SeriesCoefficient SeriesData SessionTime Set SetAccuracy SetAlphaChannel SetAttributes Setbacks SetBoxFormNamesPacket SetDelayed SetDirectory SetEnvironment SetEvaluationNotebook SetFileDate SetFileLoadingContext SetNotebookStatusLine SetOptions SetOptionsPacket SetPrecision SetProperty SetSelectedNotebook SetSharedFunction SetSharedVariable SetSpeechParametersPacket SetStreamPosition SetSystemOptions Setter SetterBar SetterBox SetterBoxOptions Setting SetValue Shading Shallow ShannonWavelet ShapiroWilkTest Share Sharpen ShearingMatrix ShearingTransform ShenCastanMatrix Short ShortDownArrow Shortest ShortestMatch ShortestPathFunction ShortLeftArrow ShortRightArrow ShortUpArrow Show ShowAutoStyles ShowCellBracket ShowCellLabel ShowCellTags ShowClosedCellArea ShowContents ShowControls ShowCursorTracker ShowGroupOpenCloseIcon ShowGroupOpener ShowInvisibleCharacters ShowPageBreaks ShowPredictiveInterface ShowSelection ShowShortBoxForm ShowSpecialCharacters ShowStringCharacters ShowSyntaxStyles ShrinkingDelay ShrinkWrapBoundingBox SiegelTheta SiegelTukeyTest Sign Signature SignedRankTest SignificanceLevel SignPadding SignTest SimilarityRules SimpleGraph SimpleGraphQ Simplify Sin Sinc SinghMaddalaDistribution SingleEvaluation SingleLetterItalics SingleLetterStyle SingularValueDecomposition SingularValueList SingularValuePlot SingularValues Sinh SinhIntegral SinIntegral SixJSymbol Skeleton SkeletonTransform SkellamDistribution Skewness SkewNormalDistribution Skip SliceDistribution Slider Slider2D Slider2DBox Slider2DBoxOptions SliderBox SliderBoxOptions SlideView Slot SlotSequence Small SmallCircle Smaller SmithDelayCompensator SmithWatermanSimilarity ' +
      'SmoothDensityHistogram SmoothHistogram SmoothHistogram3D SmoothKernelDistribution SocialMediaData Socket SokalSneathDissimilarity Solve SolveAlways SolveDelayed Sort SortBy Sound SoundAndGraphics SoundNote SoundVolume Sow Space SpaceForm Spacer Spacings Span SpanAdjustments SpanCharacterRounding SpanFromAbove SpanFromBoth SpanFromLeft SpanLineThickness SpanMaxSize SpanMinSize SpanningCharacters SpanSymmetric SparseArray SpatialGraphDistribution Speak SpeakTextPacket SpearmanRankTest SpearmanRho Spectrogram SpectrogramArray Specularity SpellingCorrection SpellingDictionaries SpellingDictionariesPath SpellingOptions SpellingSuggestionsPacket Sphere SphereBox SphericalBesselJ SphericalBesselY SphericalHankelH1 SphericalHankelH2 SphericalHarmonicY SphericalPlot3D SphericalRegion SpheroidalEigenvalue SpheroidalJoiningFactor SpheroidalPS SpheroidalPSPrime SpheroidalQS SpheroidalQSPrime SpheroidalRadialFactor SpheroidalS1 SpheroidalS1Prime SpheroidalS2 SpheroidalS2Prime Splice SplicedDistribution SplineClosed SplineDegree SplineKnots SplineWeights Split SplitBy SpokenString Sqrt SqrtBox SqrtBoxOptions Square SquaredEuclideanDistance SquareFreeQ SquareIntersection SquaresR SquareSubset SquareSubsetEqual SquareSuperset SquareSupersetEqual SquareUnion SquareWave StabilityMargins StabilityMarginsStyle StableDistribution Stack StackBegin StackComplete StackInhibit StandardDeviation StandardDeviationFilter StandardForm Standardize StandbyDistribution Star StarGraph StartAsynchronousTask StartingStepSize StartOfLine StartOfString StartScheduledTask StartupSound StateDimensions StateFeedbackGains StateOutputEstimator StateResponse StateSpaceModel StateSpaceRealization StateSpaceTransform StationaryDistribution StationaryWaveletPacketTransform StationaryWaveletTransform StatusArea StatusCentrality StepMonitor StieltjesGamma StirlingS1 StirlingS2 StopAsynchronousTask StopScheduledTask StrataVariables StratonovichProcess StreamColorFunction StreamColorFunctionScaling StreamDensityPlot StreamPlot StreamPoints StreamPosition Streams StreamScale StreamStyle String StringBreak StringByteCount StringCases StringCount StringDrop StringExpression StringForm StringFormat StringFreeQ StringInsert StringJoin StringLength StringMatchQ StringPosition StringQ StringReplace StringReplaceList StringReplacePart StringReverse StringRotateLeft StringRotateRight StringSkeleton StringSplit StringTake StringToStream StringTrim StripBoxes StripOnInput StripWrapperBoxes StrokeForm StructuralImportance StructuredArray StructuredSelection StruveH StruveL Stub StudentTDistribution Style StyleBox StyleBoxAutoDelete StyleBoxOptions StyleData StyleDefinitions StyleForm StyleKeyMapping StyleMenuListing StyleNameDialogSettings StyleNames StylePrint StyleSheetPath Subfactorial Subgraph SubMinus SubPlus SubresultantPolynomialRemainders ' +
      'SubresultantPolynomials Subresultants Subscript SubscriptBox SubscriptBoxOptions Subscripted Subset SubsetEqual Subsets SubStar Subsuperscript SubsuperscriptBox SubsuperscriptBoxOptions Subtract SubtractFrom SubValues Succeeds SucceedsEqual SucceedsSlantEqual SucceedsTilde SuchThat Sum SumConvergence Sunday SuperDagger SuperMinus SuperPlus Superscript SuperscriptBox SuperscriptBoxOptions Superset SupersetEqual SuperStar Surd SurdForm SurfaceColor SurfaceGraphics SurvivalDistribution SurvivalFunction SurvivalModel SurvivalModelFit SuspendPacket SuzukiDistribution SuzukiGroupSuz SwatchLegend Switch Symbol SymbolName SymletWavelet Symmetric SymmetricGroup SymmetricMatrixQ SymmetricPolynomial SymmetricReduction Symmetrize SymmetrizedArray SymmetrizedArrayRules SymmetrizedDependentComponents SymmetrizedIndependentComponents SymmetrizedReplacePart SynchronousInitialization SynchronousUpdating Syntax SyntaxForm SyntaxInformation SyntaxLength SyntaxPacket SyntaxQ SystemDialogInput SystemException SystemHelpPath SystemInformation SystemInformationData SystemOpen SystemOptions SystemsModelDelay SystemsModelDelayApproximate SystemsModelDelete SystemsModelDimensions SystemsModelExtract SystemsModelFeedbackConnect SystemsModelLabels SystemsModelOrder SystemsModelParallelConnect SystemsModelSeriesConnect SystemsModelStateFeedbackConnect SystemStub ' +
      'Tab TabFilling Table TableAlignments TableDepth TableDirections TableForm TableHeadings TableSpacing TableView TableViewBox TabSpacings TabView TabViewBox TabViewBoxOptions TagBox TagBoxNote TagBoxOptions TaggingRules TagSet TagSetDelayed TagStyle TagUnset Take TakeWhile Tally Tan Tanh TargetFunctions TargetUnits TautologyQ TelegraphProcess TemplateBox TemplateBoxOptions TemplateSlotSequence TemporalData Temporary TemporaryVariable TensorContract TensorDimensions TensorExpand TensorProduct TensorQ TensorRank TensorReduce TensorSymmetry TensorTranspose TensorWedge Tetrahedron TetrahedronBox TetrahedronBoxOptions TeXForm TeXSave Text Text3DBox Text3DBoxOptions TextAlignment TextBand TextBoundingBox TextBox TextCell TextClipboardType TextData TextForm TextJustification TextLine TextPacket TextParagraph TextRecognize TextRendering TextStyle Texture TextureCoordinateFunction TextureCoordinateScaling Therefore ThermometerGauge Thick Thickness Thin Thinning ThisLink ThompsonGroupTh Thread ThreeJSymbol Threshold Through Throw Thumbnail Thursday Ticks TicksStyle Tilde TildeEqual TildeFullEqual TildeTilde TimeConstrained TimeConstraint Times TimesBy TimeSeriesForecast TimeSeriesInvertibility TimeUsed TimeValue TimeZone Timing Tiny TitleGrouping TitsGroupT ToBoxes ToCharacterCode ToColor ToContinuousTimeModel ToDate ToDiscreteTimeModel ToeplitzMatrix ToExpression ToFileName Together Toggle ToggleFalse Toggler TogglerBar TogglerBox TogglerBoxOptions ToHeldExpression ToInvertibleTimeSeries TokenWords Tolerance ToLowerCase ToNumberField TooBig Tooltip TooltipBox TooltipBoxOptions TooltipDelay TooltipStyle Top TopHatTransform TopologicalSort ToRadicals ToRules ToString Total TotalHeight TotalVariationFilter TotalWidth TouchscreenAutoZoom TouchscreenControlPlacement ToUpperCase Tr Trace TraceAbove TraceAction TraceBackward TraceDepth TraceDialog TraceForward TraceInternal TraceLevel TraceOff TraceOn TraceOriginal TracePrint TraceScan TrackedSymbols TradingChart TraditionalForm TraditionalFunctionNotation TraditionalNotation TraditionalOrder TransferFunctionCancel TransferFunctionExpand TransferFunctionFactor TransferFunctionModel TransferFunctionPoles TransferFunctionTransform TransferFunctionZeros TransformationFunction TransformationFunctions TransformationMatrix TransformedDistribution TransformedField Translate TranslationTransform TransparentColor Transpose TreeForm TreeGraph TreeGraphQ TreePlot TrendStyle TriangleWave TriangularDistribution Trig TrigExpand TrigFactor TrigFactorList Trigger TrigReduce TrigToExp TrimmedMean True TrueQ TruncatedDistribution TsallisQExponentialDistribution TsallisQGaussianDistribution TTest Tube TubeBezierCurveBox TubeBezierCurveBoxOptions TubeBox TubeBSplineCurveBox TubeBSplineCurveBoxOptions Tuesday TukeyLambdaDistribution TukeyWindow Tuples TuranGraph TuringMachine ' +
      'Transparent ' +
      'UnateQ Uncompress Undefined UnderBar Underflow Underlined Underoverscript UnderoverscriptBox UnderoverscriptBoxOptions Underscript UnderscriptBox UnderscriptBoxOptions UndirectedEdge UndirectedGraph UndirectedGraphQ UndocumentedTestFEParserPacket UndocumentedTestGetSelectionPacket Unequal Unevaluated UniformDistribution UniformGraphDistribution UniformSumDistribution Uninstall Union UnionPlus Unique UnitBox UnitConvert UnitDimensions Unitize UnitRootTest UnitSimplify UnitStep UnitTriangle UnitVector Unprotect UnsameQ UnsavedVariables Unset UnsetShared UntrackedVariables Up UpArrow UpArrowBar UpArrowDownArrow Update UpdateDynamicObjects UpdateDynamicObjectsSynchronous UpdateInterval UpDownArrow UpEquilibrium UpperCaseQ UpperLeftArrow UpperRightArrow UpperTriangularize Upsample UpSet UpSetDelayed UpTee UpTeeArrow UpValues URL URLFetch URLFetchAsynchronous URLSave URLSaveAsynchronous UseGraphicsRange Using UsingFrontEnd ' +
      'V2Get ValidationLength Value ValueBox ValueBoxOptions ValueForm ValueQ ValuesData Variables Variance VarianceEquivalenceTest VarianceEstimatorFunction VarianceGammaDistribution VarianceTest VectorAngle VectorColorFunction VectorColorFunctionScaling VectorDensityPlot VectorGlyphData VectorPlot VectorPlot3D VectorPoints VectorQ Vectors VectorScale VectorStyle Vee Verbatim Verbose VerboseConvertToPostScriptPacket VerifyConvergence VerifySolutions VerifyTestAssumptions Version VersionNumber VertexAdd VertexCapacity VertexColors VertexComponent VertexConnectivity VertexCoordinateRules VertexCoordinates VertexCorrelationSimilarity VertexCosineSimilarity VertexCount VertexCoverQ VertexDataCoordinates VertexDegree VertexDelete VertexDiceSimilarity VertexEccentricity VertexInComponent VertexInDegree VertexIndex VertexJaccardSimilarity VertexLabeling VertexLabels VertexLabelStyle VertexList VertexNormals VertexOutComponent VertexOutDegree VertexQ VertexRenderingFunction VertexReplace VertexShape VertexShapeFunction VertexSize VertexStyle VertexTextureCoordinates VertexWeight Vertical VerticalBar VerticalForm VerticalGauge VerticalSeparator VerticalSlider VerticalTilde ViewAngle ViewCenter ViewMatrix ViewPoint ViewPointSelectorSettings ViewPort ViewRange ViewVector ViewVertical VirtualGroupData Visible VisibleCell VoigtDistribution VonMisesDistribution ' +
      'WaitAll WaitAsynchronousTask WaitNext WaitUntil WakebyDistribution WalleniusHypergeometricDistribution WaringYuleDistribution WatershedComponents WatsonUSquareTest WattsStrogatzGraphDistribution WaveletBestBasis WaveletFilterCoefficients WaveletImagePlot WaveletListPlot WaveletMapIndexed WaveletMatrixPlot WaveletPhi WaveletPsi WaveletScale WaveletScalogram WaveletThreshold WeaklyConnectedComponents WeaklyConnectedGraphQ WeakStationarity WeatherData WeberE Wedge Wednesday WeibullDistribution WeierstrassHalfPeriods WeierstrassInvariants WeierstrassP WeierstrassPPrime WeierstrassSigma WeierstrassZeta WeightedAdjacencyGraph WeightedAdjacencyMatrix WeightedData WeightedGraphQ Weights WelchWindow WheelGraph WhenEvent Which While White Whitespace WhitespaceCharacter WhittakerM WhittakerW WienerFilter WienerProcess WignerD WignerSemicircleDistribution WilksW WilksWTest WindowClickSelect WindowElements WindowFloating WindowFrame WindowFrameElements WindowMargins WindowMovable WindowOpacity WindowSelected WindowSize WindowStatusArea WindowTitle WindowToolbars WindowWidth With WolframAlpha WolframAlphaDate WolframAlphaQuantity WolframAlphaResult Word WordBoundary WordCharacter WordData WordSearch WordSeparators WorkingPrecision Write WriteString Wronskian ' +
      'XMLElement XMLObject Xnor Xor ' +
      'Yellow YuleDissimilarity ' +
      'ZernikeR ZeroSymmetric ZeroTest ZeroWidthTimes Zeta ZetaZero ZipfDistribution ZTest ZTransform ' +
      '$Aborted $ActivationGroupID $ActivationKey $ActivationUserRegistered $AddOnsDirectory $AssertFunction $Assumptions $AsynchronousTask $BaseDirectory $BatchInput $BatchOutput $BoxForms $ByteOrdering $Canceled $CharacterEncoding $CharacterEncodings $CommandLine $CompilationTarget $ConditionHold $ConfiguredKernels $Context $ContextPath $ControlActiveSetting $CreationDate $CurrentLink $DateStringFormat $DefaultFont $DefaultFrontEnd $DefaultImagingDevice $DefaultPath $Display $DisplayFunction $DistributedContexts $DynamicEvaluation $Echo $Epilog $ExportFormats $Failed $FinancialDataSource $FormatType $FrontEnd $FrontEndSession $GeoLocation $HistoryLength $HomeDirectory $HTTPCookies $IgnoreEOF $ImagingDevices $ImportFormats $InitialDirectory $Input $InputFileName $InputStreamMethods $Inspector $InstallationDate $InstallationDirectory $InterfaceEnvironment $IterationLimit $KernelCount $KernelID $Language $LaunchDirectory $LibraryPath $LicenseExpirationDate $LicenseID $LicenseProcesses $LicenseServer $LicenseSubprocesses $LicenseType $Line $Linked $LinkSupported $LoadedFiles $MachineAddresses $MachineDomain $MachineDomains $MachineEpsilon $MachineID $MachineName $MachinePrecision $MachineType $MaxExtraPrecision $MaxLicenseProcesses $MaxLicenseSubprocesses $MaxMachineNumber $MaxNumber $MaxPiecewiseCases $MaxPrecision $MaxRootDegree $MessageGroups $MessageList $MessagePrePrint $Messages $MinMachineNumber $MinNumber $MinorReleaseNumber $MinPrecision $ModuleNumber $NetworkLicense $NewMessage $NewSymbol $Notebooks $NumberMarks $Off $OperatingSystem $Output $OutputForms $OutputSizeLimit $OutputStreamMethods $Packages $ParentLink $ParentProcessID $PasswordFile $PatchLevelID $Path $PathnameSeparator $PerformanceGoal $PipeSupported $Post $Pre $PreferencesDirectory $PrePrint $PreRead $PrintForms $PrintLiteral $ProcessID $ProcessorCount $ProcessorType $ProductInformation $ProgramName $RandomState $RecursionLimit $ReleaseNumber $RootDirectory $ScheduledTask $ScriptCommandLine $SessionID $SetParentLink $SharedFunctions $SharedVariables $SoundDisplay $SoundDisplayFunction $SuppressInputFormHeads $SynchronousEvaluation $SyntaxHandler $System $SystemCharacterEncoding $SystemID $SystemWordLength $TemporaryDirectory $TemporaryPrefix $TextStyle $TimedOut $TimeUnit $TimeZone $TopDirectory $TraceOff $TraceOn $TracePattern $TracePostAction $TracePreAction $Urgent $UserAddOnsDirectory $UserBaseDirectory $UserDocumentsDirectory $UserName $Version $VersionNumber',
    contains: [
      {
        className: 'comment',
        begin: /\(\*/, end: /\*\)/
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        begin: /\{/, end: /\}/,
        illegal: /:/
      }
    ]
  };
});

hljs.registerLanguage('matlab', function(hljs) {
  var COMMON_CONTAINS = [
    hljs.C_NUMBER_MODE,
    {
      className: 'string',
      begin: '\'', end: '\'',
      contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}]
    }
  ];
  var TRANSPOSE = {
    relevance: 0,
    contains: [
      {
        begin: /'['\.]*/
      }
    ]
  };

  return {
    keywords: {
      keyword:
        'break case catch classdef continue else elseif end enumerated events for function ' +
        'global if methods otherwise parfor persistent properties return spmd switch try while',
      built_in:
        'sin sind sinh asin asind asinh cos cosd cosh acos acosd acosh tan tand tanh atan ' +
        'atand atan2 atanh sec secd sech asec asecd asech csc cscd csch acsc acscd acsch cot ' +
        'cotd coth acot acotd acoth hypot exp expm1 log log1p log10 log2 pow2 realpow reallog ' +
        'realsqrt sqrt nthroot nextpow2 abs angle complex conj imag real unwrap isreal ' +
        'cplxpair fix floor ceil round mod rem sign airy besselj bessely besselh besseli ' +
        'besselk beta betainc betaln ellipj ellipke erf erfc erfcx erfinv expint gamma ' +
        'gammainc gammaln psi legendre cross dot factor isprime primes gcd lcm rat rats perms ' +
        'nchoosek factorial cart2sph cart2pol pol2cart sph2cart hsv2rgb rgb2hsv zeros ones ' +
        'eye repmat rand randn linspace logspace freqspace meshgrid accumarray size length ' +
        'ndims numel disp isempty isequal isequalwithequalnans cat reshape diag blkdiag tril ' +
        'triu fliplr flipud flipdim rot90 find sub2ind ind2sub bsxfun ndgrid permute ipermute ' +
        'shiftdim circshift squeeze isscalar isvector ans eps realmax realmin pi i inf nan ' +
        'isnan isinf isfinite j why compan gallery hadamard hankel hilb invhilb magic pascal ' +
        'rosser toeplitz vander wilkinson'
    },
    illegal: '(//|"|#|/\\*|\\s+/\\w+)',
    contains: [
      {
        className: 'function',
        beginKeywords: 'function', end: '$',
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: 'params',
            variants: [
              {begin: '\\(', end: '\\)'},
              {begin: '\\[', end: '\\]'}
            ]
          }
        ]
      },
      {
        begin: /[a-zA-Z_][a-zA-Z_0-9]*'['\.]*/,
        returnBegin: true,
        relevance: 0,
        contains: [
          {begin: /[a-zA-Z_][a-zA-Z_0-9]*/, relevance: 0},
          TRANSPOSE.contains[0]
        ]
      },
      {
        begin: '\\[', end: '\\]',
        contains: COMMON_CONTAINS,
        relevance: 0,
        starts: TRANSPOSE
      },
      {
        begin: '\\{', end: /}/,
        contains: COMMON_CONTAINS,
        relevance: 0,
        starts: TRANSPOSE
      },
      {
        // transpose operators at the end of a function call
        begin: /\)/,
        relevance: 0,
        starts: TRANSPOSE
      },
      hljs.COMMENT('^\\s*\\%\\{\\s*$', '^\\s*\\%\\}\\s*$'),
      hljs.COMMENT('\\%', '$')
    ].concat(COMMON_CONTAINS)
  };
});

hljs.registerLanguage('mel', function(hljs) {
  return {
    keywords:
      'int float string vector matrix if else switch case default while do for in break ' +
      'continue global proc return about abs addAttr addAttributeEditorNodeHelp addDynamic ' +
      'addNewShelfTab addPP addPanelCategory addPrefixToName advanceToNextDrivenKey ' +
      'affectedNet affects aimConstraint air alias aliasAttr align alignCtx alignCurve ' +
      'alignSurface allViewFit ambientLight angle angleBetween animCone animCurveEditor ' +
      'animDisplay animView annotate appendStringArray applicationName applyAttrPreset ' +
      'applyTake arcLenDimContext arcLengthDimension arclen arrayMapper art3dPaintCtx ' +
      'artAttrCtx artAttrPaintVertexCtx artAttrSkinPaintCtx artAttrTool artBuildPaintMenu ' +
      'artFluidAttrCtx artPuttyCtx artSelectCtx artSetPaintCtx artUserPaintCtx assignCommand ' +
      'assignInputDevice assignViewportFactories attachCurve attachDeviceAttr attachSurface ' +
      'attrColorSliderGrp attrCompatibility attrControlGrp attrEnumOptionMenu ' +
      'attrEnumOptionMenuGrp attrFieldGrp attrFieldSliderGrp attrNavigationControlGrp ' +
      'attrPresetEditWin attributeExists attributeInfo attributeMenu attributeQuery ' +
      'autoKeyframe autoPlace bakeClip bakeFluidShading bakePartialHistory bakeResults ' +
      'bakeSimulation basename basenameEx batchRender bessel bevel bevelPlus binMembership ' +
      'bindSkin blend2 blendShape blendShapeEditor blendShapePanel blendTwoAttr blindDataType ' +
      'boneLattice boundary boxDollyCtx boxZoomCtx bufferCurve buildBookmarkMenu ' +
      'buildKeyframeMenu button buttonManip CBG cacheFile cacheFileCombine cacheFileMerge ' +
      'cacheFileTrack camera cameraView canCreateManip canvas capitalizeString catch ' +
      'catchQuiet ceil changeSubdivComponentDisplayLevel changeSubdivRegion channelBox ' +
      'character characterMap characterOutlineEditor characterize chdir checkBox checkBoxGrp ' +
      'checkDefaultRenderGlobals choice circle circularFillet clamp clear clearCache clip ' +
      'clipEditor clipEditorCurrentTimeCtx clipSchedule clipSchedulerOutliner clipTrimBefore ' +
      'closeCurve closeSurface cluster cmdFileOutput cmdScrollFieldExecuter ' +
      'cmdScrollFieldReporter cmdShell coarsenSubdivSelectionList collision color ' +
      'colorAtPoint colorEditor colorIndex colorIndexSliderGrp colorSliderButtonGrp ' +
      'colorSliderGrp columnLayout commandEcho commandLine commandPort compactHairSystem ' +
      'componentEditor compositingInterop computePolysetVolume condition cone confirmDialog ' +
      'connectAttr connectControl connectDynamic connectJoint connectionInfo constrain ' +
      'constrainValue constructionHistory container containsMultibyte contextInfo control ' +
      'convertFromOldLayers convertIffToPsd convertLightmap convertSolidTx convertTessellation ' +
      'convertUnit copyArray copyFlexor copyKey copySkinWeights cos cpButton cpCache ' +
      'cpClothSet cpCollision cpConstraint cpConvClothToMesh cpForces cpGetSolverAttr cpPanel ' +
      'cpProperty cpRigidCollisionFilter cpSeam cpSetEdit cpSetSolverAttr cpSolver ' +
      'cpSolverTypes cpTool cpUpdateClothUVs createDisplayLayer createDrawCtx createEditor ' +
      'createLayeredPsdFile createMotionField createNewShelf createNode createRenderLayer ' +
      'createSubdivRegion cross crossProduct ctxAbort ctxCompletion ctxEditMode ctxTraverse ' +
      'currentCtx currentTime currentTimeCtx currentUnit curve curveAddPtCtx ' +
      'curveCVCtx curveEPCtx curveEditorCtx curveIntersect curveMoveEPCtx curveOnSurface ' +
      'curveSketchCtx cutKey cycleCheck cylinder dagPose date defaultLightListCheckBox ' +
      'defaultNavigation defineDataServer defineVirtualDevice deformer deg_to_rad delete ' +
      'deleteAttr deleteShadingGroupsAndMaterials deleteShelfTab deleteUI deleteUnusedBrushes ' +
      'delrandstr detachCurve detachDeviceAttr detachSurface deviceEditor devicePanel dgInfo ' +
      'dgdirty dgeval dgtimer dimWhen directKeyCtx directionalLight dirmap dirname disable ' +
      'disconnectAttr disconnectJoint diskCache displacementToPoly displayAffected ' +
      'displayColor displayCull displayLevelOfDetail displayPref displayRGBColor ' +
      'displaySmoothness displayStats displayString displaySurface distanceDimContext ' +
      'distanceDimension doBlur dolly dollyCtx dopeSheetEditor dot dotProduct ' +
      'doubleProfileBirailSurface drag dragAttrContext draggerContext dropoffLocator ' +
      'duplicate duplicateCurve duplicateSurface dynCache dynControl dynExport dynExpression ' +
      'dynGlobals dynPaintEditor dynParticleCtx dynPref dynRelEdPanel dynRelEditor ' +
      'dynamicLoad editAttrLimits editDisplayLayerGlobals editDisplayLayerMembers ' +
      'editRenderLayerAdjustment editRenderLayerGlobals editRenderLayerMembers editor ' +
      'editorTemplate effector emit emitter enableDevice encodeString endString endsWith env ' +
      'equivalent equivalentTol erf error eval evalDeferred evalEcho event ' +
      'exactWorldBoundingBox exclusiveLightCheckBox exec executeForEachObject exists exp ' +
      'expression expressionEditorListen extendCurve extendSurface extrude fcheck fclose feof ' +
      'fflush fgetline fgetword file fileBrowserDialog fileDialog fileExtension fileInfo ' +
      'filetest filletCurve filter filterCurve filterExpand filterStudioImport ' +
      'findAllIntersections findAnimCurves findKeyframe findMenuItem findRelatedSkinCluster ' +
      'finder firstParentOf fitBspline flexor floatEq floatField floatFieldGrp floatScrollBar ' +
      'floatSlider floatSlider2 floatSliderButtonGrp floatSliderGrp floor flow fluidCacheInfo ' +
      'fluidEmitter fluidVoxelInfo flushUndo fmod fontDialog fopen formLayout format fprint ' +
      'frameLayout fread freeFormFillet frewind fromNativePath fwrite gamma gauss ' +
      'geometryConstraint getApplicationVersionAsFloat getAttr getClassification ' +
      'getDefaultBrush getFileList getFluidAttr getInputDeviceRange getMayaPanelTypes ' +
      'getModifiers getPanel getParticleAttr getPluginResource getenv getpid glRender ' +
      'glRenderEditor globalStitch gmatch goal gotoBindPose grabColor gradientControl ' +
      'gradientControlNoAttr graphDollyCtx graphSelectContext graphTrackCtx gravity grid ' +
      'gridLayout group groupObjectsByName HfAddAttractorToAS HfAssignAS HfBuildEqualMap ' +
      'HfBuildFurFiles HfBuildFurImages HfCancelAFR HfConnectASToHF HfCreateAttractor ' +
      'HfDeleteAS HfEditAS HfPerformCreateAS HfRemoveAttractorFromAS HfSelectAttached ' +
      'HfSelectAttractors HfUnAssignAS hardenPointCurve hardware hardwareRenderPanel ' +
      'headsUpDisplay headsUpMessage help helpLine hermite hide hilite hitTest hotBox hotkey ' +
      'hotkeyCheck hsv_to_rgb hudButton hudSlider hudSliderButton hwReflectionMap hwRender ' +
      'hwRenderLoad hyperGraph hyperPanel hyperShade hypot iconTextButton iconTextCheckBox ' +
      'iconTextRadioButton iconTextRadioCollection iconTextScrollList iconTextStaticLabel ' +
      'ikHandle ikHandleCtx ikHandleDisplayScale ikSolver ikSplineHandleCtx ikSystem ' +
      'ikSystemInfo ikfkDisplayMethod illustratorCurves image imfPlugins inheritTransform ' +
      'insertJoint insertJointCtx insertKeyCtx insertKnotCurve insertKnotSurface instance ' +
      'instanceable instancer intField intFieldGrp intScrollBar intSlider intSliderGrp ' +
      'interToUI internalVar intersect iprEngine isAnimCurve isConnected isDirty isParentOf ' +
      'isSameObject isTrue isValidObjectName isValidString isValidUiName isolateSelect ' +
      'itemFilter itemFilterAttr itemFilterRender itemFilterType joint jointCluster jointCtx ' +
      'jointDisplayScale jointLattice keyTangent keyframe keyframeOutliner ' +
      'keyframeRegionCurrentTimeCtx keyframeRegionDirectKeyCtx keyframeRegionDollyCtx ' +
      'keyframeRegionInsertKeyCtx keyframeRegionMoveKeyCtx keyframeRegionScaleKeyCtx ' +
      'keyframeRegionSelectKeyCtx keyframeRegionSetKeyCtx keyframeRegionTrackCtx ' +
      'keyframeStats lassoContext lattice latticeDeformKeyCtx launch launchImageEditor ' +
      'layerButton layeredShaderPort layeredTexturePort layout layoutDialog lightList ' +
      'lightListEditor lightListPanel lightlink lineIntersection linearPrecision linstep ' +
      'listAnimatable listAttr listCameras listConnections listDeviceAttachments listHistory ' +
      'listInputDeviceAxes listInputDeviceButtons listInputDevices listMenuAnnotation ' +
      'listNodeTypes listPanelCategories listRelatives listSets listTransforms ' +
      'listUnselected listerEditor loadFluid loadNewShelf loadPlugin ' +
      'loadPluginLanguageResources loadPrefObjects localizedPanelLabel lockNode loft log ' +
      'longNameOf lookThru ls lsThroughFilter lsType lsUI Mayatomr mag makeIdentity makeLive ' +
      'makePaintable makeRoll makeSingleSurface makeTubeOn makebot manipMoveContext ' +
      'manipMoveLimitsCtx manipOptions manipRotateContext manipRotateLimitsCtx ' +
      'manipScaleContext manipScaleLimitsCtx marker match max memory menu menuBarLayout ' +
      'menuEditor menuItem menuItemToShelf menuSet menuSetPref messageLine min minimizeApp ' +
      'mirrorJoint modelCurrentTimeCtx modelEditor modelPanel mouse movIn movOut move ' +
      'moveIKtoFK moveKeyCtx moveVertexAlongDirection multiProfileBirailSurface mute ' +
      'nParticle nameCommand nameField namespace namespaceInfo newPanelItems newton nodeCast ' +
      'nodeIconButton nodeOutliner nodePreset nodeType noise nonLinear normalConstraint ' +
      'normalize nurbsBoolean nurbsCopyUVSet nurbsCube nurbsEditUV nurbsPlane nurbsSelect ' +
      'nurbsSquare nurbsToPoly nurbsToPolygonsPref nurbsToSubdiv nurbsToSubdivPref ' +
      'nurbsUVSet nurbsViewDirectionVector objExists objectCenter objectLayer objectType ' +
      'objectTypeUI obsoleteProc oceanNurbsPreviewPlane offsetCurve offsetCurveOnSurface ' +
      'offsetSurface openGLExtension openMayaPref optionMenu optionMenuGrp optionVar orbit ' +
      'orbitCtx orientConstraint outlinerEditor outlinerPanel overrideModifier ' +
      'paintEffectsDisplay pairBlend palettePort paneLayout panel panelConfiguration ' +
      'panelHistory paramDimContext paramDimension paramLocator parent parentConstraint ' +
      'particle particleExists particleInstancer particleRenderInfo partition pasteKey ' +
      'pathAnimation pause pclose percent performanceOptions pfxstrokes pickWalk picture ' +
      'pixelMove planarSrf plane play playbackOptions playblast plugAttr plugNode pluginInfo ' +
      'pluginResourceUtil pointConstraint pointCurveConstraint pointLight pointMatrixMult ' +
      'pointOnCurve pointOnSurface pointPosition poleVectorConstraint polyAppend ' +
      'polyAppendFacetCtx polyAppendVertex polyAutoProjection polyAverageNormal ' +
      'polyAverageVertex polyBevel polyBlendColor polyBlindData polyBoolOp polyBridgeEdge ' +
      'polyCacheMonitor polyCheck polyChipOff polyClipboard polyCloseBorder polyCollapseEdge ' +
      'polyCollapseFacet polyColorBlindData polyColorDel polyColorPerVertex polyColorSet ' +
      'polyCompare polyCone polyCopyUV polyCrease polyCreaseCtx polyCreateFacet ' +
      'polyCreateFacetCtx polyCube polyCut polyCutCtx polyCylinder polyCylindricalProjection ' +
      'polyDelEdge polyDelFacet polyDelVertex polyDuplicateAndConnect polyDuplicateEdge ' +
      'polyEditUV polyEditUVShell polyEvaluate polyExtrudeEdge polyExtrudeFacet ' +
      'polyExtrudeVertex polyFlipEdge polyFlipUV polyForceUV polyGeoSampler polyHelix ' +
      'polyInfo polyInstallAction polyLayoutUV polyListComponentConversion polyMapCut ' +
      'polyMapDel polyMapSew polyMapSewMove polyMergeEdge polyMergeEdgeCtx polyMergeFacet ' +
      'polyMergeFacetCtx polyMergeUV polyMergeVertex polyMirrorFace polyMoveEdge ' +
      'polyMoveFacet polyMoveFacetUV polyMoveUV polyMoveVertex polyNormal polyNormalPerVertex ' +
      'polyNormalizeUV polyOptUvs polyOptions polyOutput polyPipe polyPlanarProjection ' +
      'polyPlane polyPlatonicSolid polyPoke polyPrimitive polyPrism polyProjection ' +
      'polyPyramid polyQuad polyQueryBlindData polyReduce polySelect polySelectConstraint ' +
      'polySelectConstraintMonitor polySelectCtx polySelectEditCtx polySeparate ' +
      'polySetToFaceNormal polySewEdge polyShortestPathCtx polySmooth polySoftEdge ' +
      'polySphere polySphericalProjection polySplit polySplitCtx polySplitEdge polySplitRing ' +
      'polySplitVertex polyStraightenUVBorder polySubdivideEdge polySubdivideFacet ' +
      'polyToSubdiv polyTorus polyTransfer polyTriangulate polyUVSet polyUnite polyWedgeFace ' +
      'popen popupMenu pose pow preloadRefEd print progressBar progressWindow projFileViewer ' +
      'projectCurve projectTangent projectionContext projectionManip promptDialog propModCtx ' +
      'propMove psdChannelOutliner psdEditTextureFile psdExport psdTextureFile putenv pwd ' +
      'python querySubdiv quit rad_to_deg radial radioButton radioButtonGrp radioCollection ' +
      'radioMenuItemCollection rampColorPort rand randomizeFollicles randstate rangeControl ' +
      'readTake rebuildCurve rebuildSurface recordAttr recordDevice redo reference ' +
      'referenceEdit referenceQuery refineSubdivSelectionList refresh refreshAE ' +
      'registerPluginResource rehash reloadImage removeJoint removeMultiInstance ' +
      'removePanelCategory rename renameAttr renameSelectionList renameUI render ' +
      'renderGlobalsNode renderInfo renderLayerButton renderLayerParent ' +
      'renderLayerPostProcess renderLayerUnparent renderManip renderPartition ' +
      'renderQualityNode renderSettings renderThumbnailUpdate renderWindowEditor ' +
      'renderWindowSelectContext renderer reorder reorderDeformers requires reroot ' +
      'resampleFluid resetAE resetPfxToPolyCamera resetTool resolutionNode retarget ' +
      'reverseCurve reverseSurface revolve rgb_to_hsv rigidBody rigidSolver roll rollCtx ' +
      'rootOf rot rotate rotationInterpolation roundConstantRadius rowColumnLayout rowLayout ' +
      'runTimeCommand runup sampleImage saveAllShelves saveAttrPreset saveFluid saveImage ' +
      'saveInitialState saveMenu savePrefObjects savePrefs saveShelf saveToolSettings scale ' +
      'scaleBrushBrightness scaleComponents scaleConstraint scaleKey scaleKeyCtx sceneEditor ' +
      'sceneUIReplacement scmh scriptCtx scriptEditorInfo scriptJob scriptNode scriptTable ' +
      'scriptToShelf scriptedPanel scriptedPanelType scrollField scrollLayout sculpt ' +
      'searchPathArray seed selLoadSettings select selectContext selectCurveCV selectKey ' +
      'selectKeyCtx selectKeyframeRegionCtx selectMode selectPref selectPriority selectType ' +
      'selectedNodes selectionConnection separator setAttr setAttrEnumResource ' +
      'setAttrMapping setAttrNiceNameResource setConstraintRestPosition ' +
      'setDefaultShadingGroup setDrivenKeyframe setDynamic setEditCtx setEditor setFluidAttr ' +
      'setFocus setInfinity setInputDeviceMapping setKeyCtx setKeyPath setKeyframe ' +
      'setKeyframeBlendshapeTargetWts setMenuMode setNodeNiceNameResource setNodeTypeFlag ' +
      'setParent setParticleAttr setPfxToPolyCamera setPluginResource setProject ' +
      'setStampDensity setStartupMessage setState setToolTo setUITemplate setXformManip sets ' +
      'shadingConnection shadingGeometryRelCtx shadingLightRelCtx shadingNetworkCompare ' +
      'shadingNode shapeCompare shelfButton shelfLayout shelfTabLayout shellField ' +
      'shortNameOf showHelp showHidden showManipCtx showSelectionInTitle ' +
      'showShadingGroupAttrEditor showWindow sign simplify sin singleProfileBirailSurface ' +
      'size sizeBytes skinCluster skinPercent smoothCurve smoothTangentSurface smoothstep ' +
      'snap2to2 snapKey snapMode snapTogetherCtx snapshot soft softMod softModCtx sort sound ' +
      'soundControl source spaceLocator sphere sphrand spotLight spotLightPreviewPort ' +
      'spreadSheetEditor spring sqrt squareSurface srtContext stackTrace startString ' +
      'startsWith stitchAndExplodeShell stitchSurface stitchSurfacePoints strcmp ' +
      'stringArrayCatenate stringArrayContains stringArrayCount stringArrayInsertAtIndex ' +
      'stringArrayIntersector stringArrayRemove stringArrayRemoveAtIndex ' +
      'stringArrayRemoveDuplicates stringArrayRemoveExact stringArrayToString ' +
      'stringToStringArray strip stripPrefixFromName stroke subdAutoProjection ' +
      'subdCleanTopology subdCollapse subdDuplicateAndConnect subdEditUV ' +
      'subdListComponentConversion subdMapCut subdMapSewMove subdMatchTopology subdMirror ' +
      'subdToBlind subdToPoly subdTransferUVsToCache subdiv subdivCrease ' +
      'subdivDisplaySmoothness substitute substituteAllString substituteGeometry substring ' +
      'surface surfaceSampler surfaceShaderList swatchDisplayPort switchTable symbolButton ' +
      'symbolCheckBox sysFile system tabLayout tan tangentConstraint texLatticeDeformContext ' +
      'texManipContext texMoveContext texMoveUVShellContext texRotateContext texScaleContext ' +
      'texSelectContext texSelectShortestPathCtx texSmudgeUVContext texWinToolCtx text ' +
      'textCurves textField textFieldButtonGrp textFieldGrp textManip textScrollList ' +
      'textToShelf textureDisplacePlane textureHairColor texturePlacementContext ' +
      'textureWindow threadCount threePointArcCtx timeControl timePort timerX toNativePath ' +
      'toggle toggleAxis toggleWindowVisibility tokenize tokenizeList tolerance tolower ' +
      'toolButton toolCollection toolDropped toolHasOptions toolPropertyWindow torus toupper ' +
      'trace track trackCtx transferAttributes transformCompare transformLimits translator ' +
      'trim trunc truncateFluidCache truncateHairCache tumble tumbleCtx turbulence ' +
      'twoPointArcCtx uiRes uiTemplate unassignInputDevice undo undoInfo ungroup uniform unit ' +
      'unloadPlugin untangleUV untitledFileName untrim upAxis updateAE userCtx uvLink ' +
      'uvSnapshot validateShelfName vectorize view2dToolCtx viewCamera viewClipPlane ' +
      'viewFit viewHeadOn viewLookAt viewManip viewPlace viewSet visor volumeAxis vortex ' +
      'waitCursor warning webBrowser webBrowserPrefs whatIs window windowPref wire ' +
      'wireContext workspace wrinkle wrinkleContext writeTake xbmLangPathList xform',
    illegal: '</',
    contains: [
      hljs.C_NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: '`', end: '`',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      { // eats variables
        begin: '[\\$\\%\\@](\\^\\w\\b|#\\w+|[^\\s\\w{]|{\\w+}|\\w+)'
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };
});

hljs.registerLanguage('mercury', function(hljs) {
  var KEYWORDS = {
    keyword:
      'module use_module import_module include_module end_module initialise ' +
      'mutable initialize finalize finalise interface implementation pred ' +
      'mode func type inst solver any_pred any_func is semidet det nondet ' +
      'multi erroneous failure cc_nondet cc_multi typeclass instance where ' +
      'pragma promise external trace atomic or_else require_complete_switch ' +
      'require_det require_semidet require_multi require_nondet ' +
      'require_cc_multi require_cc_nondet require_erroneous require_failure',
    meta:
      // pragma
      'inline no_inline type_spec source_file fact_table obsolete memo ' +
      'loop_check minimal_model terminates does_not_terminate ' +
      'check_termination promise_equivalent_clauses ' +
      // preprocessor
      'foreign_proc foreign_decl foreign_code foreign_type ' +
      'foreign_import_module foreign_export_enum foreign_export ' +
      'foreign_enum may_call_mercury will_not_call_mercury thread_safe ' +
      'not_thread_safe maybe_thread_safe promise_pure promise_semipure ' +
      'tabled_for_io local untrailed trailed attach_to_io_state ' +
      'can_pass_as_mercury_type stable will_not_throw_exception ' +
      'may_modify_trail will_not_modify_trail may_duplicate ' +
      'may_not_duplicate affects_liveness does_not_affect_liveness ' +
      'doesnt_affect_liveness no_sharing unknown_sharing sharing',
    built_in:
      'some all not if then else true fail false try catch catch_any ' +
      'semidet_true semidet_false semidet_fail impure_true impure semipure'
  };

  var COMMENT = hljs.COMMENT('%', '$');

  var NUMCODE = {
    className: 'number',
    begin: "0'.\\|0[box][0-9a-fA-F]*"
  };

  var ATOM = hljs.inherit(hljs.APOS_STRING_MODE, {relevance: 0});
  var STRING = hljs.inherit(hljs.QUOTE_STRING_MODE, {relevance: 0});
  var STRING_FMT = {
    className: 'subst',
    begin: '\\\\[abfnrtv]\\|\\\\x[0-9a-fA-F]*\\\\\\|%[-+# *.0-9]*[dioxXucsfeEgGp]',
    relevance: 0
  };
  STRING.contains.push(STRING_FMT);

  var IMPLICATION = {
    className: 'built_in',
    variants: [
      {begin: '<=>'},
      {begin: '<=', relevance: 0},
      {begin: '=>', relevance: 0},
      {begin: '/\\\\'},
      {begin: '\\\\/'}
    ]
  };

  var HEAD_BODY_CONJUNCTION = {
    className: 'built_in',
    variants: [
      {begin: ':-\\|-->'},
      {begin: '=', relevance: 0}
    ]
  };

  return {
    aliases: ['m', 'moo'],
    keywords: KEYWORDS,
    contains: [
      IMPLICATION,
      HEAD_BODY_CONJUNCTION,
      COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      NUMCODE,
      hljs.NUMBER_MODE,
      ATOM,
      STRING,
      {begin: /:-/} // relevance booster
    ]
  };
});

hljs.registerLanguage('mipsasm', function(hljs) {
    //local labels: %?[FB]?[AT]?\d{1,2}\w+
  return {
    case_insensitive: true,
    aliases: ['mips'],
    lexemes: '\\.?' + hljs.IDENT_RE,
    keywords: {
      meta:
        //GNU preprocs
        '.2byte .4byte .align .ascii .asciz .balign .byte .code .data .else .end .endif .endm .endr .equ .err .exitm .extern .global .hword .if .ifdef .ifndef .include .irp .long .macro .rept .req .section .set .skip .space .text .word .ltorg ',
      built_in:
        '$0 $1 $2 $3 $4 $5 $6 $7 $8 $9 $10 $11 $12 $13 $14 $15 ' + // integer registers
        '$16 $17 $18 $19 $20 $21 $22 $23 $24 $25 $26 $27 $28 $29 $30 $31 ' + // integer registers
        'zero at v0 v1 a0 a1 a2 a3 a4 a5 a6 a7 ' + // integer register aliases
        't0 t1 t2 t3 t4 t5 t6 t7 t8 t9 s0 s1 s2 s3 s4 s5 s6 s7 s8 ' + // integer register aliases
        'k0 k1 gp sp fp ra ' + // integer register aliases
        '$f0 $f1 $f2 $f2 $f4 $f5 $f6 $f7 $f8 $f9 $f10 $f11 $f12 $f13 $f14 $f15 ' + // floating-point registers
        '$f16 $f17 $f18 $f19 $f20 $f21 $f22 $f23 $f24 $f25 $f26 $f27 $f28 $f29 $f30 $f31 ' + // floating-point registers
        'Context Random EntryLo0 EntryLo1 Context PageMask Wired EntryHi ' + // Coprocessor 0 registers
        'HWREna BadVAddr Count Compare SR IntCtl SRSCtl SRSMap Cause EPC PRId ' + // Coprocessor 0 registers
        'EBase Config Config1 Config2 Config3 LLAddr Debug DEPC DESAVE CacheErr ' + // Coprocessor 0 registers
        'ECC ErrorEPC TagLo DataLo TagHi DataHi WatchLo WatchHi PerfCtl PerfCnt ' // Coprocessor 0 registers
    },
    contains: [
      {
        className: 'keyword',
        begin: '\\b('+     //mnemonics
            // 32-bit integer instructions
            'addi?u?|andi?|b(al)?|beql?|bgez(al)?l?|bgtzl?|blezl?|bltz(al)?l?|' +
            'bnel?|cl[oz]|divu?|ext|ins|j(al)?|jalr(\.hb)?|jr(\.hb)?|lbu?|lhu?|' +
            'll|lui|lw[lr]?|maddu?|mfhi|mflo|movn|movz|msubu?|mthi|mtlo|mul|' +
            'multu?|nop|nor|ori?|rotrv?|sb|sc|se[bh]|sh|sllv?|slti?u?|srav?|' +
            'srlv?|subu?|sw[lr]?|xori?|wsbh|' +
            // floating-point instructions
            'abs\.[sd]|add\.[sd]|alnv.ps|bc1[ft]l?|' +
            'c\.(s?f|un|u?eq|[ou]lt|[ou]le|ngle?|seq|l[et]|ng[et])\.[sd]|' +
            '(ceil|floor|round|trunc)\.[lw]\.[sd]|cfc1|cvt\.d\.[lsw]|' +
            'cvt\.l\.[dsw]|cvt\.ps\.s|cvt\.s\.[dlw]|cvt\.s\.p[lu]|cvt\.w\.[dls]|' +
            'div\.[ds]|ldx?c1|luxc1|lwx?c1|madd\.[sd]|mfc1|mov[fntz]?\.[ds]|' +
            'msub\.[sd]|mth?c1|mul\.[ds]|neg\.[ds]|nmadd\.[ds]|nmsub\.[ds]|' +
            'p[lu][lu]\.ps|recip\.fmt|r?sqrt\.[ds]|sdx?c1|sub\.[ds]|suxc1|' +
            'swx?c1|' +
            // system control instructions
            'break|cache|d?eret|[de]i|ehb|mfc0|mtc0|pause|prefx?|rdhwr|' +
            'rdpgpr|sdbbp|ssnop|synci?|syscall|teqi?|tgei?u?|tlb(p|r|w[ir])|' +
            'tlti?u?|tnei?|wait|wrpgpr'+
        ')',
        end: '\\s'
      },
      hljs.COMMENT('[;#]', '$'),
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: '\'',
        end: '[^\\\\]\'',
        relevance: 0
      },
      {
        className: 'title',
        begin: '\\|', end: '\\|',
        illegal: '\\n',
        relevance: 0
      },
      {
        className: 'number',
        variants: [
            {begin: '0x[0-9a-f]+'}, //hex
            {begin: '\\b-?\\d+'}           //bare number
        ],
        relevance: 0
      },
      {
        className: 'symbol',
        variants: [
            {begin: '^\\s*[a-z_\\.\\$][a-z0-9_\\.\\$]+:'}, //GNU MIPS syntax
            {begin: '^\\s*[0-9]+:'}, // numbered local labels
            {begin: '[0-9]+[bf]' }  // number local label reference (backwards, forwards)
        ],
        relevance: 0
      }
    ],
    illegal: '\/'
  };
});

hljs.registerLanguage('mizar', function(hljs) {
  return {
    keywords:
      'environ vocabularies notations constructors definitions ' +
      'registrations theorems schemes requirements begin end definition ' +
      'registration cluster existence pred func defpred deffunc theorem ' +
      'proof let take assume then thus hence ex for st holds consider ' +
      'reconsider such that and in provided of as from be being by means ' +
      'equals implies iff redefine define now not or attr is mode ' +
      'suppose per cases set thesis contradiction scheme reserve struct ' +
      'correctness compatibility coherence symmetry assymetry ' +
      'reflexivity irreflexivity connectedness uniqueness commutativity ' +
      'idempotence involutiveness projectivity',
    contains: [
      hljs.COMMENT('::', '$')
    ]
  };
});

hljs.registerLanguage('perl', function(hljs) {
  var PERL_KEYWORDS = 'getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ' +
    'ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime ' +
    'readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qq' +
    'fileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent ' +
    'shutdown dump chomp connect getsockname die socketpair close flock exists index shmget' +
    'sub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr ' +
    'unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 ' +
    'getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline ' +
    'endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand ' +
    'mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink ' +
    'getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr ' +
    'untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link ' +
    'getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller ' +
    'lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and ' +
    'sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 ' +
    'chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach ' +
    'tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedir' +
    'ioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe ' +
    'atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when';
  var SUBST = {
    className: 'subst',
    begin: '[$@]\\{', end: '\\}',
    keywords: PERL_KEYWORDS
  };
  var METHOD = {
    begin: '->{', end: '}'
    // contains defined later
  };
  var VAR = {
    variants: [
      {begin: /\$\d/},
      {begin: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/},
      {begin: /[\$%@][^\s\w{]/, relevance: 0}
    ]
  };
  var STRING_CONTAINS = [hljs.BACKSLASH_ESCAPE, SUBST, VAR];
  var PERL_DEFAULT_CONTAINS = [
    VAR,
    hljs.HASH_COMMENT_MODE,
    hljs.COMMENT(
      '^\\=\\w',
      '\\=cut',
      {
        endsWithParent: true
      }
    ),
    METHOD,
    {
      className: 'string',
      contains: STRING_CONTAINS,
      variants: [
        {
          begin: 'q[qwxr]?\\s*\\(', end: '\\)',
          relevance: 5
        },
        {
          begin: 'q[qwxr]?\\s*\\[', end: '\\]',
          relevance: 5
        },
        {
          begin: 'q[qwxr]?\\s*\\{', end: '\\}',
          relevance: 5
        },
        {
          begin: 'q[qwxr]?\\s*\\|', end: '\\|',
          relevance: 5
        },
        {
          begin: 'q[qwxr]?\\s*\\<', end: '\\>',
          relevance: 5
        },
        {
          begin: 'qw\\s+q', end: 'q',
          relevance: 5
        },
        {
          begin: '\'', end: '\'',
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: '"', end: '"'
        },
        {
          begin: '`', end: '`',
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: '{\\w+}',
          contains: [],
          relevance: 0
        },
        {
          begin: '\-?\\w+\\s*\\=\\>',
          contains: [],
          relevance: 0
        }
      ]
    },
    {
      className: 'number',
      begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
      relevance: 0
    },
    { // regexp container
      begin: '(\\/\\/|' + hljs.RE_STARTERS_RE + '|\\b(split|return|print|reverse|grep)\\b)\\s*',
      keywords: 'split return print reverse grep',
      relevance: 0,
      contains: [
        hljs.HASH_COMMENT_MODE,
        {
          className: 'regexp',
          begin: '(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*',
          relevance: 10
        },
        {
          className: 'regexp',
          begin: '(m|qr)?/', end: '/[a-z]*',
          contains: [hljs.BACKSLASH_ESCAPE],
          relevance: 0 // allows empty "//" which is a common comment delimiter in other languages
        }
      ]
    },
    {
      className: 'function',
      beginKeywords: 'sub', end: '(\\s*\\(.*?\\))?[;{]', excludeEnd: true,
      relevance: 5,
      contains: [hljs.TITLE_MODE]
    },
    {
      begin: '-\\w\\b',
      relevance: 0
    },
    {
      begin: "^__DATA__$",
      end: "^__END__$",
      subLanguage: 'mojolicious',
      contains: [
        {
            begin: "^@@.*",
            end: "$",
            className: "comment"
        }
      ]
    }
  ];
  SUBST.contains = PERL_DEFAULT_CONTAINS;
  METHOD.contains = PERL_DEFAULT_CONTAINS;

  return {
    aliases: ['pl'],
    keywords: PERL_KEYWORDS,
    contains: PERL_DEFAULT_CONTAINS
  };
});

hljs.registerLanguage('mojolicious', function(hljs) {
  return {
    subLanguage: 'xml',
    contains: [
      {
        className: 'meta',
        begin: '^__(END|DATA)__$'
      },
    // mojolicious line
      {
        begin: "^\\s*%{1,2}={0,2}", end: '$',
        subLanguage: 'perl'
      },
    // mojolicious block
      {
        begin: "<%{1,2}={0,2}",
        end: "={0,1}%>",
        subLanguage: 'perl',
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  };
});

hljs.registerLanguage('monkey', function(hljs) {
  var NUMBER = {
    className: 'number', relevance: 0,
    variants: [
      {
        begin: '[$][a-fA-F0-9]+'
      },
      hljs.NUMBER_MODE
    ]
  };

  return {
    case_insensitive: true,
    keywords: {
      keyword: 'public private property continue exit extern new try catch ' +
        'eachin not abstract final select case default const local global field ' +
        'end if then else elseif endif while wend repeat until forever for ' +
        'to step next return module inline throw import',

      built_in: 'DebugLog DebugStop Error Print ACos ACosr ASin ASinr ATan ATan2 ATan2r ATanr Abs Abs Ceil ' +
        'Clamp Clamp Cos Cosr Exp Floor Log Max Max Min Min Pow Sgn Sgn Sin Sinr Sqrt Tan Tanr Seed PI HALFPI TWOPI',

      literal: 'true false null and or shl shr mod'
    },
    illegal: /\/\*/,
    contains: [
      hljs.COMMENT('#rem', '#end'),
      hljs.COMMENT(
        "'",
        '$',
        {
          relevance: 0
        }
      ),
      {
        className: 'function',
        beginKeywords: 'function method', end: '[(=:]|$',
        illegal: /\n/,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        className: 'class',
        beginKeywords: 'class interface', end: '$',
        contains: [
          {
            beginKeywords: 'extends implements'
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        className: 'built_in',
        begin: '\\b(self|super)\\b'
      },
      {
        className: 'meta',
        begin: '\\s*#', end: '$',
        keywords: {'meta-keyword': 'if else elseif endif end then'}
      },
      {
        className: 'meta',
        begin: '^\\s*strict\\b'
      },
      {
        beginKeywords: 'alias', end: '=',
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      hljs.QUOTE_STRING_MODE,
      NUMBER
    ]
  }
});

hljs.registerLanguage('nginx', function(hljs) {
  var VAR = {
    className: 'variable',
    variants: [
      {begin: /\$\d+/},
      {begin: /\$\{/, end: /}/},
      {begin: '[\\$\\@]' + hljs.UNDERSCORE_IDENT_RE}
    ]
  };
  var DEFAULT = {
    endsWithParent: true,
    lexemes: '[a-z/_]+',
    keywords: {
      literal:
        'on off yes no true false none blocked debug info notice warn error crit ' +
        'select break last permanent redirect kqueue rtsig epoll poll /dev/poll'
    },
    relevance: 0,
    illegal: '=>',
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        className: 'string',
        contains: [hljs.BACKSLASH_ESCAPE, VAR],
        variants: [
          {begin: /"/, end: /"/},
          {begin: /'/, end: /'/}
        ]
      },
      // this swallows entire URLs to avoid detecting numbers within
      {
        begin: '([a-z]+):/', end: '\\s', endsWithParent: true, excludeEnd: true,
        contains: [VAR]
      },
      {
        className: 'regexp',
        contains: [hljs.BACKSLASH_ESCAPE, VAR],
        variants: [
          {begin: "\\s\\^", end: "\\s|{|;", returnEnd: true},
          // regexp locations (~, ~*)
          {begin: "~\\*?\\s+", end: "\\s|{|;", returnEnd: true},
          // *.example.com
          {begin: "\\*(\\.[a-z\\-]+)+"},
          // sub.example.*
          {begin: "([a-z\\-]+\\.)+\\*"}
        ]
      },
      // IP
      {
        className: 'number',
        begin: '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b'
      },
      // units
      {
        className: 'number',
        begin: '\\b\\d+[kKmMgGdshdwy]*\\b',
        relevance: 0
      },
      VAR
    ]
  };

  return {
    aliases: ['nginxconf'],
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        begin: hljs.UNDERSCORE_IDENT_RE + '\\s+{', returnBegin: true,
        end: '{',
        contains: [
          {
            className: 'section',
            begin: hljs.UNDERSCORE_IDENT_RE
          }
        ],
        relevance: 0
      },
      {
        begin: hljs.UNDERSCORE_IDENT_RE + '\\s', end: ';|{', returnBegin: true,
        contains: [
          {
            className: 'attribute',
            begin: hljs.UNDERSCORE_IDENT_RE,
            starts: DEFAULT
          }
        ],
        relevance: 0
      }
    ],
    illegal: '[^\\s\\}]'
  };
});

hljs.registerLanguage('nimrod', function(hljs) {
  return {
    aliases: ['nim'],
    keywords: {
      keyword: 'addr and as asm bind block break|0 case|0 cast const|0 continue|0 converter discard distinct|10 div do elif else|0 end|0 enum|0 except export finally for from generic if|0 import|0 in include|0 interface is isnot|10 iterator|10 let|0 macro method|10 mixin mod nil not notin|10 object|0 of or out proc|10 ptr raise ref|10 return shl shr static template try|0 tuple type|0 using|0 var|0 when while|0 with without xor yield',
      literal: 'shared guarded stdin stdout stderr result|10 true false'
    },
    contains: [ {
        className: 'meta', // Actually pragma
        begin: /{\./,
        end: /\.}/,
        relevance: 10
      }, {
        className: 'string',
        begin: /[a-zA-Z]\w*"/,
        end: /"/,
        contains: [{begin: /""/}]
      }, {
        className: 'string',
        begin: /([a-zA-Z]\w*)?"""/,
        end: /"""/
      },
      hljs.QUOTE_STRING_MODE,
      {
        className: 'type',
        begin: /\b[A-Z]\w+\b/,
        relevance: 0
      }, {
        className: 'built_in',
        begin: /\b(int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|float|float32|float64|bool|char|string|cstring|pointer|expr|stmt|void|auto|any|range|array|openarray|varargs|seq|set|clong|culong|cchar|cschar|cshort|cint|csize|clonglong|cfloat|cdouble|clongdouble|cuchar|cushort|cuint|culonglong|cstringarray|semistatic)\b/
      }, {
        className: 'number',
        relevance: 0,
        variants: [
          {begin: /\b(0[xX][0-9a-fA-F][_0-9a-fA-F]*)('?[iIuU](8|16|32|64))?/},
          {begin: /\b(0o[0-7][_0-7]*)('?[iIuUfF](8|16|32|64))?/},
          {begin: /\b(0(b|B)[01][_01]*)('?[iIuUfF](8|16|32|64))?/},
          {begin: /\b(\d[_\d]*)('?[iIuUfF](8|16|32|64))?/}
        ]
      },
      hljs.HASH_COMMENT_MODE
    ]
  }
});

hljs.registerLanguage('nix', function(hljs) {
  var NIX_KEYWORDS = {
    keyword:
      'rec with let in inherit assert if else then',
    literal:
      'true false or and null',
    built_in:
      'import abort baseNameOf dirOf isNull builtins map removeAttrs throw ' +
      'toString derivation'
  };
  var ANTIQUOTE = {
    className: 'subst',
    begin: /\$\{/,
    end: /}/,
    keywords: NIX_KEYWORDS
  };
  var ATTRS = {
    begin: /[a-zA-Z0-9-_]+(\s*=)/, returnBegin: true,
    relevance: 0,
    contains: [
      {
        className: 'attr',
        begin: /\S+/
      }
    ]
  };
  var STRING = {
    className: 'string',
    contains: [ANTIQUOTE],
    variants: [
      {begin: "''", end: "''"},
      {begin: '"', end: '"'}
    ]
  };
  var EXPRESSIONS = [
    hljs.NUMBER_MODE,
    hljs.HASH_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    STRING,
    ATTRS
  ];
  ANTIQUOTE.contains = EXPRESSIONS;
  return {
    aliases: ["nixos"],
    keywords: NIX_KEYWORDS,
    contains: EXPRESSIONS
  };
});

hljs.registerLanguage('nsis', function(hljs) {
  var CONSTANTS = {
    className: 'variable',
    begin: '\\$(ADMINTOOLS|APPDATA|CDBURN_AREA|CMDLINE|COMMONFILES32|COMMONFILES64|COMMONFILES|COOKIES|DESKTOP|DOCUMENTS|EXEDIR|EXEFILE|EXEPATH|FAVORITES|FONTS|HISTORY|HWNDPARENT|INSTDIR|INTERNET_CACHE|LANGUAGE|LOCALAPPDATA|MUSIC|NETHOOD|OUTDIR|PICTURES|PLUGINSDIR|PRINTHOOD|PROFILE|PROGRAMFILES32|PROGRAMFILES64|PROGRAMFILES|QUICKLAUNCH|RECENT|RESOURCES_LOCALIZED|RESOURCES|SENDTO|SMPROGRAMS|SMSTARTUP|STARTMENU|SYSDIR|TEMP|TEMPLATES|VIDEOS|WINDIR)'
  };

  var DEFINES = {
    // ${defines}
    className: 'variable',
    begin: '\\$+{[a-zA-Z0-9_]+}'
  };

  var VARIABLES = {
    // $variables
    className: 'variable',
    begin: '\\$+[a-zA-Z0-9_]+',
    illegal: '\\(\\){}'
  };

  var LANGUAGES = {
    // $(language_strings)
    className: 'variable',
    begin: '\\$+\\([a-zA-Z0-9_]+\\)'
  };

  var PARAMETERS = {
    // command parameters
    className: 'built_in',
    begin: '(ARCHIVE|FILE_ATTRIBUTE_ARCHIVE|FILE_ATTRIBUTE_NORMAL|FILE_ATTRIBUTE_OFFLINE|FILE_ATTRIBUTE_READONLY|FILE_ATTRIBUTE_SYSTEM|FILE_ATTRIBUTE_TEMPORARY|HKCR|HKCU|HKDD|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_DYN_DATA|HKEY_LOCAL_MACHINE|HKEY_PERFORMANCE_DATA|HKEY_USERS|HKLM|HKPD|HKU|IDABORT|IDCANCEL|IDIGNORE|IDNO|IDOK|IDRETRY|IDYES|MB_ABORTRETRYIGNORE|MB_DEFBUTTON1|MB_DEFBUTTON2|MB_DEFBUTTON3|MB_DEFBUTTON4|MB_ICONEXCLAMATION|MB_ICONINFORMATION|MB_ICONQUESTION|MB_ICONSTOP|MB_OK|MB_OKCANCEL|MB_RETRYCANCEL|MB_RIGHT|MB_RTLREADING|MB_SETFOREGROUND|MB_TOPMOST|MB_USERICON|MB_YESNO|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SYSTEM|TEMPORARY)'
  };

  var COMPILER ={
    // !compiler_flags
    className: 'keyword',
    begin: '\\!(addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversionsystem|ifdef|ifmacrodef|ifmacrondef|ifndef|if|include|insertmacro|macroend|macro|makensis|packhdr|searchparse|searchreplace|tempfile|undef|verbose|warning)'
  };

  return {
    case_insensitive: false,
    keywords: {
      keyword:
      'Abort AddBrandingImage AddSize AllowRootDirInstall AllowSkipFiles AutoCloseWindow BGFont BGGradient BrandingText BringToFront Call CallInstDLL Caption ChangeUI CheckBitmap ClearErrors CompletedText ComponentText CopyFiles CRCCheck CreateDirectory CreateFont CreateShortCut Delete DeleteINISec DeleteINIStr DeleteRegKey DeleteRegValue DetailPrint DetailsButtonText DirText DirVar DirVerify EnableWindow EnumRegKey EnumRegValue Exch Exec ExecShell ExecWait ExpandEnvStrings File FileBufSize FileClose FileErrorText FileOpen FileRead FileReadByte FileReadUTF16LE FileReadWord FileSeek FileWrite FileWriteByte FileWriteUTF16LE FileWriteWord FindClose FindFirst FindNext FindWindow FlushINI FunctionEnd GetCurInstType GetCurrentAddress GetDlgItem GetDLLVersion GetDLLVersionLocal GetErrorLevel GetFileTime GetFileTimeLocal GetFullPathName GetFunctionAddress GetInstDirError GetLabelAddress GetTempFileName Goto HideWindow Icon IfAbort IfErrors IfFileExists IfRebootFlag IfSilent InitPluginsDir InstallButtonText InstallColors InstallDir InstallDirRegKey InstProgressFlags InstType InstTypeGetText InstTypeSetText IntCmp IntCmpU IntFmt IntOp IsWindow LangString LicenseBkColor LicenseData LicenseForceSelection LicenseLangString LicenseText LoadLanguageFile LockWindow LogSet LogText ManifestDPIAware ManifestSupportedOS MessageBox MiscButtonText Name Nop OutFile Page PageCallbacks PageExEnd Pop Push Quit ReadEnvStr ReadINIStr ReadRegDWORD ReadRegStr Reboot RegDLL Rename RequestExecutionLevel ReserveFile Return RMDir SearchPath SectionEnd SectionGetFlags SectionGetInstTypes SectionGetSize SectionGetText SectionGroupEnd SectionIn SectionSetFlags SectionSetInstTypes SectionSetSize SectionSetText SendMessage SetAutoClose SetBrandingImage SetCompress SetCompressor SetCompressorDictSize SetCtlColors SetCurInstType SetDatablockOptimize SetDateSave SetDetailsPrint SetDetailsView SetErrorLevel SetErrors SetFileAttributes SetFont SetOutPath SetOverwrite SetPluginUnload SetRebootFlag SetRegView SetShellVarContext SetSilent ShowInstDetails ShowUninstDetails ShowWindow SilentInstall SilentUnInstall Sleep SpaceTexts StrCmp StrCmpS StrCpy StrLen SubCaption SubSectionEnd Unicode UninstallButtonText UninstallCaption UninstallIcon UninstallSubCaption UninstallText UninstPage UnRegDLL Var VIAddVersionKey VIFileVersion VIProductVersion WindowIcon WriteINIStr WriteRegBin WriteRegDWORD WriteRegExpandStr WriteRegStr WriteUninstaller XPStyle',
      literal:
      'admin all auto both colored current false force hide highest lastused leave listonly none normal notset off on open print show silent silentlog smooth textonly true user '
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'string',
        begin: '"', end: '"',
        illegal: '\\n',
        contains: [
          { // $\n, $\r, $\t, $$
            begin: '\\$(\\\\(n|r|t)|\\$)'
          },
          CONSTANTS,
          DEFINES,
          VARIABLES,
          LANGUAGES
        ]
      },
      hljs.COMMENT(
        ';',
        '$',
        {
          relevance: 0
        }
      ),
      {
        className: 'function',
        beginKeywords: 'Function PageEx Section SectionGroup SubSection', end: '$'
      },
      COMPILER,
      DEFINES,
      VARIABLES,
      LANGUAGES,
      PARAMETERS,
      hljs.NUMBER_MODE,
      { // plug::ins
        begin: hljs.IDENT_RE + '::' + hljs.IDENT_RE
      }
    ]
  };
});

hljs.registerLanguage('objectivec', function(hljs) {
  var API_CLASS = {
    className: 'built_in',
    begin: '(AV|CA|CF|CG|CI|MK|MP|NS|UI|XC)\\w+',
  };
  var OBJC_KEYWORDS = {
    keyword:
      'int float while char export sizeof typedef const struct for union ' +
      'unsigned long volatile static bool mutable if do return goto void ' +
      'enum else break extern asm case short default double register explicit ' +
      'signed typename this switch continue wchar_t inline readonly assign ' +
      'readwrite self @synchronized id typeof ' +
      'nonatomic super unichar IBOutlet IBAction strong weak copy ' +
      'in out inout bycopy byref oneway __strong __weak __block __autoreleasing ' +
      '@private @protected @public @try @property @end @throw @catch @finally ' +
      '@autoreleasepool @synthesize @dynamic @selector @optional @required',
    literal:
      'false true FALSE TRUE nil YES NO NULL',
    built_in:
      'BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once'
  };
  var LEXEMES = /[a-zA-Z@][a-zA-Z0-9_]*/;
  var CLASS_KEYWORDS = '@interface @class @protocol @implementation';
  return {
    aliases: ['mm', 'objc', 'obj-c'],
    keywords: OBJC_KEYWORDS,
    lexemes: LEXEMES,
    illegal: '</',
    contains: [
      API_CLASS,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        variants: [
          {
            begin: '@"', end: '"',
            illegal: '\\n',
            contains: [hljs.BACKSLASH_ESCAPE]
          },
          {
            begin: '\'', end: '[^\\\\]\'',
            illegal: '[^\\\\][^\']'
          }
        ]
      },
      {
        className: 'meta',
        begin: '#',
        end: '$',
        contains: [
          {
            className: 'meta-string',
            variants: [
              { begin: '\"', end: '\"' },
              { begin: '<', end: '>' }
            ]
          }
        ]
      },
      {
        className: 'class',
        begin: '(' + CLASS_KEYWORDS.split(' ').join('|') + ')\\b', end: '({|$)', excludeEnd: true,
        keywords: CLASS_KEYWORDS, lexemes: LEXEMES,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        begin: '\\.'+hljs.UNDERSCORE_IDENT_RE,
        relevance: 0
      }
    ]
  };
});

hljs.registerLanguage('ocaml', function(hljs) {
  /* missing support for heredoc-like string (OCaml 4.0.2+) */
  return {
    aliases: ['ml'],
    keywords: {
      keyword:
        'and as assert asr begin class constraint do done downto else end ' +
        'exception external for fun function functor if in include ' +
        'inherit! inherit initializer land lazy let lor lsl lsr lxor match method!|10 method ' +
        'mod module mutable new object of open! open or private rec sig struct ' +
        'then to try type val! val virtual when while with ' +
        /* camlp4 */
        'parser value',
      built_in:
        /* built-in types */
        'array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 string unit ' +
        /* (some) types in Pervasives */
        'in_channel out_channel ref',
      literal:
        'true false'
    },
    illegal: /\/\/|>>/,
    lexemes: '[a-z_]\\w*!?',
    contains: [
      {
        className: 'literal',
        begin: '\\[(\\|\\|)?\\]|\\(\\)',
        relevance: 0
      },
      hljs.COMMENT(
        '\\(\\*',
        '\\*\\)',
        {
          contains: ['self']
        }
      ),
      { /* type variable */
        className: 'symbol',
        begin: '\'[A-Za-z_](?!\')[\\w\']*'
        /* the grammar is ambiguous on how 'a'b should be interpreted but not the compiler */
      },
      { /* polymorphic variant */
        className: 'type',
        begin: '`[A-Z][\\w\']*'
      },
      { /* module or constructor */
        className: 'type',
        begin: '\\b[A-Z][\\w\']*',
        relevance: 0
      },
      { /* don't color identifiers, but safely catch all identifiers with '*/
        begin: '[a-z_]\\w*\'[\\w\']*', relevance: 0
      },
      hljs.inherit(hljs.APOS_STRING_MODE, {className: 'string', relevance: 0}),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),
      {
        className: 'number',
        begin:
          '\\b(0[xX][a-fA-F0-9_]+[Lln]?|' +
          '0[oO][0-7_]+[Lln]?|' +
          '0[bB][01_]+[Lln]?|' +
          '[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)',
        relevance: 0
      },
      {
        begin: /[-=]>/ // relevance booster
      }
    ]
  }
});

hljs.registerLanguage('openscad', function(hljs) {
	var SPECIAL_VARS = {
		className: 'keyword',
		begin: '\\$(f[asn]|t|vp[rtd]|children)'
	},
	LITERALS = {
		className: 'literal',
		begin: 'false|true|PI|undef'
	},
	NUMBERS = {
		className: 'number',
		begin: '\\b\\d+(\\.\\d+)?(e-?\\d+)?', //adds 1e5, 1e-10
		relevance: 0
	},
	STRING = hljs.inherit(hljs.QUOTE_STRING_MODE,{illegal: null}),
	PREPRO = {
		className: 'meta',
		keywords: {'meta-keyword': 'include use'},
		begin: 'include|use <',
		end: '>'
	},
	PARAMS = {
		className: 'params',
		begin: '\\(', end: '\\)',
		contains: ['self', NUMBERS, STRING, SPECIAL_VARS, LITERALS]
	},
	MODIFIERS = {
		begin: '[*!#%]',
		relevance: 0
	},
	FUNCTIONS = {
		className: 'function',
		beginKeywords: 'module function',
		end: '\\=|\\{',
		contains: [PARAMS, hljs.UNDERSCORE_TITLE_MODE]
	};

	return {
		aliases: ['scad'],
		keywords: {
			keyword: 'function module include use for intersection_for if else \\%',
			literal: 'false true PI undef',
			built_in: 'circle square polygon text sphere cube cylinder polyhedron translate rotate scale resize mirror multmatrix color offset hull minkowski union difference intersection abs sign sin cos tan acos asin atan atan2 floor round ceil ln log pow sqrt exp rands min max concat lookup str chr search version version_num norm cross parent_module echo import import_dxf dxf_linear_extrude linear_extrude rotate_extrude surface projection render children dxf_cross dxf_dim let assign'
		},
		contains: [
			hljs.C_LINE_COMMENT_MODE,
			hljs.C_BLOCK_COMMENT_MODE,
			NUMBERS,
			PREPRO,
			STRING,
			SPECIAL_VARS,
			MODIFIERS,
			FUNCTIONS
		]
	}
});

hljs.registerLanguage('oxygene', function(hljs) {
  var OXYGENE_KEYWORDS = 'abstract add and array as asc aspect assembly async begin break block by case class concat const copy constructor continue '+
    'create default delegate desc distinct div do downto dynamic each else empty end ensure enum equals event except exit extension external false '+
    'final finalize finalizer finally flags for forward from function future global group has if implementation implements implies in index inherited '+
    'inline interface into invariants is iterator join locked locking loop matching method mod module namespace nested new nil not notify nullable of '+
    'old on operator or order out override parallel params partial pinned private procedure property protected public queryable raise read readonly '+
    'record reintroduce remove repeat require result reverse sealed select self sequence set shl shr skip static step soft take then to true try tuple '+
    'type union unit unsafe until uses using var virtual raises volatile where while with write xor yield await mapped deprecated stdcall cdecl pascal '+
    'register safecall overload library platform reference packed strict published autoreleasepool selector strong weak unretained';
  var CURLY_COMMENT =  hljs.COMMENT(
    '{',
    '}',
    {
      relevance: 0
    }
  );
  var PAREN_COMMENT = hljs.COMMENT(
    '\\(\\*',
    '\\*\\)',
    {
      relevance: 10
    }
  );
  var STRING = {
    className: 'string',
    begin: '\'', end: '\'',
    contains: [{begin: '\'\''}]
  };
  var CHAR_STRING = {
    className: 'string', begin: '(#\\d+)+'
  };
  var FUNCTION = {
    className: 'function',
    beginKeywords: 'function constructor destructor procedure method', end: '[:;]',
    keywords: 'function constructor|10 destructor|10 procedure|10 method|10',
    contains: [
      hljs.TITLE_MODE,
      {
        className: 'params',
        begin: '\\(', end: '\\)',
        keywords: OXYGENE_KEYWORDS,
        contains: [STRING, CHAR_STRING]
      },
      CURLY_COMMENT, PAREN_COMMENT
    ]
  };
  return {
    case_insensitive: true,
    keywords: OXYGENE_KEYWORDS,
    illegal: '("|\\$[G-Zg-z]|\\/\\*|</|=>|->)',
    contains: [
      CURLY_COMMENT, PAREN_COMMENT, hljs.C_LINE_COMMENT_MODE,
      STRING, CHAR_STRING,
      hljs.NUMBER_MODE,
      FUNCTION,
      {
        className: 'class',
        begin: '=\\bclass\\b', end: 'end;',
        keywords: OXYGENE_KEYWORDS,
        contains: [
          STRING, CHAR_STRING,
          CURLY_COMMENT, PAREN_COMMENT, hljs.C_LINE_COMMENT_MODE,
          FUNCTION
        ]
      }
    ]
  };
});

hljs.registerLanguage('parser3', function(hljs) {
  var CURLY_SUBCOMMENT = hljs.COMMENT(
    '{',
    '}',
    {
      contains: ['self']
    }
  );
  return {
    subLanguage: 'xml', relevance: 0,
    contains: [
      hljs.COMMENT('^#', '$'),
      hljs.COMMENT(
        '\\^rem{',
        '}',
        {
          relevance: 10,
          contains: [
            CURLY_SUBCOMMENT
          ]
        }
      ),
      {
        className: 'meta',
        begin: '^@(?:BASE|USE|CLASS|OPTIONS)$',
        relevance: 10
      },
      {
        className: 'title',
        begin: '@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$'
      },
      {
        className: 'variable',
        begin: '\\$\\{?[\\w\\-\\.\\:]+\\}?'
      },
      {
        className: 'keyword',
        begin: '\\^[\\w\\-\\.\\:]+'
      },
      {
        className: 'number',
        begin: '\\^#[0-9a-fA-F]+'
      },
      hljs.C_NUMBER_MODE
    ]
  };
});

hljs.registerLanguage('pf', function(hljs) {
  var MACRO = {
    className: 'variable',
    begin: /\$[\w\d#@][\w\d_]*/
  };
  var TABLE = {
    className: 'variable',
    begin: /</, end: />/
  };
  var QUOTE_STRING = {
    className: 'string',
    begin: /"/, end: /"/
  };

  return {
    aliases: ['pf.conf'],
    lexemes: /[a-z0-9_<>-]+/,
    keywords: {
      built_in: /* block match pass are "actions" in pf.conf(5), the rest are
                 * lexically similar top-level commands.
                 */
        'block match pass load anchor|5 antispoof|10 set table',
      keyword:
        'in out log quick on rdomain inet inet6 proto from port os to route' +
        'allow-opts divert-packet divert-reply divert-to flags group icmp-type' +
        'icmp6-type label once probability recieved-on rtable prio queue' +
        'tos tag tagged user keep fragment for os drop' +
        'af-to|10 binat-to|10 nat-to|10 rdr-to|10 bitmask least-stats random round-robin' +
        'source-hash static-port' +
        'dup-to reply-to route-to' +
        'parent bandwidth default min max qlimit' +
        'block-policy debug fingerprints hostid limit loginterface optimization' +
        'reassemble ruleset-optimization basic none profile skip state-defaults' +
        'state-policy timeout' +
        'const counters persist' +
        'no modulate synproxy state|5 floating if-bound no-sync pflow|10 sloppy' +
        'source-track global rule max-src-nodes max-src-states max-src-conn' +
        'max-src-conn-rate overload flush' +
        'scrub|5 max-mss min-ttl no-df|10 random-id',
      literal:
        'all any no-route self urpf-failed egress|5 unknown'
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      MACRO,
      TABLE
    ]
  };
});

hljs.registerLanguage('php', function(hljs) {
  var VARIABLE = {
    begin: '\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*'
  };
  var PREPROCESSOR = {
    className: 'meta', begin: /<\?(php)?|\?>/
  };
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, PREPROCESSOR],
    variants: [
      {
        begin: 'b"', end: '"'
      },
      {
        begin: 'b\'', end: '\''
      },
      hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null})
    ]
  };
  var NUMBER = {variants: [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE]};
  return {
    aliases: ['php3', 'php4', 'php5', 'php6'],
    case_insensitive: true,
    keywords:
      'and include_once list abstract global private echo interface as static endswitch ' +
      'array null if endwhile or const for endforeach self var while isset public ' +
      'protected exit foreach throw elseif include __FILE__ empty require_once do xor ' +
      'return parent clone use __CLASS__ __LINE__ else break print eval new ' +
      'catch __METHOD__ case exception default die require __FUNCTION__ ' +
      'enddeclare final try switch continue endfor endif declare unset true false ' +
      'trait goto instanceof insteadof __DIR__ __NAMESPACE__ ' +
      'yield finally',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.HASH_COMMENT_MODE,
      hljs.COMMENT(
        '/\\*',
        '\\*/',
        {
          contains: [
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            },
            PREPROCESSOR
          ]
        }
      ),
      hljs.COMMENT(
        '__halt_compiler.+?;',
        false,
        {
          endsWithParent: true,
          keywords: '__halt_compiler',
          lexemes: hljs.UNDERSCORE_IDENT_RE
        }
      ),
      {
        className: 'string',
        begin: /<<<['"]?\w+['"]?$/, end: /^\w+;?$/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          {
            className: 'subst',
            variants: [
              {begin: /\$\w+/},
              {begin: /\{\$/, end: /\}/}
            ]
          }
        ]
      },
      PREPROCESSOR,
      VARIABLE,
      {
        // swallow composed identifiers to avoid parsing them as keywords
        begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
      },
      {
        className: 'function',
        beginKeywords: 'function', end: /[;{]/, excludeEnd: true,
        illegal: '\\$|\\[|%',
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: 'params',
            begin: '\\(', end: '\\)',
            contains: [
              'self',
              VARIABLE,
              hljs.C_BLOCK_COMMENT_MODE,
              STRING,
              NUMBER
            ]
          }
        ]
      },
      {
        className: 'class',
        beginKeywords: 'class interface', end: '{', excludeEnd: true,
        illegal: /[:\(\$"]/,
        contains: [
          {beginKeywords: 'extends implements'},
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        beginKeywords: 'namespace', end: ';',
        illegal: /[\.']/,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        beginKeywords: 'use', end: ';',
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        begin: '=>' // No markup, just a relevance booster
      },
      STRING,
      NUMBER
    ]
  };
});

hljs.registerLanguage('powershell', function(hljs) {
  var backtickEscape = {
    begin: '`[\\s\\S]',
    relevance: 0
  };
  var VAR = {
    className: 'variable',
    variants: [
      {begin: /\$[\w\d][\w\d_:]*/}
    ]
  };
  var LITERAL = {
    className: 'literal',
    begin: /\$(null|true|false)\b/
  };
  var QUOTE_STRING = {
    className: 'string',
    begin: /"/, end: /"/,
    contains: [
      backtickEscape,
      VAR,
      {
        className: 'variable',
        begin: /\$[A-z]/, end: /[^A-z]/
      }
    ]
  };
  var APOS_STRING = {
    className: 'string',
    begin: /'/, end: /'/
  };

  return {
    aliases: ['ps'],
    lexemes: /-?[A-z\.\-]+/,
    case_insensitive: true,
    keywords: {
      keyword: 'if else foreach return function do while until elseif begin for trap data dynamicparam end break throw param continue finally in switch exit filter try process catch',
      built_in: 'Add-Content Add-History Add-Member Add-PSSnapin Clear-Content Clear-Item Clear-Item Property Clear-Variable Compare-Object ConvertFrom-SecureString Convert-Path ConvertTo-Html ConvertTo-SecureString Copy-Item Copy-ItemProperty Export-Alias Export-Clixml Export-Console Export-Csv ForEach-Object Format-Custom Format-List Format-Table Format-Wide Get-Acl Get-Alias Get-AuthenticodeSignature Get-ChildItem Get-Command Get-Content Get-Credential Get-Culture Get-Date Get-EventLog Get-ExecutionPolicy Get-Help Get-History Get-Host Get-Item Get-ItemProperty Get-Location Get-Member Get-PfxCertificate Get-Process Get-PSDrive Get-PSProvider Get-PSSnapin Get-Service Get-TraceSource Get-UICulture Get-Unique Get-Variable Get-WmiObject Group-Object Import-Alias Import-Clixml Import-Csv Invoke-Expression Invoke-History Invoke-Item Join-Path Measure-Command Measure-Object Move-Item Move-ItemProperty New-Alias New-Item New-ItemProperty New-Object New-PSDrive New-Service New-TimeSpan New-Variable Out-Default Out-File Out-Host Out-Null Out-Printer Out-String Pop-Location Push-Location Read-Host Remove-Item Remove-ItemProperty Remove-PSDrive Remove-PSSnapin Remove-Variable Rename-Item Rename-ItemProperty Resolve-Path Restart-Service Resume-Service Select-Object Select-String Set-Acl Set-Alias Set-AuthenticodeSignature Set-Content Set-Date Set-ExecutionPolicy Set-Item Set-ItemProperty Set-Location Set-PSDebug Set-Service Set-TraceSource Set-Variable Sort-Object Split-Path Start-Service Start-Sleep Start-Transcript Stop-Process Stop-Service Stop-Transcript Suspend-Service Tee-Object Test-Path Trace-Command Update-FormatData Update-TypeData Where-Object Write-Debug Write-Error Write-Host Write-Output Write-Progress Write-Verbose Write-Warning',
      nomarkup: '-ne -eq -lt -gt -ge -le -not -like -notlike -match -notmatch -contains -notcontains -in -notin -replace'
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.NUMBER_MODE,
      QUOTE_STRING,
      APOS_STRING,
      LITERAL,
      VAR
    ]
  };
});

hljs.registerLanguage('processing', function(hljs) {
  return {
    keywords: {
      keyword: 'BufferedReader PVector PFont PImage PGraphics HashMap boolean byte char color ' +
        'double float int long String Array FloatDict FloatList IntDict IntList JSONArray JSONObject ' +
        'Object StringDict StringList Table TableRow XML ' +
        // Java keywords
        'false synchronized int abstract float private char boolean static null if const ' +
        'for true while long throw strictfp finally protected import native final return void ' +
        'enum else break transient new catch instanceof byte super volatile case assert short ' +
        'package default double public try this switch continue throws protected public private',
      literal: 'P2D P3D HALF_PI PI QUARTER_PI TAU TWO_PI',
      title: 'setup draw',
      built_in: 'displayHeight displayWidth mouseY mouseX mousePressed pmouseX pmouseY key ' +
        'keyCode pixels focused frameCount frameRate height width ' +
        'size createGraphics beginDraw createShape loadShape PShape arc ellipse line point ' +
        'quad rect triangle bezier bezierDetail bezierPoint bezierTangent curve curveDetail curvePoint ' +
        'curveTangent curveTightness shape shapeMode beginContour beginShape bezierVertex curveVertex ' +
        'endContour endShape quadraticVertex vertex ellipseMode noSmooth rectMode smooth strokeCap ' +
        'strokeJoin strokeWeight mouseClicked mouseDragged mouseMoved mousePressed mouseReleased ' +
        'mouseWheel keyPressed keyPressedkeyReleased keyTyped print println save saveFrame day hour ' +
        'millis minute month second year background clear colorMode fill noFill noStroke stroke alpha ' +
        'blue brightness color green hue lerpColor red saturation modelX modelY modelZ screenX screenY ' +
        'screenZ ambient emissive shininess specular add createImage beginCamera camera endCamera frustum ' +
        'ortho perspective printCamera printProjection cursor frameRate noCursor exit loop noLoop popStyle ' +
        'pushStyle redraw binary boolean byte char float hex int str unbinary unhex join match matchAll nf ' +
        'nfc nfp nfs split splitTokens trim append arrayCopy concat expand reverse shorten sort splice subset ' +
        'box sphere sphereDetail createInput createReader loadBytes loadJSONArray loadJSONObject loadStrings ' +
        'loadTable loadXML open parseXML saveTable selectFolder selectInput beginRaw beginRecord createOutput ' +
        'createWriter endRaw endRecord PrintWritersaveBytes saveJSONArray saveJSONObject saveStream saveStrings ' +
        'saveXML selectOutput popMatrix printMatrix pushMatrix resetMatrix rotate rotateX rotateY rotateZ scale ' +
        'shearX shearY translate ambientLight directionalLight lightFalloff lights lightSpecular noLights normal ' +
        'pointLight spotLight image imageMode loadImage noTint requestImage tint texture textureMode textureWrap ' +
        'blend copy filter get loadPixels set updatePixels blendMode loadShader PShaderresetShader shader createFont ' +
        'loadFont text textFont textAlign textLeading textMode textSize textWidth textAscent textDescent abs ceil ' +
        'constrain dist exp floor lerp log mag map max min norm pow round sq sqrt acos asin atan atan2 cos degrees ' +
        'radians sin tan noise noiseDetail noiseSeed random randomGaussian randomSeed'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE
    ]
  };
});

hljs.registerLanguage('profile', function(hljs) {
  return {
    contains: [
      hljs.C_NUMBER_MODE,
      {
        begin: '[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}', end: ':',
        excludeEnd: true
      },
      {
        begin: '(ncalls|tottime|cumtime)', end: '$',
        keywords: 'ncalls tottime|10 cumtime|10 filename',
        relevance: 10
      },
      {
        begin: 'function calls', end: '$',
        contains: [hljs.C_NUMBER_MODE],
        relevance: 10
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: '\\(', end: '\\)$',
        excludeBegin: true, excludeEnd: true,
        relevance: 0
      }
    ]
  };
});

hljs.registerLanguage('prolog', function(hljs) {

  var ATOM = {

    begin: /[a-z][A-Za-z0-9_]*/,
    relevance: 0
  };

  var VAR = {

    className: 'symbol',
    variants: [
      {begin: /[A-Z][a-zA-Z0-9_]*/},
      {begin: /_[A-Za-z0-9_]*/},
    ],
    relevance: 0
  };

  var PARENTED = {

    begin: /\(/,
    end: /\)/,
    relevance: 0
  };

  var LIST = {

    begin: /\[/,
    end: /\]/
  };

  var LINE_COMMENT = {

    className: 'comment',
    begin: /%/, end: /$/,
    contains: [hljs.PHRASAL_WORDS_MODE]
  };

  var BACKTICK_STRING = {

    className: 'string',
    begin: /`/, end: /`/,
    contains: [hljs.BACKSLASH_ESCAPE]
  };

  var CHAR_CODE = {

    className: 'string', // 0'a etc.
    begin: /0\'(\\\'|.)/
  };

  var SPACE_CODE = {

    className: 'string',
    begin: /0\'\\s/ // 0'\s
  };

  var PRED_OP = { // relevance booster
    begin: /:-/
  };

  var inner = [

    ATOM,
    VAR,
    PARENTED,
    PRED_OP,
    LIST,
    LINE_COMMENT,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.APOS_STRING_MODE,
    BACKTICK_STRING,
    CHAR_CODE,
    SPACE_CODE,
    hljs.C_NUMBER_MODE
  ];

  PARENTED.contains = inner;
  LIST.contains = inner;

  return {
    contains: inner.concat([
      {begin: /\.$/} // relevance booster
    ])
  };
});

hljs.registerLanguage('protobuf', function(hljs) {
  return {
    keywords: {
      keyword: 'package import option optional required repeated group',
      built_in: 'double float int32 int64 uint32 uint64 sint32 sint64 ' +
        'fixed32 fixed64 sfixed32 sfixed64 bool string bytes',
      literal: 'true false'
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      {
        className: 'class',
        beginKeywords: 'message enum service', end: /\{/,
        illegal: /\n/,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            starts: {endsWithParent: true, excludeEnd: true} // hack: eating everything after the first title
          })
        ]
      },
      {
        className: 'function',
        beginKeywords: 'rpc',
        end: /;/, excludeEnd: true,
        keywords: 'rpc returns'
      },
      {
        begin: /^\s*[A-Z_]+/,
        end: /\s*=/, excludeEnd: true
      }
    ]
  };
});

hljs.registerLanguage('puppet', function(hljs) {

  var PUPPET_KEYWORDS = {
    keyword:
    /* language keywords */
      'and case default else elsif false if in import enherits node or true undef unless main settings $string ',
    literal:
    /* metaparameters */
      'alias audit before loglevel noop require subscribe tag ' +
    /* normal attributes */
      'owner ensure group mode name|0 changes context force incl lens load_path onlyif provider returns root show_diff type_check ' +
      'en_address ip_address realname command environment hour monute month monthday special target weekday '+
      'creates cwd ogoutput refresh refreshonly tries try_sleep umask backup checksum content ctime force ignore ' +
      'links mtime purge recurse recurselimit replace selinux_ignore_defaults selrange selrole seltype seluser source ' +
      'souirce_permissions sourceselect validate_cmd validate_replacement allowdupe attribute_membership auth_membership forcelocal gid '+
      'ia_load_module members system host_aliases ip allowed_trunk_vlans description device_url duplex encapsulation etherchannel ' +
      'native_vlan speed principals allow_root auth_class auth_type authenticate_user k_of_n mechanisms rule session_owner shared options ' +
      'device fstype enable hasrestart directory present absent link atboot blockdevice device dump pass remounts poller_tag use ' +
      'message withpath adminfile allow_virtual allowcdrom category configfiles flavor install_options instance package_settings platform ' +
      'responsefile status uninstall_options vendor unless_system_user unless_uid binary control flags hasstatus manifest pattern restart running ' +
      'start stop allowdupe auths expiry gid groups home iterations key_membership keys managehome membership password password_max_age ' +
      'password_min_age profile_membership profiles project purge_ssh_keys role_membership roles salt shell uid baseurl cost descr enabled ' +
      'enablegroups exclude failovermethod gpgcheck gpgkey http_caching include includepkgs keepalive metadata_expire metalink mirrorlist ' +
      'priority protect proxy proxy_password proxy_username repo_gpgcheck s3_enabled skip_if_unavailable sslcacert sslclientcert sslclientkey ' +
      'sslverify mounted',
    built_in:
    /* core facts */
      'architecture augeasversion blockdevices boardmanufacturer boardproductname boardserialnumber cfkey dhcp_servers ' +
      'domain ec2_ ec2_userdata facterversion filesystems ldom fqdn gid hardwareisa hardwaremodel hostname id|0 interfaces '+
      'ipaddress ipaddress_ ipaddress6 ipaddress6_ iphostnumber is_virtual kernel kernelmajversion kernelrelease kernelversion ' +
      'kernelrelease kernelversion lsbdistcodename lsbdistdescription lsbdistid lsbdistrelease lsbmajdistrelease lsbminordistrelease ' +
      'lsbrelease macaddress macaddress_ macosx_buildversion macosx_productname macosx_productversion macosx_productverson_major ' +
      'macosx_productversion_minor manufacturer memoryfree memorysize netmask metmask_ network_ operatingsystem operatingsystemmajrelease '+
      'operatingsystemrelease osfamily partitions path physicalprocessorcount processor processorcount productname ps puppetversion '+
      'rubysitedir rubyversion selinux selinux_config_mode selinux_config_policy selinux_current_mode selinux_current_mode selinux_enforced '+
      'selinux_policyversion serialnumber sp_ sshdsakey sshecdsakey sshrsakey swapencrypted swapfree swapsize timezone type uniqueid uptime '+
      'uptime_days uptime_hours uptime_seconds uuid virtual vlans xendomains zfs_version zonenae zones zpool_version'
  };

  var COMMENT = hljs.COMMENT('#', '$');

  var IDENT_RE = '([A-Za-z_]|::)(\\w|::)*';

  var TITLE = hljs.inherit(hljs.TITLE_MODE, {begin: IDENT_RE});

  var VARIABLE = {className: 'variable', begin: '\\$' + IDENT_RE};

  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, VARIABLE],
    variants: [
      {begin: /'/, end: /'/},
      {begin: /"/, end: /"/}
    ]
  };

  return {
    aliases: ['pp'],
    contains: [
      COMMENT,
      VARIABLE,
      STRING,
      {
        beginKeywords: 'class', end: '\\{|;',
        illegal: /=/,
        contains: [TITLE, COMMENT]
      },
      {
        beginKeywords: 'define', end: /\{/,
        contains: [
          {
            className: 'section', begin: hljs.IDENT_RE, endsParent: true
          }
        ]
      },
      {
        begin: hljs.IDENT_RE + '\\s+\\{', returnBegin: true,
        end: /\S/,
        contains: [
          {
            className: 'keyword',
            begin: hljs.IDENT_RE
          },
          {
            begin: /\{/, end: /\}/,
            keywords: PUPPET_KEYWORDS,
            relevance: 0,
            contains: [
              STRING,
              COMMENT,
              {
                begin:'[a-zA-Z_]+\\s*=>',
                returnBegin: true, end: '=>',
                contains: [
                  {
                    className: 'attr',
                    begin: hljs.IDENT_RE,
                  }
                ]
              },
              {
                className: 'number',
                begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
                relevance: 0
              },
              VARIABLE
            ]
          }
        ],
        relevance: 0
      }
    ]
  }
});

hljs.registerLanguage('python', function(hljs) {
  var PROMPT = {
    className: 'meta',  begin: /^(>>>|\.\.\.) /
  };
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /(u|b)?r?'''/, end: /'''/,
        contains: [PROMPT],
        relevance: 10
      },
      {
        begin: /(u|b)?r?"""/, end: /"""/,
        contains: [PROMPT],
        relevance: 10
      },
      {
        begin: /(u|r|ur)'/, end: /'/,
        relevance: 10
      },
      {
        begin: /(u|r|ur)"/, end: /"/,
        relevance: 10
      },
      {
        begin: /(b|br)'/, end: /'/
      },
      {
        begin: /(b|br)"/, end: /"/
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };
  var NUMBER = {
    className: 'number', relevance: 0,
    variants: [
      {begin: hljs.BINARY_NUMBER_RE + '[lLjJ]?'},
      {begin: '\\b(0o[0-7]+)[lLjJ]?'},
      {begin: hljs.C_NUMBER_RE + '[lLjJ]?'}
    ]
  };
  var PARAMS = {
    className: 'params',
    begin: /\(/, end: /\)/,
    contains: ['self', PROMPT, NUMBER, STRING]
  };
  return {
    aliases: ['py', 'gyp'],
    keywords: {
      keyword:
        'and elif is global as in if from raise for except finally print import pass return ' +
        'exec else break not with class assert yield try while continue del or def lambda ' +
        'async await nonlocal|10 None True False',
      built_in:
        'Ellipsis NotImplemented'
    },
    illegal: /(<\/|->|\?)/,
    contains: [
      PROMPT,
      NUMBER,
      STRING,
      hljs.HASH_COMMENT_MODE,
      {
        variants: [
          {className: 'function', beginKeywords: 'def', relevance: 10},
          {className: 'class', beginKeywords: 'class'}
        ],
        end: /:/,
        illegal: /[${=;\n,]/,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          PARAMS,
          {
            begin: /->/, endsWithParent: true,
            keywords: 'None'
          }
        ]
      },
      {
        className: 'meta',
        begin: /^[\t ]*@/, end: /$/
      },
      {
        begin: /\b(print|exec)\(/ // don’t highlight keywords-turned-functions in Python 3
      }
    ]
  };
});

hljs.registerLanguage('q', function(hljs) {
  var Q_KEYWORDS = {
  keyword:
    'do while select delete by update from',
  literal:
    '0b 1b',
  built_in:
    'neg not null string reciprocal floor ceiling signum mod xbar xlog and or each scan over prior mmu lsq inv md5 ltime gtime count first var dev med cov cor all any rand sums prds mins maxs fills deltas ratios avgs differ prev next rank reverse iasc idesc asc desc msum mcount mavg mdev xrank mmin mmax xprev rotate distinct group where flip type key til get value attr cut set upsert raze union inter except cross sv vs sublist enlist read0 read1 hopen hclose hdel hsym hcount peach system ltrim rtrim trim lower upper ssr view tables views cols xcols keys xkey xcol xasc xdesc fkeys meta lj aj aj0 ij pj asof uj ww wj wj1 fby xgroup ungroup ej save load rsave rload show csv parse eval min max avg wavg wsum sin cos tan sum',
  type:
    '`float `double int `timestamp `timespan `datetime `time `boolean `symbol `char `byte `short `long `real `month `date `minute `second `guid'
  };
  return {
  aliases:['k', 'kdb'],
  keywords: Q_KEYWORDS,
  lexemes: /(`?)[A-Za-z0-9_]+\b/,
  contains: [
  hljs.C_LINE_COMMENT_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.C_NUMBER_MODE
     ]
  };
});

hljs.registerLanguage('r', function(hljs) {
  var IDENT_RE = '([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*';

  return {
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        begin: IDENT_RE,
        lexemes: IDENT_RE,
        keywords: {
          keyword:
            'function if in break next repeat else for return switch while try tryCatch ' +
            'stop warning require library attach detach source setMethod setGeneric ' +
            'setGroupGeneric setClass ...',
          literal:
            'NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 ' +
            'NA_complex_|10'
        },
        relevance: 0
      },
      {
        // hex value
        className: 'number',
        begin: "0[xX][0-9a-fA-F]+[Li]?\\b",
        relevance: 0
      },
      {
        // explicit integer
        className: 'number',
        begin: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
        relevance: 0
      },
      {
        // number with trailing decimal
        className: 'number',
        begin: "\\d+\\.(?!\\d)(?:i\\b)?",
        relevance: 0
      },
      {
        // number
        className: 'number',
        begin: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
        relevance: 0
      },
      {
        // number with leading decimal
        className: 'number',
        begin: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
        relevance: 0
      },

      {
        // escaped identifier
        begin: '`',
        end: '`',
        relevance: 0
      },

      {
        className: 'string',
        contains: [hljs.BACKSLASH_ESCAPE],
        variants: [
          {begin: '"', end: '"'},
          {begin: "'", end: "'"}
        ]
      }
    ]
  };
});

hljs.registerLanguage('rib', function(hljs) {
  return {
    keywords:
      'ArchiveRecord AreaLightSource Atmosphere Attribute AttributeBegin AttributeEnd Basis ' +
      'Begin Blobby Bound Clipping ClippingPlane Color ColorSamples ConcatTransform Cone ' +
      'CoordinateSystem CoordSysTransform CropWindow Curves Cylinder DepthOfField Detail ' +
      'DetailRange Disk Displacement Display End ErrorHandler Exposure Exterior Format ' +
      'FrameAspectRatio FrameBegin FrameEnd GeneralPolygon GeometricApproximation Geometry ' +
      'Hider Hyperboloid Identity Illuminate Imager Interior LightSource ' +
      'MakeCubeFaceEnvironment MakeLatLongEnvironment MakeShadow MakeTexture Matte ' +
      'MotionBegin MotionEnd NuPatch ObjectBegin ObjectEnd ObjectInstance Opacity Option ' +
      'Orientation Paraboloid Patch PatchMesh Perspective PixelFilter PixelSamples ' +
      'PixelVariance Points PointsGeneralPolygons PointsPolygons Polygon Procedural Projection ' +
      'Quantize ReadArchive RelativeDetail ReverseOrientation Rotate Scale ScreenWindow ' +
      'ShadingInterpolation ShadingRate Shutter Sides Skew SolidBegin SolidEnd Sphere ' +
      'SubdivisionMesh Surface TextureCoordinates Torus Transform TransformBegin TransformEnd ' +
      'TransformPoints Translate TrimCurve WorldBegin WorldEnd',
    illegal: '</',
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };
});

hljs.registerLanguage('roboconf', function(hljs) {
  var IDENTIFIER = '[a-zA-Z-_][^\\n{]+\\{';

  var PROPERTY = {
    className: 'attribute',
    begin: /[a-zA-Z-_]+/, end: /\s*:/, excludeEnd: true,
    starts: {
      end: ';',
      relevance: 0,
      contains: [
        {
          className: 'variable',
          begin: /\.[a-zA-Z-_]+/
        },
        {
          className: 'keyword',
          begin: /\(optional\)/
        }
      ]
    }
  };

  return {
    aliases: ['graph', 'instances'],
    case_insensitive: true,
    keywords: 'import',
    contains: [
      // Facet sections
      {
        begin: '^facet ' + IDENTIFIER,
        end: '}',
        keywords: 'facet',
        contains: [
          PROPERTY,
          hljs.HASH_COMMENT_MODE
        ]
      },

      // Instance sections
      {
        begin: '^\\s*instance of ' + IDENTIFIER,
        end: '}',
        keywords: 'name count channels instance-data instance-state instance of',
        illegal: /\S/,
        contains: [
          'self',
          PROPERTY,
          hljs.HASH_COMMENT_MODE
        ]
      },

      // Component sections
      {
        begin: '^' + IDENTIFIER,
        end: '}',
        contains: [
          PROPERTY,
          hljs.HASH_COMMENT_MODE
        ]
      },

      // Comments
      hljs.HASH_COMMENT_MODE
    ]
  };
});

hljs.registerLanguage('rsl', function(hljs) {
  return {
    keywords: {
      keyword:
        'float color point normal vector matrix while for if do return else break extern continue',
      built_in:
        'abs acos ambient area asin atan atmosphere attribute calculatenormal ceil cellnoise ' +
        'clamp comp concat cos degrees depth Deriv diffuse distance Du Dv environment exp ' +
        'faceforward filterstep floor format fresnel incident length lightsource log match ' +
        'max min mod noise normalize ntransform opposite option phong pnoise pow printf ' +
        'ptlined radians random reflect refract renderinfo round setcomp setxcomp setycomp ' +
        'setzcomp shadow sign sin smoothstep specular specularbrdf spline sqrt step tan ' +
        'texture textureinfo trace transform vtransform xcomp ycomp zcomp'
    },
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'meta',
        begin: '#', end: '$'
      },
      {
        className: 'class',
        beginKeywords: 'surface displacement light volume imager', end: '\\('
      },
      {
        beginKeywords: 'illuminate illuminance gather', end: '\\('
      }
    ]
  };
});

hljs.registerLanguage('ruleslanguage', function(hljs) {
  return {
    keywords: {
       keyword: 'BILL_PERIOD BILL_START BILL_STOP RS_EFFECTIVE_START RS_EFFECTIVE_STOP RS_JURIS_CODE RS_OPCO_CODE ' +
         'INTDADDATTRIBUTE|5 INTDADDVMSG|5 INTDBLOCKOP|5 INTDBLOCKOPNA|5 INTDCLOSE|5 INTDCOUNT|5 ' +
         'INTDCOUNTSTATUSCODE|5 INTDCREATEMASK|5 INTDCREATEDAYMASK|5 INTDCREATEFACTORMASK|5 ' +
         'INTDCREATEHANDLE|5 INTDCREATEOVERRIDEDAYMASK|5 INTDCREATEOVERRIDEMASK|5 ' +
         'INTDCREATESTATUSCODEMASK|5 INTDCREATETOUPERIOD|5 INTDDELETE|5 INTDDIPTEST|5 INTDEXPORT|5 ' +
         'INTDGETERRORCODE|5 INTDGETERRORMESSAGE|5 INTDISEQUAL|5 INTDJOIN|5 INTDLOAD|5 INTDLOADACTUALCUT|5 ' +
         'INTDLOADDATES|5 INTDLOADHIST|5 INTDLOADLIST|5 INTDLOADLISTDATES|5 INTDLOADLISTENERGY|5 ' +
         'INTDLOADLISTHIST|5 INTDLOADRELATEDCHANNEL|5 INTDLOADSP|5 INTDLOADSTAGING|5 INTDLOADUOM|5 ' +
         'INTDLOADUOMDATES|5 INTDLOADUOMHIST|5 INTDLOADVERSION|5 INTDOPEN|5 INTDREADFIRST|5 INTDREADNEXT|5 ' +
         'INTDRECCOUNT|5 INTDRELEASE|5 INTDREPLACE|5 INTDROLLAVG|5 INTDROLLPEAK|5 INTDSCALAROP|5 INTDSCALE|5 ' +
         'INTDSETATTRIBUTE|5 INTDSETDSTPARTICIPANT|5 INTDSETSTRING|5 INTDSETVALUE|5 INTDSETVALUESTATUS|5 ' +
         'INTDSHIFTSTARTTIME|5 INTDSMOOTH|5 INTDSORT|5 INTDSPIKETEST|5 INTDSUBSET|5 INTDTOU|5 ' +
         'INTDTOURELEASE|5 INTDTOUVALUE|5 INTDUPDATESTATS|5 INTDVALUE|5 STDEV INTDDELETEEX|5 ' +
         'INTDLOADEXACTUAL|5 INTDLOADEXCUT|5 INTDLOADEXDATES|5 INTDLOADEX|5 INTDLOADEXRELATEDCHANNEL|5 ' +
         'INTDSAVEEX|5 MVLOAD|5 MVLOADACCT|5 MVLOADACCTDATES|5 MVLOADACCTHIST|5 MVLOADDATES|5 MVLOADHIST|5 ' +
         'MVLOADLIST|5 MVLOADLISTDATES|5 MVLOADLISTHIST|5 IF FOR NEXT DONE SELECT END CALL ABORT CLEAR CHANNEL FACTOR LIST NUMBER ' +
         'OVERRIDE SET WEEK DISTRIBUTIONNODE ELSE WHEN THEN OTHERWISE IENUM CSV INCLUDE LEAVE RIDER SAVE DELETE ' +
         'NOVALUE SECTION WARN SAVE_UPDATE DETERMINANT LABEL REPORT REVENUE EACH ' +
         'IN FROM TOTAL CHARGE BLOCK AND OR CSV_FILE RATE_CODE AUXILIARY_DEMAND ' +
         'UIDACCOUNT RS BILL_PERIOD_SELECT HOURS_PER_MONTH INTD_ERROR_STOP SEASON_SCHEDULE_NAME ' +
         'ACCOUNTFACTOR ARRAYUPPERBOUND CALLSTOREDPROC GETADOCONNECTION GETCONNECT GETDATASOURCE ' +
         'GETQUALIFIER GETUSERID HASVALUE LISTCOUNT LISTOP LISTUPDATE LISTVALUE PRORATEFACTOR RSPRORATE ' +
         'SETBINPATH SETDBMONITOR WQ_OPEN BILLINGHOURS DATE DATEFROMFLOAT DATETIMEFROMSTRING ' +
         'DATETIMETOSTRING DATETOFLOAT DAY DAYDIFF DAYNAME DBDATETIME HOUR MINUTE MONTH MONTHDIFF ' +
         'MONTHHOURS MONTHNAME ROUNDDATE SAMEWEEKDAYLASTYEAR SECOND WEEKDAY WEEKDIFF YEAR YEARDAY ' +
         'YEARSTR COMPSUM HISTCOUNT HISTMAX HISTMIN HISTMINNZ HISTVALUE MAXNRANGE MAXRANGE MINRANGE ' +
         'COMPIKVA COMPKVA COMPKVARFROMKQKW COMPLF IDATTR FLAG LF2KW LF2KWH MAXKW POWERFACTOR ' +
         'READING2USAGE AVGSEASON MAXSEASON MONTHLYMERGE SEASONVALUE SUMSEASON ACCTREADDATES ' +
         'ACCTTABLELOAD CONFIGADD CONFIGGET CREATEOBJECT CREATEREPORT EMAILCLIENT EXPBLKMDMUSAGE ' +
         'EXPMDMUSAGE EXPORT_USAGE FACTORINEFFECT GETUSERSPECIFIEDSTOP INEFFECT ISHOLIDAY RUNRATE ' +
         'SAVE_PROFILE SETREPORTTITLE USEREXIT WATFORRUNRATE TO TABLE ACOS ASIN ATAN ATAN2 BITAND CEIL ' +
         'COS COSECANT COSH COTANGENT DIVQUOT DIVREM EXP FABS FLOOR FMOD FREPM FREXPN LOG LOG10 MAX MAXN ' +
         'MIN MINNZ MODF POW ROUND ROUND2VALUE ROUNDINT SECANT SIN SINH SQROOT TAN TANH FLOAT2STRING ' +
         'FLOAT2STRINGNC INSTR LEFT LEN LTRIM MID RIGHT RTRIM STRING STRINGNC TOLOWER TOUPPER TRIM ' +
         'NUMDAYS READ_DATE STAGING',
       built_in: 'IDENTIFIER OPTIONS XML_ELEMENT XML_OP XML_ELEMENT_OF DOMDOCCREATE DOMDOCLOADFILE DOMDOCLOADXML ' +
         'DOMDOCSAVEFILE DOMDOCGETROOT DOMDOCADDPI DOMNODEGETNAME DOMNODEGETTYPE DOMNODEGETVALUE DOMNODEGETCHILDCT ' +
         'DOMNODEGETFIRSTCHILD DOMNODEGETSIBLING DOMNODECREATECHILDELEMENT DOMNODESETATTRIBUTE ' +
         'DOMNODEGETCHILDELEMENTCT DOMNODEGETFIRSTCHILDELEMENT DOMNODEGETSIBLINGELEMENT DOMNODEGETATTRIBUTECT ' +
         'DOMNODEGETATTRIBUTEI DOMNODEGETATTRIBUTEBYNAME DOMNODEGETBYNAME'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'literal',
        variants: [
          {begin: '#\\s+[a-zA-Z\\ \\.]*', relevance: 0}, // looks like #-comment
          {begin: '#[a-zA-Z\\ \\.]+'}
        ]
      }
    ]
  };
});

hljs.registerLanguage('rust', function(hljs) {
  var NUM_SUFFIX = '([uif](8|16|32|64|size))\?';
  var BLOCK_COMMENT = hljs.inherit(hljs.C_BLOCK_COMMENT_MODE);
  BLOCK_COMMENT.contains.push('self');
  var BUILTINS =
    // prelude
    'Copy Send Sized Sync Drop Fn FnMut FnOnce drop Box ToOwned Clone ' +
    'PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator ' +
    'Extend IntoIterator DoubleEndedIterator ExactSizeIterator Option ' +
    'Result SliceConcatExt String ToString Vec ' +
    // macros
    'assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! ' +
    'debug_assert! debug_assert_eq! env! panic! file! format! format_args! ' +
    'include_bin! include_str! line! local_data_key! module_path! ' +
    'option_env! print! println! select! stringify! try! unimplemented! ' +
    'unreachable! vec! write! writeln!';
  return {
    aliases: ['rs'],
    keywords: {
      keyword:
        'alignof as be box break const continue crate do else enum extern ' +
        'false fn for if impl in let loop match mod mut offsetof once priv ' +
        'proc pub pure ref return self Self sizeof static struct super trait true ' +
        'type typeof unsafe unsized use virtual while where yield ' +
        'int i8 i16 i32 i64 ' +
        'uint u8 u32 u64 ' +
        'float f32 f64 ' +
        'str char bool',
      literal:
        'true false Some None Ok Err',
      built_in:
        BUILTINS
    },
    lexemes: hljs.IDENT_RE + '!?',
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      BLOCK_COMMENT,
      hljs.inherit(hljs.QUOTE_STRING_MODE, {begin: /b?"/, illegal: null}),
      {
        className: 'string',
        variants: [
           { begin: /r(#*)".*?"\1(?!#)/ },
           { begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/ }
        ]
      },
      {
        className: 'symbol',
        begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
      },
      {
        className: 'number',
        variants: [
          { begin: '\\b0b([01_]+)' + NUM_SUFFIX },
          { begin: '\\b0o([0-7_]+)' + NUM_SUFFIX },
          { begin: '\\b0x([A-Fa-f0-9_]+)' + NUM_SUFFIX },
          { begin: '\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)' +
                   NUM_SUFFIX
          }
        ],
        relevance: 0
      },
      {
        className: 'function',
        beginKeywords: 'fn', end: '(\\(|<)', excludeEnd: true,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        className: 'meta',
        begin: '#\\!?\\[', end: '\\]',
        contains: [
          {
            className: 'meta-string',
            begin: /"/, end: /"/
          }
        ]
      },
      {
        className: 'class',
        beginKeywords: 'type', end: '(=|<)',
        contains: [hljs.UNDERSCORE_TITLE_MODE],
        illegal: '\\S'
      },
      {
        className: 'class',
        beginKeywords: 'trait enum struct', end: '{',
        contains: [
          hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, {endsParent: true})
        ],
        illegal: '[\\w\\d]'
      },
      {
        begin: hljs.IDENT_RE + '::',
        keywords: {built_in: BUILTINS}
      },
      {
        begin: '->'
      }
    ]
  };
});

hljs.registerLanguage('scala', function(hljs) {

  var ANNOTATION = { className: 'meta', begin: '@[A-Za-z]+' };

  // used in strings for escaping/interpolation/substitution
  var SUBST = {
    className: 'subst',
    variants: [
      {begin: '\\$[A-Za-z0-9_]+'},
      {begin: '\\${', end: '}'}
    ]
  };

  var STRING = {
    className: 'string',
    variants: [
      {
        begin: '"', end: '"',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        begin: '"""', end: '"""',
        relevance: 10
      },
      {
        begin: '[a-z]+"', end: '"',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE, SUBST]
      },
      {
        className: 'string',
        begin: '[a-z]+"""', end: '"""',
        contains: [SUBST],
        relevance: 10
      }
    ]

  };

  var SYMBOL = {
    className: 'symbol',
    begin: '\'\\w[\\w\\d_]*(?!\')'
  };

  var TYPE = {
    className: 'type',
    begin: '\\b[A-Z][A-Za-z0-9_]*',
    relevance: 0
  };

  var NAME = {
    className: 'title',
    begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
    relevance: 0
  };

  var CLASS = {
    className: 'class',
    beginKeywords: 'class object trait type',
    end: /[:={\[\n;]/,
    excludeEnd: true,
    contains: [
      {
        beginKeywords: 'extends with',
        relevance: 10
      },
      {
        begin: /\[/,
        end: /\]/,
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0,
        contains: [TYPE]
      },
      {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0,
        contains: [TYPE]
      },
      NAME
    ]
  };

  var METHOD = {
    className: 'function',
    beginKeywords: 'def',
    end: /[:={\[(\n;]/,
    excludeEnd: true,
    contains: [NAME]
  };

  return {
    keywords: {
      literal: 'true false null',
      keyword: 'type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      STRING,
      SYMBOL,
      TYPE,
      METHOD,
      CLASS,
      hljs.C_NUMBER_MODE,
      ANNOTATION
    ]
  };
});

hljs.registerLanguage('scheme', function(hljs) {
  var SCHEME_IDENT_RE = '[^\\(\\)\\[\\]\\{\\}",\'`;#|\\\\\\s]+';
  var SCHEME_SIMPLE_NUMBER_RE = '(\\-|\\+)?\\d+([./]\\d+)?';
  var SCHEME_COMPLEX_NUMBER_RE = SCHEME_SIMPLE_NUMBER_RE + '[+\\-]' + SCHEME_SIMPLE_NUMBER_RE + 'i';
  var BUILTINS = {
    'builtin-name':
      'case-lambda call/cc class define-class exit-handler field import ' +
      'inherit init-field interface let*-values let-values let/ec mixin ' +
      'opt-lambda override protect provide public rename require ' +
      'require-for-syntax syntax syntax-case syntax-error unit/sig unless ' +
      'when with-syntax and begin call-with-current-continuation ' +
      'call-with-input-file call-with-output-file case cond define ' +
      'define-syntax delay do dynamic-wind else for-each if lambda let let* ' +
      'let-syntax letrec letrec-syntax map or syntax-rules \' * + , ,@ - ... / ' +
      '; < <= = => > >= ` abs acos angle append apply asin assoc assq assv atan ' +
      'boolean? caar cadr call-with-input-file call-with-output-file ' +
      'call-with-values car cdddar cddddr cdr ceiling char->integer ' +
      'char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? ' +
      'char-downcase char-lower-case? char-numeric? char-ready? char-upcase ' +
      'char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? ' +
      'char? close-input-port close-output-port complex? cons cos ' +
      'current-input-port current-output-port denominator display eof-object? ' +
      'eq? equal? eqv? eval even? exact->inexact exact? exp expt floor ' +
      'force gcd imag-part inexact->exact inexact? input-port? integer->char ' +
      'integer? interaction-environment lcm length list list->string ' +
      'list->vector list-ref list-tail list? load log magnitude make-polar ' +
      'make-rectangular make-string make-vector max member memq memv min ' +
      'modulo negative? newline not null-environment null? number->string ' +
      'number? numerator odd? open-input-file open-output-file output-port? ' +
      'pair? peek-char port? positive? procedure? quasiquote quote quotient ' +
      'rational? rationalize read read-char real-part real? remainder reverse ' +
      'round scheme-report-environment set! set-car! set-cdr! sin sqrt string ' +
      'string->list string->number string->symbol string-append string-ci<=? ' +
      'string-ci<? string-ci=? string-ci>=? string-ci>? string-copy ' +
      'string-fill! string-length string-ref string-set! string<=? string<? ' +
      'string=? string>=? string>? string? substring symbol->string symbol? ' +
      'tan transcript-off transcript-on truncate values vector ' +
      'vector->list vector-fill! vector-length vector-ref vector-set! ' +
      'with-input-from-file with-output-to-file write write-char zero?'
  };

  var SHEBANG = {
    className: 'meta',
    begin: '^#!',
    end: '$'
  };

  var LITERAL = {
    className: 'literal',
    begin: '(#t|#f|#\\\\' + SCHEME_IDENT_RE + '|#\\\\.)'
  };

  var NUMBER = {
    className: 'number',
    variants: [
      { begin: SCHEME_SIMPLE_NUMBER_RE, relevance: 0 },
      { begin: SCHEME_COMPLEX_NUMBER_RE, relevance: 0 },
      { begin: '#b[0-1]+(/[0-1]+)?' },
      { begin: '#o[0-7]+(/[0-7]+)?' },
      { begin: '#x[0-9a-f]+(/[0-9a-f]+)?' }
    ]
  };

  var STRING = hljs.QUOTE_STRING_MODE;

  var REGULAR_EXPRESSION = {
    className: 'regexp',
    begin: '#[pr]x"',
    end: '[^\\\\]"'
  };

  var COMMENT_MODES = [
    hljs.COMMENT(
      ';',
      '$',
      {
        relevance: 0
      }
    ),
    hljs.COMMENT('#\\|', '\\|#')
  ];

  var IDENT = {
    begin: SCHEME_IDENT_RE,
    relevance: 0
  };

  var QUOTED_IDENT = {
    className: 'symbol',
    begin: '\'' + SCHEME_IDENT_RE
  };

  var BODY = {
    endsWithParent: true,
    relevance: 0
  };

  var LIST = {
    variants: [
      { begin: '\\(', end: '\\)' },
      { begin: '\\[', end: '\\]' }
    ],
    contains: [
      {
        className: 'name',
        begin: SCHEME_IDENT_RE,
        lexemes: SCHEME_IDENT_RE,
        keywords: BUILTINS
      },
      BODY
    ]
  };

  BODY.contains = [LITERAL, NUMBER, STRING, IDENT, QUOTED_IDENT, LIST].concat(COMMENT_MODES);

  return {
    illegal: /\S/,
    contains: [SHEBANG, NUMBER, STRING, QUOTED_IDENT, LIST].concat(COMMENT_MODES)
  };
});

hljs.registerLanguage('scilab', function(hljs) {

  var COMMON_CONTAINS = [
    hljs.C_NUMBER_MODE,
    {
      className: 'string',
      begin: '\'|\"', end: '\'|\"',
      contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}]
    }
  ];

  return {
    aliases: ['sci'],
    lexemes: /%?\w+/,
    keywords: {
      keyword: 'abort break case clear catch continue do elseif else endfunction end for function '+
        'global if pause return resume select try then while',
      literal:
        '%f %F %t %T %pi %eps %inf %nan %e %i %z %s',
      built_in: // Scilab has more than 2000 functions. Just list the most commons
       'abs and acos asin atan ceil cd chdir clearglobal cosh cos cumprod deff disp error '+
       'exec execstr exists exp eye gettext floor fprintf fread fsolve imag isdef isempty '+
       'isinfisnan isvector lasterror length load linspace list listfiles log10 log2 log '+
       'max min msprintf mclose mopen ones or pathconvert poly printf prod pwd rand real '+
       'round sinh sin size gsort sprintf sqrt strcat strcmps tring sum system tanh tan '+
       'type typename warning zeros matrix'
    },
    illegal: '("|#|/\\*|\\s+/\\w+)',
    contains: [
      {
        className: 'function',
        beginKeywords: 'function', end: '$',
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: 'params',
            begin: '\\(', end: '\\)'
          }
        ]
      },
      {
        begin: '[a-zA-Z_][a-zA-Z_0-9]*(\'+[\\.\']*|[\\.\']+)', end: '',
        relevance: 0
      },
      {
        begin: '\\[', end: '\\]\'*[\\.\']*',
        relevance: 0,
        contains: COMMON_CONTAINS
      },
      hljs.COMMENT('//', '$')
    ].concat(COMMON_CONTAINS)
  };
});

hljs.registerLanguage('scss', function(hljs) {
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  var VARIABLE = {
    className: 'variable',
    begin: '(\\$' + IDENT_RE + ')\\b'
  };
  var HEXCOLOR = {
    className: 'number', begin: '#[0-9A-Fa-f]+'
  };
  var DEF_INTERNALS = {
    className: 'attribute',
    begin: '[A-Z\\_\\.\\-]+', end: ':',
    excludeEnd: true,
    illegal: '[^\\s]',
    starts: {
      endsWithParent: true, excludeEnd: true,
      contains: [
        HEXCOLOR,
        hljs.CSS_NUMBER_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.APOS_STRING_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        {
          className: 'meta', begin: '!important'
        }
      ]
    }
  };
  return {
    case_insensitive: true,
    illegal: '[=/|\']',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'selector-id', begin: '\\#[A-Za-z0-9_-]+',
        relevance: 0
      },
      {
        className: 'selector-class', begin: '\\.[A-Za-z0-9_-]+',
        relevance: 0
      },
      {
        className: 'selector-attr', begin: '\\[', end: '\\]',
        illegal: '$'
      },
      {
        className: 'selector-tag', // begin: IDENT_RE, end: '[,|\\s]'
        begin: '\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b',
        relevance: 0
      },
      {
        begin: ':(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)'
      },
      {
        begin: '::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)'
      },
      VARIABLE,
      {
        className: 'attribute',
        begin: '\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b',
        illegal: '[^\\s]'
      },
      {
        begin: '\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b'
      },
      {
        begin: ':', end: ';',
        contains: [
          VARIABLE,
          HEXCOLOR,
          hljs.CSS_NUMBER_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          {
            className: 'meta', begin: '!important'
          }
        ]
      },
      {
        begin: '@', end: '[{;]',
        keywords: 'mixin include extend for if else each while charset import debug media page content font-face namespace warn',
        contains: [
          VARIABLE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          HEXCOLOR,
          hljs.CSS_NUMBER_MODE,
          {
            begin: '\\s[A-Za-z0-9_.-]+',
            relevance: 0
          }
        ]
      }
    ]
  };
});

hljs.registerLanguage('smali', function(hljs) {
  var smali_instr_low_prio = ['add', 'and', 'cmp', 'cmpg', 'cmpl', 'const', 'div', 'double', 'float', 'goto', 'if', 'int', 'long', 'move', 'mul', 'neg', 'new', 'nop', 'not', 'or', 'rem', 'return', 'shl', 'shr', 'sput', 'sub', 'throw', 'ushr', 'xor'];
  var smali_instr_high_prio = ['aget', 'aput', 'array', 'check', 'execute', 'fill', 'filled', 'goto/16', 'goto/32', 'iget', 'instance', 'invoke', 'iput', 'monitor', 'packed', 'sget', 'sparse'];
  var smali_keywords = ['transient', 'constructor', 'abstract', 'final', 'synthetic', 'public', 'private', 'protected', 'static', 'bridge', 'system'];
  return {
    aliases: ['smali'],
    contains: [
      {
        className: 'string',
        begin: '"', end: '"',
        relevance: 0
      },
      hljs.COMMENT(
        '#',
        '$',
        {
          relevance: 0
        }
      ),
      {
        className: 'keyword',
        variants: [
          {begin: '\\s*\\.end\\s[a-zA-Z0-9]*'},
          {begin: '^[ ]*\\.[a-zA-Z]*', relevance: 0},
          {begin: '\\s:[a-zA-Z_0-9]*', relevance: 0},
          {begin: '\\s(' + smali_keywords.join('|') + ')'}
        ]
      },
      {
        className: 'built_in',
        variants : [
          {
            begin: '\\s('+smali_instr_low_prio.join('|')+')\\s'
          },
          {
            begin: '\\s('+smali_instr_low_prio.join('|')+')((\\-|/)[a-zA-Z0-9]+)+\\s',
            relevance: 10
          },
          {
            begin: '\\s('+smali_instr_high_prio.join('|')+')((\\-|/)[a-zA-Z0-9]+)*\\s',
            relevance: 10
          },
        ]
      },
      {
        className: 'class',
        begin: 'L[^\(;:\n]*;',
        relevance: 0
      },
      {
        begin: '[vp][0-9]+',
      }
    ]
  };
});

hljs.registerLanguage('smalltalk', function(hljs) {
  var VAR_IDENT_RE = '[a-z][a-zA-Z0-9_]*';
  var CHAR = {
    className: 'string',
    begin: '\\$.{1}'
  };
  var SYMBOL = {
    className: 'symbol',
    begin: '#' + hljs.UNDERSCORE_IDENT_RE
  };
  return {
    aliases: ['st'],
    keywords: 'self super nil true false thisContext', // only 6
    contains: [
      hljs.COMMENT('"', '"'),
      hljs.APOS_STRING_MODE,
      {
        className: 'type',
        begin: '\\b[A-Z][A-Za-z0-9_]*',
        relevance: 0
      },
      {
        begin: VAR_IDENT_RE + ':',
        relevance: 0
      },
      hljs.C_NUMBER_MODE,
      SYMBOL,
      CHAR,
      {
        // This looks more complicated than needed to avoid combinatorial
        // explosion under V8. It effectively means `| var1 var2 ... |` with
        // whitespace adjacent to `|` being optional.
        begin: '\\|[ ]*' + VAR_IDENT_RE + '([ ]+' + VAR_IDENT_RE + ')*[ ]*\\|',
        returnBegin: true, end: /\|/,
        illegal: /\S/,
        contains: [{begin: '(\\|[ ]*)?' + VAR_IDENT_RE}]
      },
      {
        begin: '\\#\\(', end: '\\)',
        contains: [
          hljs.APOS_STRING_MODE,
          CHAR,
          hljs.C_NUMBER_MODE,
          SYMBOL
        ]
      }
    ]
  };
});

hljs.registerLanguage('sml', function(hljs) {
  return {
    aliases: ['ml'],
    keywords: {
      keyword:
        /* according to Definition of Standard ML 97  */
        'abstype and andalso as case datatype do else end eqtype ' +
        'exception fn fun functor handle if in include infix infixr ' +
        'let local nonfix of op open orelse raise rec sharing sig ' +
        'signature struct structure then type val with withtype where while',
      built_in:
        /* built-in types according to basis library */
        'array bool char exn int list option order real ref string substring vector unit word',
      literal:
        'true false NONE SOME LESS EQUAL GREATER nil'
    },
    illegal: /\/\/|>>/,
    lexemes: '[a-z_]\\w*!?',
    contains: [
      {
        className: 'literal',
        begin: '\\[(\\|\\|)?\\]|\\(\\)'
      },
      hljs.COMMENT(
        '\\(\\*',
        '\\*\\)',
        {
          contains: ['self']
        }
      ),
      { /* type variable */
        className: 'symbol',
        begin: '\'[A-Za-z_](?!\')[\\w\']*'
        /* the grammar is ambiguous on how 'a'b should be interpreted but not the compiler */
      },
      { /* polymorphic variant */
        className: 'type',
        begin: '`[A-Z][\\w\']*'
      },
      { /* module or constructor */
        className: 'type',
        begin: '\\b[A-Z][\\w\']*',
        relevance: 0
      },
      { /* don't color identifiers, but safely catch all identifiers with '*/
        begin: '[a-z_]\\w*\'[\\w\']*'
      },
      hljs.inherit(hljs.APOS_STRING_MODE, {className: 'string', relevance: 0}),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),
      {
        className: 'number',
        begin:
          '\\b(0[xX][a-fA-F0-9_]+[Lln]?|' +
          '0[oO][0-7_]+[Lln]?|' +
          '0[bB][01_]+[Lln]?|' +
          '[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)',
        relevance: 0
      },
      {
        begin: /[-=]>/ // relevance booster
      }
    ]
  };
});

hljs.registerLanguage('sqf', function(hljs) {
  var allCommands = ['!', '-', '+', '!=', '%', '&&', '*', '/', '=', '==', '>', '>=', '<', '<=', 'or', 'plus', '^', ':', '>>', 'abs', 'accTime', 'acos', 'action', 'actionKeys', 'actionKeysImages', 'actionKeysNames', 'actionKeysNamesArray', 'actionName', 'activateAddons', 'activatedAddons', 'activateKey', 'addAction', 'addBackpack', 'addBackpackCargo', 'addBackpackCargoGlobal', 'addBackpackGlobal', 'addCamShake', 'addCuratorAddons', 'addCuratorCameraArea', 'addCuratorEditableObjects', 'addCuratorEditingArea', 'addCuratorPoints', 'addEditorObject', 'addEventHandler', 'addGoggles', 'addGroupIcon', 'addHandgunItem', 'addHeadgear', 'addItem', 'addItemCargo', 'addItemCargoGlobal', 'addItemPool', 'addItemToBackpack', 'addItemToUniform', 'addItemToVest', 'addLiveStats', 'addMagazine', 'addMagazine array', 'addMagazineAmmoCargo', 'addMagazineCargo', 'addMagazineCargoGlobal', 'addMagazineGlobal', 'addMagazinePool', 'addMagazines', 'addMagazineTurret', 'addMenu', 'addMenuItem', 'addMissionEventHandler', 'addMPEventHandler', 'addMusicEventHandler', 'addPrimaryWeaponItem', 'addPublicVariableEventHandler', 'addRating', 'addResources', 'addScore', 'addScoreSide', 'addSecondaryWeaponItem', 'addSwitchableUnit', 'addTeamMember', 'addToRemainsCollector', 'addUniform', 'addVehicle', 'addVest', 'addWaypoint', 'addWeapon', 'addWeaponCargo', 'addWeaponCargoGlobal', 'addWeaponGlobal', 'addWeaponPool', 'addWeaponTurret', 'agent', 'agents', 'AGLToASL', 'aimedAtTarget', 'aimPos', 'airDensityRTD', 'airportSide', 'AISFinishHeal', 'alive', 'allControls', 'allCurators', 'allDead', 'allDeadMen', 'allDisplays', 'allGroups', 'allMapMarkers', 'allMines', 'allMissionObjects', 'allow3DMode', 'allowCrewInImmobile', 'allowCuratorLogicIgnoreAreas', 'allowDamage', 'allowDammage', 'allowFileOperations', 'allowFleeing', 'allowGetIn', 'allPlayers', 'allSites', 'allTurrets', 'allUnits', 'allUnitsUAV', 'allVariables', 'ammo', 'and', 'animate', 'animateDoor', 'animationPhase', 'animationState', 'append', 'armoryPoints', 'arrayIntersect', 'asin', 'ASLToAGL', 'ASLToATL', 'assert', 'assignAsCargo', 'assignAsCargoIndex', 'assignAsCommander', 'assignAsDriver', 'assignAsGunner', 'assignAsTurret', 'assignCurator', 'assignedCargo', 'assignedCommander', 'assignedDriver', 'assignedGunner', 'assignedItems', 'assignedTarget', 'assignedTeam', 'assignedVehicle', 'assignedVehicleRole', 'assignItem', 'assignTeam', 'assignToAirport', 'atan', 'atan2', 'atg', 'ATLToASL', 'attachedObject', 'attachedObjects', 'attachedTo', 'attachObject', 'attachTo', 'attackEnabled', 'backpack', 'backpackCargo', 'backpackContainer', 'backpackItems', 'backpackMagazines', 'backpackSpaceFor', 'behaviour', 'benchmark', 'binocular', 'blufor', 'boundingBox', 'boundingBoxReal', 'boundingCenter', 'breakOut', 'breakTo', 'briefingName', 'buildingExit', 'buildingPos', 'buttonAction', 'buttonSetAction', 'cadetMode', 'call', 'callExtension', 'camCommand', 'camCommit', 'camCommitPrepared', 'camCommitted', 'camConstuctionSetParams', 'camCreate', 'camDestroy', 'cameraEffect', 'cameraEffectEnableHUD', 'cameraInterest', 'cameraOn', 'cameraView', 'campaignConfigFile', 'camPreload', 'camPreloaded', 'camPrepareBank', 'camPrepareDir', 'camPrepareDive', 'camPrepareFocus', 'camPrepareFov', 'camPrepareFovRange', 'camPreparePos', 'camPrepareRelPos', 'camPrepareTarget', 'camSetBank', 'camSetDir', 'camSetDive', 'camSetFocus', 'camSetFov', 'camSetFovRange', 'camSetPos', 'camSetRelPos', 'camSetTarget', 'camTarget', 'camUseNVG', 'canAdd', 'canAddItemToBackpack', 'canAddItemToUniform', 'canAddItemToVest', 'cancelSimpleTaskDestination', 'canFire', 'canMove', 'canSlingLoad', 'canStand', 'canUnloadInCombat', 'captive', 'captiveNum', 'case', 'catch', 'cbChecked', 'cbSetChecked', 'ceil', 'cheatsEnabled', 'checkAIFeature', 'civilian', 'className', 'clearAllItemsFromBackpack', 'clearBackpackCargo', 'clearBackpackCargoGlobal', 'clearGroupIcons', 'clearItemCargo', 'clearItemCargoGlobal', 'clearItemPool', 'clearMagazineCargo', 'clearMagazineCargoGlobal', 'clearMagazinePool', 'clearOverlay', 'clearRadio', 'clearWeaponCargo', 'clearWeaponCargoGlobal', 'clearWeaponPool', 'closeDialog', 'closeDisplay', 'closeOverlay', 'collapseObjectTree', 'combatMode', 'commandArtilleryFire', 'commandChat', 'commander', 'commandFire', 'commandFollow', 'commandFSM', 'commandGetOut', 'commandingMenu', 'commandMove', 'commandRadio', 'commandStop', 'commandTarget', 'commandWatch', 'comment', 'commitOverlay', 'compile', 'compileFinal', 'completedFSM', 'composeText', 'configClasses', 'configFile', 'configHierarchy', 'configName', 'configProperties', 'configSourceMod', 'configSourceModList', 'connectTerminalToUAV', 'controlNull', 'controlsGroupCtrl', 'copyFromClipboard', 'copyToClipboard', 'copyWaypoints', 'cos', 'count', 'countEnemy', 'countFriendly', 'countSide', 'countType', 'countUnknown', 'createAgent', 'createCenter', 'createDialog', 'createDiaryLink', 'createDiaryRecord', 'createDiarySubject', 'createDisplay', 'createGearDialog', 'createGroup', 'createGuardedPoint', 'createLocation', 'createMarker', 'createMarkerLocal', 'createMenu', 'createMine', 'createMissionDisplay', 'createSimpleTask', 'createSite', 'createSoundSource', 'createTask', 'createTeam', 'createTrigger', 'createUnit', 'createUnit array', 'createVehicle', 'createVehicle array', 'createVehicleCrew', 'createVehicleLocal', 'crew', 'ctrlActivate', 'ctrlAddEventHandler', 'ctrlAutoScrollDelay', 'ctrlAutoScrollRewind', 'ctrlAutoScrollSpeed', 'ctrlChecked', 'ctrlClassName', 'ctrlCommit', 'ctrlCommitted', 'ctrlCreate', 'ctrlDelete', 'ctrlEnable', 'ctrlEnabled', 'ctrlFade', 'ctrlHTMLLoaded', 'ctrlIDC', 'ctrlIDD', 'ctrlMapAnimAdd', 'ctrlMapAnimClear', 'ctrlMapAnimCommit', 'ctrlMapAnimDone', 'ctrlMapCursor', 'ctrlMapMouseOver', 'ctrlMapScale', 'ctrlMapScreenToWorld', 'ctrlMapWorldToScreen', 'ctrlModel', 'ctrlModelDirAndUp', 'ctrlModelScale', 'ctrlParent', 'ctrlPosition', 'ctrlRemoveAllEventHandlers', 'ctrlRemoveEventHandler', 'ctrlScale', 'ctrlSetActiveColor', 'ctrlSetAutoScrollDelay', 'ctrlSetAutoScrollRewind', 'ctrlSetAutoScrollSpeed', 'ctrlSetBackgroundColor', 'ctrlSetChecked', 'ctrlSetEventHandler', 'ctrlSetFade', 'ctrlSetFocus', 'ctrlSetFont', 'ctrlSetFontH1', 'ctrlSetFontH1B', 'ctrlSetFontH2', 'ctrlSetFontH2B', 'ctrlSetFontH3', 'ctrlSetFontH3B', 'ctrlSetFontH4', 'ctrlSetFontH4B', 'ctrlSetFontH5', 'ctrlSetFontH5B', 'ctrlSetFontH6', 'ctrlSetFontH6B', 'ctrlSetFontHeight', 'ctrlSetFontHeightH1', 'ctrlSetFontHeightH2', 'ctrlSetFontHeightH3', 'ctrlSetFontHeightH4', 'ctrlSetFontHeightH5', 'ctrlSetFontHeightH6', 'ctrlSetFontP', 'ctrlSetFontPB', 'ctrlSetForegroundColor', 'ctrlSetModel', 'ctrlSetModelDirAndUp', 'ctrlSetModelScale', 'ctrlSetPosition', 'ctrlSetScale', 'ctrlSetStructuredText', 'ctrlSetText', 'ctrlSetTextColor', 'ctrlSetTooltip', 'ctrlSetTooltipColorBox', 'ctrlSetTooltipColorShade', 'ctrlSetTooltipColorText', 'ctrlShow', 'ctrlShown', 'ctrlText', 'ctrlTextHeight', 'ctrlType', 'ctrlVisible', 'curatorAddons', 'curatorCamera', 'curatorCameraArea', 'curatorCameraAreaCeiling', 'curatorCoef', 'curatorEditableObjects', 'curatorEditingArea', 'curatorEditingAreaType', 'curatorMouseOver', 'curatorPoints', 'curatorRegisteredObjects', 'curatorSelected', 'curatorWaypointCost', 'currentChannel', 'currentCommand', 'currentMagazine', 'currentMagazineDetail', 'currentMagazineDetailTurret', 'currentMagazineTurret', 'currentMuzzle', 'currentNamespace', 'currentTask', 'currentTasks', 'currentThrowable', 'currentVisionMode', 'currentWaypoint', 'currentWeapon', 'currentWeaponMode', 'currentWeaponTurret', 'currentZeroing', 'cursorTarget', 'customChat', 'customRadio', 'cutFadeOut', 'cutObj', 'cutRsc', 'cutText', 'damage', 'date', 'dateToNumber', 'daytime', 'deActivateKey', 'debriefingText', 'debugFSM', 'debugLog', 'default', 'deg', 'deleteAt', 'deleteCenter', 'deleteCollection', 'deleteEditorObject', 'deleteGroup', 'deleteIdentity', 'deleteLocation', 'deleteMarker', 'deleteMarkerLocal', 'deleteRange', 'deleteResources', 'deleteSite', 'deleteStatus', 'deleteTeam', 'deleteVehicle', 'deleteVehicleCrew', 'deleteWaypoint', 'detach', 'detectedMines', 'diag activeMissionFSMs', 'diag activeSQFScripts', 'diag activeSQSScripts', 'diag captureFrame', 'diag captureSlowFrame', 'diag fps', 'diag fpsMin', 'diag frameNo', 'diag log', 'diag logSlowFrame', 'diag tickTime', 'dialog', 'diarySubjectExists', 'didJIP', 'didJIPOwner', 'difficulty', 'difficultyEnabled', 'difficultyEnabledRTD', 'direction', 'directSay', 'disableAI', 'disableCollisionWith', 'disableConversation', 'disableDebriefingStats', 'disableSerialization', 'disableTIEquipment', 'disableUAVConnectability', 'disableUserInput', 'displayAddEventHandler', 'displayCtrl', 'displayNull', 'displayRemoveAllEventHandlers', 'displayRemoveEventHandler', 'displaySetEventHandler', 'dissolveTeam', 'distance', 'distance2D', 'distanceSqr', 'distributionRegion', 'do', 'doArtilleryFire', 'doFire', 'doFollow', 'doFSM', 'doGetOut', 'doMove', 'doorPhase', 'doStop', 'doTarget', 'doWatch', 'drawArrow', 'drawEllipse', 'drawIcon', 'drawIcon3D', 'drawLine', 'drawLine3D', 'drawLink', 'drawLocation', 'drawRectangle', 'driver', 'drop', 'east', 'echo', 'editObject', 'editorSetEventHandler', 'effectiveCommander', 'else', 'emptyPositions', 'enableAI', 'enableAIFeature', 'enableAttack', 'enableCamShake', 'enableCaustics', 'enableCollisionWith', 'enableCopilot', 'enableDebriefingStats', 'enableDiagLegend', 'enableEndDialog', 'enableEngineArtillery', 'enableEnvironment', 'enableFatigue', 'enableGunLights', 'enableIRLasers', 'enableMimics', 'enablePersonTurret', 'enableRadio', 'enableReload', 'enableRopeAttach', 'enableSatNormalOnDetail', 'enableSaving', 'enableSentences', 'enableSimulation', 'enableSimulationGlobal', 'enableTeamSwitch', 'enableUAVConnectability', 'enableUAVWaypoints', 'endLoadingScreen', 'endMission', 'engineOn', 'enginesIsOnRTD', 'enginesRpmRTD', 'enginesTorqueRTD', 'entities', 'estimatedEndServerTime', 'estimatedTimeLeft', 'evalObjectArgument', 'everyBackpack', 'everyContainer', 'exec', 'execEditorScript', 'execFSM', 'execVM', 'exit', 'exitWith', 'exp', 'expectedDestination', 'eyeDirection', 'eyePos', 'face', 'faction', 'fadeMusic', 'fadeRadio', 'fadeSound', 'fadeSpeech', 'failMission', 'false', 'fillWeaponsFromPool', 'find', 'findCover', 'findDisplay', 'findEditorObject', 'findEmptyPosition', 'findEmptyPositionReady', 'findNearestEnemy', 'finishMissionInit', 'finite', 'fire', 'fireAtTarget', 'firstBackpack', 'flag', 'flagOwner', 'fleeing', 'floor', 'flyInHeight', 'fog', 'fogForecast', 'fogParams', 'for', 'forceAddUniform', 'forceEnd', 'forceMap', 'forceRespawn', 'forceSpeed', 'forceWalk', 'forceWeaponFire', 'forceWeatherChange', 'forEach', 'forEachMember', 'forEachMemberAgent', 'forEachMemberTeam', 'format', 'formation', 'formationDirection', 'formationLeader', 'formationMembers', 'formationPosition', 'formationTask', 'formatText', 'formLeader', 'freeLook', 'from', 'fromEditor', 'fuel', 'fullCrew', 'gearSlotAmmoCount', 'gearSlotData', 'getAllHitPointsDamage', 'getAmmoCargo', 'getArray', 'getArtilleryAmmo', 'getArtilleryComputerSettings', 'getArtilleryETA', 'getAssignedCuratorLogic', 'getAssignedCuratorUnit', 'getBackpackCargo', 'getBleedingRemaining', 'getBurningValue', 'getCargoIndex', 'getCenterOfMass', 'getClientState', 'getConnectedUAV', 'getDammage', 'getDescription', 'getDir', 'getDirVisual', 'getDLCs', 'getEditorCamera', 'getEditorMode', 'getEditorObjectScope', 'getElevationOffset', 'getFatigue', 'getFriend', 'getFSMVariable', 'getFuelCargo', 'getGroupIcon', 'getGroupIconParams', 'getGroupIcons', 'getHideFrom', 'getHit', 'getHitIndex', 'getHitPointDamage', 'getItemCargo', 'getMagazineCargo', 'getMarkerColor', 'getMarkerPos', 'getMarkerSize', 'getMarkerType', 'getMass', 'getModelInfo', 'getNumber', 'getObjectArgument', 'getObjectChildren', 'getObjectDLC', 'getObjectMaterials', 'getObjectProxy', 'getObjectTextures', 'getObjectType', 'getObjectViewDistance', 'getOxygenRemaining', 'getPersonUsedDLCs', 'getPlayerChannel', 'getPlayerUID', 'getPos', 'getPosASL', 'getPosASLVisual', 'getPosASLW', 'getPosATL', 'getPosATLVisual', 'getPosVisual', 'getPosWorld', 'getRepairCargo', 'getResolution', 'getShadowDistance', 'getSlingLoad', 'getSpeed', 'getSuppression', 'getTerrainHeightASL', 'getText', 'getVariable', 'getWeaponCargo', 'getWPPos', 'glanceAt', 'globalChat', 'globalRadio', 'goggles', 'goto', 'group', 'groupChat', 'groupFromNetId', 'groupIconSelectable', 'groupIconsVisible', 'groupId', 'groupOwner', 'groupRadio', 'groupSelectedUnits', 'groupSelectUnit', 'grpNull', 'gunner', 'gusts', 'halt', 'handgunItems', 'handgunMagazine', 'handgunWeapon', 'handsHit', 'hasInterface', 'hasWeapon', 'hcAllGroups', 'hcGroupParams', 'hcLeader', 'hcRemoveAllGroups', 'hcRemoveGroup', 'hcSelected', 'hcSelectGroup', 'hcSetGroup', 'hcShowBar', 'hcShownBar', 'headgear', 'hideBody', 'hideObject', 'hideObjectGlobal', 'hint', 'hintC', 'hintCadet', 'hintSilent', 'hmd', 'hostMission', 'htmlLoad', 'HUDMovementLevels', 'humidity', 'if', 'image', 'importAllGroups', 'importance', 'in', 'incapacitatedState', 'independent', 'inflame', 'inflamed', 'inGameUISetEventHandler', 'inheritsFrom', 'initAmbientLife', 'inputAction', 'inRangeOfArtillery', 'insertEditorObject', 'intersect', 'isAbleToBreathe', 'isAgent', 'isArray', 'isAutoHoverOn', 'isAutonomous', 'isAutotest', 'isBleeding', 'isBurning', 'isClass', 'isCollisionLightOn', 'isCopilotEnabled', 'isDedicated', 'isDLCAvailable', 'isEngineOn', 'isEqualTo', 'isFlashlightOn', 'isFlatEmpty', 'isForcedWalk', 'isFormationLeader', 'isHidden', 'isInRemainsCollector', 'isInstructorFigureEnabled', 'isIRLaserOn', 'isKeyActive', 'isKindOf', 'isLightOn', 'isLocalized', 'isManualFire', 'isMarkedForCollection', 'isMultiplayer', 'isNil', 'isNull', 'isNumber', 'isObjectHidden', 'isObjectRTD', 'isOnRoad', 'isPipEnabled', 'isPlayer', 'isRealTime', 'isServer', 'isShowing3DIcons', 'isSteamMission', 'isStreamFriendlyUIEnabled', 'isText', 'isTouchingGround', 'isTurnedOut', 'isTutHintsEnabled', 'isUAVConnectable', 'isUAVConnected', 'isUniformAllowed', 'isWalking', 'isWeaponDeployed', 'isWeaponRested', 'itemCargo', 'items', 'itemsWithMagazines', 'join', 'joinAs', 'joinAsSilent', 'joinSilent', 'joinString', 'kbAddDatabase', 'kbAddDatabaseTargets', 'kbAddTopic', 'kbHasTopic', 'kbReact', 'kbRemoveTopic', 'kbTell', 'kbWasSaid', 'keyImage', 'keyName', 'knowsAbout', 'land', 'landAt', 'landResult', 'language', 'laserTarget', 'lbAdd', 'lbClear', 'lbColor', 'lbCurSel', 'lbData', 'lbDelete', 'lbIsSelected', 'lbPicture', 'lbSelection', 'lbSetColor', 'lbSetCurSel', 'lbSetData', 'lbSetPicture', 'lbSetPictureColor', 'lbSetPictureColorDisabled', 'lbSetPictureColorSelected', 'lbSetSelectColor', 'lbSetSelectColorRight', 'lbSetSelected', 'lbSetTooltip', 'lbSetValue', 'lbSize', 'lbSort', 'lbSortByValue', 'lbText', 'lbValue', 'leader', 'leaderboardDeInit', 'leaderboardGetRows', 'leaderboardInit', 'leaveVehicle', 'libraryCredits', 'libraryDisclaimers', 'lifeState', 'lightAttachObject', 'lightDetachObject', 'lightIsOn', 'lightnings', 'limitSpeed', 'linearConversion', 'lineBreak', 'lineIntersects', 'lineIntersectsObjs', 'lineIntersectsSurfaces', 'lineIntersectsWith', 'linkItem', 'list', 'listObjects', 'ln', 'lnbAddArray', 'lnbAddColumn', 'lnbAddRow', 'lnbClear', 'lnbColor', 'lnbCurSelRow', 'lnbData', 'lnbDeleteColumn', 'lnbDeleteRow', 'lnbGetColumnsPosition', 'lnbPicture', 'lnbSetColor', 'lnbSetColumnsPos', 'lnbSetCurSelRow', 'lnbSetData', 'lnbSetPicture', 'lnbSetText', 'lnbSetValue', 'lnbSize', 'lnbText', 'lnbValue', 'load', 'loadAbs', 'loadBackpack', 'loadFile', 'loadGame', 'loadIdentity', 'loadMagazine', 'loadOverlay', 'loadStatus', 'loadUniform', 'loadVest', 'local', 'localize', 'locationNull', 'locationPosition', 'lock', 'lockCameraTo', 'lockCargo', 'lockDriver', 'locked', 'lockedCargo', 'lockedDriver', 'lockedTurret', 'lockTurret', 'lockWP', 'log', 'logEntities', 'lookAt', 'lookAtPos', 'magazineCargo', 'magazines', 'magazinesAllTurrets', 'magazinesAmmo', 'magazinesAmmoCargo', 'magazinesAmmoFull', 'magazinesDetail', 'magazinesDetailBackpack', 'magazinesDetailUniform', 'magazinesDetailVest', 'magazinesTurret', 'magazineTurretAmmo', 'mapAnimAdd', 'mapAnimClear', 'mapAnimCommit', 'mapAnimDone', 'mapCenterOnCamera', 'mapGridPosition', 'markAsFinishedOnSteam', 'markerAlpha', 'markerBrush', 'markerColor', 'markerDir', 'markerPos', 'markerShape', 'markerSize', 'markerText', 'markerType', 'max', 'members', 'min', 'mineActive', 'mineDetectedBy', 'missionConfigFile', 'missionName', 'missionNamespace', 'missionStart', 'mod', 'modelToWorld', 'modelToWorldVisual', 'moonIntensity', 'morale', 'move', 'moveInAny', 'moveInCargo', 'moveInCommander', 'moveInDriver', 'moveInGunner', 'moveInTurret', 'moveObjectToEnd', 'moveOut', 'moveTime', 'moveTo', 'moveToCompleted', 'moveToFailed', 'musicVolume', 'name', 'name location', 'nameSound', 'nearEntities', 'nearestBuilding', 'nearestLocation', 'nearestLocations', 'nearestLocationWithDubbing', 'nearestObject', 'nearestObjects', 'nearObjects', 'nearObjectsReady', 'nearRoads', 'nearSupplies', 'nearTargets', 'needReload', 'netId', 'netObjNull', 'newOverlay', 'nextMenuItemIndex', 'nextWeatherChange', 'nil', 'nMenuItems', 'not', 'numberToDate', 'objectCurators', 'objectFromNetId', 'objectParent', 'objNull', 'objStatus', 'onBriefingGroup', 'onBriefingNotes', 'onBriefingPlan', 'onBriefingTeamSwitch', 'onCommandModeChanged', 'onDoubleClick', 'onEachFrame', 'onGroupIconClick', 'onGroupIconOverEnter', 'onGroupIconOverLeave', 'onHCGroupSelectionChanged', 'onMapSingleClick', 'onPlayerConnected', 'onPlayerDisconnected', 'onPreloadFinished', 'onPreloadStarted', 'onShowNewObject', 'onTeamSwitch', 'openCuratorInterface', 'openMap', 'openYoutubeVideo', 'opfor', 'or', 'orderGetIn', 'overcast', 'overcastForecast', 'owner', 'param', 'params', 'parseNumber', 'parseText', 'parsingNamespace', 'particlesQuality', 'pi', 'pickWeaponPool', 'pitch', 'playableSlotsNumber', 'playableUnits', 'playAction', 'playActionNow', 'player', 'playerRespawnTime', 'playerSide', 'playersNumber', 'playGesture', 'playMission', 'playMove', 'playMoveNow', 'playMusic', 'playScriptedMission', 'playSound', 'playSound3D', 'position', 'positionCameraToWorld', 'posScreenToWorld', 'posWorldToScreen', 'ppEffectAdjust', 'ppEffectCommit', 'ppEffectCommitted', 'ppEffectCreate', 'ppEffectDestroy', 'ppEffectEnable', 'ppEffectForceInNVG', 'precision', 'preloadCamera', 'preloadObject', 'preloadSound', 'preloadTitleObj', 'preloadTitleRsc', 'preprocessFile', 'preprocessFileLineNumbers', 'primaryWeapon', 'primaryWeaponItems', 'primaryWeaponMagazine', 'priority', 'private', 'processDiaryLink', 'productVersion', 'profileName', 'profileNamespace', 'profileNameSteam', 'progressLoadingScreen', 'progressPosition', 'progressSetPosition', 'publicVariable', 'publicVariableClient', 'publicVariableServer', 'pushBack', 'putWeaponPool', 'queryItemsPool', 'queryMagazinePool', 'queryWeaponPool', 'rad', 'radioChannelAdd', 'radioChannelCreate', 'radioChannelRemove', 'radioChannelSetCallSign', 'radioChannelSetLabel', 'radioVolume', 'rain', 'rainbow', 'random', 'rank', 'rankId', 'rating', 'rectangular', 'registeredTasks', 'registerTask', 'reload', 'reloadEnabled', 'remoteControl', 'remoteExec', 'remoteExecCall', 'removeAction', 'removeAllActions', 'removeAllAssignedItems', 'removeAllContainers', 'removeAllCuratorAddons', 'removeAllCuratorCameraAreas', 'removeAllCuratorEditingAreas', 'removeAllEventHandlers', 'removeAllHandgunItems', 'removeAllItems', 'removeAllItemsWithMagazines', 'removeAllMissionEventHandlers', 'removeAllMPEventHandlers', 'removeAllMusicEventHandlers', 'removeAllPrimaryWeaponItems', 'removeAllWeapons', 'removeBackpack', 'removeBackpackGlobal', 'removeCuratorAddons', 'removeCuratorCameraArea', 'removeCuratorEditableObjects', 'removeCuratorEditingArea', 'removeDrawIcon', 'removeDrawLinks', 'removeEventHandler', 'removeFromRemainsCollector', 'removeGoggles', 'removeGroupIcon', 'removeHandgunItem', 'removeHeadgear', 'removeItem', 'removeItemFromBackpack', 'removeItemFromUniform', 'removeItemFromVest', 'removeItems', 'removeMagazine', 'removeMagazineGlobal', 'removeMagazines', 'removeMagazinesTurret', 'removeMagazineTurret', 'removeMenuItem', 'removeMissionEventHandler', 'removeMPEventHandler', 'removeMusicEventHandler', 'removePrimaryWeaponItem', 'removeSecondaryWeaponItem', 'removeSimpleTask', 'removeSwitchableUnit', 'removeTeamMember', 'removeUniform', 'removeVest', 'removeWeapon', 'removeWeaponGlobal', 'removeWeaponTurret', 'requiredVersion', 'resetCamShake', 'resetSubgroupDirection', 'resistance', 'resize', 'resources', 'respawnVehicle', 'restartEditorCamera', 'reveal', 'revealMine', 'reverse', 'reversedMouseY', 'roadsConnectedTo', 'roleDescription', 'ropeAttachedObjects', 'ropeAttachedTo', 'ropeAttachEnabled', 'ropeAttachTo', 'ropeCreate', 'ropeCut', 'ropeEndPosition', 'ropeLength', 'ropes', 'ropeUnwind', 'ropeUnwound', 'rotorsForcesRTD', 'rotorsRpmRTD', 'round', 'runInitScript', 'safeZoneH', 'safeZoneW', 'safeZoneWAbs', 'safeZoneX', 'safeZoneXAbs', 'safeZoneY', 'saveGame', 'saveIdentity', 'saveJoysticks', 'saveOverlay', 'saveProfileNamespace', 'saveStatus', 'saveVar', 'savingEnabled', 'say', 'say2D', 'say3D', 'scopeName', 'score', 'scoreSide', 'screenToWorld', 'scriptDone', 'scriptName', 'scriptNull', 'scudState', 'secondaryWeapon', 'secondaryWeaponItems', 'secondaryWeaponMagazine', 'select', 'selectBestPlaces', 'selectDiarySubject', 'selectedEditorObjects', 'selectEditorObject', 'selectionPosition', 'selectLeader', 'selectNoPlayer', 'selectPlayer', 'selectWeapon', 'selectWeaponTurret', 'sendAUMessage', 'sendSimpleCommand', 'sendTask', 'sendTaskResult', 'sendUDPMessage', 'serverCommand', 'serverCommandAvailable', 'serverCommandExecutable', 'serverName', 'serverTime', 'set', 'setAccTime', 'setAirportSide', 'setAmmo', 'setAmmoCargo', 'setAperture', 'setApertureNew', 'setArmoryPoints', 'setAttributes', 'setAutonomous', 'setBehaviour', 'setBleedingRemaining', 'setCameraInterest', 'setCamShakeDefParams', 'setCamShakeParams', 'setCamUseTi', 'setCaptive', 'setCenterOfMass', 'setCollisionLight', 'setCombatMode', 'setCompassOscillation', 'setCuratorCameraAreaCeiling', 'setCuratorCoef', 'setCuratorEditingAreaType', 'setCuratorWaypointCost', 'setCurrentChannel', 'setCurrentTask', 'setCurrentWaypoint', 'setDamage', 'setDammage', 'setDate', 'setDebriefingText', 'setDefaultCamera', 'setDestination', 'setDetailMapBlendPars', 'setDir', 'setDirection', 'setDrawIcon', 'setDropInterval', 'setEditorMode', 'setEditorObjectScope', 'setEffectCondition', 'setFace', 'setFaceAnimation', 'setFatigue', 'setFlagOwner', 'setFlagSide', 'setFlagTexture', 'setFog', 'setFog array', 'setFormation', 'setFormationTask', 'setFormDir', 'setFriend', 'setFromEditor', 'setFSMVariable', 'setFuel', 'setFuelCargo', 'setGroupIcon', 'setGroupIconParams', 'setGroupIconsSelectable', 'setGroupIconsVisible', 'setGroupId', 'setGroupIdGlobal', 'setGroupOwner', 'setGusts', 'setHideBehind', 'setHit', 'setHitIndex', 'setHitPointDamage', 'setHorizonParallaxCoef', 'setHUDMovementLevels', 'setIdentity', 'setImportance', 'setLeader', 'setLightAmbient', 'setLightAttenuation', 'setLightBrightness', 'setLightColor', 'setLightDayLight', 'setLightFlareMaxDistance', 'setLightFlareSize', 'setLightIntensity', 'setLightnings', 'setLightUseFlare', 'setLocalWindParams', 'setMagazineTurretAmmo', 'setMarkerAlpha', 'setMarkerAlphaLocal', 'setMarkerBrush', 'setMarkerBrushLocal', 'setMarkerColor', 'setMarkerColorLocal', 'setMarkerDir', 'setMarkerDirLocal', 'setMarkerPos', 'setMarkerPosLocal', 'setMarkerShape', 'setMarkerShapeLocal', 'setMarkerSize', 'setMarkerSizeLocal', 'setMarkerText', 'setMarkerTextLocal', 'setMarkerType', 'setMarkerTypeLocal', 'setMass', 'setMimic', 'setMousePosition', 'setMusicEffect', 'setMusicEventHandler', 'setName', 'setNameSound', 'setObjectArguments', 'setObjectMaterial', 'setObjectProxy', 'setObjectTexture', 'setObjectTextureGlobal', 'setObjectViewDistance', 'setOvercast', 'setOwner', 'setOxygenRemaining', 'setParticleCircle', 'setParticleClass', 'setParticleFire', 'setParticleParams', 'setParticleRandom', 'setPilotLight', 'setPiPEffect', 'setPitch', 'setPlayable', 'setPlayerRespawnTime', 'setPos', 'setPosASL', 'setPosASL2', 'setPosASLW', 'setPosATL', 'setPosition', 'setPosWorld', 'setRadioMsg', 'setRain', 'setRainbow', 'setRandomLip', 'setRank', 'setRectangular', 'setRepairCargo', 'setShadowDistance', 'setSide', 'setSimpleTaskDescription', 'setSimpleTaskDestination', 'setSimpleTaskTarget', 'setSimulWeatherLayers', 'setSize', 'setSkill', 'setSkill array', 'setSlingLoad', 'setSoundEffect', 'setSpeaker', 'setSpeech', 'setSpeedMode', 'setStatValue', 'setSuppression', 'setSystemOfUnits', 'setTargetAge', 'setTaskResult', 'setTaskState', 'setTerrainGrid', 'setText', 'setTimeMultiplier', 'setTitleEffect', 'setTriggerActivation', 'setTriggerArea', 'setTriggerStatements', 'setTriggerText', 'setTriggerTimeout', 'setTriggerType', 'setType', 'setUnconscious', 'setUnitAbility', 'setUnitPos', 'setUnitPosWeak', 'setUnitRank', 'setUnitRecoilCoefficient', 'setUnloadInCombat', 'setUserActionText', 'setVariable', 'setVectorDir', 'setVectorDirAndUp', 'setVectorUp', 'setVehicleAmmo', 'setVehicleAmmoDef', 'setVehicleArmor', 'setVehicleId', 'setVehicleLock', 'setVehiclePosition', 'setVehicleTiPars', 'setVehicleVarName', 'setVelocity', 'setVelocityTransformation', 'setViewDistance', 'setVisibleIfTreeCollapsed', 'setWaves', 'setWaypointBehaviour', 'setWaypointCombatMode', 'setWaypointCompletionRadius', 'setWaypointDescription', 'setWaypointFormation', 'setWaypointHousePosition', 'setWaypointLoiterRadius', 'setWaypointLoiterType', 'setWaypointName', 'setWaypointPosition', 'setWaypointScript', 'setWaypointSpeed', 'setWaypointStatements', 'setWaypointTimeout', 'setWaypointType', 'setWaypointVisible', 'setWeaponReloadingTime', 'setWind', 'setWindDir', 'setWindForce', 'setWindStr', 'setWPPos', 'show3DIcons', 'showChat', 'showCinemaBorder', 'showCommandingMenu', 'showCompass', 'showCuratorCompass', 'showGPS', 'showHUD', 'showLegend', 'showMap', 'shownArtilleryComputer', 'shownChat', 'shownCompass', 'shownCuratorCompass', 'showNewEditorObject', 'shownGPS', 'shownHUD', 'shownMap', 'shownPad', 'shownRadio', 'shownUAVFeed', 'shownWarrant', 'shownWatch', 'showPad', 'showRadio', 'showSubtitles', 'showUAVFeed', 'showWarrant', 'showWatch', 'showWaypoint', 'side', 'sideChat', 'sideEnemy', 'sideFriendly', 'sideLogic', 'sideRadio', 'sideUnknown', 'simpleTasks', 'simulationEnabled', 'simulCloudDensity', 'simulCloudOcclusion', 'simulInClouds', 'simulWeatherSync', 'sin', 'size', 'sizeOf', 'skill', 'skillFinal', 'skipTime', 'sleep', 'sliderPosition', 'sliderRange', 'sliderSetPosition', 'sliderSetRange', 'sliderSetSpeed', 'sliderSpeed', 'slingLoadAssistantShown', 'soldierMagazines', 'someAmmo', 'sort', 'soundVolume', 'spawn', 'speaker', 'speed', 'speedMode', 'splitString', 'sqrt', 'squadParams', 'stance', 'startLoadingScreen', 'step', 'stop', 'stopped', 'str', 'sunOrMoon', 'supportInfo', 'suppressFor', 'surfaceIsWater', 'surfaceNormal', 'surfaceType', 'swimInDepth', 'switch', 'switchableUnits', 'switchAction', 'switchCamera', 'switchGesture', 'switchLight', 'switchMove', 'synchronizedObjects', 'synchronizedTriggers', 'synchronizedWaypoints', 'synchronizeObjectsAdd', 'synchronizeObjectsRemove', 'synchronizeTrigger', 'synchronizeWaypoint', 'synchronizeWaypoint trigger', 'systemChat', 'systemOfUnits', 'tan', 'targetKnowledge', 'targetsAggregate', 'targetsQuery', 'taskChildren', 'taskCompleted', 'taskDescription', 'taskDestination', 'taskHint', 'taskNull', 'taskParent', 'taskResult', 'taskState', 'teamMember', 'teamMemberNull', 'teamName', 'teams', 'teamSwitch', 'teamSwitchEnabled', 'teamType', 'terminate', 'terrainIntersect', 'terrainIntersectASL', 'text', 'text location', 'textLog', 'textLogFormat', 'tg', 'then', 'throw', 'time', 'timeMultiplier', 'titleCut', 'titleFadeOut', 'titleObj', 'titleRsc', 'titleText', 'to', 'toArray', 'toLower', 'toString', 'toUpper', 'triggerActivated', 'triggerActivation', 'triggerArea', 'triggerAttachedVehicle', 'triggerAttachObject', 'triggerAttachVehicle', 'triggerStatements', 'triggerText', 'triggerTimeout', 'triggerTimeoutCurrent', 'triggerType', 'true', 'try', 'turretLocal', 'turretOwner', 'turretUnit', 'tvAdd', 'tvClear', 'tvCollapse', 'tvCount', 'tvCurSel', 'tvData', 'tvDelete', 'tvExpand', 'tvPicture', 'tvSetCurSel', 'tvSetData', 'tvSetPicture', 'tvSetPictureColor', 'tvSetTooltip', 'tvSetValue', 'tvSort', 'tvSortByValue', 'tvText', 'tvValue', 'type', 'typeName', 'typeOf', 'UAVControl', 'uiNamespace', 'uiSleep', 'unassignCurator', 'unassignItem', 'unassignTeam', 'unassignVehicle', 'underwater', 'uniform', 'uniformContainer', 'uniformItems', 'uniformMagazines', 'unitAddons', 'unitBackpack', 'unitPos', 'unitReady', 'unitRecoilCoefficient', 'units', 'unitsBelowHeight', 'unlinkItem', 'unlockAchievement', 'unregisterTask', 'updateDrawIcon', 'updateMenuItem', 'updateObjectTree', 'useAudioTimeForMoves', 'vectorAdd', 'vectorCos', 'vectorCrossProduct', 'vectorDiff', 'vectorDir', 'vectorDirVisual', 'vectorDistance', 'vectorDistanceSqr', 'vectorDotProduct', 'vectorFromTo', 'vectorMagnitude', 'vectorMagnitudeSqr', 'vectorMultiply', 'vectorNormalized', 'vectorUp', 'vectorUpVisual', 'vehicle', 'vehicleChat', 'vehicleRadio', 'vehicles', 'vehicleVarName', 'velocity', 'velocityModelSpace', 'verifySignature', 'vest', 'vestContainer', 'vestItems', 'vestMagazines', 'viewDistance', 'visibleCompass', 'visibleGPS', 'visibleMap', 'visiblePosition', 'visiblePositionASL', 'visibleWatch', 'waitUntil', 'waves', 'waypointAttachedObject', 'waypointAttachedVehicle', 'waypointAttachObject', 'waypointAttachVehicle', 'waypointBehaviour', 'waypointCombatMode', 'waypointCompletionRadius', 'waypointDescription', 'waypointFormation', 'waypointHousePosition', 'waypointLoiterRadius', 'waypointLoiterType', 'waypointName', 'waypointPosition', 'waypoints', 'waypointScript', 'waypointsEnabledUAV', 'waypointShow', 'waypointSpeed', 'waypointStatements', 'waypointTimeout', 'waypointTimeoutCurrent', 'waypointType', 'waypointVisible', 'weaponAccessories', 'weaponCargo', 'weaponDirection', 'weaponLowered', 'weapons', 'weaponsItems', 'weaponsItemsCargo', 'weaponState', 'weaponsTurret', 'weightRTD', 'west', 'WFSideText', 'while', 'wind', 'windDir', 'windStr', 'wingsForcesRTD', 'with', 'worldName', 'worldSize', 'worldToModel', 'worldToModelVisual', 'worldToScreen'];
  var control = ['case', 'catch', 'default', 'do', 'else', 'exit', 'exitWith|5', 'for', 'forEach', 'from', 'if', 'switch', 'then', 'throw', 'to', 'try', 'while', 'with'];
  var operators = ['!', '-', '+', '!=', '%', '&&', '*', '/', '=', '==', '>', '>=', '<', '<=', '^', ':', '>>'];
  var specials = ['_forEachIndex|10', '_this|10', '_x|10'];
  var literals = ['true', 'false', 'nil'];
  var builtins = allCommands.filter(function (command) {
    return control.indexOf(command) == -1 &&
        literals.indexOf(command) == -1 &&
        operators.indexOf(command) == -1;
  });
  //Note: operators will not be treated as builtins due to the lexeme rules
  builtins = builtins.concat(specials);

  // In SQF strings, quotes matching the start are escaped by adding a consecutive.
  // Example of single escaped quotes: " "" " and  ' '' '.
  var STRINGS = {
    className: 'string',
    relevance: 0,
    variants: [
      {
        begin: '"',
        end: '"',
        contains: [{begin: '""'}]
      },
      {
        begin: '\'',
        end: '\'',
        contains: [{begin: '\'\''}]
      }
    ]
  };

  var NUMBERS = {
    className: 'number',
    begin: hljs.NUMBER_RE,
    relevance: 0
  };

  // Preprocessor definitions borrowed from C++
  var PREPROCESSOR_STRINGS = {
    className: 'string',
    variants: [
      hljs.QUOTE_STRING_MODE,
      {
        begin: '\'\\\\?.', end: '\'',
        illegal: '.'
      }
    ]
  };

  var PREPROCESSOR =       {
    className: 'meta',
    begin: '#', end: '$',
    keywords: {'meta-keyword': 'if else elif endif define undef warning error line ' +
              'pragma ifdef ifndef'},
    contains: [
      {
        begin: /\\\n/, relevance: 0
      },
      {
        beginKeywords: 'include', end: '$',
        keywords: {'meta-keyword': 'include'},
        contains: [
          PREPROCESSOR_STRINGS,
          {
            className: 'meta-string',
            begin: '<', end: '>',
            illegal: '\\n'
          }
        ]
      },
      PREPROCESSOR_STRINGS,
      NUMBERS,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  return {
    aliases: ['sqf'],
    case_insensitive: true,
    keywords: {
      keyword: control.join(' '),
      built_in: builtins.join(' '),
      literal: literals.join(' ')
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      NUMBERS,
      STRINGS,
      PREPROCESSOR
    ]
  };
});

hljs.registerLanguage('sql', function(hljs) {
  var COMMENT_MODE = hljs.COMMENT('--', '$');
  return {
    case_insensitive: true,
    illegal: /[<>{}*]/,
    contains: [
      {
        beginKeywords:
          'begin end start commit rollback savepoint lock alter create drop rename call ' +
          'delete do handler insert load replace select truncate update set show pragma grant ' +
          'merge describe use explain help declare prepare execute deallocate release ' +
          'unlock purge reset change stop analyze cache flush optimize repair kill ' +
          'install uninstall checksum restore check backup revoke',
        end: /;/, endsWithParent: true,
        keywords: {
          keyword:
            'abort abs absolute acc acce accep accept access accessed accessible account acos action activate add ' +
            'addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias ' +
            'allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply ' +
            'archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan ' +
            'atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid ' +
            'authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile ' +
            'before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float ' +
            'binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound ' +
            'buffer_cache buffer_pool build bulk by byte byteordermark bytes c cache caching call calling cancel ' +
            'capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base ' +
            'char_length character_length characters characterset charindex charset charsetform charsetid check ' +
            'checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close ' +
            'cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation ' +
            'collect colu colum column column_value columns columns_updated comment commit compact compatibility ' +
            'compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn ' +
            'connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection ' +
            'consider consistent constant constraint constraints constructor container content contents context ' +
            'contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost ' +
            'count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation ' +
            'critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user ' +
            'cursor curtime customdatum cycle d data database databases datafile datafiles datalength date_add ' +
            'date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts ' +
            'day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate ' +
            'declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults ' +
            'deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank ' +
            'depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor ' +
            'deterministic diagnostics difference dimension direct_load directory disable disable_all ' +
            'disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div ' +
            'do document domain dotnet double downgrade drop dumpfile duplicate duration e each edition editionable ' +
            'editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt ' +
            'end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors ' +
            'escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding ' +
            'execu execut execute exempt exists exit exp expire explain export export_set extended extent external ' +
            'external_1 external_2 externally extract f failed failed_login_attempts failover failure far fast ' +
            'feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final ' +
            'finish first first_value fixed flash_cache flashback floor flush following follows for forall force ' +
            'form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ' +
            'ftp full function g general generated get get_format get_lock getdate getutcdate global global_name ' +
            'globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups ' +
            'gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex ' +
            'hierarchy high high_priority hosts hour http i id ident_current ident_incr ident_seed identified ' +
            'identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment ' +
            'index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile ' +
            'initial initialized initially initrans inmemory inner innodb input insert install instance instantiable ' +
            'instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat ' +
            'is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists ' +
            'k keep keep_duplicates key keys kill l language large last last_day last_insert_id last_value lax lcase ' +
            'lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit ' +
            'lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate ' +
            'locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call ' +
            'logoff logon logs long loop low low_priority lower lpad lrtrim ltrim m main make_set makedate maketime ' +
            'managed management manual map mapping mask master master_pos_wait match matched materialized max ' +
            'maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans ' +
            'md5 measures median medium member memcompress memory merge microsecond mid migration min minextents ' +
            'minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month ' +
            'months mount move movement multiset mutex n name name_const names nan national native natural nav nchar ' +
            'nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile ' +
            'nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile ' +
            'nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder ' +
            'nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck ' +
            'noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe ' +
            'nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ' +
            'ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old ' +
            'on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date ' +
            'oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary ' +
            'out outer outfile outline output over overflow overriding p package pad parallel parallel_enable ' +
            'parameters parent parse partial partition partitions pascal passing password password_grace_time ' +
            'password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex ' +
            'pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc ' +
            'performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin ' +
            'policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction ' +
            'prediction_cost prediction_details prediction_probability prediction_set prepare present preserve ' +
            'prior priority private private_sga privileges procedural procedure procedure_analyze processlist ' +
            'profiles project prompt protection public publishingservername purge quarter query quick quiesce quota ' +
            'quotename radians raise rand range rank raw read reads readsize rebuild record records ' +
            'recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh ' +
            'regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy ' +
            'reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename ' +
            'repair repeat replace replicate replication required reset resetlogs resize resource respect restore ' +
            'restricted result result_cache resumable resume retention return returning returns reuse reverse revoke ' +
            'right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows ' +
            'rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll ' +
            'sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select ' +
            'self sequence sequential serializable server servererror session session_user sessions_per_user set ' +
            'sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor ' +
            'si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin ' +
            'size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex ' +
            'source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows ' +
            'sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone ' +
            'standby start starting startup statement static statistics stats_binomial_test stats_crosstab ' +
            'stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep ' +
            'stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev ' +
            'stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate ' +
            'subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum ' +
            'suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate ' +
            'sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime t table tables tablespace tan tdo ' +
            'template temporary terminated tertiary_weights test than then thread through tier ties time time_format ' +
            'time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr ' +
            'timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking ' +
            'transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate ' +
            'try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress ' +
            'under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot ' +
            'unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert ' +
            'url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date ' +
            'utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var ' +
            'var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray ' +
            'verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear ' +
            'wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped ' +
            'xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces ' +
            'xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek',
          literal:
            'true false null',
          built_in:
            'array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number ' +
            'numeric real record serial serial8 smallint text varchar varying void'
        },
        contains: [
          {
            className: 'string',
            begin: '\'', end: '\'',
            contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}]
          },
          {
            className: 'string',
            begin: '"', end: '"',
            contains: [hljs.BACKSLASH_ESCAPE, {begin: '""'}]
          },
          {
            className: 'string',
            begin: '`', end: '`',
            contains: [hljs.BACKSLASH_ESCAPE]
          },
          hljs.C_NUMBER_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          COMMENT_MODE
        ]
      },
      hljs.C_BLOCK_COMMENT_MODE,
      COMMENT_MODE
    ]
  };
});

hljs.registerLanguage('stan', function(hljs) {
  return {
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        begin: hljs.UNDERSCORE_IDENT_RE,
        lexemes: hljs.UNDERSCORE_IDENT_RE,
        keywords: {
          // Stan's keywords
          name:
            'for in while repeat until if then else',
          // Stan's probablity distributions (less beta and gamma, as commonly
          // used for parameter names). So far, _log and _rng variants are not
          // included
          symbol:
            'bernoulli bernoulli_logit binomial binomial_logit '               +
            'beta_binomial hypergeometric categorical categorical_logit '      +
            'ordered_logistic neg_binomial neg_binomial_2 '                    +
            'neg_binomial_2_log poisson poisson_log multinomial normal '       +
            'exp_mod_normal skew_normal student_t cauchy double_exponential '  +
            'logistic gumbel lognormal chi_square inv_chi_square '             +
            'scaled_inv_chi_square exponential inv_gamma weibull frechet '     +
            'rayleigh wiener pareto pareto_type_2 von_mises uniform '          +
            'multi_normal multi_normal_prec multi_normal_cholesky multi_gp '   +
            'multi_gp_cholesky multi_student_t gaussian_dlm_obs dirichlet '    +
            'lkj_corr lkj_corr_cholesky wishart inv_wishart',
          // Stan's data types
          'selector-tag':
            'int real vector simplex unit_vector ordered positive_ordered '    +
            'row_vector matrix cholesky_factor_corr cholesky_factor_cov '      +
            'corr_matrix cov_matrix',
          // Stan's model blocks
          title:
            'functions model data parameters quantities transformed '          +
            'generated',
          literal:
            'true false'
        },
        relevance: 0
      },
      // The below is all taken from the R language definition
      {
        // hex value
        className: 'number',
        begin: "0[xX][0-9a-fA-F]+[Li]?\\b",
        relevance: 0
      },
      {
        // hex value
        className: 'number',
        begin: "0[xX][0-9a-fA-F]+[Li]?\\b",
        relevance: 0
      },
      {
        // explicit integer
        className: 'number',
        begin: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
        relevance: 0
      },
      {
        // number with trailing decimal
        className: 'number',
        begin: "\\d+\\.(?!\\d)(?:i\\b)?",
        relevance: 0
      },
      {
        // number
        className: 'number',
        begin: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
        relevance: 0
      },
      {
        // number with leading decimal
        className: 'number',
        begin: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
        relevance: 0
      }
    ]
  };
});

hljs.registerLanguage('stata', function(hljs) {
  return {
    aliases: ['do', 'ado'],
    case_insensitive: true,
    keywords: 'if else in foreach for forv forva forval forvalu forvalue forvalues by bys bysort xi quietly qui capture about ac ac_7 acprplot acprplot_7 adjust ado adopath adoupdate alpha ameans an ano anov anova anova_estat anova_terms anovadef aorder ap app appe appen append arch arch_dr arch_estat arch_p archlm areg areg_p args arima arima_dr arima_estat arima_p as asmprobit asmprobit_estat asmprobit_lf asmprobit_mfx__dlg asmprobit_p ass asse asser assert avplot avplot_7 avplots avplots_7 bcskew0 bgodfrey binreg bip0_lf biplot bipp_lf bipr_lf bipr_p biprobit bitest bitesti bitowt blogit bmemsize boot bootsamp bootstrap bootstrap_8 boxco_l boxco_p boxcox boxcox_6 boxcox_p bprobit br break brier bro brow brows browse brr brrstat bs bs_7 bsampl_w bsample bsample_7 bsqreg bstat bstat_7 bstat_8 bstrap bstrap_7 ca ca_estat ca_p cabiplot camat canon canon_8 canon_8_p canon_estat canon_p cap caprojection capt captu captur capture cat cc cchart cchart_7 cci cd censobs_table centile cf char chdir checkdlgfiles checkestimationsample checkhlpfiles checksum chelp ci cii cl class classutil clear cli clis clist clo clog clog_lf clog_p clogi clogi_sw clogit clogit_lf clogit_p clogitp clogl_sw cloglog clonevar clslistarray cluster cluster_measures cluster_stop cluster_tree cluster_tree_8 clustermat cmdlog cnr cnre cnreg cnreg_p cnreg_sw cnsreg codebook collaps4 collapse colormult_nb colormult_nw compare compress conf confi confir confirm conren cons const constr constra constrai constrain constraint continue contract copy copyright copysource cor corc corr corr2data corr_anti corr_kmo corr_smc corre correl correla correlat correlate corrgram cou coun count cox cox_p cox_sw coxbase coxhaz coxvar cprplot cprplot_7 crc cret cretu cretur creturn cross cs cscript cscript_log csi ct ct_is ctset ctst_5 ctst_st cttost cumsp cumsp_7 cumul cusum cusum_7 cutil d datasig datasign datasigna datasignat datasignatu datasignatur datasignature datetof db dbeta de dec deco decod decode deff des desc descr descri describ describe destring dfbeta dfgls dfuller di di_g dir dirstats dis discard disp disp_res disp_s displ displa display distinct do doe doed doedi doedit dotplot dotplot_7 dprobit drawnorm drop ds ds_util dstdize duplicates durbina dwstat dydx e ed edi edit egen eivreg emdef en enc enco encod encode eq erase ereg ereg_lf ereg_p ereg_sw ereghet ereghet_glf ereghet_glf_sh ereghet_gp ereghet_ilf ereghet_ilf_sh ereghet_ip eret eretu eretur ereturn err erro error est est_cfexist est_cfname est_clickable est_expand est_hold est_table est_unhold est_unholdok estat estat_default estat_summ estat_vce_only esti estimates etodow etof etomdy ex exi exit expand expandcl fac fact facto factor factor_estat factor_p factor_pca_rotated factor_rotate factormat fcast fcast_compute fcast_graph fdades fdadesc fdadescr fdadescri fdadescrib fdadescribe fdasav fdasave fdause fh_st file open file read file close file filefilter fillin find_hlp_file findfile findit findit_7 fit fl fli flis flist for5_0 form forma format fpredict frac_154 frac_adj frac_chk frac_cox frac_ddp frac_dis frac_dv frac_in frac_mun frac_pp frac_pq frac_pv frac_wgt frac_xo fracgen fracplot fracplot_7 fracpoly fracpred fron_ex fron_hn fron_p fron_tn fron_tn2 frontier ftodate ftoe ftomdy ftowdate g gamhet_glf gamhet_gp gamhet_ilf gamhet_ip gamma gamma_d2 gamma_p gamma_sw gammahet gdi_hexagon gdi_spokes ge gen gene gener genera generat generate genrank genstd genvmean gettoken gl gladder gladder_7 glim_l01 glim_l02 glim_l03 glim_l04 glim_l05 glim_l06 glim_l07 glim_l08 glim_l09 glim_l10 glim_l11 glim_l12 glim_lf glim_mu glim_nw1 glim_nw2 glim_nw3 glim_p glim_v1 glim_v2 glim_v3 glim_v4 glim_v5 glim_v6 glim_v7 glm glm_6 glm_p glm_sw glmpred glo glob globa global glogit glogit_8 glogit_p gmeans gnbre_lf gnbreg gnbreg_5 gnbreg_p gomp_lf gompe_sw gomper_p gompertz gompertzhet gomphet_glf gomphet_glf_sh gomphet_gp gomphet_ilf gomphet_ilf_sh gomphet_ip gphdot gphpen gphprint gprefs gprobi_p gprobit gprobit_8 gr gr7 gr_copy gr_current gr_db gr_describe gr_dir gr_draw gr_draw_replay gr_drop gr_edit gr_editviewopts gr_example gr_example2 gr_export gr_print gr_qscheme gr_query gr_read gr_rename gr_replay gr_save gr_set gr_setscheme gr_table gr_undo gr_use graph graph7 grebar greigen greigen_7 greigen_8 grmeanby grmeanby_7 gs_fileinfo gs_filetype gs_graphinfo gs_stat gsort gwood h hadimvo hareg hausman haver he heck_d2 heckma_p heckman heckp_lf heckpr_p heckprob hel help hereg hetpr_lf hetpr_p hetprob hettest hexdump hilite hist hist_7 histogram hlogit hlu hmeans hotel hotelling hprobit hreg hsearch icd9 icd9_ff icd9p iis impute imtest inbase include inf infi infil infile infix inp inpu input ins insheet insp inspe inspec inspect integ inten intreg intreg_7 intreg_p intrg2_ll intrg_ll intrg_ll2 ipolate iqreg ir irf irf_create irfm iri is_svy is_svysum isid istdize ivprob_1_lf ivprob_lf ivprobit ivprobit_p ivreg ivreg_footnote ivtob_1_lf ivtob_lf ivtobit ivtobit_p jackknife jacknife jknife jknife_6 jknife_8 jkstat joinby kalarma1 kap kap_3 kapmeier kappa kapwgt kdensity kdensity_7 keep ksm ksmirnov ktau kwallis l la lab labe label labelbook ladder levels levelsof leverage lfit lfit_p li lincom line linktest lis list lloghet_glf lloghet_glf_sh lloghet_gp lloghet_ilf lloghet_ilf_sh lloghet_ip llogi_sw llogis_p llogist llogistic llogistichet lnorm_lf lnorm_sw lnorma_p lnormal lnormalhet lnormhet_glf lnormhet_glf_sh lnormhet_gp lnormhet_ilf lnormhet_ilf_sh lnormhet_ip lnskew0 loadingplot loc loca local log logi logis_lf logistic logistic_p logit logit_estat logit_p loglogs logrank loneway lookfor lookup lowess lowess_7 lpredict lrecomp lroc lroc_7 lrtest ls lsens lsens_7 lsens_x lstat ltable ltable_7 ltriang lv lvr2plot lvr2plot_7 m ma mac macr macro makecns man manova manova_estat manova_p manovatest mantel mark markin markout marksample mat mat_capp mat_order mat_put_rr mat_rapp mata mata_clear mata_describe mata_drop mata_matdescribe mata_matsave mata_matuse mata_memory mata_mlib mata_mosave mata_rename mata_which matalabel matcproc matlist matname matr matri matrix matrix_input__dlg matstrik mcc mcci md0_ md1_ md1debug_ md2_ md2debug_ mds mds_estat mds_p mdsconfig mdslong mdsmat mdsshepard mdytoe mdytof me_derd mean means median memory memsize meqparse mer merg merge mfp mfx mhelp mhodds minbound mixed_ll mixed_ll_reparm mkassert mkdir mkmat mkspline ml ml_5 ml_adjs ml_bhhhs ml_c_d ml_check ml_clear ml_cnt ml_debug ml_defd ml_e0 ml_e0_bfgs ml_e0_cycle ml_e0_dfp ml_e0i ml_e1 ml_e1_bfgs ml_e1_bhhh ml_e1_cycle ml_e1_dfp ml_e2 ml_e2_cycle ml_ebfg0 ml_ebfr0 ml_ebfr1 ml_ebh0q ml_ebhh0 ml_ebhr0 ml_ebr0i ml_ecr0i ml_edfp0 ml_edfr0 ml_edfr1 ml_edr0i ml_eds ml_eer0i ml_egr0i ml_elf ml_elf_bfgs ml_elf_bhhh ml_elf_cycle ml_elf_dfp ml_elfi ml_elfs ml_enr0i ml_enrr0 ml_erdu0 ml_erdu0_bfgs ml_erdu0_bhhh ml_erdu0_bhhhq ml_erdu0_cycle ml_erdu0_dfp ml_erdu0_nrbfgs ml_exde ml_footnote ml_geqnr ml_grad0 ml_graph ml_hbhhh ml_hd0 ml_hold ml_init ml_inv ml_log ml_max ml_mlout ml_mlout_8 ml_model ml_nb0 ml_opt ml_p ml_plot ml_query ml_rdgrd ml_repor ml_s_e ml_score ml_searc ml_technique ml_unhold mleval mlf_ mlmatbysum mlmatsum mlog mlogi mlogit mlogit_footnote mlogit_p mlopts mlsum mlvecsum mnl0_ mor more mov move mprobit mprobit_lf mprobit_p mrdu0_ mrdu1_ mvdecode mvencode mvreg mvreg_estat n nbreg nbreg_al nbreg_lf nbreg_p nbreg_sw nestreg net newey newey_7 newey_p news nl nl_7 nl_9 nl_9_p nl_p nl_p_7 nlcom nlcom_p nlexp2 nlexp2_7 nlexp2a nlexp2a_7 nlexp3 nlexp3_7 nlgom3 nlgom3_7 nlgom4 nlgom4_7 nlinit nllog3 nllog3_7 nllog4 nllog4_7 nlog_rd nlogit nlogit_p nlogitgen nlogittree nlpred no nobreak noi nois noisi noisil noisily note notes notes_dlg nptrend numlabel numlist odbc old_ver olo olog ologi ologi_sw ologit ologit_p ologitp on one onew onewa oneway op_colnm op_comp op_diff op_inv op_str opr opro oprob oprob_sw oprobi oprobi_p oprobit oprobitp opts_exclusive order orthog orthpoly ou out outf outfi outfil outfile outs outsh outshe outshee outsheet ovtest pac pac_7 palette parse parse_dissim pause pca pca_8 pca_display pca_estat pca_p pca_rotate pcamat pchart pchart_7 pchi pchi_7 pcorr pctile pentium pergram pergram_7 permute permute_8 personal peto_st pkcollapse pkcross pkequiv pkexamine pkexamine_7 pkshape pksumm pksumm_7 pl plo plot plugin pnorm pnorm_7 poisgof poiss_lf poiss_sw poisso_p poisson poisson_estat post postclose postfile postutil pperron pr prais prais_e prais_e2 prais_p predict predictnl preserve print pro prob probi probit probit_estat probit_p proc_time procoverlay procrustes procrustes_estat procrustes_p profiler prog progr progra program prop proportion prtest prtesti pwcorr pwd q\\s qby qbys qchi qchi_7 qladder qladder_7 qnorm qnorm_7 qqplot qqplot_7 qreg qreg_c qreg_p qreg_sw qu quadchk quantile quantile_7 que quer query range ranksum ratio rchart rchart_7 rcof recast reclink recode reg reg3 reg3_p regdw regr regre regre_p2 regres regres_p regress regress_estat regriv_p remap ren rena renam rename renpfix repeat replace report reshape restore ret retu retur return rm rmdir robvar roccomp roccomp_7 roccomp_8 rocf_lf rocfit rocfit_8 rocgold rocplot rocplot_7 roctab roctab_7 rolling rologit rologit_p rot rota rotat rotate rotatemat rreg rreg_p ru run runtest rvfplot rvfplot_7 rvpplot rvpplot_7 sa safesum sample sampsi sav save savedresults saveold sc sca scal scala scalar scatter scm_mine sco scob_lf scob_p scobi_sw scobit scor score scoreplot scoreplot_help scree screeplot screeplot_help sdtest sdtesti se search separate seperate serrbar serrbar_7 serset set set_defaults sfrancia sh she shel shell shewhart shewhart_7 signestimationsample signrank signtest simul simul_7 simulate simulate_8 sktest sleep slogit slogit_d2 slogit_p smooth snapspan so sor sort spearman spikeplot spikeplot_7 spikeplt spline_x split sqreg sqreg_p sret sretu sretur sreturn ssc st st_ct st_hc st_hcd st_hcd_sh st_is st_issys st_note st_promo st_set st_show st_smpl st_subid stack statsby statsby_8 stbase stci stci_7 stcox stcox_estat stcox_fr stcox_fr_ll stcox_p stcox_sw stcoxkm stcoxkm_7 stcstat stcurv stcurve stcurve_7 stdes stem stepwise stereg stfill stgen stir stjoin stmc stmh stphplot stphplot_7 stphtest stphtest_7 stptime strate strate_7 streg streg_sw streset sts sts_7 stset stsplit stsum sttocc sttoct stvary stweib su suest suest_8 sum summ summa summar summari summariz summarize sunflower sureg survcurv survsum svar svar_p svmat svy svy_disp svy_dreg svy_est svy_est_7 svy_estat svy_get svy_gnbreg_p svy_head svy_header svy_heckman_p svy_heckprob_p svy_intreg_p svy_ivreg_p svy_logistic_p svy_logit_p svy_mlogit_p svy_nbreg_p svy_ologit_p svy_oprobit_p svy_poisson_p svy_probit_p svy_regress_p svy_sub svy_sub_7 svy_x svy_x_7 svy_x_p svydes svydes_8 svygen svygnbreg svyheckman svyheckprob svyintreg svyintreg_7 svyintrg svyivreg svylc svylog_p svylogit svymarkout svymarkout_8 svymean svymlog svymlogit svynbreg svyolog svyologit svyoprob svyoprobit svyopts svypois svypois_7 svypoisson svyprobit svyprobt svyprop svyprop_7 svyratio svyreg svyreg_p svyregress svyset svyset_7 svyset_8 svytab svytab_7 svytest svytotal sw sw_8 swcnreg swcox swereg swilk swlogis swlogit swologit swoprbt swpois swprobit swqreg swtobit swweib symmetry symmi symplot symplot_7 syntax sysdescribe sysdir sysuse szroeter ta tab tab1 tab2 tab_or tabd tabdi tabdis tabdisp tabi table tabodds tabodds_7 tabstat tabu tabul tabula tabulat tabulate te tempfile tempname tempvar tes test testnl testparm teststd tetrachoric time_it timer tis tob tobi tobit tobit_p tobit_sw token tokeni tokeniz tokenize tostring total translate translator transmap treat_ll treatr_p treatreg trim trnb_cons trnb_mean trpoiss_d2 trunc_ll truncr_p truncreg tsappend tset tsfill tsline tsline_ex tsreport tsrevar tsrline tsset tssmooth tsunab ttest ttesti tut_chk tut_wait tutorial tw tware_st two twoway twoway__fpfit_serset twoway__function_gen twoway__histogram_gen twoway__ipoint_serset twoway__ipoints_serset twoway__kdensity_gen twoway__lfit_serset twoway__normgen_gen twoway__pci_serset twoway__qfit_serset twoway__scatteri_serset twoway__sunflower_gen twoway_ksm_serset ty typ type typeof u unab unabbrev unabcmd update us use uselabel var var_mkcompanion var_p varbasic varfcast vargranger varirf varirf_add varirf_cgraph varirf_create varirf_ctable varirf_describe varirf_dir varirf_drop varirf_erase varirf_graph varirf_ograph varirf_rename varirf_set varirf_table varlist varlmar varnorm varsoc varstable varstable_w varstable_w2 varwle vce vec vec_fevd vec_mkphi vec_p vec_p_w vecirf_create veclmar veclmar_w vecnorm vecnorm_w vecrank vecstable verinst vers versi versio version view viewsource vif vwls wdatetof webdescribe webseek webuse weib1_lf weib2_lf weib_lf weib_lf0 weibhet_glf weibhet_glf_sh weibhet_glfa weibhet_glfa_sh weibhet_gp weibhet_ilf weibhet_ilf_sh weibhet_ilfa weibhet_ilfa_sh weibhet_ip weibu_sw weibul_p weibull weibull_c weibull_s weibullhet wh whelp whi which whil while wilc_st wilcoxon win wind windo window winexec wntestb wntestb_7 wntestq xchart xchart_7 xcorr xcorr_7 xi xi_6 xmlsav xmlsave xmluse xpose xsh xshe xshel xshell xt_iis xt_tis xtab_p xtabond xtbin_p xtclog xtcloglog xtcloglog_8 xtcloglog_d2 xtcloglog_pa_p xtcloglog_re_p xtcnt_p xtcorr xtdata xtdes xtfront_p xtfrontier xtgee xtgee_elink xtgee_estat xtgee_makeivar xtgee_p xtgee_plink xtgls xtgls_p xthaus xthausman xtht_p xthtaylor xtile xtint_p xtintreg xtintreg_8 xtintreg_d2 xtintreg_p xtivp_1 xtivp_2 xtivreg xtline xtline_ex xtlogit xtlogit_8 xtlogit_d2 xtlogit_fe_p xtlogit_pa_p xtlogit_re_p xtmixed xtmixed_estat xtmixed_p xtnb_fe xtnb_lf xtnbreg xtnbreg_pa_p xtnbreg_refe_p xtpcse xtpcse_p xtpois xtpoisson xtpoisson_d2 xtpoisson_pa_p xtpoisson_refe_p xtpred xtprobit xtprobit_8 xtprobit_d2 xtprobit_re_p xtps_fe xtps_lf xtps_ren xtps_ren_8 xtrar_p xtrc xtrc_p xtrchh xtrefe_p xtreg xtreg_be xtreg_fe xtreg_ml xtreg_pa_p xtreg_re xtregar xtrere_p xtset xtsf_ll xtsf_llti xtsum xttab xttest0 xttobit xttobit_8 xttobit_p xttrans yx yxview__barlike_draw yxview_area_draw yxview_bar_draw yxview_dot_draw yxview_dropline_draw yxview_function_draw yxview_iarrow_draw yxview_ilabels_draw yxview_normal_draw yxview_pcarrow_draw yxview_pcbarrow_draw yxview_pccapsym_draw yxview_pcscatter_draw yxview_pcspike_draw yxview_rarea_draw yxview_rbar_draw yxview_rbarm_draw yxview_rcap_draw yxview_rcapsym_draw yxview_rconnected_draw yxview_rline_draw yxview_rscatter_draw yxview_rspike_draw yxview_spike_draw yxview_sunflower_draw zap_s zinb zinb_llf zinb_plf zip zip_llf zip_p zip_plf zt_ct_5 zt_hc_5 zt_hcd_5 zt_is_5 zt_iss_5 zt_sho_5 zt_smp_5 ztbase_5 ztcox_5 ztdes_5 ztereg_5 ztfill_5 ztgen_5 ztir_5 ztjoin_5 ztnb ztnb_p ztp ztp_p zts_5 ztset_5 ztspli_5 ztsum_5 zttoct_5 ztvary_5 ztweib_5',
        contains: [
      {
        className: 'symbol',
        begin: /`[a-zA-Z0-9_]+'/
      },
      {
        className: 'variable',
        begin: /\$\{?[a-zA-Z0-9_]+\}?/
      },
      {
        className: 'string',
        variants: [
          {begin: '`"[^\r\n]*?"\''},
          {begin: '"[^\r\n"]*"'}
        ]
      },

      {
        className: 'built_in',
        variants: [
          {
            begin: '\\b(abs|acos|asin|atan|atan2|atanh|ceil|cloglog|comb|cos|digamma|exp|floor|invcloglog|invlogit|ln|lnfact|lnfactorial|lngamma|log|log10|max|min|mod|reldif|round|sign|sin|sqrt|sum|tan|tanh|trigamma|trunc|betaden|Binomial|binorm|binormal|chi2|chi2tail|dgammapda|dgammapdada|dgammapdadx|dgammapdx|dgammapdxdx|F|Fden|Ftail|gammaden|gammap|ibeta|invbinomial|invchi2|invchi2tail|invF|invFtail|invgammap|invibeta|invnchi2|invnFtail|invnibeta|invnorm|invnormal|invttail|nbetaden|nchi2|nFden|nFtail|nibeta|norm|normal|normalden|normd|npnchi2|tden|ttail|uniform|abbrev|char|index|indexnot|length|lower|ltrim|match|plural|proper|real|regexm|regexr|regexs|reverse|rtrim|string|strlen|strlower|strltrim|strmatch|strofreal|strpos|strproper|strreverse|strrtrim|strtrim|strupper|subinstr|subinword|substr|trim|upper|word|wordcount|_caller|autocode|byteorder|chop|clip|cond|e|epsdouble|epsfloat|group|inlist|inrange|irecode|matrix|maxbyte|maxdouble|maxfloat|maxint|maxlong|mi|minbyte|mindouble|minfloat|minint|minlong|missing|r|recode|replay|return|s|scalar|d|date|day|dow|doy|halfyear|mdy|month|quarter|week|year|d|daily|dofd|dofh|dofm|dofq|dofw|dofy|h|halfyearly|hofd|m|mofd|monthly|q|qofd|quarterly|tin|twithin|w|weekly|wofd|y|yearly|yh|ym|yofd|yq|yw|cholesky|colnumb|colsof|corr|det|diag|diag0cnt|el|get|hadamard|I|inv|invsym|issym|issymmetric|J|matmissing|matuniform|mreldif|nullmat|rownumb|rowsof|sweep|syminv|trace|vec|vecdiag)(?=\\(|$)'
          }
        ]
      },

      hljs.COMMENT('^[ \t]*\\*.*$', false),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };
});

hljs.registerLanguage('step21', function(hljs) {
  var STEP21_IDENT_RE = '[A-Z_][A-Z0-9_.]*';
  var STEP21_KEYWORDS = {
    keyword: 'HEADER ENDSEC DATA'
  };
  var STEP21_START = {
    className: 'meta',
    begin: 'ISO-10303-21;',
    relevance: 10
  };
  var STEP21_CLOSE = {
    className: 'meta',
    begin: 'END-ISO-10303-21;',
    relevance: 10
  };

  return {
    aliases: ['p21', 'step', 'stp'],
    case_insensitive: true, // STEP 21 is case insensitive in theory, in practice all non-comments are capitalized.
    lexemes: STEP21_IDENT_RE,
    keywords: STEP21_KEYWORDS,
    contains: [
      STEP21_START,
      STEP21_CLOSE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.COMMENT('/\\*\\*!', '\\*/'),
      hljs.C_NUMBER_MODE,
      hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),
      {
        className: 'string',
        begin: "'", end: "'"
      },
      {
        className: 'symbol',
        variants: [
          {
            begin: '#', end: '\\d+',
            illegal: '\\W'
          }
        ]
      }
    ]
  };
});

hljs.registerLanguage('stylus', function(hljs) {

  var VARIABLE = {
    className: 'variable',
    begin: '\\$' + hljs.IDENT_RE
  };

  var HEX_COLOR = {
    className: 'number',
    begin: '#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})'
  };

  var AT_KEYWORDS = [
    'charset',
    'css',
    'debug',
    'extend',
    'font-face',
    'for',
    'import',
    'include',
    'media',
    'mixin',
    'page',
    'warn',
    'while'
  ];

  var PSEUDO_SELECTORS = [
    'after',
    'before',
    'first-letter',
    'first-line',
    'active',
    'first-child',
    'focus',
    'hover',
    'lang',
    'link',
    'visited'
  ];

  var TAGS = [
    'a',
    'abbr',
    'address',
    'article',
    'aside',
    'audio',
    'b',
    'blockquote',
    'body',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'dd',
    'del',
    'details',
    'dfn',
    'div',
    'dl',
    'dt',
    'em',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'hgroup',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'mark',
    'menu',
    'nav',
    'object',
    'ol',
    'p',
    'q',
    'quote',
    'samp',
    'section',
    'span',
    'strong',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'tr',
    'ul',
    'var',
    'video'
  ];

  var TAG_END = '[\\.\\s\\n\\[\\:,]';

  var ATTRIBUTES = [
    'align-content',
    'align-items',
    'align-self',
    'animation',
    'animation-delay',
    'animation-direction',
    'animation-duration',
    'animation-fill-mode',
    'animation-iteration-count',
    'animation-name',
    'animation-play-state',
    'animation-timing-function',
    'auto',
    'backface-visibility',
    'background',
    'background-attachment',
    'background-clip',
    'background-color',
    'background-image',
    'background-origin',
    'background-position',
    'background-repeat',
    'background-size',
    'border',
    'border-bottom',
    'border-bottom-color',
    'border-bottom-left-radius',
    'border-bottom-right-radius',
    'border-bottom-style',
    'border-bottom-width',
    'border-collapse',
    'border-color',
    'border-image',
    'border-image-outset',
    'border-image-repeat',
    'border-image-slice',
    'border-image-source',
    'border-image-width',
    'border-left',
    'border-left-color',
    'border-left-style',
    'border-left-width',
    'border-radius',
    'border-right',
    'border-right-color',
    'border-right-style',
    'border-right-width',
    'border-spacing',
    'border-style',
    'border-top',
    'border-top-color',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-top-style',
    'border-top-width',
    'border-width',
    'bottom',
    'box-decoration-break',
    'box-shadow',
    'box-sizing',
    'break-after',
    'break-before',
    'break-inside',
    'caption-side',
    'clear',
    'clip',
    'clip-path',
    'color',
    'column-count',
    'column-fill',
    'column-gap',
    'column-rule',
    'column-rule-color',
    'column-rule-style',
    'column-rule-width',
    'column-span',
    'column-width',
    'columns',
    'content',
    'counter-increment',
    'counter-reset',
    'cursor',
    'direction',
    'display',
    'empty-cells',
    'filter',
    'flex',
    'flex-basis',
    'flex-direction',
    'flex-flow',
    'flex-grow',
    'flex-shrink',
    'flex-wrap',
    'float',
    'font',
    'font-family',
    'font-feature-settings',
    'font-kerning',
    'font-language-override',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-variant-ligatures',
    'font-weight',
    'height',
    'hyphens',
    'icon',
    'image-orientation',
    'image-rendering',
    'image-resolution',
    'ime-mode',
    'inherit',
    'initial',
    'justify-content',
    'left',
    'letter-spacing',
    'line-height',
    'list-style',
    'list-style-image',
    'list-style-position',
    'list-style-type',
    'margin',
    'margin-bottom',
    'margin-left',
    'margin-right',
    'margin-top',
    'marks',
    'mask',
    'max-height',
    'max-width',
    'min-height',
    'min-width',
    'nav-down',
    'nav-index',
    'nav-left',
    'nav-right',
    'nav-up',
    'none',
    'normal',
    'object-fit',
    'object-position',
    'opacity',
    'order',
    'orphans',
    'outline',
    'outline-color',
    'outline-offset',
    'outline-style',
    'outline-width',
    'overflow',
    'overflow-wrap',
    'overflow-x',
    'overflow-y',
    'padding',
    'padding-bottom',
    'padding-left',
    'padding-right',
    'padding-top',
    'page-break-after',
    'page-break-before',
    'page-break-inside',
    'perspective',
    'perspective-origin',
    'pointer-events',
    'position',
    'quotes',
    'resize',
    'right',
    'tab-size',
    'table-layout',
    'text-align',
    'text-align-last',
    'text-decoration',
    'text-decoration-color',
    'text-decoration-line',
    'text-decoration-style',
    'text-indent',
    'text-overflow',
    'text-rendering',
    'text-shadow',
    'text-transform',
    'text-underline-position',
    'top',
    'transform',
    'transform-origin',
    'transform-style',
    'transition',
    'transition-delay',
    'transition-duration',
    'transition-property',
    'transition-timing-function',
    'unicode-bidi',
    'vertical-align',
    'visibility',
    'white-space',
    'widows',
    'width',
    'word-break',
    'word-spacing',
    'word-wrap',
    'z-index'
  ];

  // illegals
  var ILLEGAL = [
    '\\{',
    '\\}',
    '\\?',
    '(\\bReturn\\b)', // monkey
    '(\\bEnd\\b)', // monkey
    '(\\bend\\b)', // vbscript
    ';', // sql
    '#\\s', // markdown
    '\\*\\s', // markdown
    '===\\s', // markdown
    '\\|',
    '%', // prolog
  ];

  return {
    aliases: ['styl'],
    case_insensitive: false,
    illegal: '(' + ILLEGAL.join('|') + ')',
    keywords: 'if else for in',
    contains: [

      // strings
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,

      // comments
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,

      // hex colors
      HEX_COLOR,

      // class tag
      {
        begin: '\\.[a-zA-Z][a-zA-Z0-9_-]*' + TAG_END,
        returnBegin: true,
        contains: [
          {className: 'selector-class', begin: '\\.[a-zA-Z][a-zA-Z0-9_-]*'}
        ]
      },

      // id tag
      {
        begin: '\\#[a-zA-Z][a-zA-Z0-9_-]*' + TAG_END,
        returnBegin: true,
        contains: [
          {className: 'selector-id', begin: '\\#[a-zA-Z][a-zA-Z0-9_-]*'}
        ]
      },

      // tags
      {
        begin: '\\b(' + TAGS.join('|') + ')' + TAG_END,
        returnBegin: true,
        contains: [
          {className: 'selector-tag', begin: '\\b[a-zA-Z][a-zA-Z0-9_-]*'}
        ]
      },

      // psuedo selectors
      {
        begin: '&?:?:\\b(' + PSEUDO_SELECTORS.join('|') + ')' + TAG_END
      },

      // @ keywords
      {
        begin: '\@(' + AT_KEYWORDS.join('|') + ')\\b'
      },

      // variables
      VARIABLE,

      // dimension
      hljs.CSS_NUMBER_MODE,

      // number
      hljs.NUMBER_MODE,

      // functions
      //  - only from beginning of line + whitespace
      {
        className: 'function',
        begin: '^[a-zA-Z][a-zA-Z0-9_\-]*\\(.*\\)',
        illegal: '[\\n]',
        returnBegin: true,
        contains: [
          {className: 'title', begin: '\\b[a-zA-Z][a-zA-Z0-9_\-]*'},
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            contains: [
              HEX_COLOR,
              VARIABLE,
              hljs.APOS_STRING_MODE,
              hljs.CSS_NUMBER_MODE,
              hljs.NUMBER_MODE,
              hljs.QUOTE_STRING_MODE
            ]
          }
        ]
      },

      // attributes
      //  - only from beginning of line + whitespace
      //  - must have whitespace after it
      {
        className: 'attribute',
        begin: '\\b(' + ATTRIBUTES.reverse().join('|') + ')\\b'
      }
    ]
  };
});

hljs.registerLanguage('swift', function(hljs) {
  var SWIFT_KEYWORDS = {
      keyword: '__COLUMN__ __FILE__ __FUNCTION__ __LINE__ as as! as? associativity ' +
        'break case catch class continue convenience default defer deinit didSet do ' +
        'dynamic dynamicType else enum extension fallthrough false final for func ' +
        'get guard if import in indirect infix init inout internal is lazy left let ' +
        'mutating nil none nonmutating operator optional override postfix precedence ' +
        'prefix private protocol Protocol public repeat required rethrows return ' +
        'right self Self set static struct subscript super switch throw throws true ' +
        'try try! try? Type typealias unowned var weak where while willSet',
      literal: 'true false nil',
      built_in: 'abs advance alignof alignofValue anyGenerator assert assertionFailure ' +
        'bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC ' +
        'bridgeToObjectiveCUnconditional c contains count countElements countLeadingZeros ' +
        'debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords ' +
        'enumerate equal fatalError filter find getBridgedObjectiveCType getVaList ' +
        'indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC ' +
        'isUniquelyReferenced isUniquelyReferencedNonObjC join lazy lexicographicalCompare ' +
        'map max maxElement min minElement numericCast overlaps partition posix ' +
        'precondition preconditionFailure print println quickSort readLine reduce reflect ' +
        'reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split ' +
        'startsWith stride strideof strideofValue swap toString transcode ' +
        'underestimateCount unsafeAddressOf unsafeBitCast unsafeDowncast unsafeUnwrap ' +
        'unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer ' +
        'withUnsafePointerToObject withUnsafeMutablePointer withUnsafeMutablePointers ' +
        'withUnsafePointer withUnsafePointers withVaList zip'
    };

  var TYPE = {
    className: 'type',
    begin: '\\b[A-Z][\\w\']*',
    relevance: 0
  };
  var BLOCK_COMMENT = hljs.COMMENT(
    '/\\*',
    '\\*/',
    {
      contains: ['self']
    }
  );
  var SUBST = {
    className: 'subst',
    begin: /\\\(/, end: '\\)',
    keywords: SWIFT_KEYWORDS,
    contains: [] // assigned later
  };
  var NUMBERS = {
      className: 'number',
      begin: '\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b',
      relevance: 0
  };
  var QUOTE_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    contains: [SUBST, hljs.BACKSLASH_ESCAPE]
  });
  SUBST.contains = [NUMBERS];

  return {
    keywords: SWIFT_KEYWORDS,
    contains: [
      QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      BLOCK_COMMENT,
      TYPE,
      NUMBERS,
      {
        className: 'function',
        beginKeywords: 'func', end: '{', excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: /[A-Za-z$_][0-9A-Za-z$_]*/,
            illegal: /\(/
          }),
          {
            begin: /</, end: />/,
            illegal: />/
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/, endsParent: true,
            keywords: SWIFT_KEYWORDS,
            contains: [
              'self',
              NUMBERS,
              QUOTE_STRING_MODE,
              hljs.C_BLOCK_COMMENT_MODE,
              {begin: ':'} // relevance booster
            ],
            illegal: /["']/
          }
        ],
        illegal: /\[|%/
      },
      {
        className: 'class',
        beginKeywords: 'struct protocol class extension enum',
        keywords: SWIFT_KEYWORDS,
        end: '\\{',
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {begin: /[A-Za-z$_][0-9A-Za-z$_]*/})
        ]
      },
      {
        className: 'meta', // @attributes
        begin: '(@warn_unused_result|@exported|@lazy|@noescape|' +
                  '@NSCopying|@NSManaged|@objc|@convention|@required|' +
                  '@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|' +
                  '@infix|@prefix|@postfix|@autoclosure|@testable|@available|' +
                  '@nonobjc|@NSApplicationMain|@UIApplicationMain)'

      },
      {
        beginKeywords: 'import', end: /$/,
        contains: [hljs.C_LINE_COMMENT_MODE, BLOCK_COMMENT]
      }
    ]
  };
});

hljs.registerLanguage('tcl', function(hljs) {
  return {
    aliases: ['tk'],
    keywords: 'after append apply array auto_execok auto_import auto_load auto_mkindex ' +
      'auto_mkindex_old auto_qualify auto_reset bgerror binary break catch cd chan clock ' +
      'close concat continue dde dict encoding eof error eval exec exit expr fblocked ' +
      'fconfigure fcopy file fileevent filename flush for foreach format gets glob global ' +
      'history http if incr info interp join lappend|10 lassign|10 lindex|10 linsert|10 list ' +
      'llength|10 load lrange|10 lrepeat|10 lreplace|10 lreverse|10 lsearch|10 lset|10 lsort|10 '+
      'mathfunc mathop memory msgcat namespace open package parray pid pkg::create pkg_mkIndex '+
      'platform platform::shell proc puts pwd read refchan regexp registry regsub|10 rename '+
      'return safe scan seek set socket source split string subst switch tcl_endOfWord '+
      'tcl_findLibrary tcl_startOfNextWord tcl_startOfPreviousWord tcl_wordBreakAfter '+
      'tcl_wordBreakBefore tcltest tclvars tell time tm trace unknown unload unset update '+
      'uplevel upvar variable vwait while',
    contains: [
      hljs.COMMENT(';[ \\t]*#', '$'),
      hljs.COMMENT('^[ \\t]*#', '$'),
      {
        beginKeywords: 'proc',
        end: '[\\{]',
        excludeEnd: true,
        contains: [
          {
            className: 'title',
            begin: '[ \\t\\n\\r]+(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*',
            end: '[ \\t\\n\\r]',
            endsWithParent: true,
            excludeEnd: true
          }
        ]
      },
      {
        excludeEnd: true,
        variants: [
          {
            begin: '\\$(\\{)?(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*\\(([a-zA-Z0-9_])*\\)',
            end: '[^a-zA-Z0-9_\\}\\$]'
          },
          {
            begin: '\\$(\\{)?(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*',
            end: '(\\))?[^a-zA-Z0-9_\\}\\$]'
          }
        ]
      },
      {
        className: 'string',
        contains: [hljs.BACKSLASH_ESCAPE],
        variants: [
          hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),
          hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null})
        ]
      },
      {
        className: 'number',
        variants: [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE]
      }
    ]
  }
});

hljs.registerLanguage('tex', function(hljs) {
  var COMMAND = {
    className: 'tag',
    begin: /\\/,
    relevance: 0,
    contains: [
      {
        className: 'name',
        variants: [
          {begin: /[a-zA-Zа-яА-я]+[*]?/},
          {begin: /[^a-zA-Zа-яА-я0-9]/}
        ],
        starts: {
          endsWithParent: true,
          relevance: 0,
          contains: [
            {
              className: 'string', // because it looks like attributes in HTML tags
              variants: [
                {begin: /\[/, end: /\]/},
                {begin: /\{/, end: /\}/}
              ]
            },
            {
              begin: /\s*=\s*/, endsWithParent: true,
              relevance: 0,
              contains: [
                {
                  className: 'number',
                  begin: /-?\d*\.?\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?/
                }
              ]
            }
          ]
        }
      }
    ]
  };

  return {
    contains: [
      COMMAND,
      {
        className: 'formula',
        contains: [COMMAND],
        relevance: 0,
        variants: [
          {begin: /\$\$/, end: /\$\$/},
          {begin: /\$/, end: /\$/}
        ]
      },
      hljs.COMMENT(
        '%',
        '$',
        {
          relevance: 0
        }
      )
    ]
  };
});

hljs.registerLanguage('thrift', function(hljs) {
  var BUILT_IN_TYPES = 'bool byte i16 i32 i64 double string binary';
  return {
    keywords: {
      keyword:
        'namespace const typedef struct enum service exception void oneway set list map required optional',
      built_in:
        BUILT_IN_TYPES,
      literal:
        'true false'
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'class',
        beginKeywords: 'struct enum service exception', end: /\{/,
        illegal: /\n/,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            starts: {endsWithParent: true, excludeEnd: true} // hack: eating everything after the first title
          })
        ]
      },
      {
        begin: '\\b(set|list|map)\\s*<', end: '>',
        keywords: BUILT_IN_TYPES,
        contains: ['self']
      }
    ]
  };
});

hljs.registerLanguage('tp', function(hljs) {
  var TPID = {
    className: 'number',
    begin: '[1-9][0-9]*', /* no leading zeros */
    relevance: 0
  };
  var TPLABEL = {
    className: 'symbol',
    begin: ':[^\\]]+'
  };
  var TPDATA = {
    className: 'built_in',
    begin: '(AR|P|PAYLOAD|PR|R|SR|RSR|LBL|VR|UALM|MESSAGE|UTOOL|UFRAME|TIMER|\
    TIMER_OVERFLOW|JOINT_MAX_SPEED|RESUME_PROG|DIAG_REC)\\[', end: '\\]',
    contains: [
      'self',
      TPID,
      TPLABEL
    ]
  };
  var TPIO = {
    className: 'built_in',
    begin: '(AI|AO|DI|DO|F|RI|RO|UI|UO|GI|GO|SI|SO)\\[', end: '\\]',
    contains: [
      'self',
      TPID,
      hljs.QUOTE_STRING_MODE, /* for pos section at bottom */
      TPLABEL
    ]
  };

  return {
    keywords: {
      keyword:
        'ABORT ACC ADJUST AND AP_LD BREAK CALL CNT COL CONDITION CONFIG DA DB ' +
        'DIV DETECT ELSE END ENDFOR ERR_NUM ERROR_PROG FINE FOR GP GUARD INC ' +
        'IF JMP LINEAR_MAX_SPEED LOCK MOD MONITOR OFFSET Offset OR OVERRIDE ' +
        'PAUSE PREG PTH RT_LD RUN SELECT SKIP Skip TA TB TO TOOL_OFFSET ' +
        'Tool_Offset UF UT UFRAME_NUM UTOOL_NUM UNLOCK WAIT X Y Z W P R STRLEN ' +
        'SUBSTR FINDSTR VOFFSET PROG ATTR MN POS',
      literal:
        'ON OFF max_speed LPOS JPOS ENABLE DISABLE START STOP RESET'
    },
    contains: [
      TPDATA,
      TPIO,
      {
        className: 'keyword',
        begin: '/(PROG|ATTR|MN|POS|END)\\b'
      },
      {
        /* this is for cases like ,CALL */
        className: 'keyword',
        begin: '(CALL|RUN|POINT_LOGIC|LBL)\\b'
      },
      {
        /* this is for cases like CNT100 where the default lexemes do not
         * separate the keyword and the number */
        className: 'keyword',
        begin: '\\b(ACC|CNT|Skip|Offset|PSPD|RT_LD|AP_LD|Tool_Offset)'
      },
      {
        /* to catch numbers that do not have a word boundary on the left */
        className: 'number',
        begin: '\\d+(sec|msec|mm/sec|cm/min|inch/min|deg/sec|mm|in|cm)?\\b',
        relevance: 0
      },
      hljs.COMMENT('//', '[;$]'),
      hljs.COMMENT('!', '[;$]'),
      hljs.COMMENT('--eg:', '$'),
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: '\'', end: '\''
      },
      hljs.C_NUMBER_MODE,
      {
        className: 'variable',
        begin: '\\$[A-Za-z0-9_]+'
      }
    ]
  };
});

hljs.registerLanguage('twig', function(hljs) {
  var PARAMS = {
    className: 'params',
    begin: '\\(', end: '\\)'
  };

  var FUNCTION_NAMES = 'attribute block constant cycle date dump include ' +
                  'max min parent random range source template_from_string';

  var FUNCTIONS = {
    beginKeywords: FUNCTION_NAMES,
    keywords: {name: FUNCTION_NAMES},
    relevance: 0,
    contains: [
      PARAMS
    ]
  };

  var FILTER = {
    begin: /\|[A-Za-z_]+:?/,
    keywords:
      'abs batch capitalize convert_encoding date date_modify default ' +
      'escape first format join json_encode keys last length lower ' +
      'merge nl2br number_format raw replace reverse round slice sort split ' +
      'striptags title trim upper url_encode',
    contains: [
      FUNCTIONS
    ]
  };

  var TAGS = 'autoescape block do embed extends filter flush for ' +
    'if import include macro sandbox set spaceless use verbatim';

  TAGS = TAGS + ' ' + TAGS.split(' ').map(function(t){return 'end' + t}).join(' ');

  return {
    aliases: ['craftcms'],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT(/\{#/, /#}/),
      {
        className: 'template-tag',
        begin: /\{%/, end: /%}/,
        contains: [
          {
            className: 'name',
            begin: /\w+/,
            keywords: TAGS,
            starts: {
              endsWithParent: true,
              contains: [FILTER, FUNCTIONS],
              relevance: 0
            }
          }
        ]
      },
      {
        className: 'template-variable',
        begin: /\{\{/, end: /}}/,
        contains: ['self', FILTER, FUNCTIONS]
      }
    ]
  };
});

hljs.registerLanguage('typescript', function(hljs) {
  var KEYWORDS = {
    keyword:
      'in if for while finally var new function do return void else break catch ' +
      'instanceof with throw case default try this switch continue typeof delete ' +
      'let yield const class public private protected get set super ' +
      'static implements enum export import declare type namespace abstract',
    literal:
      'true false null undefined NaN Infinity',
    built_in:
      'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' +
      'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' +
      'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' +
      'TypeError URIError Number Math Date String RegExp Array Float32Array ' +
      'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' +
      'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' +
      'module console window document any number boolean string void'
  };

  return {
    aliases: ['ts'],
    keywords: KEYWORDS,
    contains: [
      {
        className: 'meta',
        begin: /^\s*['"]use strict['"]/
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      { // template string
        className: 'string',
        begin: '`', end: '`',
        contains: [
          hljs.BACKSLASH_ESCAPE,
          {
            className: 'subst',
            begin: '\\$\\{', end: '\\}'
          }
        ]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'number',
        variants: [
          { begin: '\\b(0[bB][01]+)' },
          { begin: '\\b(0[oO][0-7]+)' },
          { begin: hljs.C_NUMBER_RE }
        ],
        relevance: 0
      },
      { // "value" container
        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
        keywords: 'return throw case',
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.REGEXP_MODE
        ],
        relevance: 0
      },
      {
        className: 'function',
        begin: 'function', end: /[\{;]/, excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          'self',
          hljs.inherit(hljs.TITLE_MODE, {begin: /[A-Za-z$_][0-9A-Za-z$_]*/}),
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS,
            contains: [
              hljs.C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ],
            illegal: /["'\(]/
          }
        ],
        illegal: /\[|%/,
        relevance: 0 // () => {} is more typical in TypeScript
      },
      {
        beginKeywords: 'constructor', end: /\{/, excludeEnd: true
      },
      {
        beginKeywords: 'module', end: /\{/, excludeEnd: true
      },
      {
        beginKeywords: 'interface', end: /\{/, excludeEnd: true,
        keywords: 'interface extends'
      },
      {
        begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      },
      {
        begin: '\\.' + hljs.IDENT_RE, relevance: 0 // hack: prevents detection of keywords after dots
      }
    ]
  };
});

hljs.registerLanguage('vala', function(hljs) {
  return {
    keywords: {
      keyword:
        // Value types
        'char uchar unichar int uint long ulong short ushort int8 int16 int32 int64 uint8 ' +
        'uint16 uint32 uint64 float double bool struct enum string void ' +
        // Reference types
        'weak unowned owned ' +
        // Modifiers
        'async signal static abstract interface override ' +
        // Control Structures
        'while do for foreach else switch case break default return try catch ' +
        // Visibility
        'public private protected internal ' +
        // Other
        'using new this get set const stdout stdin stderr var',
      built_in:
        'DBus GLib CCode Gee Object',
      literal:
        'false true null'
    },
    contains: [
      {
        className: 'class',
        beginKeywords: 'class interface delegate namespace', end: '{', excludeEnd: true,
        illegal: '[^,:\\n\\s\\.]',
        contains: [
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'string',
        begin: '"""', end: '"""',
        relevance: 5
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: 'meta',
        begin: '^#', end: '$',
        relevance: 2
      }
    ]
  };
});

hljs.registerLanguage('vbnet', function(hljs) {
  return {
    aliases: ['vb'],
    case_insensitive: true,
    keywords: {
      keyword:
        'addhandler addressof alias and andalso aggregate ansi as assembly auto binary by byref byval ' + /* a-b */
        'call case catch class compare const continue custom declare default delegate dim distinct do ' + /* c-d */
        'each equals else elseif end enum erase error event exit explicit finally for friend from function ' + /* e-f */
        'get global goto group handles if implements imports in inherits interface into is isfalse isnot istrue ' + /* g-i */
        'join key let lib like loop me mid mod module mustinherit mustoverride mybase myclass ' + /* j-m */
        'namespace narrowing new next not notinheritable notoverridable ' + /* n */
        'of off on operator option optional or order orelse overloads overridable overrides ' + /* o */
        'paramarray partial preserve private property protected public ' + /* p */
        'raiseevent readonly redim rem removehandler resume return ' + /* r */
        'select set shadows shared skip static step stop structure strict sub synclock ' + /* s */
        'take text then throw to try unicode until using when where while widening with withevents writeonly xor', /* t-x */
      built_in:
        'boolean byte cbool cbyte cchar cdate cdec cdbl char cint clng cobj csbyte cshort csng cstr ctype ' +  /* b-c */
        'date decimal directcast double gettype getxmlnamespace iif integer long object ' + /* d-o */
        'sbyte short single string trycast typeof uinteger ulong ushort', /* s-u */
      literal:
        'true false nothing'
    },
    illegal: '//|{|}|endif|gosub|variant|wend', /* reserved deprecated keywords */
    contains: [
      hljs.inherit(hljs.QUOTE_STRING_MODE, {contains: [{begin: '""'}]}),
      hljs.COMMENT(
        '\'',
        '$',
        {
          returnBegin: true,
          contains: [
            {
              className: 'doctag',
              begin: '\'\'\'|<!--|-->',
              contains: [hljs.PHRASAL_WORDS_MODE]
            },
            {
              className: 'doctag',
              begin: '</?', end: '>',
              contains: [hljs.PHRASAL_WORDS_MODE]
            }
          ]
        }
      ),
      hljs.C_NUMBER_MODE,
      {
        className: 'meta',
        begin: '#', end: '$',
        keywords: {'meta-keyword': 'if else elseif end region externalsource'}
      }
    ]
  };
});

hljs.registerLanguage('vbscript', function(hljs) {
  return {
    aliases: ['vbs'],
    case_insensitive: true,
    keywords: {
      keyword:
        'call class const dim do loop erase execute executeglobal exit for each next function ' +
        'if then else on error option explicit new private property let get public randomize ' +
        'redim rem select case set stop sub while wend with end to elseif is or xor and not ' +
        'class_initialize class_terminate default preserve in me byval byref step resume goto',
      built_in:
        'lcase month vartype instrrev ubound setlocale getobject rgb getref string ' +
        'weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency ' +
        'conversions csng timevalue second year space abs clng timeserial fixs len asc ' +
        'isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate ' +
        'instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex ' +
        'chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim ' +
        'strcomp int createobject loadpicture tan formatnumber mid scriptenginebuildversion ' +
        'scriptengine split scriptengineminorversion cint sin datepart ltrim sqr ' +
        'scriptenginemajorversion time derived eval date formatpercent exp inputbox left ascw ' +
        'chrw regexp server response request cstr err',
      literal:
        'true false null nothing empty'
    },
    illegal: '//',
    contains: [
      hljs.inherit(hljs.QUOTE_STRING_MODE, {contains: [{begin: '""'}]}),
      hljs.COMMENT(
        /'/,
        /$/,
        {
          relevance: 0
        }
      ),
      hljs.C_NUMBER_MODE
    ]
  };
});

hljs.registerLanguage('vbscript-html', function(hljs) {
  return {
    subLanguage: 'xml',
    contains: [
      {
        begin: '<%', end: '%>',
        subLanguage: 'vbscript'
      }
    ]
  };
});

hljs.registerLanguage('verilog', function(hljs) {
  return {
    aliases: ['v'],
    case_insensitive: false,
    keywords: {
      keyword:
        'always and assign begin buf bufif0 bufif1 case casex casez cmos deassign ' +
        'default defparam disable edge else end endcase endfunction endmodule ' +
        'endprimitive endspecify endtable endtask event for force forever fork ' +
        'function if ifnone initial inout input join macromodule module nand ' +
        'negedge nmos nor not notif0 notif1 or output parameter pmos posedge ' +
        'primitive pulldown pullup rcmos release repeat rnmos rpmos rtran ' +
        'rtranif0 rtranif1 specify specparam table task timescale tran ' +
        'tranif0 tranif1 wait while xnor xor ' +
        // types
        'highz0 highz1 integer large medium pull0 pull1 real realtime reg ' +
        'scalared signed small strong0 strong1 supply0 supply0 supply1 supply1 ' +
        'time tri tri0 tri1 triand trior trireg vectored wand weak0 weak1 wire wor'
    },
    contains: [
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'number',
        begin: '(\\b((\\d\'(b|h|o|d|B|H|O|D))[0-9xzXZa-fA-F\_]+))|(\\B((\'(b|h|o|d|B|H|O|D))[0-9xzXZa-fA-F\_]+))|(\\b([0-9xzXZ\_])+)',
        contains: [hljs.BACKSLASH_ESCAPE],
        relevance: 0
      },
      /* parameters to instances */
      {
        className: 'variable',
        begin: '#\\((?!parameter).+\\)'
      }
    ]
  }; // return
});

hljs.registerLanguage('vhdl', function(hljs) {
  // Regular expression for VHDL numeric literals.

  // Decimal literal:
  var INTEGER_RE = '\\d(_|\\d)*';
  var EXPONENT_RE = '[eE][-+]?' + INTEGER_RE;
  var DECIMAL_LITERAL_RE = INTEGER_RE + '(\\.' + INTEGER_RE + ')?' + '(' + EXPONENT_RE + ')?';
  // Based literal:
  var BASED_INTEGER_RE = '\\w+';
  var BASED_LITERAL_RE = INTEGER_RE + '#' + BASED_INTEGER_RE + '(\\.' + BASED_INTEGER_RE + ')?' + '#' + '(' + EXPONENT_RE + ')?';

  var NUMBER_RE = '\\b(' + BASED_LITERAL_RE + '|' + DECIMAL_LITERAL_RE + ')';

  return {
    case_insensitive: true,
    keywords: {
      keyword:
        'abs access after alias all and architecture array assert attribute begin block ' +
        'body buffer bus case component configuration constant context cover disconnect ' +
        'downto default else elsif end entity exit fairness file for force function generate ' +
        'generic group guarded if impure in inertial inout is label library linkage literal ' +
        'loop map mod nand new next nor not null of on open or others out package port ' +
        'postponed procedure process property protected pure range record register reject ' +
        'release rem report restrict restrict_guarantee return rol ror select sequence ' +
        'severity shared signal sla sll sra srl strong subtype then to transport type ' +
        'unaffected units until use variable vmode vprop vunit wait when while with xnor xor',
      built_in:
        'boolean bit character severity_level integer time delay_length natural positive ' +
        'string bit_vector file_open_kind file_open_status std_ulogic std_ulogic_vector ' +
        'std_logic std_logic_vector unsigned signed boolean_vector integer_vector ' +
        'real_vector time_vector'
    },
    illegal: '{',
    contains: [
      hljs.C_BLOCK_COMMENT_MODE,        // VHDL-2008 block commenting.
      hljs.COMMENT('--', '$'),
      hljs.QUOTE_STRING_MODE,
      {
        className: 'number',
        begin: NUMBER_RE,
        relevance: 0
      },
      {
        className: 'literal',
        begin: '\'(U|X|0|1|Z|W|L|H|-)\'',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        className: 'symbol',
        begin: '\'[A-Za-z](_?[A-Za-z0-9])*',
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };
});

hljs.registerLanguage('vim', function(hljs) {
  return {
    lexemes: /[!#@\w]+/,
    keywords: {
      keyword: //ex command
        // express version except: ! & * < = > !! # @ @@
        'N|0 P|0 X|0 a|0 ab abc abo al am an|0 ar arga argd arge argdo argg argl argu as au aug aun b|0 bN ba bad bd be bel bf bl bm bn bo bp br brea breaka breakd breakl bro bufdo buffers bun bw c|0 cN cNf ca cabc caddb cad caddf cal cat cb cc ccl cd ce cex cf cfir cgetb cgete cg changes chd che checkt cl cla clo cm cmapc cme cn cnew cnf cno cnorea cnoreme co col colo com comc comp con conf cope '+
        'cp cpf cq cr cs cst cu cuna cunme cw d|0 delm deb debugg delc delf dif diffg diffo diffp diffpu diffs diffthis dig di dl dell dj dli do doautoa dp dr ds dsp e|0 ea ec echoe echoh echom echon el elsei em en endfo endf endt endw ene ex exe exi exu f|0 files filet fin fina fini fir fix fo foldc foldd folddoc foldo for fu g|0 go gr grepa gu gv ha h|0 helpf helpg helpt hi hid his i|0 ia iabc if ij il im imapc '+
        'ime ino inorea inoreme int is isp iu iuna iunme j|0 ju k|0 keepa kee keepj lN lNf l|0 lad laddb laddf la lan lat lb lc lch lcl lcs le lefta let lex lf lfir lgetb lgete lg lgr lgrepa lh ll lla lli lmak lm lmapc lne lnew lnf ln loadk lo loc lockv lol lope lp lpf lr ls lt lu lua luad luaf lv lvimgrepa lw m|0 ma mak map mapc marks mat me menut mes mk mks mksp mkv mkvie mod mz mzf nbc nb nbs n|0 new nm nmapc nme nn nnoreme noa no noh norea noreme norm nu nun nunme ol o|0 om omapc ome on ono onoreme opt ou ounme ow p|0 '+
        'profd prof pro promptr pc ped pe perld po popu pp pre prev ps pt ptN ptf ptj ptl ptn ptp ptr pts pu pw py3 python3 py3d py3f py pyd pyf q|0 quita qa r|0 rec red redi redr redraws reg res ret retu rew ri rightb rub rubyd rubyf rund ru rv s|0 sN san sa sal sav sb sbN sba sbf sbl sbm sbn sbp sbr scrip scripte scs se setf setg setl sf sfir sh sim sig sil sl sla sm smap smapc sme sn sni sno snor snoreme sor '+
        'so spelld spe spelli spellr spellu spellw sp spr sre st sta startg startr star stopi stj sts sun sunm sunme sus sv sw sy synti sync t|0 tN tabN tabc tabdo tabe tabf tabfir tabl tabm tabnew '+
        'tabn tabo tabp tabr tabs tab ta tags tc tcld tclf te tf th tj tl tm tn to tp tr try ts tu u|0 undoj undol una unh unl unlo unm unme uns up v|0 ve verb vert vim vimgrepa vi viu vie vm vmapc vme vne vn vnoreme vs vu vunme windo w|0 wN wa wh wi winc winp wn wp wq wqa ws wu wv x|0 xa xmapc xm xme xn xnoreme xu xunme y|0 z|0 ~ '+
        // full version
        'Next Print append abbreviate abclear aboveleft all amenu anoremenu args argadd argdelete argedit argglobal arglocal argument ascii autocmd augroup aunmenu buffer bNext ball badd bdelete behave belowright bfirst blast bmodified bnext botright bprevious brewind break breakadd breakdel breaklist browse bunload '+
        'bwipeout change cNext cNfile cabbrev cabclear caddbuffer caddexpr caddfile call catch cbuffer cclose center cexpr cfile cfirst cgetbuffer cgetexpr cgetfile chdir checkpath checktime clist clast close cmap cmapclear cmenu cnext cnewer cnfile cnoremap cnoreabbrev cnoremenu copy colder colorscheme command comclear compiler continue confirm copen cprevious cpfile cquit crewind cscope cstag cunmap '+
        'cunabbrev cunmenu cwindow delete delmarks debug debuggreedy delcommand delfunction diffupdate diffget diffoff diffpatch diffput diffsplit digraphs display deletel djump dlist doautocmd doautoall deletep drop dsearch dsplit edit earlier echo echoerr echohl echomsg else elseif emenu endif endfor '+
        'endfunction endtry endwhile enew execute exit exusage file filetype find finally finish first fixdel fold foldclose folddoopen folddoclosed foldopen function global goto grep grepadd gui gvim hardcopy help helpfind helpgrep helptags highlight hide history insert iabbrev iabclear ijump ilist imap '+
        'imapclear imenu inoremap inoreabbrev inoremenu intro isearch isplit iunmap iunabbrev iunmenu join jumps keepalt keepmarks keepjumps lNext lNfile list laddexpr laddbuffer laddfile last language later lbuffer lcd lchdir lclose lcscope left leftabove lexpr lfile lfirst lgetbuffer lgetexpr lgetfile lgrep lgrepadd lhelpgrep llast llist lmake lmap lmapclear lnext lnewer lnfile lnoremap loadkeymap loadview '+
        'lockmarks lockvar lolder lopen lprevious lpfile lrewind ltag lunmap luado luafile lvimgrep lvimgrepadd lwindow move mark make mapclear match menu menutranslate messages mkexrc mksession mkspell mkvimrc mkview mode mzscheme mzfile nbclose nbkey nbsart next nmap nmapclear nmenu nnoremap '+
        'nnoremenu noautocmd noremap nohlsearch noreabbrev noremenu normal number nunmap nunmenu oldfiles open omap omapclear omenu only onoremap onoremenu options ounmap ounmenu ownsyntax print profdel profile promptfind promptrepl pclose pedit perl perldo pop popup ppop preserve previous psearch ptag ptNext '+
        'ptfirst ptjump ptlast ptnext ptprevious ptrewind ptselect put pwd py3do py3file python pydo pyfile quit quitall qall read recover redo redir redraw redrawstatus registers resize retab return rewind right rightbelow ruby rubydo rubyfile rundo runtime rviminfo substitute sNext sandbox sargument sall saveas sbuffer sbNext sball sbfirst sblast sbmodified sbnext sbprevious sbrewind scriptnames scriptencoding '+
        'scscope set setfiletype setglobal setlocal sfind sfirst shell simalt sign silent sleep slast smagic smapclear smenu snext sniff snomagic snoremap snoremenu sort source spelldump spellgood spellinfo spellrepall spellundo spellwrong split sprevious srewind stop stag startgreplace startreplace '+
        'startinsert stopinsert stjump stselect sunhide sunmap sunmenu suspend sview swapname syntax syntime syncbind tNext tabNext tabclose tabedit tabfind tabfirst tablast tabmove tabnext tabonly tabprevious tabrewind tag tcl tcldo tclfile tearoff tfirst throw tjump tlast tmenu tnext topleft tprevious '+'trewind tselect tunmenu undo undojoin undolist unabbreviate unhide unlet unlockvar unmap unmenu unsilent update vglobal version verbose vertical vimgrep vimgrepadd visual viusage view vmap vmapclear vmenu vnew '+
        'vnoremap vnoremenu vsplit vunmap vunmenu write wNext wall while winsize wincmd winpos wnext wprevious wqall wsverb wundo wviminfo xit xall xmapclear xmap xmenu xnoremap xnoremenu xunmap xunmenu yank',
      built_in: //built in func
        'abs acos add and append argc argidx argv asin atan atan2 browse browsedir bufexists buflisted bufloaded bufname bufnr bufwinnr byte2line byteidx call ceil changenr char2nr cindent clearmatches col complete complete_add complete_check confirm copy cos cosh count cscope_connection cursor '+
        'deepcopy delete did_filetype diff_filler diff_hlID empty escape eval eventhandler executable exists exp expand extend feedkeys filereadable filewritable filter finddir findfile float2nr floor fmod fnameescape fnamemodify foldclosed foldclosedend foldlevel foldtext foldtextresult foreground function '+
        'garbagecollect get getbufline getbufvar getchar getcharmod getcmdline getcmdpos getcmdtype getcwd getfontname getfperm getfsize getftime getftype getline getloclist getmatches getpid getpos getqflist getreg getregtype gettabvar gettabwinvar getwinposx getwinposy getwinvar glob globpath has has_key '+
        'haslocaldir hasmapto histadd histdel histget histnr hlexists hlID hostname iconv indent index input inputdialog inputlist inputrestore inputsave inputsecret insert invert isdirectory islocked items join keys len libcall libcallnr line line2byte lispindent localtime log log10 luaeval map maparg mapcheck '+
        'match matchadd matcharg matchdelete matchend matchlist matchstr max min mkdir mode mzeval nextnonblank nr2char or pathshorten pow prevnonblank printf pumvisible py3eval pyeval range readfile reltime reltimestr remote_expr remote_foreground remote_peek remote_read remote_send remove rename repeat '+
        'resolve reverse round screenattr screenchar screencol screenrow search searchdecl searchpair searchpairpos searchpos server2client serverlist setbufvar setcmdpos setline setloclist setmatches setpos setqflist setreg settabvar settabwinvar setwinvar sha256 shellescape shiftwidth simplify sin '+
        'sinh sort soundfold spellbadword spellsuggest split sqrt str2float str2nr strchars strdisplaywidth strftime stridx string strlen strpart strridx strtrans strwidth submatch substitute synconcealed synID synIDattr '+
        'synIDtrans synstack system tabpagebuflist tabpagenr tabpagewinnr tagfiles taglist tan tanh tempname tolower toupper tr trunc type undofile undotree values virtcol visualmode wildmenumode winbufnr wincol winheight winline winnr winrestcmd winrestview winsaveview winwidth writefile xor'
    },
    illegal: /[{:]/,
    contains: [
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      {
        className: 'string',
        // quote with escape, comment as quote
        begin: /"((\\")|[^"\n])*("|\n)/
      },
      {
        className: 'variable',
        begin: /[bwtglsav]:[\w\d_]*/
      },
      {
        className: 'function',
        beginKeywords: 'function function!', end: '$',
        relevance: 0,
        contains: [
          hljs.TITLE_MODE,
          {
            className: 'params',
            begin: '\\(', end: '\\)'
          }
        ]
      }
    ]
  };
});

hljs.registerLanguage('x86asm', function(hljs) {
  return {
    case_insensitive: true,
    lexemes: '[.%]?' + hljs.IDENT_RE,
    keywords: {
      keyword:
        'lock rep repe repz repne repnz xaquire xrelease bnd nobnd ' +
        'aaa aad aam aas adc add and arpl bb0_reset bb1_reset bound bsf bsr bswap bt btc btr bts call cbw cdq cdqe clc cld cli clts cmc cmp cmpsb cmpsd cmpsq cmpsw cmpxchg cmpxchg486 cmpxchg8b cmpxchg16b cpuid cpu_read cpu_write cqo cwd cwde daa das dec div dmint emms enter equ f2xm1 fabs fadd faddp fbld fbstp fchs fclex fcmovb fcmovbe fcmove fcmovnb fcmovnbe fcmovne fcmovnu fcmovu fcom fcomi fcomip fcomp fcompp fcos fdecstp fdisi fdiv fdivp fdivr fdivrp femms feni ffree ffreep fiadd ficom ficomp fidiv fidivr fild fimul fincstp finit fist fistp fisttp fisub fisubr fld fld1 fldcw fldenv fldl2e fldl2t fldlg2 fldln2 fldpi fldz fmul fmulp fnclex fndisi fneni fninit fnop fnsave fnstcw fnstenv fnstsw fpatan fprem fprem1 fptan frndint frstor fsave fscale fsetpm fsin fsincos fsqrt fst fstcw fstenv fstp fstsw fsub fsubp fsubr fsubrp ftst fucom fucomi fucomip fucomp fucompp fxam fxch fxtract fyl2x fyl2xp1 hlt ibts icebp idiv imul in inc incbin insb insd insw int int01 int1 int03 int3 into invd invpcid invlpg invlpga iret iretd iretq iretw jcxz jecxz jrcxz jmp jmpe lahf lar lds lea leave les lfence lfs lgdt lgs lidt lldt lmsw loadall loadall286 lodsb lodsd lodsq lodsw loop loope loopne loopnz loopz lsl lss ltr mfence monitor mov movd movq movsb movsd movsq movsw movsx movsxd movzx mul mwait neg nop not or out outsb outsd outsw packssdw packsswb packuswb paddb paddd paddsb paddsiw paddsw paddusb paddusw paddw pand pandn pause paveb pavgusb pcmpeqb pcmpeqd pcmpeqw pcmpgtb pcmpgtd pcmpgtw pdistib pf2id pfacc pfadd pfcmpeq pfcmpge pfcmpgt pfmax pfmin pfmul pfrcp pfrcpit1 pfrcpit2 pfrsqit1 pfrsqrt pfsub pfsubr pi2fd pmachriw pmaddwd pmagw pmulhriw pmulhrwa pmulhrwc pmulhw pmullw pmvgezb pmvlzb pmvnzb pmvzb pop popa popad popaw popf popfd popfq popfw por prefetch prefetchw pslld psllq psllw psrad psraw psrld psrlq psrlw psubb psubd psubsb psubsiw psubsw psubusb psubusw psubw punpckhbw punpckhdq punpckhwd punpcklbw punpckldq punpcklwd push pusha pushad pushaw pushf pushfd pushfq pushfw pxor rcl rcr rdshr rdmsr rdpmc rdtsc rdtscp ret retf retn rol ror rdm rsdc rsldt rsm rsts sahf sal salc sar sbb scasb scasd scasq scasw sfence sgdt shl shld shr shrd sidt sldt skinit smi smint smintold smsw stc std sti stosb stosd stosq stosw str sub svdc svldt svts swapgs syscall sysenter sysexit sysret test ud0 ud1 ud2b ud2 ud2a umov verr verw fwait wbinvd wrshr wrmsr xadd xbts xchg xlatb xlat xor cmove cmovz cmovne cmovnz cmova cmovnbe cmovae cmovnb cmovb cmovnae cmovbe cmovna cmovg cmovnle cmovge cmovnl cmovl cmovnge cmovle cmovng cmovc cmovnc cmovo cmovno cmovs cmovns cmovp cmovpe cmovnp cmovpo je jz jne jnz ja jnbe jae jnb jb jnae jbe jna jg jnle jge jnl jl jnge jle jng jc jnc jo jno js jns jpo jnp jpe jp sete setz setne setnz seta setnbe setae setnb setnc setb setnae setcset setbe setna setg setnle setge setnl setl setnge setle setng sets setns seto setno setpe setp setpo setnp addps addss andnps andps cmpeqps cmpeqss cmpleps cmpless cmpltps cmpltss cmpneqps cmpneqss cmpnleps cmpnless cmpnltps cmpnltss cmpordps cmpordss cmpunordps cmpunordss cmpps cmpss comiss cvtpi2ps cvtps2pi cvtsi2ss cvtss2si cvttps2pi cvttss2si divps divss ldmxcsr maxps maxss minps minss movaps movhps movlhps movlps movhlps movmskps movntps movss movups mulps mulss orps rcpps rcpss rsqrtps rsqrtss shufps sqrtps sqrtss stmxcsr subps subss ucomiss unpckhps unpcklps xorps fxrstor fxrstor64 fxsave fxsave64 xgetbv xsetbv xsave xsave64 xsaveopt xsaveopt64 xrstor xrstor64 prefetchnta prefetcht0 prefetcht1 prefetcht2 maskmovq movntq pavgb pavgw pextrw pinsrw pmaxsw pmaxub pminsw pminub pmovmskb pmulhuw psadbw pshufw pf2iw pfnacc pfpnacc pi2fw pswapd maskmovdqu clflush movntdq movnti movntpd movdqa movdqu movdq2q movq2dq paddq pmuludq pshufd pshufhw pshuflw pslldq psrldq psubq punpckhqdq punpcklqdq addpd addsd andnpd andpd cmpeqpd cmpeqsd cmplepd cmplesd cmpltpd cmpltsd cmpneqpd cmpneqsd cmpnlepd cmpnlesd cmpnltpd cmpnltsd cmpordpd cmpordsd cmpunordpd cmpunordsd cmppd comisd cvtdq2pd cvtdq2ps cvtpd2dq cvtpd2pi cvtpd2ps cvtpi2pd cvtps2dq cvtps2pd cvtsd2si cvtsd2ss cvtsi2sd cvtss2sd cvttpd2pi cvttpd2dq cvttps2dq cvttsd2si divpd divsd maxpd maxsd minpd minsd movapd movhpd movlpd movmskpd movupd mulpd mulsd orpd shufpd sqrtpd sqrtsd subpd subsd ucomisd unpckhpd unpcklpd xorpd addsubpd addsubps haddpd haddps hsubpd hsubps lddqu movddup movshdup movsldup clgi stgi vmcall vmclear vmfunc vmlaunch vmload vmmcall vmptrld vmptrst vmread vmresume vmrun vmsave vmwrite vmxoff vmxon invept invvpid pabsb pabsw pabsd palignr phaddw phaddd phaddsw phsubw phsubd phsubsw pmaddubsw pmulhrsw pshufb psignb psignw psignd extrq insertq movntsd movntss lzcnt blendpd blendps blendvpd blendvps dppd dpps extractps insertps movntdqa mpsadbw packusdw pblendvb pblendw pcmpeqq pextrb pextrd pextrq phminposuw pinsrb pinsrd pinsrq pmaxsb pmaxsd pmaxud pmaxuw pminsb pminsd pminud pminuw pmovsxbw pmovsxbd pmovsxbq pmovsxwd pmovsxwq pmovsxdq pmovzxbw pmovzxbd pmovzxbq pmovzxwd pmovzxwq pmovzxdq pmuldq pmulld ptest roundpd roundps roundsd roundss crc32 pcmpestri pcmpestrm pcmpistri pcmpistrm pcmpgtq popcnt getsec pfrcpv pfrsqrtv movbe aesenc aesenclast aesdec aesdeclast aesimc aeskeygenassist vaesenc vaesenclast vaesdec vaesdeclast vaesimc vaeskeygenassist vaddpd vaddps vaddsd vaddss vaddsubpd vaddsubps vandpd vandps vandnpd vandnps vblendpd vblendps vblendvpd vblendvps vbroadcastss vbroadcastsd vbroadcastf128 vcmpeq_ospd vcmpeqpd vcmplt_ospd vcmpltpd vcmple_ospd vcmplepd vcmpunord_qpd vcmpunordpd vcmpneq_uqpd vcmpneqpd vcmpnlt_uspd vcmpnltpd vcmpnle_uspd vcmpnlepd vcmpord_qpd vcmpordpd vcmpeq_uqpd vcmpnge_uspd vcmpngepd vcmpngt_uspd vcmpngtpd vcmpfalse_oqpd vcmpfalsepd vcmpneq_oqpd vcmpge_ospd vcmpgepd vcmpgt_ospd vcmpgtpd vcmptrue_uqpd vcmptruepd vcmplt_oqpd vcmple_oqpd vcmpunord_spd vcmpneq_uspd vcmpnlt_uqpd vcmpnle_uqpd vcmpord_spd vcmpeq_uspd vcmpnge_uqpd vcmpngt_uqpd vcmpfalse_ospd vcmpneq_ospd vcmpge_oqpd vcmpgt_oqpd vcmptrue_uspd vcmppd vcmpeq_osps vcmpeqps vcmplt_osps vcmpltps vcmple_osps vcmpleps vcmpunord_qps vcmpunordps vcmpneq_uqps vcmpneqps vcmpnlt_usps vcmpnltps vcmpnle_usps vcmpnleps vcmpord_qps vcmpordps vcmpeq_uqps vcmpnge_usps vcmpngeps vcmpngt_usps vcmpngtps vcmpfalse_oqps vcmpfalseps vcmpneq_oqps vcmpge_osps vcmpgeps vcmpgt_osps vcmpgtps vcmptrue_uqps vcmptrueps vcmplt_oqps vcmple_oqps vcmpunord_sps vcmpneq_usps vcmpnlt_uqps vcmpnle_uqps vcmpord_sps vcmpeq_usps vcmpnge_uqps vcmpngt_uqps vcmpfalse_osps vcmpneq_osps vcmpge_oqps vcmpgt_oqps vcmptrue_usps vcmpps vcmpeq_ossd vcmpeqsd vcmplt_ossd vcmpltsd vcmple_ossd vcmplesd vcmpunord_qsd vcmpunordsd vcmpneq_uqsd vcmpneqsd vcmpnlt_ussd vcmpnltsd vcmpnle_ussd vcmpnlesd vcmpord_qsd vcmpordsd vcmpeq_uqsd vcmpnge_ussd vcmpngesd vcmpngt_ussd vcmpngtsd vcmpfalse_oqsd vcmpfalsesd vcmpneq_oqsd vcmpge_ossd vcmpgesd vcmpgt_ossd vcmpgtsd vcmptrue_uqsd vcmptruesd vcmplt_oqsd vcmple_oqsd vcmpunord_ssd vcmpneq_ussd vcmpnlt_uqsd vcmpnle_uqsd vcmpord_ssd vcmpeq_ussd vcmpnge_uqsd vcmpngt_uqsd vcmpfalse_ossd vcmpneq_ossd vcmpge_oqsd vcmpgt_oqsd vcmptrue_ussd vcmpsd vcmpeq_osss vcmpeqss vcmplt_osss vcmpltss vcmple_osss vcmpless vcmpunord_qss vcmpunordss vcmpneq_uqss vcmpneqss vcmpnlt_usss vcmpnltss vcmpnle_usss vcmpnless vcmpord_qss vcmpordss vcmpeq_uqss vcmpnge_usss vcmpngess vcmpngt_usss vcmpngtss vcmpfalse_oqss vcmpfalsess vcmpneq_oqss vcmpge_osss vcmpgess vcmpgt_osss vcmpgtss vcmptrue_uqss vcmptruess vcmplt_oqss vcmple_oqss vcmpunord_sss vcmpneq_usss vcmpnlt_uqss vcmpnle_uqss vcmpord_sss vcmpeq_usss vcmpnge_uqss vcmpngt_uqss vcmpfalse_osss vcmpneq_osss vcmpge_oqss vcmpgt_oqss vcmptrue_usss vcmpss vcomisd vcomiss vcvtdq2pd vcvtdq2ps vcvtpd2dq vcvtpd2ps vcvtps2dq vcvtps2pd vcvtsd2si vcvtsd2ss vcvtsi2sd vcvtsi2ss vcvtss2sd vcvtss2si vcvttpd2dq vcvttps2dq vcvttsd2si vcvttss2si vdivpd vdivps vdivsd vdivss vdppd vdpps vextractf128 vextractps vhaddpd vhaddps vhsubpd vhsubps vinsertf128 vinsertps vlddqu vldqqu vldmxcsr vmaskmovdqu vmaskmovps vmaskmovpd vmaxpd vmaxps vmaxsd vmaxss vminpd vminps vminsd vminss vmovapd vmovaps vmovd vmovq vmovddup vmovdqa vmovqqa vmovdqu vmovqqu vmovhlps vmovhpd vmovhps vmovlhps vmovlpd vmovlps vmovmskpd vmovmskps vmovntdq vmovntqq vmovntdqa vmovntpd vmovntps vmovsd vmovshdup vmovsldup vmovss vmovupd vmovups vmpsadbw vmulpd vmulps vmulsd vmulss vorpd vorps vpabsb vpabsw vpabsd vpacksswb vpackssdw vpackuswb vpackusdw vpaddb vpaddw vpaddd vpaddq vpaddsb vpaddsw vpaddusb vpaddusw vpalignr vpand vpandn vpavgb vpavgw vpblendvb vpblendw vpcmpestri vpcmpestrm vpcmpistri vpcmpistrm vpcmpeqb vpcmpeqw vpcmpeqd vpcmpeqq vpcmpgtb vpcmpgtw vpcmpgtd vpcmpgtq vpermilpd vpermilps vperm2f128 vpextrb vpextrw vpextrd vpextrq vphaddw vphaddd vphaddsw vphminposuw vphsubw vphsubd vphsubsw vpinsrb vpinsrw vpinsrd vpinsrq vpmaddwd vpmaddubsw vpmaxsb vpmaxsw vpmaxsd vpmaxub vpmaxuw vpmaxud vpminsb vpminsw vpminsd vpminub vpminuw vpminud vpmovmskb vpmovsxbw vpmovsxbd vpmovsxbq vpmovsxwd vpmovsxwq vpmovsxdq vpmovzxbw vpmovzxbd vpmovzxbq vpmovzxwd vpmovzxwq vpmovzxdq vpmulhuw vpmulhrsw vpmulhw vpmullw vpmulld vpmuludq vpmuldq vpor vpsadbw vpshufb vpshufd vpshufhw vpshuflw vpsignb vpsignw vpsignd vpslldq vpsrldq vpsllw vpslld vpsllq vpsraw vpsrad vpsrlw vpsrld vpsrlq vptest vpsubb vpsubw vpsubd vpsubq vpsubsb vpsubsw vpsubusb vpsubusw vpunpckhbw vpunpckhwd vpunpckhdq vpunpckhqdq vpunpcklbw vpunpcklwd vpunpckldq vpunpcklqdq vpxor vrcpps vrcpss vrsqrtps vrsqrtss vroundpd vroundps vroundsd vroundss vshufpd vshufps vsqrtpd vsqrtps vsqrtsd vsqrtss vstmxcsr vsubpd vsubps vsubsd vsubss vtestps vtestpd vucomisd vucomiss vunpckhpd vunpckhps vunpcklpd vunpcklps vxorpd vxorps vzeroall vzeroupper pclmullqlqdq pclmulhqlqdq pclmullqhqdq pclmulhqhqdq pclmulqdq vpclmullqlqdq vpclmulhqlqdq vpclmullqhqdq vpclmulhqhqdq vpclmulqdq vfmadd132ps vfmadd132pd vfmadd312ps vfmadd312pd vfmadd213ps vfmadd213pd vfmadd123ps vfmadd123pd vfmadd231ps vfmadd231pd vfmadd321ps vfmadd321pd vfmaddsub132ps vfmaddsub132pd vfmaddsub312ps vfmaddsub312pd vfmaddsub213ps vfmaddsub213pd vfmaddsub123ps vfmaddsub123pd vfmaddsub231ps vfmaddsub231pd vfmaddsub321ps vfmaddsub321pd vfmsub132ps vfmsub132pd vfmsub312ps vfmsub312pd vfmsub213ps vfmsub213pd vfmsub123ps vfmsub123pd vfmsub231ps vfmsub231pd vfmsub321ps vfmsub321pd vfmsubadd132ps vfmsubadd132pd vfmsubadd312ps vfmsubadd312pd vfmsubadd213ps vfmsubadd213pd vfmsubadd123ps vfmsubadd123pd vfmsubadd231ps vfmsubadd231pd vfmsubadd321ps vfmsubadd321pd vfnmadd132ps vfnmadd132pd vfnmadd312ps vfnmadd312pd vfnmadd213ps vfnmadd213pd vfnmadd123ps vfnmadd123pd vfnmadd231ps vfnmadd231pd vfnmadd321ps vfnmadd321pd vfnmsub132ps vfnmsub132pd vfnmsub312ps vfnmsub312pd vfnmsub213ps vfnmsub213pd vfnmsub123ps vfnmsub123pd vfnmsub231ps vfnmsub231pd vfnmsub321ps vfnmsub321pd vfmadd132ss vfmadd132sd vfmadd312ss vfmadd312sd vfmadd213ss vfmadd213sd vfmadd123ss vfmadd123sd vfmadd231ss vfmadd231sd vfmadd321ss vfmadd321sd vfmsub132ss vfmsub132sd vfmsub312ss vfmsub312sd vfmsub213ss vfmsub213sd vfmsub123ss vfmsub123sd vfmsub231ss vfmsub231sd vfmsub321ss vfmsub321sd vfnmadd132ss vfnmadd132sd vfnmadd312ss vfnmadd312sd vfnmadd213ss vfnmadd213sd vfnmadd123ss vfnmadd123sd vfnmadd231ss vfnmadd231sd vfnmadd321ss vfnmadd321sd vfnmsub132ss vfnmsub132sd vfnmsub312ss vfnmsub312sd vfnmsub213ss vfnmsub213sd vfnmsub123ss vfnmsub123sd vfnmsub231ss vfnmsub231sd vfnmsub321ss vfnmsub321sd rdfsbase rdgsbase rdrand wrfsbase wrgsbase vcvtph2ps vcvtps2ph adcx adox rdseed clac stac xstore xcryptecb xcryptcbc xcryptctr xcryptcfb xcryptofb montmul xsha1 xsha256 llwpcb slwpcb lwpval lwpins vfmaddpd vfmaddps vfmaddsd vfmaddss vfmaddsubpd vfmaddsubps vfmsubaddpd vfmsubaddps vfmsubpd vfmsubps vfmsubsd vfmsubss vfnmaddpd vfnmaddps vfnmaddsd vfnmaddss vfnmsubpd vfnmsubps vfnmsubsd vfnmsubss vfrczpd vfrczps vfrczsd vfrczss vpcmov vpcomb vpcomd vpcomq vpcomub vpcomud vpcomuq vpcomuw vpcomw vphaddbd vphaddbq vphaddbw vphadddq vphaddubd vphaddubq vphaddubw vphaddudq vphadduwd vphadduwq vphaddwd vphaddwq vphsubbw vphsubdq vphsubwd vpmacsdd vpmacsdqh vpmacsdql vpmacssdd vpmacssdqh vpmacssdql vpmacsswd vpmacssww vpmacswd vpmacsww vpmadcsswd vpmadcswd vpperm vprotb vprotd vprotq vprotw vpshab vpshad vpshaq vpshaw vpshlb vpshld vpshlq vpshlw vbroadcasti128 vpblendd vpbroadcastb vpbroadcastw vpbroadcastd vpbroadcastq vpermd vpermpd vpermps vpermq vperm2i128 vextracti128 vinserti128 vpmaskmovd vpmaskmovq vpsllvd vpsllvq vpsravd vpsrlvd vpsrlvq vgatherdpd vgatherqpd vgatherdps vgatherqps vpgatherdd vpgatherqd vpgatherdq vpgatherqq xabort xbegin xend xtest andn bextr blci blcic blsi blsic blcfill blsfill blcmsk blsmsk blsr blcs bzhi mulx pdep pext rorx sarx shlx shrx tzcnt tzmsk t1mskc valignd valignq vblendmpd vblendmps vbroadcastf32x4 vbroadcastf64x4 vbroadcasti32x4 vbroadcasti64x4 vcompresspd vcompressps vcvtpd2udq vcvtps2udq vcvtsd2usi vcvtss2usi vcvttpd2udq vcvttps2udq vcvttsd2usi vcvttss2usi vcvtudq2pd vcvtudq2ps vcvtusi2sd vcvtusi2ss vexpandpd vexpandps vextractf32x4 vextractf64x4 vextracti32x4 vextracti64x4 vfixupimmpd vfixupimmps vfixupimmsd vfixupimmss vgetexppd vgetexpps vgetexpsd vgetexpss vgetmantpd vgetmantps vgetmantsd vgetmantss vinsertf32x4 vinsertf64x4 vinserti32x4 vinserti64x4 vmovdqa32 vmovdqa64 vmovdqu32 vmovdqu64 vpabsq vpandd vpandnd vpandnq vpandq vpblendmd vpblendmq vpcmpltd vpcmpled vpcmpneqd vpcmpnltd vpcmpnled vpcmpd vpcmpltq vpcmpleq vpcmpneqq vpcmpnltq vpcmpnleq vpcmpq vpcmpequd vpcmpltud vpcmpleud vpcmpnequd vpcmpnltud vpcmpnleud vpcmpud vpcmpequq vpcmpltuq vpcmpleuq vpcmpnequq vpcmpnltuq vpcmpnleuq vpcmpuq vpcompressd vpcompressq vpermi2d vpermi2pd vpermi2ps vpermi2q vpermt2d vpermt2pd vpermt2ps vpermt2q vpexpandd vpexpandq vpmaxsq vpmaxuq vpminsq vpminuq vpmovdb vpmovdw vpmovqb vpmovqd vpmovqw vpmovsdb vpmovsdw vpmovsqb vpmovsqd vpmovsqw vpmovusdb vpmovusdw vpmovusqb vpmovusqd vpmovusqw vpord vporq vprold vprolq vprolvd vprolvq vprord vprorq vprorvd vprorvq vpscatterdd vpscatterdq vpscatterqd vpscatterqq vpsraq vpsravq vpternlogd vpternlogq vptestmd vptestmq vptestnmd vptestnmq vpxord vpxorq vrcp14pd vrcp14ps vrcp14sd vrcp14ss vrndscalepd vrndscaleps vrndscalesd vrndscaless vrsqrt14pd vrsqrt14ps vrsqrt14sd vrsqrt14ss vscalefpd vscalefps vscalefsd vscalefss vscatterdpd vscatterdps vscatterqpd vscatterqps vshuff32x4 vshuff64x2 vshufi32x4 vshufi64x2 kandnw kandw kmovw knotw kortestw korw kshiftlw kshiftrw kunpckbw kxnorw kxorw vpbroadcastmb2q vpbroadcastmw2d vpconflictd vpconflictq vplzcntd vplzcntq vexp2pd vexp2ps vrcp28pd vrcp28ps vrcp28sd vrcp28ss vrsqrt28pd vrsqrt28ps vrsqrt28sd vrsqrt28ss vgatherpf0dpd vgatherpf0dps vgatherpf0qpd vgatherpf0qps vgatherpf1dpd vgatherpf1dps vgatherpf1qpd vgatherpf1qps vscatterpf0dpd vscatterpf0dps vscatterpf0qpd vscatterpf0qps vscatterpf1dpd vscatterpf1dps vscatterpf1qpd vscatterpf1qps prefetchwt1 bndmk bndcl bndcu bndcn bndmov bndldx bndstx sha1rnds4 sha1nexte sha1msg1 sha1msg2 sha256rnds2 sha256msg1 sha256msg2 hint_nop0 hint_nop1 hint_nop2 hint_nop3 hint_nop4 hint_nop5 hint_nop6 hint_nop7 hint_nop8 hint_nop9 hint_nop10 hint_nop11 hint_nop12 hint_nop13 hint_nop14 hint_nop15 hint_nop16 hint_nop17 hint_nop18 hint_nop19 hint_nop20 hint_nop21 hint_nop22 hint_nop23 hint_nop24 hint_nop25 hint_nop26 hint_nop27 hint_nop28 hint_nop29 hint_nop30 hint_nop31 hint_nop32 hint_nop33 hint_nop34 hint_nop35 hint_nop36 hint_nop37 hint_nop38 hint_nop39 hint_nop40 hint_nop41 hint_nop42 hint_nop43 hint_nop44 hint_nop45 hint_nop46 hint_nop47 hint_nop48 hint_nop49 hint_nop50 hint_nop51 hint_nop52 hint_nop53 hint_nop54 hint_nop55 hint_nop56 hint_nop57 hint_nop58 hint_nop59 hint_nop60 hint_nop61 hint_nop62 hint_nop63',
      built_in:
        // Instruction pointer
        'ip eip rip ' +
        // 8-bit registers
        'al ah bl bh cl ch dl dh sil dil bpl spl r8b r9b r10b r11b r12b r13b r14b r15b ' +
        // 16-bit registers
        'ax bx cx dx si di bp sp r8w r9w r10w r11w r12w r13w r14w r15w ' +
        // 32-bit registers
        'eax ebx ecx edx esi edi ebp esp eip r8d r9d r10d r11d r12d r13d r14d r15d ' +
        // 64-bit registers
        'rax rbx rcx rdx rsi rdi rbp rsp r8 r9 r10 r11 r12 r13 r14 r15 ' +
        // Segment registers
        'cs ds es fs gs ss ' +
        // Floating point stack registers
        'st st0 st1 st2 st3 st4 st5 st6 st7 ' +
        // MMX Registers
        'mm0 mm1 mm2 mm3 mm4 mm5 mm6 mm7 ' +
        // SSE registers
        'xmm0  xmm1  xmm2  xmm3  xmm4  xmm5  xmm6  xmm7  xmm8  xmm9 xmm10  xmm11 xmm12 xmm13 xmm14 xmm15 ' +
        'xmm16 xmm17 xmm18 xmm19 xmm20 xmm21 xmm22 xmm23 xmm24 xmm25 xmm26 xmm27 xmm28 xmm29 xmm30 xmm31 ' +
        // AVX registers
        'ymm0  ymm1  ymm2  ymm3  ymm4  ymm5  ymm6  ymm7  ymm8  ymm9 ymm10  ymm11 ymm12 ymm13 ymm14 ymm15 ' +
        'ymm16 ymm17 ymm18 ymm19 ymm20 ymm21 ymm22 ymm23 ymm24 ymm25 ymm26 ymm27 ymm28 ymm29 ymm30 ymm31 ' +
        // AVX-512F registers
        'zmm0  zmm1  zmm2  zmm3  zmm4  zmm5  zmm6  zmm7  zmm8  zmm9 zmm10  zmm11 zmm12 zmm13 zmm14 zmm15 ' +
        'zmm16 zmm17 zmm18 zmm19 zmm20 zmm21 zmm22 zmm23 zmm24 zmm25 zmm26 zmm27 zmm28 zmm29 zmm30 zmm31 ' +
        // AVX-512F mask registers
        'k0 k1 k2 k3 k4 k5 k6 k7 ' +
        // Bound (MPX) register
        'bnd0 bnd1 bnd2 bnd3 ' +
        // Special register
        'cr0 cr1 cr2 cr3 cr4 cr8 dr0 dr1 dr2 dr3 dr8 tr3 tr4 tr5 tr6 tr7 ' +
        // NASM altreg package
        'r0 r1 r2 r3 r4 r5 r6 r7 r0b r1b r2b r3b r4b r5b r6b r7b ' +
        'r0w r1w r2w r3w r4w r5w r6w r7w r0d r1d r2d r3d r4d r5d r6d r7d ' +
        'r0h r1h r2h r3h ' +
        'r0l r1l r2l r3l r4l r5l r6l r7l r8l r9l r10l r11l r12l r13l r14l r15l ' +

        'db dw dd dq dt ddq do dy dz ' +
        'resb resw resd resq rest resdq reso resy resz ' +
        'incbin equ times ' +
        'byte word dword qword nosplit rel abs seg wrt strict near far a32 ptr',

      meta:
        '%define %xdefine %+ %undef %defstr %deftok %assign %strcat %strlen %substr %rotate %elif %else %endif ' +
        '%if %ifmacro %ifctx %ifidn %ifidni %ifid %ifnum %ifstr %iftoken %ifempty %ifenv %error %warning %fatal %rep ' +
        '%endrep %include %push %pop %repl %pathsearch %depend %use %arg %stacksize %local %line %comment %endcomment ' +
        '.nolist ' +
        '__FILE__ __LINE__ __SECT__  __BITS__ __OUTPUT_FORMAT__ __DATE__ __TIME__ __DATE_NUM__ __TIME_NUM__ ' +
        '__UTC_DATE__ __UTC_TIME__ __UTC_DATE_NUM__ __UTC_TIME_NUM__  __PASS__ struc endstruc istruc at iend ' +
        'align alignb sectalign daz nodaz up down zero default option assume public ' +

        'bits use16 use32 use64 default section segment absolute extern global common cpu float ' +
        '__utf16__ __utf16le__ __utf16be__ __utf32__ __utf32le__ __utf32be__ ' +
        '__float8__ __float16__ __float32__ __float64__ __float80m__ __float80e__ __float128l__ __float128h__ ' +
        '__Infinity__ __QNaN__ __SNaN__ Inf NaN QNaN SNaN float8 float16 float32 float64 float80m float80e ' +
        'float128l float128h __FLOAT_DAZ__ __FLOAT_ROUND__ __FLOAT__'
    },
    contains: [
      hljs.COMMENT(
        ';',
        '$',
        {
          relevance: 0
        }
      ),
      {
        className: 'number',
        variants: [
          // Float number and x87 BCD
          {
            begin: '\\b(?:([0-9][0-9_]*)?\\.[0-9_]*(?:[eE][+-]?[0-9_]+)?|' +
                   '(0[Xx])?[0-9][0-9_]*\\.?[0-9_]*(?:[pP](?:[+-]?[0-9_]+)?)?)\\b',
            relevance: 0
          },

          // Hex number in $
          { begin: '\\$[0-9][0-9A-Fa-f]*', relevance: 0 },

          // Number in H,D,T,Q,O,B,Y suffix
          { begin: '\\b(?:[0-9A-Fa-f][0-9A-Fa-f_]*[Hh]|[0-9][0-9_]*[DdTt]?|[0-7][0-7_]*[QqOo]|[0-1][0-1_]*[BbYy])\\b' },

          // Number in X,D,T,Q,O,B,Y prefix
          { begin: '\\b(?:0[Xx][0-9A-Fa-f_]+|0[DdTt][0-9_]+|0[QqOo][0-7_]+|0[BbYy][0-1_]+)\\b'}
        ]
      },
      // Double quote string
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        variants: [
          // Single-quoted string
          { begin: '\'', end: '[^\\\\]\'' },
          // Backquoted string
          { begin: '`', end: '[^\\\\]`' },
          // Section name
          { begin: '\\.[A-Za-z0-9]+' }
        ],
        relevance: 0
      },
      {
        className: 'symbol',
        variants: [
          // Global label and local label
          { begin: '^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)' },
          // Macro-local label
          { begin: '^\\s*%%[A-Za-z0-9_$#@~.?]*:' }
        ],
        relevance: 0
      },
      // Macro parameter
      {
        className: 'subst',
        begin: '%[0-9]+',
        relevance: 0
      },
      // Macro parameter
      {
        className: 'subst',
        begin: '%!\S+',
        relevance: 0
      }
    ]
  };
});

hljs.registerLanguage('xl', function(hljs) {
  var BUILTIN_MODULES =
    'ObjectLoader Animate MovieCredits Slides Filters Shading Materials LensFlare Mapping VLCAudioVideo ' +
    'StereoDecoder PointCloud NetworkAccess RemoteControl RegExp ChromaKey Snowfall NodeJS Speech Charts';

  var XL_KEYWORDS = {
    keyword:
      'if then else do while until for loop import with is as where when by data constant ' +
      'integer real text name boolean symbol infix prefix postfix block tree',
    literal:
      'true false nil',
    built_in:
      'in mod rem and or xor not abs sign floor ceil sqrt sin cos tan asin ' +
      'acos atan exp expm1 log log2 log10 log1p pi at text_length text_range ' +
      'text_find text_replace contains page slide basic_slide title_slide ' +
      'title subtitle fade_in fade_out fade_at clear_color color line_color ' +
      'line_width texture_wrap texture_transform texture scale_?x scale_?y ' +
      'scale_?z? translate_?x translate_?y translate_?z? rotate_?x rotate_?y ' +
      'rotate_?z? rectangle circle ellipse sphere path line_to move_to ' +
      'quad_to curve_to theme background contents locally time mouse_?x ' +
      'mouse_?y mouse_buttons ' +
      BUILTIN_MODULES
  };

  var DOUBLE_QUOTE_TEXT = {
    className: 'string',
    begin: '"', end: '"', illegal: '\\n'
  };
  var SINGLE_QUOTE_TEXT = {
    className: 'string',
    begin: '\'', end: '\'', illegal: '\\n'
  };
  var LONG_TEXT = {
    className: 'string',
    begin: '<<', end: '>>'
  };
  var BASED_NUMBER = {
    className: 'number',
    begin: '[0-9]+#[0-9A-Z_]+(\\.[0-9-A-Z_]+)?#?([Ee][+-]?[0-9]+)?'
  };
  var IMPORT = {
    beginKeywords: 'import', end: '$',
    keywords: XL_KEYWORDS,
    contains: [DOUBLE_QUOTE_TEXT]
  };
  var FUNCTION_DEFINITION = {
    className: 'function',
    begin: /[a-z][^\n]*->/, returnBegin: true, end: /->/,
    contains: [
      hljs.inherit(hljs.TITLE_MODE, {starts: {
        endsWithParent: true,
        keywords: XL_KEYWORDS
      }})
    ]
  };
  return {
    aliases: ['tao'],
    lexemes: /[a-zA-Z][a-zA-Z0-9_?]*/,
    keywords: XL_KEYWORDS,
    contains: [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    DOUBLE_QUOTE_TEXT,
    SINGLE_QUOTE_TEXT,
    LONG_TEXT,
    FUNCTION_DEFINITION,
    IMPORT,
    BASED_NUMBER,
    hljs.NUMBER_MODE
    ]
  };
});

hljs.registerLanguage('xquery', function(hljs) {
  var KEYWORDS = 'for let if while then else return where group by xquery encoding version' +
    'module namespace boundary-space preserve strip default collation base-uri ordering' +
    'copy-namespaces order declare import schema namespace function option in allowing empty' +
    'at tumbling window sliding window start when only end when previous next stable ascending' +
    'descending empty greatest least some every satisfies switch case typeswitch try catch and' +
    'or to union intersect instance of treat as castable cast map array delete insert into' +
    'replace value rename copy modify update';
  var LITERAL = 'false true xs:string xs:integer element item xs:date xs:datetime xs:float xs:double xs:decimal QName xs:anyURI xs:long xs:int xs:short xs:byte attribute';
  var VAR = {
    begin: /\$[a-zA-Z0-9\-]+/,
    relevance: 5
  };

  var NUMBER = {
    className: 'number',
    begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
    relevance: 0
  };

  var STRING = {
    className: 'string',
    variants: [
      {begin: /"/, end: /"/, contains: [{begin: /""/, relevance: 0}]},
      {begin: /'/, end: /'/, contains: [{begin: /''/, relevance: 0}]}
    ]
  };

  var ANNOTATION = {
    className: 'meta',
    begin: '%\\w+'
  };

  var COMMENT = {
    className: 'comment',
    begin: '\\(:', end: ':\\)',
    relevance: 10,
    contains: [
      {
        className: 'doctag', begin: '@\\w+'
      }
    ]
  };

  var METHOD = {
    begin: '{', end: '}'
  };

  var CONTAINS = [
    VAR,
    STRING,
    NUMBER,
    COMMENT,
    ANNOTATION,
    METHOD
  ];
  METHOD.contains = CONTAINS;


  return {
    aliases: ['xpath', 'xq'],
    case_insensitive: false,
    lexemes: /[a-zA-Z\$][a-zA-Z0-9_:\-]*/,
    illegal: /(proc)|(abstract)|(extends)|(until)|(#)/,
    keywords: {
      keyword: KEYWORDS,
      literal: LITERAL
    },
    contains: CONTAINS
  };
});

hljs.registerLanguage('yaml', function(hljs) {
  var LITERALS = {literal: '{ } true false yes no Yes No True False null'};

  var keyPrefix = '^[ \\-]*';
  var keyName =  '[a-zA-Z_][\\w\\-]*';
  var KEY = {
    className: 'attr',
    variants: [
      { begin: keyPrefix + keyName + ":"},
      { begin: keyPrefix + '"' + keyName + '"' + ":"},
      { begin: keyPrefix + "'" + keyName + "'" + ":"}
    ]
  };

  var TEMPLATE_VARIABLES = {
    className: 'template-variable',
    variants: [
      { begin: '\{\{', end: '\}\}' }, // jinja templates Ansible
      { begin: '%\{', end: '\}' } // Ruby i18n
    ]
  };
  var STRING = {
    className: 'string',
    relevance: 0,
    variants: [
      {begin: /'/, end: /'/},
      {begin: /"/, end: /"/}
    ],
    contains: [
      hljs.BACKSLASH_ESCAPE,
      TEMPLATE_VARIABLES
    ]
  };

  return {
    case_insensitive: true,
    aliases: ['yml', 'YAML', 'yaml'],
    contains: [
      KEY,
      {
        className: 'meta',
        begin: '^---\s*$',
        relevance: 10
      },
      { // multi line string
        className: 'string',
        begin: '[\\|>] *$',
        returnEnd: true,
        contains: STRING.contains,
        // very simple termination: next hash key
        end: KEY.variants[0].begin
      },
      { // Ruby/Rails erb
        begin: '<%[%=-]?', end: '[%-]?%>',
        subLanguage: 'ruby',
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0
      },
      { // data type
        className: 'type',
        begin: '!!' + hljs.UNDERSCORE_IDENT_RE,
      },
      { // fragment id &ref
        className: 'meta',
        begin: '&' + hljs.UNDERSCORE_IDENT_RE + '$',
      },
      { // fragment reference *ref
        className: 'meta',
        begin: '\\*' + hljs.UNDERSCORE_IDENT_RE + '$'
      },
      { // array listing
        className: 'bullet',
        begin: '^ *-',
        relevance: 0
      },
      STRING,
      hljs.HASH_COMMENT_MODE,
      hljs.C_NUMBER_MODE
    ],
    keywords: LITERALS
  };
});

hljs.registerLanguage('zephir', function(hljs) {
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: 'b"', end: '"'
      },
      {
        begin: 'b\'', end: '\''
      },
      hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null})
    ]
  };
  var NUMBER = {variants: [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE]};
  return {
    aliases: ['zep'],
    case_insensitive: true,
    keywords:
      'and include_once list abstract global private echo interface as static endswitch ' +
      'array null if endwhile or const for endforeach self var let while isset public ' +
      'protected exit foreach throw elseif include __FILE__ empty require_once do xor ' +
      'return parent clone use __CLASS__ __LINE__ else break print eval new ' +
      'catch __METHOD__ case exception default die require __FUNCTION__ ' +
      'enddeclare final try switch continue endfor endif declare unset true false ' +
      'trait goto instanceof insteadof __DIR__ __NAMESPACE__ ' +
      'yield finally int uint long ulong char uchar double float bool boolean string' +
      'likely unlikely',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.HASH_COMMENT_MODE,
      hljs.COMMENT(
        '/\\*',
        '\\*/',
        {
          contains: [
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            }
          ]
        }
      ),
      hljs.COMMENT(
        '__halt_compiler.+?;',
        false,
        {
          endsWithParent: true,
          keywords: '__halt_compiler',
          lexemes: hljs.UNDERSCORE_IDENT_RE
        }
      ),
      {
        className: 'string',
        begin: '<<<[\'"]?\\w+[\'"]?$', end: '^\\w+;',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        // swallow composed identifiers to avoid parsing them as keywords
        begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
      },
      {
        className: 'function',
        beginKeywords: 'function', end: /[;{]/, excludeEnd: true,
        illegal: '\\$|\\[|%',
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: 'params',
            begin: '\\(', end: '\\)',
            contains: [
              'self',
              hljs.C_BLOCK_COMMENT_MODE,
              STRING,
              NUMBER
            ]
          }
        ]
      },
      {
        className: 'class',
        beginKeywords: 'class interface', end: '{', excludeEnd: true,
        illegal: /[:\(\$"]/,
        contains: [
          {beginKeywords: 'extends implements'},
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        beginKeywords: 'namespace', end: ';',
        illegal: /[\.']/,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        beginKeywords: 'use', end: ';',
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        begin: '=>' // No markup, just a relevance booster
      },
      STRING,
      NUMBER
    ]
  };
});

  return hljs;
}));

$(function() {
  var url = window.location.pathname.replace(/\/$/, '');
  $('#navigation a').each(function(){
    var href= $(this).attr('href');
    if (href != '/') {
      var match = new RegExp("^"+ href.replace(/\/$/, ''), 'i');
      if (match.test(url)) {
        $(this).addClass('active');
      }
    }
    else {
      if (url == '') $(this).addClass('active');
    }
  });
});

hljs.initHighlightingOnLoad();

$(function() {
  $(document).keyup(function(e) {
    if (e.keyCode == 27) { hideModal(); }
  });

  $('#modal .close').click(hideModal);

  function showModal() {
    $('body').addClass('modal');
  }

  function hideModal() {
    $('body').removeClass('modal');
  }
});

$(function() {
  $('#content .toggle').click(function () {
    if ($('body').hasClass('collapsed')) {
      $('body').removeClass('collapsed');
    }
    else {
      $('body').addClass('collapsed');
    }
  });
});
