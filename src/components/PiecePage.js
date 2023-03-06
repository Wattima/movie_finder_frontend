import styled from "styled-components"
import {useState, useEffect} from "react"

function PiecePage({user, viewItem}) {
    const [isLiked, setIsLiked] = useState({
        bool: false,
        id: null,
    })
    const [isFlagged, setIsFlagged] = useState({
        bool: false,
        id: null,
    })
    const [inLib, setInLib] = useState({
        bool: false,
        id: null,
    })
    const content_array = viewItem.content.split("/n")
    let count = 0;
    const display_array = content_array.map(p => {
        console.log(p)
        count +=1
        if(p.includes("H:")){
            const header = p.replace("H:", "")
            return <h2 key={count}>{header}</h2>
        } else{
            return <p key={count}>{p}</p>
        }
    })
    const readTime = Math.ceil(viewItem.length / 1000);

    useEffect(() => {
        fetch(`http://localhost:9292/users/${user}`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            for (const like of data.likes){
                if(like.creation_id === viewItem.id){
                    setIsLiked({
                        bool: true,
                        id: like.id
                    });
                    break;
                }
            }
            for(const flag of data.flags){
                if(flag.creation_id === viewItem.id){
                    setIsFlagged({
                        bool: true,
                        id: flag.id
                    });
                    break;
                }
            }
            for(const lib_item of data.lib_items){
                if(lib_item.creation_id === viewItem.id){
                    setInLib({
                        bool: true,
                        id: lib_item.id
                    });
                    break;
                }
            }
        })
    }, [])

    function createFlag(user_id, creation_id){
        const newFlag = {
            user_id: user_id,
            creation_id: creation_id,
            value: "hate speech"
        }
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFlag)
        }
        fetch("http://localhost:9292/flags", configObj)
        .then(r => r.json())
        .then(data =>{
            setIsFlagged({
                bool: true,
                id: data.id
            })
        })
    }

    function createLike(user_id, creation_id){
        const newLike = {
            user_id: user_id,
            creation_id: creation_id
        }
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLike)
        }
        fetch("http://localhost:9292/likes", configObj)
        .then(r => r.json())
        .then(data =>{
            setIsLiked({
                bool: true,
                id: data.id
            })
        })
    }

    function createLibItem(user_id, creation_id){
        const newLibItem = {
            user_id: user_id,
            creation_id: creation_id
        }
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLibItem)
        }
        fetch("http://localhost:9292/lib_items", configObj)
        .then(r => r.json())
        .then(data =>{
            setInLib({
                bool: true,
                id: data.id
            })
        })
    }

    function newDonation(user_id, creation_id){
        const donation = {
            user_id: user_id,
            creation_id: creation_id
        }
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(donation)
        }
        fetch("http://localhost:9292/donations", configObj)
        .then(r => r.json())
        .then(data => alert(data.message))
    }

    function removeLike(id) {
        fetch(`http://localhost:9292/likes/${id}`, {method: "DELETE"})
        .then(r => r.json())
        .then(data =>{
            console.log(data.message)
            setIsLiked({
                bool: false,
                id: null
            })

        })
    }

    function removeLibItem(id){
        fetch(`http://localhost:9292/lib_items/${id}`, {method: "DELETE"})
        .then(r => r.json())
        .then(data =>{
            console.log(data.message)
            setInLib({
                bool: false,
                id: null
            })

        })
    }

    function removeFlag(id){
        fetch(`http://localhost:9292/flags/${id}`, {method: "DELETE"})
        .then(r => r.json())
        .then(data =>{
            console.log(data.message)
            setIsFlagged({
                bool: false,
                id: null
            })

        })
    }





    return (
        <>
        <PositiveInput>
            {isFlagged.bool ? <button className="flag" onClick={() => removeFlag(isFlagged.id)}>Remove Flag</button>: <button className="flag" onClick={() => createFlag(user, viewItem.id)}>Flag</button>}
            {isLiked.bool ?<button onClick={() => removeLike(isLiked.id)}>Unlike</button>:<button onClick={() => createLike(user, viewItem.id)}>Like</button>}
            {inLib.bool ? <button onClick={() =>removeLibItem(inLib.id)}>Remove from Library</button>:<button onClick={()=> createLibItem(user, viewItem.id)}>Add to Library</button>}
            <button onClick={() => newDonation(user, viewItem.id)}>Donate</button>
        </PositiveInput>
        <Reader>
            <h1>{viewItem.title}</h1>
            <h3>By: {viewItem.user.username}</h3>
            <h4>A {readTime} minute read.</h4>
            <div>{display_array}</div>
        </Reader>
        </>
    )
}

export default PiecePage

const Reader = styled.div`
h1{
    text-align: center;
    font-size: 40px;
}
h2{
    font-size: 35px;
}
h3{
    text-align: center;
}
h4{
    text-align: center;
}

margin: 0px 20% 0px 20%;

p{
    margin: 30px 0% 30px 0%;
    font-size: 25px;
    line-height: 1.5;
}


`
const PositiveInput = styled.div`
margin-top: 20px;
text-align: center;

button{
    margin: 0px 10px 0px 10px;
}
.flag{
    margin-right: 200px;
}
`
