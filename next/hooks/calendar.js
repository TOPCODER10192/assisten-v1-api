import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const dayName = dayNames[new Date().getDay()]

export const currentDay = () => `Today | ${dayName}, ${dayjs().format('MMM Do')}`
