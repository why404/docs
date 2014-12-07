Profile管理接口
==============

Profile定义了一个视频编码的格式标准。系统默认有一组可选的Profile。

创建Profile
----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_admin/profiles" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "user_id": "54068a9063b906000d000001",
    "name": "1080p",
    "width": 1920,
    "height": 1080,
    "kbitrate": 4000,
    "price_factor": 4.0
}'
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000002",
    "user": {
        "id": "54068a9063b906000d000001",
        "email": "name@domain.com",
        "max_applications": 10
    }
    "name": "1080p",
    "width": 1920,
    "height": 1080,
    "kbitrate": 4000,
    "price_factor": 4.0
}
```

创建时可以不给出`user_id`，不带`user_id`的profile为预定义profile，所有用户可见。带有`user_id`的profile，只有相应用户可见。

查询Profile
----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_admin/profiles/54068a9063b906000d000002" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000002",
    "name": "1080p",
    "width": 1920,
    "height": 1080,
    "kbitrate": 4000,
    "price_factor": 4.0
}
```

获取Profile列表
--------------

```shell
$ curl "http://api.pili.qiniu.com/v1/_admin/profiles?user_id=54068a9063b906000d000002" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X GET
```

>返回结果：

```json
[
    {
        "id": "54068a9063b906000d000002",
        "user": {
            "id": "54068a9063b906000d000001",
            "email": "name@domain.com",
            "max_applications": 10
        },
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

更新Profile
-----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_admin/profiles/54068a9063b906000d000002" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "name": "1080p",
    "width": 1920,
    "height": 1080,
    "kbitrate": 4000,
    "price_factor": 4.0
}'
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000002",
    "user": {
        "id": "54068a9063b906000d000001",
        "email": "name@domain.com",
        "max_applications": 10
    },
    "name": "1080p",
    "width": 1920,
    "height": 1080,
    "kbitrate": 4000,
    "price_factor": 4.0
}
```

删除Profile
-----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_admin/profiles/1080p" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X DELETE
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000002",
    "user": {
        "id": "54068a9063b906000d000001",
        "email": "name@domain.com",
        "max_applications": 10
    },
    "name": "1080p",
    "width": 1920,
    "height": 1080,
    "kbitrate": 4000,
    "price_factor": 4.0
}
```
