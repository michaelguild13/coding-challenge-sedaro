import React from 'react';
import { Button, Text } from '@radix-ui/themes';

export const Drawer: React.FC<{ open?: boolean; children?: React.ReactNode }> = ({ children, open = false }) => {
  const [isOpen, setIsOpen] = React.useState(open);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const drawerRootStyles: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
  };

  const drawerContentStyles: React.CSSProperties = {
    position: 'fixed' as React.CSSProperties['position'],
    top: 70,
    left: 0,
    height: '100%',
    width: '300px',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    opacity: isOpen ? 1 : 0.95,
    transition: 'all 500ms ease-out',
  };

  const contentInnerStyles = {
    padding: '16px',
  };

  const drawerHeadingStyles = {
    marginBottom: '1rem',
  };

  const drawerTriggerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 80,
    left: isOpen ? '200px' : 0,
    padding: '8px',
    cursor: 'pointer',
    transition: 'all 500ms ease-out',
  };

  const navigationMenuItemStyles = {
    marginBottom: '8px',
    padding: '8px',
    cursor: 'pointer',
  };

  return (
    <div style={drawerRootStyles}>
      {/* Drawer content */}
      <div style={drawerContentStyles}>
        {children}
      </div>
      
      {/* Toggle tab */}
      <Button style={drawerTriggerStyles} onClick={toggleDrawer}>
        <Text>{isOpen ? 'Collapse' : 'New Simulation'}</Text>
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </Button>
    </div>
  );
};