/***************************************************
	Á¦ÀÛ : ÃÖ¿µ±Ô (hooriza.spam@gmail.com)
           http://hooriza.com/

		   ¼Ò½º ¹«´Ü ¼öÁ¤ ¶Ç´Â Àç¹èÆ÷ ÀÏ´Ü ±ÝÁö
***************************************************/

// PUBLIC

function initValidForms(FORM)
{
	FORM.onsubmit = function() { return checkForm(FORM); }
}

// PRIVATE

function getStrBreakedByComma(str)
{
	var i, rtn_str;

	if (str == "") return "";

	rtn_str = "";

	for (i = 0; i < str.length; i++)
	{
		rtn_str += str.substr(i, 1);
		if (i != str.length - 1) rtn_str += ", ";
	}

	return rtn_str;
}

function setFocus(OBJ) // °´Ã¼¿¡ Æ÷Ä¿½º ÁÖ±â
{
	if (getProperty(OBJ, "errordel") != null) // errorsel ÀÌ¸é...
		OBJ.value = "";

	if (getProperty(OBJ, "errorsel") != null) // errorsel ÀÌ¸é...
		OBJ.select();

	OBJ.focus();

	return true;
}

function errorMsg(OBJ, msg)
{
	if (getProperty(OBJ, "errormsg") != null) msg = getProperty(OBJ, "errormsg");
	alert(msg);

	return false;
}

function numericOnly(OBJ)
{
	if (isNumber(OBJ.value))
		return checkMinMax(OBJ);
	
	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº")+" ¼ýÀÚ¸¸ ÀÔ·ÂÇÒ ¼ö ÀÖ½À´Ï´Ù");
}

function integerOnly(OBJ)
{
	if (isInteger(OBJ.value))
		return checkMinMax(OBJ);

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº")+" Á¤¼ö¸¸ ÀÔ·ÂÇÒ ¼ö ÀÖ½À´Ï´Ù");
}

// text Çü½Ä ÀÔ·Â»óÀÚ¿¡ onlyemail ¼Ó¼ºÀÌ ÀÖ´Â °æ¿ì
// ¿Ã¹Ù¸¥ ÀÌ¸ÞÀÏÀÎÁö °Ë»ç
function emailOnly(OBJ)
{
	var	exp = new RegExp ("^[A-Za-z0-9-_\\.]{2,}@[A-Za-z0-9-_\\.]{2,}\\.[A-Za-z0-9-_]{2,}$");

	// ÇÑ±ÛÀÌ Æ÷ÇÔµÅ ÀÖ°Å³ª ÀÌ¸ÞÀÏ Çü½ÄÀÌ ¾Æ´Ñ °æ¿ì
	if (stringLength(OBJ.value) == OBJ.value.length && exp.test(OBJ.value))
		return true;

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº") + " ¿Ã¹Ù¸¥ ÀÌ¸ÞÀÏ ÁÖ¼Ò°¡ ¾Æ´Õ´Ï´Ù");
}

