document.getElementById("start").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: detectHarmfulLanguage,
    });
  });
});

function detectHarmfulLanguage() {
  alert("Detection initiated. Harmful language will be censored.");
}
