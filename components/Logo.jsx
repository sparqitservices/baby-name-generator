export default function Logo({ size = 'normal' }) {
  const sizes = {
    small: 'text-2xl',
    normal: 'text-3xl',
    large: 'text-4xl'
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-3 shadow-xl">
          <span className={`${sizes[size]} font-black text-white`}>BNG</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`${sizes[size]} font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
          BabyNames
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider">
          AI-POWERED GENERATOR
        </span>
      </div>
    </div>
  );
}