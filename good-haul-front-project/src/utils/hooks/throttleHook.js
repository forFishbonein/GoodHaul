import {useState} from 'react';
export const useThrottle = (func, delay) => {
  const [lastExecTime, setLastExecTime] = useState(0); //必须使用useState才能维持变量持续性，所以在react中我们要把节流写成自定义hook
  return function (...args) {
    const currentTime = Date.now();
    const timeSinceLastExec = currentTime - lastExecTime;

    if (!lastExecTime || timeSinceLastExec >= delay) {
      func.apply(this, args);
      setLastExecTime(currentTime);
    }
  };
};
