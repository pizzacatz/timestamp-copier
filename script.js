// Query DOM elements
const timestampEl = document.getElementById('timestamp');
const copyBtn     = document.getElementById('copyBtn');
const toastEl     = document.getElementById('toast');

let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Format “YYYY - Month - DD  h:mm AM/PM  Weekday”
function formatTimestamp(date) {
  const year   = date.getFullYear();
  const month  = date.toLocaleString('default', { month: 'long' });
  const dayNum = String(date.getDate()).padStart(2, '0');
  let hours   = date.getHours() % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm    = date.getHours() < 12 ? 'AM' : 'PM';
  const weekday = date.toLocaleString('default', { weekday: 'long' });
  return `${year} - ${month} - ${dayNum}  ${hours}:${minutes} ${ampm}  ${weekday}`;
}

// Update the timestamp element
function updateTimestamp() {
  const now = new Date();
  timestampEl.textContent = formatTimestamp(now);
}

// Copy to clipboard and show toast
function handleCopy() {
  const text = timestampEl.textContent;
  navigator.clipboard.writeText(text).then(() => {
    toastEl.classList.remove('toast-hidden');
    toastEl.classList.add('toast-visible');
    setTimeout(() => {
      toastEl.classList.remove('toast-visible');
      toastEl.classList.add('toast-hidden');
    }, 1500);
  });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  updateTimestamp();
  // Update every minute on the minute
  const msUntilNextMinute = (60 - new Date().getSeconds()) * 1000;
  setTimeout(() => {
    updateTimestamp();
    setInterval(updateTimestamp, 60 * 1000);
  }, msUntilNextMinute);
  copyBtn.addEventListener('click', handleCopy);
});
