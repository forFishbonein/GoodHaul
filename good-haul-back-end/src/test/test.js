const bcrypt = require('bcryptjs');
const code = async () => {
  console.log(await bcrypt.hash('123456', 10)); //每次生成的都是随机的！比md5厉害很多！
  console.log(
    await bcrypt.compare(
      '123456',
      '123456', //这个会返回false
      // '$2a$10$iYuDNcIV/EecQqvzDb85au..o9OCkyF2WmxRSar3iac9Id.0geJVu',
    ),
  );
};
code();
