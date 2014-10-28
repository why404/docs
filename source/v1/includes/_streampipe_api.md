Stream Gateway接口
=================

验证流
-----

> 请求HLS协议的例子

```shell
$ curl "http://api.stream.gateway/v1/_inner/livestreams/3jo78i11/actions/check" \
-d '{
    "url": "http://cdn-ts.qbox.me/api/v2/hls/3jo78i11/timeshift/play/aaif4meq.m3u8?token=rejwkq432jk4",
    "protocol": "HLS",
    "action": "push"
}'
```

> 请求RTMP协议的例子

```shell
$ curl "http://api.stream.gateway/v1/_inner/livestreams/3jo78i11/actions/check" \
-d '{
    "url": "rejwkq432jk4",
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

[申请上推流接口](#shen-qing-shang-tui-liu-jie-kou)，[直播接口](#zhi-bo-jie-kou)和[时移播放接口](#shi-yi-bo-fang-jie-kou)返回的相关url中是不包含token参数的。设备拿到url后，需要自己算出权限token，然后将这个token放在url参数里，再做相应请求。比如设备拿到的推流地址是`rtmp://115.238.155.183:49170/livestream/3jo78i11`，自己计算出的推流token是`rejwkq432jk4`，那么设备会使用`rtmp://115.238.155.183:49170/livestream/3jo78i11?token=rejwkq432jk4`做上传推流。参见[流程](#liu-cheng)描述。

Streamer接到上传请求，直播请求，时移播放请求后，将地址中的推流token作为参数，请求Stream Gateway的本接口，进行验证。

### HTTP请求

`POST /api/v2/_inner/livestreams/{id}/actions/check`

### 请求参数

参数|描述
----|----
url|如果用户请求HLS地址，就是发送到streamer的原始url，如果是RTMP，只需要填写token部分就可以
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

`POST /api/v2/_inner/livestreams/{id}/actions/upload`

### 请求参数

参数|描述
----|----
url|待保存文件地址


删除
----

```shell
$ curl "http://api.stream.gateway/v1/_inner/livestreams/3jo78i11/actions/delete" \
-d '{
    "url": "http://public.qiniudn.com/Fg-EYlzoWtkTEjkuKxUeJI1YZwxP"
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

`POST /api/v2/_inner/livestreams/{id}/actions/delete`

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

`POST /api/v2/_inner/livestreams/{id}/status`

### 请求参数

参数|描述
----|----
status|流当前的状态，状态参见[获取状态接口](#huo-qu-zhuang-tai-jie-kou)

Livestream接口
=============

注册接口
-------

```shell
$ curl "http://api.streamer/v1/livestreams" \
-d '{
    "encrypt": 0,
    "hls_live_storage": "local",
    "protocol": "RTMP"
}'
```

> 返回结果：

```json
{
    "id": "3jo78i11",
    "push_url": "rtmp://115.238.155.183:49170/livestream/3jo78i11",
    "live_url": {
        "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/3jo78i11",
        "HLS": "http://cdn-ts.qbox.me/api/v2/hls/3jo78i11.m3u8"
    }
}
```

此接口返回新注册的livestream。

### HTTP请求

`POST /api/v2/livestreams`

### 请求参数

参数|描述
----|----
encrypt|0表示不加密，1表示加密，默认为0
hls_live_storage|local表示hls直播时使用streamer的上传作为直播地址，cloud表示hls直播时使用用户的云上传做直播地址，默认为local
protocol|直播推流协议，默认为RTMP

注销接口
-------

```shell
$ curl "http://api.streamer/v1/livestreams/3jo78i11" \
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

`POST /api/v2/livestreams/{id}`

### 请求参数

参数|描述
----|----
_action|动作描述，删除动作为DELETE

更新接口
-------

```shell
$ curl "http://api.streamer/v1/livestreams/3jo78i11" \
-d '{
    "_action": "UPDATE",
    "protocol": "RTMP"
}'
```

> 返回结果：

```json
{
    "push_url": "rtmp://115.238.155.183:49170/livestream/3jo78i11",
    "live_url": {
        "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/3jo78i11",
        "HLS": "http://cdn-ts.qbox.me/api/v2/hls/3jo78i11.m3u8"
    }
}
```

此接口更新livestream上推流的接收url。此url在streamer服务重启后应该可以恢复并继续有效。

### HTTP请求

`POST /api/v2/livestreams/{id}`

### 请求参数

参数|描述
----|----
_action|动作描述，推流动作为UPDATE
protocol|推流协议

获取接口
-------

```shell
$ curl "http://api.streamer/v1/livestreams/3jo78i11"
```

> 返回结果：

```json
{
    "id": "3jo78i11",
    "push_url": "rtmp://115.238.155.183:49170/livestream/3jo78i11",
    "live_url": {
        "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/3jo78i11",
        "HLS": "http://cdn-ts.qbox.me/api/v2/hls/3jo78i11.m3u8"
    }
}
```

此接口返回livestream的细节。

### HTTP请求

`GET /api/v2/livestreams/{id}`

### 请求参数

无

获取状态接口
----------

```shell
$ curl "http://api.streamer/v1/livestreams/3jo78i11/status"
```

> 返回结果：

```json
{
    "state": "connect"
}
```

此接口返回livestream对应视频流的状态。

 - register：已注册但没有推流
 - connect：正在推流
 - stop：推流停止
 - nonexist：流不存在
 - unknown：状态未知

### HTTP请求

`GET /api/v2/livestreams/{id}/status`

时移列表接口
----------

```shell
$ curl "http://api.streamer/v1/livestreams/3jo78i11/list"
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

`GET /api/v2/livestreams/{id}/timeshift/list?starttime={starttime}&endtime={endtime}`

### 请求参数

参数|描述|类型|是否可选
----|----|----|-------
starttime|列表内容开始时间|timestamp，microsecond|可选
endtime|列表内容完结时间|timestamp，microsecond|可选

删除时移
-------

```shell
$ curl "http://api.streamer/v1/livestreams/3jo78i11/list" \
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

`POST /api/v2/livestreams/{id}/list`

### 请求参数

参数|描述|类型|是否可选
----|----|----|----
starttime|时移开始时间|timestamp，microsecond|必选
endtime|时移结束时间|timestamp，microsecond|必选

时移播放接口
----------

```shell
$ curl "http://api.streamer/v1/livestreams/3jo78i11/play?starttime=1409926345158"
```

> 返回结果：

```json
{
    "url": "http://cdn-ts.qbox.me/api/v2/hls/3jo78i11/timeshift/play/aaif4meq.m3u8"
}
```

此接口返回livestream时移的播放地址。

### HTTP请求

`GET /api/v2/livestreams/{id}/timeshift/play?starttime={starttime}&endtime={endtime}`

### 请求参数

参数|描述|类型|是否可选
----|----|----|-------
starttime|时移开始时间|timestamp，microsecond|必选
endtime|时移结束时间|timestamp，microsecond|可选
