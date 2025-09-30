import { Explain } from "../types/types";

export const EXPLAIN: Record<string, Explain> = {
  help: {
    name: 'help',
    synopsis: 'help [COMMAND]',
    purpose: 'Show all available commands, or details for a specific command.',
    examples: [
      { cmd: 'help', why: 'List every command with a short description.' }
    ],
    seeAlso: ['history', 'man']
  },

  story: {
    name: 'story',
    synopsis: 'story',
    purpose: 'Display a short story about how this terminal was built.',
    examples: [
      { cmd: 'story', why: 'Learn the backstory and tech approach behind this project.' }
    ],
    seeAlso: ['help']
  },

  exit: {
    name: 'exit',
    synopsis: 'exit',
    purpose: 'Close the terminal and navigate to the portfolio page.',
    examples: [
      { cmd: 'exit', why: 'Leave the terminal and go to https://lukasbusch.dev/main.' }
    ]
  },

  battery: {
    name: 'battery',
    synopsis: 'battery',
    purpose: 'Show the device’s battery charge level and whether it is currently charging.',
    examples: [
      { cmd: 'battery', why: 'Check if your laptop is charging and how much battery is left.' }
    ],
    notes: [
      'Not all browsers support the Battery Status API. Works best in Chrome/Edge.',
      'Values are approximate and may not be available on all devices.'
    ],
    seeAlso: ['uptime', 'uname']
  },

  clear: {
    name: 'clear',
    synopsis: 'clear',
    purpose: 'Clear the terminal screen and scrollback.',
    examples: [
      { cmd: 'clear', why: 'Get a clean screen to continue working.' }
    ],
    seeAlso: ['history']
  },

  reboot: {
    name: 'reboot',
    synopsis: 'reboot',
    purpose: 'Reload the terminal page to reset the session.',
    examples: [
      { cmd: 'reboot', why: 'Quickly reset everything to defaults.' }
    ],
    notes: ['This refreshes the page; unsaved editor content is lost.']
  },

  color: {
    name: 'color',
    synopsis: 'color FOREGROUND [BACKGROUND]   |   color reset',
    purpose: 'Change terminal text and (optionally) background colors, or reset to defaults.',
    examples: [
      { cmd: 'color #00ff88', why: 'Set the text color to a hex value.' },
      { cmd: 'color #ffffff #001122dd', why: 'Set text and a semi-transparent background.' },
      { cmd: 'color reset', why: 'Restore default colors.' },
    ],
    notes: ['Accepts #RGB, #RRGGBB, or #RRGGBBAA.'],
    seeAlso: ['nano']
  },

  pwd: {
    name: 'pwd',
    synopsis: 'pwd',
    purpose: 'Print the current working directory.',
    examples: [
      { cmd: 'pwd', why: 'See where you are in the fake filesystem.' }
    ],
    seeAlso: ['ls', 'cd']
  },

  cd: {
    name: 'cd',
    synopsis: 'cd DIR   |   cd ..',
    purpose: 'Change the current working directory.',
    examples: [
      { cmd: 'cd Documents', why: 'Enter a subfolder.' },
      { cmd: 'cd ..', why: 'Go up one directory.' }
    ],
    notes: ['If the directory does not exist, an error is shown.'],
    seeAlso: ['ls', 'pwd']
  },

  ls: {
    name: 'ls',
    synopsis: 'ls',
    purpose: 'List files and folders in the current directory.',
    examples: [
      { cmd: 'ls', why: 'Show visible items here.' }
    ],
    notes: ['Some files may be hidden or require root to view/edit.'],
    seeAlso: ['pwd', 'cd', 'cat']
  },

  whoami: {
    name: 'whoami',
    synopsis: 'whoami',
    purpose: 'Show the current user/session identity.',
    examples: [
      { cmd: 'whoami', why: 'Confirm which user you are in this session.' }
    ],
    seeAlso: ['uname']
  },

  whois: {
    name: 'whois',
    synopsis: 'whois DOMAIN | IP [--json]',
    purpose: 'Look up RDAP/WHOIS registration for a domain or IP.',
    examples: [
      { cmd: 'whois example.com', why: 'See registrar, important dates, and org info.' },
      { cmd: 'whois 1.1.1.1', why: 'Query RDAP for an IP address.' },
      { cmd: 'whois example.com --json', why: 'Show raw RDAP JSON.' },
    ],
    notes: ['Some records may be redacted for privacy.'],
    seeAlso: ['geoip', 'asn', 'reverseip', 'openssl'],
    explanation: 'WHOIS is like a phonebook for the internet. It tells you who registered a domain name or IP address, when it was created, when it expires, and sometimes contact info. Beginners can think of it as asking: “Who owns this website or server?”'
  },

  uname: {
    name: 'uname',
    synopsis: 'uname',
    purpose: 'Show environment info (browser, platform, language, screen, network).',
    examples: [
      { cmd: 'uname', why: 'See client environment details (not OS kernel here).' }
    ],
    notes: ['Reflects browser capabilities; not a real kernel.'],
    seeAlso: ['whoami', 'uptime', 'date']
  },

  cat: {
    name: 'cat',
    synopsis: 'cat FILE',
    purpose: 'Display the content of a text file.',
    examples: [
      { cmd: 'cat profile.txt', why: 'Read a text file in the current folder.' }
    ],
    notes: ['Use “nano” to edit files.'],
    seeAlso: ['nano', 'touch']
  },

  nano: {
    name: 'nano',
    synopsis: 'nano FILE.txt',
    purpose: 'Open a simple WYSIWYG editor to create or edit a text file.',
    examples: [
      { cmd: 'nano notes.txt', why: 'Create/edit a file.' },
      { cmd: 'Ctrl+O', why: 'Save changes.' },
      { cmd: 'Ctrl+X', why: 'Exit the editor.' },
    ],
    notes: ['Your version is modeless and beginner-friendly.'],
    seeAlso: ['cat', 'touch', 'rm']
  },

  touch: {
    name: 'touch',
    synopsis: "touch FILE1.txt [FILE2.txt ...]",
    purpose: 'Create one or more empty .txt files.',
    examples: [
      { cmd: 'touch todo.txt', why: 'Create a new text file.' },
      { cmd: 'touch a.txt b.txt', why: 'Create multiple files at once.' }
    ],
    notes: ['Only .txt files are supported here.'],
    seeAlso: ['nano', 'rm']
  },

  mkdir: {
    name: 'mkdir',
    synopsis: 'mkdir DIR [DIR ...]',
    purpose: 'Create one or more directories.',
    examples: [
      { cmd: 'mkdir reports', why: 'Add a new folder.' },
      { cmd: 'mkdir a b c', why: 'Create several folders at once.' }
    ],
    seeAlso: ['rmdir', 'ls', 'cd']
  },

  rmdir: {
    name: 'rmdir',
    synopsis: 'rmdir DIR [DIR ...]',
    purpose: 'Remove empty directories.',
    examples: [
      { cmd: 'rmdir old', why: 'Remove an empty folder.' }
    ],
    notes: ['Directories must be empty to remove.'],
    seeAlso: ['mkdir', 'rm']
  },

  rm: {
    name: 'rm',
    synopsis: 'rm FILE [FILE ...]',
    purpose: 'Delete one or more files (root permission may be required).',
    examples: [
      { cmd: 'rm notes.txt', why: 'Delete a file.' },
      { cmd: 'sudo rm secret.txt', why: 'Delete a protected file (after sudo).' }
    ],
    notes: ['This simulation may require sudo for protected files.'],
    seeAlso: ['touch', 'nano', 'sudo']
  },

  echo: {
    name: 'echo',
    synopsis: 'echo TEXT...',
    purpose: 'Print text to the terminal.',
    examples: [
      { cmd: 'echo Hello World', why: 'Display a message.' }
    ]
  },

  date: {
    name: 'date',
    synopsis: 'date',
    purpose: 'Show the current date and time.',
    examples: [
      { cmd: 'date', why: 'Print local time for your session.' }
    ],
    seeAlso: ['uptime']
  },

  uptime: {
    name: 'uptime',
    synopsis: 'uptime',
    purpose: 'Show session uptime and basic “load averages”.',
    examples: [
      { cmd: 'uptime', why: 'See how long this terminal session has been running.' }
    ],
    notes: ['Load averages are simulated for learning.'],
    seeAlso: ['date', 'uname']
  },

  history: {
    name: 'history',
    synopsis: 'history',
    purpose: 'List commands executed during this session.',
    examples: [
      { cmd: 'history', why: 'Review what you’ve run so far.' }
    ],
    seeAlso: ['help', 'clear']
  },

  weather: {
    name: 'weather',
    synopsis: 'weather CITY',
    purpose: 'Display current weather for a city.',
    examples: [
      { cmd: 'weather Mérida', why: 'Get temperature, humidity, wind, sunrise/sunset, etc.' }
    ],
    notes: ['Powered by OpenWeather via your config key.'],
    seeAlso: ['curl']
  },

  qr: {
    name: 'qr',
    synopsis: 'qr URL',
    purpose: 'Generate a QR code image for a URL.',
    examples: [
      { cmd: 'qr https://lukasbusch.dev', why: 'Create a scannable code for quick sharing.' }
    ],
    notes: ['Image is fetched via a proxy.'],
    seeAlso: ['shorten']
  },

  shorten: {
    name: 'shorten',
    synopsis: 'shorten URL',
    purpose: 'Generate a shortened link for a long URL.',
    examples: [
      { cmd: 'shorten https://example.com/very/long/path', why: 'Turn a long, hard-to-type URL into a short link you can easily share.' },
      { cmd: 'shorten https://lukasbusch.dev/projects', why: 'Get a compact link for portfolio sharing.' }
    ],
    seeAlso: ['qr', 'curl'],
    explanation: 'Sometimes links are extremely long and messy, which makes them hard to share in emails, chats, or on paper. The `shorten` command uses a URL shortener service to produce a much shorter link that points to the same destination. Beginners can think of it as: “Give me a nickname for this long web address so it’s easier to pass around.”'
  },

  ipaddr: {
    name: 'ipaddr',
    synopsis: 'ipaddr',
    purpose: 'Show your current public IP (as seen by an external service).',
    examples: [
      { cmd: 'ipaddr', why: 'Discover your public-facing IP address.' }
    ],
    seeAlso: ['geoip'],
    explanation: 'Every device on the internet has an IP address, like a street address for your computer. The `ipaddr` command shows what address the outside world sees you as. Beginners can think of it as: “What is my online address right now?”'
  },

  curl: {
    name: 'curl',
    synopsis: 'curl URL [-I]',
    purpose: 'Fetch the content of a URL via HTTP/HTTPS.',
    examples: [
      { cmd: 'curl https://example.com', why: 'Fetch the full response body (HTML, JSON, or other content).' },
      { cmd: 'curl -I https://example.com', why: 'Fetch only HTTP response headers (metadata about the resource).' },
    ],
    notes: [
      'Use -I (uppercase i) to request just the headers, which is faster and avoids downloading the body.',
      'Browser CORS is handled via a custom Node proxy.'
    ],
    seeAlso: ['status', 'openssl'],
    explanation: '`curl` is like opening a website without a browser. Instead of showing pictures or styles, it just prints the raw text/code that the server sends. Beginners can think of it as: “Show me what this website really sends under the hood.”\n\nThe `-I` flag is special: it asks the server to send back *only the headers*, which are short lines of information that describe the content (e.g., type, size, server software, or redirects). This is useful when you want to inspect how a site responds without downloading the full page.'
  },

  ping: {
    name: 'ping',
    synopsis: 'ping HOST',
    purpose: 'Check connectivity and latency to a host.',
    examples: [
      { cmd: 'ping wikipedia.org', why: 'Measure round-trip time to a site.' }
    ],
    notes: ['ICMP is blocked in browsers; this uses HTTP HEAD via your backend.'],
    seeAlso: ['traceroute', 'status'],
    explanation: 'Ping sends a tiny “hello” packet to another computer and waits for a reply, telling you if it is online and how long the round trip takes. Beginners can think of it as: “Knock on the server’s door and see if it answers.”'
  },

  traceroute: {
    name: 'traceroute',
    synopsis: 'traceroute HOST',
    purpose: 'Display the network path (hops) and timings to a host.',
    examples: [
      { cmd: 'traceroute example.com', why: 'Identify where latency increases along the route.' }
    ],
    seeAlso: ['ping', 'dig', 'nslookup'],
    explanation: 'Traceroute shows every step your data takes across the internet to reach a destination. Each “hop” is a router or server along the way. Beginners can think of it as: “Show me the path my message travels to get to the website.”'
  },

  dig: {
    name: 'dig',
    synopsis: 'dig HOST',
    purpose: 'Query DNS (type A by default) and print a dig-style answer.',
    examples: [
      { cmd: 'dig example.com', why: 'Resolve IPv4 addresses with detailed output.' }
    ],
    seeAlso: ['nslookup', 'whois'],
    explanation: 'DIG asks the Domain Name System (DNS) what IP address belongs to a domain name. Beginners can think of DNS as the phonebook of the internet: “What number (IP) should I call when I type in this name (domain)?”'
  },

  nslookup: {
    name: 'nslookup',
    synopsis: 'nslookup HOST',
    purpose: 'Resolve a hostname to its IP address(es) and show DNS details.',
    examples: [
      { cmd: 'nslookup example.com', why: 'Get A/AAAA answers combined.' }
    ],
    seeAlso: ['dig', 'whois'],
    explanation: '`nslookup` is another way to ask DNS servers what IP address belongs to a website. Beginners can think of it as: “Look up the phone number for this web address.”'
  },

  status: {
    name: 'status',
    synopsis: 'status HOST',
    purpose: 'Fetch the HTTP status code and reason for a URL/host.',
    examples: [
      { cmd: 'status https://example.com', why: 'Quick “is it up?” check without fetching the body.' }
    ],
    seeAlso: ['curl', 'ping'],
    explanation: 'When you visit a website, the server first replies with a status code, like 200 (OK) or 404 (Not Found). The `status` command shows just that code. Beginners can think of it as: “Ask the website if it’s alive and what condition it’s in.”'
  },

  openssl: {
    name: 'openssl',
    synopsis: 'openssl DOMAIN [--json]',
    purpose: 'Inspect a site’s TLS certificate (issuer, subject, expiry).',
    examples: [
      { cmd: 'openssl example.com', why: 'See certificate details at a glance.' }
    ],
    seeAlso: ['whois', 'status', 'ciphers'],
    explanation: 'Websites use SSL/TLS (Secure Sockets Layer / Transport Layer Security) certificates to prove they are secure and to enable the lock icon in browsers. The `openssl` command shows who issued the certificate and when it expires. Beginners can think of it as: “Check if this website’s ID card is still valid.”'
  },

  geoip: {
    name: 'geoip',
    synopsis: 'geoip IP | DOMAIN [--json]',
    purpose: 'Geolocate an IP/host (country, city, timezone) and basic network info.',
    examples: [
      { cmd: 'geoip example.com', why: 'Approximate where the server is located.' }
    ],
    seeAlso: ['asn', 'whois'],
    explanation: 'GeoIP uses public records to guess the physical location of an IP address, like what country or city the server is in. Beginners can think of it as: “Where in the world is this website’s computer?”'
  },

  asn: {
    name: 'asn',
    synopsis: 'asn IP | DOMAIN [--json]',
    purpose: 'Show the Autonomous System (AS number/name) and related ISP/org.',
    examples: [
      { cmd: 'asn 1.1.1.1', why: 'See Cloudflare’s ASN (AS13335).' }
    ],
    seeAlso: ['geoip', 'whois'],
    explanation: 'Every block of IP addresses belongs to a bigger network called an Autonomous System, usually run by an ISP or company. The `asn` command tells you which organization owns that network. Beginners can think of it as: “Who runs the neighborhood this IP lives in?”'
  },

  reverseip: {
    name: 'reverseip',
    synopsis: 'reverseip IP | DOMAIN [--all] [--json]',
    purpose: 'Reverse DNS / co-hosted domains for an IP or a resolved host.',
    examples: [
      { cmd: 'reverseip example.com', why: 'List other domains on the same IP (if available).' }
    ],
    seeAlso: ['whois', 'asn'],
    explanation: 'Sometimes many websites share the same IP address. `reverseip` tries to list them. Beginners can think of it as: “Show me who else lives in the same apartment building (IP address) as this website.”'
  },

  ciphers: {
    name: 'ciphers',
    synopsis: 'ciphers DOMAIN [--port N] [--json]',
    purpose: 'Show the negotiated TLS protocol and cipher suite for a server (and key exchange curve if available).',
    examples: [
      { cmd: 'ciphers example.com', why: 'Check what TLS protocol and cipher suite the server uses by default.' },
      { cmd: 'ciphers example.com --port 8443', why: 'Test a server running HTTPS on a non-standard port.' },
      { cmd: 'ciphers example.com --json', why: 'See the raw TLS handshake details in JSON format for advanced inspection.' }
    ],
    seeAlso: ['openssl', 'status'],
    explanation: 'When you visit a secure website (https://), your browser and the server agree on a “cipher suite” — a set of rules that decide how your data will be encrypted and exchanged. This includes the TLS version (e.g., TLS 1.3), the encryption algorithm (e.g., AES-GCM), and sometimes the key exchange curve (e.g., X25519). The `ciphers` command shows you exactly what your client and the server negotiated. Beginners can think of it as: “Check what kind of lock and key are being used to keep my connection to this website safe.”'
  },

  tlschain: {
    name: "tlschain",
    synopsis: "tlschain DOMAIN [--port N] [--json]",
    purpose: "Retrieve and display the full TLS certificate chain presented by a server, including subject, issuer, validity period, and key details.",
    examples: [
      { cmd: "tlschain example.com", why: "See the full certificate chain a server presents to validate its identity." },
      { cmd: "tlschain example.com --port 8443", why: "Check the TLS chain for a service running on a custom port." },
      { cmd: "tlschain example.com --json", why: "Get the raw certificate details (subject, issuer, SANs, fingerprints, etc.) in JSON format for deep inspection." }
    ],
    notes: [
      "This is a simulated command fetching real data — in a real Linux/Unix shell `tlschain` does not exist.",
      "Equivalent real-world tools: `openssl s_client -connect example.com:443 -showcerts` or `nmap --script ssl-cert -p 443 example.com`.",
      "Browsers and clients automatically validate these chains against trusted root CAs, but this command makes the full chain visible."
    ],
    seeAlso: ["ciphers", "whois", "sslcheck"],
    explanation: "When your browser connects to a secure website, the server presents not just its own certificate but usually a chain of certificates leading up to a trusted root. This chain proves the site’s identity and lets your browser verify that it can trust the connection. The `tlschain` command shows you that chain: each certificate’s subject (the entity it belongs to), issuer (the authority that signed it), validity dates, and other details like Subject Alternative Names (SANs) or fingerprints. Beginners can think of it as: “Show me the full passport chain the server presents to prove it’s who it says it is.”"
  },

  networkinfo: {
    name: 'networkinfo',
    synopsis: 'networkinfo',
    purpose: 'Display details about the current network connection as estimated by the browser.',
    examples: [
      { cmd: 'networkinfo', why: 'Check your effective connection type, estimated downlink, and RTT.' }
    ],
    notes: [
      'Reports: Downlink (Mb/s), Effective type (slow-2g/2g/3g/4g), RTT (ms), Save-Data (on/off), and Type (wifi, cellular, etc.).',
      'Values are approximations provided by the Network Information API and may vary or be unavailable depending on browser/device.',
      'Not all browsers support this API; on unsupported browsers, a message will be shown.',
      'Equivalent real CLI: none. This is a browser-only API without a direct Linux/Unix command counterpart.'
    ]
  },

  storage: {
    name: 'storage',
    synopsis: 'storage',
    purpose: 'Display information about browser storage: quota usage, local/session storage size, and IndexedDB availability.',
    examples: [
      { cmd: 'storage', why: 'Check how much browser storage is in use and what is available.' }
    ],
    notes: [
      'Shows quota/usage from `navigator.storage.estimate()`, including approximate bytes used and total quota.',
      'Lists keys and estimated size of values stored in localStorage and sessionStorage.',
      'Reports whether IndexedDB is supported.',
      'Equivalent real CLI: none. This is a browser-only feature without direct Linux/Unix counterpart.'
    ]
  },

  perf: {
    name: 'perf',
    synopsis: 'perf [--top N] [--json]',
    purpose: 'One-shot snapshot of page performance: navigation type, TTFB, DCL, load, paint (FP/FCP), LCP, CLS, memory (if available), and slowest/largest resources.',
    examples: [
      { cmd: 'perf', why: 'Get a quick overview of current page performance timings.' },
      { cmd: 'perf --top 5', why: 'List the top 5 slowest and largest resource requests.' },
      { cmd: 'perf --json', why: 'Dump raw metrics and resource entries as JSON.' }
    ],
    notes: [
      'Uses Performance APIs: NavigationTiming, ResourceTiming, PaintTiming, and (where available) Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).',
      'Some metrics need browser support and may be unavailable or partial (especially LCP/CLS without buffering).',
      'Memory readings (`performance.memory`) are non-standard and mostly available in Chromium-based browsers.',
      'Equivalent real CLI: none (browser-only). Closest desktop analogs are Lighthouse or WebPageTest.'
    ]
  }
};