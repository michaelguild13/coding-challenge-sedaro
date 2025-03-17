import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  Root,
  Trigger,
  Overlay,
  Portal,
} from "@radix-ui/react-dialog";
import {
  Button,
  Heading,
  Card,
} from "@radix-ui/themes";
import { useState, useEffect } from "react";

interface DialogProps {
  children: React.ReactNode;
  buttonLabel: string;
  headingLabel: string;
  open?: boolean; // Prop to control the dialog from outside
}

export const DialogSimple: React.FC<DialogProps> = ({
  children,
  buttonLabel,
  headingLabel,
  open = false
}) => {
  const [isOpen, setIsOpen] = useState(open);
  
  // Update internal state when prop changes
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Root open={isOpen} onOpenChange={setIsOpen}>
      <Trigger asChild>
        <Button>{buttonLabel}</Button>
      </Trigger>

      
        {isOpen && (
          <Overlay style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            inset: 0,
            zIndex: 50
          }} />
        )}
        
        <DialogContent
          style={{
            maxWidth: "450px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 100,
            background: "transparent",
            border: "none",
            outline: "none",
          }}
          onEscapeKeyDown={() => setIsOpen(false)}
          onPointerDownOutside={() => setIsOpen(false)}
        >
          <Card style={{ background: 'black' }}>
            <Button 
              onClick={() => setIsOpen(false)} 
              size="2" 
              style={{ position: "absolute", right: '10px' }}
            >
              X
            </Button>
            <DialogTitle>
              {headingLabel}
            </DialogTitle>
            {/* <DialogDescription> error for P decendant of P */}
              {children}
            {/* </DialogDescription> */}
          </Card>
        </DialogContent>
      
    </Root>
  );
};