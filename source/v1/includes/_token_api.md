Token接口
=======

Token登录
-------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/tokens/actions/login" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "email": "name@domain.com",
    "password": "password"
}'
```

> 返回结果

```json
{
    "access_token": "YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw",
    "expires_in": 3600,
    "refresh_token": "ZmUyNjA4ODktOGEzMS00NTYyLTgwMDItMDc0MWJmMDBlYjlm",
    "type": 0,
    "user_id": 123
}
```

切换Token
-------

只有具有管理员权限的access token，才能执行切换Token操作。切换Token后，客户端可以同时持有两个access token并根据不同需求使用不同的token操作api（比如为Token创建Application）。

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/tokens/actions/su" \
-H "Authorization: Bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "email": "name@domain.com",
}'
```

> 返回结果

```json
{
    "access_token": "YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw",
    "expires_in": 3600,
    "refresh_token": "ZmUyNjA4ODktOGEzMS00NTYyLTgwMDItMDc0MWJmMDBlYjlm",
    "type": 0,
    "user_id": 123
}
```

Tokentoken刷新
------------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/tokens/actions/refresh" \
-H "Authorization: Bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "refresh_token": "ZmUyNjA4ODktOGEzMS00NTYyLTgwMDItMDc0MWJmMDBlYjlm"
}'
```

> 返回结果

```json
{
    "access_token": "YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIk",
    "expires_in": 3600,
    "refresh_token": "ZmUyNjA4ODktOGEzMS00NTYyLTgwMDItMDc0MWJmMDBlYjlf"
}
```

Token登出
-------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/tokens/actions/logout" \
-H "Authorization: Bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "refresh_token": "ZmUyNjA4ODktOGEzMS00NTYyLTgwMDItMDc0MWJmMDBlYjlf"
}'
```

> 无返回结果
