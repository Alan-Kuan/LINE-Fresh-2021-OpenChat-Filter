/*
 * Remember last reading location.
 */
function scrollBack() {
    const loc = localStorage.getItem('LFOCF_reading_location');

    if(loc !== null) $(window).scrollTop(loc);

    $(window).on('scroll', function () {
        localStorage.setItem('LFOCF_reading_location', $(window).scrollTop());
    });
}
