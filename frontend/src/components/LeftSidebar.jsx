
import './LeftSidebar.css'

const LeftSidebar = ({logout}) => {
  return (
    <div className='leftSidebar' >
      <div className="top">
      <span className="material-symbols-outlined">
        account_circle
      </span>
      <p style={{display:"inline"}} >
        <span className="material-symbols-outlined">
          chat
        </span>
        <span className="material-symbols-outlined" onClick={()=>{
          if(window.confirm("Do you want to Log out ?")) logout();
        }}>
          logout
        </span>
      </p>
      </div>
    </div>
  )
}

export default LeftSidebar