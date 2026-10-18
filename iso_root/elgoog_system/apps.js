/**
 * ============================================================================
 * ELGOOG OS - Advanced Subsystem Applications & 3D/2D Tools (v10.0)
 * ============================================================================
 */

class WindowManager {
    constructor() { this.zIndex = 1000; }

    createWindow(id, title, icon, contentHtml, width = 720, height = 480) {
        if (document.getElementById(`win-${id}`)) {
            this.focusWindow(id);
            return;
        }

        const win = document.createElement('div');
        win.id = `win-${id}`;
        win.className = 'app-window';
        win.style.width = width + 'px';
        win.style.height = height + 'px';
        win.style.top = '70px';
        win.style.left = '100px';
        win.style.zIndex = ++this.zIndex;

        win.innerHTML = `
            <div class="win-header" onmousedown="wm.startDrag(event, 'win-${id}')">
                <div class="win-title"><span>${icon}</span> ${title}</div>
                <div class="win-controls">
                    <button class="win-btn win-close" onclick="wm.closeWindow('${id}')">✕</button>
                </div>
            </div>
            <div class="win-body" style="display:flex; flex-direction:column; flex:1; overflow:hidden; padding:10px;">${contentHtml}</div>
        `;

        document.getElementById('desktop-environment').appendChild(win);
        this.focusWindow(id);
    }

    closeWindow(id) { const win = document.getElementById(`win-${id}`); if (win) win.remove(); }
    focusWindow(id) { const win = document.getElementById(`win-${id}`); if (win) win.style.zIndex = ++this.zIndex; }

    startDrag(e, winId) {
        const win = document.getElementById(winId);
        let shiftX = e.clientX - win.getBoundingClientRect().left;
        let shiftY = e.clientY - win.getBoundingClientRect().top;
        function moveAt(pageX, pageY) { win.style.left = pageX - shiftX + 'px'; win.style.top = pageY - shiftY + 'px'; }
        function onMouseMove(e) { moveAt(e.pageX, e.pageY); }
        document.addEventListener('mousemove', onMouseMove);
        document.onmouseup = function() { document.removeEventListener('mousemove', onMouseMove); document.onmouseup = null; };
    }
}

const wm = new WindowManager();

// 1. GOOGLE CHROME
function openGoogleBrowser() {
    const html = `
        <div style="display:flex; flex-direction:column; height:100%;">
            <div style="display:flex; gap:8px; margin-bottom:10px;">
                <input type="text" id="g-search-input" placeholder="Введите поисковый запрос или URL..." style="flex:1; padding:8px 12px; border-radius:6px; border:1px solid #333; background:#111; color:#00ff66; font-family:monospace;" value="https://www.bing.com">
                <button onclick="navigateBrowser()" style="padding:8px 16px; background:#00ff66; border:none; font-weight:bold; border-radius:6px; cursor:pointer; color:#000;">Перейти</button>
            </div>
            <iframe id="g-frame" src="https://www.bing.com" style="flex:1; border:none; border-radius:8px; background:#fff;"></iframe>
        </div>
    `;
    wm.createWindow('google', 'Google Chrome Browser', '🌐', html, 820, 520);
}

function navigateBrowser() {
    let url = document.getElementById('g-search-input').value.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://www.bing.com/search?q=' + encodeURIComponent(url);
    }
    document.getElementById('g-frame').src = url;
}

