Hub配置接口
==========

获取Profile列表
--------------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/profiles" \
-H "Authorization: Bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X GET
```

>返回结果：

```json
[
    {
        "id": "54068a9063b906000d000002",
        "name": "1080p",
        "width": 1920,
        "height": 1080,
        "kbitrate": 4000,
        "price_factor": 4.0
    },
    {
        "id": "54068a9063b906000d000003",
        "name": "720p",
        "width": 1280,
        "height": 720,
        "kbitrate": 1000,
        "price_factor": 1.0
    },
    {
        "id": "54068a9063b906000d000004",
        "name": "480p",
        "width": 640,
        "height": 480,
        "kbitrate": 500,
        "price_factor": 0.25
    }
]
```

创建Hub
-------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/applications" \
-H "Authorization: Bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "id": "default",
    "storage_period": -1,
    "profiles_id": [
        "54068a9063b906000d000002",
        "54068a9063b906000d000003",
        "54068a9063b906000d000004"
    ]
}'
```

> 返回结果

```json
{
    "id": "default",
    "storage_period": -1,
    "profiles": [
        {
            "id": "54068a9063b906000d000002",
            "name": "1080p",
            "width": 1920,
            "height": 1080,
            "kbitrate": 4000,
        },
        {
            "id": "54068a9063b906000d000003",
            "name": "720p",
            "width": 1280,
            "height": 720,
            "kbitrate": 1000,
        },
        {
            "id": "54068a9063b906000d000004",
            "name": "480p",
            "width": 640,
            "height": 480,
            "kbitrate": 500,
        }
    ],
    "key": {
        "access": "xx",
        "secret": "yy"
    }
}
```

查询Hub列表
----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/applications?page=1&size=10" \
-H "Authorization: Bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果

```json
[
    {
        "id": "app1",
        "storage_period": -1,
        "profiles": [
            {
                "id": "54068a9063b906000d000002",
                "name": "1080p",
                "width": 1920,
                "height": 1080,
                "kbitrate": 4000,
            },
            {
                "id": "54068a9063b906000d000003",
                "name": "720p",
                "width": 1280,
                "height": 720,
                "kbitrate": 1000,
            },
            {
                "id": "54068a9063b906000d000004",
                "name": "480p",
                "width": 640,
                "height": 480,
                "kbitrate": 500,
            }
        ],
        "key": {
            "access": "xx",
            "secret": "yy"
        }
    },
    {
        "id": "app2",
        "notify_url": "http://client.server/streams/notify",
        "storage_period": -1,
        "has_secondary": true,
        "profiles": [
            {
                "id": "54068a9063b906000d000002",
                "name": "1080p",
                "width": 1920,
                "height": 1080,
                "kbitrate": 4000,
            }
        ],
        "key": {
            "access": "xx",
            "secret": "yy"
        }
    }
]
```

查询Hub细节
-----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/applications/default" \
-H "Authorization: Bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果

```json
{
    "id": "default",
    "storage_period": -1,
    "profiles": [
        {
            "id": "54068a9063b906000d000002",
            "name": "1080p",
            "width": 1920,
            "height": 1080,
            "kbitrate": 4000,
        },
        {
            "id": "54068a9063b906000d000003",
            "name": "720p",
            "width": 1280,
            "height": 720,
            "kbitrate": 1000,
        },
        {
            "id": "54068a9063b906000d000004",
            "name": "480p",
            "width": 640,
            "height": 480,
            "kbitrate": 500,
        }
    ],
    "key": {
        "access": "xx",
        "secret": "yy"
    }
}
```

删除Hub
-------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/applications/default" \
-H "Authorization: Bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X DELETE
```

> 返回结果

```json
{
    "id": "default",
    "storage_period": -1,
    "profiles": [
        {
            "id": "54068a9063b906000d000002",
            "name": "1080p",
            "width": 1920,
            "height": 1080,
            "kbitrate": 4000,
        },
        {
            "id": "54068a9063b906000d000003",
            "name": "720p",
            "width": 1280,
            "height": 720,
            "kbitrate": 1000,
        },
        {
            "id": "54068a9063b906000d000004",
            "name": "480p",
            "width": 640,
            "height": 480,
            "kbitrate": 500,
        }
    ],
    "key": {
        "access": "xx",
        "secret": "yy"
    }
}
```

流管理接口（注意）
===============

流管理的url需要变动，由`/v1/hubs/{hub_id}/streams...`变为`/v1/_management/hubs/{hub id}/stream...`