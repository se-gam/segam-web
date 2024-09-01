export default async function postMessageToDiscord(title: string, message: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Local 환경에서는 Discord로 메세지를 보낼 수 없어요.');
    return;
  }
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
          description: `에러메세지:\n${message}`,
          color: 16734309,
        },
      ],
      attachments: [],
    }),
  });
}
