import { component$ } from "@builder.io/qwik"
import { IoPersonCircleOutline } from "@qwikest/icons/ionicons";

export const Header = component$(() => {
    return(
        <header class='border-b w-full px-3 py-1 flex justify-end'>
            <IoPersonCircleOutline class='text-2xl' />
        </header>
    )
});