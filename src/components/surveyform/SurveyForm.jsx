'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSurvey } from '../../hooks/useSurvey';

function SurveyForm({ closeSurvey }) {
    const { register, handleSubmit, getValues } = useForm();
    const [answers, setAnswers] = useState([]);
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
    const [questions, setQuestions] = useState([]);
    const totalQuestions = questions.length;
    const userId = localStorage.getItem('userId');
    const { getQuestions, postSurvey } = useSurvey();

    useEffect(() => {
        getQuestions()
            .then(response => {
                setQuestions(response);
                console.log(questions);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const onSubmit = async (data) => {
        let array_answer_id = [];
        for (const key in data) {
            if (key.startsWith('question')) {
                array_answer_id.push(data[key]);
            }
        }
        setAnswers(array_answer_id);
        console.log("data array", array_answer_id);

        if (validateAnswers(data)) {
            setAllQuestionsAnswered(true);
            console.log(data);

            try {
                const predata = {
                    title: data.title || 'Default Title',
                    description: data.description || 'Default Description',
                    userId: userId,
                    createAt: new Date().toISOString(),
                    answerIds: array_answer_id
                }
                console.log(predata);
                const response = await postSurvey(predata);
                console.log('Server response:', response);
                toast.success("Survey completed, Thank you for taking the survey!");
                setTimeout(() => {
                    closeSurvey();
                }, 2000);
            } catch (error) {
                console.error('Error submitting survey:', error);
                toast.error("There was an error submitting the survey. Please try again.");
            }
        } else {
            setAllQuestionsAnswered(false);
            toast.warn("Please answer all questions before submitting the survey.");
        }
    };

    const validateAnswers = (data) => {
        for (let i = 1; i <= totalQuestions; i++) {
            if (!data[`question${i}`]) {
                return false;
            }
        }
        return true;
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[black] bg-opacity-50 z-50 overflow-y-auto">
            <div className="bg-[white] rounded-lg shadow-lg p-5 max-w-4xl w-full">
                <div className="flex flex-col items-center gap-2">
                    <div className="self-end">
                        <button type="button" onClick={closeSurvey} className="text-[gray-600] text-xl hover:text-[gray-800]">✕</button>
                    </div>
                    <h1 className="text-2xl font-bold text-[black] mb-2 text-center">Survey</h1>
                    <hr className="w-full border-0 h-px bg-[black] mb-5" />
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                            {questions.map((q, index) => (
                                <div key={q.questionId} className="p-3 bg-[gray-100] border border-[gray-300] rounded-lg">
                                    <label className="text-lg font-semibold text-[gray-800] mb-2 block">
                                        {index + 1}. {q.content}
                                    </label>
                                    <div className="flex flex-col gap-2">
                                        {q.answers.map((option, idx) => (
                                            <label key={option.answerId} className="text-sm text-[gray-800] flex items-center">
                                                <input
                                                    type="radio"
                                                    name={`question${index + 1}`}
                                                    value={option.answerId}
                                                    {...register(`question${index + 1}`, { defaultValue: getValues(`question${index + 1}`) })}
                                                    className="mr-2"
                                                />
                                                {option.answerText}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-5 font-bold">
                            <button type="submit" className="bg-[black] text-[white] text-lg py-2 px-5 rounded hover:bg-[gray-700]">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SurveyForm;