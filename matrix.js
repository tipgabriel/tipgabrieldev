// Matrix Rain Effect - Continuous Animation
class MatrixRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.animationFrame = null;
        
        // Matrix characters (including some that look like Japanese/Chinese)
        this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?";
        this.fontSize = 16;
        
        // Initialize
        this.setupCanvas();
        this.setupDrops();
        this.start();
        
        // Handle resize
        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.setupDrops();
        });
    }
    
    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        const devicePixelRatio = window.devicePixelRatio || 1;
        
        // Set actual size in memory (scaled to account for extra pixel density)
        this.canvas.width = rect.width * devicePixelRatio;
        this.canvas.height = rect.height * devicePixelRatio;
        
        // Scale the drawing context so everything will work at the higher ratio
        this.ctx.scale(devicePixelRatio, devicePixelRatio);
        
        // Scale back down using CSS
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.width = rect.width;
        this.height = rect.height;
    }
    
    setupDrops() {
        // Number of columns
        this.columns = Math.floor(this.width / this.fontSize);
        
        // Array to store the y position of each drop
        this.drops = new Array(this.columns).fill(0);
        
        // Initialize with random starting positions to create staggered effect
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }
    
    draw() {
        // Create fade effect with semi-transparent black background
        // This creates the trailing effect - reduced opacity for subtlety
        this.ctx.fillStyle = 'rgba(1, 1, 1, 0.03)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Set font
        this.ctx.font = `${this.fontSize}px 'Courier New', monospace`;
        
        // Matrix colors - different shades of blue/cyan for theme consistency
        const colors = [
            '#00bfff',  // Deep sky blue
            '#0080ff',  // Blue
            '#00a3ff',  // Light blue
            '#00d4ff',  // Cyan
            '#4da6ff',  // Lighter blue
            '#0066ff',  // Royal blue
            '#1e90ff',  // Dodger blue
            '#00ced1'   // Dark turquoise
        ];
        
        // Draw the characters
        for (let i = 0; i < this.columns; i++) {
            // Pick a random character
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            
            // Pick a random color from our blue palette
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Create brightness variation for depth effect
            const brightness = Math.random() * 0.6 + 0.4; // 0.4 to 1.0
            this.ctx.fillStyle = color;
            this.ctx.globalAlpha = brightness;
            
            // Calculate position
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            // Only draw if character is within canvas bounds
            if (y > 0 && y < this.height) {
                this.ctx.fillText(char, x, y);
            }
            
            // Reset alpha for next character
            this.ctx.globalAlpha = 1;
            
            // Move drop down
            if (y > this.height && Math.random() > 0.975) {
                // Reset to top with some randomness for natural look
                this.drops[i] = Math.random() * -20;
            } else {
                // Vary the drop speed slightly for more organic movement
                this.drops[i] += Math.random() * 0.5 + 0.5;
            }
        }
        
        // Continue animation continuously
        this.animationFrame = requestAnimationFrame(() => this.draw());
    }
    
    start() {
        this.draw();
    }
    
    stop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    
    // Method to adjust opacity based on theme
    updateOpacity(opacity) {
        this.canvas.style.opacity = opacity;
    }
}

// Initialize Matrix Rain when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize matrix effect
    window.matrixRain = new MatrixRain('matrix-canvas');
    
    // Set initial opacity based on theme
    const isLight = document.documentElement.classList.contains('light');
    if (window.matrixRain) {
        window.matrixRain.updateOpacity(isLight ? 0.2 : 0.3);
    }
});
