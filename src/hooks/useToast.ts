import { useCallback } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";

type ToastPosition = "top" | "bottom";

export const useToast = () => {
  const showToast = useCallback(
    (
      icon: SweetAlertIcon,
      title: string,
      description?: string,
      position: ToastPosition = "bottom"
    ) => {
      Swal.fire({
        icon: icon,
        title: title,
        text: description,
        toast: true,
        timer: 2000,
        position,
        showConfirmButton: false,
      });
    },
    []
  );

  const showToastError = useCallback(
    (title: string, description?: string, position?: ToastPosition) => {
      showToast("error", title, description, position);
    },
    [showToast]
  );

  const showToastSuccess = useCallback(
    (title: string, description?: string, position?: ToastPosition) => {
      showToast("success", title, description, position);
    },
    [showToast]
  );

  const showToastInfo = useCallback(
    (title: string, description?: string, position?: ToastPosition) => {
      showToast("info", title, description, position);
    },
    [showToast]
  );

  const showToastWithOptions = useCallback(
    ({ ...args }, icon?: SweetAlertIcon) => {
      Swal.fire({
        toast: args.toast,
        iconHtml: icon,
        position: args?.position || "center",
        title: args.title,
        text: args.text,
        html: args.html,
        showCloseButton: args.showCloseButton !== false,
        showConfirmButton: !!args.confirmButtonText,
        showCancelButton: !!args.cancelButtonText,
        confirmButtonText: args.confirmButtonText,
        cancelButtonText: args.cancelButtonText,
        buttonsStyling: false,
        timer: args.timer,
        customClass: {
          ...args.customClass,
        },
      }).then((result) => {
        if (args?.clickConfirm && result.isConfirmed) {
          args.clickConfirm();
          args.clickClose();
        } else if (
          args?.clickCancel &&
          result.dismiss === Swal.DismissReason.cancel
        ) {
          args.clickCancel();
          args.clickClose();
        } else if (
          args?.clickClose &&
          (Swal.DismissReason.close || result.isDismissed)
        ) {
          args.clickClose();
        }
      });
    },
    []
  );

  return {
    showToastError,
    showToastSuccess,
    showToastInfo,
    showToastWithOptions,
  };
};
