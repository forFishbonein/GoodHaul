import {useState} from 'react';
export const useMyNavigation = () => {
  let [navigationRef, setNavigationRef] = useState(null); //必须使用useState才能维持变量持续性，所以在react中我们要把节流写成自定义hook
  return {navigationRef, setNavigationRef};
};
