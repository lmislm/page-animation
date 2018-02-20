/**
 * Created by lmislm on 2018/2/17- 21:16.
 */
import 'jquery';

var preloader = (function(){
    'use-strict';
    // Vars
    var btn = $('.enter'),
        page = $('.page'),
        welcome = $('.enterStrong');
    return {

        run: function(){
            // show on load
            page.show();
            // apend and prepend html
            page.prepend(this.tmpl.tl + this.tmpl.tr);
            page.append(this.tmpl.bl + this.tmpl.br);
            // on click open site
            this.click_btn();
        },
        tmpl:{
            'tl': '<span class="tl"></span>',
            'tr': '<span class="tr"></span>',
            'bl': '<span class="bl"></span>',
            'br': '<span class="br"></span>'
        },
        click_btn: function(){
            btn.on('click',function(){
                page.addClass('loaded');
                btn.addClass('hideThis');
                preloader.animations();
            });
        },

        // for firefox i try in css but not work
        animations: function(){
            var tl = $('.loaded .tl'),
                tr = $('.loaded .tr'),
                bl = $('.loaded .bl'),
                br = $('.loaded .br');

            //开屏
            tl.delay(800).animate({top:'-100%',left:'-100%'},500,"linear",function () {
                $(this).remove();
            });
            tr.delay(600).animate({top:'-100%',left:'100%'},500,"linear",function () {
                $(this).remove();
            });
            bl.delay(400).animate({top:'100%',left:'100%'},500,"linear",function () {
                $(this).remove();
            });
            br.delay(200).animate({top:'100%',left:'-100%'},500,"linear",function () {
                $(this).remove();
            });
            btn.remove();
            welcome.remove();
        },
    };
})(jQuery);

preloader.run();

