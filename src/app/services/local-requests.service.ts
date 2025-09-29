import { Injectable } from '@angular/core';
import { typeFile } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class LocalRequestsService {
  isEditing: boolean = false;
  hasRootPermissions: boolean = false;
  isInputPassword: boolean = false;
  openedFile: typeFile = { name: '', isRootOnly: false, data: '' };
}
