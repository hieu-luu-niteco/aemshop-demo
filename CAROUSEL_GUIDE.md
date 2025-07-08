# Carousel Block Usage Guide

## ✅ **Carousel Fixed and Ready!**

I've completely fixed the carousel block with professional functionality and styling.

### 🎯 **Features Now Working:**
- **✅ Fixed JavaScript** - Proper imports and logic
- **✅ Navigation Buttons** - Previous/Next with custom text from placeholders
- **✅ Dot Navigation** - Click dots to jump to specific slides
- **✅ Touch/Swipe Support** - Mobile-friendly gestures
- **✅ Keyboard Navigation** - Arrow keys for accessibility
- **✅ Auto-Advance** - Optional automatic slideshow
- **✅ Responsive Design** - Works on all screen sizes
- **✅ Professional Styling** - Modern carousel appearance

---

## 📝 **How to Use the Carousel Block**

### **Method 1: Using Microsoft Word/Google Docs**

Create your content with this structure:

```
Carousel

[Image 1] | # Featured Product
           | Discover our latest premium headphones with crystal-clear sound
           | [Button: Shop Now | /products/headphones]

[Image 2] | ## New Collection
           | Explore our summer fashion collection
           | [Button: Browse | /collections/summer]

[Image 3] | ### Special Offer
           | Get 30% off on all electronics this week
           | [Button: Shop Sale | /sale]
```

### **Method 2: HTML Structure**

```html
<div class="carousel">
  <div>
    <div class="slide-image">
      <img src="/images/product1.jpg" alt="Product 1">
    </div>
    <div class="slide-text">
      <h2>Featured Product</h2>
      <p>Discover our latest premium headphones with crystal-clear sound</p>
      <p class="button-container">
        <a href="/products/headphones" class="button">Shop Now</a>
      </p>
    </div>
  </div>
  
  <div>
    <div class="slide-image">
      <img src="/images/collection1.jpg" alt="New Collection">
    </div>
    <div class="slide-text">
      <h2>New Collection</h2>
      <p>Explore our summer fashion collection</p>
      <p class="button-container">
        <a href="/collections/summer" class="button">Browse</a>
      </p>
    </div>
  </div>
</div>
```

---

## 🎨 **Carousel Content Structure**

Each slide supports this layout:
- **Left Column:** Image or visual content
- **Right Column:** Text content (headline, description, CTA button)

### **Supported Content:**
- **Images:** JPG, PNG, WebP
- **Headlines:** H1, H2, H3 tags
- **Descriptions:** Paragraph text
- **Buttons:** Call-to-action links
- **Any HTML content**

---

## 🔧 **Customization Options**

### **Auto-Advance Settings**
Add these attributes to your carousel block:

```html
<!-- Enable auto-advance (default: true) -->
<div class="carousel" data-auto-advance="true" data-auto-advance-delay="5000">

<!-- Disable auto-advance -->
<div class="carousel" data-auto-advance="false">
```

### **Button Text Customization**
The carousel uses placeholders for button text. Add these to your placeholders file:

```json
{
  "btnNxt": "Next",
  "btnPre": "Previous"
}
```

### **Styling Variations**

#### **Compact Carousel:**
```html
<div class="carousel compact">
  <!-- Your content -->
</div>
```

#### **Full-Width Carousel:**
```html
<div class="carousel full-width">
  <!-- Your content -->
</div>
```

#### **Image-Only Carousel:**
```html
<div class="carousel image-only">
  <!-- Only images, no text -->
</div>
```

---

## 🚀 **Testing Your Carousel**

### **✅ Navigation Tests:**
- Click Previous/Next buttons
- Click dot navigation
- Use keyboard arrow keys
- Swipe on mobile devices

### **✅ Auto-Advance Tests:**
- Wait to see automatic progression
- Hover to pause auto-advance
- Check tab visibility behavior

### **✅ Responsive Tests:**
- Test on mobile, tablet, desktop
- Verify layout switches to vertical on mobile
- Check touch gestures work

---

## 📱 **Mobile Behavior**

- **Layout:** Switches to vertical (image on top, text below)
- **Navigation:** Touch-friendly buttons and dots
- **Gestures:** Swipe left/right to navigate
- **Auto-sizing:** Responsive height and font sizes

---

## 🎯 **Best Practices**

### **Content Guidelines:**
- **Images:** Use consistent aspect ratios
- **Text:** Keep headlines under 8 words
- **Buttons:** Use action-oriented text
- **Slides:** Limit to 3-5 slides for best UX

### **Performance:**
- Optimize images (under 500KB each)
- Use appropriate image formats
- Test loading times

### **Accessibility:**
- Include alt text for images
- Use proper heading hierarchy
- Ensure keyboard navigation works
- Test with screen readers

---

## 🔧 **Troubleshooting**

### **Carousel Not Working:**
- Check browser console for errors
- Verify all images load correctly
- Ensure JavaScript is enabled

### **Buttons Not Showing:**
- Check placeholders are configured
- Verify button text is set
- Clear browser cache

### **Mobile Issues:**
- Test on actual devices
- Check touch event handling
- Verify responsive breakpoints

---

## 🆚 **Carousel vs Slider Comparison**

| Feature | Carousel Block | Slider Block |
|---------|----------------|--------------|
| **Layout** | Image + Text side-by-side | Full-screen background images |
| **Use Case** | Product showcases, content cards | Hero banners, promotional content |
| **Mobile** | Stacks vertically | Maintains full-screen layout |
| **Content** | Structured image/text pairs | Flexible content overlay |

---

## 🎉 **Ready to Use!**

Your carousel block is now fully functional with:
- ✅ Fixed JavaScript functionality
- ✅ Professional styling
- ✅ Mobile responsiveness
- ✅ Accessibility features
- ✅ Touch/swipe support
- ✅ Auto-advance capability

### **Quick Start:**
1. Add "Carousel" block to your page
2. Create content with image/text pairs
3. Test navigation and responsiveness
4. Customize styling if needed

**Need help with specific customizations or having issues? Let me know!** 