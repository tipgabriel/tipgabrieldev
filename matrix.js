// Matrix Rain Effect
class MatrixRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.isActive = true;
        this.animationFrame = null;
        
        // Matrix characters (including some that look like Japanese/Chinese)
        this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?";
        this.fontSize = 16;
        
        // Initialize
        this.setupCanvas();
        this.setupDrops();
        this.start();
        
        // Handle resize
        window.addEventListener('resize', () => this.setupCanvas());
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
        
        this.setupDrops();
    }
    
    setupDrops() {
        // Number of columns
        this.columns = Math.floor(this.width / this.fontSize);
        
        // Array to store the y position of each drop
        this.drops = new Array(this.columns).fill(0);
        
        // Initialize with random starting positions
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }
    
    draw() {
        // Create fade effect with semi-transparent black background
        // This creates the trailing effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Set font
        this.ctx.font = `${this.fontSize}px 'Courier New', monospace`;
        
        // Matrix colors - different shades of blue/cyan
        const colors = [
            '#00bfff',  // Deep sky blue
            '#0080ff',  // Blue
            '#00a3ff',  // Light blue
            '#00d4ff',  // Cyan
            '#4da6ff',  // Lighter blue
            '#0066ff'   // Royal blue
        ];
        
        // Draw the characters
        for (let i = 0; i < this.columns; i++) {
            // Pick a random character
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            
            // Pick a random color from our palette
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Create brightness variation
            const brightness = Math.random() * 0.5 + 0.5; // 0.5 to 1
            this.ctx.fillStyle = color;
            this.ctx.globalAlpha = brightness;
            
            // Calculate position
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            // Draw character
            this.ctx.fillText(char, x, y);
            
            // Reset alpha
            this.ctx.globalAlpha = 1;
            
            // Move drop down
            if (y > this.height && Math.random() > 0.975) {
                // Reset to top with some randomness
                this.drops[i] = Math.random() * -10;
            } else {
                this.drops[i]++;
            }
        }
        
        // Continue animation if active
        if (this.isActive) {
            this.animationFrame = requestAnimationFrame(() => this.draw());
        }
    }
    
    start() {
        if (!this.isActive) {
            this.isActive = true;
            this.draw();
        }
    }
    
    stop() {
        this.isActive = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    
    toggle() {
        if (this.isActive) {
            this.stop();
        } else {
            this.start();
        }
        return this.isActive;
    }
}

// Initialize Matrix Rain when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.matrixRain = new MatrixRain('matrix-canvas');
});
