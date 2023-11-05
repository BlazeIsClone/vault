### Overview

The "Cloud Config" is Infrastructure as code build on top of Ansible in hopes to automate and document server provisioning and management. It has the capability and support for implementing multiple levels of security hardenings including firewalls, access controls, permissions , TLS certificate installation & renewal including PHP & Nginx capabilities restrictions. In an application standpoint this configuration also enforces improved site reliability with support for per-site php-fpm master process via separate systemd units. In support for the evolution this configuration also includes monitoring system modules which aggregates server metrics & logs which combined gives us the ability to understand and fix any server or application related incidents.

The cloud config initially took 7 months of research and development before becoming stable.

Initially, the center point of the new configuration was the introduction of Nginx as a replacement for Apache. During the first 2 months the main focus was to automate as much of the manual server and application provisioning tasks, Afterwards, the focus deviated to harden server security and to enforce conventions.
### Security Policies

This release focuses on multiple layers of security hardenings, each with its specific role to protect critical services. Users are required to perform key-based authentication via SSH or SFTP when authenticating.

### Network

Starting from the network interface, UFW (Uncomplicated Firewall) has been reconfigured with required port whitelists & limited SSH (Secure Shell) rules. Intrusion prevention is now being forced by Fail2Ban which has been configured with rules to prevent brute-force attacks from SSH, Nginx Basic Auth, and MySQL service and this is handled via a IP block-list. Direct IP address access with HTTP has been disabled to prevent unencrypted connections.

### Operating System

Migrated from Ubuntu 22.04 to Debian 11, Debian has a much longer release cycle which might lack up-to-date software but makes up for being a stable distribution and the perfect environment for web servers.

### Application Security

Now using AppArmor which is a built-in Linux kernel security module that restricts program capabilities with a preset list of rules. AppArmor has now been enabled with custom rule profiles for Nginx and MySQL. The current configuration prevents remote code execution which was exploited by malware and web shells in one of our previous incidents.

File system permissions have been hardened with ACLs (Access Control Lists) which provide finer access control than user and group permissions. Each site will be owned by a site user with isolated file system access.

### System Updates

Now includes a maintenance module to safely update system packages and to perform server restarts if required to apply pending kernel update patches.

### MySQL

MySQL has now been replaced with MariaDB v10 which is a community-developed, commercially supported fork of the MySQL relational RDBMS. The reason behind the replacement was performance, MySQL's open-source version is called MySQL Community Edition inherently it has some limitations left out for enterprise versions in their own words "MySQL scalability, security, reliability, and uptime. It reduces the risk, cost, and complexity in developing, deploying, and managing business-critical MySQL applications." meaning all this is left out for the open-sourced version. That's where MariaDB comes in they have built on top of MySQL's open code base and most of the enterprise-only features are available by default.

Security enhancements are now being followed such as setting root account passwords, restricting remote access, and removing anonymous accounts and test tables.

### PHP-FPM

Each application will be owned by a specific user. This will allow us to both assign the application file system to their respective users as well as ensure that the background PHP-FPM processes running are separated. This is what helps to ensure that cross-site-contamination is not possible which prevents cross contamination.
Version support has been updated and now supports php7.2, php7.4, php8.1 and php8.2. PHP-FPM has been reconfigured with custom systemd units which creates total application isolation from site to site. This means now commands like php restart will only affect a specific php-fpm master process.

### Nginx

We are using NGINX here rather than Apache as for the web server because the Nginx configuration is designed for hosting multiple websites on a single server and will perform and scale much better. Attackers may use fingerprinting to scan a webserver to identify the type and version then will be able to further discover any known vulnerabilities to exploit. Nginx by default prints out its version in HTTP Headers and in error pages (codes 300~500), HTTP headers with Nginx have been reconfigured to mask this and show only the server name and identification.

HTTP Server Header:

```
maya-production-websrv-apollo-23
```

Security headers support has also been added for the following: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Strict-Transport-Security, Content-Security-Policy, and Permissions-Policy.

PHP-FPM Fast CGI caching support has also been implemented to be used optionally if required.  
Client-side content will be compressed with GZIP and will include content types: font, image, CSS, Javascript, SVG and XML.

### SSL/TLS Certificates

DH (Diffie-Hellman) parameters have been configured and strict SSL protocols have been applied to only accept TLSv1, TLSv1.1, TLSv1.2, TLSv1.3 connections and dropping support for legacy SSLv3 and POOLDE TLS. Certificate key spec: RSA 2048 bits (SHA256withRSA).

The certificate authority is Let's Encrypt and certificates will last for 3 months then they are automatically renewed via CertBot using a CRON job.

Let's Encrypt is highly recommended and favoured by the current configuration as paid certificates such as OV (Organization Validated) and EV (Extended Validated) cannot be automated.

### NodeJS

Currently, NodeJS production support is limited to only being used in development or to execute specified tasks and does not have the compatibility to run as a fully-fledged server. The NodeJS module will get more attention in the future to provide more functionality as it's an important tool for static asset bundling.

### Performance

A SWAP memory module has been added to allocate file system storage disk space if system RAM is unavailable, this size of SWAP space can be defined.

Moving on we'll be able to provide more performance finetunes with the data that we get from the Observatory monitoring system.

### Environment Support

Another aspect of the cloud-config was the ability to provision to different environments, after some iterations it came that the most sustainable strategy was to tone down to a linear approach which would complement production, development and staging environments without leaving out capabilities.

### User Access (Developers)

SSH key-based authentication is mandatory for any user account, for this, the user is required to set an SSH key onto their GitHub account.

The user will also be assigned to group developers and will have access to all the sites within the server. Previously we encountered an issue where if a user were to edit a file then another user would not be able to read or write to it, this has now been resolved and any files or directories that are created within a site will be kept owned by the developers group so that all the users that are in that group will continue to have their privileges.

### Monitoring

The Observatory (Monitoring System) requires sensors (nodes) for metrics (Node Exporter) and logs (Promtail) installed within each server, this has now been automated. Security has also been taken into consideration we are using IP whitelists to only allow communications with the Observatory.

As mentioned above PHP-FPM has been reconfigured with custom systemd units as a side effect of this monitoring will now be even more straightforward as we can monitor each site separately as they are running on it's specific process.

### Backups

A new introduction for this stack was the cloud backup pipeline which uses S3 object storage to store application databases and file backup snapshots and retains only a specified count of backups to prevent storage overflow. The backup schedule can be customized to fit the needs of each specific application. The pipeline pushes metrics to a MySQL database which is then scaped for monitoring by the Observatory.