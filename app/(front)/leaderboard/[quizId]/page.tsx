import Leaderboard from "./Detail";

export default function Page({params}:{params:{quizId:string}}) {
    return <Leaderboard quizId={params.quizId}/>;
}