class NexaShopSupport {
    constructor() {
        // Current time as provided: 2025-06-08 13:25:41 UTC
        this.currentDateTime = new Date('2025-06-08T13:25:41Z');
        
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
        
        console.log('🤖 Initializing NexaShop Comprehensive Service AI...');
        console.log('📅 Current Time: 2025-06-08 13:25:41 UTC');
        console.log('👤 User: asarekings logged in');
        console.log('🛍️ Expanded Services: Complete business ecosystem activated');
        
        this.initializeExpandedResponseBank();
        this.initializeBasicFeatures();
        this.init();
    }

    // === EXPANDED COMPREHENSIVE RESPONSE BANK ===
    initializeExpandedResponseBank() {
        this.responseBank = {
            // === CORE SERVICES & OVERVIEW ===
            services: {
                'services_overview': {
                    keywords: [
                        'tell me about your services', 'what services', 'your services', 
                        'what do you offer', 'services available', 'complete services',
                        'not sure', 'help me decide', 'tell me about', 'overview',
                        'what can you do', 'full services', 'service options', 'about nexashop',
                        'make an order but not sure', 'need to make an order'
                    ],
                    response: () => this.generateComprehensiveServicesOverview()
                },
                'shopping_services': {
                    keywords: [
                        'shopping services', 'how to shop', 'shopping experience', 'personal shopping',
                        'shopping assistance', 'product selection', 'shopping guide'
                    ],
                    response: () => this.generateShoppingServicesDetail()
                },
                'business_services': {
                    keywords: [
                        'business services', 'enterprise', 'corporate', 'bulk orders', 'b2b',
                        'business account', 'wholesale', 'procurement', 'corporate solutions'
                    ],
                    response: () => this.generateBusinessServicesDetail()
                },
                'premium_services': {
                    keywords: [
                        'premium services', 'membership benefits', 'vip services', 'premium features',
                        'elite membership', 'premium support', 'concierge services'
                    ],
                    response: () => this.generatePremiumServicesDetail()
                }
            },

            // === ENHANCED ORDER & SHIPPING ===
            orders: {
                'order_list': {
                    keywords: ['order list', 'my orders', 'all orders', 'order history', 'order summary', 'complete order list'],
                    response: () => this.generateComprehensiveOrderList()
                },
                'order_status': {
                    keywords: ['order status', 'order update', 'status of order', 'order progress'],
                    response: () => this.generateDetailedOrderStatus()
                },
                'tracking': {
                    keywords: ['track', 'tracking', 'where is', 'location of', 'package location'],
                    response: () => this.generateAdvancedTracking()
                },
                'delivery_options': {
                    keywords: ['delivery options', 'shipping methods', 'delivery methods', 'shipping options'],
                    response: () => this.generateDeliveryOptionsDetail()
                }
            },

            // === EXPANDED PRODUCT INFORMATION ===
            products: {
                'nexaphone_comprehensive': {
                    keywords: ['nexaphone', 'phone specs', 'phone features', 'nexaphone pro', 'smartphone', 'tell me everything about nexaphone'],
                    response: () => this.generateNexaPhoneComprehensive()
                },
                'nexabook_comprehensive': {
                    keywords: ['nexabook', 'laptop specs', 'laptop features', 'nexabook ultra', 'computer'],
                    response: () => this.generateNexaBookComprehensive()
                },
                'nexapods_comprehensive': {
                    keywords: ['nexapods', 'earbuds', 'headphones', 'nexapods max', 'wireless earbuds'],
                    response: () => this.generateNexaPodsComprehensive()
                },
                'product_comparison': {
                    keywords: ['compare', 'comparison', 'vs', 'difference between', 'which is better'],
                    response: () => this.generateProductComparison()
                }
            },

            // === COMPREHENSIVE BILLING & FINANCIAL ===
            billing: {
                'payment_methods_comprehensive': {
                    keywords: ['payment methods', 'how to pay', 'payment options', 'accepted cards', 'all payment options'],
                    response: () => this.generatePaymentMethodsComprehensive()
                },
                'financing_options': {
                    keywords: ['financing', 'payment plans', 'installments', 'credit', 'loan options'],
                    response: () => this.generateFinancingOptions()
                },
                'billing_support': {
                    keywords: ['billing problem', 'payment issue', 'charge error', 'billing question'],
                    response: () => this.generateBillingSupport()
                }
            },

            // === ENHANCED RETURNS & EXCHANGES ===
            returns: {
                'return_policy_comprehensive': {
                    keywords: ['return policy', 'return rules', 'return process', 'how to return', 'complete return policy'],
                    response: () => this.generateReturnPolicyComprehensive()
                },
                'exchange_services': {
                    keywords: ['exchange', 'swap', 'change item', 'different model', 'upgrade'],
                    response: () => this.generateExchangeServices()
                },
                'warranty_services': {
                    keywords: ['warranty', 'guarantee', 'protection plan', 'coverage', 'repair'],
                    response: () => this.generateWarrantyServices()
                }
            },

            // === TECHNICAL SUPPORT EXPANSION ===
            technical: {
                'troubleshooting_comprehensive': {
                    keywords: ['troubleshooting', 'not working', 'problem', 'issue', 'fix', 'technical issue', 'device not working'],
                    response: () => this.generateTroubleshootingComprehensive()
                },
                'setup_services': {
                    keywords: ['setup', 'installation', 'configuration', 'first time setup'],
                    response: () => this.generateSetupServices()
                },
                'data_services': {
                    keywords: ['data transfer', 'backup', 'sync', 'migration', 'data recovery'],
                    response: () => this.generateDataServices()
                }
            }
        };

        // Enhanced default responses
        this.defaultResponses = {
            no_match: [
                `Thank you for your question, asarekings! I want to make sure I provide you with the most accurate and comprehensive information possible.

🎯 Here's how I can help you get exactly what you need:

Immediate Self-Service Options:
• Your Premium Member Dashboard: Real-time access to orders, billing, and account info
• Comprehensive Knowledge Base: Step-by-step guides for most common questions  
• Product Catalog: Detailed specs, reviews, and compatibility information
• Live Chat: 24/7 support with human specialists
• Mobile App: Full account access with notifications and tracking

🤝 Personal Assistance Available:
• Phone Support: 1-800-NEXASHOP (Premium member priority line)
• Video Call Support: Schedule face-to-face assistance
• In-Store Consultations: 200+ locations with expert staff
• Email Support: support@nexashop.com with 2-hour response guarantee
• Callback Service: We'll call you at your convenience

💡 Popular Topics I Can Help With:
• Complete product information and recommendations
• Order tracking and delivery management  
• Billing, payments, and account questions
• Technical support and troubleshooting
• Returns, exchanges, and warranty services
• Business and enterprise solutions

What specific area interests you most? I'm here to provide detailed, personalized assistance!`
            ],
            
            unclear_request: [
                `I'd love to help you get exactly what you're looking for! To provide the most accurate and detailed response, could you help me understand your specific needs?

💡 Here are some ways to help me assist you better:

For Product Questions:
• "Tell me about the NexaPhone Pro Max features"
• "Compare NexaBook models for video editing" 
• "What accessories work with my NexaPods?"

For Order & Shipping:
• "Where is my order NEX-2025-001248?"
• "I need to track my NexaBook delivery"
• "Can I change my delivery address?"

For Account & Billing:
• "I have a question about my last payment"
• "How do I update my payment method?"
• "I need help with a billing issue"

For Technical Support:
• "My NexaPhone isn't connecting to WiFi"
• "I need help setting up my new laptop"
• "How do I transfer data from my old device?"

🎯 Or simply ask: "What are your complete services?" for a comprehensive overview of everything we offer!

What specific topic can I help you with today?`
            ]
        };

        console.log('🧠 Expanded Response Bank initialized with comprehensive service coverage');
    }

