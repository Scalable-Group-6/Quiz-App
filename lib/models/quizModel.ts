export type question = {
    type: string;
    question: string;
    options?: string[];
    answer: string;
}

export type quiz = {
    _id: string;
    subject: string;
    name: string;
    duration: number;
    creator_id: string;
    start_time: Date;
    end_time: Date;
    questions: question[];
}