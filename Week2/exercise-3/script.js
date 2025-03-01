let countdownInterval;
let countdownValue = 0;

const startCount = () => {
  countdownValue = Number(document.getElementById("countdown-input").value);

  if (isNaN(countdownValue) || countdownValue <= 0 || countdownValue > 25) {
    alert("Geçersiz bir sayı girdiniz!");
    return;
  }

  countdownInterval = setInterval(() => {
    document.getElementById("display").innerText = countdownValue;
    countdownValue--;

    if (countdownValue < 0) {
      clearInterval(countdownInterval);
      document.getElementById("sub-display").innerText = "Süre doldu!";
    }
  }, 1000);
};

const reset = () => {
  clearInterval(countdownInterval);
  document.getElementById("display").innerText = "Sıfırlandı!"
  document.getElementById("sub-display").innerText = "";
};
