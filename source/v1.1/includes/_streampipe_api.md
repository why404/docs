Stream Gateway接口
=================

验证流
-----

> 请求HLS协议的例子

```shell
$ curl "http://api.stream.gateway/v1/_inner/livestreams/3jo78i11/actions/check" \
-d '{
    "query": "e=1414671959&token=rejwkq432jk4",
    "protocol": "HLS",
    "action": "push"
}'
```

> 请求RTMP协议的例子

```shell
$ curl "http://api.stream.gateway/v1/_inner/livestreams/3jo78i11/actions/check" \
-d '{
    "query": "e=1414671959&token=rejwkq432jk4",
    "protocol": "RTMP",
    "action": "push"
}'
```

> 返回结果：

```json
{
    "result": "ok"
}
```

此接口为Stream Gateway内部提供给Streamer检验推流有效性使用，不对外公开。

[申请上推流接口](#shen-qing-shang-tui-liu-jie-kou)，[直播接口](#zhi-bo-jie-kou)和[时移播放接口](#shi-yi-bo-fang-jie-kou)返回的相关url中是不包含query参数的。设备拿到url后，需要自己计算凭证，然后将凭证放在url的query参数里，再做相应请求。比如设备拿到的推流地址是`rtmp://115.238.155.183:49170/livestream/3jo78i11`，根据凭证算法算得推流时的凭证请求为`e=1414671959&token=rejwkq432jk4`，那么设备会使用`rtmp://115.238.155.183:49170/livestream/3jo78i11?e=1414671959&token=rejwkq432jk4`做上传推流。参见[流程](#liu-cheng)描述。

Streamer接到上传请求，直播请求，时移播放请求后，将地址中的query部分作为参数，请求Stream Gateway的本接口，进行验证。

不要改变query的原始顺序。

### HTTP请求

`POST /v1/_inner/livestreams/{sid}/actions/check`

### 请求参数

参数|描述
----|----
query|用户请求时所用地址的query部分。请不要改变query的原始顺序。
protocol|用户请求的协议，RTMP或者是HLS
action|对url的请求操作，如果是推流，为push，如果是直播或者时移回放，使用play

上传
----

```shell
$ curl "http://api.stream.gateway/v1/_inner/livestreams/3jo78i11/actions/upload" \
-d '{
    "url": "http://115.238.155.183:80/hls/3jo78i11/2014/0907/03/20140907032336.ts"
}'
```

> 返回结果：

```json
{
    "url": "http://public.qiniudn.com/Fg-EYlzoWtkTEjkuKxUeJI1YZwxP"
}
```

此接口为Stream Gateway内部提供给Streamer上传文件使用，不对外公开

### HTTP请求

`POST /v1/_inner/livestreams/{sid}/actions/upload`

### 请求参数

参数|描述
----|----
url|待保存文件地址


删除
----

```shell
$ curl "http://api.stream.gateway/v1/_inner/livestreams/3jo78i11/actions/delete" \
-d '{
    "url": [
        "http://public.qiniudn.com/Fg-EYlzoWtkTEjkuKxUeJI1YZwxP",
        "http://public.qiniudn.com/Fg-EYlzoWtkTEjkuKxUeJI1YZwxZ",
        "http://public.qiniudn.com/Fg-EYlzoWtkTEjkuKxUeJI1YZwxD"
    ]
}'
```

> 返回结果：

```json
{
    "result": "ok"
}
```

此接口为Stream Gateway内部提供给Streamer删除文件使用，不对外公开

### HTTP请求

`POST /v1/_inner/livestreams/{sid}/actions/delete`

### 请求参数

参数|描述
----|----
url|待删除文件地址

状态更新
-------

```shell
$ curl "http://api.stream.gateway/v1/_inner/livestreams/3jo78i11/status" \
-d '{
    "status": "connect"
}'
```

> 返回结果：

```json
{
    "result": "ok"
}
```

当livestreams某个流有状态变化时，调用此接口通知Stream Gateway删除对应切片存档。

### HTTP请求

`POST /v1/_inner/livestreams/{sid}/status`

### 请求参数

参数|描述
----|----
status|流当前的状态，状态参见[获取状态接口](#huo-qu-zhuang-tai-jie-kou)

标记通知
-------

```shell
$curl "http://api.stream.gateway/v1/_inner/livestreams/3jo78i11/mark" \
-d '{
    "id": "1234",
    "adjust_ms": 123,
    "status": "pushed"
}'
```

> 返回结果：

```json
{
    "result": "ok"
}
```

当livestreams的onTrack mark流过不同的处理程序时，调用此接口通知Stream Gateway通过的状态。

status含有pushed（接受了推流），converted（进行了转码），downloaded（发送给了客户端）

Livestream接口
=============

注册接口
-------

```shell
$ curl "http://api.streamer/v3/livestreams" \
-d '{
    "encrypt": 0,
    "live_storage": "local",
    "has_secondary": true,
    "profiles": [
        {
            "name": "1080p",
            "width": 1920,
            "height": 1080,
            "bitrate": "4m"
        },
        {
            "name": "720p",
            "width": 1280,
            "height": 720,
            "bitrate": "1000k"
        },
        {
            "name": "480p",
            "width": 640,
            "height": 480,
            "bitrate": "500k"
        }
    ]
}'
```

> 返回结果：

```json
{
    "sid": "3jo78i11",
    "push_url": [
        {
            "RTMP": "rtmp://115.238.155.183:49166/livestream/4q5cdgn2_primary",
            "PFSP": "pfsp://115.238.155.183:8000/4q5cdgn2_primary"
        },
        {
            "RTMP": "rtmp://115.238.155.183:49166/livestream/4q5cdgn2_secondary",
            "PFSP": "pfsp://115.238.155.183:8000/4q5cdgn2_secondary"
        }
    ]
    "live_url": {
        "1080p": {
            "HLS": "http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2_1080p.m3u8",
            "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/4q5cdgn2_1080p"
        },
        "720p": {
            "HLS": "http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2_720p.m3u8",
            "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/4q5cdgn2_720p"
        },
        "480p": {
            "HLS": "http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2_480p.m3u8",
            "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/4q5cdgn2_480p"
        },
    }
}
```

此接口返回新注册的livestream。

协议名|协议
-----|-----
RTMP|Adobe Flash定义的实时多媒体流传输协议
PFSP|自定义传输协议
HLS|Apple定义的多媒体流传输协议

### HTTP请求

`POST /v1/livestreams`

### 请求参数

参数|描述
----|----
encrypt|0表示不加密，1表示加密，默认为0
live_storage|local表示直播时使用streamer的上传作为直播地址，cloud表示直播时使用用户的云上传做直播地址，默认为local

注销接口
-------

```shell
$ curl "http://api.streamer/v3/livestreams/3jo78i11" \
-d '{
    "_action": "DELETE"
}'
```

> 返回结果：

```json
{
    "result": "ok"
}
```

此接口注销一个livestream。注销时应该调用[删除](#shan-chu)接口删掉所有已有的存储。

### HTTP请求

`POST /v1/livestreams/{sid}`

### 请求参数

参数|描述
----|----
_action|动作描述，删除动作为DELETE

获取接口
-------

```shell
$ curl "http://api.streamer/v3/livestreams/3jo78i11"
```

> 返回结果：

```json
{
    "sid": "3jo78i11",
    "push_url": [
        {
            "RTMP": "rtmp://115.238.155.183:49166/livestream/4q5cdgn2_primary",
            "PFSP": "pfsp://115.238.155.183:8000/4q5cdgn2_primary"
        },
        {
            "RTMP": "rtmp://115.238.155.183:49166/livestream/4q5cdgn2_secondary",
            "PFSP": "pfsp://115.238.155.183:8000/4q5cdgn2_secondary"
        }
    ]
    "live_url": {
        "1080p": {
            "HLS": "http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2_1080p.m3u8",
            "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/4q5cdgn2_1080p"
        },
        "720p": {
            "HLS": "http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2_720p.m3u8",
            "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/4q5cdgn2_720p"
        },
        "480p": {
            "HLS": "http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2_480p.m3u8",
            "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/4q5cdgn2_480p"
        },
    }
}
```

此接口返回livestream的细节。

### HTTP请求

`GET /v1/livestreams/{sid}`

### 请求参数

无

获取状态接口
----------

```shell
$ curl "http://api.streamer/v3/livestreams/3jo78i11/status"
```

> 返回结果：

```json
{
    "status": "connect"
}
```

此接口返回livestream对应视频流的状态。

 - register：已注册但没有推流
 - connect：正在推流
 - stop：推流停止
 - nonexist：流不存在
 - unknown：状态未知

### HTTP请求

`GET /v1/livestreams/{sid}/status`

时移列表接口
----------

```shell
$ curl "http://api.streamer/v3/livestreams/3jo78i11/timeshift/list"
```

> 返回结果：

```json
{
    "list": [
        {"starttime": 1409926345158, "endtime": 1409926837567},
        {"starttime": 1409929883546, "endtime": 1409932087561}
    ]
}
```

此接口返回livestream对应上传的视频流时移列表。

### HTTP请求

`GET /v1/livestreams/{sid}/timeshift/list?starttime={starttime}&endtime={endtime}`

### 请求参数

参数|描述|类型|是否可选
----|----|----|-------
starttime|列表内容开始时间|timestamp，microsecond|可选
endtime|列表内容完结时间|timestamp，microsecond|可选

删除时移
-------

```shell
$ curl "http://api.streamer/v3/livestreams/3jo78i11/timeshift/list" \
-d '{
    "_action": "DELETE",
    "starttime": 1409926345158,
    "endtime": 1409926837567
}'
```

> 返回结果：

```json
{
    "result": "ok"
}
```

此接口删除指定时间内的时移片段。如果删除时移时有切片文件不再被索引，需要调用Stream Gateway的[删除](#shan-chu)接口删除对应切片。

### HTTP请求

`POST /v1/livestreams/{sid}/timeshift/list`

### 请求参数

参数|描述|类型|是否可选
----|----|----|----
starttime|时移开始时间|timestamp，microsecond|必选
endtime|时移结束时间|timestamp，microsecond|必选

时移播放接口
----------

```shell
$ curl "http://api.streamer/v3/livestreams/3jo78i11/timeshift/play?starttime=1409926345158"
```

> 返回结果：

```json
{
    "url": "http://cdn-ts.qbox.me/api/v1/hls/3jo78i11/timeshift/play/aaif4meq.m3u8"
}
```

此接口返回livestream时移的播放地址。

### HTTP请求

`GET /v1/livestreams/{sid}/timeshift/play?starttime={starttime}&endtime={endtime}`

### 请求参数

参数|描述|类型|是否可选
----|----|----|-------
starttime|时移开始时间|timestamp，microsecond|必选
endtime|时移结束时间|timestamp，microsecond|可选

错误返回
=======

```json
{
    "error": 100001,
    "message": "no auth"
}
```

`error`为唯一的错误标示码，客户端根据标示码来决定向用户输出的错误信息。`message`主要用于客户端记录log，最好不用于输出。