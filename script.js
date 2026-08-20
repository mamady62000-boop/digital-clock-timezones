// Horloge Numérique avec Support des Fuseaux Horaires
class WorldClock {
    constructor() {
        this.clocks = [];
        this.is24HourFormat = false;
        this.storageKey = 'worldClocks';
        this.colorIndex = 0;
        
        this.timezones = [
            { name: 'New York', offset: 'America/New_York' },
            { name: 'Londres', offset: 'Europe/London' },
            { name: 'Paris', offset: 'Europe/Paris' },
            { name: 'Tokyo', offset: 'Asia/Tokyo' },
            { name: 'Sydney', offset: 'Australia/Sydney' },
            { name: 'Dubai', offset: 'Asia/Dubai' },
            { name: 'Hong Kong', offset: 'Asia/Hong_Kong' },
            { name: 'Singapour', offset: 'Asia/Singapore' },
            { name: 'Mumbai', offset: 'Asia/Kolkata' },
            { name: 'Bangkok', offset: 'Asia/Bangkok' },
            { name: 'Shanghai', offset: 'Asia/Shanghai' },
            { name: 'Moscou', offset: 'Europe/Moscow' },
            { name: 'Istanbul', offset: 'Europe/Istanbul' },
            { name: 'Le Caire', offset: 'Africa/Cairo' },
            { name: 'Johannesburg', offset: 'Africa/Johannesburg' },
            { name: 'Los Angeles', offset: 'America/Los_Angeles' },
            { name: 'Chicago', offset: 'America/Chicago' },
            { name: 'Denver', offset: 'America/Denver' },
            { name: 'São Paulo', offset: 'America/Sao_Paulo' },
            { name: 'Mexico City', offset: 'America/Mexico_City' },
            { name: 'Toronto', offset: 'America/Toronto' },
            { name: 'Vancouver', offset: 'America/Vancouver' },
            { name: 'Reykjavik', offset: 'Atlantic/Reykjavik' },
            { name: 'Honolulu', offset: 'Pacific/Honolulu' },
            { name: 'Auckland', offset: 'Pacific/Auckland' }
        ];
        
        this.elements = {
            timezoneSelect: document.getElementById('timezoneSelect'),
            addBtn: document.getElementById('addBtn'),
            format12Btn: document.getElementById('format12Btn'),
            format24Btn: document.getElementById('format24Btn'),
            clearAllBtn: document.getElementById('clearAllBtn'),
            clocksGrid: document.getElementById('clocksGrid'),
            emptyState: document.getElementById('emptyState')
        };
        
        this.init();
    }

    init() {
        this.populateTimezoneSelect();
        this.loadFromStorage();
        this.attachEventListeners();
        this.updateAllClocks();
        setInterval(() => this.updateAllClocks(), 1000);
    }

    populateTimezoneSelect() {
        this.timezones.forEach(tz => {
            const option = document.createElement('option');
            option.value = tz.offset;
            option.textContent = `${tz.name} (${tz.offset})`;
            this.elements.timezoneSelect.appendChild(option);
        });
    }

