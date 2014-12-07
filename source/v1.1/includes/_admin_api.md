管理员接口
=========

管理员登录
---------

```shell
$ curl "http://api.pili.qiniu.com/v1/_admin/admin/actions/login" \
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
    "access_token": "admin:YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw",
    "expires_in": 3600,
    "refresh_token": "ZmUyNjA4ODktOGEzMS00NTYyLTgwMDItMDc0MWJmMDBlYjlm"
}
```

管理员token刷新
--------------

```shell
$ curl "http://api.pili.qiniu.com/v1/_admin/admin/actions/refresh" \
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
    "access_token": "admin:YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIk",
    "expires_in": 3600,
    "refresh_token": "ZmUyNjA4ODktOGEzMS00NTYyLTgwMDItMDc0MWJmMDBlYjlf"
}
```

管理员登出
---------

```shell
$ curl "http://api.pili.qiniu.com/v1/_admin/admin/actions/logout" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
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
$ curl "http://api.pili.qiniu.com/v1/_admin/users?email=name@domain.com" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json"
```

> 返回结果

```json
[
    {
        "id": "54068a9063b906000d000001",
        "email": "name@domain.com",
        "max_applications": 10
    }
]
```

更新用户信息
-----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_admin/users/54068a9063b906000d000001" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "role": "admin",
    "max_applications": 10
}'
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000001",
    "email": "name@domain.com",
    "max_applications": 10
}
```
