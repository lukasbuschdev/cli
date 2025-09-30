import { typeDirectory } from '../types/types';

export const AVAILABLE_DIRECTORIES: typeDirectory[] = [
  {
    directory: '',
    files: [
      {
        name: 'logs.txt',
        isRootOnly: true,
        data: '',
      },
    ],
    subdirectories: [
      {
        directory: 'Documents',
        files: [],
        subdirectories: [
          {
            directory: 'commands',
            subdirectories: [],
            files: [
              {
                name: 'commands.txt',
                isRootOnly: true,
                data:
                  '1\thelp\n' +
                  '2\tstory\n' +
                  '3\tclear\n' +
                  '4\treboot\n' +
                  '5\texit\n' +
                  '6\t\battery\n' +
                  '7\tcolor\n' +
                  '8\tcolor reset\n' +
                  '9\tpwd\n' +
                  '10\tcd\n' +
                  '11\tls\n' +
                  '12\twhoami\n' +
                  '13\twhois\n' +
                  '14\tuname\n' +
                  '15\tcat\n' +
                  '16\tnano\n' +
                  '17\ttouch\n' +
                  '18\tmkdir\n' +
                  '19\trmdir\n' +
                  '20\trm\n' +
                  '21\techo\n' +
                  '22\tdate\n' +
                  '23\tuptime\n' +
                  '24\thistory\n' +
                  '25\tipaddr\n' +
                  '26\tcurl\n' +
                  '27\tping\n' +
                  '28\ttraceroute\n' +
                  '29\tdig\n' +
                  '30\tnslookup\n' +
                  '31\tweather\n' +
                  '32\tshorten\n' +
                  '33\tqr\n' +
                  '34\tstatus\n' +
                  '35\topenssl\n' +
                  '36\tgeoip\n' +
                  '37\tasn\n' +
                  '38\treverseip\n' +
                  '39\tciphers\n' + 
                  '40\ttlschain\n' +
                  '41\tnetworkinfo\n' + 
                  '42\tstorage\n'
              },
            ],
          },
          {
            directory: 'docs',
            subdirectories: [],
            files: [
              {
                name: 'commandline_story.txt',
                isRootOnly: true,
                data:
                  "When I first got the idea of creating a command line, I wasn't really planning to build anything more than a small easter egg for my portfolio page - just a few commands like 'help', 'ls', and 'cd' to showcase my content in a fun way.\n" +
                  'But after my initial implementation, I realized how much fun this project could be, and ideas kept pouring in.\n\n' +
                  'Soon I was so driven by new features that I refactored my codebase (for commands) into two services:\n' +
                  '\t- one for local, “static” commands\n' +
                  '\t- one for HTTP-based commands\n\n' +
                  'Most commands remained easy to implement thanks to this scalable setup, but two HTTP commands really caught me off guard:\n' +
                  '\t1. **curl**: the browser blocked cross-origin requests, so I built a simple HTTP proxy on my VPS to fetch URLs server-side and inject the proper CORS headers.\n' +
                  "\t2. **traceroute**: since browsers can't run network-layer commands, I added a VPS-hosted API to execute 'traceroute' on the server and stream the output back.\n\n" +
                  'With those solutions in place, I could deliver real output instead of templates or errors only.\n\n' +
                  "Next, I refactored the 'cat' command - originally it both displayed and edited file content, which isn't realistic — so now 'cat' only shows the content, and a new 'nano' command provides a full WYSIWYG editor with save/exit shortcuts (Ctrl+O, Ctrl+X).\n\n" +
                  "After that, I implemented a 'sudo' command: enter the password 'TemetNosce!' to gain root permissions and edit/delete any file.\n\n" +
                  "By now, I'd covered 41+ commands, complete with authentic bash-style errors and edge-case handling, plus command chaining ('&&') and batch file/dir creation or deletion.\n\n" +
                  "Finally, I optimized the terminal for mobile devices — adding touch-friendly buttons for 'nano' and a 'stop ping' control since Ctrl+C isn't available on phones and tablets.\n\n" +
                  "Now the core project is complete, but I'm already dreaming up new features. I hope this gives you a peek into how the terminal grew from a tiny easter egg into a full-blown Linux-style interface.\n" +
                  'Thanks for reading - have fun exploring!\n\n' +
                  '-Lukas',
              },
              {
                name: 'secret.txt',
                isRootOnly: true,
                data:
                  '──────────────────────────────────────────────────────────\n' +
                  '“The Matrix is everywhere.\n' +
                  'It is all around us...”\n' +
                  '— Morpheus, The Matrix\n\n' +
                  "You've breached the shell and gained root.\n" +
                  'Welcome to the Construct.\n\n' +
                  '> system.host    api.lukasbusch.dev\n' +
                  '> system.proxy   proxy.lukasbusch.dev\n' +
                  '> language       Angular & TypeScript\n' +
                  '> editor         nano (Ctrl+O, Ctrl+X)\n\n' +
                  '“I can only show you the door.\n' +
                  " You're the one that has to walk through it.”\n" +
                  '   — Morpheus, The Matrix\n\n' +
                  'Tip: Try `curl matrix`\n' +
                  '──────────────────────────────────────────────────────────',
                isHidden: true,
              },
              {
                name: 'decrypt.txt',
                isRootOnly: true,
                data:
                  '\n──────────────────────────────────────────────────────────\n' +
                  '01133905 00181322 01161635 03431081 96099549 ' +
                  '73963331 79411405 01309049 15483594 49743178 ' +
                  '01818052 67600017 22033896 70034059 99077046 ' +
                  '08943816 71217459 06972930 00025122 10199189 ' +
                  '08700824 73544891 57349037 13161499 40470305 ' +
                  '11308207 03515945 00159459 37102482 99351441 ' +
                  '52710091 96178046 58021615 24054016 60522752 ' +
                  '16971671 88600903 77719419 82300018 89740754 ' +
                  '60113941 20950102 05518102 92703568 91357000 ' +
                  '13468068 11257160 93870538 68580415 19602485 ' +
                  '78050109 32507931 12255009 34712907 26070941 ' +
                  '74314941 82401228 04079879 07341318 81268900 ' +
                  '09800713 37551770 48397930 83806956 87309997 ' +
                  '\n──────────────────────────────────────────────────────────\n' +
                  'Hint: In this endless sequence, only the numbers that herald daybreak and midnight carry meaning - treat the rest as mere passing hours.' +
                  '\n──────────────────────────────────────────────────────────\n',
                isHidden: true,
              },
            ],
          },
        ],
      },
      {
        directory: 'portfolio',
        files: [],
        subdirectories: [
          {
            directory: 'profile',
            subdirectories: [],
            files: [
              {
                name: 'profile.txt',
                isRootOnly: true,
                data:
                  'Name:\t\t\tLukas Busch\n\n' +
                  'Profession:\t\tFull-Stack Web Developer\n\n' +
                  'Experience:\t\t2+ years\n\n' +
                  'Location:\t\tMérida, México\n\n' +
                  'Languages:\t\tEnglish, German, Spanish\n\n' +
                  'Description:\tI am a detail-oriented, analytical, and self-driven Full-Stack Web Developer with over two years of experience building web applications. My main focus is on technologies like Angular, TypeScript, JavaScript, HTML and CSS/SCSS. Writing clean, efficient, and scalable code is just as important to me as being a coordinated and collaborative team player with attention to detail and a keen eye for graphic design.',
              },
            ],
          },
          {
            directory: 'projects',
            subdirectories: [],
            files: [
              {
                name: 'expensetracker.txt',
                isRootOnly: true,
                data:
                  'Expense Tracker\n\n' +
                  'Angular, TypeScript, SCSS, HTML, Supabase, Node.js, Express\n\n' +
                  'Expense Tracker is a full-stack financial management app. Create an account to access a dynamic dashboard that lets you manage expenses, budgets, and settings in one interface.\n\n' +
                  'https://expensetracker.lukasbusch.dev',
              },
              {
                name: 'join.txt',
                isRootOnly: true,
                data:
                  'Join\n\n' +
                  'JavaScript, HTML, CSS, Firebase\n\n' +
                  'Task Manager, inspired by the Kanban system, lets you create and organize tasks with drag-and-drop ease. Assign users and categories to manage your workflow and improve task tracking.\n\n' +
                  'https://lukasbusch.dev/Join/init/login/login.html',
              },
              {
                name: 'polloloco.txt',
                isRootOnly: true,
                data:
                  'Pollo Loco\n\n' +
                  'JavaScript, HTML, CSS\n\n' +
                  'Jump, run, and throw game built with an object-oriented approach. Help Pepe find coins and tabasco salsa to battle the crazy hen in an exciting quest.\n\n' +
                  'https://lukasbusch.dev/PolloLoco/index.html',
              },
              {
                name: 'terminal.txt',
                isRootOnly: false,
                data:
                  'Interactive Terminal Simulation\n\n' +
                  'Angular, TypeScript, SCSS, HTML, Node.js, Express, Flask\n\n' +
                  'Embeds a fully-functional, Linux-style command-line interface right in your portfolio.  ' +
                  'Supports 41+ real commands (ls, cat, nano, ping, curl, dig, nslookup, traceroute, weather, etc.), ' +
                  'command chaining with &&, sudo-style authentication, and precise Linux-style error messaging to mirror bash behavior.\n\n' +
                  'Features:\n' +
                  ' • WYSIWYG nano editor for .txt files (with save/exit shortcuts ^O, ^X)\n\n' +
                  ' • Real-time network and HTTP/DNS lookups via a Node.js + Flask proxy (avoids CORS)\n\n' +
                  ' • File creation, removal, renaming, and directory navigation — all with authentic error handling\n\n' +
                  ' • QR code generator and link shortener\n\n' +
                  ' • Root permissions needed for certain actions (Password: TemetNosce!)\n\n' +
                  ' • Session uptime, user count, and system info (uname)\n\n' +
                  ' • Implemented easter eggs\n',
              },
              {
                name: 'notes.txt',
                isRootOnly: true,
                data:
                  'Notes\n\n' +
                  'JavaScript, HTML, CSS, Firebase\n\n' +
                  'Create, edit, archive, and delete notes effortleopenssly with inbuilt search functionality. Available in 5 languages and as PWA.\n\n' +
                  'https://lukasbusch.dev/Notes/index.html',
              },
            ],
          },
          {
            directory: 'contact',
            subdirectories: [],
            files: [
              {
                name: 'contact.txt',
                isRootOnly: true,
                data:
                  'Name:\t\tLukas Busch\n\n' +
                  'Email:\t\twebdeveloper@lukasbusch.dev\n\n' +
                  'WhatsApp:\t+52 9993 5180 61\n\n' +
                  'GitHub:\t\thttps://github.com/lukasbuschdev\n\n' +
                  'LinkedIn:\twww.linkedin.com/in/lukas-busch-4192001b5',
              },
            ],
          },
        ],
      },
    ],
  },
];
