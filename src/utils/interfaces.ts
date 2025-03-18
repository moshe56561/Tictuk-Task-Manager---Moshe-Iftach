export interface SubTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface Task {
  id: string;
  category: string;
  title: string;
  icon: string;
  iconBg: string;
  progress: number;
  subTasks: SubTask[];
}

export interface validationFields {
  categoryAndIconExist: boolean;
  titleExist: boolean;
  missingSubTaskTitles: number[];
}
