class TaskCreatorDto {
  id: string;
  username: string;
}

export default class {
  id: string;
  title: string;
  description: string;
  creator: TaskCreatorDto;
  created_at: Date;
  updated_at: Date;
}
