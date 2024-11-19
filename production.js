(function() {
    const o = document.createElement("link").relList;
    if (o && o.supports && o.supports("modulepreload"))
        return;
    for (const t of document.querySelectorAll('link[rel="modulepreload"]'))
        n(t);
    new MutationObserver(t => {
        for (const s of t)
            if (s.type === "childList")
                for (const c of s.addedNodes)
                    c.tagName === "LINK" && c.rel === "modulepreload" && n(c)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function i(t) {
        const s = {};
        return t.integrity && (s.integrity = t.integrity),
        t.referrerPolicy && (s.referrerPolicy = t.referrerPolicy),
        t.crossOrigin === "use-credentials" ? s.credentials = "include" : t.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin",
        s
    }
    function n(t) {
        if (t.ep)
            return;
        t.ep = !0;
        const s = i(t);
        fetch(t.href, s)
    }
}
)();
const l = void 0
  , L = document.getElementById("hamburger")
  , h = document.getElementById("open")
  , f = document.getElementById("close")
  , T = document.getElementById("nav-toggle")
  , y = document.getElementById("input")
  , b = document.getElementById("search_btn")
  , $ = document.getElementById("currentDate")
  , S = document.getElementById("place")
  , v = document.getElementById("temperature")
  , _ = document.getElementById("weatherType")
  , D = document.getElementById("pmr")
  , R = document.getElementById("pm10")
  , k = document.getElementById("so2")
  , P = document.getElementById("co")
  , G = document.getElementById("no")
  , F = document.getElementById("no2")
  , M = document.getElementById("nh3")
  , N = document.getElementById("o3")
  , p = document.getElementById("airQualityIndex")
  , O = document.getElementById("sunSetTime")
  , j = document.getElementById("sunRiseTime")
  , H = document.getElementById("currentLocation")
  , Q = document.getElementById("humidity")
  , q = document.getElementById("pressure")
  , W = document.getElementById("visibility")
  , C = document.getElementById("windSpeed")
  , A = document.getElementById("feelsLike")
  , K = document.getElementById("main_image");
let E, a = "delhi";
const V = ["null", "Good", "Fair", "Moderate", "Poor", "Very Poor"]
  , B = ["null", "bg-bg-btn", "bg-green-400", "bg-yellow-400", "bg-blue-400", "bg-red-700"]
  , z = () => {
    h.classList.toggle("opacity-0"),
    h.classList.toggle("rotate-90"),
    f.classList.toggle("opacity-0"),
    f.classList.toggle("rotate-90"),
    T.classList.toggle("translate-x-96")
}
  , J = e => {
    let o = [];
    for (let i = 0; i < e.list.length; i++) {
        const t = new Date(e.list[i].dt * 1e3).toLocaleDateString("en-GB");
        o.some(s => s.date === t) || o.push({
            date: t,
            temp: e.list[i].main.temp,
            timestamp: e.list[i].dt,
            icon: e.list[i].weather[0].icon
        })
    }
    for (let i = 0; i < 5; i++) {
        const n = document.getElementById(`for_temp_${i + 1}`)
          , t = o[i]
          , s = document.getElementById(`for_image_${i + 1}`);
        if (s.src = `https://openweathermap.org/img/wn/${t.icon}.png`,
        t) {
            n.innerHTML = `${(t.temp - 273.15).toFixed(2)} &deg;`;
            const c = new Date(t.timestamp * 1e3)
              , d = {
                day: "2-digit",
                month: "short"
            }
              , m = c.toLocaleString("en-GB", d)
              , u = {
                weekday: "short"
            }
              , g = c.toLocaleString("en-GB", u);
            n.nextElementSibling && (n.nextElementSibling.innerText = m),
            n.nextElementSibling.nextElementSibling && (n.nextElementSibling.nextElementSibling.innerText = g)
        } else
            console.log(`No data available for day ${i + 1}`)
    }
}
  , U = e => {
    K.src = `https://openweathermap.org/img/wn/${e}.png`
}
  , X = e => {
    Q.innerText = e + "%"
}
  , Y = e => {
    q.innerText = e + "hPa"
}
  , Z = e => {
    W.innerText = e / 1e3 + "Km"
}
  , ee = e => {
    C.innerText = e + "m/s"
}
  , te = e => {
    A.innerHTML = `${(e - 273.14).toFixed(2)} &deg;C`
}
  , ne = e => {
    for (let o = 1; o <= 5; o++)
        p.classList.remove(B[o]);
    p.classList.add(B[e.list[0].main.aqi]),
    p.innerText = V[e.list[0].main.aqi],
    D.innerText = e.list[0].components.pm2_5,
    R.innerText = e.list[0].components.pm10,
    k.innerText = e.list[0].components.so2,
    P.innerText = e.list[0].components.co,
    G.innerText = e.list[0].components.no,
    F.innerText = e.list[0].components.no2,
    M.innerText = e.list[0].components.nh3,
    N.innerText = e.list[0].components.o3
}
  , r = async () => {
    try {
        const o = await (await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${a}&limit=1&appid=${l}`)).json()
          , n = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${o[0].lat}&lon=${o[0].lon}&appid=${l}`)).json()
          , t = new Date(n.dt * 1e3);
        S.innerText = `${n.name}, ${n.sys.country}`;
        const s = {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
          , c = t.toLocaleString("en-GB", s);
        v.innerHTML = `${(n.main.temp - 273.15).toFixed(2)} &deg;`,
        $.innerText = c,
        _.innerText = n.weather[0].main;
        const d = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: !0
        }
          , m = new Date(n.sys.sunrise * 1e3)
          , u = new Date(n.sys.sunset * 1e3)
          , g = m.toLocaleString("en-GB", d)
          , w = u.toLocaleString("en-GB", d);
        j.innerText = g,
        O.innerText = w,
        U(n.weather[0].icon),
        Z(n.visibility),
        ee(n.wind.speed),
        X(n.main.humidity),
        Y(n.main.pressure),
        te(n.main.feels_like),
        E = await (await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${o[0].lat}&lon=${o[0].lon}&appid=${l}`)).json(),
        J(E);
        const x = await (await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${o[0].lat}&lon=${o[0].lon}&appid=${l}`)).json();
        ne(x)
    } catch (e) {
        console.log("Error:", e)
    }
}
  , oe = e => ["Tehsil", "District", "Taluka", "Block"].reduce( (i, n) => {
    const t = new RegExp(`\\s*${n}\\b`,"i");
    return i.replace(t, "")
}
, e).trim()
  , I = () => {
    navigator.geolocation.getCurrentPosition(async e => {
        const o = e.coords.latitude
          , i = e.coords.longitude;
        try {
            const t = await (await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${o}&lon=${i}&limit=1&appid=${l}`)).json();
            t && t.length > 0 ? (a = oe(t[0].name),
            r()) : (console.log("No location data found. Falling back to default location."),
            a = "Delhi",
            r())
        } catch (n) {
            console.error("Error fetching location name:", n),
            a = "Delhi",
            r()
        }
    }
    , e => {
        console.error("Geolocation error:", e),
        a = "Delhi",
        r()
    }
    )
}
;
H.addEventListener("click", I);
y.addEventListener("input", function() {
    a = y.value
});
b.addEventListener("click", () => {
    r()
}
);
y.addEventListener("keydown", function(e) {
    e.key === "Enter" && r()
});
L.addEventListener("click", z);
I();
