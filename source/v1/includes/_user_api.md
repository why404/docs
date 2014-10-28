用户接口
=======

用户登录
-------

```shell
$ curl "http://api.pili.io/v1/_management/users/actions/login" \
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
$ curl "http://api.pili.io/v1/_management/users/actions/refresh" \
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
$ curl "http://api.pili.io/v1/_management/users/actions/logout" \
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
$ curl "http://api.pili.io/v1/_management/users" \
-H "Authorization: bearer admin:YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json"
```

> 返回结果

```json
{
    "id": "54068a9063b906000d000001",
    "email": "name@domain.com",
    "role": "client",
    "access_key1": "xxx",
    "secret_key1": "xxx",
    "key1_created_at": "2014-10-26T11:10:00Z",
    "access_key2": "yyy",
    "secret_key2": "yyy",
    "key2_created_at": "2014-10-26T11:10:00Z"
}
```

更新用户信息
-----------

```shell
$ curl "http://api.pili.io/v1/_management/users" \
-H "Authorization: bearer admin:YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "email": "name@domain.com",
    "password": "password",
    "reset_key": "key1"
}'
```

> `reset_key`标示重置某对access_key/secret_key。如果给出key1，对应access_key1/secret_key1，如果给出key2，对应access_key2/secret_key2。一次只能重置一对key

> 返回结果：

```json
{
    "id": "54068a9063b906000d000001",
    "email": "name@domain.com",
    "role": "client",
    "access_key1": "xxx",
    "secret_key1": "xxx",
    "key1_created_at": "2014-10-26T11:10:00Z",
    "access_key2": "yyy",
    "secret_key2": "yyy"
    "key2_created_at": "2014-10-26T11:10:00Z"
}
```

删除用户
-------

```shell
$ curl "http://api.pili.io/v1/_management/users/actions/delete" \
-H "Authorization: bearer admin:YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST
```

> 无返回结果，相关token也会失效
