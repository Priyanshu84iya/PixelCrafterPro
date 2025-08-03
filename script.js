class PixelArtEditor {
    constructor() {
        this.canvas = document.getElementById('pixelCanvas');
        this.currentTool = 'paint';
        this.currentColor = '#000000';
        this.gridWidth = 16;
        this.gridHeight = 16;
        this.pixels = [];
        this.zoomLevel = 1;
        this.uploadedImage = null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.createGrid();
        this.updateInfo();
    }

    initializeElements() {
        // Input elements
        this.gridWidthInput = document.getElementById('gridWidth');
        this.gridHeightInput = document.getElementById('gridHeight');
        this.colorPicker = document.getElementById('colorPicker');
        this.colorPreview = document.getElementById('colorPreview');
        this.startPixelInput = document.getElementById('startPixel');
        this.endPixelInput = document.getElementById('endPixel');
        this.imageUpload = document.getElementById('imageUpload');

        // Button elements
        this.createGridBtn = document.getElementById('createGrid');
        this.paintToolBtn = document.getElementById('paintTool');
        this.eraseToolBtn = document.getElementById('eraseTool');
        this.rangeFillBtn = document.getElementById('rangeFill');
        this.convertImageBtn = document.getElementById('convertImage');
        this.downloadBtn = document.getElementById('downloadCanvas');
        this.clearBtn = document.getElementById('clearCanvas');
        this.zoomInBtn = document.getElementById('zoomIn');
        this.zoomOutBtn = document.getElementById('zoomOut');
        this.resetZoomBtn = document.getElementById('resetZoom');

        // Info elements
        this.canvasInfo = document.getElementById('canvasInfo');
        this.totalPixels = document.getElementById('totalPixels');
        this.currentToolInfo = document.getElementById('currentTool');

        // Modal elements
        this.modal = document.getElementById('imagePreviewModal');
        this.previewCanvas = document.getElementById('previewCanvas');
        this.closeModal = document.querySelector('.close');
        this.confirmConvert = document.getElementById('confirmConvert');
        this.cancelConvert = document.getElementById('cancelConvert');
    }

    setupEventListeners() {
        // Canvas settings
        this.createGridBtn.addEventListener('click', () => this.createGrid());
        
        // Tool selection
        this.paintToolBtn.addEventListener('click', () => this.setTool('paint'));
        this.eraseToolBtn.addEventListener('click', () => this.setTool('erase'));
        
        // Color picker
        this.colorPicker.addEventListener('change', (e) => {
            this.currentColor = e.target.value;
            this.colorPreview.style.background = this.currentColor;
        });

        // Range fill
        this.rangeFillBtn.addEventListener('click', () => this.rangeFill());

        // Image upload and conversion
        this.imageUpload.addEventListener('change', (e) => this.handleImageUpload(e));
        this.convertImageBtn.addEventListener('click', () => this.showImagePreview());

        // Canvas actions
        this.downloadBtn.addEventListener('click', () => this.downloadCanvas());
        this.clearBtn.addEventListener('click', () => this.clearCanvas());

        // Zoom controls
        this.zoomInBtn.addEventListener('click', () => this.zoom(1.2));
        this.zoomOutBtn.addEventListener('click', () => this.zoom(0.8));
        this.resetZoomBtn.addEventListener('click', () => this.resetZoom());

        // Modal controls
        this.closeModal.addEventListener('click', () => this.hideImagePreview());
        this.cancelConvert.addEventListener('click', () => this.hideImagePreview());
        this.confirmConvert.addEventListener('click', () => this.convertImageToPixelArt());

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideImagePreview();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    createGrid() {
        this.gridWidth = parseInt(this.gridWidthInput.value) || 16;
        this.gridHeight = parseInt(this.gridHeightInput.value) || 16;
        
        // Clear existing pixels
        this.pixels = [];
        this.canvas.innerHTML = '';
        
        // Calculate appropriate pixel size based on grid dimensions
        const totalPixels = this.gridWidth * this.gridHeight;
        let pixelSize = 25; // Default size
        
        if (totalPixels > 2500) { // 50x50
            pixelSize = 12;
        } else if (totalPixels > 1600) { // 40x40
            pixelSize = 15;
        } else if (totalPixels > 900) { // 30x30
            pixelSize = 18;
        } else if (totalPixels > 400) { // 20x20
            pixelSize = 20;
        }
        
        // Apply pixel size to CSS
        this.canvas.style.setProperty('--pixel-size', `${pixelSize}px`);
        
        // Set grid layout
        this.canvas.style.gridTemplateColumns = `repeat(${this.gridWidth}, 1fr)`;
        this.canvas.style.gridTemplateRows = `repeat(${this.gridHeight}, 1fr)`;
        
        // Add large canvas indicator
        const canvasWrapper = document.querySelector('.canvas-wrapper');
        if (totalPixels > 1600) { // 40x40+
            canvasWrapper.classList.add('large-canvas');
            setTimeout(() => {
                canvasWrapper.classList.remove('large-canvas');
            }, 5000); // Hide after 5 seconds
        } else {
            canvasWrapper.classList.remove('large-canvas');
        }
        
        // Create pixels
        for (let i = 0; i < this.gridWidth * this.gridHeight; i++) {
            const pixel = this.createPixel(i + 1, pixelSize);
            this.canvas.appendChild(pixel);
            this.pixels.push({
                element: pixel,
                number: i + 1,
                color: null,
                filled: false
            });
        }
        
        this.updateInfo();
        this.canvas.classList.add('fade-in');
        
        // Reset zoom when creating new grid
        this.resetZoom();
    }

    createPixel(number, size = 25) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.textContent = number;
        pixel.dataset.number = number;
        
        // Set dynamic size
        pixel.style.width = `${size}px`;
        pixel.style.height = `${size}px`;
        pixel.style.fontSize = `${Math.max(6, size * 0.4)}px`;
        
        // Add event listeners for pixel interaction
        pixel.addEventListener('click', () => this.handlePixelClick(number));
        pixel.addEventListener('mouseenter', (e) => this.handlePixelHover(e, number));
        
        return pixel;
    }

    handlePixelClick(pixelNumber) {
        const pixelData = this.pixels[pixelNumber - 1];
        const pixelElement = pixelData.element;
        
        if (this.currentTool === 'paint') {
            this.paintPixel(pixelData, pixelElement);
        } else if (this.currentTool === 'erase') {
            this.erasePixel(pixelData, pixelElement);
        }
        
        pixelElement.classList.add('pixel-highlight');
        setTimeout(() => pixelElement.classList.remove('pixel-highlight'), 300);
    }

    handlePixelHover(event, pixelNumber) {
        // Show pixel info on hover
        const pixelData = this.pixels[pixelNumber - 1];
        event.target.title = `Pixel #${pixelNumber}${pixelData.filled ? ` - Color: ${pixelData.color}` : ''}`;
    }

    paintPixel(pixelData, pixelElement) {
        pixelData.color = this.currentColor;
        pixelData.filled = true;
        pixelElement.style.backgroundColor = this.currentColor;
        pixelElement.classList.add('filled');
        pixelElement.textContent = ''; // Hide number when filled
    }

    erasePixel(pixelData, pixelElement) {
        pixelData.color = null;
        pixelData.filled = false;
        pixelElement.style.backgroundColor = '';
        pixelElement.classList.remove('filled');
        pixelElement.textContent = pixelData.number; // Show number when erased
    }

    setTool(tool) {
        this.currentTool = tool;
        
        // Update button states
        document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tool="${tool}"]`).classList.add('active');
        
        // Update info
        this.currentToolInfo.textContent = tool.charAt(0).toUpperCase() + tool.slice(1);
    }

    rangeFill() {
        const startPixel = parseInt(this.startPixelInput.value);
        const endPixel = parseInt(this.endPixelInput.value);
        const direction = document.querySelector('input[name="fillDirection"]:checked').value;
        
        if (!startPixel || !endPixel || startPixel < 1 || endPixel < 1 || 
            startPixel > this.pixels.length || endPixel > this.pixels.length) {
            alert('Please enter valid pixel numbers!');
            return;
        }
        
        if (startPixel > endPixel) {
            alert('Start pixel must be less than or equal to end pixel!');
            return;
        }
        
        const pixelsToFill = this.calculateRangePixels(startPixel, endPixel, direction);
        
        pixelsToFill.forEach(pixelNumber => {
            const pixelData = this.pixels[pixelNumber - 1];
            const pixelElement = pixelData.element;
            this.paintPixel(pixelData, pixelElement);
            
            // Add animation
            setTimeout(() => {
                pixelElement.classList.add('pixel-highlight');
                setTimeout(() => pixelElement.classList.remove('pixel-highlight'), 300);
            }, (pixelNumber - startPixel) * 50);
        });
    }

    calculateRangePixels(start, end, direction) {
        const pixels = [];
        
        if (direction === 'horizontal') {
            // Fill horizontally (row by row)
            const startRow = Math.floor((start - 1) / this.gridWidth);
            const startCol = (start - 1) % this.gridWidth;
            const endRow = Math.floor((end - 1) / this.gridWidth);
            const endCol = (end - 1) % this.gridWidth;
            
            for (let row = startRow; row <= endRow; row++) {
                const colStart = (row === startRow) ? startCol : 0;
                const colEnd = (row === endRow) ? endCol : this.gridWidth - 1;
                
                for (let col = colStart; col <= colEnd; col++) {
                    pixels.push(row * this.gridWidth + col + 1);
                }
            }
        } else {
            // Fill vertically (column by column)
            const startRow = Math.floor((start - 1) / this.gridWidth);
            const startCol = (start - 1) % this.gridWidth;
            const endRow = Math.floor((end - 1) / this.gridWidth);
            const endCol = (end - 1) % this.gridWidth;
            
            for (let col = startCol; col <= endCol; col++) {
                const rowStart = (col === startCol) ? startRow : 0;
                const rowEnd = (col === endCol) ? endRow : this.gridHeight - 1;
                
                for (let row = rowStart; row <= rowEnd; row++) {
                    pixels.push(row * this.gridWidth + col + 1);
                }
            }
        }
        
        return pixels;
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.uploadedImage = img;
                this.convertImageBtn.disabled = false;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    showImagePreview() {
        if (!this.uploadedImage) return;
        
        const ctx = this.previewCanvas.getContext('2d');
        
        // Calculate preview size maintaining aspect ratio
        const maxSize = 400;
        const ratio = Math.min(maxSize / this.uploadedImage.width, maxSize / this.uploadedImage.height);
        const previewWidth = this.uploadedImage.width * ratio;
        const previewHeight = this.uploadedImage.height * ratio;
        
        this.previewCanvas.width = previewWidth;
        this.previewCanvas.height = previewHeight;
        
        ctx.drawImage(this.uploadedImage, 0, 0, previewWidth, previewHeight);
        
        this.modal.style.display = 'block';
    }

    hideImagePreview() {
        this.modal.style.display = 'none';
    }

    convertImageToPixelArt() {
        if (!this.uploadedImage) return;
        
        // Create a temporary canvas for processing
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        tempCanvas.width = this.gridWidth;
        tempCanvas.height = this.gridHeight;
        
        // Draw scaled image
        tempCtx.drawImage(this.uploadedImage, 0, 0, this.gridWidth, this.gridHeight);
        
        // Get pixel data
        const imageData = tempCtx.getImageData(0, 0, this.gridWidth, this.gridHeight);
        const data = imageData.data;
        
        // Convert to pixel art
        for (let i = 0; i < this.pixels.length; i++) {
            const pixelIndex = i * 4;
            const r = data[pixelIndex];
            const g = data[pixelIndex + 1];
            const b = data[pixelIndex + 2];
            const alpha = data[pixelIndex + 3];
            
            if (alpha > 0) {
                const color = this.rgbToHex(r, g, b);
                const pixelData = this.pixels[i];
                const pixelElement = pixelData.element;
                
                pixelData.color = color;
                pixelData.filled = true;
                pixelElement.style.backgroundColor = color;
                pixelElement.classList.add('filled');
                pixelElement.textContent = '';
            }
        }
        
        this.hideImagePreview();
    }

    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    downloadCanvas() {
        // Create a high-resolution canvas for export
        const exportCanvas = document.createElement('canvas');
        const exportCtx = exportCanvas.getContext('2d');
        
        const pixelSize = 20;
        const borderSize = 1;
        
        exportCanvas.width = this.gridWidth * (pixelSize + borderSize) + borderSize;
        exportCanvas.height = this.gridHeight * (pixelSize + borderSize) + borderSize;
        
        // Fill background
        exportCtx.fillStyle = '#ffffff';
        exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
        
        // Draw grid lines
        exportCtx.fillStyle = '#e2e8f0';
        for (let x = 0; x <= this.gridWidth; x++) {
            exportCtx.fillRect(x * (pixelSize + borderSize), 0, borderSize, exportCanvas.height);
        }
        for (let y = 0; y <= this.gridHeight; y++) {
            exportCtx.fillRect(0, y * (pixelSize + borderSize), exportCanvas.width, borderSize);
        }
        
        // Draw pixels
        this.pixels.forEach((pixelData, index) => {
            if (pixelData.filled) {
                const row = Math.floor(index / this.gridWidth);
                const col = index % this.gridWidth;
                const x = col * (pixelSize + borderSize) + borderSize;
                const y = row * (pixelSize + borderSize) + borderSize;
                
                exportCtx.fillStyle = pixelData.color;
                exportCtx.fillRect(x, y, pixelSize, pixelSize);
            }
        });
        
        // Download
        const link = document.createElement('a');
        link.download = `pixel-art-${this.gridWidth}x${this.gridHeight}-${Date.now()}.png`;
        link.href = exportCanvas.toDataURL();
        link.click();
    }

    clearCanvas() {
        if (confirm('Are you sure you want to clear the entire canvas?')) {
            this.pixels.forEach(pixelData => {
                this.erasePixel(pixelData, pixelData.element);
            });
        }
    }

    zoom(factor) {
        this.zoomLevel *= factor;
        this.zoomLevel = Math.max(0.5, Math.min(3, this.zoomLevel)); // Limit zoom range
        this.canvas.style.transform = `scale(${this.zoomLevel})`;
    }

    resetZoom() {
        this.zoomLevel = 1;
        this.canvas.style.transform = 'scale(1)';
    }

    updateInfo() {
        this.canvasInfo.textContent = `${this.gridWidth}×${this.gridHeight}`;
        this.totalPixels.textContent = this.gridWidth * this.gridHeight;
        
        // Update range input max values
        const maxPixel = this.gridWidth * this.gridHeight;
        this.startPixelInput.max = maxPixel;
        this.endPixelInput.max = maxPixel;
        this.endPixelInput.placeholder = maxPixel.toString();
    }

    handleKeyboardShortcuts(event) {
        if (event.ctrlKey || event.metaKey) {
            switch (event.key.toLowerCase()) {
                case 'z':
                    event.preventDefault();
                    // TODO: Implement undo functionality
                    break;
                case 's':
                    event.preventDefault();
                    this.downloadCanvas();
                    break;
                case 'n':
                    event.preventDefault();
                    this.clearCanvas();
                    break;
            }
        }
        
        // Tool shortcuts
        switch (event.key.toLowerCase()) {
            case 'p':
                this.setTool('paint');
                break;
            case 'e':
                this.setTool('erase');
                break;
            case '+':
            case '=':
                event.preventDefault();
                this.zoom(1.2);
                break;
            case '-':
                event.preventDefault();
                this.zoom(0.8);
                break;
            case '0':
                event.preventDefault();
                this.resetZoom();
                break;
        }
    }
}

// Enhanced features for future implementation
class PixelArtEditorAdvanced extends PixelArtEditor {
    constructor() {
        super();
        this.history = [];
        this.historyIndex = -1;
        this.maxHistorySize = 50;
        this.saveState();
    }

    saveState() {
        // Remove any states after current index (for branching undo/redo)
        this.history = this.history.slice(0, this.historyIndex + 1);
        
        // Create state snapshot
        const state = {
            pixels: this.pixels.map(p => ({
                number: p.number,
                color: p.color,
                filled: p.filled
            })),
            timestamp: Date.now()
        };
        
        this.history.push(state);
        this.historyIndex++;
        
        // Limit history size
        if (this.history.length > this.maxHistorySize) {
            this.history.shift();
            this.historyIndex--;
        }
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.restoreState(this.history[this.historyIndex]);
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.restoreState(this.history[this.historyIndex]);
        }
    }

    restoreState(state) {
        state.pixels.forEach((pixelState, index) => {
            const pixelData = this.pixels[index];
            const pixelElement = pixelData.element;
            
            pixelData.color = pixelState.color;
            pixelData.filled = pixelState.filled;
            
            if (pixelState.filled) {
                pixelElement.style.backgroundColor = pixelState.color;
                pixelElement.classList.add('filled');
                pixelElement.textContent = '';
            } else {
                pixelElement.style.backgroundColor = '';
                pixelElement.classList.remove('filled');
                pixelElement.textContent = pixelState.number;
            }
        });
    }

    // Override methods to save state
    paintPixel(pixelData, pixelElement) {
        super.paintPixel(pixelData, pixelElement);
        this.saveState();
    }

    erasePixel(pixelData, pixelElement) {
        super.erasePixel(pixelData, pixelElement);
        this.saveState();
    }

    handleKeyboardShortcuts(event) {
        if (event.ctrlKey || event.metaKey) {
            switch (event.key.toLowerCase()) {
                case 'z':
                    event.preventDefault();
                    if (event.shiftKey) {
                        this.redo();
                    } else {
                        this.undo();
                    }
                    break;
                case 'y':
                    event.preventDefault();
                    this.redo();
                    break;
                default:
                    super.handleKeyboardShortcuts(event);
            }
        } else {
            super.handleKeyboardShortcuts(event);
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const editor = new PixelArtEditorAdvanced();
    
    // Add welcome message
    console.log(`
🎨 PixelCrafter Pro - Advanced Pixel Art Editor
==============================================

Keyboard Shortcuts:
- P: Paint tool
- E: Erase tool
- +/-: Zoom in/out
- 0: Reset zoom
- Ctrl+S: Download canvas
- Ctrl+Z: Undo
- Ctrl+Shift+Z or Ctrl+Y: Redo
- Ctrl+N: Clear canvas

Features:
✅ Custom grid sizes
✅ Color picker with preview
✅ Pixel numbering system
✅ Range fill (horizontal/vertical)
✅ Image to pixel art conversion
✅ Download as PNG
✅ Erase tool with auto number restore
✅ Zoom controls
✅ Undo/Redo system
✅ Keyboard shortcuts
✅ Responsive design

Created with ❤️ for pixel art enthusiasts!
    `);
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PixelArtEditor, PixelArtEditorAdvanced };
}
