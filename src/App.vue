<template>
  <div class="app-container">
    <Header @search="handleSearch" />
    <div class="main-layout">
      <Sidebar 
        :sections="sections" 
        @navigate="scrollToSection"
      />
      <Content 
        :sections="filteredSections"
        ref="contentPanel"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Content from './components/Content.vue'

const sections = ref([])
const searchQuery = ref('')
const contentPanel = ref(null)

const filteredSections = computed(() => {
  if (!searchQuery.value) {
    return sections.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return sections.value.filter(section => {
    if (section.subsections && section.subsections.length) {
      return (
        section.title.toLowerCase().includes(query) ||
        section.subsections.some(
          sub =>
            sub.title.toLowerCase().includes(query) ||
            (sub.content && sub.content.toLowerCase().includes(query))
        )
      )
    }
    return (
      section.title.toLowerCase().includes(query) ||
      (section.content && section.content.toLowerCase().includes(query))
    )
  })
})

const handleSearch = (query) => {
  searchQuery.value = query
}

const scrollToSection = (sectionId) => {
  contentPanel.value?.scrollToSection(sectionId)
}

onMounted(async () => {
  try {
    const response = await fetch('/data.json')
    sections.value = await response.json()
  } catch (error) {
    console.error('Error loading data:', error)
  }
})
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
}

.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>