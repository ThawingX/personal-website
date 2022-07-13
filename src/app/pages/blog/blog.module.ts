import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { MarkdownModule } from 'ngx-markdown';
@NgModule({
  declarations: [BlogComponent],
  imports: [CommonModule, BlogRoutingModule, MarkdownModule.forRoot()],
})
export class BlogModule {}
