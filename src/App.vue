<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- ヘッダー -->
      <header class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-3">
          🌤️ 天気コーディネーター
        </h1>
        <p class="text-white/90 text-lg">
          気温に合わせた服装の提案アプリ
        </p>
      </header>

      <!-- 検索バー -->
      <div class="mb-6">
        <CitySearch 
          @search="handleCitySearch"
          @location-search="handleLocationSearch"
        />
      </div>

      <!-- エラー表示 -->
      <div v-if="error" class="mb-6 bg-red-100 border-l-4 border-red-500 p-4 rounded-lg">
        <p class="text-red-700">{{ error }}</p>
      </div>

      <!-- メインコンテンツ -->
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <!-- 天気表示 -->
        <WeatherDisplay :weather="weather" />
        
        <!-- 服装提案 -->
        <OutfitSuggestion :suggestion="outfitSuggestion" />
      </div>

      <!-- フッター -->
      <footer class="text-center text-white/80 text-sm mt-8">
        <p>Powered by OpenWeatherMap API</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CitySearch from './components/CitySearch.vue';
import WeatherDisplay from './components/WeatherDisplay.vue';
import OutfitSuggestion from './components/OutfitSuggestion.vue';
import { getWeatherByCity, getWeatherByCoords, getDemoWeather } from './services/weatherService.js';
import { getOutfitSuggestion } from './utils/outfitSuggestions.js';

const weather = ref(null);
const error = ref('');
const loading = ref(false);

const outfitSuggestion = computed(() => {
  if (!weather.value) return null;
  return getOutfitSuggestion(weather.value.temperature);
});

const handleCitySearch = async (cityName) => {
  loading.value = true;
  error.value = '';
  weather.value = null;

  try {
    let result;
    
    // APIキーが設定されていない場合はデモデータを使用
    if (!import.meta.env.VITE_WEATHER_API_KEY || import.meta.env.VITE_WEATHER_API_KEY === 'demo') {
      result = getDemoWeather(cityName);
    } else {
      result = await getWeatherByCity(cityName);
    }

    if (result.success) {
      weather.value = result.data;
    } else {
      error.value = result.error;
    }
  } catch (err) {
    error.value = 'エラーが発生しました。しばらくしてから再度お試しください。';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const handleLocationSearch = async ({ lat, lon }) => {
  loading.value = true;
  error.value = '';
  weather.value = null;

  try {
    const result = await getWeatherByCoords(lat, lon);
    
    if (result.success) {
      weather.value = result.data;
    } else {
      error.value = result.error;
    }
  } catch (err) {
    error.value = 'エラーが発生しました。しばらくしてから再度お試しください。';
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>
