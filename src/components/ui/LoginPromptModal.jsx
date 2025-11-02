import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';

const LoginPromptModal = () => {
  const { showLoginPrompt, closeLoginPrompt, goToLogin } = useAuth();

  if (!showLoginPrompt) return null;

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeIn 0.2s ease-out;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          padding: 32px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease-out;
          position: relative;
        }

        .dark .modal-content {
          background: #0F172A;
          border: 1px solid #1F2A37;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, #2D5016 0%, #22C55E 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 12px;
          color: #1A1A1A;
        }

        .dark .modal-title {
          color: #E6F4EA;
        }

        .modal-description {
          text-align: center;
          color: #6B7280;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .dark .modal-description {
          color: #93A3A3;
        }

        .modal-buttons {
          display: flex;
          gap: 12px;
        }

        .modal-buttons button {
          flex: 1;
        }
      `}</style>

      <div className="modal-overlay" onClick={closeLoginPrompt}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-icon">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          
          <h2 className="modal-title">Login Required</h2>
          
          <p className="modal-description">
            You need to be logged in to perform this action. Please sign in to continue with your carbon management tasks.
          </p>
          
          <div className="modal-buttons">
            <Button variant="outline" onClick={closeLoginPrompt}>
              Cancel
            </Button>
            <Button onClick={goToLogin}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPromptModal;
