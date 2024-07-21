import React, {useState, useEffect} from 'react';
import { addSkill, getSkills, updateSkill, deleteSkill } from '../../services/firestore';
import { doc, getDoc, collection, getDocs} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function ViewSkills() {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
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
                    // fetching info from subcollection
                    const skillDocsRef = collection(userDocRef, "skills");
                    const skillsSnapshot = await getDocs(skillDocsRef);
                    const skillsList = skillsSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setSkills(skillsList);
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

  if (!skills) {
    return <div>User not found</div>;
  }

  const fetchSkills = async () => {
    const userSkills = await getSkills(user.uid);
    setSkills(userSkills);
  };
  const handleAddSkill = async () => {
    if (newSkill.trim() === '') return;
    await addSkill(user.uid, { name: newSkill });
    setNewSkill('');
    fetchSkills();
  };
  const handleUpdateSkill = async (skillId, updatedName) => {
    await updateSkill(user.uid, skillId, { name: updatedName });
    fetchSkills();
  };

  const handleDeleteSkill = async (skillId) => {
    await deleteSkill(user.uid, skillId);
    fetchSkills();
  };
  return (
    <div className=  "my-3" style={{position: "relative", top:"700px", left: "50px", height: "auto", width: "70vw"}}>
      <div className="heading-part">
          <div className="row">
            {/* Heading */}
            <div className="col-md-4">
              <h2> Skills </h2>
            </div>
            {/* Buttons for CRUD */}
            <div className="col-md-4 d-flex flex-row">
              <button className="btn btn-light me-3" data-bs-toggle="modal" data-bs-target="#addSkillModal">
                <i className='fa fa-plus fs-18'></i>
              </button>
              <div class="modal fade" id="addSkillModal" tabindex="-1" aria-labelledby="addSkillModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{minWidth: "400px", height: "auto", margin: "auto"}}>
            <div class="modal-content">
            <div className="title-bar" style={{display: "flex", alignItems: "center", justifyContent:"center", padding: "0 20px", 
                    position: "relative", top: "10px", fontSize: "25px"}}>
                    <h1 class="modal-title fs-5" id="addSkillLabel"> Add Skill </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{position: "absolute", right: "0"}}></button>
                </div>
              <div className="modal-body d-flex flex-column">
                <div class="form-floating my-2">
                    <input type="text" className="form-control" placeholder="Skill" id="floatingInput" value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}required></input>
                    <label htmlFor="floatingInput">Skill</label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleAddSkill}>
                  Add skill
                </button>
              </div>
            </div>
        </div>
              </div>
            </div>
          </div>
          <div className="row my-3">
            {skills ? (
              <>
              {skills.map((skill) => {
              return <div className="col-md-3 mb-2" key={skill.id}>
                <div className="card w-40 h-40">
                  <div className="card-body">
                    <p className="fs-24 fw-bold"> {skill.name} </p>
                    <div className="d-flex flex-row">
              <button className="btn btn-light" onClick={() => handleDeleteSkill(skill.id)}>
                <i className="fa fa-trash"></i>
              </button>
              <button className="btn btn-light" data-bs-toggle="modal" data-bs-target="#editSkillModal">
                <i className="fa fa-pen">
                </i>
              </button>
             </div>
                  </div>
                </div>
              </div>
            })}
              </>
             ) : (
              <>
              <p className='align-center fs-18'> No skill added yet</p>
              </>
             )}
             
          </div>
      </div>
    </div>
  )
}

export default ViewSkills;

// eslint-disable-next-line

