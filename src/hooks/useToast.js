import { atom, useRecoilState } from 'recoil';
import { v4 } from 'uuid';

export class ToastElem {
  constructor(toastMsg, disappearTime) {
    this.toastMsg = toastMsg;
    this.index = v4();

    this.disappearTime = disappearTime;
  }

  /**
   *
   * @param {()=>void} callback
   */
  setBeforeDisappear(callback) {
    this.beforeDisappear = callback;
  }
}

const toastState = atom({
  key: 'toastState',
  default: [],
});

/**
 *
 * @returns {[[ToastElem], (toastMsg: string, disappearTime: string)=>void, (toast: Toast)=>void]} returns
 */
function useToast() {
  const [toast, setToast] = useRecoilState(toastState);

  /**
   *
   * @param {string} toastMsg
   * @param {number} disappearTime
   */
  function addToast(toastMsg, disappearTime) {
    const newToast = new ToastElem(toastMsg, disappearTime || 1000);

    setTimeout(() => {
      setToast((prev) => {
        const elems = [...prev];
        elems.splice(
          elems.findIndex((t) => t === newToast),
          1,
        );

        return elems;
      });
    }, disappearTime);

    setToast((prev) => [...prev, newToast]);
  }

  function deleteToast(toast) {
    setToast((prev) => {
      const elems = [...prev];
      elems.splice(
        elems.findIndex((t) => t === toast),
        1,
      );

      return elems;
    });
  }

  return [toast, addToast, deleteToast];
}

export default useToast;
