export type WordlePuzzleInfo = {
    id: number;
    solution?: string;
    print_date: string;
    days_since_launch: number;
    author: string;
};

export type LegacyWordleStats = {
    autoOptInTimestamp: number;
    currentStreak: number;
    gamesPlayed: number;
    gamesWon: number;
    guesses: {
        "1": number;
        "2": number;
        "3": number;
        "4": number;
        "5": number;
        "6": number;
        fail: number;
    },
    hasMadeStatsChoice: boolean;
    hasPlayed: boolean;
    lastWonDayOffset: number;
    maxStreak: number;
    timestamp: number;
};

export type WordleGameData = {
    boardState: [string, string, string, string, string, string];
    currentRowIndex: number;
    hardMode: boolean;
    isPlayingArchive: boolean;
    setLegacyStats: LegacyWordleStats;
    status: string;
};

export type WordleState = {
    game_data: WordleGameData;
    puzzle_id: string;
    game: string;
    user_id: number;
    version: string;
    timestamp: number;
    print_date: string;
    schema_version: string;
}

export type CalculatedWordleStats = {
    currentStreak: number;
    maxStreak: number;
    lastWonPrintDate: string;
    lastCompletedPrintDate: string;
    hasPlayed: boolean;
};

export type TotalWordleStats = {
    gamesWon: number;
    gamesPlayed: number;
    "guesses": {
        "1": number;
        "2": number;
        "3": number;
        "4": number;
        "5": number;
        "6": number;
        fail: number;
    },
    hasPlayed: boolean;
    hasPlayedArchive: boolean;
};

export type WordleGameStats = {
    legacyStats: LegacyWordleStats;
    calculatedStats: CalculatedWordleStats;
    totalStats: TotalWordleStats;
}

export type WordlePlayer = {
    user_id: number;
    last_updated: number;
    stats: {
        [gameName: string]: WordleGameStats;
    }
};

export type WordleStats = {
    states: WordleState[];
	user_id: number;
	player: WordlePlayer;
}
