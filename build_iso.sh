#!/bin/bash
# ============================================================================
# ELGOOG OS - Hybrid ISO Builder (MBR + GPT / UEFI) for Rufus
# ============================================================================

echo "🚀 Начало сборки гибридного ISO-образа Elgoog OS..."

# 1. Создаем папку для структуры ISO
mkdir -p iso_root/boot/grub
mkdir -p iso_root/EFI/BOOT
mkdir -p iso_root/elgoog_system

# 2. Копируем все файлы ОС в образ
cp index.html system_files.js drivers.js settings_manager.js apps.js iso_root/elgoog_system/

# 3. Создаем конфигурацию загрузчика GRUB2 (поддержка MBR и UEFI)
cat << 'EOF' > iso_root/boot/grub/grub.cfg
set timeout=5
set default=0

menuentry "Elgoog OS Pro (elg.kk Kernel - Hybrid MBR/GPT)" {
    echo "Загрузка ядра elg.kk и модулей FOOD.HJK / NEKTAR39..."
    linux /boot/vmlinuz quiet
    initrd /boot/initrd.img
}

menuentry "Elgoog OS Safe Mode (Direct Web Kernel)" {
    echo "Запуск в безопасном режиме..."
    linux /boot/vmlinuz nomodeset
    initrd /boot/initrd.img
}
EOF

# 4. Устанавливаем необходимый инструмент mkisofs / xorriso
sudo apt-get update && sudo apt-get install -y xorriso grub-pc-bin grub-efi-amd64-bin

# 5. Собираем гибридный ISO-образ для Rufus
grub-mkrescue -o elgoog-os-v10.iso iso_root/

echo "===================================================="
echo "🎉 СБОРКА ЗАВЕРШЕНА! Создан файл: elgoog-os-v10.iso"
echo "Теперь этот ISO можно записать через Rufus!"
echo "===================================================="
