
import moment from "moment"
import * as utils from "./utils"
import * as contants from "./constant"
import * as state from "./initialState"

export const UTILS = utils
export const CONS = contants.CONS
export const initialState = state.initialState

export const COLLAPSE_MENU = 'COLLAPSE_MENU';
export const COLLAPSE_TOGGLE = 'COLLAPSE_TOGGLE';
export const FULL_SCREEN = 'FULL_SCREEN';
export const FULL_SCREEN_EXIT = 'FULL_SCREEN_EXIT';
export const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
export const NAV_CONTENT_LEAVE = 'NAV_CONTENT_LEAVE';
export const NAV_COLLAPSE_LEAVE = 'NAV_COLLAPSE_LEAVE';
export const LOADER_ACTIVE = "LOADER_ACTIVE"
export const TOP_CHANGE = "TOP_CHANGE"

export const getNewTab = (props) => {
    const activeTab = props.activeTab
    const newIndex = activeTab.index + 1
    const newTab = { index: newIndex, ...props.tabs[newIndex] }
    return newTab
}

export function handleChange(key, subkey, event) {
    const value = typeof event === "string" || typeof event === "boolean" ? event : event.target ? event.target.value : event
    var data = { ...this.props[key] }
    data[subkey] = value ? value : null
    this.props.dispatch(topChange(key, data))
}

const multiFileSelect = []
export function handleImageChange(key, subkey, event) {
    var data = { ...this.props[key] }
    if (multiFileSelect.includes(subkey)) {
        const value = event.target.files
        data[subkey] = value ? value : null
        this.props.dispatch(topChange(key, data))
    } else {
        const value = event.target.files[0]
        data[subkey] = value ? value : null
        UTILS.mapFileToImageTag(value, key + subkey)
        this.props.dispatch(topChange(key, data))
    }
}

const multiSelect = ["mapping_tables"]
export function handleSelect(key, subkey, value) {
    console.log(key, subkey, value)
    var data = { ...this.props[key] }

    if (!value) {
        data[subkey] = multiSelect.includes(subkey) ? [] : null
        this.props.dispatch(topChange(key, data))
        return
    }

    data[subkey] = value
    this.props.dispatch(topChange(key, data))
    return
}

export function handleDateChange(key, subkey, date) {
    var data = { ...this.props[key] }
    const formattedDate = date ? date.format("YYYY-MM-DD") : ""
    data[subkey] = formattedDate
    this.props.dispatch(topChange(key, data))
}

const pickOnlyDate = ["discontinue_date"]
export function handleDateTimeChange(key, subkey, date) {
    var data = { ...this.props[key] }
    date = pickOnlyDate.includes(subkey) ? moment(date.format("YYYY-MM-DD")) : date
    const formattedDate = date ? date.format("YYYY-MM-DDTHH:mm:ss.sssZ") : ""
    data[subkey] = formattedDate
    this.props.dispatch(topChange(key, data))
}

export const loaderStateChange = () => {
    return {
        type: LOADER_ACTIVE
    }
}

export const topChange = (key, value) => {
    return {
        type: TOP_CHANGE,
        key,
        value
    }
}

export const errorOnInput = (field, message, ref) => {
    return dispatch => {
        ref && UTILS.scrollToMyRef(ref)
        dispatch(topChange("field_ref", field))
        dispatch(topChange("field_message", message))
        return
    }
}

export const clearAlert = () => {
    return dispatch => {
        dispatch(topChange("alertMessage", ""))
        dispatch(topChange("alertVariant", ""))
    }
}

export const makeTitle = (text)=>{
    return text.replace(/[^A-Za-z0-9]/g, " ")
}