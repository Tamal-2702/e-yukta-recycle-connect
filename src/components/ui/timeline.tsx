
import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Timeline.displayName = "Timeline";

interface TimelineItemProps {
  children: React.ReactNode;
  className?: string;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative pl-6", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

interface TimelineConnectorProps {
  className?: string;
}

const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("absolute top-5 left-2.5 bottom-0 w-0.5 -ml-px bg-muted", className)}
        {...props}
      />
    );
  }
);
TimelineConnector.displayName = "TimelineConnector";

interface TimelineHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center h-5", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineHeader.displayName = "TimelineHeader";

interface TimelineIconProps {
  children?: React.ReactNode;
  className?: string;
}

const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute left-0 flex items-center justify-center w-5 h-5 rounded-full border bg-background",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineIcon.displayName = "TimelineIcon";

interface TimelineBodyProps {
  children: React.ReactNode;
  className?: string;
}

const TimelineBody = React.forwardRef<HTMLDivElement, TimelineBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("pt-1 pb-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineBody.displayName = "TimelineBody";

interface TimelineTitleProps {
  children: React.ReactNode;
  className?: string;
}

const TimelineTitle = React.forwardRef<HTMLParagraphElement, TimelineTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm font-semibold", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
TimelineTitle.displayName = "TimelineTitle";

interface TimelineDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const TimelineDescription = React.forwardRef<HTMLDivElement, TimelineDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineDescription.displayName = "TimelineDescription";

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  TimelineTitle,
  TimelineDescription,
};