    // === COMPREHENSIVE SERVICE OVERVIEW ===
    generateComprehensiveServicesOverview() {
        return `Hi asarekings! I'm excited to tell you about our complete ecosystem of services at NexaShop. Here's everything we offer to make your technology experience exceptional:

🛍️ Complete NexaShop Services Ecosystem (Updated: 2025-06-08 13:25:41 UTC)

🌟 Core Shopping & E-Commerce Services:

Premium Technology Marketplace:
• Curated selection of 10,000+ cutting-edge technology products
• AI-powered product recommendations based on your usage patterns
• Real-time inventory tracking across 15 global warehouses
• Advanced search with 50+ filter options for precise product discovery
• Detailed product specifications with 360° views and AR previews
• Expert reviews, customer ratings, and compatibility matrices
• Price matching guarantee with 500+ major competitors worldwide
• Exclusive early access to new releases (Premium members get 48-hour head start)

Personalized Shopping Experience:
• Dedicated Personal Shopping Consultants (free for Premium members)
• Custom product bundles tailored to your workflow
• AI-driven smart reorder suggestions based on usage analytics
• Wish list management with price drop notifications
• Birthday and anniversary reminder services with special offers
• Seasonal recommendations and holiday gift curation
• Virtual try-before-you-buy programs for select products

📦 Advanced Fulfillment & Delivery Services:

Global Shipping Network:
• Same-Day Delivery: Available in 75+ major metropolitan areas ($19.99)
• Overnight Express: Next business day delivery ($24.99)
• 2-Day Premium: Free for Premium members, $9.99 for standard
• Standard Shipping: 3-5 business days (FREE on orders over $50)
• International Express: 190+ countries, 2-7 business days
• Freight Services: White-glove delivery for large enterprise orders

Smart Delivery Innovation:
• Real-time GPS tracking with 15-minute delivery windows
• Flexible scheduling: Choose specific 2-hour delivery slots
• Smart delivery options: Secure lockboxes, neighbor delivery, workplace delivery
• Contactless delivery with photo confirmation and digital signatures
• Delivery attempt notifications with instant rescheduling options
• Temperature-controlled shipping for sensitive electronics
• Carbon-neutral delivery options with environmental impact reporting

🎯 Membership & Loyalty Programs:

Premium Gold Membership (Your Current Status 🌟):
• FREE 2-day shipping on all orders (no minimum purchase required)
• Extended 45-day return window (vs 30-day standard)
• Automatic 5% discount on all purchases (applied at checkout)
• Early access to sales events and new product launches
• Priority customer support with dedicated premium phone line
• Extended warranty coverage at no additional cost
• Exclusive member-only events and product preview sessions
• Birthday month 20% discount on entire order

Elite Platinum Membership (Upgrade Available):
• FREE overnight shipping on all orders
• 60-day return window with complimentary pickup service
• Automatic 10% discount on all purchases  
• Personal technology concierge service
• VIP customer support with guaranteed 30-second response time
• Complimentary device setup and data transfer services
• Annual comprehensive tech health check for all devices
• Access to exclusive limited-edition products

💳 Comprehensive Financial Services:

Flexible Payment Solutions:
• All major credit and debit cards (Visa, MC, Amex, Discover, JCB)
• Digital wallets: Apple Pay, Google Pay, Samsung Pay, PayPal
• Buy Now, Pay Later: Klarna, Afterpay, Affirm, Zip (0% APR available)
• Cryptocurrency: Bitcoin, Ethereum, Litecoin, Bitcoin Cash
• Corporate accounts with NET-30, NET-60, and NET-90 terms
• International payment support with 25+ local currencies

NexaShop Credit & Financing:
• NexaShop Credit Card: 3% cashback on all purchases, 0% APR for 15 months
• Instant credit decisions with approval amounts up to $25,000
• Special promotional financing: 0% APR for 12-48 months on qualifying purchases
• Trade-in credit program: Up to $1,200 credit for qualifying devices
• Layaway program: Reserve items with 25% down, pay over 6 months
• Business credit lines with revolving credit up to $100,000

🔧 Technical Support & Professional Services:

24/7 Technical Support Excellence:
• Multi-channel support: Phone, chat, email, video, and in-person
• Remote diagnostic services with screen sharing capabilities
• On-site technical support for business customers (within 4 hours)
• Dedicated technical account managers for enterprise clients
• Multi-language support in 12 languages
• Average response time: 30 seconds for Premium members

Expert Professional Services:
• Device setup and configuration (free for Premium members)
• Data migration and transfer services ($99 value, free for Premium)
• Network design and implementation for businesses
• Custom software installation and configuration
• Cybersecurity assessment and implementation
• Cloud integration and backup solutions
• Smart home and IoT device integration
• Regular maintenance and optimization packages

🛡️ Protection & Security Services:

Comprehensive Protection Plans:
• Extended warranties: 2-5 years beyond manufacturer coverage
• Accidental damage protection: Covers drops, spills, and impacts
• Theft and loss protection: Device replacement within 24 hours
• Global coverage: Protection valid in 100+ countries
• No-deductible repair services at authorized service centers
• Rapid replacement program: Next-day device replacement
• Data recovery services: Professional data rescue from damaged devices

Advanced Security Services:
• Identity theft protection and monitoring ($200 value included)
• VPN services: Secure browsing and privacy protection
• Comprehensive antivirus and malware protection suites
• Privacy consultation and digital security setup
• Secure cloud backup with end-to-end encryption
• Parental control setup and family safety management
• Business cybersecurity audits and compliance assistance

🏢 Business & Enterprise Solutions:

Corporate Technology Services:
• Volume discounts: 5-25% off based on annual purchase volume
• Custom procurement solutions with dedicated account management
• Asset management and inventory tracking services
• Device lifecycle management from purchase to disposal
• Custom configuration and imaging services
• Deployment services: On-site setup for 100+ devices
• Training programs for employee technology adoption

Enterprise Support Services:
• Dedicated business account managers
• Priority support with guaranteed 15-minute response times
• Custom service level agreements (SLAs)
• Bulk device management and monitoring
• Enterprise security solutions and compliance support
• Lease-to-own programs for equipment financing
• End-of-life device recycling and data destruction

🎓 Educational & Institutional Services:

Academic Programs:
• Student discounts: 10% off all products with valid student ID
• Educator pricing: Special rates for teachers and faculty
• Institutional volume pricing for schools and universities
• Grant application assistance for technology funding
• Summer storage programs for educational devices
• Classroom setup and training services
• Educational software licensing and management

🌍 Global & International Services:

Worldwide Reach:
• Service in 190+ countries and territories
• Local customer support in 12 languages
• Regional warehouses for faster international delivery
• Local warranty and repair services in major markets
• Export documentation and customs assistance
• Cultural customization for regional preferences

Environmental & Social Responsibility:
• Carbon-neutral shipping options in 50+ countries
• Electronic waste recycling and responsible disposal
• Solar-powered fulfillment centers (75% of operations)
• Device refurbishment and second-life programs
• Community technology education initiatives
• Sustainable packaging with 90% recyclable materials

💡 Getting Started - Perfect for Your Ordering Needs:

Since you mentioned interest in making an order but weren't sure, here's how I can help you today:

1. Needs Assessment:
   • What type of technology are you looking for?
   • Personal use, business, or educational purposes?
   • Budget range and timeline considerations?
   • Specific features or requirements?

2. Product Consultation:
   • Personalized recommendations based on your needs
   • Detailed comparisons between options
   • Compatibility analysis with existing devices
   • Future-proofing considerations

3. Custom Solution Design:
   • Bundle packages for cost savings
   • Financing and payment options review
   • Service add-ons and protection plans
   • Implementation and setup planning

4. Seamless Ordering:
   • Guided checkout process
   • Multiple payment and delivery options
   • Order tracking and communication preferences
   • Post-purchase support planning

🎯 What specific area interests you most?
• Consumer Electronics (phones, laptops, tablets, audio)
• Business Solutions (fleet management, productivity tools)
• Smart Home & IoT (automation, security, entertainment)
• Gaming & Entertainment (consoles, VR, streaming)
• Professional Equipment (creative tools, development hardware)
• Educational Technology (learning tools, classroom solutions)

I'm here to provide detailed information about any of these categories and help guide you to the perfect solution for your needs!`;
    }

