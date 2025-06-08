class NexaShopSupport {
    constructor() {
        // Current time as provided: 2025-06-08 11:39:29 UTC
        this.currentDateTime = new Date('2025-06-08T11:39:29Z');
        
        this.currentUser = {
            id: 'user-asarekings',
            name: 'asarekings',
            email: 'asarekings@nexashop.com',
            avatar: 'A',
            loginTime: this.currentDateTime,
            preferences: {
                language: 'en',
                notifications: true,
                theme: 'light',
                aiAssistance: true,
                smartSuggestions: true
            }
        };
        
        this.messages = [];
        this.conversationContext = [];
        this.aiSuggestions = [];
        this.typingTimeout = null;
        this.selectedFile = null;
        
        this.settings = {
            darkMode: false,
            soundEffects: true,
            typingIndicators: true,
            autoScroll: true,
            voiceEnabled: false,
            desktopNotifications: false,
            aiMode: 'intelligent',
            aiPersonality: 'helpful'
        };
        
        this.ticketNumber = 'NEX-2025-0608-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        console.log('🤖 Initializing NexaShop AI Support System...');
        console.log('📅 Current Time: 2025-06-08 11:39:29 UTC');
        console.log('👤 User: asarekings logged in');
        console.log('🧠 AI Features: Advanced conversation analysis activated');
        
        this.initializeAIFeatures();
        this.initializeBasicFeatures();
        this.init();
    }

    // === AI FEATURES ===
    initializeAIFeatures() {
        this.aiEngine = {
            nlp: {
                sentimentAnalysis: (text) => this.analyzeSentiment(text),
                intentRecognition: (text) => this.recognizeIntent(text),
                entityExtraction: (text) => this.extractEntities(text)
            },
            conversation: {
                memory: new Map(),
                shortTermContext: [],
                userProfile: this.buildUserProfile(),
                conversationState: 'greeting'
            },
            responseGeneration: {
                templates: this.loadResponseTemplates(),
                dynamicContent: true,
                personalization: true,
                multiStep: true
            }
        };
        
        console.log('🧠 AI Engine initialized with advanced conversation capabilities');
    }

    // === SENTIMENT ANALYSIS ===
    analyzeSentiment(text) {
        const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'perfect', 'wonderful', 'fantastic', 'happy', 'satisfied', 'thank', 'appreciate'];
        const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'horrible', 'disappointed', 'frustrated', 'angry', 'upset', 'problem', 'issue', 'broken', 'not working'];
        const urgentWords = ['urgent', 'immediately', 'asap', 'emergency', 'critical', 'important', 'rush', 'quickly'];
        
        const words = text.toLowerCase().split(/\s+/);
        let sentiment = { positive: 0, negative: 0, urgent: 0, confidence: 0 };
        
        words.forEach(word => {
            if (positiveWords.includes(word)) sentiment.positive++;
            if (negativeWords.includes(word)) sentiment.negative++;
            if (urgentWords.includes(word)) sentiment.urgent++;
        });
        
        const total = sentiment.positive + sentiment.negative;
        if (total > 0) {
            sentiment.confidence = Math.min(1, total / words.length * 10);
            sentiment.overall = sentiment.positive > sentiment.negative ? 'positive' : 'negative';
        } else {
            sentiment.overall = 'neutral';
            sentiment.confidence = 0.5;
        }
        
        sentiment.isUrgent = sentiment.urgent > 0;
        return sentiment;
    }

    // === INTENT RECOGNITION ===
    recognizeIntent(text) {
        const intents = {
            order_inquiry: {
                patterns: ['order', 'tracking', 'shipment', 'delivery', 'when will', 'where is', 'status'],
                confidence: 0
            },
            product_info: {
                patterns: ['product', 'item', 'specification', 'feature', 'compare', 'recommend', 'suggest'],
                confidence: 0
            },
            technical_support: {
                patterns: ['not working', 'broken', 'error', 'bug', 'issue', 'problem', 'fix', 'help'],
                confidence: 0
            },
            billing_payment: {
                patterns: ['payment', 'billing', 'charge', 'refund', 'money', 'card', 'invoice'],
                confidence: 0
            },
            return_exchange: {
                patterns: ['return', 'exchange', 'replace', 'send back', 'defective', 'wrong item'],
                confidence: 0
            },
            general_inquiry: {
                patterns: ['hello', 'hi', 'help', 'question', 'info', 'about'],
                confidence: 0
            }
        };
        
        const textLower = text.toLowerCase();
        let bestIntent = 'general_inquiry';
        let maxConfidence = 0;
        
        Object.entries(intents).forEach(([intent, data]) => {
            let matches = 0;
            data.patterns.forEach(pattern => {
                if (textLower.includes(pattern)) {
                    matches++;
                }
            });
            
            const confidence = matches / data.patterns.length;
            intents[intent].confidence = confidence;
            
            if (confidence > maxConfidence) {
                maxConfidence = confidence;
                bestIntent = intent;
            }
        });
        
        return {
            intent: bestIntent,
            confidence: maxConfidence,
            allIntents: intents
        };
    }

    // === ENTITY EXTRACTION ===
    extractEntities(text) {
        const entities = {
            orderNumbers: [],
            productNames: [],
            amounts: []
        };
        
        // Extract order numbers
        const orderRegex = /NEX-\d{4}-\d{6}/gi;
        entities.orderNumbers = text.match(orderRegex) || [];
        
        // Extract product names
        const products = ['nexaphone', 'nexabook', 'nexapods', 'nexawatch', 'nexacharge'];
        products.forEach(product => {
            if (text.toLowerCase().includes(product)) {
                entities.productNames.push(product);
            }
        });
        
        // Extract amounts
        const amountRegex = /\$\d+\.?\d*/gi;
        entities.amounts = text.match(amountRegex) || [];
        
        return entities;
    }

    // === AI RESPONSE GENERATION ===
    generateAIResponse(userMessage) {
        const sentiment = this.analyzeSentiment(userMessage);
        const intent = this.recognizeIntent(userMessage);
        const entities = this.extractEntities(userMessage);
        
        const analysis = {
            sentiment: sentiment,
            intent: intent,
            entities: entities,
            urgencyLevel: sentiment.isUrgent ? 'high' : 'low',
            complexity: entities.orderNumbers.length + entities.productNames.length > 2 ? 'high' : 'medium'
        };
        
        console.log('🤖 AI Analysis:', analysis);
        
        let response = '';
        let agentName = this.selectBestAgent(analysis);
        
        // Generate response based on intent
        switch (intent.intent) {
            case 'order_inquiry':
                response = this.generateOrderResponse(analysis);
                break;
            case 'product_info':
                response = this.generateProductResponse(analysis);
                break;
            case 'technical_support':
                response = this.generateTechnicalResponse(analysis);
                break;
            case 'billing_payment':
                response = this.generateBillingResponse(analysis);
                break;
            case 'return_exchange':
                response = this.generateReturnResponse(analysis);
                break;
            case 'general_inquiry':
                if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
                    response = this.generateGreetingResponse();
                } else {
                    response = this.generateHelpResponse(analysis);
                }
                break;
            default:
                response = this.generateDefaultResponse(analysis);
        }
        
        // Personalize response
        response = this.personalizeResponse(response, analysis);
        
        return {
            response: response,
            agent: agentName,
            analysis: analysis,
            confidence: intent.confidence
        };
    }

    // === RESPONSE GENERATORS ===
    generateOrderResponse(analysis) {
        const currentTime = new Date().toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        });

        let response = `Hi asarekings! 📦 **Real-time Order Dashboard** (Updated: ${currentTime} UTC)\n\n`;
        
        response += `✅ **NEX-2025-001247** - $1,099.99\n`;
        response += `📱 NexaPhone Pro Max - DELIVERED\n`;
        response += `📅 Delivered: June 3, 2025\n`;
        response += `🔍 Tracking: NEX1234567890\n`;
        response += `⭐ Please rate your delivery experience\n\n`;
        
        response += `🚚 **NEX-2025-001248** - $1,599.99\n`;
        response += `💻 NexaBook Ultra 16 - IN TRANSIT\n`;
        response += `📍 Current Location: Distribution Center - Chicago, IL\n`;
        response += `📊 Progress: ▓▓▓▓▓▓▓░░░ 75%\n`;
        response += `📅 Est. Delivery: June 10, 2025\n`;
        response += `🔍 Tracking: NEX1234567891\n\n`;
        
        response += `⏳ **NEX-2025-001249** - $329.98\n`;
        response += `🎧 NexaPods Max + Wireless Charger - PROCESSING\n`;
        response += `🏭 Location: Fulfillment Center - Austin, TX\n`;
        response += `📊 Progress: ▓▓░░░░░░░░ 25%\n`;
        response += `📅 Est. Ship: June 9, 2025\n\n`;
        
        response += `📱 **Quick Actions:**\n`;
        response += `• Update delivery preferences\n`;
        response += `• Track packages in real-time\n`;
        response += `• Enable delivery notifications\n`;
        response += `• Contact delivery service directly\n\n`;
        
        response += `**Need help with any specific order?**`;
        
        return response;
    }

    generateProductResponse(analysis) {
        let response = `Hi asarekings! 🛍️ **NexaShop Product Showcase** (Live Inventory - 2025-06-08 11:39:29)\n\n`;
        
        response += `🔥 **Featured Products:**\n\n`;
        
        response += `📱 **NexaPhone Pro Max** - $1,099.99 ⭐4.9\n`;
        response += `📋 6.7" OLED Display, 512GB Storage, 5G Ready, Pro Camera System\n`;
        response += `📦 Stock: 247 units available (East Coast DC)\n`;
        response += `🔥 Trending Now! +15% sales this week\n\n`;
        
        response += `💻 **NexaBook Ultra 16** - $1,599.99 ⭐4.8\n`;
        response += `📋 M2 Pro Chip, 32GB RAM, 1TB SSD, 16.2" Liquid Retina Display\n`;
        response += `📦 Stock: 89 units available (West Coast DC)\n`;
        response += `💼 Perfect for professionals and creators\n\n`;
        
        response += `🎧 **NexaPods Max** - $249.99 ⭐4.7\n`;
        response += `📋 Spatial Audio, Active Noise Canceling, 30h Battery, Wireless Charging\n`;
        response += `📦 Stock: 156 units available (Central DC)\n`;
        response += `🔥 Trending! Perfect companion for your devices\n\n`;
        
        response += `💰 **Current Deals:**\n`;
        response += `🏷️ NexaPods Max: 20% off - Save $50 (Limited time)\n`;
        response += `🏷️ NexaWatch Series X: 15% off - Save $75 (Ends June 12)\n\n`;
        
        response += `🎯 **Personalized for You:**\n`;
        response += `• Based on your previous purchases\n`;
        response += `• Premium Member exclusive deals\n`;
        response += `• Early access to new releases\n\n`;
        
        response += `**Want specific product details or comparisons?**`;
        
        return response;
    }

    generateTechnicalResponse(analysis) {
        let response = `Hi asarekings! 🔧 **Technical Support Center** (2025-06-08 11:39:29)\n\n`;
        
        response += `🌐 **System Status (Real-time):**\n`;
        response += `• Website: ✅ Operational (99.99% uptime)\n`;
        response += `• Mobile App: ✅ Operational (v3.2.1)\n`;
        response += `• Payment System: ✅ Operational\n`;
        response += `• Order Processing: ✅ Operational\n`;
        response += `• Customer Chat: ✅ Operational (You're here!)\n\n`;
        
        response += `🔧 **Common Solutions:**\n\n`;
        response += `**📱 Device Issues:**\n`;
        response += `1️⃣ Restart your device (hold power + volume down for 10 seconds)\n`;
        response += `2️⃣ Check for software updates\n`;
        response += `3️⃣ Clear cache and temporary files\n`;
        response += `4️⃣ Reset network settings if connectivity issues\n\n`;
        
        response += `**💻 Website/App Issues:**\n`;
        response += `1️⃣ Clear browser cache and cookies\n`;
        response += `2️⃣ Try incognito/private browsing mode\n`;
        response += `3️⃣ Update your browser to latest version\n`;
        response += `4️⃣ Disable browser extensions temporarily\n\n`;
        
        response += `**📦 Order/Account Issues:**\n`;
        response += `1️⃣ Log out and log back in\n`;
        response += `2️⃣ Check email for order confirmations\n`;
        response += `3️⃣ Verify payment method is active\n`;
        response += `4️⃣ Contact us if issues persist\n\n`;
        
        response += `🎯 **Advanced Support:**\n`;
        response += `• Remote diagnostic tools available\n`;
        response += `• Video call troubleshooting\n`;
        response += `• Expert technician consultation\n`;
        response += `• Hardware replacement program\n\n`;
        
        response += `**What specific technical issue can I help you resolve?**`;
        
        return response;
    }

    generateBillingResponse(analysis) {
        let response = `Hi asarekings! 💳 **NexaShop Billing Center** (2025-06-08 11:39:29)\n\n`;
        
        response += `🔒 **Your Account Security:**\n`;
        response += `• 256-bit SSL encryption active\n`;
        response += `• PCI DSS Level 1 compliant\n`;
        response += `• Fraud protection enabled\n`;
        response += `• Zero-liability guarantee\n\n`;
        
        response += `📊 **Account Summary (asarekings):**\n`;
        response += `• Membership: Premium Member 🌟\n`;
        response += `• Member Since: January 2024\n`;
        response += `• Total Orders: 12 orders\n`;
        response += `• Lifetime Spent: $2,929.97\n`;
        response += `• Savings from Deals: $487.23\n`;
        response += `• Cashback Earned: $58.60\n`;
        response += `• Available Store Credit: $25.00\n\n`;
        
        response += `💰 **Payment Methods on File:**\n`;
        response += `• Visa ending in 4521 (Primary)\n`;
        response += `• PayPal (verified)\n`;
        response += `• Apple Pay (enabled)\n`;
        response += `• NexaShop Store Credit: $25.00\n\n`;
        
        response += `⚡ **Quick Actions:**\n`;
        response += `• Update payment methods\n`;
        response += `• Download invoices/receipts\n`;
        response += `• View transaction history\n`;
        response += `• Set up automatic payments\n`;
        response += `• Request refund status\n\n`;
        
        response += `🎯 **Current Benefits:**\n`;
        response += `• 2% cashback on all purchases this month\n`;
        response += `• Free premium shipping (activated)\n`;
        response += `• Early access to flash sales\n`;
        response += `• Birthday month 20% discount (coming soon!)\n\n`;
        
        response += `**What billing question can I help you with?**`;
        
        return response;
    }

    generateReturnResponse(analysis) {
        let response = `Hi asarekings! ↩️ **NexaShop Returns & Exchanges** (2025-06-08 11:39:29)\n\n`;
        
        response += `✨ **Our Return Promise:**\n`;
        response += `• 30-day return window (extended for electronics)\n`;
        response += `• 100% free return shipping\n`;
        response += `• No restocking fees ever\n`;
        response += `• 24-hour return processing\n`;
        response += `• Full refund guarantee\n\n`;
        
        response += `🚀 **Easy Return Process:**\n\n`;
        response += `**STEP 1: Initiate Return**\n`;
        response += `• Go to "My Orders" in your account\n`;
        response += `• Click "Return Item" next to your order\n`;
        response += `• Select reason for return\n`;
        response += `• Get instant approval\n\n`;
        
        response += `**STEP 2: Ship Back**\n`;
        response += `• Print prepaid return label (QR code)\n`;
        response += `• Package item securely\n`;
        response += `• Drop off at any shipping location\n`;
        response += `• Track return in real-time\n\n`;
        
        response += `**STEP 3: Get Refund**\n`;
        response += `• 24-hour inspection upon receipt\n`;
        response += `• Instant refund approval\n`;
        response += `• 2-3 business days to your account\n`;
        response += `• Email confirmation with details\n\n`;
        
        response += `📊 **Your Return History:**\n`;
        response += `• Total returns: 2 (Excellent customer!)\n`;
        response += `• Average processing: 1.5 days\n`;
        response += `• Customer satisfaction: 5/5 ⭐\n`;
        response += `• VIP return status: Activated\n\n`;
        
        response += `🔄 **Exchange Options:**\n`;
        response += `• Same product, different size/color\n`;
        response += `• Upgrade to newer model\n`;
        response += `• Store credit with 10% bonus\n`;
        response += `• Cross-category exchanges allowed\n\n`;
        
        response += `**Which item would you like to return or exchange?**`;
        
        return response;
    }

    generateGreetingResponse() {
        const currentTime = new Date('2025-06-08T11:39:29Z').toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
        
        return `Hello asarekings! 👋 Welcome back to NexaShop Support!\n\n🎫 **Support Session Details:**\n• Ticket Number: ${this.ticketNumber}\n• Current Time: ${currentTime}\n• Support Level: Premium Member 🌟\n• AI Assistant: Active 🤖\n\n🌟 **I'm here to help with:**\n• 📦 Order tracking & delivery updates\n• 🛍️ Product information & recommendations\n• 🔄 Returns & exchanges  \n• 💳 Billing & payment questions\n• 🔧 Technical support & troubleshooting\n• 💬 General questions & assistance\n\n**What can I help you with today?** I'm committed to providing you with exceptional, AI-powered service! ⚡`;
    }

    generateHelpResponse(analysis) {
        return `I'd be happy to help you with that! 😊\n\n🎯 **I can assist you with:**\n\n📦 **Orders & Shipping**\n• Track packages and delivery updates\n• Modify delivery preferences\n• Handle shipping issues\n\n🛍️ **Products & Shopping**\n• Product recommendations\n• Specifications and comparisons\n• Availability and pricing\n\n💳 **Account & Billing**\n• Payment issues and methods\n• Account settings and preferences\n• Refunds and billing questions\n\n🔧 **Technical Support**\n• Device troubleshooting\n• Website/app issues\n• Setup and configuration help\n\n↩️ **Returns & Exchanges**\n• Easy return process\n• Exchange options\n• Refund status\n\n**What specific area would you like help with?** I'll provide detailed, step-by-step assistance!`;
    }

    generateDefaultResponse(analysis) {
        return `Thank you for contacting NexaShop Support! 🛍️\n\nI understand you need assistance, and I'm here to help. Let me connect you with the right solution.\n\n🤖 **AI Analysis Summary:**\n• Confidence Level: ${Math.round(analysis.intent.confidence * 100)}%\n• Priority Level: ${analysis.urgencyLevel}\n• Issue Complexity: ${analysis.complexity}\n\n🎯 **Recommended Actions:**\n• Let me know more specific details about your question\n• Browse our help topics above\n• Ask me anything - I'm here to help!\n\n**Please tell me more about what you need help with, and I'll provide a detailed solution!**`;
    }

    // === AGENT SELECTION ===
    selectBestAgent(analysis) {
        const agents = {
            'Sarah Chen': { specialties: ['orders', 'shipping'], personality: 'efficient' },
            'Mike Rodriguez': { specialties: ['technical', 'troubleshooting'], personality: 'analytical' },
            'Emma Wilson': { specialties: ['products', 'recommendations'], personality: 'enthusiastic' },
            'Alex Thompson': { specialties: ['billing', 'payments'], personality: 'precise' },
            'Lisa Chang': { specialties: ['returns', 'complaints'], personality: 'empathetic' }
        };
        
        const intentToSpecialty = {
            'order_inquiry': 'orders',
            'technical_support': 'technical',
            'product_info': 'products',
            'billing_payment': 'billing',
            'return_exchange': 'returns'
        };
        
        const requiredSpecialty = intentToSpecialty[analysis.intent.intent];
        
        if (analysis.sentiment.overall === 'negative') {
            return 'Lisa Chang'; // Most empathetic
        }
        
        if (requiredSpecialty) {
            const matchingAgent = Object.entries(agents).find(([name, agent]) => 
                agent.specialties.includes(requiredSpecialty)
            );
            if (matchingAgent) return matchingAgent[0];
        }
        
        return 'Sarah Chen'; // Default agent
    }

    // === PERSONALIZATION ===
    personalizeResponse(response, analysis) {
        // Add empathy for negative sentiment
        if (analysis.sentiment.overall === 'negative') {
            response = `I sincerely apologize for any inconvenience, asarekings. ${response}`;
        }
        
        // Add urgency handling
        if (analysis.urgencyLevel === 'high') {
            response = `🚨 I understand this is urgent. ${response}\n\n**I'm prioritizing your request for immediate resolution.**`;
        }
        
        return response;
    }

    // === BASIC FEATURES ===
    initializeBasicFeatures() {
        this.inventory = {
            "nexaphone-pro": { stock: 247, warehouse: "East Coast DC", trending: true },
            "nexabook-ultra": { stock: 89, warehouse: "West Coast DC", trending: false },
            "nexapods-max": { stock: 156, warehouse: "Central DC", trending: true }
        };
        
        this.orderManager = {
            orders: [
                {
                    id: "NEX-2025-001247",
                    status: "delivered",
                    items: ["NexaPhone Pro Max"],
                    total: 1099.99,
                    deliveryProgress: 100
                },
                {
                    id: "NEX-2025-001248", 
                    status: "in_transit",
                    items: ["NexaBook Ultra 16"],
                    total: 1599.99,
                    deliveryProgress: 75
                }
            ]
        };
        
        this.performance = {
            responseTime: [],
            messagesSent: 0,
            messagesReceived: 0,
            trackResponseTime: (startTime) => {
                const duration = Date.now() - startTime;
                this.performance.responseTime.push(duration);
                if (this.performance.responseTime.length > 20) {
                    this.performance.responseTime.shift();
                }
            },
            getAverageResponseTime: () => {
                const times = this.performance.responseTime;
                return times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
            }
        };
        
        this.security = {
            validateInput: (input) => {
                const dangerous = /<script|javascript:|data:/i;
                return !dangerous.test(input);
            },
            sanitizeInput: (input) => input.replace(/[<>]/g, '').trim(),
            rateLimiting: { checkLimit: () => true }
        };
        
        this.analytics = {
            interactionCount: 0,
            trackInteraction: (action, category, data = {}) => {
                this.analytics.interactionCount++;
                console.log('📈 Interaction tracked:', { action, category, data });
            }
        };
        
        console.log('✅ Basic features initialized');
    }

    buildUserProfile() {
        return {
            name: 'asarekings',
            membershipLevel: 'Premium',
            totalOrders: 12,
            satisfaction: 4.8
        };
    }

    loadResponseTemplates() {
        return {
            greeting: "Hello {name}! Welcome back to NexaShop.",
            problem_solving: "I understand you're experiencing {issue}. Let me help.",
            empathy: "I sincerely apologize for the inconvenience, {name}."
        };
    }

    // === INITIALIZATION ===
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.showWelcomeMessage();
        
        window.nexaShopSupport = this;
        
        console.log('✅ NexaShop AI Support System initialized successfully');
        console.log('🤖 AI Features: Sentiment analysis, intent recognition active');
        this.showNotification('🤖 AI-powered support ready! Try asking me anything.');
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
            this.messageInput.addEventListener('input', () => this.autoResize());
        }

        if (this.fileBtn) {
            this.fileBtn.addEventListener('click', () => this.fileInput?.click());
        }

        if (this.fileInput) {
            this.fileInput.addEventListener('change', (e) => {
                if (e.target.files[0]) this.handleFileSelect(e.target.files[0]);
            });
        }

        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        console.log('✅ Event listeners configured');
    }

    showWelcomeMessage() {
        if (!this.messagesContainer) return;
        
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'welcome-message';
        welcomeMsg.innerHTML = `
            <div class="welcome-header">
                <h3>🛍️ Welcome to NexaShop AI Support!</h3>
                <div style="margin: 16px 0; padding: 16px; background: rgba(59, 130, 246, 0.05); border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.1);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Support Ticket:</span>
                        <span style="font-weight: 600;">${this.ticketNumber}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Current Time:</span>
                        <span style="font-weight: 600;">2025-06-08 11:39:29 UTC</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Customer:</span>
                        <span style="font-weight: 600;">asarekings (Premium Member 🌟)</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280; font-weight: 500;">AI Assistant:</span>
                        <span style="font-weight: 600;">🤖 Active & Learning</span>
                    </div>
                </div>
                <p style="margin-bottom: 20px;">Hi asarekings! I'm your AI-powered support assistant. How can I help you today?</p>
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
                <h4>🤖 AI Features Active:</h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 12px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px; border-radius: 8px; text-align: center; font-size: 12px;">
                        <div style="font-weight: 600;">Sentiment Analysis</div>
                        <div style="opacity: 0.9;">Emotion Detection</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 12px; border-radius: 8px; text-align: center; font-size: 12px;">
                        <div style="font-weight: 600;">Intent Recognition</div>
                        <div style="opacity: 0.9;">Smart Understanding</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 12px; border-radius: 8px; text-align: center; font-size: 12px;">
                        <div style="font-weight: 600;">Context Memory</div>
                        <div style="opacity: 0.9;">Conversation Flow</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 12px; border-radius: 8px; text-align: center; font-size: 12px;">
                        <div style="font-weight: 600;">Smart Suggestions</div>
                        <div style="opacity: 0.9;">Proactive Help</div>
                    </div>
                </div>
            </div>

            <div style="margin-top: 20px; padding: 16px; background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%); border-radius: 12px; border: 1px solid rgba(34, 197, 94, 0.2);">
                <p><strong>🎯 Try these AI-powered commands:</strong></p>
                <p style="font-size: 14px; margin: 8px 0;">• "I'm frustrated with my order" - <em>AI detects emotion & provides empathetic response</em></p>
                <p style="font-size: 14px; margin: 8px 0;">• "Can you help me?" - <em>AI analyzes intent & offers specific solutions</em></p>
                <p style="font-size: 14px; margin: 8px 0;">• "I need this urgently" - <em>AI detects urgency & prioritizes response</em></p>
                <p style="font-size: 14px; margin: 8px 0;">• Ask complex questions - <em>AI provides step-by-step solutions</em></p>
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

        console.log('📤 Message sent:', content);

        // Generate AI response
        setTimeout(() => {
            this.generateEnhancedAIResponse(content, startTime);
        }, 800 + Math.random() * 1200);
    }

    generateEnhancedAIResponse(userMessage, startTime) {
        console.log('🤖 Generating AI response for:', userMessage);
        
        try {
            // Generate response using AI engine
            const aiResponse = this.generateAIResponse(userMessage);
            
            console.log('🧠 AI Response generated:', aiResponse);
            
            this.showTypingIndicator(aiResponse.agent);

            setTimeout(() => {
                this.hideTypingIndicator();
                
                const botMessage = {
                    id: this.generateId(),
                    content: aiResponse.response,
                    author: aiResponse.agent,
                    timestamp: Date.now(),
                    isOwn: false,
                    department: this.getDepartmentFromIntent(aiResponse.analysis.intent.intent),
                    aiGenerated: true,
                    confidence: aiResponse.confidence
                };

                this.messages.push(botMessage);
                this.renderMessage(botMessage);
                this.scrollToBottom();
                this.performance.messagesReceived++;
                this.performance.trackResponseTime(startTime);
                
                const confidencePercent = Math.round(aiResponse.confidence * 100);
                this.showNotification(`🤖 ${aiResponse.agent} responded (AI: ${confidencePercent}% confidence)`);
                
                console.log('✅ AI response delivered successfully');
            }, 1200 + Math.random() * 800);
        } catch (error) {
            console.error('❌ Error generating AI response:', error);
            
            // Fallback response
            setTimeout(() => {
                const fallbackMessage = {
                    id: this.generateId(),
                    content: "I apologize, but I'm experiencing a temporary issue. Let me connect you with a human agent who can assist you right away. Thank you for your patience!",
                    author: 'System',
                    timestamp: Date.now(),
                    isOwn: false,
                    department: 'support'
                };
                
                this.messages.push(fallbackMessage);
                this.renderMessage(fallbackMessage);
                this.scrollToBottom();
                
                this.showNotification('⚠️ Temporary AI issue - Human agent will assist');
            }, 1000);
        }
    }

    getDepartmentFromIntent(intent) {
        const mapping = {
            'order_inquiry': 'orders',
            'technical_support': 'technical',
            'product_info': 'products',
            'billing_payment': 'billing',
            'return_exchange': 'returns',
            'general_inquiry': 'support'
        };
        return mapping[intent] || 'support';
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

        let aiIndicator = '';
        if (message.aiGenerated) {
            const confidence = Math.round(message.confidence * 100);
            aiIndicator = `<span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2px 6px; border-radius: 4px; font-size: 9px; margin-left: 5px;">🤖 AI ${confidence}%</span>`;
        }

        messageEl.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <div class="message-avatar" style="background: ${departmentColor}">
                        ${avatar}
                    </div>
                    <span class="message-author">${message.author}${aiIndicator}</span>
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
            <span>🤖 ${agentName} is analyzing and crafting your response...</span>
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
            }, 4000);
        }
    }

    toggleTheme() {
        this.settings.darkMode = !this.settings.darkMode;
        document.documentElement.setAttribute('data-theme', this.settings.darkMode ? 'dark' : 'light');
        if (this.themeToggle) {
            this.themeToggle.textContent = this.settings.darkMode ? '☀️' : '🌙';
        }
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
    console.log('🚀 DOM loaded, initializing NexaShop AI Support...');
    console.log('📅 Current Time: 2025-06-08 11:39:29 UTC');
    console.log('👤 User: asarekings logged in');
    console.log('🤖 Starting AI conversation engine...');
    try {
        new NexaShopSupport();
        console.log('✅ NexaShop AI Support initialized successfully');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
});

if (document.readyState === 'loading') {
    // Still loading, wait for DOMContentLoaded
} else {
    console.log('DOM already loaded, initializing AI system immediately...');
    try {
        new NexaShopSupport();
    } catch (error) {
        console.error('❌ Immediate initialization error:', error);
    }
}
