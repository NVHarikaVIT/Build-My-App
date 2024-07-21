import React from 'react';

function Content() {
    // let styles = {position:'relative', top: '100px', left:'150px'};
    return (
      <>
        <div>
          <div className="border border-light-subtle container-fluid vw-80" style={{position:'relative', top: '100px'}}>
            <h1 className="intro" style={{marginLeft: "50px", width: '600px', fontSize: '90px', fontFamily: 'cursive', color: 'red'}}>
                <span style={{color:'rgb(20,50,220)'}}>Design the website</span> the way 
                to address yourself
            </h1>
            <img className="position-absolute top-50 start-50 end-50 translate-middle-y"
            style={{margin: "0 0 0 80px", width: "auto", height: "100%", border: "2px solid #fffeed", textShadow: "5px 10px #fffeed"}}
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcCObNvPPTMba6i9zMfqB28Cu5_B7mh0-T8A&s"} alt={"Web designer"}/>
          </div>
        </div>
      </>
  )
}
export default Content;