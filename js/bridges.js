// Bridge Database - Curated bridges + user-added custom bridges
// Persisted in localStorage

const STORAGE_KEY = 'bridgeClearance_bridges';

// Curated bridge database - known bridges worldwide
const CURATED_BRIDGES = [
    // New Zealand - Auckland
    {
        id: 'obc',
        name: 'OBC Bridge',
        location: 'Tamaki Drive, Auckland',
        lat: -36.85288,
        lng: 174.80456,
        country: 'NZ',
        spans: [
            { id: 'in-out', label: 'In/Out', clearance: 6.2 },
            { id: 'high', label: 'High', clearance: 6.5 }
        ],
        chartDatum: 0,
        defaultSpan: 'in-out',
        tideProvider: 'linz',
        tideStationId: 'Auckland',
        curated: true
    },
    {
        id: 'panmure',
        name: 'Panmure Bridge',
        location: 'Tamaki River, Auckland',
        lat: -36.8907,
        lng: 174.8416,
        country: 'NZ',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 4.5 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'linz',
        tideStationId: 'Auckland',
        curated: true
    },
    // United States - Examples
    {
        id: 'cap-cod-canal-rr',
        name: 'Cape Cod Canal Railroad Bridge',
        location: 'Buzzards Bay, Massachusetts',
        lat: 41.7414,
        lng: -70.6170,
        country: 'US',
        spans: [
            { id: 'main', label: 'Main Channel', clearance: 7.0 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8447270',
        curated: true
    },
    {
        id: 'intracoastal-fl',
        name: 'Julia Tuttle Causeway Bridge',
        location: 'Miami, Florida',
        lat: 25.8118,
        lng: -80.1685,
        country: 'US',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 17.1 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8723214',
        curated: true
    },
    {
        id: 'chesapeake-bay',
        name: 'Chesapeake Bay Bridge',
        location: 'Annapolis, Maryland',
        lat: 38.9926,
        lng: -76.3827,
        country: 'US',
        spans: [
            { id: 'main', label: 'Main Channel', clearance: 56.4 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8575512',
        curated: true
    }
];

class BridgeDatabase {
    constructor() {
        this.bridges = [...CURATED_BRIDGES];
        this._loadUserBridges();
    }

    _loadUserBridges() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const userBridges = JSON.parse(stored);
                this.bridges = [...CURATED_BRIDGES, ...userBridges];
            }
        } catch (e) {
            console.error('Failed to load user bridges:', e);
        }
    }

    _saveUserBridges() {
        const userBridges = this.bridges.filter(b => !b.curated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userBridges));
    }

    getAll() {
        return this.bridges;
    }

    getById(id) {
        return this.bridges.find(b => b.id === id);
    }

    search(query) {
        const q = query.toLowerCase();
        return this.bridges.filter(b =>
            b.name.toLowerCase().includes(q) ||
            b.location.toLowerCase().includes(q) ||
            (b.country && b.country.toLowerCase().includes(q))
        );
    }

    findNearby(lat, lng, radiusKm = 100) {
        return this.bridges
            .map(b => ({
                ...b,
                distance: haversineDistance(lat, lng, b.lat, b.lng)
            }))
            .filter(b => b.distance <= radiusKm)
            .sort((a, b) => a.distance - b.distance);
    }

    async addCustomBridge(bridge) {
        // Auto-detect tide provider and station
        if (!bridge.tideProvider || !bridge.tideStationId) {
            const station = await findNearestTideStation(bridge.lat, bridge.lng);
            if (station) {
                bridge.tideProvider = station.provider;
                bridge.tideStationId = station.id;
                bridge.tideStationName = station.name;
                bridge.tideStationDistance = station.distance;
            }
        }

        bridge.id = 'custom_' + Date.now();
        bridge.curated = false;
        this.bridges.push(bridge);
        this._saveUserBridges();
        return bridge;
    }

    removeCustomBridge(id) {
        this.bridges = this.bridges.filter(b => b.id !== id || b.curated);
        this._saveUserBridges();
    }
}
