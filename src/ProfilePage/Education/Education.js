import React, {useState, useEffect} from 'react';
import { doc, getDoc, collection, getDocs} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { addEducation, getEducation, deleteEducation, updateEducation } from '../../services/firestore';

function Education() {
  const [user, setUser] = useState(null);
  const [education, setEducation] = useState([]);
  const [institute, setInstitute] = useState('');
  const [degree, setDegree] = useState('');
  const [studyField, setStudyField] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [grade, setGrade] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchEducation = async () => {
    const userEducation = await getEducation(user.uid);
    setEducation(userEducation);
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
                    const eduDocsRef = collection(userDocRef, "education");
                    const educationSnapshot = await getDocs(eduDocsRef);
                    const educationList = educationSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setEducation(educationList);
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

  if (!education) {
    return <div>User not found</div>;
  }

  const handleAddEducation = async () => {
    if (institute.trim() === '' || degree.trim() === '' || studyField.trim() === '' || grade === 0) return;
    await addEducation(user.uid, { institutionName: institute, level: degree, topics: studyField, startedAt: startDate, endedAt: endDate, result: grade });
    setInstitute(''); setDegree(''); setStudyField(''); setGrade(0);
    fetchEducation();
  };
  const handleUpdateEducation = async (educationId, updatedName, updatedLevel, updatedTopics, updatedGrade, changeStart, changeEnd) => {
    await updateEducation(user.uid, educationId, { institutionName: updatedName, level: updatedLevel, topics: updatedTopics, startedAt: changeStart, endedAt: changeEnd, result: updatedGrade });
    fetchEducation();
  };

  const handleDeleteEducation = async (educationId) => {
    await deleteEducation(user.uid, educationId);
    fetchEducation();
  };


  return (
    <div className=  "my-3" style={{position: "relative", top:"700px", left: "50px", height: "auto", width: "70vw"}}>
      <div className="headings">
        <div className="row">
          <div className="col-md-4">
            <h2> Education </h2>
          </div>
          <div className="col-md-3 d-flex flex-row">
          <button className="btn btn-light me-3" data-bs-toggle="modal" data-bs-target="#addEducationModal">
            <i className='fa fa-plus fs-18'></i>
          </button>
          <div class="modal fade" id="addEducationModal" tabindex="-1" aria-labelledby="addEducationModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{minWidth: "400px", height: "auto", margin: "auto"}}>
              <div class="modal-content">
                <div className="title-bar" style={{display: "flex", alignItems: "center", justifyContent:"center", padding: "0 20px", 
                    position: "relative", top: "10px", fontSize: "25px"}}>
                    <h1 class="modal-title fs-5" id="addEducationLabel"> Add a new level of education </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{position: "absolute", right: "0"}}></button>
                </div>
                <div className="modal-body d-flex flex-column">
                  <div class="form-floating my-2">
                    <input type="text" className="form-control" placeholder="Degree" id="floatingInput" value={degree}
                    onChange={(e) => setDegree(e.target.value)} required></input>
                    <label htmlFor="floatingInput"> Level of Education </label>
                  </div>
                  <div className="form-floating my-2">
                    <input type="text" name="institute" id="floatingInput" className='form-control' placeholder='Institution name' value={institute}
                    onChange={(e) => setInstitute(e.target.value)} required/>
                    <label htmlFor="floatingInput">Institution </label>
                  </div>
                  <div className="form-floating my-2">
                    <input type="text" name="topics" id="floatingInput" className='form-control' placeholder='Study Topics' value={studyField} 
                    onChange={(e) => setStudyField(e.target.value)} required/>
                    <label htmlFor="floatingInput"> Field of Study </label>
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
                    <input type="number" name="grade" id="floatingInput" className='form-control' placeholder='Grade' value={grade}
                    onChange={(e) => setGrade(e.target.value)} required/>
                    <label htmlFor="floatingInput"> Grade </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={handleAddEducation}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="row my-3">
        {education ? (
              <>
              {education.map((study) => {
                return <div className="col-md-6 mb-3" key={study.id}>
                    <div className="card w-200 h-60">
                      <div className="card-body">
                        <p className="h2 fw-bold"> {study.institutionName} </p>
                        <p className="h4 fs-26"> {study.level} </p>
                        <p className="h5 fw-light">{study.topics}</p>
                        <p className='fs-18'> {study.startedAt} - {study.endedAt} </p>
                        <p className="h5 fw-light">Grade: {study.result}</p>
                        <div className="d-flex flex-row">
              <button className="btn btn-light" onClick={() => handleDeleteEducation(study.id)}>
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
                 <p className="fs-20">No education added yet.</p>
                </>
            )}
        </div>
      </div>
    </div>
  )
}

export default Education;
