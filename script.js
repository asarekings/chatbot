class NexaShopSupport {
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
        
        // Current date and time - Updated to current time
        this.currentDateTime = new Date('2025-06-08T10:18:22Z');
        
        // Settings with defaults
        this.settings = {
            darkMode: false,
            soundEffects: true,
            desktopNotifications: false,
            autoScroll: true,
            typingIndicators: true
        };
        
        // E-commerce support context
        this.supportContext = {
            ticketNumber: null,
            customerEmail: null,
            orderNumber: null,
            issueCategory: null,
            priority: 'normal',
            status: 'new',
            customerInfo: 'asarekings',
            conversationHistory: [],
            cart: [],
            wishlist: [],
            currentTime: this.currentDateTime.toISOString(),
            supportAgents: [
                { 
                    name: "Sarah Chen", 
                    department: "orders", 
                    specialties: ["order status", "shipping", "delivery", "tracking"],
                    availability: "online",
                    rating: 4.9,
                    responseTime: "< 1m"
                },
                { 
                    name: "Mike Rodriguez", 
                    department: "technical", 
                    specialties: ["website issues", "account problems", "login", "app"],
                    availability: "online",
                    rating: 4.8,
                    responseTime: "< 2m"
                },
                { 
                    name: "Emma Wilson", 
                    department: "products", 
                    specialties: ["product info", "recommendations", "specifications"],
                    availability: "online",
                    rating: 4.9,
                    responseTime: "< 1m"
                },
                { 
                    name: "Alex Thompson", 
                    department: "billing", 
                    specialties: ["payment", "refunds", "billing", "pricing"],
                    availability: "online",
                    rating: 4.7,
                    responseTime: "< 2m"
                },
                { 
                    name: "Lisa Chang", 
                    department: "returns", 
                    specialties: ["returns", "exchanges", "warranty", "defects"],
                    availability: "online",
                    rating: 4.8,
                    responseTime: "< 1m"
                }
            ],
            productCatalog: {
                "nexaphone-pro": {
                    name: "NexaPhone Pro Max",
                    price: 1099.99,
                    category: "smartphones",
                    inStock: true,
                    rating: 4.9,
                    specs: "6.7\" OLED, 512GB, 5G, Pro Camera System",
                    warranty: "2 years"
                },
                "nexabook-ultra": {
                    name: "NexaBook Ultra 16",
                    price: 1599.99,
                    category: "laptops",
                    inStock: true,
                    rating: 4.8,
                    specs: "M2 Pro, 32GB RAM, 1TB SSD, 16.2\" Liquid Retina",
                    warranty: "3 years"
                },
                "nexapods-max": {
                    name: "NexaPods Max",
                    price: 249.99,
                    category: "audio",
                    inStock: true,
                    rating: 4.7,
                    specs: "Spatial Audio, ANC, 30h Battery, Wireless Charging",
                    warranty: "1 year"
                }
            },
            orderStatuses: [
                { 
                    orderId: "NEX-2025-001247", 
                    status: "delivered", 
                    items: ["NexaPhone Pro Max"], 
                    total: 1099.99, 
                    date: "2025-06-01",
                    trackingNumber: "NEX1234567890"
                },
                { 
                    orderId: "NEX-2025-001248", 
                    status: "shipped", 
                    items: ["NexaBook Ultra 16"], 
                    total: 1599.99, 
                    date: "2025-06-05",
                    estimatedDelivery: "2025-06-10",
                    trackingNumber: "NEX1234567891"
                },
                { 
                    orderId: "NEX-2025-001249", 
                    status: "processing", 
                    items: ["NexaPods Max", "NexaCharge Wireless Pad"], 
                    total: 329.98, 
                    date: "2025-06-07",
                    estimatedShip: "2025-06-09"
                }
            ]
        };
        
        // Initialize the app
        this.initializeElements();
        this.setupEventListeners();
        this.loadFromStorage();
        this.initializeNexaShopSupport();
        this.initializeSettings();
        this.playSound('connect');
        
        // Set global reference for onclick handlers
        window.nexaShopSupport = this;
    }

    initializeElements() {
        // Get all DOM elements
        this.customerInput = document.getElementById('customerInput');
        this.messageInput = document.getElementById('messageInput');
        this.messageForm = document.getElementById('messageForm');
        this.messagesContainer = document.getElementById('messagesContainer');
        this.agentsList = document.getElementById('agentsList');
        this.agentCount = document.getElementById('agentCount');
        this.connectionStatus = document.getElementById('connectionStatus');
        this.notification = document.getElementById('notification');
        this.fileBtn = document.getElementById('fileBtn');
        this.fileInput = document.getElementById('fileInput');
        this.filePreview = document.getElementById('filePreview');
        this.themeToggle = document.getElementById('themeToggle');
        this.soundToggle = document.getElementById('soundToggle');
        this.settingsPanel = document.getElementById('settingsPanel');
        this.closeSettings = document.getElementById('closeSettings');
    }

    setupEventListeners() {
        // Customer info input
        this.customerInput?.addEventListener('input', (e) => {
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

    initializeNexaShopSupport() {
        // Generate ticket number with current timestamp
        this.supportContext.ticketNumber = 'NEX-2025-0608-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        // Auto-create user
        this.currentUser = {
            id: this.generateId(),
            name: 'asarekings',
            email: 'asarekings@nexashop.com',
            avatar: 'A',
            joinTime: Date.now()
        };
        
        // Show initial support message
        this.showWelcomeMessage();
        
        // Initialize support agents
        this.supportContext.supportAgents.forEach(agent => {
            const agentId = this.generateId();
            this.users.set(agentId, {
                id: agentId,
                name: agent.name,
                avatar: agent.name.split(' ').map(n => n[0]).join(''),
                status: agent.availability === 'online' ? 'Online' : 'Away',
                department: agent.department,
                specialties: agent.specialties,
                rating: agent.rating,
                responseTime: agent.responseTime,
                joinTime: Date.now() - Math.random() * 3600000
            });
        });
        
        this.updateAgentsList();
    }

    showWelcomeMessage() {
        if (!this.messagesContainer) return;
        
        const currentDate = this.currentDateTime.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const currentTime = this.currentDateTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
        
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'welcome-message';
        welcomeMsg.innerHTML = `
            <div class="welcome-header">
                <h3>🛍️ Welcome to NexaShop Customer Support</h3>
                <p><strong>Support Ticket: ${this.supportContext.ticketNumber}</strong></p>
                <p><strong>Date:</strong> ${currentDate} at ${currentTime}</p>
                <p class="welcome-subtitle">Hi asarekings! How can our premium support team assist you today?</p>
            </div>
            
            <div class="quick-actions">
                <h4>🚀 Quick Actions:</h4>
                <div class="action-grid">
                    <button class="quick-action-btn" onclick="nexaShopSupport.handleQuickAction('check-order')">
                        <span style="font-size: 20px;">📦</span>
                        Check Order Status
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.handleQuickAction('track-shipment')">
                        <span style="font-size: 20px;">🚚</span>
                        Track My Package
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.handleQuickAction('return-item')">
                        <span style="font-size: 20px;">↩️</span>
                        Return & Exchange
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.handleQuickAction('product-info')">
                        <span style="font-size: 20px;">💡</span>
                        Product Questions
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.handleQuickAction('billing-issue')">
                        <span style="font-size: 20px;">💳</span>
                        Billing Support
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.handleQuickAction('technical-help')">
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
    }

    handleQuickAction(action) {
        const quickMessages = {
            'check-order': 'I need to check my order status',
            'return-item': 'I want to return an item',
            'track-shipment': 'I need to track my shipment', 
            'product-info': 'I need information about your products',
            'billing-issue': 'I have a billing question',
            'technical-help': 'I need technical assistance'
        };

        if (quickMessages[action] && this.messageInput) {
            this.messageInput.value = quickMessages[action];
            this.sendMessage();
        }
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
            this.supportContext.customerEmail = this.extractEmail(info) || 'asarekings@nexashop.com';
            this.currentUser = {
                id: this.generateId(),
                name: info.includes('@') ? info.split('@')[0] : info,
                email: this.supportContext.customerEmail,
                avatar: (info.includes('@') ? info.split('@')[0] : info).charAt(0).toUpperCase(),
                joinTime: Date.now()
            };
            this.saveToStorage();
            this.showNotification(`Hello ${this.currentUser.name}! Support ready`);
        }
    }

    extractEmail(text) {
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        const match = text.match(emailRegex);
        return match ? match[0] : null;
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
        if (!content && !this.selectedFile) return;

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
        
        // Store conversation context
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

        // Generate AI response
        setTimeout(() => this.generateNexaShopResponse(content), 1000 + Math.random() * 2000);
    }

    generateNexaShopResponse(customerMessage) {
        const message = customerMessage.toLowerCase().trim();
        const response = this.getNexaShopResponse(message);
        const selectedAgent = this.selectNexaShopAgent(message);

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
                this.showDesktopNotification(`${selectedAgent.name} (NexaShop)`, response.substring(0, 100) + '...');
            }
        }, 1500 + Math.random() * 1500);
    }

    getNexaShopResponse(message) {
        const customerName = this.currentUser?.name || 'asarekings';
        const ticketNumber = this.supportContext.ticketNumber;
        
        // Greeting responses
        if (this.matchesPattern(message, ['hello', 'hi', 'hey', 'help', 'support'])) {
            return `Hello ${customerName}! 👋 Welcome to NexaShop's premium support experience.\n\n🎫 **Your ticket:** ${ticketNumber}\n📅 **Date:** June 8, 2025\n\n🌟 **I'm here to provide you with exceptional service!** Whether you need help with:\n\n• 📦 Order tracking and delivery updates\n• 🔄 Returns and exchanges\n• 💡 Product recommendations and specs\n• 💳 Billing and payment assistance\n• 🔧 Technical support\n\n**What can I help you with today?** I'm committed to resolving your inquiry quickly and efficiently! ⚡`;
        }

        // Order status and tracking
        if (this.matchesPattern(message, ['order', 'status', 'track', 'tracking', 'shipment', 'delivery', 'package'])) {
            this.supportContext.issueCategory = 'orders';
            return this.getNexaTrackingInfo();
        }

        // Product information
        if (this.matchesPattern(message, ['product', 'item', 'nexa', 'phone', 'laptop', 'pods', 'watch', 'charger'])) {
            this.supportContext.issueCategory = 'products';
            return this.getNexaProductInfo();
        }

        // Returns and exchanges
        if (this.matchesPattern(message, ['return', 'exchange', 'refund', 'send back', 'defective', 'broken'])) {
            this.supportContext.issueCategory = 'returns';
            return `↩️ **NexaShop Returns & Exchanges:**\n\n✨ **Our Promise:** Hassle-free returns within 30 days!\n\n📋 **Easy Return Process:**\n1️⃣ Go to "My Orders" in your account\n2️⃣ Select the item you want to return\n3️⃣ Choose your return reason\n4️⃣ Print the prepaid return label\n5️⃣ Package and drop off at any shipping location\n\n💰 **Refund Timeline:** 3-5 business days after we receive your item\n\n🔄 **Exchange Options:** Same-day processing for size/color exchanges\n\n🆓 **Free Returns:** No restocking fees, ever!\n\n**Need help starting a return?** I can guide you through the process right now!`;
        }

        // Billing and payment
        if (this.matchesPattern(message, ['payment', 'billing', 'charge', 'card', 'invoice', 'pay'])) {
            this.supportContext.issueCategory = 'billing';
            return `💳 **NexaShop Billing Support:**\n\n🔒 **Secure Payment Methods:**\n• Credit/Debit Cards (Visa, MasterCard, Amex)\n• PayPal & Apple Pay\n• Buy Now, Pay Later options\n• NexaShop Store Credit\n\n📄 **Billing Help:**\n• View invoices in "My Account"\n• Update payment methods anytime\n• Set up auto-pay for subscriptions\n• Download receipts instantly\n\n❓ **Common Issues:**\n• Payment declined? Check card details & funds\n• Missing charge? Check pending transactions\n• Refund questions? 5-7 business day processing\n\n💡 **Need immediate help?** I can review your account and resolve billing issues right now!`;
        }

        // Technical support
        if (this.matchesPattern(message, ['website', 'app', 'login', 'password', 'account', 'bug', 'error'])) {
            this.supportContext.issueCategory = 'technical';
            return `🔧 **NexaShop Technical Support:**\n\n🌐 **Website Issues:**\n• Clear browser cache and cookies\n• Try incognito/private browsing mode\n• Update your browser to the latest version\n• Disable ad blockers temporarily\n\n📱 **Mobile App Help:**\n• Update to the latest app version\n• Restart your device\n• Check internet connection\n• Reinstall if problems persist\n\n🔐 **Account Access:**\n• Reset password: Click "Forgot Password"\n• Enable 2-factor authentication for security\n• Update account info in settings\n\n⚡ **Still having issues?** I can troubleshoot with you step-by-step or connect you with our technical specialist team!`;
        }

        // Gratitude
        if (this.matchesPattern(message, ['thank', 'thanks', 'appreciate'])) {
            return `You're absolutely welcome, ${customerName}! 😊 It's been my pleasure to assist you with ticket ${ticketNumber}.\n\n🌟 **Your satisfaction is our priority!** Is there anything else I can help you with today?\n\n📝 **Before you go:**\n• You'll receive an email summary of our chat\n• Your ticket remains open for 24 hours for follow-up questions\n• Rate your experience to help us improve\n\n💙 Thank you for choosing NexaShop - where innovation meets exceptional service!`;
        }

        // Default response
        return `I'd be happy to help you with that! 😊\n\n🎯 **For faster assistance, I can help you with:**\n\n📦 **Orders & Shipping**\n• Track your packages\n• Update delivery preferences\n• Expedite shipping options\n\n🛍️ **Products & Shopping**\n• Product recommendations\n• Technical specifications\n• Availability updates\n\n💳 **Account & Billing**\n• Payment issues\n• Account settings\n• Order history\n\n🔧 **Technical Support**\n• Website/app issues\n• Login problems\n• Device compatibility\n\n**What specific area would you like help with?** I'm here to make sure you have an amazing NexaShop experience!`;
    }

    getNexaTrackingInfo() {
        const orders = this.supportContext.orderStatuses;
        let response = `📦 **NexaShop Order Tracking (asarekings):**\n\n`;
        
        orders.forEach(order => {
            const statusEmoji = {
                'delivered': '✅',
                'shipped': '🚚',
                'processing': '⏳',
                'cancelled': '❌'
            };
            
            response += `${statusEmoji[order.status]} **${order.orderId}**\n`;
            response += `💰 Total: $${order.total}\n`;
            response += `📅 Order Date: ${order.date}\n`;
            response += `📋 Status: ${order.status.toUpperCase()}\n`;
            response += `🛍️ Items: ${order.items.join(', ')}\n`;
            
            if (order.trackingNumber) {
                response += `🔍 Tracking: ${order.trackingNumber}\n`;
            }
            
            if (order.status === 'shipped' && order.estimatedDelivery) {
                response += `📅 Est. Delivery: ${order.estimatedDelivery}\n`;
            } else if (order.status === 'processing' && order.estimatedShip) {
                response += `📦 Est. Ship Date: ${order.estimatedShip}\n`;
            }
            response += `\n`;
        });
        
        response += `🔗 **Track in real-time:** nexashop.com/track\n📱 **Mobile app:** Get instant notifications\n📞 **Need help?** I'm here for any questions!`;
        
        return response;
    }

    getNexaProductInfo() {
        return `🛍️ **NexaShop Premium Products:**\n\n📱 **NexaPhone Pro Max** - $1,099.99 ⭐4.9\n• 6.7" OLED, 512GB, 5G, Pro Camera System\n• 2-year warranty | In Stock\n\n💻 **NexaBook Ultra 16** - $1,599.99 ⭐4.8\n• M2 Pro, 32GB RAM, 1TB SSD, 16.2" Liquid Retina\n• 3-year warranty | In Stock\n\n🎧 **NexaPods Max** - $249.99 ⭐4.7\n• Spatial Audio, ANC, 30h Battery, Wireless Charging\n• 1-year warranty | In Stock\n\n⌚ **NexaWatch Series X** - $499.99 ⭐4.6\n• Always-On Display, Health Sensors, 36h Battery\n• 2-year warranty | Currently Out of Stock\n\n🔍 **Looking for something specific?** Tell me your needs and I'll find the perfect NexaShop product for you!\n\n🛒 **Ready to buy?** I can help you add items to cart and apply any current promotions!`;
    }

    selectNexaShopAgent(message) {
        let availableAgents = this.supportContext.supportAgents.filter(agent => agent.availability === 'online');
        
        if (availableAgents.length === 0) {
            availableAgents = this.supportContext.supportAgents;
        }

        let selectedAgent = availableAgents[0]; // default

        // Match agent expertise to issue
        if (this.matchesPattern(message, ['order', 'track', 'shipping', 'delivery'])) {
            selectedAgent = availableAgents.find(agent => agent.department === 'orders') || selectedAgent;
        } else if (this.matchesPattern(message, ['product', 'item', 'specification', 'recommend'])) {
            selectedAgent = availableAgents.find(agent => agent.department === 'products') || selectedAgent;
        } else if (this.matchesPattern(message, ['return', 'exchange', 'refund', 'defective'])) {
            selectedAgent = availableAgents.find(agent => agent.department === 'returns') || selectedAgent;
        } else if (this.matchesPattern(message, ['payment', 'billing', 'charge', 'invoice'])) {
            selectedAgent = availableAgents.find(agent => agent.department === 'billing') || selectedAgent;
        } else if (this.matchesPattern(message, ['website', 'app', 'login', 'technical'])) {
            selectedAgent = availableAgents.find(agent => agent.department === 'technical') || selectedAgent;
        }

        return {
            name: selectedAgent.name,
            avatar: selectedAgent.name.split(' ').map(n => n[0]).join(''),
            color: this.getAgentColor(selectedAgent.department),
            department: selectedAgent.department
        };
    }

    getAgentColor(department) {
        const colors = {
            "orders": "#10b981",
            "products": "#6366f1",
            "returns": "#f59e0b",
            "billing": "#ef4444",
            "technical": "#8b5cf6"
        };
        return colors[department] || "#6366f1";
    }

    matchesPattern(message, patterns) {
        return patterns.some(pattern => message.includes(pattern));
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
            const deptIcon = this.getDepartmentIcon(message.department);
            departmentBadge = `<span class="department-badge" style="background: ${this.getAgentColor(message.department)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin-left: 5px;">${deptIcon} ${message.department.toUpperCase()}</span>`;
        }

        let reactionsContent = '';
        if (message.reactions && Object.keys(message.reactions).length > 0) {
            reactionsContent = '<div class="message-reactions">';
            Object.entries(message.reactions).forEach(([emoji, users]) => {
                const isActive = this.currentUser && users.includes(this.currentUser.id);
                reactionsContent += `
                    <span class="reaction ${isActive ? 'active' : ''}" onclick="nexaShopSupport.toggleReaction('${message.id}', '${emoji}')">
                        ${emoji} ${users.length}
                    </span>
                `;
            });
            reactionsContent += '</div>';
        }

        messageEl.innerHTML = `
            <div class="message-content" oncontextmenu="nexaShopSupport.showMessageMenu(event, '${message.id}')">
                <div class="message-header">
                    <div class="message-avatar" style="background: ${message.color || '#6366f1'}">
                        ${message.isOwn ? (this.currentUser?.avatar || 'A') : (message.avatar || message.author.charAt(0).toUpperCase())}
                    </div>
                    <span class="message-author">${message.author}${departmentBadge}</span>
                    <span class="message-time">${time}</span>
                </div>
                ${message.content ? `<div class="message-text">${this.escapeHtml(message.content)}</div>` : ''}
                ${fileContent}
                ${reactionsContent}
            </div>
        `;

        // Remove welcome message if it exists and this is first real message
        const welcomeMsg = this.messagesContainer.querySelector('.welcome-message');
        if (welcomeMsg && this.messages.length === 1) {
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
                <button onclick="this.parentElement.parentElement.style.display='none'; nexaShopSupport.selectedFile=null;" style="background: none; border: none; cursor: pointer; color: #ef4444;">✕</button>
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
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
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
        
        const existingIndicator = document.getElementById('typingIndicator');
        if (existingIndicator) existingIndicator.remove();
        
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <span>${username} is typing...</span>
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
        const reactions = ['👍', '❤️', '😊', '🙏', '✅', '⭐'];
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        this.toggleReaction(messageId, randomReaction);
    }

    rerenderMessage(messageId) {
        const messageEl = document.querySelector(`[data-message-id="${messageId}"]`);
        const message = this.messages.find(m => m.id === messageId);
        if (messageEl && message) {
            const tempContainer = document.createElement('div');
            const tempMessage = { ...message };
            
            const originalContainer = this.messagesContainer;
            this.messagesContainer = tempContainer;
            this.renderMessage(tempMessage);
            this.messagesContainer = originalContainer;
            
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

    updateAgentsList() {
        if (!this.agentsList || !this.agentCount) return;
        
        this.agentsList.innerHTML = '';
        this.agentCount.textContent = this.users.size.toString();

        this.users.forEach(user => {
            const userEl = document.createElement('div');
            userEl.className = 'agent-item';
            const departmentIcon = user.department ? this.getDepartmentIcon(user.department) : '👤';
            const statusColor = user.status === 'Online' ? '#10b981' : '#f59e0b';
            
            userEl.innerHTML = `
                <div class="agent-avatar" style="background: ${this.getAgentColor(user.department)}">
                    ${user.avatar}
                    <div class="agent-status-indicator" style="background: ${statusColor}"></div>
                </div>
                <div class="agent-info">
                    <div class="agent-name">${user.name}</div>
                    <div class="agent-department">${departmentIcon} ${user.department} • ⭐${user.rating || '4.8'}</div>
                    <div class="agent-specialties">${user.responseTime || '< 2m'} avg response</div>
                </div>
            `;
            this.agentsList.appendChild(userEl);
        });
    }

    getDepartmentIcon(department) {
        const icons = {
            'orders': '📦',
            'products': '🛍️',
            'returns': '↩️',
            'billing': '💳',
            'technical': '🔧'
        };
        return icons[department] || '🎧';
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
                messages: this.messages.slice(-50),
                users: Array.from(this.users.entries()),
                settings: this.settings,
                currentRoom: this.currentRoom,
                supportContext: this.supportContext
            };
            localStorage.setItem('nexashop-support-data', JSON.stringify(data));
        } catch (error) {
            console.warn('Failed to save data to localStorage:', error);
        }
    }

    loadFromStorage() {
        try {
            const data = JSON.parse(localStorage.getItem('nexashop-support-data') || '{}');
            
            if (data.currentUser) {
                this.currentUser = data.currentUser;
            }
            
            if (data.messages && data.messages.length > 0) {
                this.messages = data.messages;
                this.messages.forEach(msg => this.renderMessage(msg));
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

    destroy() {
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        if (window.nexaShopSupport === this) {
            delete window.nexaShopSupport;
        }
    }
}

// Initialize the NexaShop support application
document.addEventListener('DOMContentLoaded', () => {
    new NexaShopSupport();
});class NexaShopSupport {
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
        
        // Current date and time - Updated to current time
        this.currentDateTime = new Date('2025-06-08T10:18:22Z');
        
        // Settings with defaults
        this.settings = {
            darkMode: false,
            soundEffects: true,
            desktopNotifications: false,
            autoScroll: true,
            typingIndicators: true
        };
        
        // E-commerce support context
        this.supportContext = {
            ticketNumber: null,
            customerEmail: null,
            orderNumber: null,
            issueCategory: null,
            priority: 'normal',
            status: 'new',
            customerInfo: 'asarekings',
            conversationHistory: [],
            cart: [],
            wishlist: [],
            currentTime: this.currentDateTime.toISOString(),
            supportAgents: [
                { 
                    name: "Sarah Chen", 
                    department: "orders", 
                    specialties: ["order status", "shipping", "delivery", "tracking"],
                    availability: "online",
                    rating: 4.9,
                    responseTime: "< 1m"
                },
                { 
                    name: "Mike Rodriguez", 
                    department: "technical", 
                    specialties: ["website issues", "account problems", "login", "app"],
                    availability: "online",
                    rating: 4.8,
                    responseTime: "< 2m"
                },
                { 
                    name: "Emma Wilson", 
                    department: "products", 
                    specialties: ["product info", "recommendations", "specifications"],
                    availability: "online",
                    rating: 4.9,
                    responseTime: "< 1m"
                },
                { 
                    name: "Alex Thompson", 
                    department: "billing", 
                    specialties: ["payment", "refunds", "billing", "pricing"],
                    availability: "online",
                    rating: 4.7,
                    responseTime: "< 2m"
                },
                { 
                    name: "Lisa Chang", 
                    department: "returns", 
                    specialties: ["returns", "exchanges", "warranty", "defects"],
                    availability: "online",
                    rating: 4.8,
                    responseTime: "< 1m"
                }
            ],
            productCatalog: {
                "nexaphone-pro": {
                    name: "NexaPhone Pro Max",
                    price: 1099.99,
                    category: "smartphones",
                    inStock: true,
                    rating: 4.9,
                    specs: "6.7\" OLED, 512GB, 5G, Pro Camera System",
                    warranty: "2 years"
                },
                "nexabook-ultra": {
                    name: "NexaBook Ultra 16",
                    price: 1599.99,
                    category: "laptops",
                    inStock: true,
                    rating: 4.8,
                    specs: "M2 Pro, 32GB RAM, 1TB SSD, 16.2\" Liquid Retina",
                    warranty: "3 years"
                },
                "nexapods-max": {
                    name: "NexaPods Max",
                    price: 249.99,
                    category: "audio",
                    inStock: true,
                    rating: 4.7,
                    specs: "Spatial Audio, ANC, 30h Battery, Wireless Charging",
                    warranty: "1 year"
                }
            },
            orderStatuses: [
                { 
                    orderId: "NEX-2025-001247", 
                    status: "delivered", 
                    items: ["NexaPhone Pro Max"], 
                    total: 1099.99, 
                    date: "2025-06-01",
                    trackingNumber: "NEX1234567890"
                },
                { 
                    orderId: "NEX-2025-001248", 
                    status: "shipped", 
                    items: ["NexaBook Ultra 16"], 
                    total: 1599.99, 
                    date: "2025-06-05",
                    estimatedDelivery: "2025-06-10",
                    trackingNumber: "NEX1234567891"
                },
                { 
                    orderId: "NEX-2025-001249", 
                    status: "processing", 
                    items: ["NexaPods Max", "NexaCharge Wireless Pad"], 
                    total: 329.98, 
                    date: "2025-06-07",
                    estimatedShip: "2025-06-09"
                }
            ]
        };
        
        // Initialize the app
        this.initializeElements();
        this.setupEventListeners();
        this.loadFromStorage();
        this.initializeNexaShopSupport();
        this.initializeSettings();
        this.playSound('connect');
        
        // Set global reference for onclick handlers
        window.nexaShopSupport = this;
    }

    initializeElements() {
        // Get all DOM elements
        this.customerInput = document.getElementById('customerInput');
        this.messageInput = document.getElementById('messageInput');
        this.messageForm = document.getElementById('messageForm');
        this.messagesContainer = document.getElementById('messagesContainer');
        this.agentsList = document.getElementById('agentsList');
        this.agentCount = document.getElementById('agentCount');
        this.connectionStatus = document.getElementById('connectionStatus');
        this.notification = document.getElementById('notification');
        this.fileBtn = document.getElementById('fileBtn');
        this.fileInput = document.getElementById('fileInput');
        this.filePreview = document.getElementById('filePreview');
        this.themeToggle = document.getElementById('themeToggle');
        this.soundToggle = document.getElementById('soundToggle');
        this.settingsPanel = document.getElementById('settingsPanel');
        this.closeSettings = document.getElementById('closeSettings');
    }

    setupEventListeners() {
        // Customer info input
        this.customerInput?.addEventListener('input', (e) => {
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

    initializeNexaShopSupport() {
        // Generate ticket number with current timestamp
        this.supportContext.ticketNumber = 'NEX-2025-0608-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        // Auto-create user
        this.currentUser = {
            id: this.generateId(),
            name: 'asarekings',
            email: 'asarekings@nexashop.com',
            avatar: 'A',
            joinTime: Date.now()
        };
        
        // Show initial support message
        this.showWelcomeMessage();
        
        // Initialize support agents
        this.supportContext.supportAgents.forEach(agent => {
            const agentId = this.generateId();
            this.users.set(agentId, {
                id: agentId,
                name: agent.name,
                avatar: agent.name.split(' ').map(n => n[0]).join(''),
                status: agent.availability === 'online' ? 'Online' : 'Away',
                department: agent.department,
                specialties: agent.specialties,
                rating: agent.rating,
                responseTime: agent.responseTime,
                joinTime: Date.now() - Math.random() * 3600000
            });
        });
        
        this.updateAgentsList();
    }

    showWelcomeMessage() {
        if (!this.messagesContainer) return;
        
        const currentDate = this.currentDateTime.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const currentTime = this.currentDateTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
        
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'welcome-message';
        welcomeMsg.innerHTML = `
            <div class="welcome-header">
                <h3>🛍️ Welcome to NexaShop Customer Support</h3>
                <p><strong>Support Ticket: ${this.supportContext.ticketNumber}</strong></p>
                <p><strong>Date:</strong> ${currentDate} at ${currentTime}</p>
                <p class="welcome-subtitle">Hi asarekings! How can our premium support team assist you today?</p>
            </div>
            
            <div class="quick-actions">
                <h4>🚀 Quick Actions:</h4>
                <div class="action-grid">
                    <button class="quick-action-btn" onclick="nexaShopSupport.handleQuickAction('check-order')">
                        <span style="font-size: 20px;">📦</span>
                        Check Order Status
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.handleQuickAction('track-shipment')">
                        <span style="font-size: 20px;">🚚</span>
                        Track My Package
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.handleQuickAction('return-item')">
                        <span style="font-size: 20px;">↩️</span>
                        Return & Exchange
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.handleQuickAction('product-info')">
                        <span style="font-size: 20px;">💡</span>
                        Product Questions
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.handleQuickAction('billing-issue')">
                        <span style="font-size: 20px;">💳</span>
                        Billing Support
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.handleQuickAction('technical-help')">
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
    }

    handleQuickAction(action) {
        const quickMessages = {
            'check-order': 'I need to check my order status',
            'return-item': 'I want to return an item',
            'track-shipment': 'I need to track my shipment', 
            'product-info': 'I need information about your products',
            'billing-issue': 'I have a billing question',
            'technical-help': 'I need technical assistance'
        };

        if (quickMessages[action] && this.messageInput) {
            this.messageInput.value = quickMessages[action];
            this.sendMessage();
        }
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
            this.supportContext.customerEmail = this.extractEmail(info) || 'asarekings@nexashop.com';
            this.currentUser = {
                id: this.generateId(),
                name: info.includes('@') ? info.split('@')[0] : info,
                email: this.supportContext.customerEmail,
                avatar: (info.includes('@') ? info.split('@')[0] : info).charAt(0).toUpperCase(),
                joinTime: Date.now()
            };
            this.saveToStorage();
            this.showNotification(`Hello ${this.currentUser.name}! Support ready`);
        }
    }

    extractEmail(text) {
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        const match = text.match(emailRegex);
        return match ? match[0] : null;
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
        if (!content && !this.selectedFile) return;

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
        
        // Store conversation context
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

        // Generate AI response
        setTimeout(() => this.generateNexaShopResponse(content), 1000 + Math.random() * 2000);
    }

    generateNexaShopResponse(customerMessage) {
        const message = customerMessage.toLowerCase().trim();
        const response = this.getNexaShopResponse(message);
        const selectedAgent = this.selectNexaShopAgent(message);

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
                this.showDesktopNotification(`${selectedAgent.name} (NexaShop)`, response.substring(0, 100) + '...');
            }
        }, 1500 + Math.random() * 1500);
    }

    getNexaShopResponse(message) {
        const customerName = this.currentUser?.name || 'asarekings';
        const ticketNumber = this.supportContext.ticketNumber;
        
        // Greeting responses
        if (this.matchesPattern(message, ['hello', 'hi', 'hey', 'help', 'support'])) {
            return `Hello ${customerName}! 👋 Welcome to NexaShop's premium support experience.\n\n🎫 **Your ticket:** ${ticketNumber}\n📅 **Date:** June 8, 2025\n\n🌟 **I'm here to provide you with exceptional service!** Whether you need help with:\n\n• 📦 Order tracking and delivery updates\n• 🔄 Returns and exchanges\n• 💡 Product recommendations and specs\n• 💳 Billing and payment assistance\n• 🔧 Technical support\n\n**What can I help you with today?** I'm committed to resolving your inquiry quickly and efficiently! ⚡`;
        }

        // Order status and tracking
        if (this.matchesPattern(message, ['order', 'status', 'track', 'tracking', 'shipment', 'delivery', 'package'])) {
            this.supportContext.issueCategory = 'orders';
            return this.getNexaTrackingInfo();
        }

        // Product information
        if (this.matchesPattern(message, ['product', 'item', 'nexa', 'phone', 'laptop', 'pods', 'watch', 'charger'])) {
            this.supportContext.issueCategory = 'products';
            return this.getNexaProductInfo();
        }

        // Returns and exchanges
        if (this.matchesPattern(message, ['return', 'exchange', 'refund', 'send back', 'defective', 'broken'])) {
            this.supportContext.issueCategory = 'returns';
            return `↩️ **NexaShop Returns & Exchanges:**\n\n✨ **Our Promise:** Hassle-free returns within 30 days!\n\n📋 **Easy Return Process:**\n1️⃣ Go to "My Orders" in your account\n2️⃣ Select the item you want to return\n3️⃣ Choose your return reason\n4️⃣ Print the prepaid return label\n5️⃣ Package and drop off at any shipping location\n\n💰 **Refund Timeline:** 3-5 business days after we receive your item\n\n🔄 **Exchange Options:** Same-day processing for size/color exchanges\n\n🆓 **Free Returns:** No restocking fees, ever!\n\n**Need help starting a return?** I can guide you through the process right now!`;
        }

        // Billing and payment
        if (this.matchesPattern(message, ['payment', 'billing', 'charge', 'card', 'invoice', 'pay'])) {
            this.supportContext.issueCategory = 'billing';
            return `💳 **NexaShop Billing Support:**\n\n🔒 **Secure Payment Methods:**\n• Credit/Debit Cards (Visa, MasterCard, Amex)\n• PayPal & Apple Pay\n• Buy Now, Pay Later options\n• NexaShop Store Credit\n\n📄 **Billing Help:**\n• View invoices in "My Account"\n• Update payment methods anytime\n• Set up auto-pay for subscriptions\n• Download receipts instantly\n\n❓ **Common Issues:**\n• Payment declined? Check card details & funds\n• Missing charge? Check pending transactions\n• Refund questions? 5-7 business day processing\n\n💡 **Need immediate help?** I can review your account and resolve billing issues right now!`;
        }

        // Technical support
        if (this.matchesPattern(message, ['website', 'app', 'login', 'password', 'account', 'bug', 'error'])) {
            this.supportContext.issueCategory = 'technical';
            return `🔧 **NexaShop Technical Support:**\n\n🌐 **Website Issues:**\n• Clear browser cache and cookies\n• Try incognito/private browsing mode\n• Update your browser to the latest version\n• Disable ad blockers temporarily\n\n📱 **Mobile App Help:**\n• Update to the latest app version\n• Restart your device\n• Check internet connection\n• Reinstall if problems persist\n\n🔐 **Account Access:**\n• Reset password: Click "Forgot Password"\n• Enable 2-factor authentication for security\n• Update account info in settings\n\n⚡ **Still having issues?** I can troubleshoot with you step-by-step or connect you with our technical specialist team!`;
        }

        // Gratitude
        if (this.matchesPattern(message, ['thank', 'thanks', 'appreciate'])) {
            return `You're absolutely welcome, ${customerName}! 😊 It's been my pleasure to assist you with ticket ${ticketNumber}.\n\n🌟 **Your satisfaction is our priority!** Is there anything else I can help you with today?\n\n📝 **Before you go:**\n• You'll receive an email summary of our chat\n• Your ticket remains open for 24 hours for follow-up questions\n• Rate your experience to help us improve\n\n💙 Thank you for choosing NexaShop - where innovation meets exceptional service!`;
        }

        // Default response
        return `I'd be happy to help you with that! 😊\n\n🎯 **For faster assistance, I can help you with:**\n\n📦 **Orders & Shipping**\n• Track your packages\n• Update delivery preferences\n• Expedite shipping options\n\n🛍️ **Products & Shopping**\n• Product recommendations\n• Technical specifications\n• Availability updates\n\n💳 **Account & Billing**\n• Payment issues\n• Account settings\n• Order history\n\n🔧 **Technical Support**\n• Website/app issues\n• Login problems\n• Device compatibility\n\n**What specific area would you like help with?** I'm here to make sure you have an amazing NexaShop experience!`;
    }

    getNexaTrackingInfo() {
        const orders = this.supportContext.orderStatuses;
        let response = `📦 **NexaShop Order Tracking (asarekings):**\n\n`;
        
        orders.forEach(order => {
            const statusEmoji = {
                'delivered': '✅',
                'shipped': '🚚',
                'processing': '⏳',
                'cancelled': '❌'
            };
            
            response += `${statusEmoji[order.status]} **${order.orderId}**\n`;
            response += `💰 Total: $${order.total}\n`;
            response += `📅 Order Date: ${order.date}\n`;
            response += `📋 Status: ${order.status.toUpperCase()}\n`;
            response += `🛍️ Items: ${order.items.join(', ')}\n`;
            
            if (order.trackingNumber) {
                response += `🔍 Tracking: ${order.trackingNumber}\n`;
            }
            
            if (order.status === 'shipped' && order.estimatedDelivery) {
                response += `📅 Est. Delivery: ${order.estimatedDelivery}\n`;
            } else if (order.status === 'processing' && order.estimatedShip) {
                response += `📦 Est. Ship Date: ${order.estimatedShip}\n`;
            }
            response += `\n`;
        });
        
        response += `🔗 **Track in real-time:** nexashop.com/track\n📱 **Mobile app:** Get instant notifications\n📞 **Need help?** I'm here for any questions!`;
        
        return response;
    }

    getNexaProductInfo() {
        return `🛍️ **NexaShop Premium Products:**\n\n📱 **NexaPhone Pro Max** - $1,099.99 ⭐4.9\n• 6.7" OLED, 512GB, 5G, Pro Camera System\n• 2-year warranty | In Stock\n\n💻 **NexaBook Ultra 16** - $1,599.99 ⭐4.8\n• M2 Pro, 32GB RAM, 1TB SSD, 16.2" Liquid Retina\n• 3-year warranty | In Stock\n\n🎧 **NexaPods Max** - $249.99 ⭐4.7\n• Spatial Audio, ANC, 30h Battery, Wireless Charging\n• 1-year warranty | In Stock\n\n⌚ **NexaWatch Series X** - $499.99 ⭐4.6\n• Always-On Display, Health Sensors, 36h Battery\n• 2-year warranty | Currently Out of Stock\n\n🔍 **Looking for something specific?** Tell me your needs and I'll find the perfect NexaShop product for you!\n\n🛒 **Ready to buy?** I can help you add items to cart and apply any current promotions!`;
    }

    selectNexaShopAgent(message) {
        let availableAgents = this.supportContext.supportAgents.filter(agent => agent.availability === 'online');
        
        if (availableAgents.length === 0) {
            availableAgents = this.supportContext.supportAgents;
        }

        let selectedAgent = availableAgents[0]; // default

        // Match agent expertise to issue
        if (this.matchesPattern(message, ['order', 'track', 'shipping', 'delivery'])) {
            selectedAgent = availableAgents.find(agent => agent.department === 'orders') || selectedAgent;
        } else if (this.matchesPattern(message, ['product', 'item', 'specification', 'recommend'])) {
            selectedAgent = availableAgents.find(agent => agent.department === 'products') || selectedAgent;
        } else if (this.matchesPattern(message, ['return', 'exchange', 'refund', 'defective'])) {
            selectedAgent = availableAgents.find(agent => agent.department === 'returns') || selectedAgent;
        } else if (this.matchesPattern(message, ['payment', 'billing', 'charge', 'invoice'])) {
            selectedAgent = availableAgents.find(agent => agent.department === 'billing') || selectedAgent;
        } else if (this.matchesPattern(message, ['website', 'app', 'login', 'technical'])) {
            selectedAgent = availableAgents.find(agent => agent.department === 'technical') || selectedAgent;
        }

        return {
            name: selectedAgent.name,
            avatar: selectedAgent.name.split(' ').map(n => n[0]).join(''),
            color: this.getAgentColor(selectedAgent.department),
            department: selectedAgent.department
        };
    }

    getAgentColor(department) {
        const colors = {
            "orders": "#10b981",
            "products": "#6366f1",
            "returns": "#f59e0b",
            "billing": "#ef4444",
            "technical": "#8b5cf6"
        };
        return colors[department] || "#6366f1";
    }

    matchesPattern(message, patterns) {
        return patterns.some(pattern => message.includes(pattern));
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
            const deptIcon = this.getDepartmentIcon(message.department);
            departmentBadge = `<span class="department-badge" style="background: ${this.getAgentColor(message.department)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin-left: 5px;">${deptIcon} ${message.department.toUpperCase()}</span>`;
        }

        let reactionsContent = '';
        if (message.reactions && Object.keys(message.reactions).length > 0) {
            reactionsContent = '<div class="message-reactions">';
            Object.entries(message.reactions).forEach(([emoji, users]) => {
                const isActive = this.currentUser && users.includes(this.currentUser.id);
                reactionsContent += `
                    <span class="reaction ${isActive ? 'active' : ''}" onclick="nexaShopSupport.toggleReaction('${message.id}', '${emoji}')">
                        ${emoji} ${users.length}
                    </span>
                `;
            });
            reactionsContent += '</div>';
        }

        messageEl.innerHTML = `
            <div class="message-content" oncontextmenu="nexaShopSupport.showMessageMenu(event, '${message.id}')">
                <div class="message-header">
                    <div class="message-avatar" style="background: ${message.color || '#6366f1'}">
                        ${message.isOwn ? (this.currentUser?.avatar || 'A') : (message.avatar || message.author.charAt(0).toUpperCase())}
                    </div>
                    <span class="message-author">${message.author}${departmentBadge}</span>
                    <span class="message-time">${time}</span>
                </div>
                ${message.content ? `<div class="message-text">${this.escapeHtml(message.content)}</div>` : ''}
                ${fileContent}
                ${reactionsContent}
            </div>
        `;

        // Remove welcome message if it exists and this is first real message
        const welcomeMsg = this.messagesContainer.querySelector('.welcome-message');
        if (welcomeMsg && this.messages.length === 1) {
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
                <button onclick="this.parentElement.parentElement.style.display='none'; nexaShopSupport.selectedFile=null;" style="background: none; border: none; cursor: pointer; color: #ef4444;">✕</button>
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
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
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
        
        const existingIndicator = document.getElementById('typingIndicator');
        if (existingIndicator) existingIndicator.remove();
        
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <span>${username} is typing...</span>
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
        const reactions = ['👍', '❤️', '😊', '🙏', '✅', '⭐'];
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        this.toggleReaction(messageId, randomReaction);
    }

    rerenderMessage(messageId) {
        const messageEl = document.querySelector(`[data-message-id="${messageId}"]`);
        const message = this.messages.find(m => m.id === messageId);
        if (messageEl && message) {
            const tempContainer = document.createElement('div');
            const tempMessage = { ...message };
            
            const originalContainer = this.messagesContainer;
            this.messagesContainer = tempContainer;
            this.renderMessage(tempMessage);
            this.messagesContainer = originalContainer;
            
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

    updateAgentsList() {
        if (!this.agentsList || !this.agentCount) return;
        
        this.agentsList.innerHTML = '';
        this.agentCount.textContent = this.users.size.toString();

        this.users.forEach(user => {
            const userEl = document.createElement('div');
            userEl.className = 'agent-item';
            const departmentIcon = user.department ? this.getDepartmentIcon(user.department) : '👤';
            const statusColor = user.status === 'Online' ? '#10b981' : '#f59e0b';
            
            userEl.innerHTML = `
                <div class="agent-avatar" style="background: ${this.getAgentColor(user.department)}">
                    ${user.avatar}
                    <div class="agent-status-indicator" style="background: ${statusColor}"></div>
                </div>
                <div class="agent-info">
                    <div class="agent-name">${user.name}</div>
                    <div class="agent-department">${departmentIcon} ${user.department} • ⭐${user.rating || '4.8'}</div>
                    <div class="agent-specialties">${user.responseTime || '< 2m'} avg response</div>
                </div>
            `;
            this.agentsList.appendChild(userEl);
        });
    }

    getDepartmentIcon(department) {
        const icons = {
            'orders': '📦',
            'products': '🛍️',
            'returns': '↩️',
            'billing': '💳',
            'technical': '🔧'
        };
        return icons[department] || '🎧';
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
                messages: this.messages.slice(-50),
                users: Array.from(this.users.entries()),
                settings: this.settings,
                currentRoom: this.currentRoom,
                supportContext: this.supportContext
            };
            localStorage.setItem('nexashop-support-data', JSON.stringify(data));
        } catch (error) {
            console.warn('Failed to save data to localStorage:', error);
        }
    }

    loadFromStorage() {
        try {
            const data = JSON.parse(localStorage.getItem('nexashop-support-data') || '{}');
            
            if (data.currentUser) {
                this.currentUser = data.currentUser;
            }
            
            if (data.messages && data.messages.length > 0) {
                this.messages = data.messages;
                this.messages.forEach(msg => this.renderMessage(msg));
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

    destroy() {
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        if (window.nexaShopSupport === this) {
            delete window.nexaShopSupport;
        }
    }
}

// Initialize the NexaShop support application
document.addEventListener('DOMContentLoaded', () => {
    new NexaShopSupport();
});
