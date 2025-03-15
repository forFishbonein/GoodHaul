import useAxios from '../request';
const useUserApi = () => {
  let {httpRequest} = useAxios();
  const getUserProfileById = id => {
    return httpRequest({
      method: 'get',
      url: `/user/info/${id}`,
    });
  };
  return {getUserProfileById};
};
export default useUserApi;
