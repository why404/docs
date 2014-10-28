# 流程

![Streamer相关流程](/v2/streamer_workflow.png)

## 设备推流（Device push stream process）

- 设备自己生成权限key
- 设备使用权限key调用Streamer的推流地址
- Streamer使用该流的sid和key，调用QCasting的[验证流](#yan-zheng-liu)接口
- Streamer根据QCasting的验证返回结果，决定是否允许继续推流
- Streamer要存储切片时，生成ts文件，并保证可以从网络访问
- Streamer使用ts文件的url，调用QCasting的[上传](#shang-chuan)接口
- QCasting返回保存的结果给Streamer

## 用户播放（User play）

- 用户获得播放地址
- 用户自己生成权限key
- 用户使用权限key调用播放地址进行播放
- Streamer使用该请求的sid和key，调用QCasting的[验证流](#yan-zheng-liu)
- Streamer根据QCasting的验证返回结果，决定是否允许播放
