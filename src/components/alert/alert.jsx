import Swal from "sweetalert2";

export const showMessage = (msg = '', type = 'success') => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        customClass: {container: 'toast'},
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px'
    });
};