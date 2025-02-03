import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class FileAdsService {
  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {}

  uploadFile(file: File): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (!file) {
        reject('No file selected');
        return;
      }

      const shortUuid = uuidv4().slice(0, 16);
      const credentials = await this.authService.getCredentials();
      const filePath = `uploads/${credentials?.uid}/${shortUuid}_${file.name}`;
      const task = this.storage.upload(filePath, file);

      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            try {
              resolve(filePath);
            } catch (error) {
              console.error('Error getting download URL:', error);
              reject(error);
            }
          })
        )
        .subscribe({
          error: (error) => {
            console.error('Upload error:', error);
            reject(error);
          },
        });
    });
  }

  async deleteFile(filePath: string): Promise<boolean> {
    try {
      const fileRef = this.storage.ref(filePath);
      await lastValueFrom(fileRef.delete());

      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  async updateFile(oldFilePath: string, newFile: File): Promise<string> {
    try {
      const newFilePath = await this.uploadFile(newFile);
      await this.deleteFile(oldFilePath);

      return newFilePath;
    } catch (error) {
      console.error('Error updating file:', error);
      throw error;
    }
  }
}
