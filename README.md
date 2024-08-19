# Lancet plugin for RPG Maker MV

Welcome! 

This plugin is a simple implementation of the Lancet skill from Final Fantasy X.

## Features

When an actor uses the Lancet skill on an enemy that can teach something through Lancet, they learn the skill immediately and can use it next turn.

## Lancet setup

You need two things: a Lancet skill and an enemy with a notetag declaring a skill that can be learnt from Lancet. You'll get a different message depending on the situation:

- the actor learnt a new skill
- the actor already knows the Lancet skill this enemy can teach
- this enemy doesn't teach any skill from Lancet

### Skill setup

Create a skill that targets one enemy, make it call a common event, and make the common event call the following plugin command:

```
MooseLancet
```

That's it.

### Enemy notetag

The enemy notetag isn't much more complicated, it just need to look like this:

```
<Lancet: n/>
```

Where `n` is the id of the skill you want to learn from this enemy.

## Localization

If English isn't the language of your game or if you want to tweak the strings used in the plugin, you can edit any of them in the plugin's configuration under the "Strings" parameter.

Please note that the placeholders between double underscores should **not** be translated.

Ex: `__actor__ learnt __skill__`

Should **not** be translated to `__attore__ ha imparato __abilità__` but to `__actor__ ha imparato __skill__!` (powered by Google Translate).

## Terms of use

Free to use in your non-commercial projects, with credit to MetaphoricalMoose :)
Please don't use in commercial projects.

## Changlog

* Version: 1.0: Initial Release
