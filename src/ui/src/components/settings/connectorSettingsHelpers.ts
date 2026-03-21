import type { ConnectorProfileSnapshot, ConnectorTargetSnapshot } from '@/types'

type QqProfileLike = {
  profile_id?: string
  bot_name?: string
  app_id?: string
}

export function qqProfileDisplayLabel(
  profile: QqProfileLike,
  snapshot?: Pick<ConnectorProfileSnapshot, 'label'> | null
): string {
  const snapshotLabel = String(snapshot?.label || '').trim()
  if (snapshotLabel) {
    return snapshotLabel
  }
  const botName = String(profile.bot_name || '').trim()
  const appId = String(profile.app_id || '').trim()
  if (botName && appId) {
    return `${botName} · ${appId}`
  }
  return botName || appId || String(profile.profile_id || '').trim() || 'QQ'
}

export function selectQqProfileTarget(
  targets: ConnectorTargetSnapshot[],
  mainChatId?: string | null
): ConnectorTargetSnapshot | null {
  const normalizedMainChatId = String(mainChatId || '').trim()
  return (
    targets.find((item) => String(item.bound_quest_id || '').trim()) ||
    (normalizedMainChatId
      ? targets.find((item) => String(item.chat_id || '').trim() === normalizedMainChatId)
      : undefined) ||
    targets[0] ||
    null
  )
}

export function qqProfileStatus(
  profileSnapshot: Pick<ConnectorProfileSnapshot, 'binding_count' | 'last_conversation_id' | 'main_chat_id'> | null | undefined,
  targets: ConnectorTargetSnapshot[],
  mainChatId?: string | null
): 'waiting' | 'ready' | 'bound' {
  const hasBinding =
    Number(profileSnapshot?.binding_count || 0) > 0 ||
    targets.some((item) => Boolean(String(item.bound_quest_id || '').trim()))
  if (hasBinding) {
    return 'bound'
  }
  const hasDetectedTarget =
    Boolean(String(mainChatId || profileSnapshot?.main_chat_id || '').trim()) ||
    Boolean(String(profileSnapshot?.last_conversation_id || '').trim()) ||
    targets.length > 0
  return hasDetectedTarget ? 'ready' : 'waiting'
}
