# 🎨 PixelCrafter Pro - Advanced Pixel Art Editor

A fully functional, professional-grade pixel art editor built with vanilla HTML, CSS, and JavaScript. Create stunning pixel art with powerful tools and an intuitive interface.

![PixelCrafter Pro](https://img.shields.io/badge/PixelCrafter-Pro-blue?style=for-the-badge&logo=artstation)

## ✨ Features

### 🎨 **Color Picker Tool**
- Full spectrum color picker with live preview
- Instant color application to individual pixels
- Visual color preview box for current selection

### 📐 **Custom Grid Size**
- Create any row × column size (1×1 to 100×100)
- Dynamic grid generation with smooth animations
- Real-time canvas information display

### 🔢 **Pixel Numbering System**
- Every pixel shows its unique number for easy reference
- Sequential numbering from 1 to total pixels
- Numbers automatically hide when pixels are filled

### 🟥 **Advanced Range Fill Feature**
- **Start & End Pixel Selection**: Enter any pixel number range
- **Directional Fill Options**:
  - **Horizontal**: Fill left to right, row by row
  - **Vertical**: Fill top to bottom, column by column
- **Visual Fill Animation**: Watch pixels fill with smooth animations
- **Smart Range Calculation**: Automatically handles complex ranges

### 🧹 **Intelligent Erase Tool**
- Remove colors from pixels with one click
- Pixel numbers automatically reappear when erased
- Preserves original pixel structure

### 👻 **Auto-hide Pixel Numbers**
- Numbers disappear when pixels are filled
- Clean, professional appearance
- Numbers return when pixels are erased

### 🖼️ **Image to Pixel Art Generator**
- **Upload any image** (PNG, JPG, GIF, etc.)
- **Preview before conversion** with modal dialog
- **Automatic scaling** to match grid size
- **Color sampling** maintains image essence
- **One-click conversion** to pixel art

### 📥 **Professional Download Feature**
- **High-quality PNG export** (20px per pixel)
- **Includes grid lines** for professional look
- **Full canvas capture** exactly as displayed
- **Automatic filename** with timestamp and dimensions
- **One-click download** with no setup required

### 🔧 **Advanced Tools**

#### **Zoom Controls**
- Zoom in/out with smooth scaling
- Reset zoom to original size
- Visual zoom buttons with hover effects

#### **Keyboard Shortcuts**
- `P`: Switch to Paint tool
- `E`: Switch to Erase tool
- `+/-`: Zoom in/out
- `0`: Reset zoom
- `Ctrl+S`: Download canvas
- `Ctrl+Z`: Undo last action
- `Ctrl+Shift+Z` or `Ctrl+Y`: Redo action
- `Ctrl+N`: Clear entire canvas

#### **Undo/Redo System**
- Full history tracking (up to 50 states)
- Branch-aware undo/redo
- Automatic state saving on every change

## 🚀 Getting Started

### Quick Start
1. Clone or download the project
2. Open `index.html` in any modern web browser
3. Start creating pixel art immediately!

### No Installation Required
- Pure HTML, CSS, and JavaScript
- No dependencies or build tools
- Works offline once loaded
- Compatible with all modern browsers

## 📱 Responsive Design

- **Desktop**: Full-featured interface with side panel
- **Tablet**: Optimized layout with touch controls
- **Mobile**: Simplified interface, stacked layout
- **Touch-friendly**: Large buttons and touch targets

## 🎯 How to Use

### Creating Your First Pixel Art

1. **Set Canvas Size**
   - Enter desired width and height (e.g., 16×16, 32×32)
   - Click "Create Canvas" to generate the grid

2. **Choose Your Tool**
   - Select Paint tool (brush icon) for drawing
   - Select Erase tool (eraser icon) for removing

3. **Pick a Color**
   - Use the color picker to select any color
   - Preview shows your current selection

4. **Start Drawing**
   - Click individual pixels to paint/erase
   - Use range fill for larger areas

### Advanced Techniques

#### **Range Fill**
1. Enter start pixel number (e.g., 1)
2. Enter end pixel number (e.g., 16)
3. Choose direction (horizontal/vertical)
4. Click "Fill Range" to apply

#### **Image Conversion**
1. Click "Upload Image" and select a file
2. Preview the image in the modal
3. Click "Convert" to transform to pixel art
4. Edit the result as needed

#### **Professional Export**
1. Complete your pixel art
2. Click "Download as PNG"
3. Get a high-quality image file with grid lines

## 🎨 Design Features

### **Modern UI/UX**
- Glassmorphism design with backdrop blur
- Smooth animations and transitions
- Intuitive icon-based navigation
- Professional color scheme

### **Visual Feedback**
- Hover effects on all interactive elements
- Pixel highlighting on interaction
- Tool state indicators
- Real-time info updates

### **Accessibility**
- High contrast design
- Keyboard navigation support
- Screen reader friendly
- Responsive touch targets

## 🔮 Bonus Features Included

### **Zoom System**
- Smooth scaling with transform animations
- Multiple zoom levels (0.5x to 3x)
- Center-based zoom origin
- Reset zoom functionality

### **Canvas Information**
- Live canvas dimensions display
- Total pixel count
- Current tool indicator
- Dynamic range input validation

### **Advanced State Management**
- Automatic state saving
- History-based undo/redo
- Memory-efficient storage
- State branching support

## 🌟 Technical Highlights

### **Performance Optimized**
- Efficient DOM manipulation
- Event delegation for pixel interactions
- Minimal memory footprint
- Smooth 60fps animations

### **Clean Architecture**
- Object-oriented design
- Modular code structure
- Extensible class system
- Well-documented functions

### **Browser Compatibility**
- Modern ES6+ JavaScript
- CSS Grid and Flexbox
- Canvas API integration
- File API support

## 📂 Project Structure

```
PixelCrafterPro/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and animations
├── script.js           # Core functionality and classes
└── README.md           # This documentation
```

## 🎨 Customization

### **Colors and Themes**
- Modify CSS custom properties for theming
- Change gradient backgrounds
- Adjust color schemes

### **Grid Sizes**
- Modify max grid size in HTML inputs
- Adjust pixel size in CSS
- Change zoom limits in JavaScript

### **Features**
- Add new tools by extending the base class
- Implement additional export formats
- Add more fill patterns

## 🐛 Troubleshooting

### **Common Issues**

**Canvas not appearing:**
- Ensure JavaScript is enabled
- Check browser console for errors
- Try refreshing the page

**Image upload not working:**
- Verify file format (PNG, JPG, GIF supported)
- Check file size (very large images may cause issues)
- Ensure browser supports File API

**Download not working:**
- Check if browser blocks downloads
- Ensure popup blocker is disabled
- Try right-click and "Save as"

## 🚀 Future Enhancements

### **Planned Features**
- [ ] Diagonal fill patterns
- [ ] Custom brush shapes
- [ ] Layer system
- [ ] Animation timeline
- [ ] Collaboration features
- [ ] Cloud save/load
- [ ] More export formats (GIF, SVG)
- [ ] Advanced dithering options

### **Performance Improvements**
- [ ] WebGL renderer for large canvases
- [ ] Virtual scrolling for huge grids
- [ ] Web Workers for image processing
- [ ] IndexedDB for project storage

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Bugs**: Use GitHub issues for bug reports
2. **Suggest Features**: Share your ideas for new features
3. **Submit PRs**: Fork, create a feature branch, and submit PR
4. **Improve Docs**: Help make documentation clearer

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by classic pixel art tools
- Designed for artists and developers
- Community-driven development

---

### 🔥 **Ready to Create Amazing Pixel Art?**

Open `index.html` in your browser and start crafting your masterpiece!

**Happy Pixel Crafting!** 🎨✨
