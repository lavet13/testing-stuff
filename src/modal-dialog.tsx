import { FC, useEffect, useRef, PropsWithChildren } from "react";

type ModalDialog = {
  isOpen: boolean;
};

const ModalDialog: FC<PropsWithChildren<ModalDialog>> = ({
  isOpen,
  children,
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    console.log("effect");
    if (!isOpen) return;

    const dialog = ref.current;
    dialog?.showModal();

    return () => {
      console.log("cleanup");
      dialog?.close();
    };
  }, [isOpen]);

  return <dialog ref={ref}>{children}</dialog>;
};

export default ModalDialog;
