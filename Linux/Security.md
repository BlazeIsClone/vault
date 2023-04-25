### Use ufw (uncomplicated firewall) to whitelist ports.

### Prevent exposing web server information (threat: Banner grabbing)

For example, here is the response to a request from an Nginx  server.

```
HTTP/1.1 200 OK
Server: nginx/1.17.3 << nginx version
Date: Thu, 05 Sep 2019 17:50:24 GMT
Content-Type: text/html
```

### Disallow direct access to server

Most of the websites don’t use an SSL Certificate to secure their root server’s IP-address.  And, it allows the user to access the website without an SSL Certificate. In malware communication such connections can be used to download payloads or for subsequent C2 communications or P2P botnet connections.

### Use AppArmor to implement name based access controls.

### Domain based php-fpm processors

## Disable Root Login

https://www.digitalocean.com/community/tutorials/how-to-disable-root-login-on-ubuntu-20-04