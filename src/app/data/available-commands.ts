import { typeCommandList } from '../types/types';

export const AVAILABLE_COMMANDS: typeCommandList[] = [
  {
    command: 'help',
    description: 'Displays a list of all available commands along with a brief description for each one.',
  },
  {
    command: 'story',
    description: 'Displays a brief story about the development of this command line.',
  },
  {
    command: 'exit',
    description: 'Closes console and navigates to portfolio page https://lukasbusch.dev/main.',
  },
  {
    command: 'clear',
    description: 'Clears the terminal screen and scrollback buffer.',
  },
  {
    command: 'battery',
    description: 'Displays current battery level and charging status (if supported by the browser).',
  },
  {
    command: 'reboot',
    description: 'Reboots the terminal by reloading the page.',
  },
  {
    command: 'color FOREGROUND [BACKGROUND]',
    description: 'Set the terminal text color to FOREGROUND and, if provided, the background color to BACKGROUND (each as a hex code, e.g. #RGB, #RRGGBB or #RRGGBBAA).',
  },
  {
    command: 'color reset',
    description: "Restore the terminal's default text and background colors.",
  },
  {
    command: 'pwd',
    description: 'Prints the path of the working directory.',
  },
  {
    command: 'cd DIR',
    description: 'Changes the current working directory to the specified target DIR.',
  },
  {
    command: 'ls',
    description: 'Lists all files and folders contained within the current directory.',
  },
  {
    command: 'whoami',
    description: 'Outputs the current user or session identifier, revealing who is logged into the terminal.',
  },
  {
    command: 'whois DOMAIN | IP [--json]',
    description: 'Query WHOIS (RDAP) for a domain or IP. Use --json to print raw RDAP JSON.'
  },
  {
    command: 'uname',
    description: 'Displays system info: browser userAgent, platform, language, screen resolution, etc.',
  },
  {
    command: 'cat FILE',
    description: 'Displays file content of the selected FILE.',
  },
  {
    command: 'nano FILE',
    description: 'Simple, modeless WYSIWYG (What You See Is What You Get) command-line text editor for creating or editing the specified FILE (.txt).',
  },
  {
    command: 'touch FILE...',
    description: "Create one or more new text files; each FILE must include the '.txt' extension.",
  },
  {
    command: 'mkdir DIR...',
    description: 'Creates one or multiple new directories named DIR.',
  },
  {
    command: 'rmdir DIR...',
    description: 'Removes one or multiple empty directories named DIR.',
  },
  {
    command: 'rm FILE',
    description: 'Removes one or multiple files from current directory named FILE.',
  },
  {
    command: 'echo TEXT...',
    description: 'Write the given TEXT to standard output.',
  },
  {
    command: 'date',
    description: 'Displays the current date and time.',
  },
  {
    command: 'uptime',
    description: 'Shows the current time and how long the session has been running (dd hh:mm:ss), followed by the user count and system load averages for the past 1, 5, and 15 minutes.',
  },
  {
    command: 'storage',
    description: 'Displays browser storage details, including quota usage from the Storage API, keys and sizes in local/session storage, and whether IndexedDB is supported.'
  },
  {
    command: 'perf [--top N] [--json]',
    description: 'Captures a snapshot of page performance metrics, including navigation type, time to first byte (TTFB), DOMContentLoaded, load event, paint timings (FP/FCP/LCP), cumulative layout shift (CLS), JS heap usage (if available), and the top slowest/largest resource requests.'
  },
  {
    command: 'history [N]',
    description: 'Print the command history list. Accepts an optional numeric argument to limit output to the most recent commands.',
  },
  {
    command: 'networkinfo',
    description: 'Displays information about the current network connection, including estimated downlink speed (Mb/s), effective type (slow-2g/2g/3g/4g), round-trip time (ms), Save-Data preference, and connection type (e.g., wifi, cellular). Falls back with a message if the Network Information API is not supported by the browser.'
  },
  {
    command: 'ipaddr',
    description: 'Displays your current public IP address as reported by an external service.',
  },
  {
    command: 'curl URL [-I]',
    description: 'Fetches data from a specified URL or IP address using the HTTP/HTTPS protocol.',
  },
  {
    command: 'ping HOST',
    description: 'Send ICMP ECHO_REQUEST packets to HOST to measure latency and network connectivity.',
  },
  {
    command: 'traceroute HOST',
    description: 'Displays the network path and latency to HOST.',
  },
  {
    command: 'dig HOST',
    description: 'Perform a DNS lookup for HOST and display detailed response (record types, headers, etc.).',
  },
  {
    command: 'nslookup HOST',
    description: 'Query DNS servers to resolve HOST into its IP address(es) and display DNS details.',
  },
  {
    command: 'weather CITY',
    description: 'Fetches and displays current weather details for CITY - including temperature, humidity, pressure, wind speed, visibility (in meters), and local sunrise/sunset times.',
  },
  {
    command: 'shorten URL',
    description: 'Shortens the given URL.',
  },
  {
    command: 'qr URL',
    description: 'Creates QR code for given URL.',
  },
  {
    command: 'status HOST',
    description: 'Fetches the HTTP status code and status text for the given HOST.',
  },
  {
    command: 'openssl DOMAIN [--json]',
    description: 'Show TLS certificate info for a domain. Use --json for full chain / PEMs.'
  },
  {
    command: 'geoip IP | DOMAIN [--json]',
    description: 'Lookup geolocation, ISP, ASN, timezone for an IP or domain. Use --json for raw API output.'
  },
  {
    command: 'asn IP | DOMAIN [--json]',
    description: 'Show ASN (via GeoIP) including AS number/name, ISP, org. Use --json to dump raw geoip.'
  },
  {
    command: 'reverseip IP | DOMAIN [--all] [--json]',
    description: 'Reverse DNS (PTR). Use --all to query PTR for all resolved A/AAAA; --json dumps raw.'
  },
  {
    command: 'ciphers DOMAIN [--port N] [--json]',
    description: 'Show negotiated TLS protocol and cipher (and key exchange curve if available).'
  },
  {
    command: 'tlschain DOMAIN [--port N] [--json]',
    description: 'Show the full presented TLS certificate chain (leaf → intermediates → root) and validity.'
  },
  { 
    command: 'robots [--ua AGENT] [--json]',  
    description: 'Fetches and summarizes robots.txt: user-agent sections, Allow/Disallow rules, Crawl-delay, and declared Sitemaps.'
  },
  { 
    command: 'sitemap URL [--top N] [--json]', 
    description: 'Fetches and summarizes sitemap XML: counts, lastmod range, and top entries (handles sitemap index vs. urlset).'
  }
];
