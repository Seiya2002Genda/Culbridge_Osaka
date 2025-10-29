// =====================================
// Indexページ 投稿数バッジ表示
// =====================================

document.addEventListener("DOMContentLoaded", () => {

  // 投稿数取得関数
  function getCount(key) {
    const posts = JSON.parse(localStorage.getItem(key)) || [];
    return posts.length;
  }

  // 件数セット
  const countMap = [
    { id: "count-global-view", key: "global_posts" },
    { id: "count-global-post", key: "global_posts" },

    { id: "count-japan-view", key: "japan_posts" },
    { id: "count-japan-post", key: "japan_posts" },

    { id: "count-info-view", key: "info_posts" },
    { id: "count-info-post", key: "info_posts" },

    { id: "count-culture-global-view", key: "culture_global_posts" },
    { id: "count-culture-global-post", key: "culture_global_posts" },

    { id: "count-culture-japan-view", key: "culture_japan_posts" },
    { id: "count-culture-japan-post", key: "culture_japan_posts" }
  ];

  countMap.forEach(item => {
    const badge = document.getElementById(item.id);
    if (badge) {
      const count = getCount(item.key);
      badge.textContent = count > 0 ? count : "";
    }
  });
});

