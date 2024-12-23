const toggleBtn = document.querySelectorAll(".toggle-btn")
const convertMode = document.getElementById("convert-mode")
const exchangeMode = document.getElementById("exchange-mode")

const amtInput = document.getElementById("amt");
const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");

const exchangeBtn = document.getElementById("exchangeBtn");
const baseCurrency = document.getElementById("base");
const exchangeRates = document.getElementById("exchangeRates");

const apiKey = "544865c49300894a40e937bb";

toggleBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        toggleBtn.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.getAttribute("data-mode")
        if (mode === "convert") {
            exchangeMode.style.display = "none"
            convertMode.style.display = "flex"
        } else {
            convertMode.style.display = "none";
            exchangeMode.style.display = "flex"
        }
    });
});

convertBtn.addEventListener("click", () => {
    const amount = amtInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`).then((response) => {
        return response.json()
    }).then((data) => {
        const conversionRate = data.conversion_rate;
        const rate = (amount * conversionRate).toFixed(2);
        result.innerHTML = `<span style='margin-right:0.5rem'>${getCurrencySymbol(to)}</span>${rate} ${to}`
        console.log(rate)
    }).catch((error) => {
        console.log(error);
        result.innerHTML = "<span style='color:red;'>Couldn't fetch the results. Please try again later</span>"
    })
}
)

exchangeBtn.addEventListener("click", () => {
    const base = baseCurrency.value;
    console.log(base)
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`).then((response) => {
        return response.json()
    }).then((data) => {
        let ratesHTML = "<h3 style='font-size:2rem; font-weight:bold;'>Exchange Rates</h3><ul>";
        for (const [currency, rate] of Object.entries(data.conversion_rates)) {
            if (currency !== base) {
                ratesHTML += `<li>${currency}: ${rate.toFixed(4)}</li>`;
            }
        }
        ratesHTML += "</ul>";
        exchangeRates.innerHTML = ratesHTML;
        console.log(data)
    }).catch((error) => {
        exchangeRates.innerHTML = "<span style='color:red;'>Couldn't fetch the results. Please try again later</span>"
        console.log(error)
    })
})

function getCurrencySymbol(currency) {
    const symbols = {
      USD: "$", EUR: "€", GBP: "£", JPY: "¥", AUD: "A$", CAD: "C$", CHF: "CHF",
      CNY: "¥", SEK: "kr", NZD: "NZ$", MXN: "$", SGD: "S$", HKD: "HK$", NOK: "kr",
      KRW: "₩", TRY: "₺", RUB: "₽", INR: "₹", BRL: "R$", ZAR: "R", THB: "฿",
      IDR: "Rp", MYR: "RM", PHP: "₱", VND: "₫", NGN: "₦", PKR: "₨", EGP: "E£",
      SAR: "﷼", AED: "د.إ", ARS: "$", CLP: "$", COP: "$", PEN: "S/", UYU: "$U",
      BGN: "лв", RON: "lei", HUF: "Ft", CZK: "Kč", PLN: "zł", ISK: "kr",
      DKK: "kr", NOK: "kr", LKR: "Rs", BDT: "৳", KES: "KSh", GHS: "₵",
      ZMW: "ZK", XOF: "CFA", XAF: "FCFA", MAD: "MAD", TZS: "TSh", UGX: "USh",
      GMD: "D", MUR: "₨", NAD: "$", SCR: "₨", SLL: "Le", SDG: "ج.س.", 
      BWP: "P", MWK: "MK", MZN: "MT", ETB: "Br", DJF: "Fdj", LYD: "ل.د",
      TND: "د.ت", DZD: "د.ج", KWD: "د.ك", OMR: "ر.ع.", QAR: "ر.ق", BHD: "ب.د",
      JOD: "د.ا", LBP: "ل.ل", SYP: "ل.س", IQD: "ع.د", YER: "﷼", KZT: "₸",
      UZS: "so'm", TJS: "SM", GEL: "₾", AMD: "֏", AZN: "₼", KGS: "с",
      BYN: "Br", MDL: "L", RSD: "дин", BAM: "KM", MKD: "ден", ALL: "L",
      HRK: "kn", EEK: "kr", LTL: "Lt", LVL: "Ls", GEL: "₾", TMT: "T",
      IRR: "﷼", AFN: "؋", NPR: "₨", BTN: "Nu.", MMK: "K", KHR: "៛",
      LAK: "₭", BND: "B$", FJD: "$", PGK: "K", VUV: "VT", WST: "WS$",
      TOP: "T$", XPF: "₣", MNT: "₮", MGA: "Ar", SOS: "Sh", RWF: "FRw",
      BIF: "FBu", KMF: "CF", AOA: "Kz", CVE: "$", STN: "Db", ZWL: "Z$",
      SZL: "L", ERN: "Nkf", GNF: "FG", LSL: "L", SSP: "£", HTG: "G",
      XCD: "EC$", BBD: "$", BSD: "$", BZD: "BZ$", GYD: "$", JMD: "J$",
      KYD: "$", ANG: "ƒ", AWG: "ƒ", SRD: "$", TTD: "$", XAG: "oz",
      XAU: "oz", BTC: "₿", ETH: "Ξ",
    };
    return symbols[currency] || currency;
  }
  