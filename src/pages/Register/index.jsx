import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to login after successful registration
    navigate('/login');
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

        .register-section {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          padding: 20px;
        }

        .register-section .bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }

        .register-section .trees {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 100;
          pointer-events: none;
        }

        .register-section .girl {
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

        .register {
          position: relative;
          padding: 60px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(15px);
          border: 1px solid #fff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          border-right: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          width: 600px;
          max-width: 90%;
          display: flex;
          flex-direction: column;
          gap: 25px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
          z-index: 200;
        }

        .register h2 {
          position: relative;
          width: 100%;
          text-align: center;
          font-size: 2.5em;
          font-weight: 600;
          color: #2D5016;
          margin-bottom: 10px;
        }

        .register .inputBox {
          position: relative;
        }

        .register .inputBox input {
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

        .register .inputBox input::placeholder {
          color: #059669;
        }

        .register .inputRow {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .register .inputBox #btn {
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

        .register .inputBox #btn:hover {
          background: #22C55E;
        }

        .register .group {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .register .group a {
          font-size: 1.1em;
          color: #2D5016;
          font-weight: 500;
          text-decoration: none;
          margin-left: 5px;
        }

        .register .group a:hover {
          text-decoration: underline;
        }

        .register .group span {
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
          .register {
            padding: 40px 30px;
          }
          .register h2 {
            font-size: 2em;
          }
          .register .inputRow {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <section className="register-section">
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
        <div className="register">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputRow">
              <div className="inputBox">
                <input 
                  type="text" 
                  placeholder="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="inputBox">
                <input 
                  type="email" 
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
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
            <div className="inputRow">
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
                <input 
                  type="password" 
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="inputBox">
              <input type="submit" value="Create Account" id="btn" />
            </div>
            <div className="group">
              <span>Already have an account?</span>
              <Link to="/login">Sign In</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
