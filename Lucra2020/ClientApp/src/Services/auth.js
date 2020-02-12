export const TOKEN_KEY = "@lucra2020-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getEstabelecimento = () => localStorage.getItem('Estabelecimento');
export const getUserName = () => localStorage.getItem('Username');
export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const SetEstabelecimento = estab => {
    localStorage.setItem('Estabelecimento', estab);
}
export const SetUserName= Usuario => {
    localStorage.setItem('Username', Usuario);
}
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('Estabelecimento');
    localStorage.removeItem('Username');
};