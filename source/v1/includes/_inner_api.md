内部API接口
==========

验证流
-----

此接口提供给rtmp balance用于验证流有效性。

不要改变query的原始顺序。

### HTTP请求

`POST /v1/_inner/applications/{application_name}/streams/{stream_name}/actions/check`

### 请求参数

参数|描述
----|----
profile|与url相关联的profile的名字，如果没有指定profile，为`_origin_`
query|用户请求时所用地址的query部分。请不要改变query的原始顺序。
protocol|用户请求的协议，RTMP或者是HLS
action|对url的请求操作，如果是推流，为publish，如果是直播或者时移回放，使用play

> 请求HLS协议的例子

```shell
$ curl "http://api.stream.gateway/v1/_inner/applications/app_name/streams/stream_name/actions/check" \
-d '{
    "profile": "",
    "query": "nonce=1412121600&token=rejwkq432jk4",
    "protocol": "hls",
    "action": "play"
}'
```

> 请求RTMP协议的例子

```shell
$ curl "http://api.stream.gateway/v1/_inner/applications/app_name/streams/stream_name/actions/check" \
-d '{
    "profile": "1080p",
    "query": "expiry=1412121600&token=rejwkq432jk4",
    "protocol": "rtmp",
    "action": "publish"
}'
```

> 返回结果：

```json
{
    "upstreams": [
        {
            "host": "10.30.22.42:1935"
        },
        {
            "host": "10.30.22.43:1935"
        }
    ]
}
```

流状态更新
---------

此接口提供给rtmp balance用于更新流上传状态。balance需要对每个推流每隔10s调用一次此接口上报状态。如果超过10s没有请求，默认推流中断，状态变更为disconnected。

### HTTP请求

`POST /v1/_inner/applications/{application_name}/streams/{stream_name}/status`

### 请求参数

参数|描述
----|----
status|推流状态，connected表示正在推流，disconnected表示没有推流
length|上次请求到这次请求之间，推流数据大小

> 请求HLS协议的例子

```shell
$ curl "http://api.stream.gateway/v1/_inner/applications/app_name/streams/stream_name/status" \
-d '{
    "status": "connected",
    "length": 1234
}'
```

> 返回结果为空。如果返回码不是204，则balance需要断掉此流。



获取回放片段列表
--------------

本接口返回回放片段列表。列表的起始结束时间为unix timestamp，精确到millisecond。

### HTTP请求

`GET /v1/_inner/applications/{application_name}/streams/{stream_name}/segments?starttime={starttime}&endtime={endtime}`

### 请求参数

参数|描述|是否可选|类型
----|----|-----|----
starttime|列表开始时间|可选|millisecond unix timestamp
endtime|列表结束时间|可选|millisecond unix timestamp

```shell
$ curl "http://api.pili.qiniu.com/v1/_inner/applications/app_name/streams/stream_name/segments?starttime=1409926345158&endtime=1409932087561" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果：

```json
{
    "total": 2,
    "list": [
        {
            "starttime": 1409926345158,
            "endtime": 1409926837567
        },
        {
            "starttime": 1409929883546,
            "endtime": 1409932087561
        }
    ]
}
```


删除片段
-------

此接口删除指定时间内的回放片段。

### HTTP请求

`DELETE /v1/_inner/applications/{application_name}/streams/{stream_name}/segments?starttime={starttime}&endtime={endtime}`

### 请求参数

参数|描述|是否可选|类型
----|----|-----|----
starttime|开始时间|必选|millisecond unix timestamp
endtime|结束时间|必选|millisecond unix timestamp

```shell
$ curl "http://api.pili.qiniu.com/v1/_inner/applications/app_name/streams/stream_name/segments?starttime=1409926345158&endtime=1409932087561" \
-H "Content-Type: application/json" \
-X DELETE
```

> 返回结果为空
