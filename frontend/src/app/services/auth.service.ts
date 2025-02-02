import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ILogin, ILoginCredentials } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginCredentials: ILoginCredentials | null = null;

  constructor(private auth: AngularFireAuth) {}

  async login(data: ILogin): Promise<ILoginCredentials> {
    try {
      const credential = await this.auth.signInWithEmailAndPassword(
        data.email,
        data.password
      );

      const user = credential.user;
      const idToken = await user?.getIdTokenResult();

      return {
        uid: user?.uid || '',
        email: user?.email || '',
        token: idToken?.token || '',
      };
    } catch (error) {
      console.error('Error login user:', error);

      throw error;
    }
  }

  async getCredentials(): Promise<ILoginCredentials | null> {
    try {
      if (this.loginCredentials) return this.loginCredentials;

      const user = await this.auth.currentUser;

      if (!user) throw new Error('User not found');

      const idToken = await user.getIdTokenResult();

      this.loginCredentials = {
        uid: user.uid,
        email: user.email || '',
        token: idToken.token,
      };

      return this.loginCredentials;
    } catch (error) {
      console.error('Error get credentials:', error);

      return null;
    }
  }

  async changePassword(newPassword: string): Promise<void> {
    try {
      const user = await this.auth.currentUser;
      if (!user) throw new Error('User not found');

      await user.updatePassword(newPassword);
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.auth.signOut();
      this.loginCredentials = null;
    } catch (error) {
      console.error('Error logout user:', error);
      throw error;
    }
  }
}
