import { useFetchSubThemeCapsulesWithProgress } from '@/src/features/sub-theme-capsule/hooks/use-fetch-sub-theme-capsules-with-progress';
import { SubThemeCapsuleWithProgress } from '@/src/features/sub-theme-capsule/types/sub-theme-capsule-with-progress.types';
import { createContext, ReactNode, useCallback, useContext } from 'react';

type SubThemesProviderProps = {
    children: ReactNode;
};

type SubThemesContextReturn = {
    getSubThemesWithProgressByCodes: (codes: string[]) => SubThemeCapsuleWithProgress[];
    isLoading: boolean;
}

const SubThemesContext = createContext<SubThemesContextReturn | undefined>(
    undefined,
);

export function SubThemesProvider({ children }: SubThemesProviderProps) {
    const {
        data: subThemesWithProgress = [],
        isLoading,
    } = useFetchSubThemeCapsulesWithProgress();

    const getSubThemesWithProgressByCodes = useCallback((codes: string[]): SubThemeCapsuleWithProgress[] => {
        return subThemesWithProgress.filter(
            subThemeWithProgress => codes.includes(subThemeWithProgress.subThemeCapsule.code)
        ) ?? [];
    }, [subThemesWithProgress]);

    return (
        <SubThemesContext.Provider
            value={{
                getSubThemesWithProgressByCodes,
                isLoading,
            }}
        >
            {children}
        </SubThemesContext.Provider>
    );
}

export function useSubThemes() {
    const ctx = useContext(SubThemesContext);
    if (!ctx) {
        throw new Error('useSubThemes must be used inside <SubThemesProvider>');
    }
    return ctx;
}
