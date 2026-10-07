import { etkinlikler } from "./data.js";


const liste = document.querySelector("#etkinlik-listesi");
const arama = document.querySelector("#arama");
const kategoriFiltre = document.querySelector("#kategori-filtre");
const sonuc = document.querySelector("#sonuc");
const filtreFormu = document.querySelector("#filtre-formu");


/* ETKİNLİK KARTI OLUŞTURMA */

function kartOlustur(etkinlik) {

    return `
        <article class="etkinlik-karti">

            <h2>${etkinlik.baslik}</h2>

            <div class="icerik">

                <div class="etkinlik-bilgi">
                    <strong>Kategori:</strong>
                    ${etkinlik.kategori}
                </div>

                <div class="etkinlik-bilgi">
                    <strong>Tarih:</strong>
                    ${etkinlik.tarihMetni}
                </div>

                <div class="etkinlik-bilgi">
                    <strong>Yer:</strong>
                    ${etkinlik.yer}
                </div>

                <div class="etkinlik-bilgi">
                    <strong>Kontenjan:</strong>
                    ${etkinlik.kontenjan ?? "Belirtilmedi"}
                </div>

                <p>
                    ${etkinlik.aciklama}
                </p>

                <a href="etkinlik-detay.html?id=${etkinlik.id}">
                    Detayları Gör
                </a>

            </div>

        </article>
    `;
}


/* ETKİNLİKLERİ LİSTELEME */

function listele(dizi) {

    if (!liste) {
        return;
    }

    liste.innerHTML = dizi
        .map(kartOlustur)
        .join("");
}


/* ANA SAYFADAKİ YAKLAŞAN ETKİNLİKLER */

if (liste) {

    const limit = liste.dataset.limit;

    if (limit) {

        const yaklasanEtkinlikler = [...etkinlikler]
            .sort(function (a, b) {
                return a.tarih.localeCompare(b.tarih);
            })
            .slice(0, Number(limit));

        listele(yaklasanEtkinlikler);

    } else {

        listele(etkinlikler);

    }
}


/* KATEGORİLERİ OLUŞTURMA */

if (arama && kategoriFiltre && sonuc && filtreFormu) {

    const kategoriler = [
        ...new Set(
            etkinlikler.map(function (etkinlik) {
                return etkinlik.kategori;
            })
        )
    ];


    kategoriler.forEach(function (kategori) {

        const option = document.createElement("option");

        option.value = kategori;
        option.textContent = kategori;

        kategoriFiltre.appendChild(option);

    });


    /* FİLTRELEME */

    function filtrele() {

        const aranan = arama.value
            .toLocaleLowerCase("tr-TR")
            .trim();

        const secilenKategori = kategoriFiltre.value;


        const filtrelenmisEtkinlikler = etkinlikler.filter(
            function (etkinlik) {

                const metin = `
                    ${etkinlik.baslik}
                    ${etkinlik.kategori}
                    ${etkinlik.yer}
                    ${etkinlik.aciklama}
                `.toLocaleLowerCase("tr-TR");


                const metinUyuyor =
                    metin.includes(aranan);


                const kategoriUyuyor =
                    secilenKategori === "" ||
                    etkinlik.kategori === secilenKategori;


                return metinUyuyor && kategoriUyuyor;

            }
        );


        listele(filtrelenmisEtkinlikler);


        /* SONUÇ MESAJI */

        if (filtrelenmisEtkinlikler.length === 0) {

            sonuc.textContent =
                "Etkinlik bulunamadı.";

        } else {

            sonuc.textContent =
                filtrelenmisEtkinlikler.length +
                " etkinlik listeleniyor.";

        }

    }


    /* ARAMA YAZILDIKÇA */

    arama.addEventListener("input", filtrele);


    /* KATEGORİ DEĞİŞİNCE */

    kategoriFiltre.addEventListener("change", filtrele);


    /* ENTER İLE FORMUN YENİLENMESİNİ ENGELLE */

    filtreFormu.addEventListener("submit", function (event) {

        event.preventDefault();

    });


    /* SAYFA AÇILDIĞINDA */

    filtrele();

}