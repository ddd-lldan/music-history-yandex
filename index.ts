const token = process.env.YANDEX_MUSIC_TOKEN;

if (!token) {
    throw new Error('Not found token');
}

const response = await fetch('https://api.music.yandex.net/music-history?fullModelsCount=999999999', {
    headers: {
        Authorization: `OAuth ${token}`,
    },
});

const data = (await response.json()) as any;

const filename = `./data/${new Date().getTime()}.json`;

await Bun.write(filename, JSON.stringify({ history: data.result.historyTabs })!);

console.log(`created ${filename}`);
