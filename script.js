class NexaShopSupport {
    constructor() {
        // Current time as provided: 2025-06-08 11:33:17 UTC
        this.currentDateTime = new Date('2025-06-08T11:33:17Z');
        
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
            aiMode: 'intelligent', // intelligent, basic, expert
            aiPersonality: 'helpful' // helpful, professional, casual, expert
        };
        
        this.ticketNumber = 'NEX-2025-0608-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        console.log('🤖 Initializing NexaShop AI Support System...');
        console.log('📅 Current Time: 2025-06-08 11:33:17 UTC');
        console.log('👤 User: asarekings logged in');
        console.log('🧠 AI Features: Advanced conversation analysis activated');
        
        this.initializeAIFeatures();
        this.initializeAdvancedFeatures();
        this.init();
    }

    // === ADVANCED AI CONVERSATION FEATURES ===
    initializeAIFeatures() {
        this.aiEngine = {
            // Natural Language Processing
            nlp: {
                sentimentAnalysis: (text) => this.analyzeSentiment(text),
                intentRecognition: (text) => this.recognizeIntent(text),
                entityExtraction: (text) => this.extractEntities(text),
                contextUnderstanding: (text) => this.understandContext(text)
            },
            
            // Conversation Management
            conversation: {
                memory: new Map(), // Long-term conversation memory
                shortTermContext: [], // Last 5 interactions
                userProfile: this.buildUserProfile(),
                conversationState: 'greeting' // greeting, inquiry, problem_solving, resolution
            },
            
            // Smart Response Generation
            responseGeneration: {
                templates: this.loadResponseTemplates(),
                dynamicContent: true,
                personalization: true,
                multiStep: true // Multi-step problem solving
            },
            
            // Learning and Adaptation
            learning: {
                userPreferences: new Map(),
                successfulSolutions: [],
                commonIssues: new Map(),
                improvementSuggestions: []
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
        
        // Calculate overall sentiment
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
                confidence: 0,
                examples: ['check my order', 'track my package', 'order status', 'delivery update']
            },
            product_info: {
                patterns: ['product', 'item', 'specification', 'feature', 'compare', 'recommend', 'suggest'],
                confidence: 0,
                examples: ['product details', 'phone specs', 'laptop features', 'what do you recommend']
            },
            technical_support: {
                patterns: ['not working', 'broken', 'error', 'bug', 'issue', 'problem', 'fix', 'help'],
                confidence: 0,
                examples: ['device not working', 'error message', 'technical issue', 'need help fixing']
            },
            billing_payment: {
                patterns: ['payment', 'billing', 'charge', 'refund', 'money', 'card', 'invoice'],
                confidence: 0,
                examples: ['payment issue', 'billing question', 'refund request', 'charge dispute']
            },
            return_exchange: {
                patterns: ['return', 'exchange', 'replace', 'send back', 'defective', 'wrong item'],
                confidence: 0,
                examples: ['return item', 'exchange product', 'wrong size', 'defective device']
            },
            complaint_feedback: {
                patterns: ['complain', 'feedback', 'disappointed', 'unsatisfied', 'review', 'terrible'],
                confidence: 0,
                examples: ['complaint about service', 'negative feedback', 'dissatisfied customer']
            },
            general_inquiry: {
                patterns: ['hello', 'hi', 'help', 'question', 'info', 'about'],
                confidence: 0,
                examples: ['general question', 'need information', 'hello there']
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
            allIntents: intents,
            entities: this.extractEntities(text)
        };
    }

    // === ENTITY EXTRACTION ===
    extractEntities(text) {
        const entities = {
            orderNumbers: [],
            productNames: [],
            amounts: [],
            dates: [],
            emails: [],
            phoneNumbers: []
        };
        
        // Extract order numbers (NEX-YYYY-XXXXXX format)
        const orderRegex = /NEX-\d{4}-\d{6}/gi;
        entities.orderNumbers = text.match(orderRegex) || [];
        
        // Extract product names
        const products = ['nexaphone', 'nexabook', 'nexapods', 'nexawatch', 'nexacharge'];
        products.forEach(product => {
            if (text.toLowerCase().includes(product)) {
                entities.productNames.push(product);
            }
        });
        
        // Extract amounts ($XXX.XX format)
        const amountRegex = /\$\d+\.?\d*/gi;
        entities.amounts = text.match(amountRegex) || [];
        
        // Extract dates
        const dateRegex = /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/gi;
        entities.dates = text.match(dateRegex) || [];
        
        // Extract emails
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
        entities.emails = text.match(emailRegex) || [];
        
        return entities;
    }

    // === CONTEXT UNDERSTANDING ===
    understandContext(text) {
        const analysis = {
            sentiment: this.analyzeSentiment(text),
            intent: this.recognizeIntent(text),
            entities: this.extractEntities(text),
            conversationFlow: this.analyzeConversationFlow(),
            urgencyLevel: this.assessUrgency(text),
            complexity: this.assessComplexity(text)
        };
        
        // Store in conversation context
        this.conversationContext.push({
            timestamp: Date.now(),
            text: text,
            analysis: analysis,
            userMessage: true
        });
        
        // Keep only last 10 interactions for context
        if (this.conversationContext.length > 10) {
            this.conversationContext.shift();
        }
        
        return analysis;
    }

    analyzeConversationFlow() {
        if (this.conversationContext.length === 0) return 'initial';
        
        const lastInteractions = this.conversationContext.slice(-3);
        const intents = lastInteractions.map(ctx => ctx.analysis?.intent?.intent).filter(Boolean);
        
        if (intents.every(intent => intent === intents[0])) {
            return 'focused'; // User staying on same topic
        } else if (intents.includes('technical_support') && intents.includes('order_inquiry')) {
            return 'multi_issue'; // Multiple related issues
        } else {
            return 'exploratory'; // User exploring different topics
        }
    }

    assessUrgency(text) {
        const urgentIndicators = ['urgent', 'emergency', 'immediately', 'asap', 'critical', 'broken', 'not working'];
        const urgentCount = urgentIndicators.filter(indicator => 
            text.toLowerCase().includes(indicator)
        ).length;
        
        if (urgentCount >= 2) return 'high';
        if (urgentCount === 1) return 'medium';
        return 'low';
    }

    assessComplexity(text) {
        const entities = this.extractEntities(text);
        const totalEntities = Object.values(entities).flat().length;
        const wordCount = text.split(/\s+/).length;
        
        if (totalEntities >= 3 || wordCount > 50) return 'high';
        if (totalEntities >= 1 || wordCount > 20) return 'medium';
        return 'low';
    }

    // === AI-POWERED RESPONSE GENERATION ===
    generateAIResponse(userMessage, context) {
        const analysis = this.understandContext(userMessage);
        
        // Choose response strategy based on analysis
        let responseStrategy = this.selectResponseStrategy(analysis);
        let response = '';
        
        switch (responseStrategy) {
            case 'problem_solving':
                response = this.generateProblemSolvingResponse(analysis);
                break;
            case 'information_providing':
                response = this.generateInformationResponse(analysis);
                break;
            case 'empathetic_support':
                response = this.generateEmpatheticResponse(analysis);
                break;
            case 'step_by_step':
                response = this.generateStepByStepResponse(analysis);
                break;
            case 'proactive_assistance':
                response = this.generateProactiveResponse(analysis);
                break;
            default:
                response = this.generateContextualResponse(analysis);
        }
        
        // Add personalization
        response = this.personalizeResponse(response, analysis);
        
        // Add smart suggestions
        const suggestions = this.generateSmartSuggestions(analysis);
        if (suggestions.length > 0) {
            response += '\n\n' + this.formatSuggestions(suggestions);
        }
        
        return {
            response: response,
            strategy: responseStrategy,
            analysis: analysis,
            suggestions: suggestions,
            agent: this.selectBestAgent(analysis)
        };
    }

    selectResponseStrategy(analysis) {
        const { sentiment, intent, urgencyLevel, complexity } = analysis;
        
        if (urgencyLevel === 'high') return 'problem_solving';
        if (sentiment.overall === 'negative') return 'empathetic_support';
        if (complexity === 'high') return 'step_by_step';
        if (intent.intent === 'technical_support') return 'problem_solving';
        if (intent.intent === 'product_info') return 'information_providing';
        
        return 'proactive_assistance';
    }

    generateProblemSolvingResponse(analysis) {
        const { intent, entities, urgencyLevel } = analysis;
        
        let response = '';
        
        if (urgencyLevel === 'high') {
            response += `🚨 I understand this is urgent, asarekings. Let me help you resolve this immediately.\n\n`;
        } else {
            response += `Hi asarekings! 🔧 I'm here to help solve this issue for you.\n\n`;
        }
        
        // Specific problem-solving based on intent
        switch (intent.intent) {
            case 'technical_support':
                response += this.generateTechnicalSolution(entities);
                break;
            case 'order_inquiry':
                response += this.generateOrderSolution(entities);
                break;
            case 'billing_payment':
                response += this.generateBillingSolution(entities);
                break;
            default:
                response += `Let me analyze your issue and provide a step-by-step solution:\n\n`;
                response += this.generateGenericSolution(analysis);
        }
        
        response += `\n💡 **Next Steps:**\n`;
        response += `• I'll monitor this issue until it's resolved\n`;
        response += `• You'll receive updates every step of the way\n`;
        response += `• If this doesn't work, I have backup solutions ready\n\n`;
        response += `**Is this helping so far? Let me know how it's going!**`;
        
        return response;
    }

    generateTechnicalSolution(entities) {
        let solution = `🔧 **Technical Issue Diagnosis:**\n\n`;
        
        if (entities.productNames.length > 0) {
            const product = entities.productNames[0];
            solution += `**Product:** ${product.toUpperCase()}\n\n`;
            
            switch (product) {
                case 'nexaphone':
                    solution += `📱 **NexaPhone Troubleshooting:**\n`;
                    solution += `1️⃣ **Quick Reset:** Hold power + volume down for 10 seconds\n`;
                    solution += `2️⃣ **Software Update:** Settings > System > Updates\n`;
                    solution += `3️⃣ **Network Reset:** Settings > Network > Reset Network Settings\n`;
                    solution += `4️⃣ **Factory Reset:** Last resort if above doesn't work\n\n`;
                    break;
                case 'nexabook':
                    solution += `💻 **NexaBook Troubleshooting:**\n`;
                    solution += `1️⃣ **Power Cycle:** Hold power button for 10 seconds, restart\n`;
                    solution += `2️⃣ **Check Connections:** Ensure charger and peripherals are secure\n`;
                    solution += `3️⃣ **Boot in Safe Mode:** Hold Shift while starting up\n`;
                    solution += `4️⃣ **System Diagnostics:** Run built-in hardware test\n\n`;
                    break;
                default:
                    solution += this.generateGenericTechSolution();
            }
        } else {
            solution += this.generateGenericTechSolution();
        }
        
        solution += `🎯 **Advanced Solutions Available:**\n`;
        solution += `• Remote diagnostic tool\n`;
        solution += `• Video call troubleshooting\n`;
        solution += `• Express replacement program\n`;
        solution += `• Expert technician consultation\n`;
        
        return solution;
    }

    generateGenericTechSolution() {
        return `🔧 **Universal Troubleshooting Steps:**\n` +
               `1️⃣ **Restart Device:** Turn off completely, wait 30 seconds, turn on\n` +
               `2️⃣ **Check Connections:** Ensure all cables are secure\n` +
               `3️⃣ **Update Software:** Check for and install any available updates\n` +
               `4️⃣ **Clear Cache:** Clear temporary files and cache\n` +
               `5️⃣ **Check Settings:** Verify configuration settings are correct\n\n`;
    }

    generateInformationResponse(analysis) {
        const { intent, entities } = analysis;
        
        let response = `Hi asarekings! 🛍️ I'll provide you with detailed information.\n\n`;
        
        if (entities.productNames.length > 0) {
            entities.productNames.forEach(product => {
                response += this.getProductInformation(product);
            });
        } else {
            response += this.getGeneralProductInformation();
        }
        
        response += `\n🎯 **Personalized Recommendations:**\n`;
        response += this.generatePersonalizedRecommendations();
        
        response += `\n💬 **What would you like to know more about?**\n`;
        response += `• Detailed specifications\n`;
        response += `• Comparison with other products\n`;
        response += `• Pricing and availability\n`;
        response += `• Customer reviews and ratings\n`;
        
        return response;
    }

    generateEmpatheticResponse(analysis) {
        const { sentiment, intent } = analysis;
        
        let response = '';
        
        if (sentiment.overall === 'negative') {
            response += `I sincerely apologize that you're experiencing this issue, asarekings. 😔\n\n`;
            response += `Your frustration is completely understandable, and I'm here to make this right for you.\n\n`;
        }
        
        response += `🤝 **Here's how I'm going to help you:**\n\n`;
        response += `✅ **Immediate Action:** I'm prioritizing your case right now\n`;
        response += `✅ **Personal Attention:** I'll stay with you until this is resolved\n`;
        response += `✅ **Escalation Ready:** I can bring in senior specialists if needed\n`;
        response += `✅ **Follow-up Guaranteed:** I'll check in with you to ensure satisfaction\n\n`;
        
        // Provide specific solution based on intent
        response += this.generateSolutionForIntent(intent);
        
        response += `\n💙 **You matter to us, asarekings.** NexaShop is committed to exceeding your expectations.\n\n`;
        response += `**How are you feeling about this approach? I'm here to adjust based on your needs.**`;
        
        return response;
    }

    generateStepByStepResponse(analysis) {
        const { intent, complexity } = analysis;
        
        let response = `Hi asarekings! 📋 I'll guide you through this step-by-step.\n\n`;
        response += `🎯 **Complexity Level:** ${complexity.toUpperCase()}\n`;
        response += `⏱️ **Estimated Time:** ${this.estimateTimeRequired(complexity)}\n\n`;
        
        response += `📝 **Step-by-Step Process:**\n\n`;
        
        const steps = this.generateStepsForIntent(intent.intent);
        steps.forEach((step, index) => {
            response += `**STEP ${index + 1}:** ${step}\n\n`;
        });
        
        response += `✅ **Completion Checklist:**\n`;
        response += `• Each step completed successfully\n`;
        response += `• Issue fully resolved\n`;
        response += `• You're satisfied with the solution\n`;
        response += `• Follow-up scheduled if needed\n\n`;
        
        response += `**Ready to start? I'll guide you through each step and wait for your confirmation before moving to the next one.**`;
        
        return response;
    }

    generateProactiveResponse(analysis) {
        const { intent, entities } = analysis;
        
        let response = `Hi asarekings! 🚀 I'm here to provide proactive assistance.\n\n`;
        
        // Anticipate needs based on context
        const anticipatedNeeds = this.anticipateUserNeeds(analysis);
        
        response += `🔮 **I noticed you might also need:**\n`;
        anticipatedNeeds.forEach(need => {
            response += `• ${need}\n`;
        });
        response += `\n`;
        
        // Main response for the immediate need
        response += this.generateSolutionForIntent(intent);
        
        // Add proactive suggestions
        response += `\n💡 **Proactive Suggestions:**\n`;
        const suggestions = this.generateProactiveSuggestions(analysis);
        suggestions.forEach(suggestion => {
            response += `• ${suggestion}\n`;
        });
        
        response += `\n**Would you like me to help with any of these additional items while we're here?**`;
        
        return response;
    }

    // === SMART SUGGESTIONS SYSTEM ===
    generateSmartSuggestions(analysis) {
        const suggestions = [];
        const { intent, entities, sentiment } = analysis;
        
        // Intent-based suggestions
        switch (intent.intent) {
            case 'order_inquiry':
                suggestions.push('Set up delivery notifications');
                suggestions.push('Update delivery preferences');
                suggestions.push('Track multiple orders at once');
                break;
            case 'product_info':
                suggestions.push('Compare with similar products');
                suggestions.push('Check current promotions');
                suggestions.push('Add to wishlist for price alerts');
                break;
            case 'technical_support':
                suggestions.push('Schedule follow-up check');
                suggestions.push('Enable remote diagnostics');
                suggestions.push('Download troubleshooting app');
                break;
        }
        
        // Sentiment-based suggestions
        if (sentiment.overall === 'negative') {
            suggestions.push('Speak with a supervisor');
            suggestions.push('Request priority handling');
            suggestions.push('Provide feedback for improvement');
        }
        
        // Entity-based suggestions
        if (entities.productNames.length > 0) {
            suggestions.push('View product warranty info');
            suggestions.push('Download user manual');
            suggestions.push('Join product community forum');
        }
        
        return suggestions;
    }

    formatSuggestions(suggestions) {
        let formatted = `🎯 **Smart Suggestions:**\n`;
        suggestions.forEach((suggestion, index) => {
            formatted += `${index + 1}. ${suggestion}\n`;
        });
        formatted += `\n*Click any suggestion above to get instant help with that topic.*`;
        return formatted;
    }

    // === PERSONALIZATION ENGINE ===
    personalizeResponse(response, analysis) {
        // Add user's name where appropriate
        response = response.replace(/\buser\b/gi, 'asarekings');
        
        // Adjust tone based on user preferences and sentiment
        if (analysis.sentiment.overall === 'negative') {
            response = this.adjustToneForEmpathy(response);
        }
        
        // Add personal touches based on conversation history
        const personalTouches = this.getPersonalTouches();
        if (personalTouches.length > 0 && Math.random() > 0.7) {
            response += `\n\n💎 ${personalTouches[Math.floor(Math.random() * personalTouches.length)]}`;
        }
        
        return response;
    }

    adjustToneForEmpathy(response) {
        // Add more empathetic language
        const empathyPhrases = [
            'I completely understand your concern',
            'I can see how frustrating this must be',
            'Let me take care of this for you right away',
            'You have every right to expect better'
        ];
        
        const randomPhrase = empathyPhrases[Math.floor(Math.random() * empathyPhrases.length)];
        return `${randomPhrase}. ${response}`;
    }

    getPersonalTouches() {
        return [
            `As a Premium Member, you have access to our fastest resolution channels.`,
            `I see you've been with NexaShop since your first order - we truly value your loyalty!`,
            `Your feedback helps us improve our service for all customers.`,
            `I'm personally ensuring this gets the attention it deserves.`
        ];
    }

    // === AGENT SELECTION AI ===
    selectBestAgent(analysis) {
        const agents = {
            'Sarah Chen': { 
                specialties: ['orders', 'shipping', 'tracking'], 
                personality: 'efficient',
                experience: 'senior'
            },
            'Mike Rodriguez': { 
                specialties: ['technical', 'troubleshooting', 'devices'], 
                personality: 'analytical',
                experience: 'expert'
            },
            'Emma Wilson': { 
                specialties: ['products', 'recommendations', 'sales'], 
                personality: 'enthusiastic',
                experience: 'specialist'
            },
            'Alex Thompson': { 
                specialties: ['billing', 'payments', 'accounts'], 
                personality: 'precise',
                experience: 'senior'
            },
            'Lisa Chang': { 
                specialties: ['returns', 'exchanges', 'complaints'], 
                personality: 'empathetic',
                experience: 'expert'
            }
        };
        
        const { intent, sentiment, urgencyLevel } = analysis;
        
        // Select based on urgency first
        if (urgencyLevel === 'high') {
            return Object.entries(agents).find(([name, agent]) => 
                agent.experience === 'expert'
            )?.[0] || 'Mike Rodriguez';
        }
        
        // Select based on sentiment
        if (sentiment.overall === 'negative') {
            return 'Lisa Chang'; // Most empathetic
        }
        
        // Select based on intent
        const intentToSpecialty = {
            'order_inquiry': 'orders',
            'technical_support': 'technical',
            'product_info': 'products',
            'billing_payment': 'billing',
            'return_exchange': 'returns'
        };
        
        const requiredSpecialty = intentToSpecialty[intent.intent];
        if (requiredSpecialty) {
            const matchingAgent = Object.entries(agents).find(([name, agent]) => 
                agent.specialties.includes(requiredSpecialty)
            );
            if (matchingAgent) return matchingAgent[0];
        }
        
        return 'Sarah Chen'; // Default to primary agent
    }

    // === ENHANCED MESSAGE PROCESSING ===
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

        // Enhanced analytics with AI insights
        const context = this.understandContext(content);
        this.analytics.trackInteraction('message_sent', 'chat', { 
            messageLength: content.length,
            sentiment: context.sentiment.overall,
            intent: context.intent.intent,
            urgency: context.urgencyLevel,
            complexity: context.complexity
        });

        // Generate AI-powered response
        setTimeout(() => {
            this.generateEnhancedAIResponse(content, startTime, context);
        }, 800 + Math.random() * 1200);
    }

    generateEnhancedAIResponse(userMessage, startTime, context) {
        console.log('🤖 Generating AI response with context:', context);
        
        // Generate response using AI engine
        const aiResponse = this.generateAIResponse(userMessage, context);
        
        this.showTypingIndicator(aiResponse.agent.name);

        setTimeout(() => {
            this.hideTypingIndicator();
            
            const botMessage = {
                id: this.generateId(),
                content: aiResponse.response,
                author: aiResponse.agent.name,
                timestamp: Date.now(),
                isOwn: false,
                department: this.getDepartmentFromIntent(context.intent.intent),
                aiGenerated: true,
                strategy: aiResponse.strategy,
                confidence: context.intent.confidence
            };

            this.messages.push(botMessage);
            this.renderMessage(botMessage);
            this.scrollToBottom();
            this.performance.messagesReceived++;
            this.performance.trackResponseTime(startTime);
            
            // Store conversation for learning
            this.aiEngine.conversation.memory.set(Date.now(), {
                userMessage: userMessage,
                aiResponse: aiResponse,
                context: context,
                satisfaction: null // To be filled when user provides feedback
            });
            
            this.showNotification(`🤖 ${aiResponse.agent.name} responded (AI-powered • ${Math.round(context.intent.confidence * 100)}% confidence)`);
            
            // Add quick action suggestions if available
            if (aiResponse.suggestions.length > 0) {
                this.showQuickActionSuggestions(aiResponse.suggestions);
            }
        }, 1200 + Math.random() * 800);
    }

    // === EXISTING METHODS (Updated for compatibility) ===
    initializeAdvancedFeatures() {
        this.addLiveInventory();
        this.addOrderManagement();
        this.addMultiLanguageSupport();
        this.addPerformanceMonitoring();
        this.addSecurityFeatures();
        this.addAnalytics();
    }

    // ... (Include all your existing methods here - addLiveInventory, addOrderManagement, etc.)
    
    // Add this method to build user profile
    buildUserProfile() {
        return {
            name: 'asarekings',
            membershipLevel: 'Premium',
            joinDate: '2024-01-15',
            totalOrders: 12,
            favoriteCategories: ['electronics', 'accessories'],
            communicationPreference: 'detailed',
            previousIssues: ['shipping delay', 'product question'],
            satisfaction: 4.8,
            preferredAgent: null
        };
    }

    // Add this method to load response templates
    loadResponseTemplates() {
        return {
            greeting: "Hello {name}! Welcome back to NexaShop. How can I assist you today?",
            problem_solving: "I understand you're experiencing {issue}. Let me help you resolve this step by step.",
            empathy: "I sincerely apologize for the inconvenience, {name}. I'm here to make this right.",
            resolution: "Great! I'm glad we could resolve {issue} for you. Is there anything else I can help with?",
            escalation: "I'd like to connect you with a specialist who can provide more advanced assistance."
        };
    }

    // Helper methods for the AI features
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

    estimateTimeRequired(complexity) {
        const timeMap = {
            'low': '2-5 minutes',
            'medium': '5-10 minutes',
            'high': '10-20 minutes'
        };
        return timeMap[complexity] || '5-10 minutes';
    }

    generateStepsForIntent(intent) {
        const steps = {
            'technical_support': [
                'Identify the specific issue and error messages',
                'Check basic connectivity and power status',
                'Perform initial troubleshooting steps',
                'Test the solution and verify functionality',
                'Document the resolution for future reference'
            ],
            'order_inquiry': [
                'Locate your order using order number or email',
                'Check current status and tracking information',
                'Verify shipping address and delivery preferences',
                'Provide updated delivery timeline',
                'Set up notifications for future updates'
            ],
            'return_exchange': [
                'Review return policy and eligibility',
                'Generate return authorization and label',
                'Package item securely for return shipping',
                'Track return package and processing',
                'Process refund or exchange completion'
            ]
        };
        return steps[intent] || ['Analyze your request', 'Research solutions', 'Implement resolution', 'Verify success'];
    }

    anticipateUserNeeds(analysis) {
        const needs = [];
        const { intent, entities } = analysis;
        
        if (intent.intent === 'order_inquiry') {
            needs.push('Delivery preference updates');
            needs.push('Order modification options');
            needs.push('Related product recommendations');
        }
        
        if (entities.productNames.length > 0) {
            needs.push('Warranty information');
            needs.push('Compatible accessories');
            needs.push('Product care instructions');
        }
        
        return needs;
    }

    generateProactiveSuggestions(analysis) {
        return [
            'Enable smart notifications for order updates',
            'Join our VIP program for early access to deals',
            'Download our mobile app for faster support',
            'Set up automatic reordering for frequently purchased items',
            'Subscribe to product update newsletters'
        ];
    }

    showQuickActionSuggestions(suggestions) {
        // Create a suggestions container
        const suggestionsEl = document.createElement('div');
        suggestionsEl.className = 'ai-suggestions';
        suggestionsEl.innerHTML = `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px; border-radius: 12px; margin: 10px 0;">
                <h4>🤖 AI Suggestions</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px;">
                    ${suggestions.map(suggestion => 
                        `<button onclick="nexaShopSupport.quickMessage('${suggestion}')" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 6px 12px; border-radius: 20px; cursor: pointer; font-size: 12px; transition: all 0.2s ease;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">${suggestion}</button>`
                    ).join('')}
                </div>
            </div>
        `;
        
        this.messagesContainer.appendChild(suggestionsEl);
        this.scrollToBottom();
    }

    // ... (Rest of your existing methods)
    
    // Update the init method to include AI features
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.showWelcomeMessage();
        
        // Set global reference
        window.nexaShopSupport = this;
        
        console.log('✅ NexaShop AI Support System initialized successfully');
        console.log('🤖 AI Features: Sentiment analysis, intent recognition, smart suggestions active');
        this.showNotification('🤖 AI-powered support ready! Advanced conversation analysis enabled.');
    }

    // ... (Include all other existing methods from your previous code)
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, initializing NexaShop AI Support...');
    console.log('📅 Current Time: 2025-06-08 11:33:17 UTC');
    console.log('👤 User: asarekings logged in');
    console.log('🤖 Loading advanced AI conversation features...');
    new NexaShopSupport();
});

if (document.readyState === 'loading') {
    // Still loading, wait for DOMContentLoaded
} else {
    console.log('DOM already loaded, initializing AI system immediately...');
    new NexaShopSupport();
}
