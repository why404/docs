Profile管理接口
==============

Profile定义了一个视频编码的格式标准。系统默认有一组可选的Profile。

创建Profile
----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/profiles" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "name": "1080p",
    "width": 1920,
    "height": 1080,
    "bitrate": "4m",
    "price_factor": 4.0
}'
```

> 返回结果：

```json
{
    "name": "1080p",
    "width": 1920,
    "height": 1080,
    "bitrate": "4m",
    "price_factor": 4.0
}
```

查询Profile
----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/profiles/1080p" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果：

```json
{
    "name": "1080p",
    "width": 1920,
    "height": 1080,
    "bitrate": "4m",
    "price_factor": 4.0
}
```

获取Profile列表
--------------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/profiles" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X GET
```

>返回结果：

```json
{
    "profiles": [
        {
            "name": "1080p",
            "width": 1920,
            "height": 1080,
            "bitrate": "4m",
            "price_factor": 4.0
        },
        {
            "name": "720p",
            "width": 1280,
            "height": 720,
            "bitrate": "1000k",
            "price_factor": 1.0
        },
        {
            "name": "480p",
            "width": 640,
            "height": 480,
            "bitrate": "500k",
            "price_factor": 0.25
        }
    ]
}
```

更新Profile
-----------

```shell
$ curl "http://api.pili.qiniu.com/v1/profiles/1080p" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "name": "1080p",
    "width": 1920,
    "height": 1080,
    "bitrate": "4m",
    "price_factor": 4.0
}'
```

> 返回结果：

```json
{
    "name": "1080p",
    "width": 1920,
    "height": 1080,
    "bitrate": "4m",
    "price_factor": 4.0
}
```

删除Profile
-----------

```shell
$ curl "http://api.pili.qiniu.com/v1/profiles/1080p" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X DELETE
```

> 返回结果：

```json
{
    "name": "1080p",
    "width": 1920,
    "height": 1080,
    "bitrate": "4m",
    "price_factor": 4.0
}
```
