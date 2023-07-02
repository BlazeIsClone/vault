The HTTP **`Strict-Transport-Security`** response header (often abbreviated as [HSTS](https://developer.mozilla.org/en-US/docs/Glossary/HSTS)) informs browsers that the site should only be accessed using HTTPS, and that any future attempts to access it using HTTP should automatically be converted to HTTPS.

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

![[hsts-request-header.png]]

OWASP Article: [HTTP Strict Transport Security](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html)