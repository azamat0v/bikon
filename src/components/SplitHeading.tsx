import type { CSSProperties } from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export default function SplitHeading({
  text,
  style,
  delay = 0,
}: {
  text: string;
  style?: CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} style={style}>
      {text.split('\n').map((line, i) => (
        <div key={i} style={{ overflow: 'hidden', display: 'block', paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: '110%' }}
            animate={isInView ? { y: '0%' } : { y: '110%' }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.13,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </div>
      ))}
    </div>
  );
}
