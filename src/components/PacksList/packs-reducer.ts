import {Dispatch} from "redux";
import {cardsAPI, ResponseMeType} from "../api/cards-api";
import {ThunkAction} from "redux-thunk";


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
   // error: string,
}

const initialPacksState : PacksStateType = {
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
    pageCount: 8,

   // error: string,
}




type ActionsType = setPacksACType

// export type GetPacksType = {
//     type: "PACKS-LIST/GET-PACKS"
//     payload: {
//         packName: string, // не обязательно
//         min:number, // не обязательно
//         max: number, // не обязательно
//         sortPacks: string, //"0updated" // не обязательно
//         page: string, // не обязательно
//         pageCount: number, // не обязательно
//         user_id: string,  // чьи колоды не обязательно, или прийдут все
//     }
// }
// export type GetPacksType = {
//     type: "PACKS-LIST/GET-PACKS"
//     payload: {
//         packName: string, // не обязательно
//         min:number, // не обязательно
//         max: number, // не обязательно
//         sortPacks: string, //"0updated" // не обязательно
//         page: string, // не обязательно
//         pageCount: number, // не обязательно
//         user_id: string,  // чьи колоды не обязательно, или прийдут все
//     }
// }
//
//
export const packsReducer = (state = initialPacksState, action: ActionsType): PacksStateType => {
    switch (action.type) {
        case "PACKS-LIST/SET-PACKS":
            return {...state, ...action.payload, cardPacks: action.payload.cardPacks}


        default:
            return state;
    }
}
//
//

export type setPacksDataType = {
    cardPacks: cardPackType[]
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number
}
export type setPacksACType = {
    type: "PACKS-LIST/SET-PACKS",
    payload: setPacksDataType
}

export const setPacksAC = (data: setPacksDataType): setPacksACType => {
    return {
        type: "PACKS-LIST/SET-PACKS",
        payload: data
    }
}
//
// export const loggedAC = (isLogged: boolean): LoggedActionType => {
//     return {
//         type: "SET-LOGGED",
//         payload: {
//             isLogged
//         }
//     }
// }
//
// export type changeStatusSaveButtonActionType = {
//     type: "PROFILE/SET-STATUS-SAVE-BUTTON",
//     payload: {
//         isDisabledSaveButton: boolean
//     }
// }
// export const changeStatusSaveButtonAC = (status: boolean): changeStatusSaveButtonActionType => {
//     return {
//         type: "PROFILE/SET-STATUS-SAVE-BUTTON",
//         payload: {
//             isDisabledSaveButton: status
//         }
//     }
// }
// export type changeStatusLogoutButtonActionType = {
//     type: "PROFILE/SET-STATUS-LOGOUT-BUTTON",
//     payload: {
//         isDisabledLogoutButton: boolean
//     }
// }
// export const changeStatusLogoutButtonAC = (status: boolean): changeStatusLogoutButtonActionType => {
//     return {
//         type: "PROFILE/SET-STATUS-LOGOUT-BUTTON",
//         payload: {
//             isDisabledLogoutButton: status
//         }
//     }
// }
//
// type ThunkType = ThunkAction<void, AppRootReducerType, unknown, ActionsType>
//
//
// export const LogoutTC = (): ThunkType => {
//
//     return (dispatch: Dispatch<ActionsType>) => {
//         // диспатчим крутилку
//        dispatch(changeStatusLogoutButtonAC(true))
//         cardsAPI.logout ()
//             .then((res) => {
//                 dispatch(loggedAC(false))
//             })
//             .catch((err) => {
//                 dispatch(errorMessageAC("some error"))
//             })
//             .finally(() => {
//                 //выключаем крутилку
//                 dispatch(changeStatusLogoutButtonAC(false))
//             })
//     }
// }


