class NexaShopSupport {
    constructor() {
        // Current time as provided: 2025-06-08 12:45:44 UTC
        this.currentDateTime = new Date('2025-06-08T12:45:44Z');
        
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
        
        console.log('🤖 Initializing NexaShop Mini ChatGPT AI Support...');
        console.log('📅 Current Time: 2025-06-08 12:45:44 UTC');
        console.log('👤 User: asarekings logged in');
        console.log('🧠 Mini ChatGPT Engine: Advanced contextual responses activated');
        
        this.initializeMiniChatGPT();
        this.initializeBasicFeatures();
        this.init();
    }

    // === MINI CHATGPT ENGINE ===
    initializeMiniChatGPT() {
        this.miniChatGPT = {
            // Knowledge base for contextual understanding
            knowledgeBase: {
                ecommerce: {
                    orders: ['track', 'tracking', 'order', 'shipment', 'delivery', 'package', 'status', 'update', 'list'],
                    products: ['product', 'item', 'phone', 'laptop', 'nexaphone', 'nexabook', 'nexapods', 'specs', 'features'],
                    billing: ['payment', 'billing', 'charge', 'refund', 'card', 'invoice', 'account', 'money'],
                    returns: ['return', 'exchange', 'replace', 'send back', 'defective', 'wrong'],
                    technical: ['broken', 'not working', 'error', 'bug', 'fix', 'troubleshoot', 'setup', 'install']
                },
                conversational: {
                    greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
                    questions: ['how', 'what', 'when', 'where', 'why', 'can you', 'could you', 'would you'],
                    requests: ['please', 'help', 'assist', 'support', 'need', 'want', 'looking for']
                }
            },
            
            // Context understanding engine
            contextEngine: {
                analyzeContext: (text, conversationHistory) => {
                    return this.analyzeFullContext(text, conversationHistory);
                },
                
                generateResponse: (context) => {
                    return this.generateContextualResponse(context);
                },
                
                maintainPersonality: (response) => {
                    return this.applyPersonality(response);
                }
            },
            
            // Response generation patterns
            responsePatterns: {
                direct_answer: (question, data) => this.generateDirectAnswer(question, data),
                conversational: (text) => this.generateConversationalResponse(text),
                informational: (topic, details) => this.generateInformationalResponse(topic, details),
                problem_solving: (issue) => this.generateProblemSolvingResponse(issue),
                empathetic: (sentiment, content) => this.generateEmpatheticResponse(sentiment, content)
            }
        };
        
        console.log('🧠 Mini ChatGPT Engine initialized with advanced contextual understanding');
    }

    // === ADVANCED CONTEXT ANALYSIS ===
    analyzeFullContext(text, conversationHistory = []) {
        const textLower = text.toLowerCase();
        
        // Multi-layer analysis
        const context = {
            // Basic NLP
            intent: this.detectIntent(textLower),
            entities: this.extractEntities(text),
            sentiment: this.analyzeSentiment(text),
            
            // Advanced understanding
            questionType: this.identifyQuestionType(textLower),
            urgency: this.assessUrgency(textLower),
            specificity: this.assessSpecificity(textLower),
            
            // Conversational context
            conversationFlow: this.analyzeConversationFlow(conversationHistory),
            userNeed: this.identifyUserNeed(textLower),
            expectedResponseType: this.determineResponseType(textLower),
            
            // Meta information
            originalText: text,
            processedText: textLower,
            timestamp: Date.now(),
            confidence: 0
        };
        
        // Calculate overall confidence
        context.confidence = this.calculateContextConfidence(context);
        
        console.log('🔍 Full Context Analysis:', context);
        
        return context;
    }

