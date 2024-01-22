/***************************************************
	���� : �ֿ��� (hooriza.spam@gmail.com)
           http://hooriza.com/

		   �ҽ� ���� ���� �Ǵ� ����� �ϴ� ����
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

function setFocus(OBJ) // ��ü�� ��Ŀ�� �ֱ�
{
	if (getProperty(OBJ, "errordel") != null) // errorsel �̸�...
		OBJ.value = "";

	if (getProperty(OBJ, "errorsel") != null) // errorsel �̸�...
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
	
	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��")+" ���ڸ� �Է��� �� �ֽ��ϴ�");
}

function integerOnly(OBJ)
{
	if (isInteger(OBJ.value))
		return checkMinMax(OBJ);

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��")+" ������ �Է��� �� �ֽ��ϴ�");
}

// text ���� �Է»��ڿ� onlyemail �Ӽ��� �ִ� ���
// �ùٸ� �̸������� �˻�
function emailOnly(OBJ)
{
	var	exp = new RegExp ("^[A-Za-z0-9-_\\.]{2,}@[A-Za-z0-9-_\\.]{2,}\\.[A-Za-z0-9-_]{2,}$");

	// �ѱ��� ���Ե� �ְų� �̸��� ������ �ƴ� ���
	if (stringLength(OBJ.value) == OBJ.value.length && exp.test(OBJ.value))
		return true;

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " �ùٸ� �̸��� �ּҰ� �ƴմϴ�");
}

// �� �Լ��� ��ģ������� lib.validate.js �� isValidJumin �Լ��� ����
function socialidOnly(OBJ)
{
    var pattern = /^([0-9]{6})-?([0-9]{7})$/; 
	var num = OBJ.value;
    if (!pattern.test(num))
		return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " �ùٸ� �ֹε�Ϲ�ȣ�� �ƴմϴ�");

    num = RegExp.$1 + RegExp.$2;

	var sum = 0;
	var last = num.charCodeAt(12) - 0x30;
	var bases = "234567892345";

	for (var i=0; i<12; i++)
	{
		if (isNaN(num.substring(i,i+1)))
			return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " �ùٸ� �ֹε�Ϲ�ȣ�� �ƴմϴ�");

		sum += (num.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
	}

	var mod = sum % 11;
	if ((11 - mod) % 10 != last)
		return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " �ùٸ� �ֹε�Ϲ�ȣ�� �ƴմϴ�");

	return true;
}

// �� �Լ��� ��ģ������� lib.validate.js �� isValidBizNo �Լ��� ����
function bizidOnly(OBJ)
{
    var pattern = /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/; 
	var num = OBJ.value;
    if (!pattern.test(num))
		return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " �ùٸ� ����ڵ�Ϲ�ȣ�� �ƴմϴ�");

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
		return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " �ùٸ� ����ڵ�Ϲ�ȣ�� �ƴմϴ�");

	return true;
}

function urlOnly(OBJ)
{
	var	exp = new RegExp ("^(mms|MMS|http|HTTP|ftp|FTP|telnet|TELNET)\:\/\/");

	if (exp.test(OBJ.value))
		return true;

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " �ùٸ� URL �ּҰ� �ƴմϴ�");
}

// �ѱ۸� �ִ��� �˻�
function koreanOnly(OBJ)
{
	var pattern = /^[��-�R]+$/;

	if (pattern.test(OBJ.value))
		return true;

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " " + "�ѱ۸� �Է��� �� �ֽ��ϴ�");
}

// �ѱ��� ���ڰ� �ִ��� �˻�
function notkoreanOnly(OBJ)
{
	var pattern = /[��-�R]/;

	if (!pattern.test(OBJ.value))
		return true;

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " " + "�ѱ��� �Է¹��� �� �����ϴ�");
}

function englishOnly(OBJ)
{
	var pattern = /^[a-zA-Z]+$/;

	if (pattern.test(OBJ.value))
		return true;

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " " + "�����ڸ� �Է��� �� �ֽ��ϴ�");
}

function notenglishOnly(OBJ)
{
	var pattern = /[a-zA-Z]/;

	if (!pattern.test(OBJ.value))
		return true;

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " " + "�����ڴ� �Է¹��� �� �����ϴ�");
}

function emOnly(OBJ)
{
	if (stringLength(OBJ.value) != OBJ.value.length * 2) // �������ڸ����θ� �Ǿ� �ִ��� �˻�
		return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " " + "�������ڸ� �Է¹��� �� �ֽ��ϴ�");

	return true;
}

function halfemOnly(OBJ)
{
	if (stringLength(OBJ.value) != OBJ.value.length) // �������ڰ� ���ԵǾ� �ִ��� �˻�
		return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " " + "�ݰ����ڸ� �Է¹��� �� �ֽ��ϴ�");

	return true;
}

// text, password, textarea, file ���� �Է»��ڿ� notnull �Ӽ��� �ִ� ���
// ���� ����ִ��� �˻�
// ���� ���� ��� true, ���� ���� ��� false �� ����
// notnull
function checkNotNull(OBJ)
{
	// alert(getProperty(OBJ, "notnull"));

	if (getProperty(OBJ, "notnull") == null)
		return true;

	if (isEmpty(OBJ.value))
		return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " �Է��ϼ���");

	return true;
}

// text, password, textarea, file ���� �Է»����� �ּұ��� �� �ִ���� �˻�
// �ּұ��� �� �ִ���� �׽�Ʈ ����� true, ���н� false �� ����
// textarea �� ��� maxLength �� �� �־�� �����
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

		// �� ȣȯ�� ���� ����
		if (rslash_pos == -1 )
		{
			str_len = stringLength(OBJ.value);
		}
		else
		{
			fname = OBJ.value.substr(rslash_pos + 1);
			str_len = stringLength(fname);
		}

		errorname = getProperty(OBJ, "errorname") + " �����̸�";
	}
	else
	{
		str_len = stringLength(OBJ.value);
		errorname = getProperty(OBJ, "errorname");
	}

	// �ּ� ���� �˻�
	if (getProperty(OBJ, "minlength") != null)
	{
		if (str_len < getProperty(OBJ, "minlength"))
		{
			return errorMsg(OBJ, addPost(errorname, "��") + " ���� "
			 + getProperty(OBJ, "minlength") + "��, �ѱ� "
			 + Math.ceil(getProperty(OBJ, "minlength") / 2)
			 + "�� �̻� �Է��ؾ� �մϴ�");
		}
	}

	// �ִ� ���� �˻�
	if (getProperty(OBJ, "maxlength") != null)
	{
		if (str_len > getProperty(OBJ, "maxlength"))
		{
			return errorMsg(OBJ, addPost(errorname, "��") + " ���� "
			 + getProperty(OBJ, "maxlength") + "��, �ѱ� "
			 + parseInt(getProperty(OBJ, "maxlength") / 2)
			 + "�� ���� �Է��� �� �ֽ��ϴ�");
		}
	}

	return true;
}

// text, password, textarea ������ ����
// ����(����, ����, ���, ����)���� �˻�
// �ּҰ�, �ִ밪 �˻�
function checkMinMax(OBJ)
{
	if (OBJ.value == "") return true;

	if (getProperty(OBJ, "maxnum") == null && getProperty(OBJ, "minnum") == null) return true;

	// �ִ밪 �˻�
	if (getProperty(OBJ, "maxnum") != null)
	{
		if (parseFloat(OBJ.value) > parseFloat(getProperty(OBJ, "maxnum")))
			return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��")+" "+getProperty(OBJ, "maxnum")+" ������ ���ڸ� �Է��ؾ� �մϴ�");
	}

	// �ּҰ� �˻�
	if (getProperty(OBJ, "minnum") != null)
	{
		if (parseFloat(OBJ.value) < parseFloat(getProperty(OBJ, "minnum")))
			return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��")+" "+getProperty(OBJ, "minnum")+" �̻��� ���ڸ� �Է��ؾ� �մϴ�");
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
			return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��")+" "+"������ ����("+getStrBreakedByComma(getProperty(OBJ, "onlychar"))+") �� �� �� �ֽ��ϴ�");
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
			return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��")+" "+"������ ����("+getStrBreakedByComma(getProperty(OBJ, "denychar"))+") �� �� �� �����ϴ�");
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

		if (getProperty(otherobj, "eqgroup") == getProperty(OBJ, "eqgroup")) // eqgroup �� ������...
		{
			if (otherobj.value != OBJ.value) // ���� �ٸ���
				return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " " + addPost(getProperty(otherobj, "errorname"), "��") + " ���� ��ġ���� �ʽ��ϴ�");
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

	return errorMsg(OBJ, addPost(getProperty(OBJ, "errorname"), "��") + " ������ ����ǥ���İ� ��ġ���� �ʽ��ϴ�");
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
			alert("��Ʈ���� only �Ӽ��� �������� ���� ��("+lowerOnlyWhat+")���� �����Ǿ� �ֽ��ϴ�");
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