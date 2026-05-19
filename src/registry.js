import { readdir, readFile, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = join(__dirname, '..', 'skills');

/**
 * Reads all files (recursively) inside a directory and returns their relative paths.
 * @param {string} dir - Absolute path to the directory.
 * @param {string} [base] - Base path used to compute relative paths.
 * @returns {Promise<string[]>}
 */
async function walkDir(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await walkDir(fullPath, base);
      results.push(...nested);
    } else {
      // Store path relative to the skill root
      results.push(fullPath.slice(base.length + 1));
    }
  }

  return results;
}

/**
 * Loads a single skill by reading its metadata.json and listing its files.
 * @param {string} skillName
 * @returns {Promise<{name: string, path: string, metadata: object, files: string[]} | null>}
 */
export async function getSkill(skillName) {
  const skillPath = join(SKILLS_DIR, skillName);

  let dirStat;
  try {
    dirStat = await stat(skillPath);
  } catch {
    return null;
  }

  if (!dirStat.isDirectory()) {
    return null;
  }

  const metadataPath = join(skillPath, 'metadata.json');
  let metadata;
  try {
    const raw = await readFile(metadataPath, 'utf8');
    metadata = JSON.parse(raw);
  } catch {
    throw new Error(`No se pudo leer metadata.json en la skill "${skillName}".`);
  }

  const files = await walkDir(skillPath);

  return {
    name: skillName,
    path: skillPath,
    metadata,
    files,
  };
}

/**
 * Discovers and returns all available skills from the /skills directory.
 * @returns {Promise<Array<{name: string, path: string, metadata: object, files: string[]}>>}
 */
export async function listSkills() {
  let entries;
  try {
    entries = await readdir(SKILLS_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  const skills = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    try {
      const skill = await getSkill(entry.name);
      if (skill) skills.push(skill);
    } catch {
      // Skip skills with invalid metadata silently
    }
  }

  return skills;
}
