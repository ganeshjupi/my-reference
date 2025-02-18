document.getElementById("downloadBtn").addEventListener("click", async function () {
  try {
      const response = await fetch("http://localhost:3000/download-order");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = "order.xlsx";  // Change this to your actual file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
  } catch (error) {
      console.error("Error downloading the file:", error);
  }
});
