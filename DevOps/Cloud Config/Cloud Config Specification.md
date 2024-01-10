### Introduction

The "Cloud Config" is Infrastructure as code build on top of Ansible in hopes to automate and standardize web server provisioning and management. At it's nature Ansible enforces documentation and modularity, this document serves to further enforce the methodologies this  behind the architecture. 

From a broader view, this documentation will unveil the design considerations and furthermore, the intended purpose of each component. Ultimately making this document useful for those who want's to understand the capability of this system or for those who want's to create and ready new servers on their cloud providers. Not to mention this document requires sustained collaboration and continuous innovation throughout it's evolution.

The ultimate goal of this document is to streamlines the thought process to navigate the complexities of this architecture.
### Overview
Initially, the center point of the new configuration was the introduction of Nginx as a replacement for Apache. During the first 2 months the main focus was to automate as much of the manual server and application provisioning tasks, Afterwards, the focus deviated to harden server security and to enforce conventions. 

This architecture has the capability and support for provisioning and managing the following server types by their function: 
* Web Servers
* App Servers
* Monitoring Servers

*This architecture is not an all-inclusive solution and it expects you to bring your own expertise to overcome any application specific requirements.*
### Cloud Providers
On paper any compute server should be compatible. What's more important is the operating system image, the cloud config migrated from Ubuntu 22.04 to Debian 11, because Debian has a much longer release cycle which might lack up-to-date software but makes up for being a stable distribution and the perfect environment for web servers. Debian ecosystem itself is community driven and comes with a preset choices which strongly meets with our expectations.
##### Operating system information
| Name | Value |
| ---- | ---- |
| Distributor  | Debian |
| Description | GNU/Linux |
| Release | 11 |
| Codename | bullseye |

Cloud provider recommendations (Debian 11): 
1. DigitalOcean Droplet
2. AWS EC2
3. Akamai Linode
4. Google Compute Engine (known conflicts with ipv6 configurations)
### System Maintenance
One step of this process is to perform a full server restart which is required to apply any pending kernel patches. As a convention it's recommended to perform maintenance tasks every 3 months. The cloud config's maintenance playbooks provides both safe and a more thorough approach. 
This includes cleaning the system package repository and if necessary perform a reboot cycle.
### Performance
##### SWAP
A SWAP memory role has been added to allocate file system storage disk space if system RAM is unavailable, the size of SWAP space can be defined and the default is set to 4Gbs.
##### Caching
Client & server side strategies.
##### FastCGI Cache
You can enable caching for your site by changing the cache settings under each site key. Using caching provides substantial speed improvement once pages are cached. The full settings looks like this:
### User Access (Developers)
SSH key-based authentication is mandatory for any user account, for this, the user is required to set an SSH key onto their GitHub account.

The user will also be assigned to group developers and will have access to all the sites within the server. Previously we encountered an issue where if a user were to edit a file then another user would not be able to read or write to it, this has now been resolved and any files or directories that are created within a site will be kept owned by the developers group so that all the users that are in that group will continue to have their privileges.
### Provision
During the initial provisioning of the server, Cloud Config will connect as the `sudo` user over SSH. This is so that Ansible is able to add repositories, install dependencies and configure new services, firewalls, and more.

Use command `ansible-playbook` to provision. 
### Security
We take security very seriously and ensure that we do everything we can to protect data. Below is a brief overview of some of the steps we take to ensure your server's security:
#### Network Hardenings
Starting from the network interface, UFW (Uncomplicated Firewall) has been reconfigured with required port whitelists & limited SSH (Secure Shell) rules. Intrusion prevention is now being forced by Fail2Ban which has been configured with rules to prevent brute-force attacks from SSH, Nginx Basic Auth, and MySQL service and this is handled via a IP block-list. Direct IP address access with HTTP has been disabled to prevent unencrypted connections.
#### Application Isolation
Each application or site will be owned by a separate user, this is particularly useful when combined with a project like WordPress in order to prevent plugins from maliciously accessing content in other application owned directories. 
Now using AppArmor which is a built-in Linux kernel security module that restricts program capabilities with a preset list of rules. AppArmor has now been enabled with custom rule profiles for Nginx and MySQL. The current configuration prevents remote code execution which was exploited by malware and web shells in one of our previous incidents.

