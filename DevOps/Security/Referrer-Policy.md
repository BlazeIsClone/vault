The **`Referrer-Policy`** [HTTP header](https://developer.mozilla.org/en-US/docs/Glossary/HTTP_header) controls how much [referrer information](https://developer.mozilla.org/en-US/docs/Web/Security/Referer_header:_privacy_and_security_concerns) (sent with the [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) header) should be included with requests. Aside from the HTTP header, you can [set this policy in HTML](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy#integration_with_html).

## [Syntax](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy#syntax)

```
Referrer-Policy: no-referrer
Referrer-Policy: no-referrer-when-downgrade
Referrer-Policy: origin
Referrer-Policy: origin-when-cross-origin
Referrer-Policy: same-origin
Referrer-Policy: strict-origin
Referrer-Policy: strict-origin-when-cross-origin
Referrer-Policy: unsafe-url
```