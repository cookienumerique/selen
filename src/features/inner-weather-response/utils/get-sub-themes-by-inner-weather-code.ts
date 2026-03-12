import { InnerWeatherCodeEnum } from "@/src/features/inner-weather/types/inner-weather.types";

/**
 * @description Get the sub themes by inner weather code
 * @param innerWeather 
 * @returns 
 */
export const getSubThemesByInnerWeatherCode = (innerWeatherCode: InnerWeatherCodeEnum) => {
    
    switch (innerWeatherCode) {
        case InnerWeatherCodeEnum.SUNNY:
            return ['SELF_WORTH', 'SUCCESS_DECONSTRUCTION', 'INNER_CHILD', 'LIFE_TRANSITIONS', 'MONEY_AND_WORTH', 'GRATITUDE', 'GRATITUDE', 'TIME_AND_URGENCY'];
        case InnerWeatherCodeEnum.CLEAR:
            return ['GROUNDING_AND_BODY', 'SELF_WORTH', 'INNER_CHILD', 'PERSONAL_GROWTH_TRUCE', 'BOUNDARIES_AND_RELATIONSHIPS', 'PAUSE_MODE', 'MONEY_AND_WORTH', 'CHOSEN_VS_IMPOSED_SOLITUDE', 'GRATITUDE', 'TIME_AND_URGENCY'];
        case InnerWeatherCodeEnum.SOFT:
            return ['LIFE_AFTER_GRIEF', 'POSSIBLE_SPACE', 'BECOMING_PARENT_STORM', 'CHILD_AS_MIRROR', 'GROUNDING_AND_BODY', 'SELF_DISCONNECTION', 'CHOSEN_VS_IMPOSED_SOLITUDE', 'COUPLE_CRISIS_REBUILD', 'GRATITUDE', 'TIME_AND_URGENCY'];
        case InnerWeatherCodeEnum.FOGGY:
            return ['SELF_DISCONNECTION', 'POSSIBLE_SPACE', 'MONEY_AND_WORTH', 'CHOSEN_VS_IMPOSED_SOLITUDE', 'COUPLE_CRISIS_REBUILD', 'LIFE_TRANSITIONS', 'SHADOW_SELF', 'MENTAL_LOAD', 'SUCCESS_DECONSTRUCTION'];
        case InnerWeatherCodeEnum.TENSE:
            return ['BOUNDARIES_AND_RELATIONSHIPS', 'DIGITAL_OVERLOAD_AVOIDANCE', 'MENTAL_LOAD', 'SUCCESS_DECONSTRUCTION', 'SHADOW_SELF', 'MONEY_AND_WORTH', 'COUPLE_CRISIS_REBUILD', 'TIME_AND_URGENCY'];
        case InnerWeatherCodeEnum.OVERWHELMED:
            return ['PAUSE_MODE', 'MENTAL_LOAD', 'PERSONAL_GROWTH_TRUCE', 'DIGITAL_OVERLOAD_AVOIDANCE', 'GROUNDING_AND_BODY', 'CHOSEN_VS_IMPOSED_SOLITUDE', 'COUPLE_CRISIS_REBUILD', 'GRATITUDE', 'TIME_AND_URGENCY'];
        default:
            return [];
    }
}