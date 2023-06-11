export interface TodoType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodosType {
  results: [TodoType];
}
