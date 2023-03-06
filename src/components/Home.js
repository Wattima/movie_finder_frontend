import Display from "./Display";
import SearchNav from "./SearchNav"
import SideBar from "./SideBar";
import {useState, useEffect} from 'react';

function Home({creations, user, setViewItem, path, setCreationDelete}){
    const [filterSearch, setFilterSearch] = useState([])

    useEffect(() =>{
        setFilterSearch([])
    }, [path])

    let displayCreations;
    if(filterSearch.length === 0){
        displayCreations = creations
    } else if (filterSearch.message !== undefined) {
        alert(filterSearch.message)
        // displayCreations = creations
        setFilterSearch([])
    } else{
        displayCreations = filterSearch
    }

    return(
        <>

            <SearchNav path={path} setFilterSearch={setFilterSearch}/>
            <SideBar user={user}/>
            <Display creations={displayCreations} user={user} path={path} setViewItem={setViewItem} setCreationDelete={setCreationDelete}/>
        </>
    )
}

export default Home;
