import React from 'react';
import { ListProps, ListItem } from '../../types';
import './IOSCommonList.scss';

const IOSCommonList: React.FC<ListProps> = ({
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

  const containerClasses = [
    'ios-list',
    dense && 'ios-list--dense',
    dividers && 'ios-list--dividers',
    scrollable && 'ios-list--scrollable',
    className
  ].filter(Boolean).join(' ');

  const containerStyle = scrollable && maxHeight ? { maxHeight } : undefined;

  return (
    <div className={containerClasses} style={containerStyle}>
      {subheader && (
        <div className="ios-list__subheader">
          {subheader}
        </div>
      )}
      
      <ul 
        className="ios-list__container"
        role="list"
        aria-label={ariaLabel}
      >
        {items.map((item, index) => {
          const isSelected = selectedItem === item.id;
          const isLast = index === items.length - 1;
          
          const itemClasses = [
            'ios-list__item',
            isSelected && 'ios-list__item--selected',
            item.disabled && 'ios-list__item--disabled',
            !isLast && dividers && 'ios-list__item--divider'
          ].filter(Boolean).join(' ');

          const ItemWrapper = item.href ? 'a' : 'button';
          const itemProps = item.href 
            ? { href: item.href }
            : { 
                onClick: () => handleItemClick(item),
                type: 'button' as const
              };

          return (
            <li key={item.id} className={itemClasses} role="listitem">
              <ItemWrapper
                className="ios-list__item-content"
                disabled={item.disabled}
                aria-selected={isSelected}
                {...itemProps}
              >
                {/* Leading content - Avatar or Icon */}
                {(item.avatar || item.icon) && (
                  <div className="ios-list__leading">
                    {item.avatar && (
                      <div className="ios-list__avatar">
                        {item.avatar}
                      </div>
                    )}
                    {item.icon && !item.avatar && (
                      <div className="ios-list__icon">
                        {item.icon}
                      </div>
                    )}
                  </div>
                )}

                {/* Main content */}
                <div className="ios-list__main">
                  <div className="ios-list__label">
                    {item.label}
                  </div>
                  {item.sublabel && (
                    <div className="ios-list__sublabel">
                      {item.sublabel}
                    </div>
                  )}
                </div>

                {/* Trailing content - Action or Chevron */}
                <div className="ios-list__trailing">
                  {item.action ? (
                    <div className="ios-list__action">
                      {item.action}
                    </div>
                  ) : (
                    onItemClick && !item.disabled && (
                      <div className="ios-list__chevron">
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="currentColor">
                          <path d="M0.5 0.5L6 6L0.5 11.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
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

export default IOSCommonList; 