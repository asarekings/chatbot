class NexaShopSupport {
    constructor() {
        // Current date and time - Updated to exact current time
        this.currentDateTime = new Date('2025-06-08T10:52:25Z');
        
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
        this.voiceRecognition = null;
        this.currentLanguage = 'en';
        
        this.settings = {
            darkMode: false,
            soundEffects: true,
            typingIndicators: true,
            autoScroll: true,
            voiceEnabled: false,
            desktopNotifications: false
        };
        
        this.ticketNumber = 'NEX-2025-0608-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        // Initialize all advanced features
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
        this.addVoiceSupport();
        this.addScreenSharing();
        this.addFileUploadPreview();
        this.addRecommendationEngine();
    }

    init() {
        console.log('🚀 Initializing NexaShop Advanced Support System...');
        this.setupElements();
        this.setupEventListeners();
        this.showWelcomeMessage();
        this.startPerformanceTracking();
        this.initializePWA();
        
        // Set global reference
        window.nexaShopSupport = this;
        
        console.log('✅ NexaShop Advanced Support System initialized successfully');
        this.showNotification('🚀 Advanced support features loaded!');
    }

    // === LIVE INVENTORY SYSTEM ===
    addLiveInventory() {
        this.inventory = {
            "nexaphone-pro": { 
                stock: 247, 
                warehouse: "East Coast DC", 
                nextRestock: "2025-06-09T14:00:00Z",
                reserved: 23,
                trending: true
            },
            "nexabook-ultra": { 
                stock: 89, 
                warehouse: "West Coast DC", 
                nextRestock: "2025-06-12T09:00:00Z",
                reserved: 12,
                trending: false
            },
            "nexapods-max": { 
                stock: 156, 
                warehouse: "Central DC", 
                nextRestock: "2025-06-10T16:00:00Z",
                reserved: 34,
                trending: true
            },
            "nexawatch-series": { 
                stock: 0, 
                warehouse: "All Locations", 
                nextRestock: "2025-06-15T10:00:00Z",
                reserved: 0,
                trending: false
            }
        };
        
        // Real-time inventory updates every 30 seconds
        setInterval(() => this.updateInventory(), 30000);
        console.log('📦 Live inventory system activated');
    }

    updateInventory() {
        Object.keys(this.inventory).forEach(product => {
            const item = this.inventory[product];
            if (item.stock > 0) {
                // Simulate sales (1-3 items sold every 30 seconds)
                const sold = Math.floor(Math.random() * 3) + 1;
                item.stock = Math.max(0, item.stock - sold);
                
                // Update trending status
                item.trending = item.stock > 50 && Math.random() > 0.5;
            }
        });
        
        // Notify if low stock
        this.checkLowStock();
    }

    checkLowStock() {
        Object.entries(this.inventory).forEach(([productId, item]) => {
            if (item.stock > 0 && item.stock <= 10) {
                console.log(`⚠️ Low stock alert: ${productId} - Only ${item.stock} left`);
            }
        });
    }

    // === REAL-TIME ORDER MANAGEMENT ===
    addOrderManagement() {
        this.orderManager = {
            realTimeTracking: true,
            autoUpdates: true,
            
            orders: [
                {
                    id: "NEX-2025-001247",
                    status: "delivered",
                    items: ["NexaPhone Pro Max"],
                    total: 1099.99,
                    orderDate: "2025-06-01T14:30:00Z",
                    deliveredDate: "2025-06-03T16:45:00Z",
                    trackingNumber: "NEX1234567890",
                    currentLocation: "Delivered to Front Door",
                    deliveryProgress: 100,
                    customerRating: 5
                },
                {
                    id: "NEX-2025-001248",
                    status: "in_transit",
                    items: ["NexaBook Ultra 16"],
                    total: 1599.99,
                    orderDate: "2025-06-05T09:15:00Z",
                    estimatedDelivery: "2025-06-10T14:00:00Z",
                    trackingNumber: "NEX1234567891",
                    currentLocation: "Distribution Center - Chicago, IL",
                    lastUpdate: "2025-06-08T08:30:00Z",
                    deliveryProgress: 75,
                    carrier: "NexaExpress"
                },
                {
                    id: "NEX-2025-001249",
                    status: "processing",
                    items: ["NexaPods Max", "NexaCharge Wireless Pad"],
                    total: 329.98,
                    orderDate: "2025-06-07T20:22:00Z",
                    estimatedShip: "2025-06-09T12:00:00Z",
                    deliveryProgress: 25,
                    processingLocation: "Fulfillment Center - Austin, TX"
                }
            ]
        };
        
        // Auto-update order statuses every minute
        setInterval(() => this.updateOrderStatuses(), 60000);
        console.log('🚚 Real-time order management activated');
    }

    updateOrderStatuses() {
        this.orderManager.orders.forEach(order => {
            if (order.status === "processing" && Math.random() > 0.8) {
                order.status = "shipped";
                order.deliveryProgress = 30;
                this.showNotification(`📦 Order ${order.id} has shipped!`);
            } else if (order.status === "in_transit" && order.deliveryProgress >= 95) {
                order.status = "out_for_delivery";
                this.showNotification(`🚚 Order ${order.id} is out for delivery!`);
            }
        });
    }

    // === MULTI-LANGUAGE SUPPORT ===
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
                thankYou: "Thank you for choosing NexaShop!",
                howCanHelp: "How can I help you today?",
                ticketNumber: "Support Ticket",
                currentTime: "Current Time"
            },
            es: {
                greeting: "¡Bienvenido al Soporte de NexaShop!",
                orderStatus: "Estado del Pedido",
                tracking: "Seguimiento de Paquetes",
                products: "Nuestros Productos",
                billing: "Facturación y Pagos",
                returns: "Devoluciones e Intercambios",
                technical: "Soporte Técnico",
                typing: "está escribiendo...",
                thankYou: "¡Gracias por elegir NexaShop!",
                howCanHelp: "¿Cómo puedo ayudarte hoy?",
                ticketNumber: "Ticket de Soporte",
                currentTime: "Hora Actual"
            },
            fr: {
                greeting: "Bienvenue au Support NexaShop!",
                orderStatus: "Statut de Commande",
                tracking: "Suivi de Colis",
                products: "Nos Produits",
                billing: "Facturation et Paiements",
                returns: "Retours et Échanges",
                technical: "Support Technique",
                typing: "est en train d'écrire...",
                thankYou: "Merci d'avoir choisi NexaShop!",
                howCanHelp: "Comment puis-je vous aider aujourd'hui?",
                ticketNumber: "Ticket de Support",
                currentTime: "Heure Actuelle"
            }
        };
        
        console.log('🌍 Multi-language support activated');
    }

    translate(key) {
        return this.languages[this.currentLanguage]?.[key] || this.languages.en[key] || key;
    }

    // === PERFORMANCE MONITORING ===
    addPerformanceMonitoring() {
        this.performance = {
            responseTime: [],
            messagesSent: 0,
            messagesReceived: 0,
            sessionDuration: 0,
            sessionStart: this.currentDateTime,
            errors: [],
            apiCalls: 0,
            
            trackResponseTime: (startTime) => {
                const endTime = Date.now();
                const duration = endTime - startTime;
                this.performance.responseTime.push(duration);
                
                if (this.performance.responseTime.length > 20) {
                    this.performance.responseTime.shift();
                }
                
                console.log(`⚡ Response time: ${duration}ms`);
            },
            
            getAverageResponseTime: () => {
                const times = this.performance.responseTime;
                if (times.length === 0) return 0;
                return Math.round(times.reduce((a, b) => a + b, 0) / times.length);
            },
            
            getSessionDuration: () => {
                return Math.round((Date.now() - new Date(this.performance.sessionStart).getTime()) / 1000);
            }
        };
        
        console.log('📊 Performance monitoring activated');
    }

    startPerformanceTracking() {
        setInterval(() => {
            this.performance.sessionDuration = this.performance.getSessionDuration();
        }, 10000);
    }

    // === SECURITY FEATURES ===
    addSecurityFeatures() {
        this.security = {
            encryptSensitiveData: (data) => {
                return btoa(encodeURIComponent(data));
            },
            
            validateInput: (input) => {
                const dangerous = /<script|javascript:|data:|vbscript:|onload|onerror/i;
                const sqlInjection = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC)\b)/i;
                return !dangerous.test(input) && !sqlInjection.test(input);
            },
            
            sanitizeInput: (input) => {
                return input
                    .replace(/[<>]/g, '')
                    .replace(/javascript:/gi, '')
                    .replace(/data:/gi, '')
                    .trim();
            },
            
            rateLimiting: {
                maxMessages: 100,
                timeWindow: 60000,
                messageCount: 0,
                lastReset: Date.now(),
                
                checkLimit: () => {
                    const now = Date.now();
                    if (now - this.security.rateLimiting.lastReset > this.security.rateLimiting.timeWindow) {
                        this.security.rateLimiting.messageCount = 0;
                        this.security.rateLimiting.lastReset = now;
                    }
                    
                    return this.security.rateLimiting.messageCount < this.security.rateLimiting.maxMessages;
                }
            },
            
            sessionSecurity: {
                sessionId: this.generateSecureId(),
                lastActivity: Date.now(),
                ipAddress: '192.168.1.100',
                userAgent: navigator.userAgent,
                
                updateActivity: () => {
                    this.security.sessionSecurity.lastActivity = Date.now();
                }
            }
        };
        
        console.log('🛡️ Security features activated');
    }

    generateSecureId() {
        return 'sec_' + Array.from(crypto.getRandomValues(new Uint8Array(16)))
            .map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // === ANALYTICS & INSIGHTS ===
    addAnalytics() {
        this.analytics = {
            sessionStart: this.currentDateTime,
            interactionCount: 0,
            mostAskedTopics: {},
            satisfactionScore: 0,
            responseTime: "< 30 seconds",
            userJourney: [],
            popularFeatures: {
                orderTracking: 0,
                productInfo: 0,
                returns: 0,
                billing: 0,
                technical: 0
            },
            
            trackInteraction: (action, category, data = {}) => {
                const interaction = {
                    timestamp: new Date().toISOString(),
                    action: action,
                    category: category,
                    data: data,
                    sessionId: this.security.sessionSecurity.sessionId
                };
                
                this.analytics.userJourney.push(interaction);
                this.analytics.interactionCount++;
                
                if (!this.analytics.mostAskedTopics[category]) {
                    this.analytics.mostAskedTopics[category] = 0;
                }
                this.analytics.mostAskedTopics[category]++;
                
                if (this.analytics.popularFeatures.hasOwnProperty(category)) {
                    this.analytics.popularFeatures[category]++;
                }
                
                console.log('📈 Interaction tracked:', interaction);
            },
            
            generateInsights: () => {
                const sessionDuration = this.performance.getSessionDuration();
                const avgResponseTime = this.performance.getAverageResponseTime();
                
                return {
                    sessionDuration: `${Math.floor(sessionDuration / 60)}m ${sessionDuration % 60}s`,
                    totalInteractions: this.analytics.interactionCount,
                    avgResponseTime: `${avgResponseTime}ms`,
                    topTopic: Object.keys(this.analytics.mostAskedTopics).reduce((a, b) => 
                        this.analytics.mostAskedTopics[a] > this.analytics.mostAskedTopics[b] ? a : b, 'general'),
                    engagementScore: Math.min(100, Math.round((this.analytics.interactionCount / sessionDuration) * 100))
                };
            }
        };
        
        console.log('📊 Analytics system activated');
    }

    // === VOICE SUPPORT ===
    addVoiceSupport() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            this.voiceRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            this.voiceRecognition.continuous = false;
            this.voiceRecognition.interimResults = false;
            this.voiceRecognition.lang = 'en-US';
            
            this.voiceRecognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.messageInput.value = transcript;
                this.analytics.trackInteraction('voice_input', 'voice', { transcript });
                this.sendMessage();
            };
            
            this.voiceRecognition.onerror = (event) => {
                console.error('Voice recognition error:', event.error);
                this.showNotification('Voice recognition error. Please try again.');
            };
            
            this.textToSpeech = {
                speak: (text) => {
                    if ('speechSynthesis' in window) {
                        const utterance = new SpeechSynthesisUtterance(text);
                        utterance.rate = 0.9;
                        utterance.pitch = 1;
                        utterance.volume = 0.8;
                        speechSynthesis.speak(utterance);
                    }
                }
            };
            
            console.log('🎤 Voice support activated');
        } else {
            console.log('❌ Voice recognition not supported in this browser');
        }
    }

    // === SCREEN SHARING ===
    addScreenSharing() {
        this.screenShare = {
            active: false,
            stream: null,
            
            startShare: async () => {
                try {
                    const stream = await navigator.mediaDevices.getDisplayMedia({
                        video: true,
                        audio: true
                    });
                    
                    this.screenShare.stream = stream;
                    this.screenShare.active = true;
                    this.analytics.trackInteraction('screen_share_start', 'technical');
                    this.showNotification('🖥️ Screen sharing started');
                    
                    stream.getVideoTracks()[0].onended = () => {
                        this.screenShare.stopShare();
                    };
                    
                    return stream;
                } catch (err) {
                    console.log('Screen sharing not supported or denied:', err);
                    this.showNotification('Screen sharing not available');
                    return null;
                }
            },
            
            stopShare: () => {
                if (this.screenShare.stream) {
                    this.screenShare.stream.getTracks().forEach(track => track.stop());
                    this.screenShare.stream = null;
                    this.screenShare.active = false;
                    this.analytics.trackInteraction('screen_share_stop', 'technical');
                    this.showNotification('🖥️ Screen sharing stopped');
                }
            }
        };
        
        console.log('🖥️ Screen sharing support activated');
    }

    // === FILE UPLOAD PREVIEW ===
    addFileUploadPreview() {
        this.fileUpload = {
            supportedTypes: ['image/*', '.pdf', '.doc', '.docx', '.txt', '.xlsx', '.pptx'],
            maxSize: 25 * 1024 * 1024,
            
            validateFile: (file) => {
                if (file.size > this.fileUpload.maxSize) {
                    this.showNotification('❌ File too large. Maximum size is 25MB.');
                    return false;
                }
                
                const allowedTypes = ['image/', 'application/pdf', 'application/msword', 
                    'application/vnd.openxmlformats-officedocument', 'text/'];
                    
                const isAllowed = allowedTypes.some(type => file.type.startsWith(type));
                
                if (!isAllowed) {
                    this.showNotification('❌ File type not supported.');
                    return false;
                }
                
                return true;
            },
            
            processFile: async (file) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            id: this.generateId(),
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            url: URL.createObjectURL(file),
                            processedAt: new Date().toISOString()
                        });
                    }, 1000);
                });
            }
        };
        
        console.log('📎 File upload preview activated');
    }

    // === RECOMMENDATION ENGINE ===
    addRecommendationEngine() {
        this.recommendations = {
            userProfile: {
                interests: ['electronics', 'mobile', 'accessories'],
                previousPurchases: ['nexaphone-pro', 'nexapods-max'],
                browsingHistory: ['nexabook-ultra', 'nexawatch-series'],
                priceRange: { min: 0, max: 2000 }
            },
            
            getPersonalizedRecommendations: () => {
                return {
                    trending: [
                        { id: 'nexaphone-pro', score: 0.95, reason: 'Best seller this week' },
                        { id: 'nexapods-max', score: 0.89, reason: 'Perfect with your NexaPhone' },
                        { id: 'nexawatch-series', score: 0.82, reason: 'Complete your tech ecosystem' }
                    ],
                    basedOnHistory: [
                        { id: 'nexabook-ultra', score: 0.91, reason: 'You viewed this recently' },
                        { id: 'nexacharge-wireless', score: 0.76, reason: 'Great accessory for your devices' }
                    ],
                    currentDeals: [
                        { 
                            id: 'nexapods-max', 
                            discount: 20, 
                            originalPrice: 249.99, 
                            salePrice: 199.99,
                            endDate: '2025-06-15T23:59:59Z'
                        },
                        { 
                            id: 'nexawatch-series', 
                            discount: 15, 
                            originalPrice: 499.99, 
                            salePrice: 424.99,
                            endDate: '2025-06-12T23:59:59Z'
                        }
                    ]
                };
            }
        };
        
        console.log('🎯 Recommendation engine activated');
    }

    // === PWA FEATURES ===
    initializePWA() {
        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
        }
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.installPrompt = e;
            this.showInstallButton();
        });
        
        console.log('📱 PWA features initialized');
    }

    registerServiceWorker() {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registered:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    }

    // === SETUP AND EVENT LISTENERS ===
    setupElements() {
        this.messageInput = document.getElementById('messageInput');
        this.messageForm = document.getElementById('messageForm');
        this.messagesContainer = document.getElementById('messagesContainer');
        this.notification = document.getElementById('notification');
        this.fileInput = document.getElementById('fileInput');
        this.fileBtn = document.getElementById('fileBtn');
        this.filePreview = document.getElementById('filePreview');
        
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
                this.security.sessionSecurity.updateActivity();
            });
        }

        if (this.fileInput) {
            this.fileInput.addEventListener('change', (e) => {
                if (e.target.files[0]) {
                    this.handleFileSelect(e.target.files[0]);
                }
            });
        }

        if (this.fileBtn) {
            this.fileBtn.addEventListener('click', () => {
                this.fileInput?.click();
            });
        }

        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        console.log('✅ Event listeners configured');
    }

    // === ENHANCED WELCOME MESSAGE ===
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
            second: '2-digit',
            timeZoneName: 'short'
        });
        
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'welcome-message';
        welcomeMsg.innerHTML = `
            <div class="welcome-header">
                <h3>🛍️ ${this.translate('greeting')}</h3>
                <div class="welcome-stats">
                    <div class="stat-item">
                        <span class="stat-label">${this.translate('ticketNumber')}:</span>
                        <span class="stat-value">${this.ticketNumber}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">${this.translate('currentTime')}:</span>
                        <span class="stat-value">${currentDate} at ${currentTime}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Customer:</span>
                        <span class="stat-value">asarekings (Premium Member 🌟)</span>
                    </div>
                </div>
                <p class="welcome-subtitle">Hi asarekings! ${this.translate('howCanHelp')}</p>
            </div>
            
            <div class="advanced-features">
                <h4>🚀 Advanced Features Available:</h4>
                <div class="feature-grid">
                    <div class="feature-item">🎤 Voice Chat</div>
                    <div class="feature-item">🖥️ Screen Share</div>
                    <div class="feature-item">📊 Live Analytics</div>
                    <div class="feature-item">🌍 Multi-Language</div>
                    <div class="feature-item">📱 Mobile App</div>
                    <div class="feature-item">🔒 Secure Session</div>
                </div>
            </div>
            
            <div class="quick-actions">
                <h4>🚀 Quick Actions:</h4>
                <div class="action-grid">
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I need to check my order status')">
                        <span style="font-size: 20px;">📦</span>
                        ${this.translate('orderStatus')}
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I need to track my shipment')">
                        <span style="font-size: 20px;">🚚</span>
                        ${this.translate('tracking')}
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I want to return an item')">
                        <span style="font-size: 20px;">↩️</span>
                        ${this.translate('returns')}
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I need product information')">
                        <span style="font-size: 20px;">💡</span>
                        ${this.translate('products')}
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I have a billing question')">
                        <span style="font-size: 20px;">💳</span>
                        ${this.translate('billing')}
                    </button>
                    <button class="quick-action-btn" onclick="nexaShopSupport.quickMessage('I need technical assistance')">
                        <span style="font-size: 20px;">🔧</span>
                        ${this.translate('technical')}
                    </button>
                </div>
            </div>

            <div class="live-stats">
                <h4>📊 Live System Status:</h4>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">${Object.values(this.inventory).reduce((sum, item) => sum + item.stock, 0)}</div>
                        <div class="stat-label">Items in Stock</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${this.orderManager.orders.filter(o => o.status === 'in_transit').length}</div>
                        <div class="stat-label">Orders Shipping</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">< 2min</div>
                        <div class="stat-label">Avg Response</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">99.9%</div>
                        <div class="stat-label">Uptime</div>
                    </div>
                </div>
            </div>

            <div class="store-hours">
                <p><strong>🕒 Support Available:</strong> 24/7 Live Chat | Phone: Daily 6AM-12AM EST</p>
                <p><strong>📧 Email:</strong> support@nexashop.com | <strong>📱 App:</strong> Download NexaShop mobile app</p>
                <p><strong>🎯 Premium Support:</strong> Priority assistance • Advanced features • Dedicated specialists</p>
            </div>
        `;
        this.messagesContainer.appendChild(welcomeMsg);
        
        this.analytics.trackInteraction('welcome_displayed', 'general');
    }

    // === MESSAGE HANDLING ===
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

        if (!this.security.rateLimiting.checkLimit()) {
            this.showNotification('⚠️ Too many messages. Please wait a moment.');
            return;
        }

        this.security.rateLimiting.messageCount++;
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
            messageLength: content.length,
            containsKeywords: this.extractKeywords(content)
        });

        setTimeout(() => {
            this.generateEnhancedResponse(content, startTime);
        }, 800 + Math.random() * 1200);
    }

    extractKeywords(message) {
        const keywords = ['order', 'track', 'return', 'product', 'billing', 'technical', 'help'];
        return keywords.filter(keyword => message.toLowerCase().includes(keyword));
    }

    // === ENHANCED RESPONSE GENERATION ===
    generateEnhancedResponse(userMessage, startTime) {
        const message = userMessage.toLowerCase();
        let response = '';
        let agentName = 'Sarah Chen';
        let department = 'support';

        if (message.includes('order') || message.includes('status') || message.includes('track')) {
            agentName = 'Sarah Chen';
            department = 'orders';
            response = this.generateOrderResponse();
            this.analytics.trackInteraction('order_inquiry', 'orders');
        } 
        else if (message.includes('return') || message.includes('exchange') || message.includes('refund')) {
            agentName = 'Lisa Chang';
            department = 'returns';
            response = this.generateReturnResponse();
            this.analytics.trackInteraction('return_inquiry', 'returns');
        }
        else if (message.includes('product') || message.includes('nexa') || message.includes('recommend')) {
            agentName = 'Emma Wilson';
            department = 'products';
            response = this.generateProductResponse();
            this.analytics.trackInteraction('product_inquiry', 'products');
        }
        else if (message.includes('billing') || message.includes('payment') || message.includes('charge')) {
            agentName = 'Alex Thompson';
            department = 'billing';
            response = this.generateBillingResponse();
            this.analytics.trackInteraction('billing_inquiry', 'billing');
        }
        else if (message.includes('technical') || message.includes('website') || message.includes('app')) {
            agentName = 'Mike Rodriguez';
            department = 'technical';
            response = this.generateTechnicalResponse();
            this.analytics.trackInteraction('technical_inquiry', 'technical');
        }
        else if (message.includes('hello') || message.includes('hi') || message.includes('help')) {
            response = this.generateGreetingResponse();
            this.analytics.trackInteraction('greeting', 'general');
        }
        else if (message.includes('thank') || message.includes('thanks')) {
            response = this.generateThankYouResponse();
            this.analytics.trackInteraction('gratitude', 'general');
        }
        else {
            response = this.generateSmartResponse(message);
            this.analytics.trackInteraction('general_inquiry', 'general');
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
            
            this.showNotification(`${agentName} responded • ${this.performance.getAverageResponseTime()}ms avg`);
        }, 1200 + Math.random() * 800);
    }

    // === RESPONSE GENERATORS ===
    generateOrderResponse() {
        const orders = this.orderManager.orders;
        const currentTime = new Date().toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        });

        let response = `Hi asarekings! 📦 **Real-time Order Dashboard** (Updated: ${currentTime} UTC)\n\n`;
        
        orders.forEach(order => {
            const statusEmoji = {
                'delivered': '✅',
                'in_transit': '🚚',
                'out_for_delivery': '🏃‍♂️',
                'processing': '⏳',
                'shipped': '📦'
            };
            
            response += `${statusEmoji[order.status]} **${order.id}** - $${order.total}\n`;
            response += `📅 Ordered: ${new Date(order.orderDate).toLocaleDateString()}\n`;
            response += `📋 Status: ${order.status.toUpperCase().replace('_', ' ')}\n`;
            response += `🛍️ Items: ${order.items.join(', ')}\n`;
            
            if (order.trackingNumber) {
                response += `🔍 Tracking: ${order.trackingNumber}\n`;
            }
            
            if (order.currentLocation) {
                response += `📍 Location: ${order.currentLocation}\n`;
            }
            
            if (order.deliveryProgress !== undefined) {
                const progressBar = '▓'.repeat(Math.floor(order.deliveryProgress / 10)) + 
                                  '░'.repeat(10 - Math.floor(order.deliveryProgress / 10));
                response += `📊 Progress: ${progressBar} ${order.deliveryProgress}%\n`;
            }
            
            if (order.estimatedDelivery) {
                response += `📅 Est. Delivery: ${new Date(order.estimatedDelivery).toLocaleDateString()}\n`;
            }
            
            response += `\n`;
        });
        
        response += `🔥 **Hot Items (Live Inventory):**\n`;
        Object.entries(this.inventory).forEach(([productId, item]) => {
            if (item.trending && item.stock > 0) {
                response += `• ${productId.replace('-', ' ').toUpperCase()}: ${item.stock} left in ${item.warehouse}\n`;
            }
        });
        
        response += `\n📱 **Quick Actions:**\n`;
        response += `• Track in real-time: nexashop.com/track\n`;
        response += `• Delivery preferences: Update anytime\n`;
        response += `• Mobile notifications: Download our app\n`;
        response += `• Live chat support: Available 24/7`;
        
        return response;
    }

    generateProductResponse() {
        const recommendations = this.recommendations.getPersonalizedRecommendations();
        const currentInventory = this.inventory;
        
        let response = `🛍️ **NexaShop Product Showcase** (Live Inventory)\n\n`;
        
        response += `🔥 **Featured Products:**\n\n`;
        
        const products = [
            { id: 'nexaphone-pro', name: 'NexaPhone Pro Max', price: 1099.99, rating: 4.9, specs: '6.7" OLED, 512GB, 5G, Pro Camera' },
            { id: 'nexabook-ultra', name: 'NexaBook Ultra 16', price: 1599.99, rating: 4.8, specs: 'M2 Pro, 32GB RAM, 1TB SSD, 16.2" Liquid Retina' },
            { id: 'nexapods-max', name: 'NexaPods Max', price: 249.99, rating: 4.7, specs: 'Spatial Audio, ANC, 30h Battery, Wireless Charging' }
        ];
        
        products.forEach(product => {
            const inventory = currentInventory[product.id];
            const stockStatus = inventory ? 
                (inventory.stock > 50 ? '✅ In Stock' : 
                 inventory.stock > 0 ? `⚠️ Low Stock (${inventory.stock} left)` : 
                 '❌ Out of Stock') : '❓ Checking...';
            
            response += `📱 **${product.name}** - $${product.price} ⭐${product.rating}\n`;
            response += `📋 ${product.specs}\n`;
            response += `📦 ${stockStatus}\n`;
            if (inventory && inventory.stock > 0) {
                response += `🏭 Ships from: ${inventory.warehouse}\n`;
                if (inventory.trending) response += `🔥 Trending Now!\n`;
            }
            response += `\n`;
        });
        
        response += `🎯 **Personalized for You:**\n`;
        recommendations.trending.forEach(rec => {
            response += `• ${rec.id.replace('-', ' ').toUpperCase()} (${Math.round(rec.score * 100)}% match) - ${rec.reason}\n`;
        });
        
        response += `\n💰 **Current Deals:**\n`;
        recommendations.currentDeals.forEach(deal => {
            const savings = deal.originalPrice - deal.salePrice;
            response += `🏷️ ${deal.id.replace('-', ' ').toUpperCase()}: Save $${savings.toFixed(2)} (${deal.discount}% off)\n`;
            response += `   Was $${deal.originalPrice} → Now $${deal.salePrice}\n`;
        });
        
        response += `\n🚀 **Why Choose NexaShop?**\n`;
        response += `• ✅ 2-year warranty on all electronics\n`;
        response += `• 🚚 Free shipping on orders $50+\n`;
        response += `• 🔄 30-day hassle-free returns\n`;
        response += `• 🛡️ Premium customer support\n`;
        response += `• 📱 Exclusive mobile app deals\n\n`;
        response += `**Need specific recommendations?** Tell me your budget and needs!`;
        
        return response;
    }

    generateReturnResponse() {
        return `↩️ **NexaShop Advanced Returns & Exchanges:**\n\n✨ **Our Premium Return Promise:**\n• 30-day return window (extended for electronics)\n• 100% free return shipping\n• No restocking fees ever\n• 24-hour return processing\n• Full refund guarantee\n\n🚀 **Express Return Process:**\n1️⃣ **Instant Return Authorization** - Log into account, select item, get instant approval\n2️⃣ **Smart Packaging & Shipping** - Pre-paid return label (QR code), drop off anywhere\n3️⃣ **Lightning-Fast Processing** - 24-hour inspection, instant refund approval\n\n📊 **Your Return History:**\n• Total returns: 2 (Excellent customer!)\n• Average processing: 1.5 days\n• Satisfaction rating: 5/5 ⭐\n• VIP return status: Activated\n\n**Need to return something specific?** I can start the process right now!`;
    }

    generateBillingResponse() {
        return `💳 **NexaShop Advanced Billing Center:**\n\n🔒 **Secure Payment Hub:**\n• 256-bit SSL encryption\n• PCI DSS Level 1 compliant\n• Fraud protection: Active\n• Zero-liability guarantee\n\n💰 **Payment Methods:**\n• Credit/Debit Cards (Visa, MC, Amex, Discover)\n• Digital Wallets (PayPal, Apple Pay, Google Pay)\n• Buy Now, Pay Later (Klarna, Afterpay)\n• NexaShop Store Credit & Gift Cards\n• Cryptocurrency (Bitcoin, Ethereum)\n\n📊 **Your Account Summary:**\n• Account status: Premium Member 🌟\n• Total spent: $2,929.97 (Lifetime)\n• Saved with deals: $487.23\n• Cashback earned: $58.60\n• Next reward milestone: $70.03 away\n\n**Having a billing issue?** I can review your account and resolve it in real-time!`;
    }

    generateTechnicalResponse() {
        return `🔧 **NexaShop Technical Support Center:**\n\n🌐 **Platform Status (Real-time):**\n• Website: ✅ Operational (99.99% uptime)\n• Mobile App: ✅ Operational (v3.2.1)\n• Payment System: ✅ Operational\n• Order Processing: ✅ Operational\n• Customer Chat: ✅ Operational (You're here!)\n\n📱 **Browser & App Support:**\n• Chrome 90+ (Recommended ⭐)\n• Safari 14+ (iOS/macOS)\n• Firefox 88+ / Edge 90+\n• Mobile app: iOS 13+ / Android 8+\n\n🔐 **Account Access Help:**\n• Password Reset: Instant email link\n• 2FA Setup: Enhanced security available\n• Account Recovery: Multiple verification methods\n• Profile Sync: Cross-device synchronization\n\n⚡ **Performance Optimization:**\n• CDN: Global edge servers\n• Cache: Intelligent pre-loading\n• Images: Auto-optimized delivery\n• Search: AI-powered results\n\n**Still having trouble?** I can walk you through step-by-step troubleshooting!`;
    }

    generateGreetingResponse() {
        return `Hello asarekings! 👋 Welcome to NexaShop's premium support.\n\n🎫 **Your ticket:** ${this.ticketNumber}\n📅 **Current time:** June 8, 2025 - 10:52:25 UTC\n\n🌟 **I'm here to help with:**\n• 📦 Order tracking & delivery\n• 🔄 Returns & exchanges  \n• 💡 Product information\n• 💳 Billing & payments\n• 🔧 Technical support\n\n**What can I assist you with today?** I'm committed to providing you with exceptional service! ⚡`;
    }

    generateThankYouResponse() {
        return `You're absolutely welcome, asarekings! 😊 It's been my pleasure to help.\n\n🌟 **Is there anything else I can assist you with today?**\n\n📝 **You'll receive:**\n• Email summary of our conversation\n• 24-hour follow-up window\n• Satisfaction survey link\n\n💙 Thank you for choosing NexaShop - where innovation meets exceptional service!`;
    }

    generateSmartResponse(message) {
        return `I'd be happy to help you with that! 😊\n\n🎯 **I can assist you with:**\n\n📦 **Orders & Shipping** - Track packages, delivery updates\n🛍️ **Products** - Recommendations, specifications, availability\n💳 **Billing** - Payment issues, refunds, account settings\n🔧 **Technical** - Website/app issues, login problems\n↩️ **Returns** - Easy return process, exchanges\n\n**What specific area would you like help with?** I'm here to ensure you have an amazing NexaShop experience!`;
    }

    // === UTILITY FUNCTIONS ===
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

        const welcomeMsg = this.messagesContainer.querySelector('.welcome-message');
        if (welcomeMsg && this.messages.length === 1) {
            welcomeMsg.remove();
        }

        this.messagesContainer.appendChild(messageEl);
    }

    handleFileSelect(file) {
        if (!file || !this.fileUpload.validateFile(file)) return;
        
        this.selectedFile = file;
        this.filePreview.style.display = 'block';
        this.filePreview.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>📎 ${file.name} (${this.formatFileSize(file.size)}) - Attachment for ticket ${this.ticketNumber}</span>
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

    showTypingIndicator(agentName) {
        if (!this.messagesContainer) return;
        
        const existingIndicator = document.getElementById('typingIndicator');
        if (existingIndicator) existingIndicator.remove();
        
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <span>${agentName} ${this.translate('typing')}</span>
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
