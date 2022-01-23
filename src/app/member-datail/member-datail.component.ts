import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-datail',
  templateUrl: './member-datail.component.html',
  styleUrls: ['./member-datail.component.css'],
})
export class MemberDatailComponent implements OnInit {
  // input デコレータ
  @Input() member?: Member;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private location: Location // ブラウザバックなど
  ) {}

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.memberService
      .getMember(id)
      .subscribe((member) => (this.member = member));
  }

  goBack(): void {
    this.location.back();
  }
}
