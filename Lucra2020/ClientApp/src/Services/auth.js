export const TOKEN_KEY = "@lucra2020-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getEstabelecimento = () => localStorage.getItem('Estabelecimento');
export const getUserName=()=>{
    const user = {};
    user.Name = localStorage.getItem('Username');
    user.Id = localStorage.getItem('UserId');
    return user;
}
export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const SetEstabelecimento = estab => {
    localStorage.setItem('Estabelecimento', estab);
}
export const SetUser= (Usuario, Uid) => {
    localStorage.setItem('Username', Usuario);
    localStorage.setItem('UserId', Uid);

}
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('Estabelecimento');
    localStorage.removeItem('Username');
};