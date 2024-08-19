/*:
 * ------------------------------------------------------------------------------
 * @plugindesc v1.0 - Learn skills from monster with Lancet
 * @author Metaphoric Moose
 * @version 1.0
 * @url https://github.com/MetaphoricalMoose
 *
 * @param Lancet Strings
 *
 * @param Skill learnt
 * @parent Lancet Strings
 * @type text
 *
 * @param Skill already learnt
 * @parent Lancet Strings
 * @type text
 *
 * @param No skill to learn
 * @parent Lancet Strings
 * @type text
 *
 * ------------------------------------------------------------------------------
 * @help
 *
 * Coming soon
 *
 * ------------------------------------------------------------------------------
 * Terms of Use
 * ------------------------------------------------------------------------------
 * - Free for use in non-commercial projects with credits to MetaphoricalMoose :)
 * - Do not use in commercial projects
 */

var Imported = Imported || {};
Imported['Moose_Lancet'] = "1.0";

var MooseLancet = MooseLancet || {};
MooseLancet.parameters = {};

(function() {
    const parameters = PluginManager.parameters('Moose_Lancet');

    const lancetFormat = /<Lancet:\s*(\d+)\s*\/>/;

    const noSkillFound = -1;

    const defaultStrings = {
        skilllearnt: '__actor__ learnt __skill__',
        skillalreadylearnt: '__actor__ already knows __skill__',
        noskilltolearn: 'No skill to learn from __enemy__'
    };

    MooseLancet.parameters['strings'] = {
    	'skilllearnt': parameters['Skill learnt'] ? parameters['Skill learnt'] : defaultStrings['skilllearnt'],
    	'skillalreadylearnt': parameters['Skill already learnt'] ? parameters['Skill already learnt'] : defaultStrings['skillalreadylearnt'],
    	'noskilltolearn': parameters['No skill to learn'] ? parameters['No skill to learn'] : defaultStrings['noskilltolearn']
    };

 	// Plugin commands
    let old_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        old_Game_Interpreter_pluginCommand.call(this, command, args);

        if(command.toLowerCase() === 'mooselancet') {
			lancet();
        }
    }

    function lancet()
    {
    	const caster = BattleManager._subject;
    	const enemy = getLastTargetedEnemy();

        const lancetSkillId = getLancetSkillId(enemy);

        if (lancetSkillId === noSkillFound) {
            const message = MooseLancet.parameters['strings']['noskilltolearn'].replace('__enemy__', enemy.name);
            $gameMessage.add(message);

            return;
        }

        const skill = $dataSkills[lancetSkillId];

        if (caster.isLearnedSkill(lancetSkillId)) {
            let message = MooseLancet.parameters['strings']['skillalreadylearnt'].replace('__actor__', caster.name()).replace('__skill__', skill.name);
            $gameMessage.add(message);

            return;
        }

        caster.learnSkill(lancetSkillId);

        const message = MooseLancet.parameters['strings']['skilllearnt'].replace('__actor__', caster.name()).replace('__skill__', skill.name);
        $gameMessage.add(message);

        return;
    }

	function getDefaultConfiguration()
    {
    	let configuration = {};
    	configuration[baitBonus] = 0;
    	configuration[tamingRate] = 100;
    	configuration[tamingRequirements] = [];
    	configuration[tamingSuccess] = [];
    	configuration[tamingFailure] = [];

    	return configuration;
    }

    function getLastTargetedEnemy() {
		let lastTargetEnemyIndex = BattleManager._subject._lastTargetIndex;
    	let troopEnemy = $gameTroop.members()[lastTargetEnemyIndex];
    	let enemyId = troopEnemy._enemyId;
    	let enemy = $dataEnemies[enemyId];

    	return enemy;
    }

    function getLancetSkillId(enemy)
    {
		let note = enemy.note;
        let noteLines = note.split(/[\r\n]+/);
        let result;

        const lancetRegex = new RegExp(lancetFormat, "i");

        for(line of noteLines) {
            result = lancetRegex.exec(line);

            if (result) {
                return result[1]; // skill Id
            }
        }

        return noSkillFound;
    }
})();
