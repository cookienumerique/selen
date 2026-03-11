import { Colors } from '@/src/constants/theme';
import React from 'react';
import Svg, { Circle } from 'react-native-svg';

type ProgressRingProps = {
    total: number;
    currentValue: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
};

export const ProgressRing = ({
    total,
    currentValue,
    size = 40,
    strokeWidth = 3,
    color = Colors.linenCloud,
}: ProgressRingProps) => {
    // 1. Calculs géométriques de base
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    // 2. Calcul du ratio (entre 0 et 1)
    // On ajoute Math.min/max pour éviter que la barre ne dépasse 100% ou soit négative
    const progress = total > 0 ? Math.min(Math.max(currentValue / total, 0), 1) : 0;

    // 3. Calcul de l'offset (la partie "vide" du cercle)
    const strokeDashoffset = circumference - (progress * circumference);

    return (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Cercle d'arrière-plan (Track) */}
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="rgba(255,255,255,0.3)" // Ajout d'une couleur par défaut pour voir le rail
                strokeWidth={strokeWidth}
                fill="transparent"
            />
            {/* Cercle de progression (Indicator) */}
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={[circumference, circumference]}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
        </Svg>
    );
};