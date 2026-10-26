export type PlanDay = {
  day: number;
  title: string;
  reference: string;
  slug: string;
  chapter: number;
  prompt: string;
};

export type ReadingPlan = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  category: string;
  tone: "pine" | "gold" | "sage" | "clay";
  days: PlanDay[];
};

export const readingPlans: ReadingPlan[] = [
  {
    id: "peace-for-anxious-hearts",
    title: "Peace for Anxious Hearts",
    subtitle: "A 7-day journey from worry to trust",
    description:
      "A gentle week of Scripture for the restless mind. Each day invites you to trade the weight of tomorrow for the nearness of God today.",
    duration: "7 days",
    category: "Anxiety & Peace",
    tone: "pine",
    days: [
      {
        day: 1,
        title: "The Nearness of God",
        reference: "Psalm 46:1-11",
        slug: "psalms",
        chapter: 46,
        prompt: "Name the thing that feels unsteady today, then name the God who is near.",
      },
      {
        day: 2,
        title: "Enough for Today",
        reference: "Matthew 6:25-34",
        slug: "matthew",
        chapter: 6,
        prompt: "Ask yourself: what am I borrowing from tomorrow that belongs to today?",
      },
      {
        day: 3,
        title: "Peace That Guards",
        reference: "Philippians 4:4-9",
        slug: "philippians",
        chapter: 4,
        prompt: "Turn one worry into a prayer, and write down one thing you are thankful for.",
      },
      {
        day: 4,
        title: "A Heart Not Troubled",
        reference: "John 14:1-14",
        slug: "john",
        chapter: 14,
        prompt: "Where do you need to hear Jesus say, 'Let not your heart be troubled'?",
      },
      {
        day: 5,
        title: "Strength for the Weak",
        reference: "2 Corinthians 12:1-10",
        slug: "2-corinthians",
        chapter: 12,
        prompt: "Offer God the place where you feel weakest, and ask for sufficient grace.",
      },
      {
        day: 6,
        title: "Held in the Shepherd's Care",
        reference: "Psalm 23",
        slug: "psalms",
        chapter: 23,
        prompt: "Slowly read the psalm aloud. What phrase do you most need to receive?",
      },
      {
        day: 7,
        title: "Nothing Can Separate",
        reference: "Romans 8:31-39",
        slug: "romans",
        chapter: 8,
        prompt: "Write a short declaration of God's faithfulness over your life.",
      },
    ],
  },
  {
    id: "rooted-in-grace",
    title: "Rooted in Grace",
    subtitle: "A 7-day journey into your identity in Christ",
    description:
      "You are not what you produce, prove, or perfect. This week explores the unearned, unstoppable grace that makes you new.",
    duration: "7 days",
    category: "Identity & Grace",
    tone: "gold",
    days: [
      {
        day: 1,
        title: "Made Alive",
        reference: "Ephesians 2:1-10",
        slug: "ephesians",
        chapter: 2,
        prompt: "How does it change your day to know you are God's workmanship?",
      },
      {
        day: 2,
        title: "Crucified with Christ",
        reference: "Galatians 2:15-21",
        slug: "galatians",
        chapter: 2,
        prompt: "What old label are you ready to leave at the cross?",
      },
      {
        day: 3,
        title: "No Condemnation",
        reference: "Romans 8:1-11",
        slug: "romans",
        chapter: 8,
        prompt: "Where have you been condemning yourself for what God has already forgiven?",
      },
      {
        day: 4,
        title: "A New Creation",
        reference: "2 Corinthians 5:14-21",
        slug: "2-corinthians",
        chapter: 5,
        prompt: "What would it look like to live as an ambassador of reconciliation today?",
      },
      {
        day: 5,
        title: "The Vine and the Branch",
        reference: "John 15:1-11",
        slug: "john",
        chapter: 15,
        prompt: "What is one way you can intentionally abide in Christ today?",
      },
      {
        day: 6,
        title: "Washed and Renewed",
        reference: "Titus 3:1-8",
        slug: "titus",
        chapter: 3,
        prompt: "Receive the kindness of God without trying to repay it.",
      },
      {
        day: 7,
        title: "Kept from Falling",
        reference: "Jude 1:17-25",
        slug: "jude",
        chapter: 1,
        prompt: "Write a prayer of praise to the God who is able to keep you.",
      },
    ],
  },
  {
    id: "psalms-of-stillness",
    title: "Psalms of Stillness",
    subtitle: "A 7-day rhythm of rest and prayer",
    description:
      "The Psalms make room for every human emotion. This week, let ancient prayers slow your breathing and steady your soul.",
    duration: "7 days",
    category: "Prayer & Rest",
    tone: "sage",
    days: [
      {
        day: 1,
        title: "The Shepherd Leads",
        reference: "Psalm 23",
        slug: "psalms",
        chapter: 23,
        prompt: "Read slowly. Imagine the green pasture and the still water.",
      },
      {
        day: 2,
        title: "One Thing",
        reference: "Psalm 27",
        slug: "psalms",
        chapter: 27,
        prompt: "What is the 'one thing' you are seeking from God right now?",
      },
      {
        day: 3,
        title: "Taste and See",
        reference: "Psalm 34",
        slug: "psalms",
        chapter: 34,
        prompt: "Notice one good thing God has done, and thank Him for it.",
      },
      {
        day: 4,
        title: "Be Still",
        reference: "Psalm 46",
        slug: "psalms",
        chapter: 46,
        prompt: "Sit in silence for two minutes after reading. Let God be God.",
      },
      {
        day: 5,
        title: "My Soul Waits",
        reference: "Psalm 62",
        slug: "psalms",
        chapter: 62,
        prompt: "Where is your soul waiting, and what is it waiting for?",
      },
      {
        day: 6,
        title: "Under the Shadow",
        reference: "Psalm 91",
        slug: "psalms",
        chapter: 91,
        prompt: "What does it mean for you to dwell in the shelter of the Most High?",
      },
      {
        day: 7,
        title: "I Lift My Eyes",
        reference: "Psalm 121",
        slug: "psalms",
        chapter: 121,
        prompt: "Lift your eyes from your problem to your Helper.",
      },
    ],
  },
  {
    id: "the-way-of-jesus",
    title: "The Way of Jesus",
    subtitle: "A 7-day journey through the Gospel",
    description:
      "Walk with Jesus from the invitation to the empty tomb. A week to remember what His life, death, and resurrection make possible.",
    duration: "7 days",
    category: "The Gospel",
    tone: "clay",
    days: [
      {
        day: 1,
        title: "The Word Made Flesh",
        reference: "John 1:1-18",
        slug: "john",
        chapter: 1,
        prompt: "What does it mean that God chose to dwell among us?",
      },
      {
        day: 2,
        title: "The Invitation",
        reference: "Mark 1:14-20",
        slug: "mark",
        chapter: 1,
        prompt: "What might Jesus be inviting you to leave behind in order to follow Him?",
      },
      {
        day: 3,
        title: "Blessed Are the Gentle",
        reference: "Matthew 5:1-16",
        slug: "matthew",
        chapter: 5,
        prompt: "Which Beatitude feels most like an invitation to you today?",
      },
      {
        day: 4,
        title: "The Good Shepherd",
        reference: "John 10:1-18",
        slug: "john",
        chapter: 10,
        prompt: "Listen for the Shepherd's voice beneath the other voices today.",
      },
      {
        day: 5,
        title: "The Greatest Love",
        reference: "John 13:1-17",
        slug: "john",
        chapter: 13,
        prompt: "Where is Jesus inviting you to serve someone in a hidden, humble way?",
      },
      {
        day: 6,
        title: "It Is Finished",
        reference: "John 19:28-37",
        slug: "john",
        chapter: 19,
        prompt: "Sit with the finished work of the cross. What are you trying to add?",
      },
      {
        day: 7,
        title: "He Is Risen",
        reference: "John 20:1-18",
        slug: "john",
        chapter: 20,
        prompt: "Name the fear or grief that the resurrection speaks to in your life.",
      },
    ],
  },
];

export function getPlanById(id: string) {
  return readingPlans.find((plan) => plan.id === id);
}
