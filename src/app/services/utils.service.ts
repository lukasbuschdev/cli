import { Injectable } from '@angular/core';
import { EXPLAIN } from '../data/command-explain';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private sessionStart = Date.now();

  generateRandomId(): number {
    return Math.floor(Math.random() * (70000 - 30000)) + 30000;
  }

  formatTimestamp(date: Date): string {
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  
    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    const pad = (num: number): string => num.toString().padStart(2, '0');
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
  
    let timezone = 'GMT';
    const tzMatch = date.toString().match(/\(([^)]+)\)$/);
    if(tzMatch && tzMatch[1]) {
      timezone = tzMatch[1].split(' ').map(word => word[0]).join('');
    } else {
      timezone = date.toTimeString().split(' ')[0];
    }
  
    return `${dayOfWeek} ${month} ${day} ${hours}:${minutes}:${seconds} ${timezone} ${year}`;
  }

  formatTime(timestamp: number, timezoneOffset: number): string {
    const localDate = new Date((timestamp + timezoneOffset) * 1000);
    const hours = localDate.getUTCHours().toString();
    const minutes = localDate.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  formatCoordinates(lat: number, lon: number): string {
    const latDirection = lat >= 0 ? 'N' : 'S';
    const lonDirection = lon >= 0 ? 'E' : 'W';

    const absLat = Math.abs(lat).toFixed(4);
    const absLon = Math.abs(lon).toFixed(4);
  
    return `${absLat}° ${latDirection}, ${absLon}° ${lonDirection}`;
  }

  getUptime(): string {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${hh}:${mm}:${ss}`;
  
    let delta = Math.floor((Date.now() - this.sessionStart) / 1000);
  
    const days    = Math.floor(delta / 86400);
    delta %= 86400;
    const hours   = Math.floor(delta / 3600);
    delta %= 3600;
    const minutes = Math.floor(delta / 60);
    const seconds = delta % 60;
  
    let upPart = '';
    if (days > 0) {
      upPart += `${days} day${days > 1 ? 's' : ''}, `;
    }
    upPart += `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
    const usersPart = `1 user`;
    const loadAvg = [2.77, 2.20, 2.11].map(n => n.toFixed(2)).join(', ');
    const loadPart = `load average: ${loadAvg}`;
  
    return `${currentTime}  up  ${upPart},  ${usersPart},  ${loadPart}`;
  }

  getFormattedDate(): string {
    const date = new Date();
    const days   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const weekday = days[date.getDay()];
    const month   = months[date.getMonth()];
    const day     = date.getDate();

    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const hh = String(hours).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    let timezone = '';
    const timezoneMatch = date.toString().match(/\(([^)]+)\)$/);
    if(timezoneMatch) {
      timezone = timezoneMatch[1].split(' ').map(word => word[0]).join('');
    } else {
      const parts = new Intl.DateTimeFormat('en-US', { timeZoneName:'short' }).formatToParts(date);
      timezone = (parts.find(p => p.type==='timeZoneName')?.value || '').replace(/[^A-Z]/g, '');
    }

    const year = date.getFullYear();
    return `${weekday} ${month} ${day} ${hh}:${mm}:${ss} ${ampm} ${timezone} ${year}`;
  }

  hasExplainFlag(raw: string): boolean {
    return /\s--man(\s|$)/.test(raw);
  }

  renderExplain(name: string): string {
    const e = EXPLAIN[name];
    if (!e) return `No explanation available for '${name}'.`;
    const ex = e.examples.map(x => `  $ ${x.cmd}\n    → ${x.why}`).join('\n');
    const notes = (e.notes ?? []).map(n => `  • ${n}`).join('\n');
    const see = e.seeAlso?.length ? `\nSee also: ${e.seeAlso.join(', ')}` : '';
    return [
      `${e.name} — ${e.purpose}`,
      ``,
      `Usage: ${e.synopsis}`,
      ``,
      `Examples:\n${ex}`,
      notes ? `\nNotes:\n${notes}` : '',
      e.explanation ? `\nBeginner explanation:\n${e.explanation}` : '',
      see
    ].join('\n');
  }
}
