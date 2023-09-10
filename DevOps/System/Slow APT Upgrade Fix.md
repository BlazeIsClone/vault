The default config uses Ipv6 to establish connections and upgrade the packages and IPv4 is disabled by default. This solution enables precedence for IPv4 addresses by enabling Ipv4. It did not help to execute it in seconds but did speed up the process a little bit as expected.

I found the following solution:

```bash
sudo vi /etc/gai.conf
```

Uncomment the following line:

```
precedence ::ffff:0:0/96 100
```

For me it was line 54 (make sure you don't uncomment the one that ends in `10`).

Save and exit.

```bash
sudo vi /etc/apt/apt.conf.d/99force-ipv4 # (this is to make a new file)
```

Add the following line to the new file:

```
Acquire::ForceIPv4 false;
```

Save and exit.