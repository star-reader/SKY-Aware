import React, { useState, useRef, useEffect } from 'react';
import { DropdownProps, DropdownOption } from '../../types';
import './MacOSCommonDropdown.scss';

const ChevronDownIcon = () => (
  <svg className="macos-dropdown__chevron" viewBox="0 0 24 24" fill="none">
    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="macos-dropdown__check" viewBox="0 0 24 24" fill="none">
    <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MacOSCommonDropdown: React.FC<DropdownProps> = ({
  options,
  value,
  defaultValue,
  placeholder,
  disabled = false,
  multiSelect = false,
  searchable = false,
  clearable = false,
  label,
  error = false,
  errorMessage,
  required = false,
  onSelectionChange,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | string[]>(
    value || defaultValue || (multiSelect ? [] : '')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [animationPhase, setAnimationPhase] = useState<'closed' | 'expanding' | 'open'>('closed');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 同步外部 value 变化
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleOpen = () => {
    if (disabled) return;
    
    setIsOpen(true);
    setAnimationPhase('expanding');
    
    setTimeout(() => {
      setAnimationPhase('open');
    }, 100);
  };

  const handleClose = () => {
    setAnimationPhase('closed');
    setTimeout(() => {
      setIsOpen(false);
      setSearchTerm('');
    }, 80);
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const handleOptionClick = (option: DropdownOption) => {
    if (option.disabled) return;

    let newValue: string | string[];
    let selectedOptions: DropdownOption | DropdownOption[];

    if (multiSelect) {
      const currentArray = Array.isArray(selectedValue) ? selectedValue : [];
      if (currentArray.includes(option.key)) {
        newValue = currentArray.filter(v => v !== option.key);
      } else {
        newValue = [...currentArray, option.key];
      }
      selectedOptions = options.filter(opt => (newValue as string[]).includes(opt.key));
    } else {
      newValue = option.key;
      selectedOptions = option;
      handleClose();
    }

    setSelectedValue(newValue);
    onSelectionChange?.(selectedOptions, newValue);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = multiSelect ? [] : '';
    setSelectedValue(newValue);
    onSelectionChange?.(undefined, newValue);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 过滤选项
  const filteredOptions = searchable && searchTerm
    ? options.filter(option => 
        option.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // 获取显示文本
  const getDisplayText = (): string => {
    if (multiSelect && Array.isArray(selectedValue)) {
      if (selectedValue.length === 0) {
        return placeholder || 'Choose an item...';
      }
      if (selectedValue.length === 1) {
        const option = options.find(opt => opt.key === selectedValue[0]);
        return option?.text || selectedValue[0];
      }
      return `${selectedValue.length} items selected`;
    } else if (!multiSelect && selectedValue) {
      const option = options.find(opt => opt.key === selectedValue);
      return option?.text || selectedValue as string;
    }
    return placeholder || 'Choose an item...';
  };

  // 检查选项是否被选中
  const isOptionSelected = (option: DropdownOption): boolean => {
    if (multiSelect && Array.isArray(selectedValue)) {
      return selectedValue.includes(option.key);
    }
    return selectedValue === option.key;
  };

  const hasValue = multiSelect 
    ? Array.isArray(selectedValue) && selectedValue.length > 0
    : Boolean(selectedValue);

  const dropdownClasses = [
    'macos-dropdown',
    isOpen && 'macos-dropdown--open',
    disabled && 'macos-dropdown--disabled',
    error && 'macos-dropdown--error',
    className
  ].filter(Boolean).join(' ');

  const menuClasses = [
    'macos-dropdown__menu',
    `macos-dropdown__menu--${animationPhase}`,
    searchable && 'macos-dropdown__menu--searchable'
  ].filter(Boolean).join(' ');

  return (
    <div className={dropdownClasses} ref={dropdownRef}>
      {label && (
        <label className={`macos-dropdown__label ${required ? 'macos-dropdown__label--required' : ''}`}>
          {label}
        </label>
      )}
      
      <div
        className="macos-dropdown__trigger"
        onClick={handleToggle}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel || label}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          } else if (e.key === 'Escape' && isOpen) {
            handleClose();
          }
        }}
      >
        <span className={`macos-dropdown__text ${!hasValue ? 'macos-dropdown__text--placeholder' : ''}`}>
          {getDisplayText()}
        </span>
        
        <div className="macos-dropdown__actions">
          {clearable && hasValue && (
            <button
              className="macos-dropdown__clear"
              onClick={handleClear}
              type="button"
              aria-label="Clear selection"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
          <ChevronDownIcon />
        </div>
      </div>

      {isOpen && (
        <div className={menuClasses} ref={menuRef}>
          {searchable && (
            <div className="macos-dropdown__search">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="macos-dropdown__search-input"
                autoFocus
              />
            </div>
          )}
          
          <div className="macos-dropdown__options" role="listbox">
            {filteredOptions.length === 0 ? (
              <div className="macos-dropdown__no-options">
                {searchTerm ? 'No matching items' : 'No items available'}
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.key}
                  className={`macos-dropdown__option ${
                    isOptionSelected(option) ? 'macos-dropdown__option--selected' : ''
                  } ${option.disabled ? 'macos-dropdown__option--disabled' : ''}`}
                  onClick={() => handleOptionClick(option)}
                  role="option"
                  aria-selected={isOptionSelected(option)}
                  tabIndex={option.disabled ? -1 : 0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOptionClick(option);
                    }
                  }}
                >
                  <span className="macos-dropdown__option-text">
                    {option.text}
                  </span>
                  {isOptionSelected(option) && (
                    <CheckIcon />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {error && errorMessage && (
        <div className="macos-dropdown__error" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default MacOSCommonDropdown;