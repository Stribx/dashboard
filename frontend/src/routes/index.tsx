import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {

  return (
    <section class='p-1'>
      <div>
        <h1 class='text-xl'>New files</h1>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Dashboard",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
