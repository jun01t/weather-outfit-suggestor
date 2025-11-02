<template>
  <div class="bg-white rounded-2xl shadow-xl p-8">
    <div v-if="weather" class="text-center">
      <div class="flex items-center justify-center gap-4 mb-6">
        <img 
          :src="`https://openweathermap.org/img/wn/${weather.icon}@2x.png`" 
          :alt="weather.description"
          class="w-24 h-24"
        />
        <div>
          <h2 class="text-3xl font-bold text-gray-800">{{ weather.city }}</h2>
          <p class="text-gray-600">{{ weather.country }}</p>
        </div>
      </div>
      
      <div class="mb-6">
        <div class="text-6xl font-bold text-blue-600 mb-2">
          {{ Math.round(weather.temperature) }}°
        </div>
        <p class="text-xl text-gray-600 capitalize">{{ weather.description }}</p>
        <p class="text-sm text-gray-500 mt-2">
          体感温度: {{ Math.round(weather.feelsLike) }}°
        </p>
      </div>
      
      <div class="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div class="text-center">
          <p class="text-xs text-gray-500 mb-1">湿度</p>
          <p class="text-lg font-semibold text-gray-800">{{ weather.humidity }}%</p>
        </div>
        <div class="text-center">
          <p class="text-xs text-gray-500 mb-1">風速</p>
          <p class="text-lg font-semibold text-gray-800">{{ weather.windSpeed }} m/s</p>
        </div>
        <div class="text-center">
          <p class="text-xs text-gray-500 mb-1">気圧</p>
          <p class="text-lg font-semibold text-gray-800">{{ weather.pressure }} hPa</p>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-12">
      <svg class="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
      <p class="text-gray-500">天気情報を取得中...</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  weather: {
    type: Object,
    default: null
  }
});
</script>

