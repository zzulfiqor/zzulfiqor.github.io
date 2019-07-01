$(document).ready(function () {

    $('#zuhair').click(function () {
        $('#zuhair').toggleClass('selected');
        $('#gita').removeClass('selected');
        $('#fatimah').removeClass('selected');
        $('#vita').removeClass('selected');
        
        $('#jd-1').text('Membuat Timeline');
        $('#jd-2').text('Merancang UI / UX Web');
        $('#jd-3').text('Membuat interaksi menggunakan Javascript');

        
        $('#nama').text('Ahmad Zuhair Dzulfiqor');
        $('.fotprof').attr({
            src: "./src/img/WhatsApp Image 2019-06-23 at 15.50.14.jpeg"
        });
    });

    $('#gita').click(function () {
        $('#gita').toggleClass('selected');
        $('#zuhair').removeClass('selected');
        $('#fatimah').removeClass('selected');
        $('#vita').removeClass('selected');
        
        $('#jd-1').text('Mencari foto-foto tentang Amikom');
        $('#jd-2').text('Pewarnaan dan Layouting Menggunakan CSS');
        $('#jd-3').text('Bertanggung Jawab atas form inputan pendaftaran');

        
        $('#nama').text('Gita Cahyani');
        $('.fotprof').attr({
            src: "./src/img/CSUJ8042.JPG"
        });
    });

    $('#fatimah').click(function () {
        $('#fatimah').toggleClass('selected');
        $('#gita').removeClass('selected');
        $('#zuhair').removeClass('selected');
        $('#vita').removeClass('selected');
        
        $('#jd-1').text('Mencari Artikel dan Konten website');
        $('#jd-2').text('Pewarnaan dan Layouting Menggunakan CSS');
        $('#jd-3').text('Membuat Jobdesk untuk final project');

        
        $('#nama').text('Fatimah Nur Fajar');
        $('.fotprof').attr({
            src: "./src/img/WhatsApp Image 2019-06-23 at 16.27.42.jpeg"
        });
    });

    $('#vita').click(function () {
        $('#vita').toggleClass('selected');
        $('#gita').removeClass('selected');
        $('#fatimah').removeClass('selected');
        $('#zuhair').removeClass('selected');
        
        $('#jd-1').text('Membuat kerangka website menggunakan html');
        $('#jd-2').text('Mencari foto untuk kegiatan UKM');
        $('#jd-3').text('Membuat Timeline untuk Final Project');

        
        $('#nama').text('Novita Indriyani');
        $('.fotprof').attr({
            src: "./src/img/WhatsApp Image 2019-06-23 at 15.48.48.jpeg"
        });
    });

    

    $(window).scroll(function () {
        $(' .headercurve, nav, .header, .wcu-container, .amikomnow').toggleClass('scrolled', $(this).scrollTop() > 35);
    });

    $('#btn-login').click(function(){
        var nim = $("#NIM").val();
        var password = $("#PASSWORD").val();

        if(nim == '' || password == ''){
            alert('Lengkapi form yang belum diisi');
        } else if(nim == '17.11.1669' && password == '12345'){
            window.location.replace("./mahasiswa.html");
        } else{
            alert('Password atau Email salah.')
        }
    });

    $('#btn-biodata').click(function(){
        $('#bio').removeClass('not-selected');
        $('#kuliah').addClass('not-selected');
        $('#krs').addClass('not-selected');
        $('#perpus').addClass('not-selected');
        $('#pembayaran').addClass('not-selected');
    })

    $('#btn-kuliah').click(function(){
        $('#kuliah').removeClass('not-selected');
        $('#bio').addClass('not-selected');
        $('#krs').addClass('not-selected');
        $('#perpus').addClass('not-selected');
        $('#pembayaran').addClass('not-selected');
    })

    
    $('#btn-krs').click(function(){
        $('#krs').removeClass('not-selected');
        $('#bio').addClass('not-selected');
        $('#kuliah').addClass('not-selected');
        $('#perpus').addClass('not-selected');
        $('#pembayaran').addClass('not-selected');
    })

    $('#btn-perpus').click(function(){
        $('#perpus').removeClass('not-selected');
        $('#bio').addClass('not-selected');
        $('#kuliah').addClass('not-selected');
        $('#krs').addClass('not-selected');
        $('#pembayaran').addClass('not-selected');
    })

    $('#btn-pembayaran').click(function(){
        $('#pembayaran').removeClass('not-selected');
        $('#bio').addClass('not-selected');
        $('#kuliah').addClass('not-selected');
        $('#krs').addClass('not-selected');
        $('#perpus').addClass('not-selected');
    })

    $('#btn-next').click(function(){
        $('#form-dua').removeClass('not-selected');
        $('#form-satu').addClass('not-selected');
    })

    $('.item-each').click(function(){
        var tes = $('.item-each img').attr(src);
        alert(tes);
    })


});