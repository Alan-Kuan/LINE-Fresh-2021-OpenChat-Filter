/*
 * Display the content of filtered_messages.json on the webpage.
 */
$(document).ready(function () {

    $.getJSON('../filtered_messages.json', function (history) {
        $.each(history, function (date, messages) {
            if(messages.length > 0) {
                $('<div />', {
                    class: 'date-tag',
                    html: date
                }).appendTo($('#content'));

                $.each(messages, function (_, msg) {
                    $('<div />', { class: 'msg-box' })
                        .append($('<span />', {
                            class: 'author',
                            html: msg.author
                        }))
                        .append($('<p />', {
                            html: msg.content.join('<br />')
                        }))
                        .append($('<span />', {
                            class: 'time',
                            html: msg.time
                        }))
                        .appendTo('#content');
                });
            }
        });
    });

});
