import styles from './styles.module.css';
import appendScript from '../../services/appendExternalJsFile';
import '../lib/nucleo-svg.module.css';
import '../lib/nucleo-icons.module.css';
import '../fonts/fonts.module.css';
import './lib/javascripts/popper.min.js'
import './lib/javascripts/smooth-scrollbar.min.js'
import './lib/javascripts/perfect-scrollbar.min.js'
import { useState } from 'react';
import { signIn, getCsrfToken } from 'next-auth/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Alert } from 'react-bootstrap';

const simplifyError = (error) => {
  const errorMap = {
    "CredentialsSignin": "Email ou senha inválidos."
  }

  return errorMap[error] ?? "Unknown error occurred."
}

export default function Signin() {
  const router = useRouter();
  const [pageState, setPageState] = useState({
    error: '',
    processing: false
  });

  return (
    <>
    { appendScript('https://kit.fontawesome.com/42d5adcbca.js') }
    <main className="main-content  mt-0">
      <section>
        <div className="page-header min-vh-100">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                <div className="card card-plain">
                  <div className="card-header pb-0 text-start">
                    <h4 className="font-weight-bolder">Sign In</h4>
                    <p className="mb-1">Enter your email and password to sign in</p>
                  </div>
                  <div className="mr-8 ml-6">
                    {
                      pageState.error !== '' 
                      && 
                      <Alert key='danger' variant='danger'>
                        <Alert.Heading>Não autorizado</Alert.Heading>
                        <p>{ simplifyError(pageState.error) }</p>
                      </Alert>
                    }
                  </div>
                  <Formik
                    initialValues={{ email: '', password: '', tenantKey: '' }}
                    validationSchema={Yup.object({
                      email: Yup.string()
                        .max(30, 'Must be 30 characters or less')
                        .email('Invalid email address')
                        .required('Please enter your email'),
                      password: Yup.string().required('Please enter your password'),
                    })}
                    onSubmit={ async (values, { setSubmitting }) => {
                      signIn('credentials', {
                        redirect: false,
                        email: values.email,
                        password: values.password,
                        callbackUrl: `${window.location.origin}`,
                      }).then(response => {
                        console.log('aaa', response)
                        if (response.ok) {
                          router.push('/dashboard')
                        } else {
                          setPageState(old=>({ ...old, error: response?.error }))
                        }
                      }).catch(error => {
                        setPageState(old=>({ ...old, error: error }))
                      });
                      setSubmitting(false);
                    }}
                  >
                    {(formik) => (
                      <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                          <div className='mb-4'>
                            <Field
                              name="email"
                              aria-label="enter your email"
                              aria-required="true"
                              type="text"
                              placeholder="Email"
                              className="form-control form-control-lg"
                            />

                            <div className="text-red-600 text-sm">
                              <ErrorMessage name="email" />
                            </div>
                          </div>
                          <div className="mb-6">
                            <Field
                              name="password"
                              aria-label="enter your password"
                              aria-required="true"
                              type="password"
                              placeholder="Password"
                              className="form-control form-control-lg"
                            />
                            <div className="text-red-600 text-sm">
                              <ErrorMessage name="password" />
                            </div>
                            <div className="form-check form-switch mt-2">
                              <input className="form-check-input" type="checkbox" id="rememberMe" />
                              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <button
                              type="submit"
                              className="btn btn-lg btn-primary btn-lg w-100 mb-0"
                            >
                              {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </Formik>
                  <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    <p className="mb-4 text-sm mx-auto">
                      Don't have an account?
                      <a href="/sign-up" className="text-primary text-gradient font-weight-bold">Sign up</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                <div className={[styles.background, "position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"].join(' ')}>
                  <span className="mask bg-gradient-primary opacity-6"></span>
                  <h4 className="mt-5 text-white font-weight-bolder position-relative">"Attention is the new currency"</h4>
                  <p className="text-white position-relative">The more effortless the writing looks, the more effort the writer actually put into the process.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}