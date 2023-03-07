Unlike Apache which defines it’s configuration file at site level, Nginx stores it’s configuration in a central path. We need to make sure that we configure Nginx to point the site directories to serve.

  
### Adding a site to Nginx configuration:

Description

Edit the default nginx configuration file using a text editor (vim/nano), make sure to copy, paste and update the directory name ‘acme’ to your site directory name. Note that we also deny access to .htaccess and xmlrpc.php.

Command

sudo vi /etc/nginx/sites-available/default

Code
```config
location /acme/ {
         index index.php;
         try_files $uri $uri/ /acme/index.php?$args;

          location = /acme/.htaccess {
                deny all;
          }

          location = /acme/xmlrpc.php {
                 deny all;
          }
}
```

### Testing Nginx configuration:

Description

Check whether the nginx configuration file has syntax errors.

Command

sudo nginx -t

Result (output)

nginx: the configuration file /etc/nginx/nginx.conf syntax is ok

nginx: configuration file /etc/nginx/nginx.conf test is successful

### Applying Nginx site configuration:

Description

Restart nginx to apply site configuration.

Command

sudo systemctl restart nginx

Result (output)

// No terminal output

