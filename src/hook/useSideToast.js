import { atom, useRecoilState } from 'recoil';

class SideToastElem {
  constructor(toastMsg, disappearTime, disappearCallback) {
    this.toastMsg = toastMsg;
    this.toastTimeout = setTimeout(() => {
      disappearCallback();
    }, disappearTime);
  }
}
const sideToastState = atom({
  key: 'sideToastState', // unique ID (with respect to other atoms/selectors)
  default: [],
});

/**
 *
 * @returns {[[SideToastElem], (toastMsg: string, disappearTime: string)=>void, (toast: SideToast)=>void]} returns
 */
function useSideToast() {
  const [toast, setToast] = useRecoilState(sideToastState);

  /**
   *
   * @param {string} toastMsg
   * @param {number} disappearTime
   */
  function addToast(toastMsg, disappearTime) {
    const newToast = new SideToastElem(toastMsg, disappearTime || 1000, () => {
      setToast((prev) => {
        const elems = [...prev];
        elems.splice(elems.findIndex((t) => t === newToast));

        return elems;
      });
    });

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

export default useSideToast;
