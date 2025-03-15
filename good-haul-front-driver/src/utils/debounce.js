// 防抖函数
/**
 * 应用场景：比如查看详情（会触发搜索接口的）、点击跳转等，我们希望点击多次也只能触发一次（可能用户不小心手抖了），不要重复请求接口 ——> 缺点是会造成一定的延迟感
 * 再比如搜索框，我们监听输入事件，当多长时间内没有新的输入我们再触发搜索！——> 这个是最适合用防抖的
 * 说白了，就是用户不会一直故意点击的场景我们用防抖，一般都是不小心点了两下子，但我们只希望触发一次！
 * 但是我们又要保证隔一小段时间这个函数还是可以触发的，不能一直用不了！
 */
export function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    const context = this;

    // 如果定时器存在，则清除之前的定时器
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 设置一个新的定时器，在延迟时间后执行函数
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
