import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'auth', component: AuthPageComponent },
];

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from 'src/layouts/main-header/main-header.component';
import { ButtonComponent } from './components/UI/button/button.component';
import { MainContentComponent } from 'src/layouts/main-content/main-content.component';
import { HomePageComponent } from 'src/pages/home-page/home-page.component';
import { AuthPageComponent } from 'src/pages/auth-page/auth-page.component';
import { DeskComponent } from './components/desk/desk.component';
import { FormAuthComponent } from './components/form-auth/form-auth.component';
import { TextInputComponent } from './components/UI/text-input/text-input.component';
import { TaskComponent } from './components/task/task.component';
import { PopupComponent } from './components/UI/popup/popup.component';
import { CreateTaskPopupComponent } from './create-task-popup/create-task-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    ButtonComponent,
    MainContentComponent,
    HomePageComponent,
    AuthPageComponent,
    DeskComponent,
    FormAuthComponent,
    TextInputComponent,
    TaskComponent,
    PopupComponent,
    CreateTaskPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


  }
