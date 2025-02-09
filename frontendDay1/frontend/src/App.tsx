
import Noteitem from './components/Noteitem';
import './index.css';

function App() {


  return (
    <div className='max-w-3xl mx-auto space-y-7'>
      <div className="sapce-y-5  bg-white shadow-md rounded p-5 ">

        <h1 className='font-semibold text-2xl text-blue-400 text-center'>Note Application</h1>
        <div>
          <input type="text" className='w-full border-b-2 border-gray-700 outline-none' placeholder="Title" />
        </div>
        <div>
          <textarea className='w-full border-b-2 border-gray-700 outline-none resize-none h-36' placeholder="Description" />
        </div>
        <div className='text-center'>
          <button className='bg-blue-500 text-white px-5 py-2 rounded mt-4'>
            Submit
          </button>
        </div>


      </div>
      {/* note items */}

      <Noteitem title='This is my reviw pop1'/>
      <Noteitem title='This is my reviw pop2'/>
      <Noteitem title='This is my reviw pop3'/>
      <Noteitem title='This is my reviw pop4'/>
      <Noteitem title='This is my reviw pop5'/>
     
    </div>
  )
}

export default App
