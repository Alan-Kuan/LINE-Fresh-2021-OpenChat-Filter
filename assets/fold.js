/*
 * Fold text content with a switch.
 */
$(document).ready(function () {

    $('.fold-switch').click(function () {
        if($(this).parent().hasClass('expanded')) {
            $(this).children('.icon').text('▶');
        } else {
            $(this).children('.icon').text('▼');
        }
        $(this).parent().toggleClass('expanded');
    });

});
