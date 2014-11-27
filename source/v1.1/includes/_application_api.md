应用配置接口
==========

创建应用
-------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/applications" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "name": "default",
    "notify_url": "http://client.server/streams/notify",
    "storage_period": -1,
    "has_secondary": true,
    "profiles": [
        {
            "width": 1920,
            "height": 1080,
            "bitrate": "4m"
        },
        {
            "width": 1280,
            "height": 720,
            "bitrate": "1000k"
        },
        {
            "width": 720,
            "height": 576,
            "bitrate": "725k"
        },
        {
            "width": 640,
            "height": 480,
            "bitrate": "500k"
        }
    ]
}'
```

> 返回结果

```json
{
    "name": "default",
    "notify_url": "http://client.server/streams/notify",
    "storage_period": -1,
    "has_secondary": true,
    "profiles": [
        {
            "width": 1920,
            "height": 1080,
            "bitrate": "4m"
        },
        {
            "width": 1280,
            "height": 720,
            "bitrate": "1000k"
        },
        {
            "width": 720,
            "height": 576,
            "bitrate": "725k"
        },
        {
            "width": 640,
            "height": 480,
            "bitrate": "500k"
        }
    ]
}
```

查询应用列表
----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/applications?page=1&size=10" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果

```json
{
    "total": 2,
    "applications": [
        {
            "name": "app1",
            "notify_url": "http://client.server/streams/notify",
            "storage_period": -1,
            "has_secondary": true,
            "profiles": [
                {
                    "width": 1920,
                    "height": 1080,
                    "bitrate": "4m"
                },
                {
                    "width": 1280,
                    "height": 720,
                    "bitrate": "1000k"
                },
                {
                    "width": 720,
                    "height": 576,
                    "bitrate": "725k"
                },
                {
                    "width": 640,
                    "height": 480,
                    "bitrate": "500k"
                }
            ]
        },
        {
            "name": "app2",
            "notify_url": "http://client.server/streams/notify",
            "storage_period": -1,
            "has_secondary": true,
            "profiles": [
                {
                    "width": 1920,
                    "height": 1080,
                    "bitrate": "4m"
                },
                {
                    "width": 1280,
                    "height": 720,
                    "bitrate": "1000k"
                },
                {
                    "width": 720,
                    "height": 576,
                    "bitrate": "725k"
                },
                {
                    "width": 640,
                    "height": 480,
                    "bitrate": "500k"
                }
            ]
        }
    ]
}
```

查询应用细节
-----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/applications/app" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果

```json
{
    "name": "app",
    "notify_url": "http://client.server/streams/notify",
    "storage_period": -1,
    "has_secondary": true,
    "profiles": [
        {
            "width": 1920,
            "height": 1080,
            "bitrate": "4m"
        },
        {
            "width": 1280,
            "height": 720,
            "bitrate": "1000k"
        },
        {
            "width": 720,
            "height": 576,
            "bitrate": "725k"
        },
        {
            "width": 640,
            "height": 480,
            "bitrate": "500k"
        }
    ],
    "key1": "key1",
    "secret1": "secret1",
    "key2": "key2",
    "secret2": "secret2"
}
```

删除应用
-------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/applications/app" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X DELETE
```

> 返回结果

```json
{
    "name": "app",
    "notify_url": "http://client.server/streams/notify",
    "storage_period": -1,
    "has_secondary": true,
    "profiles": [
        {
            "name": "raw",
            "width": 4000,
            "height": 3000,
            "bitrate": "16m"
        }
        {
            "name": "1080p"
        },
        {
            "name": "720p"
        },
        {
            "name": "480p"
        }
    ]
}
```

通知接口
-------

```shell
$ curl "http://client.server/streams/notify" \
-H "Content-Type: application/json" \
-X POST
--binary-data '{
    "cmd": "status",
    "data": {
        "status": "connected" // connected, disconnected
    }
}'
```

```shell
$ curl "http://client.server/streams/notify" \
-H "Content-Type: application/json" \
-X POST
--binary-data '{
    "cmd": "mark",
    "data": {
        "id": 1234,
        "status": "pushed" // pushed, converted, downloaded, played
    }
}'
```

> 返回结果

```json
{
    "result": "ok"
}
```
