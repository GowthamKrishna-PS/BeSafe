class BertTokenizer {
  constructor(vocab) {
    this.vocab = vocab; // Load the vocab for tokenization
  }

  encode(text) {
    const tokens = text.toLowerCase().split(/\s+/); // Basic whitespace tokenization
    const inputIds = tokens.map((token) => this.vocab[token] || 100); // Replace unknown tokens with 100
    return { input_ids: inputIds };
  }
}

export default BertTokenizer;
