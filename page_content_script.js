"use strict"
console.log("Screen Capture Extension Script has loaded")
// chrome.runtime.onMessage.addListener(ScreenCaptureExtCB)
chrome.runtime.onConnect.addListener(function(port) {
  console.log("onConnect", port);

  port.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log("ScreenCaptureExtCB", message);

    if (message.action === "screenshot") {
      await createScreenShot();
      port.postMessage({ done: true });
    }
  });
});

// async function ScreenCaptureExtCB (message, sender, sendResponse) {
//   console.log("ScreenCaptureExtCB 1", message);
//
//   if (message.action === "screenshot") {
//     await createScreenShot();
//     const response = sendResponse({message: "some message from tab"});
//     // do something with response here, not outside the function
//     console.log("response", response);
//   }
//
//   return true;
// }

async function createScreenShot() {
  await html2canvas(document.body).then(canvas => {
    canvas.toBlob((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.style.display = "none";
      a.href = url;
      a.target = "_blank";
      a.download = document.title;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      a.remove();
    }, "image/png")
  });
}