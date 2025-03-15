const io = require('socket.io-client');
// const url = 'http://192.168.43.127:3000'; //海伦斯
const url = 'http://192.168.1.86:3000'; //301
const socket = io(url);
const {v4: uuidv4} = require('uuid');
// 生成一个UUID
const uuid = uuidv4();
function generateRandomPoem() {
  const subjects = [
    '春天',
    '夏天',
    '秋天',
    '冬天',
    '花朵',
    '树木',
    '溪流',
    '月光',
    '星空',
    '风声',
  ];
  const actions = [
    '轻轻',
    '柔柔',
    '缓缓',
    '悠悠',
    '飘飘',
    '飞舞',
    '摇曳',
    '流淌',
    '吟唱',
    '掠过',
  ];
  const objects = [
    '山峦',
    '湖水',
    '云彩',
    '树影',
    '花瓣',
    '流水',
    '星光',
    '晨曦',
    '夕阳',
    '微风',
  ];

  const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];
  const randomObject = objects[Math.floor(Math.random() * objects.length)];

  return `在${randomSubject}中，${randomAction}的${randomObject}`;
}
socket.emit('chatToRoom', {
  chatId: '6606c4acf30bfd27621231a8',
  roomId: '2ba17097-e561-41e1-a180-d4858e648d16',
  message: {
    _id: uuid,
    text: generateRandomPoem(),
    createdAt: new Date(),
    user: {
      _id: 'dca559c0-9355-454b-b711-c8fb8fa739b2', //用户
      name: '古城旧梦',
      avatar: 'https://aronimage.oss-cn-hangzhou.aliyuncs.com/img/huoche.png',
    },
  },
});
// process.exit(); //手动退出程序！不能退出，不然消息发不出去了！
