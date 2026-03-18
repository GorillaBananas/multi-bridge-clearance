// Bridge Database - Curated bridges + user-added custom bridges
// Persisted in localStorage

const STORAGE_KEY = 'bridgeClearance_bridges';

// Curated bridge database - known navigable bridges with posted vertical clearances
// Clearances are measured from chart datum (CD) unless otherwise noted
const CURATED_BRIDGES = [
    // ==================== New Zealand — Auckland ====================
    {
        id: 'auckland-harbour',
        name: 'Auckland Harbour Bridge',
        location: 'Waitematā Harbour, Auckland',
        lat: -36.8279,
        lng: 174.7442,
        country: 'NZ',
        region: 'Auckland',
        spans: [
            { id: 'main', label: 'Main Navigation Span', clearance: 36.5 },
            { id: 'side', label: 'Side Spans', clearance: 20.0 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'linz',
        tideStationId: 'Auckland',
        curated: true
    },
    {
        id: 'obc',
        name: 'OBC Bridge',
        location: 'Tāmaki Drive, Auckland',
        lat: -36.85288,
        lng: 174.80456,
        country: 'NZ',
        region: 'Auckland',
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
        location: 'Tāmaki River, Auckland',
        lat: -36.8907,
        lng: 174.8416,
        country: 'NZ',
        region: 'Auckland',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 4.5 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'linz',
        tideStationId: 'Auckland',
        curated: true
    },
    {
        id: 'mangere',
        name: 'Māngere Bridge',
        location: 'Manukau Harbour, Auckland',
        lat: -36.9361,
        lng: 174.7862,
        country: 'NZ',
        region: 'Auckland',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 19.8 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'linz',
        tideStationId: 'Auckland',
        curated: true
    },
    {
        id: 'upper-harbour',
        name: 'Upper Harbour Bridge',
        location: 'Upper Waitematā, Auckland (SH18)',
        lat: -36.7978,
        lng: 174.6693,
        country: 'NZ',
        region: 'Auckland',
        spans: [
            { id: 'main', label: 'Main Navigation Span', clearance: 15.0 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'linz',
        tideStationId: 'Auckland',
        curated: true
    },

    // ==================== New Zealand — Bay of Plenty ====================
    {
        id: 'tauranga-harbour',
        name: 'Tauranga Harbour Bridge',
        location: 'Tauranga Harbour, Bay of Plenty',
        lat: -37.6539,
        lng: 176.1710,
        country: 'NZ',
        region: 'Bay of Plenty',
        spans: [
            { id: 'main', label: 'Navigation Span', clearance: 9.0 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'linz',
        tideStationId: 'Tauranga',
        curated: true
    },

    {
        id: 'matapihi-rail',
        name: 'Matapihi Rail Bridge',
        location: 'Tauranga Harbour, Bay of Plenty',
        lat: -37.6930,
        lng: 176.1660,
        country: 'NZ',
        region: 'Bay of Plenty',
        spans: [
            { id: 'main', label: 'Navigation Span', clearance: 4.0 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'linz',
        tideStationId: 'Tauranga',
        curated: true
    },

    // ==================== New Zealand — Waikato ====================
    {
        id: 'kopu',
        name: 'Kopu Bridge',
        location: 'Waihou River, Thames',
        lat: -37.1908,
        lng: 175.5620,
        country: 'NZ',
        region: 'Waikato',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 6.5 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'linz',
        tideStationId: 'Auckland',
        curated: true
    },

    // ==================== New Zealand — Northland ====================
    {
        id: 'te-matau-a-pohe',
        name: 'Te Matau a Pōhe',
        location: 'Hātea River, Whangārei',
        lat: -35.7225,
        lng: 174.3255,
        country: 'NZ',
        region: 'Northland',
        spans: [
            { id: 'closed', label: 'Closed', clearance: 7.5 },
            { id: 'open', label: 'Open (Bascule)', clearance: 25.0 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'linz',
        tideStationId: 'Marsden Point',
        curated: true
    },

    // ==================== New Zealand — Wellington ====================
    {
        id: 'paremata',
        name: 'Paremata Bridge',
        location: 'Pauatahanui Inlet, Porirua',
        lat: -41.0834,
        lng: 174.8713,
        country: 'NZ',
        region: 'Wellington',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 5.5 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'linz',
        tideStationId: 'Wellington',
        curated: true
    },

    // ==================== United States — New York / New Jersey ====================
    {
        id: 'verrazano',
        name: 'Verrazzano-Narrows Bridge',
        location: 'The Narrows, New York',
        lat: 40.6066,
        lng: -74.0447,
        country: 'US',
        region: 'New York',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 69.5 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8518750',
        curated: true
    },
    {
        id: 'george-washington',
        name: 'George Washington Bridge',
        location: 'Hudson River, New York/New Jersey',
        lat: 40.8517,
        lng: -73.9527,
        country: 'US',
        region: 'New York',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 64.6 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8518750',
        curated: true
    },
    {
        id: 'bayonne',
        name: 'Bayonne Bridge',
        location: 'Kill Van Kull, New York/New Jersey',
        lat: 40.6426,
        lng: -74.1415,
        country: 'US',
        region: 'New York',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 65.5 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8518750',
        curated: true
    },
    {
        id: 'throgs-neck',
        name: 'Throgs Neck Bridge',
        location: 'East River, New York',
        lat: 40.8053,
        lng: -73.7939,
        country: 'US',
        region: 'New York',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 43.0 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8518750',
        curated: true
    },
    {
        id: 'whitestone',
        name: 'Bronx-Whitestone Bridge',
        location: 'East River, New York',
        lat: 40.8001,
        lng: -73.8286,
        country: 'US',
        region: 'New York',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 39.6 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8518750',
        curated: true
    },
    {
        id: 'brooklyn',
        name: 'Brooklyn Bridge',
        location: 'East River, New York',
        lat: 40.7061,
        lng: -73.9969,
        country: 'US',
        region: 'New York',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 39.6 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8518750',
        curated: true
    },
    {
        id: 'manhattan',
        name: 'Manhattan Bridge',
        location: 'East River, New York',
        lat: 40.7074,
        lng: -73.9908,
        country: 'US',
        region: 'New York',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 41.1 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8518750',
        curated: true
    },
    {
        id: 'williamsburg',
        name: 'Williamsburg Bridge',
        location: 'East River, New York',
        lat: 40.7133,
        lng: -73.9724,
        country: 'US',
        region: 'New York',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 41.1 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8518750',
        curated: true
    },
    {
        id: 'hell-gate',
        name: 'Hell Gate Bridge',
        location: 'East River, New York',
        lat: 40.7794,
        lng: -73.9214,
        country: 'US',
        region: 'New York',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 42.7 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8518750',
        curated: true
    },

    {
        id: 'queensboro',
        name: 'Queensboro Bridge (59th St)',
        location: 'East River, New York',
        lat: 40.7570,
        lng: -73.9545,
        country: 'US',
        region: 'New York',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 39.9 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8518750',
        curated: true
    },

    // ==================== United States — New England ====================
    {
        id: 'cap-cod-canal-rr',
        name: 'Cape Cod Canal Railroad Bridge',
        location: 'Buzzards Bay, Massachusetts',
        lat: 41.7414,
        lng: -70.6170,
        country: 'US',
        region: 'New England',
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
        id: 'cape-cod-bourne',
        name: 'Bourne Bridge',
        location: 'Cape Cod Canal, Massachusetts',
        lat: 41.7441,
        lng: -70.5990,
        country: 'US',
        region: 'New England',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 41.1 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8447270',
        curated: true
    },
    {
        id: 'cape-cod-sagamore',
        name: 'Sagamore Bridge',
        location: 'Cape Cod Canal, Massachusetts',
        lat: 41.7700,
        lng: -70.5378,
        country: 'US',
        region: 'New England',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 41.1 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8447270',
        curated: true
    },
    {
        id: 'tobin-memorial',
        name: 'Tobin Memorial Bridge',
        location: 'Mystic River, Boston',
        lat: 42.3862,
        lng: -71.0457,
        country: 'US',
        region: 'New England',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 41.1 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8443970',
        curated: true
    },
    {
        id: 'newport-pell',
        name: 'Claiborne Pell Bridge',
        location: 'Narragansett Bay, Newport RI',
        lat: 41.5100,
        lng: -71.3419,
        country: 'US',
        region: 'New England',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 57.6 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8452660',
        curated: true
    },

    // ==================== United States — Chesapeake Bay ====================
    {
        id: 'chesapeake-bay',
        name: 'Chesapeake Bay Bridge',
        location: 'Annapolis, Maryland',
        lat: 38.9926,
        lng: -76.3827,
        country: 'US',
        region: 'Chesapeake Bay',
        spans: [
            { id: 'main', label: 'Main Channel', clearance: 56.4 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8575512',
        curated: true
    },
    {
        id: 'cbbt',
        name: 'Chesapeake Bay Bridge-Tunnel',
        location: 'Norfolk/Virginia Beach, Virginia',
        lat: 37.0312,
        lng: -76.0837,
        country: 'US',
        region: 'Chesapeake Bay',
        spans: [
            { id: 'north', label: 'North Channel Bridge', clearance: 22.9 },
            { id: 'fisherman', label: 'Fisherman Inlet Bridge', clearance: 12.2 }
        ],
        chartDatum: 0,
        defaultSpan: 'north',
        tideProvider: 'noaa',
        tideStationId: '8638863',
        curated: true
    },
    {
        id: 'francis-scott-key',
        name: 'Key Bridge (Rebuilt)',
        location: 'Baltimore Harbor, Maryland',
        lat: 39.2169,
        lng: -76.5278,
        country: 'US',
        region: 'Chesapeake Bay',
        spans: [
            { id: 'main', label: 'Main Channel', clearance: 56.4 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8574680',
        curated: true
    },

    // ==================== United States — Carolinas ICW ====================
    {
        id: 'wrightsville-fixed',
        name: 'Wrightsville Beach Bridge (US 74)',
        location: 'ICW, Wrightsville Beach NC',
        lat: 34.2069,
        lng: -77.8110,
        country: 'US',
        region: 'Carolinas',
        spans: [
            { id: 'main', label: 'Fixed Span', clearance: 19.8 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8658163',
        curated: true
    },
    {
        id: 'beaufort-drawbridge',
        name: 'Beaufort Drawbridge (US 70)',
        location: 'ICW, Beaufort NC',
        lat: 34.7190,
        lng: -76.6656,
        country: 'US',
        region: 'Carolinas',
        spans: [
            { id: 'closed', label: 'Closed', clearance: 4.0 },
            { id: 'open', label: 'Open', clearance: 19.5 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8656483',
        curated: true
    },
    {
        id: 'icw-little-river-swing',
        name: 'Little River Swing Bridge',
        location: 'ICW, Little River SC',
        lat: 33.8687,
        lng: -78.6148,
        country: 'US',
        region: 'Carolinas',
        spans: [
            { id: 'closed', label: 'Closed (Swing)', clearance: 2.1 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8660271',
        curated: true
    },
    {
        id: 'icw-barefoot-landing',
        name: 'Barefoot Landing Swing Bridge',
        location: 'ICW, North Myrtle Beach SC',
        lat: 33.8174,
        lng: -78.7282,
        country: 'US',
        region: 'Carolinas',
        spans: [
            { id: 'closed', label: 'Closed (Swing)', clearance: 9.4 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8660642',
        curated: true
    },
    {
        id: 'icw-socastee',
        name: 'Socastee Swing Bridge (SC 544)',
        location: 'ICW, Myrtle Beach SC',
        lat: 33.6636,
        lng: -79.0028,
        country: 'US',
        region: 'Carolinas',
        spans: [
            { id: 'closed', label: 'Closed (Swing)', clearance: 3.7 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8661070',
        curated: true
    },
    {
        id: 'isle-of-palms',
        name: 'Isle of Palms Connector',
        location: 'ICW, Mount Pleasant SC',
        lat: 32.7856,
        lng: -79.8283,
        country: 'US',
        region: 'Carolinas',
        spans: [
            { id: 'main', label: 'Fixed Span', clearance: 19.8 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8665530',
        curated: true
    },
    {
        id: 'ben-sawyer',
        name: 'Ben Sawyer Bridge',
        location: 'ICW, Sullivans Island SC',
        lat: 32.7647,
        lng: -79.8567,
        country: 'US',
        region: 'Carolinas',
        spans: [
            { id: 'closed', label: 'Closed (Swing)', clearance: 3.7 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8665530',
        curated: true
    },

    // ==================== United States — Georgia / North Florida ====================
    {
        id: 'talmadge',
        name: 'Talmadge Memorial Bridge',
        location: 'Savannah River, Georgia',
        lat: 32.0846,
        lng: -81.0935,
        country: 'US',
        region: 'Georgia',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 56.7 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8670870',
        curated: true
    },
    {
        id: 'dames-point',
        name: 'Dames Point Bridge',
        location: 'St. Johns River, Jacksonville FL',
        lat: 30.3857,
        lng: -81.5672,
        country: 'US',
        region: 'Florida — Northeast',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 53.3 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8720218',
        curated: true
    },

    // ==================== United States — Florida ICW ====================
    {
        id: 'icw-flagler-beach',
        name: 'Flagler Beach Bridge (SR 100)',
        location: 'ICW, Flagler Beach FL',
        lat: 29.4722,
        lng: -81.1268,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'main', label: 'Fixed Span', clearance: 19.8 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8720587',
        curated: true
    },
    {
        id: 'icw-granada',
        name: 'Granada Boulevard Bridge',
        location: 'ICW, Ormond Beach FL',
        lat: 29.2849,
        lng: -81.0570,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'main', label: 'Fixed Span', clearance: 19.8 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8721120',
        curated: true
    },
    {
        id: 'icw-seabreeze',
        name: 'Seabreeze Bridge',
        location: 'ICW, Daytona Beach FL',
        lat: 29.2321,
        lng: -81.0168,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'main', label: 'Fixed Span', clearance: 20.1 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8721120',
        curated: true
    },
    {
        id: 'icw-speedway',
        name: 'International Speedway Bridge',
        location: 'ICW, Daytona Beach FL',
        lat: 29.2264,
        lng: -81.0138,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'main', label: 'Fixed Span', clearance: 19.8 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8721120',
        curated: true
    },
    {
        id: 'st-augustine-bridge-of-lions',
        name: 'Bridge of Lions',
        location: 'ICW, St. Augustine FL',
        lat: 29.8930,
        lng: -81.3113,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 7.6 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8720587',
        curated: true
    },
    {
        id: 'icw-jupiter',
        name: 'Jupiter Federal Highway Bridge',
        location: 'ICW, Jupiter FL',
        lat: 26.9341,
        lng: -80.0746,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 7.9 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8722862',
        curated: true
    },
    {
        id: 'icw-pga',
        name: 'PGA Boulevard Bridge',
        location: 'ICW, North Palm Beach FL',
        lat: 26.8437,
        lng: -80.0545,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 7.6 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8722956',
        curated: true
    },
    {
        id: 'icw-royal-park',
        name: 'Royal Park Bridge',
        location: 'ICW, Palm Beach FL',
        lat: 26.7124,
        lng: -80.0412,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 7.6 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8722956',
        curated: true
    },
    {
        id: 'icw-southern-blvd',
        name: 'Southern Boulevard Bridge',
        location: 'ICW, West Palm Beach FL',
        lat: 26.6888,
        lng: -80.0402,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 14.3 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8722956',
        curated: true
    },
    {
        id: 'icw-atlantic-delray',
        name: 'Atlantic Avenue Bridge',
        location: 'ICW, Delray Beach FL',
        lat: 26.4601,
        lng: -80.0550,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 7.6 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8722956',
        curated: true
    },
    {
        id: 'icw-hillsboro',
        name: 'Hillsboro Boulevard Bridge',
        location: 'ICW, Deerfield Beach FL',
        lat: 26.3945,
        lng: -80.0762,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 12.2 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8722956',
        curated: true
    },
    {
        id: 'icw-atlantic-pompano',
        name: 'Atlantic Boulevard Bridge',
        location: 'ICW, Pompano Beach FL',
        lat: 26.2367,
        lng: -80.0926,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'main', label: 'Fixed Span', clearance: 15.2 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8722956',
        curated: true
    },
    {
        id: 'icw-commercial-blvd',
        name: 'Commercial Boulevard Bridge',
        location: 'ICW, Fort Lauderdale FL',
        lat: 26.1897,
        lng: -80.1008,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 4.9 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8722956',
        curated: true
    },
    {
        id: 'icw-oakland-park',
        name: 'Oakland Park Boulevard Bridge',
        location: 'ICW, Fort Lauderdale FL',
        lat: 26.1658,
        lng: -80.1074,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 7.6 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8722956',
        curated: true
    },
    {
        id: 'icw-sunrise',
        name: 'Sunrise Boulevard Bridge',
        location: 'ICW, Fort Lauderdale FL',
        lat: 26.1435,
        lng: -80.1118,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 7.3 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8722956',
        curated: true
    },
    {
        id: 'icw-las-olas',
        name: 'Las Olas Boulevard Bridge',
        location: 'ICW, Fort Lauderdale FL',
        lat: 26.1174,
        lng: -80.1167,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 7.6 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8722956',
        curated: true
    },
    {
        id: 'icw-se17th',
        name: 'SE 17th Street Bridge',
        location: 'ICW, Fort Lauderdale FL',
        lat: 26.1005,
        lng: -80.1184,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 16.8 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8722956',
        curated: true
    },
    {
        id: 'icw-hallandale',
        name: 'Hallandale Beach Boulevard Bridge',
        location: 'ICW, Hallandale FL',
        lat: 25.9806,
        lng: -80.1224,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 7.3 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8723080',
        curated: true
    },
    {
        id: 'icw-broad-causeway',
        name: 'Broad Causeway Bridge',
        location: 'ICW, Bay Harbor Islands FL',
        lat: 25.8879,
        lng: -80.1352,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'main', label: 'Fixed Span', clearance: 7.9 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8723080',
        curated: true
    },
    {
        id: 'intracoastal-fl',
        name: 'Julia Tuttle Causeway Bridge',
        location: 'ICW, Miami FL',
        lat: 25.8118,
        lng: -80.1685,
        country: 'US',
        region: 'Florida — ICW',
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
        id: 'icw-venetian',
        name: 'Venetian Causeway Bridge',
        location: 'ICW, Miami FL',
        lat: 25.7926,
        lng: -80.1570,
        country: 'US',
        region: 'Florida — ICW',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 3.7 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8723214',
        curated: true
    },

    // ==================== United States — Florida Gulf Coast ====================
    {
        id: 'skyway',
        name: 'Sunshine Skyway Bridge',
        location: 'Tampa Bay, Florida',
        lat: 27.6215,
        lng: -82.6553,
        country: 'US',
        region: 'Florida — Gulf Coast',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 53.3 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8726520',
        curated: true
    },
    {
        id: 'johns-pass',
        name: 'Johns Pass Bridge',
        location: 'Madeira Beach, Florida',
        lat: 27.7830,
        lng: -82.7798,
        country: 'US',
        region: 'Florida — Gulf Coast',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 7.6 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8726724',
        curated: true
    },
    {
        id: 'clearwater-memorial',
        name: 'Clearwater Memorial Causeway',
        location: 'Clearwater, Florida',
        lat: 27.9754,
        lng: -82.8240,
        country: 'US',
        region: 'Florida — Gulf Coast',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 7.3 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8726724',
        curated: true
    },
    {
        id: 'icw-key-largo',
        name: 'Jewish Creek Bridge (Card Sound)',
        location: 'ICW, Key Largo FL',
        lat: 25.2287,
        lng: -80.3722,
        country: 'US',
        region: 'Florida Keys',
        spans: [
            { id: 'main', label: 'Fixed Span', clearance: 19.5 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8723970',
        curated: true
    },
    {
        id: 'seven-mile',
        name: 'Seven Mile Bridge',
        location: 'Marathon, Florida Keys',
        lat: 24.7004,
        lng: -81.1258,
        country: 'US',
        region: 'Florida Keys',
        spans: [
            { id: 'main', label: 'Navigation Span', clearance: 19.8 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8724580',
        curated: true
    },

    // ==================== United States — Gulf Coast ====================
    {
        id: 'mobile-bay-causeway',
        name: 'I-10 Bayway (Mobile Bay)',
        location: 'Mobile Bay, Alabama',
        lat: 30.5002,
        lng: -87.9257,
        country: 'US',
        region: 'Gulf Coast',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 22.9 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8737048',
        curated: true
    },
    {
        id: 'biloxi-bay',
        name: 'Biloxi Bay Bridge (US 90)',
        location: 'Biloxi, Mississippi',
        lat: 30.3880,
        lng: -88.8549,
        country: 'US',
        region: 'Gulf Coast',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 26.2 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8743735',
        curated: true
    },
    {
        id: 'pontchartrain-causeway',
        name: 'Lake Pontchartrain Causeway',
        location: 'Lake Pontchartrain, Louisiana',
        lat: 30.2087,
        lng: -90.1156,
        country: 'US',
        region: 'Gulf Coast',
        spans: [
            { id: 'main', label: 'Fixed Span', clearance: 15.2 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8761927',
        curated: true
    },
    {
        id: 'galveston-causeway',
        name: 'Galveston Causeway',
        location: 'Galveston, Texas',
        lat: 29.3160,
        lng: -94.8598,
        country: 'US',
        region: 'Gulf Coast',
        spans: [
            { id: 'closed', label: 'Closed (Bascule)', clearance: 22.9 }
        ],
        chartDatum: 0,
        defaultSpan: 'closed',
        tideProvider: 'noaa',
        tideStationId: '8771450',
        curated: true
    },
    {
        id: 'texas-city-dike',
        name: 'Texas City Dike Bridge',
        location: 'Texas City, Texas',
        lat: 29.3894,
        lng: -94.8820,
        country: 'US',
        region: 'Gulf Coast',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 22.9 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8771450',
        curated: true
    },
    {
        id: 'queen-isabella',
        name: 'Queen Isabella Causeway',
        location: 'South Padre Island, Texas',
        lat: 26.0740,
        lng: -97.1707,
        country: 'US',
        region: 'Gulf Coast',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 22.2 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '8779770',
        curated: true
    },

    // ==================== United States — San Francisco Bay ====================
    {
        id: 'golden-gate',
        name: 'Golden Gate Bridge',
        location: 'San Francisco Bay, California',
        lat: 37.8199,
        lng: -122.4783,
        country: 'US',
        region: 'San Francisco Bay',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 67.1 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '9414290',
        curated: true
    },
    {
        id: 'bay-bridge',
        name: 'San Francisco–Oakland Bay Bridge',
        location: 'San Francisco Bay, California',
        lat: 37.7983,
        lng: -122.3778,
        country: 'US',
        region: 'San Francisco Bay',
        spans: [
            { id: 'west', label: 'West Span', clearance: 67.1 },
            { id: 'east', label: 'East Span', clearance: 57.9 }
        ],
        chartDatum: 0,
        defaultSpan: 'west',
        tideProvider: 'noaa',
        tideStationId: '9414290',
        curated: true
    },
    {
        id: 'richmond-san-rafael',
        name: 'Richmond–San Rafael Bridge',
        location: 'San Francisco Bay, California',
        lat: 37.9352,
        lng: -122.4248,
        country: 'US',
        region: 'San Francisco Bay',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 56.4 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '9414290',
        curated: true
    },
    {
        id: 'san-mateo-hayward',
        name: 'San Mateo–Hayward Bridge',
        location: 'San Francisco Bay, California',
        lat: 37.5848,
        lng: -122.2508,
        country: 'US',
        region: 'San Francisco Bay',
        spans: [
            { id: 'high', label: 'High-Level Span', clearance: 41.1 }
        ],
        chartDatum: 0,
        defaultSpan: 'high',
        tideProvider: 'noaa',
        tideStationId: '9414290',
        curated: true
    },
    {
        id: 'benicia-martinez',
        name: 'Benicia–Martinez Bridge',
        location: 'Carquinez Strait, California',
        lat: 38.0416,
        lng: -122.1263,
        country: 'US',
        region: 'San Francisco Bay',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 41.1 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '9415064',
        curated: true
    },

    // ==================== United States — Pacific Northwest ====================
    {
        id: 'tacoma-narrows',
        name: 'Tacoma Narrows Bridge',
        location: 'Puget Sound, Washington',
        lat: 47.2690,
        lng: -122.5517,
        country: 'US',
        region: 'Pacific Northwest',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 57.9 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '9446484',
        curated: true
    },
    {
        id: 'deception-pass',
        name: 'Deception Pass Bridge',
        location: 'Whidbey Island, Washington',
        lat: 48.4040,
        lng: -122.6435,
        country: 'US',
        region: 'Pacific Northwest',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 43.9 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '9448558',
        curated: true
    },
    {
        id: 'hood-canal',
        name: 'Hood Canal Bridge',
        location: 'Hood Canal, Washington',
        lat: 47.8566,
        lng: -122.6284,
        country: 'US',
        region: 'Pacific Northwest',
        spans: [
            { id: 'draw', label: 'Draw Span (Closed)', clearance: 15.2 },
            { id: 'open', label: 'Draw Span (Open)', clearance: 183.0 }
        ],
        chartDatum: 0,
        defaultSpan: 'draw',
        tideProvider: 'noaa',
        tideStationId: '9445133',
        curated: true
    },
    {
        id: 'astoria-megler',
        name: 'Astoria–Megler Bridge',
        location: 'Columbia River, Oregon/Washington',
        lat: 46.2268,
        lng: -123.8799,
        country: 'US',
        region: 'Pacific Northwest',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 57.0 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '9439040',
        curated: true
    },

    // ==================== United States — Great Lakes ====================
    {
        id: 'mackinac',
        name: 'Mackinac Bridge',
        location: 'Straits of Mackinac, Michigan',
        lat: 45.8174,
        lng: -84.7278,
        country: 'US',
        region: 'Great Lakes',
        spans: [
            { id: 'main', label: 'Main Span', clearance: 47.5 }
        ],
        chartDatum: 0,
        defaultSpan: 'main',
        tideProvider: 'noaa',
        tideStationId: '9075014',
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

    // Get unique regions in display order
    getRegions() {
        const seen = new Set();
        const regions = [];
        for (const b of this.bridges) {
            const region = b.region || 'Other';
            if (!seen.has(region)) {
                seen.add(region);
                regions.push(region);
            }
        }
        return regions;
    }

    // Get bridges grouped by region
    getGrouped() {
        const groups = {};
        for (const b of this.bridges) {
            const region = b.region || 'Other';
            if (!groups[region]) groups[region] = [];
            groups[region].push(b);
        }
        return groups;
    }

    // Get bridges grouped by country, sorted by proximity to user location
    getGroupedByCountry(userLat, userLng) {
        const COUNTRY_NAMES = {
            'NZ': 'New Zealand',
            'US': 'United States',
            'AU': 'Australia',
            'UK': 'United Kingdom',
        };

        const groups = {};
        for (const b of this.bridges) {
            const code = b.country || 'Other';
            const label = COUNTRY_NAMES[code] || code;
            if (!groups[label]) groups[label] = { bridges: [], code };
            groups[label].bridges.push(b);
        }

        // Sort bridges within each country: by region, then alphabetically by name
        for (const label of Object.keys(groups)) {
            groups[label].bridges.sort((a, b) => {
                const regionCmp = (a.region || '').localeCompare(b.region || '');
                if (regionCmp !== 0) return regionCmp;
                return a.name.localeCompare(b.name);
            });
        }

        // Sort country groups by distance to user (nearest first)
        let sortedEntries = Object.entries(groups);
        if (userLat != null && userLng != null && typeof haversineDistance === 'function') {
            // Compute average lat/lng per country group as centroid
            const centroids = {};
            for (const [label, group] of sortedEntries) {
                const bridges = group.bridges;
                const avgLat = bridges.reduce((s, b) => s + b.lat, 0) / bridges.length;
                const avgLng = bridges.reduce((s, b) => s + b.lng, 0) / bridges.length;
                centroids[label] = { lat: avgLat, lng: avgLng };
            }
            sortedEntries.sort((a, b) => {
                const distA = haversineDistance(userLat, userLng, centroids[a[0]].lat, centroids[a[0]].lng);
                const distB = haversineDistance(userLat, userLng, centroids[b[0]].lat, centroids[b[0]].lng);
                return distA - distB;
            });
        }

        // Return as ordered array of { label, bridges }
        return sortedEntries.map(([label, group]) => ({ label, bridges: group.bridges }));
    }

    search(query) {
        const q = query.toLowerCase();
        return this.bridges.filter(b =>
            b.name.toLowerCase().includes(q) ||
            b.location.toLowerCase().includes(q) ||
            (b.country && b.country.toLowerCase().includes(q)) ||
            (b.region && b.region.toLowerCase().includes(q))
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