    // === COMPREHENSIVE ORDER LIST ===
    generateComprehensiveOrderList() {
        const currentTime = new Date().toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        });

        return `Hi asarekings! Here's your complete order history and current status (Updated: ${currentTime} UTC)

📋 Complete Order Dashboard - asarekings Premium Account

Current Active Orders (3):

✅ Order NEX-2025-001247 - $1,099.99
📱 NexaPhone Pro Max (Space Black, 512GB)
📅 Order Date: May 28, 2025 | Delivered: June 3, 2025 at 4:45 PM
📍 Delivery Status: COMPLETED - Delivered to front door with signature
📦 Package Condition: Excellent (No damage reported)
🔍 Tracking: NEX1234567890
📋 Delivery Notes: "Left with resident at front door"
⭐ Your Rating: Pending (Please rate your experience)
💳 Payment: Visa ****4521 - Charged successfully
📄 Invoice: Available for download in your account

🚚 Order NEX-2025-001248 - $1,599.99
💻 NexaBook Ultra 16 (Silver, 32GB RAM, 1TB SSD)
📅 Order Date: June 1, 2025 | Shipped: June 5, 2025
📍 Current Status: IN TRANSIT - Last location: Chicago Distribution Hub
🚛 Carrier: FedEx Express | Driver: Michael S.
📊 Delivery Progress: 75% complete | 2 stops remaining
📅 Expected Delivery: Tomorrow, June 10, 2025
⏰ Delivery Window: 10:00 AM - 2:00 PM (Signature required)
🔍 Live Tracking: NEX1234567891 (GPS tracking available after 9 AM)
📱 SMS Updates: Enabled - You'll receive delivery notifications

⏳ Order NEX-2025-001249 - $329.98
🎧 NexaPods Max + Wireless Charger Bundle (Midnight Black)
📅 Order Date: June 7, 2025 | Processing Started: Today
📍 Current Status: IN FULFILLMENT - Austin Processing Center
⚙️ Current Stage: Quality inspection completed ✅
📦 Next Steps: Final packaging and shipping label creation
📊 Processing Progress: 45% complete
📅 Expected Ship Date: June 9, 2025 (Tomorrow)
📅 Expected Delivery: June 11-12, 2025
🔍 Tracking Number: Will be generated when shipped

📊 Order History Summary:
• Total Orders This Year: 12 completed orders
• Total Order Value: $2,929.97
• Average Order Processing Time: 1.2 days
• On-Time Delivery Rate: 100% (Excellent!)
• Customer Satisfaction Score: 4.9/5 stars
• Premium Member Benefits Applied: $146.50 in automatic savings

🎯 Quick Order Actions Available:
• Track any order with real-time GPS location
• Modify delivery address or delivery instructions
• Schedule delivery for a specific time slot
• Set up delivery notifications via SMS/email
• Download invoices and receipts for tax purposes
• Initiate returns or exchanges with one click
• Contact delivery drivers directly (for in-transit orders)
• Rate and review delivered products

💎 Premium Member Benefits Applied:
• Free 2-day shipping on all orders ✅
• Priority processing and fulfillment ✅
• Extended 45-day return window ✅
• Dedicated premium customer support ✅
• Early access to new product launches ✅
• Exclusive member-only deals and discounts ✅

Need specific details about any order, want to modify delivery preferences, or have questions about your order history?`;
    }

    // === COMPREHENSIVE NEXAPHONE INFO ===
    generateNexaPhoneComprehensive() {
        return `Hi asarekings! Here's everything you need to know about the NexaPhone Pro Max:

📱 NexaPhone Pro Max - Complete Product Guide

🌟 Overview:
The NexaPhone Pro Max represents the pinnacle of smartphone technology, combining cutting-edge innovation with premium craftsmanship. Designed for professionals, creators, and tech enthusiasts who demand the absolute best.

📋 Detailed Technical Specifications:

Display & Design:
• Screen: 6.7" OLED Super Retina XDR Display
• Resolution: 2796 x 1290 pixels (460 PPI)
• Brightness: 2000 nits peak brightness (industry leading)
• Refresh Rate: ProMotion 120Hz adaptive refresh rate
• Display Protection: Ceramic Shield front, tougher than any smartphone glass
• Colors: Space Black, Silver, Gold, Deep Purple, Alpine Green
• Build: Aerospace-grade titanium frame with textured matte glass back
• Water Resistance: IP68 (6 meters for 30 minutes)
• Dimensions: 160.7 x 77.6 x 7.85 mm
• Weight: 240 grams (perfectly balanced)

Performance & Processing:
• Chip: A17 Pro Bionic with 6-core CPU
• GPU: 6-core GPU with hardware-accelerated ray tracing
• Neural Engine: 16-core for advanced machine learning
• Memory: 8GB RAM (unified memory architecture)
• Storage Options: 256GB, 512GB, 1TB (no expandable storage needed)
• Performance: 20% faster CPU, 30% faster GPU than previous generation

Camera System (Pro Photography & Video):
• Main Camera: 48MP with f/1.78 aperture
• Ultra Wide: 12MP with f/2.2 aperture, 120° field of view
• Telephoto: 12MP with f/2.8 aperture, 3x optical zoom
• Front Camera: 12MP TrueDepth with f/1.9 aperture
• Video Recording: 4K ProRes at 60fps, Dolby Vision HDR
• Advanced Features: Night mode, Portrait mode, Cinematic mode
• Optical Image Stabilization on all lenses
• LiDAR scanner for enhanced AR and improved autofocus

💰 Pricing & Value:

Current Pricing (Premium Member Discount Applied):
• 256GB: $1,099.99 → $1,044.99 (5% member discount)
• 512GB: $1,299.99 → $1,234.99 (5% member discount)
• 1TB: $1,599.99 → $1,519.99 (5% member discount)

Financing Options:
• 0% APR for 24 months (qualified customers)
• Monthly payments as low as $43.54/month
• Trade-in credit up to $800 for eligible devices
• Student discount: Additional 10% off with valid student ID

🏆 Awards & Recognition:
• "Best Smartphone 2025" - Tech Review Magazine
• "Editor's Choice" - Digital Trends
• "Innovation Award" - Consumer Electronics Show 2025
• "Best Camera Phone" - Photography Weekly

Ready to experience the future of smartphones? Want to see specific comparisons with other models, or need help choosing the right storage capacity for your needs?`;
    }

    // === TROUBLESHOOTING COMPREHENSIVE ===
    generateTroubleshootingComprehensive() {
        return `Hi asarekings! I'm here to help resolve any technical issues you're experiencing. Here's our comprehensive troubleshooting guide:

🔧 Complete Technical Support & Troubleshooting Guide

🎯 Universal Quick Fixes (Try These First):

Power Cycle Solution:
1. Turn off your device completely
2. Wait 30 seconds (important - lets capacitors discharge)
3. Turn device back on
4. Check if issue is resolved
Success Rate: 60% of issues resolved with this simple step

Force Restart (For Frozen Devices):
• NexaPhone: Hold Power + Volume Down for 10 seconds
• NexaBook: Hold Power button for 10 seconds, then restart
• NexaPods: Place in case, hold setup button for 15 seconds

📱 NexaPhone Troubleshooting:

Common Issues & Solutions:

App Crashes or Freezing:
1. Force close the problematic app (double-tap home, swipe up)
2. Clear app cache: Settings > General > iPhone Storage > [App] > Offload App
3. Update the app from App Store
4. Restart your device
5. If persistent: Delete and reinstall the app

Slow Performance:
1. Check available storage (need at least 1GB free)
2. Close background apps not in use
3. Disable visual effects: Settings > Accessibility > Motion > Reduce Motion
4. Reset network settings: Settings > General > Reset > Reset Network Settings
5. Update to latest iOS version

Battery Draining Fast:
1. Check battery usage: Settings > Battery > Battery Usage by App
2. Enable Low Power Mode temporarily
3. Disable background app refresh for unnecessary apps
4. Reduce screen brightness or enable auto-brightness
5. Turn off location services for apps that don't need it

💻 NexaBook Troubleshooting:

Performance Issues:
1. Check Activity Monitor for high CPU usage apps
2. Free up disk space (need at least 10GB free)
3. Close unnecessary browser tabs and applications
4. Reset SMC: Shut down, press Shift+Control+Option+Power for 10 seconds
5. Reset NVRAM: Restart holding Option+Command+P+R until second startup sound

🎧 NexaPods Troubleshooting:

Connection Issues:
1. Check Bluetooth is enabled on device
2. Place NexaPods in case for 15 seconds, then remove
3. Forget device and re-pair: Settings > Bluetooth > [Device] > Forget
4. Clean charging contacts with dry cotton swab
5. Reset NexaPods: Hold setup button for 15 seconds

🆘 When to Escalate:

Contact Professional Support If:
• Hardware damage suspected (cracks, water damage, physical impact)
• Issues persist after following all troubleshooting steps
• Device is within warranty period and needs replacement
• Data recovery needed from damaged device
• Business-critical devices requiring immediate resolution

What specific issue are you experiencing? I can provide more targeted troubleshooting steps based on your exact problem and device model.`;
    }

    // === ENHANCED SMART RESPONSE MATCHING ===
    findBestResponse(userMessage) {
        const messageLower = userMessage.toLowerCase();
        let bestMatch = null;
        let highestScore = 0;
        let matchedCategory = null;
        let matchedKey = null;

        // Advanced scoring algorithm
        Object.entries(this.responseBank).forEach(([category, responses]) => {
            Object.entries(responses).forEach(([key, responseData]) => {
                let score = 0;
                
                // Exact phrase matching (highest priority)
                responseData.keywords.forEach(keyword => {
                    if (messageLower === keyword.toLowerCase()) {
                        score += 100; // Very high score for exact matches
                    } else if (messageLower.includes(keyword.toLowerCase())) {
                        // Partial phrase matching
                        const keywordWords = keyword.toLowerCase().split(' ');
                        const messageWords = messageLower.split(' ');
                        
                        // Calculate word overlap percentage
                        const overlap = keywordWords.filter(word => 
                            messageWords.some(msgWord => msgWord.includes(word) || word.includes(msgWord))
                        ).length;
                        
                        const overlapScore = (overlap / keywordWords.length) * (keywordWords.length * 10);
                        score += overlapScore;
                    }
                });
                
                // Context-aware boosting
                if (category === 'services' && (messageLower.includes('tell me') || messageLower.includes('about') || messageLower.includes('not sure'))) {
                    score += 20;
                }
                
                if (category === 'orders' && (messageLower.includes('my') || messageLower.includes('order'))) {
                    score += 15;
                }
                
                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = responseData;
                    matchedCategory = category;
                    matchedKey = key;
                }
            });
        });

        console.log('🔍 Enhanced response matching:', {
            userMessage,
            bestMatchScore: highestScore,
            matchedCategory,
            matchedKey,
            threshold: 5
        });

        // Return best match if score meets threshold
        if (highestScore >= 5) {
            return bestMatch.response();
        }

        // Return contextual default response
        return this.getContextualDefaultResponse(messageLower);
    }

    getContextualDefaultResponse(messageLower) {
        let responseType = 'no_match';
        
        if (messageLower.length < 15 || messageLower.split(' ').length < 4) {
            responseType = 'unclear_request';
        }
        
        // Check for question words to provide more helpful default
        const questionWords = ['what', 'how', 'when', 'where', 'why', 'can', 'could', 'would', 'should'];
        if (questionWords.some(word => messageLower.includes(word))) {
            responseType = 'unclear_request';
        }
        
        const responses = this.defaultResponses[responseType];
        const randomIndex = Math.floor(Math.random() * responses.length);
        
        return responses[randomIndex];
    }

    // === AI RESPONSE GENERATION (ENHANCED) ===
    generateAIResponse(userMessage) {
        console.log('🤖 Processing with Enhanced Response Bank:', userMessage);
        
        // Use enhanced response bank matching
        const response = this.findBestResponse(userMessage);
        
        // Enhanced agent selection
        const agent = this.selectEnhancedAgent(userMessage);
        
        // Enhanced confidence calculation
        const confidence = this.calculateEnhancedConfidence(userMessage, response);
        
        // Store conversation context for learning
        this.updateConversationContext(userMessage, response);
        
        return {
            response: response,
            agent: agent,
            analysis: {
                intent: { intent: this.determineEnhancedIntent(userMessage) },
                confidence: confidence,
                responseSource: this.identifyResponseSource(response)
            },
            confidence: confidence
        };
    }

    selectEnhancedAgent(message) {
        const messageLower = message.toLowerCase();
        
        // Enhanced agent selection based on comprehensive keyword analysis
        const agentKeywords = {
            'Sarah Chen': ['order', 'track', 'delivery', 'shipping', 'status', 'package'],
            'Mike Rodriguez': ['technical', 'not working', 'setup', 'troubleshoot', 'fix', 'install'],
            'Emma Wilson': ['product', 'phone', 'laptop', 'compare', 'recommend', 'features'],
            'Alex Thompson': ['billing', 'payment', 'refund', 'charge', 'finance', 'credit'],
            'Lisa Chang': ['return', 'exchange', 'damaged', 'defective', 'warranty', 'replace'],
            'David Park': ['business', 'enterprise', 'corporate', 'bulk', 'b2b', 'procurement'],
            'Maria Garcia': ['services', 'membership', 'premium', 'benefits', 'support', 'help']
        };
        
        let bestAgent = 'Sarah Chen';
        let maxMatches = 0;
        
        Object.entries(agentKeywords).forEach(([agent, keywords]) => {
            const matches = keywords.filter(keyword => messageLower.includes(keyword)).length;
            if (matches > maxMatches) {
                maxMatches = matches;
                bestAgent = agent;
            }
        });
        
        return bestAgent;
    }

    calculateEnhancedConfidence(message, response) {
        const responseLength = response.length;
        const isDefaultResponse = this.defaultResponses.no_match.includes(response) || 
                                 this.defaultResponses.unclear_request.includes(response);
        
        if (isDefaultResponse) return 0.15;
        
        if (responseLength > 3000) return 0.98; // Very comprehensive responses
        if (responseLength > 2000) return 0.95; // Comprehensive responses
        if (responseLength > 1000) return 0.90; // Detailed responses
        if (responseLength > 500) return 0.85;  // Good responses
        
        return 0.75; // Standard responses
    }

    determineEnhancedIntent(message) {
        const messageLower = message.toLowerCase();
        
        const intentPatterns = {
            'services_inquiry': ['services', 'what do you offer', 'tell me about', 'complete', 'not sure', 'make an order'],
            'order_inquiry': ['order', 'track', 'delivery', 'package', 'shipping'],
            'product_inquiry': ['product', 'phone', 'laptop', 'specs', 'features'],
            'billing_inquiry': ['billing', 'payment', 'charge', 'refund', 'finance'],
            'technical_inquiry': ['technical', 'not working', 'setup', 'fix', 'troubleshoot'],
            'return_inquiry': ['return', 'exchange', 'replace', 'damaged', 'defective'],
            'business_inquiry': ['business', 'enterprise', 'corporate', 'b2b', 'bulk'],
            'membership_inquiry': ['membership', 'premium', 'benefits', 'upgrade'],
            'general_conversation': ['hello', 'hi', 'thanks', 'help']
        };
        
        for (const [intent, patterns] of Object.entries(intentPatterns)) {
            if (patterns.some(pattern => messageLower.includes(pattern))) {
                return intent;
            }
        }
        
        return 'general_conversation';
    }

    identifyResponseSource(response) {
        if (this.defaultResponses.no_match.includes(response)) return 'default_no_match';
        if (this.defaultResponses.unclear_request.includes(response)) return 'default_unclear';
        if (response.length > 2000) return 'comprehensive_response_bank';
        return 'standard_response_bank';
    }

    updateConversationContext(userMessage, response) {
        this.conversationContext.push({
            userMessage: userMessage,
            responseLength: response.length,
            timestamp: Date.now(),
            intent: this.determineEnhancedIntent(userMessage)
        });
        
        if (this.conversationContext.length > 10) {
            this.conversationContext.shift();
        }
    }

    // === INITIALIZATION ===
    initializeBasicFeatures() {
        this.inventory = {
            "nexaphone-pro": { stock: 247, warehouse: "East Coast DC", trending: true },
            "nexabook-ultra": { stock: 89, warehouse: "West Coast DC", trending: false },
            "nexapods-max": { stock: 156, warehouse: "Central DC", trending: true },
            "nexawatch-series": { stock: 203, warehouse: "Central DC", trending: true },
            "nexacharge-wireless": { stock: 445, warehouse: "All DCs", trending: false }
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
                },
                {
                    id: "NEX-2025-001249",
                    status: "processing",
                    items: ["NexaPods Max", "Wireless Charger"],
                    total: 329.98,
                    deliveryProgress: 25
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
            responseSourceTracking: {},
            trackInteraction: (action, category, data = {}) => {
                this.analytics.interactionCount++;
                console.log('📈 Enhanced interaction tracked:', { action, category, data });
            }
        };
        
        console.log('✅ Enhanced basic features initialized');
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.showWelcomeMessage();
        
        window.nexaShopSupport = this;
        
        console.log('✅ NexaShop Comprehensive Service AI initialized successfully');
        console.log('🛍️ Enhanced Response Bank: Complete business ecosystem active');
        this.showNotification('🤖 Comprehensive Service AI ready! Ask about any of our services.');
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
                <h3>🛍️ Welcome to NexaShop Comprehensive Service AI!</h3>
                <div style="margin: 16px 0; padding: 16px; background: rgba(59, 130, 246, 0.05); border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.1);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Support Ticket:</span>
                        <span style="font-weight: 600;">${this.ticketNumber}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Current Time:</span>
                        <span style="font-weight: 600;">2025-06-08 13:25:41 UTC</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Customer:</span>
                        <span style="font-weight: 600;">asarekings (Premium Gold Member 🌟)</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280; font-weight: 500;">AI Engine:</span>
                        <span style="font-weight: 600;">🛍️ Comprehensive Service AI</span>
                    </div>
                </div>
                <p style="margin-bottom: 20px;">Hi asarekings! I'm equipped with comprehensive knowledge about all our services - from simple product questions to complex enterprise solutions. Ask me anything!</p>
            </div>
            
            <div style="margin: 20px 0;">
                <h4>🚀 Try These Comprehensive Service Questions:</h4>
                <div class="action-grid">
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I need to make an order but I am not sure, tell me about your services?')">
                        <span style="font-size: 20px;">🛍️</span>
                        Complete Services Overview
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('What business services do you offer?')">
                        <span style="font-size: 20px;">🏢</span>
                        Business Solutions
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('Tell me about premium membership benefits')">
                        <span style="font-size: 20px;">🌟</span>
                        Premium Services
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I need my complete order list with tracking details')">
                        <span style="font-size: 20px;">📦</span>
                        Order Management
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('Tell me everything about the NexaPhone Pro Max')">
                        <span style="font-size: 20px;">📱</span>
                        Product Information
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I have a complex technical issue that needs detailed help')">
                        <span style="font-size: 20px;">🔧</span>
                        Technical Support
                    </button>
                </div>
            </div>

            <div style="margin-top: 20px; padding: 16px; background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%); border-radius: 12px; border: 1px solid rgba(34, 197, 94, 0.2);">
                <p><strong>🛍️ Comprehensive Service Features:</strong></p>
                <p style="font-size: 14px; margin: 8px 0;">✅ Complete services overview for uncertain customers</p>
                <p style="font-size: 14px; margin: 8px 0;">✅ Detailed product specifications and comparisons</p>
                <p style="font-size: 14px; margin: 8px 0;">✅ Business and enterprise solutions</p>
                <p style="font-size: 14px; margin: 8px 0;">✅ Technical troubleshooting guides</p>
                <p style="font-size: 14px; margin: 8px 0;">✅ Smart fallback responses for any question</p>
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
            this.generateComprehensiveResponse(content, startTime);
        }, 800 + Math.random() * 1200);
    }

    generateComprehensiveResponse(userMessage, startTime) {
        console.log('🤖 Generating comprehensive response:', userMessage);
        
        try {
            const aiResponse = this.generateAIResponse(userMessage);
            
            console.log('🧠 Comprehensive response generated:', aiResponse);
            
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
                this.showNotification(`🤖 ${aiResponse.agent} responded (Comprehensive AI • ${confidencePercent}% confidence)`);
                
                console.log('✅ Comprehensive response delivered');
            }, 1200 + Math.random() * 800);
        } catch (error) {
            console.error('❌ Error generating response:', error);
            
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
            'services_inquiry': 'support',
            'order_inquiry': 'orders',
            'technical_inquiry': 'technical',
            'product_inquiry': 'products',
            'billing_inquiry': 'billing',
            'return_inquiry': 'returns',
            'business_inquiry': 'business',
            'membership_inquiry': 'support',
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
            <span>🤖 ${agentName} is processing with Comprehensive AI...</span>
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
            support: '#06b6d4',
            business: '#059669'
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
    console.log('🚀 DOM loaded, initializing NexaShop Comprehensive AI...');
    console.log('📅 Current Time: 2025-06-08 13:25:41 UTC');
    console.log('👤 User: asarekings logged in');
    console.log('🛍️ Comprehensive Services: All service categories active');
    try {
        new NexaShopSupport();
        console.log('✅ NexaShop Comprehensive Service AI initialized successfully');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
});

if (document.readyState === 'loading') {
    // Still loading, wait for DOMContentLoaded
} else {
    console.log('DOM already loaded, initializing comprehensive AI immediately...');
    try {
        new NexaShopSupport();
    } catch (error) {
        console.error('❌ Immediate initialization error:', error);
    }
}
