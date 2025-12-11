document.addEventListener('DOMContentLoaded', () => {
    const chatArea = document.getElementById('chat-area');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Focus input on load
    userInput.focus();

    // Event Listeners
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        // Add User Message
        addMessage(text, 'user');
        userInput.value = '';

        // Simulate AI Logic
        showTypingIndicator();
        
        // Randomize response delay between 1-2.5 seconds for realism
        const delay = Math.random() * 1500 + 1000;
        
        setTimeout(() => {
            removeTypingIndicator();
            const response = getSimulatedResponse(text);
            addMessage(response, 'bot');
        }, delay);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');

        const p = document.createElement('p');
        p.textContent = text;

        const timeSpan = document.createElement('span');
        timeSpan.classList.add('timestamp');
        timeSpan.textContent = getCurrentTime();

        contentDiv.appendChild(p);
        contentDiv.appendChild(timeSpan);
        messageDiv.appendChild(contentDiv);

        chatArea.appendChild(messageDiv);
        scrollToBottom();
    }

    // Typing Indicator Logic
    let typingIndicator = null;

    function showTypingIndicator() {
        if (typingIndicator) return;

        typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator', 'bot-message');
        typingIndicator.innerHTML = `
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        `;
        chatArea.appendChild(typingIndicator);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        if (typingIndicator) {
            typingIndicator.remove();
            typingIndicator = null;
        }
    }

    function scrollToBottom() {
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function getSimulatedResponse(input) {
        const lowerInput = input.toLowerCase();
        
        const responses = [
            { keywords: ['hello', 'hi', 'hey'], text: "Hello there! How's your day going?" },
            { keywords: ['how are you', 'status'], text: "I'm functioning perfectly and ready to help! What about you?" },
            { keywords: ['name', 'who are you'], text: "I'm Aura, your virtual assistant. I love chatting!" },
            { keywords: ['weather'], text: "I can't check the window, but I hope it's sunny where you are!" },
            { keywords: ['joke'], text: "Why did the developer go broke? Because he used up all his cache!" },
            { keywords: ['help'], text: "I can chat, tell jokes, or listen to your thoughts. Just type away." }
        ];

        for (const resp of responses) {
            if (resp.keywords.some(k => lowerInput.includes(k))) {
                return resp.text;
            }
        }

        // Default responses
        const defaults = [
            "That's interesting! Tell me more.",
            "I see. Go on...",
            "Could you elaborate on that?",
            "I'm listening!",
            "Fascinating perspective."
        ];
        return defaults[Math.floor(Math.random() * defaults.length)];
    }
});
