const chatContainer = document.getElementById("chatContainer");

const messages = [
  { from: "user", text: "Merhaba" },
  { from: "bot", text: "Merhaba, ben Dr.Coder. Yardımcı olabilirim." },
  { from: "user", text: "Bugün hava nasıl?" },
  { from: "bot", text: "İstanbul’da hava şu an parçalı bulutlu, 21°C." },
  { from: "user", text: "Harikasın." },
  { from: "bot", text: "Teşekkürler! Her zaman buradayım." }
];

let index = 0;

function typeUserMessage(text, callback) {
  const message = document.createElement("div");
  message.className = "message user";
  chatContainer.appendChild(message);

  let i = 0;
  const interval = setInterval(() => {
    message.textContent += text.charAt(i);
    i++;
    if (i === text.length) {
      clearInterval(interval);
      setTimeout(callback, 1000);
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 50);
}

function showTyping(callback) {
  const typing = document.createElement("div");
  typing.className = "message bot";
  typing.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
  chatContainer.appendChild(typing);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  setTimeout(() => {
    chatContainer.removeChild(typing);
    callback();
  }, 1500);
}

function addBotMessage(text) {
  const message = document.createElement("div");
  message.className = "message bot";
  message.textContent = text;
  chatContainer.appendChild(message);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function simulateChat() {
  if (index < messages.length) {
    const msg = messages[index];

    if (msg.from === "user") {
      typeUserMessage(msg.text, () => {
        index++;
        setTimeout(simulateChat, 1000);
      });
    } else {
      showTyping(() => {
        addBotMessage(msg.text);
        index++;
        setTimeout(simulateChat, 1000);
      });
    }
  }
}

window.onload = () => {
  simulateChat();
};
