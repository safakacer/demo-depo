const apikey = "3265874a2c77ae4a04bb96236a642d2f"; // kendi key'inle değiştir
const container = document.getElementById("container");
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// API adresi: metric (°C) ve encodeURIComponent
const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apikey}&units=metric`;

async function lokasyonBilgisi(city) {
  try {
    const resp = await fetch(url(city), { mode: "cors", cache: "no-store" });
    const data = await resp.json();

    // 401/404 dahil tip güvenli kontrol
    const code = String(data.cod || "");
    if (code === "404") {
      uyariMesaji("Konum bulunamadı!");
      main.innerHTML = "";
      return;
    }
    if (code === "401") {
      uyariMesaji("API anahtarı hatalı veya etkin değil.");
      main.innerHTML = "";
      return;
    }

    havaDurumuBilgisi(data);
  } catch (e) {
    uyariMesaji("Bağlantı hatası. Lütfen tekrar deneyin.");
    main.innerHTML = "";
  }
}

function havaDurumuBilgisi(data) {
  // Koruyucu okuma
  const temp = Math.round((data?.main?.temp ?? 0));
  const icon = data?.weather?.[0]?.icon ?? "01d";
  const mainText = data?.weather?.[0]?.main ?? "";
  const country = data?.sys?.country ?? "";
  const name = data?.name ?? "";

  const weather = document.createElement("div");
  weather.classList.add("weather");
  weather.innerHTML = `
    <h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="" />
      ${temp}°C
    </h2>
    <small>${mainText}</small>
    <small> – ${country}, ${name}</small>
  `;

  main.innerHTML = "";
  main.appendChild(weather);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value.trim();
  if (city) {
    lokasyonBilgisi(city);
  } else {
    uyariMesaji("Lütfen bir konum yazın.");
    main.innerHTML = "";
  }
});

function uyariMesaji(mesaj) {
  const notif = document.createElement("div");
  notif.classList.add("mesaj");
  notif.innerText = " " + (mesaj || "Konum bilgisi bulunmamaktadır!") + " ";
  container.appendChild(notif);
  setTimeout(() => notif.remove(), 2000);
}
