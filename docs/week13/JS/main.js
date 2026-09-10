import './style.css';

// DOM要素の取得
const countDisplay = document.querySelector('#count-display');
const btnIncrease = document.querySelector('#btn-increase');
const btnDecrease = document.querySelector('#btn-decrease');
const btnReset = document.querySelector('#btn-reset');

// 初期値（発展: localStorageからの読み込み）
let count = Number(localStorage.getItem('posse_counter_value')) || 0;

// 表示とスタイルの更新関数
function updateDisplay() {
  countDisplay.textContent = count;
  localStorage.setItem('posse_counter_value', count);

  // 発展: 値に応じた見た目の変化
  countDisplay.classList.toggle('is-negative', count < 0);
  countDisplay.classList.toggle('is-zero', count === 0);
}

// イベントリスナーの登録
btnIncrease.addEventListener('click', () => {
  count++;
  updateDisplay();
});

btnDecrease.addEventListener('click', () => {
  count--;
  updateDisplay();
});

btnReset.addEventListener('click', () => {
  count = 0;
  updateDisplay();
});

// 初期描画実行
updateDisplay();