// ÀÌ ÇÔ¼ö´Â °ÅÄ£¸¶·ç´ÔÀÇ lib.validate.js ÀÇ isValidJumin ÇÔ¼ö¸¦ º£³¦
function socialidOnly(OBJ)
{
    var pattern = /^([0-9]{6})-?([0-9]{7})$/; 
	var num = OBJ.value;
    if (!pattern.test(num))
		return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº") + " ¿Ã¹Ù¸¥ ÁÖ¹Îµî·Ï¹øÈ£°¡ ¾Æ´Õ´Ï´Ù");

    num = RegExp.$1 + RegExp.$2;

	var sum = 0;
	var last = num.charCodeAt(12) - 0x30;
	var bases = "234567892345";

	for (var i=0; i<12; i++)
	{
		if (isNaN(num.substring(i,i+1)))
			return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº") + " ¿Ã¹Ù¸¥ ÁÖ¹Îµî·Ï¹øÈ£°¡ ¾Æ´Õ´Ï´Ù");

		sum += (num.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
	}

	var mod = sum % 11;
	if ((11 - mod) % 10 != last)
		return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº") + " ¿Ã¹Ù¸¥ ÁÖ¹Îµî·Ï¹øÈ£°¡ ¾Æ´Õ´Ï´Ù");

	return true;
}

// ÀÌ ÇÔ¼ö´Â °ÅÄ£¸¶·ç´ÔÀÇ lib.validate.js ÀÇ isValidBizNo ÇÔ¼ö¸¦ º£³¦
function bizidOnly(OBJ)
{
    var pattern = /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/; 
	var num = OBJ.value;
    if (!pattern.test(num))
		return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº") + " ¿Ã¹Ù¸¥ »ç¾÷ÀÚµî·Ï¹øÈ£°¡ ¾Æ´Õ´Ï´Ù");

	num = RegExp.$1 + RegExp.$2 + RegExp.$3;

	var cVal = 0; 

	for (var i=0; i<8; i++)
	{ 
        var cKeyNum = parseInt(((_tmp = i % 3) == 0) ? 1 : ( _tmp  == 1 ) ? 3 : 7); 
        cVal += (parseFloat(num.substring(i,i+1)) * cKeyNum) % 10; 
    } 

	var li_temp = parseFloat(num.substring(i,i+1)) * 5 + '0'; 
    cVal += parseFloat(li_temp.substring(0,1)) + parseFloat(li_temp.substring(1,2)); 

	if (parseInt(num.substring(9,10)) != 10-(cVal % 10)%10)
		return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº") + " ¿Ã¹Ù¸¥ »ç¾÷ÀÚµî·Ï¹øÈ£°¡ ¾Æ´Õ´Ï´Ù");

	return true;
}

function urlOnly(OBJ)
{
	var	exp = new RegExp ("^(mms|MMS|http|HTTP|ftp|FTP|telnet|TELNET)\:\/\/");

	if (exp.test(OBJ.value))
		return true;

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº") + " ¿Ã¹Ù¸¥ URL ÁÖ¼Ò°¡ ¾Æ´Õ´Ï´Ù");
}

// ÇÑ±Û¸¸ ÀÖ´ÂÁö °Ë»ç
function koreanOnly(OBJ)
{
	var pattern = /^[¤¡-ÆR]+$/;

	if (pattern.test(OBJ.value))
		return true;

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº") + " " + "ÇÑ±Û¸¸ ÀÔ·ÂÇÒ ¼ö ÀÖ½À´Ï´Ù");
}

// ÇÑ±ÛÀÌ ¹®ÀÚ°¡ ÀÖ´ÂÁö °Ë»ç
function notkoreanOnly(OBJ)
{
	var pattern = /[¤¡-ÆR]/;

	if (!pattern.test(OBJ.value))
		return true;

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº") + " " + "ÇÑ±ÛÀº ÀÔ·Â¹ÞÀ» ¼ö ¾ø½À´Ï´Ù");
}

function englishOnly(OBJ)
{
	var pattern = /^[a-zA-Z]+$/;

	if (pattern.test(OBJ.value))
		return true;

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº") + " " + "¿µ¹®ÀÚ¸¸ ÀÔ·ÂÇÒ ¼ö ÀÖ½À´Ï´Ù");
}

function notenglishOnly(OBJ)
{
	var pattern = /[a-zA-Z]/;

	if (!pattern.test(OBJ.value))
		return true;

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº") + " " + "¿µ¹®ÀÚ´Â ÀÔ·Â¹ÞÀ» ¼ö ¾ø½À´Ï´Ù");
}

function emOnly(OBJ)
{
	if (stringLength(OBJ.value) != OBJ.value.length * 2) // Àü°¢¹®ÀÚ¸¸À¸·Î¸¸ µÇ¾î ÀÖ´ÂÁö °Ë»ç
		return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº") + " " + "Àü°¢¹®ÀÚ¸¸ ÀÔ·Â¹ÞÀ» ¼ö ÀÖ½À´Ï´Ù");

	return true;
}

function halfemOnly(OBJ)
{
	if (stringLength(OBJ.value) != OBJ.value.length) // Àü°¢¹®ÀÚ°¡ Æ÷ÇÔµÇ¾î ÀÖ´ÂÁö °Ë»ç
		return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº") + " " + "¹Ý°¢¹®ÀÚ¸¸ ÀÔ·Â¹ÞÀ» ¼ö ÀÖ½À´Ï´Ù");

	return true;
}

// text, password, textarea, file Çü½Ä ÀÔ·Â»óÀÚ¿¡ notnull ¼Ó¼ºÀÌ ÀÖ´Â °æ¿ì
// °ªÀÌ ºñ¾îÀÖ´ÂÁö °Ë»ç
// ºó°ªÀÌ ¾øÀ» °æ¿ì true, ºó°ªÀÌ ÀÖÀ» °æ¿ì false ¸¦ ¸®ÅÏ
// notnull
function checkNotNull(OBJ)
{
	// alert(getProperty(OBJ, "notnull"));

	if (getProperty(OBJ, "notnull") == null)
		return true;

	if (isEmpty(OBJ.value))
		return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "À»") + " ÀÔ·ÂÇÏ¼¼¿ä");

	return true;
}

