import { useForm, SubmitHandler, FieldValues } from "react-hook-form"; // Import the right types
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

type LoginMail = {
  name: string;
  password: string;
  keepSigned?: boolean; // Add this property to the LoginMail type
}

const postData = async (url, data) => {
  // Example implementation (replace with your actual HTTP request)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const decodeToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const LoginPage = () => {
  const navigate = useNavigate(); // Using useNavigate hook from React Router

  const { register, handleSubmit, formState: { errors } } = useForm<LoginMail>(); // Explicitly define the type for form data

  // Update onSubmit function to use SubmitHandler
  const onSubmit: SubmitHandler<LoginMail> = async (data) => {
    try {
      const res = await postData('/auth/SignIn', {
        Name: data.name,
        Password: data.password,
      });

      if (res && res.token) {
        localStorage.setItem('jwtToken', res.token);

        const decodedToken = decodeToken(res.token);
        if (decodedToken) {
          const role = decodedToken.role;
          if (role) {
            localStorage.setItem('userRole', role);
          }
        }

        if (res.userInfo) {
          localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
        }

        navigate('/'); // Navigate to home after successful login
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  return (

    <div className="form-page">
      {/* <header className="simple-header">
        <div className="header-container">

          <div className="logo">
            <h1>CarAdvise</h1>
          </div>


          <div className="search-bar">
            <input type="text" placeholder="Search" />
          </div>


          <div className="nav-icons">
            <i className="icon">🔔</i>
            <i className="icon">💬</i>
            <i className="icon">👤</i>
          </div>
        </div>
      </header> */}
      <div className="container">

        <div className="back-button-section">
          <Link to="/">
            <i className="icon-left"></i>Back to home
          </Link>
        </div>

        <div className="form-block">
          <h2 className="form-block__title">Log in</h2>

          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__input-row">
              <input
                className="form__input"
                placeholder="Username"
                type="text"
                {...register('name', {
                  required: 'This field is required',
                  // pattern: {
                  //   value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  //   message: 'Please write a valid email'
                  // }
                })}
              />
              {errors.name && <p className="message message--error">{errors.name.message}</p>}
            </div>

            <div className="form__input-row">
              <input
                className="form__input"
                type="password"
                placeholder="Password"
                {...register('password', { required: 'This field is required' })}
              />
              {errors.password && <p className="message message--error">{errors.password.message}</p>}
            </div>

            <div className="form__info">
              <div className="checkbox-wrapper">
                <label htmlFor="check-signed-in" className={`checkbox checkbox--sm`}>
                  <input
                    type="checkbox"
                    id="check-signed-in"
                    {...register('keepSigned')}
                  />
                  <span className="checkbox__check"></span>
                  <p>Keep me signed in</p>
                </label>
              </div>
              <Link to="/forgot-password" className="form__info__forgot-password">Forgot password?</Link>
            </div>

            <div className="form__btns">
              {/* <button type="button" className="btn-social fb-btn"><i className="icon-facebook"></i>Facebook</button> */}
              <button type="button" className="btn-social google-btn"><i className="icon-gmail"></i>Gmail</button>
            </div>

            <button type="submit" className="btn btn--rounded btn--yellow btn-submit">Sign in</button>

            <p className="form__signup-link">Not a member yet? <Link to="/register">Sign up</Link></p>
          </form>
        </div>
      </div>
    </div>

  );

}


export default LoginPage;