    // === INTENT DETECTION (Enhanced) ===
    detectIntent(text) {
        const intentKeywords = {
            order_inquiry: {
                primary: ['order', 'track', 'tracking', 'package', 'shipment', 'delivery'],
                secondary: ['status', 'update', 'list', 'where is', 'when will'],
                phrases: ['order list', 'order update', 'track package', 'delivery status'],
                weight: 0
            },
            product_inquiry: {
                primary: ['product', 'phone', 'laptop', 'nexaphone', 'nexabook'],
                secondary: ['specs', 'features', 'price', 'available', 'compare'],
                phrases: ['product info', 'phone specs', 'laptop features'],
                weight: 0
            },
            billing_inquiry: {
                primary: ['payment', 'billing', 'charge', 'refund', 'money'],
                secondary: ['card', 'invoice', 'account', 'transaction'],
                phrases: ['billing question', 'payment issue', 'refund status'],
                weight: 0
            },
            return_inquiry: {
                primary: ['return', 'exchange', 'replace', 'send back'],
                secondary: ['defective', 'wrong', 'damaged', 'unsatisfied'],
                phrases: ['return item', 'exchange product', 'send back'],
                weight: 0
            },
            technical_inquiry: {
                primary: ['broken', 'not working', 'error', 'bug', 'fix'],
                secondary: ['troubleshoot', 'setup', 'install', 'configure'],
                phrases: ['not working', 'technical issue', 'setup help'],
                weight: 0
            },
            general_conversation: {
                primary: ['hello', 'hi', 'help', 'question', 'thanks'],
                secondary: ['please', 'can you', 'would you', 'need'],
                phrases: ['hello there', 'can you help', 'thank you'],
                weight: 0
            }
        };
        
        // Calculate weights for each intent
        Object.entries(intentKeywords).forEach(([intent, keywords]) => {
            let weight = 0;
            
            // Primary keywords (high weight)
            keywords.primary.forEach(keyword => {
                if (text.includes(keyword)) weight += 3;
            });
            
            // Secondary keywords (medium weight)
            keywords.secondary.forEach(keyword => {
                if (text.includes(keyword)) weight += 2;
            });
            
            // Phrase matching (highest weight)
            keywords.phrases.forEach(phrase => {
                if (text.includes(phrase)) weight += 5;
            });
            
            intentKeywords[intent].weight = weight;
        });
        
        // Find highest weighted intent
        const topIntent = Object.entries(intentKeywords)
            .sort(([,a], [,b]) => b.weight - a.weight)[0];
        
        return {
            intent: topIntent[0],
            confidence: Math.min(topIntent[1].weight / 10, 1),
            allIntents: intentKeywords
        };
    }

    // === QUESTION TYPE IDENTIFICATION ===
    identifyQuestionType(text) {
        const questionPatterns = {
            information_seeking: ['what', 'which', 'who', 'where', 'when'],
            instruction_seeking: ['how', 'how to', 'can you show', 'guide me'],
            status_checking: ['status', 'update', 'progress', 'is my', 'has my'],
            problem_reporting: ['not working', 'broken', 'error', 'issue', 'problem'],
            request_making: ['i need', 'i want', 'can you', 'please', 'help me'],
            conversational: ['hello', 'hi', 'thanks', 'thank you', 'goodbye']
        };
        
        for (const [type, patterns] of Object.entries(questionPatterns)) {
            for (const pattern of patterns) {
                if (text.includes(pattern)) {
                    return type;
                }
            }
        }
        
        return 'general';
    }

    // === USER NEED IDENTIFICATION ===
    identifyUserNeed(text) {
        const needPatterns = {
            immediate_information: ['where is', 'when will', 'status of', 'update on'],
            step_by_step_help: ['how to', 'guide me', 'walk me through', 'show me'],
            problem_resolution: ['fix', 'solve', 'resolve', 'not working', 'broken'],
            account_management: ['change', 'update', 'modify', 'cancel', 'add'],
            purchase_assistance: ['buy', 'purchase', 'order', 'add to cart', 'checkout'],
            support_escalation: ['speak to', 'transfer', 'human', 'manager', 'escalate']
        };
        
        for (const [need, patterns] of Object.entries(needPatterns)) {
            for (const pattern of patterns) {
                if (text.includes(pattern)) {
                    return need;
                }
            }
        }
        
        return 'general_assistance';
    }

