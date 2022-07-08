import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { BlogModule } from './blog/blog.module';
import { ProjectModule } from './project/project.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HomeModule, BlogModule, ProjectModule],
})
export class PagesModule {}
