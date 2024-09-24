import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Rules = () => {
  const rulesRef = useRef<HTMLDialogElement>(null);
  const [isShowRules, setIsShowRule] = useState(false);
  useEffect(() => {
    if (rulesRef.current !== null) {
      rulesRef.current.showModal();
    }
  }, [isShowRules]);
  const handleClose = () => {
    if (rulesRef.current !== null) {
      rulesRef.current.close();
      setIsShowRule(false);
    }
  };
  return (
    <>
      <dialog ref={rulesRef} className="fixed max-w-sm w-full z-10 rounded-md">
        <section className="w-full h-full p-3">
          <div className="w-full flex justify-between">
            <h1 className="uppercase text-2xl font-bold">Rules</h1>
            <button>
              <kbd
                autoFocus={true}
                className="p-1 border rounded-md "
                onClick={handleClose}
              >
                esc
              </kbd>
            </button>
          </div>
          <div className="pt-2">
            <Image
              src="/images/image-rules.svg"
              alt="rock-paper-scissors rules"
              width={500}
              height={500}
            />
          </div>
        </section>
      </dialog>
      <button
        onClick={() => {
          setIsShowRule(true);
        }}
        className=" text-[hsl(214,47%,23%)] fixed bottom-3 right-3 bg-white uppercase font-semibold text-xl p-2 rounded-md"
      >
        Rules
      </button>
    </>
  );
};

export default Rules;
