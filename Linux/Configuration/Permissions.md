### Add new user accounts with SSH access
First we need to login with root user.

Create new users:
```
$ adduser blaze --disabled-password
```

```
$ adduser fish --disabled-password
```

Create a **.ssh** directory in the **blaze** home directory:
```
$ mkdir .ssh
```

Use the **touch** command to create the **authorized_keys** file in the **.ssh** directory and add public key:
```
$ touch .ssh/authorized_keys
```

## Maintained by a group of users

Create new user group:
```
$ groupadd developers
```

Add previously created users to the group:
```
$ usermod -a -G developers blaze
```

```
$ usermod -a -G developers fish
```

### How to allow user group to use sudo

Open the configuration file by entering the command:
```
$ visudo
```

Scroll through the configuration file until you see the following entry:
```
# User privilege specification
root    ALL=(ALL:ALL) ALL

# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL

# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL
```

Then add the following to make the user group access sudo privilages without password.
```
%developers ALL=NOPASSWD: ALL
```