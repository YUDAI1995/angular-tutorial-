import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members: Member[] = [];

  // selectedMember?: Member;

  constructor(
    private memberService: MemberService // private messageService: MessageService
  ) {
    // private memberService: MemberService
    //  -> 依存性注入 【DI】 Dependency Injection
    // コンポーネント間の依存性を解決して外部のクラスを簡単に利用できるようにするソフトウェアパターン
  }

  ngOnInit(): void {
    // constructor内では行わない(constructorは自身のプロパティなどを初期化のみを行うため)
    // ngOnInit はコンポーネントが初期化されるタイミングで実行されるライフサイクルメソッド
    this.getMembers();
  }

  // onSelect(member: Member): void {
  //   this.selectedMember = member;
  //   this.messageService.add(`MembersComponenr: 社員データ(id = ${member.id})が選択されました`)
  // }

  // mock からデータを取得
  private getMembers(): void {
    this.memberService
      .getMembers() // Observaleが帰ってくる
      .subscribe((members) => (this.members = [...members, ...this.members]));
  }

  public add(name: string): void {
    name = name.trim();

    if (!name) {
      return;
    }
    this.memberService.addMember({ name } as Member).subscribe((member) => {
      this.members = [...this.members, member];
    });
  }

  public delete(member: Member): void {
    this.members = this.members.filter((m) => m !== member);
    this.memberService.deleteMember(member).subscribe(); // subscribe()を実行することでhttpリクエストが実行される
  }
}
