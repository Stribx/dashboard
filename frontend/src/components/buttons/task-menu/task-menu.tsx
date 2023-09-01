import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { IoEllipsisVerticalOutline, IoCreateOutline, IoTrashOutline } from "@qwikest/icons/ionicons";

interface Props {
    isHidden: {isHidden: boolean};
}

export const TaskMenu = component$(({isHidden}: Props) => {
  return (
    <div class='relative'>
        <IoEllipsisVerticalOutline 
            class={{
                "hover:bg-zinc-900/90 text-2xl p-1 rounded text-white bg-zinc-900 transition-colors": !isHidden.isHidden,
                "hover:bg-zinc-100/90 text-2xl p-1 rounded text-black bg-zinc-100 transition-colors": isHidden.isHidden
            }}
            onClick$={() => isHidden.isHidden = !isHidden.isHidden} 
        />
    </div>
  );
});
