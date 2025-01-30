export type RankingUpdate = {
    type: 'RankingUpdate';
    player: {
        id: string;
        rank: number;
    };
};
