流管理接口
========

创建流
-----

```shell
$ curl "http://api.pili.qiniu.com/v1/streams" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "name": "stream name",
    "stream_key": "random_stream_key",
    "is_private": false,
    "storage_period": -1,
    "protocol": "RTMP"
}'
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000001",
    "name": "stream name",
    "stream_key": "random_stream_key",
    "is_private": false,
    "storage_period": -1,
    "protocol": "RTMP",
    "push_url": "rtmp://115.238.155.183:49166/livestream/4q5cdgn2",
    "play_url": {
        "HLS": "http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2.m3u8",
        "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/4q5cdgn2"
    }
}
```

此接口返回注册后的流id和推流地址。

### HTTP请求

`POST /v1/streams`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

参数|描述|是否可选
----|----|------
name|名字|非可选
stream_key|由设备生成的字符串，标示设备，可以使用设备的Qiniu地址或者随机生成一个字符串|可选，如果不指定，则服务器会随机生成一串stream_key
is_private|是否为私有流。如果值为true，播放时（直播和点播）需要有[播放鉴权](#bo-fang-jian-quan)，值为false时，直接是用播放url播放即可|可选，默认为false
storage_period|存储的时间周期，0为不存储，-1为永远存储，其余正整数为保存小时数|可选，默认为0
protocol|视频推流协议|必选

协议名|协议
-----|-----
RTMP|Adobe Flash定义的实时多媒体流传输协议
PRTP|Pili定义的udp加速技术的TS传输协议
PTTP|基于tcp的TS传输协议
HLS|Apple定义的多媒体流传输协议

查询流信息
---------

```shell
$ curl "http://api.pili.qiniu.com/v1/streams/54068a9063b906000d000001" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000001",
    "name": "stream name",
    "stream_key": "random_stream_key",
    "is_private": false,
    "storage_period": -1,
    "protocol": "RTMP",
    "push_url": "rtmp://115.238.155.183:49166/livestream/4q5cdgn2",
    "play_url": {
        "HLS": "http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2.m3u8",
        "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/4q5cdgn2"
    }
}
```

### HTTP请求

`GET /v1/streams/{id}`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

获取流列表
---------

```shell
$ curl "http://api.pili.qiniu.com/v1/streams?page=1&size=10" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
-H "Content-Type: application/json" \
-X GET
```

>返回结果：

```json
{
    "total": 3,
    "streams": [
        {
            "id": "54068a9063b906000d000001",
            "name": "stream name",
            "stream_key": "random_stream_key",
            "is_private": false,
            "storage_period": -1,
            "protocol": "RTMP",
            "push_url": "rtmp://115.238.155.183:49166/livestream/4q5cdgn2",
            "play_url": {
                "HLS": "http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2.m3u8",
                "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/4q5cdgn2"
            }
        },
        {
            "id": "54068a9063b906000d000002",
            "name": "stream name",
            "stream_key": "random_stream_key",
            "is_private": false,
            "storage_period": -1,
            "protocol": "RTMP",
            "push_url": "rtmp://115.238.155.183:49166/livestream/4q5cdgn4",
            "play_url": {
                "HLS": "http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn4.m3u8",
                "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/4q5cdgn4"
            }
        },
        {
            "id": "54068a9063b906000d000003",
            "name": "stream name",
            "stream_key": "random_stream_key",
            "is_private": false,
            "storage_period": -1,
            "protocol": "RTMP",
            "push_url": "rtmp://115.238.155.183:49166/livestream/4q5cdgn7",
            "play_url": {
                "HLS": "http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn7.m3u8",
                "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/4q5cdgn7"
            }
        }
    ]
}
```

此接口返回对应用户创建的所有流的id以及流的连接状态。

### HTTP请求

`GET /v1/streams`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

参数|描述
----|----
page|显示第几页，默认为第1页
size|一页大小多大，默认为10，最大100

更新流
-----

```shell
$ curl "http://api.pili.qiniu.com/v1/streams/54068a9063b906000d000001" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "name": "stream name",
    "stream_key": "random_stream_key",
    "is_private": false,
    "protocol": "RTMP"
}'
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000001",
    "name": "stream name",
    "stream_key": "random_stream_key",
    "is_private": false,
    "storage_period": -1,
    "protocol": "RTMP",
    "push_url": "rtmp://115.238.155.183:49166/livestream/4q5cdgn2",
    "play_url": {
        "HLS": "http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2.m3u8",
        "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/4q5cdgn2"
    }
}
```

此接口更新流的推流地址。

### HTTP请求

`POST /v1/streams/{id}`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

参数|描述
----|----
name|名字
stream_key|由设备生成的字符串，标示设备，可以使用设备的Qiniu地址或者随机生成一个字符串
is_private|是否为私有流。如果值为true，播放时（直播和点播）需要有[播放鉴权](#bo-fang-jian-quan)，值为false时，直接是用播放url播放即可
protocol|视频推流协议

删除流
-----

```shell
$ curl "http://api.pili.qiniu.com/v1/streams/54068a9063b906000d000001" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
-H "Content-Type: application/json" \
-X DELETE
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000001",
    "name": "stream name",
    "stream_key": "random_stream_key",
    "is_private": false,
    "storage_period": -1,
    "protocol": "RTMP",
    "push_url": "rtmp://115.238.155.183:49166/livestream/4q5cdgn2",
    "play_url": {
        "HLS": "http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2.m3u8",
        "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/4q5cdgn2"
    }
}
```

### HTTP请求

`DELETE /v1/streams/{id}`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

无

流状态推送接口
------------

```shell
$ curl "http://api.pili.qiniu.com/v1/streams/54068a9063b906000d000001/status" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果：

```json
{
    "status": "disconnected"
}
```

### HTTP请求

`GET /v1/streams/{id}/status`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

参数|描述
----|----
status|connected表示正在推流，disconnected表示没有推流

获取回放片段列表
--------------

```shell
$ curl "http://api.pili.qiniu.com/v1/streams/54068a9063b906000d000001/segments?starttime=1409926345158&endtime=1409932087561" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
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

本接口返回回放片段列表。列表的起始结束时间为unix timestamp，精确到millisecond。

### HTTP请求

`GET /v1/streams/{id}/segments?starttime={starttime}&endtime={endtime}`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

参数|描述|是否可选|类型
----|----|-----|----
starttime|列表开始时间|可选|millisecond unix timestamp
endtime|列表结束时间|可选|millisecond unix timestamp

获取回放片段地址
--------------

```shell
$ curl "http://api.pili.qiniu.com/v1/streams/54068a9063b906000d000001/segments/play?starttime=1409926345158" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果：

```json
{
    "url": "http://115.238.155.183:49166/livestream/jnl617jk.m3u8"
}
```

此接口获取回放片段的播放地址

### HTTP请求

`GET /v1/streams/{id}/segments/play?starttime={starttime}&endtime={endtime}`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

参数|描述|是否可选|类型
----|----|-----|----
starttime|开始时间|必选|millisecond unix timestamp
endtime|结束时间|可选|millisecond unix timestamp

删除片段
-------

```shell
$ curl "http://api.pili.qiniu.com/v1/streams/54068a9063b906000d000001/segments?starttime=1409926345158&endtime=1409932087561" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
-H "Content-Type: application/json" \
-X DELETE
```

> 返回结果为空

此接口删除指定时间内的回放片段。

### HTTP请求

`DELETE /v1/streams/{id}/segments?starttime={starttime}&endtime={endtime}`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

参数|描述|是否可选|类型
----|----|-----|----
starttime|开始时间|必选|millisecond unix timestamp
endtime|结束时间|必选|millisecond unix timestamp