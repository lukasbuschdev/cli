# Web-Based CLI

A fully interactive command-line interface built for the web.  
It simulates a Linux/Unix-like terminal experience in the browser, complete with a virtual file system, command chaining with `&&`, sudo functionality, easter eggs, a beginner-friendly `--man` flag for every command, tab autocompletion, and arrow key navigation for command history.

Live demo: [lukasbusch.dev/cli](https://lukasbusch.dev/cli)

---

## Features

* 41+ commands covering:
  * File system operations (`ls`, `cd`, `cat`, `nano`, `touch`, `mkdir`, `rm`, ...)
  * Network tools (`ping`, `traceroute`, `dig`, `nslookup`, `curl`, ...)
  * Security and TLS utilities (`openssl`, `ciphers`, `tlschain`, ...)
  * System utilities (`pwd`, `uptime`, `whoami`, `uname`, ...)
  * Extras (`qr`, `shorten`, `weather`, ...)
* WYSIWYG Nano editor for creating and editing `.txt` files directly in the browser terminal
* Nano supports standard keyboard shortcuts:
  * `Ctrl+O` to save and close the file
  * `Ctrl+X` to close without saving
* Virtual file system with directories, files, and persistent editing
* Command chaining with `&&`
* Sudo mode for unlocking hidden behaviors
* Easter eggs and secret commands
* Responsive design for desktop and mobile
* Tab autocompletion for faster typing
* Arrow up and arrow down for navigating previous commands
* Universal `--man` flag for detailed, educational documentation of each command  
  * Synopsis  
  * Purpose  
  * Examples with explanation  
  * Notes about limitations or differences from real Linux/Unix  
  * Related commands for further exploration  
  * Simple explanations for beginners who may be new to the CLI  

---

## Backend

This project uses a dedicated VPS backend with **Nginx** and **Node.js** for:  
* CORS handling (to allow browser-based requests without errors)  
* Fetching real-world data such as WHOIS, GeoIP, TLS certificates, and other information that are not accessible directly from the frontend  

---

## Available Commands

### General
* `help` - Show all available commands  
* `story` - Show the story about the CLI's development  
* `exit` - Close the console and return to the portfolio page  
* `clear` - Clear the terminal

### File System
* `pwd`  
* `cd DIR`  
* `ls`  
* `cat FILE`  
* `nano FILE`  
* `touch FILE`  
* `mkdir DIR`  
* `rmdir DIR`  
* `rm FILE`  
* `echo TEXT...`  

### System
* `reboot` - Reload page  
* `color FOREGROUND [BACKGROUND]` - Set text and background color  
* `color reset` - Reset colors  
* `date`  
* `uptime`  
* `history`  
* `whoami`  
* `uname`  

### Networking
* `ipaddr` - Show public IP  
* `whois DOMAIN | IP [--json]`  
* `ping HOST`  
* `traceroute HOST`  
* `dig HOST`  
* `nslookup HOST`  
* `curl URL [-I]`  
* `status HOST`  
* `geoip IP | DOMAIN [--json]`  
* `asn IP | DOMAIN [--json]`  
* `reverseip IP | DOMAIN [--all] [--json]`  
* `networkinfo` - Show downlink, RTT, connection type  

### Security and TLS
* `openssl DOMAIN [--json]` - Certificate information  
* `ciphers DOMAIN [--port N] [--json]` - Negotiated TLS protocol and cipher  
* `tlschain DOMAIN [--port N] [--json]` - Full certificate chain  

### Extras
* `battery` - Battery status  
* `weather CITY` - Current weather  
* `shorten URL` - URL shortener  
* `qr URL` - Generate QR code  

---

## The `--man` Flag

Every command supports an additional `--man` flag.  
This prints extended documentation in the terminal, including:  
* Command synopsis  
* Purpose  
* Practical examples with explanations  
* Notes about limitations or browser-specific issues  
* Related commands for deeper learning  
* Beginner-friendly explanations to make CLI concepts accessible  

This makes the project educational for users who are new to the command line, while still providing useful features for experienced users.

---

## Easter Eggs

Hidden commands and responses are included. Try using `sudo` or experimenting with unusual inputs to discover them.

---

## Tech Stack

* Angular (v19)  
* TypeScript  
* SCSS  
* Nginx (reverse proxy, CORS handling)  
* Node.js (backend services for external data and APIs)  
* Custom virtual file system  
* Browser APIs for networking, battery, and system information  

---

## Notes

* This CLI is for demonstration and educational purposes and is not a full Linux shell
* Some commands are simulated, others use real APIs through the Node.js backend
* Real equivalents are suggested in --man outputs where applicable

---

## Author

Built by[Lukas Busch](https://lukasbusch.dev/main)
If you find this project interesting, please consider giving the repository a star.

---

## Getting Started

```bash
# Clone repo
git clone https://github.com/USERNAME/cli-project.git
cd cli-project

# Install dependencies
npm install

# Run locally
ng serve

# Open http://localhost:4200 in your browser.
```