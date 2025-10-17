# Web-Based CLI

A fully interactive command-line interface built for the web.  
It simulates a Linux/Unix-like terminal experience in the browser, complete with a virtual file system, command chaining with `&&`, sudo functionality, easter eggs, a beginner-friendly `--man` flag for every command, tab autocompletion, and arrow key navigation for command history.

Live demo: [lukasbusch.dev/cli](https://lukasbusch.dev/cli)

---

## Features

* 44+ commands covering:
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
* `clear` - Clear the terminal screen and scrollback buffer  

### File System
* `pwd` - Print working directory  
* `cd DIR` - Change current directory  
* `ls` - List files and folders in current directory  
* `cat FILE` - Display file content  
* `nano FILE` - Open simple text editor for FILE (.txt)  
* `touch FILE...` - Create one or more new `.txt` files  
* `mkdir DIR...` - Create one or more directories  
* `rmdir DIR...` - Remove one or more empty directories  
* `rm FILE` - Remove one or more files  
* `echo TEXT...` - Print given text to output  

### System
* `reboot` - Reload the page  
* `color FOREGROUND [BACKGROUND]` - Set text and background color (hex codes)  
* `color reset` - Restore default colors  
* `date` - Show current date and time  
* `uptime` - Show session uptime and load averages  
* `history [N]` – Show persistent command history, or only the last N entries if specified.
* `whoami` - Show current user/session identifier  
* `uname` - Show system info (userAgent, platform, screen, etc.)  
* `storage` - Show browser storage usage, local/session storage, and IndexedDB support  
* `perf [--top N] [--json]` - Snapshot page performance metrics and resource stats  

### Networking
* `ipaddr` - Show current public IP  
* `whois DOMAIN | IP [--json]` - Query WHOIS/RDAP for domain or IP  
* `ping HOST` - Test connectivity and measure latency  
* `traceroute HOST` - Trace network path and hops to host  
* `dig HOST` - Perform DNS lookup and show detailed records  
* `nslookup HOST` - Resolve domain to IP(s) via DNS servers  
* `curl URL [-I]` - Fetch content or headers from URL  
* `status HOST` - Fetch HTTP status code and text for host  
* `geoip IP | DOMAIN [--json]` - Lookup geolocation, ISP, ASN, timezone  
* `asn IP | DOMAIN [--json]` - Show Autonomous System info (AS number/name, ISP)  
* `reverseip IP | DOMAIN [--all] [--json]` - Perform reverse DNS (PTR) lookups  
* `networkinfo` - Show downlink, RTT, connection type, Save-Data flag  
* `robots URL [--ua AGENT] [--json]` - Fetch and summarize robots.txt rules and sitemaps  
* `sitemap URL [--top N] [--json]` - Fetch and summarize sitemap XML (counts, lastmod, entries)  

### Security and TLS
* `openssl DOMAIN [--json]` - Show TLS certificate info  
* `ciphers DOMAIN [--port N] [--json]` - Show negotiated TLS protocol and cipher  
* `tlschain DOMAIN [--port N] [--json]` - Show full certificate chain  

### Extras
* `battery` - Show battery level and charging status  
* `weather CITY` - Show current weather conditions  
* `shorten URL` - Shorten a URL  
* `qr URL` - Generate QR code for a URL    

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

Built by [Lukas Busch](https://lukasbusch.dev/main)  
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