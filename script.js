let currentPage = 0;
const pages = ['intro-page', 'candles-page', 'quiz-page', 'memory-page', 'timeline-page', 'gallery-page'];
const pageLabels = ['Intro', 'Lilin', 'Quiz', 'Game', 'Timeline', 'Galeri'];
let candlesBlown = 0;
let musicPlaying = false;
let audio = new Audio('song.mp3');
let currentQuestion = 0;
let quizScore = 0;
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let canFlip = true;
let timelineScrolledToBottom = false;

function init() {
    createStars();
    createShootingStars();
    createCandles();
    createQuiz();
    createMemoryGame();
    createPhotoGallery();
    updatePageIndicator();
    initTimelineScroll();
}

function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

function createShootingStars() {
    const starsContainer = document.querySelector('.stars');
    setInterval(() => {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.width = Math.random() * 100 + 50 + 'px';
        shootingStar.style.left = Math.random() * 100 + '%';
        shootingStar.style.top = Math.random() * 50 + '%';
        starsContainer.appendChild(shootingStar);
        setTimeout(() => shootingStar.remove(), 3000);
    }, 3000);
}

function createCandles() {
    const grid = document.getElementById('candlesGrid');
    for (let i = 0; i < 22; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        candle.innerHTML = `
            <div class="wick"></div>
            <div class="flame"></div>
        `;
        candle.onclick = function() {
            if (!this.classList.contains('blown-out')) {
                this.classList.add('blown-out');
                candlesBlown++;
                updateProgress();
                createConfetti(this);
                if (candlesBlown === 22) {
                    setTimeout(() => {
                        createMassConfetti();
                        setTimeout(() => goToPage(2), 3000);
                    }, 500);
                }
            }
        };
        grid.appendChild(candle);
    }
}

