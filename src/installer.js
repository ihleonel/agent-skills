import { mkdir, copyFile, stat } from 'fs/promises';
import { join, dirname } from 'path';
import chalk from 'chalk';
import ora from 'ora';

/**
 * Copies a skill directory recursively to the given destination.
 * @param {{ name: string, path: string, metadata: object, files: string[] }} skill
 * @param {string} destBase - Destination base path (the skill folder will be created inside it).
 */
export async function installSkill(skill, destBase) {
  const { metadata, path: skillPath, files } = skill;
  const destDir = join(destBase, metadata.name);

  console.log(chalk.blue(`ℹ  Instalando: ${chalk.bold(metadata.name)} v${metadata.version}`));
  console.log(chalk.blue(`ℹ  Destino:    ${destDir}\n`));

  const spinner = ora('Copiando archivos...').start();

  try {
    // Ensure the destination directory exists
    await mkdir(destDir, { recursive: true });

    for (const relativePath of files) {
      const srcFile = join(skillPath, relativePath);
      const destFile = join(destDir, relativePath);

      // Create any intermediate subdirectories
      await mkdir(dirname(destFile), { recursive: true });
      await copyFile(srcFile, destFile);
    }

    spinner.succeed(
      chalk.green(`Skill instalada correctamente en ${chalk.bold(destDir)}`)
    );
  } catch (err) {
    spinner.fail(chalk.red('Error al copiar archivos.'));
    throw err;
  }
}
