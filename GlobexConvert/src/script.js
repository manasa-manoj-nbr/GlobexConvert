const toggleBtn = document.querySelectorAll(".toggle-btn")
const convertMode = document.getElementById("convert-mode")
const exchangeMode = document.getElementById("exchange-mode")

const amtInput = document.getElementById("amt");
const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");

const apiKey = "544865c49300894a40e937bb"
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
        result.innerHTML = `${rate} ${to}`
        console.log(rate)
    }).catch((error) => {
        console.log(error);
        result.innerHTML = "<span style='color:red;'>Couldn't fetch the results. Please try again later</span>"
    })
}
)