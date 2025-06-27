document.addEventListener("DOMContentLoaded", () => {
  const resultElement = document.getElementById("result");

  const html5QrCode = new Html5Qrcode("reader");

  function onScanSuccess(decodedText, decodedResult) {
    resultElement.textContent = decodedText;
    html5QrCode.stop().catch(err => console.error("Stop failed", err));
  }

  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        onScanSuccess
      );
    }
  }).catch(err => console.error("Camera access error", err));

  // Image file scanning
  document.getElementById("qr-file").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    html5QrCode.scanFile(file, true)
      .then(decodedText => {
        resultElement.textContent = decodedText;
      })
      .catch(err => {
        resultElement.textContent = "No QR code found.";
        console.error("Scan failed", err);
      });
  });
});
