<template>
  <div class="bg-white rounded-2xl shadow-xl p-6">
    <div class="flex gap-4">
      <input
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        type="text"
        placeholder="都市名を入力 (例: 東京、大阪、札幌)"
        class="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
      />
      <button
        @click="handleSearch"
        :disabled="loading || !searchQuery.trim()"
        class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
      >
        <span v-if="loading">検索中...</span>
        <span v-else>検索</span>
      </button>
    </div>
    
    <button
      v-if="allowLocation"
      @click="handleLocationSearch"
      :disabled="loading || gettingLocation"
      class="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span v-if="gettingLocation">位置情報取得中...</span>
      <span v-else>現在地の天気を取得</span>
    </button>
    
    <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-600 text-sm">{{ error }}</p>
    </div>
    
    <div v-if="showDemo" class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <p class="text-yellow-800 text-sm">
        <strong>デモモード:</strong> APIキーが設定されていないため、デモデータを表示しています。
        <br />
        実際の天気データを使用するには、OpenWeatherMapのAPIキーが必要です。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search', 'location-search']);

const searchQuery = ref('');
const loading = ref(false);
const gettingLocation = ref(false);
const error = ref('');
const allowLocation = ref(false);
const showDemo = ref(false);

// 位置情報の利用可能性をチェック
if ('geolocation' in navigator) {
  allowLocation.value = true;
}

// APIキーが設定されているかチェック
if (!import.meta.env.VITE_WEATHER_API_KEY || import.meta.env.VITE_WEATHER_API_KEY === 'demo') {
  showDemo.value = true;
}

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return;
  
  loading.value = true;
  error.value = '';
  
  try {
    await emit('search', searchQuery.value);
  } catch (err) {
    error.value = '検索に失敗しました。';
  } finally {
    loading.value = false;
  }
};

const handleLocationSearch = () => {
  if (!navigator.geolocation) {
    error.value = 'お使いのブラウザでは位置情報が利用できません。';
    return;
  }
  
  gettingLocation.value = true;
  error.value = '';
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      emit('location-search', {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
      gettingLocation.value = false;
    },
    (err) => {
      error.value = '位置情報の取得に失敗しました。';
      gettingLocation.value = false;
    }
  );
};
</script>

