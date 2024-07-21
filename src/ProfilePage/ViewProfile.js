import React from 'react';
import UserInfo from './Intro/UserInfo';
import Education from './Education/Education';
import Experience from './Experience/Experience';
import Project from './Projects/Project';
import Course from './Courses/Course';
import Navbar from '../Components/Navbar';
import ViewSkills from './Skills/ViewSkills';


function ViewProfile() {
    return(
        <>
        <Navbar/>
        <UserInfo/>
        <Education/>
        <Experience/>
        <Course/>
        <ViewSkills/>
        <Project/>
        </>
    )
}
export default ViewProfile;