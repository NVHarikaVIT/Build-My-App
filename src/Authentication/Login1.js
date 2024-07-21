import React, {useState} from 'react';
import {Card, Container, Button, Form} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {auth, googleProvider} from '../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
function Login1() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // navigate to other pages
    const navigate = useNavigate();
    // sign in with credentials
    const handleSignIn = async(e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/Homepage/Home');
        } catch (err){
            alert(err);
        }
    }
    // sign in with google
    const handleGoogleSignIn = async(e) =>{
        e.preventDefault();
        try{
            const res = await signInWithPopup(auth, googleProvider);
            console.log(res.user);
        } catch (err){
            alert(err);
        }
    }
    return (
    <>
        <Container className='d-flex align-items-center justify-content-center mt-5'
            style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4"> Sign in </h2>
                        <Form>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' required value={email} 
                                onChange={(e) => setEmail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' required
                                value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                            </Form.Group>
                            <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                                <input type="checkbox" id="rememberMe" checked=""/>
                                <label for="rememberMe" style={{fontSize: "14px", lineHSeight: "normal"}}>Remember me</label>
                            </div>
                            <p class="forgotPass fs-14 fw-bold" style={{color: "yellow", textDecoration: "none"}}>Forgot password?</p>
                            <Button className="btn btn-success w-100 mt-2" onClick={handleSignIn} type='submit'>Sign In </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="divider-part my-2"
                    style={{textAlign: "center"}}>
                    <p className='fs-15'> Or via </p>
                </div>
                <Card>
                    <Card.Body>
                        <Form>
                            {/* Google sign in */}
                            <Form.Group>
                                <Button className="btn btn-danger w-100 h-40 px-10 mt-3" type='submit' onClick={handleGoogleSignIn}>
                                    <span style={{alignItems: "center !important", display: "flex", 
                                            justifyContent: "space-between !important"}}>
                                        <span style={{borderRight: "1px solid #0003",
                                            paddingRight: "15px", fontSize: "15px"}}>
                                            <i class="float-left fa-brands fa-google"/></span>
                                        <span style={{marginBottom: "5px" ,flexGrow: "1", justifyContent: "center"}}>
                                            Sign in with Google</span>
                                    </span>  
                                </Button>
                            </Form.Group>
                            {/* Github sign in */}
                            <Form.Group>
                                <Button className="btn btn-light w-100 h-40 px-10 mt-3" type='submit'>
                                    <span style={{alignItems: "center !important", display: "flex", 
                                            justifyContent: "space-between !important"}}>
                                        <span style={{borderRight: "1px solid #0003",
                                            paddingRight: "15px", fontSize: "15px"}}>
                                            <i class="float-left fa-brands fa-github"/></span>
                                        <span style={{marginBottom: "5px" ,flexGrow: "1", justifyContent: "center"}}>
                                            Sign in with Github</span>
                                    </span>
                                </Button>   
                            </Form.Group>
                            {/* Facebook sign in */}
                            <Form.Group>
                                <Button className="bg-darkblue w-100 h-40 px-10 mt-3" type='submit' 
                                style={{backgroundColor: "#3b5998 !important", border: "#3b5998"}}>
                                    <span style={{alignItems: "center !important", display: "flex", 
                                            justifyContent: "space-between !important"}}>
                                        <span style={{borderRight: "1px solid #0003",
                                            paddingRight: "15px", fontSize: "15px"}}>
                                            <i class="float-left fa-brands fa-facebook"/></span>
                                        <span style={{marginBottom: "5px" ,flexGrow: "1", justifyContent: "center"}}>
                                            Sign in with Facebook</span>
                                    </span>
                                </Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <p>Not created an account? <Link className='fw-bold' to='/Authentication/Signup1'> Sign Up </Link> now </p>
                    <p> This indicates that you have agreed to our <span style={{color: "yellow"}}> Terms and Conditions </span></p>
                </div>
            </div>
        </Container>
    </>
  )
}

export default Login1;
