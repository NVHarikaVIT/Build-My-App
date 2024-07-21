import React, { useState } from 'react';
import {Card, Container, Form, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {auth, googleProvider, db} from '../config/firebase';
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {doc, setDoc, serverTimestamp, updateDoc} from 'firebase/firestore';

function Signup1() {
    let styles={fontSize: "20px", fontWeight: "450px"};

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bio, setBio] = useState('');
    const [gender, setGender] = useState(null);
    const [mobile, setMobile] = useState(1234567890);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [org, setOrg] = useState('');
    const [about, setAbout] = useState('');
    // using navigate function to redirect to other pages
    const navigate = useNavigate();
    // sign up with email and password
    const handleSignUp = async (e) => {
        e.preventDefault();
        // checking for password match or not
        const checkPassword = () => {
            let res = false;
            if (password === confirmPassword) {
                res = true;
            }
            else {
                res = false;
            }
            return res;
        }
        if (checkPassword) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log(user);
                await setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    name: name,
                    email: user.email,
                    bio: bio,
                    createdAt: serverTimestamp(),
                    mobile: mobile,
                    city: city,
                    state: state,
                    country: country,
                    organisation: org,
                    about: about,
                    updatedAt: serverTimestamp()
                });
                navigate('/Authentication/Login1');
            } catch (error) {
                alert(error);
            }
        } 
    }
   
    // sign up with Google
    const googleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/Authentication/Login','Page not found');
        } catch (err) {
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
                        <h2 className="text-center mb-4"> Sign Up </h2>
                        <Form>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                type='email' required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id="confirmPassword">
                                <Form.Label> Confirm Password </Form.Label>
                                <Form.Control type='password' required 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className='my-3' style={styles}>
              <Form.Label className='h4'> Name </Form.Label>
              <Form.Control type='text' placeholder='Name' required value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='my-3'>
              <label htmlFor="gender" required style={styles} className='h4'> Gender </label> <br />
              <input type="radio" name="gender" id="female" value={gender} onChange={(e) => setGender(e.target.value)}/> 
              <label htmlFor="gender" className='me-3'> Female </label>
              <input type="radio" name="gender" id="male" value={gender} onChange={(e) => setGender(e.target.value)}/>
              <label htmlFor="gender" className='me-3'> Male </label>
              <input type="radio" name="gender" id="none" value={gender} onChange={(e) => setGender(e.target.value)}/>
              <label htmlFor="gender" className='me-3'> Others </label> <br />
            </Form.Group>
            <Form.Group className='my-3' style={styles}>
              <Form.Label className='h4'> Headline </Form.Label>
              <Form.Control type='text' placeholder='Enter your position(s) or titles here' value={bio} onChange={(e) => setBio(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='my-3' style={styles}>
              <Form.Label className='h4'> Mobile </Form.Label>
              <Form.Control type='number' placeholder='Mobile' required value={mobile} onChange={(e) => setMobile(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='my-3' style={styles}>
              <Form.Label className='h4'> City </Form.Label>
              <Form.Control type='text' placeholder='City' required value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='my-3' style={styles}>
              <Form.Label className='h4'>State</Form.Label>
              <Form.Control type='text' placeholder='State' required value={state} onChange={(e) => setState(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='my-3' style={styles}>
              <Form.Label className='h4'> Country </Form.Label>
              <Form.Control type='country' placeholder='Country' required value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='my-3' style={styles}>
              <Form.Label className='h4'>Organization</Form.Label>
              <Form.Control type='text' placeholder='Current organisation' required value={org} onChange={(e) => setOrg(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
          <Form.Label className='h3 my-3' style={styles}> About </Form.Label>
          <div class="form-floating">
  <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
  <label htmlFor="floatingTextarea">About</label>
</div>
        </Form.Group>
                            <Button className="btn btn-success w-100 mt-2" onClick={handleSignUp} type='submit'>Sign Up </Button>
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
                            {/* Google sign up */}
                            <Form.Group>
                                <Button className="btn btn-danger w-100 h-40 px-10 mt-3" 
                                onClick={googleSignUp} type='submit'>
                                    <span style={{alignItems: "center !important", display: "flex", 
                                            justifyContent: "space-between !important"}}>
                                        <span style={{borderRight: "1px solid #0003",
                                            paddingRight: "15px", fontSize: "15px"}}>
                                            <i class="float-left fa-brands fa-google"/></span>
                                        <span style={{marginBottom: "5px" ,flexGrow: "1", justifyContent: "center"}}>
                                            Sign up with Google</span>
                                    </span>  
                                </Button>
                            </Form.Group>
                            {/* Github sign up */}
                            <Form.Group>
                                <Button className="btn btn-light w-100 h-40 px-10 mt-3" 
                                type='submit'>
                                    <span style={{alignItems: "center !important", display: "flex", 
                                            justifyContent: "space-between !important"}}>
                                        <span style={{borderRight: "1px solid #0003",
                                            paddingRight: "15px", fontSize: "15px"}}>
                                            <i class="float-left fa-brands fa-github"/></span>
                                        <span style={{marginBottom: "5px" ,flexGrow: "1", justifyContent: "center"}}>
                                            Sign up with Github</span>
                                    </span>
                                </Button>   
                            </Form.Group>
                            {/* Facebook sign up */}
                            <Form.Group>
                                <Button className="bg-darkblue w-100 h-40 px-10 mt-3" 
                                type='submit' style={{backgroundColor: "#3b5998 !important", border: "#3b5998"}}>
                                    <span style={{alignItems: "center !important", display: "flex", 
                                            justifyContent: "space-between !important"}}>
                                        <span style={{borderRight: "1px solid #0003",
                                            paddingRight: "15px", fontSize: "15px"}}>
                                            <i class="float-left fa-brands fa-facebook"/></span>
                                        <span style={{marginBottom: "5px" ,flexGrow: "1", justifyContent: "center"}}>
                                            Sign up with Facebook</span>
                                    </span>
                                </Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
                {/* Navigating to login page */}
                <div className="w-100 text-center mt-2">
                    <p>Already have an account? <Link className='fw-bold' to='/Authentication/Login1'> Login </Link> here </p>
                    <p> This indicates that you have agreed to our <span style={{color: "greenyellow"}}> Terms and Conditions </span></p>
                </div>
            </div>
        </Container>
    </>
  )
}

export default Signup1;

