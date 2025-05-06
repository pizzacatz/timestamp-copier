const timestampEl = document.getElementById('timestamp');
const copyBtn     = document.getElementById('copyBtn');

function formatTimestamp(date) {
  const year   = date.getFullYear();
  const month  = date.toLocaleString('default', { month: 'long' });
  const dayNum = String(date.getDate()).padStart(2, '0');
  let hours     = date.getHours() % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm    = date.getHours() < 12 ? 'AM' : 'PM';
  const weekday = date.toLocaleString('default', { weekday: 'long' });
  return `${year} - ${month} - ${dayNum}  ${hours}:${minutes} ${ampm}  ${weekday}`;
}

function updateTimestamp() {
  timestampEl.textContent = formatTimestamp(new Date());
}

function handleCopy() {
  const text = timestampEl.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    copyBtn.disabled = true;
    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.disabled = false;
    }, 500);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateTimestamp();
  const msUntilNextMinute = (60 - new Date().getSeconds()) * 1000;
  setTimeout(() => {
    updateTimestamp();
    setInterval(updateTimestamp, 60 * 1000);
  }, msUntilNextMinute);

  copyBtn.addEventListener('click', handleCopy);
});
