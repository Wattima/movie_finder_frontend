import Display from "./Display"
import SideBar from "./SideBar"
import { useEffect, useState } from "react"
import styled from "styled-components"

function MyLibrary({user, setViewItem, setCreationDelete}){
    const [myLibrary, setMyLibrary] = useState(null)

    useEffect(()=>{
        fetch(`http://localhost:9292/my_library/${user}`)
        .then(r => r.json())
        .then(data=> {
            console.log(data)
            setMyLibrary(data)
        })
    }, [])

    if (myLibrary === null){
        return <h1>Loading...</h1>
    }

    return(
        <Library>
            <h1>My Movie Library</h1>
            <SideBar />
            <Display user={user} setViewItem={setViewItem} creations={myLibrary} setCreationDelete={setCreationDelete}/>
        </Library>
    )
}

export default MyLibrary

const Library = styled.div`
text-align: center;
background-image: url("../assets/yellow.jpeg");
`
