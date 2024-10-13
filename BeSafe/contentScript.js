// Sample list of harmful words (replace with an AI model later)
// const harmfulWords = ["badword1", "badword2"];
// // Function to replace harmful words with asterisks
// function censorHarmfulWords(text) {
//   harmfulWords.forEach((word) => {
//     const regex = new RegExp(`\\b${word}\\b`, "gi");
//     text = text.replace(regex, "*".repeat(word.length));
//   });
//   return text;
// }
// // Censor harmful language on the webpage's body content
// document.body.innerHTML = censorHarmfulWords(document.body.innerHTML);
//
//
//
//
// Initialize an empty array for harmful words
async function loadHarmfulWords() {
  // Get the path to harmful_words.txt using chrome.runtime.getURL
  const fileUrl = chrome.runtime.getURL("data/harmful_words.txt"); // Adjusted for the BeSafe directory

  // Fetch the file
  const response = await fetch(fileUrl);
  const data = await response.text();

  // Split and clean up words
  return data
    .split("\n")
    .map((word) => word.trim())
    .filter((word) => word);
}

// Function to replace harmful words with asterisks
async function censorHarmfulWords(text) {
  const harmfulWords = await loadHarmfulWords();

  harmfulWords.forEach((word) => {
    // Create a regex to match the harmful word in various formats
    const regex = new RegExp(
      `\\b${word
        .split("")
        .map(
          (c) =>
            `[${c}${c.replace(
              /[a-zA-Z]/,
              (c) => c.toLowerCase() + c.toUpperCase()
            )}]`
        )
        .join("[^\\w]*")}\\b`,
      "gi"
    );

    // Replace the word with asterisks of the same length
    text = text.replace(regex, "*".repeat(word.length));
  });

  return text;
}

// Censor harmful language on the webpage's body content
(async () => {
  const bodyContent = document.body.innerHTML;
  document.body.innerHTML = await censorHarmfulWords(bodyContent);
})();
