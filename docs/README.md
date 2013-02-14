输入法精简版处理流程
1.加载相关js，ime_on
2.监听页面textarea的focusIn事件$("textarea").on("focus")，触发绑定该区域的keydown\keypress\keyup等事件$(obj).on("keydown")
3.对按键分类处理，数字、字母、ctrl、shift、capslock、标点、回车、backspace、空格、alt、delete
4.选词后对输入区域返回值的处理
5.焦点移出区域的处理$(obj).off("keydown")