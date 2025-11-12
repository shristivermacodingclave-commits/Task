import React from 'react'
import './SubFooter.css'
function SubFooter() {
    const year = new Date().getFullYear();
  return (  
            <div className="pe-strip p-4">
                <p className="pe-strip__line">
                    {year} © <span className="pe-strip__brand">PilotExaminations.com</span> | All Rights Reserved
                </p>
                <p className="pe-strip__line ">Powered by <span className="pe-strip__brand">PilotExaminations</span></p>
            </div>
  )
}

export default SubFooter;