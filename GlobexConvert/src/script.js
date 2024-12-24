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
            convertMode.classList.add("active")
            exchangeMode.classList.remove("active")
        } else{
            exchangeMode.classList.add("active")
            convertMode.classList.remove("active")
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
        CNY: "¥", SEK: "kr", NZD: "NZ$", INR: "₹", RUB: "₽", BRL: "R$", ZAR: "R",
    };
    return symbols[currency] || currency;
}
