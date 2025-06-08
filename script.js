class NexaShopSupport {
    constructor() {
        // Current time as provided: 2025-06-08 12:22:56 UTC
        this.currentDateTime = new Date('2025-06-08T12:22:56Z');
        
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
        console.log('📅 Current Time: 2025-06-08 12:22:56 UTC');
        console.log('👤 User: asarekings logged in');
        console.log('🧠 AI Features: Clean response formatting (NO asterisks)');
        
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
        
        console.log('🧠 AI Engine initialized with asterisk-free formatting');
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
        
        // Remove any remaining asterisks
        response = this.cleanResponse(response);
        
        // Personalize response
        response = this.personalizeResponse(response, analysis);
        
        return {
            response: response,
            agent: agentName,
            analysis: analysis,
            confidence: intent.confidence
        };
    }

    // === UTILITY METHOD TO REMOVE ALL ASTERISKS ===
    cleanResponse(response) {
        // Remove all asterisks and clean up formatting
        return response
            .replace(/\*\*/g, '')  // Remove all double asterisks
            .replace(/\*/g, '')    // Remove all single asterisks
            .replace(/\n\n\n/g, '\n\n')  // Clean up extra line breaks
            .trim();
    }

    // === COMPLETELY CLEAN RESPONSE GENERATORS ===
    generateOrderResponse(analysis) {
        const currentTime = new Date().toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        });

        let response = `Hi asarekings! 📦 Real-time Order Dashboard (Updated: ${currentTime} UTC)\n\n`;
        
        response += `✅ NEX-2025-001247 - $1,099.99\n`;
        response += `📱 NexaPhone Pro Max - DELIVERED\n`;
        response += `📅 Delivered: June 3, 2025 at 4:45 PM\n`;
        response += `🔍 Tracking Number: NEX1234567890\n`;
        response += `⭐ Please rate your delivery experience\n\n`;
        
        response += `🚚 NEX-2025-001248 - $1,599.99\n`;
        response += `💻 NexaBook Ultra 16 - IN TRANSIT\n`;
        response += `📍 Current Location: Distribution Center - Chicago, IL\n`;
        response += `📊 Delivery Progress: 75% complete\n`;
        response += `📅 Estimated Delivery: June 10, 2025\n`;
        response += `🔍 Tracking Number: NEX1234567891\n\n`;
        
        response += `⏳ NEX-2025-001249 - $329.98\n`;
        response += `🎧 NexaPods Max + Wireless Charger - PROCESSING\n`;
        response += `🏭 Current Location: Fulfillment Center - Austin, TX\n`;
        response += `📊 Processing Progress: 25% complete\n`;
        response += `📅 Estimated Ship Date: June 9, 2025\n\n`;
        
        response += `📱 Quick Actions Available:\n`;
        response += `• Update delivery preferences and address\n`;
        response += `• Track packages in real-time with live updates\n`;
        response += `• Enable SMS and email delivery notifications\n`;
        response += `• Contact delivery service directly for special requests\n\n`;
        
        response += `Need help with any specific order or have delivery questions?`;
        
        return response;
    }

    generateProductResponse(analysis) {
        let response = `Hi asarekings! 🛍️ NexaShop Product Showcase (Live Inventory - 2025-06-08 12:22:56)\n\n`;
        
        response += `🔥 Featured Products Currently Available:\n\n`;
        
        response += `📱 NexaPhone Pro Max - $1,099.99 ⭐4.9/5\n`;
        response += `📋 Specifications: 6.7" OLED Display, 512GB Storage, 5G Ready, Advanced Pro Camera System\n`;
        response += `📦 Stock Status: 247 units available (Ships from East Coast DC)\n`;
        response += `🔥 Trending Alert: 15% sales increase this week\n`;
        response += `🚚 Free 2-day shipping for Premium Members\n\n`;
        
        response += `💻 NexaBook Ultra 16 - $1,599.99 ⭐4.8/5\n`;
        response += `📋 Specifications: M2 Pro Chip, 32GB Unified Memory, 1TB SSD, 16.2" Liquid Retina Display\n`;
        response += `📦 Stock Status: 89 units available (Ships from West Coast DC)\n`;
        response += `💼 Perfect for professionals, creators, and power users\n`;
        response += `🎯 Recommended based on your previous laptop searches\n\n`;
        
        response += `🎧 NexaPods Max - $249.99 ⭐4.7/5\n`;
        response += `📋 Specifications: Spatial Audio, Active Noise Canceling, 30-hour battery, Wireless Charging Case\n`;
        response += `📦 Stock Status: 156 units available (Ships from Central DC)\n`;
        response += `🔥 Hot Item: Perfect companion for all your NexaShop devices\n`;
        response += `💡 Pro Tip: Works seamlessly with NexaPhone and NexaBook\n\n`;
        
        response += `💰 Current Limited-Time Deals:\n`;
        response += `🏷️ NexaPods Max: 20% discount - Save $50.00 (Ends June 15)\n`;
        response += `🏷️ NexaWatch Series X: 15% discount - Save $74.99 (Ends June 12)\n`;
        response += `🎁 Bundle Deal: Buy NexaPhone + NexaPods, get wireless charger FREE\n\n`;
        
        response += `🎯 Personalized Recommendations for You:\n`;
        response += `• Based on your purchase history and preferences\n`;
        response += `• Premium Member exclusive early access deals\n`;
        response += `• Curated selection matching your tech ecosystem\n`;
        response += `• Expert recommendations from our product specialists\n\n`;
        
        response += `Want detailed specs, comparisons, or have specific product questions?`;
        
        return response;
    }

    generateTechnicalResponse(analysis) {
        let response = `Hi asarekings! 🔧 NexaShop Technical Support Center (2025-06-08 12:22:56)\n\n`;
        
        response += `🌐 Live System Status Dashboard:\n`;
        response += `• Main Website: ✅ Fully Operational (99.99% uptime)\n`;
        response += `• Mobile Application: ✅ Fully Operational (Latest version 3.2.1)\n`;
        response += `• Payment Processing: ✅ All systems operational\n`;
        response += `• Order Management: ✅ Real-time processing active\n`;
        response += `• Customer Support Chat: ✅ AI-powered assistance online\n`;
        response += `• Shipping Partners: ✅ All carriers reporting normal operations\n\n`;
        
        response += `🔧 Universal Troubleshooting Solutions:\n\n`;
        
        response += `📱 For NexaShop Device Issues:\n`;
        response += `1️⃣ Power Reset: Hold power button + volume down for 10 seconds, then restart\n`;
        response += `2️⃣ Software Update: Go to Settings > System Updates > Check for updates\n`;
        response += `3️⃣ Network Reset: Settings > Network & Internet > Reset Network Settings\n`;
        response += `4️⃣ Cache Clear: Settings > Storage > Clear Cache for better performance\n`;
        response += `5️⃣ Factory Reset: Last resort option if other steps don't resolve the issue\n\n`;
        
        response += `💻 For Website and App Issues:\n`;
        response += `1️⃣ Browser Refresh: Clear cache and cookies, then restart browser\n`;
        response += `2️⃣ Incognito Mode: Try accessing in private/incognito browsing mode\n`;
        response += `3️⃣ Browser Update: Ensure you're using the latest browser version\n`;
        response += `4️⃣ Extension Check: Temporarily disable browser extensions\n`;
        response += `5️⃣ Alternative Access: Try our mobile app or different browser\n\n`;
        
        response += `📦 For Order and Account Issues:\n`;
        response += `1️⃣ Account Refresh: Log out completely, wait 30 seconds, then log back in\n`;
        response += `2️⃣ Email Verification: Check spam folder for order confirmations\n`;
        response += `3️⃣ Payment Verification: Ensure your payment method is active and valid\n`;
        response += `4️⃣ Address Confirmation: Verify shipping address is complete and accurate\n`;
        response += `5️⃣ Direct Contact: Reach out if automated solutions don't work\n\n`;
        
        response += `🎯 Advanced Technical Support Options:\n`;
        response += `• Remote Diagnostic Tools: We can run advanced diagnostics on your device\n`;
        response += `• Live Video Troubleshooting: Screen-share sessions with expert technicians\n`;
        response += `• Priority Technical Escalation: Direct access to senior engineering team\n`;
        response += `• Hardware Replacement Program: Express replacement for defective items\n`;
        response += `• Extended Warranty Support: Comprehensive coverage for all your devices\n\n`;
        
        response += `What specific technical challenge can I help you solve today?`;
        
        return response;
    }

    generateBillingResponse(analysis) {
        let response = `Hi asarekings! 💳 NexaShop Secure Billing Center (2025-06-08 12:22:56)\n\n`;
        
        response += `🔒 Your Account Security Status:\n`;
        response += `• Encryption Level: 256-bit SSL encryption currently active\n`;
        response += `• Compliance: PCI DSS Level 1 certified and compliant\n`;
        response += `• Fraud Protection: Advanced monitoring systems enabled\n`;
        response += `• Purchase Protection: Zero-liability guarantee on all transactions\n`;
        response += `• Data Security: Your financial information is never stored locally\n\n`;
        
        response += `📊 Complete Account Summary for asarekings:\n`;
        response += `• Membership Status: Premium Member 🌟 (Active since January 2024)\n`;
        response += `• Total Orders Placed: 12 orders successfully completed\n`;
        response += `• Lifetime Purchase Amount: $2,929.97 across all categories\n`;
        response += `• Total Savings from Deals: $487.23 in discounts and promotions\n`;
        response += `• Cashback Rewards Earned: $58.60 available for future purchases\n`;
        response += `• Available Store Credit: $25.00 ready to use\n`;
        response += `• Account Standing: Excellent (5-star customer rating)\n\n`;
        
        response += `💰 Payment Methods Currently on File:\n`;
        response += `• Primary Card: Visa ending in 4521 (expires 08/2027) - Verified\n`;
        response += `• PayPal Account: verified and linked (primary backup method)\n`;
        response += `• Apple Pay: enabled and configured for quick checkout\n`;
        response += `• Google Pay: available for mobile purchases\n`;
        response += `• NexaShop Store Credit: $25.00 balance available\n`;
        response += `• Buy Now Pay Later: Klarna and Afterpay options available\n\n`;
        
        response += `⚡ Quick Billing Actions You Can Take:\n`;
        response += `• Update or add new payment methods instantly\n`;
        response += `• Download receipts and invoices for any past order\n`;
        response += `• View complete transaction history with detailed breakdowns\n`;
        response += `• Set up automatic payments for subscription services\n`;
        response += `• Request refund status updates and processing timelines\n`;
        response += `• Manage billing addresses and tax information\n\n`;
        
        response += `🎯 Your Current Premium Member Benefits:\n`;
        response += `• Monthly Cashback: 2% on all purchases (active through June)\n`;
        response += `• Free Premium Shipping: Unlimited express delivery included\n`;
        response += `• Early Sale Access: 24-hour head start on all flash sales\n`;
        response += `• Birthday Month Discount: 20% off everything (coming up soon!)\n`;
        response += `• Extended Return Window: 45 days instead of standard 30 days\n`;
        response += `• Priority Customer Support: Skip the queue with dedicated assistance\n\n`;
        
        response += `What specific billing question or account matter can I help you with?`;
        
        return response;
    }

    generateReturnResponse(analysis) {
        let response = `Hi asarekings! ↩️ NexaShop Returns & Exchanges Center (2025-06-08 12:22:56)\n\n`;
        
        response += `✨ Our Hassle-Free Return Promise:\n`;
        response += `• Extended Return Window: 30 days for most items, 45 days for electronics\n`;
        response += `• Completely Free Return Shipping: We cover all costs, no questions asked\n`;
        response += `• Zero Restocking Fees: Never any hidden charges or penalties\n`;
        response += `• Lightning-Fast Processing: 24-hour inspection and approval guarantee\n`;
        response += `• Full Refund Guarantee: 100% money back for any reason\n`;
        response += `• Condition Flexibility: Items don't need to be in perfect condition\n\n`;
        
        response += `🚀 Simple 3-Step Return Process:\n\n`;
        
        response += `STEP 1 - Instant Return Authorization:\n`;
        response += `• Log into your NexaShop account dashboard\n`;
        response += `• Navigate to "My Orders" and find your purchase\n`;
        response += `• Click "Return Item" button next to the product\n`;
        response += `• Select your reason from the dropdown menu\n`;
        response += `• Receive instant approval and return authorization number\n\n`;
        
        response += `STEP 2 - Smart Return Shipping:\n`;
        response += `• Print your prepaid return label (QR code available for mobile)\n`;
        response += `• Package item securely (original packaging not required)\n`;
        response += `• Drop off at any UPS, FedEx, or USPS location\n`;
        response += `• Track your return package in real-time through our system\n`;
        response += `• Receive confirmation when package reaches our facility\n\n`;
        
        response += `STEP 3 - Quick Refund Processing:\n`;
        response += `• 24-hour quality inspection upon package receipt\n`;
        response += `• Instant refund approval and processing initiation\n`;
        response += `• 2-3 business days for refund to appear in your account\n`;
        response += `• Email confirmation with detailed refund breakdown\n`;
        response += `• Optional satisfaction survey to help us improve\n\n`;
        
        response += `📊 Your Personal Return History:\n`;
        response += `• Total Returns Processed: 2 items (You're an excellent customer!)\n`;
        response += `• Average Processing Time: 1.5 days (faster than our 2-day guarantee)\n`;
        response += `• Customer Satisfaction Score: 5 out of 5 stars ⭐\n`;
        response += `• VIP Return Status: Activated (even faster processing for you)\n`;
        response += `• Return Success Rate: 100% - all returns processed smoothly\n\n`;
        
        response += `🔄 Flexible Exchange Options Available:\n`;
        response += `• Same Product Different Specs: Change size, color, or model instantly\n`;
        response += `• Product Upgrade Path: Pay difference to upgrade to newer model\n`;
        response += `• Cross-Category Exchanges: Exchange phone for laptop, etc.\n`;
        response += `• Store Credit Option: Get 10% bonus when choosing store credit\n`;
        response += `• Gift Card Conversion: Perfect for giving as gifts\n\n`;
        
        response += `🎯 Premium Member Return Perks:\n`;
        response += `• Express Return Processing: 12-hour turnaround available\n`;
        response += `• Advance Replacement: Get new item before returning old one\n`;
        response += `• Dedicated Return Specialist: Personal assistant for complex returns\n`;
        response += `• Return Pickup Service: We can collect returns from your location\n\n`;
        
        response += `Which specific item would you like to return or exchange today?`;
        
        return response;
    }

    generateGreetingResponse() {
        const currentTime = new Date('2025-06-08T12:22:56Z').toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
        
        return `Hello asarekings! 👋 Welcome back to NexaShop Support!\n\n🎫 Your Support Session Information:\n• Support Ticket Number: ${this.ticketNumber}\n• Current Date and Time: ${currentTime}\n• Your Account Status: Premium Member 🌟\n• AI Assistant Status: Fully Active and Learning 🤖\n• Session Security Level: Encrypted and Secure 🔒\n\n🌟 How I Can Assist You Today:\n• 📦 Order Tracking and Delivery Management\n• 🛍️ Product Information and Smart Recommendations\n• 🔄 Returns, Exchanges, and Refund Processing  \n• 💳 Billing Questions and Account Management\n• 🔧 Technical Support and Device Troubleshooting\n• 💬 General Questions and Customer Care\n\n🤖 Advanced AI Features Ready:\n• Intelligent conversation analysis for better understanding\n• Emotional tone detection for personalized responses\n• Smart suggestion system based on your needs\n• Proactive problem-solving with step-by-step guidance\n• Real-time learning to improve our conversation\n\nWhat can I help you with today? I'm here to provide exceptional, personalized service! ⚡`;
    }

    generateHelpResponse(analysis) {
        return `I'd be delighted to help you with whatever you need! 😊\n\n🎯 Here are all the ways I can assist you:\n\n📦 Orders and Shipping Support:\n• Track packages with real-time location updates\n• Modify delivery preferences and shipping addresses\n• Handle shipping delays, issues, or special requests\n• Coordinate with delivery services for optimal timing\n\n🛍️ Product and Shopping Assistance:\n• Provide detailed product specifications and comparisons\n• Offer personalized recommendations based on your history\n• Check real-time availability and pricing information\n• Help you find the perfect product for your needs\n\n💳 Account and Billing Services:\n• Resolve payment issues and update payment methods\n• Manage account settings and personal preferences\n• Process refund requests and check refund status\n• Explain billing charges and transaction history\n\n🔧 Technical Support Solutions:\n• Troubleshoot device problems with step-by-step guidance\n• Resolve website and mobile app issues\n• Help with product setup and configuration\n• Provide advanced technical diagnostics when needed\n\n↩️ Returns and Exchange Processing:\n• Guide you through our simple return process\n• Explore exchange options for different products\n• Check return eligibility and processing status\n• Arrange special return accommodations if needed\n\n🤖 AI-Powered Smart Assistance:\n• Understand your questions with context and emotion\n• Provide personalized responses based on your history\n• Offer proactive suggestions to prevent future issues\n• Learn from our conversation to serve you better\n\nWhat specific area would you like help with? I'll provide detailed, step-by-step assistance tailored just for you!`;
    }

    generateDefaultResponse(analysis) {
        return `Thank you for reaching out to NexaShop Support! 🛍️\n\nI understand you need assistance, and I'm here to provide you with the best possible help. Let me connect you with exactly the right solution for your needs.\n\n🤖 AI Analysis of Your Request:\n• Understanding Confidence Level: ${Math.round(analysis.intent.confidence * 100)}%\n• Urgency Assessment: ${analysis.urgencyLevel}\n• Issue Complexity Rating: ${analysis.complexity}\n• Emotional Tone Detected: ${analysis.sentiment.overall}\n\n🎯 Recommended Next Steps:\n• Please provide a bit more detail about your specific question or concern\n• Browse the quick action buttons above for common requests\n• Ask me anything - I'm equipped with advanced AI to understand and help\n• Let me know if you prefer to speak with a human specialist\n\n💡 Pro Tip: The more specific you can be about your question, the better I can tailor my response to give you exactly what you need!\n\nPlease tell me more about what you'd like help with, and I'll provide a comprehensive, personalized solution just for you!`;
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
            return 'Lisa Chang';
        }
        
        if (requiredSpecialty) {
            const matchingAgent = Object.entries(agents).find(([name, agent]) => 
                agent.specialties.includes(requiredSpecialty)
            );
            if (matchingAgent) return matchingAgent[0];
        }
        
        return 'Sarah Chen';
    }

    // === PERSONALIZATION ===
    personalizeResponse(response, analysis) {
        if (analysis.sentiment.overall === 'negative') {
            response = `I sincerely apologize for any inconvenience, asarekings. ${response}`;
        }
        
        if (analysis.urgencyLevel === 'high') {
            response = `🚨 I understand this is urgent. ${response}\n\nI'm prioritizing your request for immediate resolution.`;
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
        console.log('🧠 AI Features: Completely asterisk-free formatting active');
        this.showNotification('🤖 AI-powered support ready! Zero asterisk formatting enabled.');
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
                        <span style="font-weight: 600;">2025-06-08 12:22:56 UTC</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Customer:</span>
                        <span style="font-weight: 600;">asarekings (Premium Member 🌟)</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280; font-weight: 500;">Formatting:</span>
                        <span style="font-weight: 600;">🚫 Zero Asterisks Mode</span>
                    </div>
                </div>
                <p style="margin-bottom: 20px;">Hi asarekings! I'm your AI-powered support assistant with completely clean, asterisk-free responses. How can I help you today?</p>
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

            <div style="margin-top: 20px; padding: 16px; background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%); border-radius: 12px; border: 1px solid rgba(34, 197, 94, 0.2);">
                <p><strong>🎯 Clean Formatting Guarantee:</strong></p>
                <p style="font-size: 14px; margin: 8px 0;">✅ No asterisks in any responses</p>
                <p style="font-size: 14px; margin: 8px 0;">✅ Natural, easy-to-read text</p>
                <p style="font-size: 14px; margin: 8px 0;">✅ Clean, professional formatting</p>
                <p style="font-size: 14px; margin: 8px 0;">✅ All AI features still active</p>
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
            this.generateEnhancedAIResponse(content, startTime);
        }, 800 + Math.random() * 1200);
    }

    generateEnhancedAIResponse(userMessage, startTime) {
        console.log('🤖 Generating asterisk-free AI response for:', userMessage);
        
        try {
            const aiResponse = this.generateAIResponse(userMessage);
            
            console.log('🧠 Clean AI Response generated (no asterisks):', aiResponse);
            
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
                this.showNotification(`🤖 ${aiResponse.agent} responded (Clean Format • ${confidencePercent}% confidence)`);
                
                console.log('✅ Asterisk-free AI response delivered successfully');
            }, 1200 + Math.random() * 800);
        } catch (error) {
            console.error('❌ Error generating AI response:', error);
            
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
            <span>🤖 ${agentName} is crafting a clean, asterisk-free response...</span>
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
    console.log('🚀 DOM loaded, initializing NexaShop Asterisk-Free AI Support...');
    console.log('📅 Current Time: 2025-06-08 12:22:56 UTC');
    console.log('👤 User: asarekings logged in');
    console.log('🚫 Zero asterisk formatting mode activated');
    try {
        new NexaShopSupport();
        console.log('✅ NexaShop Asterisk-Free AI Support initialized successfully');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
});

if (document.readyState === 'loading') {
    // Still loading, wait for DOMContentLoaded
} else {
    console.log('DOM already loaded, initializing asterisk-free AI system immediately...');
    try {
        new NexaShopSupport();
    } catch (error) {
        console.error('❌ Immediate initialization error:', error);
    }
}
