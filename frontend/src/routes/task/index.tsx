import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { TaskColumn } from "~/components/task-column/task-column";

interface TaskData {
  id: number,
  user_id: number,
  title: string,
  description: string,
  duration: string,
  created_at: string,
  status: string,
}

interface TaskColumns {
  [name: string]: TaskData[];
}

export const useData = routeLoader$(async () => {
  const res = await fetch('http://127.0.0.1:3000/task', {
    headers: { Accept: 'application/json' },
  });
  return await res.json() as TaskData[];
});

export default component$(() => {

  const {value} = useData()
  const taskColumns: TaskColumns = {
    'on going': [],
    'completed': [],
    'deleted': []
  };

  value.forEach(task => {
    if (taskColumns[task.status]) {
      taskColumns[task.status].push(task);
    }
  });
  
  return (
    <section class='flex flex-wrap gap-4'>
      {Object.entries(taskColumns).map(([name, tasks]) => (
        <TaskColumn key={name} name={name} task={tasks} />
      ))}
    </section>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
