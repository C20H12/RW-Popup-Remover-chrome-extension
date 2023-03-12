const intervalId = setInterval(cb, 2000);

const LIMIT = 10;
let runCount = 0;

function cb() {
  if (++runCount > LIMIT) {
    clearInterval(intervalId);
    chrome.runtime.sendMessage({ status: "notFound" });
    sessionStorage.setItem("rwremove-status", "notFound")
    return;
  }

  const popup = document.querySelector("body > th-rw4gc");

  if (popup) {
    popup.remove();
    clearInterval(intervalId);
    chrome.runtime.sendMessage({ status: "success" });
    sessionStorage.setItem("rwremove-status", "success")
  }
}

chrome.runtime.onMessage.addListener((request, _sender, respond) => {
  if (request === "get-status-from-storage"){
    const storedStatus = sessionStorage.getItem("rwremove-status");
    respond(storedStatus)
  }
})

