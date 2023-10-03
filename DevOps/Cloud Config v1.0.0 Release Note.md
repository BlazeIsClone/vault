### v1.0.0 Release
We started working on the ansible cloud configuration 7 months ago and went though many iterations of R&D, finally it has come to a stable state. 

Initially the center point of the new configuration was the introduction of Nginx as a replacement for Apache. During the first 2 months the main focus was to automate as much of the manual server and application provisioning tasks, simply put it was features that got pushed out. Afterwards the focus deviated to harden server security.

### Full Change List
- Add AppArmor (Nginx & php7.2, php7.4, php8.1, php8.2)
- Add Blackbox Exporter
- Add Docker
- Add Fail2ban
- Add Filesystem (User owner/group & ACLs)
- Add Git
- Add Laravel
- Add Loki
- Add NextJs (PM2)
- Add Node Exporter
- Add PM2
- Add Promtail
- Add Strapi (PM2)
- Add Swap
- Add System (Maintenance tasks)
- Improve User (Add RSA & SSH)
- Improve WordPress (Filesystem permissions)
- Improve Common (Packages)
- Improve Prometheus (refactor nodes)
- Improve MySQL (Secure setup)
- Improve GitHub (Repository variables)
- Improve Grafana (Minor configurations)
- Improve Nginx (Security)
- Improve NodeJs (Add Node Version Manager NVM)
- Improve PHP (systemd units)

### Security
This release focuses on multiple layers of security hardenings, each with it's specific role to protect critical services.
#### Network
Starting from the network interface, UFW (Uncomplicated Firewall) has been reconfigured with required port whitelists & limited SSH (Secure Shell) rules. Intrusion prevention is now being forced by Fail2Ban which has been configured with rules to prevent brute-force attacks from SSH, Nginx Basic Auth, MySQL service and this is handled via a IP block-list. Direct IP address access with HTTP has disabled to prevent unencrypted connections.
#### Operating System
Migrated from Ubuntu 22.04 to Debian 11, Debian has a much longer release cycle which might lack up-to date software but makes up for being a stable distribution and the perfect environment for web servers.
#### Application Security
Now using AppArmor which is a built-in Linux kernel security module that restricts program capabilities with a preset list of rules. AppArmor has now been enabled with custom rule profiles for Nginx and MySQL. The current configuration prevents remote code execution which was exploited by malware and web shells in one of our previous incidence.

File system permissions have been hardened with ACLs (Access Control Lists). Each site will be owned by a site user with isolated file system access.
#### System Updates
Now includes a maintenance module to safely update system packages and to perform server restarts if required to apply pending kernel update patches.
#### PHP
Version support has been updated and now supports php7.2, php7.4, php8.1 and php8.2. PHP-FPM has been reconfigured with custom systemd units which creates total application isolation from site to site. Meaning now commands like php restart will only affect a specific php-fpm master process.
#### Nginx
Attackers may use fingerprinting to scan a webserver to identify the type and version then will be able to further discover any known vulnerabilities to exploit. Nginx by default prints out it's version in HTTP Headers and in error pages (codes 300~500), HTTP headers with Nginx has been reconfigured to mask this and show only the server name and identification.

HTTP Server Header:
```
maya-production-websrv-apollo-23
```

Security headers support has also been added for the following: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Strict-Transport-Security, Content-Security-Policy, Permissions-Policy.

PHP-FPM Fast CGI caching support has also been implemented to be used optionally if required.
Client side content will be compressed with GZIP and will include for content types: font, image, CSS, Javascript, svg and xml.

#### SSL/TLS Certificates
DH (Diffie-Hellman) parameters has been configured and strict SSL protocols has been applied to only accept TLSv1, TLSv1.1, TLSv1.2, TLSv1.3 connections and dropping support for legacy SSLv3 and POOLDE TLS. Certificate key spec: RSA 2048 bits (SHA256withRSA).

The certificates authority is Let's Encrypt and certificates will last for 3 months then they are automatically renewed via CertBot using a CRON job.  

Let's Encrypt is highly recommended and favored by the current configuration as paid certificates such as OV (Organization Validated) and EV (Extended Validated) cannot be automated.

#### NodeJS
Currently NodeJS production support is limited to be only be used in development or to execute specified tasks and does not have the compatibility to be run as a fully fledged server. The NodeJS module will get more attention in the future to provide more functionality as it's important tool for static asset bundling.
#### Performance
SWAP memory module has been added to allocate file system storage disk space if system RAM is unavailable, this size of SWAP space can be defined.

Moving on we'll be able to provide more performance finetunes with the data that we get from the Observatory monitoring system.
#### Environment Support
Another aspect of the cloud config was the ability to provision to different environments, after some iterations it came that the most sustainable strategy was to tone down to a linear approach which would both complement production, development and staging environments without leaving out capabilities.

#### User Access (Developers)
SSH key-based authentication is mandatory for any user account, for this the user is required to set an SSH key on to their GitHub account.

The user will also be assigned to group developers and will have access to all the sites within the server. Previously we encountered an issue where if a user were to edit a file then another user would not be able to read or write to it, this has now been resolved and any files or directories that's created within a site will be kept owned by the developers group so that all the users that are in that group will continue to have their privileges.
#### Monitoring
The Observatory (Monitoring System) requires sensors (nodes) for metrics (Node Exporter) and logs (Promtail) installed with in each server, this has now been automated. Security has also been taken into consideration we are using IP whitelists to only allow communications with Observatory.

As mentioned above PHP-FPM has been reconfigured with custom systemd units as a side effect of this monitoring will now be even straightforward as we can monitor each site separately as they are running on it's specific process.
#### Backups
A new introduction for this stack was the cloud backup pipeline which uses S3 object storage to store application databases and file backup snapshots and retains only a specified count of backups to prevent storage overflow. The backup schedule can be customized to fit the needs of each specific application. The pipeline pushes metrics to a MySQL database which is then scaped for monitoring by the Observatory.