// 2. ПРОВОДНИК (С СИСТЕМНЫМИ ФАЙЛАМИ FOOD.HJK И NEKTAR39)
function openFileManager() {
    let filesHtml = "";
    for (let p in ElgFileSystem) {
        let f = ElgFileSystem[p];
        let isCore = f.name === "FOOD.HJK" || f.name === "NEKTAR39";
        let style = isCore ? "background:rgba(255,0,85,0.15); border:1px solid #ff0055;" : "background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08);";
        
        filesHtml += `
            <div style="${style} padding:10px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <div>
                    <strong style="color:${isCore ? '#ff3366' : '#fff'};">${f.name}</strong>
                    <div style="font-size:11px; color:#aaa;">${f.dir} &bull; ${f.type}</div>
                    <div style="font-size:10px; color:#666;">${f.description}</div>
                </div>
                <div style="text-align:right;">
                    <span style="font-size:11px; color:#00ff66; font-weight:bold;">${f.size}</span>
                    <div style="font-size:9px; color:#555;">${f.hash}</div>
                </div>
            </div>
        `;
    }

    const html = `
        <div style="display:flex; gap:12px; height:100%;">
            <div style="width:160px; border-right:1px solid rgba(255,255,255,0.1); display:flex; flex-direction:column; gap:6px;">
                <div style="padding:8px; background:rgba(0,255,102,0.15); border-radius:6px; font-weight:bold;">📁 /sys/ (Все файлы)</div>
                <div style="padding:8px; color:#aaa;">🛡️ /sys/security/</div>
                <div style="padding:8px; color:#aaa;">⚙️ /sys/drivers/</div>
            </div>
            <div style="flex:1; overflow-y:auto; padding-right:5px;">${filesHtml}</div>
        </div>
    `;
    wm.createWindow('explorer', 'Системный Проводник (FOOD.HJK & NEKTAR39)', '💻', html, 780, 480);
}

// 3. СТУДИЯ РИСОВАНИЯ (ElgPaint)
function openPaintApp() {
    const html = `
        <div style="display:flex; gap:10px; margin-bottom:8px; align-items:center;">
            <label>Цвет:</label>
            <input type="color" id="paint-color" value="#00ff66" style="cursor:pointer;">
            <label>Кисть:</label>
            <input type="range" id="paint-size" min="1" max="30" value="5">
            <button onclick="clearCanvas()" style="background:#ff3333; color:white; border:none; padding:4px 10px; border-radius:4px; cursor:pointer; margin-left:auto;">Очистить</button>
        </div>
        <canvas id="paint-canvas" style="flex:1; background:#111; border:1px solid #333; border-radius:6px; cursor:crosshair;"></canvas>
    `;
    wm.createWindow('paint', 'ElgPaint Studio', '🎨', html, 700, 480);

    setTimeout(() => {
        const canvas = document.getElementById('paint-canvas');
        if (!canvas) return;
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight - 50;
        const ctx = canvas.getContext('2d');
        let painting = false;

        canvas.onmousedown = (e) => { painting = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY); };
        canvas.onmouseup = () => { painting = false; };
        canvas.onmousemove = (e) => {
            if (!painting) return;
            ctx.strokeStyle = document.getElementById('paint-color').value;
            ctx.lineWidth = document.getElementById('paint-size').value;
            ctx.lineCap = 'round';
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        };
    }, 100);
}