function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#ff6b9d', '#c06c84', '#f67280', '#ffd700', '#4facfe'];
    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = rect.left + rect.width / 2 + 'px';
        confetti.style.top = rect.top + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.animation = 'confettiFall 3s linear forwards';
        confetti.style.transform = `translate(${(Math.random() - 0.5) * 200}px, 0) rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

function createMassConfetti() {
    const colors = ['#ff6b9d', '#c06c84', '#f67280', '#ffd700', '#4facfe', '#00f2fe'];
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animation = 'confettiFall 3s linear forwards';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

function updateProgress() {
    const fill = document.getElementById('progressFill');
    const percentage = (candlesBlown / 22) * 100;
    fill.style.width = percentage + '%';
    fill.textContent = candlesBlown + '/22';
}

function createQuiz() {
    const questions = [
        {
            q: "Apa yang paling aku suka dari dirimu?",
            options: ["Senyumanmu yang menenangkan", "Caramu menjadi pendengar yang baik", "Semuanya tentang dirimu", "Kehadiranmu yang membuat hari-hariku lebih baik"],
            correct: 2
        },
        {
            q: "Momen apa yang paling berkesan buat aku?",
            options: ["Saat pertama kita bertemu", "Saat kamu menyemangati aku di saat sulit", "Setiap momen bersama kamu", "Saat kamu bilang 'aku sayang kamu'"],
            correct: 2
        },
        {
            q: "Apa yang selalu aku inginkan dari hubungan kita?",
            options: ["Kebersamaan yang tulus", "Komunikasi yang baik", "Saling mendukung dalam mimpi", "Semua jawaban benar"],
            correct: 3
        },
        {
            q: "Bagaimana perasaanku setiap hari bersamamu?",
            options: ["Bahagia", "Bersyukur", "Jatuh cinta lagi dan lagi", "Semua di atas"],
            correct: 3
        }
    ];

    const container = document.getElementById('quizQuestions');
    questions.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        if (index === 0) questionDiv.classList.add('active');
        
        let optionsHTML = '';
        item.options.forEach((option, i) => {
            optionsHTML += `<div class="option" onclick="selectAnswer(${index}, ${i}, ${item.correct})">${option}</div>`;
        });
        
        questionDiv.innerHTML = `
            <h3>Pertanyaan ${index + 1}/4</h3>
            <p style="font-size: 1.2rem; margin-bottom: 1.5rem; color: #555;">${item.q}</p>
            <div class="options">${optionsHTML}</div>
        `;
        container.appendChild(questionDiv);
    });
}

function selectAnswer(questionIndex, selected, correct) {
    const question = document.querySelectorAll('.question')[questionIndex];
    const options = question.querySelectorAll('.option');
    
    if (options[selected].classList.contains('correct') || options[selected].classList.contains('wrong')) {
        return;
    }
    
    if (selected === correct) {
        options[selected].classList.add('correct');
        quizScore++;
        setTimeout(() => {
            if (questionIndex < 3) {
                question.classList.remove('active');
                document.querySelectorAll('.question')[questionIndex + 1].classList.add('active');
            } else {
                showQuizResult();
            }
        }, 1000);
    } else {
        options[selected].classList.add('wrong');
        setTimeout(() => {
            options[selected].classList.remove('wrong');
        }, 500);
    }
}

function showQuizResult() {
    document.getElementById('quizQuestions').style.display = 'none';
    document.getElementById('quizScore').classList.add('show');
    setTimeout(() => goToPage(3), 3000);
}

function createMemoryGame() {
    const emojis = ['💕', '💖', '💗', '💝', '🌹', '💐', '🎀', '✨'];
    const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    
    const grid = document.getElementById('memoryGrid');
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.innerHTML = `
            <div class="card-front">❤️</div>
            <div class="card-back">${emoji}</div>
        `;
        card.onclick = () => flipCard(card);
        grid.appendChild(card);
    });
}

function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        document.getElementById('moves').textContent = moves;
        
        const [card1, card2] = flippedCards;
        if (card1.dataset.emoji === card2.dataset.emoji) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            document.getElementById('matches').textContent = `${matchedPairs}/8`;
            flippedCards = [];
            canFlip = true;
            
            if (matchedPairs === 8) {
                setTimeout(() => {
                    createMassConfetti();
                    setTimeout(() => goToPage(4), 3000);
                }, 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
                canFlip = true;
            }, 1000);
        }
    }
}

function createPhotoGallery() {
    const grid = document.getElementById('photosGrid');
    const photos = [
        { title: 'Kenangan Pertama 💫', desc: 'Saat pertama kita bersama', url: 'https://drive.google.com/file/d/1P__ekLR7Fzbn3B5rHZHGv9WMvy5iL8EL/view?usp=sharing' },
        { title: 'Momen Bahagia 😊', desc: 'Tawa dan canda kita', url: 'https://drive.google.com/file/d/1AAAp7iTGgZs60BObZuHV5h0KE8F6qKD7/view?usp=drive_link' },
    { title: 'Petualangan 🗺️', desc: 'Eksplorasi dunia bersama', url: 'https://drive.google.com/file/d/1NTd51eKQWXALsbZFKDuh8XQgt75GElC0/view?usp=sharing' },
    { title: 'Moment Romantis 🌙', desc: 'Di bawah bintang malam', url: 'https://drive.google.com/file/d/1vrCw7z9vitZDC9mVzsPRw8KWyXOtrpL1/view?usp=drive_link' },
    { title: 'Senyum Terindah ☺️', desc: 'Yang selalu membuatku jatuh cinta', url: 'https://drive.google.com/file/d/1P0US8KuX8Wp2bStFX8TIVwnld30hBnuS/view?usp=drive_link' },
    { title: 'Kebersamaan 👫', desc: 'Setiap detik berharga', url: 'https://drive.google.com/file/d/1f81lfpBT-JfcoWK0iybjTF3Pzhy7HKYG/view?usp=drive_link' },
    { title: 'Cinta Kita 💑', desc: 'Yang terus tumbuh', url: 'https://drive.google.com/file/d/182Zt_tDFNMrQqPMiCihmiv9S5_ptCD17/view?usp=drive_link' },
    { title: 'Kenangan Indah 📸', desc: 'Yang tak terlupakan', url: 'https://drive.google.com/file/d/1VMCuieA92sKg4wB6h-n6jQANJoGXSHu4/view?usp=drive_link' },
    { title: 'Masa Depan 🌈', desc: 'Yang akan kita bangun bersama', url: 'https://drive.google.com/file/d/1q_RWEBs0UhMwnwYemcj28zUisoskHvRU/view?usp=drive_link' },
    { title: 'Selamanya 💖', desc: 'Kamu dan aku', url: 'https://drive.google.com/file/d/13BteMOI4ZoxPBOIwDdSGCBhl5GuODCK-/view?usp=drive_link' },
    { title: 'Kebahagiaan 🎉', desc: 'Yang kita ciptakan', url: 'https://drive.google.com/file/d/100xBTs-VYvflk9PwGwehfSXLj6lKzSEC/view?usp=drive_link' },
    { title: 'Forever & Always 💝', desc: 'Janji kita', url: 'https://drive.google.com/file/d/1piEiDUxr1Amf70OzBVVTujOOP0iOWrjE/view?usp=drive_link' },
    { title: 'Dekapan Hangat 🤗', desc: 'Tempat paling nyaman adalah pelukanmu', url: 'https://drive.google.com/file/d/19eNztUgtNzWe7EbpAcsz8yd9VsbdQEkz/view?usp=drive_link' },
    { title: 'Langit Senja 🌅', desc: 'Indahnya seperti tatapanmu', url: 'https://drive.google.com/file/d/1S1kc6hxMujwQQmKnx2M2UIhybJpdT906/view?usp=drive_link' },
    { title: 'Kisah Kita 📖', desc: 'Cerita yang tak akan pernah usai', url: 'https://drive.google.com/file/d/1G3VIXwBRXn9HfSayCh0ojdSXqdPL6yWU/view?usp=drive_link' },
    { title: 'Tatapan Pertama 👀', desc: 'Yang membuat jantungku berdebar', url: 'https://drive.google.com/file/d/1SP-Ujhj3L9K1hGpeRFRFZK0Hoh4b4YPb/view?usp=drive_link' },
    { title: 'Hujan & Kenangan 🌧️', desc: 'Bersamamu, hujan pun terasa hangat', url: 'https://drive.google.com/file/d/1fHFsrzC13__ThcrQspz02k_sgiWNl7-b/view?usp=drive_link' },
    { title: 'Langkah Bersama 🚶‍♀️🚶‍♂️', desc: 'Menapaki hari dengan cinta', url: 'https://drive.google.com/file/d/1lY3Bw0jFDHyaZROEOpqlBMsejIzzESQ6/view?usp=drive_link' },
    { title: 'Senyuman Pagi 🌞', desc: 'Alasan aku semangat setiap hari', url: 'https://drive.google.com/file/d/16GzgmTOiK-zj1lBf_3hRCZ8W5MCNMKOu/view?usp=drive_link' },
    { title: 'Rindu Tak Berujung 💌', desc: 'Setiap detik tanpamu terasa lama', url: 'https://drive.google.com/file/d/1XJkc-ky1GKMKQCU5RaCBp0yvtkVrpF_U/view?usp=drive_link' },
    { title: 'Pelangi Setelah Hujan 🌈', desc: 'Seperti kamu, datang membawa warna', url: 'https://drive.google.com/file/d/1MRZEhYiHQfYNWc30_p7GKsjvWL9EKmV4/view?usp=drive_link' },
    { title: 'Cinta Abadi 💞', desc: 'Untuk selamanya, hanya kamu', url: 'https://drive.google.com/file/d/1l2eQv3_F7Ws1UNQhPlZEN2dpn9YTtWCY/view?usp=drive_link' }
];  

    photos.forEach((photo) => {
        const card = document.createElement('div');
        card.className = 'photo-card';
        
        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = photo.title;
        
        img.onerror = function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'photo-placeholder';
            placeholder.innerHTML = `<div>📷</div><small style="font-size: 0.7rem; margin-top: 1rem;">Tempatkan foto: ${photo.url}</small>`;
            card.insertBefore(placeholder, card.firstChild);
        };
        
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.innerHTML = `
            <h3>${photo.title}</h3>
            <p>${photo.desc}</p>
        `;
        
        card.appendChild(img);
        card.appendChild(overlay);
        grid.appendChild(card);
    });

    // Add Letter Section
    const letterSection = document.createElement('div');
    letterSection.className = 'letter-section';
    letterSection.innerHTML = `
        <h2>Surat Cinta Untukmu</h2>
        <div class="letter-content">
            <p>Sayangku Cintaku Cuamiku yang terkasih,</p>
            <p>22 bulan sudah kita bersama, dan rasanya baru kemarin kita memulai perjalanan ini. Setiap hari bersamamu adalah hari terbaik dalam hidupku. Kamu bukan hanya kekasihku, tapi juga sahabat terbaikku, tempat aku pulang, dan alasan aku tersenyum setiap hari.</p>
            <p>Terima kasih telah menjadi cahaya dalam hidupku. Terima kasih untuk setiap tawa yang kita bagi, setiap pelukan yang kamu berikan, dan setiap momen indah yang kita lalui bersama. Kamu mengajarkan aku arti cinta yang sebenarnya - cinta yang tulus, yang menerima, yang mendukung, dan yang tidak pernah berhenti tumbuh.</p>
            <p>Ada begitu banyak hal yang ingin aku katakan, tapi kata-kata rasanya tidak cukup untuk mengungkapkan betapa bersyukurnya aku memiliki dirimu. Kamu adalah jawaban dari doa-doaku, hadiah terindah yang pernah aku terima dari kehidupan.</p>
            <p>Aku berjanji akan selalu ada untukmu, dalam suka maupun duka. Aku berjanji akan terus mencintaimu dengan sepenuh hati, hari demi hari, bulan demi bulan, tahun demi tahun. Karena bersamamu, aku menemukan arti selamanya.</p>
            <p style="font-weight: 600; color: #f5576c; font-size: 1.3rem;">I Love You More Than Words Can Say ❤️</p>
            <div class="letter-signature">
                <p>Dengan seluruh cinta di hatiku,</p>
                <p>Yang selalu dan akan selalu mencintaimu</p>
            </div>
        </div>
    `;
    document.querySelector('.gallery-wrapper').appendChild(letterSection);

    // Add Message Section
    const messageSection = document.createElement('div');
    messageSection.className = 'message-section-gallery';
    messageSection.innerHTML = `
        <h2>Untuk Sayangku Tercinta</h2>
        
        <div class="love-counter-gallery">
            <div class="counter-item-gallery">
                <span class="counter-number-gallery" id="months">22</span>
                <span class="counter-label-gallery">Bulan</span>
            </div>
            <div class="counter-item-gallery">
                <span class="counter-number-gallery" id="days">660</span>
                <span class="counter-label-gallery">Hari</span>
            </div>
            <div class="counter-item-gallery">
                <span class="counter-number-gallery">∞</span>
                <span class="counter-label-gallery">Cinta</span>
            </div>
            <div class="counter-item-gallery">
                <span class="counter-number-gallery">💯</span>
                <span class="counter-label-gallery">Komitmen</span>
            </div>
        </div>

        <p style="font-size: 1.8rem; color: #fc466b; font-weight: 700; margin: 2rem 0;">I Love You Forever & Always ❤️</p>
        
        <div class="whatsapp-section">
            <h3>💌 Apakah Ada Pesan Untukku?</h3>
            <textarea 
                class="message-input" 
                id="userMessage" 
                placeholder="Tulis pesan indahmu disini... ✨"
                maxlength="500"
                oninput="updateCharCount()"
            ></textarea>
            <div class="char-count" id="charCount">0/500 karakter</div>
            <button class="whatsapp-btn" onclick="sendWhatsApp()" id="sendBtn">
                <span class="icon">💬</span>
                Kirim Pesan ke WhatsApp
            </button>
        </div>
    `;
    document.querySelector('.gallery-wrapper').appendChild(messageSection);

    // Animate counters when section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter('months', 22);
                animateCounter('days', 660);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(messageSection);
}

function initTimelineScroll() {
    const timelinePage = document.getElementById('timeline-page');
    
    timelinePage.addEventListener('scroll', function() {
        const scrollTop = this.scrollTop;
        const scrollHeight = this.scrollHeight;
        const clientHeight = this.clientHeight;
        
        // Check if scrolled near bottom (within 100px)
        if (scrollTop + clientHeight >= scrollHeight - 100 && !timelineScrolledToBottom) {
            timelineScrolledToBottom = true;
            showTimelinePopup();
        }
    });
}

function showTimelinePopup() {
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    overlay.id = 'popupOverlay';
    
    // Create popup
    const popup = document.createElement('div');
    popup.className = 'timeline-popup';
    popup.id = 'timelinePopup';
    popup.innerHTML = `
        <h2>Kamu Sayang Aku?</h2>
        <p>Sebelum lanjut, aku mau tahu dulu...</p>
        <div class="popup-buttons">
            <button class="popup-btn yes" onclick="answerYes()">Ya, Sayang Banget! ❤️</button>
            <button class="popup-btn no" onclick="answerNo()">Tidak</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
    
    // Show with animation
    setTimeout(() => {
        overlay.classList.add('show');
        popup.classList.add('show');
    }, 100);
}

