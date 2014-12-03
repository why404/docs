应用配置接口
==========

创建应用
-------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/applications" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "name": "default",
    "notify_url": "http://client.server/streams/notify",
    "storage_period": -1,
    "has_secondary": true,
    "profiles": [
        "1080p", "720p", "480p"
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
        "1080p", "720p", "480p"
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
                "1080p", "720p", "480p"
            ]
        },
        {
            "name": "app2",
            "notify_url": "http://client.server/streams/notify",
            "storage_period": -1,
            "has_secondary": true,
            "profiles": [
                "1080p"
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
        "1080p", "720p", "480p"
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
        "1080p", "720p", "480p"
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
