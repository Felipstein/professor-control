export function getUserAvatarURL(userId: string, userAvatarKey: string) {
  return `https://cdn.discordapp.com/avatars/${userId}/${userAvatarKey}.png`;
}
