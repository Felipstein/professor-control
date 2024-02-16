export function getGuildAvatarURL(guildId: string, guildAvatarKey: string) {
  return `https://cdn.discordapp.com/icons/${guildId}/${guildAvatarKey}.png`;
}
