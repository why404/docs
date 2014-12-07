用户接口
=======

用户登录
-------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/users/actions/login" \
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
    "refresh_token": "ZmUyNjA4ODktOGEzMS00NTYyLTgwMDItMDc0MWJmMDBlYjlm"
}
```

用户token刷新
------------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/users/actions/refresh" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
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

用户登出
-------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/users/actions/logout" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "refresh_token": "ZmUyNjA4ODktOGEzMS00NTYyLTgwMDItMDc0MWJmMDBlYjlf"
}'
```

> 无返回结果
