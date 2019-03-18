export function deleteUser() {
  sessionStorage.removeItem('curUser');
  return window.location.href = "/";
}