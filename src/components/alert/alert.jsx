import { useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Swal from "sweetalert2";

export const showMessage = (msg = "", type = "success") => {
  const dispatch = useDispatch();

  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    customClass: { container: "toast" },
  });
  toast.fire({
    icon: type,
    title: msg,
    padding: "10px",
  });

  dispatch({
    type: GLOBALTYPES.ALERT,
    payload: {
      loading: false,
    },
  });
};
