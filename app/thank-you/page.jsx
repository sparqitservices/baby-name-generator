export const metadata = {
  title: 'Thank you for subscribing | BNG Baby Names',
  description:
    'Thanks for subscribing to BNG Baby Names updates. We will occasionally send you new features and baby name tools.',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Thank you for subscribing 🎉
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
          We&apos;ll occasionally email you when we add new features, filters or
          tools to help you find the perfect baby name.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md transition"
          >
            Back to name generator
          </a>
          <a
            href="/domains"
            className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Check domains for your favourite name
          </a>
        </div>
      </div>
    </div>
  );
}
