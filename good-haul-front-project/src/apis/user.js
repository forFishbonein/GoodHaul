import useAxios from '../request';
const useUserApi = () => {
  const {httpRequest} = useAxios();
  const modifyName = name => {
    return httpRequest({
      method: 'post',
      url: `/user/modify/name`,
      data: {
        name: name,
      },
    });
  };
  const modifyGender = gender => {
    return httpRequest({
      method: 'post',
      url: `/user/modify/gender`,
      data: {
        gender: gender,
      },
    });
  };
  const modifySign = sign => {
    return httpRequest({
      method: 'post',
      url: `/user/modify/sign`,
      data: {
        sign: sign,
      },
    });
  };
  const getStsUrl = name => {
    return httpRequest({
      method: 'post',
      url: `/user/upload/sts`,
      data: {
        name: name,
      },
    });
  };
  const checkIfHavePassword = () => {
    return httpRequest({
      method: 'get',
      url: `/user/if/password`,
    });
  };
  const modifyPassword = (prePassword, newPassword) => {
    return httpRequest({
      method: 'post',
      url: `/user/modify/password`,
      data: {
        prePassword,
        newPassword,
      },
    });
  };

  return {
    modifyName,
    modifyGender,
    modifySign,
    getStsUrl,
    checkIfHavePassword,
    modifyPassword,
  };
};
export default useUserApi;
