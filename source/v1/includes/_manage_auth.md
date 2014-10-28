# 授权凭证

## 管理凭证

API使用七牛[管理凭证](http://developer.qiniu.com/docs/v6/api/reference/security/access-token.html)作为检验请求合法性的机制。建议仅在设备管理服务器端使用这一类凭证，避免意外授权导致滥用。

## 设备凭证

设备利用在注册时自己生成的ukey，和从设备服务器请求到的推流地址，来生成设备凭证。

凭证算法：

 1. 使用ukey对推流地址进行HMAC-SHA1签名

    `sign = hmac_sha1(push_url, "<ukey>")`

 2. 对签名进行URL安全的Base64编码，生成key

    `pkey = urlsafe_base64_encode(sign)`

之后设备推流时，将设备凭证加入到推流地址的query里，比如设备获得的推流地址是`rtmp://domain:port/path`，那么实际使用`rtmp://domain:port/path?key={key}`的请求进行推流。