import './style.css';

let count = parseInt(localStorage.getItem('vite_counter_val') || '0', 10);

const countElement = document.querySelector('#count');
const btnIncrement = document.querySelector('#increment');
const btnDecrement = document.querySelector('#decrement');
const btnReset = document.querySelector('#reset');

function updateDisplay() {
  countElement.textContent = count;
  
  // 見た目の工夫（スタイル切り替え）
  countElement.classList.remove('negative', 'zero');
  if (count < 0) {
    countElement.classList.add('negative');
  } else if (count === 0) {
    countElement.classList.add('zero');
  }

  // localStorage保存
  localStorage.setItem('vite_counter_val', count.toString());
}

btnIncrement.addEventListener('click', () => {
  count += 1;
  updateDisplay();
});

btnDecrement.addEventListener('click', () => {
  count -= 1;
  updateDisplay();
});

btnReset.addEventListener('click', () => {
  count = 0;
  updateDisplay();
});

// 初期表示
updateDisplay();