内部API接口
==========

验证流
-----

此接口提供给rtmp balance用于验证流有效性。

不要改变query的原始顺序。

### HTTP请求

`POST /v1/_inner/streams/{id}/actions/check`

### 请求参数

参数|描述
----|----
profile|与url相关联的profile的名字，如果没有指定profile，为`_origin_`
query|用户请求时所用地址的query部分。请不要改变query的原始顺序。
protocol|用户请求的协议，RTMP或者是HLS
action|对url的请求操作，如果是推流，为publish，如果是直播或者时移回放，使用play

> 请求HLS协议的例子

```shell
$ curl "http://api.stream.gateway/v1/_inner/streams/54068a9063b906000d000001/actions/check" \
-d '{
    "profile": "_origin_",
    "query": "nonce=1412121600&token=rejwkq432jk4",
    "protocol": "HLS",
    "action": "publish"
}'
```

> 请求RTMP协议的例子

```shell
$ curl "http://api.stream.gateway/v1/_inner/streams/54068a9063b906000d000001/actions/check" \
-d '{
    "profile": "1080p",
    "query": "expiry=1412121600&token=rejwkq432jk4",
    "protocol": "RTMP",
    "action": "play"
}'
```

> 返回结果：

```json
{
    "upstreams": ["10.30.22.42:1935", "10.30.22.43:1935"],
}
```

流状态更新
---------

此接口提供给rtmp balance用于更新流上传状态。balance需要对每个推流每隔10s调用一次此接口上报状态。如果超过10s没有请求，默认推流中断，状态变更为disconnected。

### HTTP请求

`POST /v1/_inner/streams/{id}/status`

### 请求参数

参数|描述
----|----
status|推流状态，connected表示正在推流，disconnected表示没有推流
length|上次请求到这次请求之间，推流数据大小

> 请求HLS协议的例子

```shell
$ curl "http://api.stream.gateway/v1/_inner/streams/54068a9063b906000d000001/status" \
-d '{
    "status": "connected",
    "length": 1234
}'
```

> 返回结果为空。如果返回码不是204，则balance需要断掉此流。

上传ts索引
---------

此接口内部使用，用于保存ts索引信息。

### HTTP请求

`POST /v1/_inner/streams/{id}/ts`

### 请求参数

参数|描述
----|----
starttime|ts文件起始时间
endtime|ts文件结束时间
url|待保存文件地址

```shell
$ curl "http://api.stream.gateway/v1/_inner/streams/54068a9063b906000d000001/ts" \
-d '{
    "starttime": 1409926345158,
    "endtime": 1409926837567,
    "url": "http://115.238.155.183:80/hls/3jo78i11/2014/0907/03/20140907032336.ts"
}'
```

> 返回结果为空。