// text, password, textarea, file Çü½Ä ÀÔ·Â»óÀÚÀÇ ÃÖ¼Ò±æÀÌ ¹× ÃÖ´ë±æÀÌ °Ë»ç
// ÃÖ¼Ò±æÀÌ ¹× ÃÖ´ë±æÀÌ Å×½ºÆ® Åë°ú½Ã true, ½ÇÆÐ½Ã false ¸¦ ¸®ÅÏ
// textarea ÀÎ °æ¿ì maxLength ·Î ÇØ ÁÖ¾î¾ß Àû¿ëµÊ
// maxlength, minlength
function checkLength(OBJ)
{
	if (OBJ.value == "") return true;

	var str_len, errorname;

	if (getProperty(OBJ, "minlength") == null && getProperty(OBJ, "maxlength") == null) return true;

	if (getProperty(OBJ, "type").toUpperCase() == "FILE")
	{
		var	rslash_pos, fname;

		rslash_pos = OBJ.value.lastIndexOf("\\", OBJ.value.length);

		// ¸Æ È£È¯À» À§ÇÑ ¼öÁ¤
		if (rslash_pos == -1 )
		{
			str_len = stringLength(OBJ.value);
		}
		else
		{
			fname = OBJ.value.substr(rslash_pos + 1);
			str_len = stringLength(fname);
		}

		errorname = getProperty(OBJ, "errorname") + " ÆÄÀÏÀÌ¸§";
	}
	else
	{
		str_len = stringLength(OBJ.value);
		errorname = getProperty(OBJ, "errorname");
	}

	// ÃÖ¼Ò ±æÀÌ °Ë»ç
	if (getProperty(OBJ, "minlength") != null)
	{
		if (str_len < getProperty(OBJ, "minlength"))
		{
			return errorMsg(OBJ, addPost(errorname, "Àº") + " ¿µ¹® "
			 + getProperty(OBJ, "minlength") + "ÀÚ, ÇÑ±Û "
			 + Math.ceil(getProperty(OBJ, "minlength") / 2)
			 + "ÀÚ ÀÌ»ó ÀÔ·ÂÇØ¾ß ÇÕ´Ï´Ù");
		}
	}

	// ÃÖ´ë ±æÀÌ °Ë»ç
	if (getProperty(OBJ, "maxlength") != null)
	{
		if (str_len > getProperty(OBJ, "maxlength"))
		{
			return errorMsg(OBJ, addPost(errorname, "Àº") + " ¿µ¹® "
			 + getProperty(OBJ, "maxlength") + "ÀÚ, ÇÑ±Û "
			 + parseInt(getProperty(OBJ, "maxlength") / 2)
			 + "ÀÚ ±îÁö ÀÔ·ÂÇÒ ¼ö ÀÖ½À´Ï´Ù");
		}
	}

	return true;
}

// text, password, textarea Çü½ÄÀÇ °ªÀÌ
// ¼ýÀÚ(¼ýÀÚ, Á¤¼ö, ¾ç¼ö, À½¼ö)ÀÎÁö °Ë»ç
// ÃÖ¼Ò°ª, ÃÖ´ë°ª °Ë»ç
function checkMinMax(OBJ)
{
	if (OBJ.value == "") return true;

	if (getProperty(OBJ, "maxnum") == null && getProperty(OBJ, "minnum") == null) return true;

	// ÃÖ´ë°ª °Ë»ç
	if (getProperty(OBJ, "maxnum") != null)
	{
		if (parseFloat(OBJ.value) > parseFloat(getProperty(OBJ, "maxnum")))
			return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº")+" "+getProperty(OBJ, "maxnum")+" ÀÌÇÏÀÇ ¼ýÀÚ¸¦ ÀÔ·ÂÇØ¾ß ÇÕ´Ï´Ù");
	}

	// ÃÖ¼Ò°ª °Ë»ç
	if (getProperty(OBJ, "minnum") != null)
	{
		if (parseFloat(OBJ.value) < parseFloat(getProperty(OBJ, "minnum")))
			return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº")+" "+getProperty(OBJ, "minnum")+" ÀÌ»óÀÇ ¼ýÀÚ¸¦ ÀÔ·ÂÇØ¾ß ÇÕ´Ï´Ù");
	}

	return true;
}

