const NeonPurpleButton = ({ href, children }) => {
    return (
      <a 
        href={href} 
        className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
      >
        <span 
          className="w-full h-full bg-gradient-to-br from-[#7c4dff] via-[#c084fc] to-[#8b5cf6] group-hover:from-[#8b5cf6] group-hover:via-[#c084fc] group-hover:to-[#7c4dff] absolute"
        ></span>
        <span 
          className="relative px-6 py-3 transition-all ease-out bg-zinc-950  rounded-md group-hover:bg-opacity-0 duration-400"
        >
          <span className="relative text-white">{children}</span>
        </span>
      </a>
    );
  };
  
  export default NeonPurpleButton;
  