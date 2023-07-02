The **`X-Content-Type-Options`** response HTTP header is a marker used by the server to indicate that the [MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) advertised in the [`Content-Type`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) headers should be followed and not be changed. The header allows you to avoid [MIME type sniffing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#mime_sniffing) by saying that the MIME types are deliberately configured.

## [Syntax](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options#syntax)

```
X-Content-Type-Options: nosniff
```