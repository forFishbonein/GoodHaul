import useAxios from '../request';
const useLoginApi = () => {
  let {httpRequest} = useAxios();
  const codeLogin = data => {
    return httpRequest({
      method: 'post',
      url: `/auth/user/code/login`,
      data: data,
    });
  };
  const passwordLogin = data => {
    return httpRequest({
      method: 'post',
      url: `/auth/user/password/login`,
      data: data,
    });
  };
  const getSMSCode = phone => {
    return httpRequest({
      method: 'get',
      url: `/auth/code/${phone}`,
    });
  };

  const userLogout = () => {
    return httpRequest({
      method: 'get',
      url: `/user/logout`,
    });
  };
  return {
    codeLogin,
    passwordLogin,
    getSMSCode,
    userLogout,
  };
};
export default useLoginApi;
