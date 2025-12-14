// AI Game Assistant System
class AIGameAssistant {
    constructor() {
        this.name = "RACE AI";
        this.avatar = "🤖";
        this.conversationHistory = [];
        this.locations = {
            'start': { x: 0, z: 0, description: 'Starting line' },
            'checkpoint1': { x: 0, z: 500, description: 'First checkpoint' },
            'checkpoint2': { x: 0, z: 1000, description: 'Second checkpoint' },
            'checkpoint3': { x: 0, z: 1500, description: 'Third checkpoint' },
            'finish': { x: 0, z: 2000, description: 'Finish line' },
            'garage': { x: 0, z: -100, description: 'Car garage' },
            'shop': { x: 0, z: -200, description: 'Upgrade shop' }
        };
    }
    
    processMessage(userMessage, gameState = {}) {
        const message = userMessage.toLowerCase().trim();
        this.conversationHistory.push({ role: 'user', message: userMessage, timestamp: Date.now() });
        
        let response = this.generateResponse(message, gameState);
        
        this.conversationHistory.push({ role: 'assistant', message: response, timestamp: Date.now() });
        
        return response;
    }
    
    generateResponse(message, gameState) {
        // Location queries
        if (message.includes('where') || message.includes('location') || message.includes('find')) {
            return this.handleLocationQuery(message);
        }
        
        // Help queries
        if (message.includes('help') || message.includes('how') || message.includes('what')) {
            return this.handleHelpQuery(message);
        }
        
        // Game status
        if (message.includes('score') || message.includes('distance') || message.includes('coins')) {
            return this.handleStatusQuery(message, gameState);
        }
        
        // Car queries
        if (message.includes('car') || message.includes('vehicle') || message.includes('lamborghini') || 
            message.includes('bugatti') || message.includes('ferrari')) {
            return this.handleCarQuery(message);
        }
        
        // Competitor queries
        if (message.includes('competitor') || message.includes('opponent') || message.includes('ai driver')) {
            return this.handleCompetitorQuery(message);
        }
        
        // Greetings
        if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
            return "Hello! I'm your racing assistant. How can I help you today? I can help you find locations, check your stats, or answer questions about the game!";
        }
        
        // Default response
        return "I'm here to help! Try asking me about locations, your score, cars, or competitors. You can also ask 'help' for more options.";
    }
    
    handleLocationQuery(message) {
        for (const [key, location] of Object.entries(this.locations)) {
            if (message.includes(key) || message.includes(location.description.toLowerCase())) {
                return `📍 ${location.description} is located at coordinates (${location.x}, ${location.z}). ${this.getDirectionsToLocation(location)}`;
            }
        }
        
        if (message.includes('checkpoint')) {
            return "📍 Checkpoints are located at: Checkpoint 1 (500m), Checkpoint 2 (1000m), Checkpoint 3 (1500m). Keep racing to reach them!";
        }
        
        return "📍 I can help you find: start line, checkpoints, finish line, garage, or shop. What would you like to locate?";
    }
    
    getDirectionsToLocation(location) {
        return `Head towards the location - it's marked on your map!`;
    }
    
    handleHelpQuery(message) {
        if (message.includes('control') || message.includes('drive') || message.includes('play')) {
            return "🎮 Controls: W/↑ = Accelerate, S/↓ = Brake, A/← = Left, D/→ = Right. Press P or ESC to pause. Collect coins and avoid obstacles!";
        }
        
        if (message.includes('win') || message.includes('victory') || message.includes('beat')) {
            return "🏆 To win: Complete the race distance, collect coins for upgrades, avoid obstacles, and beat AI competitors. Practice makes perfect!";
        }
        
        if (message.includes('upgrade') || message.includes('improve') || message.includes('better')) {
            return "⚙️ Upgrades: Visit the garage to buy new cars, upgrade your current car's speed and handling, or unlock new tracks. Coins are earned by racing!";
        }
        
        return "💡 I can help with: controls, winning strategies, upgrades, finding locations, checking stats, and more! What do you need help with?";
    }
    
    handleStatusQuery(message, gameState) {
        const responses = [];
        
        if (message.includes('score')) {
            responses.push(`📊 Your current score: ${gameState.score || 0}`);
        }
        
        if (message.includes('distance')) {
            responses.push(`📏 Distance traveled: ${gameState.distance || 0}m`);
        }
        
        if (message.includes('coins')) {
            responses.push(`💰 Coins: ${gameState.coins || 0}`);
        }
        
        if (message.includes('level')) {
            responses.push(`🏁 Level: ${gameState.level || 1}`);
        }
        
        return responses.length > 0 ? responses.join(' | ') : "📊 Your stats are looking good! Keep racing to improve them!";
    }
    
    handleCarQuery(message) {
        const cars = {
            'lamborghini': "🏎️ Lamborghini Aventador - Ultra-fast supercar with incredible speed (1.8x) and good handling. Price: 10,000 coins.",
            'bugatti': "🏎️ Bugatti Chiron - The ultimate speed machine (2.0x speed). Most expensive but fastest car. Price: 15,000 coins.",
            'ferrari': "🏎️ Ferrari F8 - Perfect balance of speed (1.7x) and handling (1.5x). Great for competitive racing. Price: 12,000 coins.",
            'sports': "🏎️ Lightning Sports - Your starter car. Good all-around performance. Price: 1,000 coins.",
            'super': "🏎️ Hyper Super - High-performance car with 1.3x speed boost. Price: 2,000 coins.",
            'formula': "🏎️ Formula Racer - Professional racing car with 1.5x speed and 1.4x handling. Price: 5,000 coins."
        };
        
        for (const [car, info] of Object.entries(cars)) {
            if (message.includes(car)) {
                return info;
            }
        }
        
        return "🏎️ Available cars: Sports, Super, Formula, Lamborghini, Bugatti, Ferrari. Visit the garage to see all options and prices!";
    }
    
    handleCompetitorQuery(message) {
        return "🏁 Your AI competitors have unique names, profiles, and racing styles. Check the leaderboard to see who you're racing against! Each has different skill levels and personalities.";
    }
    
    getConversationHistory() {
        return this.conversationHistory.slice(-10); // Last 10 messages
    }
    
    clearHistory() {
        this.conversationHistory = [];
    }
}

