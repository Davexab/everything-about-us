// ==================== KONFIGURASI ====================
// Tanggal jadian: 9 Februari 2022, jam 00:00
const TANGGAL_JADIAN = new Date(2022, 1, 9, 0, 0, 0);

// ==================== ANNIVERSARY COUNTDOWN (VERSI LENGKAP) ====================
function updateAnniversary() {
    const now = new Date();
    const jadian = TANGGAL_JADIAN;
    
    // ---- Tentukan anniversary berikutnya ----
    let nextAnnivYear = now.getFullYear();
    let nextAnniv = new Date(nextAnnivYear, jadian.getMonth(), jadian.getDate(), 0, 0, 0);
    
    // Kalau anniversary tahun ini udah lewat, ke tahun depan
    if (nextAnniv <= now) {
        nextAnnivYear++;
        nextAnniv = new Date(nextAnnivYear, jadian.getMonth(), jadian.getDate(), 0, 0, 0);
    }
    
    // ---- Hitung selisih waktu ----
    const diff = nextAnniv - now;
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    // ---- Hitung anniversary ke berapa ----
    const annivNumber = nextAnnivYear - jadian.getFullYear();
    
    // ---- Update angka countdown ----
    document.getElementById('annivDays').textContent    = days.toLocaleString('id-ID');
    document.getElementById('annivHours').textContent   = String(hours).padStart(2, '0');
    document.getElementById('annivMinutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('annivSeconds').textContent = String(seconds).padStart(2, '0');
    
    // ---- Update judul ----
    document.getElementById('annivTitle').textContent = `Anniversary ke-${annivNumber} 🎂`;
    
    // ---- Update tanggal ----
    const bulanIndo = [
        'Januari','Februari','Maret','April','Mei','Juni',
        'Juli','Agustus','September','Oktober','November','Desember'
    ];
    document.getElementById('annivDate').textContent = 
        `Menuju ${jadian.getDate()} ${bulanIndo[jadian.getMonth()]} ${nextAnnivYear} 💕`;
    
    // ---- Pesan dinamis sesuai kondisi ----
    let message = '';
    const section = document.querySelector('.anniversary-section');
    
    if (days === 0 && hours === 0 && minutes === 0 && seconds < 60) {
        // Hari-H anniversary!
        message = `🎉 Happy Anniversary ke-${annivNumber}! Aku sayang kamu selalu! 💖`;
        if (section) section.classList.add('urgent');
    } else if (days === 0 && hours === 0) {
        // Kurang dari 1 jam
        message = `💕 Tinggal ${minutes} menit lagi! Siapin kejutan ya! 🎁`;
        if (section) section.classList.add('urgent');
    } else if (days === 0) {
        // Hari-H (tapi belum ke jam anniversary)
        message = `🎉 HARI INI! Anniversary ke-${annivNumber}! Happy anniversary sayang! 💖`;
        if (section) section.classList.add('urgent');
    } else if (days <= 7) {
        // 7 hari terakhir
        message = `✨ Udah makin deket! Tinggal ${days} hari lagi menuju anniversary ke-${annivNumber}! 💕`;
        if (section) section.classList.add('urgent');
    } else if (days <= 30) {
        // 30 hari terakhir
        message = `🌸 Bulan anniversary udah deket, tinggal ${days} hari lagi! 😘`;
        if (section) section.classList.remove('urgent');
    } else {
        // Hari biasa
        message = `💌 Satu hari lagi, satu cerita lagi, dan perlahan kita menuju anniversary berikutnya bersama.
`;
        if (section) section.classList.remove('urgent');
    }
    
    document.getElementById('annivMessage').textContent = message;
}

// Update setiap 1 detik
setInterval(updateAnniversary, 1000);
updateAnniversary();

// Surat cinta - bisa kamu ubah sendiri
const SURAT_CINTA = `Hai sayang,

Ada banyak hal yang sudah kita lewati sampai sejauh ini.
Ada tawa, cerita, hari-hari yang mudah, bahkan beberapa hari yang mungkin nggak ingin kita ulang lagi.

Tapi dari semuanya, aku tetap bersyukur karena pernah dan masih bisa menjalani banyak hal itu bersamamu.

Terima kasih karena selalu menjadi seseorang yang bisa membuat hari-hariku terasa sedikit lebih berarti. Terima kasih untuk setiap perhatian kecil, setiap cerita, setiap tawa, dan setiap momen sederhana yang mungkin terlihat biasa, tapi ternyata berarti banyak buatku.

Aku nggak tahu akan seperti apa perjalanan kita ke depannya.
Mungkin akan ada banyak hal yang berubah, mungkin juga akan ada hari-hari yang nggak mudah.

Tapi untuk sekarang, aku cuma ingin menikmati setiap langkah yang masih bisa kita jalani bersama.

Karena kalau boleh memilih lagi,
aku masih ingin menemukan banyak cerita baru bersamamu.


I love you, always and forever. ❤`;

// ==================== COUNTDOWN TOTAL ====================
function updateCountdown() {
    const now = new Date();
    const diff = now - TANGGAL_JADIAN;

    // Total keseluruhan (naik terus, tidak reset)
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours   = Math.floor(totalMinutes / 60);
    const totalDays    = Math.floor(totalHours / 24);

    document.getElementById('days').textContent    = totalDays.toLocaleString('id-ID');
    document.getElementById('hours').textContent   = totalHours.toLocaleString('id-ID');
    document.getElementById('minutes').textContent = totalMinutes.toLocaleString('id-ID');
    document.getElementById('seconds').textContent = totalSeconds.toLocaleString('id-ID');

    // Update teks romantis
    updateRomanticText();
}

// ==================== TEKS ROMANTIS ====================
function updateRomanticText() {
    const now = new Date();
    
    // Hitung tahun, bulan, hari secara kalender
    let years  = now.getFullYear() - TANGGAL_JADIAN.getFullYear();
    let months = now.getMonth()    - TANGGAL_JADIAN.getMonth();
    let days   = now.getDate()     - TANGGAL_JADIAN.getDate();

    // Koreksi kalau tanggal belum lewat
    if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    const totalDays = Math.floor((now - TANGGAL_JADIAN) / (1000 * 60 * 60 * 24));

    // Susun teks
    const parts = [];
    if (years > 0)  parts.push(`${years} tahun`);
    if (months > 0) parts.push(`${months} bulan`);
    if (days > 0)   parts.push(`${days} hari`);

    const text = `💕 Kita sudah bersama selama ${parts.join(', ')} — itu artinya ${totalDays.toLocaleString('id-ID')} hari penuh cinta 🌹`;
    
    const el = document.getElementById('romanticText');
    if (el) el.textContent = text;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ==================== FLOATING HEARTS ====================
function createHearts() {
    const container = document.getElementById('hearts');
    const heartEmojis = ['❤', '💕', '💖', '💗', '💝', '🌸'];

    function spawnHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 16000);
    }

    setInterval(spawnHeart, 500);
    for (let i = 0; i < 8; i++) {
        setTimeout(spawnHeart, i * 200);
    }
}
createHearts();

