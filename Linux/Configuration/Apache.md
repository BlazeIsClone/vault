```.htaccess
# BEGIN Blocking xmlrpc.php

<Files xmlrpc.php>
order deny,allow
deny from all
</Files>

# END Blocking xmlrpc.php


# BEGIN Maintenance mode

RewriteEngine On

RewriteCond %{REQUEST_URI} ^/(wp-admin|wp-login\.php)
RewriteRule ^ - [L]

RewriteRule ^$ /landing.html [L]

# END Maintenance mode
```
