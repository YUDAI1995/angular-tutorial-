import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //Formのモジュールをアプリに適用

import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { MemberDatailComponent } from './member-datail/member-datail.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    MemberDatailComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule // 追加
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
