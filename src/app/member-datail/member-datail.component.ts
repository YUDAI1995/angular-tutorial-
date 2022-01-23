import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../member';

@Component({
  selector: 'app-member-datail',
  templateUrl: './member-datail.component.html',
  styleUrls: ['./member-datail.component.css']
})
export class MemberDatailComponent implements OnInit {
  // input デコレータ
  @Input() member?: Member

  constructor() { }

  ngOnInit(): void {
  }

}
