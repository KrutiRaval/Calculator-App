export default (checkResult) => {
    if(checkResult.includes('--')){
        checkResult = checkResult.replace('--','+')
    }

    if (/^[*+\/]/.test(checkResult)){
        return () => {
          throw new Error('Cannot start the expression with invalid operators')
        }
      }

    return eval(checkResult);
  };

  