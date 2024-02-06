/***************************************************
	제작 : 최영규 (hooriza.spam@gmail.com)
           http://hooriza.com/

		   소스 무단 수정 또는 재배포 일단 금지
***************************************************/

var DUMMYOBJ;
var DUMMYANC;

var LEFT = 0;
var RIGHT = 1;
var TOP = 2;
var BOTTOM = 4;

var startTime = getMicroTime(); // dummy.getMinutes() * 60000 + dummy.getSeconds() * 1000 + dummy.getMilliseconds()

/*******************************
	문자열 관련 함수
*******************************/

function isEmpty(str)
{
	for (var i = 0; i < str.length; i++)
		if (str.substring(i, i+1) != " ")
			return false;

	return true;
}

function stringLength(str)
{
	char_cnt = 0;

	for (var i = 0; i < str.length; i++)
	{
		var chr = str.substr(i,1);
		chr = escape(chr);
		key_eg = chr.charAt(1);

		switch(key_eg)
		{
		case "u":
			key_num = chr.substr(2,(chr.length - 1));
			/*
				if ((key_num < "AC00") || (key_num > "D7A3"))
					return -1;
				else
			*/
			char_cnt += 2;
			break;
		case "B":
			char_cnt += 2;
			break;
		default:
			char_cnt += 1;
		}
	}

	return char_cnt;
}

function haveFinalConsonant(str)
{
	if (!str) return false;

	var datas = "가나다라마바사아자차카타파하";

	var first, last;
	var code = str.charCodeAt(str.length - 1);

	for (var i = 0; i < datas.length; i++)
	{
		first = datas.charCodeAt(i);
		last = first + 560;

		if (code >= first && code <= last && (code - first) % 14 == 0)
			return false;
	}

	return true;
}

function addPost(str, what)
{
	var case1, case2;

	switch(what)
	{
	case "를":
	case "을":
		case1 = "를";
		case2 = "을";
		break;

	case "가":
	case "이":
		case1 = "가";
		case2 = "이";
		break;

	case "는":
	case "은":
		case1 = "는";
		case2 = "은";
		break;

	case "와":
	case "과":
		case1 = "와";
		case2 = "과";
		break;

	default:
		case1 = case2 = what;
	}
		
	if (haveFinalConsonant(str))
		return str+case2;
	else
		return str+case1;
}

/*******************************
	숫자 관련 함수
*******************************/

function isNumber(num)
{
	return !isNaN (num);
}

function isInteger(num)
{
	if (!isNumber(num))
		return false;

	if (num.indexOf(".") != -1)
		return false;

	return true;
}

function getRange(min, max, value)
{
	if (value < min) return min;
	if (value > max) return max;
	
	return value;
}

function decToHex(value)
{
	var hex = "0123456789ABCDEF";
	var one = parseInt(value / 16);
	var two = parseInt(value % 16);

	return hex.charAt(one)+hex.charAt(two);
}

function hexToDec(value)
{
	eval("var retval = 0x"+value+";");
	return retval;
}

function fillZero(num, zerono)
{
	var snum = new String(num);
	var len = snum.length;

	for (var i = 0; i < zerono - len; i++)
		snum = "0" + snum;

	return snum;
}

/*******************************
	기본적인 함수
*******************************/

function stripTags(text)
{
	var exp = /<(.[^<]*)>/g;
	return (text.replace(exp, ""));
}

function findGetProperty(OBJ, property)
{
	var retval = new Array;

	do
	{
		retval[1] = getProperty(OBJ, property);

		if (retval[1])
		{
			retval[0] = OBJ;
			return retval;
		}

	} while (OBJ = OBJ.parentElement);

	return retval;
}

function getClassID(skin)
{
	skin = skin.replace(/ |\/|\\|\:|\{|\}|\|/g, "_");
	return skin;
}

function getRandomID(what)
{
	return (what+"_"+parseInt(Math.random() * 10000000000));
}

function preloadImage()
{
	var arg = preloadImage.arguments;
	var key;

	if (DUMMYOBJ.preloadImageList == null)
		DUMMYOBJ.preloadImageList = new Array();

	for (var i = 0; i < arg.length; i++)
	{
		if (key = arg[i])
		{
			if (DUMMYOBJ.preloadImageList[key] == null)
			{
				DUMMYOBJ.preloadImageList[key] = new Image;
				DUMMYOBJ.preloadImageList[key].src = key;
			}
		}
	}
}

function getGhostObject(obj)
{
	var tag = obj.outerHTML;
	var space = tag.indexOf(" ");

	tag = "<SPAN"+tag.substr(space);

	return document.createElement(tag);
}

function getProperty(obj, key, defaultvalue)
{
	if (obj && typeof(obj.getAttribute) != "undefined")
	{
		var retval = obj.getAttribute(key);
		if (retval != undefined) return retval;
	}

	return defaultvalue;
}

