export function getChat() {
  return JSON.stringify(localStorage.getItem('chat')) || undefined;
}