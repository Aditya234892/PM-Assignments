import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <div className='w-[100vw] h-[100vh] bg-indigo-100'>
        <header className='w-full h-20 flex justify-center items-center bg-indigo-600'>
          <h1 className='text-xl text-white font-semibold'>Aditya Mishra's Weather App</h1>
        </header>
        <div className='bg-blue-200 w-full h-[calc(100%-5rem)] grid grid-cols-5'>
          <Dashboard />
        </div>
    </div>
  )
}

export default App
