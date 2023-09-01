import { component$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";

export const onPost: RequestHandler = async (requestEvent) => {
    const jsonBody = await requestEvent.request.json()
  
    const textBody = await requestEvent.request.text()
  
    const readableStream = requestEvent.request.body
}


export default component$(() => {

  return (
    <form class='flex flex-col' method="post">
        <input class='shadow border' type="text" />
        <input class='shadow border' type="password" name="" />
        <button class='shadow border rounded px-3 py-1' type="submit">submit</button>
    </form>
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
