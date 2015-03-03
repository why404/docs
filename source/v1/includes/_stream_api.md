流管理接口
========

创建流
-----

此接口返回注册后的流id和推流地址。

### HTTP请求

`POST /v1/streams`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

参数|描述|是否可选
----|----|------
key|用于计算鉴权token的密钥，参见[推流鉴权](#tui-liu-jian-quan)和[播放鉴权](#bo-fang-jian-quan)，可以使用设备的MAC地址或者随机生成一个字符串|可选，如果不指定，则服务器会随机生成一串key
is_private|是否为私有流。如果值为true，播放时（直播和点播）需要有[播放鉴权](#bo-fang-jian-quan)，值为false时，直接是用播放url播放即可|可选，默认为false
id|流名字，只允许字母数字和以下字符：`-_`|可选，默认会自动生成一个唯一ID

```shell
$ curl "http://api.pili.qiniu.com/v1/streams" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "key": "random_key",
    "is_private": false,
    "id": "stream_name"
}'
```

> 返回结果：

```json
{
    "id": "stream_name",
    "application": "app_name",
    "key": "random_key",
    "is_private": false,
    "publish":[
        {
            "rtmp": "rtmp://domain/app_name/stream_name"
        }
    ],
    "play": {
        "rtmp": "rtmp://domain/app_name/stream_name",
        "hls": "http://domain/v1/play/hls/app_name/stream_name"
    },
    "formats": ["1080p", "720p", "480p"]
}
```


查询流信息
---------

### HTTP请求

`GET /v1/streams/{id}`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

```shell
$ curl "http://api.pili.qiniu.com/v1/streams/stream_name" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果：

```json
{
    "id": "stream_name",
    "application": "app_name",
    "key": "random_key",
    "is_private": false,
    "publish":[
        {
            "rtmp": "rtmp://domain/app_name/stream_name"
        }
    ],
    "play": {
        "rtmp": "rtmp://domain/app_name/stream_name",
        "hls": "http://domain/v1/play/hls/app_name/stream_name"
    },
    "formats": ["1080p", "720p", "480p"]
}
```


查询流列表
---------

### HTTP请求

`GET /v1/streams`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

```shell
$ curl "http://api.pili.qiniu.com/v1/streams" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果：

```json
{
    "total": 1,
    "streams": [
        {
            "id": "stream_name",
            "application": "app_name",
            "key": "random_key",
            "is_private": false,
            "publish":[
                {
                    "rtmp": "rtmp://domain/app_name/stream_name",
                }
            ],
            "play": {
                "rtmp": "rtmp://domain/app_name/stream_name",
                "hls": "http://domain/v1/play/hls/app_name/stream_name"
            },
            "formats": ["1080p", "720p", "480p"]
        }
    ]
}
```


更新流
-----

此接口更新流的相关信息。

### HTTP请求

`POST /v1/streams/{id}`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

参数|描述
----|----
key|用于计算鉴权token的密钥，参见[推流鉴权](#tui-liu-jian-quan)和[播放鉴权](#bo-fang-jian-quan)，可以使用设备的MAC地址或者随机生成一个字符串
is_private|是否为私有流。如果值为true，播放时（直播和点播）需要有[播放鉴权](#bo-fang-jian-quan)，值为false时，直接是用播放url播放即可

```shell
$ curl "http://api.pili.qiniu.com/v1/streams/stream_name" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "key": "random_key",
    "is_private": false,
}'
```

> 返回结果：

```json
{
    "id": "stream_name",
    "application": "app_name",
    "key": "random_key",
    "is_private": false,
    "publish":[
        {
            "rtmp": "rtmp://domain/app_name/stream_name"
        }
    ],
    "play": {
        "rtmp": "rtmp://domain/app_name/stream_name",
        "hls": "http://domain/v1/play/hls/app_name/stream_name"
    },
    "formats": ["1080p", "720p", "480p"]
}
```


删除流
-----

### HTTP请求

`DELETE /v1/streams/{id}`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

无

```shell
$ curl "http://api.pili.qiniu.com/v1/streams/stream_name" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
-H "Content-Type: application/json" \
-X DELETE
```

> 返回结果：

```json
{
    "id": "stream_name",
    "application": "app_name",
    "key": "random_key",
    "is_private": false,
    "publish":[
        {
            "rtmp": "rtmp://domain/app_name/stream_name"
        }
    ],
    "play": {
        "rtmp": "rtmp://domain/app_name/stream_name",
        "hls": "http://domain/v1/play/hls/app_name/stream_name"
    },
    "formats": ["1080p", "720p", "480p"]
}
```


流状态推送接口
------------

### HTTP请求

`GET /v1/streams/{id}/status`

### 认证方法

使用[接口鉴权](#jie-kou-jian-quan)进行认证

`Authorization: pili {access_key}:{encoded_sign}`

### 请求参数

参数|描述
----|----
status|connected表示正在推流，disconnected表示没有推流

```shell
$ curl "http://api.pili.qiniu.com/v1/streams/stream_name/status" \
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


获取回放片段列表
--------------

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

```shell
$ curl "http://api.pili.qiniu.com/v1/streams/stream_name/segments?starttime=1409926345158&endtime=1409932087561" \
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


删除片段
-------

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

```shell
$ curl "http://api.pili.qiniu.com/v1/streams/stream_name/segments?starttime=1409926345158&endtime=1409932087561" \
-H "Authorization: pili {access_key}:{encoded_sign}" \
-H "Content-Type: application/json" \
-X DELETE
```

> 返回结果为空
