/**
 * ============================================================================
 * ELGOOG OS - Advanced System File Infrastructure (v10.0 ULTRA PRO)
 * Massive Granular Kernel Registry vs. macOS / Windows 11
 * ============================================================================
 */

const ElgFileSystem = {
    // ------------------ 1. КРИТИЧЕСКОЕ ЯДРО И МОДУЛИ ------------------
    "/sys/core/FOOD.HJK": {
        name: "FOOD.HJK",
        dir: "/sys/core/",
        type: "PRIMARY_RESOURCE_ALLOCATOR",
        size: "1024 KB",
        permissions: "ROOT_LOCKED",
        hash: "0xFE4B99A1C8",
        description: "Главный регулятор ресурсов питания, кэш-памяти процессора и виртуальных пулов ядра elg.kk."
    },
    "/sys/core/NEKTAR39": {
        name: "NEKTAR39",
        dir: "/sys/core/",
        type: "CRYPTO_VAULT_GUARD",
        size: "2048 KB",
        permissions: "READ_ONLY_LOCKED",
        hash: "0x77A19B3F44",
        description: "Криптографический щит ядра. Блокирует отладчики, попытки снятия дампов и внешнего взлома."
    },
    "/sys/core/elg.kk.sys": { name: "elg.kk.sys", dir: "/sys/core/", type: "HYBRID_CORE_EXEC", size: "4096 KB", permissions: "KERNEL_ONLY", hash: "0x89C111A001", description: "Исполняемый файл гибридного ядра." },
    "/sys/core/memory.sys": { name: "memory.sys", dir: "/sys/core/", type: "RAM_MANAGER", size: "512 KB", permissions: "KERNEL_ONLY", hash: "0xAA11BB22CC", description: "Менеджер высокоскоростной памяти." },
    "/sys/core/scheduler.sys": { name: "scheduler.sys", dir: "/sys/core/", type: "CPU_SCHEDULER", size: "320 KB", permissions: "KERNEL_ONLY", hash: "0x3344556677", description: "Планировщик квантовых потоков процессора." },
    "/sys/core/hal_quantum.dll": { name: "hal_quantum.dll", dir: "/sys/core/", type: "HARDWARE_ABSTRACTION", size: "1280 KB", permissions: "ROOT_ONLY", hash: "0x9988776655", description: "Уровень абстракции аппаратного обеспечения." },

    // ------------------ 2. СИСТЕМА КИБЕРБЕЗОПАСНОСТИ ------------------
    "/sys/security/anti_spy_cam.guard": { name: "anti_spy_cam.guard", dir: "/sys/security/", type: "SURVEILLANCE_BLOCKER", size: "128 KB", permissions: "HIGH_SECURITY", hash: "0x1122334455", description: "Защита от слежки через камеру." },
    "/sys/security/duck_shield.vault": { name: "duck_shield.vault", dir: "/sys/security/", type: "FIREWALL_ENGINE", size: "256 KB", permissions: "ROOT_ONLY", hash: "0xBBCCDD3344", description: "Межсетевой экран и IPS." },
    "/sys/security/zero_day.dll": { name: "zero_day.dll", dir: "/sys/security/", type: "BEHAVIORAL_ANALYZER", size: "384 KB", permissions: "ROOT_ONLY", hash: "0xEEFF001122", description: "Анализатор угроз нулевого дня." },
    "/sys/security/sandbox.sys": { name: "sandbox.sys", dir: "/sys/security/", type: "ISOLATION_CONTAINER", size: "640 KB", permissions: "ROOT_ONLY", hash: "0x4455667788", description: "Изолированная среда выполнения приложений." },

    // ------------------ 3. ДРАЙВЕРЫ УСТРОЙСТВ ------------------
    "/sys/drivers/cpu_quantum.sys": { name: "cpu_quantum.sys", dir: "/sys/drivers/", type: "CPU_DRIVER", size: "192 KB", permissions: "SYSTEM_READ", hash: "0x9900AABBCC", description: "Драйвер оптимизации инструкций CPU." },
    "/sys/drivers/gpu_glass.sys": { name: "gpu_glass.sys", dir: "/sys/drivers/", type: "GPU_DRIVER", size: "1536 KB", permissions: "SYSTEM_READ", hash: "0x1234567890", description: "Драйвер графического ускорения Glassmorphism." },
    "/sys/drivers/audio_chime.driver": { name: "audio_chime.driver", dir: "/sys/drivers/", type: "AUDIO_SYNTH", size: "96 KB", permissions: "SYSTEM_READ", hash: "0xABCDEF1234", description: "Драйвер аудио-аккордов загрузки." },
    "/sys/drivers/storage_nvme.sys": { name: "storage_nvme.sys", dir: "/sys/drivers/", type: "NVME_DRIVER", size: "310 KB", permissions: "SYSTEM_READ", hash: "0x5566778899", description: "Контроллер высокоскоростных накопителей SSD." },

    // ------------------ 4. ГРАФИКА И ОБОЛОЧКА ------------------
    "/sys/ui/duck_mascot.ui": { name: "duck_mascot.ui", dir: "/sys/ui/", type: "MASCOT_RENDERER", size: "80 KB", permissions: "USER_READ", hash: "0x6677889900", description: "Рендерер маскота Уточки 🦆." },
    "/sys/ui/zhiguli_2106.vza": { name: "zhiguli_2106.vza", dir: "/sys/ui/", type: "WALLPAPER_PACK", size: "3072 KB", permissions: "USER_READ", hash: "0x7788990011", description: "Пакет обоев ВАЗ-2106." },
    "/sys/ui/window_manager.sys": { name: "window_manager.sys", dir: "/sys/ui/", type: "WM_ENGINE", size: "450 KB", permissions: "SYSTEM", hash: "0x8899001122", description: "Менеджер окон и стеклянного интерфейса." }
};
