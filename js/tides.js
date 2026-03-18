// Tide Data Providers - Global tide data from multiple government APIs
// Supports: NOAA (US), LINZ (New Zealand), and extensible for more

const TideProviders = {
    // ==================== NOAA (United States) ====================
    noaa: {
        name: 'NOAA CO-OPS',
        region: 'United States',
        datumInfo: 'MLLW (Mean Lower Low Water)',

        // Find nearest NOAA tide station to given coordinates
        async findStation(lat, lng) {
            const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions&units=metric`;
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch NOAA stations');
                const data = await response.json();

                let nearest = null;
                let minDist = Infinity;

                for (const station of data.stations) {
                    const dist = haversineDistance(lat, lng, station.lat, station.lng);
                    if (dist < minDist) {
                        minDist = dist;
                        nearest = station;
                    }
                }

                if (nearest) {
                    return {
                        id: nearest.id,
                        name: nearest.name,
                        lat: nearest.lat,
                        lng: nearest.lng,
                        distance: minDist,
                        provider: 'noaa'
                    };
                }
                return null;
            } catch (error) {
                console.error('NOAA station lookup failed:', error);
                return null;
            }
        },

        // Get high/low tide predictions for a date
        async getTidePredictions(stationId, dateStr) {
            const date = new Date(dateStr + 'T00:00:00');
            const prevDate = new Date(date);
            prevDate.setDate(prevDate.getDate() - 1);
            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);

            const fmt = d => d.toISOString().slice(0, 10).replace(/-/g, '');

            // Fetch 3 days to get adjacent points for interpolation
            const url = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter` +
                `?begin_date=${fmt(prevDate)}&end_date=${fmt(nextDate)}` +
                `&station=${stationId}&product=predictions&datum=MLLW` +
                `&units=metric&time_zone=gmt&format=json&interval=hilo`;

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`NOAA API error: ${response.status}`);
                const data = await response.json();

                if (!data.predictions || data.predictions.length === 0) {
                    throw new Error('No predictions available for this station/date');
                }

                const allPoints = data.predictions.map(p => ({
                    time: new Date(p.t + 'Z'), // NOAA times are in GMT
                    height: parseFloat(p.v),
                    type: p.type === 'H' ? 'high' : 'low'
                }));

                // Split into target day and adjacent points
                const targetDay = dateStr;
                const todayPoints = allPoints.filter(p => p.time.toISOString().slice(0, 10) === targetDay);
                const prevDayPoints = allPoints.filter(p => p.time.toISOString().slice(0, 10) === prevDate.toISOString().slice(0, 10));
                const nextDayPoints = allPoints.filter(p => p.time.toISOString().slice(0, 10) === nextDate.toISOString().slice(0, 10));

                return {
                    points: todayPoints,
                    prevDayLastPoint: prevDayPoints.length > 0 ? prevDayPoints[prevDayPoints.length - 1] : null,
                    nextDayFirstPoint: nextDayPoints.length > 0 ? nextDayPoints[0] : null,
                    source: 'NOAA CO-OPS',
                    sourceUrl: 'https://tidesandcurrents.noaa.gov/',
                    stationId: stationId,
                    datum: 'MLLW'
                };
            } catch (error) {
                console.error('NOAA tide data fetch failed:', error);
                throw error;
            }
        }
    },

    // ==================== LINZ (New Zealand) ====================
    linz: {
        name: 'LINZ',
        region: 'New Zealand',
        datumInfo: 'Chart Datum (LAT)',

        // LINZ stations - major NZ ports
        stations: [
            { id: 'Auckland', name: 'Auckland', lat: -36.8485, lng: 174.7633 },
            { id: 'Wellington', name: 'Wellington', lat: -41.2866, lng: 174.7756 },
            { id: 'Lyttelton', name: 'Lyttelton', lat: -43.6080, lng: 172.7194 },
            { id: 'Dunedin', name: 'Dunedin', lat: -45.8788, lng: 170.5028 },
            { id: 'Nelson', name: 'Nelson', lat: -41.2710, lng: 173.2840 },
            { id: 'Napier', name: 'Napier', lat: -39.4928, lng: 176.9120 },
            { id: 'Tauranga', name: 'Tauranga', lat: -37.6878, lng: 176.1651 },
            { id: 'Timaru', name: 'Timaru', lat: -44.3904, lng: 171.2373 },
            { id: 'Westport', name: 'Westport', lat: -41.7560, lng: 171.6006 },
            { id: 'Bluff', name: 'Bluff', lat: -46.6000, lng: 168.3333 },
            { id: 'Marsden Point', name: 'Marsden Point', lat: -35.8370, lng: 174.4910 },
            { id: 'Gisborne', name: 'Gisborne', lat: -38.6623, lng: 178.0176 },
            { id: 'New Plymouth', name: 'New Plymouth', lat: -39.0556, lng: 174.0752 },
            { id: 'Picton', name: 'Picton', lat: -41.2900, lng: 174.0010 }
        ],

        async findStation(lat, lng) {
            let nearest = null;
            let minDist = Infinity;

            for (const station of this.stations) {
                const dist = haversineDistance(lat, lng, station.lat, station.lng);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = station;
                }
            }

            if (nearest) {
                return {
                    id: nearest.id,
                    name: nearest.name,
                    lat: nearest.lat,
                    lng: nearest.lng,
                    distance: minDist,
                    provider: 'linz'
                };
            }
            return null;
        },

        async getTidePredictions(stationId, dateStr) {
            const selectedDate = new Date(dateStr + 'T00:00:00');
            const year = selectedDate.getFullYear();

            if (year < 2024 || year > 2028) {
                throw new Error('LINZ tide data only available for 2024-2028');
            }

            const csvUrl = `https://static.charts.linz.govt.nz/tide-tables/maj-ports/csv/${encodeURIComponent(stationId)}%20${year}.csv`;
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(csvUrl)}`;

            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error('Failed to fetch LINZ tide data');

            const csvText = await response.text();
            const allPoints = this._parseLinzCsv(csvText, selectedDate);

            if (allPoints.today.length === 0) {
                throw new Error('No tide data found for selected date');
            }

            return {
                points: allPoints.today,
                prevDayLastPoint: allPoints.prevDayLastPoint,
                nextDayFirstPoint: allPoints.nextDayFirstPoint,
                source: 'LINZ Tide Predictions',
                sourceUrl: 'https://www.linz.govt.nz/sea/tides/tide-predictions',
                stationId: stationId,
                datum: 'Chart Datum (LAT)'
            };
        },

        _getNZTimezoneOffset(date) {
            const year = date.getFullYear();
            const month = date.getMonth();

            const septStart = new Date(year, 8, 30);
            while (septStart.getDay() !== 0) septStart.setDate(septStart.getDate() - 1);

            const aprilEnd = new Date(year, 3, 7);
            while (aprilEnd.getDay() !== 0) aprilEnd.setDate(aprilEnd.getDate() - 1);

            const inDST = (month >= 9) || (month <= 2) ||
                (month === 8 && date >= septStart) ||
                (month === 3 && date < aprilEnd);

            return inDST ? '+13:00' : '+12:00';
        },

        _parseDayFromCsv(csvText, targetDate) {
            const lines = csvText.trim().split('\n');
            const data = [];
            const targetDay = targetDate.getDate();
            const targetMonth = targetDate.getMonth() + 1;
            const targetYear = targetDate.getFullYear();

            for (let i = 2; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;

                const parts = line.split(',');
                if (parts.length < 6) continue;

                const day = parseInt(parts[0]);
                const month = parseInt(parts[2]);
                const year = parseInt(parts[3]);

                if (day !== targetDay || month !== targetMonth || year !== targetYear) continue;

                const lineDate = new Date(year, month - 1, day);
                const tzOffset = this._getNZTimezoneOffset(lineDate);

                for (let j = 0; j < 4; j++) {
                    const timeIdx = 4 + j * 2;
                    const heightIdx = 5 + j * 2;

                    if (timeIdx >= parts.length || heightIdx >= parts.length) break;

                    const timeStr = parts[timeIdx].trim();
                    const heightStr = parts[heightIdx].trim();

                    if (!timeStr || !heightStr) continue;

                    const [hours, minutes] = timeStr.split(':').map(Number);
                    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00${tzOffset}`;
                    const tideTime = new Date(dateStr);
                    const height = parseFloat(heightStr);

                    data.push({ time: tideTime, height: height });
                }
            }
            return data;
        },

        _parseLinzCsv(csvText, targetDate) {
            const today = this._parseDayFromCsv(csvText, targetDate);

            const prevDate = new Date(targetDate);
            prevDate.setDate(prevDate.getDate() - 1);
            const prevDay = this._parseDayFromCsv(csvText, prevDate);

            const nextDate = new Date(targetDate);
            nextDate.setDate(nextDate.getDate() + 1);
            const nextDay = this._parseDayFromCsv(csvText, nextDate);

            return {
                today: today,
                prevDayLastPoint: prevDay.length > 0 ? prevDay[prevDay.length - 1] : null,
                nextDayFirstPoint: nextDay.length > 0 ? nextDay[0] : null
            };
        }
    }
};

