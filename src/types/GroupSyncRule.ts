export interface GroupSyncRule {
    [id: number]: {
        id: number;
        inGameRankName: string;
        discordRoleId: string;
        websiteGroupId: string;
    }
}