function setProperty(obj, key, val)
{
	if (typeof(obj.setAttribute) != "undefined")
	{
		if (val == undefined)
			obj.removeAttribute(key);
		else
			obj.setAttribute(key, val);
	}
}

function findLayer(what, doc)
{
	if (!doc) doc = document;
	return doc.getElementById(what);
}

function findFrame(what, doc)
{
	if (!doc) doc = document;
	return doc.frames(what);
}

function getElementsById(what, doc)
{
	if (!doc) doc = "document";
	eval("var objects = doc."+what+";");

	if (objects && !objects.length)
	{
		var retval = Array;
		retval[0] = objects;
	}
	else
		var retval = objects;

	return retval;
}

function getOffsetTop(obj)
{
	var retval = 0;
	var border;

	if (obj)
	{
		retval += obj.offsetTop;
		border = parseInt(obj.currentStyle.borderTopWidth);
		if (!isNaN(border)) retval += border;
		retval += getOffsetTop(obj.offsetParent);
	}

	return retval;
}

function getOffsetLeft(obj)
{
	var retval = 0;
	var border;

	if (obj)
	{
		retval += obj.offsetLeft;
		border = parseInt(obj.currentStyle.borderLeftWidth);
		if (!isNaN(border)) retval += border;
		retval += getOffsetLeft(obj.offsetParent);
	}

	return retval;
}

function getMergedStyle(orgstyle, newstyle, arg2) // obj, stylename)
{
	if (arg2)
	{
		DUMMYOBJ.style.cssText = orgstyle + ";" + getProperty(newstyle, arg2);
		setProperty(newstyle, arg2, DUMMYOBJ.style.cssText);
	}
	else
		DUMMYOBJ.style.cssText = orgstyle + ";" + newstyle; // getProperty(obj, stylename);

	return (DUMMYOBJ.style.cssText);
}

function refreshImageSize(IMG)
{
	IMG.width = IMG.offsetWidth;
}

function returnFalse()
{
	return false;
}

/*******************************
	에러처리 관련 함수
*******************************/

function getFunctionPrototype(func)
{
	func = func.toString();
	func =  func.substr(0, func.indexOf("\n") - 1);

	return func+"\n------------------------------------------------------------------------------------------------\n";
}

function traceStack()
{
	var funcstack = "";
	var parent = traceStack;

	while (parent = parent.caller)
		funcstack += getFunctionPrototype(parent);

	return funcstack;
}

function getMicroTime()
{
	var dummy = new Date();
	return dummy.getMinutes() * 60000 + dummy.getSeconds() * 1000 + dummy.getMilliseconds()
}

function showProcessTime()
{
	var msg = (getMicroTime() - startTime)+" 밀리세컨드가 소요되었습니다";
	window.status = msg;
}

function ASSERT(msg)
{
	alert(msg);
	window.onerror = function() { return true; }
}

/*******************************
	개체 핸들러 관련 함수
*******************************/

function attachEvent(obj, func)
{
	for (var i = 2; i < arguments.length; i++)
		obj.attachEvent(arguments[i].toLowerCase(), function() { func(event.srcElement); } );
}

var objHandlers = new Array;

// window.onerror = function() { return true; }

function addHandler(func)
{
	var event;

	for (var i = 1; i < arguments.length; i++)
	{
		event = arguments[i].toUpperCase();

		if (!objHandlers[event])
			objHandlers[event] = new Array;

		objHandlers[event].push(func);
	}
}

function runHandler(event)
{
	var i;

	event = event.toUpperCase();

	if (objHandlers[event])
		for (i = 0; i < objHandlers[event].length; i++)
			objHandlers[event][i]();
}

document.onclick		= function() { runHandler("onclick");		}
document.ondblclick		= function() { runHandler("ondblclick");	}

document.onmouseup		= function() { runHandler("onmouseup");		}
document.onmousedown	= function() { runHandler("onmousedown");	}
document.onmousemove	= function() { runHandler("onmousemove");	}
document.onmouseover	= function() { runHandler("onmouseover");	}
document.onmouseout		= function() { runHandler("onmouseout");	}

document.onkeydown		= function() { runHandler("onkeydown");		}
document.onkeyup		= function() { runHandler("onkeyup");		}

document.oncontextmenu	= function() { runHandler("oncontextmenu");	}

/*******************************
	개체 초기화 관련 코드
*******************************/

var objInitialersKeys = new Array;
var objInitialersWalk = new Array;

function addInitialer(func)
{
	for (var i = 1; i < arguments.length; i++)
	{
		var keyupper = arguments[i].toUpperCase();

		if (!objInitialersWalk[keyupper])
		{
			objInitialersWalk[keyupper] = new Array;
			objInitialersKeys.push(keyupper);
		}

		var length = objInitialersWalk[keyupper].length;

		objInitialersWalk[keyupper][length] = func;
	}
}

