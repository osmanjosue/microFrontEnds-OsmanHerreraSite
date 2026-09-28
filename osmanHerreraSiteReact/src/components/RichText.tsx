import React from 'react';
import type { RichText as RichTextValue } from '@shared/content';

// Renderiza un RichText del config compartido (texto + segmentos con formato)
export const RichText: React.FC<{ value: RichTextValue }> = ({ value }) => (
  <>
    {value.map((segment, i) => {
      if (typeof segment === 'string') return <React.Fragment key={i}>{segment}</React.Fragment>;

      const className = [
        segment.highlight && 'color-variant',
        segment.bold && 'font-semibold',
        segment.href && 'underline hover:opacity-85',
      ]
        .filter(Boolean)
        .join(' ');

      return segment.href ? (
        <a key={i} href={segment.href} className={className}>
          {segment.text}
        </a>
      ) : (
        <span key={i} className={className}>
          {segment.text}
        </span>
      );
    })}
  </>
);
