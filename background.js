chrome.action.onClicked.addListener(async (tab) => {
  // chrome.tabs.connect(tab.id);
  const port = chrome.tabs.connect(tab.id);
  const intervalId = showLoader();

  console.log("action.onClicked port", port);
  port.postMessage({ action: "screenshot" });

  port.onMessage.addListener((message) => {
    console.log("close port", message);
    if (message?.done) {
      hideLoader(intervalId);
    }
  });

  // const response = await chrome.tabs.sendMessage(tab.id, { action: "screenshot" });

  // console.log("onClicked response", response)

  // hideLoader(intervalId);
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log(sender.tab ?
//     "from a content script:" + sender.tab.url :
//     "from the extension");
//   console.log(request)
//
//   if (request.greeting === "hello") {
//     sendResponse({farewell: "goodbye"});
//   }
//
//   return true;
// });


function showLoader() {
  let rotate = false;

  return setInterval(() => {
    let imgPath = "/images/loader.png";

    if (rotate) {
      imgPath = "/images/loader90.png";
    }

    rotate = !rotate
    chrome.action.setIcon({ path: imgPath });
  }, 200);
}

function hideLoader(intervalId) {
  clearInterval(intervalId);
  chrome.action.setIcon({ path: "/images/get_started48.png" });
}