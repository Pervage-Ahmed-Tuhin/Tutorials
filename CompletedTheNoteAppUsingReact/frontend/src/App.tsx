
import { ChangeEventHandler, useState, useEffect } from 'react';
import Noteitem from './components/Noteitem';
import './index.css';


import axios from 'axios';

type noteType = {
  id: string;
  title: string;
  description?: string;
}

function App() {


  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");

  //more professional way of showing the above code 

  const [notes, setNotes] = useState<noteType[]>([]);

  const [values, setValues] = useState({
    title: "",
    description: ""
  });

  const [selectedNoteId, setSelectedNoteId] = useState("");
  const [noteToView, setNoteToView] = useState<noteType>();


  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {

    const { name, value } = target;
    setValues({
      ...values,
      [name]: value
    });
  }

  useEffect(() => {

    const fetchNotes = async () => {
      //call the api to get notes
      const { data } = await axios('http://localhost:8000/note');
      setNotes(data.notes);


    };
    fetchNotes();

  }, []);

  return (
    <div className='max-w-3xl mx-auto space-y-7'>
      <form onSubmit={async (evt) => {
        evt.preventDefault();

        if (selectedNoteId) {

          const { data } = await axios.patch('http://localhost:8000/note/' + selectedNoteId, {
            title: values.title,
            description: values.description
          });
          console.log(data.note);
          const updatedNote = notes.map((note) => {
            if (note.id === selectedNoteId) {
              note.title = data.note.title;
              note.description = data.note.description;
            }
            return note;

          });
          setNotes([...updatedNote]);
          setValues({
            title: "",
            description: ""
          });
          return;
        }


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
          } type="text" value={values.title} className='w-full border-b-2 border-gray-700 outline-none' placeholder="Title" name='title' />
        </div>
        <div>
          <textarea value={values.description} onChange={handleChange} className='w-full border-b-2 border-gray-700 outline-none resize-none h-36' placeholder="Description" name='description' />
        </div>
        <div className='text-center'>
          <button className='bg-blue-500 text-white px-5 py-2 rounded mt-4'>
            Submit
          </button>
        </div>


      </form>
      {/* note items */}

      {notes.map((note) => {
        return <Noteitem


          onViewClick={() => {
            if (noteToView) {
              setNoteToView(undefined);
            } else {

              setNoteToView(note);
            }
          }}

          description={noteToView?.id == note.id ? noteToView?.description : ""}

          onEditClick={() => {

            setSelectedNoteId(note.id);
            setValues({
              title: note.title,
              description: note.description || ''
            });
          }}
          onDeleteClick={async () => {
            const result = confirm('Are you sure you want to delete this note?');

            if (result) {
              await axios.delete(
                'http://localhost:8000/note/' + note.id
              );

              const updateNotes = notes.filter(({ id }) => {
                if (id !== note.id) return note;
              })
              setNotes([...updateNotes]);
            }
          }}
          key={note.id} title={note.title} />
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
