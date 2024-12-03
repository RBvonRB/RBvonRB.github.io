async function getChatGPTResponse(prompt) {
    const url = `https://mooncalendar.glitch.me/api/chatgpt`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("ChatGPT response:", data.response);
  
      return data.response; // Return the chatbot's response
    } catch (error) {
      console.error("Failed to get response from ChatGPT:", error);
    }
  
    return null; // Default to null if fetching fails
  }
  
  // Example Usage
  getChatGPTResponse("Tell me a joke about programming.").then(response => {
    if (response) {
      console.log("ChatGPT says:", response);
    }
  });
  