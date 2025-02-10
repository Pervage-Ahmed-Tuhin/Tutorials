
import { ChangeEventHandler, useState } from 'react';
import Noteitem from './components/Noteitem';
import './index.css';


import axios from 'axios';

function App() {


  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");

  //more professional way of showing the above code 

  const [notes, setNotes] = useState<{
    id: string;
    title: string;
    description?: string;
  }[]>([]);

  const [values, setValues] = useState({
    title: "",
    description: ""
  });


  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {

    const { name, value } = target;
    setValues({
      ...values,
      [name]: value
    });
  }

  return (
    <div className='max-w-3xl mx-auto space-y-7'>
      <form onSubmit={async (evt) => {
        evt.preventDefault();
        const { data } = await axios.post('http://localhost:8000/note/create', {
          title: values.title,
          description: values.description
        })
        // console.log(data);
        setNotes([data.note, ...notes])
        setValues({
          title: "",
          description: ""
        })
      }} className="sapce-y-5  bg-white shadow-md rounded p-5 ">

        <h1 className='font-semibold text-2xl text-blue-400 text-center'>Note Application</h1>
        <div>
          {/* {title.trim() && title.length < 3 ? (<p className='text-red-500 text-sm'>Title must be atleast 3 characters</p>) : null} */}
          <input onChange={
            handleChange
          } type="text" className='w-full border-b-2 border-gray-700 outline-none' placeholder="Title" name='title' />
        </div>
        <div>
          <textarea onChange={handleChange} className='w-full border-b-2 border-gray-700 outline-none resize-none h-36' placeholder="Description" name='description' />
        </div>
        <div className='text-center'>
          <button className='bg-blue-500 text-white px-5 py-2 rounded mt-4'>
            Submit
          </button>
        </div>


      </form>
      {/* note items */}

      {notes.map((note) => {
        return <Noteitem key={note.title} title={note.title} />
      })}

      {/* <Noteitem title='This is my reviw pop1' />
      <Noteitem title='This is my reviw pop2' />
      <Noteitem title='This is my reviw pop3' />
      <Noteitem title='This is my reviw pop4' />
      <Noteitem title='This is my reviw pop5' /> */}

    </div>
  )
}

export default App
