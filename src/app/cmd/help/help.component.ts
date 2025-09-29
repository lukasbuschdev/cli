import { Component, Input } from '@angular/core';
import { typeCommand, typeCommandList } from '../../types/types';

@Component({
  selector: 'app-help',
  imports: [],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {
  @Input() availableCommands!: typeCommandList[];
}
