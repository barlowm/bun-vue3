<template>
  <main class="content-panel">
    <div v-if="sections.length === 0" class="loading">
      <p>Loading content...</p>
    </div>
    
    <div v-else class="content-wrapper">
      <section 
        v-for="section in sections"
        :key="section.id"
        :id="`section-${section.id}`"
        class="content-section"
      >
        <h2 class="section-title">{{ section.title }}</h2>
        <div 
          class="section-content"
          v-html="sanitizeHTML(section.content)"
        ></div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  sections: {
    type: Array,
    default: () => []
  }
})

const scrollToSection = (sectionId) => {
  const element = document.getElementById(`section-${sectionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => {
      element.classList.add('highlight')
      setTimeout(() => {
        element.classList.remove('highlight')
      }, 2000)
    }, 300)
  }
}

const sanitizeHTML = (html) => {
  // Simple HTML sanitization - you can enhance this with DOMPurify for production
  const div = document.createElement('div')
  div.textContent = html
  const sanitized = div.innerHTML
  
  // Allow basic HTML tags
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&lt;(b|i|strong|em|p|br|ul|ol|li|h[1-6]|a|code|pre|blockquote|hr|table|tr|td|th|span|div)&gt;/g, '<$1>')
    .replace(/&lt;\/(b|i|strong|em|p|br|ul|ol|li|h[1-6]|a|code|pre|blockquote|hr|table|tr|td|th|span|div)&gt;/g, '</$1>')
}

defineExpose({
  scrollToSection
})
</script>

<style>
    .content-panel {
        flex: 1;
        overflow-y: auto;
        padding: 30px;
        margin-top: 70px;
        background-color: #ffffff;
    }

    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #999;
        font-size: 18px;
    }

    .content-wrapper {
        /* max-width: 900px; */
        margin: 0 auto;
    }

    .content-section {
        margin-bottom: 50px;
        padding: 20px;
        border-radius: 8px;
        background-color: #fafafa;
        border-bottom: 4px solid #667eea;
        transition: all 0.3s ease;
    }

        .content-section.highlight {
            background-color: #fff9e6;
            border-left-color: #764ba2;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }

    .section-title {
        margin: 0 0 15px 0;
        font-size: 24px;
        color: #333;
        border-bottom: 2px solid #667eea;
        padding-bottom: 10px;
    }

    .section-content {
        line-height: 1.8;
        color: #555;
        font-size: 15px;
    }

        .section-content ::v-deep p {
            margin: 10px 0;
        }

        .section-content ::v-deep b,
        .section-content ::v-deep strong {
            color: #333;
            font-weight: 600;
        }

        .section-content ::v-deep em,
        .section-content ::v-deep i {
            color: #667eea;
            font-style: italic;
        }

        .section-content ::v-deep a {
            color: #667eea;
            text-decoration: none;
            border-bottom: 1px dotted #667eea;
            transition: color 0.2s ease;
        }

            .section-content ::v-deep a:hover {
                color: #764ba2;
            }

        .section-content ::v-deep code {
            background-color: #f0f0f0;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
        }

        .section-content ::v-deep pre {
            background-color: #2d2d2d;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            line-height: 1.4;
        }

        .section-content ::v-deep blockquote {
            border-left: 4px solid #667eea;
            padding-left: 15px;
            margin-left: 0;
            color: #666;
            font-style: italic;
        }

        .section-content ::v-deep ul,
        .section-content ::v-deep ol {
            margin: 10px 0;
            padding-left: 30px;
        }

        .section-content ::v-deep li {
            margin: 5px 0;
        }

    .content-panel::-webkit-scrollbar {
        width: 8px;
    }

    .content-panel::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    .content-panel::-webkit-scrollbar-thumb {
        background: #667eea;
        border-radius: 4px;
    }

        .content-panel::-webkit-scrollbar-thumb:hover {
            background: #764ba2;
        }

    p, li {
        margin: 0;
        padding: 0;
        line-height: 1.5;
    }

    ul {
        margin-left: 3em;
    }
</style>