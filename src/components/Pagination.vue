<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  currentPage: number
  totalPages: number
  goToPage: Function
}>()
// Function to calculate the range of visible page numbers
const calculateVisiblePages = () => {
  const visiblePages: Array<number | string> = []
  const totalVisiblePages = 5 // Number of visible page numbers including ellipsis
  let startPage = Math.max(1, props.currentPage - Math.floor(totalVisiblePages / 2))
  let endPage = Math.min(props.totalPages, startPage + totalVisiblePages - 1)

  if (endPage - startPage < totalVisiblePages - 1) {
    startPage = Math.max(1, endPage - totalVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i)
  }

  if (startPage > 1) {
    visiblePages.unshift('...')
  }
  if (endPage < props.totalPages) {
    visiblePages.push('...')
  }

  return visiblePages
}

// Computed property to get the range of visible page numbers
const visiblePages = computed(calculateVisiblePages)

// Function to go to a specific page
</script>
<template>
  <div class="pagination">
    <ul>
      <li key="first">
        <button
          @click="goToPage(1)"
          :disabled="currentPage === 1"
          :class="{ disabled: currentPage === 1 }"
        >
          First
        </button>
      </li>
      <li v-for="pageNumber in visiblePages" :key="pageNumber">
        <button
          @click="goToPage(pageNumber)"
          :disabled="pageNumber === '...'"
          :class="{ active: pageNumber === currentPage, disabled: pageNumber === '...' }"
        >
          {{ pageNumber }}
        </button>
      </li>
      <li>
        <button
          @click="goToPage(totalPages)"
          :disabled="totalPages === currentPage"
          :class="{ disabled: totalPages === currentPage }"
        >
          Last
        </button>
      </li>
    </ul>
  </div>
</template>
