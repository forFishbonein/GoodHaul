import moment from 'moment';
// 定义格式化封装函数
export default function formData(timer) {
  if (timer) {
    if (typeof timer === 'string') {
      timer = new Date(timer);
      // console.log(timer);
    }
    return moment(timer).format('YYYY-MM-DD HH:mm:ss');
  } else {
    return '—';
  }
}
export function formatDateChat(date) {
  if (!date) return '—'; // 如果日期为空，返回'—'

  if (typeof date === 'string') {
    // 如果是字符串，尝试将其解析为日期对象
    date = new Date(date);
    if (isNaN(date.getTime())) return '—'; // 解析失败，返回'—'
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
  );
  const dayOfWeek = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ];

  // 如果是今天，格式化成时分
  if (date.toDateString() === today.toDateString()) {
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  }

  // 如果是昨天，返回'昨天'
  if (date.toDateString() === yesterday.toDateString()) {
    return '昨天';
  }

  // 如果是本周内，返回中文星期几
  if (date >= today.getTime() - 6 * 24 * 60 * 60 * 1000) {
    return dayOfWeek[date.getDay()];
  }

  // 否则，返回'年份后两位/月份/日期'
  const year = date.getFullYear().toString().slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}/${month}/${day}`;
}
