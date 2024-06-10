import EditQuizPage from "./editDetail";

export default function Page({params}: {params: {quizId: string}}) {
    return <EditQuizPage quizId={params.quizId}/>;
}