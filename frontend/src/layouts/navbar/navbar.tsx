import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { IoAppsOutline ,IoHomeOutline, IoMusicalNoteOutline, IoListOutline } from "@qwikest/icons/ionicons";

export const Navbar = component$(() => {
  const { url } = useLocation();
  const menu = [
    {
        text: "Home",
        href: "/",
        icon: <IoHomeOutline />
    },
    {
        text: "Music",
        href: "/music/",
        icon: <IoMusicalNoteOutline />
    },
    {
        text: "Task",
        href: "/task/",
        icon: <IoListOutline />
    }
  ]
  return (
    <nav class="h-screen shadow border w-60">
        <div class='px-3 py-1 border-b h-20 flex items-center justify-center gap-2'>
            <div class='text-2xl'>
                <IoAppsOutline /> 
            </div>
            Dashboard
        </div>
        <ul class='mt-3'>
            {menu ? menu.map((item) => (
                <li class='px-3 py-1'>
                    <Link
                    href={item.href}
                    class={{
                        'shadow bg-zinc-700/90': url.pathname === item.href,
                        'flex px-3 py-1 gap-2 hover:bg-zinc-900/80 bg-zinc-900 text-white items-center rounded border': true,
                    }}
                    >
                        <div class='text-2xl'>
                            {item.icon}
                        </div>
                        {item.text}
                    </Link>
                </li>
            ))
            : null}
        </ul>
    </nav>
  );
});
