export const addToRefs = (el, revealRefs) => {
  if (el && !revealRefs.current.includes(el)) {
    revealRefs.current.push(el);
  }
};