// ==================== TYPEWRITER SURAT ====================
let letterIndex = 0;
const letterEl = document.getElementById('letterText');

function typeLetter() {
    if (letterIndex < SURAT_CINTA.length) {
        letterEl.textContent += SURAT_CINTA.charAt(letterIndex);
        letterIndex++;
        setTimeout(typeLetter, 35);
    }
}

const letterSection = document.querySelector('.letter-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && letterIndex === 0) {
            typeLetter();
        }
    });
}, { threshold: 0.3 });
observer.observe(letterSection);

// ==================== MUSIC PLAYER ====================
const bgMusic = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        playBtn.textContent = '▶';
        isPlaying = false;
    } else {
        bgMusic.play().catch(() => {
            alert('Lagu belum tersedia. Taruh file lagu.mp3 di folder "music". 😊');
        });
        playBtn.textContent = '⏸';
        isPlaying = true;
    }
}

// ==================== POPUP SURPRISE ====================
function showSurprise() {
    document.getElementById('popup').classList.add('active');
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-float';
            heart.textContent = '💖';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
            document.getElementById('hearts').appendChild(heart);
            setTimeout(() => heart.remove(), 6000);
        }, i * 50);
    }
}

function closePopup() {
    document.getElementById('popup').classList.remove('active');
}

// ==================== SCROLL ====================
function scrollToStory() {
    document.querySelector('.countdown-section').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('popup').addEventListener('click', (e) => {
    if (e.target.id === 'popup') closePopup();
});