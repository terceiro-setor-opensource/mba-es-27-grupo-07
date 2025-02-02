import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { IAds, IAdsResponse } from '../models/ads.model';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  private functions = environment.functions.ads;

  constructor(
    private http: HttpClient,
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

  async create(ads: IAds) {
    const credentials = await this.authService.getCredentials();

    const result$ = this.http.post<IAdsResponse>(
      `${this.functions.createUrl}`,
      ads,
      {
        headers: {
          Authorization: `Bearer ${credentials?.token || ''}`,
        },
      }
    );

    return lastValueFrom(result$);
  }
}
