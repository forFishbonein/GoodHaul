import useAxios from '../request';
const useDriverApi = () => {
  let {httpRequest} = useAxios();
  const getDriverInfoById = id => {
    return httpRequest({
      method: 'get',
      url: `/driver/info/${id}`,
    });
  };
  return {getDriverInfoById};
};
export default useDriverApi;
