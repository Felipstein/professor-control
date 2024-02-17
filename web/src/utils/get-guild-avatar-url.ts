export function getGuildAvatarURL(
  guildId: string,
  guildAvatarKey: string,
  extension: 'png' | 'gif' | null = 'png',
) {
  return `https://cdn.discordapp.com/icons/${guildId}/${guildAvatarKey}${extension ? `.${extension}` : ''}`;
}
