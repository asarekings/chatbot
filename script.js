class NexaShopSupport {
    constructor() {
        // Current time as provided: 2025-06-08 12:31:07 UTC
        this.currentDateTime = new Date('2025-06-08T12:31:07Z');
        
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
        console.log('📅 Current Time: 2025-06-08 12:31:07 UTC');
        console.log('👤 User: asarekings logged in');
        console.log('🎯 Enhanced intent recognition activated');
        
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
        
        console.log('🧠 AI Engine initialized with enhanced intent recognition');
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

    // === ENHANCED INTENT RECOGNITION ===
    recognizeIntent(text) {
        const intents = {
            order_inquiry: {
                patterns: [
                    'track', 'tracking', 'package', 'shipment', 'delivery', 'order status', 
                    'where is my', 'when will', 'shipping', 'delivered', 'location',
                    'track my package', 'track package', 'find my order', 'order tracking',
                    'shipping status', 'delivery status', 'package status', 'my order',
                    'order update', 'delivery update', 'shipping update'
                ],
                confidence: 0
            },
            product_info: {
                patterns: [
                    'product', 'item', 'specification', 'specs', 'feature', 'compare', 
                    'recommend', 'suggest', 'phone', 'laptop', 'nexaphone', 'nexabook',
                    'what is', 'tell me about', 'information about', 'details about'
                ],
                confidence: 0
            },
            technical_support: {
                patterns: [
                    'not working', 'broken', 'error', 'bug', 'issue', 'problem', 'fix', 
                    'troubleshoot', 'support', 'technical', 'device', 'setup', 'install',
                    'configure', 'malfunction', 'defective'
                ],
                confidence: 0
            },
            billing_payment: {
                patterns: [
                    'payment', 'billing', 'charge', 'refund', 'money', 'card', 'invoice',
                    'account', 'credit', 'debit', 'transaction', 'receipt', 'bill'
                ],
                confidence: 0
            },
            return_exchange: {
                patterns: [
                    'return', 'exchange', 'replace', 'send back', 'defective', 'wrong item',
                    'change', 'swap', 'refund', 'give back', 'take back'
                ],
                confidence: 0
            },
            general_inquiry: {
                patterns: [
                    'hello', 'hi', 'hey', 'help', 'question', 'info', 'about', 'how',
                    'what', 'can you', 'assistance', 'support'
                ],
                confidence: 0
            }
        };
        
        const textLower = text.toLowerCase();
        let bestIntent = 'general_inquiry';
        let maxConfidence = 0;
        
        // Enhanced pattern matching
        Object.entries(intents).forEach(([intent, data]) => {
            let matches = 0;
            let totalPatterns = data.patterns.length;
            
            data.patterns.forEach(pattern => {
                if (textLower.includes(pattern)) {
                    matches++;
                }
            });
            
            // Calculate confidence with higher weight for exact matches
            let confidence = matches / totalPatterns;
            
            // Boost confidence for specific tracking-related queries
            if (intent === 'order_inquiry') {
                const trackingKeywords = ['track', 'tracking', 'package', 'shipment', 'delivery', 'where is', 'location'];
                const trackingMatches = trackingKeywords.filter(keyword => textLower.includes(keyword)).length;
                if (trackingMatches > 0) {
                    confidence += 0.3; // Boost tracking intent
                }
            }
            
            intents[intent].confidence = confidence;
            
            if (confidence > maxConfidence) {
                maxConfidence = confidence;
                bestIntent = intent;
            }
        });
        
        console.log('🎯 Intent Analysis:', {
            text: text,
            recognizedIntent: bestIntent,
            confidence: maxConfidence,
            allConfidences: Object.fromEntries(
                Object.entries(intents).map(([intent, data]) => [intent, data.confidence])
            )
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
        
        // Generate response based on intent with confidence threshold
        if (intent.confidence > 0.2) { // Lower threshold for better recognition
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
        } else {
            // Fallback for low confidence
            response = this.generateHelpResponse(analysis);
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
        return response
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .replace(/\n\n\n/g, '\n\n')
            .trim();
    }

    // === ENHANCED ORDER/TRACKING RESPONSE ===
    generateOrderResponse(analysis) {
        const currentTime = new Date().toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        });

        let response = `Hi asarekings! 📦 Here's your complete order and package tracking information (Updated: ${currentTime} UTC)\n\n`;
        
        response += `✅ Order NEX-2025-001247 - $1,099.99\n`;
        response += `📱 NexaPhone Pro Max - DELIVERED\n`;
        response += `📅 Delivered: June 3, 2025 at 4:45 PM\n`;
        response += `📍 Delivery Location: Your front door (signature confirmed)\n`;
        response += `🔍 Tracking Number: NEX1234567890\n`;
        response += `⭐ Rate your delivery experience: Excellent service!\n\n`;
        
        response += `🚚 Order NEX-2025-001248 - $1,599.99\n`;
        response += `💻 NexaBook Ultra 16 - IN TRANSIT (Active Tracking)\n`;
        response += `📍 Current Location: Distribution Center - Chicago, IL\n`;
        response += `🚛 Last Update: 2 hours ago - Out for delivery\n`;
        response += `📊 Delivery Progress: 75% complete\n`;
        response += `📅 Estimated Delivery: June 10, 2025 (Tomorrow!)\n`;
        response += `⏰ Expected Time: Between 9:00 AM - 6:00 PM\n`;
        response += `🔍 Live Tracking: NEX1234567891\n`;
        response += `📱 SMS Updates: Enabled (you'll get delivery notifications)\n\n`;
        
        response += `⏳ Order NEX-2025-001249 - $329.98\n`;
        response += `🎧 NexaPods Max + Wireless Charger - PROCESSING\n`;
        response += `🏭 Current Location: Fulfillment Center - Austin, TX\n`;
        response += `⚙️ Status: Quality check and packaging in progress\n`;
        response += `📊 Processing Progress: 25% complete\n`;
        response += `📅 Estimated Ship Date: June 9, 2025\n`;
        response += `📦 Tracking Number: Will be provided once shipped\n\n`;
        
        response += `📱 Real-Time Tracking Options:\n`;
        response += `• Live GPS tracking for in-transit packages\n`;
        response += `• SMS notifications for all delivery updates\n`;
        response += `• Email alerts for status changes\n`;
        response += `• Mobile app with push notifications\n`;
        response += `• Photo confirmation upon delivery\n\n`;
        
        response += `🎯 Quick Actions for Your Packages:\n`;
        response += `• Update delivery preferences (safe place, neighbor, etc.)\n`;
        response += `• Schedule redelivery if you miss the delivery\n`;
        response += `• Add special delivery instructions\n`;
        response += `• Contact delivery driver directly (for in-transit packages)\n`;
        response += `• Enable vacation hold if you're traveling\n\n`;
        
        response += `Need help with any specific package or want to modify delivery preferences?`;
        
        return response;
    }

    generateProductResponse(analysis) {
        let response = `Hi asarekings! 🛍️ NexaShop Product Information Center (Live Data - 2025-06-08 12:31:07)\n\n`;
        
        response += `🔥 Featured Products with Real-Time Availability:\n\n`;
        
        response += `📱 NexaPhone Pro Max - $1,099.99 ⭐4.9/5 (1,247 reviews)\n`;
        response += `📋 Key Specifications:\n`;
        response += `• Display: 6.7" OLED Super Retina XDR\n`;
        response += `• Storage: 512GB with 8GB RAM\n`;
        response += `• Camera: Triple 48MP Pro camera system\n`;
        response += `• Connectivity: 5G, Wi-Fi 6E, Bluetooth 5.3\n`;
        response += `• Battery: All-day battery with wireless charging\n`;
        response += `📦 Stock Status: 247 units available (Ships from East Coast DC)\n`;
        response += `🔥 Trending: 15% sales increase this week\n`;
        response += `🚚 Shipping: FREE 2-day delivery for Premium Members\n`;
        response += `💎 Premium Member Price: $1,044.99 (5% discount applied)\n\n`;
        
        response += `💻 NexaBook Ultra 16 - $1,599.99 ⭐4.8/5 (856 reviews)\n`;
        response += `📋 Key Specifications:\n`;
        response += `• Processor: M2 Pro chip with 12-core CPU\n`;
        response += `• Memory: 32GB unified memory\n`;
        response += `• Storage: 1TB SSD storage\n`;
        response += `• Display: 16.2" Liquid Retina XDR display\n`;
        response += `• Graphics: 19-core GPU for pro workflows\n`;
        response += `• Ports: 3x Thunderbolt 4, HDMI, SD card slot\n`;
        response += `📦 Stock Status: 89 units available (Ships from West Coast DC)\n`;
        response += `💼 Perfect for: Professionals, creators, developers\n`;
        response += `🎯 Recommended for you based on previous laptop searches\n`;
        response += `💎 Premium Member Price: $1,519.99 (5% discount applied)\n\n`;
        
        response += `🎧 NexaPods Max - $249.99 ⭐4.7/5 (2,103 reviews)\n`;
        response += `📋 Key Specifications:\n`;
        response += `• Audio: Spatial Audio with dynamic head tracking\n`;
        response += `• Noise Control: Active Noise Cancellation\n`;
        response += `• Battery: 30 hours total listening time\n`;
        response += `• Charging: Wireless charging case included\n`;
        response += `• Compatibility: Works with all NexaShop devices\n`;
        response += `• Features: Transparency mode, adaptive EQ\n`;
        response += `📦 Stock Status: 156 units available (Ships from Central DC)\n`;
        response += `🔥 Hot Deal: 20% off - Save $50.00 (Limited time until June 15)\n`;
        response += `💡 Perfect companion for your NexaPhone and NexaBook\n`;
        response += `💎 Premium Member Price: $199.99 (additional 20% off current sale)\n\n`;
        
        response += `💰 Current Exclusive Deals:\n`;
        response += `🏷️ Bundle Special: NexaPhone + NexaPods = Save $75 + FREE wireless charger\n`;
        response += `🏷️ Student Discount: Additional 10% off with valid student ID\n`;
        response += `🏷️ Trade-in Program: Get up to $400 credit for your old device\n`;
        response += `🏷️ Extended Warranty: 3-year protection plan available\n\n`;
        
        response += `Want detailed comparisons, availability in specific colors, or need help choosing the right product for your needs?`;
        
        return response;
    }

    generateTechnicalResponse(analysis) {
        let response = `Hi asarekings! 🔧 NexaShop Technical Support Command Center (2025-06-08 12:31:07)\n\n`;
        
        response += `🌐 Live System Status (All Systems Operational):\n`;
        response += `• Main Website: ✅ 99.99% uptime (0 issues reported)\n`;
        response += `• Mobile App: ✅ Version 3.2.1 running smoothly\n`;
        response += `• Payment Gateway: ✅ All transactions processing normally\n`;
        response += `• Order System: ✅ Real-time processing active\n`;
        response += `• Support Chat: ✅ AI + Human agents available 24/7\n`;
        response += `• Shipping Network: ✅ All carriers operational\n`;
        response += `• Cloud Services: ✅ 100% availability across all regions\n\n`;
        
        response += `🛠️ Quick Device Troubleshooting Guide:\n\n`;
        
        response += `📱 NexaPhone Issues - Step by Step Solutions:\n`;
        response += `1️⃣ Soft Reset: Hold power + volume down for 10 seconds until restart\n`;
        response += `2️⃣ Force Close Apps: Double-tap home, swipe up on frozen apps\n`;
        response += `3️⃣ Check Storage: Settings > Storage (need 1GB+ free space)\n`;
        response += `4️⃣ Update iOS: Settings > General > Software Update\n`;
        response += `5️⃣ Network Reset: Settings > General > Reset > Network Settings\n`;
        response += `6️⃣ Contact Support: If issues persist after these steps\n\n`;
        
        response += `💻 NexaBook Issues - Professional Solutions:\n`;
        response += `1️⃣ Power Cycle: Hold power for 10 seconds, wait 30 seconds, restart\n`;
        response += `2️⃣ Check Connections: Ensure charger, dongles, peripherals secure\n`;
        response += `3️⃣ Activity Monitor: Check for apps using excessive CPU/memory\n`;
        response += `4️⃣ Disk Utility: First Aid to check and repair disk errors\n`;
        response += `5️⃣ Safe Mode: Hold Shift during startup to boot safely\n`;
        response += `6️⃣ Hardware Test: Hold D during startup for diagnostics\n\n`;
        
        response += `🌐 Website & App Issues - Universal Fixes:\n`;
        response += `1️⃣ Clear Browser Cache: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)\n`;
        response += `2️⃣ Disable Extensions: Try incognito/private mode first\n`;
        response += `3️⃣ Update Browser: Ensure latest Chrome, Safari, or Firefox\n`;
        response += `4️⃣ Check Internet: Test with different websites\n`;
        response += `5️⃣ Try Mobile App: Download from App Store if web issues persist\n`;
        response += `6️⃣ Different Device: Test on phone/tablet to isolate issue\n\n`;
        
        response += `🎯 Premium Technical Support Services:\n`;
        response += `• Live Screen Share: Remote assistance with expert technicians\n`;
        response += `• Video Call Support: Face-to-face troubleshooting sessions\n`;
        response += `• Advanced Diagnostics: Deep system analysis and optimization\n`;
        response += `• Same-Day Repair: In-store genius bar appointments available\n`;
        response += `• Express Replacement: 24-hour device replacement program\n`;
        response += `• Data Recovery: Professional data rescue services\n`;
        response += `• Setup Services: Personal setup assistance for new devices\n\n`;
        
        response += `What specific technical issue are you experiencing? I can provide targeted, step-by-step solutions!`;
        
        return response;
    }

    generateBillingResponse(analysis) {
        let response = `Hi asarekings! 💳 NexaShop Secure Billing & Account Center (2025-06-08 12:31:07)\n\n`;
        
        response += `🔒 Your Account Security Overview:\n`;
        response += `• Encryption: Military-grade 256-bit SSL active\n`;
        response += `• Compliance: PCI DSS Level 1 certified\n`;
        response += `• Fraud Protection: Real-time monitoring enabled\n`;
        response += `• Purchase Protection: Zero-liability on all transactions\n`;
        response += `• Data Privacy: Your information never shared or sold\n`;
        response += `• Two-Factor Auth: Optional 2FA available for extra security\n\n`;
        
        response += `📊 Your Complete Account Dashboard (asarekings):\n`;
        response += `• Member Status: Premium Gold Member 🌟 (Since January 2024)\n`;
        response += `• Account Standing: Excellent (Perfect payment history)\n`;
        response += `• Total Orders: 12 successful orders completed\n`;
        response += `• Lifetime Spending: $2,929.97 across all categories\n`;
        response += `• Total Savings: $487.23 from deals and member discounts\n`;
        response += `• Cashback Balance: $58.60 available for immediate use\n`;
        response += `• Store Credit: $25.00 ready to apply to next purchase\n`;
        response += `• Loyalty Points: 2,930 points (enough for $29.30 reward)\n\n`;
        
        response += `💰 Payment Methods & Options:\n`;
        response += `• Primary Card: Visa ****4521 (Expires 08/2027) ✅ Active\n`;
        response += `• Backup Card: MasterCard ****8932 (Expires 03/2026) ✅ Active\n`;
        response += `• PayPal: verified@email.com ✅ Connected\n`;
        response += `• Apple Pay: Configured for quick mobile checkout ✅\n`;
        response += `• Google Pay: Available for Android purchases ✅\n`;
        response += `• Buy Now Pay Later: Klarna, Afterpay, Affirm available\n`;
        response += `• Bank Transfer: ACH direct debit option available\n`;
        response += `• Cryptocurrency: Bitcoin, Ethereum accepted\n\n`;
        
        response += `⚡ Quick Billing Actions:\n`;
        response += `• Update payment methods instantly\n`;
        response += `• Download receipts/invoices for tax purposes\n`;
        response += `• View 24-month transaction history\n`;
        response += `• Set up autopay for subscriptions\n`;
        response += `• Request detailed billing statements\n`;
        response += `• Dispute charges with one-click protection\n`;
        response += `• Update billing address and tax info\n`;
        response += `• Manage recurring subscription payments\n\n`;
        
        response += `🎯 Premium Member Benefits (Active):\n`;
        response += `• Monthly Cashback: 2% on all purchases (June rate)\n`;
        response += `• Free Express Shipping: Unlimited priority delivery\n`;
        response += `• Early Access: 24-hour head start on all sales\n`;
        response += `• Birthday Month: 20% off everything (August benefit coming!)\n`;
        response += `• Extended Returns: 45-day return window vs 30-day standard\n`;
        response += `• Price Protection: Automatic refunds if prices drop\n`;
        response += `• VIP Support: Priority phone and chat support\n`;
        response += `• Exclusive Events: Members-only product launches\n\n`;
        
        response += `What specific billing question can I help you with today?`;
        
        return response;
    }

    generateReturnResponse(analysis) {
        let response = `Hi asarekings! ↩️ NexaShop Returns & Exchanges Center (2025-06-08 12:31:07)\n\n`;
        
        response += `✨ Our Industry-Leading Return Policy:\n`;
        response += `• Return Window: 30 days standard, 45 days for Premium Members\n`;
        response += `• Free Returns: 100% free return shipping, no hidden costs\n`;
        response += `• No Restocking Fees: Ever, on any product category\n`;
        response += `• Lightning Processing: 24-hour inspection guarantee\n`;
        response += `• Full Refund Promise: 100% money back, no questions asked\n`;
        response += `• Condition Flexibility: Items don't need perfect packaging\n`;
        response += `• Holiday Extension: Returns extended to January 31st for holiday purchases\n\n`;
        
        response += `🚀 Simple 3-Step Return Process:\n\n`;
        
        response += `STEP 1 - Instant Return Authorization (30 seconds):\n`;
        response += `• Visit nexashop.com/returns or use mobile app\n`;
        response += `• Enter order number or scan QR code from email\n`;
        response += `• Select items and reason from dropdown\n`;
        response += `• Receive instant approval + return authorization\n`;
        response += `• Print prepaid label or get QR code for mobile\n\n`;
        
        response += `STEP 2 - Hassle-Free Shipping (Multiple Options):\n`;
        response += `• Package securely (original box not required)\n`;
        response += `• Attach prepaid label or show QR code\n`;
        response += `• Drop off at: UPS, FedEx, USPS, or schedule pickup\n`;
        response += `• Pickup Service: Free at-home collection available\n`;
        response += `• Track return journey in real-time\n\n`;
        
        response += `STEP 3 - Fast Refund Processing (Industry Leading):\n`;
        response += `• 24-hour inspection upon arrival\n`;
        response += `• Instant email notification of approval\n`;
        response += `• 2-3 business days for refund to appear\n`;
        response += `• Same-day processing for store credit option\n`;
        response += `• 10% bonus when choosing store credit\n\n`;
        
        response += `📊 Your Return History & Status:\n`;
        response += `• Total Returns: 2 items (Excellent customer record!)\n`;
        response += `• Average Processing: 1.3 days (faster than 2-day promise)\n`;
        response += `• Satisfaction Rating: 5/5 stars (Thank you!)\n`;
        response += `• VIP Return Status: Activated (priority processing)\n`;
        response += `• Success Rate: 100% (all returns approved instantly)\n`;
        response += `• Preferred Customer: Fast-track approval for future returns\n\n`;
        
        response += `🔄 Flexible Exchange & Upgrade Options:\n`;
        response += `• Size/Color Exchange: Same product, different specifications\n`;
        response += `• Product Upgrade: Pay difference for newer/better model\n`;
        response += `• Cross-Category: Exchange phone for laptop, etc.\n`;
        response += `• Store Credit: Get 10% bonus credit instead of refund\n`;
        response += `• Gift Card: Perfect for giving to friends/family\n`;
        response += `• Advanced Exchange: Get new item before returning old one\n\n`;
        
        response += `🎯 Premium Member Return Perks:\n`;
        response += `• Express Processing: 12-hour inspection guarantee\n`;
        response += `• Advance Replacement: New item shipped before return\n`;
        response += `• Personal Return Assistant: Dedicated specialist support\n`;
        response += `• Home Pickup: Free collection service at your convenience\n`;
        response += `• Extended Window: 45 days vs 30-day standard\n`;
        response += `• Priority Queue: Skip to front of processing line\n\n`;
        
        response += `Which item would you like to return or exchange? I can start the process right now!`;
        
        return response;
    }

    generateGreetingResponse() {
        const currentTime = new Date('2025-06-08T12:31:07Z').toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
        
        return `Hello asarekings! 👋 Welcome back to NexaShop Support!\n\n🎫 Your Support Session Details:\n• Ticket Number: ${this.ticketNumber}\n• Session Time: ${currentTime}\n• Account Status: Premium Gold Member 🌟\n• AI Assistant: Fully Active with Enhanced Intent Recognition 🤖\n• Security Level: Military-grade encryption active 🔒\n\n🌟 Complete Support Services Available:\n• 📦 Order Tracking & Delivery Management\n• 🛍️ Product Information & Smart Recommendations\n• 🔄 Returns, Exchanges & Refund Processing\n• 💳 Billing, Payments & Account Management\n• 🔧 Technical Support & Device Troubleshooting\n• 💬 General Questions & Premium Customer Care\n\n🤖 Advanced AI Capabilities:\n• Smart intent recognition for better understanding\n• Real-time sentiment analysis for personalized responses\n• Proactive problem-solving with step-by-step guidance\n• Context-aware conversation memory\n• Predictive assistance based on your history\n\nWhat can I help you with today? I'm equipped with the latest AI to provide exceptional, personalized service! ⚡`;
    }

    generateHelpResponse(analysis) {
        return `I'd be delighted to help you with whatever you need! 😊\n\n🎯 Complete Support Services Available:\n\n📦 Orders & Shipping Support:\n• Real-time package tracking with GPS location\n• Delivery preference management and scheduling\n• Shipping issue resolution and carrier coordination\n• Delivery confirmation and photo proof\n\n🛍️ Product & Shopping Assistance:\n• Detailed product specifications and comparisons\n• Personalized recommendations based on your history\n• Real-time inventory and pricing information\n• Expert advice for choosing the right products\n\n💳 Account & Billing Services:\n• Payment method updates and security management\n• Transaction history and receipt downloads\n• Refund processing and status tracking\n• Billing dispute resolution and protection\n\n🔧 Technical Support Solutions:\n• Step-by-step device troubleshooting\n• Website and app issue resolution\n• Setup assistance and configuration help\n• Hardware diagnostics and repair coordination\n\n↩️ Returns & Exchange Processing:\n• Instant return authorization and label generation\n• Exchange options and upgrade pathways\n• Return status tracking and processing updates\n• Special accommodation for unique situations\n\n🤖 AI-Powered Smart Assistance:\n• Intelligent conversation analysis and understanding\n• Emotional tone detection for empathetic responses\n• Proactive suggestions to prevent future issues\n• Learning system that improves with each interaction\n\nWhat specific area would you like help with? I'll provide detailed, expert assistance tailored just for you!`;
    }

    generateDefaultResponse(analysis) {
        return `Thank you for reaching out to NexaShop Support! 🛍️\n\nI understand you need assistance, and I'm here to provide you with the best possible help. Let me connect you with exactly the right solution for your needs.\n\n🤖 AI Analysis of Your Request:\n• Understanding Confidence: ${Math.round(analysis.intent.confidence * 100)}%\n• Priority Level: ${analysis.urgencyLevel}\n• Complexity Assessment: ${analysis.complexity}\n• Emotional Tone: ${analysis.sentiment.overall}\n\n🎯 Next Steps to Help You:\n• Please provide more specific details about your question\n• Use the quick action buttons above for common requests\n• Ask me anything - I have advanced AI to understand and assist\n• Request human specialist if you prefer personal attention\n\n💡 Pro Tip: The more specific you can be about your question, the better I can tailor my response to give you exactly what you need!\n\nPlease tell me more about what you'd like help with, and I'll provide comprehensive, personalized assistance!`;
    }

    // === AGENT SELECTION ===
    selectBestAgent(analysis) {
        const agents = {
            'Sarah Chen': { specialties: ['orders', 'shipping', 'tracking'], personality: 'efficient' },
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

    // === BASIC FEATURES (same as before) ===
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

    // === INITIALIZATION (same as before with updated message) ===
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.showWelcomeMessage();
        
        window.nexaShopSupport = this;
        
        console.log('✅ NexaShop AI Support System initialized successfully');
        console.log('🎯 Enhanced intent recognition active for better tracking responses');
        this.showNotification('🤖 AI support ready! Enhanced tracking detection enabled.');
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
                <h3>🛍️ Welcome to NexaShop Enhanced AI Support!</h3>
                <div style="margin: 16px 0; padding: 16px; background: rgba(59, 130, 246, 0.05); border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.1);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Support Ticket:</span>
                        <span style="font-weight: 600;">${this.ticketNumber}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Current Time:</span>
                        <span style="font-weight: 600;">2025-06-08 12:31:07 UTC</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Customer:</span>
                        <span style="font-weight: 600;">asarekings (Premium Gold Member 🌟)</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280; font-weight: 500;">AI Enhancement:</span>
                        <span style="font-weight: 600;">🎯 Enhanced Intent Recognition</span>
                    </div>
                </div>
                <p style="margin-bottom: 20px;">Hi asarekings! I'm your enhanced AI support assistant with improved understanding for tracking and support questions. How can I help you today?</p>
            </div>
            
            <div style="margin: 20px 0;">
                <h4>🚀 Quick Actions:</h4>
                <div class="action-grid">
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('How can I track my package?')">
                        <span style="font-size: 20px;">📦</span>
                        Track My Package
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('Where is my order?')">
                        <span style="font-size: 20px;">🚚</span>
                        Find My Order
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
                <p><strong>🎯 Try these enhanced tracking queries:</strong></p>
                <p style="font-size: 14px; margin: 8px 0;">• "How can I track my package?" - Enhanced tracking response</p>
                <p style="font-size: 14px; margin: 8px 0;">• "Where is my order?" - Detailed order status</p>
                <p style="font-size: 14px; margin: 8px 0;">• "Track my shipment" - Live tracking information</p>
                <p style="font-size: 14px; margin: 8px 0;">• "When will my package arrive?" - Delivery predictions</p>
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
        console.log('🤖 Generating enhanced AI response for:', userMessage);
        
        try {
            const aiResponse = this.generateAIResponse(userMessage);
            
            console.log('🧠 Enhanced AI Response generated:', aiResponse);
            
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
                this.showNotification(`🤖 ${aiResponse.agent} responded (Enhanced AI • ${confidencePercent}% confidence)`);
                
                console.log('✅ Enhanced AI response delivered successfully');
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
            <span>🤖 ${agentName} is analyzing your request with enhanced AI...</span>
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
    console.log('🚀 DOM loaded, initializing NexaShop Enhanced AI Support...');
    console.log('📅 Current Time: 2025-06-08 12:31:07 UTC');
    console.log('👤 User: asarekings logged in');
    console.log('🎯 Enhanced intent recognition for tracking queries activated');
    try {
        new NexaShopSupport();
        console.log('✅ NexaShop Enhanced AI Support initialized successfully');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
});

if (document.readyState === 'loading') {
    // Still loading, wait for DOMContentLoaded
} else {
    console.log('DOM already loaded, initializing enhanced AI system immediately...');
    try {
        new NexaShopSupport();
    } catch (error) {
        console.error('❌ Immediate initialization error:', error);
    }
}
