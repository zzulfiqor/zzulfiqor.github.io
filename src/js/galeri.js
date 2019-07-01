$(document).ready(function () {


    $('.each').click(function () {
        var gambar = $(this).find('img').attr('src');

        // set gambar ke html
        $('.modal-image').attr({
            src: gambar
        });

    })

});