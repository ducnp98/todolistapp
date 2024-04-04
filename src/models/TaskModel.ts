export interface TaskModel {
  title: string;
  description: string;
  dueDate: Date;
  start: Date;
  end: Date;
  uuid: string[];
  color: string;
  fileUrls: string[];
}
