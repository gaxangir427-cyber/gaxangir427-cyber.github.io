/**
 * ============================================================================
 * ELGOOG OS - Central Settings Manager (v10.0 ULTRA PRO)
 * Standalone System Configuration Engine for Wi-Fi, Wallpapers, Audio & Power
 * ============================================================================
 */

const ElgSettings = {
    wifi: {
        connected: true,
        currentSSID: "Elgoog_Quantum_5G",
        networks: [
            { ssid: "Elgoog_Quantum_5G", security: "WPA3", pass: "elgoog2026", signal: "100%" },
            { ssid: "Home_WiFi_Router", security: "WPA2", pass: "12345678", signal: "85%" },
            { ssid: "Zhiguli_Guest_Net", security: "WPA2", pass: "vaz2106", signal: "60%" }
        ]
    },
    wallpaper: {
        current: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=80",
        presets: [
            { name: "🚗 ВАЗ-2106 (Классика)", url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=80" },
            { name: "🌲 Альпийский Лес", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80" },
            { name: "🏔️ Горные Вершины", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80" },
            { name: "🌊 Океанский Закат", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80" }
        ]
    },
    gameMode: {
        enabled: true,
        robloxOptimized: true,
        targetFPS: 240
    },
    audio: {
        volume: 80,
        muted: false
    },
    power: {
        profile: "EXTREME", // SAVER, BALANCED, EXTREME
        sleepTimeoutMinutes: 15
    }
};

// Функция отрисовки панели настроек
function renderFullSettingsPanel() {
    return `
        <div style="display:flex; height:100%; gap:15px;">
            <!-- Левое меню категорий -->
            <div style="width:180px; border-right:1px solid rgba(255,255,255,0.1); padding-right:10px; display:flex; flex-direction:column; gap:6px;">
                <button class="set-nav-btn" onclick="showSettingsTab('wifi')">📶 Wi-Fi Сеть</button>
                <button class="set-nav-btn" onclick="showSettingsTab('wallpaper')">🎨 Персонализация</button>
                <button class="set-nav-btn" onclick="showSettingsTab('gamemode')">🎮 Игровой режим</button>
                <button class="set-nav-btn" onclick="showSettingsTab('audio')">🔊 Звук</button>
                <button class="set-nav-btn" onclick="showSettingsTab('power')">🔋 Энергопитание</button>
            </div>

            <!-- Правая контентная область -->
            <div id="settings-tab-content" style="flex:1; overflow-y:auto; padding-right:5px;">
                ${getWiFiTabHtml()}
            </div>
        </div>

        <style>
            .set-nav-btn {
                background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1);
                padding: 10px; border-radius: 8px; text-align: left; cursor: pointer; transition: 0.2s; font-size: 13px;
            }
            .set-nav-btn:hover { background: rgba(0,255,102,0.15); border-color: #00ff66; color: #00ff66; }
        </style>
    `;
}

// Переключение вкладок
function showSettingsTab(tabName) {
    const container = document.getElementById('settings-tab-content');
    if (!container) return;

    if (tabName === 'wifi') container.innerHTML = getWiFiTabHtml();
    else if (tabName === 'wallpaper') container.innerHTML = getWallpaperTabHtml();
    else if (tabName === 'gamemode') container.innerHTML = getGameModeTabHtml();
    else if (tabName === 'audio') container.innerHTML = getAudioTabHtml();
    else if (tabName === 'power') container.innerHTML = getPowerTabHtml();
}

// --- 1. WI-FI ВКЛАДКА ---
function getWiFiTabHtml() {
    let netsHtml = ElgSettings.wifi.networks.map(n => `
        <div style="background:rgba(255,255,255,0.03); border:1px solid #333; padding:10px; border-radius:8px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
            <div>
                <strong>${n.ssid}</strong>
                <div style="font-size:11px; color:#aaa;">Защита: ${n.security} &bull; Сигнал: ${n.signal}</div>
            </div>
            <button onclick="connectWiFi('${n.ssid}', '${n.pass}')" style="background:#00ff66; color:#000; border:none; padding:6px 12px; border-radius:6px; font-weight:bold; cursor:pointer;">Подключиться</button>
        </div>
    `).join('');

    return `
        <h3>📶 Беспроводная сеть Wi-Fi</h3>
        <p style="font-size:12px; color:#aaa; margin-bottom:15px;">Текущий статус: <span style="color:#00ff66; font-weight:bold;">${ElgSettings.wifi.connected ? 'Подключено (' + ElgSettings.wifi.currentSSID + ')' : 'Отключено'}</span></p>
        
        <div style="margin-bottom: 15px;">
            <button onclick="addCustomNetwork()" style="background:rgba(0,255,102,0.2); border:1px solid #00ff66; color:#00ff66; padding:8px 14px; border-radius:6px; cursor:pointer; font-weight:bold;">➕ Подключить свою реальную сеть</button>
        </div>

        <div id="wifi-status-box"></div>
        ${netsHtml}
    `;
}

function addCustomNetwork() {
    let ssid = prompt("Введите точное имя вашей Wi-Fi сети (SSID):");
    if (!ssid) return;
    let pass = prompt(`Введите пароль для сети "${ssid}":`);
    if (!pass) return;

    ElgSettings.wifi.networks.unshift({
        ssid: ssid,
        security: "WPA2/WPA3 Personal",
        pass: pass,
        signal: "99%"
    });

    ElgSettings.wifi.connected = true;
    ElgSettings.wifi.currentSSID = ssid;

    alert(`✅ Сеть "${ssid}" успешно добавлена и подключена к Elgoog OS!`);
    showSettingsTab('wifi');
}

function connectWiFi(ssid, correctPass) {
    let enteredPass = prompt(`Введите пароль для сети "${ssid}":`);
    if (enteredPass === null) return;

    if (enteredPass === correctPass) {
        ElgSettings.wifi.connected = true;
        ElgSettings.wifi.currentSSID = ssid;
        alert(`✅ Успешно! Подключено к Wi-Fi сети "${ssid}". Доступ в Интернет активен.`);
        showSettingsTab('wifi');
    } else {
        alert(`❌ Ошибка! Неверный пароль для сети "${ssid}". Попробуйте снова.`);
    }
}

// --- 2. ОБОИ И ПЕРСОНАЛИЗАЦИЯ ---
function getWallpaperTabHtml() {
    let cards = ElgSettings.wallpaper.presets.map(w => `
        <div onclick="setSystemWallpaper('${w.url}')" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; overflow:hidden; cursor:pointer;">
            <img src="${w.url}" style="width:100%; height:80px; object-fit:cover;">
            <div style="padding:8px; font-size:12px; font-weight:bold; text-align:center;">${w.name}</div>
        </div>
    `).join('');

    return `
        <h3>🎨 Обои и Темы Рабочего стола</h3>
        <p style="font-size:12px; color:#aaa; margin-bottom:15px;">Выберите качественные природные обои или стиль ВАЗ-2106:</p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">${cards}</div>
    `;
}

function setSystemWallpaper(url) {
    ElgSettings.wallpaper.current = url;
    const desktop = document.getElementById('desktop-environment');
    if (desktop) {
        desktop.style.background = `linear-gradient(rgba(10, 15, 24, 0.45), rgba(10, 15, 24, 0.75)), url('${url}') center/cover no-repeat`;
    }
    alert("🎨 Обои рабочего стола успешно обновлены!");
}

// --- 3. ИГРОВОЙ РЕЖИМ ROBLOX ---
function getGameModeTabHtml() {
    return `
        <h3>🎮 Игровой режим Elgoog Game Boost</h3>
        <p style="font-size:12px; color:#aaa; margin-bottom:15px;">Оптимизация распределения ресурсов процессора и видеокарты через ядро elg.kk для максимального FPS в Roblox.</p>
        
        <div style="background:rgba(0,255,102,0.1); border:1px solid #00ff66; padding:15px; border-radius:10px; margin-bottom:15px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong>⚡ Roblox Turbo Acceleration</strong>
                <span style="color:#00ff66; font-weight:bold;">[ АКТИВНО ]</span>
            </div>
            <p style="font-size:12px; color:#ccc; margin-top:8px;">- Приоритет CPU/GPU: Экстремальный<br>- Целевая частота кадров: 240+ FPS<br>- Авто-очистка фонового кэша: Включена</p>
        </div>
        <button onclick="alert('🚀 Игровой профиль Roblox перезапущен! Выделено 100% графической мощности.')" style="background:#00ff66; color:#000; border:none; padding:10px 18px; border-radius:6px; font-weight:bold; cursor:pointer;">Оптимизировать Roblox сейчас</button>
    `;
}

// --- 4. ЗВУК ---
function getAudioTabHtml() {
    return `
        <h3>🔊 Настройка Громкости и Звука</h3>
        <p style="font-size:12px; color:#aaa; margin-bottom:15px;">Управление системными звуками загрузки и аудиокартой:</p>
        
        <div style="display:flex; align-items:center; gap:15px; background:rgba(255,255,255,0.03); padding:15px; border-radius:8px;">
            <span>🔈</span>
            <input type="range" id="vol-slider" min="0" max="100" value="${ElgSettings.audio.volume}" onchange="updateSystemVolume(this.value)" style="flex:1; cursor:pointer;">
            <span id="vol-val" style="font-weight:bold; color:#00ff66; width:40px;">${ElgSettings.audio.volume}%</span>
        </div>
    `;
}

function updateSystemVolume(val) {
    ElgSettings.audio.volume = val;
    document.getElementById('vol-val').innerText = val + '%';
}

// --- 5. БАТАРЕЯ И ЭНЕРГОПИТАНИЕ ---
function getPowerTabHtml() {
    return `
        <h3>🔋 Управление Питанием и Батареей</h3>
        <p style="font-size:12px; color:#aaa; margin-bottom:15px;">Выберите профиль работы модуля ресурсораспределения FOOD.HJK:</p>

        <div style="display:flex; flex-direction:column; gap:10px;">
            <div onclick="setPowerProfile('SAVER')" style="background:rgba(255,255,255,0.03); border:1px solid ${ElgSettings.power.profile==='SAVER'?'#00ff66':'#333'}; padding:12px; border-radius:8px; cursor:pointer;">
                <strong>🌱 1. Энергосбережение</strong>
                <div style="font-size:11px; color:#aaa; margin-top:2px;">Максимальная экономия заряда батареи, снижение частот CPU.</div>
            </div>
            <div onclick="setPowerProfile('BALANCED')" style="background:rgba(255,255,255,0.03); border:1px solid ${ElgSettings.power.profile==='BALANCED'?'#00ff66':'#333'}; padding:12px; border-radius:8px; cursor:pointer;">
                <strong>⚖️ 2. Стабильный режим</strong>
                <div style="font-size:11px; color:#aaa; margin-top:2px;">Сбалансированная работа для всех повседневных задач.</div>
            </div>
            <div onclick="setPowerProfile('EXTREME')" style="background:rgba(255,255,255,0.03); border:1px solid ${ElgSettings.power.profile==='EXTREME'?'#00ff66':'#333'}; padding:12px; border-radius:8px; cursor:pointer;">
                <strong>🔥 3. Экстрим производительность</strong>
                <div style="font-size:11px; color:#aaa; margin-top:2px;">Предельная скорость процессора, разгон видеокарты через FOOD.HJK.</div>
            </div>
        </div>
    `;
}

function setPowerProfile(profileName) {
    ElgSettings.power.profile = profileName;
    alert(`🔋 Профиль питания переключен на: ${profileName}! Модуль FOOD.HJK переконфигурирован.`);
    showSettingsTab('power');
}
