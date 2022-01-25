// service 機能
// コンポーネントではデータの取得や保存を行わずにデータの受け渡しのみを行う。（コードが膨れ上がってしまうため）
// serviceの方にデータの取得や保存を記載する

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MEMBERS } from './mock.members';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// サービスがアプリの中のどこで使用されるかを記載する
@Injectable({
  providedIn: 'root', // root -> アプリケーション全体で使用できる
})
export class MemberService {
  private membersUrl = 'api/members';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'applicaton/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // 同期処理
  // getMembers() :Member[] {
  //   return MEMBERS;
  // }

  // データ取得を非同期処理に -> RX.jsの機能を用いて非同期処理を行う
  public getMembers(): Observable<Member[]> {
    // Observable : Rx.jsというライブラリで提供される

    // this.messageService.add('MemberService: "社員一覧サービスを取得しました。');

    // of 関数 : 実行の際、渡した値をObservableに変換して返す関数
    //return of(MEMBERS);

    // httpクライアント   httpクライアントではリクエスト後にObservableが帰ってくる（Rx.jsを使用して構成されているため）
    return this.http.get<Member[]>(this.membersUrl).pipe(
      tap((members) => this.log(`社員データを取得しました`)),
      catchError(this.handleError<Member[]>('getMembers', [])) // Getメソッド処理がエラーの時のみ指定したthis.handleErrorメソッドが実行される
    );
  }

  public getMember(id: number): Observable<Member | undefined> {
    this.messageService.add(
      `MemberService: 社員データ(id = ${id})を取得しました`
    );
    const url = `${this.membersUrl}/${id}`;

    // return of(MEMBERS.find((member) => member.id === id));
    return this.http.get<Member>(url).pipe(
      tap((_) => this.log(`社員データ(id=${id})を取得しました`)),
      catchError(this.handleError<Member>(`getMember id=${id}`))
    );

    //
  }

  public updateMember(member: Member): Observable<any> {
    return this.http.put(this.membersUrl, member, this.httpOptions).pipe(
      tap((_) => this.log(`社員データ(id=${member.id})を変更しました`)),
      catchError(this.handleError<any>('updateMember'))
    );
  }

  public addMember(member: Member): Observable<Member> {
    return this.http
      .post<Member>(this.membersUrl, member, this.httpOptions)
      .pipe(
        tap((newMember: Member) =>
          this.log(`社員データ(id=${newMember.id})を追加しました`)
        ),
        catchError(this.handleError<Member>('addMember'))
      );
  }

  public deleteMember(member: Member | number): Observable<Member> {
    const id = typeof member === 'number' ? member : member.id;
    const url = `${this.membersUrl}/${id}`;

    return this.http
      .delete<Member>(url, this.httpOptions)
      .pipe(
        tap(
          (_) => this.log(`社員データ(id=${id}}を削除しました)`),
          catchError(this.handleError<Member>('deleteMember'))
        )
      );
  }

  public searchMembers(term: string): Observable<Member[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Member[]>(`${this.membersUrl}/?name=${term}`).pipe(
      tap((_) => this.log(`${term}にマッチする社員データが見つかりました`)),
      catchError(this.handleError<Member[]>('searchMember', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
  }

  // operation引数は実行したhttpリクエストメソッドが入る
  // result引数はエラーによってアプリが止まらないように安全な値をコンポーネントに返すようにする
  private handleError<T>(opration = 'oparation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${opration} 失敗: ${error.body.error}`);
      return of(result as T); // 型キャスト
    };
  }
}
