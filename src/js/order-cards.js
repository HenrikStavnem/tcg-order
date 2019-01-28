var users = [
   {
      id: 2,
      name: 'Duke',
      image: 'duke'
   },
   {
      id: 6,
      name: 'Hunter',
      image: 'hunter'
   },
   {
      id: 5,
      name: 'Jolly',
      image: 'jolly'
   },
   {
      id: 1,
      name: 'Red',
      image: 'red'
   }
];

var cards = [
   {
      id: 1,
      name: 'Abilites',
      cards: [
         {
            id: 1,
            image: '1-001.png',
            text: 'Play only if you control a Mount.<br />If your hero would be dealt fatal damage this turn, it is dealt damage until it has 1 remaining health instead.',
            textBg: 'spell'
         },
         {
            id: 2,
            image: '1-002.png',
            text: 'Your hero heals target hero or ally 4 damage for each totem you control.',
            textBg: 'spell'
         },
         {
            id: 3,
            image: '1-003.png',
            text: '<b>Ongoing:</b> Your "Chain Heal" and "Greater Chain Heal" abilites heal double the amount instead.<br />Pay 2, destroy this ability {arrow}<br />Choose a "Chain Heal" or "Greater Chain Heal" from your graveyard and put it into your hand.',
            textBg: 'spell',
            originImage: 'card-images/refs/ch_gch.png'
         },
         {
            id: 4,
            image: '1-004.png',
            text: 'Attach to target hero or ally and your hero heals it for 10 damage.<br /><b>Ongoing:</b> At the beginning of your turn, destroy Renewing Life and your hero heals 4 damage from attached character.',
            textBg: 'spell'
         },
         {
            id: 5,
            image: '1-005.png',
            text: 'Your hero heals 8 damage from target hero or ally. If you control a totem, the target is healed for an additional 4 damage.',
            textBg: 'spell'
         },
         {
            id: 6,
            image: '1-006.png',
            text: '<b>Restoration Hero Required</b><br />When Totem of the Spirit enters play, your hero heals 10 damage from target hero or ally.<br />Pay 1, destroy Totem of the Spirit {arrow} Prevent the next 5 damage that would be dealt to target hero or ally this turn.',
            textBg: 'spell'
         },
         {
            id: 7,
            image: '1-007.png',
            text: '<b>Restoration Hero Required</b><br />Your hero heals 12 damage from each friendly hero or ally.',
            textBg: 'spell'
         }
      ]
   },
   {
      id: 2,
      name: 'Allies',
      cards: [
         {
            id: 1,
            image: '1-008.png',
            text: '<b>Paladin or Priest Hero Required</b><br />You pay 1 less to complete quests.<br />When you place a resource face up, your hero may heal 2 damage from target hero or ally.',
            textBg: 'neutral'
         },
         {
            id: 2,
            image: '1-009.png',
            text: 'You pay 1 more to complete quests.<br />Face-up resources you control has: "{exhaust} {arrow} Prevent the next two damage that would be dealt to your hero this turn".',
            textBg: 'neutral'
         },
         {
            id: 3,
            image: '1-010.png',
            text: '<b>Night Elf Hero Required</b><br />You pay 1 less to complete quests.<br />Exhaust this ally {arrow} Return target friendly ally to its owners hand.',
            textBg: 'alliance'
         },
         {
            id: 4,
            image: '1-011.png',
            text: 'You may exhaust and destroy target worgen ally you control to play Guntrand the Snell instead of paying its cost.<br />You pay 1 less to complete quests.<br />When you complete a quest, you may ready target worgen ally you control.',
            textBg: 'alliance'
         },
         {
            id: 5,
            image: '1-012.png',
            text: '<b>Goblin Hero Required</b><br />The first quest you complete each turn costs no resources. Instead, put damage on your hero equal to that cost.',
            textBg: 'horde'
         },
         {
            id: 6,
            image: '1-013.png',
            text: '<b>Goblin, Orc or Troll Hero Required</b><br />You pay 1 less to complete quests.<br />When you place a resource face up, your hero has <b>Smash</b> this turn.',
            textBg: 'horde'
         },
         {
            id: 7,
            image: '1-014.png',
            text: '<b>Blood Elf Hero Required</b><br />You pay 1 less to complete quests.<br />When you place a resource face up, you may put target ability from your graveyard on top of your deck.',
            textBg: 'horde'
         }
      ]
   },
   {
      id: 3,
      name: 'Equipment',
      cards: [
         {
            id: 1,
            image: '1-015.png',
            text: '<b>Thrown</b><br />Combat Darts can only be exhausted if your is attacking an ally.',
            textBg: 'equipment'
         },
         {
            id: 2,
            image: '1-016.png',
            text: '<b>Thrown</b><br />When your hero deals damage to an ally with Rocket Dart, your hero deals 1 fire damage to another target hero or ally.',
            textBg: 'equipment'
         },
         {
            id: 3,
            image: '1-017.png',
            text: '<b>Thrown</b><br />When Bad Voodoo Dart deals damage to a hero or ally, attach a Poison ability token to that character called Bad Voodoo Poison with:<br />"<b>Ongoing:</b> At the beginning of your turn, your hero deals 1 shadow damage to attached character".',
            textBg: 'equipment',
            originImage: 'card-images/refs/none.png'
         },
         {
            id: 4,
            image: '1-018.png',
            text: '<b>Thrown</b>',
            textBg: 'equipment'
         },
         {
            id: 5,
            image: '1-019.png',
            text: 'Totems in your hand cost 1 less to play to a minimum of 1. Friendly totems have +2 Health.',
            textBg: 'equipment'
         },
         {
            id: 6,
            image: '1-020.png',
            text: '<b>Thrown</b><br />When your hero deals combat damage with Sentinel Glaive, he may also deal 1 melee damage to up to two other target heroes or allies.',
            textBg: 'equipment'
         },
         {
            id: 7,
            image: '1-021.png',
            text: '<b>Goblin Hero Required</b><br />When you play a goblin ally, your hero may deal 2 fire damage to it and a target opposing hero or ally.',
            textBg: 'equipment'
         },
         {
            id: 8,
            image: '1-022.png',
            text: '<b>Tauren Hero Required</b><br />War Totem costs 2 less to play if you control an Earth Totem<br />War Totem has <b>Assualt 2</b> if you control a Fire Totem.<br />You pay 2 less to strike with War Totem if you control an Air Totem.<br />When you strike with War Totem: If you control a Water Totem, your hero heals 2 damage from target hero or ally.',
            //text: '<b>Tauren Hero Required</b><br /><ul><li>War Totem costs 2 less to play if you control an Earth Totem</li><li>War Totem has <b>Assualt 2</b> if you control a Fire Totem.</li><li>You pay 2 less to strike with War Totem if you control an Air Totem.</li><li>When you strike with War Totem: If you control a Water Totem, your hero heals 2 damage from target hero or ally.</li></ul>',
            textBg: 'equipment'
         }
      ]
   },
   {
      id: 4,
      name: 'Heroes',
      cards: [
         {
            id: 1,
            image: '1-023.png',
            text: 'Pay 2 {arrow} Flip Azhera.',
            textBack: 'When you complete a quest, Azhera may heal 3 damage from target hero or ally.',
            textBg: 'alliance'
         },
         {
            id: 2,
            image: '1-024.png',
            text: 'Once per turn: Pay 1 {arrow} Flip Czalonar. If Czalonar would deal nature damage this turn, he deals that much +1 instead.',
            textBack: 'Once per turn: Pay 1 {arrow} Flip Czalonar. If Czalonar would deal arcane damage this turn, he deals that much +1 instead.',
            textBg: 'alliance'
         },
         {
            id: 3,
            image: '1-025.png',
            text: 'Pay 2 {arrow} Flip Elyria.',
            textBack: 'When you complete a quest, pay 1 less to play your next arcane ability this turn.',
            textBg: 'alliance'
         },
         {
            id: 4,
            image: '1-026.png',
            text: 'Pay 3 {arrow} Flip Heiku.',
            textBack: 'When Heiku is dealt combat damage while defending, she deals 1 arcane damage to the source of that damage.',
            textBg: 'alliance'
         },
         {
            id: 5,
            image: '1-027.png',
            text: 'Pay 3 {arrow} Flip Erendis.',
            textBack: 'If you control a Pet with <b>Elusive</b>, Erendis is <b>Untargetable</b>.',
            textBg: 'alliance'
         },
         {
            id: 6,
            image: '1-028.png',
            text: 'Pay 3 {arrow} Flip Naugrund.',
            textBack: 'If you control a ranged weapon: When an opposing ally enters play, Naugrund may deal 1 ranged damage to it.',
            textBg: 'alliance'
         },
         {
            id: 7,
            image: '1-029.png',
            text: 'Pay 3 {arrow} Flip Nenira.',
            textBack: 'You pay 2 less to strike with Bow weapons.',
            textBg: 'alliance'
         },
         {
            id: 8,
            image: '1-030.png',
            text: 'Pay 3 {arrow} Flip Arienne.',
            textBack: 'When you play an Arcane ability with a cost 3 or more, Arienne may deal 1 arcane damage to target hero or ally.',
            textBg: 'alliance'
         },
         {
            id: 9,
            image: '1-031.png',
            text: 'Pay 3, {exhaust} {arrow} Flip Fiona.',
            textBack: 'Fiona can\'t ready.<br />At the end of your turn, <b>Delve</b>.',
            textBg: 'alliance'
         },
         {
            id: 10,
            image: '1-032.png',
            text: 'Pay 4 {arrow} Flip Jelani. Search your collection for a card named "Fireball", and put it into your hand.',
            textBack: '{exhaust} {arrow} Jelani deals 1 fire damage for each card in your graveyard named "Fireball" to target ally.',
            textBg: 'alliance',
            originImage: 'card-images/refs/fireball.png',
            originUrl: 'http://wow.tcgbrowser.com/#!/cardid=444'
         },
         {
            id: 11,
            image: '1-033.png',
            text: 'Pay 2 {arrow} Flip Lyrande.',
            textBack: 'Once per turn: The second time you draw a card, Lyrande deals 1 arcane damage to target hero or ally.',
            textBg: 'alliance'
         },
         {
            id: 12,
            image: '1-034.png',
            text: 'Pay 2 {arrow} Flip Hevia.',
            textBack: 'Once on your turn only: Ready target ally you control. That ally can\'t attack this turn.',
            textBg: 'alliance'
         },
         {
            id: 13,
            image: '1-035.png',
            text: 'Pay 3 {arrow} Flip Lauri&euml.',
            textBack: 'When Lauri&euml exhausts to protect, prevent the next 1 damage that would be dealt to her and ready Lauri&euml.',
            textBg: 'alliance'
         },
         {
            id: 14,
            image: '1-036.png',
            text: 'Pay 2 {arrow} Flip Lauri&euml.',
            textBack: 'You pay 3 less to strike with weapons you control, if you completed a quest this turn.',
            textBg: 'alliance'
         },
         {
            id: 15,
            image: '1-037.png',
            text: 'Pay 2 {arrow} Flip Meneldil.',
            textBack: 'When Meneldil heals damage with an ability, put a Holy Power counter, up to three, on Meneldil.<br /><br /><b>Word of Glory:</b> Remove three Holy Power {arrow} Meneldil heals 6 damage from target hero or ally.<br /><br /><b>Templar\'s Verdict:</b> Remove three Holy Power {arrow} Meneldil deals 4 holy damage to target hero or ally.',
            textBg: 'alliance'
         },
         {
            id: 16,
            image: '1-038.png',
            text: 'Pay 2 {arrow} Flip Yrel.<br /><b>Deckbuilding:</b> You can only include allies with the race Draenei in your deck.',
            textBack: 'Allies you control have -3 ATK and +2 HEALTH.',
            textBg: 'alliance'
         },
         {
            id: 17,
            image: '1-039.png',
            text: 'Pay 1 {arrow} Flip Heriel.',
            textBack: 'If you control an equipment, Heriel has <b>Mend 2</b>.',
            textBg: 'alliance'
         },
         {
            id: 18,
            image: '1-040.png',
            text: 'Pay 2 {arrow} Flip Janella.',
            textBack: 'Pay 1, {exhaust} {arrow} Prevent the next 3 damage that would be dealt to target hero or ally this turn. ',
            textBg: 'alliance'
         },
         {
            id: 19,
            image: '1-041.png',
            text: 'Pay 4 {arrow} Flip Luthnia.',
            textBack: 'When you play an ongoing ability, Luthnia may heal 1 damage from target hero or ally.<br /><b>Deckbuilding</b>: You can\'t include Shadow and Holy abilities in your deck, but you can include Druid Restoration abilities.',
            textBg: 'alliance'
         },
         {
            id: 20,
            image: '1-042.png',
            text: 'Pay 3 {arrow} Flip Neithon.',
            textBack: 'At the end of your turn, you may ready target resource.',
            textBg: 'alliance'
         },
         /*
         {
            id: 21,
            image: '1-043.png',
            text: 'Pay 3 {arrow} Flip the Jolly Pirate. Then, put a 0/1 Parrot Beast ally tokennamed “The Polly Pirate” into play.',
            textBack: 'When The Jolly Pirate has Stealth, he also has Assualt 2.',
            textBg: 'alliance',
            originImage: 'card-images/tokens/the-polly-pirate.png',
         },
         */
         {
            id: 22,
            image: 'none.png',
            text: '<b>Venacisca Julietta Evenstar</b><br />Card is not done yet.<br />Power is not done',
            textBg: 'alliance'
         },
         {
            id: 23,
            image: '1-045.png',
            text: 'Pay 3 {arrow} Flip Anlenya.',
            textBack: 'When Anlenya heals damage, if you control a Water Totem, she heals that much plus 1 instead.',
            textBg: 'alliance'
         },
         {
            id: 24,
            image: '1-046.png',
            text: 'Pay 3 {arrow} Flip Sindarien.',
            textBack: 'Weapons you control has +1 ATK for each totem you control.',
            textBg: 'alliance'
         },
         {
            id: 25,
            image: 'none.png',
            text: 'Pay 3 and put 10 damage on Urtham {arrow} Flip Urtham',
            textBack: 'Your "Chain heal" and "Greater Chain heal" abilities can target the same hero or ally more than once.',
            textBg: 'alliance',
            originImage: 'card-images/refs/ch_gch.png'
         },
         {
            id: 26,
            image: '1-048.png',
            text: 'Pay 2 {arrow} Flip Annlilly.',
            textBack: 'You can control an additional pet.',
            textBg: 'alliance'
         },
         {
            id: 27,
            image: '1-049.png',
            text: 'Pay 3 {arrow} Flip Darania.',
            textBack: 'When an opponent ally is removed from game, ready target resource.',
            textBg: 'alliance'
         },
         {
            id: 28,
            image: '1-050.png',
            text: 'Pay 3 {arrow} Flip Jaenx.',
            textBack: 'At the start of your turn put a 1/1 Imp demon ally token into play.',
            textBg: 'alliance',
            originImage: 'card-images/tokens/imp.png',
         },
         {
            id: 29,
            image: '1-051.png',
            text: 'Pay 4 and destroy two allies in your party {arrow} Flip Wilfred Fizzlebang.<br />Then, put a 10/10 ally demon token named Jaraxxus into play with "Jaraxxus can only be destroyed by fatal damage".',
            textBack: 'At the start of your turn, Jaraxxus will attack Wilfred unless you pay 2 and destroy an ally you control.',
            textBg: 'alliance',
            originImage: 'card-images/tokens/jaraxxus.png',
         },
         {
            id: 30,
            image: '1-052.png',
            text: 'Pay 3 {arrow} Flip Drizzti.',
            textBack: 'If Drizzti has <b>Dualwield</b>: When Drizzti deals combat damage to an ally, he may deal that amount of melee damage to another target ally.',
            textBg: 'alliance'
         },
         {
            id: 31,
            image: '1-053.png',
            text: 'Pay 3 {arrow} Flip Duhna.',
            textBack: 'When Duhna prevents damage with a shield while protecting, she deals that much damage to the attacker.',
            textBg: 'alliance'
         },
         {
            id: 32,
            image: '1-054.png',
            text: 'Pay 3 {arrow} Flip Gandor.',
            textBack: 'Gandor have <b>Assault 1</b> for each armor equipment you control.',
            textBg: 'alliance'
         },
         {
            id: 33,
            image: '1-055.png',
            text: ' Pay 2 {arrow} Flip Keigron.',
            textBack: 'When you play an Armor, Keigron may deal 1 frost damage to target ally.',
            textBg: 'horde'
         },
         {
            id: 34,
            image: '1-056.png',
            text: 'Pay 3 {arrow} Flip Urrock.',
            textBack: 'Your instant Hunter abilities cost 1 less to play, to a minimum of 1.',
            textBg: 'horde'
         },
         {
            id: 35,
            image: '1-057.png',
            text: 'Pay 2 {arrow} Flip Varthin.',
            textBack: 'Pets you control have <bAssault 2</b>.',
            textBg: 'horde'
         },
         {
            id: 36,
            image: '1-058.png',
            text: 'Pay 3 {arrow} Flip Dann\'thas.',
            textBack: 'Exhaust Dann\'thas, you pay 1 less to play your next instant Frost ability this turn.',
            textBg: 'horde'
         },
         {
            id: 37,
            image: '1-059.png',
            text: 'Pay 2 {arrow} Flip Agreynell.',
            textBack: 'If you control a Battleground location, you pay 1 less to complete quests.',
            textBg: 'horde'
         },
         {
            id: 38,
            image: '1-060.png',
            text: 'Pay 2 {arrow} Flip Henloran.',
            textBack: 'If you control an armor, when Henloran deals holy damage, he deals that much +1 instead.',
            textBg: 'horde'
         },
         {
            id: 39,
            image: 'none.png',
            text: '<b>Vanessa Nightsky</b><br />Card is not done yet.<br />Art is missing',
            textBg: 'horde'
         },
         {
            id: 40,
            image: '1-062.png',
            text: 'Pay 4 {arrow} Flip Elisa',
            textBack: 'When a card in your deck refers to the value X. Calculate that value + 1.',
            textBg: 'horde'
         },
         {
            id: 41,
            image: '1-063.png',
            text: 'Pay 3 {arrow} Flip Rockva',
            textBack: 'On your turn, prevent the first 3 damage Rockva would receive from defending allies.',
            textBg: 'horde'
         },
         {
            id: 42,
            image: '1-064.png',
            text: 'Pay 3 {arrow} Flip Wraag',
            textBack: 'At the start of your turn, Wraag deal 1 nature damage to every target opposing hero or ally, for each of your abilities you have attach to it.',
            textBg: 'horde'
         },
         {
            id: 43,
            image: '1-065.png',
            text: 'Pay 2 {arrow} Flip Brouto',
            textBack: 'Earth Totems you control have +2 HEALTH.',
            textBg: 'horde'
         },
         {
            id: 44,
            image: 'none.png',
            text: '<b>Sixsa Wildstorm</b><br />Card is not done yet.<br />Art is missing',
            textBg: 'horde'
         },
         {
            id: 45,
            image: '1-067.png',
            text: 'Pay 2 {arrow} Flip Tazaargrath',
            textBack: 'At the start of your turn if you control a fire totem, Tazaargrath deals 1 fire damage to target hero or ally.',
            textBg: 'horde'
         },
         /*
         {
            id: 999,
            image: 'delete.png',
            text: '<b>DELETE</B>',
            textBg: 'horde',
            originImage: 'card-images/delete.png'
         },
         */
         {
            id: 46,
            image: '1-068.png',
            text: 'Pay 3 {arrow} Flip Carolina',
            textBack: 'When an opposing ally is put into its owner\'s hand, draw a card.',
            textBg: 'horde'
         },
         {
            id: 47,
            image: '1-069.png',
            text: 'Pay 3 {arrow} Flip Brax.',
            textBack: 'When you play an ally, Brax deals 3 damage to it and gives it <b>Ferocity</b> this turn.<br /><br /><b>Deckbuilding:</b> You can only include orc allies in your deck.',
            textBg: 'horde'
         },
         {
            id: 48,
            image: '1-070.png',
            text: 'Pay 3 {arrow} Flip Drougor',
            textBack: 'You pay 1 less to play armor equipment.',
            textBg: 'horde'
         },
         {
            id: 49,
            image: '1-071.png',
            text: 'Pay 1 {arrow} Flip Ganezh.',
            textBack: 'You pay 1 less to play 2H weapons.',
            textBg: 'horde'
         },
         {
            id: 50,
            image: '1-072.png',
            text: 'Pay 3 {arrow} Flip Kristarz.',
            textBack: 'Allies you control have <b>Berserk</b>.<br />At the end of your turn, put 2 damage on each of your allies.<br /><br /><b>Deckbuilding:</b> You can only include troll allies in your deck.',
            textBg: 'horde'
         },
         {
            id: 51,
            image: '1-073.png',
            text: 'Pay 3 {arrow} Flip Ragegar.',
            textBack: 'Weapons you control have +1 ATK.',
            textBg: 'horde'
         },
      ]
   },
   {
      id: 5,
      name: 'Locations',
      cards: [
         {
            id: 1,
            image: 'none.png', //1-074
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 2,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 3,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 4,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 5,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 6,
            image: 'none.png', //
            text: '<b>Kamagua</b><br />Skipped',
            textBg: 'neutral',
            originImage: 'card-images/tokens/tuskarr-meal.png' // replace with tuskarr meal token
         },
         {
            id: 7,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 8,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 9,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 10,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 11,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 12,
            image: 'none.png', //
            text: '<b>Moonglade</b><br />Skipped',
            textBg: 'neutral',
            originImage: 'card-images/refs/none.png' // replace with portal to moonglade token
         },
         {
            id: 13,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 14,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 15,
            image: 'none.png', //
            text: '<b>Dreadscar Rift</b><br />Skipped',
            textBg: 'neutral',
            originImage: 'card-images/tokens/infernal.png'
         },
         {
            id: 16,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 17,
            image: 'none.png', //
            text: '<b>Grizzly Hills</b><br />Skipped',
            textBg: 'neutral',
            originImage: 'card-images/refs/none.png' // replace with silverbrook worgens token
         },
         {
            id: 18,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 19,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 20,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 21,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 22,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 23,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 24,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         }
      ]
   },
   {
      id: 6,
      name: 'Master Heroes',
      cards: [
         {
            id: 1,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 2,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 3,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 4,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 5,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 6,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 7,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 8,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 9,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         },
         {
            id: 10,
            image: 'none.png', //
            text: 'Skipped',
            textBg: 'neutral'
         }
      ]
   },
   {
      id: 7,
      name: 'Quests',
      cards: [
         {
            id: 1,
            image: '1-108.png',
            text: 'Pay 3 and put two damage on your hero to complete this quest.<br /><b>Reward:</b> Look at the top four cards in your deck.<br />Put one into your hand, one on top of your deck, one in your graveyard, and remove one from game.',
            textBg: 'neutral'
         },
         {
            id: 2,
            image: '1-109.png',
            text: 'Pay 3 to complete this quest. <b>Reward:</b> Draw a card.<br />If there are 6 or more allies in your graveyard, draw a card.<br />If there are 12 or more allies in your graveyard, draw a card.',
            textBg: 'neutral'
         },
         {
            id: 3,
            image: '1-110.png',
            text: 'Pay X and exhaust two resources you control to complete this quest.<br /><b>Reward:</b> Search your deck for an equipment with cost X and put it into play exhausted.',
            textBg: 'neutral'
         },
         {
            id: 4,
            image: '1-111.png',
            text: 'Pay 3 to complete this quest.<br /><b>Reward:</b> Draw a card.<br />If you completed a quest called "The Witch\'s Bane" this turn, draw another card.',
            textBg: 'neutral',
            originImage: 'card-images/1-121.png'
         },
         {
            id: 5,
            image: 'none.png',
            text: '<b>Quest &mdash; Espace from Black Rock</b><br />Art is missing.<br />',
            textBg: 'horde',
            originImage: 'card-images/refs/none.png' // replace with black rock mountain location
         },
         {
            id: 6,
            image: '1-113.png',
            text: 'Pay 2 and discard a card to complete this quest.<br /><b>Reward:</b> At the start of your next turn, draw two cards.',
            textBg: 'neutral'
         },
         {
            id: 7,
            image: '1-114.png',
            text: 'Pay 3 to complete this quest.<br />Reward:</b> Put a 0/4 Beast ally token named Sea Turtle into play with Mount (1) and "{exhaust} {arrow} You pay 3 less to complete your next quest this turn."',
            textBg: 'neutral',
            originImage: 'card-images/tokens/sea-turtle.png'
         },
         {
            id: 8,
            image: '1-115.png',
            text: '<b>Daily Quest</b> <i>(When completing this quest, it will not be turned face down)</i><br />Pay 3, {exhaust} {arrow} Complete this quest.<br /><b>Reward:</b> Draw a card.',
            textBg: 'neutral'
         },
         {
            id: 9,
            image: '1-116.png',
            text: 'Pay 1 and discard a card to complete this quest.<br /><b>Reward:</b> When an opponent player discard a card this turn, draw a card.',
            textBg: 'neutral'
         },
         {
            id: 10,
            image: '1-117.png',
            text: 'If you have two or more allies in your party: Pay 3 to complete this quest.<br /><b>Reward:</b> Put target ability from your graveyard into your hand.',
            textBg: 'neutral'
         },
         {
            id: 11,
            image: '1-118.png',
            text: 'Pay 3 to complete this quest.<br /><b>Reward:</b> Draw a card.<br />You pay 2 less next time you complete a quest called "Razorfen Downs" this turn.',
            textBg: 'neutral',
            originImage: 'card-images/1-117.png'
         },
         {
            id: 12,
            image: '1-119.png',
            text: 'Pay 4  to complete this quest.<br /><b>Reward:</b> When you destroy an ally this turn, draw a card.',
            textBg: 'neutral'
         },
         {
            id: 13,
            image: '1-120.png',
            text: 'If there are three or more allies in you party: Pay 3 to complete this quest.<br /><b>Reward:</b> Draw a card. If you control a location called "Arathi Highlands", draw another card.',
            textBg: 'neutral',
            originImage: 'card-images/refs/none.png' // replace with arathi highlands location
         },
         {
            id: 14,
            image: '1-121.png',
            text: 'Pay 1 and remove target ally in a graveyard from the game to complete this quest.<br /><b>Reward:</b> Put an ally from your graveyard, on top of you deck.',
            textBg: 'neutral'
         },
         {
            id: 15,
            image: '1-122.png',
            text: 'Pay 1 and discard a card to complete this quest.<br /><b>Reward</b>: Target opponent discard a random card.',
            textBg: 'neutral'
         },
         {
            id: 16,
            image: '1-123.png',
            text: 'Pay 3 and put two damage counters on your hero to complete this quest.<br /><b>Reward:</b> Put a 2/2 Orc Warrior ally token named Black Rock Warrior into play with <b>Ferocity</b> and "This ally can only attack heroes".<br />If you control a location called Black Rock Mountain, draw a card.',
            textBg: 'neutral',
            originImage: 'card-images/refs/none.png' // replace with orc warrior token !! with black rock mountain location!!
         },
         {
            id: 17,
            image: '1-124.png',
            text: 'Exhaust two allies in your party to complete this quest. Allies exhausted this way can\'t ready during your next ready step.<br /><b>Reward:</b> At the end of your turn, if no damage was done this turn, draw two cards.',
            textBg: 'alliance'
         },
         {
            id: 18,
            image: '1-125.png',
            text: 'If your hero prevented damage on a friendly hero or ally or exhausted to protect this turn: Pay 1 to complete this quest.<br /><b>Reward:</b> Put the top card from your graveyard into your hand.',
            textBg: 'alliance'
         },
         {
            id: 19,
            image: '1-126.png',
            text: 'If you control an Eastern Kingdoms location: Pay 3 to complete this quest.<br /><b>Reward:</b> Return target ally in your party to your hand.<br />Draw a card.',
            textBg: 'alliance'
         },
         {
            id: 20,
            image: '1-127.png',
            text: 'Exhaust two allies in your party that share the same race to complete this quest.<br /><b>Reward:</b> You may ready up to two resources.',
            textBg: 'horde'
         },
         {
            id: 21,
            image: '1-128.png',
            text: 'Pay 4 to complete this quest. You pay 1 less to complete this quest for each other Quel\'Thalas quest or location you control.<br /><b>Reward:</b> You may add two counters to target card you control.',
            textBg: 'horde'
         }
      ]
   },
   {
      id: 8,
      name: 'Tokens',
      cards: [
         {
            id: 1,
            image: 'none.png',
            textBg: 'spell',
            originImage: 'card-images/1-017.png',
            text: '<b>Ongoing:</b> At the beginning of your turn, your hero deals 1 shadow damage to attached character.',
         },
         {
            id: 2,
            image: 'tokens/tuskarr-meal.png',
            textBg: 'spell',
            originImage: 'card-images/none.png',
            text: '<b>Ongoing:</b> Attached ally has +1/+1.',
         },
         {
            id: 3,
            image: 'tokens/black-rock-orc.png',
            text: '<b>Ferocity.</b><br />This ally can only attack heroes.',
            textBg: 'neutral',
            originImage: 'card-images/1-123.png',
         },
         {
            id: 4,
            image: 'tokens/blue-dragonkin.png',
            textBg: 'neutral',
            originImage: 'card-images/refs/dragonwrath.png',
         },
         {
            id: 5,
            image: 'tokens/demon-gnome.png',
            text: '(Is a copy of an ally and is also a Demon)',
            textBg: 'neutral',
            originImage: 'card-images/refs/demonic-corruption.png',
            originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4033'
         },
         {
            id: 6,
            image: 'none.png',
            textBg: 'neutral',
            text: '<b>Falstad Wildhammer</b>',
            originImage: 'card-images/refs/council-of-three-hammers.png',
            originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4129'
         },
         {
            id: 7,
            image: 'refs/none.png',
            text: '<b>Flame of Azzinoth &mdash; Ferocity',
            textBg: 'neutral',
            originImage: 'card-images/refs/warglaive-of-azzinoth-1.png',
         },
         {
            id: 8,
            image: 'refs/none.png',
            text: '<b>Flame of Azzinoth &mdash; Protector',
            textBg: 'neutral',
            originImage: 'card-images/refs/warglaive-of-azzinoth-2.png',
         },
         {
            id: 9,
            image: 'refs/none.png',
            text: '<b>Flame of Azzinoth &mdash; Monster',
            textBg: 'neutral',
            originImage: 'card-images/refs/warglaive-of-azzinoth.png',
         },
         {
            id: 10,
            image: 'tokens/imp.png',
            textBg: 'neutral',
            originImage: 'card-images/1-050.png',
         },
         {
            id: 11,
            image: 'tokens/infernal.png',
            textBg: 'neutral',
            originImage: 'card-images/none.png',
         },
         {
            id: 12,
            image: 'tokens/jaraxxus.png',
            text: 'Jaraxxus can only be destroyed by fatal damage.',
            textBg: 'neutral',
            originImage: 'card-images/1-051.png'
         },
         {
            id: 13,
            image: 'tokens/mirror.png',
            text: 'If damage would be dealt to your hero, it\'s dealt to a random Mirror or hero you control instead.',
            textBg: 'neutral',
            originImage: 'card-images/refs/mirror-image.png',
            originUrl: 'http://wow.tcgbrowser.com/#!/cardid=725'
         },
         {
            id: 14,
            image: 'none.png',
            textBg: 'neutral',
            text: '<b>Moira Thaurissan</b>',
            originImage: 'card-images/refs/council-of-three-hammers.png',
            originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4129'
         },
         {
            id: 15,
            image: 'none.png',
            textBg: 'neutral',
            text: '<b>Muradin Bronzebeard</b>',
            originImage: 'card-images/refs/council-of-three-hammers.png',
            originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4129'
         },
         {
            id: 16,
            image: 'tokens/murloc.png',
            textBg: 'monster',
            originImage: 'card-images/refs/murloc-king.png',
            originUrl: 'http://wow.tcgbrowser.com/#!/cardid=6760'
         },
         {
            id: 17,
            image: 'tokens/naga.png',
            textBg: 'neutral',
            originImage: 'card-images/refs/naga-summoners.png'
         },
         {
            id: 18,
            image: 'tokens/onyxia.png',
            textBg: 'neutral',
            originImage: 'card-images/refs/nefarian.png',
            originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4013'
         },
         {
            id: 19,
            image: 'tokens/onyxian-whelp.png',
            textBg: 'neutral',
            originImage: 'card-images/refs/brood-of-onyxia.png',
            originUrl: 'http://wow.tcgbrowser.com/#!/search=whelp&raid=true'
         },
         {
            id: 20,
            image: 'tokens/portal-to-moonglade.png',
            text: 'At the start of your turn, destroy this ally and draw two cards.',
            textBg: 'neutral',
            originImage: 'card-images/none.png'
         },
         {
            id: 21,
            image: 'tokens/red-dragonkin.png',
            textBg: 'neutral',
            originImage: 'card-images/refs/red-dragonkin-summoners.png',
            originUrl: 'http://wow.tcgbrowser.com/#!/search=red+dragonkin+token'
         },
         {
            id: 22,
            image: 'tokens/ringo.png',
            text: 'At the start of your turn, draw a card.',
            textBg: 'neutral',
            originImage: 'card-images/refs/lost.png',
            //originUrl: 'http://wowcards.info/card/outland/en/239/Lost'
            originUrl: 'http://wow.tcgbrowser.com/#!/cardid=3546'
         },
         {
            id: 23,
            image: 'tokens/scarlet-trainee-1.png',
            text: '<b>Ferocity</b>',
            textBg: 'neutral',
            originImage: 'card-images/refs/reinforcements.png',
            originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4643'
         },
         {
            id: 24,
            image: 'tokens/scarlet-trainee-2.png',
            text: '<b>Ferocity</b>',
            textBg: 'neutral',
            originImage: 'card-images/refs/reinforcements.png',
            originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4643'
         },
         {
            id: 25,
            image: 'tokens/sea-turtle.png',
            textBg: 'neutral',
            originImage: 'card-images/1-114.png',
            text: '{exhaust} {arrow} You pay 3 less to complete your next quest.',
         },
         {
            id: 26,
            image: 'none.png',
            text: 'Silverbrook Worgen',
            textBg: 'neutral',
            originImage: 'card-images/none.png',
         },
         /*
         {
            id: 27,
            image: 'tokens/the-polly-pirate.png',
            textBg: 'neutral',
            originImage: 'card-images/1-043.png'
         },
         */
         {
            id: 28,
            image: 'tokens/tiger.png',
            textBg: 'neutral',
            text: '<b>Ferocity</b>',
            originImage: 'card-images/refs/avatar-of-the-wild.png',
            originUrl: 'http://wow.tcgbrowser.com/#!/cardid=60'
         },
         {
            id: 29,
            image: 'tokens/tooga.png',
            textBg: 'neutral',
            originImage: 'card-images/refs/toogasquest.png',
            //originUrl: 'http://wowcards.info/card/azeroth/en/359/Toogas-Quest'
            originUrl: 'http://wow.tcgbrowser.com/#!/cardid=3674'
         },
         {
            id: 30,
            image: 'none.png',
            text: '<b>Treant</b>',
            textBg: 'neutral',
            originImage: 'card-images/none.png',
            originUrl: 'http://wow.tcgbrowser.com/#!/search=treant+token'
         },
         {
            id: 31,
            image: 'tokens/twilight-dragonkin.png',
            text: '<b>Twilight Dragonkin</b>',
            textBg: 'neutral',
            originImage: 'card-images/refs/twilight-citadel.png',
            originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4207'
         },
         {
            id: 32,
            image: 'none.png',
            text: '<b>Water Elemental</b>',
            textBg: 'neutral',
            //originImage: 'card-images/refs/twilight-citadel.png',
            //originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4207'
         },
         {
            id: 33,
            image: 'tokens/wyrmrest-vanquisher.png',
            textBg: 'neutral',
            text: 'When you place a resource face up, you may draw a card.',
            originImage: 'card-images/refs/onrubywings.png',
            //originUrl: 'http://wowcards.info/card/wrathgate/en/211/On-Ruby-Wings'
            originUrl: 'http://wow.tcgbrowser.com/#!/cardid=3560'
         }
      ]
   }
];
