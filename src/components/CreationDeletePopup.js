import styled from "styled-components"
import {useNavigate} from "react-router-dom"

function CreationDeletePopup({creationDelete, setCreationDelete}){
    function deleteCreation(id){
        fetch(`http://localhost:9292/creations/${id}`, {method: "DELETE"})
        .then(r => r.json())
        .then(data => {
            setCreationDelete({
                id: 0,
                title: ""
            })
            alert(data.message)
        })
    }

    return(
        <PopupDiv>
            <div>
                <h2>Are you sure you want to delete {creationDelete.title}?</h2>
                <h4>Deleting {creationDelete.title} will remove it permanently.</h4>
                <button onClick={() => deleteCreation(creationDelete.id)}>Yes</button>
                <button onClick={() => setCreationDelete({id: 0,title: ""})}>No</button>
            </div>
        </PopupDiv>
    )
}

export default CreationDeletePopup;

const PopupDiv = styled.div`
position: fixed;
width: 100%;
height: 100vh;
background: #00000050;
overflow: hidden;
z-index: 2;

button{
    margin: 10px 60px 10px 60px;
    width: 80px;
    font-size: 20px;
}

div{
    padding: 20px;
    background: white;
    min-height: 200px;
    margin: 200px 25% 25% 25%;
    border-radius: 10px;
    z-index: 2;
    text-align: center;
    }
`
