import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Member } from './member';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const members = [
      { id: 11, name: 'テストユーザー1' },
      { id: 12, name: 'テストユーザー2' },
      { id: 13, name: 'テストユーザー3' },
      { id: 14, name: 'テストユーザー4' },
      { id: 15, name: 'テストユーザー5' },
      { id: 16, name: 'テストユーザー6' },
      { id: 17, name: 'テストユーザー7' },
      { id: 18, name: 'テストユーザー8' },
      { id: 19, name: 'テストユーザー9' },
      { id: 20, name: 'テストユーザー10' },
    ];

    return { members };
  }

  // 新しくデータを作成した際にidを付与するためのメソッド
  genId(members: Member[]): number {
    return members.length > 0
      ? Math.max(...members.map((member) => member.id)) + 1
      : 11;
  }
}