function checkOnlyChar(OBJ)
{
	if (OBJ.value == "") return true;

	if (getProperty(OBJ, "onlychar") == null) return true;

	var onlychars = getProperty(OBJ, "onlychar");

	for (var i = 0; i < OBJ.value.length; i++)
	{
		if (onlychars.indexOf(OBJ.value.substr(i, 1)) == -1)
			return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº")+" "+"´ÙÀ½ÀÇ ¹®ÀÚ("+getStrBreakedByComma(getProperty(OBJ, "onlychar"))+") ¸¸ ¾µ ¼ö ÀÖ½À´Ï´Ù");
	}

	return true;
}

function checkDenyChar(OBJ)
{
	if (OBJ.value == "") return true;

	if (getProperty(OBJ, "denychar") == null) return true;

	var denychars = getProperty(OBJ, "denychar");

	for (i = 0; i < denychars.length; i++)
	{
		if (OBJ.value.indexOf(denychars.substr(i, 1)) != -1)
			return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "Àº")+" "+"´ÙÀ½ÀÇ ¹®ÀÚ("+getStrBreakedByComma(getProperty(OBJ, "denychar"))+") ¸¦ ¾µ ¼ö ¾ø½À´Ï´Ù");
	}

	return true;
}

function checkEqGroup(OBJ)
{
	if (OBJ.value == "") return true;

	if (getProperty(OBJ, "eqgroup") == null) return true;

	var otherobj;

	for (var i = 0; i < OBJ.form.length; i++)
	{
		otherobj = OBJ.form.elements[i];

		if (getProperty(otherobj, "eqgroup") == getProperty(OBJ, "eqgroup")) // eqgroup Àº °°Àºµ¥...
		{
			if (otherobj.value != OBJ.value) // °ªÀÌ ´Ù¸£¸é
				return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "°ú") + " " + addPost(getProperty(otherobj, "errorname"), "ÀÌ") + " ¼­·Î ÀÏÄ¡ÇÏÁö ¾Ê½À´Ï´Ù");
		}
	}

	return true;
}

function checkRegExp(OBJ)
{
	if (OBJ.value == "") return true;

	if (getProperty(OBJ, "regexp") == null) return true;

	var	exp = new RegExp(getProperty(OBJ, "regexp"));

	if (exp.test(OBJ.value))
		return true;

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "ÀÌ") + " ÁöÁ¤ÇÑ Á¤±ÔÇ¥Çö½Ä°ú ÀÏÄ¡ÇÏÁö ¾Ê½À´Ï´Ù");
}

function checkObject(OBJ)
{
	var onlyWhat = getProperty(OBJ, "only");
	var onlyExist;
	var onlyResult = true;

	if (onlyWhat && OBJ.value != "")
	{
		var lowerOnlyWhat = onlyWhat.toLowerCase();

		eval("onlyExist = typeof("+lowerOnlyWhat+"Only);");

		if (onlyExist != "function")
			alert("ÄÁÆ®·ÑÀÇ only ¼Ó¼ºÀÌ Àû´çÇÏÁö ¾ÊÀº °ª("+lowerOnlyWhat+")À¸·Î ¼³Á¤µÇ¾î ÀÖ½À´Ï´Ù");
		else
			eval("onlyResult = "+lowerOnlyWhat+"Only(OBJ);");

		if (!onlyResult)
		{
			setFocus(OBJ);
			return false;
		}
	}

	if (checkNotNull(OBJ) && checkLength(OBJ) && checkMinMax(OBJ) && checkOnlyChar(OBJ) && checkDenyChar(OBJ) && checkEqGroup(OBJ) && checkRegExp(OBJ))
		return true;

	setFocus(OBJ);
	return false;
}

function checkForm(FORM)
{
	var OBJ, i;

	for (i = 0; i < FORM.length; i++)
	{
		OBJ = FORM.elements[i];
		if (!checkObject(OBJ)) return false;
	}

	return true;
}

// HANDLER

addInitialer(initValidForms, "FORM");
// addHandler(moveUploads, "ONMOUSEMOVE");