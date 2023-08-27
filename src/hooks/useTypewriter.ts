import { useState, useEffect } from 'react';

export default function useTypewriter(typeString: string | string[]) {
  const [printingIndex, changePrintingIndex] = useState(0);
  const [printedLen, changePrintedLen] = useState(0);
  const [printMore, togglePrintMore] = useState(true);
  const [printedStr, setPrintedStr] = useState('');

  useEffect(() => {
    const printJobs = setInterval(() => {
      if (typeof typeString === 'string') {
        // print single string
        if (printingIndex <= typeString.length) {
          changePrintingIndex((preLen) => preLen + 1);
          setPrintedStr(typeString.slice(0, printingIndex));
        } else clearInterval(printJobs);
      } else {
        // print string array
        // eslint-disable-next-line no-lonely-if
        if (printingIndex <= typeString[printedLen].length && printMore) {
          // print more
          changePrintingIndex((preLen) => preLen + 1);
          setPrintedStr(typeString[printedLen].slice(0, printingIndex));
        } else if (printingIndex > -1 && !printMore && printedLen < typeString.length - 1) {
          // than print less
          changePrintingIndex((preLen) => preLen - 1);
          setPrintedStr(typeString[printedLen].slice(0, printingIndex));
        } else if (printingIndex === -1 && !printMore && printedLen < typeString.length - 1) {
          changePrintedLen((preLen) => preLen + 1);
          togglePrintMore(true);
          changePrintingIndex(0);
        } else if (printingIndex > typeString[printedLen].length) {
          togglePrintMore(false);
          changePrintingIndex((preLen) => preLen - 1);
        } else clearInterval(printJobs);
      }
    }, 150);
    return () => {
      clearInterval(printJobs);
    };
  }, [printingIndex]);
  return {
    printedStr,
  };
}
