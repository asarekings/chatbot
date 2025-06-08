class GitChat {
    constructor() {
        // Initialize properties
        this.users = new Map();
        this.messages = [];
        this.currentUser = null;
        this.currentRoom = 'support';
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
        
        // Customer support context
        this.supportContext = {
            ticketNumber: null,
            issueCategory: null,
            priority: 'normal',
            status: 'new',
            customerInfo: null,
            conversationHistory: [],
            supportAgents: [
                { 
                    name: "Sarah", 
                    department: "technical", 
                    specialties: ["billing", "account", "login", "password"],
                    shift: "morning"
                },
                { 
                    name: "Mike", 
                    department: "technical", 
                    specialties: ["bug", "error", "crash", "performance", "feature"],
                    shift: "afternoon"
                },
                { 
                    name: "Emma", 
                    department: "sales", 
                    specialties: ["pricing", "plan", "upgrade", "subscription"],
                    shift: "evening"
                },
                { 
                    name: "Alex", 
                    department: "general", 
                    specialties: ["question", "help", "how to", "guide"],
                    shift: "24/7"
                }
            ],
            knowledgeBase: {
                billing: {
                    "payment failed": "I can help you resolve payment issues. Please check if your card details are correct and has sufficient funds. You can update your payment method in Account Settings > Billing.",
                    "refund": "Refund requests are processed within 5-7 business days. I can initiate a refund request for you. May I have your order number?",
                    "invoice": "You can download your invoices from Account Settings > Billing History. Would you like me to email you a copy?"
                },
                technical: {
                    "login": "If you're having trouble logging in, try: 1) Reset your password, 2) Clear browser cache, 3) Try incognito mode. Are you getting any specific error messages?",
                    "password": "To reset your password: 1) Go to login page, 2) Click 'Forgot Password', 3) Check your email for reset link. The link expires in 24 hours.",
                    "bug": "I'm sorry you're experiencing issues. To help me assist you better, could you please describe: 1) What you were trying to do, 2) What happened instead, 3) Your browser/device info?"
                },
                account: {
                    "delete": "I can help you delete your account. Please note this action is permanent and will remove all your data. Are you sure you want to proceed?",
                    "settings": "You can manage your account settings by going to Profile > Account Settings. What specific setting would you like to change?",
                    "data": "We take data privacy seriously. You can export your data or request deletion under GDPR. Which option would you prefer?"
                },
                general: {
                    "hours": "Our customer support is available 24/7 through this chat. For phone support, we're available Monday-Friday 9AM-6PM EST.",
                    "contact": "You can reach us through: 1) This live chat (24/7), 2) Email: support@gitchat.com, 3) Phone: +1-800-GITCHAT (Mon-Fri 9AM-6PM EST)"
                }
            }
        };
        
        // Initialize the app
        this.initializeElements();
        this.setupEventListeners();
        this.loadFromStorage();
        this.initializeSupportChat();
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
            this.handleCustomerInfo(e.target.value);
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

    initializeSupportChat() {
        // Generate ticket number
        this.supportContext.ticketNumber = 'GC-' + Date.now().toString().slice(-6);
        
        // Show initial support message
        this.showWelcomeMessage();
        
        // Initialize support agents as "online users"
        this.supportContext.supportAgents.forEach(agent => {
            const agentId = this.generateId();
            this.users.set(agentId, {
                id: agentId,
                name: agent.name,
                avatar: agent.name.charAt(0),
                status: agent.shift === '24/7' ? 'Online' : this.getAgentStatus(agent.shift),
                department: agent.department,
                joinTime: Date.now() - Math.random() * 3600000
            });
        });
        
        this.updateUsersList();
    }

    getAgentStatus(shift) {
        const hour = new Date().getUTCHours();
        const shifts = {
            'morning': { start: 6, end: 14 },
            'afternoon': { start: 14, end: 22 },
            'evening': { start: 22, end: 6 }
        };
        
        const currentShift = shifts[shift];
        if (!currentShift) return 'Online';
        
        const isOnline = (currentShift.start <= currentShift.end) 
            ? (hour >= currentShift.start && hour < currentShift.end)
            : (hour >= currentShift.start || hour < currentShift.end);
            
        return isOnline ? 'Online' : 'Away';
    }

    showWelcomeMessage() {
        if (!this.messagesContainer) return;
        
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'welcome-message';
        welcomeMsg.innerHTML = `
            <h3>👋 Welcome to GitChat Customer Support</h3>
            <p><strong>Ticket #${this.supportContext.ticketNumber}</strong></p>
            <p>How can we help you today? Our support team is here to assist you!</p>
            <div style="margin-top: 15px; padding: 10px; background: rgba(99, 102, 241, 0.1); border-radius: 8px; font-size: 14px;">
                <strong>Quick Help Topics:</strong><br>
                • Account & Login Issues<br>
                • Billing & Payment Questions<br>
                • Technical Problems<br>
                • Feature Requests<br>
                • General Questions
            </div>
        `;
        this.messagesContainer.appendChild(welcomeMsg);
    }

    autoResize() {
        if (this.messageInput) {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        }
    }

    handleCustomerInfo(info) {
        info = info.trim();
        if (info && info !== this.supportContext.customerInfo) {
            this.supportContext.customerInfo = info;
            this.currentUser = {
                id: this.generateId(),
                name: info,
                avatar: info.charAt(0).toUpperCase(),
                joinTime: Date.now()
            };
            this.saveToStorage();
            this.showNotification(`Hello ${info}! Support ticket ${this.supportContext.ticketNumber} created`);
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
            ticketNumber: this.supportContext.ticketNumber,
            file: this.selectedFile ? {
                name: this.selectedFile.name,
                size: this.selectedFile.size,
                type: this.selectedFile.type
            } : null,
            reactions: {}
        };

        this.messages.push(message);
        this.renderMessage(message);
        
        // Store support context
        this.supportContext.conversationHistory.push({
            author: this.currentUser.name,
            content: content,
            timestamp: Date.now(),
            type: 'customer'
        });
        
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

        // Simulate support response
        setTimeout(() => this.generateSupportResponse(content), 1500 + Math.random() * 2000);
    }

    generateSupportResponse(customerMessage) {
        const message = customerMessage.toLowerCase().trim();
        const response = this.getSupportResponse(message);
        const selectedAgent = this.selectSupportAgent(message);

        // Show typing indicator
        if (this.settings.typingIndicators) {
            this.showTypingIndicator(selectedAgent.name);
        }

        setTimeout(() => {
            this.hideTypingIndicator();
            
            const supportMessage = {
                id: this.generateId(),
                content: response,
                author: selectedAgent.name,
                authorId: this.generateId(),
                timestamp: Date.now(),
                isOwn: false,
                room: this.currentRoom,
                avatar: selectedAgent.avatar,
                color: selectedAgent.color,
                department: selectedAgent.department,
                ticketNumber: this.supportContext.ticketNumber,
                reactions: {}
            };

            this.messages.push(supportMessage);
            
            // Add to conversation context
            this.supportContext.conversationHistory.push({
                author: selectedAgent.name,
                content: response,
                timestamp: Date.now(),
                type: 'agent',
                department: selectedAgent.department
            });

            this.renderMessage(supportMessage);
            this.saveToStorage();
            this.scrollToBottom();
            this.playSound('notification');
            
            if (this.settings.desktopNotifications) {
                this.showDesktopNotification(`${selectedAgent.name} (Support)`, response);
            }
        }, 1000 + Math.random() * 1500);
    }

    getSupportResponse(message) {
        const customerName = this.supportContext.customerInfo || 'there';
        const ticketNumber = this.supportContext.ticketNumber;
        
        // Greeting responses
        if (this.matchesPattern(message, ['hello', 'hi', 'hey', 'help'])) {
            return `Hello ${customerName}! I'm here to help you with ticket ${ticketNumber}. What can I assist you with today?`;
        }

        // Billing issues
        if (this.matchesPattern(message, ['payment', 'billing', 'charge', 'card', 'invoice', 'refund'])) {
            this.supportContext.issueCategory = 'billing';
            if (this.matchesPattern(message, ['failed', 'declined', 'error'])) {
                return this.supportContext.knowledgeBase.billing["payment failed"];
            } else if (this.matchesPattern(message, ['refund', 'money back'])) {
                return this.supportContext.knowledgeBase.billing["refund"];
            } else if (this.matchesPattern(message, ['invoice', 'receipt'])) {
                return this.supportContext.knowledgeBase.billing["invoice"];
            } else {
                return `I can help you with billing issues. I see this involves payment/billing for ticket ${ticketNumber}. Could you please provide more details about the specific issue you're experiencing?`;
            }
        }

        // Login/Password issues
        if (this.matchesPattern(message, ['login', 'password', 'access', 'sign in', 'authenticate'])) {
            this.supportContext.issueCategory = 'technical';
            if (this.matchesPattern(message, ['forgot', 'reset', 'change'])) {
                return this.supportContext.knowledgeBase.technical["password"];
            } else {
                return this.supportContext.knowledgeBase.technical["login"];
            }
        }

        // Technical issues
        if (this.matchesPattern(message, ['bug', 'error', 'crash', 'broken', 'not working', 'issue', 'problem'])) {
            this.supportContext.issueCategory = 'technical';
            this.supportContext.priority = 'high';
            return this.supportContext.knowledgeBase.technical["bug"];
        }

        // Account management
        if (this.matchesPattern(message, ['account', 'profile', 'delete', 'settings', 'data', 'privacy'])) {
            this.supportContext.issueCategory = 'account';
            if (this.matchesPattern(message, ['delete', 'close', 'remove'])) {
                return this.supportContext.knowledgeBase.account["delete"];
            } else if (this.matchesPattern(message, ['settings', 'change', 'update'])) {
                return this.supportContext.knowledgeBase.account["settings"];
            } else if (this.matchesPattern(message, ['data', 'privacy', 'gdpr'])) {
                return this.supportContext.knowledgeBase.account["data"];
            }
        }

        // Pricing/Sales
        if (this.matchesPattern(message, ['price', 'plan', 'upgrade', 'subscription', 'cost', 'pricing'])) {
            this.supportContext.issueCategory = 'sales';
            return `I'd be happy to help you with pricing and plans for ticket ${ticketNumber}. We offer several subscription tiers:\n\n• **Basic Plan** - $9/month\n• **Pro Plan** - $19/month\n• **Enterprise** - Custom pricing\n\nWhich plan are you interested in learning more about?`;
        }

        // Contact information
        if (this.matchesPattern(message, ['contact', 'phone', 'email', 'hours'])) {
            if (this.matchesPattern(message, ['hours', 'time', 'available'])) {
                return this.supportContext.knowledgeBase.general["hours"];
            } else {
                return this.supportContext.knowledgeBase.general["contact"];
            }
        }

        // Status check
        if (this.matchesPattern(message, ['status', 'update', 'progress', 'ticket'])) {
            return `Your ticket ${ticketNumber} is currently ${this.supportContext.status}. Priority: ${this.supportContext.priority}. I'm actively working on resolving your issue. Is there anything specific you'd like to know about the status?`;
        }

        // Appreciation/Thanks
        if (this.matchesPattern(message, ['thank', 'thanks', 'appreciate'])) {
            return `You're very welcome, ${customerName}! I'm glad I could help with ticket ${ticketNumber}. Is there anything else I can assist you with today?`;
        }

        // Escalation requests
        if (this.matchesPattern(message, ['manager', 'supervisor', 'escalate', 'speak to'])) {
            return `I understand you'd like to speak with a supervisor regarding ticket ${ticketNumber}. I'm escalating this to my manager who will contact you within 30 minutes. In the meantime, is there anything else I can help clarify?`;
        }

        // Default support response
        const supportResponses = [
            `I understand your concern regarding ticket ${ticketNumber}. Could you please provide more details so I can better assist you?`,
            `Thank you for contacting support about ticket ${ticketNumber}. Let me help you resolve this issue. Can you tell me more about what you're experiencing?`,
            `I'm here to help with ticket ${ticketNumber}. To provide the best assistance, could you please describe the issue in more detail?`,
            `I want to make sure I fully understand your issue with ticket ${ticketNumber}. Could you provide any additional context or error messages you're seeing?`,
            `Let me help you resolve this issue for ticket ${ticketNumber}. What specific steps led to this problem, and what outcome are you hoping to achieve?`
        ];

        return this.getRandomItem(supportResponses);
    }

    selectSupportAgent(message) {
        // Select agent based on issue type and availability
        let availableAgents = this.supportContext.supportAgents.filter(agent => {
            const user = Array.from(this.users.values()).find(u => u.name === agent.name);
            return user && user.status === 'Online';
        });

        if (availableAgents.length === 0) {
            availableAgents = this.supportContext.supportAgents;
        }

        let selectedAgent = availableAgents[0]; // default

        // Match agent expertise to issue
        if (this.matchesPattern(message, ['payment', 'billing', 'refund', 'invoice'])) {
            selectedAgent = availableAgents.find(agent => agent.specialties.some(s => ['billing', 'account'].includes(s))) || selectedAgent;
        } else if (this.matchesPattern(message, ['bug', 'error', 'crash', 'technical'])) {
            selectedAgent = availableAgents.find(agent => agent.specialties.some(s => ['bug', 'error', 'crash'].includes(s))) || selectedAgent;
        } else if (this.matchesPattern(message, ['login', 'password', 'account'])) {
            selectedAgent = availableAgents.find(agent => agent.specialties.some(s => ['login', 'password', 'account'].includes(s))) || selectedAgent;
        } else if (this.matchesPattern(message, ['price', 'plan', 'upgrade'])) {
            selectedAgent = availableAgents.find(agent => agent.department === 'sales') || selectedAgent;
        }

        return {
            name: selectedAgent.name,
            avatar: selectedAgent.name.charAt(0),
            color: this.getAgentColor(selectedAgent.department),
            department: selectedAgent.department
        };
    }

    getAgentColor(department) {
        const colors = {
            "technical": "#ef4444",
            "sales": "#10b981",
            "general": "#6366f1",
            "billing": "#f59e0b"
        };
        return colors[department] || "#6366f1";
    }

    matchesPattern(message, patterns) {
        return patterns.some(pattern => message.includes(pattern));
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

        let departmentBadge = '';
        if (message.department && !message.isOwn) {
            departmentBadge = `<span class="department-badge" style="background: ${this.getAgentColor(message.department)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin-left: 5px;">${message.department.toUpperCase()}</span>`;
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
                    <span class="message-author">${message.author}${departmentBadge}</span>
                    <span class="message-time">${time}</span>
                </div>
                ${message.content ? `<div class="message-text">${this.escapeHtml(message.content)}</div>` : ''}
                ${fileContent}
                ${reactionsContent}
            </div>
        `;

        // Remove welcome message if it exists
        const welcomeMsg = this.messagesContainer.querySelector('.welcome-message');
        if (welcomeMsg && this.messages.length > 0) {
            welcomeMsg.remove();
        }

        this.messagesContainer.appendChild(messageEl);
    }

    handleFileSelect(file) {
        if (!file || !this.filePreview) return;
        
        this.selectedFile = file;
        this.filePreview.style.display = 'block';
        this.filePreview.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>📎 ${file.name} (${this.formatFileSize(file.size)}) - Attachment for ticket ${this.supportContext.ticketNumber}</span>
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
            <span>${username} (Support) is typing</span>
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
        
        // Simple reaction menu
        const reactions = ['👍', '❤️', '😊', '🙏', '✅'];
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

    updateUsersList() {
        if (!this.usersList || !this.userCount) return;
        
        this.usersList.innerHTML = '';
        this.userCount.textContent = this.users.size.toString();

        this.users.forEach(user => {
            const userEl = document.createElement('div');
            userEl.className = 'user-item';
            const departmentIcon = user.department ? this.getDepartmentIcon(user.department) : '👤';
            userEl.innerHTML = `
                <div class="user-avatar">${user.avatar}</div>
                <div class="user-info">
                    <div class="user-name">${departmentIcon} ${user.name}</div>
                    <div class="user-status">${user.status || 'Online'}</div>
                </div>
            `;
            this.usersList.appendChild(userEl);
        });
    }

    getDepartmentIcon(department) {
        const icons = {
            'technical': '🔧',
            'sales': '💼',
            'billing': '💳',
            'general': '🎧'
        };
        return icons[department] || '👤';
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
                messages: this.messages.slice(-100),
                users: Array.from(this.users.entries()),
                settings: this.settings,
                currentRoom: this.currentRoom,
                supportContext: this.supportContext
            };
            localStorage.setItem('gitchat-support-data', JSON.stringify(data));
        } catch (error) {
            console.warn('Failed to save data to localStorage:', error);
        }
    }

    loadFromStorage() {
        try {
            const data = JSON.parse(localStorage.getItem('gitchat-support-data') || '{}');
            
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

            if (data.supportContext) {
                this.supportContext = { ...this.supportContext, ...data.supportContext };
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
