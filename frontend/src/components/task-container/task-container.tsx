import { component$, useStore } from "@builder.io/qwik";
import { IoTimeOutline, IoCreateOutline, IoTrashOutline } from "@qwikest/icons/ionicons";
import { TaskMenu } from "../buttons/task-menu/task-menu";
import { Link } from "@builder.io/qwik-city";

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
  task: TaskData,
}

export const TaskContainer = component$(({task}: Props) => {
  const isHiddenStore = useStore({isHidden: false});
  return (
  <div class={{
    "before:absolute before:h-4 before:w-4 before:rounded-full before:-z-0 before:right-2 before:transition-all": true,
    'before:bg-zinc-900': isHiddenStore.isHidden,
    'before:scale-[60] before:animate-[pop_1s_ease-in-out_forwards;]': isHiddenStore.isHidden,
    "shadow border px-3 py-1 rounded transition-transform relative overflow-hidden h-32 flex flex-col": true,
    }}
    key={task.id}
  >
    <div class={{
      'flex justify-between items-center relative z-50': true,
      'text-white': isHiddenStore.isHidden
      }}
    >
      <h1 class='text-xl'>{task.title}</h1>
      <TaskMenu isHidden={isHiddenStore} />
    </div>
    {isHiddenStore.isHidden ? 
      <div class='text-white relative z-50 flex-grow'>
        <Link href={'/task/'+task.id} class='flex items-center justify-center text-2xl rounded hover:bg-zinc-800 h-full'><IoCreateOutline />edit</Link>
      </div> : 
      <ul>
        <li>{task.description}</li>
        <li class='flex items-center'>
          <IoTimeOutline />
          {task.duration.replace(':', 'h').replace(':', 'm')+ "s"}
        </li>
        <li>
          created at: 
          {new Date(task.created_at).toLocaleDateString()}
        </li>
      </ul>
    }
  </div>
  );
});