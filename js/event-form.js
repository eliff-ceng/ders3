```javascript
import { etkinlikler } from "./data.js";


/* ==================================================
   ETKİNLİK EKLEME
   ================================================== */

const eklemeFormu = document.querySelector("#etkinlik-form");


if (eklemeFormu) {

    eklemeFormu.addEventListener("submit", function (event) {

        event.preventDefault();


        /* HATA MESAJLARINI TEMİZLE */

        document.querySelector("#etkinlik-adi-hata").textContent = "";
        document.querySelector("#kategori-hata").textContent = "";
        document.querySelector("#tarih-saat-hata").textContent = "";
        document.querySelector("#yer-hata").textContent = "";
        document.querySelector("#kontenjan-hata").textContent = "";
        document.querySelector("#aciklama-hata").textContent = "";

        const formMesaj = document.querySelector("#form-mesaj");

        formMesaj.textContent = "";


        /* FORM VERİLERİNİ AL */

        const formData = new FormData(eklemeFormu);

        const baslik = formData.get("etkinlik-adi").trim();
        const kategori = formData.get("kategori");
        const tarih = formData.get("tarih-saat");
        const yer = formData.get("yer").trim();
        const kontenjan = formData.get("kontenjan");
        const aciklama = formData.get("aciklama").trim();


        let hataVar = false;


        /* ETKİNLİK ADI */

        if (baslik.length < 3) {

            document.querySelector("#etkinlik-adi-hata").textContent =
                "Etkinlik adı en az 3 karakter olmalıdır.";

            hataVar = true;
        }


        /* KATEGORİ */

        if (kategori === "") {

            document.querySelector("#kategori-hata").textContent =
                "Lütfen bir kategori seçiniz.";

            hataVar = true;
        }


        /* TARİH */

        if (tarih === "") {

            document.querySelector("#tarih-saat-hata").textContent =
                "Tarih ve saat seçiniz.";

            hataVar = true;
        }


        /* YER */

        if (yer === "") {

            document.querySelector("#yer-hata").textContent =
                "Etkinlik yeri boş bırakılamaz.";

            hataVar = true;
        }


        /* KONTENJAN */

        if (
            kontenjan !== "" &&
            (
                Number(kontenjan) < 1 ||
                Number(kontenjan) > 1000
            )
        ) {

            document.querySelector("#kontenjan-hata").textContent =
                "Kontenjan 1 ile 1000 arasında olmalıdır.";

            hataVar = true;
        }


        /* AÇIKLAMA */

        if (aciklama === "") {

            document.querySelector("#aciklama-hata").textContent =
                "Açıklama boş bırakılamaz.";

            hataVar = true;
        }


        /* HATA VARSA DUR */

        if (hataVar) {

            formMesaj.textContent =
                "Lütfen hatalı alanları kontrol ediniz.";

            return;
        }


        /* YENİ ETKİNLİK */

        const yeniEtkinlik = {

            id: etkinlikler.length + 1,

            baslik: baslik,

            kategori: kategori,

            tarih: tarih,

            tarihMetni: new Date(tarih)
                .toLocaleDateString("tr-TR"),

            yer: yer,

            kontenjan: kontenjan === ""
                ? null
                : Number(kontenjan),

            aciklama: aciklama
        };


        etkinlikler.push(yeniEtkinlik);


        /* BAŞARILI MESAJ */

        formMesaj.textContent =
            "Etkinlik başarıyla eklendi.";





        eklemeFormu.reset();

    });

}


/* ==================================================
   ETKİNLİK GÜNCELLEME
   ================================================== */

const guncellemeFormu =
    document.querySelector("#etkinlik-guncelle-form");


if (guncellemeFormu) {

    /* URL'DEKİ ID'Yİ AL */

    const params =
        new URLSearchParams(window.location.search);

    const id =
        Number(params.get("id"));


    /* ETKİNLİĞİ BUL */

    const etkinlik =
        etkinlikler.find(function (etkinlik) {

            return etkinlik.id === id;

        });


    const formMesaj =
        document.querySelector("#form-mesaj");


    /* ETKİNLİK BULUNAMADIYSA */

    if (!etkinlik) {

        formMesaj.textContent =
            "Etkinlik bulunamadı veya geçersiz etkinlik numarası.";

    }


    /* ETKİNLİK BULUNDUYSA FORMU DOLDUR */

    if (etkinlik) {

        document.querySelector("#etkinlik-adi").value =
            etkinlik.baslik;


        document.querySelector("#kategori").value =
            etkinlik.kategori;


        document.querySelector("#tarih-saat").value =
            etkinlik.tarih;


        document.querySelector("#yer").value =
            etkinlik.yer;


        document.querySelector("#kontenjan").value =
            etkinlik.kontenjan ?? "";


        document.querySelector("#aciklama").value =
            etkinlik.aciklama;

    }


    /* GÜNCELLE BUTONU */

    guncellemeFormu.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* ETKİNLİK YOKSA */

            if (!etkinlik) {

                formMesaj.textContent =
                    "Etkinlik bulunamadı.";

                return;
            }


            /* HATA MESAJLARINI TEMİZLE */

            document.querySelector(
                "#etkinlik-adi-hata"
            ).textContent = "";


            document.querySelector(
                "#kategori-hata"
            ).textContent = "";


            document.querySelector(
                "#tarih-saat-hata"
            ).textContent = "";


            document.querySelector(
                "#yer-hata"
            ).textContent = "";


            document.querySelector(
                "#kontenjan-hata"
            ).textContent = "";


            document.querySelector(
                "#aciklama-hata"
            ).textContent = "";


            formMesaj.textContent = "";


            /* FORM VERİLERİ */

            const formData =
                new FormData(guncellemeFormu);


            const baslik =
                formData.get("etkinlik-adi").trim();


            const kategori =
                formData.get("kategori");


            const tarih =
                formData.get("tarih-saat");


            const yer =
                formData.get("yer").trim();


            const kontenjan =
                formData.get("kontenjan");


            const aciklama =
                formData.get("aciklama").trim();


            let hataVar = false;


            /* ETKİNLİK ADI */

            if (baslik.length < 3) {

                document.querySelector(
                    "#etkinlik-adi-hata"
                ).textContent =
                    "Etkinlik adı en az 3 karakter olmalıdır.";

                hataVar = true;
            }


            /* KATEGORİ */

            if (kategori === "") {

                document.querySelector(
                    "#kategori-hata"
                ).textContent =
                    "Lütfen bir kategori seçiniz.";

                hataVar = true;
            }


            /* TARİH */

            if (tarih === "") {

                document.querySelector(
                    "#tarih-saat-hata"
                ).textContent =
                    "Tarih ve saat seçiniz.";

                hataVar = true;
            }


            /* YER */

            if (yer === "") {

                document.querySelector(
                    "#yer-hata"
                ).textContent =
                    "Etkinlik yeri boş bırakılamaz.";

                hataVar = true;
            }


            /* KONTENJAN */

            if (
                kontenjan !== "" &&
                (
                    Number(kontenjan) < 1 ||
                    Number(kontenjan) > 1000
                )
            ) {

                document.querySelector(
                    "#kontenjan-hata"
                ).textContent =
                    "Kontenjan 1 ile 1000 arasında olmalıdır.";

                hataVar = true;
            }


            /* AÇIKLAMA */

            if (aciklama === "") {

                document.querySelector(
                    "#aciklama-hata"
                ).textContent =
                    "Açıklama boş bırakılamaz.";

                hataVar = true;
            }


            /* HATA VARSA DUR */

            if (hataVar) {

                formMesaj.textContent =
                    "Lütfen hatalı alanları kontrol ediniz.";

                return;
            }


            /* ETKİNLİĞİ GÜNCELLE */

            etkinlik.baslik =
                baslik;


            etkinlik.kategori =
                kategori;


            etkinlik.tarih =
                tarih;


            etkinlik.tarihMetni =
                new Date(tarih)
                    .toLocaleDateString("tr-TR");


            etkinlik.yer =
                yer;


            etkinlik.kontenjan =
                kontenjan === ""
                    ? null
                    : Number(kontenjan);


            etkinlik.aciklama =
                aciklama;


            /* BAŞARI MESAJI */

            formMesaj.textContent =
                "Etkinlik başarıyla güncellendi.";


            /* DETAY SAYFASINA DÖN */

            setTimeout(function () {

                window.location.href =
                    "etkinlik-detay.html?id=" +
                    etkinlik.id;

            }, 1000);

        }
    );
}
```
