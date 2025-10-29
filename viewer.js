// viewer.js
function esc(s){ return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function nl2br(s){ return esc(s).replace(/\n/g,"<br>"); }

function loadPosts(key, legacyType){
  let posts = JSON.parse(localStorage.getItem(key) || "[]");
  if(!posts.length){
    const legacy = JSON.parse(localStorage.getItem("experiences") || "[]");
    posts = legacy.filter(p => p && p.type === (legacyType || ""));
  }
  posts.sort((a,b)=> (b.createdAt||0) - (a.createdAt||0));
  return posts;
}

function renderFeedForKey(key, legacyType){
  const feed = document.getElementById("feed");
  if(!feed){ console.warn("no #feed element"); return; }
  const posts = loadPosts(key, legacyType);
  feed.innerHTML = "";
  if(!posts.length){
    feed.innerHTML = `<p class="no-post">投稿がありません。</p>`;
    return;
  }
  posts.forEach(p=>{
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${esc(p.title)}</h2>
      <p class="meta">${esc(p.date)}</p>
      ${p.imageDataUrl ? `<img class="post-image" src="${p.imageDataUrl}" alt="">` : ""}
      <div class="content">${nl2br(p.content)}</div>
    `;
    feed.appendChild(card);
  });
}
