# Vue 3 + Bun Content Manager

A quick and dirty application for my personal home page.

I have worked with Vuejs for sometime and when reviewing some new technologies available for work, came across [BUN](https://bun.com/).

It's a relatively new product (still in version 1.xx at this time), but looked interesting and can replace a JavaScript Runtime ([node.js](https://nodejs.org)), Package Manager ([NPM](https://www.npmjs.com/)), a Test Runner ([VITest](https://vitest.dev/)), and Bundler ([Vite](https://vite.dev/))

So, I thought I'd try and and see if CoPilot could create a simple little web application using [BUN](https://bun.com/) and [Vue3.js](https://vuejs.org/).

Honestly, it was fairly decent and quick. Some minor tweeks along the way and the application was up and running.



## Initial script for CoPilot
A modern web application built with Vue 3 and Bun featuring a fixed header panel, adjustable sidebar navigation, and dynamic content loading from external JSON file.
Include support for rendering HTML in the content panel

The `data.json` file uses this structure:
```json
[
  {
    "id": 1,
    "title": "Section Title",
    "content": "<p>HTML content goes here with <b>formatting</b></p>"
  }
]
```
Since support is provided for HTML tags, using paragraph tags `<p></p>` provides a simple way to have multiple lines in the content

CoPilot generated all the code inside a GitHub Repo for me and provided simple installation and runtime scripts:
To Install:
```
c\MyRepo> bun install
```
Developer mode runtime:
```
c\MyRepo> bun run dev
```
And Production:
```
c\MyRepo> bun run build
```
Preview production build locally
```
bun run preview
```

Which automatically opens a webpage: [http://localhost:4173/](http://localhost:4173/)

So after testing I decided to try it as my new home page everytime I started my PC using [PM2](https://pm2.keymetrics.io/) Advanced Production Process Manager for Node.js

For "Production", PM2 should be run using a Configuration File

```
// pm2.config.js
export default {
  apps: [
    {
      name: 'bun-app',
      script: 'index.ts', // the path to your application's entry point
      interpreter: 'bun', // explicitly set bun as the runtime
      cwd: process.cwd(), // essential for ES modules and relative paths
      autorestart: true,
      instances: 1,
      exec_mode: 'fork', // PM2 cluster mode is not supported with Bun
      env: {
        PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}` // ensure bun is in PATH for PM2
      }
    }
  ]
};
```
And started (from the applications folder) with
```
pm2 start pm2.config.js
```
_________________


## 🌟 Features

- ✨ **Fixed Header Panel** - Spans full width with gradient background
- 📑 **Adjustable Sidebar** - Resizable navigation (drag right edge)
- 📄 **Content Panel** - Scrollable area with external JSON content
- 🔍 **Search Functionality** - Real-time filtering across all content
- 🎨 **HTML Support** - Rich formatted content with HTML rendering
- ⚡ **Modern Stack** - Vue 3 Composition API + Vite + Bun
- 📱 **Responsive** - Works on desktop and tablet devices
- 🚀 **Performance** - Fast load times and smooth interactions

## 📁 Project Structure

```
.
├── public/
│   └── data.json           # External content data
├── src/
│   ├── components/
│   │   ├── Header.vue      # Fixed top header with search
│   │   ├── Sidebar.vue     # Adjustable navigation sidebar
│   │   └── Content.vue     # Main scrollable content panel
│   ├── App.vue             # Root application component
│   └── main.js             # Application entry point
├── index.html              # HTML entry point
├── vite.config.js          # Vite build configuration
├── package.json            # Dependencies and scripts
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) installed on your system
- Node.js 16+ (optional, for npm compatibility)

### Installation

1. **Create project directory:**
   ```bash
   mkdir vue-bun-app
   cd vue-bun-app
   ```

2. **Create all files** as shown above (copy each file content)

3. **Install dependencies:**
   ```bash
   bun install
   ```

