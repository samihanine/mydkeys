import { cn } from '../lib/utils';
import * as React from 'react';

export const H1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1
      {...props}
      className={cn('scroll-m-20 text-3xl font-semibold tracking-tight text-foreground', props.className)}
    />
  );
};

export const H2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2
      {...props}
      className={cn('scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 text-foreground', props.className)}
    />
  );
};

export const H3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      {...props}
      className={cn('scroll-m-20 text-xl font-semibold tracking-tight text-foreground', props.className)}
    />
  );
};

export const H4 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h4
      {...props}
      className={cn('scroll-m-20 text-lg font-semibold tracking-tight text-foreground', props.className)}
    />
  );
};

export const Lead = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <p {...props} className={cn('text-base text-muted-foreground', props.className)} />;
};

export const P = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <p {...props} className={cn('leading-7 [&:not(:first-child)]:mt-6 text-foreground', props.className)} />;
};

export const Large = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={cn('text-lg font-semibold text-foreground', props.className)} />;
};

export const Small = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <p {...props} className={cn('text-sm font-medium leading-none text-foreground', props.className)} />;
};

export const Muted = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span {...props} className={cn('text-sm text-muted-foreground', props.className)} />;
};

export const InlineCode = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground',
        props.className
      )}
    />
  );
};

export const MultilineCode = (props: React.HTMLAttributes<HTMLPreElement>) => {
  return (
    <pre
      {...props}
      className={cn(
        'relative rounded bg-muted p-4 font-mono text-sm font-semibold overflow-x-auto text-foreground',
        props.className
      )}
    />
  );
};

export const List = (props: React.HTMLAttributes<HTMLUListElement>) => {
  return <ul {...props} className={cn('my-6 ml-6 list-disc [&>li]:mt-2', props.className)} />;
};

export const Quote = (props: React.HTMLAttributes<HTMLQuoteElement>) => {
  return <blockquote {...props} className={cn('mt-6 border-l-2 pl-6 italic text-muted-foreground', props.className)} />;
};

export const Strong = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span {...props} className={cn('font-semibold text-foreground', props.className)} />;
};
