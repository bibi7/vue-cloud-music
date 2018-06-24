# vue-cloud-music
基于vue + vuex + vue-router + axios的网易云音乐

##前瞻图
![preview-one](./vue-cloud-music/src/common/img/preview/preview-one.jpg)
![preview-two](./vue-cloud-music/src/common/img/preview/preview-two.jpg)
![preview-three](./vue-cloud-music/src/common/img/preview/preview-three.jpg)
![preview-four](./vue-cloud-music/src/common/img/preview/preview-four.jpg)
![preview-five](./vue-cloud-music/src/common/img/preview/preview-five.jpg)
![preview-six](./vue-cloud-music/src/common/img/preview/preview-six.jpg)
![preview-seven](./vue-cloud-music/src/common/img/preview/preview-seven.jpg)
![preview-eight](./vue-cloud-music/src/common/img/preview/preview-eight.jpg)

##关键信息
项目启发于：[CaiJinyc / vue-music-webapp](https://github.com/CaiJinyc/vue-music-webapp)

后台api使用：[Binaryify / NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

ui界面基于ios版，version：5.2.0

项目完成度：(60%？)

##前言碎语
由于个人原因无法提供在线演示地址，不排除以后会提供，现阶段如果想查看演示的话只能clone本项目。

此项目需要基于[Binaryify](https://github.com/Binaryify/NeteaseCloudMusicApi)的node后台API，所以如果clone了，你还需要继续clone一份[Binaryify](https://github.com/Binaryify/NeteaseCloudMusicApi)的后台api方可（别忘了启服务）。

注意：(由于[Binaryify](https://github.com/Binaryify/NeteaseCloudMusicApi)的后台api持续不断迭代，不同版本之间的api可能会造成前端axios返回的**数据格式**不同，一旦出现了**报错**或者**数据无法正常加载**很可能就是版本不同的原因，请立即**提issue**给本人_(:з」∠)_ ， 另外欢迎pr提出任何你觉得**不足/可改进**的地方⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄)

##为什么开始
刚好看到[CaiJinyc / vue-music-webapp](https://github.com/CaiJinyc/vue-music-webapp)的项目，顿时手痒想试试，还在一边开坑一边填坑中，有好多奇奇怪怪的bug orz


##项目技术栈
**前端框架**：vue
**状态管理**：vuex
**滑动插件**：better-scroll
**ajax请求**：axios
**css预处理器**： less
**其他**：ES6
**图标库**：阿里巴巴iconfont

##已经做好了些什么？
1.首页（四个按钮的功能还没做）
2.推荐歌单
3.核心当然是播放器功能，支持切换歌曲，快进（暂时只支持点击进度条跳转），收藏歌曲。
4.歌曲播放模式，暂支持单曲循环，顺序播放，随机播放
5.可以收藏自己喜欢的歌曲到收藏列表

##还会做的其他功能？
1.评论？
2.电台？
3.排行榜？
4.私人FM？
5.歌手详情
6.loading页！（排名不分先后）

喜欢的话点个`star`吧
