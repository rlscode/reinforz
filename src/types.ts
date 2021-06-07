import { Theme, ThemeOptions } from '@material-ui/core/styles';
import { Language } from 'prism-react-renderer';

// Basic Components

export interface IErrorLog {
  quiz: string;
  target: string;
  message: string;
  level: 'ERROR' | 'WARN';
  _id: string;
  quiz_id: string;
}

export interface ILog {
  warns: string[];
  errors: string[];
}

export interface IPlaySettingsOptions {
  shuffle_options: boolean;
  shuffle_quizzes: boolean;
  shuffle_questions: boolean;
  instant_feedback: boolean;
  flatten_mix: boolean;
  partial_score: boolean;
  disable_timer: boolean;
}

export interface IPlaySettingsFilters {
  time_allocated: [number, number];
  excluded_difficulty: TQuestionDifficulty[];
  excluded_types: TQuestionType[];
}

export interface IQuizPartial {
  topic: string;
  subject: string;
  questions: TQuestionPartial[];
  _id?: string;
}

export interface IQuizFull {
  topic: string;
  subject: string;
  questions: TQuestionFull[];
  _id: string;
}

export interface IPlaySettings {
  options: IPlaySettingsOptions;
  filters: IPlaySettingsFilters;
}

export type TQuestionType = 'MCQ' | 'MS' | 'FIB' | 'Snippet';
export type TQuestionDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface IQuestionPartial {
  type?: TQuestionType;
  image?: string | null;
  weight?: number;
  time_allocated?: number;
  difficulty?: TQuestionDifficulty;
  hints?: string[];
  format?: 'text' | 'md';
  _id?: string;
}

export interface SelectionQuestionOptions {
  text: string;
  index: string;
}

export interface IMcqQuestionPartial extends IQuestionPartial {
  question: string;
  options: string[];
  type?: 'MCQ';
  answers: (string | ISelectionQuestionAnswerPartial)[];
}

export interface IMsQuestionPartial extends IQuestionPartial {
  question: string;
  options: string[];
  type?: 'MS';
  answers: (string | ISelectionQuestionAnswerPartial)[];
}

export interface ISnippetQuestionPartial extends IQuestionPartial {
  question: string;
  type?: 'Snippet';
  answers: (
    | IInputQuestionAnswerPartial[]
    | IInputQuestionAnswerPartial
    | string
    | string[]
  )[];
}

export interface IFibQuestionPartial extends IQuestionPartial {
  question: string[];
  type?: 'FIB';
  answers: (
    | IInputQuestionAnswerPartial[]
    | IInputQuestionAnswerPartial
    | string
    | string[]
  )[];
}

export type TQuestionAnswerModifiers = 'IC' | 'IS';

interface IRegex {
  regex: string;
  flags: string;
}

export interface IInputQuestionAnswerPartial {
  text: string;
  modifiers?: TQuestionAnswerModifiers[];
  regex?: IRegex;
  explanation?: string | null;
}

export interface ISelectionQuestionAnswerPartial {
  text: string;
  explanation?: string | null;
}

export interface IMcqQuestionFull extends Required<IQuestionPartial> {
  question: string;
  options: SelectionQuestionOptions[];
  type: 'MCQ';
  answers: ISelectionQuestionAnswerFull[];
  quiz: QuizIdentifiers;
}

export interface IMsQuestionFull extends Required<IQuestionPartial> {
  question: string;
  options: SelectionQuestionOptions[];
  type: 'MS';
  answers: ISelectionQuestionAnswerFull[];
  quiz: QuizIdentifiers;
}

export interface IInputQuestionAnswerFull {
  text: string;
  modifiers: TQuestionAnswerModifiers[];
  regex: IRegex | null;
  explanation: string | null;
}

export interface ISelectionQuestionAnswerFull {
  text: string;
  explanation: string | null;
}

export interface ISnippetQuestionFull extends Required<IQuestionPartial> {
  question: string;
  options: null;
  type: 'Snippet';
  answers: IInputQuestionAnswerFull[][];
  quiz: QuizIdentifiers;
}

export interface IFibQuestionFull extends Required<IQuestionPartial> {
  question: string[];
  options: null;
  type: 'FIB';
  answers: IInputQuestionAnswerFull[][];
  quiz: QuizIdentifiers;
}

export type TInputQuestionPartial =
  | ISnippetQuestionPartial
  | IFibQuestionPartial;
export type TSelectionQuestionPartial =
  | IMcqQuestionPartial
  | IMsQuestionPartial;

export type TQuestionPartial =
  | TInputQuestionPartial
  | TSelectionQuestionPartial;

export type TInputQuestionFull = ISnippetQuestionFull | IFibQuestionFull;
export type TSelectionQuestionFull = IMcqQuestionFull | IMsQuestionFull;

export type TQuestionFull = TInputQuestionFull | TSelectionQuestionFull;

export interface QuizIdentifiers {
  topic: string;
  _id: string;
  subject: string;
}

export type IResultSelectionQuestion = Omit<
  TSelectionQuestionFull,
  'options'
> & {
  options: (SelectionQuestionOptions & {
    isCorrect: boolean;
    userSelected: boolean;
  })[];
};

export type IResultInputQuestion = Omit<TInputQuestionFull, 'answers'> & {
  answers: (IInputQuestionAnswerFull & {
    isCorrect?: boolean;
  })[][];
};

export type TResultQuestion = IResultSelectionQuestion | IResultInputQuestion;

export interface IResult {
  user_answers: string[];
  verdict: boolean;
  score: {
    amount: number;
    time: number;
    hints: number;
    answers: number;
  };
  time_taken: number;
  hints_used: number;
  question: TResultQuestion;
  _id: string;
}

export interface IReport {
  settings: IPlaySettings;
  results: IResult[];
  createdAt: number;
}

export interface IReportFilter {
  time_taken: [number, number];
  verdict: boolean | 'any';
  hints_used: number | 'any';
  excluded_types: TQuestionType[];
  excluded_difficulty: TQuestionDifficulty[];
  excluded_quizzes: string[];
  excluded_columns: string[];
  score: [number, number];
}

export type IReportSort = [string, 'ASC' | 'DESC'][];

export type Color = {
  dark: string;
  base: string;
  light: string;
  opposite_dark: string;
  opposite_base: string;
  opposite_light: string;
};

export interface ExtendedThemeOptions extends ThemeOptions {
  color: Color;
  theme: AllowedTheme;
}

export interface ExtendedTheme extends Theme {
  color: Color;
  theme: AllowedTheme;
}

export type AllowedTheme = 'dark' | 'light' | 'polar_night' | 'snow_storm';
export interface ISettings {
  theme: AllowedTheme;
  animation: boolean;
  hovertips: boolean;
}

export type TNumberAggregation = 'MIN' | 'MAX' | 'AVG';
export type TBooleanAggregation = 'TRUE' | 'FALSE';
export interface IReportAggregator {
  time_allocated: TNumberAggregation;
  time_taken: TNumberAggregation;
  weight: TNumberAggregation;
  score: TNumberAggregation;
  verdict: TBooleanAggregation;
  hints_used: TNumberAggregation;
}

export interface HighlighterProps {
  code: string;
  language: Language;
}

export interface IReportExport {
  export_type: 'Quizzes' | 'Report';
  export_as: 'JSON' | 'YAML';
}
