### Use ufw (uncomplicated firewall) to whitelist ports.

### Prevent exposing web server information (threat: Banner grabbing)

For example, here is the response to a request from an Nginx  server.

```
HTTP/1.1 200 OK
Server: nginx/1.17.3 << nginx version
Date: Thu, 05 Sep 2019 17:50:24 GMT
Content-Type: text/html
```

### Use AppArmor to implement name based access controls.