import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)


  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){
      let Todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(Todos)
    }
  }, [])
  

  const savetoLS =()=>{
    localStorage.setItem("todos",JSON.stringify(Todos))
  }

  const ToggleFinished =(e)=>{
    setshowFinished(!showFinished)
  }

  const HandleEdit= (e,id) => {
    let t = Todos.filter(i=>i.id===id)
    setTodo(t[0].Todo);
    let newTodos = Todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    savetoLS()
  }

  const HandleDelete = (e,id) => {
    let newTodos = Todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    savetoLS()
  }

  const HandleAdd = () => {
    setTodos([...Todos, {id:uuidv4(), Todo, isCompleted: false }])
    setTodo("")
    savetoLS()
  }

  const HandleChange = (e) => {
    setTodo(e.target.value)
  }

  const HandleCheckbox = (e) => {
   let id = e.target.name
   let index = Todos.findIndex(item =>{
    return item.id === id;
  })
  let newTodos = [...Todos];
  newTodos[index].isCompleted = !newTodos[index].isCompleted;
  setTodos(newTodos)
  savetoLS()
  }
  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
      <h1 className='font-bold text-center text-2xl'>I-TASK | Manage Your Todos At One Place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className='flex'>
          <input onChange={HandleChange} value={Todo} className='bg-white w-full rounded-full px-5 py-1' type="text" />
          <button onClick={HandleAdd} disabled = {Todo.length<=3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-4 py-2 text-sm font-bold text-white cursor-pointer mx-2 rounded-full'>Save</button>
          </div>
        </div>
        <input className='my-4' onChange={ToggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my'></div>
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
          {Todos.length === 0 && <div className='m-5'>No Todos Available</div>}
          {Todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
              <div className='flex gap-5'>

              <input name={item.id} onChange={HandleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.Todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>HandleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 cursor-pointer'><FaEdit />
                </button>
                <button onClick={(e)=>{HandleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 cursor-pointer'><MdDelete />
                </button>
              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
