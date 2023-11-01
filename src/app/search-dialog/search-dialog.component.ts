import { Component, Inject, OnInit } from '@angular/core';
import { RecordModel } from '../model/record.model';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { RecordService } from '../service/record.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
})
export class SearchDialogComponent implements OnInit {
  public records$?: Observable<RecordModel[]>;
  private searchTerms = new Subject<string>();

  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecordModel,
    private recordService: RecordService,
    private router: Router
  ) {}

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.records$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(), // 直前のデータと同じ場合は処理を実行しない
      // 検索キーワードを受け取るたびに、新しいObservableを返す
      switchMap((term: string) => this.recordService.searchRecords(term))
    );
  }

  public onDetail(id?: number): void {
    if (id != undefined) {
      this.dialogRef.close();
      this.router.navigate(['/detail', id]);
    }
  }

  public onCloce(): void {
    this.dialogRef.close();
  }
}
