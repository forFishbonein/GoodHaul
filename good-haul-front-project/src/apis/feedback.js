import useAxios from '../request';
const useFeedbackApi = () => {
  let {httpRequest} = useAxios();
  const addOneFeedback = data => {
    return httpRequest({
      method: 'post',
      url: `/feedback/create`,
      data: data,
    });
  };
  return {
    addOneFeedback
  };
};
export default useFeedbackApi;
