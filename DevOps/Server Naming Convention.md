### Building The Naming Scheme

Syntax:
```
[organization]-[environment]-[purpose]-[serial]-[current-year]
```

### Environment
The stage/environment of the server.

- dev – Development
- test – Testing
- stag – Staging
- prod – Production

### Purpose
The infrastructure running on server.

- websrv – Web Server
- appsrv – Application Server (non-web)
- dbsrv – Database Server
- mtpsrv – Mail Server
- monitsrv – Monitoring Serve
- proxsrv – Proxy/Load Balancer
- stosrv – Storage Server

### Serial
A Serial is used to identify a specific server and this must be unique when used in combination with the current year.

A list of serials from A to Z:
* Apollo
* Blaze
* Crimson
* Dawn
* Eclipse
* Falcon
* Genesis
* Horizon
* Inferno
* Jupiter
* Kepler
* Lunar
* Mercury
* Neptune
* Orion
* Phoenix
* Quantum
* Radix
* Solaris
* Titan
* Unity
* Valkyrie
* Wraith
* Xeon
* Yara
* Zen

### Usage

A production web server by Hive which was created in the year of 2023:
```
hive-prod-websrv-apollo-23
```
