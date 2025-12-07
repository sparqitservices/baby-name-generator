export default function Logo({ size = 'normal' }) {
  const sizes = {
    small: 'text-xl sm:text-2xl',
    normal: 'text-2xl sm:text-3xl',
    large: 'text-3xl sm:text-4xl'
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-0">
      {/* ICON */}
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl blur-md opacity-40"></div>

        <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl 
            p-2 sm:p-3 shadow-xl">
          <span className={`${sizes[size]} font-black text-white leading-none`}>
            BNG
          </span>
        </div>
      </div>

      {/* TEXT */}
      <div className="flex flex-col leading-tight">
        <span
          className={`${sizes[size]} font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}
        >
          BabyNames
        </span>

        <span className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider">
          AI-POWERED GENERATOR
        </span>
      </div>
    </div>
  );
}
