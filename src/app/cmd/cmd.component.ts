import { Component, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { typeCommand, typeCommandList, typeDirectory, typeLog } from '../types/types';
import { ScrollService } from '../services/scroll.service';
import { HttpClient } from '@angular/common/http';
import { AVAILABLE_COMMANDS } from '../data/available-commands';
import { COMMAND_CONFIG } from '../data/command-map';
import { AVAILABLE_DIRECTORIES } from '../data/available-directories';
import { HelpComponent } from "./help/help.component";
import { UtilsService } from '../services/utils.service';
import { HttpRequestsService } from '../services/http-requests.service';
import { LocalRequestsService } from '../services/local-requests.service';
import { AutoGrowDirective } from '../directives/auto-grow.directive';
import { PingService } from '../services/http-commands/ping.service';
import { DigService } from '../services/http-commands/dig.service';
import { NslookupService } from '../services/http-commands/nslookup.service';
import { IpaddrService } from '../services/http-commands/ipaddr.service';
import { CurlService } from '../services/http-commands/curl.service';
import { WeatherService } from '../services/http-commands/weather.service';
import { TracerouteService } from '../services/http-commands/traceroute.service';
import { ShortenService } from '../services/http-commands/shorten.service';
import { QrService } from '../services/http-commands/qr.service';
import { StatusService } from '../services/http-commands/status.service';
import { WhoisService } from '../services/http-commands/whois.service';
import { OpensslService } from '../services/http-commands/openssl.service';
import { GeoipService } from '../services/http-commands/geoip.service';
import { AsnService } from '../services/http-commands/asn.service';
import { ReverseipService } from '../services/http-commands/reverseip.service';
import { CiphersService } from '../services/http-commands/ciphers.service';
import { TlschainService } from '../services/http-commands/tlschain.service';
import { ClearService } from '../services/local-commands/clear.service';
import { RebootService } from '../services/local-commands/reboot.service';
import { ColorService } from '../services/local-commands/color.service';
import { WhoamiService } from '../services/local-commands/whoami.service';
import { UnameService } from '../services/local-commands/uname.service';
import { UptimeService } from '../services/local-commands/uptime.service';
import { DateService } from '../services/local-commands/date.service';
import { EchoService } from '../services/local-commands/echo.service';
import { HelpService } from '../services/local-commands/help.service';
import { StoryService } from '../services/local-commands/story.service';
import { CdService } from '../services/local-commands/cd.service';
import { LsService } from '../services/local-commands/ls.service';
import { CatService } from '../services/local-commands/cat.service';
import { NanoService } from '../services/local-commands/nano.service';
import { MkdirService } from '../services/local-commands/mkdir.service';
import { RmdirService } from '../services/local-commands/rmdir.service';
import { RmService } from '../services/local-commands/rm.service';
import { TouchService } from '../services/local-commands/touch.service';
import { SaveFileService } from '../services/local-commands/save-file.service';
import { PwdService } from '../services/local-commands/pwd.service';
import { HistoryService } from '../services/local-commands/history.service';
import { BatteryService } from '../services/local-commands/battery.service';
import { NetworkinfoService } from '../services/local-commands/networkinfo.service';
import { StorageService } from '../services/local-commands/storage.service';
import { PerfService } from '../services/local-commands/perf.service';
import { RobotsService } from '../services/http-commands/robots.service';
import { SitemapService } from '../services/http-commands/sitemap.service';

@Component({
  selector: 'app-cmd',
  imports: [FormsModule, HelpComponent, AutoGrowDirective],
  templateUrl: './cmd.component.html',
  styleUrl: './cmd.component.scss'
})
export class CmdComponent {
    scroll = inject(ScrollService);
  http = inject(HttpClient);
  ngZone = inject(NgZone);
  utils = inject(UtilsService);
  httpRequests = inject(HttpRequestsService);
  localRequests = inject(LocalRequestsService);

  // LOCAL COMMANDS SERVICES
  clearService = inject(ClearService);
  rebootService = inject(RebootService);
  colorService = inject(ColorService);
  whoamiService = inject(WhoamiService);
  unameService = inject(UnameService);
  uptimeService = inject(UptimeService);
  dateService = inject(DateService);
  echoService = inject(EchoService);
  helpService = inject(HelpService);
  storyService = inject(StoryService);
  cdService = inject(CdService);
  lsService = inject(LsService);
  catService = inject(CatService);
  nanoService = inject(NanoService);
  mkdirService = inject(MkdirService);
  rmdirService = inject(RmdirService);
  rmService = inject(RmService);
  touchService = inject(TouchService);
  saveFileService = inject(SaveFileService);
  pwdService = inject(PwdService);
  historyService = inject(HistoryService);
  batteryService = inject(BatteryService);
  networkinfoService = inject(NetworkinfoService);
  storageService = inject(StorageService);
  perfService = inject(PerfService);

  // HTTP COMMANDS SERVICES
  pingService = inject(PingService);
  digService = inject(DigService);
  nslookupService = inject(NslookupService);
  ipaddrService = inject(IpaddrService);
  curlService = inject(CurlService);
  weatherService = inject(WeatherService);
  tracerouteService = inject(TracerouteService);
  shortenService = inject(ShortenService);
  qrService = inject(QrService);
  statusService = inject(StatusService);
  whoisService = inject(WhoisService);
  opensslService = inject(OpensslService);
  geoipService = inject(GeoipService);
  asnService = inject(AsnService);
  reverseipService = inject(ReverseipService);
  ciphersService = inject(CiphersService);
  tslchainService = inject(TlschainService);
  robotsService = inject(RobotsService);
  sitemapService = inject(SitemapService);

  @ViewChild(AutoGrowDirective) autoGrow!: AutoGrowDirective;
  @ViewChild('terminalContainer', { static: false }) terminalContainer!: ElementRef<HTMLElement>;
  @ViewChild('contentContainer', { static: false }) contentContainer!: ElementRef<HTMLElement>;
  @ViewChild('commandInput', { static: false }) commandInput!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('nanoInput', { static: false }) nanoInput!: ElementRef<HTMLTextAreaElement>;

  command: string = '';
  pendingCommand: string | null = null;

  isCommandSent: boolean = false;

  executedCommands: typeCommand[] = [];
  count: number = 0;
  tabIndex: number = 0;
  password: string = 'TemetNosce!';
  inputPw: string = '';

  availableCommands: typeCommandList[] = AVAILABLE_COMMANDS;
  avaiableDirectories: typeDirectory[] = AVAILABLE_DIRECTORIES;
  currentDirectoryPath: typeDirectory[] = [this.avaiableDirectories[0]];

  logs: typeLog[] = [];

  private commandMap: { [key: string]: (cmd: string) => void } = {};

  get currentDirectory(): typeDirectory {
    return this.currentDirectoryPath[this.currentDirectoryPath.length - 1];
  }

  get currentPathString(): string {
    const path = this.currentDirectoryPath.map(dir => dir.directory).filter(Boolean).join('/');
    return path ? '/' + path : '';
  }

  constructor(public host: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    Object.keys(COMMAND_CONFIG).forEach(cmd => {
      if(typeof (this as any)[COMMAND_CONFIG[cmd]] === 'function') {
        this.commandMap[cmd] = (this as any)[COMMAND_CONFIG[cmd]].bind(this);
      }
    });

    this.focusTextarea();
  }

  executeCommand(inputCommand: string): void {
    this.isCommandSent = true;
    this.command = '';

    this.checkInputs(inputCommand);
    this.count = this.executedCommands.length;
    this.tabIndex = 0;

    this.commandInput.nativeElement.style.removeProperty('height');
    setTimeout(() => this.autoGrow.resize());
    this.scrollDown();
  }

  scrollDown(): void {
    setTimeout(() => {
      const el = this.contentContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }, 10);
  }

  checkInputs(command: string): void {
    if(!this.checkIfSudo(command)) return;

    const commands = command.split('&&').map(command => command.trim()).filter(command => command.length);
    this.appendLog(command);

    for(const cmd of commands) {
      const tokens = cmd.split(' ');
      const commandKey = tokens[0];
      const fn = this.commandMap[commandKey];
      
      if(fn) {
        if (this.utils.hasExplainFlag(command)) {
          const manToken = command.split(' ')[0];
          this.executedCommands.push({ command, output: this.utils.renderExplain(manToken), path: this.currentPathString });
          this.scrollDown();
          return;
        }
        fn(cmd)
      } else {
        this.executedCommands.push({ command, output: `${ command }: command not found\nType 'help' for more information`, path: this.currentPathString });
      }
    }
  }

  checkIfSudo(command: string): boolean{
    if(command.startsWith('sudo ') && !this.localRequests.hasRootPermissions) {
      this.pendingCommand = command;
      this.localRequests.isInputPassword = true;
      this.inputPw = '';
      this.executedCommands.push({ command, path: this.currentPathString });
      this.focusPasswordInput();
      return false;
    }

    if(command.startsWith('sudo ') && this.localRequests.hasRootPermissions) {
      this.executedCommands.push({ command, output: `sudo: usage error: root permission already granted`, path: this.currentPathString });
      return false;
    }

    return true;
  }

  appendLog(command: string): void {
    const timestamp = this.utils.formatTimestamp(new Date());
    this.logs.push({ timestamp, command });
  }

  selectCommand(event: KeyboardEvent, command?: string): void {
    if(event.key === 'ArrowUp') {
      if(this.localRequests.isEditing) return;
      event.preventDefault();
      this.selectCommandUp();
    } else if(event.key === 'ArrowDown') {
      if(this.localRequests.isEditing) return;
      event.preventDefault();
      this.selectCommandDown();
    } else if(event.key === 'Enter') {
      if(this.localRequests.isEditing) return;
      event.preventDefault();
      if(this.httpRequests.isFetching) return;
      if(!command) return;
      this.executeCommand(command);
      this.focusTextarea();
    } else if(event.ctrlKey && event.key.toLowerCase() === 'c') {
      event.preventDefault();
      this.stopPing();
    } else if(event.ctrlKey && event.key.toLowerCase() === 'o') {
      this.saveAndExitNano(event);
    } else if(event.ctrlKey && event.key.toLowerCase() === 'x') {
      this.exitNano(event);
    } else if(event.key === 'Tab') {
      event.preventDefault();
      this.showFilesAndDirectories();
    }
  }

  selectCommandUp(): void {
    if(!this.executedCommands.length) return;
    
    if(this.count > 0) {
      this.count--;
    }

    this.command = this.executedCommands[this.count].command;
  }
  
  selectCommandDown(): void {
    if(!this.executedCommands.length) return;

    if(this.count < this.executedCommands.length - 1) {
      this.count++;
      this.command = this.executedCommands[this.count].command;
    } else {
      this.count = this.executedCommands.length;
      this.command = '';
    }
  }

  focusInput(event?: MouseEvent): void {
    setTimeout(() => {
      const inputField = document.querySelector('.input-line textarea');
      if(inputField) (inputField as HTMLElement).focus({ preventScroll: true });
      if(event instanceof MouseEvent && event.detail === 1) return;
      this.scrollDown();
    });
  }

  focusPasswordInput(): void {
    setTimeout(() => {
      const input = document.querySelector('.password-input-container input');
      if(input) (input as HTMLElement).focus();
      this.scrollDown();
    });
  }

  focusTextarea(): void {
    setTimeout(() => {
      this.commandInput.nativeElement.focus();
    }, 100);
  }

  focusNanoInput(): void {
    setTimeout(() => {
      this.nanoInput.nativeElement.focus();
    }, 100);
  }

  checkPassword(inputPassword: string): void {
    this.localRequests.isInputPassword = false;

    if(inputPassword !== this.password) {
      this.executedCommands.push({ command: this.pendingCommand!, output: `${ this.pendingCommand }: wrong password: Permission denied`, path: this.currentPathString });
      this.pendingCommand = null;
      this.focusTextarea();
      return this.scrollDown();
    }

    this.localRequests.hasRootPermissions = true;
    const cmd = this.pendingCommand!;
    this.pendingCommand = null;

    this.checkInputs(cmd.replace(/^sudo\s+/, ''));
    this.focusTextarea();
  }

  exitNano(event?: Event): void {
    event?.stopPropagation();
    if(!this.localRequests.isEditing) return;
    this.localRequests.isEditing = false;
    this.focusTextarea();
    this.command = '';
    this.scrollDown();
  }

  saveAndExitNano(event: Event): void {
    event?.stopPropagation();
    if(!this.localRequests.isEditing) return;
    this.localRequests.isEditing = false;
    this.saveFile('O');
    this.focusTextarea();
    this.command = '';
    this.scrollDown();
  }

  showFilesAndDirectories(): void {
    const files = this.currentDirectory.files.filter(file => !file.isHidden).map(file => file.name);
    const subdirectories = this.currentDirectory.subdirectories.map(subdir => subdir.directory);
    const tabFiles = [...files, ...subdirectories, ''];

    const insertedCommand = this.command.trim().split(' ')[0];
    const isFileOrDir = tabFiles.includes(insertedCommand);

    this.command = (insertedCommand && !isFileOrDir) ? (insertedCommand + ' ' + tabFiles[this.tabIndex]) : tabFiles[this.tabIndex];
    this.tabIndex = (this.tabIndex + 1) % tabFiles.length;
  }


  // LOCAL REQUESTS

  clear(): void {
    this.clearService.clear(this.executedCommands);
  }

  reboot(command: string): void {
    this.rebootService.reboot(command, this.executedCommands, this.currentPathString);
  }
  
  color(command: string): void {
    this.colorService.color(command, this.executedCommands, this.currentPathString, this.host.nativeElement, this.scrollDown.bind(this));
  }

  whoami(command: string): void {
    this.whoamiService.whoami(command, this.executedCommands, this.currentPathString);
  }

  uname(command: string): void {
    this.unameService.uname(command, this.executedCommands, this.currentPathString);
  }

  uptime(command: string): void {
    this.uptimeService.uptime(command, this.executedCommands, this.currentPathString);
  }

  date(command: string): void {
    this.dateService.date(command, this.executedCommands, this.currentPathString);
  }

  echo(command: string): void {
    this.echoService.echo(command, this.executedCommands, this.currentPathString);
  }

  help(command: string): void {
    this.helpService.help(command, this.executedCommands, this.currentPathString);
  }

  story(command: string): void {
    this.storyService.story(command, this.executedCommands, this.currentPathString);
  }

  cd(command: string): void {
    this.cdService.cd(command, this.executedCommands, this.currentPathString, this.currentDirectory, this.currentDirectoryPath, this.scrollDown.bind(this));
  }

  ls(command: string): void {
    this.lsService.ls(command, this.executedCommands, this.currentPathString, this.currentDirectory);
  }

  cat(command: string): void {
    this.catService.cat(command, this.executedCommands, this.currentPathString, this.currentDirectory, this.scrollDown.bind(this));
  }

  nano(command: string): void {
    this.nanoService.nano(command, this.executedCommands, this.currentPathString, this.currentDirectory, this.focusNanoInput.bind(this));
  }

  mkdir(command: string): void {
    this.mkdirService.mkdir(command, this.executedCommands, this.currentPathString, this.currentDirectory);
  }

  rmdir(command: string): void {
    this.rmdirService.rmdir(command, this.executedCommands, this.currentPathString, this.currentDirectory);
  }

  rm(command: string): void {
    this.rmService.rm(command, this.executedCommands, this.currentPathString, this.currentDirectory);
  }

  touch(command: string): void {
    this.touchService.touch(command, this.executedCommands, this.currentPathString, this.currentDirectory);
  }

  saveFile(command: string): void {
    this.saveFileService.saveFile(command, this.executedCommands, this.currentPathString, this.currentDirectory);
  }

  pwd(command: string): void {
    this.pwdService.pwd(command, this.executedCommands, this.currentPathString);
  }

  exit(): void {
    location.href = "https://lukasbusch.dev/main";
  }
  
  history(command: string): void {
    this.historyService.history(command, this.executedCommands, this.currentPathString);
  }

  battery(command: string): void {
    this.batteryService.battery(command, this.executedCommands, this.currentPathString);
  }

  networkinfo(command: string): void {
    this.networkinfoService.networkinfo(command, this.executedCommands, this.currentPathString);
  }

  storage(command: string): void {
    this.storageService.storage(command, this.executedCommands, this.currentPathString);
  }

  perf(command: string): void {
    this.perfService.perf(command, this.executedCommands, this.currentPathString);
  }


  // HTTP REQUESTS

  async ipaddr(command: string): Promise<void> {
    return this.ipaddrService.ipaddr(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }

  curl(command: string): void {
    this.curlService.curl(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this), this.host.nativeElement);
  }

  ping(command: string): void {
    this.pingService.ping(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
    this.scrollDown();
  }

  stopPing(): void {
    if(this.pingService.currentPingInterval) {
      clearInterval(this.pingService.currentPingInterval);
      this.pingService.currentPingInterval = null;
      this.executedCommands.push({ command: '^C', path: this.currentPathString });
      this.httpRequests.isFetching = false;
      this.httpRequests.isPinging = false;
      this.command = '';
      this.scrollDown();
    }
  }

  dig(command: string): void {
    this.digService.dig(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }

  nslookup(command: string): void {
    this.nslookupService.nslookup(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }

  traceroute(command: string): void {
    this.tracerouteService.traceroute(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }

  weather(command: string): void {
    this.weatherService.weather(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }

  shorten(command: string): void {
    this.shortenService.shorten(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }
  
  qr(command: string): void {
    this.qrService.qr(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }
  
  status(command: string): void {
    this.statusService.status(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }

  whois(command: string): void {
    this.whoisService.whois(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }

  openssl(command: string): void {
    this.opensslService.openssl(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }

  geoip(command: string): void {
    this.geoipService.geoip(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }

  asn(command: string): void {
    this.asnService.asn(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }

  reverseip(command: string): void {
    this.reverseipService.reverseip(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }

  ciphers(command: string): void {
    this.ciphersService.ciphers(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }

  tlschain(command: string): void {
    this.tslchainService.tlschain(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }

  robots(command: string): void {
    this.robotsService.robots(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }

  sitemap(command: string): void {
    this.sitemapService.sitemap(command, this.executedCommands, this.currentPathString, this.scrollDown.bind(this));
  }
}
