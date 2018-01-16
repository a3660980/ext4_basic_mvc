<style type="text/css">
/*
Fishbecat Reset CSS
(c) 2008, 小魚扮貓 http://www.fishbecat.com/
Based on YUI http://developer.yahoo.com/yui/reset/ and Eric Meyer http://meyerweb.com/eric/tools/css/reset/
version: 1.2 | create: 20080901 | update: 20101127
*/
/*將有內距外距的元素歸零，避免不同瀏覽器內外距不同而錯位*/
body, h1, h2, h3, h4, h5, h6, p, blockquote, th, td, div, dl, dt, dd, ul, ol, li, pre, code, form, fieldset, legend, input, button, textarea {
        margin: 0;
        padding: 0;
}
/*重置頁面基本字型大小及行高*/
body,td,th {
        font-family: Verdana, Geneva, sans-serif;
        font-size: 100%;
        line-height: 1;
}
/*將標題的字型大小及粗細都重置*/
h1, h2, h3, h4, h5, h6 {
        font-size: 100%;
        font-weight: normal;
}
/*將影像及欄位集的邊框歸零*/
img, fieldset {
        border: 0;
}
<span style="line-height: 1.5;">/*將清單樣式清除，其實只要list-style: none就好了，後面都是為了特定瀏覽器*/</span>
ol, ul {
        list-style: none;
}
<span style="line-height: 1.5;">/*將表格的邊框設定為結合，小魚覺得分離好醜；其實一行就夠了，第二行是為了特定瀏覽器*/</span>
table {
        border-collapse: collapse;
        border-spacing: 0;
}
/*重置表格註解及標題儲存格的對齊*/
caption, th {
        text-align: left;
}
/*將連結、底線重置；其實應該要再加上一個 del 刪除線的，但小魚常常用del就不重置了*/
a, ins {
        text-decoration: none;
}
</style>