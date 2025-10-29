// post.js (replace existing file)
const KEY_MAP = {
  "global": "exp_global",
  "japan": "exp_japan",
  "info": "info_global",
  "culture-global": "culture_global",
  "culture-japan": "culture_japan"
};

function log(...args){ console.debug("[post.js]", ...args); }

function convertFileToBase64(file){
  return new Promise((res, rej)=>{
    const r = new FileReader();
    r.onload = e => res(e.target.result);
    r.onerror = e => rej(e);
    r.readAsDataURL(file);
  });
}

async function savePost(type){
  try{
    const key = KEY_MAP[type];
    if(!key) {
      alert("不明な投稿タイプです: " + type);
      return;
    }

    const titleEl = document.getElementById("title");
    const dateEl  = document.getElementById("date");
    const contentEl = document.getElementById("content");
    const imageEl = document.getElementById("image");

    const title = titleEl ? titleEl.value.trim() : "";
    const date = dateEl ? dateEl.value : "";
    const content = contentEl ? contentEl.value.trim() : "";

    if(!title || !date || !content){
      alert("全ての項目を入力してください");
      return;
    }

    let imageDataUrl = "";
    if(imageEl && imageEl.files && imageEl.files[0]){
      imageDataUrl = await convertFileToBase64(imageEl.files[0]);
    }

    const post = {
      id: Date.now(),
      type,
      title, date, content,
      imageDataUrl,
      likes: 0,
      createdAt: Date.now()
    };

    // push into typed store
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    arr.push(post);
    localStorage.setItem(key, JSON.stringify(arr));
    log("saved to", key, post);

    // also append to legacy all-list for compatibility
    const legacy = JSON.parse(localStorage.getItem("experiences") || "[]");
    legacy.push(post);
    localStorage.setItem("experiences", JSON.stringify(legacy));
    log("appended to legacy experiences");

    alert("投稿完了！");
    // clear form
    if(titleEl) titleEl.value = "";
    if(dateEl) dateEl.value = "";
    if(contentEl) contentEl.value = "";
    if(imageEl) imageEl.value = "";
    // remove possibly set edit marker
    localStorage.removeItem("edit-post-id");
  }catch(err){
    console.error("savePost error", err);
    alert("投稿に失敗しました（コンソールを確認）");
  }
}

/**
 * 編集用：ページが開いたら localStorage の "edit-post-id" があれば該当ポストを読み込む
 * この関数を投稿ページの最後で呼ぶ（initEditIfNeeded();）
 */
function initEditIfNeeded(){
  try{
    const editId = localStorage.getItem("edit-post-id");
    if(!editId) return;
    const id = Number(editId);
    // search across all KEY_MAP keys and legacy
    const keys = Object.values(KEY_MAP).concat(["experiences"]);
    for(const k of keys){
      const arr = JSON.parse(localStorage.getItem(k) || "[]");
      const found = arr.find(p => p && Number(p.id) === id);
      if(found){
        // populate
        const titleEl = document.getElementById("title");
        const dateEl  = document.getElementById("date");
        const contentEl = document.getElementById("content");
        const imagePreview = document.getElementById("imagePreview");

        if(titleEl) titleEl.value = found.title || "";
        if(dateEl) dateEl.value = found.date || "";
        if(contentEl) contentEl.value = found.content || "";
        if(imagePreview) imagePreview.innerHTML = found.imageDataUrl ? `<img class="preview-img" src="${found.imageDataUrl}">` : "";
        // set form to update behavior: we'll delete original and push new on save (simpler)
        // store that we are editing this id (optional)
        localStorage.setItem("editing-id-temp", id);
        localStorage.removeItem("edit-post-id");
        log("initEdit loaded", found);
        break;
      }
    }
  }catch(e){
    console.error("initEditIfNeeded error", e);
  }
}
