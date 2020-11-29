import React, { Component } from 'react'
import { Formik } from 'formik'
import { object, ref, string } from 'yup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Spinner from './loading'
import Alert from './alert'
//import apiService from "./mockApiService";
import apiService from "./apiService";

export default class AdminForgotPassword extends Component {
  state = {
    passChangeSuccess: false,
  }

  _handleModalClose = () => {
    this.setState(() => ({
      passChangeSuccess: false,
    }))
  }

  _renderModal = () => {
    const onClick = () => {
      this.setState(() => ({ passChangeSuccess: false }))
    }

    return (
      <Alert
        isOpen={this.state.passChangeSuccess}
        onClose={this._handleClose}
        handleSubmit={onClick}
        title="Restablecimiento de contraseña"
        text="Se envió un correo electrónico para completar el proceso de recuperación de contraseña"
        submitButtonText="Ok"
      />
    )
  }

  _handleSubmit = ({
    email,
    setSubmitting,
    resetForm,
  }) => {
    // fake async login
    setTimeout(async () => {
      setSubmitting(false)

      this.setState(() => ({
        passChangeSuccess: true,
      }))
      apiService.postRequest('admin/changePassword', {email: email});
      resetForm()
    }, 1000)
  }

  render() {
    return (
        
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={object().shape({
          email: string().required('Correo electronico es requerido'),
        })}
        onSubmit={(
          { email },
          { setSubmitting, resetForm }
        ) =>
          this._handleSubmit({
            email,
            setSubmitting,
            resetForm,
          })
        }
        render={props => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            isSubmitting,
          } = props
          return isSubmitting ? (
            <Spinner />
          ) : (
              
            <Paper className="paper-margin" elevation={10}>
                <div style={{'padding-top': '50px'}}></div>
               <h1>Recupera Tu Contrasena</h1>
               
              <form className="form" onSubmit={handleSubmit}>
              <div style={{'padding-top': '50px'}}></div>
                <FormControl fullWidth margin="dense">
                  <InputLabel
                    htmlFor="email"
                    error={Boolean(touched.email && errors.email)}
                  >
                    {'Correo Electronico'}
                  </InputLabel>
                  <Input
                    id="email"
                    name="email"
                   
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                  />
                  <FormHelperText
                    error={Boolean(touched.email && errors.email)}
                  >
                    {touched.email && errors.email
                      ? errors.email
                      : ''}
                  </FormHelperText>
                </FormControl>
     
           
                <Button
                  type="submit"
                  variant="raised"
                  color="primary"
                  disabled={Boolean(!isValid || isSubmitting)}
                  style={{ margin: '16px' }}
                >
                  {'Restablecer la contraseña'}
                </Button>
              </form>
              {this._renderModal()}
            </Paper>
          )
        }}
      />
    )
  }
}
