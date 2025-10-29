// =====================================
// Experience ページ投稿一覧描画
// =====================================

function renderFeed() {
    const feed = document.getElementById("feed");

    // ページテーマから投稿種別を判定
    const type = document.body.classList.contains("japan-theme")
        ? "japan"
        : "global";

    const key = `${type}_posts`;
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
                <button onclick="likePost('${type}', ${post.id})">❤️ ${post.likes}</button>
                <button onclick="editPost('${type}', ${post.id})">✏️ 編集</button>
                <button onclick="deletePost('${type}', ${post.id})">🗑️ 削除</button>
            </div>
        `;
        feed.appendChild(card);
    });
}

// ページロード時に描画
document.addEventListener("DOMContentLoaded", renderFeed);
