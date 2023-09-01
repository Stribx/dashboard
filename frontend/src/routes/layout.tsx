import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import { Header } from "~/layouts/header/header";
import { Navbar } from "~/layouts/navbar/navbar";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <>
      <Navbar />
      <main class='grow flex flex-col'>
        <Header />
        <Slot />
      </main>
    </>
  )
});
