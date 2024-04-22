// получаем доступ к кнопке
let button = document.getElementById("screenshot");
// когда кнопка нажата — находим активную вкладку и запускаем нужную функцию
button.addEventListener("click", async () => {
  // получаем доступ к активной вкладке
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // выполняем скрипт
  chrome.scripting.executeScript({
    // скрипт будет выполняться во вкладке, которую нашли на предыдущем этапе
    target: { tabId: tab.id },
    // вызываем функцию, в которой лежит запуск снежинок
    function: takeScreenShot,
  });
});

function takeScreenShot() {
  console.log('takeScreenShot', window?.html2canvas, document?.html2canvas);
}

function ready() {
  // alert('DOM готов');
  alert('takeScreenShot', window?.html2canvas, document?.html2canvas);
}

document.addEventListener("DOMContentLoaded", ready);