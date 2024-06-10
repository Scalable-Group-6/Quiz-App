import TakeQuizPage from "./takeQuiz";

export default function Page({params}:{params:{quizId:string}}) {
    return <TakeQuizPage quizId={params.quizId}/>;
}