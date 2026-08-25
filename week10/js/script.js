const searchBtn = document.getElementById('search-btn');
const usernameInput = document.getElementById('username-input');
const loadingEl = document.getElementById('loading');
const errorMessageEl = document.getElementById('error-message');
const userCardEl = document.getElementById('user-card');

const avatarEl = document.getElementById('avatar');
const nameEl = document.getElementById('name');
const bioEl = document.getElementById('bio');
const followersEl = document.getElementById('followers');
const reposEl = document.getElementById('repos');
const profileLinkEl = document.getElementById('profile-link');

// GitHubユーザー情報を取得・表示する関数
async function fetchGitHubUser() {
  const username = usernameInput.value.trim();

  if (!username) {
    showError('ユーザー名を入力してください');
    return;
  }

  // UI初期化・ローディング表示
  resetUI();
  loadingEl.classList.remove('hidden');
  searchBtn.disabled = true;

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    // コンソールログでステータスコード確認
    console.log('HTTP Status:', response.status);

    // 存在しないユーザー名の場合（404など）
    if (!response.ok) {
      throw new Error('ユーザーが見つかりませんでした');
    }

    const data = await response.json();
    
    // 取得データのオブジェクトをConsoleで確認
    console.log('取得データ:', data);

    // 画面に描画
    renderUserData(data);

  } catch (error) {
    console.error('Fetch Error:', error);
    showError(error.message);
  } finally {
    // 通信完了後にローディング解除
    loadingEl.classList.add('hidden');
    searchBtn.disabled = false;
  }
}

// データ描画処理
function renderUserData(data) {
  avatarEl.src = data.avatar_url;
  nameEl.textContent = data.name || data.login; // nameがない場合はlogin名を使用
  bioEl.textContent = data.bio || '自己紹介はありません。';
  followersEl.textContent = data.followers;
  reposEl.textContent = data.public_repos;
  profileLinkEl.href = data.html_url;

  userCardEl.classList.remove('hidden');
}

// エラーメッセージ表示
function showError(message) {
  errorMessageEl.textContent = message;
  errorMessageEl.classList.remove('hidden');
}

// 画面状態のリセット
function resetUI() {
  loadingEl.classList.add('hidden');
  errorMessageEl.classList.add('hidden');
  userCardEl.classList.add('hidden');
}

// イベントリスナー設定
searchBtn.addEventListener('click', fetchGitHubUser);
usernameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    fetchGitHubUser();
  }
});