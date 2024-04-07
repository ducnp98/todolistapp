import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface TaskModel {
  id?: string;
  title: string;
  description: string;
  dueDate?: string;
  start?: string;
  end?: string;
  uuid: string[];
  fileUrls: string[],
  color?: string;
  attachments: Attachment[];
  progress?: number;
  createdAt?: number;
  isUrgent: boolean;
  updatedAt?: number;
}

export interface Attachment {
  name: string;
  url: string;
  size: number;
  type?: string;
}

export interface SubTask {
  createdAt: number;
  description: string;
  id: string;
  isCompleted: boolean;
  taskId: string;
  title: string;
  updatedAt: number;
}