function answerYes() {
    const popup = document.getElementById('timelinePopup');
    const overlay = document.getElementById('popupOverlay');
    
    popup.innerHTML = `
        <h2>Aku Juga Sayang Kamu! 💖</h2>
        <p style="font-size: 1.1rem;">Yuk lanjut lihat galeri dan surat cinta dari aku...</p>
    `;
    
    setTimeout(() => {
        popup.classList.remove('show');
        overlay.classList.remove('show');
        setTimeout(() => {
            popup.remove();
            overlay.remove();
            goToPage(5);
        }, 300);
    }, 2000);
}

function answerNo() {
    // Button runs away - animation handled by CSS
    return false;
}

function updatePageIndicator() {
    const indicator = document.getElementById('pageIndicator');
    indicator.innerHTML = '';
    pages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'indicator-dot';
        dot.dataset.label = pageLabels[index];
        if (index < currentPage) dot.classList.add('completed');
        if (index === currentPage) dot.classList.add('active');
        dot.onclick = () => {
            if (index < currentPage) goToPage(index);
        };
        indicator.appendChild(dot);
    });
}

function goToPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < pages.length) {
        document.getElementById(pages[currentPage]).classList.remove('active');
        currentPage = pageIndex;
        document.getElementById(pages[currentPage]).classList.add('active');
        updatePageIndicator();
        
        if (currentPage === 5) {
            timelineScrolledToBottom = false;
        }
    }
}

