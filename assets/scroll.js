/*
 * Functions about scrolling are here.
 */

// scroll back to the last reading location
function scrollBack() {
    const loc = localStorage.getItem('LFOCF_reading_location');
    if(loc !== null) $(window).scrollTop(loc);
}

$(document).ready(function () {

    $(window).on('scroll', function () {
        const bottom_loc = $(document).height() - $(window).height();
        // log current location
        localStorage.setItem('LFOCF_reading_location', $(window).scrollTop());
        // hide the scroll-bottom button if at bottom
        let diff = Math.abs($(this).scrollTop() - bottom_loc);
        if(diff <= 2) {
            $('#scroll-bottom').fadeOut();
        } else {
            $('#scroll-bottom').fadeIn();
        }
    });

    // scroll to bottom
    $('#scroll-bottom').click(function () {
        const bottom_loc = $(document).height() - $(window).height();
        $('html').animate({scrollTop: bottom_loc})
    });

});
