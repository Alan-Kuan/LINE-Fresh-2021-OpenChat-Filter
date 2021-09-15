/*
 * Fold text content with a switch.
 */
$(document).ready(function () {

    $('.fold-switch').click(function () {
        if($(this).parent().hasClass('expanded')) {
            $(this).text('▶ 點擊以展開');
        } else {
            $(this).text('▼ 點擊以收合');
        }
        $(this).parent().toggleClass('expanded');
    });

});
