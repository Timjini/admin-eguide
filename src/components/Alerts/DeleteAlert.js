import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const DeleteAlert = ({ message, status, onClose, onConfirm }) => {
  useEffect(() => {
    if (message && status) {
      Swal.fire({
        icon: status,
        title: status === 'success' ? 'Success' : 'Warning',
        text: message,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          onConfirm(); 
        } else if (result.isDismissed) {
          onClose(); 
        }
      });
    }
  }, [message, status, onClose, onConfirm]);

  return null;
};

export default DeleteAlert;
