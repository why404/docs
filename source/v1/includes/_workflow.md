# 流程

![流管理服务器接入流程](/v2/manage_workflow.png)

## 流管理服务器初始化(Stream Hub init process)

- 首先要注册一个七牛账户
- 从七牛账号设置里取得密钥AK/SK
- 使用七牛用户名密码调用QCasting的[用户认证](#yong-hu-ren-zheng)接口

## 流管理器更新七牛密钥(Stream Hub update qiniu ak/sk)

更新七牛密钥的理由可以参考[七牛安全机制](http://developer.qiniu.com/docs/v6/api/overview/security.html)的密钥一节。

- 登录七牛账户
- 在账号设置里更新密钥AK/SK
- 使用七牛用户名密码调用QCasting的[用户认证](#yong-hu-ren-zheng)接口

## 设备初始化(Stream init process)

- 设备自身生成stream_key并保存，此stream_key可以使用设备MAC地址，或者一个纯粹的随机字符串
- 设备使用stream_key向流管理器注册
- 流管理器调用[创建流](#chuang-jian-liu)接口向QCasting注册设备
- QCasting返回设备id和推流地址给流管理器，id由流管理器保存
- 流管理器返回推流地址给设备，设备保存好推流地址

## 设备推流(Stream push stream process)

```shell
> qcastingctl push \
"rtsp://localhost:1234/path/to/get/stream" \
"rtmp://115.238.155.183:49166/livestream/jnl617jk" \
"b8:f6:b1:12:1f:d1"
```

```c
char rtsp = "rtsp://localhost:1234/path/to/get/stream";
char push_url = "rtmp://115.238.155.183:49166/livestream/jnl617jk";
char stream_key = "b8:f6:b1:12:1f:d1";
int err;
err = qcasting_push_stream(rtsp, push_url, stream_key);
```

- 设备使用保存的stream_key和推流地址，生成推流stream_token。生成方法参考[流授权凭证](#liu-shou-quan-ping-zheng)一节
- 设备使用stream_token，调用推流地址进行推流

## 流管理(Stream Hub control process)

- 流管理器生成[接口访问凭证](#jie-kou-fang-wen-ping-zheng)，并使用接口访问凭证调用相关[流管理接口](#liu-guan-li-jie-kou)进行管理
