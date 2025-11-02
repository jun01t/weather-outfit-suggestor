import axios from 'axios';

// OpenWeatherMap APIを使用して天気情報を取得
// 無料APIキーが必要です: https://openweathermap.org/api
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (cityName) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: cityName,
        appid: API_KEY,
        units: 'metric', // 摂氏で取得
        lang: 'ja' // 日本語で取得
      }
    });
    
    return {
      success: true,
      data: {
        city: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        pressure: response.data.main.pressure
      }
    };
  } catch (error) {
    if (error.response?.status === 404) {
      return {
        success: false,
        error: '都市が見つかりませんでした。都市名を確認してください。'
      };
    } else if (error.response?.status === 401) {
      return {
        success: false,
        error: 'APIキーが無効です。設定を確認してください。'
      };
    }
    return {
      success: false,
      error: '天気情報の取得に失敗しました。しばらくしてから再度お試しください。'
    };
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'ja'
      }
    });
    
    return {
      success: true,
      data: {
        city: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        pressure: response.data.main.pressure
      }
    };
  } catch (error) {
    return {
      success: false,
      error: '天気情報の取得に失敗しました。'
    };
  }
};

// デモ用のダミーデータ（APIキーがない場合）
export const getDemoWeather = (cityName = '東京') => {
  const demoTemps = {
    '東京': 22,
    '大阪': 25,
    '札幌': 8,
    '福岡': 18,
    '名古屋': 20
  };
  
  const temp = demoTemps[cityName] || 15;
  
  return {
    success: true,
    data: {
      city: cityName,
      country: 'JP',
      temperature: temp,
      feelsLike: temp - 2,
      description: '晴れ',
      icon: '01d',
      humidity: 60,
      windSpeed: 5,
      pressure: 1013
    }
  };
};