    // === RESPONSE TYPE DETERMINATION ===
    determineResponseType(text) {
        const userNeed = this.identifyUserNeed(text);
        const questionType = this.identifyQuestionType(text);
        
        if (userNeed === 'immediate_information') return 'direct_data';
        if (userNeed === 'step_by_step_help') return 'instructional';
        if (userNeed === 'problem_resolution') return 'problem_solving';
        if (questionType === 'status_checking') return 'status_report';
        if (questionType === 'conversational') return 'conversational';
        
        return 'comprehensive';
    }

    // === CONTEXTUAL RESPONSE GENERATION ===
    generateContextualResponse(context) {
        console.log('🤖 Generating contextual response for:', context);
        
        const { intent, questionType, userNeed, expectedResponseType, originalText } = context;
        
        // Route to specific response generator based on context
        switch (intent.intent) {
            case 'order_inquiry':
                return this.generateSmartOrderResponse(context);
            case 'product_inquiry':
                return this.generateSmartProductResponse(context);
            case 'billing_inquiry':
                return this.generateSmartBillingResponse(context);
            case 'return_inquiry':
                return this.generateSmartReturnResponse(context);
            case 'technical_inquiry':
                return this.generateSmartTechnicalResponse(context);
            default:
                return this.generateSmartConversationalResponse(context);
        }
    }

