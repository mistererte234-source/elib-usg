/* ============================================
   USG LIBRARY — Ultra Modern Bento
   Design × Code by ZanDev
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Init all features
    initLiveClock();
    initCounter();
    initSearch();
});

/* ============================================
   LIVE CLOCK + STATUS BUKA/TUTUP
   ============================================ */
function initLiveClock() {
    const clockEl = document.getElementById('live-clock');
    const dateEl = document.getElementById('live-date');
    const statusBadge = document.getElementById('status-badge');
    const statusText = document.getElementById('status-text');
    const closeInfo = document.getElementById('close-info');

    // Jam operasional perpustakaan
    const schedule = {
        // 0=Min, 1=Sen, 2=Sel, 3=Rab, 4=Kam, 5=Jum, 6=Sab
        weekday: { open: 8, close: 21 },     // Senin–Jumat 08:00–21:00
        saturday: { open: 9, close: 15 },    // Sabtu 09:00–15:00
        sunday: null                          // Minggu tutup
    };

    function getSchedule(day) {
        if (day === 0) return schedule.sunday;
        if (day === 6) return schedule.saturday;
        return schedule.weekday;
    }

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        if (clockEl) clockEl.textContent = `${hours}:${minutes}`;

        if (dateEl) {
            const opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            dateEl.textContent = now.toLocaleDateString('id-ID', opts);
        }

        // Cek status buka/tutup
        const today = getSchedule(now.getDay());
        const currentHour = now.getHours();
        const isOpen = today && currentHour >= today.open && currentHour < today.close;

        if (statusBadge && statusText && closeInfo) {
            if (isOpen) {
                statusBadge.classList.remove('closed');
                statusText.textContent = 'Sekarang Buka';
                closeInfo.textContent = `Tutup ${String(today.close).padStart(2, '0')}:00`;
            } else {
                statusBadge.classList.add('closed');
                statusText.textContent = 'Sedang Tutup';

                // Cari hari berikutnya yang buka
                let nextDay = now.getDay();
                let daysAhead = 0;
                let nextSchedule = null;

                if (today && currentHour < today.open) {
                    // Hari ini, buka nanti
                    nextSchedule = today;
                    closeInfo.textContent = `Buka ${String(today.open).padStart(2, '0')}:00`;
                } else {
                    // Cari hari berikutnya
                    for (let i = 1; i <= 7; i++) {
                        const checkDay = (nextDay + i) % 7;
                        const checkSched = getSchedule(checkDay);
                        if (checkSched) {
                            nextSchedule = checkSched;
                            daysAhead = i;
                            break;
                        }
                    }
                    if (nextSchedule) {
                        const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
                        const targetDay = dayNames[(nextDay + daysAhead) % 7];
                        closeInfo.textContent = `Buka ${targetDay} ${String(nextSchedule.open).padStart(2, '0')}:00`;
                    }
                }
            }
        }
    }

    updateClock();
    // Update tiap 30 detik
    setInterval(updateClock, 30000);
}

/* ============================================
   ANIMATED COUNTER
   ============================================ */
function initCounter() {
    const counterEl = document.getElementById('counter-books');
    if (!counterEl) return;

    const target = 25348;
    const duration = 2000;
    const startTime = performance.now();

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(target * eased);
        counterEl.textContent = value.toLocaleString('id-ID');
        if (progress < 1) requestAnimationFrame(step);
    }

    // Mulai counter saat element terlihat di viewport
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(step);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(counterEl);
    } else {
        requestAnimationFrame(step);
    }
}

/* ============================================
   SEARCH HANDLER
   ============================================ */
function initSearch() {
    // Auto-focus search input on desktop
    const searchInput = document.getElementById('search-input');
    if (searchInput && window.innerWidth > 768) {
        // Tunggu animasi selesai
        setTimeout(() => searchInput.focus(), 500);
    }
}

function handleSearch() {
    const query = document.getElementById('search-input').value.trim();
    const category = document.getElementById('search-category').value;

    if (!query) return;

    // Untuk preview: redirect ke OPAC dengan query
    // Nanti bisa diubah sesuai endpoint sebenarnya
    const opacUrl = `https://lib.usg.ac.id/opac?q=${encodeURIComponent(query)}&cat=${category}`;
    window.open(opacUrl, '_blank');
}
