The **`X-Frame-Options`** [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) response header can be used to indicate whether or not a browser should be allowed to render a page in a [`<frame>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/frame), [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe), [`<embed>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed) or [`<object>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object). Sites can use this to avoid [click-jacking](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#click-jacking) attacks, by ensuring that their content is not embedded into other sites.

```
X-Frame-Options: DENY
X-Frame-Options: SAMEORIGIN
```
