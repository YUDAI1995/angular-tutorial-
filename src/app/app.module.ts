import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //Formのモジュールをアプリに適用
import { HttpClientModule } from '@angular/common/http';

// データサーバーをシミュレートする機能
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { MemberDatailComponent } from './member-datail/member-datail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberSearchComponent } from './member-search/member-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    MemberDatailComponent,
    MessagesComponent,
    DashboardComponent,
    MemberSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    AppRoutingModule, // 追加
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
