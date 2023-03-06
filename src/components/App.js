import { useState, useEffect } from 'react'
import {Routes, Route} from "react-router-dom";
import Home from "./Home";
import PiecePage from "./PiecePage";
import Create from "./Create";
import Edit from "./Edit";
import Login from './Login';
import UserDeletePopup from './UserDeletePopup';
import "../App.css"
import TopHead from './TopHead';
import MyCreations from './MyCreations';
import MyLibrary from './MyLibrary';
import Liked from './Liked'
import CreationDeletePopup from './CreationDeletePopup';

function App() {
  const [allCreations, setAllCreations] = useState([])
  const [allFiction, setAllFiction] = useState([])
  const [allPoetry, setAllPoetry] = useState([])
  const [allNonFiction, setAllNonFiction] = useState([])
  const [allJournalism, setAllJournalism] = useState([])
  const [userDelete, setUserDelete] = useState(false)
  const [creationDelete, setCreationDelete] = useState({
    id: 0,
    title: ""})
  const [user, setUser] = useState(null)
  const [viewItem, setViewItem] = useState(null)


  useEffect(()=>{
    fetch("http://localhost:9292/")
    .then(r => r.json())
    .then(data => {
        setAllCreations(data)
    })
  }, [])

  useEffect(()=>{
    fetch("http://localhost:9292/fiction")
    .then(r => r.json())
    .then(data => {
        setAllFiction([...data])
        console.log("fiction")
    })
  }, [])

  useEffect(()=>{
    fetch("http://localhost:9292/poetry")
    .then(r => r.json())
    .then(data => {
        setAllPoetry([...data])
    })
  }, [])

  useEffect(()=>{
    fetch("http://localhost:9292/nonfiction")
    .then(r => r.json())
    .then(data => {
        setAllNonFiction([...data])
    })
  }, [])

  useEffect(()=>{
    fetch("http://localhost:9292/journalism")
    .then(r => r.json())
    .then(data => {
        setAllJournalism([...data])
    })
  }, [])

  if (user === null) {
    return (
      <Login setUser={setUser}/>
    )
  }
  return (
    <div className="App">
      <TopHead user={user} setUser={setUser} setUserDelete={setUserDelete}/>
      {userDelete ? <UserDeletePopup user={user} setUser={setUser} setUserDelete={setUserDelete}/> : null}
      {creationDelete.id === 0 ? null : <CreationDeletePopup creationDelete={creationDelete} setCreationDelete={setCreationDelete}/>}
      <Routes>
        <Route exact path="/" element={
        <Home creations={allCreations} user={user} path=""  setViewItem={setViewItem} setCreationDelete={setCreationDelete}/>
        }/>
        <Route path="/fiction" element={
          <Home creations={allFiction} user={user} path="fiction"  setViewItem={setViewItem}setCreationDelete={setCreationDelete}/>
        }/>
        <Route path="/poetry" element={
          <Home creations={allPoetry} user={user} path="poetry"  setViewItem={setViewItem}setCreationDelete={setCreationDelete}/>
        }/>
        <Route path="/nonfiction" element={
          <Home creations={allNonFiction} user={user} path="nonfiction"  setViewItem={setViewItem}setCreationDelete={setCreationDelete}/>
        }/>
        <Route path="/journalism" element={
          <Home creations={allJournalism} user={user} path="journalism" setViewItem={setViewItem}setCreationDelete={setCreationDelete}/>
        }/>
        <Route exact path="/:id" element={<PiecePage user={user} viewItem={viewItem}/>}/>
        <Route exact path="/create" element={<Create user={user}/>}/>
        <Route path="/edit" element={<Edit user={user} viewItem={viewItem}/>}/>
        <Route path="/my_creations" element={<MyCreations user={user} setViewItem={setViewItem} setCreationDelete={setCreationDelete} creationDelete={creationDelete} path="/my_creations"/>}/>
        <Route path="/my_library" element={<MyLibrary user={user} setViewItem={setViewItem} setCreationDelete={setCreationDelete}/>}/>
        <Route path="/liked" element={<Liked user={user} setViewItem={setViewItem}setCreationDelete={setCreationDelete}/>}/>
      </Routes>
    </div>
  );
}

export default App;

