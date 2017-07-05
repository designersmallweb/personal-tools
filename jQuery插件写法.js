(function($) {
    "use strict";
    var XXX = (function() {
        function XXX(element, options) {
            this.settings = $.extend(true, $.fn.XXX.defaults, options || {});
            this.element = element;
            this.init();
        }

        XXX.prototype = {
            init: function() {

            },
        };
        return XXX;
    })();

    $.fn.XXX = function(options) {
        return this.each(function() {
            var me = $(this),
                instance = me.data("XXX");

            if (!instance) {
                me.data("XXX", (instance = new XXX(me, options)));
            }

            if ($.type(options) === "string") return instance[options]();
        });
    };

    $.fn.XXX.defaults = {
        selectors: {

        },

    };

    $(function() {
        $('[data-XXX]').XXX();
    });
})(jQuery);


/*(function(w) {
    function jQuery(){
        return new jQuery.fn.init();
    }
    jQuery.fn=jQuery.prototype=function() {

    };
    var init=jQuery.fn.init=function() {

    };
    init.prototype=jQuery.fn;
    w.jQuery=w.$=jQuery;
})(window);*/