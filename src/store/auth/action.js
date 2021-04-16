export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const LOADING = "LOGIN";

export function logOut() {
  return { type: LOGOUT };
}
export function loading() {
  return { type: LOADING };
}

export function logIn(data) {
  console.log("pyalaod event", data);
  return { type: LOGIN, payload: data };
}
