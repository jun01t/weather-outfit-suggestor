// 気温に基づいて服装を提案するロジック

export const getOutfitSuggestion = (temperature) => {
  const temp = Math.round(temperature);
  
  if (temp >= 30) {
    return {
      title: "猛暑対策",
      description: "非常に暑い日です。熱中症に注意しましょう。",
      outfit: [
        { item: "タンクトップ", icon: "👕", color: "bg-red-100" },
        { item: "ショートパンツ", icon: "🩳", color: "bg-orange-100" },
        { item: "サンダル", icon: "🩴", color: "bg-yellow-100" },
        { item: "サンバイザー", icon: "🧢", color: "bg-red-100" },
        { item: "日焼け止め", icon: "🧴", color: "bg-white" }
      ],
      tips: [
        "軽量で通気性の良い素材を選びましょう",
        "帽子と日焼け止めは必須です",
        "こまめに水分補給をしてください"
      ]
    };
  } else if (temp >= 25) {
    return {
      title: "夏スタイル",
      description: "暑い日です。涼しい服装がおすすめです。",
      outfit: [
        { item: "Tシャツ", icon: "👕", color: "bg-blue-100" },
        { item: "短パン・スカート", icon: "🩳", color: "bg-green-100" },
        { item: "スニーカー", icon: "👟", color: "bg-gray-200" },
        { item: "サングラス", icon: "🕶️", color: "bg-gray-300" }
      ],
      tips: [
        "綿やリネンなど通気性の良い素材が快適です",
        "薄着ですが、日焼け対策も忘れずに"
      ]
    };
  } else if (temp >= 20) {
    return {
      title: "春・初夏スタイル",
      description: "過ごしやすい気温です。軽装で快適に過ごせます。",
      outfit: [
        { item: "長袖Tシャツ", icon: "👔", color: "bg-blue-200" },
        { item: "ジーンズ", icon: "👖", color: "bg-indigo-200" },
        { item: "スニーカー", icon: "👟", color: "bg-gray-200" },
        { item: "薄手のカーディガン", icon: "🧥", color: "bg-purple-100" }
      ],
      tips: [
        "気温の変化に対応できるよう薄手の羽織ものを用意",
        "朝晩は少し肌寒いかもしれません"
      ]
    };
  } else if (temp >= 15) {
    return {
      title: "春・秋スタイル",
      description: "少し肌寒いですが、快適に過ごせる気温です。",
      outfit: [
        { item: "長袖シャツ", icon: "👔", color: "bg-blue-300" },
        { item: "スラックス・ジーンズ", icon: "👖", color: "bg-indigo-300" },
        { item: "カーディガン・ジャケット", icon: "🧥", color: "bg-purple-200" },
        { item: "スニーカー・ローファー", icon: "👞", color: "bg-brown-200" }
      ],
      tips: [
        "重ね着で温度調整しやすくしましょう",
        "風が強い日は少し厚めのジャケットを"
      ]
    };
  } else if (temp >= 10) {
    return {
      title: "秋・冬の初め",
      description: "冷え込みます。温かい服装を心がけましょう。",
      outfit: [
        { item: "セーター・フリース", icon: "🧶", color: "bg-orange-200" },
        { item: "コート・ジャケット", icon: "🧥", color: "bg-gray-400" },
        { item: "長ズボン", icon: "👖", color: "bg-indigo-400" },
        { item: "ブーツ", icon: "👢", color: "bg-brown-300" },
        { item: "マフラー", icon: "🧣", color: "bg-red-200" }
      ],
      tips: [
        "首元を温めるマフラーが効果的です",
        "靴下も厚手を選びましょう"
      ]
    };
  } else if (temp >= 5) {
    return {
      title: "冬スタイル",
      description: "寒い日です。しっかりと防寒しましょう。",
      outfit: [
        { item: "ダウンコート", icon: "🧥", color: "bg-gray-500" },
        { item: "セーター・フリース", icon: "🧶", color: "bg-orange-300" },
        { item: "厚手のズボン", icon: "👖", color: "bg-indigo-500" },
        { item: "手袋", icon: "🧤", color: "bg-blue-300" },
        { item: "ニット帽", icon: "🎩", color: "bg-gray-600" },
        { item: "ブーツ", icon: "👢", color: "bg-brown-400" }
      ],
      tips: [
        "重ね着で空気の層を作り、保温効果を高めましょう",
        "手足の冷えにも注意してください"
      ]
    };
  } else {
    return {
      title: "厳寒対策",
      description: "非常に寒い日です。万全の防寒をしましょう。",
      outfit: [
        { item: "ダウンコート", icon: "🧥", color: "bg-gray-600" },
        { item: "厚手のセーター", icon: "🧶", color: "bg-orange-400" },
        { item: "ヒートテック・下着", icon: "👕", color: "bg-red-300" },
        { item: "厚手のズボン", icon: "👖", color: "bg-indigo-600" },
        { item: "手袋", icon: "🧤", color: "bg-blue-400" },
        { item: "マフラー", icon: "🧣", color: "bg-red-400" },
        { item: "ニット帽", icon: "🎩", color: "bg-gray-700" },
        { item: "防寒ブーツ", icon: "👢", color: "bg-brown-500" }
      ],
      tips: [
        "多層重ね着で体温を保持しましょう",
        "露出部分は最小限に",
        "ヒートテックなどの保温インナーが有効です"
      ]
    };
  }
};

