import React, {useState, useEffect} from 'react';
import { addProject, getProject, updateProject, deleteProject } from '../../services/firestore';
import { doc, getDoc, collection, getDocs} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Project() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescr, setProjectDescr] = useState('');
  const [projectURL, setProjectURL] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const userProjects = await getProject(user.uid);
    setProjects(userProjects);
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
                    const projectDocsRef = collection(userDocRef, "project");
                    const projectsSnapshot = await getDocs(projectDocsRef);
                    const projectsList = projectsSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setProjects(projectsList);
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

  if (!projects) {
    return <div>User not found</div>;
  }

  const handleAddProject = async () => {
    if (projectTitle.trim() === '' || projectDescr.trim() === '' || projectURL.trim() === '') return;
    await addProject(user.uid, {name: projectTitle, description: projectDescr, url: projectURL, startedAt: startDate, endedAt: endDate});
    setProjectTitle(''); setProjectDescr(''); setProjectURL('');
    fetchProjects();
  };

  const handleUpdateProject = async (projectId, updatedName, updatedDescr, updatedURL, changeStart, changeEnd) => {
    await updateProject(user.uid, projectId, { name: updatedName, description: updatedDescr, startedAt: changeStart, endedAt: changeEnd, url: updatedURL});
    fetchProjects();
  };

  const handleDeleteProject = async (projectId) => {
    await deleteProject(user.uid, projectId);
    fetchProjects();
  };
  return (
    <div className=  "my-3" style={{position: "relative", top:"700px", left: "50px", height: "auto", width: "70vw"}}>
      {/* Heading */}
      <div className="header-part">
        <div className="row">
          <div className="col-md-4">
            <h2> Projects </h2>
          </div>
          {/* CRUD operations for projects  */}
          <div className="col-md-4 d-flex flex-row">
          <button className="btn btn-light me-3" data-bs-toggle="modal" data-bs-target="#addProjectModal">
            <i className='fa fa-plus fs-18'></i>
          </button>
          <div class="modal fade" id="addProjectModal" tabindex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{minWidth: "400px", height: "auto", margin: "auto"}}>
              <div class="modal-content">
                <div className="title-bar" style={{display: "flex", alignItems: "center", justifyContent:"center", padding: "0 20px", 
                    position: "relative", top: "10px", fontSize: "25px"}}>
                    <h1 class="modal-title fs-5" id="addProjectLabel"> Add a new project </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{position: "absolute", right: "0"}}></button>
                </div>
                <div className="modal-body d-flex flex-column">
                  <div class="form-floating my-2">
                    <input type="text" className="form-control" placeholder="Project title" id="floatingInput" value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)} required></input>
                    <label htmlFor="floatingInput">Project Title</label>
                  </div>
                  <div className="form-floating my-2">
                    <input type="text" name="descr" id="floatingInput" className='form-control' placeholder='Write some information here' value={projectDescr}
                    onChange={(e) => setProjectDescr(e.target.value)} maxLength={4000}/>
                    <label htmlFor="floatingInput">Description</label>
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
                    <input type="text" name="descr" id="floatingInput" className='form-control' placeholder='Project URL' value={projectURL}
                    onChange={(e) => setProjectURL(e.target.value)}/>
                    <label htmlFor="floatingInput"> Project URL </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={handleAddProject}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="row my-3">
          {projects ? (
              <>
              {projects.map((project) => {
                return <div className="col-md-10 mb-2" key={project.id}>
                    <div className="card w-70 h-60">
                      <div className="card-body">
                        <p className="h3 fw-bold"> {project.name} </p>
                        <p className="fs-26"> {project.description} </p>
                        <p className='fs-18'> {project.startedAt} - {project.endedAt} </p>
                        <a href={project.url} className="h5 fw-light" style={{color: "blue", fontWeight: "bold", fontSize: "20px"}}>{project.url}</a>
                        <div className="d-flex flex-row">
                          <button className="btn btn-light" onClick={() => handleDeleteProject(project.id)}>
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
                 <p className="fs-20"> No projects added yet.</p>
                </>
            )}
        </div>
      </div>

    </div>
  )
}

export default Project;
