import { etkinlikler } from "./data.js";


const params =
    new URLSearchParams(window.location.search);


const id =
    Number(params.get("id"));


const etkinlik =
    etkinlikler.find(function (etkinlik) {

        return etkinlik.id === id;

    });


const detay =
    document.querySelector("#etkinlik-detay");


if (detay && etkinlik) {

    detay.innerHTML = `

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

                <a href="etkinlik-guncelle.html?id=${etkinlik.id}">
                    Etkinliği Güncelle
                </a>

            </div>

        </article>

    `;

}