4. **Start development server:**
   ```bash
   bun run dev
   ```
   
   The app will automatically open at `http://localhost:3000`

## 📝 Available Commands

```bash
# Start development server with hot reload
bun run dev

# Build for production
bun run build

# Preview production build locally
bun run preview
```




## 🎯 How to Use

### Search Content
1. Use the search bar in the header to filter content
2. Matches are found in both titles and content
3. Results update in real-time as you type

### Navigate Sections
1. Click any navigation link in the sidebar
2. The page smoothly scrolls to that section
3. The section highlights briefly when scrolled into view

### Resize Sidebar
1. Hover over the right edge of the sidebar
2. Click and drag to resize (200px - 500px width)
3. Width preference persists during the session

## 📚 Content Format

The `public/data.json` file uses this structure:

```json
[
  {
    "id": 1,
    "title": "Section Title",
    "content": "<p>HTML content goes here with <b>formatting</b></p>"
  }
]
```

### Supported HTML Tags

**Formatting:**
- `<b>`, `<strong>` - Bold text
- `<i>`, `<em>` - Italic text
- `<code>` - Inline code
- `<u>` - Underlined text

**Structure:**
- `<p>` - Paragraphs
- `<h1>` - `<h6>` - Headings
- `<ul>`, `<ol>`, `<li>` - Lists
- `<blockquote>` - Block quotes
- `<pre>` - Preformatted code blocks

**Other:**
- `<a href="...">` - Links
- `<br>` - Line breaks
- `<hr>` - Horizontal rules

### Example Content

```json
{
  "id": 1,
  "title": "Example Section",
  "content": "<p>This is <b>bold</b> and this is <em>italic</em>.</p><ul><li>List item 1</li><li>List item 2</li></ul><pre>Code block\nWith multiple lines</pre>"
}
```

## 🎨 Customization

### Change Colors
Edit the gradient colors in `src/components/Header.vue`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change App Title
Modify `src/components/Header.vue`:
```vue
<h1 class="app-title">Your Title Here</h1>
```

### Modify Content
Edit `public/data.json` and add your sections

### Style Adjustments
Each component has scoped styles you can customize:
- `src/components/Header.vue` - Header styling
- `src/components/Sidebar.vue` - Sidebar styling
- `src/components/Content.vue` - Content panel styling

## 🔍 Component Overview

### Header Component
- Fixed position at top of screen
- Full width with gradient background
- Search input for filtering
- Version display

### Sidebar Component
- Collapsible with draggable resize
- Navigation links to all sections
- Smooth scrolling on click
- Custom styling and hover effects

### Content Component
- Scrollable main content area
- HTML rendering from JSON data
- Highlight animation on navigation
- Responsive typography

## 📊 Architecture

```
Data Flow:
┌─────────────┐
│  data.json  │
└──────┬──────┘
       │ fetch
       ▼
    ┌──────────┐
    │ App.vue  │
    └──┬───┬──┘
       │   │
    ┌──▼─ ─▼──┐
    │Header   │
    │Sidebar  │
    │Content  │
    └─────────┘
```

Data flows from JSON → App → Components
Search and navigation events bubble up to App
Filtered content flows down to components

## ⚙️ Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Modern mobile browsers

## 🚨 Troubleshooting

### Port Already in Use
```bash
bun run dev -- --port 3001
```

### Module Not Found
```bash
rm -rf node_modules
bun install
```

### Build Errors
```bash
bun run build
```

### Data Not Loading
- Check that `public/data.json` exists
- Verify JSON is valid (use JSONLint)
- Check browser console for errors

## 📦 Dependencies

- **vue** (^3.4.0) - Progressive JavaScript framework
- **vite** (^5.0.0) - Next generation frontend tooling
- **@vitejs/plugin-vue** (^5.0.0) - Vite plugin for Vue SFC

## 📄 License

MIT License - Free to use for personal and commercial projects
---
