# 接口返回

接口输入和输出都是用JSON格式。不同的返回码对应不同的格式。

## 200

返回格式参见不同接口的文档

## 204

无返回内容

## 400

```json
{
    "error": 400001,
    "message": "bad request",
    "errors": {
        "field1": {
            "error": 400001,
            "message": "too short"
        },
        "field2": {
            "error": 400002,
            "message": "invalid format"
        }
    }
}
```

## 401/404/500

```json
{
    "error": 401001,
    "message": "no auth"
}
```

`code`为唯一的错误标示码，客户端根据标示码来决定向用户输出的错误信息。`message`主要用于客户端记录log，最好不用于输出。