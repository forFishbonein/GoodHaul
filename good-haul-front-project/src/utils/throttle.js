/*
 * @FilePath: throttle.js
 * @Author: Aron
 * @Date: 2024-03-22 20:12:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-22 20:52:26
 * Copyright: 2024 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
// 节流函数
/**
 * 应用场景：比如抢单，我们可以让用户一直点，但是我们不希望一直点就一直触发，隔一段时间触发一下就行了，不然服务器受不了！
 * 说白了，就是用户本身就会一直点击的场景我们用节流
 */
export function throttle(func, delay) {
  let lastExecTime = 0;
  let timeoutId;

  return function (...args) {
    const currentTime = Date.now();
    const timeSinceLastExec = currentTime - lastExecTime;

    if (!lastExecTime || timeSinceLastExec >= delay) {
      // 如果距上次执行已经超过指定的延迟时间，则立即执行函数
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      // 否则设置一个定时器，在延迟时间后执行函数
      /**
       * 注意：这里和我们平常理解的不一样，我们平常觉得是英雄cd的那种感觉，但是实际上并不是没到cd就不执行，
       * 而是先记录上了（但是多次只能记录一次，也就是一次性多次点击最多执行两次，一次立马，一次自动）
       * 到下一次cd好了之后就立马自动执行！！！不需要再重新点击了！
       * 这是一种对于我认知的颠覆！
       * 不过形成的效果确实是每隔一段cd执行一次！比如我一下子点击了10次（甚至20次），那么就会先立马执行一次，然后cd好了之后再自动执行一次！
       * 定时器是确保节流函数按照指定的时间间隔执行的关键。
       * 定时器的存在使得函数只有在指定的延迟时间后才会执行，从而有效地控制了函数的执行频率，实现了节流的效果。
       */
      clearTimeout(timeoutId); //但是在冷却时间内多余的n次只允许被触发1次，所以这里会clear
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - timeSinceLastExec);
    }
  };
}

//变体节流
/** 这个就是我之前认知的那种cd版节流函数！
 * 应用场景：
 * 一段时间内固定只能触发一次（可以专门把delay设置大一些，比如1秒），
 * 那么比如创建订单，支付订单，取消订单这种操作，我们都是请求一次接口就跳转页面的，那么就可以把定时器功能去掉，
 * 只需要让用户在点击按钮之后（即便1秒内点击100次也只能触发一次）等待跳转即可！
 * 但是这样我们不能保证只隔一小段时间这个函数还是可以触发的，只在只需要触发一次的场景比较适合用变体节流！
 * 相对于防抖的优点：1.不会有延迟感 2.可以有效地防止长时间内的多次点击，保证只触发1次
 */
export function throttleCd(func, delay) {
  let lastExecTime = 0;
  return function (...args) {
    const currentTime = Date.now();
    const timeSinceLastExec = currentTime - lastExecTime;

    if (!lastExecTime || timeSinceLastExec >= delay) {
      // 如果距上次执行已经超过指定的延迟时间，则立即执行函数
      func.apply(this, args);
      lastExecTime = currentTime;
    } //去掉了else的定时器
  };
}
