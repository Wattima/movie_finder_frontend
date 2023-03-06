import styled from "styled-components"

function UserDeletePopup({user, setUser, setUserDelete}){

    function removeAccount(id){
        fetch(`http://localhost:9292/users/${id}`, {method: "DELETE"})
        .then(r => r.json())
        .then(data => {
            setUser(null)
            setUserDelete(false)
            alert(data.message)
        })
    }

    return(
        <PopupDiv>
            <div>
                <h2>Are you sure you want to delete your account?</h2>
                <h4>Deleting your account will also delete all your movies.</h4>
                <button onClick={() => removeAccount(user)}>Yes</button>
                <button onClick={() => setUserDelete(false)}>No</button>
            </div>
        </PopupDiv>
    )
}

export default UserDeletePopup;

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
