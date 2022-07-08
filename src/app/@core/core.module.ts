import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { serviceModule } from '../@service/service.module';
import { ShareModule } from '../share/share.module';
import { PagesModule } from '../pages/pages.module';

@NgModule({
  declarations: [],
  imports: [BrowserModule, serviceModule, ShareModule, PagesModule],
})
export class coreModule {}
