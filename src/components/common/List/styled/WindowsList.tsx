import React from 'react';
import { ListProps, ListItem } from '../../types';

const WindowsList: React.FC<ListProps> = ({
  items,
  onItemClick,
  selectedItem,
  dense = false,
  dividers = false,
  subheader,
  scrollable = false,
  maxHeight,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const handleItemClick = (item: ListItem) => {
    if (!item.disabled && onItemClick) {
      onItemClick(item);
    }
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    border: '1px solid var(--colorNeutralStroke1)',
    borderRadius: 'var(--borderRadiusMedium)',
    background: 'var(--colorNeutralBackground1)',
    overflow: 'hidden',
    ...(scrollable && maxHeight && { 
      maxHeight, 
      overflowY: 'auto' as const 
    })
  };

  const listStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const subheaderStyle: React.CSSProperties = {
    padding: dense ? '8px 12px 4px' : '12px 16px 6px',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--colorNeutralForeground2)',
    background: 'var(--colorNeutralBackground2)',
    borderBottom: dividers ? '1px solid var(--colorNeutralStroke2)' : 'none',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  };

  const getItemStyle = (item: ListItem, isSelected: boolean, isLast: boolean): React.CSSProperties => ({
    position: 'relative' as const,
    ...(dividers && !isLast && {
      borderBottom: '1px solid var(--colorNeutralStroke2)',
    }),
  });

  const getItemContentStyle = (item: ListItem, isSelected: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: dense ? '8px 12px' : '12px 16px',
    background: 'none',
    border: 'none',
    textAlign: 'left' as const,
    cursor: item.disabled ? 'not-allowed' : 'pointer',
    color: item.disabled ? 'var(--colorNeutralForegroundDisabled)' : 'var(--colorNeutralForeground1)',
    fontSize: '14px',
    transition: 'background-color 0.15s ease',
    textDecoration: 'none',
    ...(isSelected && {
      background: 'var(--colorBrandBackground2)',
      color: 'var(--colorBrandForeground1)',
    }),
    ...(item.disabled && {
      opacity: 0.6,
    }),
    '&:hover': !item.disabled && !isSelected ? {
      background: 'var(--colorNeutralBackground1Hover)',
    } : {},
    '&:active': !item.disabled ? {
      background: 'var(--colorNeutralBackground1Pressed)',
    } : {},
    '&:focus': {
      outline: 'none',
      background: 'var(--colorNeutralBackground1Hover)',
      boxShadow: 'inset 0 0 0 1px var(--colorStrokeFocus1)',
    },
  });

  const leadingStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginRight: '12px',
    flexShrink: 0,
  };

  const avatarStyle: React.CSSProperties = {
    width: dense ? '24px' : '32px',
    height: dense ? '24px' : '32px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--colorNeutralBackground3)',
  };

  const iconStyle: React.CSSProperties = {
    width: dense ? '16px' : '20px',
    height: dense ? '16px' : '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--colorBrandForeground1)',
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0, // Allow text truncation
  };

  const labelStyle: React.CSSProperties = {
    fontSize: dense ? '13px' : '14px',
    fontWeight: 400,
    lineHeight: 1.3,
    marginBottom: '2px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  };

  const sublabelStyle: React.CSSProperties = {
    fontSize: dense ? '11px' : '12px',
    fontWeight: 400,
    color: 'var(--colorNeutralForeground2)',
    lineHeight: 1.2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  };

  const trailingStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '12px',
    flexShrink: 0,
  };

  const chevronStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--colorNeutralForeground3)',
  };

  return (
    <div 
      style={containerStyle}
      className={className}
      role="region"
      aria-label={ariaLabel}
    >
      {subheader && (
        <div style={subheaderStyle}>
          {subheader}
        </div>
      )}
      
      <ul style={listStyle} role="list">
        {items.map((item, index) => {
          const isSelected = selectedItem === item.id;
          const isLast = index === items.length - 1;
          
          const ItemWrapper = item.href ? 'a' : 'button';
          const itemProps = item.href 
            ? { href: item.href }
            : { 
                onClick: () => handleItemClick(item),
                type: 'button' as const
              };

          return (
            <li 
              key={item.id} 
              style={getItemStyle(item, isSelected, isLast)}
              role="listitem"
            >
              <ItemWrapper
                style={getItemContentStyle(item, isSelected)}
                disabled={item.disabled}
                aria-selected={isSelected}
                {...itemProps}
              >
                {/* Leading content - Avatar or Icon */}
                {(item.avatar || item.icon) && (
                  <div style={leadingStyle}>
                    {item.avatar && (
                      <div style={avatarStyle}>
                        {item.avatar}
                      </div>
                    )}
                    {item.icon && !item.avatar && (
                      <div style={iconStyle}>
                        {item.icon}
                      </div>
                    )}
                  </div>
                )}

                {/* Main content */}
                <div style={mainStyle}>
                  <div style={labelStyle}>
                    {item.label}
                  </div>
                  {item.sublabel && (
                    <div style={sublabelStyle}>
                      {item.sublabel}
                    </div>
                  )}
                </div>

                {/* Trailing content - Action or Chevron */}
                <div style={trailingStyle}>
                  {item.action ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {item.action}
                    </div>
                  ) : (
                    onItemClick && !item.disabled && (
                      <div style={chevronStyle}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M5.5 3L10.5 8L5.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        </svg>
                      </div>
                    )
                  )}
                </div>
              </ItemWrapper>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WindowsList; 