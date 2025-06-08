class GitChat {
    constructor() {
        // Initialize properties
        this.users = new Map();
        this.messages = [];
        this.currentUser = null;
        this.currentRoom = 'general';
        this.typingUsers = new Set();
        this.typingTimeout = null;
        this.selectedFile = null;
        this.audioContext = null;
        
        // Settings with defaults
        this.settings = {
            darkMode: false,
            soundEffects: true,
            desktopNotifications: false,
            autoScroll: true,
            typingIndicators: true
        };
        
        // Bot conversation context
        this.conversationContext = {
            lastUserMessage: '',
            userMood: 'neutral',
            conversationHistory: [],
            botPersonalities: [
                { name: "Alex", mood: "friendly", interests: ["tech", "coding", "games"] },
                { name: "Jordan", mood: "helpful", interests: ["design", "art", "music"] },
                { name: "Sam", mood: "enthusiastic", interests: ["sports", "fitness", "travel"] },
                { name: "Riley", mood: "thoughtful", interests: ["books", "philosophy", "science"] },
                { name: "Casey", mood: "funny", interests: ["memes", "comedy", "movies"] },
                { name: "Morgan", mood: "supportive", interests: ["mental health", "cooking", "nature"] }
            ]
        };
        
        // Initialize the app
        this.initializeElements();
        this.setupEventListeners();
        this.loadFromStorage();
        this.simulateOnlineUsers();
        this.initializeSettings();
        this.playSound('connect');
        
        // Set global reference for onclick handlers
        window.gitChat = this;
    }

    initializeElements() {
        // Get all DOM elements
        this.usernameInput = document.getElementById('usernameInput');
        this.messageInput = document.getElementById('messageInput');
        this.messageForm = document.getElementById('messageForm');
        this.messagesContainer = document.getElementById('messagesContainer');
        this.usersList = document.getElementById('usersList');
        this.userCount = document.getElementById('userCount');
        this.connectionStatus = document.getElementById('connectionStatus');
        this.notification = document.getElementById('notification');
        this.emojiPicker = document.getElementById('emojiPicker');
        this.emojiBtn = document.getElementById('emojiBtn');
        this.fileBtn = document.getElementById('fileBtn');
        this.fileInput = document.getElementById('fileInput');
        this.filePreview = document.getElementById('filePreview');
        this.themeToggle = document.getElementById('themeToggle');
        this.soundToggle = document.getElementById('soundToggle');
        this.userSearch = document.getElementById('userSearch');
        this.settingsPanel = document.getElementById('settingsPanel');
        this.closeSettings = document.getElementById('closeSettings');
    }

    setupEventListeners() {
        // Username input
        this.usernameInput?.addEventListener('input', (e) => {
            this.handleUsernameChange(e.target.value);
        });

        // Message form
        this.messageForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        });

        // Message input
        this.messageInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        this.messageInput?.addEventListener('input', () => {
            this.handleTyping();
            this.autoResize();
        });

        // Emoji picker
        this.emojiBtn?.addEventListener('click', () => {
            this.emojiPicker?.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (this.emojiBtn && this.emojiPicker && 
                !this.emojiBtn.contains(e.target) && 
                !this.emojiPicker.contains(e.target)) {
                this.emojiPicker.classList.remove('show');
            }
        });

        this.emojiPicker?.addEventListener('click', (e) => {
            if (e.target.classList.contains('emoji-btn')) {
                this.insertEmoji(e.target.textContent);
            }
        });

        // File upload
        this.fileBtn?.addEventListener('click', () => {
            this.fileInput?.click();
        });

        this.fileInput?.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                this.handleFileSelect(e.target.files[0]);
            }
        });

        // Theme toggle
        this.themeToggle?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Sound toggle
        this.soundToggle?.addEventListener('click', () => {
            this.toggleSound();
        });

        // Room selection
        document.querySelectorAll('.room-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchRoom(btn.dataset.room);
            });
        });

        // User search
        this.userSearch?.addEventListener('input', (e) => {
            this.filterUsers(e.target.value);
        });

        // Settings panel
        this.closeSettings?.addEventListener('click', () => {
            this.settingsPanel?.classList.remove('open');
        });

        // Settings toggles
        this.setupSettingsToggles();
    }

    setupSettingsToggles() {
        const toggles = {
            darkModeToggle: 'darkMode',
            soundToggleSettings: 'soundEffects',
            desktopNotifications: 'desktopNotifications',
            autoScroll: 'autoScroll',
            typingIndicators: 'typingIndicators'
        };

        Object.entries(toggles).forEach(([id, setting]) => {
            const toggle = document.getElementById(id);
            toggle?.addEventListener('click', () => {
                this.settings[setting] = !this.settings[setting];
                toggle.classList.toggle('active', this.settings[setting]);
                this.handleSettingChange(setting);
            });
        });
    }

    handleSettingChange(setting) {
        switch(setting) {
            case 'darkMode':
                document.documentElement.setAttribute('data-theme', this.settings.darkMode ? 'dark' : 'light');
                break;
            case 'desktopNotifications':
                if (this.settings.desktopNotifications) {
                    this.requestNotificationPermission();
                }
                break;
        }
        this.saveToStorage();
    }

    initializeSettings() {
        Object.entries(this.settings).forEach(([setting, value]) => {
            const toggle = document.getElementById(setting + 'Toggle') || 
                          document.getElementById(setting.replace(/([A-Z])/g, '$1').toLowerCase() + 'Toggle');
            toggle?.classList.toggle('active', value);
        });

        if (this.settings.darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    autoResize() {
        if (this.messageInput) {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        }
    }

    handleUsernameChange(username) {
        username = username.trim();
        if (username && username !== this.currentUser?.name) {
            this.currentUser = {
                id: this.generateId(),
                name: username,
                avatar: username.charAt(0).toUpperCase(),
                joinTime: Date.now()
            };
            this.users.set(this.currentUser.id, this.currentUser);
            this.saveToStorage();
            this.updateUsersList();
            this.showNotification(`Welcome, ${username}! 🎉`);
        }
    }

    handleTyping() {
        if (!this.currentUser || !this.settings.typingIndicators) return;
        
        // Clear existing timeout
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        
        // Set new timeout to stop typing indicator
        this.typingTimeout = setTimeout(() => {
            this.typingUsers.delete(this.currentUser.id);
        }, 1000);
    }

    sendMessage() {
        const content = this.messageInput?.value.trim() || '';
        if (!content && !this.selectedFile || !this.currentUser) return;

        const message = {
            id: this.generateId(),
            content: content,
            author: this.currentUser.name,
            authorId: this.currentUser.id,
            timestamp: Date.now(),
            isOwn: true,
            room: this.currentRoom,
            file: this.selectedFile ? {
                name: this.selectedFile.name,
                size: this.selectedFile.size,
                type: this.selectedFile.type
            } : null,
            reactions: {}
        };

        this.messages.push(message);
        this.renderMessage(message);
        
        // Store conversation context
        this.conversationContext.lastUserMessage = content;
        this.conversationContext.conversationHistory.push({
            author: this.currentUser.name,
            content: content,
            timestamp: Date.now()
        });
        
        // Keep only last 10 messages in history
        if (this.conversationContext.conversationHistory.length > 10) {
            this.conversationContext.conversationHistory = this.conversationContext.conversationHistory.slice(-10);
        }
        
        if (this.messageInput) {
            this.messageInput.value = '';
        }
        this.selectedFile = null;
        if (this.filePreview) {
            this.filePreview.style.display = 'none';
        }
        this.autoResize();
        this.saveToStorage();
        this.scrollToBottom();
        this.playSound('message');

        // Simulate responses with intelligent context
        setTimeout(() => this.simulateIntelligentResponse(content), 1000 + Math.random() * 2000);
    }

    simulateIntelligentResponse(userMessage) {
        const response = this.generateContextualResponse(userMessage);
        const selectedBot = this.selectAppropriateBot(userMessage);

        // Show typing indicator
        if (this.settings.typingIndicators) {
            this.showTypingIndicator(selectedBot.name);
        }

        setTimeout(() => {
            this.hideTypingIndicator();
            
            const message = {
                id: this.generateId(),
                content: response,
                author: selectedBot.name,
                authorId: this.generateId(),
                timestamp: Date.now(),
                isOwn: false,
                room: this.currentRoom,
                avatar: selectedBot.avatar,
                color: selectedBot.color,
                reactions: {}
            };

            this.messages.push(message);
            
            // Add to conversation context
            this.conversationContext.conversationHistory.push({
                author: selectedBot.name,
                content: response,
                timestamp: Date.now()
            });

            this.renderMessage(message);
            this.saveToStorage();
            this.scrollToBottom();
            this.playSound('notification');
            
            if (this.settings.desktopNotifications) {
                this.showDesktopNotification(`${selectedBot.name} replied`, response);
            }
        }, 1500 + Math.random() * 1000);
    }

    generateContextualResponse(userMessage) {
        const message = userMessage.toLowerCase().trim();
        const userName = this.currentUser?.name || 'there';
        
        // Greeting patterns
        if (this.matchesPattern(message, ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'])) {
            const greetings = [
                `Hello ${userName}! 👋 How are you doing today?`,
                `Hey there ${userName}! Great to see you here! 😊`,
                `Hi ${userName}! Welcome to the chat! How's your day going?`,
                `Greetings ${userName}! Hope you're having a wonderful day! ✨`,
                `Hello ${userName}! Nice to meet you! What brings you here today?`
            ];
            return this.getRandomItem(greetings);
        }

        // How are you patterns
        if (this.matchesPattern(message, ['how are you', 'how do you do', 'how are things', 'what\'s up', 'how\'s it going'])) {
            const responses = [
                "I'm doing great, thank you for asking! 😊 How about you? How has your day been?",
                "I'm fantastic! Thanks for checking in! 🌟 What about you - how are you feeling today?",
                "I'm doing well, thanks! 😄 It's always nice when someone asks. How are things with you?",
                "Pretty good, thank you! 🙂 I'm enjoying our conversation. How about yourself?",
                "I'm doing wonderful! Thanks for asking! 💫 What about you - how's your mood today?"
            ];
            return this.getRandomItem(responses);
        }

        // User expressing they're fine/good
        if (this.matchesPattern(message, ['i\'m fine', 'i\'m good', 'i\'m great', 'i\'m okay', 'i\'m well', 'doing well', 'doing good', 'not bad'])) {
            const responses = [
                "That's wonderful to hear! 😊 I'm glad you're doing well. What's been the highlight of your day?",
                "Great! I'm happy you're feeling good! ✨ Anything exciting happening in your life lately?",
                "Awesome! It's always nice to hear when someone is doing well! 🌟 What's keeping you busy these days?",
                "That's fantastic! 😄 Good vibes are contagious! What's been making you feel good?",
                "Nice! I love hearing positive updates! 🎉 Care to share what's going well for you?"
            ];
            return this.getRandomItem(responses);
        }

        // User expressing negative feelings
        if (this.matchesPattern(message, ['i\'m not good', 'i\'m sad', 'i\'m tired', 'i\'m stressed', 'having a bad day', 'not great', 'could be better'])) {
            const responses = [
                "I'm sorry to hear you're going through a tough time. 🤗 Sometimes it helps to talk about it. Want to share what's on your mind?",
                "That sounds challenging. 💙 Remember that it's okay to have difficult days. Is there anything that usually helps you feel better?",
                "I hear you, and I'm here to listen. 🌸 Bad days can be really hard. Would you like to talk about what's bothering you?",
                "I'm sorry you're feeling this way. 🤎 It's completely normal to have ups and downs. What do you usually do for self-care?",
                "Sending you some virtual support! 💕 Tough times don't last, but resilient people like you do. Want to chat about it?"
            ];
            return this.getRandomItem(responses);
        }

        // Gratitude expressions
        if (this.matchesPattern(message, ['thank you', 'thanks', 'appreciate', 'grateful'])) {
            const responses = [
                "You're very welcome! 😊 It's my pleasure to help and chat with you!",
                "No problem at all! 🌟 I'm happy I could be helpful. Anytime!",
                "You're so welcome! 💫 I really enjoy our conversations!",
                "My pleasure! 😄 Thanks for being so kind and thoughtful!",
                "Aww, you're too sweet! 🥰 I'm just glad I could help!"
            ];
            return this.getRandomItem(responses);
        }

        // Weather-related
        if (this.matchesPattern(message, ['weather', 'sunny', 'rainy', 'cold', 'hot', 'temperature'])) {
            const responses = [
                "Weather can definitely affect our mood! ☀️ Are you enjoying the current weather where you are?",
                "I love talking about weather! 🌤️ It's amazing how it can change our whole day, right?",
                "Weather is such an interesting topic! ⛅ Do you prefer sunny days or do you like variety?",
                "The weather can be so unpredictable! 🌦️ How do you usually spend your time when the weather is like this?",
                "Weather definitely plays a big role in our daily lives! 🌈 What's your favorite type of weather?"
            ];
            return this.getRandomItem(responses);
        }

        // Technology/coding related
        if (this.matchesPattern(message, ['code', 'programming', 'javascript', 'python', 'development', 'tech', 'computer', 'software'])) {
            const responses = [
                "Oh, a fellow tech enthusiast! 💻 What programming languages do you work with? I find technology fascinating!",
                "Technology is amazing, isn't it? 🚀 Are you working on any interesting projects lately?",
                "I love talking about tech! ⚡ The world of programming is constantly evolving. What's your favorite aspect of coding?",
                "Tech talk! 🔧 Are you a developer or just interested in technology? Either way, it's such an exciting field!",
                "Programming is like digital art! 🎨 What got you interested in technology?"
            ];
            return this.getRandomItem(responses);
        }

        // Time-related queries
        if (this.matchesPattern(message, ['what time', 'current time', 'time is it', 'date today', 'what day'])) {
            const now = new Date();
            const timeString = now.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            });
            return `It's currently ${timeString}! ⏰ Time flies when you're having good conversations, doesn't it?`;
        }

        // Work/job related
        if (this.matchesPattern(message, ['work', 'job', 'career', 'office', 'business', 'meeting'])) {
            const responses = [
                "Work life can be quite the journey! 💼 How are things going in your professional life?",
                "Ah, work talk! 📊 Do you enjoy what you do? I find it's so important to find meaning in our work.",
                "Career conversations are always interesting! 🎯 What field do you work in, if you don't mind me asking?",
                "Work-life balance is so important! ⚖️ How do you manage to keep things balanced?",
                "Professional life can be both challenging and rewarding! 🌟 What's been keeping you busy at work lately?"
            ];
            return this.getRandomItem(responses);
        }

        // Questions about the bot/AI
        if (this.matchesPattern(message, ['who are you', 'what are you', 'are you real', 'are you ai', 'are you human', 'bot'])) {
            const responses = [
                "I'm one of the friendly chatbots here in GitChat! 🤖 I love meeting new people and having conversations. Think of me as your digital friend!",
                "Great question! I'm an AI assistant designed to make conversations more engaging here! 💫 I may be digital, but my enthusiasm for chatting is totally real!",
                "I'm a conversational AI that lives in this chat! 🌟 While I'm not human, I do my best to be a good conversation partner. What would you like to chat about?",
                "I'm one of the AI personalities in this chat room! 🎭 I'm here to make conversations more interesting and engaging. Nice to meet you!",
                "Think of me as your AI chat buddy! 🤝 I'm designed to have natural conversations and learn from our interactions. What brings you to the chat today?"
            ];
            return this.getRandomItem(responses);
        }

        // Hobby/interest related
        if (this.matchesPattern(message, ['hobby', 'hobbies', 'interests', 'free time', 'fun', 'enjoy doing'])) {
            const responses = [
                "I love hearing about people's hobbies! 🎨 What do you enjoy doing in your free time? I find people's passions so fascinating!",
                "Hobbies are the best! 🌟 They really show what makes someone tick. What activities bring you joy?",
                "Free time activities are so important for well-being! 🌸 What helps you relax and recharge?",
                "I'm curious about what you're passionate about! 💫 Hobbies can tell you so much about a person. What are yours?",
                "Fun activities make life so much richer! 🎉 What do you love to do when you're not working?"
            ];
            return this.getRandomItem(responses);
        }

        // Food related
        if (this.matchesPattern(message, ['food', 'eat', 'hungry', 'cooking', 'recipe', 'meal', 'lunch', 'dinner', 'breakfast'])) {
            const responses = [
                "Food talk! 🍽️ I love hearing about people's culinary adventures. Do you enjoy cooking or do you prefer trying new restaurants?",
                "Mmm, food is such a universal language! 😋 What's your favorite type of cuisine? I find food brings people together!",
                "Food conversations always make me think about comfort and culture! 🥘 What's a dish that always makes you feel good?",
                "Nothing brings people together quite like food! 👨‍🍳 Are you someone who loves to cook or do you prefer being cooked for?",
                "Food is such an important part of life! 🌮 Do you have any signature dishes you love to make?"
            ];
            return this.getRandomItem(responses);
        }

        // Default contextual responses based on conversation history
        const recentMessages = this.conversationContext.conversationHistory.slice(-3);
        if (recentMessages.length > 0) {
            const contextualResponses = [
                `That's really interesting! Building on what we were just discussing, ${this.generateFollowUp(userMessage)}`,
                `I've been thinking about our conversation, and ${this.generateThoughtfulResponse(userMessage)}`,
                `You know, that reminds me of something ${this.generateConnection(userMessage)}`,
                `That's a great point! ${this.generateAgreement(userMessage)}`,
                `I appreciate you sharing that with me! ${this.generateEncouragement(userMessage)}`
            ];
            return this.getRandomItem(contextualResponses);
        }

        // Generic but engaging fallback responses
        const fallbackResponses = [
            "That's really interesting! Tell me more about that - I'd love to hear your thoughts! 🤔",
            "I find that fascinating! There's always so much to learn from different perspectives. What made you think of that?",
            "You've got me curious now! Can you elaborate on that? I enjoy learning new things from our conversations! 🌟",
            "That's a great point! I love how conversations can take unexpected turns. What's your take on it?",
            "Interesting perspective! I appreciate you sharing that with me. What else is on your mind today? 💭",
            "That sounds thoughtful! I enjoy when people share their ideas. What brought that to your attention?",
            "I love the direction this conversation is taking! Your insights are really valuable. What do you think about...?",
            "That's something worth discussing! I find these kinds of conversations really enriching. Care to dive deeper?"
        ];

        return this.getRandomItem(fallbackResponses);
    }

    matchesPattern(message, patterns) {
        return patterns.some(pattern => message.includes(pattern));
    }

    generateFollowUp(message) {
        const followUps = [
            "what aspects of that interest you most?",
            "I'd love to understand your perspective better!",
            "have you experienced something similar before?",
            "what got you thinking about that?",
            "that opens up so many interesting questions!"
        ];
        return this.getRandomItem(followUps);
    }

    generateThoughtfulResponse(message) {
        const responses = [
            "it really shows how complex and nuanced these topics can be.",
            "I'm learning so much from your perspective on this!",
            "there are so many layers to consider, aren't there?",
            "it's amazing how different experiences shape our views.",
            "you've given me a lot to think about!"
        ];
        return this.getRandomItem(responses);
    }

    generateConnection(message) {
        const connections = [
            "we talked about earlier - there might be a connection there!",
            "I read recently that relates to this topic.",
            "similar that happened to me in a conversation yesterday.",
            "you might find interesting given what you just shared.",
            "that connects to what you were saying before!"
        ];
        return this.getRandomItem(connections);
    }

    generateAgreement(message) {
        const agreements = [
            "I completely see where you're coming from on this!",
            "You've articulated that really well - I hadn't thought of it that way!",
            "That's such a thoughtful way to look at it!",
            "I think you're onto something important there!",
            "That resonates with me too - great insight!"
        ];
        return this.getRandomItem(agreements);
    }

    generateEncouragement(message) {
        const encouragements = [
            "Your thoughts on this are really valuable!",
            "I appreciate how openly you're sharing your experiences!",
            "It's refreshing to have such genuine conversations!",
            "Thank you for being so thoughtful in your responses!",
            "I'm enjoying getting to know your perspective!"
        ];
        return this.getRandomItem(encouragements);
    }

    selectAppropriateBot(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Select bot based on message content and their personalities
        let selectedBot = this.conversationContext.botPersonalities[0]; // default
        
        if (this.matchesPattern(message, ['sad', 'stressed', 'tired', 'difficult', 'hard', 'support'])) {
            selectedBot = this.conversationContext.botPersonalities.find(bot => bot.mood === 'supportive') || selectedBot;
        } else if (this.matchesPattern(message, ['code', 'tech', 'programming', 'computer'])) {
            selectedBot = this.conversationContext.botPersonalities.find(bot => bot.interests.includes('tech')) || selectedBot;
        } else if (this.matchesPattern(message, ['design', 'art', 'creative'])) {
            selectedBot = this.conversationContext.botPersonalities.find(bot => bot.interests.includes('art')) || selectedBot;
        } else if (this.matchesPattern(message, ['funny', 'joke', 'laugh', 'haha'])) {
            selectedBot = this.conversationContext.botPersonalities.find(bot => bot.mood === 'funny') || selectedBot;
        } else if (this.matchesPattern(message, ['help', 'question', 'how to'])) {
            selectedBot = this.conversationContext.botPersonalities.find(bot => bot.mood === 'helpful') || selectedBot;
        } else {
            // Random selection for variety
            selectedBot = this.getRandomItem(this.conversationContext.botPersonalities);
        }

        return {
            name: selectedBot.name,
            avatar: selectedBot.name.charAt(0),
            color: this.getBotColor(selectedBot.name)
        };
    }

    getBotColor(name) {
        const colors = {
            "Alex": "#10b981",
            "Jordan": "#8b5cf6", 
            "Sam": "#f59e0b",
            "Riley": "#ef4444",
            "Casey": "#06b6d4",
            "Morgan": "#f97316"
        };
        return colors[name] || "#6366f1";
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    renderMessage(message) {
        if (!this.messagesContainer) return;

        const messageEl = document.createElement('div');
        messageEl.className = `message ${message.isOwn ? 'own' : ''}`;
        messageEl.dataset.messageId = message.id;
        
        const time = new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        let fileContent = '';
        if (message.file) {
            const fileIcon = this.getFileIcon(message.file.type);
            fileContent = `
                <div class="message-file">
                    <div class="file-info">
                        <div class="file-icon">${fileIcon}</div>
                        <div>
                            <div style="font-weight: 500;">${message.file.name}</div>
                            <div style="font-size: 11px; opacity: 0.7;">${this.formatFileSize(message.file.size)}</div>
                        </div>
                    </div>
                </div>
            `;
        }

        let reactionsContent = '';
        if (message.reactions && Object.keys(message.reactions).length > 0) {
            reactionsContent = '<div class="message-reactions">';
            Object.entries(message.reactions).forEach(([emoji, users]) => {
                const isActive = this.currentUser && users.includes(this.currentUser.id);
                reactionsContent += `
                    <span class="reaction ${isActive ? 'active' : ''}" onclick="gitChat.toggleReaction('${message.id}', '${emoji}')">
                        ${emoji} ${users.length}
                    </span>
                `;
            });
            reactionsContent += '</div>';
        }

        messageEl.innerHTML = `
            <div class="message-content" oncontextmenu="gitChat.showMessageMenu(event, '${message.id}')">
                <div class="message-header">
                    <div class="message-avatar" style="background: ${message.color || '#6366f1'}">
                        ${message.isOwn ? (this.currentUser?.avatar || 'U') : (message.avatar || message.author.charAt(0).toUpperCase())}
                    </div>
                    <span class="message-author">${message.author}</span>
                    <span class="message-time">${time}</span>
                </div>
                ${message.content ? `<div class="message-text">${this.escapeHtml(message.content)}</div>` : ''}
                ${fileContent}
                ${reactionsContent}
            </div>
        `;

        // Remove welcome message if it exists
        const welcomeMsg = this.messagesContainer.querySelector('.welcome-message');
        if (welcomeMsg) {
            welcomeMsg.remove();
        }

        this.messagesContainer.appendChild(messageEl);
    }

    insertEmoji(emoji) {
        if (!this.messageInput) return;
        
        const start = this.messageInput.selectionStart;
        const end = this.messageInput.selectionEnd;
        const text = this.messageInput.value;
        this.messageInput.value = text.substring(0, start) + emoji + text.substring(end);
        this.messageInput.focus();
        this.messageInput.setSelectionRange(start + emoji.length, start + emoji.length);
        this.emojiPicker?.classList.remove('show');
    }

    handleFileSelect(file) {
        if (!file || !this.filePreview) return;
        
        this.selectedFile = file;
        this.filePreview.style.display = 'block';
        this.filePreview.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>📎 ${file.name} (${this.formatFileSize(file.size)})</span>
                <button onclick="this.parentElement.parentElement.style.display='none'; gitChat.selectedFile=null;" style="background: none; border: none; cursor: pointer;">✕</button>
            </div>
        `;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getFileIcon(fileType) {
        if (fileType.startsWith('image/')) return '🖼️';
        if (fileType.includes('pdf')) return '📄';
        if (fileType.includes('word') || fileType.includes('doc')) return '📝';
        if (fileType.includes('text')) return '📄';
        return '📎';
    }

    switchRoom(room) {
        document.querySelectorAll('.room-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const roomBtn = document.querySelector(`[data-room="${room}"]`);
        if (roomBtn) {
            roomBtn.classList.add('active');
        }
        
        this.currentRoom = room;
        if (this.messagesContainer) {
            this.messagesContainer.innerHTML = '';
            
            const welcomeMsg = document.createElement('div');
            welcomeMsg.className = 'welcome-message';
            welcomeMsg.innerHTML = `
                <h3>Welcome to ${room.charAt(0).toUpperCase() + room.slice(1)}! 🎉</h3>
                <p>You've switched to the ${room} room.</p>
            `;
            this.messagesContainer.appendChild(welcomeMsg);
        }
        
        this.playSound('notification');
        this.showNotification(`Switched to ${room} room`);
    }

    filterUsers(searchTerm) {
        const userItems = document.querySelectorAll('.user-item');
        userItems.forEach(item => {
            const userName = item.querySelector('.user-name')?.textContent.toLowerCase() || '';
            item.style.display = userName.includes(searchTerm.toLowerCase()) ? 'flex' : 'none';
        });
    }

    toggleTheme() {
        this.settings.darkMode = !this.settings.darkMode;
        document.documentElement.setAttribute('data-theme', this.settings.darkMode ? 'dark' : 'light');
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.classList.toggle('active', this.settings.darkMode);
        }
        this.saveToStorage();
    }

    toggleSound() {
        this.settings.soundEffects = !this.settings.soundEffects;
        if (this.soundToggle) {
            this.soundToggle.style.opacity = this.settings.soundEffects ? '1' : '0.5';
        }
        const soundToggleSettings = document.getElementById('soundToggleSettings');
        if (soundToggleSettings) {
            soundToggleSettings.classList.toggle('active', this.settings.soundEffects);
        }
        this.saveToStorage();
        this.showNotification(this.settings.soundEffects ? 'Sound enabled' : 'Sound disabled');
    }

    playSound(type) {
        if (!this.settings.soundEffects) return;
        
        try {
            // Create or reuse audio context
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Different frequencies for different sounds
            const frequencies = {
                message: 800,
                notification: 1000,
                connect: 600,
                error: 300
            };
            
            oscillator.frequency.setValueAtTime(frequencies[type] || 800, this.audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        } catch (error) {
            console.warn('Audio playback failed:', error);
        }
    }

    showDesktopNotification(title, message) {
        if (!this.settings.desktopNotifications || !('Notification' in window)) return;
        
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%236366f1"/></svg>'
            });
        }
    }

    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission !== 'granted') {
                    this.settings.desktopNotifications = false;
                    const desktopNotifications = document.getElementById('desktopNotifications');
                    if (desktopNotifications) {
                        desktopNotifications.classList.remove('active');
                    }
                }
            });
        }
    }

    showTypingIndicator(username) {
        if (!this.messagesContainer) return;
        
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <span>${username} is typing</span>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        this.messagesContainer.appendChild(indicator);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    toggleReaction(messageId, emoji) {
        const message = this.messages.find(m => m.id === messageId);
        if (!message || !this.currentUser) return;

        if (!message.reactions[emoji]) {
            message.reactions[emoji] = [];
        }

        const userIndex = message.reactions[emoji].indexOf(this.currentUser.id);
        if (userIndex > -1) {
            message.reactions[emoji].splice(userIndex, 1);
            if (message.reactions[emoji].length === 0) {
                delete message.reactions[emoji];
            }
        } else {
            message.reactions[emoji].push(this.currentUser.id);
        }

        this.saveToStorage();
        this.rerenderMessage(messageId);
        this.playSound('notification');
    }

    showMessageMenu(event, messageId) {
        event.preventDefault();
        
        // Simple reaction menu - in a full app this would be a context menu
        const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        this.toggleReaction(messageId, randomReaction);
    }

    rerenderMessage(messageId) {
        const messageEl = document.querySelector(`[data-message-id="${messageId}"]`);
        const message = this.messages.find(m => m.id === messageId);
        if (messageEl && message) {
            // Create temporary container
            const tempContainer = document.createElement('div');
            const tempMessage = { ...message };
            
            // Temporarily set messagesContainer to temp container
            const originalContainer = this.messagesContainer;
            this.messagesContainer = tempContainer;
            this.renderMessage(tempMessage);
            this.messagesContainer = originalContainer;
            
            // Replace the old message with the new one
            if (tempContainer.firstChild) {
                messageEl.replaceWith(tempContainer.firstChild);
            }
        }
    }

    showNotification(message) {
        if (!this.notification) return;
        
        this.notification.textContent = message;
        this.notification.classList.add('show');
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 3000);
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    simulateOnlineUsers() {
        const simulatedUsers = [
            { name: "Alex Chen", avatar: "A", status: "Online" },
            { name: "Jordan Smith", avatar: "J", status: "Away" },
            { name: "Sam Wilson", avatar: "S", status: "Online" },
        ];

        simulatedUsers.forEach(user => {
            const userId = this.generateId();
            this.users.set(userId, {
                id: userId,
                name: user.name,
                avatar: user.avatar,
                status: user.status,
                joinTime: Date.now() - Math.random() * 3600000
            });
        });

        this.updateUsersList();
    }

    updateUsersList() {
        if (!this.usersList || !this.userCount) return;
        
        this.usersList.innerHTML = '';
        this.userCount.textContent = this.users.size.toString();

        this.users.forEach(user => {
            const userEl = document.createElement('div');
            userEl.className = 'user-item';
            userEl.innerHTML = `
                <div class="user-avatar">${user.avatar}</div>
                <div class="user-info">
                    <div class="user-name">${user.name}</div>
                    <div class="user-status">${user.status || 'Online'}</div>
                </div>
            `;
            this.usersList.appendChild(userEl);
        });
    }

    scrollToBottom() {
        if (this.settings.autoScroll && this.messagesContainer) {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }

    saveToStorage() {
        try {
            const data = {
                currentUser: this.currentUser,
                messages: this.messages.slice(-100), // Keep last 100 messages
                users: Array.from(this.users.entries()),
                settings: this.settings,
                currentRoom: this.currentRoom,
                conversationContext: this.conversationContext
            };
            localStorage.setItem('gitchat-data', JSON.stringify(data));
        } catch (error) {
            console.warn('Failed to save data to localStorage:', error);
        }
    }

    loadFromStorage() {
        try {
            const data = JSON.parse(localStorage.getItem('gitchat-data') || '{}');
            
            if (data.currentUser) {
                this.currentUser = data.currentUser;
                if (this.usernameInput) {
                    this.usernameInput.value = this.currentUser.name;
                }
            }
            
            if (data.messages) {
                this.messages = data.messages;
                this.messages
                    .filter(msg => msg.room === this.currentRoom)
                    .forEach(msg => this.renderMessage(msg));
                this.scrollToBottom();
            }
            
            if (data.users) {
                this.users = new Map(data.users);
            }

            if (data.settings) {
                this.settings = { ...this.settings, ...data.settings };
            }

            if (data.conversationContext) {
                this.conversationContext = { ...this.conversationContext, ...data.conversationContext };
            }

            if (data.currentRoom) {
                this.currentRoom = data.currentRoom;
                this.switchRoom(this.currentRoom);
            }
        } catch (error) {
            console.warn('Failed to load saved data:', error);
        }
    }

    // Cleanup method
    destroy() {
        // Clear timeouts
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        
        // Close audio context
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        // Remove global reference
        if (window.gitChat === this) {
            delete window.gitChat;
        }
    }
}

// Initialize the chat application
document.addEventListener('DOMContentLoaded', () => {
    new GitChat();
});
