import React from 'react';
import {Dispatch} from "redux";
import {cardsAPI} from "../../api/cards-api";

export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

export type initialPacksCardStateType = {
    cards: CardsType[],
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
}

const initialPacksCardState: initialPacksCardStateType = {
    cards: [
        {
            answer: "J.Cole",
            question: "Who is The best Rapper",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 4.987525071790364,
            shots: 1,
            user_id: "142151531535151",
            created: "2020-05-13T11:05:44.867Z",
            updated: "2020-05-13",
            _id: "5ebbd48876810f1ad0e7ece3",
        },
        {
            answer: "J.Cole",
            question: "Who is The best Rapper",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 4.987525071790364,
            shots: 1,
            user_id: "142151531535151",
            created: "2020-05-13T11:05:44.867Z",
            updated: "2020-05-13",
            _id: "5ebbd48876810f1ad0e7ece3",
        },
        {
            answer: "J.Cole",
            question: "Who is The best Rapper",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 4.987525071790364,
            shots: 1,
            user_id: "142151531535151",
            created: "2020-05-13T11:05:44.867Z",
            updated: "2020-05-13",
            _id: "5ebbd48876810f1ad0e7ece3",
        },
        {
            answer: "J.Cole",
            question: "Who is The best Rapper",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 4.987525071790364,
            shots: 1,
            user_id: "142151531535151",
            created: "2020-05-13T11:05:44.867Z",
            updated: "2020-05-13",
            _id: "5ebbd48876810f1ad0e7ece3",
        },
        {
            answer: "J.Cole",
            question: "Who is The best Rapper",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 4.987525071790364,
            shots: 1,
            user_id: "142151531535151",
            created: "2020-05-13T11:05:44.867Z",
            updated: "2020-05-13",
            _id: "5ebbd48876810f1ad0e7ece3",
        },
        {
            answer: "J.Cole",
            question: "Who is The best Rapper",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 4.987525071790364,
            shots: 1,
            user_id: "142151531535151",
            created: "2020-05-13",
            updated: "2020-05-13",
            _id: "5ebbd48876810f1ad0e7ece3",
        }
    ],
    cardsTotalCount: 3,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 4,
    packUserId: "5eecf82a3ed8f700042f1186",
}


export const packsCardReducer = (state = initialPacksCardState, action: ActionType): initialPacksCardStateType => {
    switch (action.type) {
        case "PACKS-CARD/GET-CARDS" :
            return {
                ...state, cards: action.cards
            }
        default:
            return state
    }
}

export type PacksCardReducerACType = ReturnType<typeof packsCardReducerAC>
export const packsCardReducerAC = (cards: CardsType[]) => {
    return {
        type: "PACKS-CARD/GET-CARDS",
        cards
    } as const
}

export type ActionType = PacksCardReducerACType
export type ThunkType = Dispatch<ActionType>

export const packsCardTC = () => {
    return (dispatch: Dispatch<any>) => {
        cardsAPI.getCards().then((res) => {
           // dispatch(packsCardReducer(res.data.cards)
        })
    }
}