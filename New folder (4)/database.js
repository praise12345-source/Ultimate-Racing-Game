// Player Database System
class PlayerDatabase {
    constructor() {
        this.dbName = 'ultimateRacingDB';
        this.init();
    }
    
    init() {
        if (!localStorage.getItem(this.dbName)) {
            localStorage.setItem(this.dbName, JSON.stringify({
                players: {},
                aiDrivers: {},
                races: [],
                leaderboard: []
            }));
        }
    }
    
    // Player Management
    savePlayer(playerId, playerData) {
        const db = this.getDatabase();
        db.players[playerId] = {
            id: playerId,
            name: playerData.name || 'Player',
            level: playerData.level || 0,
            coins: playerData.coins || 0,
            experience: playerData.experience || 0,
            wins: playerData.wins || 0,
            losses: playerData.losses || 0,
            totalRaces: playerData.totalRaces || 0,
            bestDistance: playerData.bestDistance || 0,
            bestScore: playerData.bestScore || 0,
            currentCar: playerData.currentCar || 'sports',
            ownedCars: playerData.ownedCars || ['sports'],
            unlockedLevels: playerData.unlockedLevels || 1,
            achievements: playerData.achievements || [],
            stats: playerData.stats || {},
            profile: playerData.profile || {},
            createdAt: playerData.createdAt || new Date().toISOString(),
            lastPlayed: new Date().toISOString()
        };
        this.saveDatabase(db);
    }
    
    getPlayer(playerId) {
        const db = this.getDatabase();
        return db.players[playerId] || null;
    }
    
    getAllPlayers() {
        const db = this.getDatabase();
        return Object.values(db.players);
    }
    
    updatePlayer(playerId, updates) {
        const db = this.getDatabase();
        if (db.players[playerId]) {
            db.players[playerId] = { ...db.players[playerId], ...updates, lastPlayed: new Date().toISOString() };
            this.saveDatabase(db);
        }
    }
    
    // AI Driver Management
    saveAIDriver(driverId, driverData) {
        const db = this.getDatabase();
        db.aiDrivers[driverId] = {
            id: driverId,
            name: driverData.name,
            avatar: driverData.avatar || '👤',
            level: driverData.level || 1,
            car: driverData.car || 'sports',
            skill: driverData.skill || 0.5,
            aggression: driverData.aggression || 0.5,
            wins: driverData.wins || 0,
            losses: driverData.losses || 0,
            bio: driverData.bio || '',
            personality: driverData.personality || 'neutral',
            createdAt: new Date().toISOString()
        };
        this.saveDatabase(db);
    }
    
    getAIDriver(driverId) {
        const db = this.getDatabase();
        return db.aiDrivers[driverId] || null;
    }
    
    getAllAIDrivers() {
        const db = this.getDatabase();
        return Object.values(db.aiDrivers);
    }
    
    // Race History
    saveRace(raceData) {
        const db = this.getDatabase();
        db.races.push({
            id: Date.now().toString(),
            date: new Date().toISOString(),
            players: raceData.players || [],
            winner: raceData.winner || null,
            distance: raceData.distance || 0,
            duration: raceData.duration || 0,
            track: raceData.track || 'default'
        });
        // Keep only last 100 races
        if (db.races.length > 100) {
            db.races = db.races.slice(-100);
        }
        this.saveDatabase(db);
    }
    
    getRaceHistory(limit = 10) {
        const db = this.getDatabase();
        return db.races.slice(-limit).reverse();
    }
    
    // Leaderboard
    updateLeaderboard() {
        const db = this.getDatabase();
        const allPlayers = this.getAllPlayers();
        db.leaderboard = allPlayers
            .sort((a, b) => (b.bestScore || 0) - (a.bestScore || 0))
            .slice(0, 100)
            .map((p, index) => ({
                rank: index + 1,
                playerId: p.id,
                name: p.name,
                score: p.bestScore || 0,
                level: p.level || 0
            }));
        this.saveDatabase(db);
    }
    
    getLeaderboard(limit = 10) {
        const db = this.getDatabase();
        this.updateLeaderboard();
        return db.leaderboard.slice(0, limit);
    }
    
    // Database helpers
    getDatabase() {
        return JSON.parse(localStorage.getItem(this.dbName) || '{}');
    }
    
    saveDatabase(db) {
        localStorage.setItem(this.dbName, JSON.stringify(db));
    }
    
    // Initialize default AI drivers
    initializeDefaultAIDrivers() {
        const defaultDrivers = [
            {
                id: 'ai_1',
                name: 'Alex "Thunder" Rodriguez',
                avatar: '⚡',
                level: 5,
                car: 'super',
                skill: 0.7,
                aggression: 0.6,
                bio: 'Former street racer turned professional. Known for aggressive overtakes.',
                personality: 'aggressive'
            },
            {
                id: 'ai_2',
                name: 'Sarah "Swift" Chen',
                avatar: '🏎️',
                level: 8,
                car: 'formula',
                skill: 0.85,
                aggression: 0.4,
                bio: 'Precision driver with perfect cornering technique. Never makes mistakes.',
                personality: 'precise'
            },
            {
                id: 'ai_3',
                name: 'Marcus "Beast" Johnson',
                avatar: '💪',
                level: 6,
                car: 'truck',
                skill: 0.65,
                aggression: 0.8,
                bio: 'Powerful driver who dominates with brute force. Fearless competitor.',
                personality: 'aggressive'
            },
            {
                id: 'ai_4',
                name: 'Luna "Shadow" Martinez',
                avatar: '🌙',
                level: 7,
                car: 'lamborghini',
                skill: 0.75,
                aggression: 0.5,
                bio: 'Mysterious racer with incredible speed. Hard to predict.',
                personality: 'unpredictable'
            },
            {
                id: 'ai_5',
                name: 'James "Viper" Wilson',
                avatar: '🐍',
                level: 9,
                car: 'bugatti',
                skill: 0.9,
                aggression: 0.7,
                bio: 'Elite racer with championship titles. The one to beat.',
                personality: 'elite'
            },
            {
                id: 'ai_6',
                name: 'Emma "Phoenix" Taylor',
                avatar: '🔥',
                level: 4,
                car: 'ferrari',
                skill: 0.6,
                aggression: 0.5,
                bio: 'Rising star with natural talent. Always improving.',
                personality: 'balanced'
            }
        ];
        
        defaultDrivers.forEach(driver => {
            if (!this.getAIDriver(driver.id)) {
                this.saveAIDriver(driver.id, driver);
            }
        });
    }
}

// Initialize database
const playerDB = new PlayerDatabase();
playerDB.initializeDefaultAIDrivers();

