import { component$ } from "@builder.io/qwik";
import { IoEllipsisVerticalOutline, IoTimeOutline } from "@qwikest/icons/ionicons";
import { TaskContainer } from "../task-container/task-container";

interface TaskData {
  id: number,
  user_id: number,
  title: string,
  description: string,
  duration: string,
  created_at: string,
  status: string,
}

interface Props{
  name: string,
  task: TaskData[],
}

export const TaskColumn = component$(({name, task}: Props) => {
  return (
    <div class='px-3 py-1 flex-1'>
        <h1 class='text-center text-2xl px-3 py-1 bg-zinc-900 text-white'>{name}</h1>
        {task.map(task => (
          <TaskContainer task={task} />
        ))}
    </div>
  );
});
