export const config = {
  SECRET_KEY: '@W8*0SSillD2V#Qsm#7FjXRHU#jy^dln(YY#)R+n7(Eekse08Qk4KuW8l!_OcdnLZ5!dMWI68&X^Qee6LQiRXKS5',
  EXPIRES: {
    JWT: 3600,
    REDIS: 3600, //单位是s
    CODEREDIS: 300 //单位是s//5分钟，否则验证码失效
  }
};