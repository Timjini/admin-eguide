// SweetAlert.js

import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const Alert = ({ message, status, onClose }) => {
  useEffect(() => {
    if (message && status) {
      Swal.fire({
        icon: status,
        title: status === 'success' ? 'Success' : 'Error',
        text: message,
        showConfirmButton: false,
        timer: 1500, // You can adjust the time the message is displayed
      }).then(() => {
        // Execute the onClose callback if provided
        if (onClose && typeof onClose === 'function') {
          onClose();
        }
      });
    }
  }, [message, status, onClose]);

  return null; // This component doesn't render anything in the DOM
};

export default Alert;
