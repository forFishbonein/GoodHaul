import useAxios from '../request';
const useLoginApi = () => {
  let {httpRequest} = useAxios();
  const driverLogin = data => {
    return httpRequest({
      method: 'post',
      url: `/auth/driver/login`,
      data: data,
    });
  };
  const driverLogout = () => {
    return httpRequest({
      method: 'get',
      url: `/driver/logout`,
    });
  };
  return {driverLogin, driverLogout};
};
export default useLoginApi;
