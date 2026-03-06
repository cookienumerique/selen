import { InnerWeatherCodeEnum } from "@/src/features/inner-weather/types/inner-weather.types";

/**
 * @description Get the sub themes by inner weather code
 * @param innerWeather 
 * @returns 
 */
export const getSubThemesByInnerWeatherCode = (innerWeatherCode: InnerWeatherCodeEnum) => {
    switch (innerWeatherCode) {
        case InnerWeatherCodeEnum.SUNNY:
            return ['SELF_WORTH', 'SUCCESS_DECONSTRUCTION', 'INNER_CHILD', 'LIFE_TRANSITIONS'];
        case InnerWeatherCodeEnum.CLEAR:
            return ['GROUNDING_AND_BODY', 'SELF_WORTH', 'INNER_CHILD', 'PERSONAL_GROWTH_TRUCE', 'BOUNDARIES_AND_RELATIONSHIPS', 'PAUSE_MODE'];
        case InnerWeatherCodeEnum.SOFT:
            return ['LIFE_TRANSITIONS', 'SHADOW_SELF', 'SELF_DISCONNECTION', 'MENTAL_LOAD', 'SUCCESS_DECONSTRUCTION'];
        case InnerWeatherCodeEnum.FOGGY:
            return ['LIFE_AFTER_GRIEF', 'BECOMING_PARENT_STORM', 'CHILD_AS_MIRROR', 'SELF_DISCONNECTION', 'POSSIBLE_SPACE', 'GROUNDING_AND_BODY'];
        case InnerWeatherCodeEnum.TENSE:
            return ['BOUNDARIES_AND_RELATIONSHIPS', 'DIGITAL_OVERLOAD_AVOIDANCE', 'MENTAL_LOAD', 'SUCCESS_DECONSTRUCTION', 'SHADOW_SELF'];
        case InnerWeatherCodeEnum.OVERWHELMED:
            return ['PAUSE_MODE', 'MENTAL_LOAD', 'PERSONAL_GROWTH_TRUCE', 'DIGITAL_OVERLOAD_AVOIDANCE', 'GROUNDING_AND_BODY'];
        default:
            return [];
    }
}