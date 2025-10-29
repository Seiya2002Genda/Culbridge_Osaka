// =====================================
// 今の海外情報ページ 投稿一覧描画
// =====================================

function renderFeedInfo() {
  const feed = document.getElementById("feed");
  const key = "info_posts";
  const posts = JSON.parse(localStorage.getItem(key)) || [];

  const sorted = posts.sort((a, b) => b.createdAt - a.createdAt);

  feed.innerHTML = "";

  sorted.forEach(post => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.date}</p>
      ${post.imageDataUrl ? `<img class="post-image" src="${post.imageDataUrl}">` : ""}
      <p>${post.content}</p>

      <div class="actions">
        <button onclick="likePost('info', ${post.id})">❤️ ${post.likes}</button>
        <button onclick="editPost('info', ${post.id})">✏️ 編集</button>
        <button onclick="deletePost('info', ${post.id})">🗑️ 削除</button>
      </div>
    `;
    feed.appendChild(card);
  });
}

// 画面表示時に読み込み
document.addEventListener("DOMContentLoaded", renderFeedInfo);
