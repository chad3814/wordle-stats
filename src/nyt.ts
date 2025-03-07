import { WordlePuzzleInfo, WordleStats } from './wordle';

export async function getCurrentPuzzleInfo(cookies: string): Promise<WordlePuzzleInfo> {
    const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
        Referer: 'https://www.nytimes.com/games/wordle/index.html',
        Cookie: cookies,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:136.0) Gecko/20100101 Firefox/136.0',
    };
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString(10).padStart(2, '0')}-${now.getDate().toString(10).padStart(2, '0')}`;
    const res = await fetch(`https://www.nytimes.com/svc/wordle/v2/${dateStr}.json`, {headers});
    if (!res.ok) {
        console.error('failed to fetch the current puzzle', dateStr, res.status, res.statusText);
        throw new Error('FetchError');
    }
    return await res.json() as WordlePuzzleInfo;
}

export async function getPuzzleStats(cookies: string, id: number): Promise<WordleStats> {
    const headers = {
        'Content-type': 'application/x-www-form-urlencoded',
        Referer: 'https://www.nytimes.com/games/wordle/index.html',
        Cookie: cookies,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:136.0) Gecko/20100101 Firefox/136.0',
    };
    const res = await fetch(`https://www.nytimes.com/svc/games/state/wordleV2/latests?puzzle_ids=${id}`, {headers});
    if (!res.ok) {
        console.error('failed to get the puzzle stats for id', id, res.status, res.statusText);
        throw new Error('FetchError');
    }
    return await res.json() as WordleStats;
}
