export const TOKEN_KEY = "@lucra2020-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const SetEstabelecimento = estab => {
    localStorage.setItem('Estabelecimento', estab);
}
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};