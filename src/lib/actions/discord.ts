export default async function postMessageToDiscord(title: string, message: string) {
  const DISCORD_URL = process.env.DISCORD_URL as string;
  await fetch(DISCORD_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: null,
      embeds: [
        {
          title,
          description: `강의 업데이트의 실패했습니다.\n\n 에러메세지:\n${message}`,
          color: 16734309,
        },
      ],
      attachments: [],
    }),
  });
}