    attachEventListeners() {
        this.elements.addBtn.addEventListener('click', () => this.addClock());
        this.elements.timezoneSelect.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addClock();
        });
        this.elements.format12Btn.addEventListener('click', () => this.setFormat(false));
        this.elements.format24Btn.addEventListener('click', () => this.setFormat(true));
        this.elements.clearAllBtn.addEventListener('click', () => this.clearAll());
    }

    addClock() {
        const selectedOffset = this.elements.timezoneSelect.value;
        
        if (selectedOffset === '') {
            alert('Veuillez sélectionner un fuseau horaire');
            return;
        }

        // Vérifier si le fuseau horaire est déjà ajouté
        if (this.clocks.some(clock => clock.offset === selectedOffset)) {
            alert('Ce fuseau horaire est déjà ajouté!');
            return;
        }

        const timezone = this.timezones.find(tz => tz.offset === selectedOffset);
        
        const newClock = {
            id: Date.now(),
            name: timezone.name,
            offset: timezone.offset,
            colorClass: `card-${(this.colorIndex % 6) + 1}`
        };

        this.colorIndex++;
        this.clocks.push(newClock);
        this.saveToStorage();
        this.render();
        this.elements.timezoneSelect.value = '';
    }

    removeClock(id) {
        this.clocks = this.clocks.filter(clock => clock.id !== id);
        this.saveToStorage();
        this.render();
    }

    setFormat(is24Hour) {
        this.is24HourFormat = is24Hour;
        this.elements.format12Btn.classList.toggle('active', !is24Hour);
        this.elements.format24Btn.classList.toggle('active', is24Hour);
        this.updateAllClocks();
    }

    clearAll() {
        if (this.clocks.length === 0) {
            alert('Aucune horloge à réinitialiser!');
            return;
        }

        if (confirm('Êtes-vous sûr de vouloir supprimer toutes les horloges?')) {
            this.clocks = [];
            this.colorIndex = 0;
            this.saveToStorage();
            this.render();
        }
    }

    updateAllClocks() {
        this.clocks.forEach(clock => {
            const clockElement = document.getElementById(`clock-${clock.id}`);
            if (clockElement) {
                const time = this.getTimeForTimezone(clock.offset);
                const timeString = this.formatTime(time);
                const dateString = this.formatDate(time);
                const dayString = this.getDayName(time);
                
                clockElement.querySelector('.digital-time').textContent = timeString;
                clockElement.querySelector('.date-display').textContent = dateString;
                clockElement.querySelector('.day-display').textContent = dayString;
            }
        });
    }

    getTimeForTimezone(timezone) {
        try {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('fr-FR', {
                timeZone: timezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            
            const parts = formatter.formatToParts(now);
            const result = {};
            parts.forEach(part => {
                result[part.type] = part.value;
            });
            
            return {
                hour: parseInt(result.hour),
                minute: parseInt(result.minute),
                second: parseInt(result.second),
                day: parseInt(result.day),
                month: result.month,
                year: result.year,
                weekday: this.getWeekday(now, timezone)
            };
        } catch (e) {
            console.error(`Erreur avec le fuseau horaire ${timezone}:`, e);
            return null;
        }
    }

    getWeekday(date, timezone) {
        const formatter = new Intl.DateTimeFormat('fr-FR', {
            timeZone: timezone,
            weekday: 'long'
        });
        return formatter.format(date);
    }

    formatTime(time) {
        if (!time) return '--:--:--';
        
        let hour = time.hour;
        let ampm = '';
        
        if (!this.is24HourFormat) {
            ampm = hour >= 12 ? ' PM' : ' AM';
            hour = hour % 12 || 12;
        }
        
        const pad = (num) => String(num).padStart(2, '0');
        return `${pad(hour)}:${pad(time.minute)}:${pad(time.second)}${ampm}`;
    }

    formatDate(time) {
        if (!time) return '--/--/----';
        return `${time.day}/${time.month}/${time.year}`;
    }

    getDayName(time) {
        if (!time) return 'Jour inconnu';
        return `${time.weekday.charAt(0).toUpperCase()}${time.weekday.slice(1)}`;
    }

    render() {
        this.elements.clocksGrid.innerHTML = '';
        
        if (this.clocks.length === 0) {
            this.elements.emptyState.classList.add('show');
            this.elements.clearAllBtn.disabled = true;
            return;
        }
        
        this.elements.emptyState.classList.remove('show');
        this.elements.clearAllBtn.disabled = false;
        
        this.clocks.forEach((clock, index) => {
            const time = this.getTimeForTimezone(clock.offset);
            const timeString = this.formatTime(time);
            const dateString = this.formatDate(time);
            const dayString = this.getDayName(time);
            
            const clockCard = document.createElement('div');
            clockCard.id = `clock-${clock.id}`;
            clockCard.className = `clock-card ${clock.colorClass}`;
            
            clockCard.innerHTML = `
                <div class="clock-header">
                    <div>
                        <div class="timezone-name">${clock.name}</div>
                        <div class="timezone-offset">${clock.offset}</div>
                    </div>
                    <button class="remove-btn" data-id="${clock.id}">×</button>
                </div>
                <div class="digital-time">${timeString}</div>
                <div class="time-info">
                    <div class="date-display">${dateString}</div>
                    <div class="day-display">${dayString}</div>
                </div>
            `;
            
            clockCard.querySelector('.remove-btn').addEventListener('click', () => {
                this.removeClock(clock.id);
            });
            
            this.elements.clocksGrid.appendChild(clockCard);
        });
    }

    saveToStorage() {
        const data = {
            clocks: this.clocks,
            is24HourFormat: this.is24HourFormat,
            colorIndex: this.colorIndex
        };
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    loadFromStorage() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.clocks = data.clocks || [];
                this.is24HourFormat = data.is24HourFormat || false;
                this.colorIndex = data.colorIndex || 0;
                this.setFormat(this.is24HourFormat);
            } catch (e) {
                console.error('Erreur lors du chargement des données:', e);
            }
        }
    }
}

// Initialiser l'application au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    new WorldClock();
});