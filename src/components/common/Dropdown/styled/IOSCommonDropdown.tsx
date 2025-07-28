import React, { useState, useRef, useEffect } from 'react';
import { DropdownProps, DropdownOption } from '../../types';
import './IOSCommonDropdown.scss';

const ChevronDownIcon = () => (
  <svg className="ios-dropdown__chevron" viewBox="0 0 24 24" fill="none">
    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="ios-dropdown__check" viewBox="0 0 24 24" fill="none">
    <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IOSCommonDropdown: React.FC<DropdownProps> = ({
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
    }, 200);
  };

  const handleClose = () => {
    setAnimationPhase('closed');
    setTimeout(() => {
      setIsOpen(false);
      setSearchTerm('');
    }, 200);
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
        return placeholder || '请选择...';
      }
      if (selectedValue.length === 1) {
        const option = options.find(opt => opt.key === selectedValue[0]);
        return option?.text || selectedValue[0];
      }
      return `已选择 ${selectedValue.length} 项`;
    } else if (!multiSelect && selectedValue) {
      const option = options.find(opt => opt.key === selectedValue);
      return option?.text || selectedValue as string;
    }
    return placeholder || '请选择...';
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
    'ios-dropdown',
    isOpen && 'ios-dropdown--open',
    disabled && 'ios-dropdown--disabled',
    error && 'ios-dropdown--error',
    className
  ].filter(Boolean).join(' ');

  const menuClasses = [
    'ios-dropdown__menu',
    `ios-dropdown__menu--${animationPhase}`,
    searchable && 'ios-dropdown__menu--searchable'
  ].filter(Boolean).join(' ');

  return (
    <div className={dropdownClasses} ref={dropdownRef}>
      {label && (
        <label className={`ios-dropdown__label ${required ? 'ios-dropdown__label--required' : ''}`}>
          {label}
        </label>
      )}
      
      <div
        className="ios-dropdown__trigger"
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
        <span className={`ios-dropdown__text ${!hasValue ? 'ios-dropdown__text--placeholder' : ''}`}>
          {getDisplayText()}
        </span>
        
        <div className="ios-dropdown__actions">
          {clearable && hasValue && (
            <button
              className="ios-dropdown__clear"
              onClick={handleClear}
              type="button"
              aria-label="清除选择"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
          <ChevronDownIcon />
        </div>
      </div>

      {isOpen && (
        <div className={menuClasses} ref={menuRef}>
          {searchable && (
            <div className="ios-dropdown__search">
              <input
                type="text"
                placeholder="搜索选项..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="ios-dropdown__search-input"
                autoFocus
              />
            </div>
          )}
          
          <div className="ios-dropdown__options" role="listbox">
            {filteredOptions.length === 0 ? (
              <div className="ios-dropdown__no-options">
                {searchTerm ? '未找到匹配项' : '暂无选项'}
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.key}
                  className={`ios-dropdown__option ${
                    isOptionSelected(option) ? 'ios-dropdown__option--selected' : ''
                  } ${option.disabled ? 'ios-dropdown__option--disabled' : ''}`}
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
                  <span className="ios-dropdown__option-text">
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
        <div className="ios-dropdown__error" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default IOSCommonDropdown; 