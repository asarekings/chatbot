class NexaShopSupport {
    constructor() {
        // Current time as provided: 2025-06-08 11:25:12 UTC
        this.currentDateTime = new Date('2025-06-08T11:25:12Z');
        
        this.currentUser = {
            id: 'user-asarekings',
            name: 'asarekings',
            email: 'asarekings@nexashop.com',
            avatar: 'A',
            loginTime: this.currentDateTime,
            preferences: {
                language: 'en',
                notifications: true,
                theme: 'light'
            }
        };
        
        this.messages = [];
        this.typingTimeout = null;
        this.selectedFile = null;
        
        this.settings = {
            darkMode: false,
            soundEffects: true,
            typingIndicators: true,
            autoScroll: true,
            voiceEnabled: false,
            desktopNotifications: false
        };
        
        this.ticketNumber = 'NEX-2025-0608-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        console.log('🚀 Initializing NexaShop Support System...');
        console.log('📅 Current Time: 2025-06-08 11:25:12 UTC');
        console.log('👤 User: asarekings logged in');
        
        this.initializeAdvancedFeatures();
        this.init();
    }

    initializeAdvancedFeatures() {
        this.addLiveInventory();
        this.addOrderManagement();
        this.addMultiLanguageSupport();
        this.addPerformanceMonitoring();
        this.addSecurityFeatures();
        this.addAnalytics();
    }

    addLiveInventory() {
        this.inventory = {
            "nexaphone-pro": { 
                stock: 247, 
                warehouse: "East Coast DC", 
                trending: true
            },
            "nexabook-ultra": { 
                stock: 89, 
                warehouse: "West Coast DC", 
                trending: false
            },
            "nexapods-max": { 
                stock: 156, 
                warehouse: "Central DC", 
                trending: true
            }
        };
        
        console.log('📦 Live inventory system activated');
    }

    addOrderManagement() {
        this.orderManager = {
            orders: [
                {
                    id: "NEX-2025-001247",
                    status: "delivered",
                    items: ["NexaPhone Pro Max"],
                    total: 1099.99,
                    orderDate: "2025-06-01T14:30:00Z",
                    trackingNumber: "NEX1234567890",
                    deliveryProgress: 100
                },
                {
                    id: "NEX-2025-001248",
                    status: "in_transit",
                    items: ["NexaBook Ultra 16"],
                    total: 1599.99,
                    orderDate: "2025-06-05T09:15:00Z",
                    trackingNumber: "NEX1234567891",
                    deliveryProgress: 75
                }
            ]
        };
        
        console.log('🚚 Order management activated');
    }

    addMultiLanguageSupport() {
        this.languages = {
            en: {
                greeting: "Welcome to NexaShop Support!",
                orderStatus: "Order Status",
                tracking: "Package Tracking",
                products: "Our Products",
                billing: "Billing & Payments",
                returns: "Returns & Exchanges",
                technical: "Technical Support",
                typing: "is typing...",
                howCanHelp: "How can I help you today?"
            }
        };
        
        this.currentLanguage = 'en';
        console.log('🌍 Multi-language support activated');
    }

    addPerformanceMonitoring() {
        this.performance = {
            responseTime: [],
            messagesSent: 0,
            messagesReceived: 0,
            sessionStart: this.currentDateTime,
            
            trackResponseTime: (startTime) => {
                const endTime = Date.now();
                const duration = endTime - startTime;
                this.performance.responseTime.push(duration);
                
                if (this.performance.responseTime.length > 20) {
                    this.performance.responseTime.shift();
                }
            },
            
            getAverageResponseTime: () => {
                const times = this.performance.responseTime;
                if (times.length === 0) return 0;
                return Math.round(times.reduce((a, b) => a + b, 0) / times.length);
            }
        };
        
        console.log('📊 Performance monitoring activated');
    }

    addSecurityFeatures() {
        this.security = {
            validateInput: (input) => {
                const dangerous = /<script|javascript:|data:/i;
                return !dangerous.test(input);
            },
            
            sanitizeInput: (input) => {
                return input.replace(/[<>]/g, '').trim();
            },
            
            rateLimiting: {
                maxMessages: 100,
                messageCount: 0,
                checkLimit: () => true
            }
        };
        
        console.log('🛡️ Security features activated');
    }

    addAnalytics() {
        this.analytics = {
            interactionCount: 0,
            trackInteraction: (action, category, data = {}) => {
                this.analytics.interactionCount++;
                console.log('📈 Interaction tracked:', { action, category, data });
            }
        };
        
        console.log('📊 Analytics system activated');
    }

    translate(key) {
        return this.languages[this.currentLanguage]?.[key] || key;
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.showWelcomeMessage();
        
        // Set global reference
        window.nexaShopSupport = this;
        
        console.log('✅ NexaShop Support System initialized successfully');
        this.showNotification('🚀 Welcome to NexaShop Support!');
    }

    setupElements() {
        this.messageInput = document.getElementById('messageInput');
        this.messageForm = document.getElementById('messageForm');
        this.messagesContainer = document.getElementById('messagesContainer');
        this.notification = document.getElementById('notification');
        this.fileInput = document.getElementById('fileInput');
        this.fileBtn = document.getElementById('fileBtn');
        this.filePreview = document.getElementById('filePreview');
        this.themeToggle = document.getElementById('themeToggle');
        this.soundToggle = document.getElementById('soundToggle');
        
        console.log('✅ DOM elements connected');
    }

    setupEventListeners() {
        if (this.messageForm) {
            this.messageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }

        if (this.messageInput) {
            this.messageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            this.messageInput.addEventListener('input', () => {
                this.autoResize();
            });
        }

        if (this.fileBtn) {
            this.fileBtn.addEventListener('click', () => {
                this.fileInput?.click();
            });
        }

        if (this.fileInput) {
            this.fileInput.addEventListener('change', (e) => {
                if (e.target.files[0]) {
                    this.handleFileSelect(e.target.files[0]);
                }
            });
        }

        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        if (this.soundToggle) {
            this.soundToggle.addEventListener('click', () => {
                this.toggleSound();
            });
        }

        console.log('✅ Event listeners configured');
    }

    showWelcomeMessage() {
        if (!this.messagesContainer) return;
        
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'welcome-message';
        welcomeMsg.innerHTML = `
            <div class="welcome-header">
                <h3>🛍️ ${this.translate('greeting')}</h3>
                <div style="margin: 16px 0; padding: 16px; background: rgba(59, 130, 246, 0.05); border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.1);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Support Ticket:</span>
                        <span style="font-weight: 600;">${this.ticketNumber}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Current Time:</span>
                        <span style="font-weight: 600;">2025-06-08 11:25:12 UTC</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280; font-weight: 500;">Customer:</span>
                        <span style="font-weight: 600;">asarekings (Premium Member 🌟)</span>
                    </div>
                </div>
                <p style="margin-bottom: 20px;">Hi asarekings! ${this.translate('howCanHelp')}</p>
            </div>
            
            <div style="margin: 20px 0;">
                <h4>🚀 Quick Actions:</h4>
                <div class="action-grid">
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I need to check my order status')">
                        <span style="font-size: 20px;">📦</span>
                        Check Order Status
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I need to track my shipment')">
                        <span style="font-size: 20px;">🚚</span>
                        Track Package
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I want to return an item')">
                        <span style="font-size: 20px;">↩️</span>
                        Return & Exchange
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I need product information')">
                        <span style="font-size: 20px;">💡</span>
                        Product Questions
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I have a billing question')">
                        <span style="font-size: 20px;">💳</span>
                        Billing Support
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I need technical assistance')">
                        <span style="font-size: 20px;">🔧</span>
                        Technical Help
                    </button>
                </div>
            </div>

            <div style="margin: 20px 0;">
                <h4>📊 Live System Status:</h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 12px;">
                    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; text-align: center;">
                        <div style="font-size: 24px; font-weight: 700; color: #3b82f6; margin-bottom: 4px;">${Object.values(this.inventory).reduce((sum, item) => sum + item.stock, 0)}</div>
                        <div style="font-size: 12px; color: #6b7280; font-weight: 500;">Items in Stock</div>
                    </div>
                    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; text-align: center;">
                        <div style="font-size: 24px; font-weight: 700; color: #3b82f6; margin-bottom: 4px;">${this.orderManager.orders.filter(o => o.status === 'in_transit').length}</div>
                        <div style="font-size: 12px; color: #6b7280; font-weight: 500;">Orders Shipping</div>
                    </div>
                </div>
            </div>

            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                <p><strong>🕒 Support Available:</strong> 24/7 Live Chat | Phone: Daily 6AM-12AM EST</p>
                <p><strong>📧 Email:</strong> support@nexashop.com | <strong>📱 App:</strong> Download NexaShop mobile app</p>
                <p><strong>🎯 Premium Support:</strong> Priority assistance • Advanced features • Dedicated specialists</p>
            </div>
        `;
        this.messagesContainer.appendChild(welcomeMsg);
        
        this.analytics.trackInteraction('welcome_displayed', 'general');
    }

    quickMessage(message) {
        this.analytics.trackInteraction('quick_action_click', 'ui', { message });
        if (this.messageInput) {
            this.messageInput.value = message;
            this.sendMessage();
        }
    }

    sendMessage() {
        if (!this.messageInput) return;

        const content = this.messageInput.value.trim();
        if (!content) return;

        if (!this.security.validateInput(content)) {
            this.showNotification('❌ Message contains invalid content');
            return;
        }

        const startTime = Date.now();

        const userMessage = {
            id: this.generateId(),
            content: this.security.sanitizeInput(content),
            author: this.currentUser.name,
            timestamp: Date.now(),
            isOwn: true
        };

        this.messages.push(userMessage);
        this.renderMessage(userMessage);
        this.performance.messagesSent++;

        this.messageInput.value = '';
        this.autoResize();
        this.scrollToBottom();

        this.analytics.trackInteraction('message_sent', 'chat', { 
            messageLength: content.length
        });

        setTimeout(() => {
            this.generateResponse(content, startTime);
        }, 800 + Math.random() * 1200);
    }

    generateResponse(userMessage, startTime) {
        const message = userMessage.toLowerCase();
        let response = '';
        let agentName = 'Sarah Chen';
        let department = 'support';

        if (message.includes('order') || message.includes('status') || message.includes('track')) {
            agentName = 'Sarah Chen';
            department = 'orders';
            response = this.generateOrderResponse();
        } else if (message.includes('return') || message.includes('exchange')) {
            agentName = 'Lisa Chang';
            department = 'returns';
            response = this.generateReturnResponse();
        } else if (message.includes('product') || message.includes('information')) {
            agentName = 'Emma Wilson';
            department = 'products';
            response = this.generateProductResponse();
        } else if (message.includes('billing') || message.includes('payment')) {
            agentName = 'Alex Thompson';
            department = 'billing';
            response = this.generateBillingResponse();
        } else if (message.includes('technical') || message.includes('help')) {
            agentName = 'Mike Rodriguez';
            department = 'technical';
            response = this.generateTechnicalResponse();
        } else if (message.includes('hello') || message.includes('hi')) {
            response = this.generateGreetingResponse();
        } else {
            response = this.generateDefaultResponse();
        }

        this.showTypingIndicator(agentName);

        setTimeout(() => {
            this.hideTypingIndicator();
            
            const botMessage = {
                id: this.generateId(),
                content: response,
                author: agentName,
                timestamp: Date.now(),
                isOwn: false,
                department: department
            };

            this.messages.push(botMessage);
            this.renderMessage(botMessage);
            this.scrollToBottom();
            this.performance.messagesReceived++;
            this.performance.trackResponseTime(startTime);
            
            this.showNotification(`${agentName} responded`);
        }, 1200 + Math.random() * 800);
    }

    generateOrderResponse() {
        return `Hi asarekings! 📦 Here's your order status:\n\n✅ **NEX-2025-001247** - $1,099.99\n• NexaPhone Pro Max - DELIVERED\n• Tracking: NEX1234567890\n\n🚚 **NEX-2025-001248** - $1,599.99\n• NexaBook Ultra 16 - IN TRANSIT\n• Progress: 75% complete\n• Est. delivery: June 10, 2025\n\nNeed help with anything else?`;
    }

    generateReturnResponse() {
        return `Hi asarekings! ↩️ I'll help you with returns.\n\n✨ **Easy Returns:**\n• 30-day return window\n• Free return shipping\n• No restocking fees\n• 24-hour processing\n\n🚀 **Return Process:**\n1. Go to "My Orders"\n2. Select item to return\n3. Print prepaid label\n4. Ship back - that's it!\n\nWhich item would you like to return?`;
    }

    generateProductResponse() {
        return `Hi asarekings! 🛍️ Here are our featured products:\n\n📱 **NexaPhone Pro Max** - $1,099.99 ⭐4.9\n• 6.7" OLED, 512GB, 5G\n• In Stock: 247 units\n\n💻 **NexaBook Ultra 16** - $1,599.99 ⭐4.8\n• M2 Pro, 32GB RAM, 1TB SSD\n• In Stock: 89 units\n\n🎧 **NexaPods Max** - $249.99 ⭐4.7\n• Spatial Audio, 30h battery\n• In Stock: 156 units\n\nWhat specific product info do you need?`;
    }

    generateBillingResponse() {
        return `Hi asarekings! 💳 I'm here for billing support.\n\n💰 **Payment Methods:**\n• Credit/Debit Cards\n• PayPal & Apple Pay\n• Buy Now, Pay Later\n• Store Credit\n\n📊 **Your Account:**\n• Premium Member Status 🌟\n• Total spent: $2,929.97\n• Cashback earned: $58.60\n\nWhat billing question can I help with?`;
    }

    generateTechnicalResponse() {
        return `Hi asarekings! 🔧 Technical support here.\n\n🌐 **System Status:**\n• Website: ✅ Operational\n• Mobile App: ✅ Operational\n• Payment System: ✅ Operational\n\n📱 **Quick Fixes:**\n• Clear browser cache\n• Update your browser\n• Try incognito mode\n• Restart your device\n\nWhat technical issue are you experiencing?`;
    }

    generateGreetingResponse() {
        return `Hello asarekings! 👋 Welcome to NexaShop Support!\n\n🎫 Your ticket: ${this.ticketNumber}\n📅 Time: 2025-06-08 11:25:12 UTC\n\n🌟 I can help with:\n• Order tracking\n• Product information\n• Returns & exchanges\n• Billing questions\n• Technical support\n\nWhat can I assist you with today?`;
    }

    generateDefaultResponse() {
        return `I'd be happy to help you! 😊\n\n🎯 **I can assist with:**\n• 📦 Orders & Shipping\n• 🛍️ Product Information\n• 💳 Billing & Payments\n• 🔧 Technical Support\n• ↩️ Returns & Exchanges\n\nWhat specific area would you like help with?`;
    }

    renderMessage(message) {
        if (!this.messagesContainer) return;

        const messageEl = document.createElement('div');
        messageEl.className = `message ${message.isOwn ? 'own' : ''}`;
        
        const time = new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        const departmentColor = this.getDepartmentColor(message.department);
        const avatar = message.isOwn ? 'A' : (message.author ? message.author.split(' ').map(n => n[0]).join('') : 'S');

        messageEl.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <div class="message-avatar" style="background: ${departmentColor}">
                        ${avatar}
                    </div>
                    <span class="message-author">${message.author}</span>
                    <span class="message-time">${time}</span>
                </div>
                <div class="message-text">${this.escapeHtml(message.content)}</div>
            </div>
        `;

        const welcomeMsg = this.messagesContainer.querySelector('.welcome-message');
        if (welcomeMsg && this.messages.length === 1) {
            welcomeMsg.remove();
        }

        this.messagesContainer.appendChild(messageEl);
    }

    showTypingIndicator(agentName) {
        if (!this.messagesContainer) return;
        
        const existingIndicator = document.getElementById('typingIndicator');
        if (existingIndicator) existingIndicator.remove();
        
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <span>${agentName} is typing...</span>
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

    handleFileSelect(file) {
        this.selectedFile = file;
        if (this.filePreview) {
            this.filePreview.style.display = 'block';
            this.filePreview.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>📎 ${file.name} (${this.formatFileSize(file.size)})</span>
                    <button onclick="this.parentElement.parentElement.style.display='none'; nexaShopSupport.selectedFile=null;" style="background: none; border: none; cursor: pointer; color: #ef4444;">✕</button>
                </div>
            `;
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getDepartmentColor(department) {
        const colors = {
            orders: '#10b981',
            products: '#6366f1', 
            returns: '#f59e0b',
            billing: '#ef4444',
            technical: '#8b5cf6',
            support: '#06b6d4'
        };
        return colors[department] || '#6366f1';
    }

    autoResize() {
        if (this.messageInput) {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        }
    }

    scrollToBottom() {
        if (this.settings.autoScroll && this.messagesContainer) {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }

    showNotification(message) {
        if (this.notification) {
            this.notification.textContent = message;
            this.notification.classList.add('show');
            setTimeout(() => {
                this.notification.classList.remove('show');
            }, 3000);
        }
    }

    toggleTheme() {
        this.settings.darkMode = !this.settings.darkMode;
        document.documentElement.setAttribute('data-theme', this.settings.darkMode ? 'dark' : 'light');
        this.themeToggle.textContent = this.settings.darkMode ? '☀️' : '🌙';
    }

    toggleSound() {
        this.settings.soundEffects = !this.settings.soundEffects;
        this.soundToggle.style.opacity = this.settings.soundEffects ? '1' : '0.5';
        this.showNotification(this.settings.soundEffects ? 'Sound enabled' : 'Sound disabled');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, initializing NexaShop Support...');
    console.log('📅 Current Time: 2025-06-08 11:25:12 UTC');
    console.log('👤 User: asarekings');
    new NexaShopSupport();
});

// Also try immediate initialization in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // Still loading, wait for DOMContentLoaded
} else {
    console.log('DOM already loaded, initializing immediately...');
    new NexaShopSupport();
}
