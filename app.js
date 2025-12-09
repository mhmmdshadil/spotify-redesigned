console.log("Spotify Redesigned Initialized");
// Future logic for player controls, dynamic greeting, etc.
document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Greeting
    const greetingElement = document.querySelector('.greeting');
    const hour = new Date().getHours();
    let greetingText = 'Good Morning';
    if (hour >= 12 && hour < 17) greetingText = 'Good Afternoon';
    else if (hour >= 17) greetingText = 'Good Evening';
    greetingElement.textContent = greetingText;
    // 2. Play/Pause Logic (Global & Cards)
    const mainPlayBtn = document.getElementById('playPauseBtn');
    const mainIcon = mainPlayBtn.querySelector('ion-icon');
    let isPlaying = false;
    function togglePlay() {
        isPlaying = !isPlaying;
        const iconName = isPlaying ? 'pause-circle' : 'play-circle';
        mainIcon.setAttribute('name', iconName);
        // Simulating playback progress
        if (isPlaying) startProgress();
        else stopProgress();
    }
    mainPlayBtn.addEventListener('click', togglePlay);
    // Card play buttons interaction
    document.querySelectorAll('.play-btn-card, .play-btn-hover').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click
            if (!isPlaying) togglePlay();
            // In a real app, this would switch the track
        });
    });
    // 3. Progress Bar Simulation
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.time.current');
    let progress = 30;
    let progressInterval;
    function startProgress() {
        if (progressInterval) clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            progress += 0.1;
            if (progress > 100) progress = 0;
            updateProgressUI();
        }, 100);
    }
    function stopProgress() {
        clearInterval(progressInterval);
    }
    function updateProgressUI() {
        progressBar.style.width = `${progress}%`;
        // Simulating time update (rough calc)
        const totalSeconds = 243; // 4:03
        const currentSeconds = Math.floor((progress / 100) * totalSeconds);
        const mins = Math.floor(currentSeconds / 60);
        const secs = currentSeconds % 60;
        currentTimeEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    // 4. Interactive Progress Bar Click
    const progressContainer = document.querySelector('.progress-container');
    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        progress = (clickX / width) * 100;
        updateProgressUI();
    });
    // 5. Like Button Toggle
    const likeBtn = document.querySelector('.like-btn');
    likeBtn.addEventListener('click', () => {
        const icon = likeBtn.querySelector('ion-icon');
        if (icon.getAttribute('name') === 'heart-outline') {
            icon.setAttribute('name', 'heart');
            icon.style.color = '#1ed760';
        } else {
            icon.setAttribute('name', 'heart-outline');
            icon.style.color = 'inherit';
        }
    });
});
