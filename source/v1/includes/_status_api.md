Status管理接口
=============

Status定义了一个流的状态，比如是否在推流，已推流容量，对接upstream服务器等信息。

对Status的修改操作需要使用具有管理员权限的token才能执行。

查询Status
----------

```shell
$ curl "http://api.pili.qiniu.com/v1/_management/applications/application_name/stream/stream_name/status" \
-H "Authorization: bearer YTBhNGUyMWQtZmRlYS00YTcwLThkMzAtNGY2MTI1OWU1MjIw" \
-H "Content-Type: application/json" \
-X GET
```

> 返回结果：

```json
{
    "id": "54068a9063b906000d000002",
    "status": "disconnected",
    "upstreams": [
        {
            "id": "54068a9063b906000d000002",
            "host": "rtmp.forward.com",
            "type": "forward"
        }
    ]
}
```
