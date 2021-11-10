interface NavCircleButtonProps {
  selected?: boolean
  children: any
  class?: string,
  onClick?(): void
}

const NavCircleButton = (props: NavCircleButtonProps) => {
  return (
    <p class='relative'>
      <span class={`absolute top-0 left-0 h-full w-1.5 bg-white opacity-20 rounded-r-full transform transition-transform duration-300 ${
        props.selected ? 'translate-x-0' : '-translate-x-full'
      }`}/>
      <button
        class={`bg-gray-600 h-10 w-10 flex items-center justify-center transition-all duration-300 relative left-3 text-xl text-blue-400
      ${props.selected ? 'rounded-xl' : 'rounded-6xl'} 
      ${props.class} hover:(rounded-xl)`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </p>
  );
};

export default NavCircleButton;