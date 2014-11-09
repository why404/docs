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

`POST /api/v1/streams`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

参数|描述|是否可选
----|----|------
name|名字|非可选
stream_key|由设备生成的字符串，标示设备，可以使用设备的Qiniu地址或者随机生成一个字符串|可选，如果不指定，则服务器会随机生成一串stream_key
storage_period|存储的时间周期，0为不存储，-1为永远存储，其余正整数为保存小时数|可选，默认为0
protocol|视频推流协议，目前必需为RTMP|可选，默认为RTMP

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

`GET /api/v1/streams/{id}`

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

`GET /api/v1/streams`

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
    "protocol": "RTMP"
}'
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000001",
    "name": "stream name",
    "stream_key": "random_stream_key",
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

`POST /api/v1/streams/{id}`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

参数|描述|是否可选
----|----|------
name|名字|非可选
stream_key|由设备生成的字符串，标示设备，可以使用设备的Qiniu地址或者随机生成一个字符串|可选，如果不指定，则服务器会随机生成一串stream_key
protocol|视频推流协议，目前必需为RTMP|可选，默认为RTMP

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

`DELETE /api/v1/streams/{id}`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

无

流状态推送接口
------------

```shell
$ curl "http://api.pili.qiniu.com/v1/streams/54068a9063b906000d000001/status?ping=30" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果：

```json
{"status": "disconnected"}
{"status": "connected"}
{"ping":"ok"}
{"status": "disconnected"}
...
```

此请求为一个长链接接口，请求后会从服务器推送相应流的推送状态。

每个状态为一行json格式的文本，以`\n`结束。每次连接后，会返回流当前的推送状态，之后如果状态有变更，会再次推送变更后的状态。

长链接会每隔`ping`秒下发一个ping命令，保证在长时间状态没有改变时，也有消息发送给客户端，保证链接正常。

每个流id最多只保持5个长链接推送接口。如果有第6个请求状态接口的连接，会自动断掉前一个状态连接。如果有广播状态的需求，需要客户在收到更新消息后，自己做广播。

### HTTP请求

`GET /api/v1/streams/{id}/status`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

参数|描述|是否可选
----|----|----
ping|发送ping命令的时间间隔，单位秒|可选，如果不给出ping，默认返回当前状态后结束，不建立长连接

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

`GET /api/v1/streams/{id}/segments?starttime={starttime}&endtime={endtime}`

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

`GET /api/v1/streams/{id}/segments/play?starttime={starttime}&endtime={endtime}`

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

`DELETE /api/v1/streams/{id}/segments?starttime={starttime}&endtime={endtime}`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

参数|描述|是否可选|类型
----|----|-----|----
starttime|开始时间|必选|millisecond unix timestamp
endtime|结束时间|必选|millisecond unix timestamp