// ==================== Tide Calculation Engine ====================

function interpolateTideHeight(tidePoints, targetTime, prevDayLastPoint, nextDayFirstPoint) {
    if (tidePoints.length === 0) return null;

    // Check for exact match (within 1 minute)
    for (const point of tidePoints) {
        if (Math.abs(targetTime - point.time) < 60000) {
            return {
                time: targetTime,
                height: point.height,
                interpolated: false,
                exactMatch: true
            };
        }
    }

    let before = null, after = null;

    // Find bracketing points
    for (let i = 0; i < tidePoints.length - 1; i++) {
        if (tidePoints[i].time <= targetTime && tidePoints[i + 1].time >= targetTime) {
            before = tidePoints[i];
            after = tidePoints[i + 1];
            break;
        }
    }

    // Handle boundary cases
    if (!before || !after) {
        const lastPoint = tidePoints[tidePoints.length - 1];
        const firstPoint = tidePoints[0];

        if (targetTime > lastPoint.time) {
            if (nextDayFirstPoint) {
                before = lastPoint;
                after = nextDayFirstPoint;
            } else {
                return { time: targetTime, height: null, error: 'Next day tide data unavailable' };
            }
        } else if (targetTime < firstPoint.time) {
            if (prevDayLastPoint) {
                before = prevDayLastPoint;
                after = firstPoint;
            } else {
                return { time: targetTime, height: null, error: 'Previous day tide data unavailable' };
            }
        } else {
            const nearest = tidePoints.reduce((prev, curr) =>
                Math.abs(curr.time - targetTime) < Math.abs(prev.time - targetTime) ? curr : prev
            );
            return { time: targetTime, height: nearest.height, interpolated: false };
        }
    }

    // Rule of Twelfths interpolation
    const isHighToLow = before.height > after.height;
    const tideRange = Math.abs(after.height - before.height);
    const totalDuration = (after.time - before.time) / (1000 * 60 * 60);
    const hoursElapsed = (targetTime - before.time) / (1000 * 60 * 60);

    // Scale to 6-hour reference period for Rule of Twelfths
    const scaledHours = (hoursElapsed / totalDuration) * 6;

    let fractionOfRange;
    if (scaledHours <= 1) {
        fractionOfRange = (1 / 12) * scaledHours;
    } else if (scaledHours <= 2) {
        fractionOfRange = (1 / 12) + (2 / 12) * (scaledHours - 1);
    } else if (scaledHours <= 3) {
        fractionOfRange = (3 / 12) + (3 / 12) * (scaledHours - 2);
    } else if (scaledHours <= 4) {
        fractionOfRange = (6 / 12) + (3 / 12) * (scaledHours - 3);
    } else if (scaledHours <= 5) {
        fractionOfRange = (9 / 12) + (2 / 12) * (scaledHours - 4);
    } else {
        fractionOfRange = (11 / 12) + (1 / 12) * (scaledHours - 5);
    }

    let interpolatedHeight;
    if (isHighToLow) {
        interpolatedHeight = before.height - (tideRange * fractionOfRange);
    } else {
        interpolatedHeight = before.height + (tideRange * fractionOfRange);
    }

    return {
        time: targetTime,
        height: interpolatedHeight,
        interpolated: true,
        beforeTime: before.time,
        afterTime: after.time,
        beforeHeight: before.height,
        afterHeight: after.height,
        method: 'Rule of Twelfths'
    };
}

// Determine which tide provider to use based on coordinates
function getTideProvider(lat, lng) {
    // New Zealand: roughly -34 to -47 lat, 166 to 179 lng
    if (lat >= -48 && lat <= -33 && lng >= 165 && lng <= 180) {
        return TideProviders.linz;
    }
    // Default to NOAA for now (covers US coasts well, returns errors for others)
    return TideProviders.noaa;
}

// Find the best tide station for given coordinates
async function findNearestTideStation(lat, lng) {
    const provider = getTideProvider(lat, lng);
    const station = await provider.findStation(lat, lng);

    if (station) {
        station.providerName = provider.name;
        station.region = provider.region;
    }

    return station;
}

// Haversine distance in km
function haversineDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
