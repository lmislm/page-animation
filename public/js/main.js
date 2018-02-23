/**
 * Created by lmislm on 2018/2/17- 8:57.
 */
import '../css/style.css';
import '../css/list.css'
import './enter';

$(document).ready(function () {

    var content = [
        {
            title: "你好！！",
            desc: "欢迎━(*｀∀´*)ノ亻!"
        },
        {
            title: "",
            desc: [
                ["<form>\n" +
                "    <h1 class=\"main-title\">booml.cn子域名</h1>\n" +
                "    <div class=\"tree\">\n" +
                "        <div>\n" +
                "            <input id=\"n-0\" type=\"checkbox\">\n" +
                "            <label for=\"n-0\">项目主站</label>\n" +
                "            <div class=\"sub\">\n" +
                "                <a class=\"sub-list\" href=\"http://112.74.94.252\">112.74.94.252</a>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "        <div>\n" +
                "            <input id=\"n-1\" type=\"checkbox\">\n" +
                "            <label for=\"n-1\">博客</label>\n" +
                "            <div class=\"sub\">\n" +
                "                <a class=\"sub-list\" href=\"http://blog.booml.cn/\">blog.booml.cn</a>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "        <div>\n" +
                "            <input id=\"n-2\" type=\"checkbox\">\n" +
                "            <label for=\"n-2\">Iot论坛</label>\n" +
                "            <div class=\"sub\">\n" +
                "                <a class=\"sub-list\" href=\"https://iot.booml.cn/\">iot.booml.cn</a>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "        <div>\n" +
                "            <input id=\"n-4\" type=\"checkbox\">\n" +
                "            <label for=\"n-4\">待续..</label>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "    <input type=\"reset\" value=\"折叠所有\">\n" +
                "</form>"]
                // , " separate text".split("")
            ]
        },
        {
            title: "社交页头像",
            desc: "欢迎━(*｀∀´*)ノ亻!欢迎━(*｀∀´*)ノ亻!欢迎━(*｀∀´*)ノ亻!欢迎━(*｀∀´*)ノ亻!欢迎━(*｀∀´*)ノ亻!欢迎━(*｀∀´*)ノ亻!欢迎━(*｀∀´*)ノ亻!欢迎━(*｀∀´*)ノ亻!欢迎━(*｀∀´*)ノ亻!"
        },
    ];

    var currentPage = 0;
    //生成内容
    for (var i=0; i<content.length; i++){
        //拆分字母到数组
        for(var obj in content[i]){
            //处理字符串
            if(typeof content[i][obj] === "string") {
                content[i][obj] = content[i][obj].split("");
                continue;
            }
            //if array (grouped text)
            else if (typeof content[i][obj] === "object") {
                var toPush = [];
                for(var j = 0; j < content[i][obj].length; j++) {
                    for(var k = 0; k < content[i][obj][j].length; k++) {
                        toPush.push(content[i][obj][j][k]);
                    }
                }
                content[i][obj] = toPush;
            }
            // }else{
            //     //处理数组
            //     var toPush = [];
            //     for(var j=0; j<content[i][obj].length; j++){
            //         for (var k=0; k<content[i][obj][j].length; k++){
            //             toPush.push(content[i][obj][j][k]);
            //         }
            //     }
            //     content[i][obj] = toPush;
            // }
        }
        //设置 text
        $("#segments").append("<div class=\"letters-wrap mutable\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>")
        setText();
        //克隆 到数据
        $("#segments").append("<div class=\"letters-wrap position-data\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
    }

    //初始化 数组
    arrangeCurrentPage();
    scrambleOthers();

    /*
     * 事件处理
     */
    $(window).resize(function() {
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-prev").hide();
    $("#soup-prev").click(function() {
        $("#soup-next").show();
        currentPage--;
        if (currentPage === 0) {
            $("#soup-prev").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-next").click(function() {
        $("#soup-prev").show();
        currentPage++;
        if (currentPage === content.length - 1) {
            $("#soup-next").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    /*
     *   函数
     */
    function arrangeCurrentPage() {
        for(var i=0; i<content[currentPage].title.length; i++){
            $(".mutable:eq(" + currentPage + ") > .soup-title > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().top + "px",
                color: "#111111",
                zIndex: 9001
            });
        }
        for(var i=0; i<content[currentPage].desc.length; i++){
            $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().top + "px",
                color: "#111111",
                zIndex: 9001
            });
        }
    }
    function setText() {
        var j;
        for(j=0; j<content[i].title.length; j++){
            $(".soup-title").last().append("<span class=\"letter\">" + content[i].title[j] + "</span>");
        }
        for(j=0; j<content[i].desc.length; j++){
            $(".soup-desc").last().append("<span class=\"letter\">" + content[i].desc[j] + "</span>");
        }
    }

    function scrambleOthers() {
        for(var i=0; i<content.length; i++){
            //不搅乱当前页
            if(currentPage === i) continue;
            var parts = [
                ["title", ".soup-title"],
                ["desc", ".soup-desc"]
            ];
            //应用到 .title 和 .desc
            for(var j=0; j<parts.length; j++){
                for(var k=0; k<content[i][parts[j][0]].length; k++){
                    //定义屏幕上的任意位置
                    var randLeft = Math.floor(Math.random()*$(window).width());
                    var randTop= Math.floor(Math.random()*$(window).height());
                    //定义边界
                    var offset = $(".position-data").eq(currentPage).offset();
                    var bounds = {
                        left: offset.left,
                        top: offset.top,
                        right: $(window).width() - offset.left,
                        bottom: $(window).height() - offset.top
                    };
                    var middleX = bounds.left + $(".position-data").eq(currentPage).width() / 2;
                    var middleY = bounds.top + $(".position-data").eq(currentPage).height() / 2;
                    //最后，打乱所有
                    $(".mutable:eq("+ i +")>" +parts[j][1]+ ">.letter").eq(k).css({
                        left: randLeft,
                        top: randTop,
                        color: "#dbdddd",
                        zIndex: "initial"
                    });
                };
            }
        }
    }

});
