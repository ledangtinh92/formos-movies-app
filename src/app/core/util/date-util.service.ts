import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  getCurrentDateFormatted(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
}
