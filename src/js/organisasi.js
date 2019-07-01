$(document).ready(function () {


    $('.item-each').click(function () {
        var gambar = $(this).find('img').attr('src');
        var nama = $(this).find('h6').text();

        var deskripsi = {
            "kempo": 'Shorinji Kempo (少林寺拳法) adalah salah satu dari seni bela diri yang berasal dari Jepang. ... Shorinji Kempo diciptakan oleh Doshin So (宗 道臣) pada tahun 1947 sebagai sistempelatihan dan pengembangan diri (行: gyo atau disiplin dalam bahasa jepang).',
            "taekwondo": 'Taekwondo adalah seni bela diri asal Korea yang juga sebagai olahraga nasional Korea. Ini adalah salah satu seni bela diri populer di dunia yang dipertandingkan di Olimpiade.',
            "koma": 'Komunitas Multimedia Amikom - Tempat Kreator Audio Visual Yang Menghasilkan Karya Dengan Kreatifitas Tanpa Batas Komunitas yang bergerak di Desain grafis, web Desain, Pembuatan film, video klip, iklan dan visual efek serta animasi di Yogyakarta',
            "amcc": 'AMCC merupakan UKM yang bergerak dalam bidang keilmuan. Seketariat AMCC beralamat di Gedung BSC Lantai 2 Universitas Amikom Yogyakarta jalan Ring Road Utara Sleman, Yogyakarta. Sedangkan untuk Camp AMCC beralamat di jalan plosokuning raya No. 88, Minomartani, Ngaglik, Sleman, Yogyakarta. AMCC secara resmi menjadi UKM pada tanggal 6 Mei 1996.',
            "psht": 'Pencak silat Setia Hati didirikan oleh Ki Ngabehi Soeromihardjo (Eyang Suro) pada tahun 1903 di Kampoeng Tambak Gringsing, Surabaya. Sebelumnya aliran pencak silat ini bernama aliran  Djojo Gendilo Tjipto Muljo. Kemudian Eyang Suro mendirikan perguruan silat bernama Persaudaraan Setia Hati di Desa Winongo, Madiun pada tahun 1917. ',
            "aec": 'English Club Indonesia adalah sebuah lembaga kursus Bahasa Inggris yang telah berdiri sejak tahun 2004 dengan izin Dinas Pendidikan Kota Denpasar No. 421.8/3255/DIKBUD. English Club Indonesia beralamat di Jalan Tukad Barito No. 27 Denpasar, serta Jalan Tukad Yeh Empas Kavling 5 No. 4 Sanggulan Tabanan.',
            "mayapala": 'Mahasiswa Pencinta Alam Amikom, lebih dikenal pula sebagai Mapala merupakan salah satu Unit Kegiatan Mahasiswa tingkat universitas di Amikom. Mapala Amikom dikenal sebagai salah satu pelopor kepencintaalaman di Infonesia[butuh rujukan]. Berdiri pada tahun 1964 dan saat ini berusia 54 tahun per 22 Desember 2018, Mapala Amikom adalah organisasi pencinta alam tertua di kalangan mahasiswa. Sekarang hampir semua perguruan tinggi di Indonesia memiliki organisasi pencinta alam baik di tingkat kampus (universitas) maupun fakultas.[1] ',
            "jashtis": 'Organisasi UKI JASHTIS merupakan Unit Kegiatan Mahasiswa (UKM), Unit Kerohanian Islam Jama’ah Shohwatul Islam (UKI JASHTIS) STMIK AMIKOM Yogyakarta. UKI JASHTIS berperan sebagai Lembaga Dakwah Kampus (LDK) STMIK AMIKOM Yogyakarta dalam ruang lingkup nasional dan internasional yang menyeru kepada kebaikan dan menolak kemungkaran dan  sebagai benteng moral di Kampus.',
            "potrait": 'Ini adalah potret klub / komunitas fotografi di Universitas AMIKOM Yogyakarta. Berikut adalah tempat bagi para penggemar fotografi untuk mahasiswa, dosen dan staf Universitas AMIKOM Yogyakarta untuk berbagi dan bertukar gagasan tentang dunia fotografi. Kami tidak melihat dalam hal alat yang digunakan, tetapi kami melihat dalam hal bagaimana melakukan kreativitas bersama dan berbagi.',
            "agc": 'AGD adalah Komunitas Amikom untuk membuat game, berdiri pada 20 Januari 2012. Mengenai perkembangan game di dunia yang semakin pesat, tidak terkecuali di Indonesia, game tersebut kini telah menjadi alternatif hiburan bagi tua dan muda, pria dan perempuan. Semua itu terbukti dengan pekerjaan yang telah dibuat game AGD adalah Snakes and Ladders, Rock Pinang, Ghatotkacha, Monkeys Rocket, dll. Jadi, silakan bergabung dengan kami di AGD.',
            "tamam": 'Komunitas Arab AMIKOM bernama Tamam yang berdiri thullabu al’arobiyyah lugho ar jami’atu AMIKOM kira-kira merupakan sekumpulan mahasiswa pecinta bahasa Arab mahasiswa Komunitas ini dibentuk untuk mendukung penuh AMIKOM go International dan juga mendukung AMIKOM ke Universitas, termasuk kegiatan yang dilakukan dengan studi bahasa Arab saya, muhadatsah (Conversa on), Ilqo Mutarodifat (Belajar Kosakata), dan pela pela-han dan lagi tentang Arab.',
            "somu": 'Kewajiban sebagai siswa, membuat rutinitas yang berkontribusi tidak langsung ke masa depan yang cerah. Ilmu pengetahuan adalah salah satu senjata yang tidak ada habisnya selama kita dapat menggunakannya juga - baik, baik untuk dirinya sendiri atau orang lain. Pengetahuan yang berguna juga dapat menyembuhkan dunia gelap menjadi cerah dan pada saat yang sama sebagai rekan dalam kehidupan yang dapat menasihati, menyelamatkan, dan dimuliakan. Di atas segalanya, yang membuat latar belakang komunitas soutul Muhibbin adalah keinginan kami untuk dapat mengubah Ahlussunah wal Jama ah di kampus Universitas AMIKOM Yogyakarta.',
            "avc": 'Kewajiban sebagai siswa, membuat rutinitas yang berkontribusi tidak langsung ke masa depan yang cerah. Ilmu pengetahuan adalah salah satu senjata yang tidak ada habisnya selama kita dapat menggunakannya juga - baik, baik untuk dirinya sendiri atau orang lain. Pengetahuan yang berguna juga dapat menyembuhkan dunia gelap menjadi cerah dan pada saat yang sama sebagai rekan dalam kehidupan yang dapat menasihati, menyelamatkan, dan dimuliakan. Di atas segalanya, yang membuat latar belakang komunitas soutul Muhibbin adalah keinginan kami untuk dapat mengubah Ahlussunah wal Jama ah di kampus Universitas AMIKOM Yogyakarta.',
        }

        function desc() {
            var desk = '';
            switch (nama) {
                case 'Shorinji Kempo Amikom':
                    desk = deskripsi["kempo"];
                    break;

                case 'Taekwondo Amikom':
                    desk = deskripsi["taekwondo"];
                    break;

                case 'KOMA Amikom':
                    desk = deskripsi["koma"];
                    break;

                case 'AMCC Amikom':
                    desk = deskripsi["amcc"];
                    break;

                case 'PSHT Amikom':
                    desk = deskripsi["psht"];
                    break;

                case 'Amikom English Club':
                    desk = deskripsi["aec"];
                    break;

                case 'Mapala Amikom':
                    desk = deskripsi["mayapala"];
                    break;

                case 'UKI Jashtis Amikom':
                    desk = deskripsi["jashtis"];
                    break;

                case 'Potrait Amikom':
                    desk = deskripsi["potrait"];
                    break;

                case 'TAMAM Amikom':
                    desk = deskripsi["tamam"];
                    break;

                case 'Shoutul Muhibbin Amikom':
                    desk = deskripsi["somu"];
                    break;

                case 'Amikom Virus Community':
                    desk = deskripsi["avc"];
                    break;

                case 'Amikom Gamers Community':
                    desk = deskripsi["agc"];
                    break;

            }
            return desk;
        }

        // set gambar ke html
        $('.modal-image').attr({
            src: gambar
        });

        // set judul ke html
        $('.modal-titles').text(nama);

        // set deskripsi ke html
        desc();
        $('.modal-desc').text(desc());
    })

});