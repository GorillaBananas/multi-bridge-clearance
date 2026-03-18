// Interactive Map Component using Leaflet
// Handles bridge display, selection, and new bridge placement

class BridgeMap {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.onBridgeSelect = options.onBridgeSelect || (() => {});
        this.onLocationSelect = options.onLocationSelect || (() => {});
        this.markers = [];
        this.addMode = false;
        this.tempMarker = null;

        // Default center: world view
        this.map = L.map(containerId, {
            zoomControl: false
        }).setView([20, 0], 2);

        // Add zoom control to bottom right
        L.control.zoom({ position: 'bottomright' }).addTo(this.map);

        // Ocean-themed dark tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.map);

        // Custom bridge icon
        this.bridgeIcon = L.divIcon({
            className: 'bridge-marker',
            html: '<div class="bridge-pin">🌉</div>',
            iconSize: [36, 36],
            iconAnchor: [18, 36],
            popupAnchor: [0, -36]
        });

        this.selectedBridgeIcon = L.divIcon({
            className: 'bridge-marker selected',
            html: '<div class="bridge-pin selected">🌉</div>',
            iconSize: [44, 44],
            iconAnchor: [22, 44],
            popupAnchor: [0, -44]
        });

        this.tempIcon = L.divIcon({
            className: 'bridge-marker temp',
            html: '<div class="bridge-pin temp">📍</div>',
            iconSize: [36, 36],
            iconAnchor: [18, 36],
            popupAnchor: [0, -36]
        });

        // Click handler for adding new bridges
        this.map.on('click', (e) => {
            if (this.addMode) {
                this._placeTemporaryMarker(e.latlng);
            }
        });
    }

    // Display all bridges from the database
    showBridges(bridges, selectedId = null) {
        // Clear existing markers
        this.markers.forEach(m => this.map.removeLayer(m));
        this.markers = [];

        bridges.forEach(bridge => {
            const isSelected = bridge.id === selectedId;
            const icon = isSelected ? this.selectedBridgeIcon : this.bridgeIcon;

            const marker = L.marker([bridge.lat, bridge.lng], { icon })
                .addTo(this.map);

            const maxClearance = Math.max(...bridge.spans.map(s => s.clearance));
            const popupContent = `
                <div class="map-popup">
                    <strong>${bridge.name}</strong><br>
                    <span class="popup-location">${bridge.location}</span><br>
                    <span class="popup-clearance">Max clearance: ${maxClearance.toFixed(1)}m</span>
                    ${!bridge.curated ? '<br><span class="popup-custom">Custom bridge</span>' : ''}
                    <br><button class="popup-btn" onclick="window._selectBridgeFromMap('${bridge.id}')">Select</button>
                </div>
            `;

            marker.bindPopup(popupContent);
            marker.on('click', () => {
                this.onBridgeSelect(bridge.id);
            });

            marker.bridgeId = bridge.id;
            this.markers.push(marker);
        });
    }

    // Center map on a specific bridge
    focusBridge(bridge) {
        this.map.setView([bridge.lat, bridge.lng], 14, { animate: true });
        this.highlightBridge(bridge.id);
    }

    // Highlight a selected bridge
    highlightBridge(bridgeId) {
        this.markers.forEach(m => {
            if (m.bridgeId === bridgeId) {
                m.setIcon(this.selectedBridgeIcon);
            } else {
                m.setIcon(this.bridgeIcon);
            }
        });
    }

    // Enable "add bridge" mode
    enableAddMode() {
        this.addMode = true;
        this.map.getContainer().style.cursor = 'crosshair';
    }

    disableAddMode() {
        this.addMode = false;
        this.map.getContainer().style.cursor = '';
        if (this.tempMarker) {
            this.map.removeLayer(this.tempMarker);
            this.tempMarker = null;
        }
    }

    _placeTemporaryMarker(latlng) {
        if (this.tempMarker) {
            this.map.removeLayer(this.tempMarker);
        }

        this.tempMarker = L.marker(latlng, { icon: this.tempIcon })
            .addTo(this.map)
            .bindPopup('New bridge location<br>Fill in the details below')
            .openPopup();

        this.onLocationSelect(latlng.lat, latlng.lng);
    }

    // Fit map to show all bridges
    fitAllBridges() {
        if (this.markers.length > 0) {
            const group = L.featureGroup(this.markers);
            this.map.fitBounds(group.getBounds().pad(0.1));
        }
    }

    // Try to center on user's location
    locateUser() {
        this.map.locate({ setView: true, maxZoom: 10 });
    }

    invalidateSize() {
        this.map.invalidateSize();
    }
}
