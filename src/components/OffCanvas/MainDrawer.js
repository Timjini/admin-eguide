import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import {
Button,
} from "@material-tailwind/react";
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses,StyledInput } from '@mui/base/Input';
import { styled } from '@mui/system';

export default function MainDrawer({ activeDrawer, additionalComponent: AdditionalComponent, title }) {
  const [state, setState] = React.useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 'auto' }}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
         <div className='flex flex-row justify-between p-4'>
            <h3>{title}</h3>
            <button onClick={toggleDrawer(anchor, false)}>
                <span className="material-symbols-outlined">
                close
                </span>
            </button>
        </div>
        <div className='form-container p-10'>
       
                <AdditionalComponent />

        </div>


    </Box>
  );

  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Button 
            className={activeDrawer === anchor ? "flex items-center gap-3 mb-2 primaryBtn" : ""}
            id={activeDrawer === anchor ? " active" : "disactivate"}
            size="sm" 
            onClick={toggleDrawer(anchor, true)}>
              <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> {title}
      </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
