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
      id: 12,
      name: 'Abilites',
      cards: [
         {
            id: 1,
            type: 'hero',
            name: 'Jaenx Felgear',
            image: '1-002.png',
            text: 'Your hero heals target hero or ally 4 damage for each totem you control.',
            textBg: 'spell'
         },
         {
            id: 2,
            type: 'hero',
            name: 'Darania',
            image: '1-004.png',
            text: 'Attach to target hero or ally and heal it for 10 damage.<br /><b>Ongoing:</b> At the beginning of your turn, destroy Renewing Life and heal 4 damage from attached character.',
            textBg: 'spell'
         },
         {
            id: 3,
            type: 'hero',
            name: 'Darania',
            image: '1-007.png',
            text: '<b>Restoration Hero Required</b><br />Your hero heals 12 damage from each friendly hero and ally.',
            textBg: 'spell'
         },
         {
            id: 4,
            type: 'hero',
            name: 'Darania',
            image: '1-010.png',
            text: '<b>Night Elf Hero Required</b><br />You pay 1 less to complete quests.<br />Exhaust this ally: Return target friendly ally to its owners hand.',
            textBg: 'alliance'
         },
         {
            id: 5,
            type: 'hero',
            name: 'Darania',
            image: '1-014.png',
            text: 'When an opponent ally is removed from the game, ready target resource.',
            textBg: 'horde'
         }
      ]
   },
   {
      id: 0,
      name: 'Allies',
      cards: [
         {
            id: 1,
            type: 'ally',
            name: 'Ringo',
            image: 'ringo.png',
            text: 'At the start of your turn, draw a card.',
            textBg: 'neutral',
            originImage: 'http://wowcards.info/scans/outland/en/239_Lost.jpg',
            originUrl: 'http://wowcards.info/card/outland/en/239/Lost'
         },
         {
            id: 2,
            type: 'ally',
            name: 'Tooga',
            image: 'tooga.png',
            originImage: 'http://wowcards.info/scans/azeroth/en/359_Toogas-Quest.jpg',
            originUrl: 'http://wowcards.info/card/azeroth/en/359/Toogas-Quest'
         },
         {
            id: 3,
            type: 'ally',
            name: 'Wyrmrest Vanquisher',
            image: 'wyrmrest_vanquisher.png',
            text: 'When you place a resource face up, you may draw a card.',
            originImage: 'http://wowcards.info/scans/wrathgate/en/211_On-Ruby-Wings.jpg',
            originUrl: 'http://wowcards.info/card/wrathgate/en/211/On-Ruby-Wings'
         },
         {
            id: 4,
            type: 'ally',
            name: 'Test',
            image: 'test.png',
            text: 'Really nasty.',
            textBg: 'horde',
         },
         {
            id: 5,
            type: 'ally',
            name: 'Elemental Mending',
            image: 'ability - shaman - elemental mending.png',
            text: 'Your hero heals 4 damage from target hero or ally for each totem you control.',
            textBg: 'spell'
         },
      ],
   },
   {
      id: 1,
      name: 'Heroes',
      cards: [
         {
            id: 1,
            type: 'hero',
            name: 'Jaenx Felgear',
            image: 'jaenx.png',
            text: 'Pay 3 to flip Jaenx.',
            textBack: 'At the start of your turn, put a 1/1 Imp demon ally token into play.',
            textBg: 'alliance'
         },
         {
            id: 2,
            type: 'hero',
            name: 'Darania',
            image: 'darania.png',
            text: 'Pay 3 to flip Darania.',
            textBack: 'When an opponent ally is removed from the game, ready target resource.',
            textBg: 'alliance'
         }
      ]
   },
   {
      id: 2,
      name: 'Tokens',
      cards: [
         {
            id: 1,
            type: 'ally',
            name: 'Demon',
            image: 'demon.png',
            originImage: 'http://wowcards.info/scans/twilight/en/87_Demonic-Corruption.jpg',
            originUrl: 'http://wowcards.info/card/twilight/en/87/Demonic-Corruption'
         }
      ]
   }
];
