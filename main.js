class ChatGPTWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        #container { font-family: Arial; padding: 10px; }
        textarea { width: 100%; height: 60px; }
        button { margin-top: 10px; }
        #response { margin-top: 10px; background: #f3f3f3; padding: 10px; border-radius: 5px; }
      </style>
      <div id="container">
        <textarea id="question" placeholder="Ask something about this dashboard..."></textarea>
        <button id="askBtn">Ask ChatGPT</button>
        <div id="response"></div>
      </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot.getElementById("askBtn").addEventListener("click", async () => {
      const question = this.shadowRoot.getElementById("question").value;
      const responseDiv = this.shadowRoot.getElementById("response");
      responseDiv.innerText = "Thinking...";
      
      const answer = await this.askChatGPT(question);
      responseDiv.innerText = answer;
    });
  }

  async askChatGPT(question) {
    const apiKey = "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";
    const endpoint = "https://api.openai.com/v1/chat/completions";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: question }]
        })
      });

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "No response.";
    } catch (error) {
      return "Error: " + error.message;
    }
  }
}

customElements.define("com-exalogic-chatgptwidget", ChatGPTWidget);
