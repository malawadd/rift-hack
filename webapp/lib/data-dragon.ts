const DATA_DRAGON_BASE_URL = 'https://ddragon.leagueoflegends.com';

let cachedVersion: string | null = null;

export async function getLatestVersion(): Promise<string> {
  if (cachedVersion) {
    return cachedVersion;
  }

  try {
    const response = await fetch(`${DATA_DRAGON_BASE_URL}/api/versions.json`);
    const versions: string[] = await response.json();
    cachedVersion = versions[0];
    return cachedVersion;
  } catch (error) {
    console.error('Failed to fetch Data Dragon version:', error);
    return '15.22.1';
  }
}

export function getChampionSquareUrl(championName: string, version?: string): string {
  const formattedName = formatChampionName(championName);
  const versionParam = version || '15.22.1';
  return `${DATA_DRAGON_BASE_URL}/cdn/${versionParam}/img/champion/${formattedName}.png`;
}

export function getChampionSplashUrl(championName: string, skinNumber: number = 0): string {
  const formattedName = formatChampionName(championName);
  return `${DATA_DRAGON_BASE_URL}/cdn/img/champion/splash/${formattedName}_${skinNumber}.jpg`;
}

export function getChampionLoadingUrl(championName: string, skinNumber: number = 0): string {
  const formattedName = formatChampionName(championName);
  return `${DATA_DRAGON_BASE_URL}/cdn/img/champion/loading/${formattedName}_${skinNumber}.jpg`;
}

export async function getChampionData(championName: string): Promise<unknown> {
  try {
    const version = await getLatestVersion();
    const formattedName = formatChampionName(championName);
    const response = await fetch(
      `${DATA_DRAGON_BASE_URL}/cdn/${version}/data/en_US/champion/${formattedName}.json`
    );
    const data = await response.json();
    return data.data[formattedName];
  } catch (error) {
    console.error(`Failed to fetch champion data for ${championName}:`, error);
    return null;
  }
}

export async function getAllChampions(): Promise<Record<string, unknown>> {
  try {
    const version = await getLatestVersion();
    const response = await fetch(
      `${DATA_DRAGON_BASE_URL}/cdn/${version}/data/en_US/champion.json`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch all champions:', error);
    return {};
  }
}

function formatChampionName(name: string): string {
  if (!name) return '';

  const specialCases: Record<string, string> = {
    'wukong': 'MonkeyKing',
    'monkeyking': 'MonkeyKing',
    'aurelionsol': 'AurelionSol',
    'aurelion sol': 'AurelionSol',
    'drmundo': 'DrMundo',
    'dr mundo': 'DrMundo',
    'jarvaniv': 'JarvanIV',
    'jarvan iv': 'JarvanIV',
    'kogmaw': 'KogMaw',
    'kog maw': 'KogMaw',
    'leblanc': 'Leblanc',
    'leesin': 'LeeSin',
    'lee sin': 'LeeSin',
    'masteryi': 'MasterYi',
    'master yi': 'MasterYi',
    'missfortune': 'MissFortune',
    'miss fortune': 'MissFortune',
    'reksai': 'RekSai',
    'rek sai': 'RekSai',
    'renata': 'Renata',
    'renata glasc': 'Renata',
    'tahmkench': 'TahmKench',
    'tahm kench': 'TahmKench',
    'twistedfate': 'TwistedFate',
    'twisted fate': 'TwistedFate',
    'xinzhao': 'XinZhao',
    'xin zhao': 'XinZhao',
    'belveth': 'Belveth',
    'bel veth': 'Belveth',
    'kaisa': 'Kaisa',
    'kai sa': 'Kaisa',
    'khazix': 'Khazix',
    'kha zix': 'Khazix',
    'velkoz': 'Velkoz',
    'vel koz': 'Velkoz',
    'chogath': 'Chogath',
    'cho gath': 'Chogath',
    'renataglasc': 'Renata',
  };

  const lowerName = name.toLowerCase().trim();

  if (specialCases[lowerName]) {
    return specialCases[lowerName];
  }

  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export function getRoleIconUrl(role: string): string {
  const roleMap: Record<string, string> = {
    'top': 'Top',
    'jungle': 'Jungle',
    'mid': 'Middle',
    'adc': 'Bottom',
    'support': 'Support',
  };

  const roleName = roleMap[role.toLowerCase()] || role;
  return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-${roleName.toLowerCase()}.svg`;
}
