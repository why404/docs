User接口
=======

User信息查询
-------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/users/123" \
-H "Authorization: Bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-X GET
```

> 返回结果

```json
{
    "user_id": 123,
    "email": "test@pili.io",
    "max_applications": 2,
    "key": {
        "access": "access_key",
        "secret": "secret_key"
    }
}
```

User更新
-------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/users/123" \
-H "Authorization: Bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "email": "name@domain.com",
    "key": {}
}'
```

> 返回结果

```json
{
    "user_id": 123,
    "email": "name@domain.com",
    "max_applications": 2,
    "key": {
        "access": "new_access_key",
        "secret": "new_secret_key"
    }
}
```
