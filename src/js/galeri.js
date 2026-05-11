$(document).ready(function () {
    var modalSelector = '.bd-example-modal-lg';
    var thumbWidth = 250;
    var thumbHeight = 250;
    var thumbnailRows = [
        [
            { src: './src/img/i1.jpg', alt: 'Galeri Amikom 1' },
            { src: './src/img/i2.jpg', alt: 'Galeri Amikom 2' },
            { src: './src/img/i3.jpg', alt: 'Galeri Amikom 3' },
            { src: './src/img/i4.jpg', alt: 'Galeri Amikom 4' }
        ],
        [
            { src: './src/img/i5.jpg', alt: 'Galeri Amikom 5' },
            { src: './src/img/i6.jpg', alt: 'Galeri Amikom 6' }
        ]
    ];
    var gallerySections = [2019, 2018, 2017, 2016].map(function (year) {
        return {
            year: year,
            rows: thumbnailRows
        };
    });

    function createThumbnail(image) {
        var $thumbnailWrapper = $('<div>', {
            class: 'col-md text-center each',
            'data-toggle': 'modal',
            'data-target': modalSelector
        });

        var $thumbnail = $('<img>', {
            src: image.src,
            alt: image.alt,
            class: 'img-thumbnail',
            loading: 'lazy',
            decoding: 'async',
            width: thumbWidth,
            height: thumbHeight
        });

        return $thumbnailWrapper.append($thumbnail);
    }

    function createGalleryRow(rowImages, rowIndex) {
        var $galleryRow = $('<div>', {
            class: rowIndex === 0 ? 'galeri-row' : 'galeri-row my-4'
        });
        var $row = $('<div>', {
            class: 'row'
        });

        rowImages.forEach(function (image) {
            $row.append(createThumbnail(image));
        });

        return $galleryRow.append($row);
    }

    function createGallerySection(section, index) {
        var $sectionRow = $('<div>', {
            class: index === 0 ? 'row' : 'row mt-5'
        });
        var $column = $('<div>', {
            class: 'col-md'
        });

        $column.append($('<h4>').text('Galeri ' + section.year));
        $column.append($('<hr>', {
            class: 'underline',
            style: 'width: 100px;'
        }));

        section.rows.forEach(function (rowImages, rowIndex) {
            $column.append(createGalleryRow(rowImages, rowIndex));
        });

        return $sectionRow.append($column);
    }

    gallerySections.forEach(function (section, index) {
        $('#gallery-sections').append(createGallerySection(section, index));
    });

    $('#gallery-sections').on('click', '.each', function () {
        var gambar = $(this).find('img').attr('src');

        $('.modal-image').attr('src', gambar);
    });

    $(modalSelector).on('hidden.bs.modal', function () {
        $('.modal-image').removeAttr('src');
    });
});
