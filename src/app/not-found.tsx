export default async function Page() {
  return (
    <div className="h-screen text-center flex flex-col items-center justify-center bg-white text-black dark:bg-black dark:text-white">
      <div className="flex items-center">
        <h1 className="border-r border-gray-300 dark:border-gray-600 inline-block mr-5 pr-6 text-2xl font-medium align-top leading-[49px]">
          404
        </h1>
        <div className="inline-block">
          <h2 className="text-sm font-normal leading-[49px] m-0">
            This page could not be found.
          </h2>
        </div>
      </div>
    </div>
  );
}
