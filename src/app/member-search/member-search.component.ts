import { Component, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css'],
})
export class MemberSearchComponent implements OnInit {
  public members$?: Observable<Member[]>;
  private searchTerms = new Subject<string>(); // rxjsのSubjectクラスを使用 => Observableデータを流すためのクラス

  constructor(private memberSearvice: MemberService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.members$ = this.searchTerms.pipe(

      debounceTime(300), // キーボード入力の後、300ms待って次の実行に移る
      distinctUntilChanged(), // 直前のデータと同じ場合は処理を実行しない

      // 検索キーワードを受け取るたびに、新しいObservableを返す
      switchMap((term: string) => this.memberSearvice.searchMembers(term))
    );
  }
}
