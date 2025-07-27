import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Divider,
  Paper,
  Box
} from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { ListProps, ListItem as CommonListItem } from '../../types';

const MaterialList: React.FC<ListProps> = ({
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
  const handleItemClick = (item: CommonListItem) => {
    if (!item.disabled && onItemClick) {
      onItemClick(item);
    }
  };

  const listContainerProps = {
    ...(scrollable && maxHeight && {
      sx: {
        maxHeight,
        overflow: 'auto',
      }
    })
  };

  return (
    <Paper 
      elevation={1} 
      className={className}
      sx={{ 
        borderRadius: 2,
        overflow: 'hidden',
        ...listContainerProps.sx
      }}
    >
      <List
        dense={dense}
        aria-label={ariaLabel}
        subheader={
          subheader ? (
            <ListSubheader
              sx={{
                backgroundColor: 'background.default',
                fontWeight: 600,
                fontSize: '0.75rem',
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                borderBottom: dividers ? 1 : 0,
                borderColor: 'divider',
              }}
            >
              {subheader}
            </ListSubheader>
          ) : undefined
        }
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          padding: 0,
        }}
      >
        {items.map((item, index) => {
          const isSelected = selectedItem === item.id;
          const isLast = index === items.length - 1;

          const itemContent = (
            <>
              {/* Leading content - Avatar or Icon */}
              {item.avatar && (
                <ListItemAvatar>
                  <Box
                    sx={{
                      width: dense ? 32 : 40,
                      height: dense ? 32 : 40,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'grey.100',
                    }}
                  >
                    {item.avatar}
                  </Box>
                </ListItemAvatar>
              )}
              
              {item.icon && !item.avatar && (
                <ListItemIcon
                  sx={{
                    minWidth: dense ? 36 : 40,
                    color: 'primary.main',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              )}

              {/* Main content */}
              <ListItemText
                primary={item.label}
                secondary={item.sublabel}
                primaryTypographyProps={{
                  fontSize: dense ? '0.875rem' : '1rem',
                  fontWeight: 400,
                  noWrap: true,
                }}
                secondaryTypographyProps={{
                  fontSize: dense ? '0.75rem' : '0.875rem',
                  noWrap: true,
                }}
              />

              {/* Trailing content - Action or Chevron */}
              {item.action ? (
                <Box sx={{ ml: 1 }}>
                  {item.action}
                </Box>
              ) : (
                onItemClick && !item.disabled && (
                  <ChevronRightIcon 
                    sx={{ 
                      color: 'action.active',
                      fontSize: 20,
                    }} 
                  />
                )
              )}
            </>
          );

          const listItemProps = {
            key: item.id,
            disabled: item.disabled,
            selected: isSelected,
            ...(item.href && { component: 'a', href: item.href }),
          };

          return (
            <React.Fragment key={item.id}>
              <ListItem
                disablePadding
                {...listItemProps}
              >
                {item.href ? (
                  <ListItemButton
                    component="a"
                    href={item.href}
                    disabled={item.disabled}
                    selected={isSelected}
                    sx={{
                      px: dense ? 1.5 : 2,
                      py: dense ? 0.5 : 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.action.selected',
                        '&:hover': {
                          bgcolor: 'primary.action.hover',
                        },
                      },
                    }}
                  >
                    {itemContent}
                  </ListItemButton>
                ) : (
                  <ListItemButton
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    selected={isSelected}
                    sx={{
                      px: dense ? 1.5 : 2,
                      py: dense ? 0.5 : 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.action.selected',
                        '&:hover': {
                          bgcolor: 'primary.action.hover',
                        },
                      },
                    }}
                  >
                    {itemContent}
                  </ListItemButton>
                )}
              </ListItem>
              
              {/* Divider */}
              {dividers && !isLast && (
                <Divider 
                  variant="inset" 
                  component="li"
                  sx={{
                    ml: (item.avatar || item.icon) ? (dense ? 5 : 6) : 0,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
};

export default MaterialList; 