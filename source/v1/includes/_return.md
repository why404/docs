# 接口返回

接口输入和输出都是用JSON格式。不同的返回码对应不同的格式。

## 200

返回格式参见不同接口的文档

## 204

无返回内容

## 400

```json
{
    "error": 400000,
    "message": "bad request",
    "details": {
        "field1": {
            "error": 400001,
            "message": "invalid string"
        },
        "field2": {
            "error": 400004,
            "message": "invalid bool"
        }
    }
}
```

`error`为唯一的错误标示码，客户端根据标示码来决定向用户输出的错误信息。`message`主要用于客户端记录log，最好不用于输出。｀details`用于记录请求中具体某个字段的错误原因。

error|message|说明
------|------|----
invalid json|400000|输入请求不符合json语法
invalid string|400001|输入格式不是字符串
string should NOT empty|400002|字符串不应为空
invalid number|400003|输入格式不是有效数字
invalid bool|400004|输入格式不是布尔型
need protocol|400011|需要给出protocol参数
invalid protocol|400012|无效的protocol参数
need starttime|400013|需要给出starttime参数
need endtime|400014|需要给出endtime参数

## 401/404/500

```json
{
    "error": 401001,
    "message": "invalid authorization"
}
```

`error`为唯一的错误标示码，客户端根据标示码来决定向用户输出的错误信息。`message`主要用于客户端记录log，最好不用于输出。

http code|error|message|说明
---------|-----|-------|----
401|invalid authorization|401001|无效的鉴权方式
403|token is invalid or has been expired|403001|token无效或者已经过期
404|not found|404001|找不到要操作的资源