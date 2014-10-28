# 授权凭证

## 接口访问凭证

 1. 生成待签名的原始字符串：

    抽取请求URL中`{path}`或`{path}?{query}`的部分与请求内容部分（即HTTP Body），用`\n`连接起来。如无请求内容，该部分必须为空字符串。

    `str = "{path}?{query}\n"`

    或

    `str = "{path}?{query}\n{body}"`

 2. 使用`{secert_key}`对上一步生成的原始字符串计算HMAC-SHA1签名：

    `sign = hmac_sha1(str, "{secret_key}")`

 3. 对签名进行URL安全的Base64编码，生成`encoded_sign`：

    `encoded_sign = urlsafe_base64_encode(sign)`

## 流授权凭证

设备利用在注册时自己生成的`stream_key`，和从设备服务器请求到的推流地址，来生成流授权凭证。

凭证算法：

 1. 使用`{stream_key}`对推流地址进行HMAC-SHA1签名

    `sign = hmac_sha1(url, "{stream_key}")`

 2. 对签名进行URL安全的Base64编码，生成`stream_token`

    `stream_token = urlsafe_base64_encode(sign)`

之后设备推流或者直播时，将流授权凭证加入到url地址的query里，比如设备获得的推流地址是`rtmp://domain:port/path`，那么实际使用`rtmp://domain:port/path?token={stream_token}`的请求进行推流。