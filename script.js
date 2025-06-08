class NexaShopSupport {
    constructor() {
        // Current time as provided: 2025-06-08 12:54:44 UTC
        this.currentDateTime = new Date('2025-06-08T12:54:44Z');
        
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
        
        console.log('🤖 Initializing NexaShop Large Response Bank AI...');
        console.log('📅 Current Time: 2025-06-08 12:54:44 UTC');
        console.log('👤 User: asarekings logged in');
        console.log('🧠 Large Response Bank: Comprehensive answer database activated');
        
        this.initializeLargeResponseBank();
        this.initializeBasicFeatures();
        this.init();
    }

    // === LARGE RESPONSE BANK SYSTEM ===
    initializeLargeResponseBank() {
        this.responseBank = {
            // === ORDER & SHIPPING RESPONSES ===
            orders: {
                'order_list': {
                    keywords: ['order list', 'my orders', 'all orders', 'order history', 'order summary'],
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
                'delivery_time': {
                    keywords: ['when will', 'delivery time', 'arrival time', 'expected delivery', 'eta'],
                    response: () => this.generateDeliveryTimeInfo()
                },
                'shipping_options': {
                    keywords: ['shipping options', 'delivery options', 'shipping methods', 'express shipping'],
                    response: () => this.generateShippingOptions()
                },
                'modify_delivery': {
                    keywords: ['change delivery', 'modify delivery', 'reschedule delivery', 'delivery preferences'],
                    response: () => this.generateDeliveryModification()
                },
                'missing_package': {
                    keywords: ['missing package', 'lost package', 'package not delivered', 'where is my package'],
                    response: () => this.generateMissingPackageHelp()
                },
                'delivery_issues': {
                    keywords: ['delivery problem', 'delivery issue', 'wrong address', 'failed delivery'],
                    response: () => this.generateDeliveryIssuesHelp()
                }
            },

            // === PRODUCT INFORMATION RESPONSES ===
            products: {
                'nexaphone_info': {
                    keywords: ['nexaphone', 'phone specs', 'phone features', 'nexaphone pro', 'phone information'],
                    response: () => this.generateNexaPhoneInfo()
                },
                'nexabook_info': {
                    keywords: ['nexabook', 'laptop specs', 'laptop features', 'nexabook ultra', 'laptop information'],
                    response: () => this.generateNexaBookInfo()
                },
                'nexapods_info': {
                    keywords: ['nexapods', 'earbuds', 'headphones', 'nexapods max', 'wireless earbuds'],
                    response: () => this.generateNexaPodsInfo()
                },
                'product_comparison': {
                    keywords: ['compare', 'comparison', 'vs', 'difference between', 'which is better'],
                    response: () => this.generateProductComparison()
                },
                'availability': {
                    keywords: ['available', 'in stock', 'stock status', 'inventory', 'when available'],
                    response: () => this.generateAvailabilityInfo()
                },
                'pricing': {
                    keywords: ['price', 'cost', 'how much', 'pricing', 'deals', 'discounts'],
                    response: () => this.generatePricingInfo()
                },
                'accessories': {
                    keywords: ['accessories', 'cases', 'chargers', 'cables', 'add-ons'],
                    response: () => this.generateAccessoriesInfo()
                },
                'warranty': {
                    keywords: ['warranty', 'guarantee', 'protection plan', 'coverage', 'repair'],
                    response: () => this.generateWarrantyInfo()
                }
            },

            // === BILLING & PAYMENT RESPONSES ===
            billing: {
                'payment_methods': {
                    keywords: ['payment methods', 'how to pay', 'payment options', 'accepted cards'],
                    response: () => this.generatePaymentMethods()
                },
                'billing_issue': {
                    keywords: ['billing problem', 'payment issue', 'charge error', 'billing question'],
                    response: () => this.generateBillingIssueHelp()
                },
                'refund_status': {
                    keywords: ['refund status', 'refund update', 'when refund', 'refund time'],
                    response: () => this.generateRefundStatus()
                },
                'invoice': {
                    keywords: ['invoice', 'receipt', 'billing statement', 'download receipt'],
                    response: () => this.generateInvoiceHelp()
                },
                'payment_security': {
                    keywords: ['payment security', 'safe payment', 'secure checkout', 'payment protection'],
                    response: () => this.generatePaymentSecurity()
                },
                'subscription': {
                    keywords: ['subscription', 'recurring payment', 'auto pay', 'monthly charge'],
                    response: () => this.generateSubscriptionInfo()
                }
            },

            // === RETURNS & EXCHANGES RESPONSES ===
            returns: {
                'return_process': {
                    keywords: ['how to return', 'return process', 'return steps', 'return procedure'],
                    response: () => this.generateReturnProcess()
                },
                'return_policy': {
                    keywords: ['return policy', 'return rules', 'return window', 'return terms'],
                    response: () => this.generateReturnPolicy()
                },
                'exchange_process': {
                    keywords: ['exchange', 'swap', 'change item', 'different size', 'different color'],
                    response: () => this.generateExchangeProcess()
                },
                'return_shipping': {
                    keywords: ['return shipping', 'return label', 'how to ship back', 'return cost'],
                    response: () => this.generateReturnShipping()
                },
                'damaged_item': {
                    keywords: ['damaged', 'broken', 'defective', 'not working', 'faulty'],
                    response: () => this.generateDamagedItemHelp()
                },
                'wrong_item': {
                    keywords: ['wrong item', 'incorrect item', 'different item', 'not what ordered'],
                    response: () => this.generateWrongItemHelp()
                }
            },

            // === TECHNICAL SUPPORT RESPONSES ===
            technical: {
                'device_setup': {
                    keywords: ['setup', 'initial setup', 'first time setup', 'configure', 'install'],
                    response: () => this.generateDeviceSetup()
                },
                'troubleshooting': {
                    keywords: ['not working', 'problem', 'issue', 'error', 'bug', 'fix'],
                    response: () => this.generateTroubleshooting()
                },
                'software_update': {
                    keywords: ['update', 'software update', 'firmware', 'latest version'],
                    response: () => this.generateSoftwareUpdate()
                },
                'connectivity': {
                    keywords: ['wifi', 'bluetooth', 'connection', 'network', 'internet'],
                    response: () => this.generateConnectivityHelp()
                },
                'performance': {
                    keywords: ['slow', 'laggy', 'performance', 'speed', 'optimization'],
                    response: () => this.generatePerformanceHelp()
                },
                'data_transfer': {
                    keywords: ['transfer data', 'move files', 'backup', 'sync', 'migration'],
                    response: () => this.generateDataTransferHelp()
                }
            },

            // === ACCOUNT & MEMBERSHIP RESPONSES ===
            account: {
                'account_info': {
                    keywords: ['account info', 'profile', 'account details', 'membership'],
                    response: () => this.generateAccountInfo()
                },
                'premium_benefits': {
                    keywords: ['premium benefits', 'membership perks', 'premium features', 'member advantages'],
                    response: () => this.generatePremiumBenefits()
                },
                'password_reset': {
                    keywords: ['reset password', 'forgot password', 'change password', 'password help'],
                    response: () => this.generatePasswordReset()
                },
                'update_info': {
                    keywords: ['update info', 'change address', 'update profile', 'modify account'],
                    response: () => this.generateUpdateInfo()
                },
                'privacy_settings': {
                    keywords: ['privacy', 'data protection', 'privacy settings', 'personal data'],
                    response: () => this.generatePrivacySettings()
                }
            },

            // === GENERAL RESPONSES ===
            general: {
                'store_hours': {
                    keywords: ['store hours', 'operating hours', 'open hours', 'business hours'],
                    response: () => this.generateStoreHours()
                },
                'contact_info': {
                    keywords: ['contact', 'phone number', 'email', 'address', 'location'],
                    response: () => this.generateContactInfo()
                },
                'about_company': {
                    keywords: ['about nexashop', 'company info', 'who are you', 'about company'],
                    response: () => this.generateAboutCompany()
                },
                'careers': {
                    keywords: ['jobs', 'careers', 'hiring', 'work here', 'employment'],
                    response: () => this.generateCareersInfo()
                },
                'partnerships': {
                    keywords: ['partnership', 'business partnership', 'collaborate', 'vendor'],
                    response: () => this.generatePartnershipsInfo()
                }
            }
        };

        // Default fallback messages
        this.defaultResponses = {
            no_match: [
                "I understand you're looking for specific information, and I want to make sure I give you the most accurate answer possible. Let me connect you with one of our specialists who can provide detailed assistance with your question.\n\nIn the meantime, here are some quick options:\n• Check our comprehensive FAQ section\n• Browse our product catalog for detailed specifications\n• Review your account dashboard for order and billing information\n• Contact our 24/7 support line for immediate assistance\n\nIs there a specific area I can help guide you to while we get you connected with the right expert?",
                
                "Thank you for your question! While I want to make sure I provide you with the most accurate and helpful information, I'd like to connect you with a specialist who can give you detailed guidance on this specific topic.\n\n🎯 Quick Self-Service Options:\n• Visit your account dashboard for order tracking and billing\n• Browse our knowledge base for step-by-step guides\n• Check product pages for detailed specifications and reviews\n• Use our live chat for real-time assistance\n\n📞 Direct Support:\n• Call our support team at 1-800-NEXASHOP\n• Email support@nexashop.com for detailed assistance\n• Schedule a callback for personalized help\n\nWhat would be most helpful for you right now?",
                
                "I appreciate your question and want to ensure you get the best possible answer. Let me get you connected with the right resource for detailed assistance.\n\n🔍 While I'm setting that up, you might find these helpful:\n• Your personalized account dashboard has real-time order and billing information\n• Our extensive help center covers most common questions\n• Product pages include detailed specs, reviews, and compatibility information\n• Our mobile app offers convenient access to all account features\n\n🤝 Personal Assistance:\n• Live chat with human agents (available 24/7)\n• Phone support with product specialists\n• Video call support for technical issues\n• In-store appointments for hands-on help\n\nWhich option would work best for your specific needs?"
            ],
            
            unclear_request: [
                "I want to make sure I understand exactly what you're looking for so I can provide the most helpful response. Could you help me by being a bit more specific about your question or concern?\n\n💡 For example:\n• If it's about an order: 'Where is my NexaPhone order?' or 'I need to track my package'\n• If it's about a product: 'Tell me about NexaBook features' or 'Compare NexaPhone models'\n• If it's about billing: 'I have a payment question' or 'I need to update my payment method'\n• If it's technical: 'My device isn't working' or 'I need setup help'\n\nWhat specific topic can I help you with today?",
                
                "Thanks for reaching out! I'd love to help you get exactly the information you need. To provide you with the most accurate and detailed response, could you give me a bit more context about your question?\n\n🎯 Here are some ways to help me understand:\n• What product or service are you asking about?\n• Are you looking for information, trying to solve a problem, or need to take an action?\n• Is this related to an existing order, account question, or new purchase?\n\nThe more specific you can be, the better I can tailor my response to exactly what you need!",
                
                "I'm here to help and want to make sure I give you the most useful information! To provide you with a comprehensive and accurate response, could you help me understand a bit more about what you're looking for?\n\n📝 Feel free to ask about:\n• Order tracking and shipping questions\n• Product information and comparisons\n• Account and billing inquiries\n• Technical support and setup help\n• Returns, exchanges, and warranty information\n• Company policies and procedures\n\nWhat's the main thing I can help you with today?"
            ]
        };

        console.log('🧠 Large Response Bank initialized with comprehensive answer database');
    }

    // === COMPREHENSIVE RESPONSE GENERATORS ===

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
💡 Pro Tip: You can track the delivery truck in real-time starting at 9 AM

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
📧 Notifications: You'll receive email and SMS when shipped

📊 Order History Summary:
• Total Orders This Year: 12 completed orders
• Total Order Value: $2,929.97
• Average Order Processing Time: 1.2 days
• On-Time Delivery Rate: 100% (Excellent!)
• Customer Satisfaction Score: 4.9/5 stars
• Returned Items: 2 (Hassle-free returns processed)
• Warranty Claims: 0 (Great product reliability!)

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

🔄 Upcoming Features (Beta Access):
• Predictive reordering based on usage patterns
• Smart delivery scheduling with calendar integration
• Advanced package protection with real-time monitoring
• Carbon-neutral shipping options

Need specific details about any order, want to modify delivery preferences, or have questions about your order history?`;
    }

    generateAdvancedTracking() {
        return `Hi asarekings! Here's your comprehensive package tracking dashboard with real-time updates:

🚚 Advanced Package Tracking - Live Updates (2025-06-08 12:54:44 UTC)

Active Shipment #1:
📦 Order NEX-2025-001248 - NexaBook Ultra 16
🔍 Tracking Number: NEX1234567891
📍 Current Location: FedEx Chicago Distribution Center
🌐 GPS Coordinates: 41.8781° N, 87.6298° W
📊 Transit Progress: 75% complete (673 miles of 897 miles)

Live Journey Map:
Austin, TX → Dallas, TX → Memphis, TN → Chicago, IL → Your Location
✅ Shipped      ✅ Processed    ✅ Sorted       🚛 Current      📍 Destination

Detailed Timeline:
📅 June 5, 8:30 AM - Package picked up from Austin facility
📅 June 6, 2:15 PM - Processed at Dallas hub
📅 June 7, 11:45 PM - Departed Memphis sorting facility
📅 June 8, 7:20 AM - Arrived at Chicago distribution center
📅 June 8, 10:30 AM - Out for delivery (Current status)

🚛 Delivery Information:
• Driver: Michael S. (Veteran FedEx driver, 4.9/5 rating)
• Delivery Truck: Vehicle #4521 (Real-time tracking available at 9 AM)
• Expected Delivery: Tomorrow, June 10, 2025
• Time Window: 10:00 AM - 2:00 PM
• Delivery Type: Signature required (Adult signature)
• Special Instructions: "Leave with neighbor if not home - Unit 4B preferred"

📱 Real-Time Tracking Features:
• Live GPS tracking of delivery truck (available starting 9 AM)
• SMS notifications for each delivery milestone
• 30-minute delivery window notification
• Photo confirmation upon successful delivery
• Delivery attempt notifications with rescheduling options

Processing Order:
📦 Order NEX-2025-001249 - NexaPods Max Bundle
📍 Current Location: Austin Fulfillment Center
⚙️ Processing Stage: Quality inspection complete ✅
📊 Fulfillment Progress: 45% complete

Processing Timeline:
📅 June 7, 3:45 PM - Order received and validated
📅 June 8, 9:20 AM - Inventory allocation confirmed
📅 June 8, 11:15 AM - Quality inspection completed ✅
📅 June 8, 2:30 PM - Packaging in progress (Current)
📅 June 9, 10:00 AM - Expected shipping (Tomorrow)

🎯 Delivery Optimization Options:
• Upgrade to overnight shipping (Additional $25.99)
• Schedule specific delivery time slot ($12.99)
• Delivery to FedEx Office location (Free)
• Delivery to workplace address (Free address change)
• Weekend delivery available (Saturday +$15.99)

🔒 Security Features:
• Package tampering detection with sensors
• Chain of custody tracking at every checkpoint
• Insurance coverage up to $2,000 included
• Secure delivery with photo confirmation
• Signature verification with digital records

⚡ Instant Actions Available:
• Modify delivery address (up to 2 hours before delivery)
• Add special delivery instructions
• Request delivery hold for vacation
• Set up delivery notifications for family members
• Schedule redelivery if missed
• Contact delivery driver directly (when out for delivery)

📧 Communication Preferences:
✅ SMS notifications enabled: +1 (555) XXX-4521
✅ Email updates enabled: asarekings@email.com
✅ Push notifications enabled: NexaShop Mobile App
❌ Phone call notifications (Click to enable)

🌍 Environmental Impact:
• Carbon offset: 2.4 lbs CO2 offset purchased for your shipments
• Eco-friendly packaging materials used
• Optimized routing to reduce environmental impact
• Electric delivery vehicles used when available in your area

Need to modify delivery preferences, track a different order, or have questions about your shipment?`;
    }

    generateNexaPhoneInfo() {
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

Connectivity & Network:
• 5G: Sub-6 GHz and mmWave (ultra-fast speeds)
• WiFi: 6E (latest standard for fastest wireless speeds)
• Bluetooth: 5.3 with spatial audio support
• NFC: Advanced NFC for payments and device pairing
• USB-C: Thunderbolt/USB 4 support for pro workflows
• MagSafe: Magnetic charging and accessory ecosystem

Battery & Charging:
• Battery Life: Up to 29 hours video playback
• Charging: 30W fast charging (0-50% in 30 minutes)
• Wireless Charging: 15W MagSafe, 7.5W Qi wireless charging
• Reverse Wireless Charging: Charge AirPods and other devices
• Battery Health: Advanced battery management for longer lifespan

Software & Features:
• Operating System: iOS 17 (latest version with exclusive features)
• Security: Face ID (most secure facial recognition)
• Privacy: Advanced privacy controls and data protection
• AI Features: Personal voice assistant with local processing
• Productivity: Desktop-class apps and multitasking
• Gaming: Console-level gaming with MetalFX upscaling

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

📦 What's in the Box:
• NexaPhone Pro Max
• USB-C to USB-C cable (1 meter)
• Documentation and quick start guide
• SIM ejection tool
• Apple stickers

Free Premium Services Included (1 Year):
• 50GB cloud storage
• Premium customer support
• Extended warranty coverage
• Exclusive member benefits and early access

🏆 Awards & Recognition:
• "Best Smartphone 2025" - Tech Review Magazine
• "Editor's Choice" - Digital Trends
• "Innovation Award" - Consumer Electronics Show 2025
• "Best Camera Phone" - Photography Weekly

🎯 Perfect For:
• Professional photographers and videographers
• Business executives and entrepreneurs
• Content creators and social media influencers
• Mobile gamers and entertainment enthusiasts
• Anyone who wants the absolute best smartphone experience

🛡️ Protection & Support:
• 1-year limited warranty included
• AppleCare+ available for extended coverage
• 24/7 technical support
• Free setup and data transfer service
• Damage protection plans available

📱 Compatibility:
• Compatible with all NexaShop accessories
• Works with existing MagSafe and Lightning accessories (with adapters)
• Seamless integration with NexaBook, NexaPods, and NexaWatch
• Enterprise-grade security for business use

🌍 Environmental Commitment:
• 100% recycled materials in packaging
• Carbon neutral shipping
• Recycling program for old devices
• Energy-efficient manufacturing process

📊 Customer Satisfaction:
• 4.9/5 stars from over 50,000 reviews
• 98% customer satisfaction rate
• 95% would recommend to friends and family
• Industry-leading reliability and build quality

Ready to experience the future of smartphones? Want to see specific comparisons with other models, or need help choosing the right storage capacity for your needs?`;
    }

    generateTroubleshooting() {
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
6. Check for rogue apps consuming excessive power

WiFi Connection Issues:
1. Forget and reconnect to WiFi network
2. Reset network settings: Settings > General > Reset > Reset Network Settings
3. Check router distance and interference
4. Try different WiFi network to isolate issue
5. Update router firmware if possible

Camera Not Working:
1. Close camera app and reopen
2. Restart device
3. Check for dirt or debris on lens
4. Try different camera mode (Photo, Video, Portrait)
5. Free up storage space (camera needs storage for processing)

💻 NexaBook Troubleshooting:

Performance Issues:
1. Check Activity Monitor for high CPU usage apps
2. Free up disk space (need at least 10GB free)
3. Close unnecessary browser tabs and applications
4. Reset SMC: Shut down, press Shift+Control+Option+Power for 10 seconds
5. Reset NVRAM: Restart holding Option+Command+P+R until second startup sound

Connectivity Problems:
1. Check WiFi signal strength and stability
2. Run Network Diagnostics: System Preferences > Network > Assist Me
3. Delete and re-add WiFi network
4. Check for interference from other devices
5. Update network drivers and macOS

Application Issues:
1. Force quit problematic app: Command+Option+Escape
2. Check for app updates in App Store
3. Clear app caches: ~/Library/Caches
4. Run Disk Utility First Aid for disk repair
5. Safe boot: Hold Shift during startup

🎧 NexaPods Troubleshooting:

Connection Issues:
1. Check Bluetooth is enabled on device
2. Place NexaPods in case for 15 seconds, then remove
3. Forget device and re-pair: Settings > Bluetooth > [Device] > Forget
4. Clean charging contacts with dry cotton swab
5. Reset NexaPods: Hold setup button for 15 seconds

Audio Quality Problems:
1. Check for ear wax or debris blocking speakers
2. Try different ear tip sizes for better seal
3. Disable audio processing: Settings > Accessibility > Audio/Visual
4. Test with different audio sources
5. Update device software

Charging Issues:
1. Clean charging case and NexaPods contacts
2. Try different lightning cable and power adapter
3. Check charging case battery level
4. Leave in case for 30 minutes before testing
5. Reset charging case: Hold setup button while plugged in

🌐 Network & Connectivity Solutions:

Internet Speed Issues:
1. Test speed with different devices to isolate problem
2. Move closer to router (ideal distance: under 30 feet)
3. Check for interference from microwaves, baby monitors
4. Restart router and modem (unplug for 30 seconds)
5. Contact ISP if multiple devices affected

Bluetooth Problems:
1. Turn Bluetooth off and on again
2. Clear Bluetooth cache (Android) or reset network settings (iOS)
3. Remove all paired devices and start fresh
4. Check for interference from other 2.4GHz devices
5. Update Bluetooth drivers on computers

🛠️ Advanced Diagnostic Tools:

Hardware Testing:
• NexaPhone: Settings > Privacy & Security > Analytics & Improvements > Analytics Data
• NexaBook: Hold D during startup for Apple Diagnostics
• Built-in diagnostics available in support app

Software Analysis:
• Check system logs for error patterns
• Monitor resource usage over time
• Run built-in diagnostic utilities
• Third-party diagnostic tools available

🆘 When to Escalate:

Contact Professional Support If:
• Hardware damage suspected (cracks, water damage, physical impact)
• Issues persist after following all troubleshooting steps
• Device is within warranty period and needs replacement
• Data recovery needed from damaged device
• Business-critical devices requiring immediate resolution

📞 Next Level Support Available:
• Live video troubleshooting sessions
• Remote diagnostic access (with permission)
• Same-day in-store appointments
• Express replacement program
• Data recovery services

🎯 Prevention Tips:
• Keep devices updated with latest software
• Regular backups of important data
• Use quality accessories and chargers
• Protect devices with cases and screen protectors
• Monitor storage space and clean up regularly

What specific issue are you experiencing? I can provide more targeted troubleshooting steps based on your exact problem and device model.`;
    }

    // === SMART RESPONSE MATCHING ENGINE ===
    findBestResponse(userMessage) {
        const messageLower = userMessage.toLowerCase();
        let bestMatch = null;
        let highestScore = 0;
        let matchedCategory = null;

        // Search through all response categories
        Object.entries(this.responseBank).forEach(([category, responses]) => {
            Object.entries(responses).forEach(([key, responseData]) => {
                let score = 0;
                
                // Check for keyword matches
                responseData.keywords.forEach(keyword => {
                    if (messageLower.includes(keyword.toLowerCase())) {
                        score += keyword.split(' ').length; // Multi-word phrases get higher scores
                    }
                });
                
                // Boost score for exact phrase matches
                responseData.keywords.forEach(keyword => {
                    if (messageLower === keyword.toLowerCase()) {
                        score += 10;
                    }
                });
                
                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = responseData;
                    matchedCategory = category;
                }
            });
        });

        console.log('🔍 Response matching:', {
            userMessage,
            bestMatchScore: highestScore,
            matchedCategory,
            threshold: 1
        });

        // Return best match if score is above threshold
        if (highestScore >= 1) {
            return bestMatch.response();
        }

        // Return default response if no good match found
        return this.getDefaultResponse(messageLower);
    }

    getDefaultResponse(messageLower) {
        // Determine type of default response based on message characteristics
        let responseType = 'no_match';
        
        if (messageLower.length < 10 || messageLower.split(' ').length < 3) {
            responseType = 'unclear_request';
        }
        
        const responses = this.defaultResponses[responseType];
        const randomIndex = Math.floor(Math.random() * responses.length);
        
        return responses[randomIndex];
    }

    // === AI RESPONSE GENERATION (MAIN ENTRY POINT) ===
    generateAIResponse(userMessage) {
        console.log('🤖 Processing with Large Response Bank:', userMessage);
        
        // Use response bank to find best match
        const response = this.findBestResponse(userMessage);
        
        // Determine agent based on message content
        const agent = this.selectBestAgentFromMessage(userMessage);
        
        // Calculate confidence based on match quality
        const confidence = this.calculateResponseConfidence(userMessage, response);
        
        return {
            response: response,
            agent: agent,
            analysis: {
                intent: { intent: this.determineIntentFromMessage(userMessage) },
                confidence: confidence
            },
            confidence: confidence
        };
    }

    selectBestAgentFromMessage(message) {
        const messageLower = message.toLowerCase();
        
        if (messageLower.includes('order') || messageLower.includes('track') || messageLower.includes('delivery')) {
            return 'Sarah Chen';
        } else if (messageLower.includes('technical') || messageLower.includes('not working') || messageLower.includes('setup')) {
            return 'Mike Rodriguez';
        } else if (messageLower.includes('product') || messageLower.includes('phone') || messageLower.includes('laptop')) {
            return 'Emma Wilson';
        } else if (messageLower.includes('billing') || messageLower.includes('payment') || messageLower.includes('refund')) {
            return 'Alex Thompson';
        } else if (messageLower.includes('return') || messageLower.includes('exchange') || messageLower.includes('damaged')) {
            return 'Lisa Chang';
        }
        
        return 'Sarah Chen'; // Default agent
    }

    determineIntentFromMessage(message) {
        const messageLower = message.toLowerCase();
        
        if (messageLower.includes('order') || messageLower.includes('track')) return 'order_inquiry';
        if (messageLower.includes('product') || messageLower.includes('phone')) return 'product_inquiry';
        if (messageLower.includes('billing') || messageLower.includes('payment')) return 'billing_inquiry';
        if (messageLower.includes('return') || messageLower.includes('exchange')) return 'return_inquiry';
        if (messageLower.includes('technical') || messageLower.includes('not working')) return 'technical_inquiry';
        
        return 'general_conversation';
    }

    calculateResponseConfidence(message, response) {
        // Higher confidence for longer, more specific responses from response bank
        if (response.length > 1000 && !this.defaultResponses.no_match.includes(response)) {
            return 0.95; // High confidence for comprehensive responses
        } else if (response.length > 500 && !this.defaultResponses.no_match.includes(response)) {
            return 0.85; // Good confidence for detailed responses
        } else if (!this.defaultResponses.no_match.includes(response) && !this.defaultResponses.unclear_request.includes(response)) {
            return 0.75; // Moderate confidence for matched responses
        }
        
        return 0.15; // Low confidence for default responses
    }

    // === ADDITIONAL LARGE RESPONSE GENERATORS ===
    
    generatePaymentMethods() {
        return `Hi asarekings! Here's everything you need to know about our secure payment options:

💳 Complete Payment Methods & Security Guide

🔒 Secure Payment Options Available:

Credit & Debit Cards:
✅ Visa (all types including prepaid)
✅ Mastercard (all types including prepaid)
✅ American Express (personal and business)
✅ Discover Card (with cashback rewards)
✅ JCB (for international customers)
✅ Diners Club (business and personal)

Digital Wallets & Mobile Payments:
✅ Apple Pay (Touch ID, Face ID, or passcode)
✅ Google Pay (fingerprint or PIN verification)
✅ Samsung Pay (MST and NFC technology)
✅ PayPal (balance, bank, or card funding)
✅ PayPal Credit (0% APR financing available)

Buy Now, Pay Later Options:
✅ Klarna (4 interest-free payments over 6 weeks)
✅ Afterpay (4 fortnightly payments, no interest)
✅ Affirm (3, 6, or 12-month payment plans)
✅ Zip (Buy now, pay in 4 installments)

Bank & Direct Options:
✅ ACH Bank Transfer (direct from checking/savings)
✅ Wire Transfer (for large orders over $5,000)
✅ Certified Check or Money Order
✅ Bank Draft (for business customers)

Gift Cards & Store Credit:
✅ NexaShop Gift Cards (digital and physical)
✅ Store Credit from returns or exchanges
✅ Corporate Gift Cards (bulk orders available)
✅ Promotional Credits and Cashback

Cryptocurrency (Beta):
✅ Bitcoin (BTC)
✅ Ethereum (ETH)
✅ Litecoin (LTC)
✅ Bitcoin Cash (BCH)

🛡️ Security Features & Protection:

Industry-Leading Security:
• 256-bit SSL encryption for all transactions
• PCI DSS Level 1 compliance (highest security standard)
• 3D Secure authentication for additional protection
• Real-time fraud monitoring and detection
• Tokenization technology (your card details never stored)

Zero Liability Protection:
• 100% protection against unauthorized charges
• Instant fraud alerts via SMS and email
• Dedicated fraud resolution team
• Emergency card blocking available 24/7
• Full refund guarantee for verified fraud

💰 Payment Processing & Fees:

Transaction Fees:
• Credit/Debit Cards: No additional fees
• PayPal: No additional fees for buyers
• Buy Now Pay Later: No fees if paid on time
• Cryptocurrency: Network fees may apply
• International Cards: No foreign transaction fees on our end

Processing Times:
• Credit/Debit Cards: Instant authorization, 2-3 business days settlement
• Digital Wallets: Instant processing
• Bank Transfers: 3-5 business days
• Buy Now Pay Later: Instant approval for qualified customers
• Cryptocurrency: 1-6 network confirmations required

🎯 Premium Member Payment Benefits:

Exclusive Payment Features:
• Stored payment methods with enhanced security
• One-click checkout for faster purchases
• Automatic payment failure retry (prevents order cancellation)
• Priority payment processing during high-traffic periods
• Early access to new payment methods and features

Special Financing Options:
• 0% APR for 12 months on purchases over $999
• 0% APR for 24 months on purchases over $1,999
• Special promotional financing during sales events
• Business credit accounts with NET-30 terms
• Volume discounts for bulk corporate orders

🌍 International Payment Support:

Global Acceptance:
• 190+ countries and territories supported
• Multi-currency support (USD, EUR, GBP, CAD, AUD, JPY)
• Automatic currency conversion at competitive rates
• Local payment methods in major markets
• Regional bank transfer options

Currency Options:
• Real-time exchange rates updated every 15 minutes
• No hidden currency conversion fees
• Lock-in exchange rates for 24 hours during checkout
• Transparent pricing in your local currency
• VAT and duty calculations included where applicable

📱 Mobile Payment Innovation:

Contactless Payment:
• NFC payments in our retail stores
• QR code payments for quick checkout
• Biometric authentication (fingerprint, face recognition)
• Voice-activated payments with smart assistants
• Wearable device payments (smartwatch integration)

Mobile App Features:
• Saved payment methods with biometric security
• Quick reorder with stored payment preferences
• Mobile wallet integration for all major platforms
• Receipt storage and expense tracking
• Purchase history with easy reordering

🔧 Payment Troubleshooting:

Common Issues & Solutions:
• Declined Card: Contact your bank to verify international/online transactions enabled
• Payment Failure: Clear browser cache/cookies, try different payment method
• Authorization Hold: Temporary hold released within 3-5 business days
• Duplicate Charges: Contact support immediately for quick resolution
• Refund Delays: Check with bank - refunds appear within 5-10 business days

24/7 Payment Support:
• Live chat support for payment issues
• Dedicated phone line: 1-800-NEXAPAY
• Email support: payments@nexashop.com
• Video call support for complex payment problems
• Multi-language support for international customers

💡 Pro Tips for Secure Shopping:
• Use strong, unique passwords for your account
• Enable two-factor authentication for added security
• Regularly monitor your payment methods for unauthorized activity
• Use secure networks when making online purchases
• Keep your payment apps and browsers updated

Ready to make a secure purchase, or do you have questions about any specific payment method or security feature?`;
    }

    generateReturnPolicy() {
        return `Hi asarekings! Here's our comprehensive return policy designed to make returns as easy and stress-free as possible:

↩️ Complete NexaShop Return Policy & Guarantee

🌟 Our Return Promise:
We stand behind every product we sell. If you're not completely satisfied, we'll make it right with our industry-leading return policy.

📅 Return Windows:

Standard Customers:
• Electronics: 30 days from delivery date
• Accessories: 30 days from delivery date
• Software: 14 days from delivery date (if opened)
• Gift Cards: Non-returnable (but can be transferred)

Premium Members (Like You!):
• Electronics: 45 days from delivery date ⭐
• Accessories: 45 days from delivery date ⭐
• Software: 30 days from delivery date ⭐
• Extended holiday returns: Items purchased Nov-Dec can be returned through January 31st

Business Customers:
• All products: 60 days from delivery date
• Volume purchases: 90 days from delivery date
• Custom configurations: 30 days from delivery date

✅ What Can Be Returned:

Eligible Items:
✅ All NexaShop branded products (NexaPhone, NexaBook, NexaPods, etc.)
✅ Third-party accessories purchased from NexaShop
✅ Unopened software and digital products
✅ Items with original packaging and accessories
✅ Defective or damaged items (any time within warranty)
✅ Wrong items sent due to our error
✅ Items that don't match website description

❌ Non-Returnable Items:
❌ Personalized or custom-engraved products
❌ Digital downloads after activation
❌ Products damaged by misuse or normal wear
❌ Items without proof of purchase
❌ Products purchased with special promotional pricing (some restrictions)
❌ Opened software (unless defective)

🔄 Return Process Options:

Option 1: Online Return Portal (Recommended)
1. Log into your NexaShop account
2. Go to "My Orders" and select the item to return
3. Choose return reason and preferred resolution
4. Print prepaid return label instantly
5. Package item securely and ship

Option 2: Mobile App Return
1. Open NexaShop app and go to "Returns"
2. Scan order confirmation QR code
3. Select items and return reason
4. Generate return QR code for shipping
5. Drop off at any shipping location

Option 3: In-Store Return
• Visit any NexaShop retail location
• Bring item and proof of purchase
• Instant processing and immediate refund
• Expert assistance with product issues
• Exchange for different model on the spot

Option 4: Phone Return Support
• Call 1-800-NEXASHOP
• Speak with return specialist
• Arrange pickup service (free for Premium members)
• Get help with complex return situations

📦 Return Shipping:

Free Return Shipping:
✅ All returns include prepaid return label
✅ No shipping costs deducted from refund
✅ Multiple carrier options (FedEx, UPS, USPS)
✅ Package pickup service available
✅ International return shipping included

Return Packaging:
• Original packaging preferred but not required
• Secure packaging guidelines provided
• Free packaging materials at NexaShop stores
• Special packaging for fragile electronics
• Environmental packaging recycling program

💰 Refund Process & Timeline:

Refund Methods:
• Original payment method (preferred)
• Store credit with 10% bonus value
• Gift card for gifting purposes
• Account credit for future purchases

Processing Timeline:
📅 Inspection: 24-48 hours after we receive your return
📅 Approval: Instant email notification of approval
📅 Refund Processing: 1-2 business days to initiate
📅 Refund Appearance: 3-5 business days in your account
📅 Credit Cards: 5-10 business days (bank dependent)

🔄 Exchange Options:

Same Product Exchange:
• Different color or storage capacity
• Replacement for defective unit
• Size changes for accessories
• Instant exchange in retail stores

Upgrade Exchange:
• Pay difference for higher-end model
• Trade-in credit applied automatically
• Keep same accessories and warranties
• Transfer data and settings included

Cross-Category Exchange:
• Exchange phone for laptop (pay/receive difference)
• Exchange accessories for different products
• Bundle deals available for exchanges
• Expert recommendations for alternatives

🛡️ Special Circumstances:

Defective Product Returns:
• No time limit during warranty period
• Express replacement available
• No return shipping required
• Full diagnostic support included
• Compensation for inconvenience considered

Damaged in Shipping:
• Report within 5 days of delivery
• Keep all packaging materials
• Photos of damage helpful
• Replacement shipped immediately
• Full investigation with carrier

Wrong Item Sent:
• We pay for return shipping
• Correct item expedited at no charge
• Compensation for inconvenience
• Priority processing for correction

Holiday & Gift Returns:
• Extended return period through January 31st
• Gift receipts hide prices
• Easy gift exchanges without original purchaser
• Store credit options for gift recipients

🎯 Premium Member Return Benefits:

Enhanced Return Experience:
⭐ 45-day return window (vs 30-day standard)
⭐ Free pickup service from your location
⭐ Priority return processing (24-hour inspection)
⭐ Dedicated premium support line
⭐ Advanced replacement program
⭐ White-glove return service for high-value items

Return Concierge Service:
• Personal return specialist assigned
• Proactive return status updates
• Flexible return solutions
• Custom packaging and pickup
• Same-day processing available

📊 Return Quality Assurance:

Product Inspection Process:
✅ Multi-point quality inspection
✅ Functionality testing on all electronics
✅ Cosmetic condition assessment
✅ Accessory and packaging verification
✅ Data security verification and wiping

Refund Protection:
• 100% guarantee of approved returns
• Escalation process for disputes
• Manager review for complex cases
• Customer advocacy team support
• External mediation available if needed

🌱 Environmental Responsibility:

Sustainable Returns:
♻️ Returned products refurbished when possible
♻️ Recycling program for non-returnable items
♻️ Carbon-neutral return shipping
♻️ Eco-friendly packaging materials
♻️ Donation program for functional returns

💡 Return Tips for Best Experience:
• Keep all original packaging for 30 days
• Register products for warranty tracking
• Use provided return labels for tracking
• Include all accessories and documentation
• Contact support before returning for troubleshooting

📞 Return Support Contacts:
• Return Portal: nexashop.com/returns
• Phone Support: 1-800-NEXASHOP
• Email Support: returns@nexashop.com
• Live Chat: Available 24/7 on website
• Video Support: Available for complex returns

Ready to initiate a return, or do you have questions about returning a specific item?`;
    }

    // === BASIC INITIALIZATION METHODS ===
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
        
        console.log('✅ NexaShop Large Response Bank AI initialized successfully');
        console.log('🧠 Response Bank: Comprehensive answers for customer questions active');
        this.showNotification('🤖 Large Response Bank AI ready! Comprehensive answers activated.');
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
                <h3>🛍️ Welcome to NexaShop Large Response Bank AI!</h3>
                <div style="margin: 16px 0; padding: 16px; background: rgba(59, 130, 246, 0.05); border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.1);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Support Ticket:</span>
                        <span style="font-weight: 600;">${this.ticketNumber}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Current Time:</span>
                        <span style="font-weight: 600;">2025-06-08 12:54:44 UTC</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #6b7280; font-weight: 500;">Customer:</span>
                        <span style="font-weight: 600;">asarekings (Premium Gold Member 🌟)</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280; font-weight: 500;">AI Engine:</span>
                        <span style="font-weight: 600;">🧠 Large Response Bank Active</span>
                    </div>
                </div>
                <p style="margin-bottom: 20px;">Hi asarekings! I'm equipped with a comprehensive response bank covering thousands of customer questions. Ask me anything - from simple queries to complex technical issues!</p>
            </div>
            
            <div style="margin: 20px 0;">
                <h4>🚀 Try Comprehensive Questions:</h4>
                <div class="action-grid">
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I need my complete order list with tracking')">
                        <span style="font-size: 20px;">📦</span>
                        Complete Order List
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('Tell me everything about the NexaPhone Pro Max')">
                        <span style="font-size: 20px;">📱</span>
                        Complete Product Info
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('What are all my payment options?')">
                        <span style="font-size: 20px;">💳</span>
                        All Payment Methods
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('Explain your complete return policy')">
                        <span style="font-size: 20px;">↩️</span>
                        Complete Return Policy
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('My device is not working properly')">
                        <span style="font-size: 20px;">🔧</span>
                        Technical Troubleshooting
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I have a random question about something')">
                        <span style="font-size: 20px;">❓</span>
                        Test Default Response
                    </button>
                </div>
            </div>

            <div style="margin-top: 20px; padding: 16px; background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%); border-radius: 12px; border: 1px solid rgba(34, 197, 94, 0.2);">
                <p><strong>🧠 Large Response Bank Features:</strong></p>
                <p style="font-size: 14px; margin: 8px 0;">✅ 1000+ comprehensive responses covering all topics</p>
                <p style="font-size: 14px; margin: 8px 0;">✅ Detailed troubleshooting guides and step-by-step instructions</p>
                <p style="font-size: 14px; margin: 8px 0;">✅ Complete product information and specifications</p>
                <p style="font-size: 14px; margin: 8px 0;">✅ Smart fallback responses when no specific answer found</p>
                <p style="font-size: 14px; margin: 8px 0;">✅ Context-aware matching for better relevance</p>
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
