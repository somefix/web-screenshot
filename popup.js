// получаем доступ к кнопке
// let button = document.getElementById("screenshot");
// // когда кнопка нажата — находим активную вкладку и запускаем нужную функцию
// button.addEventListener("click", async () => {
//   // получаем доступ к активной вкладке
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//
//   const response = await chrome.tabs.sendMessage(tab.id, {action: "screenshot"});
//   console.log(response); // the content script responds with the data or a success message
//   // выполняем скрипт
//   chrome.scripting.executeScript({
//     // скрипт будет выполняться во вкладке, которую нашли на предыдущем этапе
//     target: { tabId: tab.id },
//     // вызываем функцию, в которой лежит запуск снежинок
//     function: takeScreenShot,
//   });
// });


function takeScreenShot() {
  console.log('takeScreenShot', window?.html2canvas, document?.html2canvas);
}

// takeScreenShot();

document.addEventListener("DOMContentLoaded", takeScreenShot);

chrome.action.onClicked.addListener(function (tab) {
  console.log("Hello")
});