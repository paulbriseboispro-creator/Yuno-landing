"use client";

import {
  useState,
  useRef,
  useEffect,
  useId,
  useMemo,
  useCallback,
  type ChangeEvent,
} from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function GooeyFilter({ filterId, blur }: { filterId: string; blur: number }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  );
}

function SearchIcon({ layoutId, size = 16 }: { layoutId: string; size?: number }) {
  return (
    <motion.svg
      layoutId={layoutId}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </motion.svg>
  );
}

const transition = {
  duration: 0.4,
  type: "spring" as const,
  bounce: 0.25,
};


export interface GooeyInputClassNames {
  root?: string;
  filterWrap?: string;
  buttonRow?: string;
  trigger?: string;
  input?: string;
  bubble?: string;
  bubbleSurface?: string;
}

export interface GooeyInputProps {
  placeholder?: string;
  label?: string;
  className?: string;
  classNames?: GooeyInputClassNames;
  collapsedWidth?: number;
  expandedWidth?: number;
  expandedOffset?: number;
  gooeyBlur?: number;
  height?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

export function GooeyInput({
  placeholder = "Type to search...",
  label = "Search",
  className,
  classNames,
  collapsedWidth = 115,
  expandedWidth = 200,
  expandedOffset = 50,
  gooeyBlur = 5,
  height = 40,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onOpenChange,
  disabled = false,
}: GooeyInputProps) {
  const reactId = useId();
  const safeId = reactId.replace(/:/g, "");
  const filterId = `gooey-filter-${safeId}`;
  const iconLayoutId = `gooey-input-icon-${safeId}`;
  const inputLayoutId = `gooey-input-field-${safeId}`;

  const inputRef = useRef<HTMLInputElement>(null);
  const prevExpandedRef = useRef(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const isControlled = valueProp !== undefined;
  const searchText = isControlled ? valueProp : uncontrolledValue;

  const setSearchText = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const setExpanded = useCallback(
    (next: boolean) => {
      setIsExpanded(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    } else if (prevExpandedRef.current) {
      setSearchText("");
    }
    prevExpandedRef.current = isExpanded;
  }, [isExpanded, setSearchText]);

  const buttonVariants = useMemo(
    () => ({
      collapsed: { width: collapsedWidth, marginLeft: 0 },
      expanded: { width: expandedWidth, marginLeft: expandedOffset },
    }),
    [collapsedWidth, expandedWidth, expandedOffset],
  );

  const iconVariants = useMemo(
    () => ({
      collapsed: { scale: 0, opacity: 0, width: 0, marginRight: -8 },
      expanded: { scale: 1, opacity: 1, width: height, marginRight: 0 },
    }),
    [height],
  );

  const handleExpand = useCallback(() => {
    if (!disabled) setExpanded(true);
  }, [disabled, setExpanded]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    [setSearchText],
  );

  const handleBlur = useCallback(() => {
    if (!searchText) setExpanded(false);
  }, [searchText, setExpanded]);

  const surfaceClass =
    "bg-foreground text-background shadow-sm ring-1 ring-border/60";

  return (
    <div className={cn("relative inline-flex items-center", className, classNames?.root)}>
      <GooeyFilter filterId={filterId} blur={gooeyBlur} />

      <div
        className={cn("relative", classNames?.filterWrap)}
        style={{ filter: `url(#${filterId})` }}
      >
        <div
          className={cn(
            "flex items-center gap-2",
            classNames?.buttonRow,
          )}
        >
          {/* Icon bubble */}
          <motion.div
            layoutId={iconLayoutId}
            variants={iconVariants}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            transition={transition}
            style={{ height }}
            className={cn(
              "flex items-center justify-center rounded-full",
              surfaceClass,
              classNames?.bubble,
              classNames?.bubbleSurface,
            )}
          >
            <SearchIcon layoutId={`${iconLayoutId}-svg`} size={Math.round(height * 0.6)} />
          </motion.div>

          {/* Main bubble — collapsed = trigger, expanded = input */}
          <motion.div
            layoutId={inputLayoutId}
            variants={buttonVariants}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            transition={transition}
            style={{ height }}
            className={cn(
              "flex items-center justify-center rounded-full px-4",
              surfaceClass,
              classNames?.bubble,
              classNames?.bubbleSurface,
            )}
          >
            {!isExpanded ? (
              <button
                type="button"
                onClick={handleExpand}
                disabled={disabled}
                className={cn(
                  "flex h-full w-full items-center justify-center gap-2 text-sm font-medium outline-none",
                  classNames?.trigger,
                )}
              >
                <svg
                  width={Math.round(height * 0.55)}
                  height={Math.round(height * 0.55)}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ flexShrink: 0 }}
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <span>{label}</span>
              </button>
            ) : (
              <input
                ref={inputRef}
                type="text"
                value={searchText}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "h-full w-full bg-transparent text-sm outline-none placeholder:text-background/50",
                  classNames?.input,
                )}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
