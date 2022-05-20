import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRootReducerType } from '../../../Bll/store';
import { CardsType, getCards, gradeCards } from '../../PackCard/packsCard-reducer';
import { cardPackType } from '../../packs-reducer';
import s from "./LearnPackModal.module.css";


const getCard = (cards: CardsType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
        return { sum: newSum, id: newSum < rand ? i : acc.id }
    }
        , { sum: 0, id: -1 });

    return cards[res.id + 1];
}


export const LearnPackModal = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const { cardId } = useParams();
    
    const [gradeValue, setGradeValue] = React.useState<number>();
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    let packs = useSelector<AppRootReducerType, cardPackType[]>((state) => state.packs.cardPacks)
    let cards = useSelector<AppRootReducerType, CardsType[]>((state) => state.cards.cards)

    const [card, setCard] = useState<CardsType>({
        _id: '',
        cardsPack_id: '',

        answer: '',
        question: '',
        grade: 1,
        shots: 3,

        created: '',
        updated: '',
        user_id: ''

    });


    useEffect(() => {
        if (cardId) {
            dispatch(getCards(cardId));
            if (cards.length > 0) setCard(getCard(cards))
        }
    }, [])


    const closeModalClick = () => navigate(-1);
    const showAnswerClickHandler = () => setShowAnswer(true);

    let findPack = packs.find(el => el._id === cardId);
    let namePack = findPack && findPack.name;

    const nextClickHandler = () => {
        setShowAnswer(false);

        if (cards.length > 0)
            if (gradeValue) {
                setCard(getCard(cards));
                dispatch(gradeCards(gradeValue, card._id));
            } 
    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let gradeMUI = ((event.target as HTMLInputElement).value)
        let gradeNumber = Number(gradeMUI)
        setGradeValue(gradeNumber)
    };


    return (
        <div className={s.learnModal}  >
            <div className={s.modalBlock} >
                <div className={s.learn} >Learn "{`${namePack}`}"</div>
                <div className={s.question} style={{ display: 'flex', alignItems: 'center' }}>
                    <b>Question:</b> "{card.question}"
                </div>
                <div>
                    <button className={s.cancelButton} onClick={closeModalClick}>Cancel</button>
                    <button className={s.showAnswerButton} onClick={showAnswerClickHandler}>Show answer</button>
                </div>
            </div>

            {showAnswer && (
                <div className={s.learnModal}  >
                    <div className={s.modalBlock} style={{ height: '576px', top: '96px' }}>
                        <div className={s.learn} >Learn "{`${namePack}`}"</div>
                        <div className={s.question}>
                            <div>
                                <b>Question:</b> "{card.question}"
                            </div>
                            <div style={{ marginTop: '15px' }} >
                                <b>Answer:</b> "{card.answer}"
                            </div>
                        </div>

                        <div className={s.answerBlock} >
                            <div> <b>Rate yourself: </b></div>
                            <FormControl  >
                                    <RadioGroup
                                        // aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="Rate-yourself"
                                        name="radio-buttons-group"
                                        onChange={handleRadioChange}
                                        value={gradeValue}
                                    >
                                        <FormControlLabel value={1} control={<Radio />} label="Did not know" />
                                        <FormControlLabel value={2} control={<Radio />} label="Forgot" />
                                        <FormControlLabel value={3} control={<Radio />} label="A lot of thought" />
                                        <FormControlLabel value={4} control={<Radio />} label="Confused" />
                                        <FormControlLabel value={5} control={<Radio />} label="Knew the answer" />
                                    </RadioGroup>
                                </FormControl>
                        </div>

                        <div>
                            <button className={s.cancelButton} onClick={closeModalClick}>Cancel</button>
                            <button className={s.nextButtonAnswer} onClick={nextClickHandler}>Show answer</button>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
};
