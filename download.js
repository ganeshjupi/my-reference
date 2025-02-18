document.getElementById("downloadBtn").addEventListener("click", async function () {
  try {
    const response = await fetch("http://localhost:3000/download-order");
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else {
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
});
