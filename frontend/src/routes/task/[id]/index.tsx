import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead, Form, routeAction$ } from "@builder.io/qwik-city";

interface TaskData {
  id: number,
  user_id: number,
  title: string,
  description: string,
  duration: string,
  created_at: string,
  status: string,
}

export const useData = routeLoader$(async (requestEvent) => {
    const res = await fetch(`http://127.0.0.1:3000/task/${requestEvent.params.id}`, {
        headers: { Accept: 'application/json' },
    });
    return await res.json() as TaskData;
});

export const useEditTask = routeAction$(async (data, requestEvent) => {
  const res = await fetch(`http://127.0.0.1:3000/task/${requestEvent.params.id}`, {
    headers: { Accept: 'application/json' },
  });
  const json = await res.json() as TaskData;
  const task: TaskData = {
    ...json,
    description: String(data.description),
    duration: String(data.duration),
    status: String(data.status)
  }
  const post = await fetch(`http://127.0.0.1:3000/task/${requestEvent.params.id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task),
  });
  return await post.json()
});

export default component$(() => {
  const {value} = useData()
  const action = useEditTask()
  
  return (
    <section class='grow px-3 py-1'>
      <header class='flex justify-between'>
          <h1 class='text-xl'>{value.title}</h1>
          <h2 class='text-xl'>created at: {new Date(value.created_at).toLocaleDateString()}</h2>
      </header>
      <Form action={action} class='flex flex-col gap-4 items-center'>
        <select name="status" class='w-full border focus:outline-none focus:ring-2 focus:ring-offset-2'>
          <option value="on going">on going</option>
          <option value="completed">completed</option>
          <option value="deleted">deleted</option>
        </select>
        <textarea name="description" class='border shadow px-3 py-1 resize-none w-full h-44' value={value.description} />
        <input type="time" name="duration" step="2" value={value.duration} />
        <button type="submit" class='px-3 py-1 bg-zinc-900 text-white w-fit ring ring-zinc-900 hover:ring-offset-4 transition-all'>Save</button>
      </Form>
      {action.value?.success && (
        <div class='absolute bottom-1 right-1 px-3 py-1 bg-zinc-900 rounded text-white flex items-center'>
          <p>Task modify successfully</p>
          <button class='h-8 w-8'>  
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/>
            </svg>
          </button>
        </div>
      )}
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
