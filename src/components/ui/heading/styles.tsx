import { isWeb, tva } from '@gluestack-ui/utils/nativewind-utils';
const baseStyle = isWeb
    ? 'font-heading bg-transparent border-0 box-border display-inline list-none margin-0 padding-0 position-relative text-start no-underline whitespace-pre-wrap word-wrap-break-word'
    : '';

export const headingStyle = tva({
    base: `text-foreground font-heading font-normal my-0 ${baseStyle}`,
    variants: {
        isTruncated: {
            true: 'truncate',
        },
        bold: {
            true: 'font-bold',
        },
        underline: {
            true: 'underline',
        },
        strikeThrough: {
            true: 'line-through',
        },
        sub: {
            true: 'text-xs',
        },
        italic: {
            true: 'italic',
        },
        highlight: {
            true: 'bg-yellow-500',
        },
        size: {
            '5xl': 'text-6xl',
            '4xl': 'text-5xl',
            '3xl': 'text-4xl',
            '2xl': 'text-3xl',
            xl: 'text-2xl font-subtitle',
            lg: 'text-xl font-subtitle',
            md: 'text-lg font-third-title',
            sm: 'text-base font-third-title',
            xs: 'text-sm font-third-title',
        },
    },
});
