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

## 推流凭证

客户在进行推流前，要先计算推流凭证，作为认证信息拼入推流地址，进行推流。客户利用流信息里的`stream_key`，请求有效时间戳和从设备服务器请求到的推流地址，来生成推流凭证。

`因为有效时间戳的创建和验证在不同的服务端进行（在业务服务器创建，在云服务器验证），因此开发者的业务服务器需要尽可能校准标准时间，否则可能出现凭证刚创建就过期等各种奇怪的问题。`

凭证算法：

 1. 计算请求有效时间戳

    假设当前时间为UTC时间`2014-10-01 00:00:00`，预计10分钟内会发起请求，则请求有效时间截止到UTC时间`2014-10-01 00:10:00`，求得对应的UNIX时间戳为`1412122200`。

 2. 将时间戳拼入上推地址

    假设推流地址为`rtmp://115.238.155.183:49166/livestream/4q5cdgn2`，拼接后的推流地址是`rtmp://115.238.155.183:49166/livestream/4q5cdgn2?t=1412122200`

 3. 使用`{stream_key}`对拼接后的推流地址进行HMAC-SHA1签名

    `sign = hmac_sha1("rtmp://115.238.155.183:49166/livestream/4q5cdgn2?t=1412122200", "{stream_key}")`

 4. 对签名进行URL安全的Base64编码，生成`token`

    `token = urlsafe_base64_encode(sign)`

 5. 推流

    之后客户推流时，将推流凭证加入到url地址的query里，实际使用`rtmp://115.238.155.183:49166/livestream/4q5cdgn2?t=1412122200&token={token}`的请求进行推流。

## 播放凭证

播放凭证仅用于`is_private`为`true`的流的直播和回放。对于`is_private`为`false`的流，直接使用播放地址就可以播放，不需要凭证。

对于`is_private`为`true`的流，不管是直播还是回放，客户在进行播放前，要先计算播放凭证，作为认证信息拼入播放地址，进行播放。客户使用自己的`access_key`和`secret_key`，过期时间戳和从设备服务器请求到的播放地址，来生成播放凭证。

`因为有效时间戳的创建和验证在不同的服务端进行（在业务服务器创建，在云服务器验证），因此开发者的业务服务器需要尽可能校准标准时间，否则可能出现凭证刚创建就过期等各种奇怪的问题。`
凭证算法：

 1. 将过期时间戳拼入播放地址

    假设过期时间戳为`1412122200`，播放地址为`http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2.m3u8`，拼接后的推流地址是`http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2.m3u8?t=1412122200`

 3. 使用`{secert_key}`对拼接后的推流地址进行HMAC-SHA1签名

    `sign = hmac_sha1("http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2.m3u8?t=1412122200", "{secert_key}")`

 4. 对签名进行URL安全的Base64编码，生成`token`

    `token = urlsafe_base64_encode(sign)`

 5. 播放

    之后客户播放时，将`access_key`和播放凭证加入到url地址的query里，实际使用`http://cdn-ts.qbox.me/api/v1/hls/4q5cdgn2.m3u8?t=1412122200&token={access_key}:{stream_token}`的请求进行播放。
