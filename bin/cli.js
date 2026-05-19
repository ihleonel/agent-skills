#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { listSkills, getSkill } from '../src/registry.js';
import { installSkill } from '../src/installer.js';
import { promptDestination } from '../src/prompt.js';

const program = new Command();

program
  .name('skills')
  .description('CLI para instalar skills de agentes IA en cualquier proyecto')
  .version('1.0.0');

// ─── list ────────────────────────────────────────────────────────────────────
program
  .command('list')
  .description('Listar todas las skills disponibles')
  .action(async () => {
    try {
      const skills = await listSkills();

      if (skills.length === 0) {
        console.log(chalk.yellow('No hay skills disponibles.'));
        return;
      }

      console.log(chalk.bold(`\n📦 Skills disponibles (${skills.length})\n`));

      for (const skill of skills) {
        const { metadata } = skill;
        const tags = metadata.tags?.join(', ') ?? '—';
        console.log(
          `  ${chalk.green('●')} ${chalk.bold(metadata.name.padEnd(16))} ${chalk.dim(`v${metadata.version}`)}  —  ${metadata.description}`
        );
        console.log(`  ${''.padEnd(18)} ${chalk.dim(`Tags: ${tags}`)}\n`);
      }
    } catch (err) {
      console.error(chalk.red(`Error al listar skills: ${err.message}`));
      process.exit(1);
    }
  });

// ─── install ─────────────────────────────────────────────────────────────────
program
  .command('install <skill-name>')
  .description('Instalar una skill en el proyecto destino')
  .option('--dest <path>', 'Ruta destino donde instalar la skill')
  .action(async (skillName, options) => {
    try {
      const skill = await getSkill(skillName);
      if (!skill) {
        console.error(chalk.red(`Skill no encontrada: "${skillName}"`));
        console.error(chalk.dim('Ejecutá `skill-installer list` para ver las skills disponibles.'));
        process.exit(1);
      }

      const { metadata } = skill;
      const dest = options.dest
        ? options.dest
        : await promptDestination(skillName);

      await installSkill(skill, dest);
    } catch (err) {
      console.error(chalk.red(`Error al instalar la skill: ${err.message}`));
      process.exit(1);
    }
  });

// ─── info ─────────────────────────────────────────────────────────────────────
program
  .command('info <skill-name>')
  .description('Ver información/metadata de una skill')
  .action(async (skillName) => {
    try {
      const skill = await getSkill(skillName);
      if (!skill) {
        console.error(chalk.red(`Skill no encontrada: "${skillName}"`));
        console.error(chalk.dim('Ejecutá `skill-installer list` para ver las skills disponibles.'));
        process.exit(1);
      }

      const { metadata, files } = skill;
      const tags = metadata.tags?.join(', ') ?? '—';

      console.log(`\n📄 ${chalk.bold(metadata.name)} — ${chalk.dim(`v${metadata.version}`)}`);
      console.log(`   ${metadata.description}`);
      console.log(`   ${chalk.dim(`Tags: ${tags}`)}`);
      console.log(`   ${chalk.dim(`Archivos: ${files.join(', ')}`)}\n`);
    } catch (err) {
      console.error(chalk.red(`Error al obtener info de la skill: ${err.message}`));
      process.exit(1);
    }
  });

program.parse();
