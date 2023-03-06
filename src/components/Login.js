import {useState} from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import cave from "./cave.png"

function Login({setUser}) {
    const [loginForm, setLoginForm] =useState({
        username: "",
        password: ""
    })
    const [createForm, setCreateForm] = useState({
        username: "",
        password: "",
        rpassword: "",
    })
    const navigate = useNavigate()

    function getUser(form){
        const user = {
            username: form.username,
            password: form.password
        }
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }


        fetch(`http://localhost:9292/current_users`, configObj)
        .then(r => r.json())
        .then(data =>{
            if (typeof data === "string" ){
                alert(data)
            } else{
                navigate("/")
                setUser(data.id)
            }
        })
    }

    function createUser(form){
        if (form.password === form.rpassword){
            const newUser = {
                username: form.username,
                password: form.password
            }
            const configObj = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(newUser)
            }
            fetch("http://localhost:9292/new_user", configObj)
            .then(r => r.json())
            .then(data =>{
                if (typeof data === "string"){
                    alert(data)
                }else{
                    navigate("/")
                    setUser(data.id)
                }
            })
        } else{
            alert("Invalid entry. Please make sure your password entries match.")
        }
    }

    function onLogChange(e){
        const name = e.target.name
        const value = e.target.value

        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    function onCreateChange(e){
        const name = e.target.name
        const value = e.target.value

        setCreateForm({
            ...createForm,
            [name]: value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        setLoginForm({username: "",
        password: ""})
        setCreateForm({username: "",
        password: "",
        rpassword: ""})
    }
    return(
        <LogBox>
            <h1>Welcome to Movie Library</h1>
            <h2>Login</h2>
            <form onChange={onLogChange} onSubmit={(e) =>{
                handleSubmit(e)
                getUser(loginForm)
            }}>
                <input type="text" name="username" placeholder="username" value={loginForm.username}/>
                <br/>
                <input type="password" name="password" placeholder="password" value={loginForm.password}/>
                <br/>
                <button type="submit">Login</button>
            </form>
            <h3>Or</h3>
            <h2>Create Account</h2>
            <form onChange={onCreateChange} onSubmit={(e) =>{
                handleSubmit(e)
                createUser(createForm)
            }}>
                <input type="text" name="username" placeholder="username" value={createForm.username}/>
                <br />
                <input type="password" name="password" placeholder="new password" value={createForm.password}/>
                <br />
                <input type="password" name="rpassword" placeholder="repeat password" value={createForm.rpassword}/>
                <br />
                <button type = "submit">Create Account</button>
            </form>
        </LogBox>
    )
}

export default Login;

const LogBox = styled.div `
    margin: 50px 25% 0px 25%;
    padding: 10px;
    width: 50%;
    height: 50%;
    // background: hsl(0, 0%, 80%);
    background-image: url(${cave});
    text-align: center;
    border-radius: 5px;

    input{
        margin: 5px 0px 5px 0px;
    }
`
