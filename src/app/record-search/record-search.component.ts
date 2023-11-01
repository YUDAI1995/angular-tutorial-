import { Component, OnInit, ViewChild } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { RecordService } from '../service/record.service';
import { RecordModel } from '../model/record.model';

@Component({
  selector: 'app-record-search',
  templateUrl: './record-search.component.html',
  styleUrls: ['./record-search.component.scss'],
})
export class MemberSearchComponent implements OnInit {
  public records$?: Observable<RecordModel[]>;
  private searchTerms = new Subject<string>();

  constructor(private recordSearvice: RecordService) {}

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.records$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(), // 直前のデータと同じ場合は処理を実行しない
      // 検索キーワードを受け取るたびに、新しいObservableを返す
      switchMap((term: string) => this.recordSearvice.searchRecords(term))
    );
  }
}