    // === SMART ORDER RESPONSE (Context-Aware) ===
    generateSmartOrderResponse(context) {
        const { originalText, userNeed, questionType } = context;
        const text = originalText.toLowerCase();
        
        // Determine specific order need
        let responseType = 'general_order_info';
        
        if (text.includes('list') || text.includes('all orders') || text.includes('order list')) {
            responseType = 'order_list';
        } else if (text.includes('track') || text.includes('tracking')) {
            responseType = 'tracking_info';
        } else if (text.includes('status') || text.includes('update')) {
            responseType = 'status_update';
        } else if (text.includes('delivery') || text.includes('when will')) {
            responseType = 'delivery_info';
        }
        
        const currentTime = new Date().toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        });
        
        let response = '';
        
        switch (responseType) {
            case 'order_list':
                response = `Hi asarekings! Here's your complete order list and status (Updated: ${currentTime} UTC)\n\n`;
                
                response += `📋 Your Order Summary (3 Active Orders):\n\n`;
                
                response += `✅ Order #NEX-2025-001247 - $1,099.99\n`;
                response += `📱 NexaPhone Pro Max (Space Black, 512GB)\n`;
                response += `📅 Ordered: May 28, 2025 | Delivered: June 3, 2025\n`;
                response += `📍 Status: DELIVERED to your front door\n`;
                response += `🔍 Tracking: NEX1234567890\n`;
                response += `⭐ Please rate your experience\n\n`;
                
                response += `🚚 Order #NEX-2025-001248 - $1,599.99\n`;
                response += `💻 NexaBook Ultra 16 (Silver, 32GB RAM, 1TB SSD)\n`;
                response += `📅 Ordered: June 1, 2025 | Ship Date: June 5, 2025\n`;
                response += `📍 Status: IN TRANSIT - Chicago Distribution Center\n`;
                response += `📊 Progress: 75% complete | ETA: Tomorrow (June 10)\n`;
                response += `🔍 Tracking: NEX1234567891 (Live GPS available)\n\n`;
                
                response += `⏳ Order #NEX-2025-001249 - $329.98\n`;
                response += `🎧 NexaPods Max + Wireless Charger Bundle\n`;
                response += `📅 Ordered: June 7, 2025 | Processing started today\n`;
                response += `📍 Status: PROCESSING at Austin Fulfillment Center\n`;
                response += `📊 Progress: 25% complete | Expected ship: June 9\n`;
                response += `🔍 Tracking: Will be provided once shipped\n\n`;
                
                response += `📊 Order Statistics:\n`;
                response += `• Total Orders This Year: 12 orders\n`;
                response += `• Total Spent: $2,929.97\n`;
                response += `• Average Order Value: $244.16\n`;
                response += `• On-Time Delivery Rate: 100%\n`;
                response += `• Customer Satisfaction: 4.9/5 stars\n\n`;
                
                response += `Quick Actions:\n`;
                response += `• Track any order in real-time\n`;
                response += `• Modify delivery preferences\n`;
                response += `• Download invoices and receipts\n`;
                response += `• Initiate returns or exchanges\n`;
                response += `• Contact delivery services directly\n\n`;
                
                response += `Need specific details about any of these orders?`;
                break;
                
            case 'tracking_info':
                response = `Hi asarekings! Here's real-time tracking for your active shipments:\n\n`;
                
                response += `🚚 Live Tracking - Order #NEX-2025-001248\n`;
                response += `💻 NexaBook Ultra 16\n`;
                response += `📍 Current Location: FedEx Chicago Distribution Center\n`;
                response += `🚛 Last Scan: 2 hours ago - "Out for delivery"\n`;
                response += `📅 Delivery Date: Tomorrow, June 10, 2025\n`;
                response += `⏰ Estimated Window: 10:00 AM - 2:00 PM\n`;
                response += `📱 Driver: Mike S. | Contact: Available after 9 AM\n`;
                response += `🔍 Live GPS: Track driver location starting at 9 AM\n\n`;
                
                response += `⏳ Processing Update - Order #NEX-2025-001249\n`;
                response += `🎧 NexaPods Max Bundle\n`;
                response += `📍 Location: Austin Fulfillment Center\n`;
                response += `⚙️ Current Stage: Quality inspection complete\n`;
                response += `📦 Next: Final packaging and label printing\n`;
                response += `📅 Ship Date: June 9, 2025\n`;
                response += `🔍 Tracking number will be sent via SMS and email\n\n`;
                
                response += `Real-time notifications enabled for both orders!`;
                break;
                
            default:
                response = `Hi asarekings! Here's your current order status overview:\n\n`;
                
                response += `📊 Quick Order Summary:\n`;
                response += `• 1 order delivered (NexaPhone Pro Max)\n`;
                response += `• 1 order in transit (NexaBook Ultra 16) - arriving tomorrow\n`;
                response += `• 1 order processing (NexaPods Max Bundle) - ships June 9\n\n`;
                
                response += `🎯 Next Updates Expected:\n`;
                response += `• Tomorrow: NexaBook delivery between 10 AM - 2 PM\n`;
                response += `• June 9: NexaPods shipping notification\n`;
                response += `• June 11: NexaPods estimated delivery\n\n`;
                
                response += `Would you like detailed tracking for any specific order?`;
        }
        
        return response;
    }

    // === SMART CONVERSATIONAL RESPONSE ===
    generateSmartConversationalResponse(context) {
        const { originalText, sentiment, questionType } = context;
        const text = originalText.toLowerCase();
        
        // Handle greetings
        if (questionType === 'conversational' && (text.includes('hello') || text.includes('hi'))) {
            return this.generateGreetingResponse();
        }
        
        // Handle thank you messages
        if (text.includes('thank') || text.includes('thanks')) {
            return `You're very welcome, asarekings! 😊 I'm always here to help.\n\nIs there anything else I can assist you with today? Whether it's tracking orders, product questions, or any other support needs - just let me know!`;
        }
        
        // Handle general help requests
        if (text.includes('help') && !this.hasSpecificIntent(text)) {
            return `Hi asarekings! I'm here to help you with anything you need. 😊\n\n🎯 I can assist you with:\n\n📦 Your orders and delivery tracking\n🛍️ Product information and recommendations\n💳 Billing and account questions\n🔄 Returns and exchanges\n🔧 Technical support\n\nWhat would you like help with today? Just ask me naturally - I understand questions like "Where is my order?" or "How do I return something?" and I'll provide specific, helpful answers!`;
        }
        
        // Handle unclear requests
        return `I'd be happy to help you with that! To give you the most accurate and helpful response, could you provide a bit more detail about what you're looking for?\n\n💡 For example:\n• "Where is my NexaBook order?" (for tracking)\n• "I want to return my phone" (for returns)\n• "When will my package arrive?" (for delivery info)\n• "I need help with billing" (for account questions)\n\nJust ask naturally - I'm designed to understand and provide specific, contextual answers to your questions!`;
    }

    // === HELPER METHODS ===
    hasSpecificIntent(text) {
        const specificKeywords = [
            'order', 'track', 'package', 'delivery', 'shipment',
            'product', 'phone', 'laptop', 'nexaphone', 'nexabook',
            'payment', 'billing', 'refund', 'charge',
            'return', 'exchange', 'replace',
            'broken', 'not working', 'error', 'fix'
        ];
        
        return specificKeywords.some(keyword => text.includes(keyword));
    }

    calculateContextConfidence(context) {
        let confidence = 0;
        
        // Intent confidence
        confidence += context.intent.confidence * 0.4;
        
        // Question type clarity
        if (context.questionType !== 'general') confidence += 0.2;
        
        // User need specificity
        if (context.userNeed !== 'general_assistance') confidence += 0.2;
        
        // Entity presence
        if (context.entities.orderNumbers.length > 0) confidence += 0.1;
        if (context.entities.productNames.length > 0) confidence += 0.1;
        
        return Math.min(confidence, 1);
    }

    applyPersonality(response) {
        // Add personal touches and maintain consistent tone
        if (!response.includes('asarekings')) {
            if (Math.random() > 0.7) {
                const personalTouches = [
                    'As a Premium member, you get priority service!',
                    'Thanks for being such a valued customer!',
                    'I notice you\'re one of our top customers - thank you!',
                    'Your loyalty means everything to us!'
                ];
                const touch = personalTouches[Math.floor(Math.random() * personalTouches.length)];
                response += `\n\n💎 ${touch}`;
            }
        }
        
        return response;
    }

    // === EXISTING METHODS (Updated for Mini ChatGPT Integration) ===
    
    // Reuse existing methods but integrate with new context engine
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

    extractEntities(text) {
        const entities = {
            orderNumbers: [],
            productNames: [],
            amounts: []
        };
        
        const orderRegex = /NEX-\d{4}-\d{6}/gi;
        entities.orderNumbers = text.match(orderRegex) || [];
        
        const products = ['nexaphone', 'nexabook', 'nexapods', 'nexawatch', 'nexacharge'];
        products.forEach(product => {
            if (text.toLowerCase().includes(product)) {
                entities.productNames.push(product);
            }
        });
        
        const amountRegex = /\$\d+\.?\d*/gi;
        entities.amounts = text.match(amountRegex) || [];
        
        return entities;
    }

    assessUrgency(text) {
        const urgentIndicators = ['urgent', 'emergency', 'immediately', 'asap', 'critical', 'broken', 'not working', 'now'];
        const urgentCount = urgentIndicators.filter(indicator => 
            text.includes(indicator)
        ).length;
        
        if (urgentCount >= 2) return 'high';
        if (urgentCount === 1) return 'medium';
        return 'low';
    }

    assessSpecificity(text) {
        const specificTerms = ['order', 'tracking', 'NEX-', '$', 'nexaphone', 'nexabook', 'delivery', 'payment'];
        const specificCount = specificTerms.filter(term => 
            text.toLowerCase().includes(term.toLowerCase())
        ).length;
        
        if (specificCount >= 3) return 'high';
        if (specificCount >= 1) return 'medium';
        return 'low';
    }

    analyzeConversationFlow(history) {
        if (history.length === 0) return 'initial';
        if (history.length < 3) return 'early';
        return 'ongoing';
    }

    // === AI RESPONSE GENERATION (Main Entry Point) ===
    generateAIResponse(userMessage) {
        // Use Mini ChatGPT engine for context analysis
        const context = this.miniChatGPT.contextEngine.analyzeContext(userMessage, this.conversationContext);
        
        // Generate contextual response
        const response = this.miniChatGPT.contextEngine.generateResponse(context);
        
        // Apply personality
        const personalizedResponse = this.miniChatGPT.contextEngine.maintainPersonality(response);
        
        // Select appropriate agent
        const agent = this.selectBestAgent(context);
        
        // Store conversation context
        this.conversationContext.push({
            userMessage: userMessage,
            context: context,
            timestamp: Date.now()
        });
        
        // Keep only last 5 interactions
        if (this.conversationContext.length > 5) {
            this.conversationContext.shift();
        }
        
        return {
            response: personalizedResponse,
            agent: agent,
            analysis: context,
            confidence: context.confidence
        };
    }

    selectBestAgent(context) {
        const agents = {
            'Sarah Chen': { specialties: ['orders', 'shipping', 'tracking'], personality: 'efficient' },
            'Mike Rodriguez': { specialties: ['technical', 'troubleshooting'], personality: 'analytical' },
            'Emma Wilson': { specialties: ['products', 'recommendations'], personality: 'enthusiastic' },
            'Alex Thompson': { specialties: ['billing', 'payments'], personality: 'precise' },
            'Lisa Chang': { specialties: ['returns', 'complaints'], personality: 'empathetic' }
        };
        
        const intentToAgent = {
            'order_inquiry': 'Sarah Chen',
            'technical_inquiry': 'Mike Rodriguez',
            'product_inquiry': 'Emma Wilson',
            'billing_inquiry': 'Alex Thompson',
            'return_inquiry': 'Lisa Chang'
        };
        
        const agent = intentToAgent[context.intent.intent];
        return agent || 'Sarah Chen';
    }

    generateGreetingResponse() {
        const currentTime = new Date('2025-06-08T12:45:44Z').toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
        
        return `Hello asarekings! 👋 Welcome back to NexaShop Support!\n\n🎫 Your Support Session:\n• Ticket: ${this.ticketNumber}\n• Time: ${currentTime}\n• Status: Premium Gold Member 🌟\n• AI Engine: Mini ChatGPT Active 🤖\n\n🌟 I'm here to help with:\n• 📦 Order tracking and delivery updates\n• 🛍️ Product information and recommendations\n• 💳 Billing and account management\n• 🔄 Returns and exchanges\n• 🔧 Technical support\n\n🤖 Advanced AI Features:\n• Natural conversation understanding\n• Contextual, specific responses\n• Proactive problem-solving\n• Personalized assistance\n\nWhat can I help you with today? Just ask naturally - I understand context and provide specific answers! ⚡`;
    }

    // === INITIALIZATION AND EXISTING METHODS ===
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
            }
        };
        
        this.security = {
            validateInput: (input) => {
                const dangerous = /<script|javascript:|data:/i;
                return !dangerous.test(input);
            },
            sanitizeInput: (input) => input.replace(/[<>]/g, '').trim()
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

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.showWelcomeMessage();
        
        window.nexaShopSupport = this;
        
        console.log('✅ NexaShop Mini ChatGPT AI Support initialized successfully');
        console.log('🤖 Mini ChatGPT: Contextual responses active');
        this.showNotification('🤖 Mini ChatGPT AI ready! Smart, contextual responses enabled.');
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
                <h3>🛍️ Welcome to NexaShop Mini ChatGPT AI!</h3>
                <div style="margin: 16px 0; padding: 16px; background: rgba(59, 130, 246, 0.05); border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.1);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Support Ticket:</span>
                        <span style="font-weight: 600;">${this.ticketNumber}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Current Time:</span>
                        <span style="font-weight: 600;">2025-06-08 12:45:44 UTC</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Customer:</span>
                        <span style="font-weight: 600;">asarekings (Premium Gold Member 🌟)</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280; font-weight: 500;">AI Engine:</span>
                        <span style="font-weight: 600;">🤖 Mini ChatGPT Active</span>
                    </div>
                </div>
                <p style="margin-bottom: 20px;">Hi asarekings! I'm powered by Mini ChatGPT technology for natural, contextual conversations. Just ask me anything naturally!</p>
            </div>
            
            <div style="margin: 20px 0;">
                <h4>🚀 Try Natural Conversations:</h4>
                <div class="action-grid">
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I need an update on my order list')">
                        <span style="font-size: 20px;">📦</span>
                        Update on Order List
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('Where is my NexaBook delivery?')">
                        <span style="font-size: 20px;">🚚</span>
                        Track Specific Order
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I want to return my phone')">
                        <span style="font-size: 20px;">↩️</span>
                        Return Specific Item
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('Tell me about the NexaPhone specs')">
                        <span style="font-size: 20px;">💡</span>
                        Product Information
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I have a question about my bill')">
                        <span style="font-size: 20px;">💳</span>
                        Billing Question
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('My laptop is not working properly')">
                        <span style="font-size: 20px;">🔧</span>
                        Technical Issue
                    </button>
                </div>
            </div>

            <div style="margin-top: 20px; padding: 16px; background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%); border-radius: 12px; border: 1px solid rgba(34, 197, 94, 0.2);">
                <p><strong>🤖 Mini ChatGPT Features:</strong></p>
                <p style="font-size: 14px; margin: 8px 0;">✅ Natural language understanding</p>
                <p style="font-size: 14px; margin: 8px 0;">✅ Context-aware responses</p>
                <p style="font-size: 14px; margin: 8px 0;">✅ Specific, detailed answers</p>
                <p style="font-size: 14px; margin: 8px 0;">✅ No more generic responses</p>
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

        setTimeout(() => {
            this.generateMiniChatGPTResponse(content, startTime);
        }, 800 + Math.random() * 1200);
    }

    generateMiniChatGPTResponse(userMessage, startTime) {
        console.log('🤖 Mini ChatGPT processing:', userMessage);
        
        try {
            const aiResponse = this.generateAIResponse(userMessage);
            
            console.log('🧠 Mini ChatGPT Response:', aiResponse);
            
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
                this.showNotification(`🤖 ${aiResponse.agent} responded (Mini ChatGPT • ${confidencePercent}% confidence)`);
                
                console.log('✅ Mini ChatGPT response delivered');
            }, 1200 + Math.random() * 800);
        } catch (error) {
            console.error('❌ Mini ChatGPT error:', error);
            
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
            'technical_inquiry': 'technical',
            'product_inquiry': 'products',
            'billing_inquiry': 'billing',
            'return_inquiry': 'returns',
            'general_conversation': 'support'
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
            <span>🤖 ${agentName} is processing with Mini ChatGPT...</span>
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
    console.log('🚀 DOM loaded, initializing NexaShop Mini ChatGPT AI...');
    console.log('📅 Current Time: 2025-06-08 12:45:44 UTC');
    console.log('👤 User: asarekings logged in');
    console.log('🤖 Mini ChatGPT Engine: Starting contextual AI...');
    try {
        new NexaShopSupport();
        console.log('✅ NexaShop Mini ChatGPT AI initialized successfully');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
});

if (document.readyState === 'loading') {
    // Still loading, wait for DOMContentLoaded
} else {
    console.log('DOM already loaded, initializing Mini ChatGPT immediately...');
    try {
        new NexaShopSupport();
    } catch (error) {
        console.error('❌ Immediate initialization error:', error);
    }
}
