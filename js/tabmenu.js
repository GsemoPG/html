$(document).ready(function () {
    $(".tab_menu li").click(function () {
        var $this = $(this),
            tabId = $this.data("tab"),
            tabIndex = $this.index();

        $(".tab_menu li, .tab_content li").removeClass("on");

        $this.addClass("on");
        $("#"+tabId).addClass("on");

        $(".tab_menu li").each(function (content) {
            $(this).find("img").attr("src", $(this).find("img").attr("src").replace("_off","_on"));
            
            if (tabIndex != content) {
                $(this).find("img").attr("src", $(this).find("img").attr("src").replace("_on","_off"));
            }
        });
    });
})