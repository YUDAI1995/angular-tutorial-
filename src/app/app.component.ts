import { Component } from '@angular/core';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '記録アプリ';

  constructor(public dialog: MatDialog) {}

  public openEditDialog(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: undefined,
    });

    dialogRef.afterClosed().subscribe((_) => {
      console.log('The dialog was closed');
    });
  }

  public openSearchDialog(): void {
    const dialogRef = this.dialog.open(SearchDialogComponent);

    dialogRef.afterClosed().subscribe((_) => {
      console.log('The dialog was closed');
    });
  }
}
