import styled from "styled-components"
import { Link } from "react-router-dom"
import {useState} from "react"

function TopHead({setUser, setUserDelete}) {
    const [dropdown, setDropdown] = useState(false)




    return(
        <>
        <Top>
             <div className="logo">
                <Link to="/">Movie Library</Link>
            </div>

            <div className="profile" onClick={()=> setDropdown(!dropdown)}>
                My Profile
            </div>
        </Top>
        {dropdown ? (
            <DropDown>
                <div onClick={() => {
                    setUser(null)
                    }}>Logout</div>
                <br/>
                <div onClick={() =>{
                setUserDelete(true)
                setDropdown(!dropdown)
                }}>Remove Account</div>
            </DropDown>
            ) : null}
        </>
    )
}

export default TopHead

const Top = styled.div`
/* margin: 0px 0px 10px 0px; */
position: sticky;
top: 0px;
background: hsl(120, 80%, 15%);
height: 50px;
display: flex;
color: white;
font-size: 20px;
/* box-shadow: 10px 10px 10px 10px gray; */

button{
    margin-top: 14px;
    margin-left: 10px;
    height: 20px;
}

a{
    text-decoration: none;
}

a:visited{
    color: white
}

.logo{
    padding-top: 10px;
    margin-left: 20px;
}
.profile{
    /* width: 200px; */
    margin-left: calc(95% - 260px);
    padding-top: 10px;
}
.profile:hover{
    cursor: pointer;
}
`
const DropDown = styled.div`
cursor: pointer;
margin-left: 90%;
background: hsl(50, 50%, 70%);
text-align: center;
padding: 10px;
z-index: 1;
position: fixed;
border: solid;
border-width: 0px 1px 1px 1px;

div{
    background: hsl(50, 50%, 70%);
    border: solid;
    border-width: 1px;
    border-radius: 5px;
    padding: 2px;
}

div:hover{
    background: hsl(60, 50%, 90%)
}

`
