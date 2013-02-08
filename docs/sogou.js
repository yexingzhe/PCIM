function imeInit() {
    var fileref = document.createElement('script');
    fileref.src = ime_hosturl + "patch.php";
    fileref.id = "ime_patch110";
    document.body.appendChild(fileref);
    setTimeout("imeOverRequest(\"ime_patch110\")", 10000);
    if (ime_close == 1) {
        ime_getObj("ime_status").style.display = "block";
        ime_close = 0;
        return
    } else ime_close = 0;
    var agt = navigator.userAgent.toLowerCase();
    try {
        if (external.max_version.indexOf("1.") == 0) {
            ime_is_maxthon1 = 1
        } else {
            ime_is_maxthon1 = 0
        }
    } catch(e) {
        ime_is_maxthon1 = 0
    }
    ime_is_safari = agt.indexOf("safari") != -1;
    ime_is_ff = agt.indexOf("firefox") != -1;
    ime_is_ie = (agt.indexOf("msie") != -1 && document.all);
    ime_agent_modify = agt.indexOf("mozilla") == -1 && agt.indexOf("opera") == -1 ? 1 : 0;
    ime_compatMode = document.compatMode != "CSS1Compat" && !ime_is_ff ? 0 : 1;
    if (ime_is_ie) ime_is_ie6 = agt.indexOf("msie 6") != -1 ? 1 : 0;
    ime_is_opera = (agt.indexOf('opera') != -1 && window.opera && document.getElementById);
    if (ime_is_ie6 || !ime_compatMode) {
        onscroll = imeIE6StatusScroll;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0
    }
    var ime_clientWidth = window.top.window.innerWidth ? window.top.window.innerWidth: document.documentElement.clientWidth || document.body.clientWidth;
    var ime_clientHeight = window.top.window.innerHeight ? window.top.window.innerHeight: document.documentElement.clientHeight || document.body.clientHeight;
    if (ime_clientHeight < 62) ime_clientHeight = 82;
    el = document.createElement('div');
    el.id = 'ime_status';
    el.style.background = 'url("' + ime_hosturl + 'images/ime_bit.gif") no-repeat -0px -80px';
    el.style.padding = '0px';
    el.style.margin = '0px';
    el.style.filter = 'Alpha(Opacity=90)';
    el.style.fontSize = '14px';
    el.style.position = (ime_is_ie6 || !ime_compatMode) ? "absolute": "fixed";
    el.style.left = (ime_clientWidth - 156) + "px";
    el.style.top = (ime_is_ie6 || !ime_compatMode) ? (scrollTop + ime_clientHeight - 62) + "px": (ime_clientHeight - 62) + "px";
    el.style.width = '136px';
    el.style.height = '42px';
    el.style.textAlign = 'center';
    el.style.zIndex = 999998;
    el.style.display = 'block';
    el.style.opacity = "0.9";
    document.body.insertBefore(el, document.body.firstChild);
    var html = '<table width="100%" style="width:136px;border-collapse:separate;border-spacing:1px;text-align:center;background:transparent none repeat scroll 0% 0%;position:relative;height:42px;" onmouseover=ime_moveobj("ime_status")  cellspacing="1" cellpadding="0" ><tr style="background:transparent none repeat scroll 0% 0%;"><td style="padding:0px;border:none;"><span id="ime_mode_ZH" class="ime_cloud_zh1" onmouseover="imeModeChange(1,1)" onmouseout="imeModeChange(1,2)" onclick="imeModeChange(1,0)" onmousedown="imeModeChange(1,3)" onmouseup="imeModeChange(1,1)" title="切换中/英文(Shift)"></span><span id="ime_mode_BJ" class="ime_cloud_bj1" onclick="imeModeChange(2,0)" onmouseover="imeModeChange(2,1)" onmouseout="imeModeChange(2,2)" onmousedown="imeModeChange(2,3)" onmouseup="imeModeChange(2,1)" title="全/半角(Shift+Space)"></span><span id="ime_mode_BD" class="ime_cloud_bd1" onclick="imeModeChange(3,0)" onmouseover="imeModeChange(3,1)" onmouseout="imeModeChange(3,2)" onmousedown="imeModeChange(3,3)" onmouseup="imeModeChange(3,1)" title="中/英文标点(Ctrl+.)"></span><span id="ime_mode_close" class="ime_cloud_cl1" onmouseover="imeModeChange(4,1)" onmouseout="imeModeChange(4,2)" onmousedown="imeModeChange(4,3)" onmouseup="imeModeChange(4,1)" onclick="imeClose()"></span></td></tr></table>';
    ime_getObj("ime_status").innerHTML = html;
    var el = document.createElement('div');
    el.id = 'ime_layer';
    el.style.position = "absolute";
    el.style.display = 'none';
    el.style.padding = '0px';
    el.style.margin = '0px';
    el.style.height = '53px';
    el.style.zIndex = 999999;
    el.style.backgroundColor = '#FFF';
    el.style.filter = 'Alpha(Opacity=90)';
    el.style.display = 'none';
    el.style.opacity = "0.9";
    html = '<table id="layer_tab" onmouseover=ime_moveobj("ime_layer") width="' + tab_len + 'px" style="width:' + tab_len + 'px;margin:0px;color:#004376;font-weight:bold;position:relative;line-height:26px;" cellspacing="0" cellpadding="0" border="0">';
    html += '<tr style="vertical-align:middle;height:27px;"><td rowspan="2" width="1" style="background:url(' + ime_hosturl + 'images/ime_bit.gif) no-repeat -136px -53px;padding:0px;border:none;"></td><td id="ime_query" style="background:url(' + ime_hosturl + 'images/layer_top.gif) repeat-x;padding:0px 0px 0px 5px;font-size:16px;color:#004376;font-weight:bold;font-family:宋体,Arial;vertical-align:middle;border:none;" align=left height="27"></td><td width="51" rowspan="2" style="background:url(' + ime_hosturl + 'images/ime_bit.gif) no-repeat -120px -0px;padding:0px 0px 8px 0px;position:relative;border:none;" valign=bottom><a style="font-size:12px;color:#0082E5;display:block;position:absolute;top:0px;right:25px;line-height:26px;font-weight:normal;" href="http://pinyin.sogou.com/bbs/forumdisplay.php?fid=39" target="_blank">反馈</a><span class="ime_cloud_back1" id="ime_back" onmouseover="imeMouseOverPage(0);" onmouseout="imeMouseOutPage(0);" onmousedown="imePageRun(0,event)" onmouseup="imePageStop(0)"></span><span class="ime_cloud_forward1" id="ime_forward" onmouseover="imeMouseOverPage(1);" onmouseout="imeMouseOutPage(1);" onmousedown="imePageRun(1,event)" onmouseup="imePageStop(1)"></span></td></tr><tr style="vertical-align:middle;"><td height="26" style="padding:0px 0px 0px 5px;font-weight:normal;background:url(' + ime_hosturl + 'images/layer_bottom.gif) repeat-x;font-size:16px;cursor:default;font-family: 宋体;vertical-align:middle;letter-spacing:0;border:none;" align=left id="ime_res"></td></tr></table>';
    el.innerHTML = html;
    document.body.insertBefore(el, document.body.firstChild);
    var el = document.createElement('div');
    el.id = 'ime_keyboard';
    el.style.position = "absolute";
    el.style.display = "none";
    el.style.left = "690px";
    el.style.top = "174px";
    html = '<div id="ime_row0" style="display: block;">';
    html += '<input type="button" lang="192" name="accent" value="`">';
    html += '<input type="button" lang="49" value="1" name="1">';
    html += '<input type="button" lang="50" value="2" name="2">';
    html += '<input type="button" lang="51" value="3" name="3">';
    html += '<input type="button" lang="52" value="4" name="4">';
    html += '<input type="button" lang="53" value="5" name="5">';
    html += '<input type="button" lang="54" value="6" name="6">';
    html += '<input type="button" lang="55" value="7" name="7">';
    html += '<input type="button" lang="56" value="8" name="8">';
    html += '<input type="button" lang="57" value="9" name="9">';
    html += '<input type="button" lang="48" value="0" name="0">';
    html += '<input type="button" lang="189" value="-" name="-">';
    html += '<input type="button" lang="187" value="=" name="=">';
    html += '<input type="button" style="width:75px;" lang="8" value="Backspace" name="backspace">';
    html += '</div>';
    html += '<div id="ime_row0_shift" style="display: none;">';
    html += '<input type="button" lang="192" value="~" name="tilde">';
    html += '<input type="button" lang="49" value="!" name="exc">';
    html += '<input type="button" lang="50" value="@" name="at">';
    html += '<input type="button" lang="51" value="#" name="hash">';
    html += '<input type="button" lang="52" value="$" name="dollar">';
    html += '<input type="button" lang="53" value="%" name="percent">';
    html += '<input type="button" lang="54" value="^" name="caret">';
    html += '<input type="button" lang="55" value="&amp;" name="ampersand">';
    html += '<input type="button" lang="56" value="*" name="asterik">';
    html += '<input type="button" lang="57" value="(" name="openbracket">';
    html += '<input type="button" lang="48" value=")" name="closebracket">';
    html += '<input type="button" lang="189" value="_" name="underscore">';
    html += '<input type="button" lang="187" value="+" name="plus">';
    html += '<input type="button" style="width:75px;" lang="8" value="Backspace" name="backspace">';
    html += '</div>';
    html += '<div id="ime_row1" style="display: block;">';
    html += '<input type="button" lang="81" value="q" name="q">';
    html += '<input type="button" lang="87" value="w" name="w">';
    html += '<input type="button" lang="69" value="e" name="e">';
    html += '<input type="button" lang="82" value="r" name="r">';
    html += '<input type="button" lang="84" value="t" name="t">';
    html += '<input type="button" lang="89" value="y" name="y">';
    html += '<input type="button" lang="85" value="u" name="u">';
    html += '<input type="button" lang="73" value="i" name="i">';
    html += '<input type="button" lang="79" value="o" name="o">';
    html += '<input type="button" lang="80" value="p" name="p">';
    html += '<input type="button" lang="219" value="[" name="[">';
    html += '<input type="button" lang="221" value="]" name="]">';
    html += '<input type="button" lang="220" value="\\" name="\\">';
    html += '</div>';
    html += '<div id="ime_row1_shift" style="display: none;">';
    html += '<input type="button" lang="81" value="Q" name="Q">';
    html += '<input type="button" lang="87" value="W" name="W">';
    html += '<input type="button" lang="69" value="E" name="E">';
    html += '<input type="button" lang="82" value="R" name="R">';
    html += '<input type="button" lang="84" value="T" name="T">';
    html += '<input type="button" lang="89" value="Y" name="Y">';
    html += '<input type="button" lang="85" value="U" name="U">';
    html += '<input type="button" lang="73" value="I" name="I">';
    html += '<input type="button" lang="79" value="O" name="O">';
    html += '<input type="button" lang="80" value="P" name="P">';
    html += '<input type="button" lang="219" value="{" name="{">';
    html += '<input type="button" lang="221" value="}" name="}">';
    html += '<input type="button" lang="220" value="|" name="|">';
    html += '</div>';
    html += '<div id="ime_row2" style="display: block;">';
    html += '<input type="button" lang="65" value="a" name="a">';
    html += '<input type="button" lang="83" value="s" name="s">';
    html += '<input type="button" lang="68" value="d" name="d">';
    html += '<input type="button" lang="70" value="f" name="f">';
    html += '<input type="button" lang="71" value="g" name="g">';
    html += '<input type="button" lang="72" value="h" name="h">';
    html += '<input type="button" lang="74" value="j" name="j">';
    html += '<input type="button" lang="75" value="k" name="k">';
    html += '<input type="button" lang="76" value="l" name="l">';
    html += '<input type="button" lang="59" value=";" name=";">';
    html += '<input type="button" lang="222" value="\'" name="\'">';
    html += '<input type="button" lang="13" style="width:46px;" value="Enter" name="Enter">';
    html += '</div>';
    html += '<div id="ime_row2_shift" style="display: none;">';
    html += '<input type="button" lang="65" value="A" name="a">';
    html += '<input type="button" lang="83" value="S" name="s">';
    html += '<input type="button" lang="68" value="D" name="d">';
    html += '<input type="button" lang="70" value="F" name="f">';
    html += '<input type="button" lang="71" value="G" name="g">';
    html += '<input type="button" lang="72" value="H" name="h">';
    html += '<input type="button" lang="74" value="J" name="j">';
    html += '<input type="button" lang="75" value="K" name="k">';
    html += '<input type="button" lang="76" value="L" name="l">';
    html += '<input type="button" lang="59" value=":" name=";">';
    html += '<input type="button" lang="222" value="\&quot;" name="\'">';
    html += '<input type="button" lang="13" style="width:46px;" value="Enter" name="Enter">';
    html += '</div>';
    html += '<div id="ime_row3" style="display: block;">';
    html += '<input type="button" id="shift" style="width:50px;" value="Shift" name="Shift">';
    html += '<input type="button" lang="90" value="z" name="z">';
    html += '<input type="button" lang="88" value="x" name="x">';
    html += '<input type="button" lang="67" value="c" name="c">';
    html += '<input type="button" lang="86" value="v" name="v">';
    html += '<input type="button" lang="66" value="b" name="b">';
    html += '<input type="button" lang="78" value="n" name="n">';
    html += '<input type="button" lang="77" value="m" name="m">';
    html += '<input type="button" lang="188" value="," name=",">';
    html += '<input type="button" lang="190" value="." name=".">';
    html += '<input type="button" lang="191" value="/" name="/">';
    html += '</div>';
    html += '<div id="ime_row3_shift" style="display: none;">';
    html += '<input type="button" id="ime_shifton" style="width:50px;" value="Shift" name="Shift">';
    html += '<input type="button" lang="90" value="Z" name="Z">';
    html += '<input type="button" lang="88" value="X" name="X">';
    html += '<input type="button" lang="67" value="C" name="C">';
    html += '<input type="button" lang="86" value="V" name="V">';
    html += '<input type="button" lang="66" value="B" name="B">';
    html += '<input type="button" lang="78" value="N" name="N">';
    html += '<input type="button" lang="77" value="M" name="M">';
    html += '<input type="button" lang="188" value="&lt;" name="lt">';
    html += '<input type="button" lang="190" value="&gt;" name="gt">';
    html += '<input type="button" lang="191" value="?" name="?">';
    html += '</div>';
    html += '<div id="ime_spacebar">';
    html += '<input type="button" lang="32" value=" " name="spacebar">';
    html += '</div>';
    el.innerHTML = html;
    html = '.ime_cloud_zh1,.ime_cloud_zh2,.ime_cloud_zh3,.ime_cloud_en1,.ime_cloud_en2,.ime_cloud_en3,.ime_cloud_bj1,.ime_cloud_bj2,.ime_cloud_bj3,.ime_cloud_qj1,.ime_cloud_qj2,.ime_cloud_qj3,.ime_cloud_bd1,.ime_cloud_bd2,.ime_cloud_bd3,.ime_cloud_be1,.ime_cloud_be2,.ime_cloud_be3,.ime_cloud_cl1,.ime_cloud_cl2,.ime_cloud_cl3{border:0;position:absolute;padding:0px;cursor:pointer;width:20px;height:20px;background:url(' + ime_hosturl + 'images/ime_bit.gif) no-repeat;}';
    html += '.ime_cloud_back1,.ime_cloud_back2,.ime_cloud_back3,.ime_cloud_forward1,.ime_cloud_forward2,.ime_cloud_forward3{border:0;display:block;position:absolute;top:34px;right:4px;margin:0px;padding:0px;background:url(' + ime_hosturl + 'images/ime_bit.gif) no-repeat;width:8px;height:12px;}';
    html += '.ime_cloud_back1,.ime_cloud_back2,.ime_cloud_back3{top:34px;right:15px;}';
    html += '.ime_cloud_forward1,.ime_cloud_forward2,.ime_cloud_forward3{top:34px;right:4px;}';
    html += '.ime_cloud_back1{background-position:-60px -60px;cursor:default;}';
    html += '.ime_cloud_back2{background-position:-68px -60px;cursor:pointer;}';
    html += '.ime_cloud_back3{background-position:-76px -60px;cursor:pointer;}';
    html += '.ime_cloud_forward1{background-position:-84px -60px;cursor:default;}';
    html += '.ime_cloud_forward2{background-position:-92px -60px;cursor:pointer;}';
    html += '.ime_cloud_forward3{background-position:-100px -60px;cursor:pointer;}';
    html += '.ime_cloud_zh1,.ime_cloud_zh2,.ime_cloud_zh3,.ime_cloud_en1,.ime_cloud_en2,.ime_cloud_en3{top:2px;left:50px;}';
    html += '.ime_cloud_bj1,.ime_cloud_bj2,.ime_cloud_bj3,.ime_cloud_qj1,.ime_cloud_qj2,.ime_cloud_qj3{top:2px;left:70px;}';
    html += '.ime_cloud_bd1,.ime_cloud_bd2,.ime_cloud_bd3,.ime_cloud_be1,.ime_cloud_be2,.ime_cloud_be3{top:2px;left:90px;}';
    html += '.ime_cloud_cl1,.ime_cloud_cl2,.ime_cloud_cl3{top:2px;left:110px;}';
    html += '.ime_cloud_zh1{background-position:-0px -20px;}';
    html += '.ime_cloud_zh2{background-position:-20px -20px;}';
    html += '.ime_cloud_zh3{background-position:-40px -20px;}';
    html += '.ime_cloud_en1{background-position:-0px -40px;}';
    html += '.ime_cloud_en2{background-position:-20px -40px;}';
    html += '.ime_cloud_en3{background-position:-40px -40px;}';
    html += '.ime_cloud_bj1{background-position:-60px -0px;}';
    html += '.ime_cloud_bj2{background-position:-80px -0px;}';
    html += '.ime_cloud_bj3{background-position:-100px -0px;}';
    html += '.ime_cloud_qj1{background-position:-0px -0px;}';
    html += '.ime_cloud_qj2{background-position:-20px -0px;}';
    html += '.ime_cloud_qj3{background-position:-40px -0px;}';
    html += '.ime_cloud_bd1{background-position:-60px -20px;}';
    html += '.ime_cloud_bd2{background-position:-80px -20px;}';
    html += '.ime_cloud_bd3{background-position:-100px -20px;}';
    html += '.ime_cloud_be1{background-position:-60px -40px;}';
    html += '.ime_cloud_be2{background-position:-80px -40px;}';
    html += '.ime_cloud_be3{background-position:-100px -40px;}';
    html += '.ime_cloud_cl1{background-position:-0px -60px;}';
    html += '.ime_cloud_cl2{background-position:-20px -60px;}';
    html += '.ime_cloud_cl3{background-position:-40px -60px;}';
    html += '#ime_layer *{margin:0px;padding:0px;}';
    html += '#ime_status *{margin:0px;padding:0px;}';
    html += '#ime_keyboard{position: absolute;border: 1px solid #ccc;width: 440px;padding: 10px;}';
    html += '#ime_keyboard input{margin:3px;width:18px;}';
    html += '#ime_spacebar input{width: 180px;margin: 0 auto;margin-left: 90px;}';
    html += '#ime_row0_shift,#ime_row1_shift,#ime_row2_shift,#ime_row3_shift{display:none;}';
    html += '#ime_row0,#ime_row0_shift{padding-left:20px;}';
    html += '#ime_row1,#ime_row1_shift{padding-left:60px;}';
    html += '#ime_row2,#ime_row2_shift{padding-left:70px;}';
    html += '#ime_shifton{border-left:3px solid #000;border-top:3px solid #000;}';
    try {
        var el = document.createStyleSheet();
        el.cssText = html
    } catch(e) {
        var el = document.createElement('style');
        el.type = "text/css";
        el.textContent = html;
        document.getElementsByTagName("HEAD").item(0).appendChild(el)
    }
    imeBindInput(document)
}
function imeFeedBack4Web() {
    window.open("http://pinyin.sogou.com/fb/fillsurvey.php?sid=67&query=" + encodeURIComponent(query) + "&querylist=" + encodeURIComponent(word) + "&ref=" + encodeURIComponent(location.href), "_blank")
}
function imePingBack() {
    var t = ime_pingback_showres;
    var img = document.createElement('img');
    img.src = "http://web.pinyin.sogou.com/cloud_inputtime.gif?t=" + t + "&q=" + query + "&src=" + encodeURIComponent(location.href) + "&n=" + Math.round(Math.random() * 10000000)
}
function imeIE6StatusScroll() {
    if (ime_close) return;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
    eval('document.getElementById("ime_status").style.top = "' + (scrollTop + ime_ie6_status_top) + 'px";')
}
function ime_getObj(id) {
    if (document.getElementById) return document.getElementById(id);
    else if (document.all) return document.all[id];
    else if (document.layers) return document.layers[id];
    else {
        return null
    }
}
function imeBindKeyBoard(opt) {
    return;
    if (document.addEventListener) {
        opt.addEventListener("click", imeKeyBoardPress, true)
    } else if (document.attachEvent) {
        opt.attachEvent("onclick", imeKeyBoardPress)
    } else {
        var oldclick = (input[i].onclick) ? input[i].onclick: function() {};
        opt.onclick = function() {
            oldclick();
            imeKeyBoardPress()
        }
    }
}
function imeKeyBoardPress(e) {
    var opt = e.srcElement ? e.srcElement: e.target;
    if (opt.value == "Shift") {
        if (ime_shifton == false) {
            ime_onShift(1);
            ime_shifton = true
        } else {
            ime_onShift(0);
            ime_shifton = false
        }
    } else {
        if (opt.lang >= 65 && opt.lang <= 90) imeKeyPress("", opt.lang, ime_shifton);
        else imeKeyDown("", opt.lang, ime_shifton);
        ime_onShift(0);
        ime_shifton = false;
        imeInput("", opt.lang)
    }
}
function ime_onShift(e) {
    var i;
    if (e == 1) {
        for (i = 0; i < 4; i++) {
            var rowid = "ime_row" + i;
            ime_getObj(rowid).style.display = "none";
            ime_getObj(rowid + "_shift").style.display = "block"
        }
    } else {
        for (i = 0; i < 4; i++) {
            var rowid = "ime_row" + i;
            ime_getObj(rowid).style.display = "block";
            ime_getObj(rowid + "_shift").style.display = "none"
        }
    }
}
function imeBindInput(opt) {
    try {
        var input = opt.getElementsByTagName('input');
        for (var i = 0; i < input.length; i++) {
            if (input[i].type == "text" && input[i].imebind == undefined) {
                input[i].imebind = true;
                input[i].onkeyup = null;
                input[i].onkeypress = null;
                if (document.addEventListener) {
                    input[i].addEventListener("keyup", imeInput, true);
                    input[i].addEventListener("keydown", imeKeyDown, true);
                    input[i].addEventListener("keypress", imeKeyPress, true);
                    input[i].addEventListener("blur", imeBlur, true)
                } else if (document.attachEvent) {
                    input[i].detachEvent("onkeyup", input[i].onkeyup);
                    input[i].detachEvent("onkeypress", input[i].onkeypress);
                    input[i].detachEvent("onblur", input[i].onblur);
                    input[i].attachEvent("onkeyup", imeInput);
                    input[i].attachEvent("onkeydown", imeKeyDown);
                    input[i].attachEvent("onkeypress", imeKeyPress);
                    input[i].attachEvent("onblur", imeBlur)
                } else {
                    var oldkeyup = (input[i].onkeyup) ? input[i].onkeyup: function() {};
                    input[i].onkeyup = function() {
                        oldkeyup();
                        imeInput()
                    };
                    var oldkeydown = (input[i].onkeydown) ? input[i].onkeydown: function() {};
                    input[i].onkeydown = function() {
                        oldkeydown();
                        imeKeyDown()
                    };
                    var oldkeypress = (input[i].onkeypress) ? input[i].onkeypress: function() {};
                    input[i].onkeypress = function() {
                        oldkeypress();
                        imeKeyPress()
                    }
                }
            }
        }
        var textarea = opt.getElementsByTagName('textarea');
        for (var i = 0; i < textarea.length; i++) {
            if (location.href.indexOf("mail.sohu.com") != -1 && textarea[i].id == "reply_textarea") continue;
            if (textarea[i].imebind == undefined) {
                textarea[i].imebind = true;
                textarea[i].onkeyup = null;
                textarea[i].onkeypress = null;
                if (document.addEventListener) {
                    textarea[i].addEventListener("keyup", imeInput, true);
                    textarea[i].addEventListener("keydown", imeKeyDown, true);
                    textarea[i].addEventListener("keypress", imeKeyPress, true);
                    textarea[i].addEventListener("blur", imeBlur, true)
                } else if (document.attachEvent) {
                    textarea[i].detachEvent("onkeyup", textarea[i].onkeyup);
                    textarea[i].detachEvent("onkeypress", textarea[i].onkeypress);
                    textarea[i].attachEvent("onkeyup", imeInput);
                    textarea[i].attachEvent("onkeydown", imeKeyDown);
                    textarea[i].attachEvent("onkeypress", imeKeyPress);
                    textarea[i].detachEvent("onblur", textarea[i].onblur);
                    textarea[i].attachEvent("onblur", imeBlur)
                } else {
                    var oldkeyup = (textarea[i].onkeyup) ? textarea[i].onkeyup: function() {};
                    textarea[i].onkeyup = function() {
                        oldkeyup();
                        imeInput()
                    };
                    var oldkeydown = (textarea[i].onkeydown) ? textarea[i].onkeydown: function() {};
                    textarea[i].onkeydown = function() {
                        oldkeydown();
                        imeKeyDown()
                    };
                    var oldkeypress = (textarea[i].onkeypress) ? textarea[i].onkeypress: function() {};
                    textarea[i].onkeypress = function() {
                        oldkeypress();
                        imeKeyPress()
                    }
                }
            }
        }
        if (location.href.indexOf("web.qq.com") != -1) {
            var textarea = document.getElementsByTagName("textarea");
            for (var i = 0; i < textarea.length; i++) {
                if (textarea[i].id) {
                    if (textarea[i].id.indexOf("Tabs_Talk_group") != -1) {
                        obj = textarea[i].nextSibling;
                        if (!obj.imebind) {
                            obj.design = true;
                            obj.imebind = true;
                            imeBindObj(obj, "DESIGN")
                        }
                    }
                }
            }
        }
        if (opt.addEventListener) {
            try {
                opt.removeEventListener("keydown", imeBodyKeyDown, true);
                opt.removeEventListener("mousedown", imeBodyMouseDown, true);
                opt.removeEventListener("activate", imeBodyActive, true)
            } catch(e) {}
            opt.addEventListener("keydown", imeBodyKeyDown, true);
            opt.addEventListener("mousedown", imeBodyMouseDown, true);
            if (location.href.indexOf(".google.com") != -1 || location.href.indexOf("126.com") != -1 || location.href.indexOf("web.qq.com") != -1 || location.href.indexOf("mail.live.com") != -1 || location.href.indexOf(".hotmail.com") != -1 || location.href.indexOf(".xici.net") != -1) opt.addEventListener("DOMSubtreeModified", imeReBind, false);
            else opt.addEventListener("DOMNodeInserted", imeReBind, false)
        } else if (opt.attachEvent) {
            try {
                opt.detachEvent("onkeydown", imeBodyKeyDown);
                opt.detachEvent("onmousedown", imeBodyMouseDown);
                opt.detachEvent("onactivate", imeBodyActive)
            } catch(e) {}
            opt.attachEvent("onkeydown", imeBodyKeyDown);
            opt.attachEvent("onmousedown", imeBodyMouseDown);
            opt.attachEvent("onactivate", imeBodyActive)
        } else {
            var oldmousedown = (opt.onmousedown) ? opt.onmousedown: function() {};
            opt.onmousedown = function() {
                oldmousedown();
                imeBodyMouseDown()
            }
        }
        var iframe = opt.getElementsByTagName('iframe');
        for (var i = 0; i < iframe.length; i++) {
            try {
                if (iframe[i].contentDocument) {
                    var opt = iframe[i];
                    opt.imebind = true;
                    var opt2 = opt.contentDocument;
                    if (opt2.imebind == undefined) {
                        if ((opt2.designMode.toLowerCase() == "on" || opt2.body.contentEditable == "true")) {
                            opt.design = true;
                            imeBindObj(opt2, "DESIGN")
                        } else imeBindInput(opt2);
                        ime_iframe_arr.push(opt)
                    }
                } else if (iframe[i].contentWindow.document) {
                    var opt = iframe[i];
                    opt.imebind = true;
                    var opt2 = opt.contentWindow.document;
                    if (opt2.imebind == undefined) {
                        if ((opt2.designMode.toLowerCase() == "on" || opt2.body.contentEditable == "true")) {
                            opt.design = true;
                            imeBindObj(opt2, "DESIGN")
                        } else imeBindInput(opt2);
                        ime_iframe_arr.push(opt)
                    }
                }
            } catch(e) {}
        }
    } catch(e) {}
}
function imeReBind(e) {
    if (location.href.indexOf(".google.com") != -1 || location.href.indexOf("126.com") != -1 || location.href.indexOf("web.qq.com") != -1 || location.href.indexOf("mail.live.com") != -1 || location.href.indexOf(".hotmail.com") != -1 || location.href.indexOf(".xici.net") != -1) {
        if (ime_close) return
    } else {
        if (ime_close || !ime_detect) return
    }
    if (!ime_rebind_flag) return;
    if (ime_rebind_flag && ime_rebind_num == 0) {
        ime_rebind_flag = false;
        ime_rebind_num = 1;
        if (location.href.indexOf(".google.com") != -1 || location.href.indexOf("126.com") != -1 || location.href.indexOf("web.qq.com") != -1 || location.href.indexOf("mail.live.com") != -1 || location.href.indexOf(".hotmail.com") != -1 || location.href.indexOf(".xici.net") != -1) setTimeout(function() {
            ime_rebind_flag = true;
            me_rebind_num = 1;
            imeReBind();
            ime_rebind_flag = true;
            ime_rebind_num = 0
        },
        1200);
        else setTimeout(function() {
            ime_rebind_flag = true;
            me_rebind_num = 1;
            imeReBind();
            ime_rebind_flag = true;
            ime_rebind_num = 0
        },
        1200)
    }
    var iframe = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframe.length; i++) {
        try {
            if (iframe[i].contentDocument) {
                var opt = iframe[i];
                var opt2 = opt.contentDocument;
                opt2.imebind = true;
                if ((opt2.designMode.toLowerCase() == "on" || opt2.body.contentEditable == "true")) {
                    opt2.design = true;
                    imeBindObj(opt2, "DESIGN")
                } else imeBindInput(opt2);
                ime_iframe_arr.push(opt)
            }
        } catch(e) {}
    }
    if (location.href.indexOf("web.qq.com") != -1) {
        var textarea = document.getElementsByTagName("textarea");
        for (var i = 0; i < textarea.length; i++) {
            if (textarea[i].id) {
                if (textarea[i].id.indexOf("Tabs_Talk_group") != -1) {
                    obj = textarea[i].nextSibling;
                    if (!obj.imebind) {
                        obj.design = true;
                        obj.imebind = true;
                        imeBindObj(obj, "DESIGN")
                    }
                }
            }
        }
    }
    imeReBindTopElements(document)
}
function imeReBindTopElements(opt) {
    var input = opt.getElementsByTagName('input');
    for (var i = 0; i < input.length; i++) {
        if (input[i].type == "text" && input[i].imebind == undefined) {
            input[i].imebind = true;
            input[i].onkeyup = null;
            input[i].onkeypress = null;
            if (document.addEventListener) {
                input[i].addEventListener("keyup", imeInput, true);
                input[i].addEventListener("keydown", imeKeyDown, true);
                input[i].addEventListener("keypress", imeKeyPress, true);
                input[i].addEventListener("blur", imeBlur, true)
            }
        }
    }
    var textarea = opt.getElementsByTagName('textarea');
    for (var i = 0; i < textarea.length; i++) {
        textarea[i].imebind = true;
        textarea[i].onkeyup = null;
        textarea[i].onkeypress = null;
        if (document.addEventListener) {
            textarea[i].addEventListener("keyup", imeInput, true);
            textarea[i].addEventListener("keydown", imeKeyDown, true);
            textarea[i].addEventListener("keypress", imeKeyPress, true);
            textarea[i].addEventListener("blur", imeBlur, true)
        }
    }
}
function imeBodyActive(e) {
    var opt = e.srcElement;
    try {
        if (opt.contentWindow.document.imebind == undefined && opt.tagName == "IFRAME") {
            ime_iframe_arr.push(opt);
            var opt2 = opt.contentWindow.document;
            if ((opt2.designMode.toLowerCase() == "on" || opt2.body.contentEditable == "true")) {
                opt.design = true;
                imeBindObj(opt2, "DESIGN")
            } else imeBindInput(opt2)
        }
    } catch(e) {}
    setTimeout("imeBindInput(document)", 2000);
    setTimeout("imeBindInput(document)", 5000);
    setTimeout("imeBindInput(document)", 10000);
    setTimeout("imeBindInput(document)", 20000)
}
function imeBindObj(obj, type) {
    if (type == "INPUT" || type == "TEXTAREA" || type == "DESIGN") {
        if (location.href.indexOf("mail.sohu.com") != -1 && obj.id == "reply_textarea") return;
        obj.imebind = true;
        obj.onkeyup = null;
        obj.onkeypress = null;
        if (document.addEventListener) {
            obj.addEventListener("keyup", imeInput, true);
            obj.addEventListener("keydown", imeKeyDown, true);
            obj.addEventListener("keypress", imeKeyPress, true)
        } else if (document.attachEvent) {
            obj.detachEvent("onkeyup", obj.onkeyup);
            obj.detachEvent("onkeypress", obj.onkeypress);
            obj.attachEvent("onkeyup", imeInput);
            obj.attachEvent("onkeydown", imeKeyDown);
            obj.attachEvent("onkeypress", imeKeyPress)
        } else {
            var oldkeyup = (obj.onkeyup) ? obj.onkeyup: function() {};
            obj.onkeyup = function() {
                oldkeyup();
                imeInput()
            };
            var oldkeydown = (obj.onkeydown) ? obj.onkeydown: function() {};
            obj.onkeydown = function() {
                oldkeydown();
                imeKeyDown()
            };
            var oldkeypress = (obj.onkeypress) ? obj.onkeypress: function() {};
            obj.onkeypress = function() {
                oldkeypress();
                imeKeyPress()
            }
        }
    }
}
function imeBlur(e) {
    if (ime_close) return;
    var e = window.event || e;
    var opt = e.srcElement ? e.srcElement: e.target;
    ime_cur_input_obj = opt
}
function imeKeyPress(e, keyCode, isshift) {
    ime_detect = false;
    if (ime_close) return;
    if (e) {
        if (ime_fn_allow) return true;
        else if (!ime_opera_allow_press && ime_is_opera) e.preventDefault();
        else if (!ime_opera_allow_press && ime_is_ie) e.returnValue = false;
        else if (!ime_opera_allow_press && (ime_is_safari || ime_agent_modify)) e.preventDefault();
        var e = window.event || e;
        var key = e.which ? e.which: e.keyCode;
        if (e.ctrlKey && key != 190) return;
        var opt = e.srcElement ? e.srcElement: e.target;
        if (key >= 65 && key <= 90) var isCap = true;
        else if (key >= 97 && key <= 122) {
            key -= 32;
            var isCap = false
        }
        var keyCtrl = e.ctrlKey;
        var keyShift = e.shiftKey
    } else {
        if (!ime_cur_input_obj) return false;
        ime_cur_input_obj.focus();
        opt = ime_cur_input_obj;
        var key = parseInt(keyCode);
        var keyCtrl = false;
        var keyShift = isshift;
        var isCap = isshift
    }
    if (key >= 65 && key <= 90) {
        if (!ime_mode_ZH) {
            if (!ime_is_ie && !ime_is_safari && e) e.preventDefault();
            imeOutput(opt, 0, getModeInput(key, keyShift || isCap));
            if (ime_is_maxthon1) e.returnValue = false;
            return
        }
        if ((keyShift || isCap) && query == "") {
            if (!ime_is_ie && !ime_is_safari && e) e.preventDefault();
            imeOutput(opt, 0, ime_mode_BJ ? keyArr[key][3] : keyArr[key][4]);
            if (ime_is_maxthon1 && e) e.returnValue = false;
            return
        }
        if (keyShift || isCap) input = keyArr[key][3];
        else input = keyArr[key][0];
        query += input;
        ime_query_input += input;
        var layer = ime_getObj('ime_layer');
        var ime_query = ime_getObj('ime_query');
        if (ime_query_input.length >= 100) {
            var checkinput = ime_query_input;
            for (var i = 0; i < ime_part_key.length; i++) checkinput = checkinput.replace(ime_part_key[i], "");
            if (checkinput.length >= 100) {
                ime_query_input = ime_query_input.substring(0, ime_query_input.length - 1);
                query = query.substring(0, query.length - 1)
            }
        }
        ime_query.innerHTML = ime_query_input;
        with(ime_pos(opt)) {
            layer_x = x;
            layer_y = y
        }
        if (layer_x != old_x || layer_y != old_y) {
            layer.style.left = (layer_x + 10) + "px";
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
            clientHeight = document.documentElement.clientHeight || document.body.clientHeight || 0;
            if (clientHeight == 0) layer.style.top = (layer_y + opt.clientHeight + 3) + "px";
            else if ((layer_y + opt.clientHeight + 56) > (clientHeight + scrollTop)) layer.style.top = (layer_y - 53) + "px";
            else layer.style.top = (layer_y + opt.clientHeight + 3) + "px";
            old_x = layer_x;
            old_y = layer_y
        }
        layer.style.display = query == "" ? "none": "block";
        if (query == "") {
            ime_getObj("ime_res").innerHTML = "";
            ime_getObj("layer_tab").style.width = tab_len + "px"
        } else {
            ime_getObj("ime_query").innerHTML += '<span style="position:absolute;top:1px;background:url(' + ime_hosturl + 'images/ime_bit.gif) no-repeat -120px -53px;width:1px;height:22px;">'
        }
        var len = 0;
        for (var i = 0; i < ime_part_key.length; i++) {
            len += ime_part_key[i][0].length
        }
        len += (query.length / 2);
        len = 184 + len * 16;
        if (len > tab_len) {
            ime_getObj("layer_tab").style.width = len + "px";
            tab_len = len
        }
    }
}
function imeOperaKeyChange(keyvalue) {
    if (keyvalue == 61) return 187;
    else if (keyvalue == 47) return 111;
    else if (keyvalue == 42) return 106;
    else if (keyvalue == 43) return 107;
    else if (keyvalue == 45) return 109;
    else return keyvalue
}
function imeBodyKeyDown(e) {
    if (ime_close) return;
    var e = window.event || e;
    var key = e.which ? e.which: e.keyCode;
    switch (key) {
    case 27:
        if (query != "") {
            query = "";
            ime_query_input = "";
            ime_part_key = new Array;
            word = new Array;
            ime_getObj('ime_res').innerHTML = "";
            ime_getObj("ime_layer").style.display = "none"
        } else return;
        break
    }
}
function imeBodyMouseDown(e) {
    if (ime_close) return;
    var e = window.event || e;
    var key = e.which ? e.which: e.keyCode;
    var opt = e.srcElement ? e.srcElement: e.target;
    if (!opt.imebind) {
        if (opt.tagName == "INPUT" && opt.type == "text") imeBindObj(opt, "INPUT");
        else if (opt.tagName == "TEXTAREA") imeBindObj(opt, "TEXTAREA");
        else if ((opt.tagName == "HTML" || opt.tagName == "BODY") && (opt.ownerDocument.designMode.toLowerCase() == "on" || opt.ownerDocument.designMode.toLowerCase() == "true")) {
            imeBindObj(opt, "DESIGN")
        }
    }
}
function imeKeyDown(e, keyCode, isshift) {
    if (ime_close) return;
    if (e) {
        imeMouseStopChange(e);
        var e = window.event || e;
        var opt = e.srcElement ? e.srcElement: e.target;
        ime_cur_input_obj = opt;
        if (!e) e = window.event;
        var key = e.which ? e.which: e.keyCode;
        if (e.ctrlKey && key != 190) return;
        ime_opera_allow_press = ime_fn_allow = 0;
        if (ime_is_opera) key = imeOperaKeyChange(key);
        ime_only_shift = key == 16 ? 1 : 0;
        var keyCtrl = e.ctrlKey;
        var keyShift = e.shiftKey
    } else {
        if (!ime_cur_input_obj) return false;
        ime_cur_input_obj.focus();
        opt = ime_cur_input_obj;
        var key = parseInt(keyCode);
        var keyCtrl = false;
        var keyShift = isshift
    }
    if (ime_is_ff) {
        if (key == 173) key = 189;
        else if (key == 61) key = 187
    }
    var input = "";
    if (((key == 67 || key == 86) && keyCtrl) || (key <= 123 && key >= 112) || key == 35 || key == 36 || ((key == 33 || key == 34) && query == "") || key == 46 || key == 9) {
        ime_fn_allow = 1;
        return true
    }
    if (key == 224) ime_MacKey = 1;
    if (key == 84 && ime_MacKey) return true;
    switch (key) {
    case 46:
        return;
        break;
    case 27:
        if (query != "") {
            query = "";
            ime_query_input = "";
            ime_part_key = new Array
        } else {
            ime_opera_allow_press = 1;
            return
        }
        break;
    case 8:
    case 127:
        if (query != "") {
            if (ime_part_key.length) {
                var tmp_part = ime_part_key.pop();
                query = tmp_part[1] + query;
                ime_query_input = query;
                for (var i = ime_part_key.length; i > 0; i--) {
                    ime_query_input = ime_part_key[i - 1][0] + ime_query_input
                }
            } else {
                query = query.substr(0, query.length - 1);
                ime_query_input = query.replace(eval("/&/g"), "&amp;")
            }
        } else {
            ime_opera_allow_press = 1;
            return
        }
        if ((ime_is_ie || ime_is_safari) && e) e.returnValue = false;
        break;
    case 13:
        if (query != "") {
            imeOutput(opt, 0, -1);
            ime_query_input = "";
            query = "";
            input = "";
            ime_part_key = new Array;
            ime_getObj('ime_res').innerHTML = "";
            word = new Array;
            if (!ime_is_ie && !ime_is_safari && e) e.preventDefault();
            imeMouseStopChange(e);
            if (e) {
                if (ime_is_ie) e.returnValue = false;
                else e.preventDefault()
            }
        } else {
            ime_opera_allow_press = 1;
            return
        }
        break;
    case 32:
        if (keyShift) {
            imeModeChange(2, 4);
            if (!ime_is_ie && !ime_is_safari && e) e.preventDefault();
            return false
        }
        if (query != "") {
            imeOutput(opt, (focus_id - 1), "")
        } else {
            ime_opera_allow_press = 1;
            return
        }
        break;
    case 38:
        if (query != "") {
            if (ime_getObj("ime_res").innerHTML == "") {
                if (e) {
                    if (ime_is_ie) e.returnValue = false;
                    else e.preventDefault()
                }
                return false
            }
            if (focus_id > 1) {
                if (word[(focus_id - 2)][0] == "") return false;
                focus_id--
            } else {
                if (ime_query_page != 1) {
                    ime_query_page--;
                    imeShowRes(1);
                    focus_id = 5
                } else return false
            }
            focusChange(focus_id);
            return false
        } else {
            ime_opera_allow_press = 1;
            return
        }
        break;
    case 40:
        if (query != "") {
            if (ime_getObj("ime_res").innerHTML == "") {
                if (e) {
                    if (ime_is_ie) e.returnValue = false;
                    else e.preventDefault()
                }
                return false
            }
            if (focus_id < 5) {
                if (word[focus_id][0] == "") return false;
                focus_id++
            } else {
                if (ime_query_page < ime_query_page_max) {
                    ime_query_page++;
                    imeShowRes(1);
                    focus_id = 1
                } else {
                    imeChangePage(query, (Math.ceil((ime_query_page / 4))))
                }
            }
            focusChange(focus_id);
            return false
        } else {
            ime_opera_allow_press = 1;
            return
        }
        break;
    case 37:
        if (query == "") {
            ime_opera_allow_press = 1;
            return
        }
        break;
    case 39:
        if (query == "") {
            ime_opera_allow_press = 1;
            return
        }
        break;
    case 33:
        if (e) {
            if (!ime_is_ie && !ime_is_safari) e.preventDefault();
            else e.returnValue = false
        }
        if (ime_query_page != 1) {
            ime_query_page--;
            imeShowRes(1)
        }
        break;
    case 188:
    case 109:
    case 189:
        var patrn = /[A-Z0-9`~@#%&*$+-=\^\{\}\|_]+/;
        if (patrn.test(query) || (query != "" && key == 109 && (ime_is_ie || ime_is_safari)) || (query != "" && keyShift && (key == 109 || key == 188)) || (query != "" && keyShift && key == 189 && (ime_is_ie || ime_is_opera || ime_is_safari))) {
            if (key == 188) {
                if (!ime_is_ie && !ime_is_safari && e) e.preventDefault();
                imeOutput(opt, (focus_id - 1), getModeInput(key, keyShift));
                break
            }
            input = !keyShift ? keyArr[key][0] : keyArr[key][3];
            if (ime_is_ie) input = key == 109 ? "-": input;
            else if (ime_is_opera) input = key == 109 ? "_": input;
            query += input;
            ime_query_input += input;
            imeShowRes(0)
        } else if (query != "") {
            if (ime_query_page != 1) {
                ime_query_page--;
                imeShowRes(1)
            }
        } else imeOutput(opt, 0, getModeInput(key, keyShift));
        break;
    case 34:
        if (e) {
            if (!ime_is_ie && !ime_is_safari) e.preventDefault();
            else e.returnValue = false
        }
        if (query != "") {
            if (ime_query_page < ime_query_page_max) {
                ime_query_page++;
                imeShowRes(1)
            } else {
                if (ime_query_page % 4 != 0) imePageNote(3, 0);
                else imeChangePage(query, (Math.ceil((ime_query_page / 4))))
            }
        }
        break;
    case 190:
        if (keyCtrl) {
            imeModeChange(3, 4);
            if (!ime_is_ie && !ime_is_safari && e) e.preventDefault();
            return
        }
    case 107:
    case 187:
        var patrn = /[A-Z0-9`~@#%&*$+-=\^\{\}\|_]+/;
        var patrn2 = /[@]+/;
        if (patrn.test(query) || (query != "" && key == 107 && (ime_is_ie || ime_is_opera || ime_is_safari)) || (query != "" && keyShift && (key == 107 || key == 190)) || (query != "" && keyShift && key == 187 && (ime_is_ie || ime_is_opera || ime_is_safari))) {
            if (key == 190) {
                if (!ime_is_ie && !ime_is_safari && e) e.preventDefault();
                imeOutput(opt, (focus_id - 1), getModeInput(key, keyShift));
                break
            }
            input = !keyShift ? keyArr[key][0] : keyArr[key][3];
            input = key == 107 && (ime_is_ie || ime_is_opera || ime_is_safari) ? "+": input;
            query += input;
            ime_query_input += input;
            imeShowRes(0)
        } else if (query != "") {
            if (ime_query_page < ime_query_page_max) {
                ime_query_page++;
                imeShowRes(1)
            } else {
                if (ime_query_page % 4 != 0) imePageNote(3, 0);
                else imeChangePage(query, (Math.ceil((ime_query_page / 4))))
            }
        } else imeOutput(opt, 0, getModeInput(key, keyShift));
        break;
    case 192:
        if (keyShift) {
            if (query == "") {
                if (ime_mode_BJ) imeOutput(opt, 0, keyArr[key][3]);
                else imeOutput(opt, 0, keyArr[key][4])
            } else {
                input = keyArr[key][3];
                query += input;
                ime_query_input += input
            }
        } else {
            if (query == "") {
                imeOutput(opt, 0, getModeInput(key, keyShift))
            } else {
                input = keyArr[key][0];
                query += input;
                ime_query_input += input
            }
        }
        if (!ime_is_ie && !ime_is_safari && e) e.preventDefault();
        break;
    case 220:
    case 219:
    case 221:
        if (keyShift) {
            if (query == "") {
                imeOutput(opt, 0, getModeInput(key, keyShift));
                if (!ime_is_ie && !ime_is_safari && e) e.preventDefault()
            } else {
                input = keyArr[key][3];
                query += input;
                ime_query_input += input
            }
            break
        } else {
            imeOutput(opt, (focus_id - 1), getModeInput(key, keyShift));
            if (!ime_is_ie && !ime_is_safari && e) e.preventDefault();
            break
        }
    case 59:
    case 106:
    case 110:
    case 111:
    case 186:
    case 191:
    case 220:
        imeOutput(opt, (focus_id - 1), getModeInput(key, keyShift));
        if (!ime_is_ie && !ime_is_safari && e) e.preventDefault();
        break;
    case 222:
        var num = 0;
        if (ime_mode_BD) {
            if (keyShift) {
                num = 4;
                num += ime_double_quote == 0 ? 2 : 3;
                ime_double_quote = ime_double_quote == 1 ? 0 : 1
            } else {
                num = 0;
                num += ime_single_quote == 0 ? 2 : 3;
                ime_single_quote = ime_single_quote == 1 ? 0 : 1
            }
            if (!imeOutput(opt, (focus_id - 1), keyArr[222][num])) {
                if (keyShift) ime_double_quote = ime_double_quote == 1 ? 0 : 1;
                else ime_single_quote = ime_single_quote == 1 ? 0 : 1
            }
        } else if (!ime_mode_BJ) {
            num = keyShift ? 5 : 1;
            imeOutput(opt, (focus_id - 1), keyArr[222][num])
        } else {
            num = keyShift ? 4 : 0;
            imeOutput(opt, (focus_id - 1), keyArr[222][num])
        }
        if (!ime_is_ie && !ime_is_safari && e) e.preventDefault();
        break;
    case 96:
    case 97:
    case 98:
    case 99:
    case 100:
    case 101:
    case 102:
    case 103:
    case 104:
    case 105:
        if (query == "") {
            if (ime_mode_BJ) {
                imeOutput(opt, 0, keyArr[key][0]);
                if (!ime_is_ie && !ime_is_safari && e) e.preventDefault();
                return false
            } else {
                imeOutput(opt, 0, keyArr[key][2]);
                if (!ime_is_ie && !ime_is_safari && e) e.preventDefault();
                return false
            }
        } else {
            input = keyArr[key][0];
            query += input;
            ime_query_input += input
        }
        break
    }
    if (key >= 48 && key <= 57) {
        if (keyShift) {
            if ((key == 50) || (key == 51) || (key == 53) || (key == 55) || (key == 56) || (key == 52)) {
                if (query == "") {
                    if (key == 52) imeOutput(opt, 0, getModeInput(key, keyShift));
                    else imeOutput(opt, 0, keyArr[key][3])
                } else {
                    input = keyArr[key][3];
                    query += input;
                    if (key == 55) ime_query_input += "&amp;";
                    else ime_query_input += input
                }
            } else imeOutput(opt, (focus_id - 1), getModeInput(key, keyShift))
        } else {
            if (query == "") {
                if (ime_mode_BJ) {
                    imeOutput(opt, 0, keyArr[key][0]);
                    if (!ime_is_ie && !ime_is_safari && e) e.preventDefault();
                    if (ime_is_maxthon1 && e) e.returnValue = false;
                    return
                } else {
                    imeOutput(opt, 0, keyArr[key][2]);
                    if (!ime_is_ie && !ime_is_safari && e) e.preventDefault();
                    if (ime_is_maxthon1 && e) e.returnValue = false;
                    return
                }
            }
            input = keyArr[key][0];
            var patrn = /[A-Z0-9`~@#%&*$+-=\^\{\}\|_]+/;
            if (input > 0 && input < 6 && !patrn.test(query)) {
                imeOutput(opt, --input, "")
            } else {
                query += input;
                ime_query_input += input
            }
        }
    }
    if (!ime_is_ie && !ime_is_safari && !ime_agent_modify && e) e.preventDefault();
    if (ime_is_maxthon1 && e) e.returnValue = false;
    var layer = ime_getObj('ime_layer');
    var ime_query = ime_getObj('ime_query');
    if (ime_query_input.length >= 100) {
        var checkinput = ime_query_input;
        for (var i = 0; i < ime_part_key.length; i++) checkinput = checkinput.replace(ime_part_key[i], "");
        if (checkinput.length >= 100) {
            ime_query_input = ime_query_input.substring(0, ime_query_input.length - 1);
            query = query.substring(0, query.length - 1)
        }
    }
    ime_query.innerHTML = ime_query_input;
    with(ime_pos(opt)) {
        layer_x = x;
        layer_y = y
    }
    if (layer_x != old_x || layer_y != old_y) {
        layer.style.left = (layer_x + 10) + "px";
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
        clientHeight = document.documentElement.clientHeight || document.body.clientHeight || 0;
        if (clientHeight == 0) layer.style.top = (layer_y + opt.clientHeight + 3) + "px";
        else if ((layer_y + opt.clientHeight + 56) > (clientHeight + scrollTop)) layer.style.top = (layer_y - 53) + "px";
        else layer.style.top = (layer_y + opt.clientHeight + 3) + "px";
        old_x = layer_x;
        old_y = layer_y
    }
    layer.style.display = query == "" ? "none": "block";
    if (query == "") {
        ime_getObj("ime_res").innerHTML = "";
        ime_getObj("layer_tab").style.width = "334px"
    } else {
        ime_getObj("ime_query").innerHTML += '<span style="position:absolute;top:1px;background:url(' + ime_hosturl + 'images/ime_bit.gif) no-repeat -120px -53px;width:1px;height:22px;">'
    }
    var len = 0;
    for (var i = 0; i < ime_part_key.length; i++) {
        len += ime_part_key[i][0].length
    }
    len += (query.length / 2);
    len = 184 + len * 16;
    if (len > tab_len) {
        ime_getObj("layer_tab").style.width = len + "px";
        tab_len = len
    }
    return
}
function imeInsert(opt, val) {
    var doc = opt.ownerDocument;
    if (ime_is_ie) {
        var range = doc.selection.createRange();
        range.select();
        range.pasteHTML(val);
        range.collapse(false);
        range.select()
    } else doc.execCommand("insertHTML", false, val)
}
function imeOutput(opt, num, input) {
    if (opt.tagName == "BODY" || opt.tagName == "HTML" || opt.contentEditable == "true") {
        if (query == "" || input == -1) {
            input = input == -1 ? ime_query_input.replace(eval("/&amp;/g"), "&") : input;
            input = ime_mode_BJ ? input: imeToDBC(input);
            imeInsert(opt, input);
            word = new Array;
            return true
        }
        if (ime_mode_ZH) {
            if (word.length != 6) return false;
            if (query != word[5][0]) return false
        }
        if (query.length == word[num][1] || input != "") {
            var val = "";
            var output = "";
            for (var i = 0; i < ime_part_key.length; i++) {
                output += ime_part_key[i][0]
            }
            input = input == -2 ? "": input;
            val = ime_mode_BJ ? output + word[num][0] + input: imeToDBC(output + word[num][0] + input);
            imeInsert(opt, val);
            imePingBack();
            query = "";
            ime_query_input = "";
            ime_part_key = new Array;
            ime_getObj('ime_res').innerHTML = "";
            word = new Array;
            return true
        } else {
            ime_part_key.push(Array(word[num][0], query.substring(0, word[num][1])));
            query = query.substr(word[num][1]);
            ime_query_input = "";
            for (var i = 0; i < ime_part_key.length; i++) {
                ime_query_input += ime_part_key[i][0]
            }
            ime_query_input += query;
            return true
        }
    } else {
        var val = opt.value != undefined ? opt.value: opt.innerHTML;
        if (query == "" || input == -1) {
            var input_pos = imeGetCurSor(opt).split("|");
            var isInsert = input_pos[1] != val.length ? 1 : 0;
            var input = input == -1 ? ime_query_input.replace(eval("/&amp;/g"), "&") : input;
            if (ime_mode_BJ) val = val.substr(0, input_pos[0]) + input + val.substr(input_pos[1], val.length);
            else val = val.substr(0, input_pos[0]) + imeToDBC(input) + val.substr(input_pos[1], val.length);
            if (opt.value != undefined) {
                opt.value = val
            } else if (opt.innerHTML != undefined) {
                opt.innerHTML = val
            }
            if (isInsert) {
                movePoint(opt, parseInt(input_pos[0]) + (input).length)
            } else movePoint(opt, val.length);
            word = new Array;
            return true
        }
        if (ime_mode_ZH) {
            if (word.length != 6) return false;
            if (query != word[5][0]) return false
        }
        if (query.length == word[num][1] || input != "") {
            var output = "";
            for (var i = 0; i < ime_part_key.length; i++) {
                output += ime_part_key[i][0]
            }
            var input_pos = imeGetCurSor(opt).split("|");
            input = input == -2 ? "": input;
            var isInsert = input_pos[1] != val.length ? 1 : 0;
            if (ime_mode_BJ) val = val.substr(0, input_pos[0]) + output + word[num][0] + input + val.substr(input_pos[1], val.length);
            else val = val.substr(0, input_pos[0]) + imeToDBC(output + word[num][0] + input) + val.substr(input_pos[1], val.length);
            if (opt.value != undefined) {
                opt.value = val
            } else if (opt.innerHTML != undefined) {
                opt.innerHTML = val
            }
            if (isInsert) movePoint(opt, parseInt(input_pos[0]) + (output + word[num][0] + input).length);
            else movePoint(opt, val.length);
            imePingBack();
            query = "";
            ime_query_input = "";
            ime_part_key = new Array;
            ime_getObj('ime_res').innerHTML = "";
            word = new Array;
            return true
        } else {
            ime_part_key.push(Array(word[num][0], query.substring(0, word[num][1])));
            query = query.substr(word[num][1]);
            ime_query_input = "";
            for (var i = 0; i < ime_part_key.length; i++) {
                ime_query_input += ime_part_key[i][0]
            }
            ime_query_input += query;
            return true
        }
    }
    ime_detect = true
}
function imeMouseInput(n) {
    ime_cur_input_obj.focus();
    imeOutput(ime_cur_input_obj, n, "");
    var ime_query = ime_getObj('ime_query');
    var layer = ime_getObj('ime_layer');
    ime_query.innerHTML = ime_query_input;
    layer.style.display = query == "" ? "none": "block";
    if (query == "") {
        ime_getObj("ime_res").innerHTML = "";
        ime_getObj("layer_tab").style.width = "334px"
    }
    var len = 0;
    for (var i = 0; i < ime_part_key.length; i++) {
        len += ime_part_key[i][0].length
    }
    len += (query.length / 2);
    len = 184 + len * 16;
    if (len > tab_len) {
        ime_getObj("layer_tab").style.width = len + "px";
        tab_len = len
    }
    ime_query_page = 1;
    ime_query_page_max = 1;
    var patrn = /[A-Z0-9`~@#%&*$+-=\^\{\}\|_]+/;
    if (!patrn.test(query)) {
        ime_request_waiting = query;
        imeCreateRequest(query)
    } else {
        imeShowRes(0)
    }
}
function imeModeChange(type, mode) {
    if (mode == 0 || mode == 4) {
        switch (type) {
        case 1:
            if (ime_mode_ZH && query != "") imeOutput(ime_cur_input_obj, 0, -1);
            if (mode == 4) ime_getObj('ime_mode_ZH').className = ime_mode_ZH == 1 ? "ime_cloud_en1": "ime_cloud_zh1";
            else ime_getObj('ime_mode_ZH').className = ime_mode_ZH == 1 ? "ime_cloud_en2": "ime_cloud_zh1";
            ime_mode_ZH = ime_mode_ZH == 1 ? 0 : 1;
            ime_getObj('ime_mode_BD').className = ime_mode_ZH == 0 ? "ime_cloud_be1": "ime_cloud_bd1";
            ime_mode_BD = ime_mode_ZH == 1 ? 1 : 0;
            ime_getObj('ime_layer').style.display = "none";
            ime_getObj('ime_res').innerHTML = "";
            query = "";
            ime_query_input = "";
            break;
        case 2:
            if (mode == 4) ime_getObj('ime_mode_BJ').className = ime_mode_BJ == 1 ? "ime_cloud_qj1": "ime_cloud_bj1";
            else ime_getObj('ime_mode_BJ').className = ime_mode_BJ == 1 ? "ime_cloud_qj2": "ime_cloud_bj2";
            ime_mode_BJ = ime_mode_BJ == 1 ? 0 : 1;
            break;
        case 3:
            if (mode == 4) ime_getObj('ime_mode_BD').className = ime_mode_BD == 1 ? "ime_cloud_be1": "ime_cloud_bd1";
            else ime_getObj('ime_mode_BD').className = ime_mode_BD == 1 ? "ime_cloud_be2": "ime_cloud_bd2";
            ime_mode_BD = ime_mode_BD == 1 ? 0 : 1;
            ime_getObj('ime_mode_ZH').className = ime_mode_BD == 1 ? "ime_cloud_zh1": ime_getObj('ime_mode_ZH').className;
            ime_mode_ZH = ime_mode_BD == 1 ? 1 : ime_mode_ZH;
            break
        }
    } else if (mode == 1) {
        switch (type) {
        case 1:
            ime_getObj('ime_mode_ZH').className = ime_mode_ZH == 0 ? "ime_cloud_en2": "ime_cloud_zh2";
            break;
        case 2:
            ime_getObj('ime_mode_BJ').className = ime_mode_BJ == 0 ? "ime_cloud_qj2": "ime_cloud_bj2";
            break;
        case 3:
            ime_getObj('ime_mode_BD').className = ime_mode_BD == 0 ? "ime_cloud_be2": "ime_cloud_bd2";
            break;
        case 4:
            ime_getObj('ime_mode_close').className = "ime_cloud_cl2";
            break
        }
    } else if (mode == 2) {
        switch (type) {
        case 1:
            ime_getObj('ime_mode_ZH').className = ime_mode_ZH == 0 ? "ime_cloud_en1": "ime_cloud_zh1";
            break;
        case 2:
            ime_getObj('ime_mode_BJ').className = ime_mode_BJ == 0 ? "ime_cloud_qj1": "ime_cloud_bj1";
            break;
        case 3:
            ime_getObj('ime_mode_BD').className = ime_mode_BD == 0 ? "ime_cloud_be1": "ime_cloud_bd1";
            break;
        case 4:
            ime_getObj('ime_mode_close').className = "ime_cloud_cl1";
            break
        }
    } else if (mode == 3) {
        switch (type) {
        case 1:
            ime_getObj('ime_mode_ZH').className = ime_mode_ZH == 0 ? "ime_cloud_en3": "ime_cloud_zh3";
            break;
        case 2:
            ime_getObj('ime_mode_BJ').className = ime_mode_BJ == 0 ? "ime_cloud_qj3": "ime_cloud_bj3";
            break;
        case 3:
            ime_getObj('ime_mode_BD').className = ime_mode_BD == 0 ? "ime_cloud_be3": "ime_cloud_bd3";
            break;
        case 4:
            ime_getObj('ime_mode_close').className = "ime_cloud_cl3";
            break
        }
    }
}
function imeInput(e, keyCode) {
    if (ime_close) return;
    if (e) {
        var e = window.event || e;
        var opt = document.activeElement;
        var key = e.which ? e.which: e.keyCode
    } else {
        var key = keyCode
    }
    if (key == 16 && ime_only_shift) {
        imeModeChange(1, 4);
        ime_only_shift = 0
    }
    if (key == 224) ime_MacKey = 0;
    if ((query != "") && ((key >= 65 && key <= 90) || (key == 8) || (key == 13) || (key == 32) || (key == 192) || (key >= 219 && key <= 221) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105))) {
        ime_query_page = 1;
        ime_query_page_max = 1;
        var patrn = /[A-Z0-9`~@#%&*$+-=\^\{\}\|_]+/;
        if (!patrn.test(query)) {
            ime_request_waiting = query;
            imeCreateRequest(query)
        } else {
            imeShowRes(0)
        }
    }
}
function imeChangePage(q, p) {
    if (ime_getObj("ime_forward").className != "ime_cloud_forward1") {
        var fileref = document.createElement('script');
        fileref.id = "ime_js_" + q + p;
        fileref.setAttribute("type", "text/javascript");
        fileref.src = "http://web.pinyin.sogou.com/api/py?key=" + ime_patch_key + "&query=" + q + "&p=" + p;
        ime_pingback_keyup = new Date().getTime();
        document.body.appendChild(fileref);
        setTimeout("imeOverRequest(\"ime_js_" + q + p + "\")", 10000)
    }
}
function imeCreateRequest(q, p) {
    if (ime_request_on) {
        var q = ime_request_waiting;
        ime_request_waiting = "";
        ime_request_on = 0;
        eval('ime_fetch_' + q + '=setTimeout("imeTimeOut()",0);');
        var fileref = document.createElement('script');
        fileref.id = "ime_js_" + q;
        fileref.setAttribute("type", "text/javascript");
        fileref.src = "http://web.pinyin.sogou.com/api/py?key=" + ime_patch_key + "&query=" + q;
        ime_pingback_keyup = new Date().getTime();
        document.body.appendChild(fileref);
        setTimeout("imeOverRequest(\"ime_js_" + q + "\")", 10000)
    }
}
function imeTimeOut() {
    ime_request_on = 1;
    if (ime_request_waiting != "") {
        imeCreateRequest(ime_request_waiting)
    }
}
function imeOverRequest(q) {
    try {
        var ime_js = ime_getObj(q);
        document.body.removeChild(ime_js)
    } catch(e) {}
}
function ime_callback(ime_get_res, ime_get_key, p) {
    var t = new Date().getTime();
    if (t > ime_pingback_keyup) ime_pingback_showres = t - ime_pingback_keyup;
    try {
        eval('clearTimeout(ime_fetch_' + ime_get_key + ');')
    } catch(e) {}
    try {
        ime_get_res = decodeURIComponent(ime_get_res);
        ime_get_key = decodeURIComponent(ime_get_key)
    } catch(e) {}
    if (p == 0) {
        ime_request_on = 1;
        if (ime_request_waiting != "") {
            imeCreateRequest(ime_request_waiting)
        }
        if (query == ime_get_key) {
            ime_query_res = ime_get_res;
            ime_query_key = ime_get_key;
            imeShowRes(1)
        }
    } else if (p > 0 && ime_get_key == query && ime_query_res != -1) {
        if (ime_query_res.split("\t+").length <= p * 20 && ime_get_res != "") {
            ime_query_res += "\t+" + ime_get_res;
            ime_query_page++;
            imeShowRes(1)
        } else imePageNote(3, 0)
    }
}
function imeShowRes(isreturn) {
    if (query == ime_query_key || !isreturn) {
        var tmp_key = ime_query_key;
        if (ime_query_res == "" || !isreturn) {
            ime_query_key = isreturn ? ime_query_key: query;
            word = new Array(Array(ime_query_key, ime_query_key.length), Array(ime_query_key, ime_query_key.length), Array(ime_query_key, ime_query_key.length), Array(ime_query_key, ime_query_key.length), Array(ime_query_key, ime_query_key.length), Array(ime_query_key, ime_query_key.length));
            ime_query_res = -1;
            clearTimeout(ime_settime);
            ime_settime = -1;
            focus_id = 1;
            imePageNote(0, 0);
            ime_getObj("ime_res").innerHTML = "";
            var len = 0;
            for (var i = 0; i < ime_part_key.length; i++) {
                len += ime_part_key[i][0].length
            }
            tab_len = 334;
            len += (query.length / 2);
            len = 184 + len * 16 > tab_len ? 184 + len * 16 : tab_len;
            tab_len = len;
            ime_getObj("layer_tab").style.width = tab_len + "px";
            return
        }
        var tmp_res = ime_query_res.split("\t+");
        ime_query_page_max = Math.ceil(tmp_res.length * 1.0 / 5);
        if (isreturn == 2 || isreturn == 3) imePageNote(isreturn, isreturn);
        else imePageNote(1, 1);
        var len = 0;
        word = new Array;
        for (var i = 0, j = (ime_query_page - 1) * 5; j < tmp_res.length && j < ime_query_page * 5; i++, j++) {
            word[i] = tmp_res[j].split("：");
            len += word[i][0].length
        }
        while (word.length < 5) word.push(Array("", "0"));
        word[5] = Array(tmp_key, tmp_key.length);
        var len2 = 0;
        for (var i = 0; i < ime_part_key.length; i++) {
            len2 += ime_part_key[i][0].length
        }
        len2 += (query.length / 2);
        if (len < 10) len = 10;
        len = len > len2 ? len: len2;
        len = 184 + len * 16;
        if ((isreturn != 2 && isreturn != 3) || parseInt(len) > parseInt(tab_len)) {
            ime_getObj("layer_tab").width = len + "px";
            tab_len = len
        }
        var html = "";
        for (var i = 0; i < 5; i++) {
            if (word[i][0]) {
                if (word[i][0] != "") {
                    if (i == 0) html += "<font id='ime_item_" + (i + 1) + "' onclick=\"imeMouseInput(" + i + ")\" style='color:#f00;cursor:pointer;font-size:16px;font-weight:normal;line-height:26px;'>" + eval(i + " + 1") + "." + word[i][0] + "</font> ";
                    else html += "<font id='ime_item_" + (i + 1) + "' onclick=\"imeMouseInput(" + i + ")\" style='color:#0082e5;cursor:pointer;font-size:16px;font-weight:normal;line-height:26px;'>" + eval(i + " + 1") + "." + word[i][0] + "</font> "
                }
            }
        }
        focus_id = 1;
        html += "\n";
        var layer = ime_getObj("ime_res");
        ime_getObj("layer_tab").style.width = tab_len + "px";
        layer.innerHTML = html;
        clearTimeout(ime_settime);
        ime_settime = -1
    }
}
function imeCancel(e) {
    var layer = ime_getObj('ime_layer');
    layer.style.display = "none"
}
function imePageNote(back, forward) {
    if (ime_query_page != 1 && back) {
        ime_getObj("ime_back").className = back == 2 ? "ime_cloud_back3": "ime_cloud_back2";
        ime_getObj("ime_back").style.cursor = "pointer"
    } else {
        ime_getObj("ime_back").className = "ime_cloud_back1";
        ime_getObj("ime_back").style.cursor = "default"
    }
    if (forward) {
        ime_getObj("ime_forward").className = forward == 3 ? "ime_cloud_forward3": "ime_cloud_forward2";
        ime_getObj("ime_forward").style.cursor = "pointer"
    } else {
        ime_getObj("ime_forward").className = "ime_cloud_forward1";
        ime_getObj("ime_forward").style.cursor = "default"
    }
}
function imeMouseStopChange(e) {
    if (e && e.stopPropagation) {
        e.stopPropagation()
    } else {
        e.cancelBubble = true
    }
    return false
}
function imePageRun(type, e) {
    if (type == 0) ime_settime_page = setTimeout("imePageAuto(0)", 500);
    else if (type == 1) ime_settime_page = setTimeout("imePageAuto(1)", 500);
    imeMouseStopChange(e)
}
function imePageStop(type) {
    clearTimeout(ime_settime_page);
    if (type == 0 && ime_getObj("ime_back").className != "ime_cloud_back1") {
        ime_query_page--;
        imeShowRes(2)
    } else if (type == 1 && ime_getObj("ime_forward").className != "ime_cloud_forward1") {
        if (ime_query_page < ime_query_page_max) {
            ime_query_page++;
            imeShowRes(3)
        } else imeChangePage(query, (Math.ceil((ime_query_page / 4))))
    }
    ime_cur_input_obj.focus()
}
function imePageAuto(type) {
    if (type == 0 && ime_getObj("ime_back").className != "ime_cloud_back1") {
        ime_query_page--;
        imeShowRes(2);
        ime_settime_page = setTimeout("imePageAuto(0)", 300)
    } else if (type == 1 && ime_getObj("ime_forward").className != "ime_cloud_forward1") {
        if (ime_query_page < ime_query_page_max) {
            ime_query_page++;
            imeShowRes(3)
        } else imeChangePage(query, (Math.ceil((ime_query_page / 4))));
        ime_settime_page = setTimeout("imePageAuto(1)", 300)
    } else clearTimeout(ime_settime_page)
}
var ime_pos = function(o) {
    if (location.href.indexOf("mail.google") != -1 || location.href.indexOf("xici.net") != -1) {
        x = document.documentElement.scrollLeft || document.body.scrollLeft || 0 + 200;
        y = document.documentElement.scrollTop || document.body.scrollTop || 0 + 200;
        return {
            'x': x,
            'y': y
        }
    }
    try {
        var obj = o;
        var x = 0,
        y = 0,
        n;
        do {
            x += o.offsetLeft, y += o.offsetTop;
            n = o;
            o = o.offsetParent
        } while ( o );
        if (n = n.ownerDocument) {
            if (n.URL != location.href) {
                for (var i = 0; i < ime_iframe_arr.length; i++) {
                    if (ime_iframe_arr[i].src.substring(0, 1) == "/") var ime_iframe_url = "http://" + document.domain + ime_iframe_arr[i].src;
                    else if (ime_iframe_arr[i].src.substring(0, 2) == "./") var ime_iframe_url = "http://" + document.domain + ime_iframe_arr[i].src.substring(1);
                    else var ime_iframe_url = location.href.substring(0, location.href.lastIndexOf("/") + 1) + ime_iframe_arr[i].src;
                    if ((ime_iframe_arr[i].src == n.URL || ime_iframe_url == n.URL) && ime_iframe_arr[i].src != "") {
                        o = ime_iframe_arr[i];
                        do {
                            x += o.offsetLeft, y += o.offsetTop
                        } while ( o = o . offsetParent );
                        break
                    }
                }
            }
        }
        if (x <= 10 && y <= 10) {
            x = document.documentElement.scrollLeft || document.body.scrollLeft || 0 + 200;
            y = document.documentElement.scrollTop || document.body.scrollTop || 0 + 200
        }
        return {
            'x': x,
            'y': y
        }
    } catch(e) {
        x = document.documentElement.scrollLeft || document.body.scrollLeft || 0 + 200;
        y = document.documentElement.scrollTop || document.body.scrollTop || 0 + 200;
        return {
            'x': x,
            'y': y
        }
    }
};
function imeMouseOverPage(type) {
    if (type == 0 && ime_getObj("ime_back").className == "ime_cloud_back2") {
        ime_getObj("ime_back").className = "ime_cloud_back3"
    } else if (type == 1 && ime_getObj("ime_forward").className == "ime_cloud_forward2") {
        ime_getObj("ime_forward").className = "ime_cloud_forward3"
    }
}
function imeMouseOutPage(type) {
    if (type == 0 && ime_getObj("ime_back").className == "ime_cloud_back3") {
        ime_getObj("ime_back").className = "ime_cloud_back2"
    } else if (type == 1 && ime_getObj("ime_forward").className == "ime_cloud_forward3") {
        ime_getObj("ime_forward").className = "ime_cloud_forward2"
    }
}
function imeGetPos(event) {
    try {
        if (ime_is_opera) {
            ime_x = event.clientX + window.pageXOffset;
            ime_y = event.clientY + window.pageYOffset
        } else if (ime_is_ie) {
            ime_x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
            ime_y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop
        } else {
            ime_x = event.clientX + window.scrollX;
            ime_y = event.clientY + window.scrollY
        }
    } catch(x) {}
    if (!ime_isInteger(ime_x)) ime_x = 200;
    if (!ime_isInteger(ime_y)) ime_y = 200
}
function ime_isInteger(s) {
    return (s.toString().search(/^-?[0-9]+$/) == 0)
}
function ime_moveobj(obj) {
    ime_getObj(obj).onmousedown = function(e) {
        drag_ = true;
        ime_scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
        with(this) {
            if (ime_is_safari) {
                document.onselectstart = function() {
                    return false
                }
            }
            if (style.position == "fixed") {
                style.position = "absolute";
                if (obj == "ime_status") style.top = parseInt(style.top.replace("px", "")) + ime_scrollTop + "px"
            }
            if (!ime_is_ie6) {
                ime_getObj(obj).style.cursor = "move"
            }
            temp1 = offsetLeft;
            temp2 = offsetTop;
            if (ime_is_ie) {
                x = event.clientX;
                y = event.clientY;
                document.onmousemove = function(e) {
                    if (drag_ == false) return false;
                    with(this) {
                        if (temp1 + event.clientX - x < 0) style.left = "0px";
                        else if (document.documentElement.clientWidth && document.documentElement.clientWidth - temp1 - event.clientX + x < 160) style.left = document.documentElement.clientWidth - 160 + "px";
                        else style.left = temp1 + event.clientX - x + "px";
                        if (temp2 + event.clientY - y - ime_scrollTop < 0) style.top = ime_scrollTop + "px";
                        else if (document.documentElement.clientHeight && document.documentElement.clientHeight + ime_scrollTop - temp2 - event.clientY + y < 50) style.top = document.documentElement.clientHeight + ime_scrollTop - 50 + "px";
                        else style.top = temp2 + event.clientY - y + "px";
                        return false
                    }
                }
            } else {
                x = e.pageX;
                y = e.pageY;
                document.onmousemove = function(e) {
                    if (drag_ == false) return false;
                    with(this) {
                        if (temp1 + e.pageX - x < 0) style.left = "0px";
                        else if (document.documentElement.clientWidth && document.documentElement.clientWidth - temp1 - e.pageX + x < 160) style.left = document.documentElement.clientWidth - 160 + "px";
                        else style.left = temp1 + e.pageX - x + "px";
                        if (temp2 + e.pageY - y < 0) style.top = "0px";
                        else style.top = temp2 + e.pageY - y + "px";
                        ime_getObj("ime_layer").focus();
                        ime_getObj("ime_layer").blur();
                        return false
                    }
                }
            }
            document.onmouseup = function(e) {
                drag_ = false;
                with(this) {
                    if (ime_is_ie) {
                        document.onmousemove = null
                    }
                    if (ime_is_safari) document.onselectstart = null;
                    ime_scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
                    if (!ime_is_ie6 && ime_compatMode) {
                        ime_getObj(obj).style.cursor = "default";
                        if (style.position == "absolute" && obj == "ime_status" && ime_compatMode) style.top = parseInt(style.top.replace("px", "")) - ime_scrollTop + "px";
                        if (obj == "ime_status" && ime_compatMode) style.position = "fixed"
                    } else style.position = "absolute";
                    if ((ime_is_ie6 || !ime_compatMode) && obj == "ime_status") ime_ie6_status_top = parseInt((ime_getObj(obj).style.top.replace("px", "")) - ime_scrollTop);
                    if (!ime_is_ie6 && !ime_compatMode) ime_getObj(obj).style.cursor = "default"
                }
            }
        }
    }
}
function focusChange(n) {
    try {
        ime_getObj("ime_item_1").style.color = "#0082e5";
        ime_getObj("ime_item_2").style.color = "#0082e5";
        ime_getObj("ime_item_3").style.color = "#0082e5";
        ime_getObj("ime_item_4").style.color = "#0082e5";
        ime_getObj("ime_item_5").style.color = "#0082e5";
        ime_getObj("ime_item_" + n).style.color = "#f00"
    } catch(e) {}
}
function imeGetCurSor(obj) {
    var val = obj.value != undefined ? obj.value: obj.innerHTML;
    var result = 0;
    if (obj.selectionStart != undefined) {
        result = obj.selectionStart + "|" + obj.selectionEnd
    } else {
        var rng;
        if (obj.tagName == "TEXTAREA") {
            var range = obj.ownerDocument.selection.createRange();
            var range_all = obj.ownerDocument.body.createTextRange();
            range_all.moveToElementText(obj);
            for (var start = 0; range_all.compareEndPoints("StartToStart", range) < 0; start++) {
                range_all.moveStart('character', 1)
            }
            for (var i = 0; i <= start; i++) {
                if (val.charAt(i) == '\n') start++
            }
            var range_all = obj.ownerDocument.body.createTextRange();
            range_all.moveToElementText(obj);
            for (var end = 0; range_all.compareEndPoints('StartToEnd', range) < 0; end++) {
                range_all.moveStart('character', 1)
            }
            for (var i = 0; i <= end; i++) {
                if (val.charAt(i) == '\n') end++
            }
            return start + "|" + end
        } else {
            rng = document.selection.createRange()
        }
        rng.moveStart("character", -val.length);
        result = rng.text.length;
        result = result + "|" + result
    }
    return result
}
function movePoint(obj, n) {
    if (obj.selectionStart != undefined) {
        obj.selectionStart = n;
        obj.selectionEnd = n
    } else {
        var pn = parseInt(n);
        if (isNaN(pn)) return;
        var rng = obj.createTextRange();
        var note = 0;
        for (var i = 0; i <= pn; i++) {
            if (rng.text.charAt(i) == '\n') note++
        }
        pn -= note;
        rng.moveStart("character", pn);
        rng.collapse(true);
        rng.select()
    }
}
function getModeInput(key, isshift) {
    if (ime_mode_ZH) {
        if (ime_mode_BJ) {
            if (ime_mode_BD) {
                return isshift ? keyArr[key][5] : keyArr[key][2]
            } else return isshift ? keyArr[key][3] : keyArr[key][0]
        } else if (ime_mode_BD) return isshift ? keyArr[key][5] : keyArr[key][2];
        else return isshift ? keyArr[key][4] : keyArr[key][1]
    } else {
        if (ime_mode_BJ) {
            return isshift ? keyArr[key][3] : keyArr[key][0]
        } else {
            return isshift ? keyArr[key][4] : keyArr[key][1]
        }
    }
}
function imeClose() {
    ime_close = ime_close == 1 ? 0 : 1;
    ime_getObj("ime_layer").style.display = "none";
    ime_getObj("ime_query").innerHTML = "";
    ime_getObj("ime_res").innerHTML = "";
    query = "";
    ime_query_input = "";
    ime_part_key = new Array;
    word = new Array;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
    var ime_clientWidth = window.top.window.innerWidth ? window.top.window.innerWidth: document.documentElement.clientWidth || document.body.clientWidth;
    var ime_clientHeight = window.top.window.innerHeight ? window.top.window.innerHeight: document.documentElement.clientHeight || document.body.clientHeight;
    if (ime_clientHeight < 62) ime_clientHeight = 82;
    ime_getObj("ime_status").style.left = (ime_clientWidth - 156) + "px";
    ime_getObj("ime_status").style.top = (ime_is_ie6 || !ime_compatMode) ? (scrollTop + ime_clientHeight - 62) + "px": (ime_clientHeight - 62) + "px";
    ime_getObj("ime_status").style.display = ime_close == 0 ? "": "none"
}
function imeKeyBoard() {
    var keyboard = ime_getObj("ime_keyboard");
    keyboard.style.display = keyboard.style.display == "none" ? "": "none"
}
function imeToSBC(str, flag) {
    var i;
    var result = '';
    for (i = 0; i < str.length; i++) {
        str1 = str.charCodeAt(i);
        if (str1 < 65296) {
            result += String.fromCharCode(str.charCodeAt(i));
            continue
        }
        if (str1 < 125 && !flag) result += String.fromCharCode(str.charCodeAt(i));
        else result += String.fromCharCode(str.charCodeAt(i) - 65248)
    }
    return result
}
function imeToDBC(txtstring) {
    var tmp = "";
    for (var i = 0; i < txtstring.length; i++) {
        if (txtstring.charCodeAt(i) == 32) {
            tmp = tmp + String.fromCharCode(12288)
        } else if ((txtstring.charCodeAt(i) == 96) || (txtstring.charCodeAt(i) == 126) || (txtstring.charCodeAt(i) == 64) || (txtstring.charCodeAt(i) == 35) || (txtstring.charCodeAt(i) == 37) || (txtstring.charCodeAt(i) == 38) || (txtstring.charCodeAt(i) == 42)) {
            tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248)
        } else if (txtstring.charCodeAt(i) < 127) {
            tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248)
        } else tmp += txtstring.substr(i, 1)
    }
    return tmp
}
if (typeof(ime_close) == "undefined") {
    var ime_is_opera = 0;
    var ime_is_ie = 0;
    var ime_is_ie6 = 0;
    var ime_is_safari = 0;
    var ime_is_ff = 0;
    var ime_is_maxthon1 = 0;
    var ime_agent_modify = 0;
    var x, y;
    var layer_x = 0;
    var layer_y = 0;
    var old_x = 0;
    var old_y = 0;
    var drag_ = false;
    var keyArr = new Array;
    var query = "";
    var layer_pos = 0;
    var word = new Array();
    var tab_len = 334;
    var focus_id = 1;
    var ime_settime = -1;
    var ime_request_settime = -1;
    var ime_query_key = -1;
    var ime_query_res = -1;
    var ime_part_key = new Array();
    var ime_query_input = "";
    var ime_settime_page = -1;
    var ime_query_page = 1;
    var ime_query_page_max = 1;
    var ime_only_shift = 0;
    var ime_mode_ZH = 1;
    var ime_mode_BJ = 1;
    var ime_mode_BD = 1;
    var ime_close = 0;
    var ime_cur_input_obj;
    var ime_opera_allow_press = 0;
    var ime_fn_allow = 0;
    var ime_cur_rng;
    var ime_cur_cursor = 0;
    var ime_ie6_status_top = document.documentElement.clientHeight - 62;
    var ime_single_quote = 0;
    var ime_double_quote = 0;
    var ime_scrollTop = 0;
    var ime_iframe_arr = new Array;
    var ime_compatMode = 0;
    var ime_pingback_keyup = 0;
    var ime_pingback_showres = 0;
    var ime_request_on = 1;
    var ime_request_waiting = "";
    var ime_rebind_flag = true,
    ime_rebind_num = 0;
    var ime_detect = true;
    var ime_MacKey = 0;
    var ime_patch_key = "dfGgDFhrC4B34";
    var ime_webqq_div = 0;
    var ime_hosturl = "http://web.pinyin.sogou.com/web_ime/";
    var ime_shifton = false;
    keyArr[48] = Array("0", "0", "０", ")", ")", "）");
    keyArr[49] = Array("1", "1", "１", "!", "!", "！");
    keyArr[50] = Array("2", "2", "２", "@", "@", "@");
    keyArr[51] = Array("3", "3", "３", "#", "#", "#");
    keyArr[52] = Array("4", "4", "４", "$", "$", "￥");
    keyArr[53] = Array("5", "5", "５", "%", "%", "％");
    keyArr[54] = Array("6", "6", "６", "^", "^", "……");
    keyArr[55] = Array("7", "7", "７", "&", "&", "&");
    keyArr[56] = Array("8", "8", "８", "*", "*", "*");
    keyArr[57] = Array("9", "9", "９", "(", "(", "（");
    keyArr[59] = Array(";", "；", "；", ":", "：", "：");
    keyArr[65] = Array("a", "ａ", "ａ", "A", "Ａ", "Ａ");
    keyArr[66] = Array("b", "ｂ", "ｂ", "B", "Ｂ", "Ｂ");
    keyArr[67] = Array("c", "ｃ", "ｃ", "C", "Ｃ", "Ｃ");
    keyArr[68] = Array("d", "ｄ", "ｄ", "D", "Ｄ", "Ｄ");
    keyArr[69] = Array("e", "ｅ", "ｅ", "E", "Ｅ", "Ｅ");
    keyArr[70] = Array("f", "ｆ", "ｆ", "F", "Ｆ", "Ｆ");
    keyArr[71] = Array("g", "ｇ", "ｇ", "G", "Ｇ", "Ｇ");
    keyArr[72] = Array("h", "ｈ", "ｈ", "H", "Ｈ", "Ｈ");
    keyArr[73] = Array("i", "ｉ", "ｉ", "I", "Ｉ", "Ｉ");
    keyArr[74] = Array("j", "ｊ", "ｊ", "J", "Ｊ", "Ｊ");
    keyArr[75] = Array("k", "ｋ", "ｋ", "K", "Ｋ", "Ｋ");
    keyArr[76] = Array("l", "ｌ", "ｌ", "L", "Ｌ", "Ｌ");
    keyArr[77] = Array("m", "ｍ", "ｍ", "M", "Ｍ", "Ｍ");
    keyArr[78] = Array("n", "ｎ", "ｎ", "N", "Ｎ", "Ｎ");
    keyArr[79] = Array("o", "ｏ", "ｏ", "O", "Ｏ", "Ｏ");
    keyArr[80] = Array("p", "ｐ", "ｐ", "P", "Ｐ", "Ｐ");
    keyArr[81] = Array("q", "ｑ", "ｑ", "Q", "Ｑ", "Ｑ");
    keyArr[82] = Array("r", "ｒ", "ｒ", "R", "Ｒ", "Ｒ");
    keyArr[83] = Array("s", "ｓ", "ｓ", "S", "Ｓ", "Ｓ");
    keyArr[84] = Array("t", "ｔ", "ｔ", "T", "Ｔ", "Ｔ");
    keyArr[85] = Array("u", "ｕ", "ｕ", "U", "Ｕ", "Ｕ");
    keyArr[86] = Array("v", "ｖ", "ｖ", "V", "Ｖ", "Ｖ");
    keyArr[87] = Array("w", "ｗ", "ｗ", "W", "Ｗ", "Ｗ");
    keyArr[88] = Array("x", "ｘ", "ｘ", "X", "Ｘ", "Ｘ");
    keyArr[89] = Array("y", "ｙ", "ｙ", "Y", "Ｙ", "Ｙ");
    keyArr[90] = Array("z", "ｚ", "ｚ", "Z", "Ｚ", "Ｚ");
    keyArr[96] = Array("0", "0", "０", ")", ")", "）");
    keyArr[97] = Array("1", "1", "１", "!", "!", "！");
    keyArr[98] = Array("2", "2", "２", "@", "@", "@");
    keyArr[99] = Array("3", "3", "３", "#", "#", "#");
    keyArr[100] = Array("4", "4", "４", "$", "$", "￥");
    keyArr[101] = Array("5", "5", "５", "%", "%", "％");
    keyArr[102] = Array("6", "6", "６", "^", "^", "……");
    keyArr[103] = Array("7", "7", "７", "&", "&", "&");
    keyArr[104] = Array("8", "8", "８", "*", "*", "*");
    keyArr[105] = Array("9", "9", "９", "(", "(", "（");
    keyArr[106] = Array("*", "＊", "*", "*", "＊", "*");
    keyArr[107] = Array("+", "＋", "+", "+", "＋", "+");
    keyArr[187] = Array("=", "＝", "=", "+", "＋", "+");
    keyArr[109] = Array("-", "－", "-", "_", "＿", "——");
    keyArr[189] = Array("-", "－", "-", "_", "＿", "——");
    keyArr[110] = Array(".", "．", ".", ".", "．", ".");
    keyArr[111] = Array("/", "／", "/", "/", "／", "/");
    keyArr[186] = Array(";", "；", "；", ":", "：", "：");
    keyArr[188] = Array(",", "，", "，", "<", "＜", "《");
    keyArr[190] = Array(".", "．", "。", ">", "＞", "》");
    keyArr[191] = Array("/", "／", "、", "?", "？", "？");
    keyArr[192] = Array("`", "｀", "·", "~", "～", "～");
    keyArr[219] = Array("[", "［", "【", "{", "｛", "{");
    keyArr[220] = Array("\\", "＼", "、", "|", "｜", "|");
    keyArr[221] = Array("]", "］", "】", "}", "｝", "}");
    keyArr[222] = Array("'", "'", "‘", "’", "\"", "＂", "“", "”");
    imeInit()
} else if (ime_close == 1) imeClose();