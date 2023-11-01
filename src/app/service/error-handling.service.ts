import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  public log(message: string) {
    console.log(message);
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): T => {
      console.error(error);

      this.log(`${operation} 失敗: ${error.message}`);
      return result as T;
    };
  }
}
