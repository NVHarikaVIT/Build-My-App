import React, {useState, useEffect} from 'react';
import { addCourse, getCourse, deleteCourse, updateCourse } from '../../services/firestore';
import { doc, getDoc, collection, getDocs} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Course() {
  // states
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [courseDescr, setCourseDescr] = useState('');
  const [courseCertificate, setCourseCertificate] = useState('');
  const [institution, setInstitution] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
                    const courseDocsRef = collection(userDocRef, "courses");
                    const coursesSnapshot = await getDocs(courseDocsRef);
                    const coursesList = coursesSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setCourses(coursesList);
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

  if (!courses) {
    return <div>User not found</div>;
  }

  const fetchCourses = async () => {
    const userCourses = await getCourse(user.uid);
    setCourses(userCourses);
  };
  const handleAddCourse = async () => {
    if (courseName.trim() === '' || courseDescr.trim() === '' || institution.trim() === '' || courseCertificate.trim() === '') return;
    await addCourse(user.uid, { name: courseName, description: courseDescr, providedBy: institution, startedAt: startDate, endedAt: endDate, certificate: courseCertificate });
    setCourseName(''); setCourseDescr(''); setCourseCertificate(''); setInstitution('');
    fetchCourses();
  };
  const handleUpdateCourse = async (courseId, updatedTitle, updatedBio, updatedInstitute, updatedCertificate, changeStart, changeEnd) => {
    await updateCourse(user.uid, courseId, { name: updatedTitle, description: updatedBio, providedBy: updatedInstitute, startedAt: changeStart, endedAt: changeEnd, certificate: updatedCertificate });
    fetchCourses();
  };

  const handleDeleteCourse = async (courseId) => {
    await deleteCourse(user.uid, courseId);
    fetchCourses();
  };
  return (
    <div className=  "my-3" style={{position: "relative", top:"700px", left: "50px", height: "auto", width: "70vw"}}>
      <div className="header-part">
        <div className="row">
          <div className="col-md-4">
            <h2> Courses </h2>
          </div>
          <div className="col-md-4 d-flex flex-row">
            <button className="btn btn-light me-3" data-bs-toggle="modal" data-bs-target="#addCourseModal">
            <i className='fa fa-plus fs-18'></i>
            </button>
            <div class="modal fade" id="addCourseModal" tabindex="-1" aria-labelledby="addCourseModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{minWidth: "400px", height: "auto", margin: "auto"}}>
              <div class="modal-content">
                <div className="title-bar" style={{display: "flex", alignItems: "center", justifyContent:"center", padding: "0 20px", 
                    position: "relative", top: "10px", fontSize: "25px"}}>
                    <h1 class="modal-title fs-5" id="addCourseLabel"> Add a new course </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{position: "absolute", right: "0"}}></button>
                </div>
                <div className="modal-body d-flex flex-column">
                  <div class="form-floating my-2">
                    <input type="text" className="form-control" placeholder="Course title" id="floatingInput" value={courseName}
                    onChange={(e) => setCourseName(e.target.value)} required></input>
                    <label htmlFor="floatingInput">Course Name</label>
                  </div>
                  <div className="form-floating my-2">
                    <input type="text" name="descr" id="floatingInput" className='form-control' placeholder='Write some information here' value={courseDescr}
                    onChange={(e) => setCourseDescr(e.target.value)} maxLength="2000"/>
                    <label htmlFor="floatingInput">Description</label>
                  </div>
                  <div className="form-floating my-2">
                    <input type="text" name="inst" id="floatingInput" className='form-control' placeholder='Institution' value={institution}
                    onChange={(e) => setInstitution(e.target.value)} required/>
                    <label htmlFor="floatingInput">Institution</label>
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
                    <input type="text" name="descr" id="floatingInput" className='form-control' placeholder='Course certificate' value={courseCertificate}
                    onChange={(e) => setCourseCertificate(e.target.value)}/>
                    <label htmlFor="floatingInput"> Certificate </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={handleAddCourse}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="row my-3">
        {courses ? (
              <>
              {courses.map((course) => {
                return <div className="col-md-6 mb-2" key={course.id}>
                    <div className="card w-70 h-60">
                      <div className="card-body">
                        <p className="h3 fw-bold" style={{color: "#d63384"}}> {course.name} </p>
                        <p className="fs-26"> {course.description} </p>
                        <p className='fs-18'> {course.startedAt} - {course.endedAt} </p>
                        <a href={course.certificate} className="h5 fw-light" style={{color: "blue", fontWeight: "bold", fontSize: "20px"}}>{course.certificate}</a>
                        <div className="d-flex flex-row">
              <button className="btn btn-light" onClick={() => handleDeleteCourse(course.id)}>
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
                 <p className="fs-20">No courses added yet.</p>
                </>
            )}
        </div>
      </div>
    </div>
  )
}

export default Course;
