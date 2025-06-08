class NexaShopSupport {
    constructor() {
        this.currentUser = {
            id: 'user-001',
            name: 'asarekings',
            email: 'asarekings@nexashop.com',
            avatar: 'A'
        };
        
        this.messages = [];
        this.typingTimeout = null;
        this.settings = {
            darkMode: false,
            soundEffects: true,
            typingIndicators: true,
            autoScroll: true
        };
        
        this.ticketNumber = 'NEX-2025-0608-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        this.init();
    }

    init() {
        console.log('Initializing NexaShop Support...');
        this.setupElements();
        this.setupEventListeners();
        this.showWelcomeMessage();
        
        // Set global reference
        window.nexaShopSupport = this;
        console.log('NexaShop Support initialized successfully');
    }

    setupElements() {
        this.messageInput = document.getElementById('messageInput');
        this.messageForm = document.getElementById('messageForm');
        this.messagesContainer = document.getElementById('messagesContainer');
        this.notification = document.getElementById('notification');
        
        console.log('Elements found:', {
            messageInput: !!this.messageInput,
            messageForm: !!this.messageForm,
            messagesContainer: !!this.messagesContainer
        });
    }

    setupEventListeners() {
        if (this.messageForm) {
            this.messageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Form submitted');
                this.sendMessage();
            });
        }

        if (this.messageInput) {
            this.messageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    console.log('Enter key pressed');
                    this.sendMessage();
                }
            });

            this.messageInput.addEventListener('input', () => {
                this.autoResize();
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        console.log('Event listeners setup complete');
    }

    showWelcomeMessage() {
        if (!this.messagesContainer) return;
        
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'welcome-message';
        welcomeMsg.innerHTML = `
            <div class="welcome-header">
                <h3>🛍️ Welcome to NexaShop Customer Support</h3>
                <p><strong>Support Ticket: ${this.ticketNumber}</strong></p>
                <p><strong>Date:</strong> June 8, 2025 at 10:37 AM UTC</p>
                <p class="welcome-subtitle">Hi asarekings! How can our premium support team assist you today?</p>
            </div>
            
            <div class="quick-actions">
                <h4>🚀 Quick Actions:</h4>
                <div class="action-grid">
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I need to check my order status')">
                        <span style="font-size: 20px;">📦</span>
                        Check Order Status
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I need to track my shipment')">
                        <span style="font-size: 20px;">🚚</span>
                        Track My Package
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

            <div class="store-hours">
                <p><strong>🕒 Support Available:</strong> 24/7 Live Chat | Phone: Daily 6AM-12AM EST</p>
                <p><strong>📧 Email:</strong> support@nexashop.com | <strong>📱 App:</strong> Download NexaShop mobile app</p>
                <p><strong>🎯 Premium Support:</strong> Priority assistance for all customers</p>
            </div>
        `;
        this.messagesContainer.appendChild(welcomeMsg);
        console.log('Welcome message added');
    }

    quickMessage(message) {
        console.log('Quick message clicked:', message);
        if (this.messageInput) {
            this.messageInput.value = message;
            this.sendMessage();
        }
    }

    sendMessage() {
        console.log('sendMessage called');
        
        if (!this.messageInput) {
            console.error('Message input not found');
            return;
        }

        const content = this.messageInput.value.trim();
        console.log('Message content:', content);
        
        if (!content) {
            console.log('No content to send');
            return;
        }

        // Create user message
        const userMessage = {
            id: this.generateId(),
            content: content,
            author: this.currentUser.name,
            timestamp: Date.now(),
            isOwn: true
        };

        console.log('Adding user message:', userMessage);
        this.messages.push(userMessage);
        this.renderMessage(userMessage);

        // Clear input
        this.messageInput.value = '';
        this.autoResize();
        this.scrollToBottom();

        // Generate response
        console.log('Generating response...');
        setTimeout(() => {
            this.generateResponse(content);
        }, 1000);
    }

    generateResponse(userMessage) {
        console.log('Generating response for:', userMessage);
        
        const message = userMessage.toLowerCase();
        let response = '';
        let agentName = 'Sarah Chen';
        let department = 'support';

        // Simple response logic
        if (message.includes('order') || message.includes('status') || message.includes('track')) {
            agentName = 'Sarah Chen';
            department = 'orders';
            response = `Hi asarekings! 📦 I can help you with your order status.\n\n**Your Recent Orders:**\n\n✅ **NEX-2025-001247** - $1,099.99\n• NexaPhone Pro Max - DELIVERED (June 1)\n• Tracking: NEX1234567890\n\n🚚 **NEX-2025-001248** - $1,599.99\n• NexaBook Ultra 16 - SHIPPED (Est. delivery: June 10)\n• Tracking: NEX1234567891\n\n⏳ **NEX-2025-001249** - $329.98\n• NexaPods Max + Wireless Charger - PROCESSING\n• Will ship by June 9\n\n🔗 Track all orders at nexashop.com/track\n📱 Download our app for real-time updates!`;
        } 
        else if (message.includes('return') || message.includes('exchange') || message.includes('refund')) {
            agentName = 'Lisa Chang';
            department = 'returns';
            response = `Hi asarekings! ↩️ I'll help you with returns and exchanges.\n\n**NexaShop Easy Returns:**\n\n✨ **30-day return policy** for most items\n🆓 **Free return shipping** - no restocking fees\n⚡ **Fast processing** - 3-5 business days for refunds\n\n**How to Return:**\n1️⃣ Go to "My Orders" in your account\n2️⃣ Select the item to return\n3️⃣ Print the prepaid return label\n4️⃣ Package and ship - that's it!\n\n**Need to return something specific?** I can start the process for you right now!`;
        }
        else if (message.includes('product') || message.includes('nexa') || message.includes('phone') || message.includes('laptop')) {
            agentName = 'Emma Wilson';
            department = 'products';
            response = `Hi asarekings! 🛍️ I'd love to help you find the perfect NexaShop product!\n\n**🔥 Featured Products:**\n\n📱 **NexaPhone Pro Max** - $1,099.99 ⭐4.9\n• 6.7" OLED, 512GB, 5G, Pro Camera\n• In Stock - Ships in 1-2 days\n\n💻 **NexaBook Ultra 16** - $1,599.99 ⭐4.8\n• M2 Pro, 32GB RAM, 1TB SSD\n• In Stock - Free shipping\n\n🎧 **NexaPods Max** - $249.99 ⭐4.7\n• Spatial Audio, 30h battery\n• In Stock - Best seller!\n\n**What type of product are you looking for?** I can provide detailed specs and recommendations!`;
        }
        else if (message.includes('billing') || message.includes('payment') || message.includes('charge')) {
            agentName = 'Alex Thompson';
            department = 'billing';
            response = `Hi asarekings! 💳 I'm here to help with all your billing questions.\n\n**Payment Options:**\n• Credit/Debit Cards (Visa, MC, Amex)\n• PayPal & Apple Pay\n• Buy Now, Pay Later\n• NexaShop Store Credit\n\n**Billing Help:**\n📄 View invoices in "My Account"\n🔄 Update payment methods anytime\n💰 Refunds process in 5-7 business days\n📧 Email receipts sent automatically\n\n**Having a payment issue?** I can review your account and help resolve it immediately!`;
        }
        else if (message.includes('technical') || message.includes('website') || message.includes('app') || message.includes('login')) {
            agentName = 'Mike Rodriguez';
            department = 'technical';
            response = `Hi asarekings! 🔧 I'm here to solve any technical issues you're experiencing.\n\n**Common Solutions:**\n\n🌐 **Website Issues:**\n• Clear browser cache & cookies\n• Try incognito/private mode\n• Update your browser\n\n📱 **Mobile App:**\n• Update to latest version\n• Restart your device\n• Reinstall if needed\n\n🔐 **Account Access:**\n• Use "Forgot Password" to reset\n• Enable 2-factor authentication\n• Clear stored login data\n\n**Still having trouble?** I can walk you through step-by-step troubleshooting!`;
        }
        else if (message.includes('hello') || message.includes('hi') || message.includes('help')) {
            response = `Hello asarekings! 👋 Welcome to NexaShop's premium support.\n\n🎫 **Your ticket:** ${this.ticketNumber}\n📅 **Current time:** June 8, 2025 - 10:37 AM UTC\n\n🌟 **I'm here to help with:**\n• 📦 Order tracking & delivery\n• 🔄 Returns & exchanges  \n• 💡 Product information\n• 💳 Billing & payments\n• 🔧 Technical support\n\n**What can I assist you with today?** I'm committed to providing you with exceptional service! ⚡`;
        }
        else if (message.includes('thank') || message.includes('thanks')) {
            response = `You're absolutely welcome, asarekings! 😊 It's been my pleasure to help.\n\n🌟 **Is there anything else I can assist you with today?**\n\n📝 **You'll receive:**\n• Email summary of our conversation\n• 24-hour follow-up window\n• Satisfaction survey link\n\n💙 Thank you for choosing NexaShop - where innovation meets exceptional service!`;
        }
        else {
            response = `I'd be happy to help you with that! 😊\n\n🎯 **I can assist you with:**\n\n📦 **Orders & Shipping** - Track packages, delivery updates\n🛍️ **Products** - Recommendations, specifications, availability\n💳 **Billing** - Payment issues, refunds, account settings\n🔧 **Technical** - Website/app issues, login problems\n↩️ **Returns** - Easy return process, exchanges\n\n**What specific area would you like help with?** I'm here to ensure you have an amazing NexaShop experience!`;
        }

        // Show typing indicator
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

            console.log('Adding bot message:', botMessage);
            this.messages.push(botMessage);
            this.renderMessage(botMessage);
            this.scrollToBottom();
            
            // Show notification
            this.showNotification(`${agentName} responded`);
        }, 1500);
    }

    renderMessage(message) {
        console.log('Rendering message:', message);
        
        if (!this.messagesContainer) {
            console.error('Messages container not found');
            return;
        }

        const messageEl = document.createElement('div');
        messageEl.className = `message ${message.isOwn ? 'own' : ''}`;
        
        const time = new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        const departmentColor = this.getDepartmentColor(message.department);
        const avatar = message.isOwn ? 'A' : (message.author ? message.author.split(' ').map(n => n[0]).join('') : 'S');
        
        let departmentBadge = '';
        if (message.department && !message.isOwn) {
            const deptIcon = this.getDepartmentIcon(message.department);
            departmentBadge = `<span class="department-badge" style="background: ${departmentColor}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin-left: 5px;">${deptIcon} ${message.department.toUpperCase()}</span>`;
        }

        messageEl.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <div class="message-avatar" style="background: ${departmentColor}">
                        ${avatar}
                    </div>
                    <span class="message-author">${message.author}${departmentBadge}</span>
                    <span class="message-time">${time}</span>
                </div>
                <div class="message-text">${this.escapeHtml(message.content)}</div>
            </div>
        `;

        // Remove welcome message if this is the first real message
        const welcomeMsg = this.messagesContainer.querySelector('.welcome-message');
        if (welcomeMsg && this.messages.length === 1) {
            welcomeMsg.remove();
        }

        this.messagesContainer.appendChild(messageEl);
        console.log('Message rendered successfully');
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

    getDepartmentIcon(department) {
        const icons = {
            orders: '📦',
            products: '🛍️',
            returns: '↩️',
            billing: '💳',
            technical: '🔧',
            support: '🎧'
        };
        return icons[department] || '🎧';
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
    console.log('DOM loaded, initializing NexaShop Support...');
    new NexaShopSupport();
});

// Also try immediate initialization in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // Still loading, wait for DOMContentLoaded
} else {
    // Already loaded
    console.log('DOM already loaded, initializing immediately...');
    new NexaShopSupport();
}
