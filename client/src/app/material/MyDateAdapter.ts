import { NativeDateAdapter } from '@angular/material/core';
import {Injectable} from '@angular/core';

@Injectable()
export class MyDateAdapter extends NativeDateAdapter {

  getFirstDayOfWeek(): number {
    return 1;
  }

  

}