import React, {useState, useEffect} from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function UserInfo() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                const fetchUserData = async () => {
                    try {
                      const userDocRef = doc(db, 'users', user.uid);
                      const userDocSnap = await getDoc(userDocRef);
                      if (userDocSnap.exists()) {
                        setUserData(userDocSnap.data());
                      } else {
                        console.log('No such document!');
                      }
                    } catch (error) {
                      console.error('Error fetching user data: ', error);
                    } finally {
                      setLoading(false);
                    }
                };
                fetchUserData();
             }
             else {
                setUser(null);
             }
            });
        }, [user]);
        
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (!userData) {
        return <div>User not found</div>;
      }

    return (
    <div>
      <section className="home-part" style={{position: "absolute", top: "0", left:"50px", width:"70vw", height: "600px"}}>
            <div className="backgroundFormat">
                <div>
                    <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ7K4nSmvLdJ-GQwIhLbbSZGrsrNXvLYpwxw&s"} alt={""}
                      style={{width:"100%", height: "250px"}}/>
                </div>
                <img src="data:image/jpeg;base64,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"
                 alt="Upload profile pic" 
                 style={{position: "relative", top: "-70px", left: "30px", width:"300px", height:"300px", borderRadius:"50%", border:"5px solid #ffffff"}}/>
            </div>
            <div style={{position: "absolute", top: "300px", left: "600px"}}> 
                <h3> {userData.organisation} </h3>
                <div className="additional" style={{position: "relative", top:"20px", gap: "30px"}}>
                    <button className="btn btn-light mb-2" style={{width: "200px"}}> <i className='fa fa-camera mx-3'></i> Upload photo </button> <br />
                    <button className="btn btn-primary mb-2" style={{width: "200px"}}> <i className='fa fa-user-plus mx-3'></i> Connect </button> <br/>
                    <button className="btn btn-light mb-2" style={{width: "200px"}}> <i className="fa fa-plus mx-3"></i>Follow</button> <br/>
                    <button className="btn btn-primary mb-2" style={{width: "200px"}}> <i className="fa fa-book mx-3"></i>Contact Info</button>
                </div>
            </div>
            <div style={{position: "absolute", top: "300px", left: "900px"}}>
            <button className="btn btn-light" >
                            <i className="fa fa-pen">
                            </i>
                          </button>
            </div>
            <div className="brief-details" style={{position: "relative", top:"-25px", left: "30px"}}>
                    <h2 style={{fontSize: "45px", color: "#1212fe", fontWeight: "600px"}}>{userData.name}</h2>
                    <h3 style={{fontSize: "20px"}}>{userData.bio} </h3>
                    <h4 style={{fontSize: "18px"}}>{userData.city}, {userData.state}, {userData.country} </h4>
            </div>
        </section>
        <aside className="position-absolute top-10 start-70 end-30" style={{position: "absolute", top: "15px", right: "90px"}}>
            <div className="card w-40 my-5">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-10">
                            <h4>Profile Language</h4>
                        </div>
                        <div className="col-md-4 d-flex flex-row">
                        <button className="btn btn-light">
                            <i className="fa fa-pen">
                            </i>
                          </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <p> English </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card w-40">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-9">
                            <h4> Profile URL </h4>
                        </div>
                        <div className="col-md-4 d-flex flex-row">
                        <button className="btn btn-light">
                            <i className="fa fa-pen">
                            </i>
                          </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9">
                            <p>https:/www.google.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
        <div className="my-3" style={{position: "relative", top:"700px", left: "50px", height: "auto", width: "70vw"}}>
            <div className="row">
            <div className="col-md-4">
                <h2>About Me</h2>
            </div>
            <div className="col-md-4 d-flex flex-row">
          <button className="btn btn-light me-3" data-bs-toggle="modal" data-bs-target="#addProjectModal">
            <i className='fa fa-plus fs-18'></i>
          </button>
          </div>
            <div className="w-75 my-3">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={userData.about}></textarea>
            </div>
            </div>
        </div>
    </div>
  )
}

export default UserInfo;





