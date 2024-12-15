# Server auto login

sudo systemctl edit getty@tty1

[Service]
ExecStart=
ExecStart=-/sbin/agetty --autologin root --noclear %I $TERM

sudo systemctl restart getty@tty1

sudo systemctl enable getty@tty1
