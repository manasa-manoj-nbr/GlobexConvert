const toggleBtn = document.querySelectorAll(".toggle-btn")
const convertMode = document.getElementById("convert-mode")
const exchangeMode = document.getElementById("exchange-mode")

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