// =====================================
// ランダム背景設定スクリプト
// =====================================

// Japan背景セット
const japanBackgrounds = [
  "./850b067d-f973-4700-b840-3d77a07e2c38.png"
];

// Global背景セット
const globalBackgrounds = [
  "./bf3a3b27-8d73-4501-8f3d-0db480b1eceb.png"
];

// 時事ネタ画像セット
const recentBackgrounds = [
  "./watermark.jpg"
];

// Neutral背景セット（info-theme用）
const neutralBackgrounds = [
  ...japanBackgrounds,
  ...globalBackgrounds,
  ...recentBackgrounds
];

// 背景設定メイン関数
function setRandomBackground() {
  let bgList = neutralBackgrounds;
  const body = document.body;

  if (body.classList.contains("japan-theme")) {
    bgList = japanBackgrounds;
  } else if (body.classList.contains("global-theme")) {
    bgList = globalBackgrounds;
  } else if (body.classList.contains("recent-theme")) {
    bgList = recentBackgrounds;
  }

  const bg = bgList[Math.floor(Math.random() * bgList.length)];

  body.style.backgroundImage = `url(${bg})`;
  body.style.backgroundSize = "cover";
  body.style.backgroundAttachment = "fixed";
  body.style.backgroundPosition = "center";
}

// 読み込み時発動
document.addEventListener("DOMContentLoaded", setRandomBackground);