function refreshObject(obj)
{
	var tagupper = obj.tagName.toUpperCase();
	refreshTags(obj, tagupper);
}

function refreshTags(obj, tagupper)
{
	if (!objInitialersWalk[tagupper]) return;

	for (j = 0; j < objInitialersWalk[tagupper].length; j++)
		objInitialersWalk[tagupper][j](obj);
}

function refreshAll()
{
	var i, j;
	
	for (j = 0; j < objInitialersKeys.length; j++)
	{
		var tagupper = objInitialersKeys[j].toUpperCase();
		var objs = document.getElementsByTagName(tagupper);

		for (i = 0; i < objs.length; i++)
			refreshTags(objs[i], tagupper);
	}

	// traceStack();
}

document.onreadystatechange = function()
{
	if (document.readyState == "complete")
		document.oncontentready();
}

document.oncontentready = function()
{
	document.body.insertAdjacentElement("afterBegin", DUMMYOBJ);
	document.body.insertAdjacentElement("afterBegin", DUMMYANC);

	DUMMYANC.runtimeStyle.cssText = DUMMYOBJ.runtimeStyle.cssText = "visibility:hidden; position:absolute; top:-2000px; left:-2000px;";

	refreshAll();
	// showProcessTime();
}

/*******************************
	개체 초기화 관련 코드
*******************************/

function moveLocation(href, target)
{
	DUMMYANC.href = href;
	DUMMYANC.target = target;

	setTimeout("DUMMYANC.click();", 100);
}

/*******************************
	스킨 / 스타일 관련 코드
*******************************/

var styles = new Array;

function findStyleSheet(id)
{
	if (!id) id = "hooriza";

	var sheet = document.styleSheets(id);
	return sheet;
}

function applyStyleSheet(skin, sheet, xmlstyle, head, tail)
{
	xmlstyle = xmlstyle.selectNodes("*");

	for (var i = 0; i < xmlstyle.length; i++)
	{
		var length = sheet.rules.length;

		var key = head + xmlstyle[i].tagName + tail;
		var val = xmlstyle[i].getAttribute("style");

		if (styles[key])
		{
			sheet.removeRule(styles[key]);
			length = styles[key];
		}

		// document.write("<nobr style='font-size:12px; font-family:굴림체;'>"+key + " -> " + val + "</nobr><BR>");

		sheet.addRule(key, val ? val.replace(/\{SKINDIR\}/g, skin) : undefined, length);
		styles[key] = length;
		
		applyStyleSheet(skin, sheet, xmlstyle[i], head, tail);
	}
}

function preloadSkinImages(skin, xmlimage)
{
	if (xmlimage)
	{
		xmlimage = xmlimage.selectNodes("*");

		for (var i = 0; i < xmlimage.length; i++)
		{
			var src = xmlimage[i].getAttribute("src");
			preloadImage(skin+"/"+src);

			preloadSkinImages(skin, xmlimage[i]);
		}
	}
}

var skincache = new Array;

function applySkin(skin, head, tail)
{
	if (!skincache[tail+"_"+head])
	{
		var xmldoc = new ActiveXObject("Microsoft.XMLDOM");
		var sheet = findStyleSheet();

		xmldoc.async = false;
		xmldoc.load(skin+"/skin.xml");

		if (xmldoc.documentElement)
		{
			var xmlskin = xmldoc.documentElement.selectNodes("/skin")[0];
			var xmlstyle = xmlskin.selectNodes("style")[0];
			var xmlimage = xmlskin.selectNodes("image")[0];

			if (head && tail)
				applyStyleSheet(skin, sheet, xmlstyle, head, tail);

			preloadSkinImages(skin, xmlimage);

			skincache[tail+"_"+head] = xmlskin;
		}
		else
		{
			ASSERT("skin.xml 파일이 잘못되었습니다 ("+skin+"/skin.xml)");
		}
	}

	return (skincache[tail+"_"+head]);
}

function getStyle(key, head, tail)
{
	var sheet = findStyleSheet();
	var rules = sheet.rules;

	var key = head + key + tail;

	return (rules.item(styles[key]).style.cssText);
}

function getStyleProperty(attr)
{
	var exp = /(\-[a-z])/g;
	return (attr.toLowerCase().replace(exp, function($1) { return ($1.charAt(1).toUpperCase()); }));
}

function addStyle(style, csstext)
{
	var styles = csstext.split(";");
	var key, val;
	var colonpos, exp;

	for (var i = 0; i < styles.length; i++)
	{
		colonpos = styles[i].indexOf(":");

		if (colonpos > 0)
		{
			key = getStyleProperty(styles[i].substr(0, colonpos).replace(" ", ""));
			val = styles[i].substr(colonpos + 1).replace(" ", "");

			// alert("style."+key+"=\""+val+"\";");
			eval("style."+key + "=val;");
		}
	}
}

DUMMYOBJ = document.createElement("SPAN");
DUMMYANC = document.createElement("A");