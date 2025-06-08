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

        // Simulate responses
        setTimeout(() => this.simulateResponse(content), 1000 + Math.random() * 2000);
    }

    simulateResponse(originalMessage) {
        const responses = [
            "That's interesting! Tell me more about that.",
            "I completely agree with your point.",
            "Thanks for sharing that insight!",
            "Great question! I've been thinking about that too.",
            "Nice! Have you tried exploring that further?",
            "I had a similar experience recently.",
            "That's a really good point to consider.",
            "Thanks for bringing that up in the discussion.",
            "Wow, that's fascinating! 🤔",
            "I never thought about it that way before.",
            "Could you elaborate on that?",
            "That reminds me of something I read recently.",
        ];

        const botUsers = [
            { name: "Alex", avatar: "A", color: "#10b981" },
            { name: "Jordan", avatar: "J", color: "#8b5cf6" },
            { name: "Sam", avatar: "S", color: "#f59e0b" },
            { name: "Riley", avatar: "R", color: "#ef4444" },
            { name: "Casey", avatar: "C", color: "#06b6d4" },
            { name: "Morgan", avatar: "M", color: "#f97316" },
        ];

        const randomBot = botUsers[Math.floor(Math.random() * botUsers.length)];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        // Show typing indicator
        if (this.settings.typingIndicators) {
            this.showTypingIndicator(randomBot.name);
        }

        setTimeout(() => {
            this.hideTypingIndicator();
            
            const message = {
                id: this.generateId(),
                content: randomResponse,
                author: randomBot.name,
                authorId: this.generateId(),
                timestamp: Date.now(),
                isOwn: false,
                room: this.currentRoom,
                avatar: randomBot.avatar,
                color: randomBot.color,
                reactions: {}
            };

            this.messages.push(message);
            this.renderMessage(message);
            this.saveToStorage();
            this.scrollToBottom();
            this.playSound('notification');
            
            if (this.settings.desktopNotifications) {
                this.showDesktopNotification(`${randomBot.name} replied`, randomResponse);
            }
        }, 1500 + Math.random() * 1000);
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
                currentRoom: this.currentRoom
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
