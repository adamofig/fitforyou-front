import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PicturesComponent } from './pictures/pictures.component';
import { HomeComponent } from './home/home.component';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MainNavComponent,
    PicturesComponent,
    HomeComponent,
    TestComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CommonModule,
    InputTextModule,
    BadgeModule,
    StyleClassModule,
    ButtonModule,
    RippleModule,
    MenuModule,
    DashboardRoutingModule,
    HttpClientModule,
    FileUploadModule,
    provideStorage(() => getStorage()),
  ],
})
export class DashboardModule {}
