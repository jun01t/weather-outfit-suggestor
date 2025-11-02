<template>
  <div v-if="suggestion" class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8">
    <div class="mb-6">
      <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ suggestion.title }}</h3>
      <p class="text-gray-600">{{ suggestion.description }}</p>
    </div>
    
    <div class="mb-6">
      <h4 class="text-lg font-semibold text-gray-700 mb-4">おすすめコーディネート</h4>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div 
          v-for="(item, index) in suggestion.outfit" 
          :key="index"
          :class="[item.color, 'rounded-xl p-4 text-center transition-transform hover:scale-105']"
        >
          <div class="text-4xl mb-2">{{ item.icon }}</div>
          <p class="text-sm font-medium text-gray-700">{{ item.item }}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-white/60 rounded-xl p-4">
      <h4 class="text-lg font-semibold text-gray-700 mb-3">💡 アドバイス</h4>
      <ul class="space-y-2">
        <li 
          v-for="(tip, index) in suggestion.tips" 
          :key="index"
          class="flex items-start gap-2 text-gray-700"
        >
          <span class="text-blue-500 mt-1">•</span>
          <span class="text-sm">{{ tip }}</span>
        </li>
      </ul>
    </div>
  </div>
  
  <div v-else class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 text-center">
    <svg class="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p class="text-gray-500">気温情報を取得すると、服装の提案が表示されます</p>
  </div>
</template>

<script setup>
defineProps({
  suggestion: {
    type: Object,
    default: null
  }
});
</script>

