 FROM node:18.19.1
 # 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下
 COPY . /app
 # cd到app文件夹下
 WORKDIR /app
 # 安装项目依赖包
 RUN yarn install
 # 配置环境变量
 ENV HOST 0.0.0.0
 ENV PORT 3000
 # 容器对外暴露的端口号
 EXPOSE 3000
 # 容器启动时执行的命令，类似npm run start
 CMD ["yarn", "start"]
