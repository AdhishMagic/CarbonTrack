import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Perform login
    login({
      name: formData.username || 'Admin User',
      email: `${formData.username}@coalministry.gov.in`,
      role: 'Environmental Officer'
    });
    
    // Navigate to home dashboard after successful login
    navigate('/home-dashboard');
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        .login-section {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          padding: 20px;
        }

        .login-section .bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }

        .login-section .trees {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 100;
          pointer-events: none;
        }

        .login-section .girl {
          position: absolute;
          scale: 0.65;
          pointer-events: none;
          animation: animateGirl 10s linear infinite;
        }

        @keyframes animateGirl {
          0% {
            transform: translateX(calc(100% + 100vw));
          }
          50% {
            transform: translateX(calc(-100% - 100vw));
          }
          50.01% {
            transform: translateX(calc(-100% - 100vw)) rotateY(180deg);
          }
          100% {
            transform: translateX(calc(100% + 100vw)) rotateY(180deg);
          }
        }

        .login {
          position: relative;
          padding: 60px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(15px);
          border: 1px solid #fff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          border-right: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          width: 500px;
          max-width: 90%;
          display: flex;
          flex-direction: column;
          gap: 25px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
          z-index: 200;
        }

        .login h2 {
          position: relative;
          width: 100%;
          text-align: center;
          font-size: 2.5em;
          font-weight: 600;
          color: #2D5016;
          margin-bottom: 10px;
        }

        .login .inputBox {
          position: relative;
        }

        .login .inputBox input {
          position: relative;
          width: 100%;
          padding: 15px 20px;
          outline: none;
          font-size: 1.1em;
          color: #2D5016;
          border-radius: 5px;
          background: #fff;
          border: none;
          margin-bottom: 20px;
        }

        .login .inputBox input::placeholder {
          color: #059669;
        }

        .login .inputBox #btn {
          position: relative;
          border: none;
          outline: none;
          background: #2D5016;
          color: #fff;
          cursor: pointer;
          font-size: 1.25em;
          font-weight: 500;
          transition: 0.5s;
          margin-bottom: 0;
        }

        .login .inputBox #btn:hover {
          background: #22C55E;
        }

        .login .group {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .login .group a {
          font-size: 1.1em;
          color: #2D5016;
          font-weight: 500;
          text-decoration: none;
        }

        .login .group a:hover {
          text-decoration: underline;
        }

        .login .group span {
          font-size: 1.1em;
          color: #2D5016;
        }

        .leaves {
          position: absolute;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
          pointer-events: none;
        }

        .leaves .set {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .leaves .set div {
          position: absolute;
          display: block;
        }

        .leaves .set div:nth-child(1) {
          left: 20%;
          animation: animate 20s linear infinite;
        }

        .leaves .set div:nth-child(2) {
          left: 50%;
          animation: animate 14s linear infinite;
        }

        .leaves .set div:nth-child(3) {
          left: 70%;
          animation: animate 12s linear infinite;
        }

        .leaves .set div:nth-child(4) {
          left: 5%;
          animation: animate 15s linear infinite;
        }

        .leaves .set div:nth-child(5) {
          left: 85%;
          animation: animate 18s linear infinite;
        }

        .leaves .set div:nth-child(6) {
          left: 90%;
          animation: animate 12s linear infinite;
        }

        .leaves .set div:nth-child(7) {
          left: 15%;
          animation: animate 14s linear infinite;
        }

        .leaves .set div:nth-child(8) {
          left: 60%;
          animation: animate 15s linear infinite;
        }

        @keyframes animate {
          0% {
            opacity: 0;
            top: -10%;
            transform: translateX(20px) rotate(0deg);
          }
          10% {
            opacity: 1;
          }
          20% {
            transform: translateX(-20px) rotate(45deg);
          }
          40% {
            transform: translateX(-20px) rotate(90deg);
          }
          60% {
            transform: translateX(20px) rotate(180deg);
          }
          80% {
            transform: translateX(-20px) rotate(45deg);
          }
          100% {
            top: 110%;
            transform: translateX(20px) rotate(225deg);
          }
        }

        @media (max-width: 768px) {
          .login {
            padding: 40px 30px;
          }
          .login h2 {
            font-size: 2em;
          }
        }
      `}</style>
      
      <section className="login-section">
        <div className="leaves">
          <div className="set">
            <div><img src="/assets/images/leaf_01.png" alt="leaf" /></div>
            <div><img src="/assets/images/leaf_02.png" alt="leaf" /></div>
            <div><img src="/assets/images/leaf_03.png" alt="leaf" /></div>
            <div><img src="/assets/images/leaf_04.png" alt="leaf" /></div>
            <div><img src="/assets/images/leaf_01.png" alt="leaf" /></div>
            <div><img src="/assets/images/leaf_02.png" alt="leaf" /></div>
            <div><img src="/assets/images/leaf_03.png" alt="leaf" /></div>
            <div><img src="/assets/images/leaf_04.png" alt="leaf" /></div>
          </div>
        </div>
        <img src="/assets/images/bg.jpg" className="bg" alt="background" />
        <img src="/assets/images/girl.png" className="girl" alt="girl" />
        <img src="/assets/images/trees.png" className="trees" alt="trees" />
        <div className="login">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <input 
                type="text" 
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputBox">
              <input 
                type="password" 
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputBox">
              <input type="submit" value="Login" id="btn" />
            </div>
            <div className="group">
              <span>New user?</span>
              <Link to="/register">Sign Up</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
