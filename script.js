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
        
        // Current date and time
        this.currentDateTime = new Date('2025-06-08T10:07:50Z');
        
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
                electronics: {
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
                    },
                    "nexawatch-series": {
                        name: "NexaWatch Series X",
                        price: 499.99,
                        category: "wearables",
                        inStock: false,
                        rating: 4.6,
                        specs: "Always-On Display, Health Sensors, 36h Battery",
                        warranty: "2 years"
                    }
                },
                lifestyle: {
                    "premium-backpack": {
                        name: "NexaPack Pro Travel",
                        price: 149.99,
                        category: "accessories",
                        inStock: true,
                        rating: 4.5,
                        specs: "Water-resistant, 15.6\" Laptop Compartment, USB Charging",
                        warranty: "1 year"
                    },
                    "wireless-charger": {
                        name: "NexaCharge Wireless Pad",
                        price: 79.99,
                        category: "accessories",
                        inStock: true,
                        rating: 4.6,
                        specs: "15W Fast Charging, Qi Compatible, LED Indicator",
                        warranty: "1 year"
                    }
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
        this.quickActions = document.getElementById('quickActions');
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

        // Quick action buttons
        this.setupQuickActions();
    }

    setupQuickActions() {
        const quickActionBtns = document.querySelectorAll('.quick-action-btn');
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.handleQuickAction(action);
            });
        });
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
        this.supportContext.ticketNumber = 'NEX-' + this.currentDateTime.getFullYear() + '-' + 
                                          String(this.currentDateTime.getMonth() + 1).padStart(2, '0') + 
                                          String(this.currentDateTime.getDate()).padStart(2, '0') + '-' +
                                          Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
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
            
            <div class="quick-actions" id="quickActions">
                <h4>🚀 Quick Actions:</h4>
                <div class="action-grid">
                    <button class="quick-action-btn" data-action="check-order">
                        <span style="font-size: 20px;">📦</span>
                        Check Order Status
                    </button>
                    <button class="quick-action-btn" data-action="track-shipment">
                        <span style="font-size: 20px;">🚚</span>
                        Track My Package
                    </button>
                    <button class="quick-action-btn" data-action="return-item">
                        <span style="font-size: 20px;">↩️</span>
                        Return & Exchange
                    </button>
                    <button class="quick-action-btn" data-action="product-info">
                        <span style="font-size: 20px;">💡</span>
                        Product Questions
                    </button>
                    <button class="quick-action-btn" data-action="billing-issue">
                        <span style="font-size: 20px;">💳</span>
                        Billing Support
                    </button>
                    <button class="quick-action-btn" data-action="technical-help">
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
        this.setupQuickActions();
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
            this.showNotification(`Hello ${this.currentUser.name}! Ticket ${this.supportContext.ticketNumber} ready`);
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

        // Auto-create user if not exists
        if (!this.currentUser) {
            this.currentUser = {
                id: this.generateId(),
                name: 'asarekings',
                email: 'asarekings@nexashop.com',
                avatar: 'A',
                joinTime: Date.now()
            };
        }

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
                this.showDesktopNotification(`${selectedAgent.name} (NexaShop ${selectedAgent.department})`, response.substring(0, 100) + '...');
            }
        }, 1500 + Math.random() * 1500);
    }

    getNexaShopResponse(message) {
        const customerName = this.currentUser?.name || 'asarekings';
        const ticketNumber = this.supportContext.ticketNumber;
        const currentDate = this.currentDateTime.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
        
        // Greeting responses
        if (this.matchesPattern(message, ['hello', 'hi', 'hey', 'help', 'support'])) {
            return `Hello ${customerName}! 👋 Welcome to NexaShop's premium support experience.\n\n🎫 **Your ticket:** ${ticketNumber}\n📅 **Date:** ${currentDate}\n\n🌟 **I'm here to provide you with exceptional service!** Whether you need help with:\n\n• 📦 Order tracking and delivery updates\n• 🔄 Returns and exchanges\n• 💡 Product recommendations and specs\n• 💳 Billing and payment assistance\n• 🔧 Technical support\n\n**What can I help you with today?** I'm committed to resolving your inquiry quickly and efficiently! ⚡`;
        }

        // Order status and tracking
        if (this.matchesPattern(message, ['order', 'status', 'track', 'tracking', 'shipment', 'delivery', 'package'])) {
            this.supportContext.issueCategory = 'orders';
            return this.getNexaTrackingInfo();
        }

        // Product information and recommendations
        if (this.matchesPattern(message, ['product', 'item', 'nexa', 'phone', 'laptop', 'pods', 'watch', 'charger'])) {
            this.supportContext.issueCategory = 'products';
            return this.getNexaProductInfo(message);
        }

        // Returns and exchanges
        if (this.matchesPattern(message, ['return', 'exchange', 'refund', 'send back', 'defective', 'broken', 'wrong item'])) {
            this.supportContext.issueCategory = 'returns';
            return this.getNexaReturnInfo(message);
        }

        // Billing and payment
        if (this.matchesPattern(message, ['payment', 'billing', 'charge', 'card', 'invoice', 'pay', 'credit', 'paypal'])) {
            this.supportContext.issueCategory = 'billing';
            return this.getNexaBillingInfo(message);
        }

        // Technical support
        if (this.matchesPattern(message, ['website', 'app', 'login', 'password', 'account', 'bug', 'error', 'not working'])) {
            this.supportContext.issueCategory = 'technical';
            return this.getNexaTechnicalHelp(message);
        }

        // Gratitude
        if (this.matchesPattern(message, ['thank', 'thanks', 'appreciate', 'helpful', 'great'])) {
            return `You're absolutely welcome, ${customerName}! 😊 It's been my pleasure to assist you with ticket ${ticketNumber}.\n\n🌟 **Your satisfaction is our priority!** Is there anything else I can help you with today?\n\n📝 **Before you go:**\n• You'll receive an email summary of our chat\n• Your ticket remains open for 24 hours for follow-up questions\n• Rate your experience to help us improve\n\n💙 Thank you for choosing NexaShop - where innovation meets exceptional service!`;
        }

        // Default smart response
        return this.getNexaSmartResponse(message);
    }

    getNexaTrackingInfo() {
        const orders = this.supportContext.orderStatuses;
        let response = `📦 **NexaShop Order Tracking:**\n\n`;
        
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

    getNexaProductInfo(message) {
        let response = `🛍️ **NexaShop Premium Products:**\n\n`;
        
        // Check for specific NexaShop products
        const products = this.supportContext.productCatalog;
        let foundProduct = null;
        
