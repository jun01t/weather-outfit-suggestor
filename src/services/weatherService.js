import axios from 'axios';

// OpenWeatherMap APIを使用して天気情報を取得
// 無料APIキーが必要です: https://openweathermap.org/api
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// 日本語都市名をローマ字に変換するマッピング
const cityNameMapping = {
  '東京': 'Tokyo,JP',
  'とうきょう': 'Tokyo,JP',
  '大阪': 'Osaka,JP',
  'おおさか': 'Osaka,JP',
  '札幌': 'Sapporo,JP',
  'さっぽろ': 'Sapporo,JP',
  '福岡': 'Fukuoka,JP',
  'ふくおか': 'Fukuoka,JP',
  '名古屋': 'Nagoya,JP',
  'なごや': 'Nagoya,JP',
  '横浜': 'Yokohama,JP',
  'よこはま': 'Yokohama,JP',
  '京都': 'Kyoto,JP',
  'きょうと': 'Kyoto,JP',
  '神戸': 'Kobe,JP',
  'こうべ': 'Kobe,JP',
  '仙台': 'Sendai,JP',
  'せんだい': 'Sendai,JP',
  '広島': 'Hiroshima,JP',
  'ひろしま': 'Hiroshima,JP',
  '北九州': 'Kitakyushu,JP',
  'きたきゅうしゅう': 'Kitakyushu,JP',
  '千葉': 'Chiba,JP',
  'ちば': 'Chiba,JP',
  '埼玉': 'Saitama,JP',
  'さいたま': 'Saitama,JP',
  '新潟': 'Niigata,JP',
  'にいがた': 'Niigata,JP',
  '静岡': 'Shizuoka,JP',
  'しずおか': 'Shizuoka,JP',
  '浜松': 'Hamamatsu,JP',
  'はままつ': 'Hamamatsu,JP',
  '岡山': 'Okayama,JP',
  'おかやま': 'Okayama,JP',
  '熊本': 'Kumamoto,JP',
  'くまもと': 'Kumamoto,JP',
  '鹿児島': 'Kagoshima,JP',
  'かごしま': 'Kagoshima,JP',
  '那覇': 'Naha,JP',
  'なは': 'Naha,JP',
  '青森': 'Aomori,JP',
  'あおもり': 'Aomori,JP',
  '盛岡': 'Morioka,JP',
  'もりおか': 'Morioka,JP',
  '秋田': 'Akita,JP',
  'あきた': 'Akita,JP',
  '山形': 'Yamagata,JP',
  'やまがた': 'Yamagata,JP',
  '福島': 'Fukushima,JP',
  'ふくしま': 'Fukushima,JP',
  '宇都宮': 'Utsunomiya,JP',
  'うつのみや': 'Utsunomiya,JP',
  '前橋': 'Maebashi,JP',
  'まえばし': 'Maebashi,JP',
  '高崎': 'Takasaki,JP',
  'たかさき': 'Takasaki,JP',
  '川崎': 'Kawasaki,JP',
  'かわさき': 'Kawasaki,JP',
  '相模原': 'Sagamihara,JP',
  'さがみはら': 'Sagamihara,JP',
  '長野': 'Nagano,JP',
  'ながの': 'Nagano,JP',
  '松本': 'Matsumoto,JP',
  'まつもと': 'Matsumoto,JP',
  '富山': 'Toyama,JP',
  'とやま': 'Toyama,JP',
  '金沢': 'Kanazawa,JP',
  'かなざわ': 'Kanazawa,JP',
  '福井': 'Fukui,JP',
  'ふくい': 'Fukui,JP',
  '甲府': 'Kofu,JP',
  'こうふ': 'Kofu,JP',
  '松江': 'Matsue,JP',
  'まつえ': 'Matsue,JP',
  '鳥取': 'Tottori,JP',
  'とっとり': 'Tottori,JP',
  '山口': 'Yamaguchi,JP',
  'やまぐち': 'Yamaguchi,JP',
  '佐賀': 'Saga,JP',
  'さが': 'Saga,JP',
  '長崎': 'Nagasaki,JP',
  'ながさき': 'Nagasaki,JP',
  '大分': 'Oita,JP',
  'おおいた': 'Oita,JP',
  '宮崎': 'Miyazaki,JP',
  'みやざき': 'Miyazaki,JP',
  '高松': 'Takamatsu,JP',
  'たかまつ': 'Takamatsu,JP',
  '徳島': 'Tokushima,JP',
  'とくしま': 'Tokushima,JP',
  '高知': 'Kochi,JP',
  'こうち': 'Kochi,JP'
};

// 都市名をローマ字に変換
const translateCityName = (cityName) => {
  return cityNameMapping[cityName] || cityName;
};

export const getWeatherByCity = async (cityName) => {
  try {
    // 日本語都市名をローマ字に変換
    const translatedCityName = translateCityName(cityName);
    
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: translatedCityName,
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

