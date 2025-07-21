export default function Loading() {
  return (
    <main className="min-h-screen bg-transparent">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="animate-pulse bg-gray-300 h-12 w-64 mx-auto rounded mb-4"></div>
          <div className="animate-pulse bg-gray-300 h-6 w-96 mx-auto rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
              <div className="bg-gray-300 h-6 rounded mb-2"></div>
              <div className="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-300 h-4 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}