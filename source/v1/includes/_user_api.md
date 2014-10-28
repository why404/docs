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
    "access_token": "management:YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw",
    "expires_in": 3600,
    "refresh_token": "ZmUyNjA4ODktOGEzMS00NTYyLTgwMDItMDc0MWJmMDBlYjlm"
}
```

用户token刷新
------------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/users/actions/refresh" \
-H "Authorization: bearer admin:YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "refresh_token": "ZmUyNjA4ODktOGEzMS00NTYyLTgwMDItMDc0MWJmMDBlYjlm"
}'
```

> 返回结果

```json
{
    "access_token": "management:YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIk",
    "expires_in": 3600,
    "refresh_token": "ZmUyNjA4ODktOGEzMS00NTYyLTgwMDItMDc0MWJmMDBlYjlf"
}
```

用户登出
-------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/users/actions/logout" \
-H "Authorization: bearer admin:YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "refresh_token": "ZmUyNjA4ODktOGEzMS00NTYyLTgwMDItMDc0MWJmMDBlYjlf"
}'
```

> 无返回结果

得到用户信息
-----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/users" \
-H "Authorization: bearer admin:YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json"
```

> 返回结果

```json
{
    "id": "54068a9063b906000d000001",
    "email": "name@domain.com",
    "role": "client",
    "key1": {
        "access": "xxx",
        "secret": "xxx",
        "created_at": "2014-10-26T11:10:00Z"
    },
    "key2": {
        "access": "xxx",
        "secret": "xxx",
        "created_at": "2014-10-26T11:10:00Z"
    }
}
```

更新用户信息
-----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/users" \
-H "Authorization: bearer admin:YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "email": "name@domain.com",
    "password": "password",
    "key1": {}
}'
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000001",
    "email": "name@domain.com",
    "role": "client",
    "key1": {
        "access": "xxx",
        "secret": "xxx",
        "created_at": "2014-10-26T11:10:00Z"
    },
    "key2": {
        "access": "xxx",
        "secret": "xxx",
        "created_at": "2014-10-26T11:10:00Z"
    }
}
```
