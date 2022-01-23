// service 機能
// コンポーネントではデータの取得や保存を行わずにデータの受け渡しのみを行う。（コードが膨れ上がってしまうため）
// serviceの方にデータの取得や保存を記載する

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MEMBERS } from './mock.members';
import { MessageService } from './message.service';

// サービスがアプリの中のどこで使用されるかを記載する
@Injectable({
  providedIn: 'root' // root -> アプリケーション全体で使用できる
})
export class MemberService {

  constructor(private messageService: MessageService) { }

  // 同期処理
  // getMembers() :Member[] {
  //   return MEMBERS;
  // }

  // データ取得を非同期処理に -> RX.jsの機能を用いて非同期処理を行う
  getMembers() :Observable<Member[]> {
    // Observable : Rx.jsというライブラリで提供される

    this.messageService.add('MemberService: "社員一覧サービスを取得しました。')

    return of(MEMBERS);
    // of 関数 : 実行の際、渡した値をObservableに変換して返す関数

  }

}
