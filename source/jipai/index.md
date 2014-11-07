视频接口
=======

创建视频
-------

```shell
$ curl "http://api.pili.qiniu.com/v1/_jipai/videos" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "name": "name",
    "description": "desc"
}'
```

> 返回结果

```json
{
    "id": "54068a9063b906000d000001",
    "name": "name",
    "description": "desc",
    "live_url": {
        "HLS": "http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2.m3u8",
        "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/4q5cdgn2"
    }
}
```

获取视频
-------

```shell
$ curl "http://api.pili.qiniu.com/v1/_jipai/videos/54068a9063b906000d000001" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果

```json
{
    "id": "54068a9063b906000d000001",
    "name": "name",
    "description": "desc",
    "live_url": {
        "HLS": "http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2.m3u8",
        "RTMP": "rtmp://cdn-rtmp.qbox.me/livestream/4q5cdgn2"
    }
}
```

获取推流地址
----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_jipai/videos/54068a9063b906000d000001/push_url" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果

```json
{
    "push_url": "rtmp://115.238.155.183:49166/livestream/4q5cdgn2?nonce=4&token=fdasffda"
}
```
