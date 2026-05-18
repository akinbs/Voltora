import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  type UploadTaskSnapshot,
} from 'firebase/storage'
import { storage } from '../../lib/firebase'
import type { FirebaseServiceResponse, FirebaseUploadResult } from '../../types/firebase'

export const storageService = {
  async uploadFile(
    path: string,
    file: File,
    onProgress?: (pct: number) => void
  ): Promise<FirebaseServiceResponse<FirebaseUploadResult>> {
    try {
      const storageRef = ref(storage, path)
      const task = uploadBytesResumable(storageRef, file)

      return new Promise((resolve) => {
        task.on(
          'state_changed',
          (snap: UploadTaskSnapshot) => {
            onProgress?.(Math.round((snap.bytesTransferred / snap.totalBytes) * 100))
          },
          (err) => {
            resolve({ data: null, error: err.message, success: false })
          },
          async () => {
            const downloadURL = await getDownloadURL(task.snapshot.ref)
            resolve({
              data: {
                downloadURL,
                storagePath: path,
                fileName:    file.name,
                contentType: file.type,
                size:        file.size,
              },
              error: null,
              success: true,
            })
          }
        )
      })
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Upload failed', success: false }
    }
  },

  async deleteFile(path: string): Promise<FirebaseServiceResponse<null>> {
    try {
      await deleteObject(ref(storage, path))
      return { data: null, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Delete failed', success: false }
    }
  },

  buildProductImagePath(productId: string, fileName: string): string {
    return `products/${productId}/${fileName}`
  },

  buildUserAvatarPath(userId: string, fileName: string): string {
    return `users/${userId}/avatar/${fileName}`
  },
}
