<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>문의사항</title>
<style>
table {width:100%;border-collapse: collapse;}
th {    width: 20%;
    border: 1px solid#e9e9e9;
    background: #f3f3f3;
    color: #4e4e4e;
    text-align: center;
    font-size: 1.083em;
    font-weight: 500;}
td {border:1px solid #e9e9e9;padding:17px 10px;font-size:1.083em;color:#666}
.btn_submit {border-radius:30px;background:#3c95d5;padding:10px 30px;margin:20px 2px 50px;outline:none;cursor: pointer;}
.btn_submit:hover{
    background: #3c95d5;
}
.vlftn{
    text-align: right;
    color: #ec3c3c;
    padding:0 10px;
}
.vlftn b{
    font-size: 1.6em;
    vertical-align: -webkit-baseline-middle;
    display: inline;
    padding: 1px;
    color: #ec3c3c;

}
.vlftn_b{
    font-size: 1.2em;
   vertical-align:initial ;
   color: #ec3c3c;

}
    #ctt_con{
    display:none;
}
input::placeholder{
    color: transparent;
}
textarea::placeholder{
    color: transparent;

}
.rnqns{
        display:none;
    }
    .m_vlftn_b{
        display:none;
    }

@media(max-width:639px){
    th {
        display: none;}
    td {
        width:100%
        }
    /* textarea {
        height: 150px;
    } */
    .cnlth{
        display:none;
    }
    input::placeholder {
        color:#666
    }
    textarea::placeholder {
        color:#666}
    input{
        width:95%;
    }
    #ctt {
    margin: 0px 0;}
    .vlftn{
        font-size:12px;
    }
    .rnqns{
        padding-right:10px;
        display:inline;
    }
    .m_vlftn_b{
        display:inline;
        color: #ec3c3c;
    }
    .vlftn b {
    font-size: 1.3em;
    vertical-align: text-top;}
}
</style>
</head>

<body>
<div class="vlftn">
    <b>*</b>는 필수 입력 사항입니다.
</div>
<form name="contactform" method="post" action="/g5/send.php" style="padding:0 10px;">
  <table>
  <tr>
  <th scope="row"><b class="vlftn_b">*</b>구분</th>
  <td><div class="navbar-form navbar-left form-group" >
  <span class="rnqns"><span class="m_vlftn_b" style="padding-right:3px">*</span>구분</span>
      <select name="subject" class="form-control" style="border: 1px solid #ddd;border-radius: 3px; padding: 5px 60px 5px 10px;">
          <option value="담당자1">원주호상무</option>
          <option value="담당자2">백영식상무</option>
          <option value="담당자3">이성민과장</option>

          </select>
          </div>
  </td>
  </tr>
<tr>
<th scope="row">
<label for="first_name"><b class="vlftn_b">*</b>이름</label></th>
<td width="80%">
<span class="m_vlftn_b">*</span>
<input name="first_name"  type="text" class="ipt" placeholder="이름" style="height:20px;border: none;outline: none;" size="30" maxlength="50" required>
</td>
</tr>

<tr>
<th scope="row">
<label for="email"><b class="vlftn_b">*</b>이메일</label></th>
<td>
<span class="m_vlftn_b">*</span>
<input name="email"  type="text" class="ipt" placeholder="이메일" style="height:20px;border: none;outline: none;" size="30" maxlength="80" required>
</td>
</tr>
<tr>
<th scope="row">
<label for="telephone"><b class="vlftn_b">*</b>연락처</label></th>
<td>
<span class="m_vlftn_b">*</span>
<input  name="telephone"  type="text" class="ipt" placeholder="연락처" style="height:20px;border: none;outline: none;" size="30" maxlength="30" required>
</td>
</tr>
<tr>
<th scope="row">
<label for="comments"><b class="vlftn_b">*</b>문의내용</label></th>
<td height="170" valign="bottom">
  <textarea name="comments" cols="50" rows="10" placeholder="문의내용" style="border: 0;box-shadow: none;outline: none;padding:0;" required ></textarea></td>
</tr>
<tr>
<td height="40" colspan="2" style="text-align:center;border:none;">
<input type="submit" value="전송하기" class="btn_submit">
<input name="재설정" type="reset" value="다시작성" class="btn_submit cnlth" style="background: #888;border: 1px solid #888;"></td>
</tr>
</table>
</form>
</body>
</html>
