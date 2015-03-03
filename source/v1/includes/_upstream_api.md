Upstream管理接口
===============

Upstream是rtmp集群内部的配置信息，配置内容为可以处理转发或者存储的的服务器。

对Upstream的修改操作需要使用具有管理员权限的token才能执行。

创建Upstream
------------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/upstreams" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "host": "rtmp.forward.com",
    "type": "forward"
}'
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000002",
    "host": "rtmp.forward.com",
    "type": "forward"
}
```

`type`为`forward`（转发服务器）或者`tsspliter`（ts切分服务器）。

查询Upstream
------------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/upstreams/54068a9063b906000d000002" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000002",
    "host": "rtmp.forward.com",
    "type": "forward"
}
```

获取Upstream列表
--------------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/upstreams" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X GET
```

>返回结果：

```json
[
    {
        "id": "54068a9063b906000d000002",
        "host": "rtmp.forward.com",
        "type": "forward"
    }
]
```

更新Upstream
-----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/upstreams/54068a9063b906000d000002" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X POST \
--data-binary '{
    "host": "rtmp.forward.com"
}'
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000002",
    "host": "rtmp.forward.com",
    "type": "forward"
}
```

删除Upstream
------------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/upstream/54068a9063b906000d000002" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X DELETE
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000002",
    "host": "rtmp.forward.com",
    "type": "forward"
}
```
