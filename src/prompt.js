import { stat } from 'fs/promises';
import { join } from 'path';
import inquirer from 'inquirer';

/**
 * Prompts the user for the destination path where a skill should be installed.
 * If the target folder already exists, asks for confirmation to overwrite.
 *
 * @param {string} skillName - The name of the skill being installed.
 * @returns {Promise<string>} The resolved destination base path.
 */
export async function promptDestination(skillName) {
  const defaultDest = join('./skills', skillName);

  const { dest } = await inquirer.prompt([
    {
      type: 'input',
      name: 'dest',
      message: '¿Dónde querés instalar la skill?',
      default: `./skills/${skillName}`,
    },
  ]);

  // Normalize: the caller expects a *base* path (skill subfolder is appended by installer).
  // But if the user already typed a path ending with the skill name, use its parent.
  const resolvedDest = dest.trimEnd().replace(/\/+$/, '');

  // Check if the final target (base/skillName) already exists
  const finalTarget = resolvedDest.endsWith(skillName)
    ? resolvedDest
    : join(resolvedDest, skillName);

  let exists = false;
  try {
    await stat(finalTarget);
    exists = true;
  } catch {
    exists = false;
  }

  if (exists) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `La carpeta "${finalTarget}" ya existe. ¿Querés sobreescribirla?`,
        default: false,
      },
    ]);

    if (!overwrite) {
      console.log('Instalación cancelada.');
      process.exit(0);
    }
  }

  // Return the base path (installer will append skillName)
  return resolvedDest.endsWith(skillName)
    ? join(resolvedDest, '..')
    : resolvedDest;
}