File system permissions have been hardened with ACLs (Access Control Lists) which provide finer access control than user and group permissions. Each site will be owned by a site user with isolated file system access.
### Environments
Another aspect of the cloud-config was the ability to provision to different environments, after some iterations it came that the most sustainable strategy was to tone down to a linear approach which would complement production, development and staging environments without leaving out capabilities.
##### PHP
Each application will be owned by a specific user. This will allow us to both assign the application file system to their respective users as well as ensure that the background PHP-FPM processes running are separated. This is what helps to ensure that cross-site-contamination is not possible which prevents cross contamination.
Version support has been updated and now supports php7.2, php7.4, php8.1 and php8.2. PHP-FPM has been reconfigured with custom systemd units which creates total application isolation from site to site. This means now commands like php restart will only affect a specific php-fpm master process.
##### Node.js
Currently, NodeJS production support is limited to only being used in development or to execute specified tasks and does not have the compatibility to run as a fully-fledged server. The NodeJS module will get more attention in the future to provide more functionality as it's an important tool for static asset bundling.

##### Docker

## Sites and Apps

### Laravel
Pending support for queues.

Write and dispatch your Laravel jobs.

### WordPress
You’ll get a complete WordPress application running with all the software you need configured according to the best practices. 
### Next.js & Strapi

## Services
### MySQL
Now been replaced with MariaDB v10 which is a community-developed, commercially supported fork of the MySQL relational RDBMS. The reason behind the replacement was performance, MySQL's open-source version is called MySQL Community Edition inherently it has some limitations left out for enterprise versions in their own words "MySQL scalability, security, reliability, and uptime. It reduces the risk, cost, and complexity in developing, deploying, and managing business-critical MySQL applications." meaning all this is left out for the open-sourced version. That's where MariaDB comes in they have built on top of MySQL's open code base and most of the enterprise-only features are available by default.

Security enhancements are now being followed such as setting root account passwords, restricting remote access, and removing anonymous accounts and test tables.
## Networking
The public facing part.
### Nginx
We are using NGINX here rather than Apache as for the web server because the Nginx configuration is designed for hosting multiple websites on a single server and will perform and scale much better. Attackers may use fingerprinting to scan a webserver to identify the type and version then will be able to further discover any known vulnerabilities to exploit. Nginx by default prints out its version in HTTP Headers and in error pages (codes 300~500), HTTP headers with Nginx have been reconfigured to mask this and show only the server name and identification.

HTTP Server Header:

```
maya-production-websrv-apollo-23
```

Security headers support has also been added for the following: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Strict-Transport-Security, Content-Security-Policy, and Permissions-Policy.

PHP-FPM Fast CGI caching support has also been implemented to be used optionally if required.  
Client-side content will be compressed with GZIP and will include content types: font, image, CSS, JavaScript, SVG and XML.
#### SSL/TLS Certificates
SSL is being enforced by the [Let’s Encrypt](https://letsencrypt.org/) certificate authority which will issue certificates which lasts for 3 months, then they are automatically renewed via CertBot via a CRON. Let's Encrypt is highly recommended and favored by the current configuration as paid certificates such as OV (Organization Validated) and EV (Extended Validated) cannot be automated.

Nginx webserver has been configured to meet performance, security, and stability requirements for the certification and this has been opinionated from [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/).
Overall configuration is biased towards enforcing modern security restrictions without breaking compatibility for older clients.
##### A+ SSL support
SSL implementation [scores an A+](https://www.ssllabs.com/ssltest/) on the Qualys SSL Labs Test.  This configuration gives the best HTTPS configuration with performance optimizations that include:
- HTTP/2
- OCSP stapling
- Strict Transport Security (HSTS) & redirects
- Strong SSL params (Diffie-Hellman key exchange)
- Strict SSL protocols have been applied to only accept  TLSv1, TLSv1.1, TLSv1.2, TLSv1.3 connections and dropping support for legacy SSLv3 and POOLDE TLS.
- Performance tuning using GZIP compression.

*The above score was achieved by following documentation on best practices and SSL server rating guides at [SSL Research](https://github.com/ssllabs/research).*
### DNS
cloudflare.
### Firewall
UFW

## Backups
The cloud backup pipeline uses S3 object storage to store application databases and file backup snapshots and retains only a specified count of backups to prevent storage overflow. The backup schedule can be customized to fit the needs of each specific application. The pipeline pushes metrics to a MySQL database which is then scaped for monitoring by the Observatory.

## Monitoring
The Observatory (Monitoring System) requires sensors (nodes) for metrics (Node Exporter) and logs (Promtail) installed within each server, this has now been automated. Security has also been taken into consideration we are using IP whitelists to only allow communications with the Observatory.
##### System Logs & Metrics
As mentioned above PHP-FPM has been reconfigured with custom systemd units as a side effect of this monitoring will now be even more straightforward as we can monitor each site separately as they are running on it's specific process.
##### Domain Status
## Deployments

### Achieving zero-downtime deployments
## Testing

Load Testing