/*
 * Display the content of filtered_messages.json on the webpage.
 */
$(document).ready(function () {

    $.getJSON('./filtered_messages.json', function ({ history, saved_date }) {

        $.each(history, function (date, messages) {
            if(messages.length > 0) {
                $('<div />', {
                    class: 'date-tag',
                    html: date
                }).appendTo($('#content'));

                $.each(messages, function (_, msg) {
                    let box_class = 'msg-box';
                    if(msg.author.startsWith('LINE小幫手')) box_class += ' answer';
                    $('<div />', { class: box_class })
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

        const last_update_text = `最後更新於 ${ saved_date }`;
        $('#last-update-time').text(last_update_text);
        $('<div />', {
            class: 'date-tag',
            html: last_update_text
        }).appendTo($('#content'));

        scrollBack();

    });

});
