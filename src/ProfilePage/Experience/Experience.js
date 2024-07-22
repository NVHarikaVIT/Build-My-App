import React, {useState, useEffect} from 'react';
import { doc, getDoc, collection, getDocs} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { addExperience, getExperience, updateExperience, deleteExperience } from '../../services/firestore';

function Experience() {
  const [user, setUser] = useState(null);
  const [experience, setExperience] = useState([]);
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [info, setInfo] = useState('');
  const [url, setUrl] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchExperience = async () => {
    const userExperience = await getExperience(user.uid);
    setExperience(userExperience);
  };

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
                    const expDocsRef = collection(userDocRef, "experience");
                    const experienceSnapshot = await getDocs(expDocsRef);
                    const experienceList = experienceSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setExperience(experienceList);
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

  if (!experience) {
    return <div>User not found</div>;
  }

  const handleAddExperience = async () => {
    if (position.trim() === '' || company.trim() === '' || info.trim() === '' || url.trim() === '') return;
    await addExperience(user.uid, { title: position, institution: company, description: info, startedAt: startDate, endedAt: endDate, certificate: url });
    setPosition(''); setCompany(''); setInfo(''); setUrl('');
    fetchExperience();
  };
  const handleUpdateExperience = async (experienceId, updatedTitle, updatedInstitute, updatedBio, updatedCertificate, changeStart, changeEnd) => {
    await updateExperience(user.uid, experienceId, { title: updatedTitle, institution: updatedInstitute, description: updatedBio, startedAt: changeStart, endedAt: changeEnd, certificate: updatedCertificate  });
    fetchExperience();
  };

  const handleDeleteExperience = async (experienceId) => {
    await deleteExperience(user.uid, experienceId);
    fetchExperience();
  };

  return (
    <div className=  "my-3" style={{position: "relative", top:"700px", left: "50px", height: "auto", width: "70vw"}}>
      <div className="headings">
        <div className="row">
          <div className="col-md-4">
            <h2> Experience </h2>
          </div>
          <div className="col-md-3 d-flex flex-row">
          <button className="btn btn-light me-3" data-bs-toggle="modal" data-bs-target="#addExperienceModal">
            <i className='fa fa-plus fs-18'></i>
          </button>
          <div class="modal fade" id="addExperienceModal" tabindex="-1" aria-labelledby="addExperienceModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{minWidth: "400px", height: "auto", margin: "auto"}}>
              <div class="modal-content">
                <div className="title-bar" style={{display: "flex", alignItems: "center", justifyContent:"center", padding: "0 20px", 
                    position: "relative", top: "10px", fontSize: "25px"}}>
                    <h1 class="modal-title fs-5" id="addExperienceLabel"> Add a new position </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{position: "absolute", right: "0"}}></button>
                </div>
                <div className="modal-body d-flex flex-column">
                  <div class="form-floating my-2">
                    <input type="text" name="position" className="form-control" placeholder="Position" id="floatingInput" value={position}
                    onChange={(e) => setPosition(e.target.value)} required></input>
                    <label htmlFor="floatingInput"> Position </label>
                  </div>
                  <div class="form-floating my-2">
                    <input type="text" name="company" className="form-control" placeholder="Company" id="floatingInput" value={company}
                    onChange={(e) => setCompany(e.target.value)} required></input>
                    <label htmlFor="floatingInput"> Company </label>
                  </div>
                  <div className="form-floating my-2">
                    <input type="text" name="descr" id="floatingInput" className='form-control' placeholder='Write your experiences here ' value={info}
                    onChange={(e) => setInfo(e.target.value)} maxLength="2000"/>
                    <label htmlFor="floatingInput"> Description </label>
                  </div>
                  <div className="form-floating my-2">
                    <input type="datetime" name="startDate" id="floatingDate" className='form-control' placeholder='Start Date' value={startDate}
                    onChange={(e) => setStartDate(e.target.value)} required/>
                    <label htmlFor="floatingDate"> Start Date </label>
                  </div>
                  <div className="form-floating my-2">
                    <input type="datetime" name="endDate" id="floatingDate" className='form-control' placeholder='End Date' value={endDate}
                    onChange={(e) => setEndDate(e.target.value)} required/>
                    <label htmlFor="floatingDate"> End Date </label>
                  </div>
                  <div className="form-floating my-2">
                    <input type="text" name="url" id="floatingInput" className='form-control' placeholder='Certificate URL' value={url}
                    onChange={(e) => setUrl(e.target.value)}/>
                    <label htmlFor="floatingInput"> Certificate URL </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={handleAddExperience}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="row my-3">
        {experience ? (
              <>
              {experience.map((exp) => {
                return <div className="col-md-6 mb-3" key={exp.id}>
                    <div className="card w-70 h-60">
                      <div className="card-body">
                        <p className="h3 fw-bold" style={{color: "#d63384"}}> {exp.title} </p>
                        <p className="h4 fs-22"> {exp.institution} </p>
                        <p className="fs-26"> {exp.description} </p>
                        <p className='fs-18'> {exp.startedAt} - {exp.endedAt} </p>
                        <a href={exp.url} className="h5 fw-light" style={{color: "blue", fontWeight: "bold", fontSize: "20px"}}>{exp.url}</a>
                        <div className="d-flex flex-row">
              <button className="btn btn-light" onClick={() => handleDeleteExperience(exp.id)}>
                <i className="fa fa-trash"></i>
              </button>
              <button className="btn btn-light" data-bs-toggle="modal" data-bs-target="#editProjectModal">
                <i className="fa fa-pen">
                </i>
              </button>
             </div>
                      </div>
                    </div>
                </div>
              })}
              </>
              ): (
                <>
                 <p className="fs-20">No experience added yet.</p>
                </>
            )}
        </div>
      </div>
    </div>
  )
}

export default Experience;
