import React from 'react';
import LiquidGlass from 'liquid-glass-react';
import { ButtonProps } from '../../types';

const IOSLiquidGlassButton: React.FC<ButtonProps> = ({
  disabled = false,
  loading = false,
  onClick,
  icon,
  children,
  'aria-label': ariaLabel,
  className = '',
  type = 'button',
}) => {
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick({} as any); // LiquidGlass handles the event differently
    }
  };

  // Render loading spinner
  const renderSpinner = () => (
    <svg 
      width="16px" 
      height="16px" 
      viewBox="0 0 24 24" 
      fill="none"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="31.416"
        strokeDashoffset="31.416"
        style={{
          animation: 'spinner 2s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinner {
          0% { stroke-dasharray: 0 31.416; }
          50% { stroke-dasharray: 15.708 15.708; }
          100% { stroke-dasharray: 31.416 0; }
        }
      `}</style>
    </svg>
  );

  const buttonContent = (
    <span className="text-white font-medium" style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
    }}>
      {loading && renderSpinner()}
      {icon && !loading && icon}
      {children}
    </span>
  );

  if (disabled) {
    return (
      <button
        type={type}
        disabled
        aria-label={ariaLabel}
        className={className}
        style={{
          padding: "8px 16px",
          borderRadius: 100,
          background: 'rgba(142, 142, 147, 0.3)',
          border: 'none',
          cursor: 'not-allowed',
          opacity: 0.5,
          minHeight: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: '#8E8E93',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {icon && (
            <span style={{ fontSize: "16px", display: 'flex', alignItems: 'center' }}>
              {icon}
            </span>
          )}
          {children}
        </span>
      </button>
    );
  }

  return (
    <LiquidGlass
      displacementScale={64}
      blurAmount={0.1}
      saturation={130}
      aberrationIntensity={2}
      elasticity={0.35}
      cornerRadius={100}
      padding="8px 10px"
      onClick={handleClick}
    >
      { buttonContent }
    </LiquidGlass>
  );
};

export default IOSLiquidGlassButton; 