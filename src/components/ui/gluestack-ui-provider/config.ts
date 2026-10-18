import { tokens } from '@/designTokens';

const { colors, fonts } = tokens;

const shared = {
    '--primary': colors.text.primary,
    '--primary-foreground': colors.text.primaryDark,
    '--secondary': colors.text.secondary,
    '--secondary-foreground': colors.text.secondaryDark,
    '--ring': colors.text.primary,
    '--destructive': '#dc2626',
    '--destructive-foreground': colors.surface.light,
    '--app-font-body': fonts.text,
    '--app-font-heading': fonts.title,
    '--app-font-subtitle': fonts.subtitle,
    '--app-font-third-title': fonts.thirdTitle,
};

export const config = {
    light: {
        ...shared,
        '--background': colors.surface.normal,
        '--foreground': colors.text.primaryDark,
        '--border': colors.surface.dark,
        '--input': colors.surface.light,
        '--muted': colors.surface.dark,
        '--muted-foreground': colors.text.secondaryDark,
        '--accent': colors.surface.dark,
        '--accent-foreground': colors.text.primaryDark,
        '--popover': colors.surface.light,
        '--popover-foreground': colors.text.primaryDark,
        '--card': colors.surface.light,
        '--card-foreground': colors.text.primaryDark,
    },
    dark: {
        ...shared,
        '--background': colors.text.primaryDark,
        '--foreground': colors.surface.normal,
        '--border': `${colors.surface.dark}33`,
        '--input': colors.text.secondaryDark,
        '--muted': colors.text.secondaryDark,
        '--muted-foreground': colors.surface.dark,
        '--accent': colors.text.secondaryDark,
        '--accent-foreground': colors.surface.normal,
        '--popover': colors.text.secondaryDark,
        '--popover-foreground': colors.surface.normal,
        '--card': colors.text.secondaryDark,
        '--card-foreground': colors.surface.normal,
    },
};