function clearCanvas() {
    const canvas = document.getElementById('paint-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// 4. 3D МОДЕЛИРОВЩИК (Elg3D Studio)
function open3DStudio() {
    const html = `
        <div style="display:flex; gap:10px; margin-bottom:8px; align-items:center;">
            <label>Примитив:</label>
            <select id="obj-type" style="background:#111; color:#00ff66; border:1px solid #333; padding:4px; border-radius:4px;">
                <option value="cube">Квантовый Куб</option>
                <option value="sphere">Сфера ядра</option>
                <option value="pyramid">Пирамида безопасности</option>
            </select>
            <label>Цвет:</label>
            <input type="color" id="obj-color" value="#00ff66">
            <button onclick="render3DObject()" style="background:#00ff66; border:none; padding:6px 14px; font-weight:bold; border-radius:4px; cursor:pointer; color:#000;">Рендер 3D</button>
        </div>
        <div id="canvas-3d-container" style="flex:1; background:#0a0e14; border:1px solid #333; border-radius:6px; display:flex; justify-content:center; align-items:center; position:relative; overflow:hidden;">
            <div id="object-3d" style="width:120px; height:120px; background:#00ff66; box-shadow: 0 0 25px #00ff66; animation: spin3D 4s linear infinite; transition: 0.3s;"></div>
        </div>
        <style>
            @keyframes spin3D {
                0% { transform: rotateX(0deg) rotateY(0deg); }
                100% { transform: rotateX(360deg) rotateY(360deg); }
            }
        </style>
    `;
    wm.createWindow('studio3d', 'Elg3D Object Modeler', '🧊', html, 650, 480);
}

function render3DObject() {
    const type = document.getElementById('obj-type').value;
    const color = document.getElementById('obj-color').value;
    const obj = document.getElementById('object-3d');
    if (!obj) return;

    obj.style.background = color;
    obj.style.boxShadow = `0 0 30px ${color}`;

    if (type === 'cube') {
        obj.style.borderRadius = '10px';
        obj.style.width = '120px'; obj.style.height = '120px';
    } else if (type === 'sphere') {
        obj.style.borderRadius = '50%';
        obj.style.width = '120px'; obj.style.height = '120px';
    } else if (type === 'pyramid') {
        obj.style.borderRadius = '0 0 60px 60px';
        obj.style.width = '0'; obj.style.height = '0';
        obj.style.borderLeft = '60px solid transparent';
        obj.style.borderRight = '60px solid transparent';
        obj.style.borderBottom = `120px solid ${color}`;
        obj.style.background = 'transparent';
        obj.style.boxShadow = 'none';
    }
}

// 5. MS WORD
function openMSWord() {
    const html = `
        <div style="background:#2b579a; color:white; padding:6px 10px; font-weight:bold; border-radius:4px; margin-bottom:8px;">Microsoft Word &bull; elg.kk</div>
        <textarea style="flex:1; background:#fff; color:#000; border:1px solid #ccc; padding:12px; border-radius:4px; outline:none; resize:none;" placeholder="Напишите документ..."></textarea>
    `;
    wm.createWindow('msword', 'Microsoft Word', '📘', html, 650, 450);
}

// 6. НАСТРОЙКИ
function openSettings() {
    const html = (typeof renderFullSettingsPanel === 'function') 
        ? renderFullSettingsPanel() 
        : `<div style="color:#ff3333;">Ошибка загрузки модуля settings_manager.js</div>`;
    
    wm.createWindow('settings', 'Панель управления Elgoog OS', '⚙️', html, 740, 480);
}


// ============================================================================
// 7. ДИСПЕТЧЕР УСТРОЙСТВ И ДРАЙВЕРОВ
// ============================================================================
function openDeviceManager() {
    let driversHtml = "";
    
    if (typeof ElgDriversRegistry !== 'undefined') {
        for (let key in ElgDriversRegistry) {
            let d = ElgDriversRegistry[key];
            driversHtml += `
                <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,255,102,0.2); padding:10px 12px; border-radius:8px; margin-bottom:8px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <strong style="color:#fff; font-size:14px;">${d.name}</strong>
                        <span style="background:#00ff66; color:#000; padding:2px 8px; border-radius:4px; font-weight:bold; font-size:10px;">${d.status}</span>
                    </div>
                    <div style="font-size:11px; color:#00ff66; margin-top:2px;">Категория: ${d.category} &bull; ${d.version}</div>
                    <div style="font-size:11px; color:#aaa; margin-top:2px;">${d.description}</div>
                    <div style="font-size:10px; color:#777; margin-top:4px;">Состояние: ${d.stats}</div>
                </div>
            `;
        }
    } else {
        driversHtml = `<div style="color:#ff3333;">Ошибка загрузки подсистемы драйверов!</div>`;
    }

    const html = `
        <div style="display:flex; flex-direction:column; height:100%;">
            <div style="background:rgba(0,255,102,0.1); border:1px solid #00ff6644; padding:8px 12px; border-radius:6px; margin-bottom:10px; font-size:12px; color:#00ff66;">
                ⚡ Все аппаратные драйверы (Сеть, Звук, GPU, Монитор, CPU) работают под защитой ядра <b>elg.kk</b>.
            </div>
            <div style="flex:1; overflow-y:auto; padding-right:5px;">
                ${driversHtml}
            </div>
        </div>
    `;
    wm.createWindow('devmanager', 'Диспетчер драйверов и устройств', '🖥️', html, 720, 480);
}
