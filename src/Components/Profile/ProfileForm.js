import AuthContext from '../../Store/auth-context';
import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';


const ProfileForm = () => {

  const authCtx= useContext(AuthContext);

  const newPasswordInputRef= useRef();

  const submitHandler= (event)=>{
    event.preventDefault();

    const enteredNewPassword= newPasswordInputRef.current.value;

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBygTFFEDqS5q8VmNCxNgFaxenTeTyaBMs",
    {
      method:"POST",
      body:JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers:{
        "Content-Type": "application/json"
      }
    }).then(res=>{
      // assume : always succeeds!!
      console.log("password changed !!")
    })
  }
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' 
        minLength="7"
        ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
