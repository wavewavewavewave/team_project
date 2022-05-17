import {Dispatch} from "redux";
import {addPackDataType, cardsAPI, getPacksDataType, ResponseMeType} from "../api/cards-api";
import {ThunkAction} from "redux-thunk";
import {AppRootReducerType} from "../Bll/store";

//Types

export type cardPackType = {
    _id: string,
    user_id: string,
    name: string,
    cardsCount: number,
    created: string,
    updated: string,
}
export type PacksStateType = {
    isDisabledSearchButton: boolean,
    isDisabledAddNewPackButton: boolean,

    cardPacks: cardPackType[]
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number
    // количество элементов на странице

    getParams: {
        packName: string, // не обязательно
        min: number, // не обязательно
        max: number, // не обязательно
        sortPacks: string, //"0updated" // не обязательно
        page: number, // не обязательно
        pageCount: number, // не обязательно
        user_id: string,  // чьи колоды не обязательно, или прийдут все
    }

    // error: string,
}
export type setPacksDataType = {
    cardPacks: cardPackType[]
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number
}
export type showMyAllPacksACType = {
    type: "PACKS-LIST/SHOW-MY-ALL-PACKS",
    value: string
}
export type setPacksACType = {
    type: "PACKS-LIST/SET-PACKS",
    payload: setPacksDataType
}
export type editSearchNameACType = {

    type: "PACKS-LIST/EDIT-SEARCH-VALUE",
    value: string,

}
export type filterTableValue = "0updated" | "1updated"
    | "0created" | "1created"
    | "0cardsCount" | "1cardsCount"
    | "0name" | "1name"
export type filterTableACType = {
    type: "PACKS-LIST/FILTER-TABLE",
    filterValue: filterTableValue
}
export type currentPageChangeACType = {
    type: "PACKS-LIST/CHANGE-CURRENT-PAGE",
    pageNumber: number
}
export type sizePageChangeACType = {
    type: "PACKS-LIST/CHANGE-SIZE-PAGE",
    pageSize: number
}

type ActionsType = setPacksACType
    | editSearchNameACType
    | showMyAllPacksACType
    | filterTableACType
    | currentPageChangeACType
    | sizePageChangeACType

//State:

const initialPacksState: PacksStateType = {
    isDisabledSearchButton: false,
    isDisabledAddNewPackButton: false,

    cardPacks: [
        {
            _id: "5eb6cef840b7bf1cf0d8122d",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "1 колода",
            cardsCount: 25,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        },
        {
            _id: "5eb6cef840b7bf1cf0d8122d",
            user_id: "5eb543f6bea3ad21480f1ee9",
            name: "2 колода",
            cardsCount: 36,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        },
        {
            _id: "5eb6cef840b7bf1cf0d8122d",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "3 колода",
            cardsCount: 36,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        },
        {
            _id: "5eb6cef840b7bf1cf0d8122d",
            user_id: "5eb543f6bea3ad21480f1ee3",
            name: "4 колода",
            cardsCount: 150,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        },
        {
            _id: "5eb6cef840b7bf1cf0d8122d",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "5 колода",
            cardsCount: 2,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        },
        {
            _id: "5eb6cef840b7bf1cf0d8122d",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "6 колода",
            cardsCount: 3,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        },
        {
            _id: "5eb6cef840b7bf1cf0d8122d",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "7 колода",
            cardsCount: 48,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        },
        {
            _id: "5eb6cef840b7bf1cf0d8122d",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "8 колода",
            cardsCount: 89,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
        },
    ],
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,

    getParams: {
        packName: "", // не обязательно
        min: 0, // не обязательно
        max: 9, // не обязательно
        sortPacks: "0updated", // не обязательно
        page: 1, // не обязательно
        pageCount: 5, // не обязательно
        user_id: "",  // чьи колоды не обязательно, или прийдут все
    }

    // error: string,
}

//Reducer:

export const packsReducer = (state = initialPacksState, action: ActionsType): PacksStateType => {
    //debugger
    switch (action.type) {
        case "PACKS-LIST/SET-PACKS":
            return {...state, ...action.payload, cardPacks: action.payload.cardPacks}
        case "PACKS-LIST/EDIT-SEARCH-VALUE":
            return {...state, getParams: {...state.getParams, packName: action.value}}
        case "PACKS-LIST/SHOW-MY-ALL-PACKS":
            return {...state, getParams: {...state.getParams, user_id: action.value}}
        case "PACKS-LIST/FILTER-TABLE":
            return {...state, getParams: {...state.getParams, sortPacks: action.filterValue}}
        case "PACKS-LIST/CHANGE-CURRENT-PAGE":
            return {...state, getParams: {...state.getParams, page: action.pageNumber}}
        case "PACKS-LIST/CHANGE-SIZE-PAGE":
            return {...state, getParams: {...state.getParams, pageCount: action.pageSize}}


        default:
            return state;
    }
}

//Action and Action Creators:

export const showMyAllPacksAC = (value: string): showMyAllPacksACType => {
    return {
        type: "PACKS-LIST/SHOW-MY-ALL-PACKS",
        value
    }
}
export const setPacksAC = (data: setPacksDataType): setPacksACType => {
    return {
        type: "PACKS-LIST/SET-PACKS",
        payload: data
    }
}
export const editSearchNameAC = (value: string): editSearchNameACType => {
    return {
        type: "PACKS-LIST/EDIT-SEARCH-VALUE",
        value
    }
}
export const filterTableAC = (filterValue: filterTableValue): filterTableACType => {
    return {
        type: "PACKS-LIST/FILTER-TABLE",
        filterValue
    }
}
export const currentPageChangeAC = (pageNumber: number): currentPageChangeACType => {
    return {
        type: "PACKS-LIST/CHANGE-CURRENT-PAGE",
        pageNumber
    }
}
export const sizePageChangeAC = (pageSize: number): sizePageChangeACType => {
    return {
        type: "PACKS-LIST/CHANGE-SIZE-PAGE",
        pageSize
    }
}


//Thunk:

type ThunkType = ThunkAction<void, AppRootReducerType, unknown, ActionsType>

export const getPacksTC = (): ThunkType => {

    return (dispatch: Dispatch<ActionsType>, getState) => {
        // диспатчим крутилку
        let params = getState().packs.getParams

        cardsAPI.getPacks(params)
            .then((res) => {
                dispatch(setPacksAC(res.data))
            })
            .catch((err) => {
                // dispatch(errorMessageAC("some error"))
            })
            .finally(() => {
                //выключаем крутилку
            })
    }
}

export const addNewPackTC = (params: addPackDataType): ThunkType => {

    return (dispatch: Dispatch<any>) => {
        // диспатчим крутилку
        cardsAPI.addNewPack(params)
            .then((res) => {

                dispatch(getPacksTC())
            })
            .catch((err) => {
                // dispatch(errorMessageAC("some error"))
            })
            .finally(() => {
                //выключаем крутилку
            })
    }
}


