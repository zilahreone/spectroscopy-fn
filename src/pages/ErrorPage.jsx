import React from 'react'

export default function ErrorPage() {
  return (
    <div className="">
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-8xl font-bold text-gray-800">404</h1>
        <p className="text-4xl font-medium text-gray-800">Page Not Found</p>
        <a href="/" className="mt-4 text-xl text-blue-600 hover:underline">Go back home</a>
      </div>
    </div>
  )
}