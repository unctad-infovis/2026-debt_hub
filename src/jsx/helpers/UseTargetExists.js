import { useEffect, useState } from 'react';

// Every section is its own embeddable entry, so a jump link may point at a section that is
// not on the current page (standalone entry, or not yet rendered). Mirrors ButtonAnchor's
// existence check so such links stay hidden instead of doing nothing.
const useTargetExists = target => {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    const check = () => setExists(!!document.querySelector(target));
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
    // biome-ignore lint/correctness/useExhaustiveDependencies: false positive, `target` is a stable string argument
  }, [target]);

  return exists;
};

export default useTargetExists;
