export function throttle(f, delay = 100) {
    let timerFlag = null;
    let lastThrottledArgs = null;

    return (...args) => {
        if (timerFlag === null) {
            f(...args);
            timerFlag = setTimeout(() => {
                timerFlag = null;
                // If we skipped a call, call it after the delay
                // So that the last call always goes through
                if (lastThrottledArgs !== null) {
                    f(...lastThrottledArgs);
                    lastThrottledArgs = null;
                }
            }, delay);
        } else {
            lastThrottledArgs = args;
        }
    };
}
