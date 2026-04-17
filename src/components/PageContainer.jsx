export default function PageContainer({ title, children }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">

      <div className="w-full max-w-5xl">

        {title && (
          <h1 className="text-2xl font-bold mb-6">
            {title}
          </h1>
        )}

        <div className="bg-white rounded-2xl shadow p-6">
          {children}
        </div>

      </div>

    </div>
  )
}