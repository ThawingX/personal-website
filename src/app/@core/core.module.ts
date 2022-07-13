import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { serviceModule } from '../@service/service.module';
import { ShareModule } from '../share/share.module';
import { PagesModule } from '../pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    serviceModule,
    ShareModule,
    PagesModule,
    HttpClientModule,
  ],
})
export class coreModule {}