function startJourney() {
    goToPage(1);
}

function toggleMusic() {
    const btn = document.getElementById('musicBtn');
    if (!musicPlaying) {
        audio.play().catch(e => console.log('Audio play failed:', e));
        audio.loop = true;
        musicPlaying = true;
        btn.classList.add('playing');
        btn.textContent = '🔊';
    } else {
        audio.pause();
        musicPlaying = false;
        btn.classList.remove('playing');
        btn.textContent = '♫';
    }
}

function animateCounter(id, target) {
    const element = document.getElementById(id);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

function updateCharCount() {
    const textarea = document.getElementById('userMessage');
    const charCount = document.getElementById('charCount');
    const length = textarea.value.length;
    charCount.textContent = `${length}/500 karakter`;
    
    if (length > 450) {
        charCount.style.color = '#f44336';
    } else if (length > 400) {
        charCount.style.color = '#ff9800';
    } else {
        charCount.style.color = '#666';
    }
}

function sendWhatsApp() {
    const messageInput = document.getElementById('userMessage');
    const message = messageInput.value.trim();
    
    if (message === '') {
        alert('Yuk tulis pesanmu dulu sebelum dikirim! 💕');
        messageInput.focus();
        return;
    }
    
    const phoneNumber = '6282242836058';
    const fullMessage = `${message}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;
    
    window.open(url, '_blank');
    
    setTimeout(() => {
        if (confirm('Pesan sudah terkirim? ❤️\n\nKlik OK untuk reset form atau Cancel untuk tetap melihat pesan.')) {
            messageInput.value = '';
            updateCharCount();
        }
    }, 2000);
}


// Function untuk create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.getElementById('floatingHearts');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Random position
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        // Random animation delay and duration
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (Math.random() * 5 + 10) + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }, 800); // Create new heart every 800ms
}


// Initialize on load
window.addEventListener('load', () => {
    init();
    createFloatingHearts();
    
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
        if (currentPage === 0) return;
        if (currentPage === 1 && candlesBlown < 22) return;
        if (currentPage === 2) return;
        if (currentPage === 3 && matchedPairs < 8) return;
        if (currentPage === 4 && !timelineScrolledToBottom) return;
        goToPage(currentPage + 1);
    }
    if (e.key === 'ArrowLeft' && currentPage > 1) {
        goToPage(currentPage - 1);
    }
});
