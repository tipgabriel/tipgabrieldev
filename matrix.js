// Matrix Rain Effect - Continuous Animation with Slower Speed
class MatrixRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(\'Matrix canvas not found\');
            return;
        }
        
        this.ctx = this.canvas.getContext(\'2d\');
        this.animationFrame = null;
        
        // Matrix characters (including some that look like Japanese/Chinese)
        this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
        this.fontSize = 14;
        this.dropSpeed = 0.3; // Slower speed
        
        // Initialize
        this.setupCanvas();
        this.setupDrops();
        this.start();
        
        // Handle resize
        window.addEventListener(\'resize\', () => {
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
        this.canvas.style.width = rect.width + \'px\';
        this.canvas.style.height = rect.height + \'px\';
        
        this.width = rect.width;
        this.height = rect.height;
        
        console.log(\'Matrix canvas setup:\', this.width, \'x\', this.height);
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
        
        console.log(\'Matrix drops setup:\', this.columns, \'columns\');
    }
    
    draw() {
        // Create fade effect with semi-transparent background
        // Darker fade for better visibility of blue characters
        this.ctx.fillStyle = \'rgba(1, 1, 1, 0.08)\';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Set font
        this.ctx.font = `${this.fontSize}px \'Courier New\', monospace`;
        
        // Matrix colors - emphasis on bright blues for visibility
        const colors = [
            \'#00ffff\',  // Cyan - bright
            \'#00bfff\',  // Deep sky blue
            \'#0080ff\',  // Blue
            \'#00a3ff\',  // Light blue
            \'#1e90ff\',  // Dodger blue
            \'#4169e1\',  // Royal blue
            \'#0066ff\',  // Blue
            \'#00ced1\'   // Dark turquoise
        ];
        
        // Draw the characters
        for (let i = 0; i < this.columns; i++) {
            // Pick a random character
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            
            // Pick a random color from our blue palette
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Create brightness variation for depth effect
            const brightness = Math.random() * 0.7 + 0.5; // 0.5 to 1.2 for better visibility
            this.ctx.fillStyle = color;
            this.ctx.globalAlpha = brightness;
            
            // Calculate position
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            // Only draw if character is within canvas bounds
            if (y > 0 && y < this.height + this.fontSize) {
                this.ctx.fillText(char, x, y);
            }
            
            // Reset alpha for next character
            this.ctx.globalAlpha = 1;
            
            // Move drop down with slower speed
            if (y > this.height && Math.random() > 0.98) {
                // Reset to top with some randomness for natural look
                this.drops[i] = Math.random() * -50;
            } else {
                // Slower drop speed for more cinematic effect
                this.drops[i] += this.dropSpeed + (Math.random() * 0.2);
            }
        }
        
        // Continue animation continuously
        this.animationFrame = requestAnimationFrame(() => this.draw());
    }
    
    start() {
        console.log(\'Starting Matrix animation\');
        this.draw();
    }
    
    stop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

// Initialize Matrix Rain when DOM is loaded
document.addEventListener(\'DOMContentLoaded\', function() {
    console.log(\'DOM loaded, initializing Matrix Rain\');
    
    // Wait a bit for canvas to be properly rendered
    setTimeout(() => {
        window.matrixRain = new MatrixRain(\'matrix-canvas\');
    }, 100);
});
