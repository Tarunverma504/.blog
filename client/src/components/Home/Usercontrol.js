import { Link} from 'react-router-dom';
import "../../style/Usercontrol.css";
function Usercontrols(props){
    const deleteUser=()=>{
        sessionStorage.removeItem("UserData");
    }
    return(
        <>
            <div className="dropdown">
                <div className="user">
                    <div className="dp">
                        <img src={props.image} allt="image not found"/> 
                    </div>
                    <div className="username"> 
                        {props.username}
                    </div>
                </div>

                <div className="dropdown-content">
                    <Link className="dropdown-link" to="/admin" >Profile</Link>
                    <Link className="dropdown-link" onClick={deleteUser} to="/" >Logout</Link>
                </div>
            </div>
        </>
    )
}

export default Usercontrols;