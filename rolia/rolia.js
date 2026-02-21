// Rolia JavaScript File
console.log("Rolia");

// Create audio context for sound effects
let audioContext;

// Initialize audio context on first user interaction
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Play click sound effect
function playClickSound() {
    initAudio();
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// You can add more JavaScript code here
function init() {
    console.log("Rolia application initialized");
    
    // Add click sound to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            playClickSound();
            
            // Smooth scroll to section after a short delay
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });
    });
    
    // Add click sound to demo box
    const demoBox = document.getElementById('demoBox');
    if (demoBox) {
        demoBox.addEventListener('click', function() {
            playClickSound();
            
            // Visual feedback
            this.style.backgroundColor = '#007bff';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 200);
        });
    }
}

// Run initialization when the script loads
init();
