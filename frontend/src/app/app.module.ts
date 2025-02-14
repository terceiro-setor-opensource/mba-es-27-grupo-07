import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MatButtonModule } from '@angular/material/button';
import { NewAccountPageComponent } from './pages/new-account-page/new-account-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UploadInputField } from './components/upload-input-field/upload-input-field.component';
import { MyProfilePageComponent } from './pages/my-profile-page/my-profile-page.component';
import { MenuComponent } from './components/menu/menu.component';
import { AdsPageComponent } from './pages/ads-page/ads-page.component';
import { MyAdsPageComponent } from './pages/my-ads-page/my-ads-page.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditMyProfilePageComponent } from './pages/edit-my-profile-page/edit-my-profile-page.component';
import { MyAdsDetailsPageComponent } from './pages/my-ads-details-page/my-ads-details-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    LoginPageComponent,
    NewAccountPageComponent,
    HeaderComponent,
    HomePageComponent,
    MyProfilePageComponent,
    MenuComponent,
    AdsPageComponent,
    MyAdsPageComponent,
    EditMyProfilePageComponent,
    MyAdsDetailsPageComponent,
    ForgotPasswordPageComponent,
    ModalConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    FormsModule,
    UploadInputField,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatProgressSpinnerModule,
    NgxMaskDirective,
  ],
  providers: [
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Inicializa o Firebase
    provideFunctions(() => getFunctions()), // Disponibiliza as funções,
    provideStorage(() => getStorage()), // Disponibiliza o storage
    provideHttpClient(withInterceptorsFromDi()),
    provideNgxMask(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
