

## Disable SquishyCard Animation on Mobile

**File:** `src/components/SquishyCard.tsx` -- one small change to skip entrance animation on mobile.

### Change

Detect mobile viewport at the top of the component and conditionally disable framer-motion entrance animation while keeping the hover CSS effect.

### Updated code

```tsx
import React from 'react';
import { motion } from 'framer-motion';

interface SquishyCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const SquishyCard: React.FC<SquishyCardProps> = ({ children, className = '', delay = 0 }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, y: 16 }}
      whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={isMobile ? undefined : { duration: 0.3, delay, ease: 'easeOut' }}
      className={`hover:-translate-y-2 transition-transform duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default SquishyCard;
```

### What changes
- Component becomes a function body (not arrow expression) so we can add the `isMobile` check
- `isMobile` reads `window.innerWidth < 768` at render time -- no state/effect needed since it's a snapshot check
- `initial={false}` on mobile tells framer-motion to skip the initial animation entirely
- `whileInView` and `transition` are `undefined` on mobile, so no animation runs
- Hover CSS effect (`hover:-translate-y-2`) remains on all devices
- No other files or styling changes

