import { Users } from '../data/users';

export function getUser() {
  const curUser = JSON.parse(sessionStorage.getItem('curUser')) || undefined;
  if (curUser !== undefined) {
    return Users.find(user => user.id === parseInt(curUser, 10));
  }

  return undefined;
}