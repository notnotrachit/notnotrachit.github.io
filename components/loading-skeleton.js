export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-center py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-36 lg:w-48 h-36 lg:h-48 bg-gray-300 rounded-full"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-300 rounded w-64"></div>
            <div className="h-4 bg-gray-300 rounded w-48"></div>
            <div className="h-6 bg-gray-300 rounded w-56"></div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="w-full lg:w-[48rem] p-5 space-y-4">
          <div className="h-6 bg-gray-300 rounded w-32 mx-auto"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}