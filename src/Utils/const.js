const sessionKey = 'xtra-token';
export const baseURL = 'http://localhost:3001';
export const baseURLSocket = 'ws://localhost:3001/websocket';
 const getUserEmail = () => {
  let userData = JSON.parse(localStorage.getItem(sessionKey))
  return userData ? userData.email: null;
};
// to keep the API call simple, I have used plain email id as the bearer token for API call verification
export const getHeader = () => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getUserEmail()}`,
  };
};
export const updateLoggedInData = (data) => {
  console.log('data is ', data)
  localStorage.setItem(sessionKey, JSON.stringify(data));
};

export const getLoggedInUserDetails = (data) => {
  return JSON.parse(localStorage.getItem(sessionKey));
};
export const getUserType = (data) => {
  let userData = JSON.parse(localStorage.getItem(sessionKey))
  return userData ? userData.userType: null;
};
export const handleLogOut  = () =>{
  localStorage.removeItem(sessionKey);
  return ;
}
