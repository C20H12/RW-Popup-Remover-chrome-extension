const output = document.querySelector("#statusout");

function setOuput(msg) {
  if (msg === "notFound") {
    output.textContent = "Not Found";
    output.className = "red";
  } else if (msg === "success") {
    output.textContent = "Successfully Removed";
    output.className = "green";
  }
}

chrome.runtime.onMessage.addListener((request, _sender, _respond) => {
  const msg = request.status;
  setOuput(msg);
  sessionStorage.setItem('state', `${output.textContent},${output.className}`)
});

(async () => {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, "get-status-from-storage");
  setOuput(response);
})().catch(() => console.log('content not loaded'))

