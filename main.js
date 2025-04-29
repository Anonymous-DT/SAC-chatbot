class ChatGPTWidget extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div style="font-family: Arial; width: 100%; padding: 10px;">
        <textarea id="userInput" placeholder="Ask a question..." style="width: 100%; height: 60px;"></textarea>
        <button id="sendBtn">Ask</button>
        <div id="response" style="margin-top: 10px; background: #f9f9f9; padding: 10px;"></div>
      </div>
    `;
  }

  connectedCallback() {
    const sendBtn = this.querySelector("#sendBtn");
    sendBtn.addEventListener("click", async () => {
      const question = this.querySelector("#userInput").value;
      const contextData = await this.getContextData();  // Simulated or fetched
      const answer = await this.askChatGPT(question, contextData);
      this.querySelector("#response").innerText = answer;
    });
  }

  async getContextData() {
    // Sample placeholder data
    return "Revenue for April 2025 is $1.2 million, Net Profit is $400K";
    
    // Later, you can fetch from your backend/OData for live data.
  }

  async askChatGPT(question, contextData) {
    const apiKey = "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"; // Add securely if hosted
    const body = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful finance dashboard assistant."
        },
        {
          role: "user",
          content: `${question} (Dashboard context: ${contextData})`
        }
      ]
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${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}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }
}

customElements.define("com-exalogic-chatgptwidget", ChatGPTWidget);