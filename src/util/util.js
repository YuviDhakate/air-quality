
import { round } from "lodash"
import { APP } from '../config/app.config';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


TimeAgo.addLocale(en)

export const getCategory = (qualityIndex) => {
    const aqi = round(qualityIndex)
    let cat = APP.CATEGORIES.filter((category) => (aqi >= category.startRange && aqi <= category.endRange))
    return cat ? cat[0] : APP.DEFAULT_CATEGORY
}


export const timeAgo = new TimeAgo('en-US')