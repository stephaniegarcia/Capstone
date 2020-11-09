import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spinner from './loading'
import Alert from './alert'
import apiService from "./mockApiService";

// class Login extends Component {
//     render() {
//         const loginProps = { };
//         const registerProps = { };
//     //    const {open} = this.state;
      
        
//         function onOpenModal() {
//             this.setState({ open: true });     
//           };

//          function onCloseModal () {
//             this.setState({ open: false });
//           };  

//         function isEmail(email) {
//             const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//             return re.test(String(email).toLowerCase());
//         }

//         function isValidPass(text) {
//             console.log(text.length);
//             return text.length > 0
//         }

//         function loginPressed(){
//             var email = loginProps.email.value;
//             var pass = loginProps.password.value;
//             if(!isEmail(email)) {
//                 alert('Enter valid email');
//             }
//             else if(!isValidPass(pass)) {
//                 alert('Enter valid password');
//             }
//             else
//             {
//                 apiService.postRequest("login", { email: email, password: pass }).then(response => {
//                     alert("Login successful! Hello " + response.firstName + "!");
//                     apiService.setAccessToken(response.accessToken);
//                 }).catch((err)=>{
//                     alert(err.response.data);
//                 });
//             }
//         }

//         function registerPressed(){
//             var firstName = registerProps.firstName.value;
//             var lastName = registerProps.lastName.value;
//             var phoneNumber = registerProps.phoneNumber.value;
//             var email = registerProps.email.value;
//             var pass = registerProps.password.value;

//             if(!isEmail(email)) {
//                 alert('Enter valid email');
//             }
//             else if(!isValidPass(pass)) {
//                 alert('Enter valid password');
//             }
//             else
//             {
//                 apiService.postRequest("register", { firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, password: pass }).then(response => {
//                     alert("Login successful! Hello " + response.firstName + "!");
//                     apiService.setAccessToken(response.accessToken);
//                 }).catch((err)=>{
//                     alert(err.response.data);
//                 });
//             }
//         }
        

//         return (
//             <div>
//                 <h2>Accede a tu perfil</h2>
//                 <h2>Accede a tu perfil</h2>
//                 <TextField inputRef={ref => { loginProps.email = ref; }} required id="email-field" label="Correo Electrónico" />
//                 <br />
//                 <TextField inputRef={ref => { loginProps.password = ref; }} type="password" required id="password-field" label="Contraseña" />
//                 <Button href="/passwordReset" color="inherit" >Reset Password</Button>
               
//                 <br />

//                 <br />
//                 <br />
            
//                 <Button onClick={()=>{ loginPressed(); }} variant="contained" color="primary">
//                     Iniciar Sesión
//                 </Button>

//                 {/* <button type="button" onClick={this.onOpenModal}>
//                 Open Modal
//                 </button>
//                 <Modal 
//                     open={this.state.open}
//                     onClose={this.onCloseModal}
//                     aria-labelledby="simple-modal-title"
//                     aria-describedby="simple-modal-description"
//                 >
               
//                 </Modal> */}
//                 <h2>Registro de Nuevos Usuarios</h2>

//                 <TextField inputRef={ref => { registerProps.firstName = ref; }} required id="firstName-field" label="Nombre" />
//                 <br />
//                 <br />
//                 <br />
//                 <TextField inputRef={ref => { registerProps.lastName = ref; }} required id="lastName-field" label="Apellido" />
//                 <br />
//                 <br />
//                 <br />
//                 <TextField inputRef={ref => { registerProps.email = ref; }} required id="email-field" label="Correo Electrónico" />
//                 <br />
//                 <br />
//                 <br />
//                 <TextField inputRef={ref => { registerProps.phoneNumber = ref; }} required id="phoneNumber-field" label="Número Teléfonico" /> 
//                 <br />
//                 <br />
//                 <br />
//                 <TextField inputRef={ref => { registerProps.password = ref; }} type="password" required id="password-field" label="Contraseña" />
//                 <br />
//                 <br />
//                 <Button onClick={()=>{ registerPressed(); }} variant="contained" color="primary">
//                     Registrar
//                 </Button>
//         <br />
//             </div>
//         );
//     }
// }
function Login() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [showLoading, setShowLoading] = useState(false);

    function isValidEmail(email) {
        if(email && email.length == 0) {
            return true;
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function isValidPass(text) {
        if(text && text.length == 0) {
            return true;
        }
        return text.length > 6
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value.toLowerCase());
        setValidEmail((isValidEmail(email)));
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setValidPassword((isValidPass(password)));
    };

    const onAlertClick = () => {
        setShowErrorAlert(false);
    };

    const handleLoginClick = () => {
        setShowLoading(true);
        apiService.postRequest("login", { email: email, password: password }).then(response => {
            apiService.setAccessToken(response.accessToken);
            setShowLoading(false);
            //history.push("/");
            window.location.href = "/";
        }).catch(err =>{
            setShowLoading(false);
            setErrorMessage(err.response.data);
            setShowErrorAlert(true);
        });
    };

    return(
        apiService.isAuthenticated() ? <Redirect to="/" /> :
        <div>
            <Paper className="form form--wrapper" elevation={10}>
                <div style={{'padding-top': '50px'}}></div>
                <h1>Login</h1>
                <div style={{'padding-top': '50px'}}></div>
                <div>
                    <TextField
                        label="Correo Electrónico:"
                        error={!validEmail}
                        //errorText="Correo electrónico inválido"
                        onChange={handleEmailChange}
                        value={email} />
                </div>
                <div>
                    <TextField
                        type="password"
                        label="Contraseña:"
                        //error={!validPassword}
                        //helperText="Contraseña inválido"
                        onChange={handlePasswordChange}
                        value={password} />
                </div>
                <div>
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleLoginClick}
                    //disabled= {!validEmail || !validPassword || !email.length>0 || !password.length>0}
                    disabled= {!validEmail || !email.length>0 || !password.length>0}
                    style={{ margin: '16px' }}
                    >
                        Login
                    </Button>
                    <br/>
                    <Button href="/passwordReset" color="inherit" >Reset Password</Button>
                </div>
                <div>
                    <p>Or</p>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    href="/register"
                    style={{ margin: '16px' }}
                    >
                        Register
                    </Button>
                </div>
            </Paper>
            <Alert
                isOpen={showErrorAlert}
                handleSubmit={onAlertClick}
                title="Error"
                text={errorMessage}
                submitButtonText="Ok"
            />
            <Spinner isShown={showLoading} />
        </div>
    );
}
export default Login;