import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { coreModule } from './@core/core.module';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, coreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
