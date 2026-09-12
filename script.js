const btn = document.getElementById('themeBtn');
const saved = localStorage.getItem('theme');
if (saved === 'dark') document.body.classList.add('dark');
function updateIcon(){
  btn.textContent = document.body.classList.contains('dark') ? '☀' : '☾';
}
updateIcon();
btn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  updateIcon();
});
