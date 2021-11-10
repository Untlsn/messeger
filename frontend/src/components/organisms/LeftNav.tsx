import NavCircleButton from '~/components/atoms/NavCircleButton';
import { createSignal } from 'solid-js';
import { BsPersonFill, BsChatTextFill } from 'solid-icons/bs';
import { AiOutlinePlus } from 'solid-icons/ai';

const LeftNav = () => {
  const [selected, setSelected] = createSignal(-1);

  return (
    <div class='fixed top-0 left-0 w-16 h-screen bg-gray-900 flex flex-col py-4 gap-2'>
      <NavCircleButton onClick={() => setSelected(0)} selected={selected() == 0}>
        <BsPersonFill />
      </NavCircleButton>
      <hr class='border-gray-600 border-1 w-8 mx-4'/>
      <NavCircleButton onClick={() => setSelected(1)} selected={selected() == 1} class='text-2xl'>
        <AiOutlinePlus />
      </NavCircleButton>
      <hr class='border-gray-600 border-1 w-8 mx-4'/>
      <NavCircleButton>
        <BsChatTextFill />
      </NavCircleButton>
    </div>
  );
};

export default LeftNav;