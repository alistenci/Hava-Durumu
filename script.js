const myurl = 'https://api.openweathermap.org/data/2.5';
const cikti = document.getElementById('output').innerHTML;

function searchCity(event) {
    event.preventDefault(); // Formun varsayılan davranışını engeller (sayfayı yenilemeyi önler)

    const sehir = document.getElementById("query").value;
    if (sehir =="") {
        alert("Boş bırakmayınız");
        return;
        
    }
    getWeather(sehir);
    
}
function getWeather(sehir) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${sehir}&appid=af8037ba7bc87c29b11a0ef5997e6ae4&units=metric&lang=tr`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Şehir bulunamadı'); //bir hata fırlatır ve JavaScript çalışma zamanı bunu bir istisna olarak ele alır. Bu, normal akışı durdurur ve kodun hemen sonlanmasına neden olur. Ardından, bu hatayı ele almak için bir catch bloğu kullanıldı.
        }
        return response.json();
        })
        .then(data => {
            // API'den gelen verileri burada işleyebilirsiniz
            displayWeather(data);
        })
        .catch(error => {
           alert('Şehir ismini düzgün giriniz');
        });
}

function displayWeather(weatherData) {
    document.getElementById("sehir").innerText = weatherData.name;
    var temperature = Math.floor(weatherData.main.temp); //sıcaklık değerini tam sayıya yuvarlamak için. normalde gelen değer 13.16 gibiydi.
    document.getElementById("sicaklik").innerText = temperature + "°C";
    document.getElementById("ruzgar").innerText = weatherData.wind.speed + " kmh";
    document.getElementById("nem").innerText = weatherData.main.humidity+"% nem";
    document.getElementById("havadurumu").innerText = weatherData.weather[0].description;
    let durum = weatherData.weather[0].description;
    let iconElement = document.getElementById("icon");

    if (durum.includes("kar")) {
        iconElement.src = "photos/snow.png";
    } else if (durum.includes("yağmur")) {
        iconElement.src = "photos/rain.png";        
    } else if (durum.includes("kapalı") || (durum.includes("bulutlu"))) {
        iconElement.src = "photos/clouds.png";
    } else if (durum.includes("açık")) {
        iconElement.src = "photos/acik.png";        
    } else if (durum.includes("fırtına")) {
        iconElement.src = "photos/thunder.png";    
    } else{
        iconElement.src = "photos/others.png"; 
    }

}

// API'den hava durumu verilerini almak için işlevi çağır
getWeather('İstanbul'); // Fonksiyonu çağırdığımda bir şehir adı geçmediği zaman 'sehir' değişkeni undefined oluyor. Bunun sebebi ${sehir} bu koddan sonra ,tr ekinin olmaması. ${sehir},tr