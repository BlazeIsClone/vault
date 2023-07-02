To delete downloaded packages (.deb) already installed (and no longer needed)

```
sudo apt-get clean
```

To remove all stored archives in your cache for packages that can not be downloaded anymore (thus packages that are no longer in the repository or that have a newer version in the repository).

```
sudo apt-get autoclean
```

To remove unnecessary packages (After uninstalling an app there could be packages you don't need anymore)

```
sudo apt-get autoremove
```