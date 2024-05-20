/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:45:40
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-20 16:45:41
 * @Description:
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'init',
        'ci',
        'wip',
        'feat',
        'fix',
        'merge',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'build',
      ],
    ],
    'subject-case': [0],
  },
};
