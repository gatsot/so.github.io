function updateCountdown() {
    let e = localStorage.getItem("targetDate");
    !e || isNaN(new Date(e)) ? (e = new Date, e.setDate(e.getDate() + 2), e.setHours(19), e.setMinutes(38), e.setSeconds(26), localStorage.setItem("targetDate", e)) : e = new Date(e);
    const t = document.getElementById("days").querySelector(".value"),
        n = document.getElementById("hours").querySelector(".value"),
        o = document.getElementById("minutes").querySelector(".value"),
        a = document.getElementById("seconds").querySelector(".value");

    function l() {
        const l = (new Date).getTime(),
            c = e - l,
            d = Math.floor(c / 864e5),
            i = Math.floor(c % 864e5 / 36e5),
            s = Math.floor(c % 36e5 / 6e4),
            r = Math.floor(c % 6e4 / 1e3);
        t.textContent = d, n.textContent = i, o.textContent = s, a.textContent = r
    }
    l(), setInterval(l, 1e3)
}
updateCountdown();
var btnDirectPayment = document.querySelector(".btnDirectPayment"),
    modalDirectPayment = document.getElementById("directPaymentModal"),
    btnCoinbaseWallet = document.querySelector(".btnCoinbaseWallet"),
    modalCoinbaseWallet = document.getElementById("coinbaseWalletModal"),
    btnBestWallet = document.querySelector(".btnBestWallet"),
    modalBestWallet = document.getElementById("BestWalletModal"),
    btnPhantomWallet = document.querySelector(".btnPhantomWallet"),
    modalPhantomWallet = document.getElementById("phantomWalletModal"),
    btnBrowserWallet = document.querySelector(".btnBrowserWallet"),
    modalBrowserWallet = document.getElementById("browserWalletModal"),
    btnNoWallet = document.querySelector(".btnNoWallet"),
    modalNoWallet = document.getElementById("noWalletModal"),
    spans = document.querySelectorAll(".close");

function comprarTokens() {
    document.getElementById("tokenInput").value
}

function copiarDireccion() {
    var e = document.getElementById("direccion"),
        t = document.createRange();
    t.selectNode(e), window.getSelection().removeAllRanges(), window.getSelection().addRange(t), document.execCommand("copy"), window.getSelection().removeAllRanges();
    var n = document.getElementById("copiedText");
    n.style.display = "inline", setTimeout((function() {
        n.style.display = "none"
    }), 1e3)
}

function copiarDireccion(e) {
    var t = document.querySelector(`#${e} .container p`),
        n = document.createElement("textarea");
    n.value = t.textContent, n.setAttribute("readonly", ""), n.style.position = "absolute", n.style.left = "-9999px", document.body.appendChild(n), n.select(), document.execCommand("copy"), document.body.removeChild(n);
    var o = document.querySelector(`#${e} .copied-text`);
    o.style.display = "inline-block", setTimeout((function() {
        o.style.display = "none"
    }), 1500)
}
spans.forEach((function(e) {
    e.onclick = function() {
        modalDirectPayment.style.display = "none", modalCoinbaseWallet.style.display = "none", modalBestWallet.style.display = "none", modalPhantomWallet.style.display = "none", modalBrowserWallet.style.display = "none", modalNoWallet.style.display = "none"
    }
})), btnDirectPayment.onclick = function() {
    modalDirectPayment.style.display = "block"
}, btnCoinbaseWallet.onclick = function() {
    modalCoinbaseWallet.style.display = "block"
}, btnBestWallet.onclick = function() {
    modalBestWallet.style.display = "block"
}, btnPhantomWallet.onclick = function() {
    modalPhantomWallet.style.display = "block"
}, btnBrowserWallet.onclick = function() {
    modalBrowserWallet.style.display = "block"
}, btnNoWallet.onclick = function() {
    modalNoWallet.style.display = "block"
}, window.onclick = function(e) {
    e.target == modalDirectPayment ? modalDirectPayment.style.display = "none" : e.target == modalCoinbaseWallet ? modalCoinbaseWallet.style.display = "none" : e.target == modalBestWallet ? modalBestWallet.style.display = "none" : e.target == modalPhantomWallet ? modalPhantomWallet.style.display = "none" : e.target == modalBrowserWallet ? modalBrowserWallet.style.display = "none" : e.target == modalNoWallet && (modalNoWallet.style.display = "none")
}, document.addEventListener("DOMContentLoaded", (function() {
    const e = document.getElementById("connectwalletBtn"),
        t = document.getElementById("hiddenContent"),
        n = document.querySelector(".modal-dialog"),
        o = document.createElement("div");
    o.classList.add("backdrop"), document.body.appendChild(o), t.style.display = "none", n.style.display = "none", o.style.display = "none", e.addEventListener("click", (function() {
        o.style.display = "block", t.style.display = "block", n.style.display = "block"
    })), document.querySelector(".modal-content svg-icon.cursor-pointer").addEventListener("click", (function() {
        n.style.display = "none", o.style.display = "none"
    }))
})), document.addEventListener("DOMContentLoaded", (function() {
    document.querySelector(".purchase-interface").style.display = "block"
})), document.getElementById("tokenInput").addEventListener("input", comprarTokens), document.addEventListener("DOMContentLoaded", (function() {
    ["directPaymentModal", "coinbaseWalletModal", "BestWalletModal", "phantomWalletModal", "browserWalletModal", "noWalletModal"].forEach((function(e) {
        document.querySelector(`#${e} .copy-icon`).addEventListener("click", (function() {
            copiarDireccion(e)
        }))
    }))
}));
let bnbPrice = 0;
const tokenPriceInUSD = 35e-5;
let conversionRate = tokenPriceInUSD;
async function fetchBNBPrice() {
    try {
        const e = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"),
            t = await e.json();
        bnbPrice = t.binancecoin.usd, updateConversions()
    } catch (e) {
        console.error("Error fetching BNB price:", e)
    }
}

function getRandomNumber(e, t) {
    return Math.random() * (t - e) + e
}

function updateValue() {
    let e = parseFloat(localStorage.getItem("usdt-raised")) || 50726512.52;
    const t = 6e8,
        n = getRandomNumber(3.13, 27.13),
        o = Math.min(e + n, t);
    document.getElementById("usdt-raised").innerText = "$" + o.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"), localStorage.setItem("usdt-raised", o), o < t && setTimeout(updateValue, getRandomNumber(1300, 5330))
}

function selectTab(e) {
    document.querySelectorAll(".tab-container .btn").forEach((function(e) {
        e.classList.remove("selected")
    })), e.classList.add("selected")
}