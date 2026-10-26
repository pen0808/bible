export type DailyEntry = {
  day: number;
  id: string;
  word: string;
  wordMeaning: string;
  title: string;
  theme: string;
  scripture: string;
  verse: string;
  summary: string;
  reflection: string[];
  prayer: string;
  prompt: string;
  meditation: string;
  breatheIn: string;
  breatheOut: string;
  readTime: number;
};

export const dailyEntries: DailyEntry[] = [
  {
    day: 1,
    id: "begin-again",
    word: "Mercy",
    wordMeaning: "Compassion that meets us before we deserve it.",
    title: "Begin Again",
    theme: "Renewal",
    scripture: "Lamentations 3:22-23",
    verse:
      "It is of the LORD’s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
    summary:
      "Yesterday does not get the final word. Every dawn arrives carrying a fresh measure of God’s tenderness.",
    reflection: [
      "There is a quiet miracle in waking. Before you have proven anything, fixed anything, or made yourself presentable, mercy is already waiting. It does not ask you to earn the morning; it simply arrives with it.",
      "Jeremiah wrote these words while looking at ruins. He was not pretending the rubble was gone. He was learning that grief and faithfulness can share the same sky. The steadfast love of God is not the absence of hard things; it is the presence of God within them.",
      "Today, you do not have to carry yesterday’s failures into today’s grace. Let the morning be morning. Begin again, gently.",
    ],
    prayer:
      "Faithful God, thank You for the mercy that meets me before I rise. Teach me to receive this new day without shame and to walk through it with a grateful heart. Amen.",
    prompt: "What would change if you believed today’s mercy was already waiting for you?",
    meditation: "Your mercies are new every morning.",
    breatheIn: "New mercy",
    breatheOut: "Old weight",
    readTime: 4,
  },
  {
    day: 2,
    id: "held",
    word: "Refuge",
    wordMeaning: "A safe place where the storm cannot reach your soul.",
    title: "Held",
    theme: "Safety",
    scripture: "Psalm 46:1",
    verse: "God is our refuge and strength, a very present help in trouble.",
    summary:
      "God is not distant from your difficulty. He is a present help—near enough to be found, strong enough to hold.",
    reflection: [
      "A refuge is not a place that denies the storm. It is a place where the storm no longer has the final say. The walls do not make the wind disappear; they make room for you to breathe while it passes.",
      "The psalmist does not say God was a help, or will be a help. He says God is a very present help. There is no distance to cross before you are seen. The One who made the mountains is not intimidated by what frightens you.",
      "You may not feel brave today. That is alright. Come as you are to the refuge. Even a trembling heart is safe in the hands of God.",
    ],
    prayer:
      "God of the storm and the stillness, be my refuge today. Quiet the places in me that are afraid, and let Your nearness be enough. Amen.",
    prompt: "Where do you most need to experience God as a present help today?",
    meditation: "God is near in the trouble, not only after it.",
    breatheIn: "God is near",
    breatheOut: "I am held",
    readTime: 4,
  },
  {
    day: 3,
    id: "be-still",
    word: "Stillness",
    wordMeaning: "A holy pause in which the soul remembers who holds it.",
    title: "Be Still",
    theme: "Presence",
    scripture: "Psalm 46:10",
    verse:
      "Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.",
    summary:
      "Stillness is not emptiness. It is the quiet room where we remember that God is God, and we are not.",
    reflection: [
      "The command is not “be quiet because nothing matters.” It is “be still because I am God.” The world is loud with voices that insist everything depends on us, but the soul discovers another rhythm. God is already holding what we are grasping for.",
      "Stillness is an act of trust. It says to the anxious mind, the endless list, the unfinished work: wait here. Something deeper is true. God is present before the first word is spoken and long after the last page is turned.",
      "For a few moments today, let your shoulders drop. Let the hurry loosen its grip. Listen beneath the noise for the steady heartbeat of grace. You do not have to be God today. You are loved by Him.",
    ],
    prayer:
      "God of the quiet, slow me down. Free me from the need to control, and help me know Your presence in the pause. Amen.",
    prompt: "What is one thing you can hand to God by choosing stillness today?",
    meditation: "Be still, and know.",
    breatheIn: "I am still",
    breatheOut: "I am not God",
    readTime: 5,
  },
  {
    day: 4,
    id: "enough",
    word: "Grace",
    wordMeaning: "The unearned kindness of God that is enough for today.",
    title: "Enough",
    theme: "Grace",
    scripture: "2 Corinthians 12:9",
    verse:
      "My grace is sufficient for thee: for my strength is made perfect in weakness.",
    summary: "Grace does not wait for your strength to arrive. It meets you in the weakness and becomes strength.",
    reflection: [
      "We often imagine grace as a reward for holding ourselves together. But Paul discovers something stranger and more beautiful: grace is most at home in the places we would rather hide. The tired place. The uncertain place. The place that has run out of answers.",
      "His strength is made perfect in weakness. Not despite it. Not after it has been fixed. In it. The cracks are not proof that you are disqualified; they are where the light gets in.",
      "You do not have to be enough today. You are held by One who is. Let that be enough.",
    ],
    prayer:
      "Jesus, I bring You the places where I feel insufficient. Be my strength there, and teach me to rest in overwhelming grace. Amen.",
    prompt: "Where are you performing strength that God is inviting you to surrender?",
    meditation: "Grace is enough for this moment.",
    breatheIn: "I receive grace",
    breatheOut: "I release striving",
    readTime: 4,
  },
  {
    day: 5,
    id: "quiet-shepherd",
    word: "Guide",
    wordMeaning: "One who goes before us and leads us into peace.",
    title: "The Quiet Shepherd",
    theme: "Guidance",
    scripture: "Psalm 23:1-3",
    verse:
      "The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.",
    summary:
      "The Shepherd does not only lead us out of valleys. He leads us into rest, beside water, back to ourselves.",
    reflection: [
      "A shepherd knows the land. He knows where the grass grows after rain and where the water runs clear. He knows when the flock needs to move and when they need to rest. You are not being driven; you are being led.",
      "Sometimes the most spiritual thing we can do is lie down. To stop proving, producing, and planning. The Shepherd makes us lie down in green pastures because He knows the soul cannot be restored by constant motion.",
      "He restores the soul. Not just the schedule. Not just the reputation. The deep, real, hidden you. Let Him lead you today, even if the path is slower than you expected.",
    ],
    prayer:
      "Good Shepherd, lead my soul beside still waters. Restore what has been worn thin, and help me trust the pace of Your care. Amen.",
    prompt: "What would it look like to let God lead you at a gentler pace today?",
    meditation: "He leads me beside still waters.",
    breatheIn: "I am led",
    breatheOut: "I am not alone",
    readTime: 5,
  },
  {
    day: 6,
    id: "light-for-the-step",
    word: "Light",
    wordMeaning: "Enough clarity for the next step, not the whole road.",
    title: "Light for the Step",
    theme: "Direction",
    scripture: "Psalm 119:105",
    verse: "Thy word is a lamp unto my feet, and a light unto my path.",
    summary: "God often gives us enough light for the next step, not the whole journey. That is still guidance.",
    reflection: [
      "A lamp gives light for the path beneath your feet. It does not illuminate every mile ahead. We often mistake this for absence, but it may be invitation. God is teaching us to walk with Him rather than with our plans.",
      "When you cannot see the whole road, look for the next faithful step. A kind word. A necessary rest. A small obedience. The path becomes clear as you walk, not before.",
      "You are not wandering in the dark. You are being led by a light that knows exactly where the next stone is.",
    ],
    prayer:
      "Light of the world, I want to see the whole road, but I trust You with the next step. Illuminate what is mine to do today. Amen.",
    prompt: "What is the next small, faithful step God is inviting you to take?",
    meditation: "The next step is enough.",
    breatheIn: "Light my path",
    breatheOut: "I let go of fear",
    readTime: 3,
  },
  {
    day: 7,
    id: "unhurried",
    word: "Rest",
    wordMeaning: "The deep settling of a soul that is safe in Christ.",
    title: "Unhurried",
    theme: "Rest",
    scripture: "Matthew 11:28",
    verse: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
    summary: "Jesus does not ask you to clean yourself up before you come. He says, simply, come.",
    reflection: [
      "There is a weariness that sleep cannot fix. It comes from carrying what we were never meant to carry alone. Jesus does not shame the weary for being weary. He calls them close.",
      "The invitation is not to try harder at resting. It is to come. Bring the heavy load, the tangled thoughts, the tired body. Sit down in the presence of the One who says, “I will give you rest.”",
      "Rest is not a reward for finishing. It is a relationship. You can be still now. The world will keep turning, and God will keep holding it.",
    ],
    prayer:
      "Jesus, I come to You tired. Quiet the part of me that keeps working for worth. Give me the rest only Your presence can give. Amen.",
    prompt: "What burden are you carrying that Jesus is inviting you to put down?",
    meditation: "I come to Jesus, and I receive rest.",
    breatheIn: "I come",
    breatheOut: "I release",
    readTime: 3,
  },
  {
    day: 8,
    id: "rooted",
    word: "Abide",
    wordMeaning: "To remain in Christ, drawing life from His presence.",
    title: "Rooted",
    theme: "Belonging",
    scripture: "John 15:4",
    verse:
      "Abide in me, and I in you. As the branch cannot bear fruit of itself, except it abide in the vine; no more can ye, except ye abide in me.",
    summary: "Fruit is not something you force. It grows from the hidden life you share with the Vine.",
    reflection: [
      "A branch does not strain to produce fruit. It remains connected to the vine, and fruit is what connection produces. So much of our exhaustion comes from trying to manufacture what can only grow.",
      "Abiding is unglamorous. It is a quiet returning: returning to prayer, to the Word, to honesty, to rest. It is the small, daily practice of staying near to Jesus.",
      "You are not a machine. You are a branch. Let the life of Christ flow into you today, unhurried and unseen. The fruit will come in its season.",
    ],
    prayer:
      "Jesus, keep me close to You today. Let my life draw its strength from Your life, and let love grow where I have been striving. Amen.",
    prompt: "What daily practice helps you feel most connected to Jesus?",
    meditation: "I am connected to the life of Christ.",
    breatheIn: "I abide",
    breatheOut: "I release control",
    readTime: 4,
  },
  {
    day: 9,
    id: "a-soft-answer",
    word: "Gentle",
    wordMeaning: "Strength that chooses tenderness over reaction.",
    title: "A Soft Answer",
    theme: "Relationships",
    scripture: "Proverbs 15:1",
    verse: "A soft answer turneth away wrath: but grievous words stir up anger.",
    summary: "Gentleness is not weakness. It is the strength to interrupt the cycle of pain with grace.",
    reflection: [
      "Our first response is often a mirror. Someone is sharp, and we become sharp in return. Someone withdraws, and we build a wall. A soft answer is the choice not to mirror the wound.",
      "Gentleness takes tremendous inner strength. It requires that we breathe before we speak, and that we remember the other person is carrying a story we cannot see. It does not mean avoiding truth. It means telling the truth without cruelty.",
      "Today, may your words lower the temperature. May they create room for peace instead of proving that you are right.",
    ],
    prayer:
      "Lord, make my words gentle without making them false. Give me the strength to respond in grace when I am tempted to react in anger. Amen.",
    prompt: "With whom might a softer response change the atmosphere today?",
    meditation: "Gentleness is strength with open hands.",
    breatheIn: "Peace",
    breatheOut: "Reaction",
    readTime: 3,
  },
  {
    day: 10,
    id: "fear-not",
    word: "Courage",
    wordMeaning: "Moving forward because God moves with you.",
    title: "Fear Not",
    theme: "Courage",
    scripture: "Isaiah 41:10",
    verse:
      "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
    summary: "Courage is not the absence of fear. It is the presence of God in the midst of it.",
    reflection: [
      "Notice the reasons God gives for courage. Not “you are strong enough.” Not “the situation is not serious.” The reason is presence: I am with thee. Fear is real, but it is not sovereign.",
      "The right hand of God is a picture of steady support. You are not being pushed into the unknown alone. You are being held by a hand that will not let go, even when you stumble.",
      "You may still feel afraid. Take the fear with you, and take God more seriously than the fear. You are not walking alone.",
    ],
    prayer:
      "God of the fearful places, help me feel Your hand in mine. I will not let fear lead today; lead me instead. Amen.",
    prompt: "What would courage look like in your life this week?",
    meditation: "God is with me, so my fear is not final.",
    breatheIn: "I am with You",
    breatheOut: "I am not alone",
    readTime: 4,
  },
  {
    day: 11,
    id: "the-peace-within",
    word: "Peace",
    wordMeaning: "The settled wholeness that comes from the presence of Christ.",
    title: "The Peace Within",
    theme: "Peace",
    scripture: "John 14:27",
    verse:
      "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.",
    summary: "Christ’s peace is not dependent on circumstances. It is a gift that makes a home in us.",
    reflection: [
      "The peace the world gives depends on things going well. It is fragile, built on good news and good health and good plans. The peace Jesus gives is of another kind. It can coexist with uncertainty.",
      "He speaks these words in the shadow of the cross. This is not denial; it is depth. The peace of Christ is the quiet certainty that we are loved, held, and never alone, even when the path is hard.",
      "Let your heart receive the gift. Not someday, when everything is resolved. Today, in the middle of the unfinished story.",
    ],
    prayer:
      "Prince of Peace, I receive Your peace now. Steady my heart with the knowledge that Your love is stronger than my circumstances. Amen.",
    prompt: "Where is anxiety asking for your attention, and what would peace say in return?",
    meditation: "The peace of Christ makes its home in me.",
    breatheIn: "I receive peace",
    breatheOut: "I release fear",
    readTime: 4,
  },
  {
    day: 12,
    id: "the-practice-of-peace",
    word: "Surrender",
    wordMeaning: "Placing your worries into hands stronger than your own.",
    title: "The Practice of Peace",
    theme: "Trust",
    scripture: "Philippians 4:6-7",
    verse:
      "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
    summary: "Peace is not the absence of requests. It is the freedom of placing every request into God’s care.",
    reflection: [
      "Paul does not say “stop caring.” He says “stop carrying.” Prayer is the practice of transferring the weight of our lives from our own shoulders to God’s. Nothing is too small to be made known. Nothing is too tangled to be received.",
      "Thanksgiving is the hinge. It does not deny the difficulty. It remembers the faithfulness that has already met us. Gratitude is not naive; it is a way of seeing the whole story.",
      "The peace that follows passes understanding because it does not make sense. It arrives before the answer does. Let God keep your heart today.",
    ],
    prayer:
      "God of every request, I bring You what I cannot control. Thank You for always hearing me. Guard my heart with Your incomprehensible peace. Amen.",
    prompt: "What is one worry you can turn into a specific prayer today?",
    meditation: "I place every request into Your care.",
    breatheIn: "I let go",
    breatheOut: "I trust You",
    readTime: 4,
  },
  {
    day: 13,
    id: "known",
    word: "Known",
    wordMeaning: "Fully seen by God, and fully loved in being seen.",
    title: "Known",
    theme: "Identity",
    scripture: "Psalm 139:13-14",
    verse:
      "For thou hast possessed my reins: thou hast covered me in my mother’s womb. I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.",
    summary: "Your worth was settled in the secret place, before the world had a chance to weigh in.",
    reflection: [
      "There is a version of you that existed before the opinions. Before the comparisons. Before the labels. The psalmist says God was there, forming and covering and delighting. You began in love.",
      "Being known by God is not the same as being examined by God. He does not look at you to find fault. He looks at you the way an artist looks at a work that is still becoming. With intention. With tenderness.",
      "You do not have to perform to be loved today. The One who made you already knows your name, and He is not disappointed that you are human.",
    ],
    prayer:
      "Creator God, thank You for making me with care. Heal the places where I believe I must earn love, and let me rest in being known by You. Amen.",
    prompt: "What would change if you truly believed you were made with care?",
    meditation: "I am fearfully and wonderfully made.",
    breatheIn: "I am known",
    breatheOut: "I am loved",
    readTime: 4,
  },
  {
    day: 14,
    id: "the-joy-of-small",
    word: "Faithful",
    wordMeaning: "Showing up with love in the small and unseen things.",
    title: "The Joy of Small",
    theme: "Faithfulness",
    scripture: "Luke 16:10",
    verse:
      "He that is faithful in that which is least is faithful also in much: and he that is unjust in the least is unjust also in much.",
    summary: "God does not despise small beginnings. Faithfulness grows in the ordinary, hidden places.",
    reflection: [
      "We dream of the large thing, the visible thing, the thing that finally proves our lives matter. But the kingdom of God grows in mustard seeds. A cup of water. A quiet prayer. A promise kept when no one is watching.",
      "Small faithfulness is not a stepping stone to greatness. It is greatness, because it treats the present moment as worthy of love. The way you do the little things becomes the way you do everything.",
      "Do not wait for a bigger platform to be faithful. Your life is already the field. Tend it with love.",
    ],
    prayer:
      "Lord, help me honor You in the small things today. Free me from the need to be impressive, and make me faithful in the ordinary. Amen.",
    prompt: "What small act of faithfulness is within your reach today?",
    meditation: "The small things are not small to God.",
    breatheIn: "I am faithful",
    breatheOut: "I release comparison",
    readTime: 3,
  },
  {
    day: 15,
    id: "carry-each-other",
    word: "Kindness",
    wordMeaning: "The hands-on love that helps another person keep walking.",
    title: "Carry Each Other",
    theme: "Compassion",
    scripture: "Galatians 6:2",
    verse: "Bear ye one another’s burdens, and so fulfil the law of Christ.",
    summary: "Sometimes love looks like carrying. Sometimes it looks like letting yourself be carried.",
    reflection: [
      "There is a humility in receiving help. It reminds us that we are not self-made, self-sufficient, or alone. The Christian life is not a solo performance. It is a shared carrying.",
      "Paul calls this the law of Christ, which is the law of love. Not a law of perfect strength, but of mutual dependence. We are called to notice the weight on someone else’s shoulders and to step closer.",
      "Who might you help today? And who might be sent by God to help you? Let love be practical. A message, a meal, a listening ear, a prayer.",
    ],
    prayer:
      "Jesus, teach me to carry others with tenderness and to receive help with humility. Make my love practical today. Amen.",
    prompt: "Whose burden could you help carry this week?",
    meditation: "Love is willing to carry.",
    breatheIn: "I receive",
    breatheOut: "I extend kindness",
    readTime: 3,
  },
  {
    day: 16,
    id: "the-gardeners-patience",
    word: "Patience",
    wordMeaning: "Trusting the slow work of God without rushing the harvest.",
    title: "The Gardener’s Patience",
    theme: "Perseverance",
    scripture: "Galatians 6:9",
    verse:
      "And let us not be weary in well doing: for in due season we shall reap, if we faint not.",
    summary: "Seeds grow in the dark before they break the surface. God is not slow; He is thorough.",
    reflection: [
      "We live in a world of fast results and instant feedback. But growth is a memory of rain. It happens in unseen places, in the quiet roots of the soul, and it cannot be rushed.",
      "Paul’s encouragement is not “try harder.” It is “do not lose heart.” Keep doing the good that is in front of you, even when you cannot see its fruit yet. Due season belongs to God.",
      "Today, be faithful with what is yours. Water what you can water. Leave the harvest in hands wiser than yours.",
    ],
    prayer:
      "Patient God, give me strength for the long work of love. Keep me faithful in the waiting, and teach me to trust Your season. Amen.",
    prompt: "Where are you tempted to give up because you cannot see results?",
    meditation: "In due season, the harvest will come.",
    breatheIn: "I stay",
    breatheOut: "I release hurry",
    readTime: 4,
  },
  {
    day: 17,
    id: "a-thankful-heart",
    word: "Gratitude",
    wordMeaning: "Noticing the gifts that are already in your hands.",
    title: "A Thankful Heart",
    theme: "Thanksgiving",
    scripture: "1 Thessalonians 5:18",
    verse: "In every thing give thanks: for this is the will of God in Christ Jesus concerning you.",
    summary: "Gratitude does not pretend everything is good. It notices the God who is good in everything.",
    reflection: [
      "Gratitude is not a denial of pain. The Bible does not ask us to call wounds blessings. It asks us to look for the presence of God within the real, complicated truth of our lives.",
      "There is always something to notice. The breath in your body. The friend who answered. The light on the floor. The grace that kept you through yesterday. Gratitude turns the ordinary into a place of meeting.",
      "Today, name one gift. Then name another. Let thankfulness become a doorway into God’s presence.",
    ],
    prayer:
      "Generous God, open my eyes to what I have overlooked. Thank You for the gifts I have received and the grace I have not even noticed. Amen.",
    prompt: "Name three gifts from this week that you have not yet thanked God for.",
    meditation: "I notice the gifts already in my hands.",
    breatheIn: "Thank You",
    breatheOut: "I notice",
    readTime: 3,
  },
  {
    day: 18,
    id: "walk-in-hope",
    word: "Hope",
    wordMeaning: "A confident expectation that God is not finished.",
    title: "Walk in Hope",
    theme: "Hope",
    scripture: "Romans 15:13",
    verse:
      "Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.",
    summary: "Hope is not wishful thinking. It is the living power of God at work in a believing heart.",
    reflection: [
      "The world often treats hope as a thin, fragile thing—a maybe, a wish, a fingers-crossed optimism. But Christian hope is rooted in the character of God. It is as strong as the promise-keeping love that anchors it.",
      "Hope does not require that you feel hopeful. It asks that you keep turning toward the God who is. Sometimes that is enough. A small turning. A whispered prayer. A step into the light.",
      "The God of hope fills. The Holy Spirit empowers. You are not asked to manufacture the hope; you are invited to receive it.",
    ],
    prayer:
      "God of hope, fill the empty places in me. Help me believe again, and let Your joy and peace overflow into hope. Amen.",
    prompt: "Where do you need a fresh infusion of hope today?",
    meditation: "The God of hope is filling me now.",
    breatheIn: "I believe",
    breatheOut: "I receive hope",
    readTime: 4,
  },
  {
    day: 19,
    id: "the-god-who-sees",
    word: "Present",
    wordMeaning: "God is nearer than the moment you feel most alone.",
    title: "The God Who Sees",
    theme: "Presence",
    scripture: "Genesis 16:13",
    verse:
      "And she called the name of the LORD that spake unto her, Thou God seest me: for she said, Have I also here looked after him that seeth me?",
    summary: "Hagar was alone in the wilderness, yet she discovered that even there, she was seen by God.",
    reflection: [
      "Hagar’s story is full of the kind of pain that makes a person feel invisible. She was used, dismissed, and sent away. But in the wilderness, God found her and spoke her name.",
      "She called Him El Roi, the God who sees me. Not the God of my fruitful season. Not the God of my best behavior. The God who sees me when I am afraid, exhausted, and uncertain about the future.",
      "You are not invisible to God. The One who sees the sparrow sees you. Even here. Even now. There is no wilderness beyond His notice.",
    ],
    prayer:
      "El Roi, thank You for seeing me when I feel overlooked. Meet me in this place, and let Your presence remind me that I am never alone. Amen.",
    prompt: "Where do you feel unseen, and how does it change things to know God sees you?",
    meditation: "The God who sees is here with me.",
    breatheIn: "You see me",
    breatheOut: "I am not alone",
    readTime: 4,
  },
  {
    day: 20,
    id: "deep-calls-to-deep",
    word: "Trust",
    wordMeaning: "Leaning into God when the waters are too deep to understand.",
    title: "Deep Calls to Deep",
    theme: "Trust",
    scripture: "Psalm 42:7",
    verse:
      "Deep calleth unto deep at the noise of thy waterspouts: all thy waves and thy billows are gone over me.",
    summary: "Even in the deepest water, there is a deeper call—the voice of God asking to be trusted.",
    reflection: [
      "There are seasons when explanations run out. Grief is too deep for words. The path is too dark to see. The psalmist does not tidy this up. He names the waves. He feels them going over his head.",
      "But there is another deep beneath the chaos: the deep of God. Deep calls to deep. His Spirit calls to the deepest part of us, saying, “I am still here.” Not above the waves, but with you within them.",
      "You do not have to understand the ocean to be held by the One who made it. Trust is not certainty about the path; it is confidence in the presence of the Guide.",
    ],
    prayer:
      "God of the deep waters, hold me when I cannot see the shore. Let Your voice be deeper than my fear, and teach me to trust You here. Amen.",
    prompt: "What deep feeling do you need to bring honestly before God?",
    meditation: "The deep of God is holding me.",
    breatheIn: "I trust",
    breatheOut: "I sink into grace",
    readTime: 4,
  },
  {
    day: 21,
    id: "go-in-peace",
    word: "Shalom",
    wordMeaning: "Wholeness, flourishing, and peace in every dimension of life.",
    title: "Go in Peace",
    theme: "Blessing",
    scripture: "Numbers 6:24-26",
    verse:
      "The LORD bless thee, and keep thee: The LORD make his face shine upon thee, and be gracious unto thee: The LORD lift up his countenance upon thee, and give thee peace.",
    summary: "God’s blessing is not a vague wish. It is His face turned toward you, His grace upon you, His peace within you.",
    reflection: [
      "To be blessed is to be seen by the One who shines. The ancient words of the priest describe a God who does not turn away, but turns toward us. His face is not cold. It is light.",
      "Shalom is more than the absence of conflict. It is life as it should be: relationship restored, hearts at home, justice and kindness meeting. It is the garden returned.",
      "Receive the blessing as you go. You do not leave God behind at the end of a prayer. His peace goes with you into the ordinary, the difficult, and the unknown.",
    ],
    prayer:
      "LORD, bless me and keep me. Let Your face shine upon me and give me peace. Then send me to carry that peace to someone else. Amen.",
    prompt: "Who needs to receive the peace of God through you this week?",
    meditation: "The LORD lifts up His face and gives me peace.",
    breatheIn: "I receive shalom",
    breatheOut: "I go in peace",
    readTime: 4,
  },
];

export function getDailyEntry(date: Date): DailyEntry {
  const start = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date.getTime() - start.getTime()) / 86400000);
  return dailyEntries[((dayOfYear % dailyEntries.length) + dailyEntries.length) % dailyEntries.length];
}

export function getEntryById(id: string): DailyEntry | undefined {
  return dailyEntries.find((entry) => entry.id === id);
}

export function getAdjacentEntry(id: string, direction: -1 | 1): DailyEntry {
  const index = dailyEntries.findIndex((entry) => entry.id === id);
  const next = (index + direction + dailyEntries.length) % dailyEntries.length;
  return dailyEntries[next];
}
